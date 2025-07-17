"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function RejestracjaPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUpWithEmail } = useAuth();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register form submitted");
    setIsLoading(true);

    const { user, error } = await signUpWithEmail(email, password, name);

    if (error) {
      toast({
        title: "Błąd rejestracji",
        description: error,
        variant: "destructive",
      });
    } else if (user) {
      toast({
        title: "Rejestracja pomyślna!",
        description:
          "Twoje konto zostało utworzone. Sprawdź swoją skrzynkę pocztową, aby potwierdzić adres email.",
      });
      router.push("/panel-klienta"); // Redirect to client panel after successful registration
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-montserrat">
      {/* USUWAM <Header /> */}

      <main className="flex-1 py-12">
        <div className="max-w-md mx-auto px-4">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Powrót
            </Link>
          </Button>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Zarejestruj się
              </CardTitle>
              <p className="text-gray-600">
                Stwórz swoje konto i uzyskaj dostęp do usług
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Imię i Nazwisko / Nazwa Firmy</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Jan Kowalski"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Adres email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="twoj@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Hasło</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Wprowadź hasło"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Rejestracja..." : "Zarejestruj się"}
                </Button>
              </form>

              <div className="text-center">
                <span className="text-gray-600">Masz już konto? </span>
                <Link
                  href="/logowanie"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Zaloguj się
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* USUWAM <Footer /> */}
    </div>
  );
}
