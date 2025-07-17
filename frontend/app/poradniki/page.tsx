"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Clock,
  User,
  Search,
  FileText,
  Scale,
  Gavel,
  Building,
  Users,
  Download,
} from "lucide-react";

export default function PoradnikiPage() {
  const categories = [
    { name: "Prawo Cywilne", count: 24, icon: Scale },
    { name: "Prawo Karne", count: 18, icon: Gavel },
    { name: "Prawo Gospodarcze", count: 32, icon: Building },
    { name: "Prawo Pracy", count: 15, icon: Users },
    { name: "Prawo Administracyjne", count: 21, icon: FileText },
  ];

  const guides = [
    {
      title: "Jak Skutecznie Prowadzić Postępowanie Cywilne w Sądach Gdańskich",
      category: "Prawo Cywilne",
      readTime: "12 min",
      author: "Dr hab. Marek Kowalski",
      date: "15 stycznia 2024",
      description:
        "Kompleksowy przewodnik po specyfice postępowania przed sądami cywilnymi w Gdańsku, uwzględniający lokalne praktyki orzecznicze.",
      difficulty: "Średni",
      downloads: 1247,
    },
    {
      title: "Automatyzacja Dokumentów Prawnych - Praktyczne Wskazówki",
      category: "Technologie Prawne",
      readTime: "8 min",
      author: "Mgr Anna Nowak",
      date: "10 stycznia 2024",
      description:
        "Jak efektywnie wykorzystać narzędzia automatyzacji do tworzenia dokumentów prawnych zgodnych z polskimi standardami.",
      difficulty: "Łatwy",
      downloads: 892,
    },
    {
      title: "RODO w Praktyce Kancelarii Prawnej - Kompletny Przewodnik",
      category: "Ochrona Danych",
      readTime: "20 min",
      author: "Mgr Piotr Wiśniewski",
      date: "5 stycznia 2024",
      description:
        "Szczegółowe omówienie wymogów RODO dla kancelarii prawnych, z praktycznymi przykładami implementacji.",
      difficulty: "Zaawansowany",
      downloads: 2156,
    },
    {
      title: "Integracja z Systemami Sądowymi - Przewodnik Techniczny",
      category: "Technologie Prawne",
      readTime: "15 min",
      author: "Zespół Legal Nexus",
      date: "28 grudnia 2023",
      description:
        "Jak skonfigurować automatyczną integrację z systemami informatycznymi sądów powszechnych i administracyjnych.",
      difficulty: "Zaawansowany",
      downloads: 634,
    },
    {
      title: "Zarządzanie Terminami Procesowymi - Najlepsze Praktyki",
      category: "Organizacja Pracy",
      readTime: "10 min",
      author: "Dr hab. Marek Kowalski",
      date: "20 grudnia 2023",
      description:
        "Sprawdzone metody zarządzania terminami sądowymi i administracyjnymi w nowoczesnej kancelarii prawnej.",
      difficulty: "Łatwy",
      downloads: 1543,
    },
    {
      title: "Bezpieczeństwo Danych w Kancelarii Prawnej",
      category: "Bezpieczeństwo",
      readTime: "18 min",
      author: "Mgr Anna Nowak",
      date: "15 grudnia 2023",
      description:
        "Kompleksowe podejście do zabezpieczenia danych klientów zgodnie z wymogami tajemnicy zawodowej.",
      difficulty: "Średni",
      downloads: 987,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Łatwy":
        return "bg-green-100 text-green-800";
      case "Średni":
        return "bg-yellow-100 text-yellow-800";
      case "Zaawansowany":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
              <BookOpen className="w-4 h-4 mr-2" />
              CENTRUM WIEDZY
            </Badge>
            <h1 className="text-4xl font-bold mb-6">
              Poradniki dla Kancelarii Prawnych
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Praktyczne przewodniki i najlepsze praktyki dla prawników
              pracujących z nowoczesnymi technologiami. Wszystkie materiały
              przygotowane przez ekspertów z wieloletnim doświadczeniem.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input placeholder="Szukaj poradników..." className="pl-10" />
            </div>
            <Button>Szukaj</Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Kategorie Poradników
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <category.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {category.count} poradników
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guides List */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Najnowsze Poradniki
            </h2>
            <Button variant="outline">Wszystkie Poradniki</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {guides.map((guide, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="outline">{guide.category}</Badge>
                    <Badge className={getDifficultyColor(guide.difficulty)}>
                      {guide.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {guide.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{guide.description}</p>

                  <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {guide.author}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {guide.readTime}
                    </div>
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      {guide.downloads}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{guide.date}</span>
                    <Button size="sm">Czytaj Więcej</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Bądź na Bieżąco z Nowościami
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Zapisz się do naszego newslettera i otrzymuj najnowsze poradniki
            oraz informacje o zmianach w prawie bezpośrednio na swoją skrzynkę
            e-mail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              placeholder="Twój adres e-mail"
              className="bg-white text-gray-900"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Zapisz się
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
