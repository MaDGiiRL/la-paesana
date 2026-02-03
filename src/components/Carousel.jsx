// src/components/Carousel.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Carousel({ items = [], intervalMs = 6500 }) {
  const slides = useMemo(
    () => [
      {
        type: "brand",
        title: "La Paesana For Family",
        subtitle:
          "Ristorante di mare a conduzione familiare. Menù fisso a pranzo, la sera pesce, carne e pizza.",
      },
      ...items.filter(Boolean),
    ],
    [items]
  );

  const [i, setI] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), intervalMs);
    return () => clearInterval(t);
  }, [slides.length, intervalMs]);

  const current = slides[i];
  const isBrand = current?.type === "brand";

  return (
    <section
      className="ui-card overflow-hidden"
      style={{
        /* ✅ neutro caldo + accento leggero */
        background:
          "radial-gradient(900px 420px at 12% 0%, rgba(255,200,64,0.10), transparent 60%)," +
          "radial-gradient(900px 520px at 96% 18%, rgba(12,74,110,0.08), transparent 60%)," +
          "linear-gradient(180deg, rgba(255,255,255,0.74), rgba(247,242,232,0.62))",
        borderColor: "rgba(20,20,20,0.10)",
        boxShadow: "0 12px 30px rgba(20,20,20,0.12)",
      }}
    >
      {/* ================= MOBILE ================= */}
      <div className="md:hidden">
        <div className="relative h-[220px]">
          {isBrand ? (
            <>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(520px 320px at 20% 25%, rgba(255,200,64,0.14), transparent 66%)," +
                    "radial-gradient(520px 340px at 88% 18%, rgba(12,74,110,0.12), transparent 68%)," +
                    "linear-gradient(180deg, rgba(255,255,255,0.70), rgba(247,242,232,0.70))",
                }}
              />

              {/* ✅ logo pulito, senza “pannello giallo” */}
              <div className="absolute inset-0 grid place-items-center px-4">
                <div
                  className="rounded-3xl border"
                  style={{
                    width: "min(92vw, 520px)",
                    height: "min(72%, 160px)",
                    display: "grid",
                    placeItems: "center",
                    background: "rgba(255,255,255,0.55)",
                    borderColor: "rgba(20,20,20,0.10)",
                    boxShadow: "0 12px 26px rgba(20,20,20,0.12)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <img
                    src={logo}
                    alt="La Paesana"
                    loading="eager"
                    draggable={false}
                    style={{
                      width: "90%",
                      height: "90%",
                      objectFit: "contain",
                      objectPosition: "center",
                      display: "block",
                      filter: "drop-shadow(0 10px 18px rgba(20,20,20,0.14))",
                    }}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <img
                src={current?.image}
                alt={current?.title ?? "Slide"}
                className="h-full w-full object-cover"
                loading="lazy"
                style={{ filter: "contrast(1.05) saturate(1.08)" }}
              />
              <div
                className="ui-veil"
                style={{
                  /* ✅ overlay elegante (non gialla) */
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.20), rgba(247,242,232,0.92) 86%)",
                }}
              />
            </>
          )}

          <div className="pointer-events-none absolute inset-0 ring-1 ring-[rgba(20,20,20,0.10)]" />

          <div className="absolute bottom-3 left-3 right-3">
            <div
              className="ui-card"
              style={{
                borderRadius: 9999,
                padding: "8px 10px",
                background: "rgba(255,255,255,0.52)",
                borderColor: "rgba(20,20,20,0.10)",
                boxShadow: "0 10px 22px rgba(20,20,20,0.12)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="ui-dots">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setI(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={["ui-dot", idx === i ? "is-active" : ""].join(" ")}
                    style={{ width: idx === i ? 26 : 10 }}
                    type="button"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-black"
            style={{
              background: "rgba(255,255,255,0.50)",
              borderColor: "rgba(20,20,20,0.10)",
              color: "rgba(25,25,25,0.86)",
            }}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: "rgb(var(--sea))" }} />
            {isBrand ? "Benvenuti" : "Cucina di casa"}
          </div>

          <h2 className={["cedar mt-3", isBrand ? "text-4xl" : "text-3xl"].join(" ")}>
            {current?.title}
          </h2>

          <p className="mt-2 ui-muted text-sm leading-relaxed">{current?.subtitle}</p>

          <div className="mt-4 flex gap-2">
            <Link to="/menu" className="ui-btn ui-btn-soft px-3 py-2 text-sm">
              Menù
            </Link>
            <Link to="/ordina" className="ui-btn-gold ui-btn-gold-solid px-3 py-2 text-sm">
              Ordina
            </Link>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="relative hidden md:grid md:h-[460px] md:grid-cols-[1.05fr_0.95fr]">
        <div className="relative flex h-full flex-col justify-center p-10">
          <div
            className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-black"
            style={{
              background: "rgba(255,255,255,0.50)",
              borderColor: "rgba(20,20,20,0.10)",
              color: "rgba(25,25,25,0.88)",
            }}
          >
            <span className="h-3 w-3 rounded-full" style={{ background: "rgb(var(--sea))" }} />
            {isBrand ? "Accoglienza • Famiglia" : "Specialità • Mare"}
          </div>

          <h2 className="cedar mt-4 text-[46px] leading-[1.02]">
            {isBrand ? "La Paesana For Family" : current?.title}
          </h2>

          <p className="mt-3 ui-muted max-w-[54ch] leading-relaxed">{current?.subtitle}</p>

          <div className="mt-6 flex gap-2">
            <Link to="/menu" className="ui-btn ui-btn-soft">
              Vedi menù
            </Link>
            <Link to="/ordina" className="ui-btn-gold ui-btn-gold-solid">
              Ordina ora
            </Link>
          </div>

          <div className="mt-7">
            <div className="ui-dots">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={["ui-dot", idx === i ? "is-active" : ""].join(" ")}
                  style={{ width: idx === i ? 32 : 10 }}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          {isBrand ? (
            <>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(900px 520px at 60% 35%, rgba(12,74,110,0.10), transparent 65%)," +
                    "radial-gradient(900px 520px at 40% 45%, rgba(255,200,64,0.10), transparent 65%)," +
                    "linear-gradient(180deg, rgba(255,255,255,0.66), rgba(247,242,232,0.72))",
                }}
              />
              <div className="absolute inset-0 grid place-items-center p-10">
                <div
                  className="rounded-[34px] border"
                  style={{
                    width: "min(620px, 92%)",
                    height: "min(390px, 92%)",
                    background: "rgba(255,255,255,0.52)",
                    borderColor: "rgba(20,20,20,0.10)",
                    boxShadow: "0 14px 34px rgba(20,20,20,0.12)",
                    backdropFilter: "blur(14px)",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <img
                    src={logo}
                    alt="La Paesana"
                    draggable={false}
                    style={{
                      width: "92%",
                      height: "92%",
                      objectFit: "contain",
                      objectPosition: "center",
                      display: "block",
                      filter: "drop-shadow(0 12px 22px rgba(20,20,20,0.14))",
                    }}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <img
                src={current?.image}
                alt={current?.title ?? "Slide"}
                className="h-full w-full object-cover"
                loading="lazy"
                style={{ filter: "contrast(1.05) saturate(1.08)" }}
              />
              <div
                className="ui-veil"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(247,242,232,0.92), rgba(247,242,232,0.10) 58%, rgba(247,242,232,0.00) 80%)," +
                    "linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.18))",
                }}
              />
            </>
          )}

          <div className="pointer-events-none absolute inset-0 ring-1 ring-[rgba(20,20,20,0.10)]" />
        </div>
      </div>
    </section>
  );
}
