import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, FileText, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Platforma Ogłoszeń Technicznych
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">Techni Zlecenie</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Nowoczesna platforma łącząca specjalistów technicznych z klientami. Znajdź idealne zlecenie lub najlepszego
            wykonawcę.
          </p>

          <Link href="/ogloszenia">
            <Button size="lg" className="text-lg px-8 py-6">
              Przeglądaj Ogłoszenia
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Zweryfikowani Specjaliści</CardTitle>
              <CardDescription>Pracuj z najlepszymi specjalistami technicznymi w branży</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Łatwe Zarządzanie</CardTitle>
              <CardDescription>Intuicyjny panel do zarządzania ogłoszeniami i zleceniami</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Bezpieczne Płatności</CardTitle>
              <CardDescription>Gwarancja bezpieczeństwa transakcji i ochrona danych</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="bg-primary text-primary-foreground">
          <CardContent className="py-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-primary-foreground/80">Aktywnych Specjalistów</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">1200+</div>
                <div className="text-primary-foreground/80">Zrealizowanych Zleceń</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-primary-foreground/80">Zadowolonych Klientów</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
