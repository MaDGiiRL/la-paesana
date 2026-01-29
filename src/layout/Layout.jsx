import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function Layout() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900 text-neutral-50">
            <Header />
            <main className="mx-auto w-full max-w-6xl px-4 py-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
