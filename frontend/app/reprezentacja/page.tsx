"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Scale,
  Gavel,
  FileText,
  Users,
  CheckCircle,
  Star,
  Shield,
  Award,
  Clock,
  ArrowRight,
  Building,
  User,
} from "lucide-react";
import Link from "next/link";

export default function ReprezentacjaPage() {
  const representationTypes = [
    {
      title: "Reprezentacja w Sprawach Cywilnych",
      description: "Pełna reprezentacja procesowa w sądach powszechnych",
      icon: Scale,
      areas: [
        "Sprawy o zapłatę i windykacja należności",
        "Sprawy z umów cywilnoprawnych",
        "Odszkodowania i zadośćuczynienia",
        "Sprawy rodzinne i spadkowe",
        "Sprawy z zakresu prawa nieruchomości",
      ],
      pricing: "Wycena indywidualna",
      popular: true,
    },
    {
      title: "Reprezentacja w Sprawach Gospodarczych",
      description: "Obsługa prawna przedsiębiorców i firm",
      icon: Building,
      areas: [
        "Spory handlowe między przedsiębiorcami",
        "Sprawy z umów gospodarczych",
        "Postępowania upadłościowe",
        "Sprawy z zakresu prawa spółek",
        "Ochrona własności intelektualnej",
      ],
      pricing: "Od 300 zł/h",
      popular: false,
    },
    {
      title: "Reprezentacja w Sprawach Administracyjnych",
      description: "Postępowania przed organami administracji publicznej",
      icon: FileText,
      areas: [
        "Odwołania od decyzji administracyjnych",
        "Sprawy podatkowe i celne",
        "Postępowania koncesyjne i zezwoleniowe",
        "Sprawy z zakresu prawa budowlanego",
        "Postępowania przed NSA",
      ],
      pricing: "Od 250 zł/h",
      popular: false,
    },
    {
      title: "Reprezentacja w Sprawach Karnych",
      description: "Obrona w postępowaniach karnych i wykroczeniowych",
      icon: Gavel,
      areas: [
        "Obrona w sprawach karnych",
        "Sprawy o wykroczenia",
        "Postępowania w sprawach nieletnich",
        "Sprawy karne skarbowe",
        "Postępowania odwoławcze",
      ],
      pricing: "Od 400 zł/h",
      popular: false,
    },
  ];

  const services = [
    {
      title: "Analiza Sprawy",
      description: "Szczegółowa analiza dokumentów i ocena szans powodzenia",
      included: true,
    },
    {
      title: "Przygotowanie Pism Procesowych",
      description: "Profesjonalne przygotowanie wszystkich pism sądowych",
      included: true,
    },
    {
      title: "Reprezentacja na Rozprawach",
      description: "Pełna reprezentacja podczas wszystkich posiedzeń sądowych",
      included: true,
    },
    {
      title: "Negocjacje i Ugody",
      description: "Prowadzenie negocjacji i przygotowanie ugód pozasądowych",
      included: true,
    },
    {
      title: "Egzekucja Wyroków",
      description: "Pomoc w egzekucji korzystnych wyroków sądowych",
      included: false,
    },
    {
      title: "Postępowanie Odwoławcze",
      description: "Reprezentacja w postępowaniach odwoławczych i kasacyjnych",
      included: false,
    },
  ];

  const process = [
    {
      step: "1",
      title: "Konsultacja Wstępna",
      description: "Bezpłatna konsultacja i ocena szans powodzenia sprawy",
    },
    {
      step: "2",
      title: "Analiza Dokumentów",
      description:
        "Szczegółowa analiza wszystkich dokumentów związanych ze sprawą",
    },
    {
      step: "3",
      title: "Strategia Procesowa",
      description:
        "Opracowanie strategii prowadzenia sprawy i harmonogramu działań",
    },
    {
      step: "4",
      title: "Reprezentacja Sądowa",
      description:
        "Pełna reprezentacja procesowa aż do prawomocnego zakończenia sprawy",
    },
  ];

  const advantages = [
    {
      icon: Users,
      title: "Doświadczony Zespół",
      description:
        "Prawnicy z wieloletnim doświadczeniem w reprezentacji sądowej",
    },
    {
      icon: Award,
      title: "Wysoka Skuteczność",
      description: "Ponad 85% wygranych spraw w naszej praktyce prawniczej",
    },
    {
      icon: Shield,
      title: "Pełne Bezpieczeństwo",
      description:
        "Ubezpieczenie OC prawnika i gwarancja profesjonalnej obsługi",
    },
    {
      icon: Clock,
      title: "Terminowość",
      description: "Dotrzymujemy wszystkich terminów procesowych i sądowych",
    },
  ];

  const testimonials = [
    {
      name: "Robert Kowalski",
      role: "Właściciel firmy budowlanej",
      content:
        "Reprezentacja w sprawie o zapłatę 200 000 zł zakończyła się pełnym sukcesem. Profesjonalizm i zaangażowanie na najwyższym poziomie.",
      rating: 5,
      caseType: "Sprawa gospodarcza",
    },
    {
      name: "Anna Nowak",
      role: "Przedsiębiorca",
      content:
        "Dzięki profesjonalnej reprezentacji wygrałam sprawę o odszkodowanie. Prawnik był zawsze dostępny i trzymał mnie na bieżąco.",
      rating: 5,
      caseType: "Sprawa cywilna",
    },
    {
      name: "Marek Wiśniewski",
      role: "Dyrektor spółki",
      content:
        "Skomplikowana sprawa administracyjna została rozwiązana w naszą korzyść. Polecam każdemu potrzebującemu pomocy prawnej.",
      rating: 5,
      caseType: "Sprawa administracyjna",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-montserrat">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="bg-blue-800 text-blue-100 mb-4 font-medium">
                PROFESJONALNA REPREZENTACJA PRAWNA
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Reprezentacja Sądowa
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Potrzebujesz profesjonalnej reprezentacji w sądzie? Nasz
                doświadczony zespół prawników zapewni Ci pełną obsługę prawną od
                analizy sprawy do prawomocnego wyroku.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                  asChild
                >
                  <Link href="/kontakt">
                    <Scale className="mr-2 h-5 w-5" />
                    Bezpłatna Konsultacja
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent font-semibold"
                  asChild
                >
                  <Link href="#rodzaje-reprezentacji">Zobacz Nasze Usługi</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Representation Types */}
        <section id="rodzaje-reprezentacji" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Rodzaje Reprezentacji Prawnej
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Oferujemy pełną reprezentację prawną we wszystkich rodzajach
                postępowań sądowych i administracyjnych
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {representationTypes.map((type, index) => (
                <Card
                  key={index}
                  className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                    type.popular ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  {type.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white font-medium">
                        <Star className="w-3 h-3 mr-1" />
                        Najpopularniejsze
                      </Badge>
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                          <type.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold">
                            {type.title}
                          </CardTitle>
                          <p className="text-sm text-gray-500">
                            {type.pricing}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{type.description}</p>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3 mb-6">
                      <h4 className="font-semibold text-gray-900">
                        Obszary reprezentacji:
                      </h4>
                      {type.areas.map((area, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{area}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className="w-full font-medium"
                      variant={type.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/kontakt">
                        Umów Konsultację
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Included */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Co Obejmuje Reprezentacja?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Pełna obsługa prawna od momentu przyjęcia sprawy do jej
                prawomocnego zakończenia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className={`hover:shadow-lg transition-shadow ${
                    service.included
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      {service.included ? (
                        <Badge className="bg-green-100 text-green-800">
                          Wliczone
                        </Badge>
                      ) : (
                        <Badge variant="outline">Dodatkowo</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Jak Przebiega Reprezentacja?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Strukturalny proces reprezentacji prawnej zapewniający najwyższą
                jakość obsługi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                  {index < process.length - 1 && (
                    <ArrowRight className="hidden md:block absolute top-8 -right-4 h-5 w-5 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Dlaczego Warto Nas Wybrać?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((advantage, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <advantage.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{advantage.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{advantage.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Opinie Naszych Klientów
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="mb-2">
                      {testimonial.caseType}
                    </Badge>
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 italic">
                      "{testimonial.content}"
                    </p>
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
              Potrzebujesz Reprezentacji Prawnej?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Skontaktuj się z nami już dziś i umów bezpłatną konsultację.
              Ocenimy Twoją sprawę i przedstawimy plan działania.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                asChild
              >
                <Link href="/kontakt">
                  <Scale className="mr-2 h-5 w-5" />
                  Bezpłatna Konsultacja
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent font-semibold"
                asChild
              >
                <Link href="tel:+48581234567">
                  <Gavel className="mr-2 h-5 w-5" />
                  Zadzwoń: +48 58 123 45 67
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
