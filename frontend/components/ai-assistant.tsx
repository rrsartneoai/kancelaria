"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock, Lock, Send, Loader2 } from "lucide-react";
import { useChat } from "ai/react";

interface AIAssistantProps {
  t: unknown;
  locale: "pl" | "en";
}

export function AIAssistant({ t, locale }: AIAssistantProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      body: { locale },
    });

  const features = [
    {
      icon: Brain,
      title: "AI + Twoja Wiedza",
      description:
        "Łączy moc AI z Twoją unikalną bazą wiedzy prawnej, by udzielać precyzyjnych odpowiedzi opartych o faktyczne dokumenty.",
    },
    {
      icon: Clock,
      title: "Oszczędność 80% Czasu",
      description:
        "Dramatycznie skraca czas poświęcany na research prawny i analizę dokumentów.",
    },
    {
      icon: Lock,
      title: "Pełna Poufność",
      description:
        "Zachowuje tajemnicę adwokacką/radcowską dzięki rygorystycznym środkom bezpieczeństwa danych.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            PRZEDSTAWIAMY
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t.ai.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.ai.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <feature.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Wypróbuj Demo LexiCore</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Zadaj pytanie prawne, aby zobaczyć, jak działa LexiCore RAG
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-white border"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder={t.ai.askQuestion}
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
