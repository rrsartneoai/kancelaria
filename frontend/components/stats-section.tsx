"use client";

import { Card, CardContent } from "@/components/ui/card";

interface StatsSectionProps {
  t: unknown;
}

export function StatsSection({ t }: StatsSectionProps) {
  const stats = [
    { value: "500+", label: t.stats.lawFirms },
    { value: "10K+", label: t.stats.lawyers },
    { value: "99.9%", label: t.stats.uptime },
    { value: "24/7", label: t.stats.support },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
