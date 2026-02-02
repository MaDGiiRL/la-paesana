// src/pages/menupage/index.jsx
import { useMemo, useState, useEffect, useCallback } from "react";
import DishCard from "../../components/DishCard.jsx";
import CartSidebar from "../../components/CartSidebar.jsx";
import DishModal from "../../components/DishModal.jsx";
import { loadJSON, LS_MENU, LS_CART } from "../../data/storage.js";
import MENU_SEED from "../../data/menu.js";

// Helpers per righe carrello “tipo Just Eat”
const lineIdOf = (id, notes = "") => `${id}::${(notes || "").trim()}`;
const normalizeCart = (cart = []) =>
  cart.map((x) => ({
    ...x,
    notes: x.notes || "",
    lineId: x.lineId || lineIdOf(x.id, x.notes || ""),
  }));

const COURSE_ORDER = [
  { key: "antipasti", label: "Antipasti" },
  { key: "primi", label: "Primi" },
  { key: "secondi", label: "Secondi" },
  { key: "contorni", label: "Contorni" },
  { key: "dolci", label: "Dolci" },
  { key: "bevande", label: "Bevande" },
  { key: "pizza", label: "Pizza" },
];

const PARTY_ORDER = [
  { key: "antipasto", label: "Antipasto" },
  { key: "primo", label: "Primo" },
  { key: "secondo", label: "Secondo" },
  { key: "dolce", label: "Dolce" },
  { key: "bevande", label: "Bevande" },
];

