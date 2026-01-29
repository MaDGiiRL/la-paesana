import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="border-t border-white/10">
            <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
                <div>
                    <div className="text-lg font-black">La Paesana</div>
                    <p className="mt-2 text-sm text-white/60">
                        Pizza contemporanea, impasto leggero, ingredienti veri. Ordina online
                        senza registrazione.
                    </p>
                </div>

                <div>
                    <div className="text-sm font-bold text-white/80">Link</div>
                    <div className="mt-3 flex flex-col gap-2 text-sm">
                        <Link className="text-white/70 hover:text-white" to="/menu">Menu</Link>
                        <Link className="text-white/70 hover:text-white" to="/ordina">Ordina</Link>
                        <Link className="text-white/70 hover:text-white" to="/contatti">Contatti</Link>
                        <Link className="text-white/70 hover:text-white" to="/admin">Admin</Link>
                    </div>
                </div>

                <div>
                    <div className="text-sm font-bold text-white/80">Info</div>
                    <div className="mt-3 text-sm text-white/60">
                        <div>📍 Via Roma 12, 00100</div>
                        <div className="mt-1">⏰ 18:30 – 23:30</div>
                        <div className="mt-1">☎️ +39 000 000 000</div>
                    </div>
                </div>

                <div className="md:col-span-3 text-xs text-white/40">
                    © {new Date().getFullYear()} La Paesana — Demo React + Vite
                </div>
            </div>
        </footer>
    );
}
