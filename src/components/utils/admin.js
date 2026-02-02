export const LS_ORDERS = "lp_orders";

export const statusLabel = {
    pending: "In attesa",
    accepted: "Accettato",
    rejected: "Rifiutato",
    preparing: "In preparazione",
    ready: "Pronto",
};

export function loadOrders() {
    try {
        return JSON.parse(localStorage.getItem(LS_ORDERS) || "[]");
    } catch {
        return [];
    }
}
export function saveOrders(next) {
    localStorage.setItem(LS_ORDERS, JSON.stringify(next));
}

export function safeDate(v) {
    const d = v ? new Date(v) : null;
    return d && !Number.isNaN(d.getTime()) ? d : null;
}

export function eur(n) {
    return `€ ${Number(n || 0).toFixed(2)}`;
}

export function startOfDay(d) {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
}

export function addDays(d, n) {
    const x = new Date(d);
    x.setDate(x.getDate() + n);
    return x;
}

export function fmtDay(d) {
    const days = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];
    return `${days[d.getDay()]} ${String(d.getDate()).padStart(2, "0")}`;
}

export function statusChipClass(status) {
    // tutto in palette soft, niente blu “puro”
    if (status === "accepted") return "bg-[rgba(20,122,82,0.10)] border-[rgba(20,122,82,0.20)]";
    if (status === "rejected") return "bg-[rgba(164,49,49,0.10)] border-[rgba(164,49,49,0.18)]";
    if (status === "preparing") return "bg-[rgba(255,200,64,0.14)] border-[rgba(212,170,55,0.24)]";
    if (status === "ready") return "bg-[rgba(12,74,110,0.08)] border-[rgba(12,74,110,0.14)]";
    return "bg-[rgba(20,20,20,0.03)] border-[rgba(20,20,20,0.10)]";
}

export function computeWeeklyStats(orders) {
    const today = startOfDay(new Date());
    const from = addDays(today, -6);

    const days = Array.from({ length: 7 }).map((_, i) => startOfDay(addDays(from, i)));

    const byDay = days.map((d) => ({
        date: d,
        label: fmtDay(d),
        count: 0,
        revenue: 0,
    }));

    const statusCounts = { pending: 0, accepted: 0, rejected: 0, preparing: 0, ready: 0, other: 0 };

    let weekCount = 0;
    let weekRevenue = 0;

    for (const o of orders) {
        const d = safeDate(o.createdAt);
        if (!d) continue;

        const day = startOfDay(d);
        if (day < from || day > today) continue;

        weekCount += 1;
        weekRevenue += Number(o.total || 0);

        if (o.status && statusCounts[o.status] !== undefined) statusCounts[o.status] += 1;
        else statusCounts.other += 1;

        const idx = Math.round((day.getTime() - from.getTime()) / (24 * 3600 * 1000));
        if (idx >= 0 && idx < 7) {
            byDay[idx].count += 1;
            byDay[idx].revenue += Number(o.total || 0);
        }
    }

    const avgTicket = weekCount ? weekRevenue / weekCount : 0;
    const topDay = [...byDay].sort((a, b) => b.revenue - a.revenue)[0] || null;

    return { from, to: today, byDay, statusCounts, weekCount, weekRevenue, avgTicket, topDay };
}
