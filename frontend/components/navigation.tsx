"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Scale, Menu, X } from "lucide-react";
import type { Locale } from "@/lib/i18n";

interface NavigationProps {
  t: unknown;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export function Navigation({ t, locale, onLocaleChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/funkcje", label: (t as any).nav.features },
    { href: "/dokumentacja-api", label: (t as any).nav.apiDemo },
    { href: "/asystent-ai", label: (t as any).nav.aiAssistant },
    { href: "/cennik", label: "Cennik" },
    { href: "/o-nas", label: "O nas" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Scale className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">
                LegalAPI<span className="text-blue-600">Nexus</span>
              </span>
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <LanguageSwitcher
              currentLocale={locale}
              onLocaleChange={onLocaleChange}
            />
            <Button>{(t as any).nav.getStarted}</Button>
          </div>

          <div className="sm:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-4 pl-3 space-y-2">
              <LanguageSwitcher
                currentLocale={locale}
                onLocaleChange={onLocaleChange}
              />
              <Button className="w-full">{(t as any).nav.getStarted}</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
