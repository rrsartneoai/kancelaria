"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Video,
  MessageSquare,
  Clock,
  CheckCircle,
  Star,
  Calendar,
  Shield,
  Award,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function KonsultacjePage() {
  const consultationTypes = [
    {
      title: "Konsultacja Telefoniczna",
      description:
        "Szybka konsultacja prawna przez telefon w dogodnym dla Ciebie terminie",
      icon: Phone,
      price: "150 zł/h",
      duration: "30-60 min",
      popular: true,
      features: [
        "Natychmiastowa pomoc prawna",
        "Elastyczne godziny konsultacji",
        "Nagranie rozmowy (opcjonalnie)",
        "Podsumowanie pisemne po rozmowie",
        "Możliwość zadawania pytań kontrolnych",
      ],
    },
    {
      title: "Wideokonferencja Online",
      description:
        "Profesjonalna konsultacja prawna przez wideokonferencję z możliwością udostępniania dokumentów",
      icon: Video,
      price: "180 zł/h",
      duration: "30-90 min",
      popular: false,
      features: [
        "Bezpieczna platforma wideokonferencyjna",
        "Udostępnianie dokumentów w czasie rzeczywistym",
        "Nagranie sesji (za zgodą)",
        "Możliwość prezentacji prawnych",
        "Szczegółowe omówienie dokumentów",
      ],
    },
    {
      title: "Konsultacja Pisemna",
      description:
        "Szczegółowa odpowiedź prawna w formie pisemnej na Twoje pytania",
      icon: MessageSquare,
      price: "120 zł",
      duration: "24-48h",
      popular: false,
      features: [
        "Szczegółowa analiza prawna",
        "Odpowiedź w formie pisemnej",
        "Powołanie się na przepisy prawne",
        "Wskazanie dalszych kroków",
        "Możliwość zadania pytań uzupełniających",
      ],
    },
    {
      title: "Konsultacja Ekspresowa",
      description:
        "Pilna konsultacja prawna w sprawach wymagających natychmiastowej reakcji",
      icon: Clock,
      price: "200 zł/h",
      duration: "15-30 min",
      popular: true,
      features: [
        "Dostępność 24/7",
        "Odpowiedź w ciągu 2 godzin",
        "Priorytetowe traktowanie",
        "Wsparcie w sprawach pilnych",
        "Możliwość przedłużenia konsultacji",
      ],
    },
  ];

  const specializations = [
    {
      title: "Prawo Cywilne",
      areas: ["Umowy", "Odszkodowania", "Sprawy rodzinne", "Nieruchomości"],
    },
    {
      title: "Prawo Gospodarcze",
      areas: [
        "Działalność gospodarcza",
        "Umowy handlowe",
        "Spory z kontrahentami",
        "Windykacja",
      ],
    },
    {
      title: "Prawo Pracy",
      areas: ["Umowy o pracę", "Wypowiedzenia", "Mobbing", "Wynagrodzenia"],
    },
    {
      title: "Prawo Administracyjne",
      areas: [
        "Decyzje administracyjne",
        "Odwołania",
        "Postępowania",
        "Koncesje i zezwolenia",
      ],
    },
  ];

  const process = [
    {
      step: "1",
      title: "Wybierz Rodzaj Konsultacji",
      description:
        "Zdecyduj czy potrzebujesz konsultacji telefonicznej, online czy pisemnej",
    },
    {
      step: "2",
      title: "Zarezerwuj Termin",
      description: "Wybierz dogodny termin z kalendarza dostępnych terminów",
    },
    {
      step: "3",
      title: "Opłać Konsultację",
      description: "Bezpieczna płatność online z automatyczną fakturą VAT",
    },
    {
      step: "4",
      title: "Otrzymaj Pomoc Prawną",
      description: "Profesjonalna konsultacja z doświadczonym prawnikiem",
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: "Doświadczeni Prawnicy",
      description:
        "Konsultacje prowadzone przez prawników z wieloletnim doświadczeniem",
    },
    {
      icon: Clock,
      title: "Elastyczne Godziny",
      description: "Konsultacje dostępne również wieczorem i w weekendy",
    },
    {
      icon: Shield,
      title: "Pełna Poufność",
      description: "Zachowujemy tajemnicę zawodową i bezpieczeństwo danych",
    },
    {
      icon: Award,
      title: "Gwarancja Jakości",
      description: "Profesjonalne doradztwo zgodne z najwyższymi standardami",
    },
  ];

  const testimonials = [
    {
      name: "Katarzyna Wiśniewska",
      role: "Właścicielka firmy",
      content:
        "Konsultacja telefoniczna pomogła mi rozwiązać skomplikowaną sprawę z kontrahentem. Prawnik był bardzo kompetentny i cierpliwy w wyjaśnianiu.",
      rating: 5,
    },
    {
      name: "Piotr Kowalski",
      role: "Freelancer",
      content:
        "Skorzystałem z konsultacji ekspresowej w sprawie nakazu zapłaty. Otrzymałem natychmiastową pomoc i konkretne wskazówki działania.",
      rating: 5,
    },
    {
      name: "Anna Nowak",
      role: "Menedżer",
      content:
        "Wideokonferencja była bardzo profesjonalna. Mogłam pokazać dokumenty i otrzymać szczegółowe wyjaśnienia. Polecam!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-montserrat">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="bg-blue-800 text-blue-100 mb-4 font-medium">
                PROFESJONALNE KONSULTACJE PRAWNE
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Konsultacje Prawne Online
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Potrzebujesz szybkiej porady prawnej? Skorzystaj z naszych
                profesjonalnych konsultacji online, telefonicznych lub
                pisemnych. Doświadczeni prawnicy pomogą Ci rozwiązać każdy
                problem prawny.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                  asChild
                >
                  <Link href="#rodzaje-konsultacji">
                    <Calendar className="mr-2 h-5 w-5" />
                    Zarezerwuj Konsultację
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent font-semibold"
                  asChild
                >
                  <Link href="/kontakt">
                    <Phone className="mr-2 h-5 w-5" />
                    Zadzwoń Teraz
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Consultation Types */}
        <section id="rodzaje-konsultacji" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Rodzaje Konsultacji Prawnych
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Wybierz formę konsultacji, która najlepiej odpowiada Twoim
                potrzebom. Wszystkie konsultacje prowadzone przez doświadczonych
                prawników.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {consultationTypes.map((consultation, index) => (
                <Card
                  key={index}
                  className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                    consultation.popular ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  {consultation.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white font-medium">
                        <Star className="w-3 h-3 mr-1" />
                        Popularne
                      </Badge>
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                          <consultation.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold">
                            {consultation.title}
                          </CardTitle>
                          <p className="text-sm text-gray-500">
                            {consultation.duration}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {consultation.price}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{consultation.description}</p>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3 mb-6">
                      <h4 className="font-semibold text-gray-900">
                        Co obejmuje konsultacja:
                      </h4>
                      {consultation.features.map((feature, idx) => (
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
                      variant={consultation.popular ? "default" : "outline"}
                    >
                      Zarezerwuj Konsultację
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Specializations */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nasze Specjalizacje
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Oferujemy konsultacje prawne w szerokim zakresie dziedzin prawa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {specializations.map((spec, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg text-center">
                      {spec.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {spec.areas.map((area, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                          {area}
                        </li>
                      ))}
                    </ul>
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
                Jak Umówić Konsultację?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Prosty proces w 4 krokach - od wyboru rodzaju konsultacji do
                otrzymania profesjonalnej pomocy prawnej
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
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Dlaczego Nasze Konsultacje?
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
              Potrzebujesz Porady Prawnej?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Nie czekaj - skorzystaj z profesjonalnej konsultacji prawnej już
              dziś!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Zarezerwuj Konsultację
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent font-semibold"
                asChild
              >
                <Link href="/kontakt">
                  <Phone className="mr-2 h-5 w-5" />
                  Zadzwoń Teraz
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
