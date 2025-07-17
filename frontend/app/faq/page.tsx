"use client";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  FileText,
  DollarSign,
  User,
  Mail,
  Phone,
  Info,
} from "lucide-react";
import Link from "next/link";

export default function FaqPage() {
  const faqCategories = [
    {
      category: "Ogólne pytania",
      icon: HelpCircle,
      questions: [
        {
          question: "Czym jest LegalNexus?",
          answer:
            "LegalNexus to innowacyjna platforma online oferująca profesjonalne usługi prawne, takie jak analiza dokumentów, przygotowywanie pism prawnych, konsultacje oraz reprezentacja sądowa. Łączymy nowoczesne technologie z doświadczeniem prawników, aby zapewnić szybką i skuteczną pomoc prawną.",
        },
        {
          question: "Dla kogo jest LegalNexus?",
          answer:
            "LegalNexus jest dla każdego, kto potrzebuje profesjonalnej pomocy prawnej – zarówno dla osób fizycznych, jak i przedsiębiorców. Pomagamy w sprawach cywilnych, gospodarczych, administracyjnych i innych.",
        },
        {
          question: "Czy LegalNexus to kancelaria prawna?",
          answer:
            "LegalNexus to platforma technologiczna współpracująca z siecią doświadczonych prawników i kancelarii prawnych. Zapewniamy dostęp do profesjonalnych usług prawnych w wygodnej formie online.",
        },
        {
          question: "Jakie są godziny pracy LegalNexus?",
          answer:
            "Nasza platforma jest dostępna 24/7. Konsultacje telefoniczne i online są dostępne w godzinach 8:00-18:00 od poniedziałku do piątku oraz 9:00-14:00 w soboty. W sprawach pilnych jesteśmy dostępni 24/7.",
        },
      ],
    },
    {
      category: "Analiza dokumentów",
      icon: FileText,
      questions: [
        {
          question: "Jakie dokumenty mogę przesłać do analizy?",
          answer:
            "Możesz przesłać nakazy zapłaty, wezwania komornicze, pozwy sądowe, upomnienia przedsądowe oraz inne dokumenty prawne. Akceptujemy pliki w formatach PDF, JPG, PNG (maksymalnie 10MB na plik).",
        },
        {
          question: "Jak długo trwa analiza dokumentu?",
          answer:
            "Większość analiz dokumentów jest gotowa w ciągu 24 godzin. W przypadku bardziej skomplikowanych spraw termin może zostać wydłużony do 48 godzin, o czym zostaniesz poinformowany.",
        },
        {
          question: "Co otrzymam po analizie dokumentu?",
          answer:
            "Otrzymasz szczegółowy raport prawny zawierający ocenę formalnej poprawności dokumentu, analizę merytoryczną sprawy, wskazanie możliwych działań prawnych oraz ocenę szans powodzenia. W raporcie znajdziesz również rekomendacje dotyczące dalszych kroków.",
        },
      ],
    },
    {
      category: "Płatności i cennik",
      icon: DollarSign,
      questions: [
        {
          question: "Jakie są metody płatności?",
          answer:
            "Akceptujemy płatności kartą płatniczą oraz BLIK. Wszystkie transakcje są realizowane za pośrednictwem bezpiecznego systemu płatności Stripe.",
        },
        {
          question: "Czy ceny są ostateczne?",
          answer:
            "Ceny podane na stronie są cenami brutto i zawierają podatek VAT. W przypadku usług wymagających indywidualnej wyceny (np. reprezentacja sądowa), otrzymasz szczegółową ofertę po wstępnej konsultacji.",
        },
        {
          question: "Czy otrzymam fakturę VAT?",
          answer:
            "Tak, za każdą opłaconą usługę automatycznie otrzymasz fakturę VAT na podany adres e-mail.",
        },
      ],
    },
    {
      category: "Konto i bezpieczeństwo",
      icon: User,
      questions: [
        {
          question: "Jak założyć konto na LegalNexus?",
          answer:
            "Aby założyć konto, kliknij przycisk 'Rejestracja' w prawym górnym rogu strony i postępuj zgodnie z instrukcjami. Proces jest szybki i intuicyjny.",
        },
        {
          question: "Czy moje dane są bezpieczne?",
          answer:
            "Tak, dbamy o najwyższe standardy bezpieczeństwa. Wszystkie dane są szyfrowane (SSL/TLS), a nasza platforma jest zgodna z RODO. Twoje informacje są objęte tajemnicą zawodową.",
        },
        {
          question: "Co to jest RODO?",
          answer:
            "RODO (Rozporządzenie Ogólne o Ochronie Danych Osobowych) to unijne przepisy regulujące przetwarzanie danych osobowych. W LegalNexus w pełni przestrzegamy zasad RODO, zapewniając Ci pełną kontrolę nad Twoimi danymi. Więcej informacji znajdziesz w sekcji 'RODO'.",
        },
      ],
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
              NAJCZĘŚCIEJ ZADAWANE PYTANIA
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              FAQ - Często Zadawane Pytania
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Znajdź odpowiedzi na najczęściej zadawane pytania dotyczące
              naszych usług, płatności i bezpieczeństwa. Jeśli nie znajdziesz
              odpowiedzi, skontaktuj się z nami!
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Categories Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <Info className="mr-2 h-5 w-5 text-blue-600" />
                      Kategorie Pytań
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <nav className="space-y-2">
                      {faqCategories.map((category, index) => (
                        <Link
                          key={index}
                          href={`#category-${index}`}
                          className="flex items-center py-2 px-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                          <category.icon className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                          <span className="text-sm font-medium">
                            {category.category}
                          </span>
                        </Link>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </div>

              {/* FAQ Accordions */}
              <div className="lg:col-span-3 space-y-12">
                {faqCategories.map((category, catIndex) => (
                  <div
                    key={catIndex}
                    id={`category-${catIndex}`}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      <category.icon className="mr-3 h-6 w-6 text-blue-600" />
                      {category.category}
                    </h2>
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((item, qIndex) => (
                        <Card
                          key={qIndex}
                          className="mb-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <AccordionItem value={`item-${catIndex}-${qIndex}`}>
                            <AccordionTrigger className="text-left text-lg font-semibold px-6 py-4">
                              {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-4 text-gray-700 leading-relaxed">
                              {item.answer}
                            </AccordionContent>
                          </AccordionItem>
                        </Card>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Nie Znalazłeś Odpowiedzi?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Skontaktuj się z nami bezpośrednio, a chętnie odpowiemy na
              wszystkie Twoje pytania.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent font-semibold"
                asChild
              >
                <Link href="tel:+48581234567">
                  <Phone className="mr-2 h-5 w-5" />
                  Zadzwoń: +48 58 123 45 67
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* USUWAM <Footer /> */}
    </div>
  );
}
