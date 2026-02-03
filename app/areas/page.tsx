import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { MapPin, Map } from "lucide-react"

const areas = [
  {
    id: 1,
    name: "المنطقة الأولى",
    description: "وصف تفاصيل المنطقة الأولى",
    blocks: ["1A", "1B", "1C", "1D"],
  },
  {
    id: 2,
    name: "المنطقة الثانية",
    description: "وصف تفاصيل المنطقة الثانية",
    blocks: ["2A", "2B", "2C", "2D"],
  },
  {
    id: 3,
    name: "المنطقة الثالثة",
    description: "وصف تفاصيل المنطقة الثالثة",
    blocks: ["3A", "3B", "3C", "3D"],
  },
]

export default function AreasPage() {
  return (
    <main className="min-h-screen bg-background">
      <PageHeader title="المناطق" subtitle="معلومات وتفاصيل المناطق" icon={MapPin} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <Card key={area.id} className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20">
                  <Map className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2">{area.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{area.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {area.blocks.map((block) => (
                      <span
                        key={block}
                        className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                      >
                        {block}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
