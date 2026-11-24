import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaTags } from "react-icons/fa";
import { useCatalog } from "../context/CatalogContext";
import { categoryPath } from "../ui/slug";
import { Breadcrumbs, PageHeader, Spinner } from "../ui";
import NotFound from "./NotFound";

export default function Categories() {
  const { mallSlug } = useParams();
  const { malls, loading, error } = useCatalog();
  const mall = malls.find((m) => m.slug === mallSlug);

  if (loading) return <Spinner />;
  if (error) return <p className="card mx-auto my-16 max-w-md p-6 text-center text-slate-500">Couldn't load this mall.</p>;
  if (!mall) return <NotFound />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: mall.name }]} />
      <PageHeader title="Categories" subtitle={`What would you like to shop for at ${mall.name}?`} />

      {mall.cats.length === 0 && <p className="card p-6 text-center text-slate-500">No categories in this mall yet.</p>}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {mall.cats.map((c) => (
          <Link
            key={c.id}
            to={categoryPath(mall, c)}
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
