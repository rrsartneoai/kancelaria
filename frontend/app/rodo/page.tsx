"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  User,
  Lock,
  Database,
  CheckCircle,
  Info,
  BookOpen,
  Mail,
} from "lucide-react";
import Link from "next/link";

export default function RodoPage() {
  const sections = [
    {
      title: "Wprowadzenie do RODO",
      content: `
        Rozporządzenie Ogólne o Ochronie Danych Osobowych (RODO), obowiązujące od 25 maja 2018 r., to unijne przepisy mające na celu ujednolicenie zasad przetwarzania danych osobowych w całej Unii Europejskiej. W LegalNexus przykładamy najwyższą wagę do ochrony Twoich danych osobowych i przestrzegania wszystkich wymogów RODO.
        Niniejsza strona wyjaśnia, w jaki sposób LegalNexus stosuje zasady RODO w swojej działalności.
      `,
    },
    {
      title: "Administrator Danych Osobowych",
      content: `
        Administratorem Twoich danych osobowych jest LegalNexus, z siedzibą w Gdańsku, ul. Długa 46/47, 80-831 Gdańsk.
        W LegalNexus wyznaczyliśmy Inspektora Ochrony Danych Osobowych (IOD), z którym możesz skontaktować się w każdej sprawie dotyczącej przetwarzania Twoich danych osobowych pod adresem e-mail: [adres e-mail IOD, np. iod@legalnexus.pl] lub telefonicznie: +48 58 123 45 67.
      `,
    },
    {
      title: "Zasady Przetwarzania Danych Zgodnie z RODO",
      content: `
        W LegalNexus przetwarzamy Twoje dane osobowe zgodnie z następującymi zasadami RODO:
        - **Zgodność z prawem, rzetelność i przejrzystość:** Dane są przetwarzane w sposób zgodny z prawem, rzetelnie i w sposób przejrzysty dla osoby, której dane dotyczą.
        - **Ograniczenie celu:** Dane są zbierane w konkretnych, wyraźnych i prawnie uzasadnionych celach i nie są przetwarzane dalej w sposób niezgodny z tymi celami.
        - **Minimalizacja danych:** Przetwarzamy tylko te dane, które są adekwatne, stosowne oraz ograniczone do tego, co niezbędne do celów, w których są przetwarzane.
        - **Prawidłowość:** Dane są prawidłowe i w razie potrzeby uaktualniane.
        - **Ograniczenie przechowywania:** Dane są przechowywane w formie umożliwiającej identyfikację osoby, której dane dotyczą, przez okres nie dłuższy, niż jest to niezbędne do celów, w których dane te są przetwarzane.
        - **Integralność i poufność:** Dane są przetwarzane w sposób zapewniający odpowiednie bezpieczeństwo danych osobowych, w tym ochronę przed niedozwolonym lub niezgodnym z prawem przetwarzaniem oraz przypadkową utratą, zniszczeniem lub uszkodzeniem, za pomocą odpowiednich środków technicznych lub organizacyjnych.
      `,
    },
    {
      title: "Twoje Prawa Zgodnie z RODO",
      content: `
        Jako osoba, której dane dotyczą, przysługują Ci następujące prawa:
        - **Prawo dostępu do danych (art. 15 RODO):** Masz prawo uzyskać od nas potwierdzenie, czy przetwarzamy Twoje dane osobowe, a jeśli tak, to uzyskać do nich dostęp oraz informacje dotyczące przetwarzania.
        - **Prawo do sprostowania danych (art. 16 RODO):** Masz prawo żądać od nas niezwłocznego sprostowania nieprawidłowych danych osobowych lub uzupełnienia niekompletnych danych.
        - **Prawo do usunięcia danych ("prawo do bycia zapomnianym") (art. 17 RODO):** Masz prawo żądać usunięcia swoich danych osobowych, jeśli zachodzi jedna z przesłanek określonych w RODO (np. dane nie są już niezbędne do celów, w których zostały zebrane).
        - **Prawo do ograniczenia przetwarzania (art. 18 RODO):** Masz prawo żądać ograniczenia przetwarzania danych w określonych sytuacjach (np. kwestionujesz prawidłowość danych).
        - **Prawo do przenoszenia danych (art. 20 RODO):** Masz prawo otrzymać swoje dane osobowe w ustrukturyzowanym, powszechnie używanym formacie nadającym się do odczytu maszynowego oraz przesłać je innemu administratorowi.
        - **Prawo do sprzeciwu (art. 21 RODO):** Masz prawo wnieść sprzeciw wobec przetwarzania Twoich danych osobowych, jeśli przetwarzanie odbywa się na podstawie prawnie uzasadnionego interesu administratora.
        - **Prawo do wycofania zgody (art. 7 ust. 3 RODO):** Jeśli przetwarzanie odbywa się na podstawie Twojej zgody, masz prawo wycofać ją w dowolnym momencie, bez wpływu na zgodność z prawem przetwarzania, którego dokonano na podstawie zgody przed jej wycofaniem.
        - **Prawo do wniesienia skargi do organu nadzorczego (art. 77 RODO):** Masz prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych, jeśli uważasz, że przetwarzanie Twoich danych osobowych narusza przepisy RODO.
      `,
    },
    {
      title: "Środki Bezpieczeństwa",
      content: `
        W LegalNexus stosujemy odpowiednie środki techniczne i organizacyjne, aby zapewnić bezpieczeństwo Twoich danych osobowych, w tym:
        - Szyfrowanie danych w transmisji (SSL/TLS).
        - Regularne kopie zapasowe danych.
        - Kontrola dostępu do systemów i danych.
        - Szkolenia dla pracowników w zakresie ochrony danych.
        - Monitorowanie systemów pod kątem zagrożeń bezpieczeństwa.
        Nasze systemy są regularnie audytowane pod kątem zgodności z RODO.
      `,
    },
    {
      title: "Kontakt w Sprawach RODO",
      content: `
        Wszelkie pytania, wnioski lub wątpliwości dotyczące przetwarzania Twoich danych osobowych zgodnie z RODO prosimy kierować do naszego Inspektora Ochrony Danych Osobowych:
        - E-mail: [adres e-mail IOD, np. iod@legalnexus.pl]
        - Telefon: +48 58 123 45 67
        - Adres korespondencyjny: LegalNexus, ul. Długa 46/47, 80-831 Gdańsk
        Jesteśmy do Twojej dyspozycji, aby zapewnić pełną przejrzystość i kontrolę nad Twoimi danymi.
      `,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-montserrat">
      {/* USUWAM <Header /> */}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="bg-blue-800 text-blue-100 mb-4 font-medium">
              OCHRONA DANYCH OSOBOWYCH
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              RODO w LegalNexus
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Zapewniamy pełną zgodność z Rozporządzeniem Ogólnym o Ochronie
              Danych Osobowych (RODO). Twoje dane są u nas bezpieczne.
            </p>
          </div>
        </section>

        {/* RODO Content */}
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
                          <Lock className="mr-2 h-6 w-6 text-blue-600" />
                        )}
                        {index === 3 && (
                          <Shield className="mr-2 h-6 w-6 text-blue-600" />
                        )}
                        {index === 4 && (
                          <Database className="mr-2 h-6 w-6 text-blue-600" />
                        )}
                        {index === 5 && (
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
              Masz Pytania Dotyczące RODO?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Skontaktuj się z naszym Inspektorem Ochrony Danych Osobowych.
            </p>
            <Link
              href="/kontakt"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-2 px-4 rounded-md flex items-center justify-center"
            >
              <Mail className="mr-2 h-5 w-5" />
              Napisz do nas
            </Link>
          </div>
        </section>
      </main>

      {/* USUWAM <Footer /> */}
    </div>
  );
}
