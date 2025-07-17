"use client";

import { useCallback, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { lawFirmAPI } from "@/lib/api/client";
import type { LawFirm, Specialization } from "@/lib/api/types";

interface SearchFilters {
  query: string;
  city: string;
  specialization: string;
}

export default function KancelariePage() {
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
      const [firmsResponse, specsResponse] = await Promise.all([
        lawFirmAPI.searchLawFirms({ page: 1, per_page: 9 }),
        lawFirmAPI.getSpecializations(),
      ]);

      setLawFirms(firmsResponse.data || []);
      setPagination(firmsResponse.meta || pagination);
      setSpecializations(specsResponse.data || []);
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
      setLawFirms(response.data || []);
      setPagination(response.meta || pagination);
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

  if (loading) {
    return <div>Loading...</div>; // This will be replaced by loading.tsx
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Znajdź Kancelarię Prawną
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Wyszukaj profesjonalną kancelarię prawną w swojej okolicy. Sprawdź
            specjalizacje, opinie i dane kontaktowe.
          </p>
        </div>

        {/* Search and Filters */}
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

        {/* Results */}
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
    </div>
  );
}
