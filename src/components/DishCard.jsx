// src/components/DishCard.jsx
import { Fish, Beef, Pizza, Flame } from "lucide-react";

function categoryIcon(dish) {
    const name = String(dish?.name || "").toLowerCase();

    const isPizza =
        dish?.course === "pizza" ||
        name.includes("pizza") ||
        name.includes("margherita") ||
        name.includes("diavola");

    const isFish =
        dish?.category === "fish" ||
        name.includes("mare") ||
        name.includes("scoglio") ||
        name.includes("vongole") ||
        name.includes("tonno") ||
        name.includes("orata") ||
        name.includes("branzino");

    if (isPizza) return { Icon: Pizza, label: "Pizza" };
    if (isFish) return { Icon: Fish, label: "Pesce" };
    return { Icon: Beef, label: "Carne" };
}

export default function DishCard({ dish, onAdd }) {
    const { Icon, label } = categoryIcon(dish);
    const isSpicy =
        dish?.spicy === true ||
        dish?.tags?.some?.((t) => String(t).toLowerCase().includes("piccante"));

    return (
        <article className="ui-card overflow-hidden hover:shadow-[0_18px_40px_rgba(20,20,20,0.10)] transition-shadow">
            <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(20,20,20,0.10)] bg-[rgba(20,20,20,0.02)]">
                                <Icon size={18} />
                            </span>

                            <div className="min-w-0">
                                <h3 className="truncate text-base font-black sm:text-lg">{dish?.name}</h3>
{/* 
                                <div className="mt-1 flex items-center gap-2">
                                    <span className="ui-muted text-xs">{label}</span>
                                    {isSpicy ? (
                                        <span className="inline-flex items-center gap-1 text-xs ui-muted">
                                            <Flame size={14} />
                                            Piccante
                                        </span>
                                    ) : null}
                                </div> */}
                            </div>
                        </div>

                        {dish?.desc ? (
                            <p className="mt-3 line-clamp-2 text-sm ui-muted">{dish.desc}</p>
                        ) : null}
                    </div>

                    <div className="shrink-0 text-right">
                        <div className="rounded-xl border border-[rgba(20,20,20,0.12)] bg-[rgba(255,255,255,0.75)] px-3 py-2 text-sm font-black">
                            € {Number(dish?.price || 0).toFixed(2)}
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <button onClick={() => onAdd?.(dish)} className="ui-btn-gold" type="button">
                        <span>Aggiungi</span>
                    </button>
                </div>
            </div>
        </article>
    );
}
