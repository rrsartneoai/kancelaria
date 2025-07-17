"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  User,
  LogIn,
  LogOut,
  FileText,
  Scale,
  Phone,
  Info,
  Home,
  DollarSign,
  BookOpen,
  Lightbulb,
  Users,
  Briefcase,
  Shield,
  BarChart,
  Gavel,
} from "lucide-react";
import { useAuth, mockLogout } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: any;
  isScrollLink?: boolean;
}

export function Header() {
  const { user, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const role = user?.role;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { name: "Strona Główna", href: "/", icon: Home, isScrollLink: false },
    { name: "Jak to działa", href: "/#jak-to-dziala", icon: Lightbulb, isScrollLink: true },
    { name: "Funkcje", href: "/#funkcje", icon: BarChart, isScrollLink: true },
    { name: "Cennik", href: "/#cennik", icon: DollarSign, isScrollLink: true },
    { name: "Kancelarie", href: "/#kancelarie", icon: Briefcase, isScrollLink: true },
    { name: "Blog", href: "/#blog", icon: BookOpen, isScrollLink: true },
    { name: "Poradniki", href: "/#poradniki", icon: BookOpen, isScrollLink: true },
    { name: "Dokumentacja API", href: "/#dokumentacja-api", icon: FileText, isScrollLink: true },
    { name: "O nas", href: "/#o-nas", icon: Users, isScrollLink: true },
    { name: "Kontakt", href: "/kontakt", icon: Phone, isScrollLink: false },
  ];
  const servicesDropdown = [
    { name: "Analiza dokumentów", href: "/analiza-dokumentow", icon: FileText, isScrollLink: false },
    { name: "Pisma prawne", href: "/pisma-prawne", icon: Scale, isScrollLink: false },
    { name: "Konsultacje", href: "/konsultacje", icon: Phone, isScrollLink: false },
    { name: "Reprezentacja", href: "/reprezentacja", icon: Gavel, isScrollLink: false },
  ];
  const informationDropdown = [
    { name: "Regulamin", href: "/regulamin", icon: BookOpen, isScrollLink: false },
    { name: "Polityka prywatności", href: "/polityka-prywatnosci", icon: Shield, isScrollLink: false },
    { name: "RODO", href: "/rodo", icon: Shield, isScrollLink: false },
    { name: "FAQ", href: "/faq", icon: Info, isScrollLink: false },
  ];
  const getPanelLink = () => {
    if (role === "admin") return "/admin";
    if (role === "client") return "/panel-klienta";
    if (role === "operator") return "/panel-operatora";
    return null;
  };
  const router = useRouter();
  const panelLink = getPanelLink();
  const isHomePage = pathname === "/";

  // Poprawiona funkcja scrollToSection
  const scrollToSection = (id: string) => {
    const cleanId = id.replace(/.*#/, ""); // wyciąga tylko "funkcje"
    const element = document.getElementById(cleanId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm transition-all duration-300 ${isScrolled ? "shadow-md" : ""}`}> 
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          {!isHomePage && (
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-gray-600 hover:text-blue-600">
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">Go back</span>
            </Button>
          )}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-blue-700">
            <Scale className="h-6 w-6" />
            LegalNexus
          </Link>
        </div>
        {/* Desktop Navigation */}
        {/* USUWAM <nav className="hidden lg:flex items-center gap-6"> ... </nav> (całe menu desktopowe) */}
        {/* Auth/User Actions */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt={user?.name || "User"} />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {panelLink && (
                  <DropdownMenuItem asChild>
                    <Link href={panelLink} className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Mój Panel ({role === "admin" ? "Admin" : role === "client" ? "Klient" : "Operator"})
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={mockLogout} className="flex items-center cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Wyloguj
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/logowanie">
                  <LogIn className="mr-2 h-4 w-4" />
                  Logowanie
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/rejestracja">
                  <User className="mr-2 h-4 w-4" />
                  Rejestracja
                </Link>
              </Button>
            </div>
          )}
          {/* Napis Menu widoczny wszędzie */}
          <span className="inline text-gray-500 font-medium text-base select-none ml-2">Menu</span>
          {/* Hamburger - mobile only */}
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Otwórz menu</span>
          </Button>
        </div>
      </div>
      {/* Mobile Menu (Sheet) */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-full max-w-xs sm:max-w-sm p-0">
          <div className="flex flex-col gap-2 p-4">
            {navItems.map((item) => (
              item.isScrollLink ? (
                <Button key={item.name} variant="ghost" className="flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-blue-600" onClick={() => { setMobileMenuOpen(false); scrollToSection(item.href); }}>
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Button>
              ) : (
                <Link key={item.name} href={item.href} className="flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            ))}
            <div className="mt-2">
              <div className="font-semibold text-gray-500 mb-1">Usługi</div>
              {servicesDropdown.map((item) => (
                <Link key={item.name} href={item.href} className="flex items-center gap-3 text-base text-gray-700 hover:text-blue-600 pl-4" onClick={() => setMobileMenuOpen(false)}>
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="mt-2">
              <div className="font-semibold text-gray-500 mb-1">Informacje</div>
              {informationDropdown.map((item) => (
                <Link key={item.name} href={item.href} className="flex items-center gap-3 text-base text-gray-700 hover:text-blue-600 pl-4" onClick={() => setMobileMenuOpen(false)}>
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              {isAuthenticated ? (
                <Button variant="outline" size="sm" className="w-full" onClick={() => { mockLogout(); setMobileMenuOpen(false); }}>
                  <LogOut className="mr-2 h-4 w-4" /> Wyloguj
                </Button>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild className="w-full" onClick={() => setMobileMenuOpen(false)}>
                    <Link href="/logowanie">
                      <LogIn className="mr-2 h-4 w-4" /> Logowanie
                    </Link>
                  </Button>
                  <Button size="sm" asChild className="w-full" onClick={() => setMobileMenuOpen(false)}>
                    <Link href="/rejestracja">
                      <User className="mr-2 h-4 w-4" /> Rejestracja
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
