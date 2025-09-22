"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowLeft, Trash2, Eye, Plus, Loader2, DollarSign } from "lucide-react"

const PanelUzytkownika = () => {
  const [ogloszenia, setOgloszenia] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    if (!userId) return

    // Fetch username
    fetch(`/api/uzytkownicy?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setUsername(data.username || ""))

    // Fetch ogloszenia for this user
    fetch(`/api/ogloszenia?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setOgloszenia(data.data || [])
        setLoading(false)
      })
  }, [])

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    const res = await fetch(`/api/ogloszenia?id=${id}`, {
      method: "DELETE",
    })
    setDeletingId(null)
    if (res.ok) {
      setOgloszenia(ogloszenia.filter((o) => o._id !== id))
    } else {
      alert("Błąd usuwania ogłoszenia")
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

        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-2xl">{username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">Panel Użytkownika</CardTitle>
                  <CardDescription className="text-lg">
                    Zalogowany jako: <strong>{username}</strong>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Moje ogłoszenia</h2>
              <p className="text-muted-foreground">Zarządzaj swoimi zleceniami</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">{ogloszenia.length} ogłoszeń</Badge>
              <Link href="/ogloszenia/dodajOgloszenie">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Dodaj ogłoszenie
                </Button>
              </Link>
            </div>
          </div>

          <Separator className="mb-6" />

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Ładowanie ogłoszeń...</span>
            </div>
          ) : ogloszenia.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">Nie masz jeszcze żadnych ogłoszeń</p>
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
                        <h3 className="text-lg font-semibold text-foreground mb-2">{ogloszenie.tytul}</h3>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{ogloszenie.opis}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-primary">
                            <DollarSign className="mr-1 h-3 w-3" />
                            {ogloszenie.cena} zł
                          </Badge>
                          <Badge variant="secondary">Aktywne</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/ogloszenia/${ogloszenie._id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            Zobacz
                          </Button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" disabled={deletingId === ogloszenie._id}>
                              {deletingId === ogloszenie._id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Usuń ogłoszenie</AlertDialogTitle>
                              <AlertDialogDescription>
                                Czy na pewno chcesz usunąć ogłoszenie "{ogloszenie.tytul}"? Ta akcja jest nieodwracalna.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Anuluj</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(ogloszenie._id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Usuń
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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

export default PanelUzytkownika
