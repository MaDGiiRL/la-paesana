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

export default function HomePage() {
  const promos = useMemo(() => {
    const all = loadJSON(LS_PROMOS, []);
    return all.filter((p) => p.active);
  }, []);

  return (
    <div className="ui-page grid gap-6 md:gap-8">
      <Carousel items={slides} />

      {/* Highlights */}
      <section className="grid gap-3 md:grid-cols-3">
        {/* ... invariato ... */}
      </section>

      {/* Promos */}
      {promos.length > 0 && (
        <section className="ui-card p-5 md:p-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="ui-chip inline-flex items-center gap-2">
                <Sparkles size={16} />
                Promozioni
              </div>
              <p className="mt-2 ui-muted text-sm">Attive oggi.</p>
            </div>

            <Link to="/menu" className="ui-btn inline-flex items-center gap-2">
              Vedi menu
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {promos.map((p) => (
              <div key={p.id} className="ui-soft p-4">
                <div className="ui-chip inline-flex items-center gap-2">
                  <Tag size={16} />
                  {p.badge || "Promo"}
                </div>
                <div className="mt-2 font-black">{p.title}</div>
                <div className="mt-1 ui-muted text-sm">{p.subtitle}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reviews */}
      <ReviewsSection
        rating={4.2}
        reviewCount={130}
        sourceLabel="Google"
        reviews={REVIEWS}
      />

      {/* CTA */}
      {/* <section className="ui-card p-5 md:p-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="ui-chip inline-flex items-center gap-2">
              <ShoppingBag size={16} />
              Ordina online
            </div>
            <h2 className="ui-h2 mt-2">Ordina in modo semplice</h2>
            <p className="mt-1 ui-muted text-sm">
              Menu e checkout - veloce, chiaro, senza registrazione.
            </p>
          </div>

          <div className="flex gap-2">
            <Link to="/menu" className="ui-btn inline-flex items-center gap-2">
              Apri menu
              <ArrowRight size={16} />
            </Link>
            <Link to="/ordina" className="ui-btn-gold inline-flex items-center gap-2">
              Vai al checkout
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
}
