import { useMemo, useState } from "react";
import DishCard from "../../components/DishCard.jsx";
import { loadJSON, LS_MENU } from "../../data/storage.js";

export default function MenuPage() {
  const [service, setService] = useState("lunch"); // lunch | dinner

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("lp_cart") || "[]");
    } catch {
      return [];
    }
  });

  function persist(next) {
    setCart(next);
    localStorage.setItem("lp_cart", JSON.stringify(next));
  }

  function addToCart(dish) {
    const next = (() => {
      const found = cart.find((x) => x.id === dish.id);
      if (found) return cart.map((x) => (x.id === dish.id ? { ...x, qty: x.qty + 1 } : x));
      return [...cart, { id: dish.id, name: dish.name, price: dish.price, qty: 1 }];
    })();
    persist(next);
  }

  const menu = useMemo(() => loadJSON(LS_MENU, null), []);
  const lunch = menu?.lunch;
  const dinner = menu?.dinner;
  const pizza = menu?.pizza || [];

  const totalItems = useMemo(() => cart.reduce((s, it) => s + it.qty, 0), [cart]);

  return (
    <div className="grid gap-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Menu</h1>
          <p className="mt-2 text-white/70">
            Pranzo fisso del giorno • Cena carne & pesce • Pizza sempre
          </p>
        </div>

        <div className="rounded-2xl bg-white/5 px-4 py-3 text-sm ring-1 ring-white/10">
          Carrello: <span className="font-black">{totalItems}</span> articoli
          <span className="text-white/40"> • </span>
          (Vai su <span className="font-semibold">Ordina</span>)
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setService("lunch")}
          className={[
            "rounded-full px-5 py-3 text-sm font-bold ring-1 transition",
            service === "lunch"
              ? "bg-white/10 ring-white/15"
              : "bg-white/5 ring-white/10 hover:bg-white/10",
          ].join(" ")}
        >
          Pranzo
        </button>
        <button
          onClick={() => setService("dinner")}
          className={[
            "rounded-full px-5 py-3 text-sm font-bold ring-1 transition",
            service === "dinner"
              ? "bg-white/10 ring-white/15"
              : "bg-white/5 ring-white/10 hover:bg-white/10",
          ].join(" ")}
        >
          Cena
        </button>
      </div>

      {/* PRANZO FISSO */}
      {service === "lunch" && lunch && (
        <section className="grid gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm text-white/60">
              Data: <span className="font-semibold text-white/80">{lunch.dateISO}</span>
            </div>
            <h2 className="mt-2 text-2xl font-black">{lunch.title}</h2>
            {lunch.notes && <p className="mt-2 text-white/70">{lunch.notes}</p>}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {lunch.items?.map((dish) => (
              <DishCard
                key={dish.id}
                dish={{
                  ...dish,
                  image:
                    dish.image ||
                    "https://images.unsplash.com/photo-1604909053196-1f2d5719d1e9?auto=format&fit=crop&w=1400&q=80",
                }}
                onAdd={addToCart}
              />
            ))}
          </div>
        </section>
      )}

      {/* CENA */}
      {service === "dinner" && dinner && (
        <div className="grid gap-8">
          <section className="grid gap-4">
            <h2 className="text-2xl font-black">Carne</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dinner.meat?.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={{
                    ...dish,
                    image:
                      dish.image ||
                      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1400&q=80",
                  }}
                  onAdd={addToCart}
                />
              ))}
            </div>
          </section>

          <section className="grid gap-4">
            <h2 className="text-2xl font-black">Pesce</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dinner.fish?.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={{
                    ...dish,
                    image:
                      dish.image ||
                      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1400&q=80",
                  }}
                  onAdd={addToCart}
                />
              ))}
            </div>
          </section>
        </div>
      )}

      {/* PIZZA SEMPRE */}
      <section className="grid gap-4">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-2xl font-black">Pizza (sempre)</h2>
          <div className="text-sm text-white/60">Disponibile pranzo e cena</div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pizza.map((dish) => (
            <DishCard
              key={dish.id}
              dish={{
                ...dish,
                image:
                  dish.image ||
                  "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?auto=format&fit=crop&w=1400&q=80",
              }}
              onAdd={addToCart}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
