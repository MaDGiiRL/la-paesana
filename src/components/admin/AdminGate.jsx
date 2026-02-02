import { useEffect, useState } from "react";

const LS_AUTH = "lp_admin_authed";
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

    // ✅ Auth ok: passiamo onLogout ai children
    if (ok) {
        return (
            <div className="grid gap-4">
                {typeof children === "function" ? children({ onLogout: logout }) : children}
            </div>
        );
    }

    // ✅ Login UI
    return (
        <div className="mx-auto max-w-md ui-card p-6">
            <div className="ui-chip">Staff</div>
            <h1 className="mt-2 text-2xl font-black">Dashboard • La Paesana</h1>
            <p className="mt-2 ui-muted text-sm">Inserisci il PIN per accedere.</p>

            <form onSubmit={login} className="mt-5 grid gap-3">
                <input
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="ui-input"
                    placeholder="PIN"
                />
                <button type="submit" className="ui-btn-gold w-full">
                    <span>Accedi</span>
                </button>
            </form>
        </div>
    );
}
