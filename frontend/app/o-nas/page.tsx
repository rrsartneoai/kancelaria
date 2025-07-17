"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Users,
  Award,
  Calendar,
  Scale,
  Building,
  Heart,
  Target,
  Shield,
} from "lucide-react";

export default function ONasPage() {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge
              variant="secondary"
              className="mb-4 bg-blue-800 text-blue-100"
            >
              <Building className="w-4 h-4 mr-2" />
              NASZA HISTORIA
            </Badge>
            <h1 className="text-4xl font-bold mb-6">
              Legal API Nexus - Lider Technologii Prawniczych
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Od 2018 roku tworzymy innowacyjne rozwiązania informatyczne dla
              kancelarii prawnych, łącząc głęboką wiedzę prawniczą z najnowszymi
              technologiami.
            </p>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Misja i Wizja Firmy
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-blue-600 mb-3">
                    Nasza Misja
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Wspieramy kancelarie prawne w całej Polsce poprzez
                    dostarczanie nowoczesnych, bezpiecznych i intuicyjnych
                    narzędzi informatycznych, które zwiększają efektywność pracy
                    prawników i poprawiają jakość obsługi klientów.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-600 mb-3">
                    Nasza Wizja
                  </h3>
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
                  <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-gray-600">Wsparcie Techniczne</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nasze Wartości
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fundamenty, na których budujemy nasze rozwiązania i relacje z
              klientami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index}>
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <value.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                  </div>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Historia Rozwoju
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kluczowe momenty w rozwoju naszej firmy i produktów.
            </p>
          </div>

          <div className="relative">
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
                        <h3 className="text-lg font-semibold mb-2">
                          {milestone.title}
                        </h3>
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
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Zespół Kierowniczy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Doświadczeni profesjonaliści łączący wiedzę prawniczą z ekspertyzą
              technologiczną.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nasze Biuro w Gdańsku
              </h2>
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
                <h3 className="text-lg font-semibold mb-4">Dlaczego Gdańsk?</h3>
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
    </div>
  );
}
