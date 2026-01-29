import { useMemo } from "react";
import { Link } from "react-router-dom";
import Carousel from "../../components/Carousel.jsx";
import { loadJSON, LS_PROMOS } from "../../data/storage.js";

const slides = [
  {
    title: "Pizza contemporanea. Anima paesana.",
    subtitle: "Impasto leggero, cornicione alto, ingredienti di stagione.",
    image:
      "https://images.unsplash.com/photo-1601924928611-4d0b6b4f4b7b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Colori, profumi, forno acceso.",
    subtitle: "Pranzo fisso del giorno + pizza sempre disponibile.",
    image:
      "https://images.unsplash.com/photo-1548365328-9f547f6d6b34?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Cena elegante: carne & pesce.",
    subtitle: "E la pizza non manca mai. Ordina senza registrazione.",
    image:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function HomePage() {
  const promos = useMemo(() => {
    const all = loadJSON(LS_PROMOS, []);
    return all.filter((p) => p.active);
  }, []);

  return (
    <div className="grid gap-8">
      <Carousel items={slides} />

      {promos.length > 0 && (
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black tracking-tight">Promozioni</h2>
              <p className="mt-2 text-white/70">Attive oggi alla Paesana.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {promos.map((p) => (
              <div
                key={p.id}
                className="rounded-3xl bg-neutral-950/40 p-6 ring-1 ring-white/10"
              >
                <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold ring-1 ring-white/10">
                  {p.badge || "Promo"}
                </div>
                <div className="mt-3 text-xl font-black">{p.title}</div>
                <div className="mt-2 text-sm text-white/65">{p.subtitle}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-bold text-white/70">Pranzo</div>
          <div className="mt-2 text-xl font-black">Menù fisso del giorno</div>
          <p className="mt-2 text-sm text-white/60">
            Ogni giorno piatti nuovi. Quelli sono — zero indecisioni.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-bold text-white/70">Cena</div>
          <div className="mt-2 text-xl font-black">Carne & pesce</div>
          <p className="mt-2 text-sm text-white/60">
            Piatti curati, vibe moderna. E pizza sempre disponibile.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-bold text-white/70">Ordini</div>
          <div className="mt-2 text-xl font-black">Zero registrazione</div>
          <p className="mt-2 text-sm text-white/60">
            Compila i dati, scegli l’ora di arrivo, invia. Fine.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Pronto a ordinare?</h2>
            <p className="mt-2 text-white/70">
              Guarda il menu del giorno e crea il tuo ordine in 1 minuto.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/menu"
              className="rounded-full bg-white/5 px-5 py-3 text-sm font-bold ring-1 ring-white/10 hover:bg-white/10"
            >
              Vedi menu
            </Link>
            <Link
              to="/ordina"
              className="rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 px-5 py-3 text-sm font-black text-neutral-950 shadow-lg shadow-fuchsia-600/15 hover:brightness-110"
            >
              Ordina ora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
