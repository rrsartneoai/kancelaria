"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Building,
  CreditCard,
  TrendingUp,
  Activity,
  CheckCircle,
  Clock,
  UserPlus,
  Building2,
} from "lucide-react";

interface DashboardStats {
  users: {
    total: number;
    active: number;
    newThisMonth: number;
    byRole: {
      clients: number;
      lawyers: number;
      admins: number;
      operators: number;
    };
  };
  lawFirms: {
    total: number;
    active: number;
    verified: number;
    newThisMonth: number;
  };
  subscriptions: {
    total: number;
    active: number;
    trial: number;
    revenue: number;
  };
  apiUsage: {
    totalCalls: number;
    todayCalls: number;
    avgResponseTime: number;
  };
}

interface RecentActivity {
  id: string;
  type:
    | "user_registered"
    | "law_firm_created"
    | "subscription_created"
    | "api_call";
  description: string;
  timestamp: string;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, activityResponse] = await Promise.all([
        fetch("/api/admin/dashboard/stats"),
        fetch("/api/admin/dashboard/activity"),
      ]);

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      if (activityResponse.ok) {
        const activityData = await activityResponse.json();
        setRecentActivity(activityData.activities);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Przegląd systemu LegalNexus</p>
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
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Przegląd systemu LegalNexus</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Użytkownicy
                </p>
                <p className="text-2xl font-bold">{stats?.users.total || 0}</p>
                <p className="text-xs text-muted-foreground">
                  +{stats?.users.newThisMonth || 0} w tym miesiącu
                </p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress
                value={
                  ((stats?.users.active || 0) / (stats?.users.total || 1)) * 100
                }
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {stats?.users.active || 0} aktywnych użytkowników
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Kancelarie
                </p>
                <p className="text-2xl font-bold">
                  {stats?.lawFirms.total || 0}
                </p>
                <p className="text-xs text-muted-foreground">
                  +{stats?.lawFirms.newThisMonth || 0} w tym miesiącu
                </p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <Building className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress
                value={
                  ((stats?.lawFirms.verified || 0) /
                    (stats?.lawFirms.total || 1)) *
                  100
                }
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {stats?.lawFirms.verified || 0} zweryfikowanych
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Subskrypcje
                </p>
                <p className="text-2xl font-bold">
                  {stats?.subscriptions.active || 0}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stats?.subscriptions.trial || 0} w okresie próbnym
                </p>
              </div>
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-green-600">
                ${stats?.subscriptions.revenue || 0} MRR
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  API Calls
                </p>
                <p className="text-2xl font-bold">
                  {stats?.apiUsage.todayCalls || 0}
                </p>
                <p className="text-xs text-muted-foreground">
                  dziś ({stats?.apiUsage.totalCalls || 0} łącznie)
                </p>
              </div>
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Activity className="h-4 w-4 text-orange-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium">
                Avg: {stats?.apiUsage.avgResponseTime || 0}ms
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Ostatnia aktywność</CardTitle>
              <CardDescription>Najnowsze wydarzenia w systemie</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {activity.type === "user_registered" && (
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <UserPlus className="h-4 w-4 text-blue-600" />
                        </div>
                      )}
                      {activity.type === "law_firm_created" && (
                        <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Building2 className="h-4 w-4 text-green-600" />
                        </div>
                      )}
                      {activity.type === "subscription_created" && (
                        <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <CreditCard className="h-4 w-4 text-purple-600" />
                        </div>
                      )}
                      {activity.type === "api_call" && (
                        <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <Activity className="h-4 w-4 text-orange-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.description}
                      </p>
                      <div className="flex items-center mt-1">
                        {activity.user && (
                          <div className="flex items-center mr-4">
                            <Avatar className="h-4 w-4 mr-1">
                              <AvatarImage
                                src={activity.user.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback className="text-xs">
                                {activity.user.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">
                              {activity.user.name}
                            </span>
                          </div>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString("pl-PL")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Status systemu</CardTitle>
              <CardDescription>Monitorowanie wydajności</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">API</span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Database</span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-yellow-500 mr-2" />
                  <span className="text-sm">Search</span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-yellow-100 text-yellow-800"
                >
                  Degraded
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Payments</span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Operational
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Szybkie akcje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
              >
                <Users className="h-4 w-4 mr-2" />
                Zarządzaj użytkownikami
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
              >
                <Building className="h-4 w-4 mr-2" />
                Przeglądaj kancelarie
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Zobacz analitykę
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Użytkownicy</TabsTrigger>
          <TabsTrigger value="lawfirms">Kancelarie</TabsTrigger>
          <TabsTrigger value="revenue">Przychody</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {stats?.users.byRole.clients || 0}
                </p>
                <p className="text-sm text-muted-foreground">Klienci</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-green-600">
                  {stats?.users.byRole.lawyers || 0}
                </p>
                <p className="text-sm text-muted-foreground">Prawnicy</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {stats?.users.byRole.operators || 0}
                </p>
                <p className="text-sm text-muted-foreground">Operatorzy</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-red-600">
                  {stats?.users.byRole.admins || 0}
                </p>
                <p className="text-sm text-muted-foreground">Administratorzy</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lawfirms" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">
                  {stats?.lawFirms.total || 0}
                </p>
                <p className="text-sm text-muted-foreground">
                  Wszystkie kancelarie
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-green-600">
                  {stats?.lawFirms.verified || 0}
                </p>
                <p className="text-sm text-muted-foreground">Zweryfikowane</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {stats?.lawFirms.active || 0}
                </p>
                <p className="text-sm text-muted-foreground">Aktywne</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-green-600">
                  ${stats?.subscriptions.revenue || 0}
                </p>
                <p className="text-sm text-muted-foreground">
                  Miesięczny przychód
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">
                  {stats?.subscriptions.active || 0}
                </p>
                <p className="text-sm text-muted-foreground">
                  Aktywne subskrypcje
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
