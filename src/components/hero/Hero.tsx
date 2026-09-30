"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Full-bleed cinematic hero section showcasing Aurelia International School's
 * campus and architectural journey across day and night transitions.
 *
 * Implements exact full-screen viewport layout below the navbar:
 * - Container: relative, 100% width, height: calc(100vh - navbarHeight), overflow: hidden
 * - Video: absolute inset-0, 100% width & height, block, object-fit: cover, object-position: center
 * - No bottom blur, no white fade, no gradient overlay, no controls, no card frame.
 */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [navHeight, setNavHeight] = useState<number | null>(null);

  // Measure actual navbar height dynamically to guarantee zero gaps
  useEffect(() => {
    const measureNav = () => {
      const header = document.querySelector("header");
      if (header) {
        setNavHeight(header.offsetHeight);
      }
    };

    measureNav();
    window.addEventListener("resize", measureNav);
    return () => window.removeEventListener("resize", measureNav);
  }, []);

  // Autoplay setup with strict browser policy and reduced motion handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    // Check if user prefers reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      video.pause();
      return;
    }

    const attemptPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsVideoLoaded(true);
          })
          .catch(() => {
            // Autoplay postponed by browser policy; fallback poster remains active
          });
      }
    };

    attemptPlay();

    // Intersection observer: pause playback when scrolled out of view to save resources
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!video) return;
        if (entry.isIntersecting && !document.hidden) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    // Tab visibility handling
    const handleVisibilityChange = () => {
      if (!video) return;
      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      aria-label="Aurelia International School - Campus Overview"
      className={cn(
        "relative w-full overflow-hidden select-none bg-[#060F22]",
        // CSS fallback classes before JS measurement hydrates
        "mt-[60px] sm:mt-16",
        "h-[calc(100vh-60px)] sm:h-[calc(100vh-4rem)]"
      )}
      style={{
        marginTop: navHeight !== null ? `${navHeight}px` : undefined,
        height: navHeight !== null ? `calc(100vh - ${navHeight}px)` : undefined,
      }}
    >
      {/* 
        Accessible Screen Reader Heading:
        The video contains integrated cinematic storytelling typography.
        This visually-hidden h1 ensures SEO and assistive technology compliance.
      */}
      <h1 className="sr-only">
        Aurelia International School — Where Every Day Begins a New Journey. Learning, Discovering, Becoming.
      </h1>

      {/* =========================================================================
          FULL-BLEED CINEMATIC MEDIA CONTAINER
          The video & fallback poster cover 100% of the hero area with object-fit: cover.
          No bottom blur, no white fade, no gradient overlay, no border, no letterboxing.
         ========================================================================= */}
      {/* Instant Poster Fallback (Zero black/blank flash on initial render) */}
      <Image
        src="/hero/school_building_poster.jpg"
        alt="Aurelia International School campus building"
        fill
        priority
        sizes="100vw"
        quality={92}
        className={cn(
          "absolute inset-0 w-full h-full block object-cover pointer-events-none",
          "object-[24%_center] sm:object-center",
          "transition-opacity duration-700 ease-out",
          isVideoLoaded && isPlaying ? "opacity-0" : "opacity-100"
        )}
      />

      {/* Full-Bleed Autoplaying Video Element */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero/school_building_poster.jpg"
        onLoadedData={() => setIsVideoLoaded(true)}
        onCanPlay={() => setIsVideoLoaded(true)}
        onPlaying={() => {
          setIsPlaying(true);
          setIsVideoLoaded(true);
        }}
        className={cn(
          "absolute inset-0 w-full h-full block object-cover pointer-events-none",
          "object-[24%_center] sm:object-center",
          "transition-opacity duration-700 ease-out",
          isVideoLoaded && isPlaying ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/hero/school_building_day_transitions.mp4" type="video/mp4" />
        <source src="/School_building_day_transitions_1080p_20260930104233.mp4" type="video/mp4" />
      </video>
    </section>
  );
}

export default Hero;
