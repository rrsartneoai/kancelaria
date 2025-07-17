"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  Users,
  Calendar,
  FileText,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    type: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefon",
      content: "+48 58 123 45 67",
      description: "Pon-Pt: 8:00-18:00, Sob: 9:00-14:00",
      action: "tel:+48581234567",
    },
    {
      icon: Mail,
      title: "Email",
      content: "kontakt@legalnexus.pl",
      description: "Odpowiadamy w ciągu 2 godzin",
      action: "mailto:kontakt@legalnexus.pl",
    },
    {
      icon: MapPin,
      title: "Adres",
      content: "ul. Długa 46/47, 80-831 Gdańsk",
      description: "Stare Miasto, blisko Ratusza",
      action: "https://maps.google.com/?q=Długa+46+Gdańsk",
    },
  ];

  const officeHours = [
    { day: "Poniedziałek - Piątek", hours: "8:00 - 18:00" },
    { day: "Sobota", hours: "9:00 - 14:00" },
    { day: "Niedziela", hours: "Zamknięte" },
  ];

  const services = [
    {
      title: "Konsultacje Prawne",
      description:
        "Profesjonalne doradztwo w sprawach cywilnych, gospodarczych i administracyjnych",
      price: "Od 150 zł/h",
    },
    {
      title: "Analiza Dokumentów",
      description:
        "Szczegółowa analiza nakazów zapłaty, wezwań komorniczych i innych pism",
      price: "Od 49 zł",
    },
    {
      title: "Pisma Procesowe",
      description:
        "Przygotowanie sprzeciwów, skarg, wniosków i innych dokumentów prawnych",
      price: "Od 89 zł",
    },
    {
      title: "Reprezentacja Sądowa",
      description:
        "Pełna reprezentacja w postępowaniach sądowych i administracyjnych",
      price: "Wycena indywidualna",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Wiadomość wysłana!",
        description: "Skontaktujemy się z Tobą w ciągu 2 godzin roboczych.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        type: "general",
      });
    } catch {
      toast({
        title: "Błąd",
        description: "Nie udało się wysłać wiadomości. Spróbuj ponownie.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-montserrat">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="bg-blue-800 text-blue-100 mb-4 font-medium">
              SKONTAKTUJ SIĘ Z NAMI
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Profesjonalna Pomoc Prawna w Gdańsku
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Doświadczeni prawnicy, nowoczesne rozwiązania technologiczne i
              indywidualne podejście do każdego klienta. Skontaktuj się z nami
              już dziś!
            </p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <info.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={info.action}
                      className="text-lg font-semibold text-blue-600 hover:text-blue-800 block mb-2"
                    >
                      {info.content}
                    </a>
                    <p className="text-gray-600">{info.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <MessageSquare className="mr-2 h-6 w-6 text-blue-600" />
                    Napisz do Nas
                  </CardTitle>
                  <p className="text-gray-600">
                    Wypełnij formularz, a skontaktujemy się z Tobą w ciągu 2
                    godzin roboczych
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Imię i nazwisko *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Jan Kowalski"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefon</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+48 123 456 789"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="jan.kowalski@email.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="type">Rodzaj sprawy</Label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="general">Zapytanie ogólne</option>
                        <option value="analysis">Analiza dokumentu</option>
                        <option value="consultation">Konsultacja prawna</option>
                        <option value="representation">
                          Reprezentacja sądowa
                        </option>
                        <option value="urgent">Sprawa pilna</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="subject">Temat *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="Krótko opisz temat sprawy"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Wiadomość *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        placeholder="Opisz szczegółowo swoją sytuację prawną..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Wysyłanie..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Wyślij Wiadomość
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Office Info */}
              <div className="space-y-8">
                {/* Office Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-blue-600" />
                      Godziny Otwarcia
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {officeHours.map((schedule, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 border-b border-gray-100"
                        >
                          <span className="font-medium">{schedule.day}</span>
                          <span className="text-blue-600 font-semibold">
                            {schedule.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <CheckCircle className="inline h-4 w-4 mr-1" />
                        Konsultacje online dostępne 24/7
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Services */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-blue-600" />
                      Nasze Usługi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {services.map((service, index) => (
                        <div
                          key={index}
                          className="border-l-4 border-blue-600 pl-4"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold">{service.title}</h4>
                            <Badge
                              variant="outline"
                              className="text-blue-600 border-blue-600"
                            >
                              {service.price}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {service.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Contact */}
                <Card className="border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="text-red-800 flex items-center">
                      <Phone className="mr-2 h-5 w-5" />
                      Sprawy Pilne
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-red-700 mb-3">
                      W sprawach pilnych (nakazy zapłaty, egzekucja komornicza)
                      dzwoń:
                    </p>
                    <a
                      href="tel:+48581234567"
                      className="text-xl font-bold text-red-800 hover:text-red-900 block mb-2"
                    >
                      +48 58 123 45 67
                    </a>
                    <p className="text-sm text-red-600">
                      Dostępne 24/7 dla spraw pilnych
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nasza Lokalizacja
              </h2>
              <p className="text-xl text-gray-600">
                Znajdziesz nas w sercu Starego Miasta w Gdańsku, blisko Ratusza
                Głównego Miasta
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">
                  Kancelaria LegalNexus
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold">
                        ul. Długa 46/47, 80-831 Gdańsk
                      </p>
                      <p className="text-gray-600">Stare Miasto, II piętro</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold">Parking</p>
                      <p className="text-gray-600">
                        Płatny parking miejski w pobliżu
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold">Wizyty</p>
                      <p className="text-gray-600">
                        Wyłącznie po wcześniejszym umówieniu
                      </p>
                    </div>
                  </div>
                </div>
                <Button className="mt-6" asChild>
                  <a
                    href="https://maps.google.com/?q=Długa+46+Gdańsk"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Otwórz w Mapach Google
                  </a>
                </Button>
              </div>
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-4" />
                  <p>Mapa Google Maps</p>
                  <p className="text-sm">ul. Długa 46/47, Gdańsk</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
