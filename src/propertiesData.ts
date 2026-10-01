import { Property } from "./types";

export const STATIC_PROPERTIES: Property[] = [
  {
    id: "residence-vert-marine",
    referenceCode: "SHM-CAS-001",
    name: {
      fr: "Résidence Vert Marine & Spa",
      en: "Vert Marine Residence & Spa",
      ar: "إقامة فير مارين وسبا"
    },
    city: "Casablanca",
    neighborhood: "Dar Bouazza / Anfa Coast",
    description: {
      fr: "Inspiré des plus grands programmes résidentiels de Saham Immobilier, Vert Marine offre un cadre de vie idyllique face à l'océan Atlantique. Appartements d'exception aux lignes architecturales épurées, double orientation, terrasses suspendues, jardins paysagers privatifs et club house avec spa.",
      en: "Inspired by Saham Immobilier's most iconic residential developments, Vert Marine offers an idyllic oceanfront lifestyle. Exceptional residences with pure architectural lines, dual orientation, hanging terraces, landscaped gardens, and a private clubhouse with spa.",
      ar: "مستوحى من أرقى مشاريع سَهام العقارية، يقدم فير مارين أسلوب حياة استثنائي في مواجهة المحيط الأطلسي. شقق فاخرة بتصميم معماري نقي، شرفات معلقة، حدائق خاصة ونادٍ صحي متكامل."
    },
    priceDH: 2450000,
    pricePerNight: 120,
    priceUnit: "total",
    transactionType: "projet-neuf",
    propertyType: "appartement",
    surface: 145,
    bedrooms: 3,
    bathrooms: 2,
    parking: true,
    pool: true,
    terrace: true,
    elevator: true,
    furnished: false,
    isNew: true,
    isFeatured: true,
    deliveryDate: "T4 2026 - Travaux en cours",
    coordinates: { lat: 33.5320, lng: -7.7850 },
    rating: 4.9,
    amenities: ["vue-mer", "piscine-club", "spa-wellness", "parking-sous-sol", "concierge-247", "domotique", "espace-enfants", "terrasse-panoramique"],
    seoKeywords: ["Projet neuf Casablanca", "Appartement vue mer Casablanca", "Immobilier de prestige Dar Bouazza", "Résidence haut standing Maroc"],
    images: {
      hero: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      details: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
      ]
    },
    localHighlights: {
      fr: ["Accès direct à la plage et promenade côtière", "À 15 minutes du Morocco Mall et du Boulevard d'Anfa", "Écoles internationales et clubs nautiques"],
      en: ["Direct access to beach and coastal promenade", "15 minutes to Morocco Mall and Anfa Boulevard", "International schools and yacht clubs"],
      ar: ["وصول مباشر للشاطئ والممشى الساحلي", "على بعد 15 دقيقة من موروكو مول وشارع أنفا", "مدارس دولية ونواد بحرية"]
    },
    pois: [
      { name: "Promenade Côtière & Plage", type: "beach", distance: "150 m" },
      { name: "Morocco Mall", type: "shopping", distance: "8 km (12 min)" },
      { name: "École Internationale George Washington", type: "school", distance: "3 km (5 min)" },
      { name: "Clinique du Littoral", type: "health", distance: "4 km (7 min)" }
    ],
    whySpecial: {
      fr: [
        "Rendement locatif prévisionnel de 7,8% net grâce à la forte demande côtière",
        "Label Haute Qualité Environnementale et isolation thermo-acoustique renforcée",
        "Cuisine italienne équipée et marbre de Thala au sol"
      ],
      en: [
        "Expected 7.8% net rental yield driven by high coastal demand",
        "High Environmental Quality certification and acoustic insulation",
        "Designer Italian kitchen and Thala natural marble flooring"
      ],
      ar: [
        "عائد إيجاري متوقع 7.8% صافي بفضل الطلب الساحلي العالي",
        "عزل حراري وصوتي عالي الجودة ومعتمد",
        "مطبخ إيطالي مجهز ورخام تالا الطبيعي"
      ]
    },
    reviews: [
      {
        id: "rev-vm-1",
        author: "Karim Bennis",
        rating: 5,
        date: "2026-08-14",
        comment: {
          fr: "Le standing des matériaux et la vue sur l'océan sont absolument incomparables. Le suivi de chantier est d'un professionnalisme exemplaire.",
          en: "The standard of materials and ocean views are simply unmatched. The project supervision is exemplary.",
          ar: "مستوى المواد والإطلالة على المحيط استثنائيان حقاً. الاحترافية عالية جداً."
        }
      }
    ]
  },
  {
    id: "anfa-club-penthouse",
    referenceCode: "SHM-CAS-002",
    name: {
      fr: "Penthouse Horizon Casa Anfa",
      en: "Horizon Penthouse Casa Anfa",
      ar: "بنتهاوس الأفق كازا أنفا"
    },
    city: "Casablanca",
    neighborhood: "Casa Anfa / CFC",
    description: {
      fr: "Au sommet de Casablanca Finance City, ce penthouse d'exception de 240 m² habitables dispose d'une terrasse suspendue de 95 m² avec piscine privative à débordement. Architecture avant-gardiste, baies vitrées toute hauteur offrant une vue à 360° sur le parc de l'Anfa et l'océan.",
      en: "At the pinnacle of Casablanca Finance City, this exceptional 240 sqm penthouse features a 95 sqm sky terrace with private infinity plunge pool. Avant-garde architecture and floor-to-ceiling glass offering 360-degree vistas over Anfa Park and the Atlantic.",
      ar: "في قمة القطب المالي للدار البيضاء (CFC)، بنتهاوس فاخر بمساحة 240 م² مع شرفة سماوية بمساحة 95 م² ومسبح خاص معلق. إطلالة بانورامية 360 درجة على أنفا بارك والمحيط."
    },
    priceDH: 5400000,
    pricePerNight: 220,
    priceUnit: "total",
    transactionType: "vente",
    propertyType: "penthouse",
    surface: 240,
    bedrooms: 4,
    bathrooms: 4,
    parking: true,
    pool: true,
    terrace: true,
    elevator: true,
    furnished: true,
    isNew: true,
    isFeatured: true,
    deliveryDate: "Immédiate - Prêt à habiter",
    coordinates: { lat: 33.5680, lng: -7.6650 },
    rating: 5.0,
    amenities: ["piscine-privee", "terrasse-360", "ascenseur-privatif", "domotique-crestron", "2-box-fermes", "suite-master", "cave-vins", "concierge-vip"],
    seoKeywords: ["Penthouse Casablanca", "Immobilier luxe Casa Anfa", "Appartement de prestige CFC", "Achat penthouse Maroc"],
    images: {
      hero: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      details: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80"
      ]
    },
    localHighlights: {
      fr: ["Face au Grand Parc d'Anfa (50 hectares d'espaces verts)", "Au cœur de Casablanca Finance City (CFC)", "Connexion directe Tramway T2"],
      en: ["Facing Anfa Grand Park (50 hectares of greenery)", "Heart of Casablanca Finance City (CFC)", "Direct T2 Tramway connection"],
      ar: ["مقابل حديقة أنفا الكبرى (50 هكتار من المساحات الخضراء)", "في قلب القطب المالي للدار البيضاء", "وصول مباشر للترامواي T2"]
    },
    pois: [
      { name: "Anfa Park", type: "leisure", distance: "50 m" },
      { name: "Station Tramway Casa Anfa", type: "transport", distance: "200 m" },
      { name: "Aflam City & Aeria Mall", type: "shopping", distance: "450 m" },
      { name: "Lycée Français International", type: "school", distance: "1.2 km" }
    ],
    whySpecial: {
      fr: [
        "Bien ultra-rare avec ascenseur arrivant directement dans la pièce de réception",
        "Piscine privative chauffée sans aucun vis-à-vis avec vue coucher de soleil",
        "Éligible au statut fiscal avantageux CFC pour les cadres et investisseurs"
      ],
      en: [
        "Rare penthouse with private elevator opening directly into the reception gallery",
        "Private heated plunge pool with zero overlooking and sunset view",
        "Eligible for attractive CFC financial & tax framework"
      ],
      ar: [
        "عقار نادر جداً مع مصعد خاص يفتح مباشرة داخل صالون الاستقبال",
        "مسبح خاص دافئ بدون أي حجب للرؤية مع غروب الشمس",
        "مؤهل للمزايا الجبائية الخاصة بالقطب المالي CFC"
      ]
    },
    reviews: [
      {
        id: "rev-pc-1",
        author: "M. Tazi",
        rating: 5,
        date: "2026-07-20",
        comment: {
          fr: "Une réalisation magistrale. La vue depuis la piscine du toit sur tout Casablanca est magique.",
          en: "A masterpiece of modern Moroccan architecture. The rooftop pool view is magical.",
          ar: "تحفة معمارية حقيقية. الإطلالة على الدار البيضاء ساحرة للغاية."
        }
      }
    ]
  },
  {
    id: "villa-palmeraie-oasis",
    referenceCode: "SHM-RAK-003",
    name: {
      fr: "Domaine des Oliviers Palmeraie",
      en: "Domaine des Oliviers Palmeraie",
      ar: "قصر بساتين النخيل مراكش"
    },
    city: "Marrakech",
    neighborhood: "Palmeraie",
    description: {
      fr: "Majestueuse propriété contemporaine de plain-pied édifiée sur un parc paysager d'un hectare planté d'oliviers centenaires et de palmiers royaux. 5 suites indépendantes, triple salon avec cheminées en marbre, cuisine professionnelle, spa privé avec hammam traditionnel en tadelakt et piscine lagon de 22 mètres.",
      en: "Majestic contemporary single-story estate set on a one-hectare landscaped park with century-old olive trees and royal palms. 5 independent suites, triple living room with marble fireplaces, gourmet kitchen, private tadelakt hammam spa, and 22-meter lagoon pool.",
      ar: "قصر معاصر مهيب على مساحة هكتار من الحدائق الغناء المليئة بأشجار الزيتون والنخيل. 5 أجنحة ملكية، صالونات فسيحة برخام نادر، حمام مغربي تقليدي بالتادلاكت ومسبح بطول 22 متراً."
    },
    priceDH: 8750000,
    pricePerNight: 450,
    priceUnit: "total",
    transactionType: "vente",
    propertyType: "villa",
    surface: 580,
    bedrooms: 5,
    bathrooms: 6,
    parking: true,
    pool: true,
    terrace: true,
    elevator: false,
    furnished: true,
    isNew: false,
    isFeatured: true,
    deliveryDate: "Disponible immédiatement",
    coordinates: { lat: 31.6690, lng: -7.9450 },
    rating: 4.95,
    amenities: ["piscine-22m", "parc-1-hectare", "hammam-spa", "logement-gardien", "climatisation-gainable", "cheminees", "court-tennis", "securite-247"],
    seoKeywords: ["Villa de luxe Marrakech", "Vente villa Palmeraie Marrakech", "Propriété de prestige Maroc", "Achat palais Marrakech"],
    images: {
      hero: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      details: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80"
      ]
    },
    localHighlights: {
      fr: ["Triangle d'or de la Palmeraie, calme absolu", "À 10 minutes des Golfs d'Amelkis et Royal Golf", "Accès aéroport Marrakech Ménara en 20 min"],
      en: ["Golden triangle of the Palmeraie, ultimate privacy", "10 minutes to Amelkis and Royal Golf courses", "20 minutes to Marrakech Menara Airport"],
      ar: ["المثلث الذهبي لنخيل مراكش، هدوء مطلق", "10 دقائق من ملاعب الغولف الملكي وأملكيث", "20 دقيقة لمطار مراكش المنارة"]
    },
    pois: [
      { name: "Golf Club Palmeraie Rotana", type: "leisure", distance: "1.5 km" },
      { name: "Jardin Majorelle & YSL Museum", type: "leisure", distance: "6 km" },
      { name: "Aéroport Marrakech Menara", type: "transport", distance: "12 km" },
      { name: "Clinique Internationale Marrakech", type: "health", distance: "7 km" }
    ],
    whySpecial: {
      fr: [
        "Potentiel locatif saisonnier exceptionnel de 1 200 € à 2 500 € par nuit",
        "Parc clos avec puits déclaré, arrosage automatique et panneaux solaires",
        "Hammam beldi artisanal chauffé au gaz et salle de massage privative"
      ],
      en: [
        "Outstanding seasonal rental potential from €1,200 to €2,500/night",
        "Enclosed estate with private legal well, solar panels and automated drip system",
        "Authentic heated Moroccan hammam and dedicated massage salon"
      ],
      ar: [
        "إمكانية دخل كراء موسمي استثنائي يتراوح بين 1200 و 2500 يورو لليلة",
        "حديقة مغلقة مع بئر مرخص وألواح طاقة شمسية",
        "حمام بلدي أصيل مجهز وقاعة تدليك خاصة"
      ]
    },
    reviews: [
      {
        id: "rev-vp-1",
        author: "Sophie Laurent",
        rating: 5,
        date: "2026-06-18",
        comment: {
          fr: "Une propriété d'un raffinement rare. Le parc d'oliviers au coucher du soleil avec vue sur l'Atlas est à couper le souffle.",
          en: "A property of rare refinement. The olive grove at sunset with Atlas views takes your breath away.",
          ar: "قصر في غاية الرقي. حديقة الزيتون عند الغروب مع إطلالة الأطلس ساحرة."
        }
      }
    ]
  },
  {
    id: "riad-al-amine",
    referenceCode: "SHM-RAK-004",
    name: {
      fr: "Riad Al Amine & Suites Privées",
      en: "Riad Al Amine & Private Suites",
      ar: "رياض الأمين والأجنحة الخاصة"
    },
    city: "Marrakech",
    neighborhood: "Medina",
    description: {
      fr: "Joyau d'architecture arabo-andalouse au cœur de l'ancienne médina, entièrement rénové avec les codes du luxe contemporain. Patio orné de zelliges de Fès, fontaine murale en marbre sculpté, rooftop arboré avec vue panoramique sur la Koutoubia et les sommets enneigés de l'Atlas.",
      en: "A jewel of Arab-Andalusian architecture in the heart of Marrakech's historical Medina, fully upgraded to luxury boutique standards. Featuring authentic Fez zellige patio, carved marble wall fountain, and leafy rooftop overlooking the Koutoubia.",
      ar: "تحفة من العمارة الأندلسية المغربية في قلب المدينة العتيقة بمراكش. فناء مكسو بزليج فاس الأصيل، نافورة رخامية منحوتة، وسطح بانورامي يطل على صومعة الكتبية وجبال الأطلس."
    },
    priceDH: 950,
    pricePerNight: 95,
    priceUnit: "nuit",
    transactionType: "location",
    propertyType: "riad",
    surface: 280,
    bedrooms: 4,
    bathrooms: 4,
    parking: false,
    pool: true,
    terrace: true,
    elevator: false,
    furnished: true,
    isNew: false,
    isFeatured: true,
    deliveryDate: "Disponible en location courte durée",
    coordinates: { lat: 31.6295, lng: -7.9890 },
    rating: 4.9,
    amenities: ["bassin-patio", "rooftop-atlas", "wifi-fibre-100m", "smart-tv", "petit-dejeuner-beldi", "checkin-autonome", "climatisation-reversible", "service-majordome"],
    seoKeywords: ["Riad Marrakech location", "Riad Medina Marrakech", "Location vacances Marrakech luxe", "Riad de charme Maroc"],
    images: {
      hero: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80",
      details: [
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
      ]
    },
    localHighlights: {
      fr: ["À 5 minutes à pied de la Place Jemaa el-Fna", "Café des Épices et souks d'artisanat à proximité", "Accès facile taxis et dépose bagages"],
      en: ["5-minute walk to Jemaa el-Fna Square", "Close to Café des Épices and artisanal souks", "Easy taxi access and luggage drop point"],
      ar: ["على بعد 5 دقائق سيراً من ساحة جامع الفناء", "قريب من مقهى التوابل وأسواق الصناعة التقليدية", "نقطة وصول سهلة للسيارات ونقل الحقائب"]
    },
    pois: [
      { name: "Place Jemaa el-Fna", type: "leisure", distance: "400 m" },
      { name: "Musée de Marrakech", type: "leisure", distance: "350 m" },
      { name: "Café des Épices", type: "shopping", distance: "250 m" },
      { name: "Station Taxis Place des Ferblantiers", type: "transport", distance: "500 m" }
    ],
    whySpecial: {
      fr: [
        "Exploitation clé en main en maison d'hôtes de prestige",
        "Restauration artisanale certifiée par les Maîtres Artisans de Fès",
        "Accès 100% autonome par digicode pour les voyageurs internationaux"
      ],
      en: [
        "Turnkey luxury boutique guesthouse operations",
        "Certified architectural restoration by Fez Master Craftsmen",
        "100% autonomous keyless smart entry for international guests"
      ],
      ar: [
        "جاهز للتشغيل الفندقي الراقي أو الاستخدام الخاص",
        "ترميم أصيل معتمد من كبار حِرفيي فاس",
        "نظام دخول ذكي ومستقل 100% للمسافرين"
      ]
    },
    reviews: [
      {
        id: "rev-1",
        author: "Sarah M.",
        rating: 5,
        date: "2026-06-12",
        comment: {
          fr: "Une expérience inoubliable ! Le check-in avec code est super pratique et le riad est magnifique.",
          en: "An unforgettable experience! The self-check-in with code is super convenient and the riad is magnificent.",
          ar: "تجربة لا تُنسى! تسجيل الوصول بالرمز مريح للغاية والرياض رائع."
        }
      }
    ]
  },
  {
    id: "dar-essaada",
    referenceCode: "SHM-CAS-005",
    name: {
      fr: "Résidence Dar Essaada - Maarif",
      en: "Dar Essaada Residence - Maarif",
      ar: "إقامة دار السعادة - المعاريف"
    },
    city: "Casablanca",
    neighborhood: "Maarif",
    description: {
      fr: "Au cœur du quartier vibrant du Maarif, à deux pas des tours du Twin Center. Appartement de 2 pièces meublé avec des matériaux nobles, associant zelliges épurés, bois de chêne et cuivre brossé. Cuisine entièrement équipée, Wi-Fi très haut débit fibre optique et literie hôtelière 5 étoiles.",
      en: "In the center of the dynamic Maarif district, steps from the Twin Center towers. Elegantly furnished 2-room apartment combining sleek zellige, oak wood, and brushed copper. Full gourmet kitchen, high-speed fiber Wi-Fi, and 5-star hotel bedding.",
      ar: "في قلب حي المعاريف النابض، على بعد خطوات من برجي التوين سنتر. شقة مفروشة راقية تجمع بين التادلاكت وخشب البلوط والنحاس. مطبخ مجهز بالكامل وإنترنت ألياف بصرية سريع."
    },
    priceDH: 13500,
    pricePerNight: 75,
    priceUnit: "mois",
    transactionType: "location",
    propertyType: "appartement",
    surface: 72,
    bedrooms: 1,
    bathrooms: 1,
    parking: true,
    pool: false,
    terrace: true,
    elevator: true,
    furnished: true,
    isNew: true,
    isFeatured: false,
    deliveryDate: "Disponible de suite pour bail longue durée",
    coordinates: { lat: 33.5850, lng: -7.6350 },
    rating: 4.8,
    amenities: ["wifi-fibre", "parking-titre", "cuisine-americaine", "smart-tv-65", "climatisation-lg", "concierge", "ascenseur-otis"],
    seoKeywords: ["Location longue durée Maarif", "Appartement meublé Casablanca", "Location appartement Twin Center", "Location meublée standing Casablanca"],
    images: {
      hero: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
      details: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
      ]
    },
    localHighlights: {
      fr: ["À deux pas des Twin Center et boutiques de créateurs", "Proche de nombreux cafés et espaces de coworking branchés", "Accès direct au tramway station Zerktouni"],
      en: ["Two steps from the Twin Center and designer boutiques", "Near many trendy cafes and coworking spaces", "Direct tramway access at Zerktouni station"],
      ar: ["على بعد خطوات من توين سنتر والمحلات الفاخرة", "بالقرب من المقاهي ومساحات العمل المشترك", "وصول مباشر للترامواي محطة الزركتوني"]
    },
    pois: [
      { name: "Twin Center & Boutiques", type: "shopping", distance: "250 m" },
      { name: "Station Tramway Bd Zerktouni", type: "transport", distance: "400 m" },
      { name: "Parc de la Ligue Arabe", type: "leisure", distance: "900 m" },
      { name: "Clinique Badr", type: "health", distance: "800 m" }
    ],
    whySpecial: {
      fr: [
        "Idéal pour cadre expatrié ou professionnel en mission longue à Casablanca",
        "Place de parking titrée au sous-sol avec accès sécurisé par badge",
        "Gestion locative premium intégrée avec conciergerie à la demande"
      ],
      en: [
        "Perfect for expatriates or executives on extended assignments in Casablanca",
        "Titled secure basement parking space with keycard gate",
        "Integrated premium property management with on-demand housekeeping"
      ],
      ar: [
        "مثالي للأطر والمدراء ورجال الأعمال في الدار البيضاء",
        "مرآب خاص مسجل ومحفظ في الطابق السفلي",
        "إدارة عقارية احترافية مع خدمات الصيانة والنظافة"
      ]
    },
    reviews: [
      {
        id: "rev-4",
        author: "Amine K.",
        rating: 5,
        date: "2026-06-25",
        comment: {
          fr: "Studio moderne et très bien placé au Maarif. Lit extrêmement confortable et design soigné.",
          en: "Modern studio and very well located in Maarif. Extremely comfortable bed and neat design.",
          ar: "استوديو عصري وموقع ممتاز في المعاريف. السرير مريح للغاية والتصميم أنيق."
        }
      }
    ]
  },
  {
    id: "tanger-malabata",
    referenceCode: "SHM-TNG-006",
    name: {
      fr: "Malabata Horizon & Marina Bay",
      en: "Malabata Horizon & Marina Bay",
      ar: "أبراج مالاباطا ومارينا طنجة"
    },
    city: "Tanger",
    neighborhood: "Malabata",
    description: {
      fr: "Programme d'envergure face à la baie de Tanger et au détroit de Gibraltar. Appartements contemporains baignés de lumière méditerranéenne, larges baies coulissantes en aluminium anodisé, terrasse filante de 35 m², isolation acoustique renforcée et prestations haut standing.",
      en: "Prime waterfront development facing the Bay of Tangier and the Strait of Gibraltar. Contemporary apartments filled with Mediterranean light, oversized sliding doors, 35 sqm wraparound terrace, and premium finishes.",
      ar: "مشروع فاخر على واجهة خليج طنجة ومضيق جبل طارق. شقق عصرية مشرقة، نوافذ ممتدة، شرفة واسعة بمساحة 35 م² مع تشطيبات رفيعة المستوى."
    },
    priceDH: 2850000,
    pricePerNight: 80,
    priceUnit: "total",
    transactionType: "projet-neuf",
    propertyType: "appartement",
    surface: 130,
    bedrooms: 2,
    bathrooms: 2,
    parking: true,
    pool: true,
    terrace: true,
    elevator: true,
    furnished: false,
    isNew: true,
    isFeatured: true,
    deliveryDate: "Livraison T2 2026",
    coordinates: { lat: 35.7760, lng: -5.7820 },
    rating: 4.85,
    amenities: ["vue-mer-detroit", "piscine-infinie", "terrasse-panoramique", "parking-sous-sol", "concierge", "proche-tgv", "gym-fitness"],
    seoKeywords: ["Appartement vue mer Tanger", "Projet neuf Tanger Malabata", "Achat appartement Baie de Tanger", "Immobilier neuf Maroc"],
    images: {
      hero: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80",
      details: [
        "https://images.unsplash.com/photo-1560185127-6a2806647f81?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80"
      ]
    },
    localHighlights: {
      fr: ["À 2 minutes de la corniche et de la Marina Bay de Tanger", "À 5 minutes de la gare TGV Al Boraq Tanger Ville", "Restaurants de fruits de mer et Mall Malabata"],
      en: ["2 minutes from Tangier Corniche and Marina Bay", "5 minutes to Al Boraq TGV High-Speed Station", "Seafood restaurants and Malabata Mall"],
      ar: ["دقيقتان من كورنيش ومارينا طنجة", "5 دقائق من محطة البراق للقطار الفائق السرعة", "مطاعم المأكولات البحرية ومول مالاباطا"]
    },
    pois: [
      { name: "Tanger Marina Bay", type: "leisure", distance: "600 m" },
      { name: "Gare TGV Tanger Ville", type: "transport", distance: "1.2 km" },
      { name: "Tanger City Mall", type: "shopping", distance: "900 m" },
      { name: "Hôpital Al Kortobi", type: "health", distance: "2.5 km" }
    ],
    whySpecial: {
      fr: [
        "Forte plus-value patrimoniale liée à l'essor économique et touristique de Tanger",
        "Vue féérique sur les lumières des côtes espagnoles la nuit",
        "Possibilité de gestion locative estivale à forte rentabilité"
      ],
      en: [
        "Strong capital appreciation fueled by Tangier's rapid economic and port growth",
        "Fairytale views of Spanish coastal lights at night across the Strait",
        "High-yielding summer holiday rental management options"
      ],
      ar: [
        "نمو مستمر في القيمة العقارية بفضل الازدهار الاقتصادي لطنجة",
        "إطلالة ساحرة على السواحل الإسبانية ليلاً",
        "إمكانية كراء سياحي صيفي ذو عائد استثماري مرتفع"
      ]
    },
    reviews: [
      {
        id: "rev-11",
        author: "Younes T.",
        rating: 5,
        date: "2026-07-12",
        comment: {
          fr: "Vue imprenable sur le détroit, réveil incroyable. L'appartement est d'une propreté irréprochable.",
          en: "Stunning view of the strait, incredible wakeup. The apartment is spotlessly clean.",
          ar: "إطلالة رائعة على المضيق، استيقاظ مذهل. الشقة نظيفة للغاية وممتازة."
        }
      }
    ]
  },
  {
    id: "rabat-souissi-domaine",
    referenceCode: "SHM-RBT-007",
    name: {
      fr: "Domaine Diplomatique Souissi",
      en: "Souissi Diplomatic Estate",
      ar: "قصر السويسي الدبلوماسي الرباط"
    },
    city: "Rabat",
    neighborhood: "Souissi",
    description: {
      fr: "Propriété d'exception située dans l'enclave la plus prestigieuse de la capitale, au cœur du quartier des ambassades à Souissi. Villa d'architecte contemporaine de 650 m² sur parc boisé de 2 200 m². Réceptions monumentales, suite parentale de 90 m², piscine chauffée, salon marocain en stuc traditionnel et sécurité maximale.",
      en: "Prestigious estate in Rabat's most exclusive embassy district in Souissi. Contemporary 650 sqm architect villa set on a 2,200 sqm mature wooded park. Grand reception galleries, 90 sqm master wing, heated pool, traditional stucco Moroccan salon, and top-tier security.",
      ar: "عقار فاخر في أرقى أحياء العاصمة الرباط، في قلب حي السفارات بالسويسي. فيلا معمارية بمساحة 650 م² على أرض مشجرة بمساحة 2200 م². صالونات استقبال ضخمة، مسبح دافئ، وأعلى معايير الأمان."
    },
    priceDH: 12500000,
    pricePerNight: 550,
    priceUnit: "total",
    transactionType: "vente",
    propertyType: "villa",
    surface: 650,
    bedrooms: 6,
    bathrooms: 6,
    parking: true,
    pool: true,
    terrace: true,
    elevator: true,
    furnished: false,
    isNew: true,
    isFeatured: true,
    deliveryDate: "Disponible immédiatement",
    coordinates: { lat: 33.9780, lng: -6.8320 },
    rating: 5.0,
    amenities: ["parc-2200m", "piscine-chauffee", "ascenseur-villa", "domotique-totale", "hammam-marocain", "poste-securite", "suite-ambassadeur", "cheminees"],
    seoKeywords: ["Villa de luxe Rabat", "Vente villa Souissi", "Immobilier prestige Rabat", "Achat villa diplomatique Maroc"],
    images: {
      hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      details: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
      ]
    },
    localHighlights: {
      fr: ["Quartier ultra-sécurisé des ambassades", "À 8 minutes du Royal Golf Dar Es Salam", "Proche des meilleures écoles internationales de Rabat"],
      en: ["Ultra-secure embassy enclave", "8 minutes to Royal Golf Dar Es Salam", "Near top international schools in Rabat"],
      ar: ["حي السفارات الأكثر أماناً وهدوءاً", "8 دقائق من الغولف الملكي دار السلام", "قريب من أرقى المدارس الدولية بالرباط"]
    },
    pois: [
      { name: "Royal Golf Dar Es Salam", type: "leisure", distance: "3.2 km" },
      { name: "Mega Mall Rabat", type: "shopping", distance: "1.8 km" },
      { name: "Lycée Descartes & École Américaine", type: "school", distance: "2.5 km" },
      { name: "Hôpital Militaire d'Instruction Mohammed V", type: "health", distance: "3.5 km" }
    ],
    whySpecial: {
      fr: [
        "Valeur patrimoniale refuge la plus stable du Royaume",
        "Architecture bioclimatique et production solaire autonome",
        "Idéal pour diplomates de haut rang, capitaines d'industrie et personnalités"
      ],
      en: [
        "The most prestigious and stable real estate haven in Morocco",
        "Bioclimatic architecture with independent solar energy generation",
        "Ideal for senior diplomats, corporate leaders and dignitaries"
      ],
      ar: [
        "القيمة العقارية الأكثر استقراراً وأماناً في المملكة",
        "عمارة مناخية بيئية مع طاقة شمسية مستقلة",
        "مثالي للدبلوماسيين ورجال الأعمال والشخصيات المرموقة"
      ]
    },
    reviews: [
      {
        id: "rev-rs-1",
        author: "Ambassadeur H. Al Thani",
        rating: 5,
        date: "2026-05-10",
        comment: {
          fr: "Une demeure de maître splendide, alliant l'artisanat marocain d'élite aux standards diplomatiques les plus exigeants.",
          en: "A splendid ambassadorial estate combining master Moroccan craft with the highest standards.",
          ar: "قصر فخم ورائع يجمع بين الأصالة المغربية وأعلى المعايير الدبلوماسية."
        }
      }
    ]
  },
  {
    id: "gauthier-loft",
    referenceCode: "SHM-CAS-008",
    name: {
      fr: "Loft Art-Déco Gauthier",
      en: "Gauthier Art-Deco Loft",
      ar: "غوتييه آرت ديكو لوفت"
    },
    city: "Casablanca",
    neighborhood: "Gauthier",
    description: {
      fr: "Loft contemporain traversant dans le quartier bohème et chic de Gauthier. Hauteur sous plafond de 3,40 m, parquet en chêne massif, verrière industrielle, grand dressing sur-mesure et terrasse intime arborée sans vis-à-vis. Aménagement d'architecte primé.",
      en: "Sunlit contemporary loft in the trendy artistic quarter of Gauthier. 3.40m ceiling heights, solid oak hardwood flooring, custom walk-in closet, and intimate private terrace garden.",
      ar: "لوفت عصري مشرق في حي غوتييه الفني الراقي. علو سقف 3.40 متر، أرضيات خشبية فاخرة، شرفة خاصة مشجرة وتصميم داخلي مميز."
    },
    priceDH: 16500,
    pricePerNight: 85,
    priceUnit: "mois",
    transactionType: "location",
    propertyType: "duplex",
    surface: 110,
    bedrooms: 2,
    bathrooms: 2,
    parking: true,
    pool: false,
    terrace: true,
    elevator: true,
    furnished: true,
    isNew: false,
    isFeatured: false,
    deliveryDate: "Bail longue durée meublé",
    coordinates: { lat: 33.5890, lng: -7.6280 },
    rating: 4.75,
    amenities: ["terrasse-privee", "parking-titre", "fibre-optique", "dressing-mesure", "cuisine-smeg", "cheminee-bioethanol"],
    seoKeywords: ["Loft Casablanca Gauthier", "Location meublée Gauthier", "Appartement d'architecte Casablanca", "Location duplex Casablanca"],
    images: {
      hero: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      details: [
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80"
      ]
    },
    localHighlights: {
      fr: ["Au cœur des meilleures galeries d'art et concept stores", "À 300 mètres du Parc de la Ligue Arabe rénové", "Restauration gastronomique marocaine, italienne et française"],
      en: ["Surrounded by leading art galleries and concept stores", "300 meters from renovated Arab League Park", "Gourmet dining from Moroccan to French bistro"],
      ar: ["محاط بأرقى معارض الفن والمتاجر العصرية", "300 متر من حديقة جامعة الدول العربية المجددة", "مطاعم راقية متنوعة"]
    },
    pois: [
      { name: "Parc de la Ligue Arabe", type: "leisure", distance: "300 m" },
      { name: "Boulevard d'Anfa", type: "shopping", distance: "400 m" },
      { name: "Villa des Arts Casablanca", type: "leisure", distance: "600 m" },
      { name: "Clinique Gauthier", type: "health", distance: "350 m" }
    ],
    whySpecial: {
      fr: [
        "Décoration signée par un cabinet d'architecture d'intérieur renommé",
        "Excellente luminosité naturelle grâce aux baies orientées sud-ouest",
        "Cuisine haut de gamme équipée avec électroménager SMEG"
      ],
      en: [
        "Interior design curated by an award-winning architectural firm",
        "Abundant natural light with south-west orientation",
        "Gourmet kitchen fully fitted with premium SMEG appliances"
      ],
      ar: [
        "تصميم داخلي موقع من مكتب هندسة مرموق",
        "إضاءة طبيعية ممتازة بفضل التوجيه الجنوبي الغربي",
        "مطبخ راق مجهز بأجهزة SMEG العالمية"
      ]
    },
    reviews: [
      {
        id: "rev-9",
        author: "Omar H.",
        rating: 5,
        date: "2026-07-01",
        comment: {
          fr: "Superbe loft artistique au cœur de Gauthier. J'ai adoré les finitions et la terrasse privée.",
          en: "Superb artistic loft in the heart of Gauthier. Loved the finishes and private terrace.",
          ar: "لوفت فني رائع في قلب غوتييه. أحببت التشطيبات والشرفة الخاصة."
        }
      }
    ]
  }
];
