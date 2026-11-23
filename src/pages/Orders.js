import React from "react";
import { Link } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";
import firebase from "../firebase";
import { useAuth } from "../context/AuthContext";
import RequireAuth from "../layout/RequireAuth";
import { EmptyState, PageHeader, Spinner, formatPrice, SafeImage } from "../ui";
import useFirestoreList from "../ui/useFirestoreList";

function Status({ order }) {
  const [label, style] = order.delivered
    ? ["Delivered", "bg-green-100 text-green-700"]
    : order.packing
    ? ["Packing", "bg-blue-100 text-blue-700"]
    : ["Pending", "bg-brand-100 text-brand-700"];
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style}`}>{label}</span>;
}

const formatDate = (ts) =>
  ts && ts.toDate
    ? ts.toDate().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "";

function OrdersContent() {
  const { user } = useAuth();
  const { data: orders, loading, error } = useFirestoreList(
    () => firebase.firestore().collection("users").doc(user.uid).collection("orders").get(),
    [user.uid]
  );
  const sorted = [...orders].sort((a, b) => (b.OrderDate?.seconds || 0) - (a.OrderDate?.seconds || 0));

  if (loading) return <Spinner />;
  if (error) return <p className="card mx-auto my-16 max-w-md p-6 text-center text-slate-500">Couldn't load your orders.</p>;

  if (sorted.length === 0) {
    return (
      <div className="px-4 py-16">
        <EmptyState
          icon={FaBoxOpen}
          title="No orders yet"
          text="Once you place an order it will show up here."
          action={<Link to="/" className="btn-primary">Start shopping</Link>}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader title="My orders" subtitle={`${sorted.length} ${sorted.length === 1 ? "order" : "orders"}`} />
      <div className="space-y-5">
        {sorted.map((order) => (
          <article key={order.id} className="card overflow-hidden">
            <header className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-slate-50 px-5 py-3">
              <p className="text-sm text-slate-500">
                {formatDate(order.OrderDate) || "Order"} · <span className="font-mono text-xs">#{order.id.slice(0, 6).toUpperCase()}</span>
              </p>
              <Status order={order} />
            </header>
            <ul className="divide-y divide-slate-100">
              {(order.UserOrder || []).map((item, i) => (
                <li key={item.id || i} className="flex items-center gap-4 px-5 py-3">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    {item.ImageURL && <SafeImage src={item.ImageURL} alt={item.ProductName} className="h-full w-full object-cover" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-slate-900">{item.ProductName}</p>
                    <p className="truncate text-sm text-slate-500">
                      {item.StoreName} {item.quantity > 1 && `· x${item.quantity}`}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">{formatPrice((parseFloat(item.Price) || 0) * (item.quantity || 1))}</p>
                </li>
              ))}
            </ul>
            <footer className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
              <span className="text-sm text-slate-500">Total (incl. delivery)</span>
              <span className="text-lg font-extrabold text-slate-900">{formatPrice(order.TotalCost)}</span>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Orders() {
  return (
    <RequireAuth message="Sign in to see your orders.">
      <OrdersContent />
    </RequireAuth>
  );
}
