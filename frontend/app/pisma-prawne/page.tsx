"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Clock,
  Shield,
  Star,
  Download,
  Scale,
  Users,
  ArrowRight,
  Gavel,
} from "lucide-react";
import Link from "next/link";

export default function PismaPrawnePage() {
  const documentCategories = [
    {
      title: "Pisma Procesowe",
      description: "Dokumenty do postępowań sądowych i administracyjnych",
      documents: [
        {
          name: "Sprzeciw od Nakazu Zapłaty",
          description:
            "Profesjonalnie przygotowany sprzeciw z uzasadnieniem prawnym",
          price: "89 zł",
          time: "24h",
          popular: true,
        },
        {
          name: "Odpowiedź na Pozew",
          description:
            "Szczegółowa odpowiedź na zarzuty zawarte w pozwie sądowym",
          price: "149 zł",
          time: "48h",
          popular: false,
        },
        {
          name: "Skarga na Czynność Komornika",
          description: "Zaskarżenie nieprawidłowych działań komornika sądowego",
          price: "99 zł",
          time: "24h",
          popular: true,
        },
        {
          name: "Wniosek o Rozłożenie na Raty",
          description: "Wniosek o rozłożenie należności na raty płatne",
          price: "59 zł",
          time: "12h",
          popular: false,
        },
      ],
    },
    {
      title: "Pisma Pozasądowe",
      description: "Dokumenty do komunikacji z kontrahentami i instytucjami",
      documents: [
        {
          name: "Wezwanie do Zapłaty",
          description: "Formalne wezwanie dłużnika do uregulowania należności",
          price: "49 zł",
          time: "12h",
          popular: false,
        },
        {
          name: "Propozycja Ugody",
          description:
            "Projekt ugody pozasądowej z wierzycielem lub dłużnikiem",
          price: "79 zł",
          time: "18h",
          popular: true,
        },
        {
          name: "Reklamacja/Odstąpienie",
          description: "Reklamacja towaru lub odstąpienie od umowy",
          price: "39 zł",
          time: "6h",
          popular: false,
        },
        {
          name: "Pismo do Banku/Ubezpieczyciela",
          description:
            "Formalne pismo w sprawach bankowych lub ubezpieczeniowych",
          price: "69 zł",
          time: "12h",
          popular: false,
        },
      ],
    },
    {
      title: "Wnioski i Podania",
      description: "Dokumenty do organów administracji publicznej",
      documents: [
        {
          name: "Wniosek o Umorzenie Postępowania",
          description: "Wniosek o umorzenie postępowania egzekucyjnego",
          price: "79 zł",
          time: "24h",
          popular: false,
        },
        {
          name: "Wniosek o Odroczenie Płatności",
          description: "Wniosek o odroczenie terminu płatności należności",
          price: "59 zł",
          time: "12h",
          popular: false,
        },
        {
          name: "Podanie o Zwolnienie z Kosztów",
          description: "Wniosek o zwolnienie od kosztów sądowych",
          price: "49 zł",
          time: "12h",
          popular: false,
        },
        {
          name: "Wniosek o Zabezpieczenie",
          description: "Wniosek o zabezpieczenie roszczenia lub dowodów",
          price: "119 zł",
          time: "24h",
          popular: false,
        },
      ],
    },
  ];

  const process = [
    {
      step: "1",
      title: "Zamów Analizę",
      description:
        "Najpierw zamów analizę dokumentu, aby poznać możliwe działania prawne",
    },
    {
      step: "2",
      title: "Wybierz Pismo",
      description:
        "Na podstawie analizy wybierz odpowiednie pismo prawne z naszej oferty",
    },
    {
      step: "3",
      title: "Uzupełnij Dane",
      description:
        "Wypełnij formularz z danymi niezbędnymi do przygotowania pisma",
    },
    {
      step: "4",
      title: "Otrzymaj Dokument",
      description:
        "Gotowe pismo prawne przygotowane przez doświadczonych prawników",
    },
  ];

  const features = [
    {
      icon: Scale,
      title: "Zgodność z Prawem",
      description:
        "Wszystkie pisma przygotowywane zgodnie z obowiązującymi przepisami",
    },
    {
      icon: Users,
      title: "Doświadczeni Prawnicy",
      description:
        "Dokumenty przygotowywane przez prawników z wieloletnim doświadczeniem",
    },
    {
      icon: Clock,
      title: "Szybka Realizacja",
      description: "Większość pism gotowa w ciągu 24-48 godzin",
    },
    {
      icon: Shield,
      title: "Gwarancja Jakości",
      description: "Profesjonalne pisma z gwarancją poprawności prawnej",
    },
  ];

  const testimonials = [
    {
      name: "Tomasz Kowalski",
      role: "Właściciel firmy",
      content:
        "Sprzeciw od nakazu zapłaty przygotowany przez LegalNexus był perfekcyjny. Sąd uwzględnił wszystkie nasze argumenty i sprawa została umorzona.",
      rating: 5,
    },
    {
      name: "Maria Nowak",
      role: "Przedsiębiorca",
      content:
        "Skarga na czynność komornika pomogła mi odzyskać niesłusznie zajęte środki. Profesjonalne przygotowanie i skuteczność na najwyższym poziomie.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-montserrat">
      {/* USUWAM <Header /> */}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="bg-blue-800 text-blue-100 mb-4 font-medium">
                PROFESJONALNE PISMA PRAWNE
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Pisma Prawne Online
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Potrzebujesz profesjonalnego pisma prawnego? Nasze doświadczone
                zespół prawników przygotuje dla Ciebie skuteczne dokumenty
                procesowe i pozasądowe.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                  asChild
                >
                  <Link href="/zamow-analize">
                    <FileText className="mr-2 h-5 w-5" />
                    Zamów Pismo Teraz
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent font-semibold"
                  asChild
                >
                  <Link href="#rodzaje-pism">Zobacz Rodzaje Pism</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Document Categories */}
        <section id="rodzaje-pism" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Rodzaje Pism Prawnych
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Oferujemy pełen zakres pism prawnych - od sprzeciwów procesowych
                po propozycje ugód pozasądowych. Wszystkie dokumenty
                przygotowywane przez doświadczonych prawników.
              </p>
            </div>

            <div className="space-y-16">
              {documentCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="text-center mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {category.title}
                    </h3>
                    <p className="text-lg text-gray-600">
                      {category.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.documents.map((doc, docIndex) => (
                      <Card
                        key={docIndex}
                        className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                          doc.popular ? "ring-2 ring-blue-500" : ""
                        }`}
                      >
                        {doc.popular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-blue-600 text-white font-medium">
                              <Star className="w-3 h-3 mr-1" />
                              Popularne
                            </Badge>
                          </div>
                        )}

                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardTitle className="text-lg font-bold mb-2">
                                {doc.name}
                              </CardTitle>
                              <p className="text-gray-600 text-sm">
                                {doc.description}
                              </p>
                            </div>
                            <div className="text-right ml-4">
                              <div className="text-xl font-bold text-blue-600">
                                {doc.price}
                              </div>
                              <div className="text-xs text-gray-500 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {doc.time}
                              </div>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <Button
                            className="w-full font-medium"
                            variant={doc.popular ? "default" : "outline"}
                            asChild
                          >
                            <Link href="/zamow-analize">
                              Zamów Pismo
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Jak Zamówić Pismo Prawne?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Prosty proces w 4 krokach - od analizy dokumentu do otrzymania
                gotowego pisma prawnego
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

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Dlaczego Nasze Pisma Prawne?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={index}
                    className="text-center hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Opinie Naszych Klientów
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <Gavel className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
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
                      &quot;{testimonial.content}&quot;
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
              Potrzebujesz Profesjonalnego Pisma Prawnego?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Nie ryzykuj samodzielnego przygotowywania dokumentów. Zamów
              profesjonalne pismo prawne już dziś!
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              asChild
            >
              <Link href="/zamow-analize">
                <Download className="mr-2 h-5 w-5" />
                Zamów Pismo Teraz
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* USUWAM <Footer /> */}
    </div>
  );
}
