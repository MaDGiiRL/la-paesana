import { eur, statusChipClass } from "../../utils/admin.js";

function MiniPill({ label, value, cls }) {
    return (
        <div className={["rounded-2xl border p-4", cls].join(" ")}>
            <div className="text-xs ui-muted">{label}</div>
            <div className="mt-1 text-xl font-black">{value}</div>
        </div>
    );
}

export default function OverviewSection({ weekly }) {
    const maxRevenue = Math.max(1, ...weekly.byDay.map((x) => x.revenue));

    return (
        <div className="grid gap-4">
            <div className="ui-card p-5">
                <div className="ui-chip">Overview</div>
                <div className="mt-2 text-lg font-black">Statistiche ultimi 7 giorni</div>
                <div className="mt-3 grid gap-2">
                    <div className="flex items-center justify-between">
                        <div className="ui-muted text-sm">Ordini</div>
                        <div className="font-black">{weekly.weekCount}</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="ui-muted text-sm">Incasso</div>
                        <div className="font-black">{eur(weekly.weekRevenue)}</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="ui-muted text-sm">Scontrino medio</div>
                        <div className="font-black">{eur(weekly.avgTicket)}</div>
                    </div>
                </div>
            </div>

            <div className="ui-card p-5">
                <div className="ui-chip">Trend</div>
                <div className="mt-2 text-lg font-black">Incasso giornaliero</div>

                <div className="mt-4 grid gap-2">
                    {weekly.byDay.map((d) => {
                        const w = Math.round((d.revenue / maxRevenue) * 100);
                        return (
                            <div key={d.label} className="grid grid-cols-[72px_1fr_92px] items-center gap-3">
                                <div className="text-xs ui-muted">{d.label}</div>
                                <div className="h-3 rounded-full bg-[rgba(20,20,20,0.06)] overflow-hidden">
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: `${w}%`,
                                            background:
                                                "linear-gradient(90deg, rgba(255,200,64,0.95), rgba(12,74,110,0.35))",
                                        }}
                                    />
                                </div>
                                <div className="text-right text-xs font-bold">{eur(d.revenue)}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="ui-card p-5">
                <div className="ui-chip">Distribuzione</div>
                <div className="mt-2 text-lg font-black">Stati ordini (7 giorni)</div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <MiniPill label="In attesa" value={weekly.statusCounts.pending} cls={statusChipClass("pending")} />
                    <MiniPill label="Accettati" value={weekly.statusCounts.accepted} cls={statusChipClass("accepted")} />
                    <MiniPill label="Rifiutati" value={weekly.statusCounts.rejected} cls={statusChipClass("rejected")} />
                    <MiniPill label="In prep" value={weekly.statusCounts.preparing} cls={statusChipClass("preparing")} />
                    <MiniPill label="Pronti" value={weekly.statusCounts.ready} cls={statusChipClass("ready")} />
                </div>
            </div>
        </div>
    );
}
