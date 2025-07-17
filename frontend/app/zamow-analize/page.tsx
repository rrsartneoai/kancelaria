"use client";

import type React from "react";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileText,
  AlertCircle,
  ArrowLeft,
  CreditCard,
} from "lucide-react";

export default function ZamowAnalizePage() {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("standard");

  const packages = [
    {
      id: "basic",
      name: "Analiza Podstawowa",
      price: 39,
      time: "48h",
      features: [
        "Analiza dokumentu",
        "Podstawowe wskazówki",
        "Odpowiedź przez email",
      ],
    },
    {
      id: "standard",
      name: "Analiza Standardowa",
      price: 59,
      time: "24h",
      features: [
        "Szczegółowa analiza",
        "Konkretne wskazówki działania",
        "Propozycje pism do sporządzenia",
        "Konsultacja telefoniczna",
      ],
      popular: true,
    },
    {
      id: "premium",
      name: "Analiza Premium",
      price: 89,
      time: "12h",
      features: [
        "Ekspresowa analiza",
        "Pełna strategia prawna",
        "Wszystkie możliwe pisma",
        "Konsultacja + wsparcie",
      ],
    },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    setFiles([...files, ...uploadedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Powrót
          </Button>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">
                Krok {step} z 3
              </span>
              <span className="text-sm text-gray-500">
                {step === 1 && "Prześlij dokumenty"}
                {step === 2 && "Wybierz pakiet"}
                {step === 3 && "Płatność"}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: Upload Documents */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="mr-2 h-5 w-5" />
                  Prześlij dokumenty do analizy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <div className="space-y-2">
                    <p className="text-lg font-medium">
                      Przeciągnij pliki tutaj lub kliknij aby wybrać
                    </p>
                    <p className="text-gray-500">
                      Obsługujemy pliki PDF, JPG, PNG (max 10MB każdy)
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button className="mt-4" asChild>
                      <span>Wybierz pliki</span>
                    </Button>
                  </label>
                </div>

                {files.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Przesłane pliki:</h4>
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm">{file.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          Usuń
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Opisz swoją sytuację (opcjonalnie)
                  </label>
                  <Textarea
                    placeholder="Powiedz nam o swojej sytuacji: czy zgadzasz się z treścią pisma? Jakie są Twoje oczekiwania? Czy masz dodatkowe pytania?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                  <p className="text-sm text-gray-500">
                    Im więcej informacji podasz, tym bardziej precyzyjna będzie
                    analiza
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-yellow-400 mr-2 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-800">
                        Ważne informacje:
                      </p>
                      <ul className="mt-1 text-yellow-700 space-y-1">
                        <li>• Maksymalnie 5 plików, każdy do 10MB</li>
                        <li>• Upewnij się, że dokumenty są czytelne</li>
                        <li>• Możesz dodać zdjęcia zrobione telefonem</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleNext}
                  className="w-full"
                  disabled={files.length === 0}
                >
                  Dalej - Wybierz pakiet
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Choose Package */}
          {step === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Wybierz pakiet analizy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {packages.map((pkg) => (
                      <Card
                        key={pkg.id}
                        className={`cursor-pointer transition-all ${
                          selectedPackage === pkg.id
                            ? "ring-2 ring-red-500 bg-red-50"
                            : "hover:shadow-md"
                        } ${pkg.popular ? "relative" : ""}`}
                        onClick={() => setSelectedPackage(pkg.id)}
                      >
                        {pkg.popular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-red-600 text-white">
                              Najpopularniejszy
                            </Badge>
                          </div>
                        )}

                        <CardContent className="p-6 text-center">
                          <h3 className="text-lg font-semibold mb-2">
                            {pkg.name}
                          </h3>
                          <div className="text-3xl font-bold text-red-600 mb-2">
                            {pkg.price} zł
                          </div>
                          <div className="text-sm text-gray-500 mb-4">
                            Realizacja: {pkg.time}
                          </div>

                          <ul className="text-sm space-y-2 text-left">
                            {pkg.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 bg-transparent"
                >
                  Wstecz
                </Button>
                <Button onClick={handleNext} className="flex-1">
                  Dalej - Płatność
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Podsumowanie i płatność
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">
                      Podsumowanie zamówienia:
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Pakiet:</span>
                        <span>
                          {packages.find((p) => p.id === selectedPackage)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Liczba dokumentów:</span>
                        <span>{files.length}</span>
                      </div>
                      <div className="flex justify-between font-medium text-lg border-t pt-2">
                        <span>Do zapłaty:</span>
                        <span className="text-red-600">
                          {
                            packages.find((p) => p.id === selectedPackage)
                              ?.price
                          }{" "}
                          zł
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Wybierz metodę płatności:</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="cursor-pointer hover:shadow-md border-2 border-red-500">
                        <CardContent className="p-4 text-center">
                          <div className="text-lg font-medium mb-2">
                            Karta płatnicza
                          </div>
                          <div className="text-sm text-gray-500">
                            Visa, Mastercard
                          </div>
                          <Badge className="mt-2 bg-yellow-100 text-yellow-800">
                            SZYBKO I BEZPIECZNIE
                          </Badge>
                        </CardContent>
                      </Card>

                      <Card className="cursor-pointer hover:shadow-md">
                        <CardContent className="p-4 text-center">
                          <div className="text-lg font-medium mb-2">BLIK</div>
                          <div className="text-sm text-gray-500">
                            Kod z aplikacji bankowej
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="cursor-pointer hover:shadow-md">
                        <CardContent className="p-4 text-center">
                          <div className="text-lg font-medium mb-2">
                            Przelew internetowy
                          </div>
                          <div className="text-sm text-gray-500">23 banki</div>
                        </CardContent>
                      </Card>

                      <Card className="cursor-pointer hover:shadow-md">
                        <CardContent className="p-4 text-center">
                          <div className="text-lg font-medium mb-2">
                            Google Pay
                          </div>
                          <div className="text-sm text-gray-500">
                            Płatność mobilna
                          </div>
                        </CardContent>
                      </Card>

                      {/* Dodany kafelek PayU */}
                      <Card className="cursor-pointer hover:shadow-md">
                        <CardContent className="p-4 text-center">
                          <div className="text-lg font-medium mb-2">
                            PayU
                          </div>
                          <div className="text-sm text-gray-500">
                            Szybkie płatności online
                          </div>
                          <Badge className="mt-2 bg-green-100 text-green-800">
                            Popularne w Polsce
                          </Badge>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-sm">
                      <p className="font-medium text-blue-800 mb-1">
                        Co dzieje się po płatności?
                      </p>
                      <ul className="text-blue-700 space-y-1">
                        <li>• Otrzymasz potwierdzenie na email</li>
                        <li>• Prawnik przystąpi do analizy dokumentów</li>
                        <li>
                          • Powiadomimy Cię SMS-em gdy analiza będzie gotowa
                        </li>
                        <li>• Analizę otrzymasz w panelu klienta i na email</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 bg-transparent"
                >
                  Wstecz
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={() => (window.location.href = "/platnosc")}
                >
                  Zapłać i Zamów
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* USUWAM <Footer /> */}
    </div>
  );
}
