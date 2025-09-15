import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("Zlecenia");

  if (req.method === "POST") {
    try {
      const { tytul, cena, opis, userId } = req.body;
      if (!tytul || !cena || !opis || !userId) {
        res.status(400).json({ error: "Brak wymaganych pól" });
        return;
      }
      const result = await db
        .collection("ogloszenia")
        .insertOne({ tytul, cena, opis, userId });
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
        .find(
          {},
          { projection: { _id: 1, tytul: 1, cena: 1, opis: 1, userId: 1 } }
        )
        .toArray();
      // Pobierz username dla każdego ogloszenia
      const users = db.collection("uzytkownicy");
      const userIds = ogloszenia
        .map((o) => o.userId)
        .filter(Boolean)
        .map((id) => (typeof id === "string" ? new ObjectId(id) : id));
      let userMap = {};
      if (userIds.length) {
        const foundUsers = await users
          .find({ _id: { $in: userIds } })
          .toArray();
        foundUsers.forEach((u) => {
          userMap[u._id.toString()] = u.username;
        });
      }
      const ogloszeniaWithUser = ogloszenia.map((o) => ({
        ...o,
        username: userMap[o.userId?.toString()] || "",
      }));
      res.status(200).json({ data: ogloszeniaWithUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
