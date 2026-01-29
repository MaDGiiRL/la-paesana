import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h1 className="text-3xl font-black">404</h1>
            <p className="mt-2 text-white/70">Pagina non trovata.</p>
            <Link
                to="/"
                className="mt-5 inline-flex rounded-full bg-white/5 px-5 py-3 text-sm font-bold ring-1 ring-white/10 hover:bg-white/10"
            >
                Torna alla Home
            </Link>
        </div>
    );
}
