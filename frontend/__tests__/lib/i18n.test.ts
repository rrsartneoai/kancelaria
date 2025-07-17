import { getTranslation, locales, defaultLocale } from "@/lib/i18n";

describe("i18n", () => {
  it("returns Polish translations for pl locale", () => {
    const t = getTranslation("pl");
    expect(t.hero.title).toBe(
      "Profesjonalny System API dla Kancelarii Prawnych",
    );
    expect(t.nav.features).toBe("Funkcje");
  });

  it("returns English translations for en locale", () => {
    const t = getTranslation("en");
    expect(t.hero.title).toBe("Professional API System for Law Firms");
    expect(t.nav.features).toBe("Features");
  });

  it("falls back to default locale for invalid locale", () => {
    // @ts-ignore - testing invalid locale
    const t = getTranslation("invalid");
    expect(t.hero.title).toBe(
      "Profesjonalny System API dla Kancelarii Prawnych",
    );
  });

  it("has correct default locale", () => {
    expect(defaultLocale).toBe("pl");
  });

  it("includes both supported locales", () => {
    expect(locales).toContain("pl");
    expect(locales).toContain("en");
  });
});
