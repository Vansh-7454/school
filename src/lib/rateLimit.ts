/**
 * In-memory rate limiter for login attempts
 * Max 5 failed attempts per email + IP per 10 minutes (600,000 ms)
 */

interface RateLimitRecord {
  attempts: number;
  resetAt: number;
}

const loginAttempts = new Map<string, RateLimitRecord>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export function checkRateLimit(key: string): {
  isLocked: boolean;
  remainingMinutes?: number;
} {
  const record = loginAttempts.get(key);
  const now = Date.now();

  if (!record) {
    return { isLocked: false };
  }

  if (now > record.resetAt) {
    loginAttempts.delete(key);
    return { isLocked: false };
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    const remainingMs = record.resetAt - now;
    const remainingMinutes = Math.max(1, Math.ceil(remainingMs / 60000));
    return { isLocked: true, remainingMinutes };
  }

  return { isLocked: false };
}

export function recordFailedAttempt(key: string): {
  isLocked: boolean;
  remainingMinutes?: number;
} {
  const now = Date.now();
  const record = loginAttempts.get(key);

  if (!record || now > record.resetAt) {
    loginAttempts.set(key, { attempts: 1, resetAt: now + WINDOW_MS });
    return { isLocked: false };
  }

  record.attempts += 1;
  loginAttempts.set(key, record);

  if (record.attempts >= MAX_ATTEMPTS) {
    const remainingMs = record.resetAt - now;
    const remainingMinutes = Math.max(1, Math.ceil(remainingMs / 60000));
    return { isLocked: true, remainingMinutes };
  }

  return { isLocked: false };
}

export function clearRateLimit(key: string): void {
  loginAttempts.delete(key);
}
