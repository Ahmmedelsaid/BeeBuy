import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMinus, FaPlus, FaShoppingBasket, FaTimes, FaTrashAlt, FaMapMarkerAlt } from "react-icons/fa";
import firebase from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import RequireAuth from "../layout/RequireAuth";
import { EmptyState, PageHeader, Spinner, formatPrice, SafeImage } from "../ui";

const emptyForm = { name: "", phone: "", street: "", building: "", floor: "", address: "", mapUrl: "" };

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function CheckoutModal({ onClose, onSuccess }) {
  const { user } = useAuth();
  const { items, subtotal, delivery, total, clear } = useCart();
  const notify = useToast();
  const [form, setForm] = useState(emptyForm);
  const [coords, setCoords] = useState(null);
  const [locating, setLocating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Your browser doesn't support location.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords: c }) => {
        setCoords({ latitude: c.latitude, longitude: c.longitude });
        setForm((f) => ({
          ...f,
          mapUrl: `https://www.google.com/maps/search/?api=1&query=${c.latitude},${c.longitude}`,
        }));
        setLocating(false);
      },
      () => {
        setError("Couldn't get your location. You can type your address instead.");
        setLocating(false);
      }
    );
  };

  const submit = async (e) => {
    e.preventDefault();
    const required = ["name", "phone", "street", "building", "floor", "address"];
    if (required.some((k) => !form[k].trim())) {
      setError("Please fill in all the required fields.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .add({
          UserName: form.name.trim(),
          UserPhone: form.phone.trim(),
          Address: form.address.trim(),
          StreetName: form.street.trim(),
          BuildingNo: form.building.trim(),
          Floor: form.floor.trim(),
          AddressUrl: form.mapUrl.trim(),
          Latitude: coords ? coords.latitude : null,
          Longitude: coords ? coords.longitude : null,
          UserOrder: items.map(({ id, ProductName, ImageURL, Price, quantity, StoreName, MallName }) => ({
            id,
            ProductName,
            ImageURL,
            Price,
            quantity,
            StoreName,
            MallName,
          })),
          Subtotal: subtotal,
          DeliveryFee: delivery,
          TotalCost: total,
          delivered: false,
          packing: false,
          OrderDate: firebase.firestore.FieldValue.serverTimestamp(),
        });
      await clear();
      notify("Order confirmed! We're on it.", { to: "/orders", toLabel: "My orders" });
      onSuccess();
    } catch (err) {
      console.error(err);
      setError("Couldn't place your order. Please try again.");
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[55] flex items-end justify-center bg-slate-900/60 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label="Checkout">
      <form onSubmit={submit} className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-900">Delivery details</h2>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Close">
            <FaTimes />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Full name *">
              <input className="input" value={form.name} onChange={set("name")} autoFocus autoComplete="name" />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Phone *">
              <input className="input" type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Street *">
              <input className="input" value={form.street} onChange={set("street")} autoComplete="street-address" />
            </Field>
          </div>
          <Field label="Building no. *">
            <input className="input" inputMode="numeric" value={form.building} onChange={set("building")} />
          </Field>
          <Field label="Floor *">
            <input className="input" inputMode="numeric" value={form.floor} onChange={set("floor")} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Area / city *">
              <input className="input" value={form.address} onChange={set("address")} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Map link (optional)">
              <div className="flex gap-2">
                <input className="input" value={form.mapUrl} onChange={set("mapUrl")} placeholder="https://maps.google.com/..." />
                <button type="button" onClick={useMyLocation} disabled={locating} className="btn-ghost shrink-0 !px-3" aria-label="Use my location">
                  <FaMapMarkerAlt /> {locating ? "..." : "Locate"}
                </button>
              </div>
            </Field>
          </div>
        </div>

        <dl className="mt-6 space-y-2 rounded-2xl bg-slate-50 p-4 text-sm">
          <div className="flex justify-between"><dt className="text-slate-500">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-slate-500">Delivery</dt><dd>{formatPrice(delivery)}</dd></div>
          <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-extrabold text-slate-900"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
        </dl>

        {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</p>}

        <div className="mt-6 flex gap-3">
          <button type="button" onClick={onClose} className="btn-ghost flex-1">Cancel</button>
          <button type="submit" disabled={saving} className="btn-primary flex-1">{saving ? "Placing order..." : "Confirm order"}</button>
        </div>
      </form>
    </div>
  );
}

function CartContent() {
  const { items, ready, subtotal, delivery, total, changeQuantity, removeItem } = useCart();
  const [checkout, setCheckout] = useState(false);
  const navigate = useNavigate();

  if (!ready) return <Spinner />;

  if (items.length === 0) {
    return (
      <div className="px-4 py-16">
        <EmptyState
          icon={FaShoppingBasket}
          title="Your cart is empty"
          text="Browse the malls and add something you like."
          action={<Link to="/" className="btn-primary">Start shopping</Link>}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader title="Your cart" subtitle={`${items.length} ${items.length === 1 ? "product" : "products"}`} />
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="card flex gap-4 p-4">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                {item.ImageURL && <SafeImage src={item.ImageURL} alt={item.ProductName} className="h-full w-full object-cover" />}
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-slate-900">{item.ProductName}</h3>
                    <p className="truncate text-sm text-slate-500">{[item.StoreName, item.MallName].filter(Boolean).join(" · ")}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600" aria-label={`Remove ${item.ProductName}`}>
                    <FaTrashAlt />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center rounded-xl border border-slate-300">
                    <button onClick={() => changeQuantity(item.id, -1)} className="p-2.5 text-slate-600 hover:text-slate-900" aria-label="Decrease quantity"><FaMinus className="text-xs" /></button>
                    <span className="min-w-[2rem] text-center text-sm font-semibold" aria-live="polite">{item.quantity}</span>
                    <button onClick={() => changeQuantity(item.id, 1)} className="p-2.5 text-slate-600 hover:text-slate-900" aria-label="Increase quantity"><FaPlus className="text-xs" /></button>
                  </div>
                  <span className="font-extrabold text-slate-900">{formatPrice(item.Price * item.quantity)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="card h-fit p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-extrabold text-slate-900">Order summary</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-slate-500">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Delivery</dt><dd>{formatPrice(delivery)}</dd></div>
            <div className="flex justify-between border-t border-slate-200 pt-3 text-lg font-extrabold text-slate-900"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
          </dl>
          <button onClick={() => setCheckout(true)} className="btn-primary mt-6 w-full">Checkout</button>
          <Link to="/" className="mt-3 block text-center text-sm text-slate-500 hover:text-brand-600">Continue shopping</Link>
        </aside>
      </div>

      {checkout && (
        <CheckoutModal
          onClose={() => setCheckout(false)}
          onSuccess={() => {
            setCheckout(false);
            navigate("/orders");
          }}
        />
      )}
    </div>
  );
}

export default function Cart() {
  return (
    <RequireAuth message="Sign in to see your cart and place orders.">
      <CartContent />
    </RequireAuth>
  );
}
