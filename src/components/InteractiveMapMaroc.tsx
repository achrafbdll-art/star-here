import React, { useState } from "react";
import { MapPin, Navigation, School, Train, ShoppingBag, Waves, Hospital, Sparkles, Eye, ArrowUpRight } from "lucide-react";
import { Property, Language } from "../types";

interface InteractiveMapMarocProps {
  properties: Property[];
  language: Language;
  onSelectProperty: (property: Property) => void;
}

export const InteractiveMapMaroc: React.FC<InteractiveMapMarocProps> = ({
  properties,
  language,
  onSelectProperty,
}) => {
  const [activeCity, setActiveCity] = useState<string>("Casablanca");
  const [selectedPinId, setSelectedPinId] = useState<string | null>(properties[0]?.id || null);
  const [showPois, setShowPois] = useState<boolean>(true);
  const [poiFilter, setPoiFilter] = useState<string>("all");

  const cityCenters: Record<string, { label: string; coords: string; zoomDesc: string }> = {
    Casablanca: {
      label: "Casablanca & Littoral",
      coords: "33.5731° N, 7.5898° W",
      zoomDesc: "Axe Anfa - CFC - Dar Bouazza",
    },
    Marrakech: {
      label: "Marrakech & Palmeraie",
      coords: "31.6295° N, 7.9811° W",
      zoomDesc: "Médina Historique & Palmeraie",
    },
    Tanger: {
      label: "Tanger & Détroit",
      coords: "35.7595° N, 5.8340° W",
      zoomDesc: "Baie de Malabata & Marina",
    },
    Rabat: {
      label: "Rabat Capitale",
      coords: "34.0209° N, 6.8416° W",
      zoomDesc: "Souissi, Agdal & Ambassades",
    },
  };

  const filteredProperties = properties.filter(
    (p) => p.city.toLowerCase() === activeCity.toLowerCase()
  );

  const selectedProperty = properties.find((p) => p.id === selectedPinId) || filteredProperties[0] || properties[0];

  return (
    <div className="bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-xl text-stone-900">
      
      {/* Map Control Top Bar */}
      <div className="p-4 sm:p-6 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4 bg-stone-50/80">
        
        {/* City Segmented Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl border border-stone-300/80 overflow-x-auto">
          {Object.keys(cityCenters).map((city) => (
            <button
              key={city}
              onClick={() => {
                setActiveCity(city);
                const first = properties.find((p) => p.city.toLowerCase() === city.toLowerCase());
                if (first) setSelectedPinId(first.id);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeCity === city
                  ? "bg-white text-stone-900 font-bold shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* POI Filter Toggles */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[10px] uppercase font-bold text-stone-500 hidden sm:inline">POIs :</span>
          {[
            { id: "all", label: "Tous", icon: Sparkles },
            { id: "transport", label: "Transports / TGV", icon: Train },
            { id: "beach", label: "Plages & Mer", icon: Waves },
            { id: "school", label: "Écoles Int.", icon: School },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setPoiFilter(item.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                  poiFilter === item.id
                    ? "bg-stone-900 border-stone-900 text-white font-bold"
                    : "border-stone-200 bg-white text-stone-600 hover:text-stone-900"
                }`}
              >
                <Icon className="w-3 h-3 text-[#B38B4D]" />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Main Interactive Map Viewport & Preview Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] relative">
        
        {/* Map Canvas (Light Architectural GIS Representation) */}
        <div className="lg:col-span-8 relative bg-[#F4F3EE] overflow-hidden flex items-center justify-center p-6 select-none border-b lg:border-b-0 lg:border-r border-stone-200">
          
          {/* Architectural Grid & Contour Pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="arch-map-grid-light" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D3CBBB" strokeWidth="0.75" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#arch-map-grid-light)" />
            </svg>
          </div>

          {/* City Contour Graphic card */}
          <div className="relative w-full max-w-xl aspect-[16/10] rounded-2xl border border-stone-300/80 bg-white/90 backdrop-blur-md p-6 shadow-sm flex flex-col justify-between">
            
            {/* Top Corner Info */}
            <div className="flex items-center justify-between text-xs text-stone-600 font-mono">
              <div className="flex items-center gap-1.5 font-bold">
                <Navigation className="w-3.5 h-3.5 text-[#8C6D37]" />
                <span>{cityCenters[activeCity]?.coords}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-[10px] text-stone-700 font-semibold">
                {cityCenters[activeCity]?.zoomDesc}
              </span>
            </div>

            {/* Interactive Pins Floating in Geographic Spatial Alignment */}
            <div className="relative w-full h-64 flex items-center justify-around">
              
              {filteredProperties.map((p, idx) => {
                const isSelected = selectedPinId === p.id;
                const offsets = [
                  { top: "25%", left: "20%" },
                  { top: "45%", left: "55%" },
                  { top: "70%", left: "35%" },
                  { top: "30%", left: "75%" },
                ];
                const pos = offsets[idx % offsets.length];

                return (
                  <div
                    key={p.id}
                    style={{ position: "absolute", top: pos.top, left: pos.left }}
                    className="transform -translate-x-1/2 -translate-y-1/2 z-20 group"
                  >
                    <button
                      onClick={() => setSelectedPinId(p.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs shadow-md transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#0C0F17] text-white scale-110 ring-4 ring-[#B38B4D]/30 z-30 font-extrabold"
                          : "bg-white border-2 border-[#B38B4D] text-stone-900 hover:scale-105"
                      }`}
                    >
                      <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-[#D4AF37]" : "text-[#B38B4D]"}`} />
                      <span>{(p.priceDH / 1000000).toFixed(1)} MDH</span>
                    </button>

                    {/* Pin Neighborhood tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2.5 py-1 rounded-lg bg-stone-900 text-[10px] text-white whitespace-nowrap pointer-events-none shadow-md z-40">
                      {p.name.fr} · {p.neighborhood}
                    </div>
                  </div>
                );
              })}

              {/* Sample Nearby POI markers matching filter */}
              {showPois && (
                <>
                  {(poiFilter === "all" || poiFilter === "transport") && (
                    <div style={{ position: "absolute", top: "20%", left: "50%" }} className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-semibold">
                      <Train className="w-2.5 h-2.5" />
                      <span>Gare TGV / Tramway</span>
                    </div>
                  )}

                  {(poiFilter === "all" || poiFilter === "beach") && (
                    <div style={{ position: "absolute", top: "15%", left: "80%" }} className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-[10px] font-semibold">
                      <Waves className="w-2.5 h-2.5" />
                      <span>Promenade Plage</span>
                    </div>
                  )}

                  {(poiFilter === "all" || poiFilter === "school") && (
                    <div style={{ position: "absolute", top: "80%", left: "70%" }} className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-[10px] font-semibold">
                      <School className="w-2.5 h-2.5" />
                      <span>Écoles Internationales</span>
                    </div>
                  )}
                </>
              )}

            </div>

            {/* Bottom Scale & Orientation Note */}
            <div className="flex items-center justify-between text-[10px] text-stone-500 border-t border-stone-200 pt-2 font-mono">
              <span>Échelle : 1:25 000</span>
              <span>SIG Immobilier Saham & Numa</span>
            </div>

          </div>

        </div>

        {/* Selected Property Preview Sidebar (Light Theme) */}
        <div className="lg:col-span-4 bg-white p-6 flex flex-col justify-between">
          
          {selectedProperty ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6D37]">
                  Repère Sélectionné
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-600 font-bold">
                  {selectedProperty.referenceCode || "NUMA"}
                </span>
              </div>

              {/* Photo Thumbnail */}
              <div className="relative h-44 rounded-2xl overflow-hidden border border-stone-200 group shadow-xs">
                <img
                  src={selectedProperty.images.hero}
                  alt={selectedProperty.name.fr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 bg-stone-900/85 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-white shadow-xs">
                  {(selectedProperty.priceDH).toLocaleString("fr-FR")} DH
                </div>
              </div>

              {/* Title & Neighborhood */}
              <div>
                <h4 className="font-serif text-base font-bold text-stone-900">
                  {selectedProperty.name[language] || selectedProperty.name.fr}
                </h4>
                <div className="flex items-center gap-1 text-xs text-stone-600 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#B38B4D]" />
                  <span>{selectedProperty.city} · {selectedProperty.neighborhood}</span>
                </div>
              </div>

              {/* Surface & Specs */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-stone-100 text-center text-xs">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Surface</span>
                  <span className="font-bold text-stone-900">{selectedProperty.surface} m²</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Chambres</span>
                  <span className="font-bold text-stone-900">{selectedProperty.bedrooms}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Bains</span>
                  <span className="font-bold text-stone-900">{selectedProperty.bathrooms}</span>
                </div>
              </div>

              {/* Key Highlight */}
              {selectedProperty.whySpecial && selectedProperty.whySpecial.fr && (
                <p className="text-xs text-stone-600 font-light italic bg-stone-50 p-3 rounded-xl border border-stone-100">
                  "{selectedProperty.whySpecial.fr[0]}"
                </p>
              )}

              {/* Action Button */}
              <button
                onClick={() => onSelectProperty(selectedProperty)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0C0F17] hover:bg-stone-800 text-white font-bold uppercase tracking-wider text-xs transition-all shadow-md active:scale-95"
              >
                <Eye className="w-4 h-4 text-[#D4AF37]" />
                <span>Ouvrir la fiche complète</span>
              </button>
            </div>
          ) : (
            <div className="text-center py-12 text-stone-400 text-xs">
              Sélectionnez un marqueur sur la carte pour afficher les détails du bien.
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-stone-100 text-[11px] text-stone-500 flex items-center justify-between">
            <span>{filteredProperties.length} biens localisés à {activeCity}</span>
            <span className="text-[#8C6D37] font-bold">Maroc</span>
          </div>

        </div>

      </div>

    </div>
  );
};
