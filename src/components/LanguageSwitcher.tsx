"use client";

import { useEffect, useCallback, useMemo, useState } from "react";

// We use Google Translate Website widget to provide automatic translation without
// maintaining our own dictionaries. This component injects the script and offers
// a custom UI (flags + a select) to switch languages.

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

type Lang = {
  code: string; // e.g., 'en'
  label: string; // e.g., 'English'
  emoji: string; // flag emoji for simple, zero-asset UI
};

const LANGUAGES: Lang[] = [
  { code: "en", label: "English", emoji: "🇬🇧" },
  { code: "fr", label: "Français", emoji: "🇫🇷" },
  { code: "de", label: "Deutsch", emoji: "🇩🇪" },
  { code: "hi", label: "हिन्दी", emoji: "🇮🇳" },
  { code: "es", label: "Español", emoji: "🇪🇸" },
  { code: "it", label: "Italiano", emoji: "🇮🇹" },
  { code: "pt", label: "Português", emoji: "🇵🇹" },
  { code: "ar", label: "العربية", emoji: "🇸🇦" },
  { code: "ru", label: "Русский", emoji: "🇷🇺" },
  { code: "zh-CN", label: "简体中文", emoji: "🇨🇳" },
  { code: "ja", label: "日本語", emoji: "🇯🇵" },
  { code: "ko", label: "한국어", emoji: "🇰🇷" },
  { code: "tr", label: "Türkçe", emoji: "🇹🇷" },
  { code: "id", label: "Bahasa Indonesia", emoji: "🇮🇩" },
  { code: "vi", label: "Tiếng Việt", emoji: "🇻🇳" },
  { code: "th", label: "ไทย", emoji: "🇹🇭" },
  { code: "ur", label: "اردو", emoji: "🇵🇰" },
  { code: "fa", label: "فارسی", emoji: "🇮🇷" },
  { code: "bn", label: "বাংলা", emoji: "🇧🇩" },
  { code: "ta", label: "தமிழ்", emoji: "🇮🇳" },
];

function getCookie(name: string) {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : "";
}

function parseGoogTransCookie(): string | null {
  // formats like: "/auto/fr" or "/en/hi"
  const v = getCookie("googtrans");
  if (!v) return null;
  const parts = v.split("/").filter(Boolean);
  return parts[parts.length - 1] || null;
}

export default function LanguageSwitcher() {
  const included = useMemo(() => LANGUAGES.map((l) => l.code).join(","), []);
  const [selected, setSelected] = useState<string | "">(parseGoogTransCookie() || "");

  // Inject Google Translate script once and initialize the element.
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Define init on window for Google callback
    window.googleTranslateElementInit = () => {
      if (!window.google) return;
      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: included,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      } catch {
        // ignore
      }

      // After widget is created, if cookie already has a language, set the select to it
      const langFromCookie = parseGoogTransCookie();
      if (langFromCookie) {
        const combo = document.querySelector("select.goog-te-combo") as HTMLSelectElement | null;
        if (combo) {
          combo.value = langFromCookie;
          combo.dispatchEvent(new Event("change"));
        }
      }
    };

    const existing = document.getElementById("google-translate-script");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else {
      // In case script is already on the page (e.g., fast refresh), try to call init again
      if (typeof window.googleTranslateElementInit === "function") {
        window.googleTranslateElementInit();
      }
    }
  }, [included]);

  // Trigger translation by programmatically changing the hidden combo
  const changeLanguage = useCallback((langCode: string) => {
    if (typeof window === "undefined") return;

    setSelected(langCode);

    const select = document.querySelector("select.goog-te-combo") as HTMLSelectElement | null;
    if (select) {
      select.value = langCode;
      // Trigger change event for Google translator
      select.dispatchEvent(new Event("change"));
    } else {
      // If widget not ready yet, set cookie and reload so Google applies it
      try {
        const expiry = new Date();
        expiry.setFullYear(expiry.getFullYear() + 1);
        document.cookie = `googtrans=/auto/${langCode}; expires=${expiry.toUTCString()}; path=/`;
        document.cookie = `googtrans=/auto/${langCode}; expires=${expiry.toUTCString()}; path=/; domain=${location.hostname}`;
      } catch {}
      location.reload();
    }

    // Always set cookie so reloads and future navigations persist the choice
    try {
      const expiry = new Date();
      expiry.setFullYear(expiry.getFullYear() + 1);
      document.cookie = `googtrans=/auto/${langCode}; expires=${expiry.toUTCString()}; path=/`;
      document.cookie = `googtrans=/auto/${langCode}; expires=${expiry.toUTCString()}; path=/; domain=${location.hostname}`;
    } catch {
      // no-op
    }
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Container where Google injects its widget (keep in DOM but visually collapsed) */}
      <div id="google_translate_element" className="h-0 overflow-hidden" />

      {/* Flags */}
      

      {/* Custom select */}
      <select
        aria-label="Select Language"
        value={selected || ""}
        onChange={(e) => e.target.value && changeLanguage(e.target.value)}
        className="px-2 py-1 rounded border border-gray-300 text-sm text-black"
      >
        <option value="" disabled>
          Select Language
        </option>
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>

      {/* Clean up Google injected UI elements to keep only our custom UI */}
      <style jsx global>{`
        .goog-logo-link { display: none !important; }
        .goog-te-gadget { height: 0 !important; overflow: hidden !important; }
        .goog-te-gadget .goog-te-combo { visibility: hidden !important; height: 0 !important; }
        .goog-te-banner-frame.skiptranslate { display: none !important; }
        body { top: 0 !important; }
      `}</style>
    </div>
  );
}