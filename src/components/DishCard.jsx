export default function DishCard({ dish, onAdd }) {
    return (
        <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:bg-white/7">
            <div className="aspect-[4/3] overflow-hidden">
                <img
                    src={dish.image}
                    alt={dish.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            </div>
            <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h3 className="text-lg font-black">{dish.name}</h3>
                        <p className="mt-1 text-sm text-white/65">{dish.desc}</p>
                    </div>
                    <div className="shrink-0 rounded-2xl bg-white/10 px-3 py-2 text-sm font-black ring-1 ring-white/10">
                        € {dish.price.toFixed(2)}
                    </div>
                </div>

                <button
                    onClick={() => onAdd?.(dish)}
                    className="mt-4 w-full rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 px-4 py-3 text-sm font-black text-neutral-950 shadow-lg shadow-fuchsia-600/15 transition hover:brightness-110"
                >
                    Aggiungi all’ordine
                </button>
            </div>
        </article>
    );
}
