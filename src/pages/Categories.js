import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaTags } from "react-icons/fa";
import firebase from "../firebase";
import { Breadcrumbs, PageHeader, Spinner } from "../ui";
import useFirestoreList from "../ui/useFirestoreList";

export default function Categories() {
  const { mallId } = useParams();
  const { data: categories, loading, error } = useFirestoreList(
    () => firebase.firestore().collection("malls").doc(mallId).collection("Categories").get(),
    [mallId]
  );
  const { data: mallDocs } = useFirestoreList(() => firebase.firestore().collection("malls").get(), []);
  const mall = mallDocs.find((m) => m.id === mallId);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: mall ? mall.name : "Mall" }]} />
      <PageHeader title="Categories" subtitle={mall ? `What would you like to shop for at ${mall.name}?` : undefined} />

      {loading && <Spinner />}
      {error && <p className="card p-6 text-center text-slate-500">Couldn't load categories.</p>}
      {!loading && !error && categories.length === 0 && (
        <p className="card p-6 text-center text-slate-500">No categories in this mall yet.</p>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((c) => (
          <Link
            key={c.id}
            to={`/mall/${mallId}/Categories/${c.id}/shops`}
            className="card group flex flex-col items-center gap-3 px-4 py-8 text-center transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-md"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-xl text-brand-600 transition group-hover:bg-brand-400 group-hover:text-slate-900">
              <FaTags />
            </span>
            <span className="font-semibold text-slate-800">{c.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
