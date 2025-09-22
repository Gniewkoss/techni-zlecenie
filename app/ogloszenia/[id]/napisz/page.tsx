"use client"
import { useState } from "react"
import type React from "react"

import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Send, Loader2 } from "lucide-react"

const NapiszPage = () => {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const params = useParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Tutaj można dodać logikę wysyłania wiadomości do API
    // Na razie symulujemy wysłanie
    setTimeout(() => {
      setLoading(false)
      alert("Wiadomość została wysłana!")
      router.back()
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Powrót
          </Button>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Napisz wiadomość</CardTitle>
              <CardDescription>Skontaktuj się z autorem ogłoszenia</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="message">Treść wiadomości</Label>
                  <Textarea
                    id="message"
                    placeholder="Napisz swoją wiadomość tutaj..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={8}
                    className="resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button type="submit" disabled={loading || !message.trim()} className="flex-1">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Wysyłanie...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Wyślij wiadomość
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
                    Anuluj
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default NapiszPage
