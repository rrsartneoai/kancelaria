"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  currentLocale: string;
  onLocaleChange: (locale: "pl" | "en") => void;
}

export function LanguageSwitcher({
  currentLocale,
  onLocaleChange,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Globe className="h-4 w-4" />
        {currentLocale.toUpperCase()}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <button
            onClick={() => {
              onLocaleChange("pl");
              setIsOpen(false);
            }}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            PL
          </button>
          <button
            onClick={() => {
              onLocaleChange("en");
              setIsOpen(false);
            }}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            EN
          </button>
        </div>
      )}
    </div>
  );
}
