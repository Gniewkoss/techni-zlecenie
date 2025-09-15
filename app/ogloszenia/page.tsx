"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const OgloszeniaPage = () => {
    const [ogloszenia, setOgloszenia] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        setLoggedIn(!!userId);

        // Fetch username for logged-in user
        if (userId) {
            fetch(`/api/uzytkownicy?userId=${userId}`)
                .then(res => res.json())
                .then(data => {
                    setUsername(data.username || "");
                });
        }

        fetch("/api/ogloszenia")
            .then(res => res.json())
            .then(data => {
                setOgloszenia(data.data || []);
                setLoading(false);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userId");
        setLoggedIn(false);
    };

    if (!loggedIn) {
        return (
            <div>
                <h1>Ogloszenia Page</h1>
                <p>Musisz być zalogowany, żeby wyświetlić ogłoszenia.</p>
                <Link href="/ogloszenia/uzytkownicy">
                    <button style={{marginBottom: '1rem'}}>Zaloguj</button>
                </Link>
            </div>
        );
    }

    return (
        <div>
            <Link href={`/ogloszenia/panelUzytkownika`}>
                <button>{username}</button>
            </Link>
            <h1>Ogloszenia Page</h1>
            <button style={{marginBottom: '1rem'}} onClick={handleLogout}>Wyloguj</button>
            <Link href="/ogloszenia/dodajOgloszenie">Dodaj Ogloszenie</Link>
            <div className="mt-4">
                <h2>Lista Ogloszen</h2>
                {loading ? (
                    <p>Ładowanie...</p>
                ) : (
                    <ul>
                        {ogloszenia.map((ogloszenie) => (
                            <li key={ogloszenie._id} style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                                <a href={`/ogloszenia/${ogloszenie._id}`} style={{textDecoration: 'none', color: '#2a4d7a'}}>
                                    <strong>{ogloszenie.tytul}</strong> — {ogloszenie.cena} zł
                                </a>
                                <button style={{fontSize: '0.95em', padding: '0.3em 0.8em'}}>
                                    {ogloszenie.username || "(nieznany)"}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default OgloszeniaPage;
