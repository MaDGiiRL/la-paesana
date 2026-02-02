import { eur } from "../../utils/admin.js";

export default function CustomersSection({ customers }) {
  return (
    <div className="ui-card p-5 md:p-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="ui-chip">Clienti</div>
          <h2 className="mt-2 text-xl font-black">Clienti (demo)</h2>
          <p className="mt-1 ui-muted text-sm">
            Deduciamo i clienti dagli ordini (telefono/email/nome).
          </p>
        </div>
        <div className="ui-chip">{customers.length}</div>
      </div>

      {customers.length === 0 ? (
        <div className="mt-4 ui-soft p-4">
          <div className="font-bold">Nessun cliente</div>
          <div className="ui-muted text-sm mt-1">Fai un ordine demo per popolare la lista.</div>
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[rgba(20,20,20,0.10)] bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[rgba(20,20,20,0.02)]">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Telefono</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Ordini</th>
                <th className="px-4 py-3">Spesa</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c, idx) => (
                <tr key={idx} className="border-t border-[rgba(20,20,20,0.10)]">
                  <td className="px-4 py-3 font-semibold">{c.name}</td>
                  <td className="px-4 py-3 ui-muted">{c.phone}</td>
                  <td className="px-4 py-3 ui-muted">{c.email}</td>
                  <td className="px-4 py-3">{c.ordersCount}</td>
                  <td className="px-4 py-3 font-black">{eur(c.spent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
