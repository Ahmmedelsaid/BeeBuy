import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import firebase from "../firebase";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/orders", label: "My Orders" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive ? "bg-brand-100 text-brand-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  const signOut = async () => {
    setOpen(false);
    await firebase.auth().signOut();
    navigate("/sign-in");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src={logo} alt="" className="h-9 w-auto" />
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Bee<span className="text-brand-500">Buy</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            aria-label={`Cart, ${count} items`}
            className="relative rounded-full p-2.5 text-slate-700 transition hover:bg-slate-100"
          >
            <FaShoppingCart className="text-lg" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-400 px-1 text-[11px] font-bold text-slate-900">
                {count}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden items-center gap-2 md:flex">
              <Link to="/profile" className="btn-ghost !px-3 !py-2" aria-label="Profile">
                <FaUserCircle /> Profile
              </Link>
              <button onClick={signOut} className="btn-dark !py-2">
                Log out
              </button>
            </div>
          ) : (
            <Link to="/sign-in" className="btn-primary hidden !py-2 md:inline-flex">
              Sign in
            </Link>
          )}

          <button
            className="rounded-lg p-2.5 text-slate-700 hover:bg-slate-100 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 pb-4 pt-2 md:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            {user && (
              <NavLink to="/profile" className={linkClass} onClick={() => setOpen(false)}>
                Profile
              </NavLink>
            )}
            {user ? (
              <button onClick={signOut} className="btn-dark mt-2">
                Log out
              </button>
            ) : (
              <Link to="/sign-in" className="btn-primary mt-2" onClick={() => setOpen(false)}>
                Sign in
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
