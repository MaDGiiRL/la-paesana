import AdminPromosEditor from "../AdminPromosEditor.jsx";

export default function PromosSection() {
    return (
        <div className="grid gap-4">
            <div className="ui-card p-5">
                <div className="ui-chip">Promozioni</div>
                <div className="mt-2 text-lg font-black">Promo homepage</div>
                <div className="ui-muted text-sm">
                    Le promo attive vengono mostrate automaticamente nella Home.
                </div>
            </div>

            <AdminPromosEditor />
        </div>
    );
}
