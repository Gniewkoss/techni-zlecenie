import Link from "next/link";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import React from "react";
import NapiszWiadomoscButton from "./NapiszWiadomoscButton";

interface Ogloszenie {
  _id: string;
  tytul: string;
  cena: number;
  opis: string;
  userId?: string;
}

type Props = {
  params: { id: string };
};

export default async function OgloszeniePage({ params }: Props) {
  const client: MongoClient = await clientPromise;
  const db = client.db("Zlecenia");
  const ogloszenie: Ogloszenie | null = await db
    .collection("ogloszenia")
    .findOne({ _id: new ObjectId(params.id) });

  let username = "(nieznany)";
  if (ogloszenie && ogloszenie.userId) {
    const user = await db.collection("uzytkownicy").findOne({ _id: new ObjectId(ogloszenie.userId) });
    if (user && user.username) username = user.username;
  }

  if (!ogloszenie) {
    return (
      <div>
        <h1>Ogloszenie Page</h1>
        <p>Nie znaleziono ogłoszenia o podanym ID.</p>
        <Link href="/ogloszenia">Powrót do listy ogłoszeń</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Ogloszenie Page</h1>
      <h2>{ogloszenie.tytul}</h2>
      <p>{ogloszenie.opis}</p>
      <p>Cena: {ogloszenie.cena} zł</p>
      <p>Autor: {username}</p>
      <NapiszWiadomoscButton ogloszenieUserId={ogloszenie.userId ? ogloszenie.userId.toString() : ""} ogloszenieId={ogloszenie._id} />
      <Link href="/ogloszenia">Powrót do listy ogłoszeń</Link>
    </div>
  );
}