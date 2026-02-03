import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, MapPin, Calendar, User } from "lucide-react"

const qualityEngineers = [
  {
    name: "م/ محمود اسماعيل",
    phone: "01113121549",
    regions: [
      { name: "الأقاليم", days: "السبت - الثلاثاء" },
      { name: "القاهرة الجديدة", days: "الأحد - الأربعاء" },
      { name: "العاصمة", days: "الإثنين - الخميس" },
    ],
  },
  {
    name: "م/ شادي",
    phone: "01156704637",
    regions: [
      { name: "منطقة القاهرة وسط", days: "السبت - الثلاثاء" },
      { name: "منطقة أكتوبر", days: "الأحد - الأربعاء" },
      { name: "منطقة التجمع", days: "الإثنين - الخميس" },
    ],
  },
]

const scheduleTable = [
  { region: "الأقاليم", days: "السبت - الثلاثاء", engineer: "م/ محمود اسماعيل" },
  { region: "القاهرة الجديدة", days: "الأحد - الأربعاء", engineer: "م/ محمود اسماعيل" },
  { region: "العاصمة", days: "الإثنين - الخميس", engineer: "م/ محمود اسماعيل" },
  { region: "القاهرة وسط", days: "السبت - الثلاثاء", engineer: "م/ شادي" },
  { region: "أكتوبر", days: "الأحد - الأربعاء", engineer: "م/ شادي" },
  { region: "التجمع", days: "الإثنين - الخميس", engineer: "م/ شادي" },
]

export function QualitySchedule() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Engineers Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {qualityEngineers.map((engineer, index) => (
            <Card key={index} className="bg-card border-border p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{engineer.name}</h3>
                    <p className="text-sm text-muted-foreground">مهندس الجودة</p>
                  </div>
                </div>
                <a
                  href={`tel:${engineer.phone}`}
                  className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-2 rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">{engineer.phone}</span>
                </a>
              </div>

              <div className="space-y-3">
                {engineer.regions.map((region, i) => (
                  <div key={i} className="bg-secondary/50 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-foreground">{region.name}</span>
                    </div>
                    <Badge className="bg-muted text-muted-foreground">
                      <Calendar className="w-3 h-3 ml-1" />
                      {region.days}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Full Schedule Table */}
        <Card className="bg-card border-border p-6">
          <h2 className="text-xl font-bold text-primary mb-6">جدول مواعيد استلام الجودة</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">المنطقة</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">أيام الزيارات</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">مهندس الجودة</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">اتصال</th>
                </tr>
              </thead>
              <tbody>
                {scheduleTable.map((row, i) => {
                  const engineer = qualityEngineers.find((e) => e.name === row.engineer)
                  return (
                    <tr key={i} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="py-3 px-4 text-foreground">{row.region}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="border-primary/50 text-primary">
                          {row.days}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-foreground">{row.engineer}</td>
                      <td className="py-3 px-4">
                        <a
                          href={`tel:${engineer?.phone}`}
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          {engineer?.phone}
                        </a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </section>
  )
}
