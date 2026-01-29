export default function ContactsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-4xl font-black tracking-tight">Contatti</h1>
        <p className="mt-2 text-white/70">Vieni a trovarci o chiamaci per info rapide.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-bold text-white/70">Dove siamo</div>
          <div className="mt-2 text-xl font-black">Via Roma 12</div>
          <p className="mt-2 text-sm text-white/60">
            00100 • Italia (demo). Parcheggio a 2 minuti.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-bold text-white/70">Orari</div>
          <div className="mt-2 text-xl font-black">Pranzo 12:00 – 15:00</div>
          <div className="mt-1 text-xl font-black">Cena 18:30 – 23:30</div>
          <p className="mt-2 text-sm text-white/60">
            Tutti i giorni • (demo) Chiuso il martedì.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:col-span-2">
          <div className="text-sm font-bold text-white/70">Contatti</div>
          <div className="mt-3 grid gap-2 text-white/70">
            <div>☎️ +39 000 000 000</div>
            <div>✉️ info@lapaesana.it</div>
            <div>📷 @la_paesana</div>
          </div>
        </div>
      </div>
    </div>
  );
}
