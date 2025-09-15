"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const OgloszeniaPage = () => {
    const [ogloszenia, setOgloszenia] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        setLoggedIn(!!userId);

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
                            <li key={ogloszenie._id}>
                                <strong>{ogloszenie.tytul}</strong> — {ogloszenie.cena} zł<br />
                                {ogloszenie.opis}<br />
                                <span style={{fontSize: '0.95em', color: '#888'}}>Autor: {ogloszenie.username || "(nieznany)"}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default OgloszeniaPage;
