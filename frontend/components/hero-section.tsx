"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/lib/i18n";

interface HeroSectionProps {
  t: unknown;
  locale: Locale;
}

export function HeroSection({ t }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Badge
              variant="secondary"
              className="bg-blue-800 text-blue-100 hover:bg-blue-700"
            >
              {t.hero.badge}
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t.hero.title}
            </h1>

            <p className="text-xl text-blue-100 leading-relaxed">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                {t.hero.exploreApi}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                {t.hero.watchDemo}
              </Button>
            </div>
          </div>

          <div className="relative">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center mb-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="ml-auto text-sm text-white/80">
                    API Console
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{`GET /api/v1/law-firms/123
Accept: application/vnd.api+json
Authorization: Bearer YOUR_API_KEY`}</code>
                  </pre>
                </div>

                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-blue-300 text-sm">
                    <code>{`{
  "data": {
    "type": "law-firms",
    "id": "123",
    "attributes": {
      "name": "Kowalski i Wspólnicy",
      "specializations": ["prawo spółek", "podatki"],
      "lawyers_count": 12
    }
  }
}`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
