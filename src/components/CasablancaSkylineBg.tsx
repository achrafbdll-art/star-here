import React from "react";

interface CasablancaSkylineBgProps {
  className?: string;
}

export const CasablancaSkylineBg: React.FC<CasablancaSkylineBgProps> = ({ className = "" }) => {
  return (
    <div className={`pointer-events-none select-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1440 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover object-bottom"
        preserveAspectRatio="xMidYMax meet"
      >
        {/* ================= EXACT ARCHITECTURAL DRAWING MATCHING image.png ================= */}

        {/* --- BASE GROUND LINE --- */}
        <line x1="0" y1="440" x2="1440" y2="440" stroke="currentColor" strokeWidth="2.2" />

        {/* ---------------- 1. ANCIENNE MÉDINA & BASTION (FAR LEFT) ---------------- */}
        <rect x="40" y="340" width="150" height="100" stroke="currentColor" strokeWidth="1.5" />
        <line x1="35" y1="340" x2="195" y2="340" stroke="currentColor" strokeWidth="1.6" />
        {/* 3 Upper Moorish Arches */}
        {Array.from({ length: 3 }).map((_, i) => (
          <g key={`far-l-arch-${i}`}>
            <path
              d={`M ${65 + i * 40} 385 L ${65 + i * 40} 368 Q ${77.5 + i * 40} 354 ${90 + i * 40} 368 L ${90 + i * 40} 385 Z`}
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d={`M ${68 + i * 40} 385 L ${68 + i * 40} 370 Q ${77.5 + i * 40} 360 ${87 + i * 40} 370 L ${87 + i * 40} 385`}
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </g>
        ))}
        {/* Lower Colonettes */}
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={`far-l-col-${i}`} x={52 + i * 16} y="405" width="9" height="35" stroke="currentColor" strokeWidth="0.9" />
        ))}
        <line x1="40" y1="395" x2="190" y2="395" stroke="currentColor" strokeWidth="1" />

        {/* ---------------- 2. WILAYA CLOCK TOWER (TOUR DE L'HORLOGE) ---------------- */}
        <rect x="185" y="235" width="34" height="205" stroke="currentColor" strokeWidth="1.5" />
        <rect x="182" y="235" width="40" height="30" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="202" cy="250" r="6" stroke="currentColor" strokeWidth="1.1" />
        <line x1="202" y1="250" x2="202" y2="246" stroke="currentColor" strokeWidth="1" />
        <line x1="202" y1="250" x2="205" y2="250" stroke="currentColor" strokeWidth="1" />
        {/* Pyramidal Roof & Spire */}
        <rect x="189" y="210" width="26" height="25" stroke="currentColor" strokeWidth="1.2" />
        <path d="M 185 210 L 202 185 L 219 210 Z" stroke="currentColor" strokeWidth="1.5" />
        <line x1="202" y1="185" x2="202" y2="172" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="202" cy="170" r="2.2" stroke="currentColor" strokeWidth="1" />
        {/* Vertical stripes */}
        <line x1="196" y1="275" x2="196" y2="425" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="208" y1="275" x2="208" y2="425" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />

        {/* Mid-rise Modern Building Behind Clock Tower */}
        <path d="M 225 440 L 225 200 L 285 180 L 285 440" stroke="currentColor" strokeWidth="1.3" />
        <line x1="225" y1="215" x2="285" y2="200" stroke="currentColor" strokeWidth="0.9" />
        <line x1="225" y1="235" x2="285" y2="220" stroke="currentColor" strokeWidth="0.9" />
        <line x1="225" y1="255" x2="285" y2="240" stroke="currentColor" strokeWidth="0.9" />

        {/* ---------------- 3. ÉGLISE DU SACRÉ-CŒUR DE CASABLANCA ---------------- */}
        {/* Left Art Deco Tower */}
        <rect x="275" y="225" width="28" height="215" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 275 225 L 289 200 L 303 225 Z" stroke="currentColor" strokeWidth="1.3" />
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`sc-l-${i}`} x1="280" y1={235 + i * 12} x2="298" y2={235 + i * 12} stroke="currentColor" strokeWidth="0.9" />
        ))}

        {/* Central High Vault with Large Rosette Arch */}
        <rect x="303" y="280" width="50" height="160" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 310 440 L 310 335 Q 328 305 346 335 L 346 440" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="328" cy="340" r="7" stroke="currentColor" strokeWidth="0.9" />
        <line x1="328" y1="333" x2="328" y2="347" stroke="currentColor" strokeWidth="0.7" />
        <line x1="321" y1="340" x2="335" y2="340" stroke="currentColor" strokeWidth="0.7" />

        {/* Right Art Deco Tower */}
        <rect x="353" y="225" width="28" height="215" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 353 225 L 367 200 L 381 225 Z" stroke="currentColor" strokeWidth="1.3" />
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`sc-r-${i}`} x1="358" y1={235 + i * 12} x2="376" y2={235 + i * 12} stroke="currentColor" strokeWidth="0.9" />
        ))}

        {/* ========================================================================= */}
        {/* 4. TWIN CENTER DE CASABLANCA (EXACT TO PHOTO: 2 IDENTICAL PARALLEL TOWERS) */}
        {/* ========================================================================= */}
        {/* Left Twin Center Tower */}
        <rect x="388" y="145" width="56" height="295" stroke="currentColor" strokeWidth="1.8" />
        {/* Chamfered/stepped mechanical roof crown */}
        <path d="M 394 145 L 398 132 L 434 132 L 438 145 Z" stroke="currentColor" strokeWidth="1.4" />
        <line x1="398" y1="132" x2="434" y2="132" stroke="currentColor" strokeWidth="1.2" />
        
        {/* Signature Vertical Striated Mullion Panels (Ricardo Bofill Design) */}
        <line x1="402" y1="145" x2="402" y2="330" stroke="currentColor" strokeWidth="1" />
        <line x1="416" y1="145" x2="416" y2="330" stroke="currentColor" strokeWidth="1" />
        <line x1="430" y1="145" x2="430" y2="330" stroke="currentColor" strokeWidth="1" />
        {/* Fine vertical texture pinstripes */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`tw1-vert-${i}`}
            x1={394 + i * 6}
            y1="152"
            x2={394 + i * 6}
            y2="320"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeDasharray="4 4"
          />
        ))}

        {/* Right Twin Center Tower */}
        <rect x="456" y="145" width="56" height="295" stroke="currentColor" strokeWidth="1.8" />
        {/* Chamfered/stepped mechanical roof crown */}
        <path d="M 462 145 L 466 132 L 502 132 L 506 145 Z" stroke="currentColor" strokeWidth="1.4" />
        <line x1="466" y1="132" x2="502" y2="132" stroke="currentColor" strokeWidth="1.2" />

        {/* Signature Vertical Striated Mullion Panels */}
        <line x1="470" y1="145" x2="470" y2="330" stroke="currentColor" strokeWidth="1" />
        <line x1="484" y1="145" x2="484" y2="330" stroke="currentColor" strokeWidth="1" />
        <line x1="498" y1="145" x2="498" y2="330" stroke="currentColor" strokeWidth="1" />
        {/* Fine vertical texture pinstripes */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`tw2-vert-${i}`}
            x1={462 + i * 6}
            y1="152"
            x2={462 + i * 6}
            y2="320"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeDasharray="4 4"
          />
        ))}

        {/* ========================================================================= */}
        {/* 5. GRANDE MOSQUÉE HASSAN II (MONUMENTAL CENTERPIECE - EXACT MATCH TO PHOTO) */}
        {/* ========================================================================= */}
        {/* Broad Symmetrical Prayer Hall */}
        <rect x="505" y="330" width="375" height="110" stroke="currentColor" strokeWidth="2" />

        {/* Slanted Green-Tile Roof with Horizontal Cornice */}
        <path d="M 495 330 L 692.5 300 L 890 330 Z" stroke="currentColor" strokeWidth="2.2" />
        <line x1="495" y1="330" x2="890" y2="330" stroke="currentColor" strokeWidth="1.4" />
        {/* Retractable Center Roof Hatch */}
        <rect x="635" y="307" width="115" height="16" stroke="currentColor" strokeWidth="1.3" strokeDasharray="4 2" />

        {/* Upper Clerestory Windows Row (10 Windows) */}
        {Array.from({ length: 10 }).map((_, i) => (
          <rect
            key={`h2-top-w-${i}`}
            x={525 + i * 35}
            y="337"
            width="15"
            height="13"
            stroke="currentColor"
            strokeWidth="0.9"
          />
        ))}

        {/* Grand Moorish Arcades on Prayer Hall Facade (10 Arched Bays) */}
        {Array.from({ length: 10 }).map((_, i) => (
          <g key={`h2-bay-${i}`}>
            {/* Outer Horseshoe Arch */}
            <path
              d={`M ${518 + i * 35} 440 L ${518 + i * 35} 375 Q ${532.5 + i * 35} 355 ${547 + i * 35} 375 L ${547 + i * 35} 440`}
              stroke="currentColor"
              strokeWidth="1.3"
            />
            {/* Inner Arch Accent */}
            <path
              d={`M ${522 + i * 35} 440 L ${522 + i * 35} 377 Q ${532.5 + i * 35} 363 ${543 + i * 35} 377 L ${543 + i * 35} 440`}
              stroke="currentColor"
              strokeWidth="0.8"
            />
            {/* Medallion / Rosette */}
            <circle cx={532.5 + i * 35} cy="369" r="2" stroke="currentColor" strokeWidth="0.7" />
          </g>
        ))}

        {/* ========================================================================= */}
        {/* 6. MINARET DE LA MOSQUÉE HASSAN II (210 MÈTRES - VERTICALE CENTRALE EXACTE) */}
        {/* ========================================================================= */}
        {/* Main Minaret Shaft */}
        <rect x="660" y="115" width="65" height="185" stroke="currentColor" strokeWidth="2.4" />

        {/* Lower Moorish Double-Window Panel with Alfiz Frame */}
        <rect x="670" y="235" width="45" height="48" stroke="currentColor" strokeWidth="1.2" />
        <path d="M 676 273 L 676 250 Q 683.5 240 691 250 L 691 273 Z" stroke="currentColor" strokeWidth="1" />
        <path d="M 694 273 L 694 250 Q 701.5 240 709 250 L 709 273 Z" stroke="currentColor" strokeWidth="1" />
        <circle cx="692.5" cy="245" r="2.2" stroke="currentColor" strokeWidth="0.9" />

        {/* Central Traditional Sebka Diamond Lozenge Carving */}
        <rect x="670" y="135" width="45" height="85" stroke="currentColor" strokeWidth="1.2" />
        <path d="M 670 160 L 692.5 135 L 715 160 L 692.5 185 Z" stroke="currentColor" strokeWidth="1" />
        <path d="M 670 185 L 692.5 160 L 715 185 L 692.5 210 Z" stroke="currentColor" strokeWidth="1" />
        <line x1="692.5" y1="135" x2="692.5" y2="220" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />

        {/* Cantilevered Crenellated Mu'adhdhin Balcony */}
        <rect x="653" y="102" width="79" height="13" stroke="currentColor" strokeWidth="2" />
        {Array.from({ length: 6 }).map((_, i) => (
          <rect key={`cren-min-${i}`} x={656 + i * 13} y="96" width="7" height="6" stroke="currentColor" strokeWidth="1.1" />
        ))}

        {/* Upper Minaret Lantern (Koubba) */}
        <rect x="673" y="65" width="39" height="31" stroke="currentColor" strokeWidth="1.8" />
        <path d="M 684 92 L 684 76 Q 692.5 70 701 76 L 701 92 Z" stroke="currentColor" strokeWidth="1" />

        {/* Lantern Ribbed Cupola / Dome */}
        <path d="M 670 65 Q 692.5 40 715 65 Z" stroke="currentColor" strokeWidth="2.2" />
        <line x1="692.5" y1="40" x2="692.5" y2="65" stroke="currentColor" strokeWidth="1" />

        {/* Spire + 3 Brass Spheres (Jamur) pointing up to Mecca */}
        <line x1="692.5" y1="40" x2="692.5" y2="2" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="692.5" cy="27" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="692.5" cy="15" r="3.6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="692.5" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.3" />

        {/* Moroccan Flag Flown on Mosque Right Roof (Exact to photo) */}
        <line x1="800" y1="380" x2="800" y2="310" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M 800 310 Q 815 303 830 314 L 830 327 Q 815 316 800 323 Z"
          stroke="currentColor"
          strokeWidth="1.3"
          fill="currentColor"
          fillOpacity="0.08"
        />

        {/* ========================================================================= */}
        {/* 7. CASABLANCA FINANCE CITY (CFC) CRYSTAL TRIANGULAR TOWERS (EXACT TO PHOTO) */}
        {/* ========================================================================= */}
        <path
          d="M 875 440 L 875 180 L 935 120 L 985 220 L 990 440 Z"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        {/* Second Sharp Angular Triangle Peak Behind */}
        <path d="M 935 120 L 1005 155 L 1005 230" stroke="currentColor" strokeWidth="1.8" />
        {/* Central Crease Line */}
        <line x1="935" y1="120" x2="985" y2="290" stroke="currentColor" strokeWidth="1.5" />

        {/* Fine Diagonal Hatching Lines on CFC Facets (Distinctive feature in photo) */}
        {Array.from({ length: 16 }).map((_, i) => (
          <line
            key={`cfc-h1-${i}`}
            x1="875"
            y1={195 + i * 14}
            x2={875 + (i * 6.8)}
            y2={180 + i * 14}
            stroke="currentColor"
            strokeWidth="0.8"
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={`cfc-h2-${i}`}
            x1="875"
            y1={285 + i * 12}
            x2="985"
            y2={305 + i * 10}
            stroke="currentColor"
            strokeWidth="0.8"
          />
        ))}

        {/* Low Annex Building */}
        <rect x="855" y="355" width="22" height="85" stroke="currentColor" strokeWidth="1.3" />
        <line x1="855" y1="385" x2="877" y2="385" stroke="currentColor" strokeWidth="0.9" />

        {/* ========================================================================= */}
        {/* 8. MONUMENTAL MOORISH GATEWAY (BAB) & LOGGIA */}
        {/* ========================================================================= */}
        <rect x="995" y="325" width="130" height="115" stroke="currentColor" strokeWidth="1.8" />
        {/* Grand Horseshoe Arch Portal */}
        <path
          d="M 1025 440 L 1025 375 Q 1060 345 1095 375 L 1095 440"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M 1032 440 L 1032 378 Q 1060 353 1088 378 L 1088 440"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect x="1015" y="340" width="90" height="8" stroke="currentColor" strokeWidth="1.3" />
        <line x1="995" y1="332" x2="1125" y2="332" stroke="currentColor" strokeWidth="1.3" />
        {/* Crenellations */}
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={`bab-cr-${i}`} x={1002 + i * 15} y="316" width="8" height="8" stroke="currentColor" strokeWidth="1" />
        ))}

        {/* ========================================================================= */}
        {/* 9. CASABLANCA MARINA STEPPED TOWER & SPIRE */}
        {/* ========================================================================= */}
        <rect x="1090" y="280" width="80" height="160" stroke="currentColor" strokeWidth="1.8" />
        <rect x="1105" y="240" width="55" height="40" stroke="currentColor" strokeWidth="1.5" />
        <rect x="1120" y="215" width="30" height="25" stroke="currentColor" strokeWidth="1.3" />
        {/* Floor Ribs */}
        <line x1="1090" y1="305" x2="1170" y2="305" stroke="currentColor" strokeWidth="0.9" />
        <line x1="1090" y1="330" x2="1170" y2="330" stroke="currentColor" strokeWidth="0.9" />
        <line x1="1090" y1="355" x2="1170" y2="355" stroke="currentColor" strokeWidth="0.9" />
        <line x1="1090" y1="380" x2="1170" y2="380" stroke="currentColor" strokeWidth="0.9" />
        {/* Tall Antenna Spire */}
        <line x1="1135" y1="215" x2="1135" y2="140" stroke="currentColor" strokeWidth="2" />
        <line x1="1130" y1="155" x2="1140" y2="155" stroke="currentColor" strokeWidth="1.1" />

        {/* Flag on Marina */}
        <line x1="1185" y1="370" x2="1185" y2="315" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M 1185 315 Q 1197 308 1209 319 L 1209 331 Q 1197 320 1185 327 Z"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="currentColor"
          fillOpacity="0.08"
        />

        {/* ---------------- 10. TRADITIONAL BELFRY / SQUARE TOWER ---------------- */}
        <rect x="1195" y="320" width="50" height="120" stroke="currentColor" strokeWidth="1.6" />
        <path d="M 1205 355 L 1205 338 Q 1220 330 1235 338 L 1235 355" stroke="currentColor" strokeWidth="1.1" />
        {Array.from({ length: 4 }).map((_, i) => (
          <line
            key={`belfry-st-${i}`}
            x1={1203 + i * 11}
            y1="370"
            x2={1203 + i * 11}
            y2="435"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="3 3"
          />
        ))}

        {/* ---------------- 11. ART DECO RESIDENTIAL PALACE (FAR RIGHT) ---------------- */}
        <rect x="1255" y="330" width="145" height="110" stroke="currentColor" strokeWidth="1.8" />
        <line x1="1255" y1="350" x2="1400" y2="350" stroke="currentColor" strokeWidth="1.2" />
        <line x1="1255" y1="385" x2="1400" y2="385" stroke="currentColor" strokeWidth="1" />
        <line x1="1255" y1="415" x2="1400" y2="415" stroke="currentColor" strokeWidth="1" />

        {/* 4 Windows Rows */}
        {Array.from({ length: 4 }).map((_, col) => (
          <g key={`win-col-r-${col}`}>
            <rect x={1268 + col * 32} y="358" width="18" height="19" stroke="currentColor" strokeWidth="1" />
            <rect x={1268 + col * 32} y="392" width="18" height="19" stroke="currentColor" strokeWidth="1" />
            <rect x={1268 + col * 32} y="420" width="18" height="18" stroke="currentColor" strokeWidth="1" />
          </g>
        ))}
        {/* Dentils */}
        {Array.from({ length: 11 }).map((_, i) => (
          <rect key={`dentil-r-${i}`} x={1262 + i * 12} y="335" width="7" height="5" stroke="currentColor" strokeWidth="0.9" />
        ))}
      </svg>
    </div>
  );
};
