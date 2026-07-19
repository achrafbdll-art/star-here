import React, { useState, useEffect } from "react";
import { 
  Sun, Cloud, CloudSun, CloudDrizzle, CloudRain, Snowflake, 
  CloudLightning, Wind, Thermometer, Droplets, RefreshCw 
} from "lucide-react";
import { Language } from "../types";

// Coordinates dictionary for Moroccan cities served by numa.dar
const CITY_COORDINATES: Record<string, { lat: number; lon: number }> = {
  casablanca: { lat: 33.5731, lon: -7.5898 },
  marrakech: { lat: 31.6295, lon: -7.9811 },
  rabat: { lat: 34.0209, lon: -6.8416 },
  tanger: { lat: 35.7595, lon: -5.8340 },
  agadir: { lat: 30.4278, lon: -9.5981 },
};

interface WeatherWidgetProps {
  city: string;
  language: Language;
}

interface WeatherData {
  current: {
    temp: number;
    windspeed: number;
    weathercode: number;
    isDay: boolean;
  };
  forecast: Array<{
    date: string;
    tempMax: number;
    tempMin: number;
    weathercode: number;
  }>;
}

// Map weather codes to translations and icons
const getWeatherInfo = (code: number, lang: Language) => {
  const mapping: Record<number, { text: Record<Language, string>; icon: React.ComponentType<any> }> = {
    0: {
      text: { fr: "Ensoleillé", en: "Sunny", ar: "مشمس" },
      icon: Sun
    },
    1: {
      text: { fr: "Principalement dégagé", en: "Mainly Clear", ar: "صافٍ غالباً" },
      icon: CloudSun
    },
    2: {
      text: { fr: "Partiellement nuageux", en: "Partly Cloudy", ar: "غائم جزئياً" },
      icon: CloudSun
    },
    3: {
      text: { fr: "Couvert", en: "Overcast", ar: "غائم" },
      icon: Cloud
    },
    45: {
      text: { fr: "Brouillard", en: "Foggy", ar: "ضباب" },
      icon: Cloud
    },
    48: {
      text: { fr: "Brouillard givrant", en: "Depositing Rime Fog", ar: "ضباب صقيعي" },
      icon: Cloud
    },
    51: {
      text: { fr: "Bruine légère", en: "Light Drizzle", ar: "رذاذ خفيف" },
      icon: CloudDrizzle
    },
    53: {
      text: { fr: "Bruine modérée", en: "Moderate Drizzle", ar: "رذاذ معتدل" },
      icon: CloudDrizzle
    },
    55: {
      text: { fr: "Bruine dense", en: "Dense Drizzle", ar: "رذاذ كثيف" },
      icon: CloudDrizzle
    },
    61: {
      text: { fr: "Pluie légère", en: "Slight Rain", ar: "مطر خفيف" },
      icon: CloudRain
    },
    63: {
      text: { fr: "Pluie modérée", en: "Moderate Rain", ar: "مطر معتدل" },
      icon: CloudRain
    },
    65: {
      text: { fr: "Pluie forte", en: "Heavy Rain", ar: "مطر غزير" },
      icon: CloudRain
    },
    71: {
      text: { fr: "Chute de neige légère", en: "Slight Snow", ar: "ثلج خفيف" },
      icon: Snowflake
    },
    73: {
      text: { fr: "Chute de neige modérée", en: "Moderate Snow", ar: "ثلج معتدل" },
      icon: Snowflake
    },
    75: {
      text: { fr: "Chute de neige forte", en: "Heavy Snow", ar: "ثلج كثيف" },
      icon: Snowflake
    },
    80: {
      text: { fr: "Averses légères", en: "Slight Rain Showers", ar: "زخات مطر خفيفة" },
      icon: CloudRain
    },
    81: {
      text: { fr: "Averses modérées", en: "Moderate Rain Showers", ar: "زخات مطر معتدلة" },
      icon: CloudRain
    },
    82: {
      text: { fr: "Averses violentes", en: "Violent Rain Showers", ar: "زخات مطر قوية" },
      icon: CloudRain
    },
    95: {
      text: { fr: "Orageux", en: "Thunderstorm", ar: "عاصفة رعدية" },
      icon: CloudLightning
    }
  };

  // Find closest matching code group
  const defaultInfo = {
    text: { fr: "Climat Tempéré", en: "Mild Weather", ar: "طقس معتدل" },
    icon: CloudSun
  };

  const info = mapping[code] || defaultInfo;
  return {
    text: info.text[lang],
    icon: info.icon
  };
};

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ city, language }) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const normalizedCity = city.toLowerCase().trim();
      const coords = CITY_COORDINATES[normalizedCity] || CITY_COORDINATES.casablanca;
      
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      
      const resData = await response.json();
      
      if (!resData.current_weather || !resData.daily) {
        throw new Error("Invalid API response format");
      }

      // Map daily forecast (first 3 days)
      const forecastList = [];
      const times = resData.daily.time || [];
      const maxTemps = resData.daily.temperature_2m_max || [];
      const minTemps = resData.daily.temperature_2m_min || [];
      const codes = resData.daily.weathercode || [];

      for (let i = 0; i < Math.min(3, times.length); i++) {
        forecastList.push({
          date: times[i],
          tempMax: Math.round(maxTemps[i]),
          tempMin: Math.round(minTemps[i]),
          weathercode: codes[i]
        });
      }

      setData({
        current: {
          temp: Math.round(resData.current_weather.temperature),
          windspeed: Math.round(resData.current_weather.windspeed),
          weathercode: resData.current_weather.weathercode,
          isDay: resData.current_weather.is_day === 1
        },
        forecast: forecastList
      });
    } catch (err: any) {
      console.error("WeatherWidget fetch error:", err);
      setError(language === "fr" ? "Impossible de charger la météo." : language === "en" ? "Could not load weather." : "فشل تحميل الطقس.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  // Format date helper
  const formatDateLabel = (dateStr: string, index: number) => {
    if (index === 0) {
      return language === "fr" ? "Aujourd'hui" : language === "en" ? "Today" : "اليوم";
    }
    if (index === 1) {
      return language === "fr" ? "Demain" : language === "en" ? "Tomorrow" : "غداً";
    }
    // Parse day of week
    try {
      const date = new Date(dateStr);
      const options: Intl.DateTimeFormatOptions = { weekday: "short" };
      return date.toLocaleDateString(language === "ar" ? "ar-MA" : language === "en" ? "en-US" : "fr-FR", options);
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="bg-[#FAF6F2] border border-stone-200 rounded-2xl p-4 animate-pulse space-y-3">
        <div className="h-3 bg-stone-300 rounded w-1/3"></div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-stone-300 rounded-full"></div>
          <div className="space-y-2 flex-grow">
            <div className="h-6 bg-stone-300 rounded w-1/4"></div>
            <div className="h-3 bg-stone-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-[#FAF6F2] border border-stone-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-xs text-stone-500 font-medium">{error || "Erreur"}</p>
        <button 
          onClick={fetchWeather}
          className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-bold-copper hover:underline"
        >
          <RefreshCw className="w-3 h-3" />
          {language === "fr" ? "Réessayer" : language === "en" ? "Retry" : "إعادة المحاولة"}
        </button>
      </div>
    );
  }

  const currentInfo = getWeatherInfo(data.current.weathercode, language);
  const CurrentIcon = currentInfo.icon;

  return (
    <div id="property-weather-widget" className="bg-[#FAF6F2] border border-stone-200 rounded-2xl p-4 space-y-4">
      {/* Widget Header */}
      <div className="flex justify-between items-center border-b border-stone-200 pb-2">
        <div className="text-left">
          <span className="text-[9px] font-sans font-bold text-stone-400 uppercase tracking-widest block">
            {language === "fr" ? "Météo Locale" : language === "en" ? "Local Weather" : "الطقس المحلي"}
          </span>
          <h4 className="text-xs font-display font-black uppercase text-bold-text">
            {city}
          </h4>
        </div>
        <button 
          onClick={fetchWeather}
          className="p-1 hover:bg-stone-200/50 rounded-full text-stone-400 hover:text-stone-700 transition-colors"
          title={language === "fr" ? "Actualiser" : "Refresh"}
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Current Conditions Block */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white border border-stone-200 rounded-xl text-bold-copper shadow-sm">
            <CurrentIcon className="w-8 h-8" />
          </div>
          <div className="text-left">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-bold-text font-display">
                {data.current.temp}
              </span>
              <span className="text-sm font-bold text-[#C05621] font-mono">°C</span>
            </div>
            <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider font-sans">
              {currentInfo.text}
            </p>
          </div>
        </div>

        {/* Mini stats */}
        <div className="text-right space-y-1 font-sans text-[10px] text-stone-500 font-semibold">
          <div className="flex items-center justify-end gap-1">
            <Wind className="w-3.5 h-3.5 text-stone-400" />
            <span>{data.current.windspeed} km/h</span>
          </div>
          <div className="flex items-center justify-end gap-1">
            <Thermometer className="w-3.5 h-3.5 text-stone-400" />
            <span>{data.current.isDay ? (language === "fr" ? "Jour" : "Day") : (language === "fr" ? "Nuit" : "Night")}</span>
          </div>
        </div>
      </div>

      {/* Forecast Section */}
      <div className="border-t border-stone-200 pt-3">
        <p className="text-[8px] font-sans font-bold text-stone-400 uppercase tracking-widest text-left mb-2">
          {language === "fr" ? "Prévisions 3 jours" : language === "en" ? "3-Day Forecast" : "توقعات 3 أيام"}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {data.forecast.map((item, index) => {
            const dayInfo = getWeatherInfo(item.weathercode, language);
            const DayIcon = dayInfo.icon;
            return (
              <div key={item.date} className="bg-white p-2 rounded-xl border border-stone-200 text-center space-y-1">
                <p className="text-[9px] text-stone-500 font-bold uppercase tracking-wide truncate">
                  {formatDateLabel(item.date, index)}
                </p>
                <div className="flex justify-center text-bold-copper py-1">
                  <DayIcon className="w-5 h-5" />
                </div>
                <div className="flex justify-center items-center gap-1 font-mono text-[9px] font-bold">
                  <span className="text-bold-text">{item.tempMax}°</span>
                  <span className="text-stone-300">/</span>
                  <span className="text-stone-400">{item.tempMin}°</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
