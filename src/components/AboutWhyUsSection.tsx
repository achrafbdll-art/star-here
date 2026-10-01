import React, { useState } from "react";
import { ArrowRight, Sparkles, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { Language } from "../types";
import { CasablancaSkylineBg } from "./CasablancaSkylineBg";

interface AboutWhyUsSectionProps {
  language: Language;
  onExploreMore: () => void;
  onOpenScheduleVisit: () => void;
}

export const AboutWhyUsSection: React.FC<AboutWhyUsSectionProps> = ({
  language,
  onExploreMore,
  onOpenScheduleVisit,
}) => {
  const [showStoryModal, setShowStoryModal] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-white py-16 sm:py-24 border-b border-stone-200/80 overflow-hidden"
      style={{ perspective: 1200 }}
    >
      
      {/* ================= 3D CONTINUOUS SCROLLING CASABLANCA SKYLINE BACKGROUND ================= */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none select-none flex items-end justify-start overflow-hidden h-[300px] sm:h-[400px] lg:h-[460px] opacity-90 [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_100%)]"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 4}deg) translateZ(10px)`,
          transition: "transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        {/* Layer 1: Distant 3D Background Skyline (Slow Continuous Drift) */}
        <motion.div
          animate={{ x: [0, -1440] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 80 }}
          className="absolute inset-x-0 bottom-3 flex items-end w-[2880px] text-stone-300/80 scale-[0.95] origin-bottom will-change-transform"
          style={{ transform: "translateZ(-30px)" }}
        >
          <CasablancaSkylineBg className="w-[1440px] shrink-0 h-[280px] sm:h-[370px] lg:h-[420px]" />
          <CasablancaSkylineBg className="w-[1440px] shrink-0 h-[280px] sm:h-[370px] lg:h-[420px]" />
        </motion.div>

        {/* Layer 2: Main Foreground 3D Skyline (Faithful to photo drawing, Continuous Drift) */}
        <motion.div
          animate={{ x: [0, -1440] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 50 }}
          className="relative flex items-end w-[2880px] text-stone-850 will-change-transform"
          style={{ transform: "translateZ(15px)" }}
        >
          <CasablancaSkylineBg className="w-[1440px] shrink-0 h-[300px] sm:h-[400px] lg:h-[460px]" />
          <CasablancaSkylineBg className="w-[1440px] shrink-0 h-[300px] sm:h-[400px] lg:h-[460px]" />
        </motion.div>
      </div>

      {/* Floating 3D Indicator Badge in bottom-left */}
      <div className="absolute bottom-3 left-4 z-20 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-stone-200/80 text-[10px] font-bold text-stone-600 shadow-xs pointer-events-none select-none">
        <Compass className="w-3.5 h-3.5 text-[#0066FF] animate-spin" style={{ animationDuration: "12s" }} />
        <span>Casablanca 3D Panorama Défilant</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= EDITORIAL SECTION ALIGNED WITH SITE CHARTER ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Bold Editorial Typography in Site Charter (stone-950 + #0066FF accent) */}
          <div className="lg:col-span-7 bg-white/70 backdrop-blur-[1.5px] p-4 sm:p-6 rounded-3xl">
            
            {/* Kicker in copper/terracotta (#C05621) matching NOS EXPERTISES */}
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#C05621] block mb-3">
              {language === "fr" ? "NOTRE IDENTITÉ" : language === "en" ? "OUR IDENTITY" : "هويتنا"}
            </span>

            <h2 className="font-sans font-black tracking-tight text-stone-950 text-4xl sm:text-6xl lg:text-7xl xl:text-[80px] leading-[1.05] select-none uppercase">
              {language === "fr" ? (
                <>
                  Qui nous <br />
                  sommes<span className="text-[#0066FF]">.</span>
                </>
              ) : language === "en" ? (
                <>
                  Who we <br />
                  are<span className="text-[#0066FF]">.</span>
                </>
              ) : (
                <>
                  من <br />
                  نحن<span className="text-[#0066FF]">.</span>
                </>
              )}
            </h2>
          </div>

          {/* Right Column: Editorial Paragraph & Signature Pill Button with Electric Blue Accent */}
          <div className="lg:col-span-5 space-y-7 bg-white/80 backdrop-blur-[2px] p-6 sm:p-8 rounded-3xl border border-stone-200/60 shadow-xs">
            
            <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
              {language === "fr" ? (
                <>
                  <strong className="font-extrabold text-stone-950">Agent immobilier de référence</strong> au Maroc, nous vous garantissons une{" "}
                  <strong className="font-extrabold text-stone-950">sécurité juridique absolue</strong> et un{" "}
                  <strong className="font-extrabold text-[#0066FF]">accompagnement personnalisé d'experts</strong> à chaque étape de votre achat, vente ou investissement.
                </>
              ) : language === "en" ? (
                <>
                  Your <strong className="font-extrabold text-stone-950">trusted real estate agency</strong> in Morocco, providing{" "}
                  <strong className="font-extrabold text-stone-950">absolute legal security</strong> and{" "}
                  <strong className="font-extrabold text-[#0066FF]">expert bespoke guidance</strong> at every stage of your purchase, sale, or investment.
                </>
              ) : (
                <>
                  <strong className="font-extrabold text-stone-950">وكيلكم العقاري المعتمد</strong> في المغرب، نضمن لكم{" "}
                  <strong className="font-extrabold text-stone-950">الأمان القانوني الكامل</strong> و{" "}
                  <strong className="font-extrabold text-[#0066FF]">مرافقة شخصية متكاملة</strong> في كل مرحلة من مراحل مشروعكم.
                </>
              )}
            </p>

            {/* Signature CTA Pill Button (Styled with site's palette: stone-900 border & electric blue arrow) */}
            <div>
              <button
                type="button"
                onClick={() => setShowStoryModal(true)}
                className="group inline-flex items-center justify-between gap-6 pl-6 pr-2 py-2 rounded-full border border-stone-900 hover:border-[#0066FF] bg-white hover:bg-stone-50 transition-all duration-200 shadow-sm cursor-pointer"
              >
                <span className="font-bold text-xs sm:text-sm uppercase tracking-wider text-stone-950 group-hover:text-[#0066FF] transition-colors">
                  {language === "fr" ? "En savoir plus" : language === "en" ? "Learn more" : "اكتشف المزيد"}
                </span>

                {/* Electric Blue Circular Badge with White Arrow */}
                <span className="w-10 h-10 rounded-full bg-[#0066FF] group-hover:bg-[#0052CC] group-hover:scale-105 flex items-center justify-center text-white transition-all duration-200 shadow-md shrink-0">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* ================= MODAL DE DÉCOUVERTE DÉTAILLÉE ================= */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setShowStoryModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-sm transition-colors"
            >
              ✕
            </button>

            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#C05621] block mb-2">
              Notre Mission d'Agent Immobilier
            </span>

            <h3 className="font-sans font-black text-2xl sm:text-3xl text-stone-950 mb-4 uppercase">
              Sécurité juridique, rigueur & accompagnement sur-mesure
            </h3>

            <div className="space-y-4 text-sm text-stone-600 leading-relaxed">
              <p>
                En tant qu'<strong className="text-stone-950">agent immobilier de référence au Maroc</strong>, notre priorité absolue est la <strong className="text-stone-950">sécurité juridique et financière</strong> de toutes vos opérations : vérification minutieuse des titres fonciers à la conservation, conformité cadastrale, purge des hypothèques et validation rigoureuse des actes notariés.
              </p>
              <p>
                Nous vous offrons un <strong className="text-stone-950">accompagnement personnalisé de bout en bout</strong> : définition de vos critères de recherche, sélection de biens exclusifs hors marché (off-market), négociation au juste prix, montage de dossier bancaire et suivi jusqu'à la remise des clés.
              </p>
              <p>
                Que vous recherchiez une résidence principale d'exception, un pied-à-terre ou un investissement locatif à fort rendement, bénéficiez de notre expertise locale et de notre réseau de notaires et d'experts patrimoniaux agréés.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF]" />
                <span className="text-xs font-bold text-stone-800">Conseillers & Juristes Immobiliers Agréés</span>
              </div>
              <button
                onClick={() => {
                  setShowStoryModal(false);
                  onOpenScheduleVisit();
                }}
                className="px-6 py-2.5 rounded-full bg-stone-950 hover:bg-[#0066FF] text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                Prendre rendez-vous
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
