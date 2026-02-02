// src/components/admin/AdminPartyMenuEditor.jsx
import { useMemo, useState } from "react";
import { loadJSON, saveJSON, LS_MENU, defaultMenu } from "../../data/storage.js";

function uid(prefix = "dish") {
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
                {right ? <div className="flex gap-2 flex-wrap">{right}</div> : null}
            </div>
        </div>
    );
}

function BlockTitle({ chip, title, subtitle }) {
    return (
        <div className="ui-card p-5 md:p-6">
            <div className="min-w-0">
                <div className="ui-chip">{chip}</div>
                <div className="mt-2 text-xl md:text-2xl font-black">{title}</div>
                {subtitle ? <div className="mt-1 ui-muted text-sm">{subtitle}</div> : null}
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
                            onPatch({ price: v === "" ? null : Number(v) });
                        }}
                        type="number"
                        step="0.5"
                        className="ui-input"
                        placeholder="es. 12"
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
                    placeholder="Descrizione breve (facoltativa)..."
                />
            </label>

            <label className="grid gap-2">
                <span className="text-xs font-bold ui-muted">URL immagine (opzionale)</span>
                <input
                    value={it.image || ""}
                    onChange={(e) => onPatch({ image: e.target.value })}
                    className="ui-input"
                    placeholder="https://..."
                />
            </label>

            <div className="flex justify-end">
                <button onClick={onRemove} className="ui-btn" type="button">
                    <span>Rimuovi</span>
                </button>
            </div>
        </div>
    );
}

function DishList({ id, title, subtitle, items, onAdd, onPatch, onRemove }) {
    return (
        <section id={id} className="grid gap-4 scroll-mt-24">
            <div className="ui-card p-5 md:p-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div className="min-w-0">
                        <div className="ui-chip">{title}</div>
                        {subtitle ? <div className="mt-2 ui-muted text-sm">{subtitle}</div> : null}
                    </div>

                    <button onClick={onAdd} className="ui-btn" type="button">
                        <span>+ Aggiungi</span>
                    </button>
                </div>
            </div>

            <div className="grid gap-4">
                {(items || []).length === 0 ? (
                    <div className="ui-soft p-5">
                        <div className="font-black">Nessuna voce</div>
                        <div className="ui-muted text-sm mt-1">Aggiungi un elemento per questa sezione.</div>
                        <button onClick={onAdd} className="ui-btn mt-4" type="button">
                            <span>+ Aggiungi</span>
                        </button>
                    </div>
                ) : (
                    (items || []).map((it) => (
                        <DishRow key={it.id} it={it} onPatch={(patch) => onPatch(it.id, patch)} onRemove={() => onRemove(it.id)} />
                    ))
                )}
            </div>
        </section>
    );
}

const PARTY_SECTIONS = [
    { key: "antipasto", label: "Antipasto" },
    { key: "primo", label: "Primo" },
    { key: "secondo", label: "Secondo" },
    { key: "dolce", label: "Dolce" },
    { key: "bevande", label: "Bevande" },
];

