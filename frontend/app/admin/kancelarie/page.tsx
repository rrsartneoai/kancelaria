"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Search,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Users,
  Phone,
  Mail,
  Globe,
} from "lucide-react";
import { db } from "@/lib/database/supabase";
import type { LawFirm } from "@/lib/api/types";

export default function AdminKancelariePage() {
  const [lawFirms, setLawFirms] = useState<LawFirm[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFirm, setSelectedFirm] = useState<LawFirm | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    loadLawFirms();
  }, []);

  const loadLawFirms = async () => {
    try {
      setLoading(true);
      const response = await db.searchLawFirms({ limit: 100 });
      setLawFirms(response);
    } catch (error) {
      console.error("Failed to load law firms:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const response = await db.searchLawFirms({ query, limit: 100 });
      setLawFirms(response);
    } else {
      loadLawFirms();
    }
  };

  const handleToggleActive = async (firmId: string, isActive: boolean) => {
    try {
      await db.updateLawFirm(firmId, { is_active: isActive });
      setLawFirms((firms) =>
        firms.map((firm) =>
          firm.id === firmId ? { ...firm, is_active: isActive } : firm,
        ),
      );
    } catch (error) {
      console.error("Failed to update law firm:", error);
    }
  };

  const handleToggleVerified = async (firmId: string, isVerified: boolean) => {
    try {
      await db.updateLawFirm(firmId, { is_verified: isVerified });
      setLawFirms((firms) =>
        firms.map((firm) =>
          firm.id === firmId ? { ...firm, is_verified: isVerified } : firm,
        ),
      );
    } catch (error) {
      console.error("Failed to update law firm:", error);
    }
  };

  const handleDelete = async (firmId: string) => {
    if (confirm("Czy na pewno chcesz usunąć tę kancelarię?")) {
      try {
        await db.deleteLawFirm(firmId);
        setLawFirms((firms) => firms.filter((firm) => firm.id !== firmId));
      } catch (error) {
        console.error("Failed to delete law firm:", error);
      }
    }
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
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-32"></div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kancelarie</h1>
          <p className="text-gray-600">
            Zarządzaj kancelariami prawnymi w systemie
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Dodaj kancelarię
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Szukaj kancelarii..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filtry</Button>
          </div>
        </CardContent>
      </Card>

      {/* Law Firms Table */}
      <Card>
        <CardHeader>
          <CardTitle>Kancelarie ({lawFirms.length})</CardTitle>
          <CardDescription>
            Lista wszystkich kancelarii prawnych w systemie
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kancelaria</TableHead>
                <TableHead>Miasto</TableHead>
                <TableHead>Prawnicy</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Weryfikacja</TableHead>
                <TableHead>Data utworzenia</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lawFirms.map((firm) => (
                <TableRow key={firm.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {getInitials(firm.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{firm.name}</div>
                        <div className="text-sm text-gray-500">
                          NIP: {firm.tax_number}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{firm.address.city}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{firm.lawyers.length}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={firm.is_active ? "default" : "secondary"}>
                      {firm.is_active ? "Aktywna" : "Nieaktywna"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {firm.is_verified ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-gray-400" />
                      )}
                      <span className="text-sm">
                        {firm.is_verified
                          ? "Zweryfikowana"
                          : "Niezweryfikowana"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(firm.created_at).toLocaleDateString("pl-PL")}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Akcje</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedFirm(firm);
                            setShowDetails(true);
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Zobacz szczegóły
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedFirm(firm);
                            setShowEdit(true);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edytuj
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            handleToggleActive(firm.id, !firm.is_active)
                          }
                        >
                          {firm.is_active ? "Dezaktywuj" : "Aktywuj"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleToggleVerified(firm.id, !firm.is_verified)
                          }
                        >
                          {firm.is_verified ? "Usuń weryfikację" : "Zweryfikuj"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(firm.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Usuń
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Szczegóły kancelarii</DialogTitle>
            <DialogDescription>
              Pełne informacje o kancelarii {selectedFirm?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedFirm && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Nazwa</Label>
                  <p className="text-sm text-gray-600">{selectedFirm.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">NIP</Label>
                  <p className="text-sm text-gray-600">
                    {selectedFirm.tax_number}
                  </p>
                </div>
                {selectedFirm.krs_number && (
                  <div>
                    <Label className="text-sm font-medium">KRS</Label>
                    <p className="text-sm text-gray-600">
                      {selectedFirm.krs_number}
                    </p>
                  </div>
                )}
                <div>
                  <Label className="text-sm font-medium">Data założenia</Label>
                  <p className="text-sm text-gray-600">
                    {selectedFirm.founded_date
                      ? new Date(selectedFirm.founded_date).toLocaleDateString(
                          "pl-PL",
                        )
                      : "Nie podano"}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div>
                <Label className="text-sm font-medium">Adres</Label>
                <p className="text-sm text-gray-600">
                  {selectedFirm.address.street}
                  <br />
                  {selectedFirm.address.postal_code} {selectedFirm.address.city}
                </p>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedFirm.contact.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">
                      {selectedFirm.contact.phone}
                    </span>
                  </div>
                )}
                {selectedFirm.contact.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">
                      {selectedFirm.contact.email}
                    </span>
                  </div>
                )}
                {selectedFirm.contact.website && (
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <a
                      href={selectedFirm.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Strona internetowa
                    </a>
                  </div>
                )}
              </div>

              {/* Description */}
              {selectedFirm.description && (
                <div>
                  <Label className="text-sm font-medium">Opis</Label>
                  <p className="text-sm text-gray-600">
                    {selectedFirm.description}
                  </p>
                </div>
              )}

              {/* Specializations */}
              {selectedFirm.specializations.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Specjalizacje</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedFirm.specializations.map((spec) => (
                      <Badge key={spec.id} variant="secondary">
                        {spec.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Lawyers */}
              {selectedFirm.lawyers.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">
                    Prawnicy ({selectedFirm.lawyers.length})
                  </Label>
                  <div className="space-y-2 mt-2">
                    {selectedFirm.lawyers.map((lawyer) => (
                      <div
                        key={lawyer.id}
                        className="flex items-center space-x-3 p-2 bg-gray-50 rounded"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {lawyer.first_name[0]}
                            {lawyer.last_name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {lawyer.title} {lawyer.first_name}{" "}
                            {lawyer.last_name}
                          </p>
                          {lawyer.email && (
                            <p className="text-xs text-gray-500">
                              {lawyer.email}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Switch
                      checked={selectedFirm.is_active}
                      onCheckedChange={(checked) =>
                        handleToggleActive(selectedFirm.id, checked)
                      }
                    />
                    <span className="text-sm">
                      {selectedFirm.is_active ? "Aktywna" : "Nieaktywna"}
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Weryfikacja</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Switch
                      checked={selectedFirm.is_verified}
                      onCheckedChange={(checked) =>
                        handleToggleVerified(selectedFirm.id, checked)
                      }
                    />
                    <span className="text-sm">
                      {selectedFirm.is_verified
                        ? "Zweryfikowana"
                        : "Niezweryfikowana"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetails(false)}>
              Zamknij
            </Button>
            <Button
              onClick={() => {
                setShowDetails(false);
                setShowEdit(true);
              }}
            >
              Edytuj
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edytuj kancelarię</DialogTitle>
            <DialogDescription>
              Zmień informacje o kancelarii {selectedFirm?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedFirm && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nazwa</Label>
                  <Input id="name" defaultValue={selectedFirm.name} />
                </div>
                <div>
                  <Label htmlFor="tax_number">NIP</Label>
                  <Input
                    id="tax_number"
                    defaultValue={selectedFirm.tax_number}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Opis</Label>
                <Textarea
                  id="description"
                  defaultValue={selectedFirm.description || ""}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    defaultValue={selectedFirm.contact.phone || ""}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    defaultValue={selectedFirm.contact.email || ""}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="website">Strona internetowa</Label>
                <Input
                  id="website"
                  defaultValue={selectedFirm.contact.website || ""}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEdit(false)}>
              Anuluj
            </Button>
            <Button onClick={() => setShowEdit(false)}>Zapisz zmiany</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
