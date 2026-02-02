// src/components/admin/sections/MenuSection.jsx
import AdminMenuEditor from "../AdminMenuEditor.jsx";
import AdminPartyMenuEditor from "../AdminPartyMenuEditor.jsx";

export default function MenuSection() {
    return (
        <div className="grid gap-4">
            <AdminMenuEditor />
            <AdminPartyMenuEditor />
        </div>
    );
}
