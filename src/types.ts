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

export interface Property {
  id: string;
  name: Translation;
  city: string;
  neighborhood: string;
  description: Translation;
  pricePerNight: number;
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

