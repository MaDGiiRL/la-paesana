// src/data/storage.js

export const LS_MENU = "lp_menu";
export const LS_CART = "lp_cart";
export const LS_PROMOS = "lp_promos";

// helpers
export function loadJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

export function saveJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Menu vuoto per Admin (dashboard)
export function defaultMenu() {
    return {
        lunch: {
            dateISO: "",
            title: "Menù fisso del giorno",
            notes: "",
            items: [],
        },

        // piatti aggiunti da admin al menù normale (VUOTI all’inizio)
        regularItems: [],

        seasonal: null,

        // ✅ Menù Festa
        party: {
            active: false,
            title: "Menù festa",
            notes: "",
            antipasto: [],
            primo: [],
            secondo: [],
            dolce: [],
            bevande: [],
        },
    };
}

// Promos vuote per Admin
export function defaultPromos() {
    return [];
}

/**
 * ✅ ensureSeed()
 * Inizializza LocalStorage e fa “migrazione soft” senza perdere campi.
 */
export function ensureSeed() {
    const existingMenu = loadJSON(LS_MENU, null);

    if (!existingMenu) {
        saveJSON(LS_MENU, defaultMenu());
    } else {
        const base = defaultMenu();

        const next = {
            ...base,
            ...existingMenu,

            lunch: { ...base.lunch, ...(existingMenu.lunch || {}) },

            regularItems: Array.isArray(existingMenu.regularItems) ? existingMenu.regularItems : [],
            seasonal: existingMenu.seasonal ?? null,

            party: {
                ...base.party,
                ...(existingMenu.party || {}),
                antipasto: Array.isArray(existingMenu.party?.antipasto) ? existingMenu.party.antipasto : [],
                primo: Array.isArray(existingMenu.party?.primo) ? existingMenu.party.primo : [],
                secondo: Array.isArray(existingMenu.party?.secondo) ? existingMenu.party.secondo : [],
                dolce: Array.isArray(existingMenu.party?.dolce) ? existingMenu.party.dolce : [],
                bevande: Array.isArray(existingMenu.party?.bevande) ? existingMenu.party.bevande : [],
            },
        };

        saveJSON(LS_MENU, next);
    }

    const existingPromos = loadJSON(LS_PROMOS, null);
    if (!existingPromos) saveJSON(LS_PROMOS, defaultPromos());
}
