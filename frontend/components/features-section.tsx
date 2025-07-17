"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Network, Search, Shield, Code, Zap, Building } from "lucide-react";

interface FeaturesSectionProps {
  t: unknown;
}

export function FeaturesSection({ t }: FeaturesSectionProps) {
  const features = [
    {
      icon: Network,
      title: (t as unknown as { features: { domainDriven: { title: string; description: string } } }).features.domainDriven.title,
      description: (t as unknown as { features: { domainDriven: { title: string; description: string } } }).features.domainDriven.description,
    },
    {
      icon: Search,
      title: (t as unknown as { features: { search: { title: string; description: string } } }).features.search.title,
      description: (t as unknown as { features: { search: { title: string; description: string } } }).features.search.description,
    },
    {
      icon: Shield,
      title: (t as unknown as { features: { security: { title: string; description: string } } }).features.security.title,
      description: (t as unknown as { features: { security: { title: string; description: string } } }).features.security.description,
    },
    {
      icon: Code,
      title: "Zgodność z JSON:API",
      description:
        "Pełna zgodność ze standardami JSON:API, HATEOAS, wersjonowaniem i dokumentacją OpenAPI.",
    },
    {
      icon: Zap,
      title: "Wysoka Wydajność",
      description:
        "Cache'owanie Redis, optymalizacja zapytań i skalowanie horyzontalne dla maksymalnej wydajności.",
    },
    {
      icon: Building,
      title: "Architektura Multi-tenant",
      description:
        "Wsparcie dla wielu kancelarii z pełną izolacją danych i separacją konfiguracji.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {(t as unknown as { features: { title: string; subtitle: string } }).features.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {(t as unknown as { features: { title: string; subtitle: string } }).features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
