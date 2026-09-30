"use client";

import React from "react";

interface GalleryArtworkProps {
  variant: string;
  title: string;
  className?: string;
}

export function GalleryArtwork({ variant, title, className = "" }: GalleryArtworkProps) {
  switch (variant) {
    case "regatta":
      return (
        <svg viewBox="0 0 600 450" className={`w-full h-full object-cover ${className}`} fill="none">
          <defs>
            <linearGradient id="regattaSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B1B3A" />
              <stop offset="50%" stopColor="#1B335A" />
              <stop offset="100%" stopColor="#C9A24B" />
            </linearGradient>
            <linearGradient id="regattaWater" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C9A24B" stopOpacity="0.8" />
              <stop offset="25%" stopColor="#14264A" />
              <stop offset="100%" stopColor="#081329" />
            </linearGradient>
          </defs>
          <rect width="600" height="280" fill="url(#regattaSky)" />
          {/* Golden Sunrise */}
          <circle cx="300" cy="240" r="70" fill="#FFF4D0" opacity="0.85" />
          <circle cx="300" cy="240" r="120" fill="#C9A24B" opacity="0.3" filter="blur(20px)" />
          {/* Water */}
          <rect y="240" width="600" height="210" fill="url(#regattaWater)" />
          {/* Water ripples */}
          <ellipse cx="300" cy="260" rx="180" ry="8" fill="#FFF4D0" opacity="0.4" />
          <ellipse cx="280" cy="290" rx="240" ry="12" fill="#C9A24B" opacity="0.3" />
          {/* Scull Boat Silhouette */}
          <path d="M 80 320 Q 300 345 520 320 Q 300 335 80 320 Z" fill="#0B1B3A" />
          {/* Rowers & Oars */}
          {[180, 240, 300, 360, 420].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy={308} r="6" fill="#0B1B3A" />
              <path d={`M ${x} 314 L ${x - 5} 326`} stroke="#0B1B3A" strokeWidth="4" />
              {/* Oar */}
              <line x1={x} y1={318} x2={x - 45} y2={350} stroke="#C9A24B" strokeWidth="2.5" />
              <polygon points={`${x - 45},350 ${x - 65},356 ${x - 55},346`} fill="#DFBE72" />
            </g>
          ))}
        </svg>
      );

    case "observatory":
      return (
        <svg viewBox="0 0 600 600" className={`w-full h-full object-cover ${className}`} fill="none">
          <defs>
            <radialGradient id="obsSky" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#1E2958" />
              <stop offset="50%" stopColor="#0B1B3A" />
              <stop offset="100%" stopColor="#050C1B" />
            </radialGradient>
          </defs>
          <rect width="600" height="600" fill="url(#obsSky)" />
          {/* Stars */}
          {[
            [80, 100], [140, 50], [220, 120], [350, 70], [420, 140],
            [500, 60], [530, 160], [90, 240], [480, 260], [260, 40]
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 1.5 : 2.5} fill="#FFF4D0" opacity={0.7 + (i % 3) * 0.1} />
          ))}
          {/* Planet Saturn */}
          <g transform="translate(420, 130) rotate(-18)">
            <ellipse cx="0" cy="0" rx="42" ry="12" stroke="#C9A24B" strokeWidth="4" fill="none" opacity="0.8" />
            <circle cx="0" cy="0" r="22" fill="#DFBE72" />
            <path d="M -42 0 A 42 12 0 0 1 42 0" stroke="#C9A24B" strokeWidth="4" fill="none" />
          </g>
          {/* Observatory Dome */}
          <path d="M 120 600 L 120 440 C 120 320, 480 320, 480 440 L 480 600 Z" fill="#0B1B3A" stroke="#C9A24B" strokeWidth="2" />
          {/* Dome slit */}
          <rect x="280" y="330" width="40" height="150" fill="#14264E" stroke="#C9A24B" strokeWidth="1" />
          {/* Telescope Angle */}
          <line x1="300" y1="450" x2="390" y2="300" stroke="#C9A24B" strokeWidth="8" strokeLinecap="round" />
          <circle cx="390" cy="300" r="10" fill="#FFF4D0" />
        </svg>
      );

    case "orchestra":
      return (
        <svg viewBox="0 0 600 450" className={`w-full h-full object-cover ${className}`} fill="none">
          <defs>
            <linearGradient id="orchBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1B120C" />
              <stop offset="60%" stopColor="#3A2412" />
              <stop offset="100%" stopColor="#0B1B3A" />
            </linearGradient>
          </defs>
          <rect width="600" height="450" fill="url(#orchBg)" />
          {/* Acoustic Hall Curved Shells */}
          <path d="M 50 450 Q 300 120 550 450" stroke="#C9A24B" strokeWidth="1.5" opacity="0.3" fill="none" />
          <path d="M 100 450 Q 300 160 500 450" stroke="#C9A24B" strokeWidth="2" opacity="0.5" fill="none" />
          <path d="M 150 450 Q 300 200 450 450" stroke="#DFBE72" strokeWidth="2.5" opacity="0.6" fill="none" />
          {/* Violin Silhouette */}
          <g transform="translate(300, 270) scale(1.1)">
            {/* Body */}
            <path
              d="M -30 -60 C -60 -40, -60 0, -30 20 C -50 40, -50 70, -20 90 L 20 90 C 50 70, 50 40, 30 20 C 60 0, 60 -40, 30 -60 Z"
              fill="#C9A24B"
              fillOpacity="0.25"
              stroke="#DFBE72"
              strokeWidth="2.5"
            />
            {/* Neck */}
            <rect x="-6" y="-120" width="12" height="60" fill="#0B1B3A" stroke="#C9A24B" strokeWidth="1.5" />
            {/* Scroll */}
            <circle cx="0" cy="-125" r="9" stroke="#DFBE72" strokeWidth="2" fill="none" />
            {/* F-holes */}
            <path d="M -15 -10 Q -10 10 -20 30" stroke="#DFBE72" strokeWidth="2" fill="none" />
            <path d="M 15 -10 Q 10 10 20 30" stroke="#DFBE72" strokeWidth="2" fill="none" />
          </g>
        </svg>
      );

    case "robotics":
      return (
        <svg viewBox="0 0 600 600" className={`w-full h-full object-cover ${className}`} fill="none">
          <defs>
            <linearGradient id="roboBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B1B3A" />
              <stop offset="100%" stopColor="#07223D" />
            </linearGradient>
          </defs>
          <rect width="600" height="600" fill="url(#roboBg)" />
          {/* Circuit Grid Lines */}
          <path d="M 50 100 L 150 100 L 200 150 L 450 150 L 500 200" stroke="#C9A24B" strokeWidth="1.5" opacity="0.3" fill="none" />
          <path d="M 100 450 L 220 450 L 260 410 L 400 410 L 450 460" stroke="#00F0FF" strokeWidth="1" opacity="0.4" fill="none" />
          <circle cx="200" cy="150" r="4" fill="#C9A24B" />
          <circle cx="450" cy="150" r="4" fill="#00F0FF" />
          {/* Robotic Arm Joint Articulations */}
          <g transform="translate(180, 480)">
            {/* Base */}
            <rect x="-60" y="-30" width="120" height="30" rx="6" fill="#1B335A" stroke="#C9A24B" strokeWidth="2" />
            {/* Segment 1 */}
            <line x1="0" y1="-20" x2="60" y2="-160" stroke="#DFBE72" strokeWidth="12" strokeLinecap="round" />
            <circle cx="60" cy="-160" r="14" fill="#0B1B3A" stroke="#C9A24B" strokeWidth="3" />
            {/* Segment 2 */}
            <line x1="60" y1="-160" x2="160" y2="-240" stroke="#DFBE72" strokeWidth="9" strokeLinecap="round" />
            <circle cx="160" cy="-240" r="10" fill="#0B1B3A" stroke="#C9A24B" strokeWidth="2.5" />
            {/* Gripper Hand */}
            <path d="M 160 -240 L 195 -260 M 160 -240 L 195 -230" stroke="#00F0FF" strokeWidth="4" strokeLinecap="round" />
            <circle cx="205" cy="-245" r="7" fill="#C9A24B" />
          </g>
        </svg>
      );

    case "library":
      return (
        <svg viewBox="0 0 600 800" className={`w-full h-full object-cover ${className}`} fill="none">
          <defs>
            <linearGradient id="libBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E140A" />
              <stop offset="50%" stopColor="#2E1D10" />
              <stop offset="100%" stopColor="#0B1B3A" />
            </linearGradient>
          </defs>
          <rect width="600" height="800" fill="url(#libBg)" />
          {/* Gothic Cathedral Arch Ceiling */}
          <path d="M 50 800 L 50 350 C 50 150, 550 150, 550 350 L 550 800 Z" stroke="#C9A24B" strokeWidth="3" fill="none" opacity="0.6" />
          <path d="M 120 800 L 120 390 C 120 220, 480 220, 480 390 L 480 800 Z" stroke="#DFBE72" strokeWidth="2" fill="none" opacity="0.4" />
          {/* Bookshelf Rows */}
          {[420, 500, 580, 660, 740].map((y, rowIdx) => (
            <g key={rowIdx}>
              <line x1="70" y1={y} x2="530" y2={y} stroke="#C9A24B" strokeWidth="3" opacity="0.7" />
              {/* Individual book spines */}
              {[90, 110, 125, 145, 170, 190, 215, 240, 270, 310, 335, 360, 390, 415, 440, 470, 500].map((bx, bIdx) => (
                <rect
                  key={bIdx}
                  x={bx}
                  y={y - 35 - ((bIdx + rowIdx) % 4) * 5}
                  width="14"
                  height={35 + ((bIdx + rowIdx) % 4) * 5}
                  rx="2"
                  fill={(bIdx + rowIdx) % 3 === 0 ? "#C9A24B" : (bIdx + rowIdx) % 3 === 1 ? "#1B335A" : "#8C6A2E"}
                  opacity="0.8"
                />
              ))}
            </g>
          ))}
          {/* Warm Reading Lamp Glow */}
          <circle cx="300" cy="580" r="90" fill="#FFF4D0" opacity="0.15" filter="blur(30px)" />
        </svg>
      );

    case "quadrangle":
      return (
        <svg viewBox="0 0 600 450" className={`w-full h-full object-cover ${className}`} fill="none">
          <defs>
            <linearGradient id="quadSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#162A56" />
              <stop offset="60%" stopColor="#7E6842" />
              <stop offset="100%" stopColor="#E2BC72" />
            </linearGradient>
          </defs>
          <rect width="600" height="280" fill="url(#quadSky)" />
          {/* Georgian College Facade Silhouette */}
          <rect x="60" y="160" width="480" height="150" fill="#0B1B3A" />
          {/* Clock Tower Center */}
          <polygon points="260,160 300,70 340,160" fill="#0B1B3A" stroke="#C9A24B" strokeWidth="1.5" />
          <circle cx="300" cy="130" r="14" fill="#FFF4D0" stroke="#C9A24B" strokeWidth="2" />
          {/* Clock Hands */}
          <line x1="300" y1="130" x2="300" y2="122" stroke="#0B1B3A" strokeWidth="2" />
          <line x1="300" y1="130" x2="306" y2="130" stroke="#0B1B3A" strokeWidth="1.5" />
          {/* Windows Matrix */}
          {[190, 230, 270].map((y) =>
            [90, 130, 170, 210, 370, 410, 450, 490].map((x) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="16" height="24" rx="2" fill="#FFF4D0" opacity="0.6" />
            ))
          )}
          {/* Manicured Lawns Foreground */}
          <rect y="310" width="600" height="140" fill="#1C382B" />
          <ellipse cx="300" cy="380" rx="220" ry="40" fill="#2E553F" stroke="#C9A24B" strokeWidth="1" />
        </svg>
      );

    case "fencing":
      return (
        <svg viewBox="0 0 600 600" className={`w-full h-full object-cover ${className}`} fill="none">
          <rect width="600" height="600" fill="#0B1B3A" />
          {/* Motion Trail Arcs */}
          <path d="M 120 400 Q 300 150 480 250" stroke="#C9A24B" strokeWidth="3" opacity="0.6" fill="none" />
          <path d="M 180 350 Q 300 200 460 320" stroke="#FFF4D0" strokeWidth="2" opacity="0.4" fill="none" />
          {/* Crossed Blades */}
          <line x1="100" y1="500" x2="500" y2="100" stroke="#DFBE72" strokeWidth="4" strokeLinecap="round" />
          <line x1="100" y1="100" x2="500" y2="500" stroke="#C9A24B" strokeWidth="4" strokeLinecap="round" />
          {/* Fencing Bell Guards */}
          <circle cx="160" cy="440" r="26" fill="#0B1B3A" stroke="#C9A24B" strokeWidth="3" />
          <circle cx="440" cy="440" r="26" fill="#0B1B3A" stroke="#DFBE72" strokeWidth="3" />
          {/* Central Clash Spark */}
          <circle cx="300" cy="300" r="16" fill="#FFF4D0" opacity="0.9" />
          <circle cx="300" cy="300" r="38" stroke="#C9A24B" strokeWidth="2" strokeDasharray="6 4" fill="none" />
        </svg>
      );

    case "botany":
      return (
        <svg viewBox="0 0 600 800" className={`w-full h-full object-cover ${className}`} fill="none">
          <defs>
            <linearGradient id="botBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B1B3A" />
              <stop offset="50%" stopColor="#132E22" />
              <stop offset="100%" stopColor="#25543D" />
            </linearGradient>
          </defs>
          <rect width="600" height="800" fill="url(#botBg)" />
          {/* Glasshouse Vaulted Structure */}
          <path d="M 80 800 L 80 280 C 80 120, 520 120, 520 280 L 520 800" stroke="#C9A24B" strokeWidth="2.5" fill="none" opacity="0.5" />
          <line x1="300" y1="160" x2="300" y2="800" stroke="#C9A24B" strokeWidth="2" opacity="0.4" />
          {/* Giant Botanical Leaves */}
          <path d="M 300 700 Q 140 550 180 380 Q 280 480 300 700 Z" fill="#2E6B4B" opacity="0.75" />
          <path d="M 300 700 Q 460 520 420 340 Q 320 460 300 700 Z" fill="#3D855E" opacity="0.8" />
          <path d="M 300 650 Q 200 480 260 320 Q 320 420 300 650 Z" fill="#C9A24B" opacity="0.5" />
          {/* Golden Flower Stamen */}
          <circle cx="300" cy="310" r="14" fill="#FFF4D0" />
        </svg>
      );

    default:
      // Generic luxury scholastic artwork with crest & geometries
      return (
        <svg viewBox="0 0 600 450" className={`w-full h-full object-cover ${className}`} fill="none">
          <defs>
            <linearGradient id="genBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B1B3A" />
              <stop offset="60%" stopColor="#162A56" />
              <stop offset="100%" stopColor="#2A1E0E" />
            </linearGradient>
          </defs>
          <rect width="600" height="450" fill="url(#genBg)" />
          {/* Concentric Golden Geometries */}
          <circle cx="300" cy="225" r="140" stroke="#C9A24B" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.4" />
          <circle cx="300" cy="225" r="90" stroke="#DFBE72" strokeWidth="2" opacity="0.6" />
          <circle cx="300" cy="225" r="45" fill="#C9A24B" fillOpacity="0.2" stroke="#FFF4D0" strokeWidth="1" />
          {/* Diamond Motif */}
          <polygon points="300,165 360,225 300,285 240,225" stroke="#C9A24B" strokeWidth="2" fill="none" />
          <circle cx="300" cy="225" r="8" fill="#FFF4D0" />
          {/* Subtle text watermarking */}
          <text
            x="300"
            y="370"
            textAnchor="middle"
            fill="#DFBE72"
            opacity="0.6"
            fontFamily="serif"
            fontSize="18"
            letterSpacing="4"
          >
            {title.toUpperCase()}
          </text>
        </svg>
      );
  }
}
