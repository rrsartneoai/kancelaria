"use client";

import Link from "next/link";
import {
  Scale,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Analiza dokumentów", href: "/analiza-dokumentow" },
    { name: "Pisma prawne", href: "/pisma-prawne" },
    { name: "Konsultacje", href: "/konsultacje" },
    { name: "Reprezentacja", href: "/reprezentacja" },
  ];

  const information = [
    { name: "Regulamin", href: "/regulamin" },
    { name: "Polityka prywatności", href: "/polityka-prywatnosci" },
    { name: "RODO", href: "/rodo" },
    { name: "FAQ", href: "/faq" },
  ];

  const companyLinks = [
    { name: "O nas", href: "/o-nas" },
    { name: "Jak to działa", href: "/jak-to-dziala" },
    { name: "Cennik", href: "/cennik" },
    { name: "Blog", href: "/blog" },
    { name: "Kontakt", href: "/kontakt" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/legalnexus",
      label: "Facebook",
    },
    { icon: Twitter, href: "https://twitter.com/legalnexus", label: "Twitter" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/legalnexus",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/legalnexus",
      label: "Instagram",
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl text-blue-400 mb-4"
            >
              <Scale className="h-7 w-7" />
              LegalNexus
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Profesjonalna pomoc prawna online. Szybko, skutecznie i
              bezpiecznie.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Usługi (Services) */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Usługi</h3>
            <ul className="space-y-2">
              {services.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informacje (Information) */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Informacje
            </h3>
            <ul className="space-y-2">
              {information.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Firma (Company) */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Firma</h3>
            <ul className="space-y-2">
              {companyLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt (Contact) */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Kontakt</h3>
            <address className="not-italic space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>ul. Długa 46/47, 80-831 Gdańsk</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <a
                  href="tel:+48581234567"
                  className="hover:text-blue-400 transition-colors"
                >
                  +48 58 123 45 67
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <a
                  href="mailto:kontakt@legalnexus.pl"
                  className="hover:text-blue-400 transition-colors"
                >
                  kontakt@legalnexus.pl
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {currentYear} LegalNexus. Wszelkie prawa zastrzeżone.
        </div>
      </div>
    </footer>
  );
}
