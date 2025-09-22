"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { LogOut, Plus, User, Loader2 } from "lucide-react"

const OgloszeniaPage = () => {
  const [ogloszenia, setOgloszenia] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    setLoggedIn(!!userId)

    // Fetch username for logged-in user
    if (userId) {
      fetch(`/api/uzytkownicy?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUsername(data.username || "")
        })
    }

    fetch("/api/ogloszenia")
      .then((res) => res.json())
      .then((data) => {
        setOgloszenia(data.data || [])
        setLoading(false)
      })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userId")
    setLoggedIn(false)
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Dostęp Ograniczony</CardTitle>
            <CardDescription>Musisz być zalogowany, żeby wyświetlić ogłoszenia.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/ogloszenia/uzytkownicy">
              <Button size="lg" className="w-full">
                <User className="mr-2 h-4 w-4" />
                Zaloguj się
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Ogłoszenia</h1>
              <p className="text-muted-foreground">Witaj, {username}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link href="/ogloszenia/panelUzytkownika">
              <Button variant="outline">
                <User className="mr-2 h-4 w-4" />
                Panel Użytkownika
              </Button>
            </Link>
            <Link href="/ogloszenia/dodajOgloszenie">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Dodaj Ogłoszenie
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Wyloguj
            </Button>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Lista Ogłoszeń</h2>
            <Badge variant="secondary">{ogloszenia.length} ogłoszeń</Badge>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Ładowanie ogłoszeń...</span>
            </div>
          ) : ogloszenia.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">Brak dostępnych ogłoszeń</p>
                <Link href="/ogloszenia/dodajOgloszenie">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Dodaj pierwsze ogłoszenie
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {ogloszenia.map((ogloszenie) => (
                <Card key={ogloszenie._id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <Link href={`/ogloszenia/${ogloszenie._id}`} className="block group">
                          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                            {ogloszenie.tytul}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {(ogloszenie.username || "N").charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span>{ogloszenie.username || "Nieznany użytkownik"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary mb-1">{ogloszenie.cena} zł</div>
                        <Link href={`/ogloszenia/${ogloszenie._id}`}>
                          <Button size="sm">Zobacz szczegóły</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OgloszeniaPage
