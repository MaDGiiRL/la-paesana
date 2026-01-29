import { useEffect, useMemo, useState } from "react";

export default function Carousel({ items = [], intervalMs = 4500 }) {
    const slides = useMemo(() => items.filter(Boolean), [items]);
    const [i, setI] = useState(0);

    useEffect(() => {
        if (slides.length <= 1) return;
        const t = setInterval(() => setI((v) => (v + 1) % slides.length), intervalMs);
        return () => clearInterval(t);
    }, [slides.length, intervalMs]);

    const current = slides[i];

    return (
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/30">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/20 via-rose-500/10 to-fuchsia-600/20" />
            <div className="relative grid gap-6 p-6 md:grid-cols-2 md:p-10">
                <div className="flex flex-col justify-center">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold ring-1 ring-white/10">
                        <span className="h-2 w-2 rounded-full bg-amber-400" />
                        Specialità del giorno
                    </div>
                    <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
                        {current?.title}
                    </h2>
                    <p className="mt-3 text-white/70 md:text-lg">{current?.subtitle}</p>

                    <div className="mt-6 flex gap-2">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setI(idx)}
                                className={[
                                    "h-2 w-8 rounded-full transition",
                                    idx === i ? "bg-white/80" : "bg-white/20 hover:bg-white/35",
                                ].join(" ")}
                                aria-label={`Slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                        {/* immagini demo via URL: sostituisci con assets quando vuoi */}
                        <img
                            src={current?.image}
                            alt={current?.title ?? "Slide"}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <div className="pointer-events-none absolute -bottom-5 -left-5 h-24 w-24 rounded-full bg-amber-400/20 blur-2xl" />
                    <div className="pointer-events-none absolute -top-6 -right-6 h-28 w-28 rounded-full bg-fuchsia-600/20 blur-2xl" />
                </div>
            </div>
        </div>
    );
}
