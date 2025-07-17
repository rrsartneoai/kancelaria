"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth, mockLogin } from "@/lib/auth";
import type { Case } from "@/lib/types";
import {
  FileText,
  Eye,
  Plus,
  Search,
  Filter,
  User,
  Settings,
  History,
  MessageSquare,
  CreditCard,
  Clock,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import NewCaseForm from "@/components/forms/new-case-form"; // Import NewCaseForm component

/**
 * Lightweight placeholder until the full client dashboard is finished.
 * Keeps the `/panel-klienta` route compiling and deployable.
 */
export default function PanelKlientaPage() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("sprawy");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      mockLogin("klient@example.com", "client");
    }
  }, [isAuthenticated]);

  const mockCases: Case[] = [
    {
      id: "1",
      name: "Nakaz zapłaty - Sprawa nr 1",
      clientId: user?.id || "",
      status: "analysis_ready",
      documents: [
        {
          id: "1",
          name: "nakaz_zaplaty.pdf",
          type: "pdf",
          url: "/documents/nakaz.pdf",
          uploadedAt: new Date("2024-01-15"),
          size: 1024000,
        },
      ],
      analysis: {
        id: "1",
        caseId: "1",
        content:
          "Otrzymany nakaz zapłaty jest prawidłowy pod względem formalnym. Został wydany przez właściwy sąd i zawiera wszystkie wymagane elementy. Jednakże istnieją podstawy do złożenia sprzeciwu, szczególnie w zakresie wysokości dochodzonej kwoty oraz odsetek. Analiza dokumentów wskazuje na możliwość zakwestionowania części roszczeń...",
        summary:
          "Nakaz zapłaty formalnie prawidłowy, ale istnieją podstawy do sprzeciwu",
        recommendations: [
          "Złożenie sprzeciwu w terminie 14 dni od doręczenia",
          "Przygotowanie dowodów na poparcie stanowiska",
          "Rozważenie ugody pozasądowej",
          "Analiza wysokości odsetek i kosztów",
        ],
        possibleDocuments: [
          {
            id: "1",
            name: "Sprzeciw od nakazu zapłaty",
            description:
              "Profesjonalnie przygotowany sprzeciw z uzasadnieniem prawnym",
            price: 89,
            estimatedTime: "24h",
            category: "Pisma procesowe",
          },
          {
            id: "2",
            name: "Wniosek o rozłożenie na raty",
            description: "Wniosek o rozłożenie należności na raty płatne",
            price: 59,
            estimatedTime: "12h",
            category: "Wnioski",
          },
          {
            id: "3",
            name: "Propozycja ugody",
            description: "Projekt ugody pozasądowej z wierzycielem",
            price: 79,
            estimatedTime: "18h",
            category: "Ugody",
          },
        ],
        price: 59,
        status: "completed",
        previewContent:
          "Otrzymany nakaz zapłaty jest prawidłowy pod względem formalnym. Został wydany przez właściwy sąd i zawiera wszystkie wymagane elementy...",
        createdAt: new Date("2024-01-16"),
      },
      generatedDocuments: [],
      clientNotes:
        "Nie zgadzam się z wysokością odsetek. Mam dokumenty potwierdzające częściowe spłaty.",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-16"),
    },
    {
      id: "2",
      name: "Wezwanie komornika - Sprawa nr 2",
      clientId: user?.id || "",
      status: "analyzing",
      documents: [
        {
          id: "2",
          name: "wezwanie_komornik.jpg",
          type: "image",
          url: "/documents/wezwanie.jpg",
          uploadedAt: new Date("2024-01-18"),
          size: 2048000,
        },
      ],
      generatedDocuments: [],
      clientNotes:
        "Otrzymałem wezwanie do zapłaty od komornika. Czy mogę się odwołać?",
      createdAt: new Date("2024-01-18"),
      updatedAt: new Date("2024-01-18"),
    },
  ];

  const sidebarItems = [
    { id: "sprawy", label: "Moje sprawy", icon: FileText },
    { id: "nowa-sprawa", label: "Nowa sprawa", icon: Plus },
    { id: "historia", label: "Historia płatności", icon: History },
    { id: "wiadomosci", label: "Wiadomości", icon: MessageSquare },
    { id: "profil", label: "Mój profil", icon: User },
    { id: "ustawienia", label: "Ustawienia", icon: Settings },
  ];

  const getStatusBadge = (status: Case["status"]) => {
    const statusConfig = {
      new: { label: "Nowa", color: "bg-blue-100 text-blue-800" },
      analyzing: {
        label: "Analizujemy",
        color: "bg-yellow-100 text-yellow-800",
      },
      analysis_ready: {
        label: "Analiza gotowa",
        color: "bg-green-100 text-green-800",
      },
      documents_ready: {
        label: "Pisma gotowe",
        color: "bg-purple-100 text-purple-800",
      },
      completed: { label: "Zakończona", color: "bg-gray-100 text-gray-800" },
    };

    return statusConfig[status] || statusConfig.new;
  };

  const handlePurchaseDocument = (documentId: string) => {
    // Simulate purchase process
    alert(`Przekierowanie do płatności za dokument ${documentId}`);
  };

  const handleViewFullAnalysis = (analysisId: string) => {
    // Simulate viewing full analysis
    alert(`Przekierowanie do pełnej analizy ${analysisId}`);
  };

  if (!isAuthenticated) {
    return <div className="p-8">Ładowanie…</div>;
  }

  return (
    <div className="min-h-screen flex flex-col font-montserrat bg-gray-50">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? "w-64" : "w-64 hidden lg:block"}`}
        >
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold">{user?.name}</div>
                <div className="text-sm text-gray-500">Panel klienta</div>
              </div>
            </div>

            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors font-medium ${
                    activeTab === item.id
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === "sprawy" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  Moje sprawy
                </h1>
                <Button onClick={() => setActiveTab("nowa-sprawa")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nowa sprawa
                </Button>
              </div>

              <div className="flex space-x-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Szukaj spraw..." className="pl-10" />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtruj
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {mockCases.map((case_) => (
                  <Card
                    key={case_.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg font-semibold">
                            {case_.name}
                          </CardTitle>
                          <p className="text-sm text-gray-500 mt-1">
                            Utworzona: {case_.createdAt.toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={getStatusBadge(case_.status).color}>
                          {getStatusBadge(case_.status).label}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Documents */}
                      <div>
                        <h4 className="font-medium mb-2">
                          Dokumenty ({case_.documents.length})
                        </h4>
                        <div className="space-y-2">
                          {case_.documents.map((doc) => (
                            <div
                              key={doc.id}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded"
                            >
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 text-gray-500 mr-2" />
                                <div>
                                  <span className="text-sm font-medium">
                                    {doc.name}
                                  </span>
                                  <div className="text-xs text-gray-500">
                                    {(doc.size / 1024 / 1024).toFixed(1)} MB •{" "}
                                    {doc.uploadedAt.toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Client Notes */}
                      {case_.clientNotes && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <h5 className="text-sm font-medium text-blue-800 mb-1">
                            Twoje notatki:
                          </h5>
                          <p className="text-sm text-blue-700">
                            {case_.clientNotes}
                          </p>
                        </div>
                      )}

                      {/* Analysis */}
                      {case_.analysis && (
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium">Analiza prawna</h4>
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-green-100 text-green-800">
                                Gotowa
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {case_.analysis.price} zł
                              </span>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <h5 className="font-medium mb-2">Podsumowanie:</h5>
                            <p className="text-sm text-gray-700 mb-3">
                              {case_.analysis.summary}
                            </p>

                            <div className="mb-3">
                              <h6 className="text-sm font-medium mb-1">
                                Zalecenia:
                              </h6>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {case_.analysis.recommendations.map(
                                  (rec, idx) => (
                                    <li key={idx} className="flex items-start">
                                      <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                      {rec}
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>

                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleViewFullAnalysis(case_.analysis!.id)
                                }
                              >
                                <Eye className="mr-2 h-3 w-3" />
                                Zobacz pełną analizę
                              </Button>
                            </div>
                          </div>

                          {/* Available Documents */}
                          {case_.analysis.possibleDocuments.length > 0 && (
                            <div className="space-y-3">
                              <h5 className="text-sm font-medium">
                                Dostępne pisma do zamówienia:
                              </h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {case_.analysis.possibleDocuments.map((doc) => (
                                  <Card
                                    key={doc.id}
                                    className="border border-blue-200 hover:shadow-md transition-shadow"
                                  >
                                    <CardContent className="p-4">
                                      <div className="flex justify-between items-start mb-2">
                                        <h6 className="text-sm font-medium leading-tight">
                                          {doc.name}
                                        </h6>
                                        <span className="text-sm font-bold text-blue-600">
                                          {doc.price} zł
                                        </span>
                                      </div>
                                      <p className="text-xs text-gray-600 mb-2">
                                        {doc.description}
                                      </p>
                                      <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs text-gray-500">
                                          <Clock className="h-3 w-3 inline mr-1" />
                                          {doc.estimatedTime}
                                        </span>
                                        <Badge
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {doc.category}
                                        </Badge>
                                      </div>
                                      <Button
                                        size="sm"
                                        className="w-full text-xs"
                                        onClick={() =>
                                          handlePurchaseDocument(doc.id)
                                        }
                                      >
                                        <CreditCard className="mr-1 h-3 w-3" />
                                        Zamów
                                      </Button>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {activeTab === "nowa-sprawa" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  Nowa Sprawa
                </h1>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("sprawy")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Powrót do Spraw
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Dodaj Nową Sprawę</CardTitle>
                  <p className="text-gray-600">
                    Wypełnij formularz i prześlij dokumenty, aby rozpocząć
                    proces analizy prawnej
                  </p>
                </CardHeader>
                <CardContent>
                  <NewCaseForm onSuccess={() => setActiveTab("sprawy")} />
                </CardContent>
              </Card>
            </div>
          )}
          {/* Additional tabs can be added here */}
        </div>
      </div>
    </div>
  );
}
