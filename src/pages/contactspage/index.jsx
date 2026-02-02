import { useEffect, useMemo, useRef, useState } from "react";

function cn(...xs) {
  return xs.filter(Boolean).join(" ");
}

function formatTodayLabel(d) {
  // JS: 0=dom ... 6=sab
  const map = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
  return map[d.getDay()];
}

function getTodayKey(d) {
  const keys = ["dom", "lun", "mar", "mer", "gio", "ven", "sab"];
  return keys[d.getDay()];
}

const HOURS = [
  { key: "lun", label: "Lunedì", slots: [] }, // chiuso
  { key: "mar", label: "Martedì", slots: ["11–15", "18–23"] },
  { key: "mer", label: "Mercoledì", slots: ["11–15", "18–23"] },
  { key: "gio", label: "Giovedì", slots: ["11–15", "18–23"] },
  { key: "ven", label: "Venerdì", slots: ["11–15", "18–23"] },
  { key: "sab", label: "Sabato", slots: ["11–15", "18–01"] },
  { key: "dom", label: "Domenica", slots: ["11–15", "18–00"] },
];

function HoursCard() {
  const todayKey = useMemo(() => getTodayKey(new Date()), []);
  const todayLabel = useMemo(() => formatTodayLabel(new Date()), []);

  const today = HOURS.find((x) => x.key === todayKey);

  return (
    <div className="ui-card p-2 md:p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs ui-muted">Orari</div>
          <div className="mt-1 text-lg font-black">Aperti a pranzo e cena</div>
          <div className="mt-1 text-sm ui-muted">
            Oggi: <span className="font-bold">{todayLabel}</span>
          </div>
        </div>

        <div
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-black border",
            today?.slots?.length
              ? "border-[rgba(212,170,55,0.28)] bg-[rgba(255,200,64,0.14)]"
              : "border-[rgba(20,20,20,0.14)] bg-[rgba(20,20,20,0.05)]"
          )}
        >
          {today?.slots?.length ? "Aperto" : "Chiuso"}
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        {HOURS.map((h) => {
          const isToday = h.key === todayKey;
          const closed = !h.slots.length;

          return (
            <div
              key={h.key}
              className={cn(
                "flex items-center justify-between rounded-2xl border px-4 py-1",
                isToday
                  ? "border-[rgba(212,170,55,0.28)] bg-[rgba(255,200,64,0.10)]"
                  : "border-[rgba(20,20,20,0.10)] bg-white"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "h-2.5 w-2.5 rounded-full",
                    closed ? "bg-[rgba(20,20,20,0.18)]" : "bg-[rgb(var(--accent))]"
                  )}
                />
                <div className="text-sm font-bold">{h.label}</div>
                {isToday ? (
                  <span className="text-[10px] font-black px-2 py-1 rounded-full border border-[rgba(20,20,20,0.10)] bg-white">
                    OGGI
                  </span>
                ) : null}
              </div>

              <div className="text-sm">
                {closed ? (
                  <span className="ui-muted font-bold">Chiuso</span>
                ) : (
                  <div className="flex items-center gap-2">
                    {h.slots.map((s) => (
                      <span
                        key={s}
                        className="text-xs font-black px-2.5 py-1 rounded-full border border-[rgba(20,20,20,0.10)] bg-[rgba(20,20,20,0.02)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-xs ui-muted">
        * Gli orari possono variare in occasione di eventi o festività.
      </div>
    </div>
  );
}

function PhotosCarousel({ images = [] }) {
  const safe = useMemo(() => (Array.isArray(images) ? images.filter(Boolean) : []), [images]);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const intervalRef = useRef(null);

  const has = safe.length > 0;

  function prev() {
    if (!has) return;
    setI((x) => (x - 1 + safe.length) % safe.length);
  }
  function next() {
    if (!has) return;
    setI((x) => (x + 1) % safe.length);
  }

  useEffect(() => {
    if (!has) return;
    if (paused) return;

    intervalRef.current = setInterval(() => {
      setI((x) => (x + 1) % safe.length);
    }, 4500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [has, paused, safe.length]);

  if (!has) return null;

  const current = safe[i];

  return (
    <div
      className="ui-card p-5 md:p-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs ui-muted">Il locale</div>
          <div className="mt-1 text-lg font-black">Uno sguardo a "La Paesana For Family"</div>
          <div className="mt-1 text-sm ui-muted">
            Foto • {i + 1}/{safe.length}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={prev} className="ui-btn" type="button" aria-label="Foto precedente">
            <span>←</span>
          </button>
          <button onClick={next} className="ui-btn" type="button" aria-label="Foto successiva">
            <span>→</span>
          </button>
        </div>
      </div>

      {/* hero */}
      <div
        className="mt-4 overflow-hidden rounded-[28px] border border-[rgba(20,20,20,0.10)] bg-[rgba(20,20,20,0.02)]"
        onTouchStart={(e) => (touchStartX.current = e.touches?.[0]?.clientX ?? null)}
        onTouchEnd={(e) => {
          const endX = e.changedTouches?.[0]?.clientX ?? null;
          const startX = touchStartX.current;
          touchStartX.current = null;
          if (startX == null || endX == null) return;

          const dx = endX - startX;
          if (Math.abs(dx) < 40) return;
          if (dx > 0) prev();
          else next();
        }}
      >
        <div className="relative">
          <img
            key={current}
            src={current}
            alt={`Foto locale ${i + 1}`}
            className="h-[240px] w-full object-cover md:h-[320px] animate-[fadeIn_.35s_ease-out]"
            loading="lazy"
          />

          {/* soft gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.22)] via-transparent to-transparent" />

          {/* dots */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {safe.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full border border-white/40",
                    idx === i ? "bg-white" : "bg-white/30"
                  )}
                  type="button"
                  aria-label={`Vai alla foto ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* thumbnails */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {safe.slice(0, 12).map((src, idx) => {
          const isActive = idx === i;
          return (
            <button
              key={src}
              onClick={() => setI(idx)}
              type="button"
              className={cn(
                "overflow-hidden rounded-2xl border",
                isActive
                  ? "border-[rgba(212,170,55,0.35)] ring-2 ring-[rgba(212,170,55,0.20)]"
                  : "border-[rgba(20,20,20,0.10)]"
              )}
              aria-label={`Apri miniatura ${idx + 1}`}
            >
              <img src={src} alt={`Miniatura ${idx + 1}`} className="h-16 w-full object-cover" loading="lazy" />
            </button>
          );
        })}
      </div>

      {/* tiny keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(1.01); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

function ContactCard() {
  return (
    <div className="ui-card p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs ui-muted">Contatti</div>
          <div className="mt-1 text-lg font-black">Chiamaci o raggiungici</div>
          <div className="mt-1 text-sm ui-muted">Rispondiamo durante gli orari di apertura.</div>
        </div>

        <a
          className="ui-btn-gold"
          href="tel:+393284586610"
          aria-label="Chiama La Paesana For Family"
          style={{ whiteSpace: "nowrap" }}
        >
          <span>Chiama</span>
        </a>
      </div>

      <div className="mt-4 grid gap-2">
        <div className="rounded-2xl border border-[rgba(20,20,20,0.10)] bg-[rgba(20,20,20,0.02)] p-4">
          <div className="text-xs ui-muted">Telefono</div>
          <div className="mt-1 text-sm">
            ☎️{" "}
            <a className="font-black hover:text-[rgb(var(--accent))]" href="tel:+393284586610">
              328 458 6610
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-[rgba(20,20,20,0.10)] bg-[rgba(20,20,20,0.02)] p-4">
          <div className="text-xs ui-muted">Indirizzo</div>
          <div className="mt-1 text-sm font-black">Via Schiavonesca Nuova, 223</div>
          <div className="text-sm ui-muted">31040 Volpago del Montello (TV)</div>

          <div className="mt-3 flex flex-wrap gap-2">
            <a
              className="ui-btn"
              href="https://www.google.com/maps/search/?api=1&query=Via%20Schiavonesca%20Nuova%2C%20223%2C%2031040%20Volpago%20del%20Montello%20TV"
              target="_blank"
              rel="noreferrer"
            >
              <span>Apri Maps</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactsPage() {
  // ✅ cambia qui se vuoi: sono file in /public/images/locale/
  const photos = [
    "src/assets/locale/1.png",
    "src/assets/locale/2.png",
    "src/assets/locale/3.png",
    "src/assets/locale/4.png",
    "src/assets/locale/5.png",
    "src/assets/locale/6.png",
    "src/assets/locale/7.png",
    "src/assets/locale/8.png",
    "src/assets/locale/9.png",
    "src/assets/locale/10.png",
    "src/assets/locale/11.png",
    "src/assets/locale/12.png",
  ];

  return (
    <div className="grid gap-5">
      <div className="ui-card p-5 md:p-7 overflow-hidden relative">
        {/* decorazioni */}
        <div className="absolute inset-0 pointer-events-none opacity-60">
          <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[rgba(255,200,64,0.20)] blur-2xl" />
          <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-[rgba(20,20,20,0.06)] blur-2xl" />
        </div>

        <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          {/* Testo */}
          <div>
            <div className="ui-chip inline-flex cedar text-xl">La Paesana For Family</div>
            <h1 className="mt-3 text-3xl font-bold">Contatti</h1>
            <p className="mt-1 ui-muted text-sm max-w-xl">
              Vieni a trovarci a Volpago del Montello oppure chiamaci per prenotare.
            </p>
          </div>

          {/* Logo */}
          <div className="flex justify-start md:justify-end">
            <img
              src="src/assets/logo.png"   // 👉 cambia se il path è diverso
              alt="La Paesana"
              className="w-25"
            />
          </div>
        </div>
      </div>


      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <PhotosCarousel images={photos} />
        <div className="grid gap-4">
          <ContactCard />
          <HoursCard />
        </div>
      </div>
    </div>
  );
}
