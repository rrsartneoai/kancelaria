"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Scale,
  Shield,
  Search,
  FileText,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function FunkcjePage() {
  const mainFeatures = [
    {
      icon: Scale,
      title: "Zarządzanie Sprawami Sądowymi",
      description:
        "Kompleksowy system zarządzania postępowaniami przed sądami powszechnymi, administracyjnymi i gospodarczymi w Gdańsku i całej Polsce.",
      features: [
        "Kalendarz rozpraw i terminów procesowych",
        "Automatyczne przypomnienia o terminach",
        "Integracja z systemami sądowymi",
        "Śledzenie statusu spraw w czasie rzeczywistym",
      ],
    },
    {
      icon: FileText,
      title: "Automatyzacja Dokumentów Prawnych",
      description:
        "Zaawansowany generator dokumentów prawnych zgodnych z polskim prawem i praktyką orzeczniczą sądów gdańskich.",
      features: [
        "Szablony pism procesowych i pozwów",
        "Automatyczne wypełnianie danych klienta",
        "Kontrola zgodności z aktualnymi przepisami",
        "Integracja z bazami orzecznictwa",
      ],
    },
    {
      icon: Users,
      title: "Zarządzanie Klientami i Sprawami",
      description:
        "Profesjonalny system CRM dostosowany do specyfiki pracy kancelarii prawnych w regionie pomorskim.",
      features: [
        "Baza danych klientów z historią współpracy",
        "Zarządzanie konfliktami interesów",
        "System uprawnień i dostępu do danych",
        "Raportowanie i analityka biznesowa",
      ],
    },
    {
      icon: Search,
      title: "Wyszukiwanie Prawne i Orzecznictwo",
      description:
        "Dostęp do aktualnych przepisów prawa oraz orzecznictwa sądów, ze szczególnym uwzględnieniem praktyki sądów gdańskich.",
      features: [
        "Baza aktów prawnych z komentarzami",
        "Orzecznictwo SN, NSA i sądów powszechnych",
        "Wyszukiwanie semantyczne w dokumentach",
        "Alerty o zmianach w przepisach",
      ],
    },
  ];

  const securityFeatures = [
    {
      title: "Zgodność z RODO",
      description:
        "Pełna zgodność z Rozporządzeniem o Ochronie Danych Osobowych",
    },
    {
      title: "Tajemnica Adwokacka",
      description:
        "Zachowanie tajemnicy zawodowej zgodnie z Kodeksem Etyki Adwokackiej",
    },
    {
      title: "Szyfrowanie Danych",
      description:
        "Szyfrowanie end-to-end wszystkich danych klientów i dokumentów",
    },
    {
      title: "Backup i Archiwizacja",
      description:
        "Automatyczne kopie zapasowe z możliwością odzyskania danych",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge
              variant="secondary"
              className="mb-4 bg-blue-800 text-blue-100"
            >
              FUNKCJONALNOŚCI SYSTEMU
            </Badge>
            <h1 className="text-4xl font-bold mb-6">
              Zaawansowane Narzędzia dla Kancelarii Prawnych
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Kompleksowe rozwiązanie informatyczne dostosowane do potrzeb
              współczesnych kancelarii prawnych działających na terenie Gdańska
              i całego regionu pomorskiego.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {mainFeatures.map((feature, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Bezpieczeństwo i Zgodność Prawna
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Najwyższe standardy bezpieczeństwa danych zgodne z wymogami prawa
              polskiego i standardami etyki zawodowej adwokatów i radców
              prawnych.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {securityFeatures.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <Shield className="h-6 w-6 text-blue-600 mr-3" />
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Gotowy na Modernizację Swojej Kancelarii?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Skontaktuj się z nami, aby umówić prezentację systemu dostosowaną do
            potrzeb Twojej kancelarii.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Umów Prezentację
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
