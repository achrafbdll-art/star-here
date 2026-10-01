import React, { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle2, ShieldCheck } from "lucide-react";
import { Language } from "../types";

interface FooterPrestigeProps {
  language: Language;
  onNavigate: (tab: any) => void;
  onOpenEstimate: () => void;
}

export const FooterPrestige: React.FC<FooterPrestigeProps> = ({
  language,
  onNavigate,
  onOpenEstimate,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "newsletter_vip",
          fullName: "Souscripteur Newsletter",
          email: newsletterEmail,
          message: "Inscription à la lettre d'investissement VIP off-market Maroc.",
        }),
      });
      setNewsletterSubscribed(true);
    } catch {
      setNewsletterSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#F7F5EE] text-stone-700 border-t border-stone-200 text-xs">
      
      {/* Top Banner Newsletter (Light Luxury Finish) */}
      <div className="border-b border-stone-200 bg-[#EFECE3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C6D37] block mb-1">
              Accès Privilégié & Off-Market
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase text-stone-950">
              Recevez les avant-premières de nos programmes neufs
            </h3>
            <p className="text-stone-600 text-xs mt-1">
              Brochures confidentielles, grilles tarifaires de lancement et analyses du marché marocain.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {newsletterSubscribed ? (
              <div className="flex items-center gap-2 text-emerald-700 font-bold bg-white px-4 py-2.5 rounded-xl border border-emerald-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Merci de votre inscription à notre cercle d'investisseurs.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-md w-full">
                <input
                  type="email"
                  required
                  placeholder="Votre adresse e-mail *"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#B38B4D] w-64 sm:w-80 shadow-xs"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0C0F17] hover:bg-stone-800 text-white font-bold uppercase tracking-wider text-xs whitespace-nowrap transition-colors shadow-xs"
                >
                  S'inscrire
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Col 1: Brand & Identity */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#D4AF37] to-[#8C6D37] flex items-center justify-center font-serif text-black font-black text-sm shadow-xs">
              N·S
            </div>
            <div>
              <span className="font-serif tracking-widest text-base font-bold text-stone-950 uppercase block">
                NUMA & SAHAM
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C6D37] block -mt-1 font-sans font-bold">
                PRESTIGE IMMOBILIER
              </span>
            </div>
          </div>

          <p className="text-stone-600 font-light leading-relaxed max-w-sm">
            Plateforme immobilière de référence au Maroc. Commercialisation de projets neufs de prestige, vente et location résidentielle haut standing, gestion hôtelière 100% autonome et architecture d'intérieur sur-mesure.
          </p>

          <div className="pt-2 text-stone-800 space-y-1 font-medium">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#8C6D37]" />
              <span>Standard Agence : +212 5 22 48 00 00</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#8C6D37]" />
              <span>prestige@numasaham.ma</span>
            </div>
          </div>
        </div>

        {/* Col 2: Navigation rapide */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-stone-950 text-xs uppercase tracking-wider">
            Expertises
          </h4>
          <ul className="space-y-2 font-normal text-stone-600">
            <li>
              <button onClick={() => onNavigate("projets-neufs")} className="hover:text-stone-950 transition-colors">
                Projets Neufs & VEFA
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("properties")} className="hover:text-stone-950 transition-colors">
                Ventes & Achats de Biens
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("services")} className="hover:text-stone-950 transition-colors">
                Location Longue Durée
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("how-it-works")} className="hover:text-stone-950 transition-colors">
                Aparthotels & Courte Durée
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("services")} className="hover:text-stone-950 transition-colors">
                Aménagement d'Intérieur
              </button>
            </li>
            <li>
              <button onClick={onOpenEstimate} className="text-[#8C6D37] hover:underline font-bold">
                Simulateur d'Estimation
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Agences Régionales */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-stone-950 text-xs uppercase tracking-wider">
            Nos Agences
          </h4>
          <ul className="space-y-2.5 font-normal text-[11px] text-stone-600">
            <li>
              <strong className="text-stone-900 block font-semibold">Casablanca (Siège)</strong>
              <span>185 Boulevard d'Anfa, Quartier Racine</span>
            </li>
            <li>
              <strong className="text-stone-900 block font-semibold">Marrakech</strong>
              <span>Avenue Mohammed VI, Hivernage</span>
            </li>
            <li>
              <strong className="text-stone-900 block font-semibold">Tanger</strong>
              <span>Baie de Malabata, Marina Bay Tower</span>
            </li>
            <li>
              <strong className="text-stone-900 block font-semibold">Rabat</strong>
              <span>Avenue Mehdi Ben Barka, Souissi</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Garanties & Juridique */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-stone-950 text-xs uppercase tracking-wider">
            Garanties
          </h4>
          <ul className="space-y-2 font-normal text-[11px] text-stone-600">
            <li className="flex items-center gap-1.5 text-stone-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Garantie Financière d'Achèvement (GFA)</span>
            </li>
            <li className="flex items-center gap-1.5 text-stone-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Titres fonciers ANCFCC certifiés</span>
            </li>
            <li className="flex items-center gap-1.5 text-stone-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Notaires agréés Cour d'Appel</span>
            </li>
            <li className="flex items-center gap-1.5 text-stone-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Protection des données CNDP</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-stone-200 py-6 text-stone-500 text-[11px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Numa & Saham Prestige Immobilier Maroc. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-800 cursor-pointer">Mentions Légales</span>
            <span>·</span>
            <span className="hover:text-stone-800 cursor-pointer">Politique de Confidentialité</span>
            <span>·</span>
            <span className="hover:text-stone-800 cursor-pointer">Honoraires & Barème</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
