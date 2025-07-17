import { render, screen } from "@testing-library/react";
import { AIAssistant } from "@/components/ai-assistant";
import { getTranslation } from "@/lib/i18n";
import jest from "jest";

// Mock the useChat hook
jest.mock("ai/react", () => ({
  useChat: () => ({
    messages: [],
    input: "",
    handleInputChange: jest.fn(),
    handleSubmit: jest.fn(),
    isLoading: false,
  }),
}));

describe("AIAssistant", () => {
  const mockTranslations = getTranslation("pl");

  it("renders AI assistant section", () => {
    render(<AIAssistant t={mockTranslations} locale="pl" />);

    expect(screen.getByText("PRZEDSTAWIAMY")).toBeInTheDocument();
    expect(screen.getByText("Asystent AI LexiCore RAG")).toBeInTheDocument();
    expect(screen.getByText("AI + Twoja Wiedza")).toBeInTheDocument();
  });

  it("displays chat interface", () => {
    render(<AIAssistant t={mockTranslations} locale="pl" />);

    expect(screen.getByText("Wypróbuj Demo LexiCore")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Zadaj pytanie prawne..."),
    ).toBeInTheDocument();
  });

  it("shows features cards", () => {
    render(<AIAssistant t={mockTranslations} locale="pl" />);

    expect(screen.getByText("Oszczędność 80% Czasu")).toBeInTheDocument();
    expect(screen.getByText("Pełna Poufność")).toBeInTheDocument();
  });
});
