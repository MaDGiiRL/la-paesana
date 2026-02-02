import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function Layout() {
    return (
        <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
            {/* Dynamic background */}
            <div className="bg-dynamic">
                <div className="bg-wash" />
                <div className="blob blob-a" />
                <div className="blob blob-b" />
                <div className="blob blob-c" />
                <div className="blob blob-d" />
                <div className="bg-grain" />
            </div>

            <Header />

            <main className="mx-auto w-full max-w-6xl px-4 py-6 md:py-10">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
