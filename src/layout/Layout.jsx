import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function Layout() {
    return (
        <div className="min-h-screen bg-pattern-intonaco text-[rgb(var(--text))]">
            <Header />

            <main className="mx-auto w-full max-w-6xl px-4 py-6 md:py-10">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
