import AdminGate from "../../components/admin/AdminGate.jsx";
import AdminDashboard from "../../components/admin/AdminDashboard.jsx";

export default function AdminPage() {
    return (
        <AdminGate>
            {({ onLogout }) => <AdminDashboard onLogout={onLogout} />}
        </AdminGate>
    );
}
