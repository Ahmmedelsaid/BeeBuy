import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="h-10 w-auto" />
          <div>
            <p className="font-bold text-white">
              Bee<span className="text-brand-400">Buy</span>
            </p>
            <p className="text-sm text-slate-400">Shop your favourite malls from home.</p>
          </div>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Footer">
          <Link to="/" className="hover:text-brand-300">Home</Link>
          <Link to="/about" className="hover:text-brand-300">About</Link>
          <Link to="/contact" className="hover:text-brand-300">Contact</Link>
          <Link to="/cart" className="hover:text-brand-300">Cart</Link>
        </nav>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} BeeBuy. Graduation project built with React & Firebase.
      </div>
    </footer>
  );
}
