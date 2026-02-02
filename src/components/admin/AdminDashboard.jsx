import { useEffect, useMemo, useState } from "react";

import AdminSidebar from "./AdminSidebar.jsx";
import OverviewSection from "./sections/OverviewSection.jsx";
import OrdersSection from "./sections/OrdersSection.jsx";
import MenuSection from "./sections/MenuSection.jsx";
import PromosSection from "./sections/PromosSection.jsx";
import CustomersSection from "./sections/CustomersSection.jsx";

import {
    loadOrders,
    saveOrders,
    safeDate,
    computeWeeklyStats,
} from "../utils/admin.js";

export default function AdminDashboard({ onLogout }) {
    const [orders, setOrders] = useState(() => loadOrders());
    const [q, setQ] = useState("");
    const [section, setSection] = useState("overview");

    // auto refresh (demo)
    useEffect(() => {
        const t = setInterval(() => setOrders(loadOrders()), 1500);
        return () => clearInterval(t);
    }, []);

    const weekly = useMemo(() => computeWeeklyStats(orders), [orders]);

    const filteredOrders = useMemo(() => {
        const query = q.trim().toLowerCase();
        const base = orders
            .slice()
            .sort(
                (a, b) =>
                    (safeDate(b.createdAt)?.getTime() || 0) -
                    (safeDate(a.createdAt)?.getTime() || 0)
            );

        if (!query) return base;
        return base.filter((o) => {
            const s = `${o.id} ${o.customer?.name} ${o.customer?.phone} ${o.customer?.email}`.toLowerCase();
            return s.includes(query);
        });
    }, [orders, q]);

    const customers = useMemo(() => {
        const map = new Map();
        for (const o of orders) {
            const key = (o.customer?.phone || o.customer?.email || o.customer?.name || "").trim();
            if (!key) continue;

            const prev = map.get(key);
            const next = {
                name: o.customer?.name || prev?.name || "",
                phone: o.customer?.phone || prev?.phone || "",
                email: o.customer?.email || prev?.email || "",
                lastOrderAt: o.createdAt,
                ordersCount: (prev?.ordersCount || 0) + 1,
                spent: (prev?.spent || 0) + (o.total || 0),
            };

            map.set(key, prev ? { ...prev, ...next } : next);
        }
        return Array.from(map.values()).sort((a, b) => b.spent - a.spent);
    }, [orders]);

    function updateOrder(id, patch) {
        const next = orders.map((o) => (o.id === id ? { ...o, ...patch } : o));
        setOrders(next);
        saveOrders(next);
    }

    function clearAllOrders() {
        if (!confirm("Vuoi cancellare TUTTI gli ordini? (demo)")) return;
        saveOrders([]);
        setOrders([]);
    }

    return (
        <div className="ui-page w-full">
            <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
                <AdminSidebar
                    section={section}
                    setSection={setSection}
                    ordersCount={orders.length}
                    weekly={weekly}
                    onClear={clearAllOrders}
                    onLogout={onLogout}
                />

                <main className="grid gap-4 min-w-0">
                    {/* TOP BAR (mobile) */}
                    <div className="ui-card p-4 md:p-5 lg:hidden">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <div className="ui-chip">Staff</div>
                            </div>

                            <button onClick={onLogout} className="ui-btn" type="button">
                                <span>Esci</span>
                            </button>
                        </div>

                        <div className="mt-3 flex gap-2 overflow-x-auto">
                            {[
                                { key: "overview", label: "Overview" },
                                { key: "orders", label: "Ordini" },
                                { key: "menu", label: "Menù" },
                                { key: "promos", label: "Promozioni" },
                                { key: "customers", label: "Clienti" },
                            ].map((s) => (
                                <button
                                    key={s.key}
                                    className={[
                                        "ui-btn whitespace-nowrap",
                                        section === s.key
                                            ? "bg-[rgba(255,200,64,0.14)] border border-[rgba(212,170,55,0.26)]"
                                            : "",
                                    ].join(" ")}
                                    onClick={() => setSection(s.key)}
                                    type="button"
                                >
                                    <span>{s.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* UNA SEZIONE ALLA VOLTA - full width */}
                    {section === "overview" && <OverviewSection weekly={weekly} />}

                    {section === "orders" && (
                        <OrdersSection
                            filteredOrders={filteredOrders}
                            q={q}
                            setQ={setQ}
                            weekly={weekly}
                            onClear={clearAllOrders}
                            onUpdateOrder={updateOrder}
                        />
                    )}

                    {section === "menu" && <MenuSection />}
                    {section === "promos" && <PromosSection />}
                    {section === "customers" && <CustomersSection customers={customers} />}
                </main>
            </div>
        </div>
    );
}
