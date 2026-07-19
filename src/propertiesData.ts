import { Property } from "./types";

export const STATIC_PROPERTIES: Property[] = [
  {
    id: "riad-al-amine",
    name: {
      fr: "Riad Al Amine",
      en: "Riad Al Amine",
      ar: "رياض الأمين"
    },
    city: "Marrakech",
    neighborhood: "Medina",
    description: {
      fr: "Un havre de paix au cœur de l'ancienne médina, alliant l'architecture traditionnelle des riads au confort numérique d'un hôtel moderne. Patio en zelliges, fontaine rafraîchissante et suite autonome équipée de kitchenette et buanderie.",
      en: "A haven of peace in the heart of the ancient Medina, blending traditional riad architecture with the digital comfort of a modern hotel. Featuring a zellige patio, refreshing fountain, and self-contained suite with kitchenette and in-unit laundry.",
      ar: "واحة من الهدوء في قلب المدينة القديمة، تجمع بين العمارة التقليدية للرياض والراحة الرقمية لفندق حديث. يتميز بفناء من الزليج، ونافورة منعشة، وجناح مستقل مع مطبخ صغير وغسيل ملابس."
    },
    pricePerNight: 95,
    rating: 4.9,
    amenities: ["wifi-fast", "kitchenette", "laundry", "smart-tv", "automated-checkin", "pool", "rooftop"],
    seoKeywords: ["Appart hôtel Marrakech", "Location courte durée Marrakech", "Riad Medina Marrakech", "Location de vacances Marrakech"],
    images: {
      hero: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80",
      details: [
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80"
      ]
    },
    localHighlights: {
      fr: ["À 5 minutes à pied de la Place Jemaa el-Fna", "Café des Épices à proximité", "Accès facile pour les taxis"],
      en: ["5-minute walk to Jemaa el-Fna Square", "Close to Café des Épices", "Easy taxi access point"],
      ar: ["على بعد 5 دقائق سيراً من ساحة جامع الفناء", "قريب من مقهى التوابل", "نقطة وصول سهلة لسيارات الأجرة"]
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
      },
      {
        id: "rev-2",
        author: "Jean-Pierre D.",
        rating: 5,
        date: "2026-05-30",
        comment: {
          fr: "Idéalement situé près de Jemaa el-Fna. Le patio est un havre de paix.",
          en: "Ideally located near Jemaa el-Fna. The patio is a haven of peace.",
          ar: "موقع مثالي بالقرب من ساحة جامع الفناء. الفناء ملاذ للسلام."
        }
      },
      {
        id: "rev-3",
        author: "Fatima Z.",
        rating: 4,
        date: "2026-07-02",
        comment: {
          fr: "Chambre magnifique, wifi rapide. L'assistant IA a donné d'excellentes adresses de tajines.",
          en: "Magnificent room, fast wifi. The AI assistant gave excellent tajine addresses.",
          ar: "غرفة رائعة وإنترنت سريع. قدم مساعد الذكاء الاصطناعي عناوين ممتازة للطواجن."
        }
      }
    ]
  },
  {
    id: "dar-essaada",
    name: {
      fr: "Dar Essaada - Maarif",
      en: "Dar Essaada - Maarif",
      ar: "دار السعادة - المعاريف"
    },
    city: "Casablanca",
    neighborhood: "Maarif",
    description: {
      fr: "Situé dans le quartier dynamique du Maarif, ce studio haut de gamme propose un design épuré, d'inspiration tadelakt et cuivre, idéal pour les séjours d'affaires et de loisirs. Cuisine entièrement équipée, Wi-Fi ultra-rapide par fibre et lit king-size.",
      en: "Located in the dynamic Maarif district, this high-end studio offers a sleek design inspired by tadelakt and copper, ideal for business and leisure stays. Features a fully equipped kitchen, ultra-fast fiber Wi-Fi, and king-size bed.",
      ar: "يقع في حي المعاريف الحيوي، ويوفر هذا الاستوديو الراقي تصميماً أنيقاً مستوحى من التادلاكت والنحاس، وهو مثالي لإقامات العمل والترفيه. يحتوي على مطبخ مجهز بالكامل، وإنترنت فائق السرعة، وسرير كبير."
    },
    pricePerNight: 75,
    rating: 4.8,
    amenities: ["wifi-fast", "kitchenette", "laundry", "smart-tv", "automated-checkin", "coworking-space"],
    seoKeywords: ["Appart hôtel Casablanca", "Appartement meublé Casablanca", "Studio meublé Maarif", "Location courte durée Casablanca"],
    images: {
      hero: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
      details: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80"
      ]
    },
    localHighlights: {
      fr: ["À deux pas des Twin Center", "Proche de nombreux cafés branchés", "Accès direct au tramway"],
      en: ["Two steps from the Twin Center", "Near many trendy cafes", "Direct tramway access"],
      ar: ["على بعد خطوات من توين سنتر", "بالقرب من العديد من المقاهي العصرية", "وصول مباشر إلى الترامواي"]
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
      },
      {
        id: "rev-5",
        author: "Emily R.",
        rating: 4,
        date: "2026-07-10",
        comment: {
          fr: "Excellent wifi pour le travail à distance. Entrée autonome sans accroc.",
          en: "Excellent wifi for remote work. Seamless automated entry.",
          ar: "إنترنت ممتاز للعمل عن بعد. دخول ذاتي سلس وبدون مشاكل."
        }
      },
      {
        id: "rev-6",
        author: "Tariq S.",
        rating: 5,
        date: "2026-05-18",
        comment: {
          fr: "Un de mes meilleurs séjours à Casablanca. L'équipe numérique est super réactive.",
          en: "One of my best stays in Casablanca. The digital team is super responsive.",
          ar: "من أفضل إقاماتي في الدار البيضاء. الفريق الرقمي متجاوب للغاية."
        }
      }
    ]
  },
  {
    id: "anfaplace-oasis",
    name: {
      fr: "Anfa Place View",
      en: "Anfa Place View",
      ar: "أنفا بليس فيو"
    },
    city: "Casablanca",
    neighborhood: "Anfa",
    description: {
      fr: "Un magnifique appartement de 2 chambres avec terrasse panoramique sur l'océan Atlantique. Idéal pour les familles, combinant la liberté d'un chez-soi équipé de buanderie et cuisine moderne avec des services de ménage premium à la demande.",
      en: "A beautiful 2-bedroom apartment with a panoramic terrace overlooking the Atlantic Ocean. Perfect for families, combining the freedom of a fully equipped home with laundry and modern kitchen with premium on-demand housekeeping.",
      ar: "شقة رائعة بغرفتي نوم مع شرفة بانورامية تطل على المحيط الأطلسي. مثالية للعائلات، وتجمع بين حرية المنزل المجهز بغسيل الملابس ومطبخ حديث avec خدمات تنظيف ممتازة عند الطلب."
    },
    pricePerNight: 140,
    rating: 4.9,
    amenities: ["wifi-fast", "kitchenette", "laundry", "smart-tv", "automated-checkin", "terrace-ocean", "pet-friendly"],
    seoKeywords: ["Appartement meublé Anfa", "Location appartement Anfa", "Studio Gauthier Casablanca", "Résidence hôtelière Casablanca"],
    images: {
      hero: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      details: [
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80"
      ]
    },
    localHighlights: {
      fr: ["Accès direct à la plage d'Anfa", "Proche du centre commercial AnfaPlace", "Sécurité renforcée 24/7"],
      en: ["Direct access to Anfa beach", "Near AnfaPlace Shopping Mall", "24/7 high security"],
      ar: ["وصول مباشر إلى شاطئ أنفا", "بالقرب من مركز تسوق أنفا بليس", "أمن معزز على مدار الساعة"]
    },
    reviews: [
      {
        id: "rev-7",
        author: "Sofia L.",
        rating: 5,
        date: "2026-07-05",
        comment: {
          fr: "La vue sur l'océan est spectaculaire ! Parfait pour notre famille.",
          en: "The ocean view is spectacular! Perfect for our family.",
          ar: "الإطلالة على المحيط مذهلة! مريحة جداً ومثالية لعائلتنا."
        }
      },
      {
        id: "rev-8",
        author: "Marc B.",
        rating: 5,
        date: "2026-06-20",
        comment: {
          fr: "Accès direct à la plage et sécurité au top. Très propre et bien équipé.",
          en: "Direct access to the beach and top-notch security. Very clean and well equipped.",
          ar: "وصول مباشر للشاطئ وأمن ممتاز. نظيفة جداً ومجهزة جيداً."
        }
      }
    ]
  },
  {
    id: "gauthier-loft",
    name: {
      fr: "Gauthier Art-Deco Loft",
      en: "Gauthier Art-Deco Loft",
      ar: "غوتييه آرت ديكو لوفت"
    },
    city: "Casablanca",
    neighborhood: "Gauthier",
    description: {
      fr: "Loft ultra-moderne niché dans le charmant quartier artistique de Gauthier. Finitions en bois de cèdre sculpté et tapis berbères artisanaux, équipé d'une Smart TV avec streaming, grand lit et coin bureau idéal pour les nomades digitaux.",
      en: "Ultra-modern loft nestled in the charming artistic neighborhood of Gauthier. Featuring carved cedar wood details and artisanal Berber carpets, equipped with a Smart TV with streaming, large bed, and workspace ideal for digital nomads.",
      ar: "لوفت عصري للغاية يقع في حي غوتييه الفني الساحر. يتميز بلمسات من خشب الأرز المنحوت والسجاد البربري التقليدي، ومجهز بتلفزيون ذكي، وسرير كبير، ومساحة عمل مريحة."
    },
    pricePerNight: 85,
    rating: 4.7,
    amenities: ["wifi-fast", "kitchenette", "smart-tv", "automated-checkin", "coworking-space"],
    seoKeywords: ["Studio Gauthier Casablanca", "Appartement meublé Casablanca", "Location courte durée Casablanca"],
    images: {
      hero: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      details: [
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80"
      ]
    },
    localHighlights: {
      fr: ["Proche du Parc de la Ligue Arabe", "Au milieu de galeries d'art et concept stores", "Excellent choix de restaurants locaux et italiens"],
      en: ["Near the Arab League Park", "Surrounded by art galleries and concept stores", "Excellent choice of local and Italian restaurants"],
      ar: ["بالقرب من حديقة جامعة الدول العربية", "محاط بمعارض الفن والمحلات العصرية", "مجموعة ممتازة من المطاعم المحلية والإيطالية"]
    },
    reviews: [
      {
        id: "rev-9",
        author: "Omar H.",
        rating: 4,
        date: "2026-07-01",
        comment: {
          fr: "Superbe loft artistique au cœur de Gauthier. J'ai adoré la déco berbère.",
          en: "Superb artistic loft in the heart of Gauthier. Loved the Berber decor.",
          ar: "لوفت فني رائع في قلب غوتييه. أحببت الديكور البربري."
        }
      },
      {
        id: "rev-10",
        author: "Chloe W.",
        rating: 5,
        date: "2026-06-14",
        comment: {
          fr: "Perfect for digital nomads. The fiber internet is blazing fast.",
          en: "Perfect for digital nomads. The fiber internet is blazing fast.",
          ar: "ممتاز للرحل الرقميين. إنترنت الألياف البصرية سريع وممتاز."
        }
      }
    ]
  },
  {
    id: "tanger-malabata",
    name: {
      fr: "Malabata Horizon",
      en: "Malabata Horizon",
      ar: "منارة مالاباطا"
    },
    city: "Tanger",
    neighborhood: "Malabata",
    description: {
      fr: "Profitez de la brise méditerranéenne depuis cet appartement meublé contemporain à Malabata. Check-in autonome par code intelligent, espace de coworking privé, grande baie vitrée offrant une vue imprenable sur le détroit de Gibraltar.",
      en: "Enjoy the Mediterranean breeze from this contemporary furnished apartment in Malabata. Self-check-in with smart code, private coworking space, large bay windows offering breathtaking views of the Strait of Gibraltar.",
      ar: "استمتع بنسيم البحر الأبيض المتوسط من هذه الشقة المفروشة المعاصرة في مالاباطا. تسجيل وصول ذاتي برمز ذكي، ومساحة عمل مشتركة خاصة، ونوافذ كبيرة توفر إطلالات خلابة على مضيق جبل طارق."
    },
    pricePerNight: 80,
    rating: 4.8,
    amenities: ["wifi-fast", "kitchenette", "laundry", "smart-tv", "automated-checkin", "terrace-ocean"],
    seoKeywords: ["Appart hôtel Tanger", "Appartement vue mer Tanger", "Location vacances Tanger", "Studio Tanger meublé"],
    images: {
      hero: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80",
      details: [
        "https://images.unsplash.com/photo-1560185127-6a2806647f81?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80"
      ]
    },
    localHighlights: {
      fr: ["À 2 minutes de la corniche de Tanger", "Proche de la gare TGV Tanger Ville", "Restaurants de fruits de mer réputés"],
      en: ["2 minutes from the Tangier corniche", "Near the Tangier Ville TGV station", "Renowned seafood restaurants"],
      ar: ["على بعد دقيقتين من كورنيش طنجة", "بالقرب من محطة البراق طنجة المدينة", "مطاعم مأكولات بحرية مشهورة"]
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
      },
      {
        id: "rev-12",
        author: "Anna P.",
        rating: 4,
        date: "2026-06-28",
        comment: {
          fr: "Check-in ultra simple avec le code intelligent. Très bon emplacement à Malabata.",
          en: "Very simple check-in with the smart code. Very good location in Malabata.",
          ar: "تسجيل وصول بسيط للغاية بالرمز الذكي. موقع جيد جداً في مالاباطا."
        }
      }
    ]
  },
  {
    id: "rabat-agdal",
    name: {
      fr: "Riad-Studio Agdal",
      en: "Riad-Studio Agdal",
      ar: "رياض ستوديو أكدال"
    },
    city: "Rabat",
    neighborhood: "Agdal",
    description: {
      fr: "Studio meublé avec finitions de luxe au cœur d'Agdal, le quartier le plus élégant de Rabat. Cuisine américaine moderne, check-in 100% autonome par application, assistance client réactive 24/7 et patio privé arboré.",
      en: "Luxuriously finished furnished studio in the heart of Agdal, Rabat's most elegant neighborhood. Modern open-plan kitchen, 100% automated app-based check-in, responsive 24/7 digital support, and private leafy patio.",
      ar: "استوديو مفروش بلمسات فاخرة في قلب أكدال، أرقى أحياء الرباط. مطبخ أمريكي حديث، وتسجيل وصول رقمي مستقل، ودعم عملاء سريع على مدار الساعة، وفناء خاص مشجر."
    },
    pricePerNight: 88,
    rating: 4.9,
    amenities: ["wifi-fast", "kitchenette", "laundry", "smart-tv", "automated-checkin", "patio"],
    seoKeywords: ["Appart hôtel Rabat", "Studio meublé Agdal", "Location appartement Rabat", "Hébergement Rabat"],
    images: {
      hero: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      details: [
        "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
      ]
    },
    localHighlights: {
      fr: ["À quelques minutes de l'Avenue de France", "Gare de Rabat Agdal accessible", "Cafés et boutiques chics"],
      en: ["A few minutes from Avenue de France", "Rabat Agdal train station accessible", "Chic cafes and boutiques"],
      ar: ["على بعد دقائق من شارع فرنسا", "سهولة الوصول لمحطة قطار الرباط أكدال", "مقاهي ومحلات تجارية أنيقة"]
    },
    reviews: [
      {
        id: "rev-13",
        author: "Khadija A.",
        rating: 5,
        date: "2026-07-14",
        comment: {
          fr: "Studio de luxe très calme et propre à Agdal. Le patio privé est magnifique pour prendre le thé.",
          en: "Very quiet and clean luxury studio in Agdal. The private patio is gorgeous for having tea.",
          ar: "استوديو فاخر هادئ للغاية ونظيف في أكdال. الفناء الخاص رائع لتناول الشاي والراحة."
        }
      },
      {
        id: "rev-14",
        author: "Michael S.",
        rating: 5,
        date: "2026-06-15",
        comment: {
          fr: "Highly recommended for business trips to Rabat. Reliable wifi and great automated system.",
          en: "Highly recommended for business trips to Rabat. Reliable wifi and great automated system.",
          ar: "موصى به للغاية لرحلات العمل إلى الرباط. إنترنت موثوق ونظام تسجيل ذاتي ممتاز."
        }
      }
    ]
  }
];
