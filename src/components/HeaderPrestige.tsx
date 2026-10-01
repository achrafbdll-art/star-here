import React, { useState } from "react";
import { Heart, Scale, Menu, X } from "lucide-react";
import { Language } from "../types";

interface HeaderPrestigeProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  comparisonCount: number;
  onOpenComparison: () => void;
  onOpenEstimate: () => void;
  onOpenScheduleVisit: () => void;
}

export const HeaderPrestige: React.FC<HeaderPrestigeProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  favoritesCount,
  onOpenFavorites,
  comparisonCount,
  onOpenComparison,
  onOpenEstimate,
  onOpenScheduleVisit,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: "home",
      label: language === "fr" ? "ACCUEIL" : language === "en" ? "HOME" : "الرئيسية",
      isMultiLine: false,
    },
    {
      id: "properties",
      label: language === "fr" ? "DESTINATIONS" : language === "en" ? "DESTINATIONS" : "الوجهات",
      isMultiLine: false,
    },
    {
      id: "how-it-works",
      line1: language === "fr" ? "COMMENT ÇA" : language === "en" ? "HOW IT" : "كيف",
      line2: language === "fr" ? "MARCHE" : language === "en" ? "WORKS" : "يعمل",
      isMultiLine: true,
    },
    {
      id: "services",
      line1: language === "fr" ? "SERVICES &" : language === "en" ? "SERVICES &" : "خدمات و",
      line2: language === "fr" ? "EXPÉRIENCES" : language === "en" ? "EXPERIENCES" : "تجارب",
      isMultiLine: true,
    },
    {
      id: "projets-neufs",
      line1: language === "fr" ? "À" : language === "en" ? "ABOUT" : "عن",
      line2: language === "fr" ? "PROPOS" : language === "en" ? "US" : "الشركة",
      isMultiLine: true,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200/90 text-stone-900 transition-all shadow-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo styled exactly as photo (staystar.) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab("home")}
            className="flex items-baseline text-left focus:outline-none group select-none"
            aria-label="staystar accueil"
          >
            <span className="font-sans font-black text-2xl sm:text-[28px] tracking-tight text-black lowercase">
              staystar
            </span>
            <span className="font-sans font-black text-2xl sm:text-[28px] text-[#C05621] leading-none">
              .
            </span>
          </button>
        </div>

        {/* Center: Desktop Navigation Bar matching image.png (Shifted a bit more to the right) */}
        <nav className="hidden xl:flex items-center gap-6 lg:gap-8 translate-x-6 xl:translate-x-12">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;

            // If active and single line like "ACCUEIL" in image.png: light pink capsule badge
            if (isActive && !item.isMultiLine) {
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="px-4 py-1.5 rounded-full bg-[#FACCD1] text-black font-extrabold text-xs uppercase tracking-wider transition-transform active:scale-95 shadow-xs"
                >
                  {item.label}
                </button>
              );
            }

            if (!item.isMultiLine) {
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="text-stone-900 hover:text-black font-extrabold text-xs uppercase tracking-wider transition-colors px-2 py-1"
                >
                  {item.label}
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 text-stone-900 hover:text-black font-extrabold text-xs uppercase tracking-wider transition-all px-2 py-1 ${
                  isActive ? "text-[#C05621]" : ""
                }`}
              >
                <div className="flex flex-col items-center leading-[1.15]">
                  <span className="text-[11px] font-extrabold tracking-wider">{item.line1}</span>
                  <span className="text-[11px] font-extrabold tracking-wider">{item.line2}</span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Espace Client + Language Selector + Favorites/Comparator indicators */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Subtle comparison button with badge */}
          {comparisonCount > 0 && (
            <button
              onClick={onOpenComparison}
              className="relative p-2 text-stone-700 hover:text-black hover:bg-stone-100 rounded-full transition-colors border border-stone-200"
              title="Biens au comparateur"
              aria-label="Comparer les biens"
            >
              <Scale className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 bg-black text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {comparisonCount}
              </span>
            </button>
          )}

          {/* Subtle favorites button with badge */}
          {favoritesCount > 0 && (
            <button
              onClick={onOpenFavorites}
              className="relative p-2 text-stone-700 hover:text-black hover:bg-stone-100 rounded-full transition-colors border border-stone-200"
              title="Mes favoris"
              aria-label="Mes favoris"
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span className="absolute -top-1 -right-1 bg-black text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            </button>
          )}

          {/* WhatsApp Direct Icon Button (replacing ESPACE CLIENT as requested) */}
          <a
            href="https://wa.me/212661000000?text=Bonjour%20Staystar,%20je%20souhaite%20des%20informations%20sur%20vos%20appartements."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white transition-all duration-200 active:scale-95 shadow-xs hover:shadow-md shrink-0"
            title="Contacter sur WhatsApp"
            aria-label="Contacter sur WhatsApp"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c1.002.576 1.737.818 2.806.818 3.181 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.769-5.767-5.77zm3.364 8.163c-.14.394-.712.727-1.077.777-.365.05-.838.077-2.482-.603-1.644-.68-2.693-2.355-2.774-2.464-.08-.11-.664-.882-.664-1.682 0-.8.419-1.196.568-1.355.15-.16.326-.2.435-.2.11 0 .22.001.316.006.103.005.241-.039.377.288.14.336.478 1.164.52 1.25.042.086.07.186.012.302-.058.116-.088.188-.174.29-.086.102-.18.228-.258.306-.086.086-.176.18-.076.352.1.172.443.731.95 1.183.654.582 1.205.763 1.378.849.172.086.273.072.375-.044.102-.116.438-.51.555-.685.117-.174.234-.146.393-.087.16.058 1.01.477 1.184.564.174.087.29.13.333.203.043.073.043.423-.097.817zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.174L2 22l4.981-1.306A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.154c-1.637 0-3.155-.494-4.42-1.341l-.317-.212-2.969.779.792-2.894-.233-.37A8.125 8.125 0 013.846 12C3.846 7.503 7.503 3.846 12 3.846S20.154 7.503 20.154 12 16.497 20.154 12 20.154z" />
            </svg>
          </a>

          {/* Language Selector Pill Capsule styled exactly as image.png */}
          <div className="flex items-center bg-stone-100/90 border border-stone-200 rounded-full p-1 text-[11px] font-bold">
            <button
              onClick={() => setLanguage("fr")}
              className={`px-2.5 py-1 rounded-full transition-all duration-150 ${
                language === "fr"
                  ? "bg-black text-white font-extrabold shadow-xs"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              FR
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 rounded-full transition-all duration-150 ${
                language === "en"
                  ? "bg-black text-white font-extrabold shadow-xs"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("ar")}
              className={`px-2 py-1 rounded-full transition-all duration-150 ${
                language === "ar"
                  ? "bg-black text-white font-extrabold shadow-xs"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              AR
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-stone-800 hover:text-black rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-stone-200 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200 shadow-xl">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const displayLabel = item.isMultiLine
                ? `${item.line1} ${item.line2}`
                : item.label;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 py-2 px-3 rounded-xl font-bold text-xs uppercase tracking-wider text-left transition-colors ${
                    isActive
                      ? "bg-[#FACCD1] text-black font-extrabold"
                      : "text-stone-800 hover:bg-stone-100"
                  }`}
                >
                  <span>{displayLabel}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-stone-200 flex flex-col gap-2">
            <a
              href="https://wa.me/212661000000?text=Bonjour%20Staystar,%20je%20souhaite%20des%20informations%20sur%20vos%20appartements."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-full bg-[#25D366] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c1.002.576 1.737.818 2.806.818 3.181 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.769-5.767-5.77zm3.364 8.163c-.14.394-.712.727-1.077.777-.365.05-.838.077-2.482-.603-1.644-.68-2.693-2.355-2.774-2.464-.08-.11-.664-.882-.664-1.682 0-.8.419-1.196.568-1.355.15-.16.326-.2.435-.2.11 0 .22.001.316.006.103.005.241-.039.377.288.14.336.478 1.164.52 1.25.042.086.07.186.012.302-.058.116-.088.188-.174.29-.086.102-.18.228-.258.306-.086.086-.176.18-.076.352.1.172.443.731.95 1.183.654.582 1.205.763 1.378.849.172.086.273.072.375-.044.102-.116.438-.51.555-.685.117-.174.234-.146.393-.087.16.058 1.01.477 1.184.564.174.087.29.13.333.203.043.073.043.423-.097.817zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.174L2 22l4.981-1.306A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.154c-1.637 0-3.155-.494-4.42-1.341l-.317-.212-2.969.779.792-2.894-.233-.37A8.125 8.125 0 013.846 12C3.846 7.503 7.503 3.846 12 3.846S20.154 7.503 20.154 12 16.497 20.154 12 20.154z" />
              </svg>
              <span>WhatsApp Direct</span>
            </a>

            <button
              onClick={() => {
                onOpenScheduleVisit();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-full bg-stone-900 text-white font-extrabold text-xs uppercase tracking-wider hover:bg-stone-800 transition-colors text-center"
            >
              {language === "fr" ? "PRENDRE RENDEZ-VOUS" : "BOOK A VISIT"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
