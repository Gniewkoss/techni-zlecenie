"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const PanelUzytkownika = () => {
    const [ogloszenia, setOgloszenia] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        // Fetch username
        fetch(`/api/uzytkownicy?userId=${userId}`)
            .then(res => res.json())
            .then(data => setUsername(data.username || ""));

        // Fetch ogloszenia for this user
        fetch(`/api/ogloszenia?userId=${userId}`)
            .then(res => res.json())
            .then(data => {
                setOgloszenia(data.data || []);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Czy na pewno chcesz usunąć to ogłoszenie?")) return;
        const res = await fetch(`/api/ogloszenia?id=${id}`, {
            method: "DELETE"
        });
        if (res.ok) {
            setOgloszenia(ogloszenia.filter(o => o._id !== id));
        } else {
            alert("Błąd usuwania ogłoszenia");
        }
    };

    return ( 
        <div>
            <h1>Panel Użytkownika</h1>
            <p>Zalogowany jako: <strong>{username}</strong></p>
            <div className="mt-4">
                <h2>Moje ogłoszenia</h2>
                {loading ? (
                    <p>Ładowanie...</p>
                ) : (
                    <ul>
                        {ogloszenia.length === 0 ? (
                            <li>Brak ogłoszeń</li>
                        ) : (
                            ogloszenia.map((ogloszenie) => (
                                <li key={ogloszenie._id} style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                                    <Link href={`/ogloszenia/${ogloszenie._id}`} style={{textDecoration: 'none', color: '#2a4d7a'}}>
                                        <strong>{ogloszenie.tytul}</strong> — {ogloszenie.cena} zł
                                    </Link>
                                    <button style={{background: '#c62828'}} onClick={() => handleDelete(ogloszenie._id)}>Usuń</button>
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </div>
            <Link href="/ogloszenia">Powrót do ogłoszeń</Link>
        </div>
     );
}
 
export default PanelUzytkownika;