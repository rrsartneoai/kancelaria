"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Lock,
  User,
  Database,
  Mail,
  Cookie,
  Info,
  CheckCircle,
  Clock,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PolitykaPrywatnosciPage() {
  const sections = [
    {
      title: "Wprowadzenie",
      content: `
        Niniejsza Polityka Prywatności określa zasady gromadzenia, przetwarzania i ochrony danych osobowych Klientów korzystających z platformy LegalNexus, z siedzibą w Gdańsku, ul. Długa 46/47, 80-831 Gdańsk. Dbamy o Twoją prywatność i bezpieczeństwo Twoich danych.
        Prosimy o dokładne zapoznanie się z niniejszą Polityką Prywatności.
      `,
    },
    {
      title: "Administrator Danych Osobowych",
      content: `
        Administratorem Twoich danych osobowych jest LegalNexus, z siedzibą w Gdańsku, ul. Długa 46/47, 80-831 Gdańsk.
        W sprawach związanych z ochroną danych osobowych możesz skontaktować się z nami pod adresem e-mail: [adres e-mail Inspektora Ochrony Danych Osobowych, np. iod@legalnexus.pl] lub telefonicznie: +48 58 123 45 67.
      `,
    },
    {
      title: "Rodzaje Gromadzonych Danych",
      content: `
        Gromadzimy następujące kategorie danych osobowych:
        - Dane identyfikacyjne: imię, nazwisko, adres e-mail, numer telefonu, adres zamieszkania/siedziby.
        - Dane dotyczące płatności: informacje niezbędne do realizacji transakcji (nie przechowujemy danych kart płatniczych, są one przetwarzane przez zewnętrznych dostawców płatności).
        - Dane dotyczące korzystania z usług: historia zamówień, przesłane dokumenty, treść konsultacji.
        - Dane techniczne: adres IP, typ przeglądarki, system operacyjny, dane o aktywności na stronie (za pośrednictwem plików cookies).
      `,
    },
    {
      title: "Cele i Podstawy Prawne Przetwarzania Danych",
      content: `
        Twoje dane osobowe przetwarzamy w następujących celach i na następujących podstawach prawnych:
        - Świadczenie usług prawnych (art. 6 ust. 1 lit. b RODO) – niezbędne do wykonania umowy.
        - Realizacja płatności (art. 6 ust. 1 lit. b RODO) – niezbędne do wykonania umowy.
        - Obsługa reklamacji i zapytań (art. 6 ust. 1 lit. b i f RODO) – niezbędne do wykonania umowy lub prawnie uzasadniony interes administratora.
        - Marketing bezpośredni (art. 6 ust. 1 lit. f RODO) – prawnie uzasadniony interes administratora lub Twoja zgoda (art. 6 ust. 1 lit. a RODO).
        - Wypełnianie obowiązków prawnych (art. 6 ust. 1 lit. c RODO) – np. obowiązki podatkowe, rachunkowe.
        - Analiza i statystyka (art. 6 ust. 1 lit. f RODO) – prawnie uzasadniony interes administratora w celu poprawy jakości usług.
      `,
    },
    {
      title: "Udostępnianie Danych",
      content: `
        Twoje dane osobowe mogą być udostępniane:
        - Podmiotom przetwarzającym dane w naszym imieniu (np. dostawcom usług IT, księgowym, operatorom płatności).
        - Prawnikom współpracującym z LegalNexus w celu świadczenia usług prawnych.
        - Organom państwowym uprawnionym do ich otrzymania na podstawie przepisów prawa.
        Nie sprzedajemy ani nie wynajmujemy Twoich danych osobowych stronom trzecim.
      `,
    },
    {
      title: "Okres Przechowywania Danych",
      content: `
        Twoje dane osobowe będą przechowywane przez okres niezbędny do realizacji celów, dla których zostały zebrane, a także:
        - Przez okres obowiązywania umowy o świadczenie usług.
        - Przez okres niezbędny do dochodzenia roszczeń lub obrony przed roszczeniami.
        - Przez okres wymagany przepisami prawa (np. podatkowego, rachunkowego).
        Po upływie tych okresów dane zostaną usunięte lub zanonimizowane.
      `,
    },
    {
      title: "Twoje Prawa",
      content: `
        Masz prawo do:
        - Dostępu do swoich danych osobowych.
        - Sprostowania (poprawiania) swoich danych.
        - Usunięcia danych (prawo do bycia zapomnianym).
        - Ograniczenia przetwarzania danych.
        - Przenoszenia danych.
        - Wniesienia sprzeciwu wobec przetwarzania danych.
        - Wycofania zgody na przetwarzanie danych w dowolnym momencie (jeśli przetwarzanie odbywa się na podstawie zgody).
        - Wniesienia skargi do organu nadzorczego (Prezesa Urzędu Ochrony Danych Osobowych).
        Aby skorzystać z tych praw, skontaktuj się z nami.
      `,
    },
    {
      title: "Pliki Cookies",
      content: `
        Nasza strona internetowa wykorzystuje pliki cookies (ciasteczka) w celu:
        - Zapewnienia prawidłowego funkcjonowania serwisu.
        - Analizy ruchu na stronie i poprawy jej użyteczności.
        - Dostosowania treści do Twoich preferencji.
        Możesz zarządzać plikami cookies w ustawieniach swojej przeglądarki. Wyłączenie plików cookies może wpłynąć na funkcjonalność serwisu.
      `,
    },
    {
      title: "Zmiany w Polityce Prywatności",
      content: `
        Niniejsza Polityka Prywatności może być aktualizowana. O wszelkich zmianach będziemy informować na stronie internetowej.
        Ostatnia aktualizacja: [Data ostatniej aktualizacji, np. 15 lipca 2025].
      `,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-montserrat">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="bg-blue-800 text-blue-100 mb-4 font-medium">
              OCHRONA TWOICH DANYCH
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Polityka Prywatności LegalNexus
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Dbamy o bezpieczeństwo Twoich danych osobowych. Zapoznaj się z
              naszą polityką prywatności, aby dowiedzieć się, jak gromadzimy,
              przetwarzamy i chronimy Twoje informacje.
            </p>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Table of Contents */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
                      Spis Treści
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <nav className="space-y-2">
                      {sections.map((section, index) => (
                        <Link
                          key={index}
                          href={`#section-${index + 1}`}
                          className="flex items-center py-2 px-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm font-medium">
                            {section.title}
                          </span>
                        </Link>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </div>

              {/* Content Sections */}
              <div className="lg:col-span-3 space-y-12">
                {sections.map((section, index) => (
                  <Card
                    key={index}
                    id={`section-${index + 1}`}
                    className="shadow-md"
                  >
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center">
                        {index === 0 && (
                          <Info className="mr-2 h-6 w-6 text-blue-600" />
                        )}
                        {index === 1 && (
                          <User className="mr-2 h-6 w-6 text-blue-600" />
                        )}
                        {index === 2 && (
                          <Database className="mr-2 h-6 w-6 text-blue-600" />
                        )}
                        {index === 3 && (
                          <Lock className="mr-2 h-6 w-6 text-blue-600" />
                        )}
                        {index === 4 && (
                          <Mail className="mr-2 h-6 w-6 text-blue-600" />
                        )}
                        {index === 5 && (
                          <Clock className="mr-2 h-6 w-6 text-blue-600" />
                        )}
                        {index === 6 && (
                          <Shield className="mr-2 h-6 w-6 text-blue-600" />
                        )}
                        {index === 7 && (
                          <Cookie className="mr-2 h-6 w-6 text-blue-600" />
                        )}
                        {index === 8 && (
                          <Info className="mr-2 h-6 w-6 text-blue-600" />
                        )}
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {section.content.split("\n").map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-gray-700 mb-3 leading-relaxed"
                        >
                          {paragraph.trim()}
                        </p>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Masz Pytania Dotyczące Prywatności?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Skontaktuj się z naszym Inspektorem Ochrony Danych Osobowych.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              asChild
            >
              <Link href="/kontakt">
                <Mail className="mr-2 h-5 w-5" />
                Napisz do nas
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
