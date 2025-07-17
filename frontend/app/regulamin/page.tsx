"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, CheckCircle, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RegulaminPage() {
  const sections = [
    {
      title: "Postanowienia Ogólne",
      content: `
        1.1. Niniejszy Regulamin określa zasady świadczenia usług prawnych drogą elektroniczną przez LegalNexus, z siedzibą w Gdańsku, ul. Długa 46/47, 80-831 Gdańsk, NIP: [numer NIP], REGON: [numer REGON].
        1.2. Usługi świadczone są na rzecz Klientów, którzy korzystają z platformy LegalNexus w celu uzyskania pomocy prawnej.
        1.3. Korzystanie z usług LegalNexus oznacza akceptację niniejszego Regulaminu.
        1.4. LegalNexus zastrzega sobie prawo do zmiany Regulaminu. O wszelkich zmianach Klienci będą informowani z wyprzedzeniem.
      `,
    },
    {
      title: "Rodzaje i Zakres Usług",
      content: `
        2.1. LegalNexus świadczy usługi w zakresie:
        - Analizy dokumentów prawnych (np. nakazów zapłaty, wezwań komorniczych, pozwów sądowych).
        - Przygotowywania pism prawnych (np. sprzeciwów, odpowiedzi na pozew, skarg na czynności komornika).
        - Udzielania konsultacji prawnych (telefonicznych, online, pisemnych).
        - Reprezentacji prawnej w postępowaniach sądowych i administracyjnych.
        2.2. Szczegółowy opis każdej usługi, jej zakres oraz cennik dostępne są na odpowiednich podstronach serwisu.
        2.3. LegalNexus nie ponosi odpowiedzialności za skutki prawne wynikające z podania przez Klienta nieprawdziwych lub niekompletnych informacji.
      `,
    },
    {
      title: "Zasady Świadczenia Usług",
      content: `
        3.1. Aby skorzystać z usług, Klient musi założyć konto na platformie LegalNexus.
        3.2. Klient zobowiązany jest do podania prawdziwych i aktualnych danych osobowych.
        3.3. Proces zamówienia usługi obejmuje: wybór usługi, przesłanie niezbędnych dokumentów/informacji, akceptację cennika i Regulaminu, dokonanie płatności.
        3.4. LegalNexus zobowiązuje się do świadczenia usług z należytą starannością, zgodnie z obowiązującymi przepisami prawa i zasadami etyki zawodowej.
        3.5. Terminy realizacji usług są podane na stronie internetowej i mogą ulec zmianie w przypadku skomplikowanych spraw lub braku kompletnych informacji od Klienta.
      `,
    },
    {
      title: "Płatności",
      content: `
        4.1. Ceny usług są podane w polskich złotych (PLN) i zawierają podatek VAT.
        4.2. Płatności za usługi dokonywane są za pośrednictwem bezpiecznych systemów płatności online (np. Stripe, BLIK).
        4.3. Klient otrzymuje fakturę VAT za każdą opłaconą usługę.
        4.4. W przypadku rezygnacji z usługi lub niemożności jej realizacji z winy LegalNexus, Klientowi przysługuje zwrot wpłaconej kwoty zgodnie z polityką zwrotów.
      `,
    },
    {
      title: "Ochrona Danych Osobowych i Poufność",
      content: `
        5.1. LegalNexus przetwarza dane osobowe Klientów zgodnie z obowiązującymi przepisami prawa, w szczególności z RODO. Szczegóły w Polityce Prywatności.
        5.2. Wszystkie informacje i dokumenty przekazane przez Klienta są objęte tajemnicą zawodową i są traktowane jako poufne.
        5.3. LegalNexus stosuje odpowiednie środki techniczne i organizacyjne w celu ochrony danych przed nieuprawnionym dostępem, utratą lub zniszczeniem.
      `,
    },
    {
      title: "Reklamacje",
      content: `
        6.1. Klient ma prawo do złożenia reklamacji dotyczącej świadczonych usług.
        6.2. Reklamacja powinna zostać złożona w formie pisemnej na adres LegalNexus lub drogą elektroniczną na adres kontakt@legalnexus.pl.
        6.3. Reklamacja powinna zawierać: dane Klienta, opis przedmiotu reklamacji oraz żądanie Klienta.
        6.4. LegalNexus rozpatrzy reklamację w terminie 14 dni od daty jej otrzymania i poinformuje Klienta o sposobie jej rozpatrzenia.
      `,
    },
    {
      title: "Postanowienia Końcowe",
      content: `
        7.1. W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa polskiego.
        7.2. Wszelkie spory wynikające z niniejszego Regulaminu będą rozstrzygane przez sąd właściwy dla siedziby LegalNexus.
        7.3. Regulamin wchodzi w życie z dniem [data wejścia w życie].
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
              ZASADY KORZYSTANIA Z SERWISU
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Regulamin LegalNexus
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Zapoznaj się z zasadami świadczenia usług prawnych online przez
              platformę LegalNexus. Dbamy o przejrzystość i bezpieczeństwo
              Twoich danych.
            </p>
          </div>
        </section>

        {/* Regulations Content */}
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
                        <FileText className="mr-2 h-6 w-6 text-blue-600" />
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
              Masz Pytania Dotyczące Regulaminu?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Skontaktuj się z nami, a nasi eksperci odpowiedzą na wszystkie
              Twoje pytania.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              asChild
            >
              <Link href="/kontakt">
                <Phone className="mr-2 h-5 w-5" />
                Skontaktuj się
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
