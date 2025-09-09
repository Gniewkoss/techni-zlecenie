"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const DodajOgloszeniePage = () => {
  const [tytul, setTytul] = useState("");
  const [cena, setCena] = useState("");
  const [opis, setOpis] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/ogloszenia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tytul, cena: Number(cena), opis }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/ogloszenia");
    } else {
      alert("Błąd dodawania ogłoszenia");
    }
  };

  return (
    <div>
      <h1>Dodaj ogłoszenie</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tytuł:</label>
          <input value={tytul} onChange={e => setTytul(e.target.value)} required />
        </div>
        <div>
          <label>Cena:</label>
          <input type="number" value={cena} onChange={e => setCena(e.target.value)} required />
        </div>
        <div>
          <label>Opis:</label>
          <textarea value={opis} onChange={e => setOpis(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading}>{loading ? "Dodawanie..." : "Dodaj"}</button>
      </form>
    </div>
  );
}

export default DodajOgloszeniePage;
