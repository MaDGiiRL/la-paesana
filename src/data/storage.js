const LS_MENU = "lp_menu";
const LS_PROMOS = "lp_promos";

export function loadJSON(key, fallback) {
    try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : fallback;
    } catch {
        return fallback;
    }
}

export function saveJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function defaultMenu() {
    return {
        lunch: {
            dateISO: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
            title: "Menù fisso di oggi",
            notes: "Acqua e coperto inclusi (demo).",
            items: [
                { id: "l1", name: "Pasta al pomodoro", desc: "Basilico, EVO", price: 10.0 },
                { id: "l2", name: "Pollo alla cacciatora", desc: "Con patate", price: 12.0 },
                { id: "l3", name: "Insalata Paesana", desc: "Verdure di stagione", price: 9.0 },
            ],
        },
        dinner: {
            meat: [
                { id: "m1", name: "Tagliata di manzo", desc: "Rucola e grana", price: 18.0 },
                { id: "m2", name: "Costine glassate", desc: "BBQ delicata", price: 16.5 },
            ],
            fish: [
                { id: "f1", name: "Frittura di mare", desc: "Croccante", price: 19.0 },
                { id: "f2", name: "Salmone scottato", desc: "Agrumi e finocchio", price: 18.5 },
            ],
        },
        pizza: [
            { id: "p1", name: "Margherita Paesana", desc: "Fiordilatte, basilico", price: 8.5 },
            { id: "p2", name: "Diavola Glam", desc: "Spianata, provola", price: 11.0 },
            { id: "p3", name: "Tartufo & Funghi", desc: "Crema funghi, tartufo", price: 13.5 },
        ],
    };
}

export function defaultPromos() {
    return [
        {
            id: "promo-1",
            title: "Serata Pizza & Spritz",
            subtitle: "Ogni giovedì: pizza + spritz a prezzo speciale (demo).",
            active: true,
            badge: "Promo",
        },
        {
            id: "promo-2",
            title: "Pranzo fisso smart",
            subtitle: "Menù fisso del giorno: veloce, buono, colorato.",
            active: true,
            badge: "Pranzo",
        },
    ];
}

export function ensureSeed() {
    const menu = loadJSON(LS_MENU, null);
    if (!menu) saveJSON(LS_MENU, defaultMenu());

    const promos = loadJSON(LS_PROMOS, null);
    if (!promos) saveJSON(LS_PROMOS, defaultPromos());
}

export { LS_MENU, LS_PROMOS };
