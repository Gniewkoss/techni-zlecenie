import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("Zlecenia");

  if (req.method === "POST") {
    try {
      const { tytul, cena, opis } = req.body;
      if (!tytul || !cena || !opis) {
        res.status(400).json({ error: "Brak wymaganych pól" });
        return;
      }
      const result = await db
        .collection("ogloszenia")
        .insertOne({ tytul, cena, opis });
      res.status(201).json({ success: true, id: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    return;
  }

  if (req.method === "GET") {
    try {
      const ogloszenia = await db
        .collection("ogloszenia")
        .find({}, { projection: { _id: 1, tytul: 1, cena: 1, opis: 1 } })
        .toArray();
      res.status(200).json({ data: ogloszenia });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
