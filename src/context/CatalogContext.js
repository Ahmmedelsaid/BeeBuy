import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "../firebase";
import { withSlugs } from "../ui/slug";

const CatalogContext = createContext({ malls: [], loading: true, error: null });

/** Loads malls > categories > shops once (a handful of reads) so URLs can use readable slugs. */
async function loadCatalog() {
  const mallDocs = await firebase.firestore().collection("malls").get();
  const malls = await Promise.all(
    mallDocs.docs.map(async (mallDoc) => {
      const categoryDocs = await mallDoc.ref.collection("Categories").get();
      const cats = await Promise.all(
        categoryDocs.docs.map(async (categoryDoc) => {
          const shopDocs = await categoryDoc.ref.collection("shops").get();
          return {
            id: categoryDoc.id,
            ...categoryDoc.data(),
            shops: withSlugs(shopDocs.docs.map((s) => ({ id: s.id, ...s.data() }))),
          };
        })
      );
      return { id: mallDoc.id, ...mallDoc.data(), cats: withSlugs(cats) };
    })
  );
  return withSlugs(malls);
}

export function CatalogProvider({ children }) {
  const [state, setState] = useState({ malls: [], loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    loadCatalog()
      .then((malls) => !cancelled && setState({ malls, loading: false, error: null }))
      .catch((error) => !cancelled && setState({ malls: [], loading: false, error }));
    return () => {
      cancelled = true;
    };
  }, []);

  return <CatalogContext.Provider value={state}>{children}</CatalogContext.Provider>;
}

export const useCatalog = () => useContext(CatalogContext);
