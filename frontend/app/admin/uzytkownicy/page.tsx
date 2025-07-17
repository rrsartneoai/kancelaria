"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  UserX,
  Phone,
  Calendar,
  Building,
  Shield,
  Activity,
} from "lucide-react";

interface User {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: "client" | "lawyer" | "admin" | "operator";
  avatar_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_login?: string;
  law_firm?: {
    id: string;
    name: string;
  };
  stats?: {
    api_calls: number;
    searches: number;
    documents_analyzed: number;
  };
}

interface UserFormData {
  email: string;
  full_name: string;
  phone: string;
  role: "client" | "lawyer" | "admin" | "operator";
  is_active: boolean;
  law_firm_id?: string;
}

const roleLabels = {
  client: "Klient",
  lawyer: "Prawnik",
  admin: "Administrator",
  operator: "Operator",
};

const roleColors = {
  client: "bg-blue-100 text-blue-800",
  lawyer: "bg-green-100 text-green-800",
  admin: "bg-red-100 text-red-800",
  operator: "bg-yellow-100 text-yellow-800",
};

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    email: "",
    full_name: "",
    phone: "",
    role: "client",
    is_active: true,
  });

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    clients: 0,
    lawyers: 0,
    admins: 0,
    operators: 0,
    newThisMonth: 0,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/users");
      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setUsers(data.users);
      setStats(data.stats);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Błąd podczas pobierania użytkowników");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create user");

      toast.success("Użytkownik został utworzony");
      setIsCreateModalOpen(false);
      resetForm();
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Błąd podczas tworzenia użytkownika");
    }
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update user");

      toast.success("Użytkownik został zaktualizowany");
      setIsEditModalOpen(false);
      setSelectedUser(null);
      resetForm();
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Błąd podczas aktualizacji użytkownika");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete user");

      toast.success("Użytkownik został usunięty");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Błąd podczas usuwania użytkownika");
    }
  };

  const handleToggleUserStatus = async (userId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !isActive }),
      });

      if (!response.ok) throw new Error("Failed to toggle user status");

      toast.success(
        `Użytkownik został ${!isActive ? "aktywowany" : "dezaktywowany"}`,
      );
      fetchUsers();
    } catch (error) {
      console.error("Error toggling user status:", error);
      toast.error("Błąd podczas zmiany statusu użytkownika");
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      full_name: "",
      phone: "",
      role: "client",
      is_active: true,
    });
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      full_name: user.full_name || "",
      phone: user.phone || "",
      role: user.role,
      is_active: user.is_active,
    });
    setIsEditModalOpen(true);
  };

  const openDetailModal = (user: User) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ??
        false);
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.is_active) ||
      (statusFilter === "inactive" && !user.is_active);

    return matchesSearch && matchesRole && matchesStatus;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Zarządzanie użytkownikami</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Zarządzanie użytkownikami</h1>
          <p className="text-muted-foreground">
            Zarządzaj wszystkimi użytkownikami systemu
          </p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Dodaj użytkownika
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Dodaj nowego użytkownika</DialogTitle>
              <DialogDescription>
                Utwórz nowe konto użytkownika w systemie
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="user@example.com"
                />
              </div>
              <div>
                <Label htmlFor="full_name">Imię i nazwisko</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                  placeholder="Jan Kowalski"
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+48 123 456 789"
                />
              </div>
              <div>
                <Label htmlFor="role">Rola</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: unknown) =>
                    setFormData({ ...formData, role: value as "client" | "lawyer" | "admin" | "operator" })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Klient</SelectItem>
                    <SelectItem value="lawyer">Prawnik</SelectItem>
                    <SelectItem value="operator">Operator</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_active: checked })
                  }
                />
                <Label htmlFor="is_active">Aktywne konto</Label>
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Anuluj
              </Button>
              <Button onClick={handleCreateUser}>Utwórz użytkownika</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Wszyscy użytkownicy
                </p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Aktywni użytkownicy
                </p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <UserCheck className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Prawnicy
                </p>
                <p className="text-2xl font-bold">{stats.lawyers}</p>
              </div>
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Building className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Nowi w tym miesiącu
                </p>
                <p className="text-2xl font-bold">{stats.newThisMonth}</p>
              </div>
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Activity className="h-4 w-4 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Szukaj użytkowników..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtruj po roli" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie role</SelectItem>
                <SelectItem value="client">Klienci</SelectItem>
                <SelectItem value="lawyer">Prawnicy</SelectItem>
                <SelectItem value="operator">Operatorzy</SelectItem>
                <SelectItem value="admin">Administratorzy</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtruj po statusie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie statusy</SelectItem>
                <SelectItem value="active">Aktywni</SelectItem>
                <SelectItem value="inactive">Nieaktywni</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista użytkowników ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Zarządzaj wszystkimi użytkownikami systemu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Użytkownik</TableHead>
                <TableHead>Rola</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Kancelaria</TableHead>
                <TableHead>Data rejestracji</TableHead>
                <TableHead>Ostatnie logowanie</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar_url || undefined} />
                        <AvatarFallback>
                          {user.full_name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || user.email[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {user.full_name || "Brak imienia"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={roleColors[user.role]}>
                      {roleLabels[user.role]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.is_active ? "default" : "secondary"}>
                      {user.is_active ? "Aktywny" : "Nieaktywny"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.law_firm ? (
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1 text-muted-foreground" />
                        {user.law_firm.name}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(user.created_at).toLocaleDateString("pl-PL")}
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.last_login ? (
                      <div className="text-sm text-muted-foreground">
                        {new Date(user.last_login).toLocaleDateString("pl-PL")}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Nigdy</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDetailModal(user)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleToggleUserStatus(user.id, user.is_active)
                        }
                      >
                        {user.is_active ? (
                          <UserX className="h-4 w-4" />
                        ) : (
                          <UserCheck className="h-4 w-4" />
                        )}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Czy na pewno chcesz usunąć użytkownika?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Ta akcja nie może być cofnięta. Użytkownik{" "}
                              {user.email} zostanie trwale usunięty z systemu.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Anuluj</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Usuń użytkownika
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit User Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edytuj użytkownika</DialogTitle>
            <DialogDescription>
              Zmień dane użytkownika {selectedUser?.email}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit_email">Email</Label>
              <Input
                id="edit_email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit_full_name">Imię i nazwisko</Label>
              <Input
                id="edit_full_name"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit_phone">Telefon</Label>
              <Input
                id="edit_phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit_role">Rola</Label>
              <Select
                value={formData.role}
                onValueChange={(value: unknown) =>
                  setFormData({ ...formData, role: value as "client" | "lawyer" | "admin" | "operator" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Klient</SelectItem>
                  <SelectItem value="lawyer">Prawnik</SelectItem>
                  <SelectItem value="operator">Operator</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit_is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_active: checked })
                }
              />
              <Label htmlFor="edit_is_active">Aktywne konto</Label>
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Anuluj
            </Button>
            <Button onClick={handleUpdateUser}>Zapisz zmiany</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* User Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Szczegóły użytkownika</DialogTitle>
            <DialogDescription>
              Pełne informacje o użytkowniku {selectedUser?.email}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Szczegóły</TabsTrigger>
                <TabsTrigger value="activity">Aktywność</TabsTrigger>
                <TabsTrigger value="stats">Statystyki</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Email</Label>
                    <p className="text-sm font-medium">{selectedUser.email}</p>
                  </div>
                  <div>
                    <Label>Imię i nazwisko</Label>
                    <p className="text-sm font-medium">
                      {selectedUser.full_name || "Brak"}
                    </p>
                  </div>
                  <div>
                    <Label>Telefon</Label>
                    <p className="text-sm font-medium">
                      {selectedUser.phone || "Brak"}
                    </p>
                  </div>
                  <div>
                    <Label>Rola</Label>
                    <Badge className={roleColors[selectedUser.role]}>
                      {roleLabels[selectedUser.role]}
                    </Badge>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge
                      variant={selectedUser.is_active ? "default" : "secondary"}
                    >
                      {selectedUser.is_active ? "Aktywny" : "Nieaktywny"}
                    </Badge>
                  </div>
                  <div>
                    <Label>Data rejestracji</Label>
                    <p className="text-sm font-medium">
                      {new Date(selectedUser.created_at).toLocaleString(
                        "pl-PL",
                      )}
                    </p>
                  </div>
                  <div>
                    <Label>Ostatnia aktualizacja</Label>
                    <p className="text-sm font-medium">
                      {new Date(selectedUser.updated_at).toLocaleString(
                        "pl-PL",
                      )}
                    </p>
                  </div>
                  <div>
                    <Label>Ostatnie logowanie</Label>
                    <p className="text-sm font-medium">
                      {selectedUser.last_login
                        ? new Date(selectedUser.last_login).toLocaleString(
                            "pl-PL",
                          )
                        : "Nigdy"}
                    </p>
                  </div>
                </div>
                {selectedUser.law_firm && (
                  <div>
                    <Label>Kancelaria</Label>
                    <div className="flex items-center mt-1">
                      <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {selectedUser.law_firm.name}
                      </span>
                    </div>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="activity" className="space-y-4">
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Historia aktywności będzie dostępna wkrótce</p>
                </div>
              </TabsContent>
              <TabsContent value="stats" className="space-y-4">
                {selectedUser.stats ? (
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold">
                          {selectedUser.stats.api_calls}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Wywołania API
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold">
                          {selectedUser.stats.searches}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Wyszukiwania
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold">
                          {selectedUser.stats.documents_analyzed}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Analizy dokumentów
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Brak dostępnych statystyk</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
