"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, X, Star, Phone, Mail } from "lucide-react";

export default function CennikPage() {
  const plans = [
    {
      name: "Starter",
      price: "2,500",
      period: "miesięcznie",
      description:
        "Idealne rozwiązanie dla małych kancelarii i indywidualnych praktyk prawniczych",
      features: [
        "Do 3 prawników",
        "Zarządzanie do 100 spraw miesięcznie",
        "Podstawowe szablony dokumentów",
        "Kalendarz rozpraw i terminów",
        "Wsparcie e-mail (48h)",
        "Backup danych",
        "Zgodność z RODO",
      ],
      notIncluded: [
        "Asystent AI LexiCore",
        "Integracja z sądami",
        "Zaawansowana analityka",
        "API dostęp",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "4,900",
      period: "miesięcznie",
      description:
        "Kompleksowe rozwiązanie dla średnich kancelarii prawnych w Gdańsku",
      features: [
        "Do 10 prawników",
        "Nieograniczona liczba spraw",
        "Wszystkie szablony dokumentów",
        "Asystent AI LexiCore (500 zapytań/miesiąc)",
        "Integracja z systemami sądowymi",
        "Zaawansowany kalendarz i przypomnienia",
        "Analityka i raporty",
        "Wsparcie telefoniczne (24h)",
        "Dedykowany opiekun klienta",
        "Szkolenia dla zespołu",
      ],
      notIncluded: [
        "Nieograniczony dostęp do AI",
        "Własne szablony dokumentów",
        "Integracja z systemami zewnętrznymi",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Wycena indywidualna",
      period: "",
      description:
        "Rozwiązanie dla dużych kancelarii i firm prawniczych z oddziałami",
      features: [
        "Nieograniczona liczba prawników",
        "Nieograniczona liczba spraw",
        "Pełny dostęp do LexiCore AI",
        "Własne szablony i procesy",
        "Integracje z systemami klienta",
        "Dedykowany serwer/chmura prywatna",
        "SLA 99.9% dostępności",
        "Wsparcie 24/7/365",
        "Dedykowany zespół wsparcia",
        "Regularne szkolenia i konsultacje",
        "Możliwość modyfikacji systemu",
      ],
      notIncluded: [],
      popular: false,
    },
  ];

  const additionalServices = [
    {
      name: "Migracja Danych",
      price: "od 5,000 PLN",
      description: "Profesjonalna migracja danych z dotychczasowego systemu",
    },
    {
      name: "Szkolenia Zaawansowane",
      price: "1,200 PLN/dzień",
      description: "Dedykowane szkolenia dla zespołu prawników",
    },
    {
      name: "Integracje Zewnętrzne",
      price: "od 3,000 PLN",
      description: "Integracja z systemami księgowymi, CRM i innymi",
    },
    {
      name: "Wsparcie Premium",
      price: "800 PLN/miesiąc",
      description: "Priorytetowe wsparcie techniczne 24/7",
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
              CENNIK I PAKIETY
            </Badge>
            <h1 className="text-4xl font-bold mb-6">
              Przejrzyste Ceny dla Kancelarii Prawnych
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Wybierz pakiet dostosowany do wielkości i potrzeb Twojej
              kancelarii. Wszystkie ceny zawierają pełne wsparcie techniczne i
              regularne aktualizacje.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.popular ? "ring-2 ring-blue-500 scale-105" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      Najpopularniejszy
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    {plan.price !== "Wycena indywidualna" ? (
                      <>
                        <span className="text-4xl font-bold text-blue-600">
                          {plan.price}
                        </span>
                        <span className="text-gray-600 ml-2">
                          PLN {plan.period}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-blue-600">
                        {plan.price}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-4">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}

                    {plan.notIncluded.map((feature, idx) => (
                      <div key={idx} className="flex items-start opacity-50">
                        <X className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-500">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6">
                    <Button
                      className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.price === "Wycena indywidualna"
                        ? "Skontaktuj się"
                        : "Wybierz Pakiet"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Dodatkowe Usługi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rozszerz funkcjonalność systemu o dodatkowe usługi dostosowane do
              specyficznych potrzeb Twojej kancelarii.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {additionalServices.map((service, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold">{service.name}</h3>
                    <span className="text-blue-600 font-bold">
                      {service.price}
                    </span>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">
              Potrzebujesz Indywidualnej Wyceny?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Skontaktuj się z naszym zespołem, aby omówić specjalne potrzeby
              Twojej kancelarii i otrzymać spersonalizowaną ofertę.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 text-white mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Konsultacja Telefoniczna
                </h3>
                <p className="text-blue-100 mb-4">
                  Porozmawiaj z naszym ekspertem
                </p>
                <p className="text-xl font-bold">+48 58 123 45 67</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-white mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Zapytanie E-mail</h3>
                <p className="text-blue-100 mb-4">
                  Otrzymaj szczegółową ofertę
                </p>
                <p className="text-xl font-bold">oferta@legal-nexus.pl</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
