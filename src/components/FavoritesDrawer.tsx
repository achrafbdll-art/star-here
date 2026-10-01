import React from "react";
import { X, Heart, Trash2, MessageCircle, MapPin, Eye, ArrowUpRight } from "lucide-react";
import { Property, Language } from "../types";

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Property[];
  onRemoveFavorite: (id: string) => void;
  onClearFavorites: () => void;
  onSelectProperty: (property: Property) => void;
  language: Language;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onClearFavorites,
  onSelectProperty,
  language,
}) => {
  if (!isOpen) return null;

  // Group WhatsApp inquiry
  const propertyRefs = favorites.map((f) => f.referenceCode || f.id).join(", ");
  const groupWhatsappUrl = `https://wa.me/212661000000?text=${encodeURIComponent(
    `Bonjour Numa & Saham Prestige, je souhaite des renseignements sur ma sélection de biens favoris : ${propertyRefs}.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#FAF9F5] shadow-2xl flex flex-col h-full text-stone-900 border-l border-stone-300">
        
        {/* Drawer Header (Light Theme) */}
        <div className="p-5 bg-stone-50 text-stone-900 flex items-center justify-between border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <h3 className="font-serif text-base font-bold uppercase tracking-wide text-stone-950">
              Mes Biens Favoris ({favorites.length})
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {favorites.length > 0 && (
              <button
                onClick={onClearFavorites}
                className="text-[11px] text-stone-500 hover:text-red-600 flex items-center gap-1 transition-colors font-medium"
                title="Tout effacer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Vider</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-400 hover:text-stone-900 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Content List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {favorites.length === 0 ? (
            <div className="text-center py-20 text-stone-400 space-y-3">
              <Heart className="w-12 h-12 stroke-1 mx-auto text-stone-300" />
              <p className="text-sm font-medium text-stone-600">Aucun bien enregistré dans vos favoris.</p>
              <p className="text-xs text-stone-400 max-w-xs mx-auto">
                Cliquez sur l'icône cœur sur n'importe quel appartement ou villa pour le sauvegarder dans cette liste.
              </p>
            </div>
          ) : (
            favorites.map((prop) => (
              <div
                key={prop.id}
                className="p-3 bg-white rounded-2xl border border-stone-200 shadow-sm flex gap-3 relative group"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-stone-900">
                  <img src={prop.images.hero} alt="" className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0 pr-6">
                  <div>
                    <span className="text-[9px] font-mono uppercase text-stone-400">{prop.referenceCode}</span>
                    <h4 className="font-serif font-bold text-xs text-stone-900 truncate">
                      {prop.name.fr}
                    </h4>
                    <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-[#B38B4D] shrink-0" />
                      <span className="truncate">{prop.city} ({prop.neighborhood})</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-100">
                    <span className="font-serif font-bold text-sm text-[#0C0F17]">
                      {(prop.priceDH).toLocaleString("fr-FR")} DH
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProperty(prop);
                      }}
                      className="text-[11px] font-bold text-[#B38B4D] hover:underline flex items-center gap-0.5"
                    >
                      <span>Voir</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveFavorite(prop.id)}
                  className="absolute top-3 right-3 text-stone-300 hover:text-red-500 transition-colors"
                  title="Supprimer des favoris"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Actions */}
        {favorites.length > 0 && (
          <div className="p-4 bg-white border-t border-stone-200 space-y-2">
            <a
              href={groupWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contacter pour ma sélection ({favorites.length})</span>
            </a>
          </div>
        )}

      </div>
    </div>
  );
};
