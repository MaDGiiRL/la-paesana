// src/components/admin/AdminMenuEditor.jsx
import { useMemo, useState } from "react";
import { loadJSON, saveJSON, LS_MENU, defaultMenu } from "../../data/storage.js";

function uid(prefix) {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function SectionHeader({ chip, title, subtitle, right }) {
    return (
        <div className="ui-card p-5 md:p-7">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div className="min-w-0">
                    <div className="ui-chip">{chip}</div>
                    <h2 className="mt-3 text-2xl md:text-3xl font-black">{title}</h2>
                    {subtitle ? <p className="mt-1 ui-muted text-sm">{subtitle}</p> : null}
                </div>
                {right ? <div className="flex gap-2">{right}</div> : null}
            </div>
        </div>
    );
}

function DishRow({ it, onPatch, onRemove }) {
    return (
        <div className="ui-soft p-5 md:p-6 grid gap-4">
            <div className="grid gap-3 md:grid-cols-[1fr_180px]">
                <label className="grid gap-2">
                    <span className="text-xs font-bold ui-muted">Nome</span>
                    <input
                        value={it.name || ""}
                        onChange={(e) => onPatch({ name: e.target.value })}
                        className="ui-input"
                        placeholder="Nome piatto"
                    />
                </label>

                <label className="grid gap-2">
                    <span className="text-xs font-bold ui-muted">Prezzo (€)</span>
                    <input
                        value={it.price ?? ""}
                        onChange={(e) => {
                            const v = e.target.value;
                            onPatch({ price: v === "" ? 0 : Number(v) });
                        }}
                        type="number"
                        step="0.5"
                        className="ui-input"
                        placeholder="0"
                    />
                </label>
            </div>

            <label className="grid gap-2">
                <span className="text-xs font-bold ui-muted">Descrizione</span>
                <textarea
                    value={it.desc || ""}
                    onChange={(e) => onPatch({ desc: e.target.value })}
                    className="ui-input"
                    style={{ minHeight: 110 }}
                    placeholder="Descrizione breve (visibile nel menu)..."
                />
            </label>

            <div className="flex justify-end">
                <button onClick={onRemove} className="ui-btn" type="button">
                    <span>Rimuovi piatto</span>
                </button>
            </div>
        </div>
    );
}

export default function AdminMenuEditor() {
    const initial = useMemo(() => loadJSON(LS_MENU, defaultMenu()), []);
    const [menu, setMenu] = useState(initial);

    // ✅ MERGE-SAFE SAVE (non cancella party)
    function save() {
        const latest = loadJSON(LS_MENU, defaultMenu());

        const next = {
            ...latest,
            lunch: menu.lunch,
            regularItems: menu.regularItems,
            seasonal: menu.seasonal,
            // party resta quello già presente in latest
        };

        saveJSON(LS_MENU, next);
        alert("Menù del giorno salvato ✅");
    }

    function update(path, value) {
        setMenu((prev) => {
            const next = structuredClone(prev || defaultMenu());
            let ref = next;
            for (let i = 0; i < path.length - 1; i++) ref = ref[path[i]];
            ref[path[path.length - 1]] = value;
            return next;
        });
    }

    function addLunchItem() {
        const newItem = { id: uid("dish"), name: "Nuovo piatto", desc: "", price: 0 };
        update(["lunch", "items"], [...(menu.lunch?.items || []), newItem]);
    }

    function patchLunchItem(id, patch) {
        const nextArr = (menu.lunch?.items || []).map((x) => (x.id === id ? { ...x, ...patch } : x));
        update(["lunch", "items"], nextArr);
    }

    function removeLunchItem(id) {
        const nextArr = (menu.lunch?.items || []).filter((x) => x.id !== id);
        update(["lunch", "items"], nextArr);
    }

    return (
        <div className="grid gap-5">
            <SectionHeader
                chip="Menù"
                title="Editor Menù del giorno"
                subtitle="Qui gestisci SOLO il pranzo fisso. Il menù normale viene dal PDF (seed) e compare solo nella pagina Menu."
                right={
                    <button onClick={save} className="ui-btn-gold" type="button">
                        <span>Salva</span>
                    </button>
                }
            />

            <div className="ui-card p-5 md:p-7 grid gap-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="ui-chip">Menù fisso</div>
                        <h3 className="mt-2 text-xl md:text-2xl font-black">Pranzo del giorno</h3>
                        <p className="mt-1 ui-muted text-sm">Questo appare nella tab “Menù fisso” in MenuPage.</p>
                    </div>

                    <button onClick={addLunchItem} className="ui-btn" type="button">
                        <span>+ Aggiungi piatto</span>
                    </button>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                    <label className="grid gap-2">
                        <span className="text-xs font-bold ui-muted">Data (YYYY-MM-DD)</span>
                        <input
                            value={menu.lunch?.dateISO || ""}
                            onChange={(e) => update(["lunch", "dateISO"], e.target.value)}
                            className="ui-input"
                        />
                    </label>

                    <label className="grid gap-2 md:col-span-2">
                        <span className="text-xs font-bold ui-muted">Titolo</span>
                        <input
                            value={menu.lunch?.title || ""}
                            onChange={(e) => update(["lunch", "title"], e.target.value)}
                            className="ui-input"
                            placeholder="Es. Menù fisso del giorno"
                        />
                    </label>

                    <label className="grid gap-2 md:col-span-3">
                        <span className="text-xs font-bold ui-muted">Note</span>
                        <input
                            value={menu.lunch?.notes || ""}
                            onChange={(e) => update(["lunch", "notes"], e.target.value)}
                            className="ui-input"
                            placeholder="Es. include coperto / bevanda esclusa..."
                        />
                    </label>
                </div>
            </div>

            <div className="grid gap-4">
                {(menu.lunch?.items || []).length === 0 ? (
                    <div className="ui-soft p-5">
                        <div className="font-black">Nessun piatto del giorno</div>
                        <div className="ui-muted text-sm mt-1">Aggiungi i piatti per il pranzo fisso.</div>
                        <button onClick={addLunchItem} className="ui-btn mt-4" type="button">
                            <span>+ Aggiungi piatto</span>
                        </button>
                    </div>
                ) : (
                    (menu.lunch.items || []).map((it) => (
                        <DishRow
                            key={it.id}
                            it={it}
                            onPatch={(patch) => patchLunchItem(it.id, patch)}
                            onRemove={() => removeLunchItem(it.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
