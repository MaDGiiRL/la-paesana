import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="border-t border-[rgba(20,20,20,0.10)] bg-white">
            <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
                <div>
                    <div className="text-lg font-black cedar">La Paesana For Family</div>
                    <p className="mt-2 text-sm ui-muted">
                        Specialità di pesce, anche carne e pizza. A pranzo e cena.
                    </p>
                </div>

                <div>
                    <div className="text-xs font-bold">Link</div>
                    <div className="mt-3 flex flex-col gap-2 text-sm">
                        <Link className="ui-muted hover:text-[rgb(var(--accent))]" to="/menu">
                            Menu
                        </Link>
                        <Link className="ui-muted hover:text-[rgb(var(--accent))]" to="/contatti">
                            Contatti
                        </Link>
                        <Link className="ui-muted hover:text-[rgb(var(--accent))]" to="/admin">
                            Admin
                        </Link>
                    </div>
                </div>

                <div>
                    <div className="text-xs font-bold">Info</div>
                    <div className="mt-3 text-sm ui-muted">
                        <div>📍 Via Schiavonesca Nuova, 223 — 31040 Volpago del Montello (TV)</div>
                        <div className="mt-1">⏰ 11–15 • 18–23 (sab 18–01 • dom 18–00 • lun chiuso)</div>
                        <div className="mt-1">
                            ☎️{" "}
                            <a className="ui-muted hover:text-[rgb(var(--accent))]" href="tel:+393284586610">
                                328 458 6610
                            </a>
                        </div>
                    </div>
                </div>

                {/* bottom bar */}
                <div className="md:col-span-3 text-xs ui-muted flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>© {new Date().getFullYear()} La Paesana For Family</div>

                    <div className="flex items-center gap-2">
                        <span>Developed with 💛 by</span>
                        <a
                            className="hover:text-[rgb(var(--accent))] font-bold"
                            href="https://maddev.vercel.app/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            MaDGiiRL
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
