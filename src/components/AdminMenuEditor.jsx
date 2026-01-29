import { useMemo, useState } from "react";
import { loadJSON, saveJSON, LS_MENU, defaultMenu } from "../data/storage.js";

function uid(prefix) {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export default function AdminMenuEditor() {
    const initial = useMemo(() => loadJSON(LS_MENU, defaultMenu()), []);
    const [menu, setMenu] = useState(initial);

    function save() {
        saveJSON(LS_MENU, menu);
        alert("Menù salvato ✅");
    }

    function update(path, value) {
        // path: array di keys
        setMenu((prev) => {
            const next = structuredClone(prev);
            let ref = next;
            for (let i = 0; i < path.length - 1; i++) ref = ref[path[i]];
            ref[path[path.length - 1]] = value;
            return next;
        });
    }

    function addItem(section) {
        // section: 'lunch.items' | 'dinner.meat' | 'dinner.fish' | 'pizza'
        const newItem = { id: uid("dish"), name: "Nuovo piatto", desc: "", price: 0 };
        const [a, b] = section.split(".");
        if (b) update([a, b], [...(menu[a][b] || []), newItem]);
        else update([a], [...(menu[a] || []), newItem]);
    }

    function removeItem(section, id) {
        const [a, b] = section.split(".");
        const arr = b ? menu[a][b] : menu[a];
        const nextArr = (arr || []).filter((x) => x.id !== id);
        if (b) update([a, b], nextArr);
        else update([a], nextArr);
    }

    function patchItem(section, id, patch) {
        const [a, b] = section.split(".");
        const arr = b ? menu[a][b] : menu[a];
        const nextArr = (arr || []).map((x) => (x.id === id ? { ...x, ...patch } : x));
        if (b) update([a, b], nextArr);
        else update([a], nextArr);
    }

    function ListEditor({ title, section, items }) {
        return (
            <div className="rounded-3xl bg-neutral-950/40 p-5 ring-1 ring-white/10">
                <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-black">{title}</h3>
                    <button
                        onClick={() => addItem(section)}
                        className="rounded-full bg-white/5 px-4 py-2 text-xs font-bold ring-1 ring-white/10 hover:bg-white/10"
                    >
                        + Aggiungi
                    </button>
                </div>

                <div className="mt-4 grid gap-3">
                    {(items || []).map((it) => (
                        <div key={it.id} className="grid gap-2 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                            <div className="grid gap-2 md:grid-cols-3">
                                <input
                                    value={it.name}
                                    onChange={(e) => patchItem(section, it.id, { name: e.target.value })}
                                    className="rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 text-sm outline-none focus:border-white/20 md:col-span-2"
                                    placeholder="Nome piatto"
                                />
                                <input
                                    value={it.price}
                                    onChange={(e) => patchItem(section, it.id, { price: Number(e.target.value) })}
                                    type="number"
                                    step="0.5"
                                    className="rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 text-sm outline-none focus:border-white/20"
                                    placeholder="Prezzo"
                                />
                            </div>

                            <textarea
                                value={it.desc}
                                onChange={(e) => patchItem(section, it.id, { desc: e.target.value })}
                                className="min-h-20 rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 text-sm outline-none focus:border-white/20"
                                placeholder="Descrizione"
                            />

                            <input
                                value={it.image || ""}
                                onChange={(e) => patchItem(section, it.id, { image: e.target.value })}
                                className="rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 text-sm outline-none focus:border-white/20"
                                placeholder="URL immagine (opzionale)"
                            />

                            <div className="flex justify-end">
                                <button
                                    onClick={() => removeItem(section, it.id)}
                                    className="rounded-full bg-white/5 px-4 py-2 text-xs font-bold ring-1 ring-white/10 hover:bg-white/10"
                                >
                                    Rimuovi
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <section className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                    <h2 className="text-2xl font-black">Editor Menù</h2>
                    <p className="text-sm text-white/60">Pranzo fisso • Cena • Pizza sempre</p>
                </div>
                <button
                    onClick={save}
                    className="rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 px-5 py-3 text-sm font-black text-neutral-950 shadow-lg shadow-fuchsia-600/15 hover:brightness-110"
                >
                    Salva menù
                </button>
            </div>

            {/* Lunch meta */}
            <div className="rounded-3xl bg-neutral-950/40 p-5 ring-1 ring-white/10">
                <h3 className="text-lg font-black">Pranzo fisso</h3>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                    <label className="grid gap-2">
                        <span className="text-xs font-bold text-white/60">Data (YYYY-MM-DD)</span>
                        <input
                            value={menu.lunch.dateISO}
                            onChange={(e) => update(["lunch", "dateISO"], e.target.value)}
                            className="rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 text-sm outline-none focus:border-white/20"
                        />
                    </label>
                    <label className="grid gap-2 md:col-span-2">
                        <span className="text-xs font-bold text-white/60">Titolo</span>
                        <input
                            value={menu.lunch.title}
                            onChange={(e) => update(["lunch", "title"], e.target.value)}
                            className="rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 text-sm outline-none focus:border-white/20"
                        />
                    </label>
                    <label className="grid gap-2 md:col-span-3">
                        <span className="text-xs font-bold text-white/60">Note</span>
                        <input
                            value={menu.lunch.notes}
                            onChange={(e) => update(["lunch", "notes"], e.target.value)}
                            className="rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 text-sm outline-none focus:border-white/20"
                        />
                    </label>
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                <ListEditor title="Pranzo • Piatti del giorno" section="lunch.items" items={menu.lunch.items} />
                <ListEditor title="Cena • Carne" section="dinner.meat" items={menu.dinner.meat} />
                <ListEditor title="Cena • Pesce" section="dinner.fish" items={menu.dinner.fish} />
            </div>

            <ListEditor title="Pizza (sempre)" section="pizza" items={menu.pizza} />
        </section>
    );
}
