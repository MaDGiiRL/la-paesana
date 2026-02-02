// src/components/DishModal.jsx
import { useEffect, useMemo, useState } from "react";
import { Fish, Beef, Pizza, Flame, StickyNote, Minus, Plus, X, Tags } from "lucide-react";

function categoryIcon(dish) {
    const tags = (dish?.tags || []).map((t) => String(t).toLowerCase());
    const name = String(dish?.name || "").toLowerCase();

    const isPizza =
        tags.some((t) => t.includes("pizza")) ||
        name.includes("pizza") ||
        name.includes("margherita") ||
        name.includes("diavola");

    const isFish =
        tags.some((t) => t.includes("pesce") || t.includes("mare")) ||
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

export default function DishModal({ open, dish, onClose, onConfirm }) {
    const [qty, setQty] = useState(1);
    const [notes, setNotes] = useState("");

    useEffect(() => {
        if (!open) return;
        setQty(1);
        setNotes("");
    }, [open, dish?.id]);

    useEffect(() => {
        function onKey(e) {
            if (e.key === "Escape") onClose?.();
        }
        if (open) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    const unitPrice = dish?.price ?? 0;
    const totalPrice = useMemo(() => unitPrice * qty, [unitPrice, qty]);

    if (!open || !dish) return null;

    const { Icon, label } = categoryIcon(dish);
    const isSpicy = dish?.tags?.some((t) => String(t).toLowerCase().includes("piccante"));

    return (
        <div className="fixed inset-0 z-[100]">
            {/* overlay */}
            <button className="absolute inset-0 bg-black/40" aria-label="Chiudi" onClick={onClose} />

            {/* modal */}
            <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-[860px] -translate-x-1/2 -translate-y-1/2">
                <div className="ui-card overflow-hidden">
                    {/* header */}
                    <div
                        className="p-5 md:p-6 border-b border-[rgba(20,20,20,0.08)]"
                        style={{
                            background:
                                "radial-gradient(520px 240px at 10% 0%, rgba(255,200,64,0.20), transparent 55%)," +
                                "radial-gradient(420px 260px at 100% 20%, rgba(12,74,110,0.10), transparent 60%)," +
                                "linear-gradient(180deg, rgba(255,255,255,0.86), rgba(255,255,255,0.96))",
                        }}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(212,170,55,0.22)] bg-[rgba(255,200,64,0.12)]">
                                        <Icon size={18} />
                                    </span>

                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="ui-chip">{label}</span>
                                            {isSpicy ? (
                                                <span className="ui-chip inline-flex items-center gap-2">
                                                    <Flame size={14} />
                                                    Piccante
                                                </span>
                                            ) : null}
                                        </div>

                                        <h3 className="mt-2 text-xl md:text-2xl font-black">{dish.name}</h3>
                                    </div>
                                </div>

                                {dish.desc ? <p className="mt-3 ui-muted text-sm">{dish.desc}</p> : null}
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="rounded-xl border border-[rgba(20,20,20,0.12)] bg-[rgba(255,255,255,0.75)] px-3 py-2 text-sm font-black">
                                    € {Number(unitPrice).toFixed(2)}
                                </div>

                                <button onClick={onClose} className="ui-btn" type="button" aria-label="Chiudi">
                                    <span className="inline-flex items-center gap-2">
                                        <X size={16} />
                                        Chiudi
                                    </span>
                                </button>
                            </div>
                        </div>

                        {dish.tags?.length ? (
                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="ui-chip inline-flex items-center gap-2">
                                    <Tags size={14} />
                                    Tag
                                </span>
                                {dish.tags.slice(0, 8).map((t) => (
                                    <span key={t} className="ui-chip">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        ) : null}
                    </div>

                    {/* body */}
                    <div className="p-5 md:p-6 grid gap-4">
                        {/* notes */}
                        <div className="ui-soft p-4">
                            <div className="flex items-center gap-2 text-sm font-black">
                                <StickyNote size={16} />
                                Note (opzionale)
                            </div>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="ui-input mt-3"
                                style={{ minHeight: 110 }}
                                placeholder="Es. senza aglio, cottura media, allergie…"
                            />
                        </div>

                        {/* qty + CTA */}
                        <div className="ui-soft p-4">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-2">
                                    <button
                                        className="ui-btn"
                                        type="button"
                                        onClick={() => setQty((v) => Math.max(1, v - 1))}
                                        aria-label="Diminuisci"
                                    >
                                        <Minus size={16} />
                                    </button>

                                    <div className="min-w-[54px] text-center text-lg font-black">{qty}</div>

                                    <button
                                        className="ui-btn"
                                        type="button"
                                        onClick={() => setQty((v) => v + 1)}
                                        aria-label="Aumenta"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <button
                                    className="ui-btn-gold w-full sm:w-auto"
                                    type="button"
                                    onClick={() => onConfirm?.({ dish, qty, notes })}
                                >
                                    <span>Aggiungi • € {Number(totalPrice).toFixed(2)}</span>
                                </button>
                            </div>

                            <div className="mt-2 ui-muted text-xs">(Demo) Le note vengono salvate nel carrello.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
