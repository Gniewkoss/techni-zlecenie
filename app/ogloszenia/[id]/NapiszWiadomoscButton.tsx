"use client"
import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export default function NapiszWiadomoscButton({
  ogloszenieUserId,
  ogloszenieId,
}: { ogloszenieUserId?: string; ogloszenieId: string }) {
  const [show, setShow] = React.useState(false)
  React.useEffect(() => {
    const loggedUserId = localStorage.getItem("userId")
    setShow(Boolean(loggedUserId && loggedUserId !== ogloszenieUserId))
  }, [ogloszenieUserId])

  if (!show) return null

  return (
    <Link href={`/ogloszenia/${ogloszenieId}/napisz`} className="w-full">
      <Button className="w-full">
        <MessageCircle className="mr-2 h-4 w-4" />
        Napisz wiadomość
      </Button>
    </Link>
  )
}
