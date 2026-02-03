import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";

const nav = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/contatti", label: "Contatti" },
];

function NavItem({ to, label }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                [
                    "rounded-full px-3 py-2 text-sm font-semibold transition",
                    isActive
                        ? "bg-[rgba(255,200,64,0.14)] border border-[rgba(212,170,55,0.26)]"
                        : "hover:bg-[rgba(20,20,20,0.05)]",
                ].join(" ")
            }
        >
            {label}
        </NavLink>
    );
}

export default function Header() {
    return (
        <header className="sticky top-0 z-50 h-16 border-b border-[rgba(20,20,20,0.10)] bg-[rgb(255,255,255)]/32 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                {/* LOGO + NAME */}
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src={logo}
                        alt="La Paesana"
                        className="h-20 w-auto drop-shadow-[0_8px_22px_rgba(212,170,55,0.45)]"
                    />

                    <div className="leading-tight">
                        <div className="font-black tracking-tight cedar-logo">
                            La Paesana For Family
                        </div>
                    </div>
                </Link>

                {/* DESKTOP NAV */}
                <nav className="hidden items-center gap-1 md:flex">
                    {nav.map((n) => (
                        <NavItem key={n.to} {...n} />
                    ))}

                    {/* ✅ ultimo bottone: STAFF */}
                    <Link to="/admin" className="ml-2 ui-btn">
                        <span>Staff</span>
                    </Link>
                </nav>

                {/* MOBILE ACTIONS */}
                <div className="flex gap-2 md:hidden">
                    <Link to="/admin" className="ui-btn px-3 py-2">
                        <span>Staff</span>
                    </Link>
                    <Link to="/menu" className="ui-btn px-3 py-2">
                        <span>Menu</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
