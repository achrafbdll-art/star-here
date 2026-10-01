export interface Translation {
  fr: string;
  en: string;
  ar: string;
}

export interface TranslationList {
  fr: string[];
  en: string[];
  ar: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: Translation;
}

export interface POI {
  name: string;
  type: "school" | "transport" | "shopping" | "leisure" | "beach" | "health";
  distance: string;
}

export interface Property {
  id: string;
  referenceCode?: string;
  name: Translation;
  city: string;
  neighborhood: string;
  description: Translation;
  pricePerNight: number;
  priceDH: number;
  priceUnit?: "total" | "mois" | "nuit";
  transactionType: "vente" | "location" | "projet-neuf";
  propertyType: "appartement" | "villa" | "penthouse" | "duplex" | "riad" | "studio";
  surface: number; // m²
  bedrooms: number;
  bathrooms: number;
  parking: boolean;
  pool: boolean;
  terrace: boolean;
  elevator: boolean;
  furnished: boolean;
  isNew: boolean;
  isFeatured?: boolean;
  deliveryDate?: string;
  coordinates?: { lat: number; lng: number };
  pois?: POI[];
  whySpecial?: TranslationList;
  rating: number;
  amenities: string[];
  seoKeywords: string[];
  images: {
    hero: string;
    details: string[];
  };
  localHighlights: TranslationList;
  reviews?: Review[];
}

export interface Booking {
  bookingCode: string;
  propertyId: string;
  propertyName: Translation;
  city: string;
  neighborhood: string;
  clientName: string;
  clientEmail: string;
  guests: number;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  pinCode: string;
  status: "CONFIRMED" | "CHECKED_IN";
  checkedInAt: string | null;
  wifiCode: string;
  idVerified: boolean;
}

export type Language = "fr" | "en" | "ar";

export interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  isDemo?: boolean;
}

