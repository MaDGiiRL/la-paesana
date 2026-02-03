// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            className="relative mt-10 overflow-hidden"
            style={{
                background:
                    "radial-gradient(1200px 520px at 18% 0%, rgba(255,200,64,0.10), transparent 60%)," +
                    "radial-gradient(900px 520px at 92% 20%, rgba(212,170,55,0.08), transparent 62%)," +
                    "radial-gradient(circle at 1px 1px, rgba(20,20,20,0.06) 1px, transparent 1.8px)," +
                    "linear-gradient(180deg, rgba(255,255,255,0.68), rgba(247,242,232,0.62))",
                backgroundSize: "auto, auto, 18px 18px, auto",
                borderTop: "1px solid rgba(20,20,20,0.10)",
            }}
        >
            {/* decorazione soft */}
            <div
                aria-hidden
                className="pointer-events-none absolute -top-24 left-1/2 h-[220px] w-[700px] -translate-x-1/2 rounded-full"
                style={{
                    background:
                        "radial-gradient(circle at 50% 50%, rgba(255,200,64,0.10), transparent 70%)",
                    filter: "blur(10px)",
                    opacity: 0.9,
                }}
            />

            <div className="mx-auto w-full max-w-6xl px-4 py-12">
                <div className="grid gap-8 md:grid-cols-3">
                    {/* brand */}
                    <div>
                        <div className="flex items-center gap-3">
                            <div
                                className="grid h-10 w-10 place-items-center rounded-2xl border"
                                style={{
                                    background:
                                        "linear-gradient(180deg, rgba(255,233,170,0.52), rgba(255,245,223,0.32))",
                                    borderColor: "rgba(20,20,20,0.12)",
                                }}
                            >
                                <span
                                    className="text-[14px] font-black"
                                    style={{ color: "rgba(25,25,25,0.90)" }}
                                >
                                    LP
                                </span>
                            </div>

                            <div className="leading-tight">
                                <div className="text-xl font-black cedar">La Paesana</div>
                                <div className="text-xs ui-muted -mt-1">For Family</div>
                            </div>
                        </div>

                        <p className="mt-3 text-sm ui-muted leading-relaxed max-w-[46ch]">
                            Specialità di pesce, anche carne e pizza. A pranzo e cena. Sapori
                            veri e accoglienza di casa.
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <Badge>Trattoria di famiglia</Badge>
                            <Badge>🐟 Mare • 🍕 Pizza • 🥩 Carne</Badge>
                        </div>

                        {/* ✅ social mini */}
                        <div className="mt-5 flex items-center gap-2">
                            <SocialBtn
                                href="YOUR_INSTAGRAM_URL"
                                label="Instagram"
                                icon={<InstagramIcon />}
                            />
                            <SocialBtn
                                href="YOUR_GOOGLE_MAPS_URL"
                                label="Google Maps"
                                icon={<PinIcon />}
                            />
                        </div>
                    </div>

                    {/* links */}
                    <div>
                        <div className="text-xs font-black tracking-wide">Link rapidi</div>

                        <div className="mt-4 flex flex-col gap-2 text-sm">
                            <FooterLink to="/menu">Menù</FooterLink>
                            <FooterLink to="/contatti">Contatti</FooterLink>
                            <FooterLink to="/admin">Admin</FooterLink>
                        </div>

                        <div className="mt-6">
                            <div className="text-xs font-black tracking-wide">Prenota</div>
                            <a
                                className="mt-3 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-black transition hover:-translate-y-[1px]"
                                href="tel:+393284586610"
                                style={{
                                    background:
                                        "linear-gradient(180deg, rgba(255,233,170,0.46), rgba(255,245,223,0.30))",
                                    borderColor: "rgba(20,20,20,0.12)",
                                    color: "rgba(25,25,25,0.92)",
                                }}
                            >
                                ☎️ 328 458 6610
                                <span className="ui-muted text-xs font-bold">• chiama ora</span>
                            </a>
                        </div>
                    </div>

                    {/* info */}
                    <div>
                        <div className="text-xs font-black tracking-wide">Info</div>

                        <div className="mt-4 grid gap-3 text-sm">
                            <InfoCard title="📍 Indirizzo">
                                Via Schiavonesca Nuova, 223 — 31040 Volpago del Montello (TV)
                            </InfoCard>

                            <InfoCard title="⏰ Orari">
                                11–15 • 18–23 <br />
                                <span className="ui-muted">sab 18–01 • dom 18–00 • lun chiuso</span>
                            </InfoCard>
                        </div>
                    </div>

                    {/* bottom bar */}
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

/* ---------- small helpers ---------- */

function Badge({ children }) {
    return (
        <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-black"
            style={{
                background: "rgba(255,255,255,0.52)",
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
                background: "rgba(255,255,255,0.48)",
                borderColor: "rgba(20,20,20,0.12)",
            }}
        >
            <div className="font-black text-[12px]">{title}</div>
            <div className="mt-1 ui-muted leading-relaxed">{children}</div>
        </div>
    );
}

function SocialBtn({ href, label, icon }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="group inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-black transition hover:-translate-y-[1px]"
            style={{
                background:
                    "linear-gradient(180deg, rgba(255,233,170,0.34), rgba(255,245,223,0.22))",
                borderColor: "rgba(20,20,20,0.12)",
                color: "rgba(25,25,25,0.90)",
            }}
        >
            <span
                className="grid h-7 w-7 place-items-center rounded-full border"
                style={{
                    background: "rgba(255,255,255,0.45)",
                    borderColor: "rgba(20,20,20,0.12)",
                }}
            >
                {icon}
            </span>
            <span className="hidden sm:inline">{label}</span>
            <span className="ui-muted transition group-hover:translate-x-[2px]">›</span>
        </a>
    );
}

function FooterLink({ to, children }) {
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

/* ---------- icons (no libs) ---------- */

function InstagramIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path
                d="M7.5 2.8h9A4.7 4.7 0 0 1 21.2 7.5v9A4.7 4.7 0 0 1 16.5 21.2h-9A4.7 4.7 0 0 1 2.8 16.5v-9A4.7 4.7 0 0 1 7.5 2.8Z"
                stroke="rgba(25,25,25,0.85)"
                strokeWidth="1.6"
            />
            <path
                d="M12 16.3a4.3 4.3 0 1 0 0-8.6 4.3 4.3 0 0 0 0 8.6Z"
                stroke="rgba(25,25,25,0.85)"
                strokeWidth="1.6"
            />
            <path
                d="M17.6 6.5h.01"
                stroke="rgba(25,25,25,0.85)"
                strokeWidth="2.4"
                strokeLinecap="round"
            />
        </svg>
    );
}

function PinIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path
                d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"
                stroke="rgba(25,25,25,0.85)"
                strokeWidth="1.6"
            />
            <path
                d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z"
                stroke="rgba(25,25,25,0.85)"
                strokeWidth="1.6"
            />
        </svg>
    );
}
