"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  User,
  MessageCircle,
  TrendingUp,
  Search,
  Clock,
  Eye,
} from "lucide-react";
import Image from "next/image";

export default function BlogPage() {
  const featuredPost = {
    title: "Przyszłość Sztucznej Inteligencji w Polskich Kancelariach Prawnych",
    excerpt:
      "Analiza trendów i prognoz rozwoju technologii AI w sektorze prawniczym. Jak kancelarie w Gdańsku i całej Polsce przygotowują się na rewolucję technologiczną.",
    author: "Dr hab. Marek Kowalski",
    date: "20 stycznia 2024",
    readTime: "8 min",
    category: "Technologie Prawne",
    views: 2847,
    comments: 23,
    image: "/placeholder.svg?height=400&width=600",
  };

  const blogPosts = [
    {
      title:
        "Nowe Przepisy o Cyfryzacji Wymiaru Sprawiedliwości - Co Zmienia się dla Prawników?",
      excerpt:
        "Omówienie najważniejszych zmian w przepisach dotyczących elektronicznego postępowania sądowego i ich wpływu na codzienną pracę kancelarii.",
      author: "Mgr Anna Nowak",
      date: "18 stycznia 2024",
      readTime: "6 min",
      category: "Prawo i Technologia",
      views: 1923,
      comments: 15,
    },
    {
      title: "Studium Przypadku: Automatyzacja Procesów w Kancelarii z Gdańska",
      excerpt:
        "Rzeczywista historia wdrożenia systemu automatyzacji w średniej kancelarii prawnej. Korzyści, wyzwania i praktyczne wskazówki.",
      author: "Mgr Piotr Wiśniewski",
      date: "15 stycznia 2024",
      readTime: "12 min",
      category: "Case Study",
      views: 1456,
      comments: 8,
    },
    {
      title: "Bezpieczeństwo Danych w Dobie RODO - Praktyczne Rozwiązania",
      excerpt:
        "Konkretne narzędzia i procedury zapewniające zgodność z RODO w kancelariach prawnych. Sprawdzone rozwiązania techniczne.",
      author: "Zespół Legal Nexus",
      date: "12 stycznia 2024",
      readTime: "10 min",
      category: "Bezpieczeństwo",
      views: 2134,
      comments: 19,
    },
    {
      title: "Trendy w Zarządzaniu Kancelariami Prawymi w 2024 Roku",
      excerpt:
        "Przegląd najważniejszych trendów technologicznych i organizacyjnych, które będą kształtować branżę prawniczą w nadchodzącym roku.",
      author: "Dr hab. Marek Kowalski",
      date: "10 stycznia 2024",
      readTime: "7 min",
      category: "Trendy",
      views: 1789,
      comments: 12,
    },
    {
      title: "Integracja z Systemami Sądowymi - Przewodnik Krok po Kroku",
      excerpt:
        "Szczegółowy opis procesu integracji systemów kancelarii z platformami informatycznymi sądów powszechnych i administracyjnych.",
      author: "Mgr Anna Nowak",
      date: "8 stycznia 2024",
      readTime: "15 min",
      category: "Technologie Prawne",
      views: 987,
      comments: 6,
    },
    {
      title: "Analiza ROI Wdrożenia Systemów IT w Kancelariach Prawnych",
      excerpt:
        "Badanie zwrotu z inwestycji w nowoczesne systemy informatyczne na podstawie danych z 50 kancelarii w Polsce.",
      author: "Zespół Legal Nexus",
      date: "5 stycznia 2024",
      readTime: "9 min",
      category: "Analiza",
      views: 1567,
      comments: 14,
    },
  ];

  const categories = [
    "Wszystkie",
    "Technologie Prawne",
    "Prawo i Technologia",
    "Bezpieczeństwo",
    "Case Study",
    "Trendy",
    "Analiza",
  ];

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
              <TrendingUp className="w-4 h-4 mr-2" />
              BLOG PRAWNICZY
            </Badge>
            <h1 className="text-4xl font-bold mb-6">
              Aktualności i Trendy w Prawie
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Najnowsze informacje o technologiach prawniczych, zmianach w
              przepisach i trendach w branży prawniczej. Ekspertyzę dzielimy z
              perspektywy Gdańska i całej Polski.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input placeholder="Szukaj artykułów..." className="pl-10" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Artykuł Polecany
          </h2>

          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Badge>{featuredPost.category}</Badge>
                  <div className="flex items-center text-sm text-gray-500 gap-4">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {featuredPost.views}
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {featuredPost.comments}
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 gap-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <Button>Czytaj Więcej</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Najnowsze Artykuły
            </h2>
            <Button variant="outline">Zobacz Wszystkie</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">{post.category}</Badge>
                    <div className="flex items-center text-xs text-gray-500 gap-2">
                      <Eye className="h-3 w-3" />
                      {post.views}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 mb-4 gap-3">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <div className="flex items-center text-sm text-gray-500">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Nie Przegap Najważniejszych Informacji
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Zapisz się do naszego newslettera i otrzymuj cotygodniowe
            podsumowanie najważniejszych artykułów i aktualności z branży
            prawniczej.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              placeholder="Twój adres e-mail"
              className="bg-white text-gray-900"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Subskrybuj
            </Button>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            Wysyłamy maksymalnie 1 e-mail tygodniowo. Możesz zrezygnować w
            każdej chwili.
          </p>
        </div>
      </section>
    </div>
  );
}