export default function AdminPartyMenuEditor() {
    const initial = useMemo(() => loadJSON(LS_MENU, defaultMenu()), []);
    const [menu, setMenu] = useState(initial);

    const party = menu?.party || defaultMenu().party;

    // ✅ MERGE-SAFE SAVE (non cancella lunch/altro)
    function save() {
        const latest = loadJSON(LS_MENU, defaultMenu());
        const next = { ...latest, party: menu.party };
        saveJSON(LS_MENU, next);
        alert("Menù festa salvato ✅");
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

    function addItem(sectionKey) {
        const newItem = {
            id: uid("party"),
            name: "Nuova voce",
            desc: "",
            price: null,
            image: "",
            course: sectionKey === "bevande" ? "bevande" : sectionKey === "dolce" ? "dolci" : sectionKey,
        };

        const current = party?.[sectionKey] || [];
        update(["party", sectionKey], [...current, newItem]);
    }

    function patchItem(sectionKey, id, patch) {
        const current = party?.[sectionKey] || [];
        const nextArr = current.map((x) => (x.id === id ? { ...x, ...patch } : x));
        update(["party", sectionKey], nextArr);
    }

    function removeItem(sectionKey, id) {
        const current = party?.[sectionKey] || [];
        const nextArr = current.filter((x) => x.id !== id);
        update(["party", sectionKey], nextArr);
    }

    function clearAll() {
        if (!confirm("Vuoi svuotare TUTTO il Menù festa?")) return;
        const base = defaultMenu().party;
        update(["party"], { ...base, active: false, title: party?.title || base.title, notes: "" });
    }

    const totalItems = PARTY_SECTIONS.reduce((sum, s) => sum + ((party?.[s.key] || []).length || 0), 0) || 0;

    return (
        <div className="grid gap-5">
            <SectionHeader
                chip="Eventi"
                title="Menù festa"
                subtitle="Crea un menù dedicato a cerimonie/eventi. Se lo attivi, comparirà in MenuPage nella tab “Menù festa”."
                right={
                    <>
                        <button onClick={clearAll} className="ui-btn" type="button">
                            <span>Svuota</span>
                        </button>
                        <button onClick={save} className="ui-btn-gold" type="button">
                            <span>Salva</span>
                        </button>
                    </>
                }
            />

            <div className="ui-card p-5 md:p-7">
                <div className="grid gap-4 md:grid-cols-[1fr_240px] md:items-start">
                    <div className="grid gap-3">
                        <div className="ui-chip inline-flex">Configurazione</div>

                        <label className="grid gap-2">
                            <span className="text-xs font-bold ui-muted">Titolo</span>
                            <input
                                value={party.title || ""}
                                onChange={(e) => update(["party", "title"], e.target.value)}
                                className="ui-input"
                                placeholder="Es. Menù festa • Cerimonie"
                            />
                        </label>

                        <label className="grid gap-2">
                            <span className="text-xs font-bold ui-muted">Note</span>
                            <textarea
                                value={party.notes || ""}
                                onChange={(e) => update(["party", "notes"], e.target.value)}
                                className="ui-input"
                                style={{ minHeight: 110 }}
                                placeholder="Es. Menù su prenotazione • minimo persone • bevande incluse..."
                            />
                        </label>
                    </div>

                    <div className="ui-soft p-5 grid gap-3">
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-black">Stato</div>
                            <button
                                onClick={() => update(["party", "active"], !party.active)}
                                className={[
                                    "ui-btn",
                                    party.active
                                        ? "bg-[rgba(255,200,64,0.14)] border border-[rgba(212,170,55,0.26)]"
                                        : "opacity-80",
                                ].join(" ")}
                                type="button"
                            >
                                <span>{party.active ? "Attivo" : "Disattivo"}</span>
                            </button>
                        </div>

                        <div className="text-xs ui-muted">
                            Voci totali: <span className="font-bold">{totalItems}</span>
                        </div>

                        <div className="text-xs ui-muted">Suggerimento: attivalo solo quando hai inserito almeno una voce.</div>
                    </div>
                </div>
            </div>

            <BlockTitle
                chip="Struttura"
                title="Antipasto • Primo • Secondo • Dolce • Bevande"
                subtitle="Aggiungi elementi per ogni portata. Prezzo facoltativo: se lo lasci vuoto, verrà mostrato senza prezzo."
            />

            <div className="grid gap-6">
                {PARTY_SECTIONS.map((s) => (
                    <DishList
                        key={s.key}
                        id={`admin-party-${s.key}`}
                        title={s.label}
                        subtitle={`Sezione “${s.label}” del Menù festa.`}
                        items={party?.[s.key] || []}
                        onAdd={() => addItem(s.key)}
                        onPatch={(id, patch) => patchItem(s.key, id, patch)}
                        onRemove={(id) => removeItem(s.key, id)}
                    />
                ))}
            </div>
        </div>
    );
}
