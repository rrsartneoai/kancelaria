"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileText,
  Search,
  Clock,
  CheckCircle,
  Shield,
  CreditCard,
  Download,
  MessageSquare,
  Star,
  Users,
  Award,
} from "lucide-react";
import Link from "next/link";

export default function JakToDzialaPage() {
  const steps = [
    {
      number: "01",
      title: "Prześlij Dokument",
      description:
        "Wgraj zdjęcie lub skan dokumentu prawnego (nakaz zapłaty, wezwanie komornika, pozew sądowy)",
      icon: Upload,
      details: [
        "Akceptujemy formaty: PDF, JPG, PNG, DOCX",
        "Maksymalny rozmiar pliku: 10MB",
        "Automatyczne rozpoznawanie tekstu (OCR)",
        "Bezpieczne przesyłanie z szyfrowaniem SSL",
      ],
      time: "2 minuty",
    },
    {
      number: "02",
      title: "Opisz Sytuację",
      description:
        "Wypełnij krótki formularz opisujący Twoją sytuację prawną i oczekiwania",
      icon: FileText,
      details: [
        "Podstawowe dane osobowe",
        "Opis okoliczności sprawy",
        "Twoje stanowisko w sprawie",
        "Oczekiwany rezultat",
      ],
      time: "5 minut",
    },
    {
      number: "03",
      title: "Zapłać za Analizę",
      description:
        "Wybierz metodę płatności i opłać profesjonalną analizę prawną",
      icon: CreditCard,
      details: [
        "Płatność kartą lub BLIK",
        "Bezpieczne płatności przez Stripe",
        "Faktura VAT automatycznie",
        "Gwarancja zwrotu pieniędzy",
      ],
      time: "1 minuta",
    },
    {
      number: "04",
      title: "Otrzymaj Analizę",
      description:
        "W ciągu 24 godzin otrzymasz szczegółową analizę prawną przygotowaną przez eksperta",
      icon: Search,
      details: [
        "Ocena formalnej poprawności dokumentu",
        "Analiza merytoryczna sprawy",
        "Wskazanie możliwych działań",
        "Ocena szans powodzenia",
      ],
      time: "24 godziny",
    },
    {
      number: "05",
      title: "Zamów Pisma Prawne",
      description:
        "Na podstawie analizy zamów potrzebne pisma procesowe lub pozasądowe",
      icon: Download,
      details: [
        "Sprzeciwy od nakazów zapłaty",
        "Skargi na czynności komornika",
        "Wnioski procesowe",
        "Propozycje ugód",
      ],
      time: "48 godzin",
    },
    {
      number: "06",
      title: "Wsparcie Prawne",
      description:
        "Otrzymuj bieżące wsparcie i konsultacje w trakcie prowadzenia sprawy",
      icon: MessageSquare,
      details: [
        "Konsultacje telefoniczne",
        "Odpowiedzi na pytania",
        "Aktualizacje prawne",
        "Monitoring terminów",
      ],
      time: "Na bieżąco",
    },
  ];

  const features = [
    {
      title: "Sztuczna Inteligencja",
      description:
        "Wykorzystujemy AI do wstępnej analizy dokumentów, co przyspiesza proces i obniża koszty",
      icon: Search,
    },
    {
      title: "Doświadczeni Prawnicy",
      description:
        "Każda analiza jest weryfikowana przez prawników z wieloletnim doświadczeniem",
      icon: Users,
    },
    {
      title: "Gwarancja Jakości",
      description:
        "Wszystkie dokumenty przygotowywane zgodnie z najwyższymi standardami prawniczymi",
      icon: Award,
    },
    {
      title: "Bezpieczeństwo Danych",
      description:
        "Pełna ochrona danych osobowych zgodnie z RODO i tajemnicą zawodową",
      icon: Shield,
    },
  ];

  const testimonials = [
    {
      name: "Anna Kowalska",
      role: "Przedsiębiorca",
      content:
        "Otrzymałam nakaz zapłaty i nie wiedziałam co robić. Dzięki LegalNexus szybko otrzymałam profesjonalną analizę i skuteczny sprzeciw. Sprawa została umorzona!",
      rating: 5,
    },
    {
      name: "Marek Nowak",
      role: "Właściciel firmy",
      content:
        "Komornik zajął moje konto firmowe. Analiza wykazała nieprawidłowości w postępowaniu. Złożyliśmy skargę i odzyskałem środki w ciągu miesiąca.",
      rating: 5,
    },
    {
      name: "Katarzyna Wiśniewska",
      role: "Freelancer",
      content:
        "Profesjonalna obsługa, szybka realizacja i przystępne ceny. Polecam każdemu, kto potrzebuje pomocy prawnej bez wychodzenia z domu.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-montserrat">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="bg-blue-800 text-blue-100 mb-4 font-medium">
              PROFESJONALNA POMOC PRAWNA ONLINE
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Jak Działa LegalNexus?
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Poznaj nasz sprawdzony proces pomocy prawnej online. Od przesłania
              dokumentu do otrzymania gotowych pism prawnych - wszystko w 6
              prostych krokach.
            </p>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Proces Krok po Kroku
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nasz ustrukturyzowany proces gwarantuje profesjonalną obsługę i
                najwyższą jakość usług prawnych
              </p>
            </div>

            <div className="space-y-16">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-12 ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                        {step.number}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {step.title}
                        </h3>
                        <div className="flex items-center text-blue-600 font-medium">
                          <Clock className="h-4 w-4 mr-1" />
                          {step.time}
                        </div>
                      </div>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1">
                    <Card className="p-8 shadow-lg">
                      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <step.icon className="h-12 w-12 text-blue-600" />
                      </div>
                      <div className="text-center">
                        <h4 className="text-xl font-semibold mb-2">
                          Etap {step.number}
                        </h4>
                        <p className="text-gray-600">{step.title}</p>
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Dlaczego LegalNexus?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Łączymy nowoczesną technologię z tradycyjną wiedzą prawniczą
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
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
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Zobacz co mówią o nas zadowoleni klienci
              </p>
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
              Gotowy na Profesjonalną Pomoc Prawną?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Nie czekaj - każdy dzień zwłoki może mieć znaczenie prawne.
              Rozpocznij proces już dziś!
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
                <Link href="/kontakt">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Skontaktuj się z Nami
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
