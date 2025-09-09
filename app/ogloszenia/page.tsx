"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const OgloszeniaPage = () => {
    const [ogloszenia, setOgloszenia] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/ogloszenia")
            .then(res => res.json())
            .then(data => {
                setOgloszenia(data.data || []);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>Ogloszenia Page</h1>
            <Link href="/ogloszenia/dodajOgloszenie">Dodaj Ogloszenie</Link>
            <Link href="/ogloszenia/uzytkownicy">Uzytkownicy</Link>

            <div className="mt-4">
                <h2>Lista Ogloszen</h2>
                {loading ? (
                    <p>Ładowanie...</p>
                ) : (
                    <ul>
                        {ogloszenia.map((ogloszenie) => (
                            <li key={ogloszenie._id}>
                                <Link href={`/ogloszenia/${ogloszenie._id}`}>
                                    {ogloszenie.tytul || JSON.stringify(ogloszenie)}
                                    {ogloszenie.cena ? ` - ${ogloszenie.cena} zł` : ""}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default OgloszeniaPage;
