import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useCatalog } from "../context/CatalogContext";
import { categoryPath, mallPath, shopPath } from "../ui/slug";
import { Spinner } from "../ui";
import NotFound from "./NotFound";

/** Old links used Firestore ids (/mall/:id/Categories/:id/shops/:id/products); send them to the readable URL. */
export default function LegacyRedirect() {
  const { mallId, categoryId, shopId } = useParams();
  const { malls, loading } = useCatalog();

  if (loading) return <Spinner />;

  const mall = malls.find((m) => m.id === mallId);
  const category = mall && mall.cats.find((c) => c.id === categoryId);
  const shop = category && category.shops.find((s) => s.id === shopId);

  if (shop) return <Navigate to={shopPath(mall, category, shop)} replace />;
  if (category) return <Navigate to={categoryPath(mall, category)} replace />;
  if (mall) return <Navigate to={mallPath(mall)} replace />;
  return <NotFound />;
}
