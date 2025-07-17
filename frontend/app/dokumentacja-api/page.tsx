"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Book, Download, ExternalLink } from "lucide-react";

export default function DokumentacjaAPIPage() {
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
              DOKUMENTACJA TECHNICZNA
            </Badge>
            <h1 className="text-4xl font-bold mb-6">
              Dokumentacja API Legal Nexus
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Kompletna dokumentacja techniczna API dla integracji z systemami
              kancelarii prawnych. Zgodność z standardami REST i JSON:API.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* API Endpoints */}
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

          {/* Code Examples */}
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
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-white">
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
      </section>
    </div>
  );
}
