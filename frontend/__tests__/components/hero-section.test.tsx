import { render, screen } from "@testing-library/react";
import { HeroSection } from "@/components/hero-section";
import { getTranslation } from "@/lib/i18n";

describe("HeroSection", () => {
  const mockTranslations = getTranslation("pl");

  it("renders hero section with correct content", () => {
    render(<HeroSection t={mockTranslations} locale="pl" />);

    expect(screen.getByText("NOWA GENERACJA")).toBeInTheDocument();
    expect(
      screen.getByText("Profesjonalny System API dla Kancelarii Prawnych"),
    ).toBeInTheDocument();
    expect(screen.getByText("Poznaj API")).toBeInTheDocument();
    expect(screen.getByText("Obejrzyj Demo")).toBeInTheDocument();
  });

  it("displays API console example", () => {
    render(<HeroSection t={mockTranslations} locale="pl" />);

    expect(screen.getByText("API Console")).toBeInTheDocument();
    expect(
      screen.getByText(/GET \/api\/v1\/law-firms\/123/),
    ).toBeInTheDocument();
  });
});
