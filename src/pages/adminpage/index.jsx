import AdminGate from "../../components/AdminGate.jsx";
import AdminDashboard from "../../components/AdminDashboard.jsx";

export default function AdminPage() {
    return (
        <AdminGate>
            <AdminDashboard />
        </AdminGate>
    );
}
