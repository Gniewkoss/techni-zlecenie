import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const client = await clientPromise;
    const db = client.db("Zlecenia");
    const ogloszenia = await db
      .collection("ogloszenia")
      .find({}, { projection: { _id: 1, tytul: 1, cena: 1, opis: 1 } })
      .toArray();
    res.status(200).json({ data: ogloszenia });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
