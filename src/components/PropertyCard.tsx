import React from "react";
import { Heart, Scale, MapPin, Maximize2, Bed, Bath, ArrowUpRight } from "lucide-react";
import { Property, Language } from "../types";

interface PropertyCardProps {
  property: Property;
  language: Language;
  onSelect: (prop: Property) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  isCompared: boolean;
  onToggleCompare: (prop: Property, e: React.MouseEvent) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  language,
  onSelect,
  isFavorite,
  onToggleFavorite,
  isCompared,
  onToggleCompare,
}) => {
  // Format price in DH and EUR
  const formatPriceDH = (val: number, unit?: string) => {
    const formatted = val.toLocaleString("fr-FR");
    if (unit === "mois") return `${formatted} DH / mois`;
    if (unit === "nuit") return `${formatted} DH / nuit`;
    return `${formatted} DH`;
  };

  const getApproxEur = (valDH: number) => {
    // 1 EUR ≈ 10.7 MAD
    const eur = Math.round(valDH / 10.7);
    return eur.toLocaleString("fr-FR");
  };

  return (
    <div
      onClick={() => onSelect(property)}
      className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Property Visual Card Header */}
      <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-900">
        <img
          src={property.images.hero}
          alt={property.name[language] || property.name.fr}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        
        {/* Subtle gradient scrim on bottom of image for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

        {/* Top Badges Bar */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Transaction Type Tag */}
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md shadow-md ${
              property.transactionType === "projet-neuf"
                ? "bg-[#B38B4D] text-black font-extrabold"
                : property.transactionType === "vente"
                ? "bg-stone-900/90 text-white border border-stone-700"
                : "bg-emerald-950/90 text-emerald-300 border border-emerald-700/50"
            }`}>
              {property.transactionType === "projet-neuf"
                ? (language === "fr" ? "Projet Neuf" : "New Development")
                : property.transactionType === "vente"
                ? (language === "fr" ? "À Vendre" : "For Sale")
                : (language === "fr" ? "À Louer" : "For Rent")}
            </span>

            {/* If New */}
            {property.isNew && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-white/95 text-stone-900 shadow-sm">
                {language === "fr" ? "Nouveau" : "New"}
              </span>
            )}
          </div>

          {/* Interactive Fast Actions (Favorites & Compare) */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            
            {/* Compare Toggle */}
            <button
              type="button"
              onClick={(e) => onToggleCompare(property, e)}
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                isCompared
                  ? "bg-[#B38B4D] text-black ring-2 ring-white"
                  : "bg-black/50 hover:bg-black/80 text-white"
              }`}
              title={isCompared ? "Retirer du comparateur" : "Ajouter au comparateur"}
              aria-label="Comparer"
            >
              <Scale className="w-3.5 h-3.5" />
            </button>

            {/* Favorite Toggle */}
            <button
              type="button"
              onClick={(e) => onToggleFavorite(property.id, e)}
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                isFavorite
                  ? "bg-red-500 text-white scale-110"
                  : "bg-black/50 hover:bg-black/80 text-white hover:text-red-400"
              }`}
              title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              aria-label="Favoris"
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? "fill-white" : ""}`} />
            </button>

          </div>

        </div>

        {/* Bottom Image Overlay: Reference & Neighborhood */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white pointer-events-none">
          <div className="flex items-center gap-1 text-[11px] font-medium text-stone-200 drop-shadow">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span className="font-semibold text-white">{property.city}</span>
            <span>·</span>
            <span className="text-stone-300 truncate max-w-[140px]">{property.neighborhood}</span>
          </div>

          {property.referenceCode && (
            <span className="text-[9px] font-mono uppercase bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-stone-300 border border-stone-700/50">
              {property.referenceCode}
            </span>
          )}
        </div>

      </div>

      {/* Property Details Content */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-white text-stone-900">
        
        <div>
          {/* Property Title */}
          <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#B38B4D] transition-colors leading-snug line-clamp-1">
            {property.name[language] || property.name.fr}
          </h3>

          {/* Short Description */}
          <p className="mt-1.5 text-xs text-stone-500 line-clamp-2 leading-relaxed font-light">
            {property.description[language] || property.description.fr}
          </p>

          {/* Key Specs Pills: Surface, Bedrooms, Bathrooms */}
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600 font-medium">
            <div className="flex items-center gap-1" title="Surface habitable">
              <Maximize2 className="w-3.5 h-3.5 text-stone-400" />
              <span>{property.surface} m²</span>
            </div>

            <div className="flex items-center gap-1" title="Chambres">
              <Bed className="w-3.5 h-3.5 text-stone-400" />
              <span>{property.bedrooms} {language === "fr" ? "ch." : "bd."}</span>
            </div>

            <div className="flex items-center gap-1" title="Salles de bain">
              <Bath className="w-3.5 h-3.5 text-stone-400" />
              <span>{property.bathrooms} {language === "fr" ? "sdb" : "ba"}</span>
            </div>
          </div>
        </div>

        {/* Pricing & Detail Action Button */}
        <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <div className="font-serif font-black text-lg sm:text-xl text-[#0C0F17] tracking-tight">
              {formatPriceDH(property.priceDH, property.priceUnit)}
            </div>
            <div className="text-[10px] text-stone-400 font-mono">
              ≈ {getApproxEur(property.priceDH)} €
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#B38B4D] group-hover:text-[#8C6D37] group-hover:translate-x-0.5 transition-all">
            <span>{language === "fr" ? "Consulter" : "Details"}</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

      </div>
    </div>
  );
};
