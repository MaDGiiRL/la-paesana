// src/components/Carousel.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Carousel({ items = [], intervalMs = 6500 }) {
    const slides = useMemo(
        () => [
            {
                type: "brand",
                title: "La Paesana For Family",
                subtitle:
                    "Ristorante di mare a conduzione familiare. Menù fisso a pranzo, la sera pesce, carne e pizza.",
            },
            ...items.filter(Boolean),
        ],
        [items]
    );

    const [i, setI] = useState(0);

    useEffect(() => {
        if (slides.length <= 1) return;
        const t = setInterval(() => setI((v) => (v + 1) % slides.length), intervalMs);
        return () => clearInterval(t);
    }, [slides.length, intervalMs]);

    const current = slides[i];
    const isBrand = current?.type === "brand";

    return (
        <section className="ui-card overflow-hidden">
            {/* ================= MOBILE ================= */}
            <div className="md:hidden">
                {/* TOP VISUAL */}
                <div className="relative h-[190px]">
                    {isBrand ? (
                        <>
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        "radial-gradient(360px 220px at 28% 35%, rgba(255,200,64,0.35), transparent 62%)," +
                                        "radial-gradient(280px 200px at 85% 25%, rgba(12,74,110,0.12), transparent 60%)," +
                                        "linear-gradient(180deg, rgba(255,255,255,0.78), rgba(248,246,242,0.97))",
                                }}
                            />

                            {/* ✅ LOGO: grande, centrato, sempre intero */}
                            <div className="absolute inset-0 grid place-items-center px-4">
                                <div
                                    className="rounded-3xl border border-[rgba(20,20,20,0.10)] bg-[rgba(255,255,255,0.65)] shadow-[0_20px_50px_rgba(20,20,20,0.12)] backdrop-blur-md"
                                    style={{
                                        width: "min(92vw, 520px)",
                                        height: "min(70%, 150px)",
                                        overflow: "hidden",
                                        display: "grid",
                                        placeItems: "center",
                                    }}
                                >
                                    <img
                                        src={logo}
                                        alt="La Paesana"
                                        loading="eager"
                                        draggable={false}
                                        style={{
                                            width: "92%",
                                            height: "92%",
                                            objectFit: "contain",
                                            objectPosition: "center",
                                            display: "block",
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <img
                                src={current?.image}
                                alt={current?.title ?? "Slide"}
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                            <div
                                className="ui-veil"
                                style={{
                                    background:
                                        "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(248,246,242,0.92) 88%)",
                                }}
                            />
                        </>
                    )}

                    <div className="pointer-events-none absolute inset-0 ring-1 ring-[rgba(20,20,20,0.10)]" />

                    {/* Dots overlay */}
                    <div className="absolute bottom-3 left-3 right-3">
                        <div
                            className="ui-card"
                            style={{
                                borderRadius: 9999,
                                padding: "8px 10px",
                                background: "rgba(255,255,255,0.80)",
                                backdropFilter: "blur(8px)",
                                boxShadow: "0 10px 24px rgba(20,20,20,0.10)",
                            }}
                        >
                            <div className="ui-dots">
                                {slides.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setI(idx)}
                                        aria-label={`Slide ${idx + 1}`}
                                        className={["ui-dot", idx === i ? "is-active" : ""].join(" ")}
                                        style={{ width: idx === i ? 26 : 10 }}
                                        type="button"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(212,170,55,0.30)] bg-[rgba(255,200,64,0.16)] px-3 py-1 text-[11px] font-bold text-[rgba(25,25,25,0.82)]">
                        <span className="h-2 w-2 rounded-full" style={{ background: "rgb(var(--accent))" }} />
                        {isBrand ? "Benvenuti" : "Cucina di mare"}
                    </div>

                    <h2 className={["cedar mt-3", isBrand ? "text-4xl" : "text-3xl"].join(" ")}>
                        {isBrand ? current?.title : current?.title}
                    </h2>

                    <p className="mt-2 ui-muted text-sm">{current?.subtitle}</p>

                    <div className="mt-4 flex gap-2">
                        <Link to="/menu" className="ui-btn px-3 py-2 text-sm">
                            Menù
                        </Link>
                        <Link to="/ordina" className="ui-btn-gold px-3 py-2 text-sm">
                            Ordina
                        </Link>
                    </div>
                </div>
            </div>

            {/* ================= DESKTOP ================= */}
            <div className="relative hidden md:grid md:h-[380px] md:grid-cols-[1.02fr_0.98fr]">
                {/* LEFT */}
                <div className="relative flex h-full flex-col justify-center p-10">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(212,170,55,0.28)] bg-[rgba(255,200,64,0.14)] px-4 py-2 text-xs font-bold text-[rgba(25,25,25,0.82)]">
                        <span className="h-3 w-3 rounded-full" style={{ background: "rgb(var(--accent))" }} />
                        {isBrand ? "Ristorante elegante" : "Specialità di mare"}
                    </div>

                    <h2 className="cedar mt-4 text-4xl">{isBrand ? "La Paesana For Family" : current?.title}</h2>

                    <p className="mt-3 ui-muted max-w-[48ch]">{current?.subtitle}</p>

                    <div className="mt-6 flex gap-2">
                        <Link to="/menu" className="ui-btn">
                            Vedi menù
                        </Link>
                        <Link to="/ordina" className="ui-btn-gold">
                            Ordina ora
                        </Link>
                    </div>

                    <div className="mt-7">
                        <div className="ui-dots">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setI(idx)}
                                    aria-label={`Slide ${idx + 1}`}
                                    className={["ui-dot", idx === i ? "is-active" : ""].join(" ")}
                                    style={{ width: idx === i ? 30 : 10 }}
                                    type="button"
                                />
                            ))}
                        </div>
                    </div>

                    <div
                        className="pointer-events-none absolute inset-0 -z-10"
                        style={{
                            background:
                                "radial-gradient(760px 320px at 20% 30%, rgba(255,200,64,0.20), transparent 62%)," +
                                "radial-gradient(560px 280px at 35% 90%, rgba(12,74,110,0.08), transparent 60%)",
                        }}
                    />
                </div>

                {/* RIGHT */}
                <div className="relative">
                    {isBrand ? (
                        <>
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        "radial-gradient(600px 360px at 55% 45%, rgba(255,200,64,0.30), transparent 60%)," +
                                        "linear-gradient(180deg, rgba(255,255,255,0.50), rgba(0,0,0,0.04))",
                                }}
                            />

                            {/* ✅ LOGO: grande, centrato, sempre intero */}
                            <div className="absolute inset-0 grid place-items-center p-10">
                                <div
                                    className="rounded-[28px] backdrop-blur-md"
                                    style={{
                                        width: "min(520px, 92%)",
                                        height: "min(350px, 99%)",
                                        overflow: "hidden",
                                        display: "grid",
                                        placeItems: "center",
                                    }}
                                >
                                    <img
                                        src={logo}
                                        alt="La Paesana"
                                        draggable={false}
                                        style={{
                                            width: "92%",
                                            height: "92%",
                                            objectFit: "contain",
                                            objectPosition: "center",
                                            display: "block",
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <img
                                src={current?.image}
                                alt={current?.title ?? "Slide"}
                                className="h-full w-full object-contain"
                                loading="lazy"
                            />
                            <div
                                className="ui-veil"
                                style={{
                                    background:
                                        "linear-gradient(90deg, rgba(248,246,242,0.92), rgba(248,246,242,0.10) 48%, rgba(248,246,242,0.00) 72%)," +
                                        "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(0,0,0,0.12))",
                                }}
                            />
                        </>
                    )}

                    <div className="pointer-events-none absolute inset-0 ring-1 ring-[rgba(20,20,20,0.10)]" />
                </div>
            </div>
        </section>
    );
}
