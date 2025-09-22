"use client"
import { useState } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, LogIn, UserPlus, Mail, Lock, User } from "lucide-react"

const UzytkownicyPage = () => {
  const router = useRouter()

  // Rejestracja
  const [regUsername, setRegUsername] = useState("")
  const [regEmail, setRegEmail] = useState("")
  const [regPassword, setRegPassword] = useState("")
  const [regLoading, setRegLoading] = useState(false)
  const [regMessage, setRegMessage] = useState("")

  // Logowanie
  const [logEmail, setLogEmail] = useState("")
  const [logPassword, setLogPassword] = useState("")
  const [logLoading, setLogLoading] = useState(false)
  const [logMessage, setLogMessage] = useState("")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegLoading(true)
    setRegMessage("")
    const res = await fetch("/api/uzytkownicy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: regUsername,
        email: regEmail,
        password: regPassword,
        register: true,
      }),
    })
    setRegLoading(false)
    if (res.ok) {
      setRegMessage("Rejestracja udana! Możesz się teraz zalogować.")
      setRegUsername("")
      setRegEmail("")
      setRegPassword("")
    } else {
      setRegMessage("Błąd rejestracji. Spróbuj ponownie.")
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLogLoading(true)
    setLogMessage("")
    const res = await fetch("/api/uzytkownicy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: logEmail,
        password: logPassword,
        login: true,
      }),
    })
    setLogLoading(false)
    if (res.ok) {
      const data = await res.json()
      localStorage.setItem("userId", data.userId)
      setLogMessage("Logowanie udane!")
      setLogEmail("")
      setLogPassword("")
      router.push("/ogloszenia")
    } else {
      setLogMessage("Błędne dane logowania. Spróbuj ponownie.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Techni Zlecenie</CardTitle>
            <CardDescription>Zaloguj się lub utwórz nowe konto</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Logowanie</TabsTrigger>
                <TabsTrigger value="register">Rejestracja</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="twoj@email.com"
                        value={logEmail}
                        onChange={(e) => setLogEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Hasło</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={logPassword}
                        onChange={(e) => setLogPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={logLoading} className="w-full">
                    {logLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logowanie...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Zaloguj się
                      </>
                    )}
                  </Button>
                </form>

                {logMessage && (
                  <Alert variant={logMessage.includes("udane") ? "default" : "destructive"}>
                    <AlertDescription>{logMessage}</AlertDescription>
                  </Alert>
                )}
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-username">Nazwa użytkownika</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-username"
                        placeholder="Twoja nazwa"
                        value={regUsername}
                        onChange={(e) => setRegUsername(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="twoj@email.com"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Hasło</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={regLoading} className="w-full">
                    {regLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Rejestracja...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Zarejestruj się
                      </>
                    )}
                  </Button>
                </form>

                {regMessage && (
                  <Alert variant={regMessage.includes("udana") ? "default" : "destructive"}>
                    <AlertDescription>{regMessage}</AlertDescription>
                  </Alert>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default UzytkownicyPage