export default function MenuPage() {
  // ✅ menu reattivo
  const [menu, setMenu] = useState(() => loadJSON(LS_MENU, null));
  const refreshMenu = useCallback(() => setMenu(loadJSON(LS_MENU, null)), []);

  useEffect(() => {
    const onFocus = () => refreshMenu();
    const onStorage = (e) => {
      if (e.key === LS_MENU) refreshMenu();
    };

    window.addEventListener("focus", onFocus);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("storage", onStorage);
    };
  }, [refreshMenu]);

  const [tab, setTab] = useState("regular");
  const [q, setQ] = useState("");

  const [cart, setCart] = useState(() => {
    try {
      return normalizeCart(JSON.parse(localStorage.getItem(LS_CART) || "[]"));
    } catch {
      return [];
    }
  });

  // Modal
  const [dishModalOpen, setDishModalOpen] = useState(false);
  const [openDish, setOpenDish] = useState(null);

  function persist(next) {
    const normalized = normalizeCart(next);
    setCart(normalized);
    localStorage.setItem(LS_CART, JSON.stringify(normalized));
  }

  function openModal(dish) {
    setOpenDish(dish);
    setDishModalOpen(true);
  }
  function closeModal() {
    setDishModalOpen(false);
    setOpenDish(null);
  }

  function addToCart(dish, qty = 1, notes = "") {
    const lineId = lineIdOf(dish.id, notes);
    const found = cart.find((x) => x.lineId === lineId);

    const next = found
      ? cart.map((x) => (x.lineId === lineId ? { ...x, qty: x.qty + qty } : x))
      : [
        ...cart,
        {
          id: dish.id,
          name: dish.name,
          price: Number(dish.price || 0),
          qty,
          notes: (notes || "").trim(),
          lineId,
        },
      ];

    persist(next);
  }

  function inc(lineId) {
    persist(cart.map((x) => (x.lineId === lineId ? { ...x, qty: x.qty + 1 } : x)));
  }
  function dec(lineId) {
    persist(cart.map((x) => (x.lineId === lineId ? { ...x, qty: Math.max(1, x.qty - 1) } : x)));
  }
  function remove(lineId) {
    persist(cart.filter((x) => x.lineId !== lineId));
  }

  const totalItems = cart.reduce((s, x) => s + x.qty, 0);

  // ======= DATA MENU =======
  const fixed = menu?.lunchFixed || menu?.lunch || null;
  const seasonal = menu?.seasonal || null;

  // ✅ Menù festa
  const party = menu?.party || null;

  // ✅ FIX: tab visibile se active=true (anche se vuoto)
  const partyActive = !!party?.active;

  const regularItems = useMemo(() => {
    const seed = MENU_SEED?.regularItems || [];
    const admin = menu?.regularItems || [];
    return [...seed, ...admin];
  }, [menu]);

  const tabs = useMemo(() => {
    const out = [];
    if (fixed) out.push({ key: "fixed", label: "Menù fisso" });
    out.push({ key: "regular", label: "Menù normale" });
    if (partyActive) out.push({ key: "party", label: party?.title || "Menù festa" });
    if (seasonal) out.push({ key: "seasonal", label: seasonal.title || "Menù stagione" });
    return out;
  }, [fixed, seasonal, partyActive, party?.title]);

  useEffect(() => {
    const ok = tabs.some((t) => t.key === tab);
    if (!ok) setTab("regular");
  }, [tabs, tab]);

  const match = (dish) => {
    if (!q.trim()) return true;
    const t = q.trim().toLowerCase();
    return dish.name?.toLowerCase().includes(t) || dish.desc?.toLowerCase().includes(t);
  };

  const courseSections = useMemo(() => {
    if (tab !== "regular") return [];

    const map = new Map();
    for (const it of regularItems || []) {
      const course = String(it.course || "altro").toLowerCase();
      if (!map.has(course)) map.set(course, []);
      map.get(course).push(it);
    }

    const ordered = [];
    for (const c of COURSE_ORDER) {
      const items = (map.get(c.key) || []).filter(match);
      if (items.length) {
        ordered.push({
          id: `course-${c.key}`,
          key: c.key,
          title: c.label,
          items,
        });
      }
    }

    const other = (map.get("altro") || []).filter(match);
    if (other.length) ordered.push({ id: "course-altro", key: "altro", title: "Altro", items: other });

    return ordered;
  }, [tab, regularItems, q]);

  const partySections = useMemo(() => {
    if (tab !== "party") return [];
    if (!party) return [];

    return PARTY_ORDER.map((s) => ({
      id: `party-${s.key}`,
      key: s.key,
      title: s.label,
      items: (party[s.key] || []).filter(match),
    })).filter((sec) => sec.items.length > 0);
  }, [tab, party, q]);

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="ui-page pb-24 md:pb-0">
      <div className="ui-card p-4 md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h1 className="ui-h1">Menu</h1>
            <p className="ui-muted text-sm">{MENU_SEED?.meta?.note || "Menù ristorante"}</p>

            {MENU_SEED?.meta?.copertoEServizio != null ? (
              <p className="mt-1 ui-muted text-xs">
                Coperto e servizio: <strong>€ {Number(MENU_SEED.meta.copertoEServizio).toFixed(2)}</strong>
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <div className="ui-chip">
              Carrello: <strong>{totalItems}</strong>
            </div>

            <a href="/ordina" className="ui-btn-gold">
              <span>Checkout</span>
            </a>
          </div>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
          <input value={q} onChange={(e) => setQ(e.target.value)} className="ui-input" placeholder="Cerca piatto o ingrediente…" />

          <div className="flex gap-2 overflow-x-auto md:justify-end">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={[
                  "ui-btn whitespace-nowrap",
                  tab === t.key ? "bg-[rgba(255,200,64,0.14)] border border-[rgba(212,170,55,0.26)]" : "",
                ].join(" ")}
                type="button"
              >
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {tab === "regular" ? (
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {courseSections.map((s) => (
              <button key={s.id} onClick={() => scrollTo(s.id)} className="ui-btn whitespace-nowrap" type="button">
                <span>{s.title}</span>
              </button>
            ))}
          </div>
        ) : null}

        {tab === "party" ? (
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {PARTY_ORDER.map((s) => (
              <button key={s.key} onClick={() => scrollTo(`party-${s.key}`)} className="ui-btn whitespace-nowrap" type="button">
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_360px]">
        <main className="grid gap-6">
          {tab === "fixed" && fixed && (
            <section className="grid gap-4">
              <div className="ui-card p-4 md:p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="ui-chip">Pranzo • Menù fisso</div>
                    <h2 className="mt-2 ui-h2">{fixed.title || "Menù fisso del giorno"}</h2>
                    {fixed.dateISO ? (
                      <p className="mt-1 ui-muted text-sm">
                        Data: <strong>{fixed.dateISO}</strong>
                      </p>
                    ) : null}
                    {fixed.notes ? <p className="mt-2 ui-muted text-sm">{fixed.notes}</p> : null}
                  </div>
                  <div className="ui-chip">{fixed.items?.length ?? 0} piatti</div>
                </div>
              </div>

              <div className="grid gap-3">
                {fixed.items?.filter(match).map((dish) => (
                  <div key={dish.id} role="button" tabIndex={0} onClick={() => openModal(dish)} onKeyDown={(e) => e.key === "Enter" && openModal(dish)} className="cursor-pointer">
                    <DishCard dish={dish} onAdd={(d) => addToCart(d, 1, "")} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {tab === "regular" && (
            <section className="grid gap-8">
              {courseSections.length === 0 ? (
                <div className="ui-soft p-5">
                  <div className="font-black">Nessun piatto</div>
                  <div className="ui-muted text-sm mt-1">Non ci sono piatti da mostrare.</div>
                </div>
              ) : (
                courseSections.map((sec) => (
                  <div key={sec.id} id={sec.id} className="scroll-mt-[140px]">
                    <div className="mb-3 flex items-end justify-between">
                      <div>
                        <h2 className="ui-h2">{sec.title}</h2>
                        <p className="ui-muted text-sm">Selezione {sec.title.toLowerCase()}</p>
                      </div>
                      <span className="ui-chip">{sec.items.length}</span>
                    </div>

                    <div className="grid gap-3">
                      {sec.items.map((dish) => (
                        <div key={dish.id} role="button" tabIndex={0} onClick={() => openModal(dish)} onKeyDown={(e) => e.key === "Enter" && openModal(dish)} className="cursor-pointer">
                          <DishCard dish={dish} onAdd={(d) => addToCart(d, 1, "")} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </section>
          )}

          {tab === "party" && party && (
            <section className="grid gap-6">
              <div className="ui-card p-4 md:p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="ui-chip">Eventi • Menù festa</div>
                    <h2 className="mt-2 ui-h2">{party.title || "Menù festa"}</h2>
                    {party.notes ? <p className="mt-2 ui-muted text-sm">{party.notes}</p> : null}
                  </div>
                  <div className="ui-chip">{partySections.reduce((s, x) => s + x.items.length, 0)} voci</div>
                </div>
              </div>

              {partySections.length === 0 ? (
                <div className="ui-soft p-5">
                  <div className="font-black">Menù festa non disponibile</div>
                  <div className="ui-muted text-sm mt-1">Contattaci per info o torna più tardi.</div>
                </div>
              ) : (
                partySections.map((sec) => (
                  <div key={sec.id} id={sec.id} className="scroll-mt-[140px]">
                    <div className="mb-3 flex items-end justify-between">
                      <div>
                        <h2 className="ui-h2">{sec.title}</h2>
                        <p className="ui-muted text-sm">Selezione {sec.title.toLowerCase()}</p>
                      </div>
                      <span className="ui-chip">{sec.items.length}</span>
                    </div>

                    <div className="grid gap-3">
                      {sec.items.map((dish) => (
                        <div key={dish.id} role="button" tabIndex={0} onClick={() => openModal(dish)} onKeyDown={(e) => e.key === "Enter" && openModal(dish)} className="cursor-pointer">
                          <DishCard dish={dish} onAdd={(d) => addToCart(d, 1, "")} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </section>
          )}

          {tab === "seasonal" && seasonal && (
            <section className="grid gap-4">
              <div className="ui-card p-4 md:p-6">
                <div className="ui-chip">Menù stagione</div>
                <h2 className="mt-2 ui-h2">{seasonal.title || "Speciale stagionale"}</h2>
                <p className="mt-1 ui-muted text-sm">
                  {seasonal.fromISO ? `Dal ${seasonal.fromISO}` : ""} {seasonal.toISO ? `al ${seasonal.toISO}` : ""}
                </p>
                {seasonal.notes ? <p className="mt-2 ui-muted text-sm">{seasonal.notes}</p> : null}
              </div>

              <div className="grid gap-6">
                {(seasonal.sections || []).map((sec) => (
                  <div key={sec.name} className="grid gap-3">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="font-black">{sec.name}</div>
                        <div className="ui-muted text-sm">Selezione speciale</div>
                      </div>
                      <span className="ui-chip">{sec.items?.length ?? 0}</span>
                    </div>

                    <div className="grid gap-3">
                      {sec.items?.filter(match).map((dish) => (
                        <div key={dish.id} role="button" tabIndex={0} onClick={() => openModal(dish)} onKeyDown={(e) => e.key === "Enter" && openModal(dish)} className="cursor-pointer">
                          <DishCard dish={dish} onAdd={(d) => addToCart(d, 1, "")} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        <CartSidebar cart={cart} onInc={inc} onDec={dec} onRemove={remove} />
      </div>

      <div className="md:hidden fixed bottom-3 left-0 right-0 px-3">
        <div className="ui-card flex items-center justify-between px-4 py-3">
          <div className="text-sm">
            <div className="font-black">Carrello</div>
            <div className="ui-muted text-xs">{totalItems} articoli</div>
          </div>

          <a href="/ordina" className="ui-btn-gold">
            <span>Checkout</span>
          </a>
        </div>
      </div>

      <DishModal
        open={dishModalOpen}
        dish={openDish}
        onClose={closeModal}
        onConfirm={({ dish, qty, notes }) => {
          addToCart(dish, qty, notes);
          closeModal();
        }}
      />
    </div>
  );
}
