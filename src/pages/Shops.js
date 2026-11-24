import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaStore } from "react-icons/fa";
import { useCatalog } from "../context/CatalogContext";
import { mallPath, shopPath } from "../ui/slug";
import { Breadcrumbs, PageHeader, SafeImage, Spinner } from "../ui";
import NotFound from "./NotFound";

export default function Shops() {
  const { mallSlug, categorySlug } = useParams();
  const { malls, loading, error } = useCatalog();
  const mall = malls.find((m) => m.slug === mallSlug);
  const category = mall && mall.cats.find((c) => c.slug === categorySlug);

  if (loading) return <Spinner />;
  if (error) return <p className="card mx-auto my-16 max-w-md p-6 text-center text-slate-500">Couldn't load shops.</p>;
  if (!category) return <NotFound />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: mall.name, to: mallPath(mall) },
          { label: category.name },
        ]}
      />
      <PageHeader title={`${category.name} shops`} subtitle="Pick a shop to see its products." />

      {category.shops.length === 0 && <p className="card p-6 text-center text-slate-500">No shops in this category yet.</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {category.shops.map((shop) => (
          <Link
            key={shop.id}
            to={shopPath(mall, category, shop)}
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
