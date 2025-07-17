"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Clock,
  Shield,
  CheckCircle,
  Upload,
  Star,
  ArrowRight,
  Users,
  Award,
  Phone,
  Mail,
  MapPin,
  Scale,
  Search,
  BookOpen,
  Building,
  Heart,
  Target,
  Gavel,
  Download,
  ExternalLink,
  Code,
  TrendingUp,
  MessageCircle,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  User as UserIcon, // Renamed to avoid conflict with lucide-react User
  Calendar as CalendarIcon, // Renamed to avoid conflict with lucide-react Calendar
  X, // Added X icon
  Globe, // Added Globe icon
  Eye, // Added Eye icon
  Book, // Added Book icon
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useState, useEffect } from "react";
import { lawFirmAPI } from "@/lib/api/client";
import type { LawFirm, Specialization } from "@/lib/api/types";


export default function HomePage() {
  const services = [
    {
      title: "Analiza Nakazu Zapłaty",
      description:
        "Sprawdzimy czy nakaz zapłaty jest prawidłowy i podpowiemy jak się bronić",
      price: "49 zł",
      icon: FileText,
      popular: true,
    },
    {
      title: "Odpowiedź na Wezwanie Komornika",
      description:
        "Przygotujemy profesjonalną odpowiedź na działania komornicze",
      price: "79 zł",
      icon: Shield,
      popular: false,
    },
    {
      title: "Skarga na Czynność Komornika",
      description: "Zaskarżymy nieprawidłowe działania komornika sądowego",
      price: "99 zł",
      icon: FileText,
      popular: false,
    },
    {
      title: "Sprzeciw od Nakazu Zapłaty",
      description: "Złożymy sprzeciw w odpowiednim terminie z uzasadnieniem",
      price: "89 zł",
      icon: Clock,
      popular: false,
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Prześlij dokument",
      description: "Wgraj zdjęcie lub skan dokumentu, który otrzymałeś",
    },
    {
      number: "2",
      title: "Opisz sytuację",
      description: "Powiedz nam o swojej sytuacji i oczekiwaniach",
    },
    {
      number: "3",
      title: "Zapłać za analizę",
      description: "Wybierz metodę płatności i opłać analizę dokumentu",
    },
    {
      number: "4",
      title: "Otrzymaj analizę",
      description: "W ciągu 24h otrzymasz profesjonalną analizę prawną",
    },
    {
      number: "5",
      title: "Zamów pisma",
      description: "Na podstawie analizy zamów potrzebne pisma prawne",
    },
  ];

  const stats = [
    { value: "2500+", label: "Przeanalizowanych dokumentów", icon: FileText },
    { value: "1200+", label: "Zadowolonych klientów", icon: Users },
    { value: "24h", label: "Średni czas realizacji", icon: Clock },
    { value: "98%", label: "Skuteczność naszych pism", icon: Award },
  ];

  // FunkcjePage content
  const mainFeatures = [
    {
      icon: Scale,
      title: "Zarządzanie Sprawami Sądowymi",
      description:
        "Kompleksowy system zarządzania postępowaniami przed sądami powszechnymi, administracyjnymi i gospodarczymi w Gdańsku i całej Polsce.",
      features: [
        "Kalendarz rozpraw i terminów procesowych",
        "Automatyczne przypomnienia o terminach",
        "Integracja z systemami sądowymi",
        "Śledzenie statusu spraw w czasie rzeczywistym",
      ],
    },
    {
      icon: FileText,
      title: "Automatyzacja Dokumentów Prawnych",
      description:
        "Zaawansowany generator dokumentów prawnych zgodnych z polskim prawem i praktyką orzeczniczą sądów gdańskich.",
      features: [
        "Szablony pism procesowych i pozwów",
        "Automatyczne wypełnianie danych klienta",
        "Kontrola zgodności z aktualnymi przepisami",
        "Integracja z bazami orzecznictwa",
      ],
    },
    {
      icon: Users,
      title: "Zarządzanie Klientami i Sprawami",
      description:
        "Profesjonalny system CRM dostosowany do specyfiki pracy kancelarii prawnych w regionie pomorskim.",
      features: [
        "Baza danych klientów z historią współpracy",
        "Zarządzanie konfliktami interesów",
        "System uprawnień i dostępu do danych",
        "Raportowanie i analityka biznesowa",
      ],
    },
    {
      icon: Search,
      title: "Wyszukiwanie Prawne i Orzecznictwo",
      description:
        "Dostęp do aktualnych przepisów prawa oraz orzecznictwa sądów, ze szczególnym uwzględnieniem praktyki sądów gdańskich.",
      features: [
        "Baza aktów prawnych z komentarzami",
        "Orzecznictwo SN, NSA i sądów powszechnych",
        "Wyszukiwanie semantyczne w dokumentach",
        "Alerty o zmianach w przepisach",
      ],
    },
  ];

  const securityFeatures = [
    {
      title: "Zgodność z RODO",
      description:
        "Pełna zgodność z Rozporządzeniem o Ochronie Danych Osobowych",
    },
    {
      title: "Tajemnica Adwokacka",
      description:
        "Zachowanie tajemnicy zawodowej zgodnie z Kodeksem Etyki Adwokackiej",
    },
    {
      title: "Szyfrowanie Danych",
      description:
        "Szyfrowanie end-to-end wszystkich danych klientów i dokumentów",
    },
    {
      title: "Backup i Archiwizacja",
      description:
        "Automatyczne kopie zapasowe z możliwością odzyskania danych",
    },
  ];

  // CennikPage content
  const plans = [
    {
      name: "Starter",
      price: "2,500",
      period: "miesięcznie",
      description:
        "Idealne rozwiązanie dla małych kancelarii i indywidualnych praktyk prawniczych",
      features: [
        "Do 3 prawników",
        "Zarządzanie do 100 spraw miesięcznie",
        "Podstawowe szablony dokumentów",
        "Kalendarz rozpraw i terminów",
        "Wsparcie e-mail (48h)",
        "Backup danych",
        "Zgodność z RODO",
      ],
      notIncluded: [
        "Asystent AI LexiCore",
        "Integracja z sądami",
        "Zaawansowana analityka",
        "API dostęp",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "4,900",
      period: "miesięcznie",
      description:
        "Kompleksowe rozwiązanie dla średnich kancelarii prawnych w Gdańsku",
      features: [
        "Do 10 prawników",
        "Nieograniczona liczba spraw",
        "Wszystkie szablony dokumentów",
        "Asystent AI LexiCore (500 zapytań/miesiąc)",
        "Integracja z systemami sądowymi",
        "Zaawansowany kalendarz i przypomnienia",
        "Analityka i raporty",
        "Wsparcie telefoniczne (24h)",
        "Dedykowany opiekun klienta",
        "Szkolenia dla zespołu",
      ],
      notIncluded: [
        "Nieograniczony dostęp do AI",
        "Własne szablony dokumentów",
        "Integracja z systemami zewnętrznymi",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Wycena indywidualna",
      period: "",
      description:
        "Rozwiązanie dla dużych kancelarii i firm prawniczych z oddziałami",
      features: [
        "Nieograniczona liczba prawników",
        "Nieograniczona liczba spraw",
        "Pełny dostęp do LexiCore AI",
        "Własne szablony i procesy",
        "Integracje z systemami klienta",
        "Dedykowany serwer/chmura prywatna",
        "SLA 99.9% dostępności",
        "Wsparcie 24/7/365",
        "Dedykowany zespół wsparcia",
        "Regularne szkolenia i konsultacje",
        "Możliwość modyfikacji systemu",
      ],
      notIncluded: [],
      popular: false,
    },
  ];

  const additionalServices = [
    {
      name: "Migracja Danych",
      price: "od 5,000 PLN",
      description: "Profesjonalna migracja danych z dotychczasowego systemu",
    },
    {
      name: "Szkolenia Zaawansowane",
      price: "1,200 PLN/dzień",
      description: "Dedykowane szkolenia dla zespołu prawników",
    },
    {
      name: "Integracje Zewnętrzne",
      price: "od 3,000 PLN",
      description: "Integracja z systemami księgowymi, CRM i innymi",
    },
    {
      name: "Wsparcie Premium",
      price: "800 PLN/miesiąc",
      description: "Priorytetowe wsparcie techniczne 24/7",
    },
  ];

  // KancelariePage content
  interface SearchFilters {
    query: string;
    city: string;
    specialization: string;
  }

  const [lawFirms, setLawFirms] = useState<LawFirm[]>([]);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    city: "",
    specialization: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 9,
    total: 0,
    pages: 0,
    has_next: false,
    has_prev: false,
  });

  // Load initial data
  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      const firmsResponse = await lawFirmAPI.searchLawFirms({ page: 1, per_page: 9 });
      const specsResponse = await lawFirmAPI.getSpecializations();

      setLawFirms(firmsResponse.data as LawFirm[]);
      setPagination(firmsResponse.meta as typeof pagination);
      setSpecializations(specsResponse.data as Specialization[]);
    } catch (error) {
      console.error("Failed to load initial data:", error);
    } finally {
      setLoading(false);
    }
  }, [pagination]);

  // Search when filters change
  const searchLawFirms = useCallback(async () => {
    try {
      setSearching(true);
      const params = {
        page: pagination.page,
        per_page: pagination.per_page,
        ...(filters.query && { q: filters.query }),
        ...(filters.city && { city: filters.city }),
        ...(filters.specialization && {
          specializations: [filters.specialization],
        }),
      };

      const response = await lawFirmAPI.searchLawFirms(params);
      setLawFirms(response.data as LawFirm[]);
      setPagination(response.meta as typeof pagination);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setSearching(false);
    }
  }, [filters, pagination.page]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchLawFirms();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [filters, pagination.page, searchLawFirms]);

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setFilters({ query: "", city: "", specialization: "" });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // BlogPage content
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

  const blogCategories = [
    "Wszystkie",
    "Technologie Prawne",
    "Prawo i Technologia",
    "Bezpieczeństwo",
    "Case Study",
    "Trendy",
    "Analiza",
  ];

  // PoradnikiPage content
  const guideCategories = [
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

  // DokumentacjaAPIPage content
  const endpoints = [
    {
      method: "GET",
      path: "/api/v1/sprawy",
      description: "Pobieranie listy spraw kancelarii",
      params: ["page", "limit", "status", "klient_id"],
    },
    {
      method: "POST",
      path: "/api/v1/sprawy",
      description: "Tworzenie nowej sprawy",
      params: ["nazwa", "opis", "klient_id", "typ_sprawy"],
    },
    {
      method: "GET",
      path: "/api/v1/klienci",
      description: "Zarządzanie bazą klientów",
      params: ["search", "typ_klienta", "miasto"],
    },
    {
      method: "POST",
      path: "/api/v1/dokumenty",
      description: "Upload i zarządzanie dokumentami",
      params: ["plik", "sprawa_id", "typ_dokumentu"],
    },
  ];

  const codeExamples = {
    javascript: `// Pobieranie listy spraw
const response = await fetch('https://api.kancelaria-gdansk.pl/v1/sprawy', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const sprawy = await response.json();
console.log(sprawy);`,

    python: `import requests

# Tworzenie nowej sprawy
url = "https://api.kancelaria-gdansk.pl/v1/sprawy"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "nazwa": "Sprawa cywilna - odszkodowanie",
    "opis": "Roszczenie odszkodowawcze z tytułu szkody komunikacyjnej",
    "klient_id": 123,
    "typ_sprawy": "cywilna"
}

response = requests.post(url, headers=headers, json=data)
result = response.json()`,

    curl: `# Pobieranie danych klienta
curl -X GET "https://api.kancelaria-gdansk.pl/v1/klienci/123" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
  };

  // ONasPage content
  const teamMembers = [
    {
      name: "Dr hab. Marek Kowalski",
      position: "Założyciel i Dyrektor Generalny",
      specialization: "Prawo cywilne, prawo handlowe",
      experience: "25 lat praktyki prawniczej",
      education: "Uniwersytet Gdański, Wydział Prawa i Administracji",
    },
    {
      name: "Mgr Anna Nowak",
      position: "Dyrektor Techniczny",
      specialization: "Systemy informatyczne dla prawników",
      experience: "15 lat w branży IT",
      education: "Politechnika Gdańska, Informatyka",
    },
    {
      name: "Mgr Piotr Wiśniewski",
      position: "Główny Prawnik Produktu",
      specialization: "Prawo procesowe, informatyzacja wymiaru sprawiedliwości",
      experience: "12 lat w kancelariach prawnych",
      education: "Uniwersytet Gdański, aplikacja adwokacka",
    },
  ];

  const values = [
    {
      icon: Scale,
      title: "Etyka i Profesjonalizm",
      description:
        "Przestrzegamy najwyższych standardów etycznych zawodu prawniczego i dbamy o zachowanie tajemnicy zawodowej.",
    },
    {
      icon: Shield,
      title: "Bezpieczeństwo Danych",
      description:
        "Bezpieczeństwo informacji klientów jest naszym priorytetem. Stosujemy najnowsze technologie ochrony danych.",
    },
    {
      icon: Target,
      title: "Innowacyjność",
      description:
        "Łączymy tradycyjną praktykę prawną z nowoczesnymi technologiami, tworząc rozwiązania przyszłości.",
    },
    {
      icon: Heart,
      title: "Wsparcie Klientów",
      description:
        "Każdy klient otrzymuje pełne wsparcie techniczne i merytoryczne od naszego doświadczonego zespołu.",
    },
  ];

  const milestones = [
    {
      year: "2018",
      title: "Założenie Firmy",
      description:
        "Rozpoczęcie prac nad pierwszym systemem zarządzania kancelariami prawymi w Gdańsku",
    },
    {
      year: "2019",
      title: "Pierwsi Klienci",
      description: "Wdrożenie systemu w 5 kancelariach prawnych w Trójmieście",
    },
    {
      year: "2021",
      title: "Ekspansja Regionalna",
      description:
        "Rozszerzenie działalności na całe województwo pomorskie - 50+ kancelarii",
    },
    {
      year: "2023",
      title: "Wprowadzenie AI",
      description:
        "Uruchomienie LexiCore - pierwszego asystenta AI dla prawników w Polsce",
    },
    {
      year: "2024",
      title: "Obecność Ogólnopolska",
      description:
        "Ponad 200 kancelarii prawnych w całej Polsce korzysta z naszych rozwiązań",
    },
  ];


  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-montserrat">
      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="bg-blue-800 text-blue-100 mb-4 font-medium">
                  PROFESJONALNA POMOC PRAWNA
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Otrzymałeś pismo prawne?
                  <span className="text-blue-200"> Pomożemy Ci!</span>
                </h1>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Analizujemy dokumenty prawne i przygotowujemy odpowiedzi w
                  ciągu 24 godzin. Profesjonalnie, szybko i w przystępnej cenie.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                    asChild
                  >
                    <Link href="/zamow-analize">
                      <Upload className="mr-2 h-5 w-5" />
                      Zamów Analizę
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent font-semibold"
                    asChild
                  >
                    <Link href="/jak-to-dziala">Zobacz Przykłady</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google_AI_Studio_2025-07-14T09_38_31.292Z-HPAZjNmjte2mkOf9e0CV34iBxSBSYd.png"
                  alt="Cyfrowe technologie prawne"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Najczęściej Zamawiane Usługi
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Sprawdź nasze najpopularniejsze usługi prawne. Każda analiza
                zawiera szczegółowe omówienie i konkretne wskazówki działania.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className={`relative hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                    service.popular ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white font-medium">
                        <Star className="w-3 h-3 mr-1" />
                        Popularne
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <service.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg font-semibold">
                      {service.title}
                    </CardTitle>
                    <div className="text-2xl font-bold text-blue-600">
                      {service.price}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 text-center mb-4">
                      {service.description}
                    </p>
                    <Button
                      className="w-full font-medium"
                      variant={service.popular ? "default" : "outline"}
                    >
                      Zamów Teraz
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="jak-to-dziala" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Jak to działa?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Prosty proces w 5 krokach - od przesłania dokumentu do
                otrzymania gotowych pism prawnych.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                  {index < steps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute top-6 -right-4 h-5 w-5 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Technology Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="bg-blue-100 text-blue-800 mb-4 font-medium">
                  TECHNOLOGIA AI
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Łączymy tradycyjną wiedzę prawniczą z nowoczesną technologią
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Nasze rozwiązania wykorzystują sztuczną inteligencję do
                  analizy dokumentów prawnych, zachowując przy tym najwyższe
                  standardy profesjonalizmu i dokładności.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">
                        Szybka analiza dokumentów
                      </h4>
                      <p className="text-gray-600">
                        AI pomaga w błyskawicznej identyfikacji kluczowych
                        elementów
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">
                        Weryfikacja przez prawników
                      </h4>
                      <p className="text-gray-600">
                        Każda analiza jest sprawdzana przez doświadczonych
                        prawników
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">
                        Personalizowane rozwiązania
                      </h4>
                      <p className="text-gray-600">
                        Każde pismo dostosowane do konkretnej sytuacji klienta
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google_AI_Studio_2025-07-14T09_39_14.829Z-7kvRLxYPRuKzmNZMZSDH7EGQ08p7n7.png"
                  alt="AI w prawie"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Funkcje Section */}
        <section id="funkcje" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge
                variant="secondary"
                className="mb-4 bg-blue-800 text-blue-100"
              >
                FUNKCJONALNOŚCI SYSTEMU
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Zaawansowane Narzędzia dla Kancelarii Prawnych
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Kompleksowe rozwiązanie informatyczne dostosowane do potrzeb
                współczesnych kancelarii prawnych działających na terenie Gdańska
                i całego regionu pomorskiego.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {mainFeatures.map((feature, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <feature.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-16 mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Bezpieczeństwo i Zgodność Prawna
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Najwyższe standardy bezpieczeństwa danych zgodne z wymogami prawa
                polskiego i standardami etyki zawodowej adwokatów i radców
                prawnych.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {securityFeatures.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <Shield className="h-6 w-6 text-blue-600 mr-3" />
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="py-16 bg-blue-600 text-white mt-16 rounded-lg">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold mb-6">
                  Gotowy na Modernizację Swojej Kancelarii?
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Skontaktuj się z nami, aby umówić prezentację systemu dostosowaną do
                  potrzeb Twojej kancelarii.
                </p>
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Umów Prezentację
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cennik Section */}
        <section id="cennik" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge
                variant="secondary"
                className="mb-4 bg-blue-800 text-blue-100"
              >
                CENNIK I PAKIETY
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Przejrzyste Ceny dla Kancelarii Prawnych
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Wybierz pakiet dostosowany do wielkości i potrzeb Twojej
                kancelarii. Wszystkie ceny zawierają pełne wsparcie techniczne i
                regularne aktualizacje.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative ${plan.popular ? "ring-2 ring-blue-500 scale-105" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white px-4 py-1">
                        <Star className="w-4 h-4 mr-1" />
                        Najpopularniejszy
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl font-bold">
                      {plan.name}
                    </CardTitle>
                    <div className="mt-4">
                      {plan.price !== "Wycena indywidualna" ? (
                        <>
                          <span className="text-4xl font-bold text-blue-600">
                            {plan.price}
                          </span>
                          <span className="text-gray-600 ml-2">
                            PLN {plan.period}
                          </span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-blue-600">
                          {plan.price}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mt-4">{plan.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}

                      {plan.notIncluded.map((feature, idx) => (
                        <div key={idx} className="flex items-start opacity-50">
                          <X className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-500">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6">
                      <Button
                        className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.price === "Wycena indywidualna"
                          ? "Skontaktuj się"
                          : "Wybierz Pakiet"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="py-20 bg-white mt-16 rounded-lg">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Dodatkowe Usługi
                  </h3>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Rozszerz funkcjonalność systemu o dodatkowe usługi dostosowane do
                    specyficznych potrzeb Twojej kancelarii.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {additionalServices.map((service, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-semibold">{service.name}</h3>
                          <span className="text-blue-600 font-bold">
                            {service.price}
                          </span>
                        </div>
                        <p className="text-gray-600">{service.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="py-16 bg-blue-600 text-white mt-16 rounded-lg">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-6">
                    Potrzebujesz Indywidualnej Wyceny?
                  </h2>
                  <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                    Skontaktuj się z naszym zespołem, aby omówić specjalne potrzeby
                    Twojej kancelarii i otrzymać spersonalizowaną ofertę.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <Card className="bg-white/10 border-white/20">
                    <CardContent className="p-6 text-center">
                      <Phone className="h-8 w-8 text-white mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        Konsultacja Telefoniczna
                      </h3>
                      <p className="text-blue-100 mb-4">
                        Porozmawiaj z naszym ekspertem
                      </p>
                      <p className="text-xl font-bold">+48 58 123 45 67</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 border-white/20">
                    <CardContent className="p-6 text-center">
                      <Mail className="h-8 w-8 text-white mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Zapytanie E-mail</h3>
                      <p className="text-blue-100 mb-4">
                        Otrzymaj szczegółową ofertę
                      </p>
                      <p className="text-xl font-bold">oferta@legal-nexus.pl</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kancelarie Section */}
        <section id="kancelarie" className="py-20 bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Znajdź Kancelarię Prawną
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Wyszukaj profesjonalną kancelarię prawną w swojej okolicy. Sprawdź
                specjalizacje, opinie i dane kontaktowe.
              </p>
            </div>

            <div className="max-w-4xl mx-auto mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="search">Wyszukaj</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="search"
                          placeholder="Nazwa kancelarii..."
                          value={filters.query}
                          onChange={(e) =>
                            handleFilterChange("query", e.target.value)
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">Miasto</Label>
                      <Select
                        value={filters.city}
                        onValueChange={(value) => handleFilterChange("city", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz miasto" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszystkie miasta</SelectItem>
                          <SelectItem value="Gdańsk">Gdańsk</SelectItem>
                          <SelectItem value="Warszawa">Warszawa</SelectItem>
                          <SelectItem value="Kraków">Kraków</SelectItem>
                          <SelectItem value="Wrocław">Wrocław</SelectItem>
                          <SelectItem value="Poznań">Poznań</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specjalizacja</Label>
                      <Select
                        value={filters.specialization}
                        onValueChange={(value) =>
                          handleFilterChange("specialization", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz specjalizację" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">
                            Wszystkie specjalizacje
                          </SelectItem>
                          {specializations.map((spec) => (
                            <SelectItem key={spec.id} value={spec.code}>
                              {spec.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <p className="text-sm text-gray-600">
                      Znaleziono {pagination.total}{" "}
                      {pagination.total === 1 ? "kancelarię" : "kancelarii"}
                    </p>
                    <Button variant="outline" onClick={clearFilters} size="sm">
                      Wyczyść filtry
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="max-w-6xl mx-auto">
              {searching && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Wyszukiwanie...</p>
                </div>
              )}

              {!searching && lawFirms.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600 mb-4">
                    Nie znaleziono kancelarii spełniających kryteria
                  </p>
                  <Button onClick={clearFilters}>Wyczyść filtry</Button>
                </div>
              )}

              {!searching && lawFirms.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lawFirms.map((firm) => (
                    <Card
                      key={firm.id}
                      className="hover:shadow-lg transition-shadow duration-200"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2">
                              {firm.name}
                            </CardTitle>
                            {firm.description && (
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {firm.description}
                              </p>
                            )}
                          </div>
                          <Avatar className="ml-4">
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {getInitials(firm.name)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-4">
                          {/* Address */}
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div className="text-sm">
                              <p>{firm.address.street}</p>
                              <p>
                                {firm.address.postal_code} {firm.address.city}
                              </p>
                            </div>
                          </div>

                          {/* Contact */}
                          <div className="space-y-2">
                            {firm.contact.phone && (
                              <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">
                                  {firm.contact.phone}
                                </span>
                              </div>
                            )}
                            {firm.contact.email && (
                              <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">
                                  {firm.contact.email}
                                </span>
                              </div>
                            )}
                            {firm.contact.website && (
                              <div className="flex items-center space-x-2">
                                <Globe className="h-4 w-4 text-gray-400" />
                                <a
                                  href={firm.contact.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-600 hover:underline"
                                >
                                  Strona internetowa
                                </a>
                              </div>
                            )}
                          </div>

                          {/* Specializations */}
                          {firm.specializations.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-2">
                                Specjalizacje:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {firm.specializations.slice(0, 3).map((spec) => (
                                  <Badge
                                    key={spec.id}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {spec.name}
                                  </Badge>
                                ))}
                                {firm.specializations.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{firm.specializations.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Lawyers */}
                          {firm.lawyers.length > 0 && (
                            <div>
                              <div className="flex items-center space-x-1 mb-2">
                                <Users className="h-4 w-4 text-gray-400" />
                                <p className="text-sm font-medium text-gray-700">
                                  Prawnicy ({firm.lawyers.length})
                                </p>
                              </div>
                              <div className="space-y-1">
                                {firm.lawyers.slice(0, 2).map((lawyer) => (
                                  <p
                                    key={lawyer.id}
                                    className="text-sm text-gray-600"
                                  >
                                    {lawyer.title} {lawyer.first_name}{" "}
                                    {lawyer.last_name}
                                  </p>
                                ))}
                                {firm.lawyers.length > 2 && (
                                  <p className="text-sm text-gray-500">
                                    i {firm.lawyers.length - 2} więcej...
                                  </p>
                                )}
                              </div>
                            </div>
                          )}

                          <Button
                            className="w-full bg-transparent"
                            variant="outline"
                          >
                            Zobacz szczegóły
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={!pagination.has_prev}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Poprzednia
                  </Button>

                  {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={
                          pagination.page === pageNum ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={!pagination.has_next}
                  >
                    Następna
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge
                variant="secondary"
                className="mb-4 bg-blue-800 text-blue-100"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                BLOG PRAWNICZY
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Aktualności i Trendy w Prawie
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Najnowsze informacje o technologiach prawniczych, zmianach w
                przepisach i trendach w branży prawniczej. Ekspertyzę dzielimy z
                perspektywy Gdańska i całej Polski.
              </p>
            </div>

            <div className="py-12 bg-white rounded-lg mb-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input placeholder="Szukaj artykułów..." className="pl-10" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {blogCategories.map((category, index) => (
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
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Artykuł Polecany
            </h3>

            <Card className="overflow-hidden mb-16">
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

                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h4>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 gap-4">
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-1" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
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

            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">
                Najnowsze Artykuły
              </h3>
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
                        <UserIcon className="h-4 w-4 mr-1" />
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

            <div className="py-16 bg-blue-600 text-white mt-16 rounded-lg">
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
            </div>
          </div>
        </section>

        {/* Poradniki Section */}
        <section id="poradniki" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge
                variant="secondary"
                className="mb-4 bg-blue-800 text-blue-100"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                CENTRUM WIEDZY
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Poradniki dla Kancelarii Prawnych
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Praktyczne przewodniki i najlepsze praktyki dla prawników
                pracujących z nowoczesnymi technologiami. Wszystkie materiały
                przygotowane przez ekspertów z wieloletnim doświadczeniem.
              </p>
            </div>

            <div className="py-12 bg-white rounded-lg mb-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input placeholder="Szukaj poradników..." className="pl-10" />
                  </div>
                  <Button>Szukaj</Button>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Kategorie Poradników
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-16">
              {guideCategories.map((category, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <CardContent className="p-6 text-center">
                    <category.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {category.name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {category.count} poradników
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">
                Najnowsze Poradniki
              </h3>
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
                        <UserIcon className="h-4 w-4 mr-1" />
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

            <div className="py-16 bg-blue-600 text-white mt-16 rounded-lg">
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
            </div>
          </div>
        </section>

        {/* Dokumentacja API Section */}
        <section id="dokumentacja-api" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge
                variant="secondary"
                className="mb-4 bg-blue-800 text-blue-100"
              >
                DOKUMENTACJA TECHNICZNA
              </Badge>
              <h2 className="text-3xl font-bold mb-6">
                Dokumentacja API Legal Nexus
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Kompletna dokumentacja techniczna API dla integracji z systemami
                kancelarii prawnych. Zgodność z standardami REST i JSON:API.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <Card>
                <CardHeader>
                  <Book className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Przewodnik Szybkiego Startu</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Rozpocznij integrację w 5 minut. Kompletny przewodnik krok po
                    kroku.
                  </p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Rozpocznij Integrację
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Code className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Przykłady Kodu</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Gotowe przykłady w JavaScript, Python, PHP i innych językach.
                  </p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Zobacz Przykłady
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Download className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>SDK i Biblioteki</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Oficjalne SDK dla najpopularniejszych języków programowania.
                  </p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Pobierz SDK
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-16">
              <CardHeader>
                <CardTitle>Główne Endpointy API</CardTitle>
                <p className="text-gray-600">
                  Przegląd najważniejszych endpointów do zarządzania sprawami,
                  klientami i dokumentami.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {endpoints.map((endpoint, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <Badge
                            variant={
                              endpoint.method === "GET" ? "secondary" : "default"
                            }
                            className={
                              endpoint.method === "GET"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }
                          >
                            {endpoint.method}
                          </Badge>
                          <code className="text-sm font-mono">
                            {endpoint.path}
                          </code>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-gray-600 mb-2">{endpoint.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {endpoint.params.map((param, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {param}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Przykłady Implementacji</CardTitle>
                <p className="text-gray-600">
                  Praktyczne przykłady użycia API w różnych językach
                  programowania.
                </p>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="javascript" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                  </TabsList>

                  {Object.entries(codeExamples).map(([lang, code]) => (
                    <TabsContent key={lang} value={lang}>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm text-gray-100">
                          <code>{code}</code>
                        </pre>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            <div className="py-16 bg-white mt-16 rounded-lg">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Potrzebujesz Pomocy z Integracją?
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Nasz zespół techniczny jest dostępny, aby pomóc w implementacji API
                  w Twojej kancelarii.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg">Kontakt Techniczny</Button>
                  <Button size="lg" variant="outline">
                    Dokumentacja PDF
                    <Download className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* O nas Section */}
        <section id="o-nas" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge
                variant="secondary"
                className="mb-4 bg-blue-800 text-blue-100"
              >
                <Building className="w-4 h-4 mr-2" />
                NASZA HISTORIA
              </Badge>
              <h2 className="text-3xl font-bold mb-6">
                Legal API Nexus - Lider Technologii Prawniczych
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Od 2018 roku tworzymy innowacyjne rozwiązania informatyczne dla
                kancelarii prawnych, łącząc głęboką wiedzę prawniczą z najnowszymi
                technologiami.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Misja i Wizja Firmy
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-blue-600 mb-3">
                      Nasza Misja
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Wspieramy kancelarie prawne w całej Polsce poprzez
                      dostarczanie nowoczesnych, bezpiecznych i intuicyjnych
                      narzędzi informatycznych, które zwiększają efektywność pracy
                      prawników i poprawiają jakość obsługi klientów.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-blue-600 mb-3">
                      Nasza Wizja
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Chcemy być wiodącym dostawcą technologii prawniczych w
                      Polsce, tworząc rozwiązania, które przekształcają tradycyjną
                      praktykę prawną w nowoczesną, efektywną i dostępną usługę
                      dla wszystkich obywateli.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900">200+</div>
                    <div className="text-gray-600">Kancelarii Klientów</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900">16</div>
                    <div className="text-gray-600">Województw</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Award className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900">6</div>
                    <div className="text-gray-600">Lat Doświadczenia</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <CalendarIcon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900">24/7</div>
                    <div className="text-gray-600">Wsparcie Techniczne</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Nasze Wartości
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Fundamenty, na których budujemy nasze rozwiązania i relacje z
                klientami.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {values.map((value, index) => (
                <Card key={index}>
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <value.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <h4 className="text-xl font-semibold">{value.title}</h4>
                    </div>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Historia Rozwoju
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Kluczowe momenty w rozwoju naszej firmy i produktów.
              </p>
            </div>

            <div className="relative mb-16">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  >
                    <div
                      className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}
                    >
                      <Card>
                        <CardContent className="p-6">
                          <div className="text-2xl font-bold text-blue-600 mb-2">
                            {milestone.year}
                          </div>
                          <h4 className="text-lg font-semibold mb-2">
                            {milestone.title}
                          </h4>
                          <p className="text-gray-600">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="relative z-10">
                      <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                    </div>

                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Zespół Kierowniczy
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Doświadczeni profesjonaliści łączący wiedzę prawniczą z ekspertyzą
                technologiczną.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {teamMembers.map((member, index) => (
                <Card key={index}>
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-10 w-10 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-blue-600 font-medium">{member.position}</p>
                  </CardHeader>
                  <CardContent className="text-center space-y-2">
                    <p className="text-gray-600 text-sm">
                      {member.specialization}
                    </p>
                    <p className="text-gray-500 text-sm">{member.experience}</p>
                    <p className="text-gray-500 text-sm">{member.education}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Nasze Biuro w Gdańsku
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold">Legal API Nexus Sp. z o.o.</p>
                      <p className="text-gray-600">ul. Długa 47/48</p>
                      <p className="text-gray-600">80-831 Gdańsk</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Building className="h-6 w-6 text-blue-600 mr-3" />
                    <p className="text-gray-600">
                      Centrum Gdańska, blisko Sądu Okręgowego
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <Button size="lg">Umów Spotkanie w Biurze</Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-4">Dlaczego Gdańsk?</h4>
                  <div className="space-y-3 text-gray-600">
                    <p>
                      Gdańsk to dynamicznie rozwijające się centrum prawnicze
                      północnej Polski, gdzie tradycja prawnicza spotyka się z
                      nowoczesnymi technologiami.
                    </p>
                    <p>
                      Nasze biuro znajduje się w sercu miasta, w pobliżu
                      najważniejszych instytucji prawnych, co pozwala nam na
                      bliską współpracę z lokalnymi kancelariami i lepsze
                      zrozumienie ich potrzeb.
                    </p>
                    <p>
                      Gdańsk jest również ważnym ośrodkiem technologicznym, co
                      umożliwia nam dostęp do najlepszych talentów IT i
                      najnowszych rozwiązań technicznych.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Gotowy na Profesjonalną Pomoc?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Nie czekaj - każdy dzień zwłoki może mieć znaczenie prawne. Zamów
              analizę już dziś!
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
    </div>
  );
}
