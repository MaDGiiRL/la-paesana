import { useEffect, useState } from "react";

const LS_AUTH = "lp_admin_authed";

/**
 * Demo gate: PIN client-side.
 * Cambia PIN qui (o meglio: .env + backend in produzione).
 */
const ADMIN_PIN = "2468";

export default function AdminGate({ children }) {
    const [ok, setOk] = useState(false);
    const [pin, setPin] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem(LS_AUTH);
        if (saved === "yes") setOk(true);
    }, []);

    function login(e) {
        e.preventDefault();
        if (pin === ADMIN_PIN) {
            localStorage.setItem(LS_AUTH, "yes");
            setOk(true);
        } else {
            alert("PIN errato");
        }
    }

    function logout() {
        localStorage.removeItem(LS_AUTH);
        setOk(false);
        setPin("");
    }

    if (ok) {
        return (
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <div className="text-sm text-white/60">
                        Accesso admin attivo (demo)
                    </div>
                    <button
                        onClick={logout}
                        className="rounded-full bg-white/5 px-4 py-2 text-sm font-semibold ring-1 ring-white/10 hover:bg-white/10"
                    >
                        Esci
                    </button>
                </div>
                {children}
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-6">
            <h1 className="text-2xl font-black">Admin • La Paesana</h1>
            <p className="mt-2 text-sm text-white/60">
                Inserisci il PIN per accedere alla dashboard (demo).
            </p>

            <form onSubmit={login} className="mt-5 grid gap-3">
                <input
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 outline-none focus:border-white/20"
                    placeholder="PIN"
                />
                <button
                    type="submit"
                    className="rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 px-5 py-3 text-sm font-black text-neutral-950 shadow-lg shadow-fuchsia-600/15 transition hover:brightness-110"
                >
                    Accedi
                </button>
            </form>
        </div>
    );
}
