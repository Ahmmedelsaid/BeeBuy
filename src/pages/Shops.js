import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaStore } from "react-icons/fa";
import firebase from "../firebase";
import { Breadcrumbs, PageHeader, Spinner, SafeImage } from "../ui";
import useFirestoreList from "../ui/useFirestoreList";

export default function Shops() {
  const { mallId, categoryId } = useParams();
  const category = () => firebase.firestore().collection("malls").doc(mallId).collection("Categories");

  const { data: shops, loading, error } = useFirestoreList(
    () => category().doc(categoryId).collection("shops").get(),
    [mallId, categoryId]
  );
  const { data: categories } = useFirestoreList(() => category().get(), [mallId]);
  const categoryName = categories.find((c) => c.id === categoryId)?.name;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Categories", to: `/mall/${mallId}/Categories` },
          { label: categoryName || "Shops" },
        ]}
      />
      <PageHeader title={categoryName ? `${categoryName} shops` : "Shops"} subtitle="Pick a shop to see its products." />

      {loading && <Spinner />}
      {error && <p className="card p-6 text-center text-slate-500">Couldn't load shops.</p>}
      {!loading && !error && shops.length === 0 && (
        <p className="card p-6 text-center text-slate-500">No shops in this category yet.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shops.map((shop) => (
          <Link
            key={shop.id}
            to={`/mall/${mallId}/Categories/${categoryId}/shops/${shop.id}/products`}
            className="card group flex items-center gap-4 p-4 transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-md"
          >
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
              {shop.imageUrl ? (
                <SafeImage src={shop.imageUrl} alt={shop.name} loading="lazy" className="h-full w-full object-contain" />
              ) : (
                <FaStore className="text-2xl text-slate-400" />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="truncate font-bold text-slate-900 group-hover:text-brand-700">{shop.name}</h3>
              {shop.address && (
                <p className="mt-1 flex items-center gap-1.5 truncate text-sm text-slate-500">
                  <FaMapMarkerAlt className="shrink-0 text-brand-500" /> {shop.address}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
