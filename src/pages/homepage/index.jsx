// src/pages/homepage/index.jsx
import { useMemo } from "react";
import { Link } from "react-router-dom";
import Carousel from "../../components/Carousel.jsx";
import ReviewsSection from "../../components/ReviewsSection.jsx";
import { loadJSON, LS_PROMOS } from "../../data/storage.js";
import REVIEWS from "../../data/reviews.js";

import {
  Fish,
  UtensilsCrossed,
  PartyPopper,
  Sparkles,
  Tag,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

const slides = [
  {
    title: "Pesce fresco, cucina elegante.",
    subtitle: "Crudi, primi di mare, grigliate. Tradizione familiare, stile moderno.",
    image: "https://i.imgur.com/LDvRHtq.jpeg",
  },
  {
    title: "Menù fisso a pranzo.",
    subtitle: "Veloce, curato, conveniente. Ogni giorno piatti nuovi.",
    image: "https://i.imgur.com/AIbOeRk.jpeg",
  },
  {
    title: "Carne & pizza, sempre con qualità.",
    subtitle: "Per chi vuole scegliere: griglia, forno, stagionalità.",
    image: "https://i.imgur.com/uSPE5hg.jpeg",
  },
];

function HighlightCard({ icon: Icon, title, text, ctaLabel, to }) {
  return (
    <div
      className="ui-card p-5 md:p-6"
      style={{
        background:
          "radial-gradient(520px 220px at 20% 10%, rgba(255,200,64,0.18), transparent 60%)," +
          "radial-gradient(520px 240px at 90% 100%, rgba(12,74,110,0.07), transparent 62%)," +
          "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.62))",
        boxShadow: "0 18px 44px rgba(20,20,20,0.10)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="ui-chip inline-flex items-center gap-2">
          <span
            className="grid place-items-center h-7 w-7 rounded-full"
            style={{
              background: "rgba(255,200,64,0.20)",
              border: "1px solid rgba(212,170,55,0.35)",
            }}
          >
            <Icon size={16} color="rgb(var(--sea))" />
          </span>
          <span className="font-black">La nostra casa</span>
        </div>

        <span
          className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-black"
          style={{
            background: "rgba(255,200,64,0.16)",
            border: "1px solid rgba(212,170,55,0.32)",
            color: "rgba(25,25,25,0.82)",
          }}
        >
          Premium
          <Sparkles size={14} />
        </span>
      </div>

      <h3 className="mt-4 text-lg md:text-xl font-black">{title}</h3>
      <p className="mt-2 ui-muted text-sm leading-relaxed">{text}</p>

      <div className="mt-4">
        <Link to={to} className="ui-btn ui-btn-soft inline-flex items-center gap-2">
          {ctaLabel} <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default function HomePage() {
  const promos = useMemo(() => {
    const all = loadJSON(LS_PROMOS, []);
    return all.filter((p) => p.active);
  }, []);

  return (
    <div className="ui-page grid gap-6 md:gap-8">
      <Carousel items={slides} />

      {/* ✅ HIGHLIGHTS (NUOVA SEZIONE) */}
      <section className="grid gap-3 md:grid-cols-3">
        <HighlightCard
          icon={Fish}
          title="Pesce fresco, come piace a noi."
          text="Selezione quotidiana e piatti di mare curati. Semplici, buoni, con quel tocco di casa."
          ctaLabel="Vedi il menù"
          to="/menu"
        />
        <HighlightCard
          icon={UtensilsCrossed}
          title="Pranzo fisso, comodo e fatto bene."
          text="Ideale per una pausa veloce ma di qualità: porzioni giuste, sapori veri, prezzo onesto."
          ctaLabel="Scopri il pranzo"
          to="/menu"
        />
        <HighlightCard
          icon={PartyPopper}
          title="Eventi e feste, senza stress."
          text="Menù dedicati per cerimonie e tavolate: ti aiutiamo a scegliere e pensiamo noi al resto."
          ctaLabel="Info & contatti"
          to="/contatti"
        />
      </section>

      {/* ✅ PROMOS (PIÙ PREMIUM) */}
      {promos.length > 0 && (
        <section
          className="ui-card p-5 md:p-7"
          style={{
            background:
              "radial-gradient(900px 420px at 16% 0%, rgba(255,200,64,0.22), transparent 62%)," +
              "radial-gradient(860px 420px at 92% 30%, rgba(12,74,110,0.10), transparent 62%)," +
              "linear-gradient(180deg, rgba(255,255,255,0.86), rgba(255,255,255,0.62))",
          }}
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="ui-chip inline-flex items-center gap-2">
                <Sparkles size={16} />
                Promozioni
              </div>
              <p className="mt-2 ui-muted text-sm">Attive oggi.</p>
            </div>

            <Link to="/menu" className="ui-btn ui-btn-soft inline-flex items-center gap-2">
              Vedi menu <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {promos.map((p) => (
              <div
                key={p.id}
                className="ui-soft p-4"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.52))",
                  border: "1px solid rgba(212,170,55,0.22)",
                  boxShadow: "0 16px 36px rgba(20,20,20,0.10)",
                }}
              >
                <div className="ui-chip inline-flex items-center gap-2">
                  <Tag size={16} />
                  {p.badge || "Promo"}
                </div>
                <div className="mt-3 font-black text-base">{p.title}</div>
                <div className="mt-1 ui-muted text-sm leading-relaxed">{p.subtitle}</div>

                <div className="mt-4 flex items-center gap-2">
                  <Link to="/ordina" className="ui-btn-gold ui-btn-gold-solid inline-flex items-center gap-2">
                    <ShoppingBag size={16} />
                    Ordina
                  </Link>
                  <Link to="/menu" className="ui-btn ui-btn-soft">
                    Dettagli
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reviews */}
      <ReviewsSection rating={4.2} reviewCount={130} sourceLabel="Google" reviews={REVIEWS} />
    </div>
  );
}
