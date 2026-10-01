import React from "react";
import { X, Scale, Trash2, MapPin, Maximize2, Bed, Bath, Check, Minus, ArrowUpRight } from "lucide-react";
import { Property, Language } from "../types";

interface PropertyComparatorModalProps {
  properties: Property[];
  onClose: () => void;
  onRemoveProperty: (id: string) => void;
  onClearAll: () => void;
  onSelectProperty: (property: Property) => void;
  language: Language;
}

export const PropertyComparatorModal: React.FC<PropertyComparatorModalProps> = ({
  properties,
  onClose,
  onRemoveProperty,
  onClearAll,
  onSelectProperty,
  language,
}) => {
  if (properties.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 my-auto text-stone-900 flex flex-col max-h-[92vh]">
        
        {/* Header in Light Theme */}
        <div className="bg-stone-50 px-6 py-4 flex items-center justify-between border-b border-stone-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#B38B4D]/15 text-[#8C6D37]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold uppercase tracking-wide text-stone-950">
                Comparateur de Biens Immobiliers ({properties.length}/4)
              </h3>
              <p className="text-[11px] text-stone-500">
                Analyse comparative des caractéristiques, prix au m² et prestations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClearAll}
              className="flex items-center gap-1 text-xs text-stone-500 hover:text-red-600 transition-colors font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Vider</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto p-6 flex-1">
          <table className="w-full text-left border-collapse min-w-[700px]">
            
            {/* Properties Photo Cards Header */}
            <thead>
              <tr className="border-b border-stone-200">
                <th className="p-3 w-44 text-xs font-bold uppercase text-stone-400 font-sans">
                  Critères
                </th>
                {properties.map((prop) => (
                  <th key={prop.id} className="p-3 w-64 align-top">
                    <div className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden shadow-xs p-3 relative group">
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveProperty(prop.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-stone-600 hover:bg-red-600 hover:text-white transition-colors z-10 shadow-xs"
                        title="Retirer de la comparaison"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="h-32 rounded-xl overflow-hidden mb-2">
                        <img src={prop.images.hero} alt="" className="w-full h-full object-cover" />
                      </div>

                      <div className="text-[10px] font-mono text-stone-400 uppercase font-semibold">{prop.referenceCode}</div>
                      <h4 className="font-serif font-bold text-sm text-stone-900 line-clamp-1">{prop.name.fr}</h4>
                      <div className="font-serif font-black text-[#8C6D37] text-base mt-1">
                        {(prop.priceDH).toLocaleString("fr-FR")} DH
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          onSelectProperty(prop);
                        }}
                        className="mt-3 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[#0C0F17] hover:bg-stone-800 text-white text-[11px] font-bold uppercase tracking-wider transition-colors shadow-xs"
                      >
                        <span>Fiche</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                      </button>

                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Spec Rows */}
            <tbody className="text-xs divide-y divide-stone-100">
              
              {/* Type & Statut */}
              <tr>
                <td className="p-3 font-semibold text-stone-500 uppercase text-[11px]">Type & Statut</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3 font-medium text-stone-900">
                    <span className="capitalize">{p.propertyType}</span> · <span className="capitalize">{p.transactionType}</span>
                  </td>
                ))}
              </tr>

              {/* Localisation */}
              <tr>
                <td className="p-3 font-semibold text-stone-500 uppercase text-[11px]">Localisation</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3 text-stone-800 font-medium">
                    {p.city} ({p.neighborhood})
                  </td>
                ))}
              </tr>

              {/* Surface & Prix au m² */}
              <tr>
                <td className="p-3 font-semibold text-stone-500 uppercase text-[11px]">Surface & Prix / m²</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3">
                    <span className="font-bold text-stone-900">{p.surface} m²</span>
                    <span className="text-stone-500 block text-[11px]">
                      ≈ {Math.round(p.priceDH / p.surface).toLocaleString("fr-FR")} DH / m²
                    </span>
                  </td>
                ))}
              </tr>

              {/* Chambres & Salles de bain */}
              <tr>
                <td className="p-3 font-semibold text-stone-500 uppercase text-[11px]">Pièces</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3 text-stone-800">
                    {p.bedrooms} Chambres · {p.bathrooms} Salles de bain
                  </td>
                ))}
              </tr>

              {/* Piscine */}
              <tr>
                <td className="p-3 font-semibold text-stone-500 uppercase text-[11px]">Piscine</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3">
                    {p.pool ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                        <Check className="w-4 h-4 text-emerald-600" />
                        Oui (Privée ou Club)
                      </span>
                    ) : (
                      <span className="text-stone-400 flex items-center gap-1">
                        <Minus className="w-4 h-4" /> Non
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Terrasse */}
              <tr>
                <td className="p-3 font-semibold text-stone-500 uppercase text-[11px]">Terrasse</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3">
                    {p.terrace ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                        <Check className="w-4 h-4 text-emerald-600" />
                        Oui
                      </span>
                    ) : (
                      <span className="text-stone-400 flex items-center gap-1">
                        <Minus className="w-4 h-4" /> Non
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Parking */}
              <tr>
                <td className="p-3 font-semibold text-stone-500 uppercase text-[11px]">Parking titré</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3">
                    {p.parking ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                        <Check className="w-4 h-4 text-emerald-600" />
                        Inclus au titre
                      </span>
                    ) : (
                      <span className="text-stone-400 flex items-center gap-1">
                        <Minus className="w-4 h-4" /> Non
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Atout principal */}
              <tr>
                <td className="p-3 font-semibold text-stone-500 uppercase text-[11px]">Atout majeur</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3 text-stone-700 font-light italic">
                    {p.whySpecial?.fr ? p.whySpecial.fr[0] : "Emplacement d'exception"}
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
