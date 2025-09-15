import clientPromise from "../../lib/mongodb";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query;
    if (!userId) {
      res.status(400).json({ error: "Brak userId" });
      return;
    }
    try {
      const client = await clientPromise;
      const db = client.db("Zlecenia");
      const user = await db
        .collection("uzytkownicy")
        .findOne({ _id: new ObjectId(userId) });
      if (!user) {
        res.status(404).json({ error: "Nie znaleziono użytkownika" });
        return;
      }
      res.status(200).json({ username: user.username });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { username, email, password, register, login } = req.body;
  try {
    const client = await clientPromise;
    const db = client.db("Zlecenia");
    const users = db.collection("uzytkownicy");

    if (register) {
      if (!username || !email || !password) {
        res.status(400).json({ error: "Brak wymaganych pól" });
        return;
      }
      const existing = await users.findOne({ email });
      if (existing) {
        res.status(409).json({ error: "Użytkownik o tym emailu już istnieje" });
        return;
      }
      const hashed = await bcrypt.hash(password, 10);
      const result = await users.insertOne({
        username,
        email,
        password: hashed,
      });
      res.status(201).json({ success: true, userId: result.insertedId });
      return;
    }

    if (login) {
      if (!email || !password) {
        res.status(400).json({ error: "Brak wymaganych pól" });
        return;
      }
      const existing = await users.findOne({ email });
      if (!existing) {
        res.status(404).json({ error: "Nie znaleziono użytkownika" });
        return;
      }
      const match = await bcrypt.compare(password, existing.password);
      if (match) {
        res.status(200).json({ success: true, userId: existing._id });
      } else {
        res.status(401).json({ error: "Nieprawidłowe hasło" });
      }
      return;
    }

    res.status(400).json({ error: "Nieprawidłowe żądanie" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
