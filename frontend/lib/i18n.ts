export const defaultLocale = "pl" as const;
export const locales = ["pl", "en"] as const;

export type Locale = (typeof locales)[number];

export const translations = {
  pl: {
    nav: {
      features: "Funkcje",
      apiDemo: "Demo API",
      aiAssistant: "Asystent AI",
      roadmap: "Mapa Rozwoju",
      getStarted: "Rozpocznij",
    },
    hero: {
      badge: "NOWA GENERACJA",
      title: "Profesjonalny System API dla Kancelarii Prawnych",
      description:
        "Zaawansowane rozwiązanie API z architekturą Domain-Driven Design, RESTful oraz profesjonalnymi SDK dla wszystkich popularnych języków programowania.",
      exploreApi: "Poznaj API",
      watchDemo: "Obejrzyj Demo",
    },
    stats: {
      lawFirms: "Kancelarii korzysta",
      lawyers: "Prawników korzysta",
      uptime: "Dostępność API",
      support: "Wsparcie Techniczne",
    },
    features: {
      title: "Zaawansowane Funkcje",
      subtitle:
        "System stworzony z myślą o profesjonalnych kancelariach prawnych, oferujący funkcjonalność i niezawodność klasy enterprise.",
      domainDriven: {
        title: "Architektura Domain-Driven",
        description:
          "Architektura oparta o domenę biznesową z agregatami, encjami i obiektami wartości dla precyzyjnego modelowania danych prawnych.",
      },
      search: {
        title: "Wyszukiwanie Pełnotekstowe",
        description:
          "Potężna integracja z Elasticsearch z filtrowaniem, paginacją i zaawansowanymi możliwościami zapytań.",
      },
      security: {
        title: "Bezpieczeństwo Klasy Enterprise",
        description:
          "OAuth 2.0, tokeny JWT, szyfrowanie danych i kompleksowy audyt bezpieczeństwa.",
      },
    },
    ai: {
      title: "Asystent AI LexiCore RAG",
      subtitle:
        "Pierwsze w Polsce wdrożenie technologii RAG (Retrieval-Augmented Generation) dedykowane dla kancelarii prawnych.",
      askQuestion: "Zadaj pytanie prawne...",
      send: "Wyślij",
    },
  },
  en: {
    nav: {
      features: "Features",
      apiDemo: "API Demo",
      aiAssistant: "AI Assistant",
      roadmap: "Roadmap",
      getStarted: "Get Started",
    },
    hero: {
      badge: "NEW GENERATION",
      title: "Professional API System for Law Firms",
      description:
        "Advanced API solution with Domain-Driven Design architecture, RESTful and professional SDKs for all popular programming languages.",
      exploreApi: "Explore API",
      watchDemo: "Watch Demo",
    },
    stats: {
      lawFirms: "Law Firms Using",
      lawyers: "Lawyers Using",
      uptime: "API Uptime",
      support: "Technical Support",
    },
    features: {
      title: "Advanced Features",
      subtitle:
        "System designed for professional law firms, offering enterprise-class functionality and reliability.",
      domainDriven: {
        title: "Domain-Driven Architecture",
        description:
          "Business domain-based architecture with aggregates, entities and value objects for precise legal data modeling.",
      },
      search: {
        title: "Full-Text Search",
        description:
          "Powerful Elasticsearch integration with filtering, pagination and advanced query capabilities.",
      },
      security: {
        title: "Enterprise-Class Security",
        description:
          "OAuth 2.0, JWT tokens, data encryption and comprehensive security audit.",
      },
    },
    ai: {
      title: "LexiCore RAG AI Assistant",
      subtitle:
        "First implementation of RAG (Retrieval-Augmented Generation) technology in Poland dedicated to law firms.",
      askQuestion: "Ask a legal question...",
      send: "Send",
    },
  },
} as const;

export function getTranslation(locale: Locale) {
  return translations[locale] || translations[defaultLocale];
}
