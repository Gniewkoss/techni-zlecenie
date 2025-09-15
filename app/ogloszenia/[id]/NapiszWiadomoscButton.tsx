"use client";
import React from "react";
import Link from "next/link";

export default function NapiszWiadomoscButton({ ogloszenieUserId, ogloszenieId }: { ogloszenieUserId?: string, ogloszenieId: string }) {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const loggedUserId = localStorage.getItem("userId");
    setShow(Boolean(loggedUserId && loggedUserId !== ogloszenieUserId));
  }, [ogloszenieUserId]);
  if (!show) return null;
  return (
    <Link href={`/ogloszenia/${ogloszenieId}/napisz`}>
      <button style={{marginTop: '1rem'}}>Napisz wiadomość</button>
    </Link>
  );
}
