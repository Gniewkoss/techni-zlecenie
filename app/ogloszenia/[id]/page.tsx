import Link from "next/link";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

interface Ogloszenie {
  _id: string;
  tytul: string;
  cena: number;
  opis: string;
}

type Props = {
  params: { id: string };
};

export default async function OgloszeniePage({ params }: Props) {
  const client: MongoClient = await clientPromise;
  const db = client.db("Zlecenia");
  const ogloszenie = await db
    .collection("ogloszenia")
    .findOne({ _id: new ObjectId(params.id) });

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
      <Link href={`/ogloszenia/${ogloszenie._id}/napisz`}>Napisz wiadomość</Link>
      <Link href="/ogloszenia">Powrót do listy ogłoszeń</Link>

    </div>
  );
}