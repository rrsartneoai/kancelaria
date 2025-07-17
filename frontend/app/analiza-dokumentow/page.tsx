"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  Shield,
  Star,
  Upload,
  Award,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function AnalizaDokumentowPage() {
  const documentTypes = [
    {
      title: "Nakaz Zapłaty",
      description:
        "Analiza formalnej poprawności nakazu zapłaty i możliwości obrony",
      price: "49 zł",
      time: "24h",
      popular: true,
      features: [
        "Sprawdzenie poprawności formalnej",
        "Analiza podstaw prawnych roszczenia",
        "Ocena możliwości złożenia sprzeciwu",
        "Wskazanie terminów procesowych",
        "Propozycje działań prawnych",
      ],
    },
    {
      title: "Wezwanie Komornika",
      description: "Ocena legalności działań komorniczych i możliwości obrony",
      price: "59 zł",
      time: "24h",
      popular: false,
      features: [
        "Weryfikacja uprawnień komornika",
        "Analiza tytułu wykonawczego",
        "Sprawdzenie procedury egzekucyjnej",
        "Możliwości złożenia skargi",
        "Ochrona majątku przed zajęciem",
      ],
    },
    {
      title: "Pozew Sądowy",
      description: "Szczegółowa analiza pozwu i przygotowanie strategii obrony",
      price: "89 zł",
      time: "48h",
      popular: false,
      features: [
        "Analiza zarzutów pozwu",
        "Ocena dowodów strony przeciwnej",
        "Identyfikacja słabych punktów",
        "Strategia obrony procesowej",
        "Przygotowanie odpowiedzi na pozew",
      ],
    },
    {
      title: "Upomnienie Przedsądowe",
      description: "Ocena zasadności roszczeń i możliwości negocjacji",
      price: "39 zł",
      time: "12h",
      popular: false,
      features: [
        "Weryfikacja podstaw prawnych",
        "Analiza wysokości roszczenia",
        "Możliwości negocjacji ugody",
        "Przygotowanie odpowiedzi",
        "Strategia dalszego postępowania",
      ],
    },
  ];

  const process = [
    {
      step: "1",
      title: "Prześlij Dokument",
      description:
        "Wgraj skan lub zdjęcie dokumentu w formacie PDF, JPG lub PNG",
    },
    {
      step: "2",
      title: "Opisz Sytuację",
      description:
        "Wypełnij krótki formularz z podstawowymi informacjami o sprawie",
    },
    {
      step: "3",
      title: "Zapłać za Analizę",
      description:
        "Bezpieczna płatność kartą lub BLIK z automatyczną fakturą VAT",
    },
    {
      step: "4",
      title: "Otrzymaj Analizę",
      description:
        "Szczegółowy raport prawny przygotowany przez doświadczonych prawników",
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Szybka Realizacja",
      description: "Większość analiz gotowa w ciągu 24 godzin",
    },
    {
      icon: Users,
      title: "Doświadczeni Prawnicy",
      description:
        "Analizy przygotowywane przez prawników z wieloletnim doświadczeniem",
    },
    {
      icon: Shield,
      title: "Pełna Poufność",
      description: "Zachowujemy tajemnicę zawodową i bezpieczeństwo danych",
    },
    {
      icon: Award,
      title: "Gwarancja Jakości",
      description: "Profesjonalne analizy zgodne z najwyższymi standardami",
    },
  ];

  const testimonials = [
    {
      name: "Anna Kowalska",
      role: "Przedsiębiorca",
      content:
        "Otrzymałam nakaz zapłaty na kwotę 15 000 zł. Analiza wykazała błędy formalne i pomogła mi skutecznie się bronić. Sprawa została umorzona!",
      rating: 5,
    },
    {
      name: "Marek Nowak",
      role: "Właściciel firmy",
      content:
        "Komornik zajął moje konto firmowe. Dzięki analizie dowiedziałem się o nieprawidłowościach w postępowaniu i odzyskałem środki.",
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
                PROFESJONALNA ANALIZA PRAWNA
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Analiza Dokumentów Prawnych
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Otrzymałeś pismo prawne i nie wiesz jak się zachować? Nasze
                profesjonalne analizy pomogą Ci zrozumieć sytuację i podjąć
                właściwe działania.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                  asChild
                >
                  <Link href="/zamow-analize">
                    <Upload className="mr-2 h-5 w-5" />
                    Zamów Analizę Teraz
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent font-semibold"
                  asChild
                >
                  <Link href="#rodzaje-analiz">Zobacz Rodzaje Analiz</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Document Types */}
        <section id="rodzaje-analiz" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Rodzaje Analiz Dokumentów
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Oferujemy profesjonalne analizy wszystkich rodzajów dokumentów
                prawnych. Każda analiza zawiera szczegółowe omówienie i
                konkretne wskazówki działania.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {documentTypes.map((doc, index) => (
                <Card
                  key={index}
                  className={`relative hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                    doc.popular ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  {doc.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white font-medium">
                        <Star className="w-3 h-3 mr-1" />
                        Najpopularniejsze
                      </Badge>
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <CardTitle className="text-xl font-bold">
                          {doc.title}
                        </CardTitle>
                        <p className="text-gray-600 mt-2">{doc.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {doc.price}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {doc.time}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3 mb-6">
                      <h4 className="font-semibold text-gray-900">
                        Co zawiera analiza:
                      </h4>
                      {doc.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className="w-full font-medium"
                      variant={doc.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/zamow-analize">
                        Zamów Analizę
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Jak Przebiega Analiza?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Prosty proces w 4 krokach - od przesłania dokumentu do
                otrzymania profesjonalnej analizy prawnej
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

        {/* Benefits */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Dlaczego Warto Wybrać Nasze Analizy?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
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
                        <Users className="h-6 w-6 text-blue-600" />
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
              Potrzebujesz Analizy Dokumentu?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Nie czekaj - każdy dzień zwłoki może mieć znaczenie prawne. Zamów
              profesjonalną analizę już dziś!
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              asChild
            >
              <Link href="/zamow-analize">
                <Upload className="mr-2 h-5 w-5" />
                Zamów Analizę Teraz
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* USUWAM <Footer /> */}
    </div>
  );
}
