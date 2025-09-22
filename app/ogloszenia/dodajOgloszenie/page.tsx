"use client"
import { useState } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Loader2 } from "lucide-react"

const DodajOgloszeniePage = () => {
  const [tytul, setTytul] = useState("")
  const [cena, setCena] = useState("")
  const [opis, setOpis] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const userId = localStorage.getItem("userId")
    const res = await fetch("/api/ogloszenia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tytul, cena: Number(cena), opis, userId }),
    })
    setLoading(false)
    if (res.ok) {
      router.push("/ogloszenia")
    } else {
      alert("Błąd dodawania ogłoszenia")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/ogloszenia">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Powrót do ogłoszeń
            </Button>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Dodaj nowe ogłoszenie</CardTitle>
              <CardDescription>Wypełnij formularz, aby dodać nowe zlecenie techniczne</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="tytul">Tytuł zlecenia</Label>
                  <Input
                    id="tytul"
                    placeholder="np. Naprawa komputera, Instalacja systemu..."
                    value={tytul}
                    onChange={(e) => setTytul(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cena">Budżet (zł)</Label>
                  <Input
                    id="cena"
                    type="number"
                    placeholder="0"
                    min="0"
                    step="0.01"
                    value={cena}
                    onChange={(e) => setCena(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="opis">Szczegółowy opis</Label>
                  <Textarea
                    id="opis"
                    placeholder="Opisz szczegółowo czego potrzebujesz, jakie są wymagania, terminy itp."
                    value={opis}
                    onChange={(e) => setOpis(e.target.value)}
                    required
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Dodawanie...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Dodaj ogłoszenie
                      </>
                    )}
                  </Button>
                  <Link href="/ogloszenia" className="flex-1">
                    <Button type="button" variant="outline" className="w-full bg-transparent">
                      Anuluj
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DodajOgloszeniePage
