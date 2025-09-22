import Link from "next/link"
import type { MongoClient } from "mongodb"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"
import NapiszWiadomoscButton from "./NapiszWiadomoscButton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, DollarSign } from "lucide-react"

interface Ogloszenie {
  _id: string
  tytul: string
  cena: number
  opis: string
  userId?: string
}

type Props = {
  params: { id: string }
}

export default async function OgloszeniePage({ params }: Props) {
  const client: MongoClient = await clientPromise
  const db = client.db("Zlecenia")
  const ogloszenie: Ogloszenie | null = await db.collection("ogloszenia").findOne({ _id: new ObjectId(params.id) })

  let username = "(nieznany)"
  if (ogloszenie && ogloszenie.userId) {
    const user = await db.collection("uzytkownicy").findOne({ _id: new ObjectId(ogloszenie.userId) })
    if (user && user.username) username = user.username
  }

  if (!ogloszenie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Nie znaleziono</CardTitle>
            <CardDescription>Nie znaleziono ogłoszenia o podanym ID.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/ogloszenia">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Powrót do listy ogłoszeń
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
        <div className="mb-6">
          <Link href="/ogloszenia">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Powrót do listy ogłoszeń
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{ogloszenie.tytul}</CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{username.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span>Autor: {username}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    <DollarSign className="mr-1 h-4 w-4" />
                    {ogloszenie.cena} zł
                  </Badge>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Opis zlecenia</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{ogloszenie.opis}</p>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kontakt z autorem</CardTitle>
                <CardDescription>Skontaktuj się z autorem ogłoszenia</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Avatar>
                      <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{username}</p>
                      <p className="text-sm text-muted-foreground">Autor ogłoszenia</p>
                    </div>
                  </div>

                  <NapiszWiadomoscButton
                    ogloszenieUserId={ogloszenie.userId ? ogloszenie.userId.toString() : ""}
                    ogloszenieId={ogloszenie._id}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Szczegóły zlecenia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Budżet:</span>
                    <span className="font-medium">{ogloszenie.cena} zł</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="outline">Aktywne</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
