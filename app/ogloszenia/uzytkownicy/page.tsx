"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const UzytkownicyPage = () => {
  const [showRegister, setShowRegister] = useState(false);
  const router = useRouter();

  // Rejestracja
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [regMessage, setRegMessage] = useState("");

  // Logowanie
  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const [logLoading, setLogLoading] = useState(false);
  const [logMessage, setLogMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegLoading(true);
    setRegMessage("");
    const res = await fetch("/api/uzytkownicy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: regUsername,
        email: regEmail,
        password: regPassword,
        register: true,
      }),
    });
    setRegLoading(false);
    if (res.ok) {
      setRegMessage("Rejestracja udana!");
      setRegUsername("");
      setRegEmail("");
      setRegPassword("");
    } else {
      setRegMessage("Błąd rejestracji");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLogLoading(true);
    setLogMessage("");
    const res = await fetch("/api/uzytkownicy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: logEmail,
        password: logPassword,
        login: true,
      }),
    });
    setLogLoading(false);
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("userId", data.userId);
      setLogMessage("Logowanie udane!");
      setLogEmail("");
      setLogPassword("");
      router.push("/ogloszenia");
    } else {
      setLogMessage("Błąd logowania");
    }
  };

  return (
    <div>
      {!showRegister ? (
        <>
          <h1>Logowanie</h1>
          <form onSubmit={handleLogin}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={logEmail}
                onChange={(e) => setLogEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Hasło:</label>
              <input
                type="password"
                value={logPassword}
                onChange={(e) => setLogPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={logLoading}>
              {logLoading ? "Logowanie..." : "Zaloguj"}
            </button>
          </form>
          {logMessage && <p>{logMessage}</p>}
          <button
            style={{ marginTop: "2rem" }}
            onClick={() => setShowRegister(true)}
          >
            Zarejestruj się
          </button>
        </>
      ) : (
        <>
          <h1>Rejestracja</h1>
          <form onSubmit={handleRegister}>
            <div>
              <label>Nazwa użytkownika:</label>
              <input
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Hasło:</label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={regLoading}>
              {regLoading ? "Rejestracja..." : "Zarejestruj"}
            </button>
          </form>
          {regMessage && <p>{regMessage}</p>}
          <button
            style={{ marginTop: "2rem" }}
            onClick={() => setShowRegister(false)}
          >
            Zaloguj się
          </button>
        </>
      )}
    </div>
  );
};

export default UzytkownicyPage;