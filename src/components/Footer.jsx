// src/components/Footer.jsx
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            className="relative overflow-hidden"
            style={{
                borderTop: "1px solid rgba(20,20,20,0.10)",
                background:
                    "radial-gradient(900px 420px at 18% 0%, rgba(255,200,64,0.10), transparent 62%)," +
                    "radial-gradient(700px 380px at 92% 20%, rgba(212,170,55,0.08), transparent 62%)," +
                    "radial-gradient(circle at 1px 1px, rgba(20,20,20,0.06) 1px, transparent 1.8px)," +
                    "linear-gradient(180deg, rgba(255,255,255,0.65), rgba(247,242,232,0.60))",
                backgroundSize: "auto, auto, 18px 18px, auto",
            }}
        >
            {/* glow soft centrale (zero ombre, solo luce) */}
            <div
                aria-hidden
                className="pointer-events-none absolute -top-28 left-1/2 h-[220px] w-[780px] -translate-x-1/2 rounded-full"
                style={{
                    background:
                        "radial-gradient(circle at 50% 50%, rgba(255,200,64,0.10), transparent 70%)",
                    filter: "blur(10px)",
                    opacity: 0.9,
                }}
            />

            <div className="mx-auto w-full max-w-6xl px-4 py-12">
                <div className="grid gap-10 md:grid-cols-3">
                    {/* BRAND */}
                    <div>
                        <div className="flex items-center gap-3">
                            <div
                                className="grid h-10 w-10 place-items-center rounded-2xl border"
                                style={{
                                    background:
                                        "linear-gradient(180deg, rgba(255,233,170,0.46), rgba(255,245,223,0.26))",
                                    borderColor: "rgba(20,20,20,0.12)",
                                }}
                            >
                                {/* ✅ LOGO al posto di LP */}
                                <img
                                    src={logo}
                                    alt="La Paesana"
                                    draggable={false}
                                    style={{
                                        width: "80%",
                                        height: "80%",
                                        objectFit: "contain",
                                        objectPosition: "center",
                                        display: "block",
                                    }}
                                />
                            </div>

                            <div className="leading-tight">
                                <div className="text-xl font-black cedar">La Paesana</div>
                                <div className="text-xs ui-muted -mt-1">For Family</div>
                            </div>
                        </div>

                        <p className="mt-3 text-sm ui-muted leading-relaxed max-w-[48ch]">
                            Specialità di pesce, anche carne e pizza. A pranzo e cena. Sapori
                            veri e accoglienza di casa.
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <Pill>Trattoria di famiglia</Pill>
                            <Pill>🐟 Mare • 🍕 Pizza • 🥩 Carne</Pill>
                        </div>
                    </div>

                    {/* LINKS */}
                    <div>
                        <div className="text-xs font-black tracking-wide">Link rapidi</div>

                        <nav className="mt-4 flex flex-col gap-2 text-sm">
                            <FancyLink to="/menu">Menù</FancyLink>
                            <FancyLink to="/contatti">Contatti</FancyLink>
                            <FancyLink to="/admin">Admin</FancyLink>
                        </nav>

                        <div className="mt-7">
                            <div className="text-xs font-black tracking-wide">Prenota</div>

                            <a
                                href="tel:+393284586610"
                                className="mt-3 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-black transition hover:-translate-y-[1px]"
                                style={{
                                    background:
                                        "linear-gradient(180deg, rgba(255,233,170,0.36), rgba(255,245,223,0.22))",
                                    borderColor: "rgba(20,20,20,0.12)",
                                    color: "rgba(25,25,25,0.92)",
                                }}
                            >
                                ☎️ 328 458 6610
                                <span className="ui-muted text-xs font-bold">• chiama ora</span>
                            </a>
                        </div>
                    </div>

                    {/* INFO */}
                    <div>
                        <div className="text-xs font-black tracking-wide">Info</div>

                        <div className="mt-4 grid gap-3 text-sm">
                            <InfoCard title="📍 Indirizzo">
                                Via Schiavonesca Nuova, 223 — 31040 Volpago del Montello (TV)
                            </InfoCard>

                            <InfoCard title="⏰ Orari">
                                11–15 • 18–23 <br />
                                <span className="ui-muted">
                                    sab 18–01 • dom 18–00 • lun chiuso
                                </span>
                            </InfoCard>
                        </div>
                    </div>

                    {/* BOTTOM BAR */}
                    <div className="md:col-span-3 mt-10">
                        <div
                            className="h-[1px] w-full"
                            style={{
                                background:
                                    "linear-gradient(90deg, rgba(0,0,0,0), rgba(20,20,20,0.12), rgba(212,170,55,0.16), rgba(0,0,0,0))",
                            }}
                        />

                        <div className="mt-4 flex flex-col gap-2 text-xs ui-muted md:flex-row md:items-center md:justify-between">
                            <div>© {year} La Paesana For Family</div>

                            <div className="flex items-center gap-2">
                                <span>Developed with 💛 by</span>
                                <a
                                    className="font-black hover:underline"
                                    style={{ color: "rgba(25,25,25,0.90)" }}
                                    href="https://maddev.vercel.app/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    MaDGiiRL
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* ---------- mini components ---------- */

function Pill({ children }) {
    return (
        <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-black"
            style={{
                background: "rgba(255,255,255,0.50)",
                borderColor: "rgba(20,20,20,0.12)",
                color: "rgba(25,25,25,0.86)",
            }}
        >
            <span
                className="h-2 w-2 rounded-full"
                style={{ background: "rgba(212,170,55,0.90)" }}
            />
            {children}
        </span>
    );
}

function InfoCard({ title, children }) {
    return (
        <div
            className="rounded-2xl border px-4 py-3"
            style={{
                background: "rgba(255,255,255,0.46)",
                borderColor: "rgba(20,20,20,0.12)",
            }}
        >
            <div className="font-black text-[12px]">{title}</div>
            <div className="mt-1 ui-muted leading-relaxed">{children}</div>
        </div>
    );
}

function FancyLink({ to, children }) {
    return (
        <Link
            to={to}
            className="group inline-flex w-fit items-center gap-2 font-black"
            style={{ color: "rgba(25,25,25,0.88)" }}
        >
            <span className="relative">
                {children}
                <span
                    className="absolute -bottom-1 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full"
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(212,170,55,0.0), rgba(212,170,55,0.70), rgba(212,170,55,0.0))",
                    }}
                />
            </span>
            <span className="ui-muted transition group-hover:translate-x-[2px]">›</span>
        </Link>
    );
}
