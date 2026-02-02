import { useEffect, useRef, useState, useMemo } from "react";

function Stars({ value = 5 }) {
    return (
        <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
                <svg
                    key={i}
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill={i < value ? "rgb(var(--accent-2))" : "rgba(20,20,20,0.18)"}
                >
                    <path d="M12 17.27l-5.18 3.05 1.4-5.95-4.62-4 6.08-.52L12 4.2l2.32 5.65 6.08.52-4.62 4 1.4 5.95z" />
                </svg>
            ))}
        </div>
    );
}

function ReviewText({ text, limit = 150 }) {
    const [open, setOpen] = useState(false);

    if (!text || text.length <= limit) {
        return <p className="mt-3 text-sm ui-muted leading-relaxed">{text}</p>;
    }

    return (
        <p className="mt-3 text-sm ui-muted leading-relaxed">
            {open ? text : `${text.slice(0, limit)}…`}{" "}
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="font-bold text-[rgb(var(--accent))] hover:underline ml-1"
            >
                {open ? "Mostra meno" : "Visualizza altro"}
            </button>
        </p>
    );
}

export default function ReviewsSection({
    title = "Recensioni",
    subtitle = "Cosa dicono di noi",
    rating = 4.8,
    reviewCount = 127,
    sourceLabel = "Google",
    reviews = [],
}) {
    const ref = useRef(null);
    const [index, setIndex] = useState(0);

    const countLabel = useMemo(
        () => `Basato su ${reviewCount} recensioni • ${sourceLabel}`,
        [reviewCount, sourceLabel]
    );

    // autoplay
    useEffect(() => {
        if (!reviews.length) return;
        const el = ref.current;
        if (!el) return;

        const timer = setInterval(() => {
            const next = (index + 1) % reviews.length;
            el.scrollTo({
                left: el.children[next].offsetLeft,
                behavior: "smooth",
            });
            setIndex(next);
        }, 4500);

        return () => clearInterval(timer);
    }, [index, reviews.length]);

    return (
        <section className="ui-card p-5 md:p-7 overflow-hidden">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <h2 className="ui-h2">{title}</h2>
                    <p className="mt-1 ui-muted text-sm">{subtitle}</p>
                </div>

                <div className="flex items-center gap-3 rounded-full border bg-white px-4 py-2">
                    <span className="font-black">{rating.toFixed(1)}</span>
                    <Stars value={Math.round(rating)} />
                    <span className="text-xs ui-muted">{countLabel}</span>
                </div>
            </div>

            {/* CAROUSEL */}
            <div
                ref={ref}
                className="
          mt-5 flex gap-4 overflow-x-auto snap-x snap-mandatory
          [-webkit-overflow-scrolling:touch]
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
            >
                {reviews.map((r, i) => (
                    <article
                        key={`${r.name}-${i}`}
                        className="
              ui-soft min-w-[85%] md:min-w-[32%]
              snap-start p-5
              transition-transform hover:-translate-y-1
            "
                    >
                        <div className="flex items-start justify-between">
                            <div className="font-black">{r.name}</div>
                            <Stars value={r.stars} />
                        </div>

                        {r.when && (
                            <div className="mt-1 text-xs ui-muted">{r.when}</div>
                        )}

                        <ReviewText text={r.text} limit={150} />
                    </article>
                ))}
            </div>
        </section>
    );
}
