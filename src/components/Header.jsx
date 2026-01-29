import { NavLink, Link, useLocation } from "react-router-dom";

const nav = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/ordina", label: "Ordina" },
    { to: "/contatti", label: "Contatti" },
];

function NavItem({ to, label }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                [
                    "rounded-full px-4 py-2 text-sm font-semibold transition",
                    isActive
                        ? "bg-white/10 ring-1 ring-white/15"
                        : "hover:bg-white/5",
                ].join(" ")
            }
        >
            {label}
        </NavLink>
    );
}

export default function Header() {
    const location = useLocation();

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
                <Link to="/" className="group flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 via-rose-500 to-fuchsia-600 shadow-lg shadow-fuchsia-600/10">
                        <span className="text-lg font-black">LP</span>
                    </div>
                    <div className="leading-tight">
                        <div className="text-base font-black tracking-tight">La Paesana</div>
                        <div className="text-xs text-white/60">Pizzeria • Cucina italiana</div>
                    </div>
                </Link>

                <nav className="hidden items-center gap-2 md:flex">
                    {nav.map((n) => (
                        <NavItem key={n.to} {...n} />
                    ))}
                    <Link
                        to="/ordina"
                        className="ml-2 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 px-4 py-2 text-sm font-black text-neutral-950 shadow-lg shadow-fuchsia-600/15 transition hover:brightness-110"
                    >
                        Ordina ora
                    </Link>
                </nav>

                {/* Mobile quick */}
                <div className="flex items-center gap-2 md:hidden">
                    <Link
                        to="/ordina"
                        className="rounded-full bg-white/10 px-3 py-2 text-sm font-semibold ring-1 ring-white/15"
                    >
                        Ordina
                    </Link>
                    <Link
                        to={location.pathname === "/menu" ? "/" : "/menu"}
                        className="rounded-full bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
                    >
                        {location.pathname === "/menu" ? "Home" : "Menu"}
                    </Link>
                </div>
            </div>
        </header>
    );
}
