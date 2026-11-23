import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaCartPlus, FaSearch } from "react-icons/fa";
import firebase from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { Breadcrumbs, PageHeader, Spinner, formatPrice, SafeImage } from "../ui";
import useFirestoreList from "../ui/useFirestoreList";

export default function Products() {
  const { mallId, categoryId, shopId } = useParams();
  const { user } = useAuth();
  const { addItem } = useCart();
  const notify = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [adding, setAdding] = useState(null);

  const db = firebase.firestore();
  const mallRef = db.collection("malls").doc(mallId);
  const categoryRef = mallRef.collection("Categories").doc(categoryId);
  const shopRef = categoryRef.collection("shops").doc(shopId);

  const { data: products, loading, error } = useFirestoreList(
    () => shopRef.collection("products").get(),
    [mallId, categoryId, shopId]
  );
  const { data: names } = useFirestoreList(
    async () => {
      const [mall, category, shop] = await Promise.all([mallRef.get(), categoryRef.get(), shopRef.get()]);
      return {
        docs: [
          { id: "mall", data: () => mall.data() || {} },
          { id: "category", data: () => category.data() || {} },
          { id: "shop", data: () => shop.data() || {} },
        ],
      };
    },
    [mallId, categoryId, shopId]
  );
  const mallName = names.find((n) => n.id === "mall")?.name;
  const categoryName = names.find((n) => n.id === "category")?.name;
  const shopName = names.find((n) => n.id === "shop")?.name;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products
      .filter((p) => p.imageUrl)
      .filter((p) => !q || `${p.name} ${p.description}`.toLowerCase().includes(q));
  }, [products, query]);

  const handleAdd = async (product) => {
    if (!user) {
      notify("Please sign in to add items to your cart.", { type: "error" });
      navigate("/sign-in", { state: { from: location.pathname } });
      return;
    }
    setAdding(product.id);
    try {
      await addItem(product, { mallName, shopName });
      notify(`${product.name || "Item"} added to your cart.`, { to: "/cart", toLabel: "View cart" });
    } catch (e) {
      notify("Couldn't add the item. Please try again.", { type: "error" });
    } finally {
      setAdding(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: mallName || "Mall", to: `/mall/${mallId}/Categories` },
          { label: categoryName || "Category", to: `/mall/${mallId}/Categories/${categoryId}/shops` },
          { label: shopName || "Shop" },
        ]}
      />
      <PageHeader title={shopName || "Products"} subtitle="Add what you like to your cart.">
        <div className="relative w-full sm:w-72">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="input !pl-10"
          />
        </div>
      </PageHeader>

      {loading && <Spinner />}
      {error && <p className="card p-6 text-center text-slate-500">Couldn't load products.</p>}
      {!loading && !error && visible.length === 0 && (
        <p className="card p-6 text-center text-slate-500">
          {query ? "No products match your search." : "No products in this shop yet."}
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((p) => (
          <article key={p.id} className="card group flex flex-col overflow-hidden">
            <div className="aspect-square overflow-hidden bg-slate-100">
              <SafeImage
                src={p.imageUrl}
                alt={p.name || "Product"}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-4">
              {p.name && <h3 className="line-clamp-1 font-semibold text-slate-900">{p.name}</h3>}
              {p.description && <p className="mt-1 line-clamp-2 text-sm text-slate-500">{p.description}</p>}
              <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                <span className="text-lg font-extrabold text-slate-900">{formatPrice(p.price)}</span>
                <button
                  onClick={() => handleAdd(p)}
                  disabled={adding === p.id}
                  className="btn-primary !px-3 !py-2"
                  aria-label={`Add ${p.name || "item"} to cart`}
                >
                  <FaCartPlus />
                  <span className="hidden sm:inline">Add</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
