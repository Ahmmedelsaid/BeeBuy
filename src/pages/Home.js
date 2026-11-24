import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaShieldAlt, FaShippingFast, FaStore } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useCatalog } from "../context/CatalogContext";
import { mallPath } from "../ui/slug";
import { PageHeader, Spinner, SafeImage } from "../ui";

const features = [
  { icon: FaStore, title: "Browse real malls", text: "Walk through malls, categories and shops without leaving home." },
  { icon: FaShieldAlt, title: "Trusted shops", text: "Buy from known places with clear prices and easy returns." },
  { icon: FaShippingFast, title: "Delivered to you", text: "Order from several shops and get everything at your door." },
];

function MallCard({ mall }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(mallPath(mall))}
      className="group card overflow-hidden text-left transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      <div className="flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-slate-100 bg-white p-6">
        {mall.imageUrl && (
          <SafeImage
            src={mall.imageUrl}
            alt={mall.name}
            loading="lazy"
            className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-slate-900">{mall.name}</h3>
        <p className="flex items-center gap-2 text-sm text-slate-500">
          <FaMapMarkerAlt className="text-brand-500" /> {mall.address}
        </p>
        {(mall.discription || mall.description) && (
          <p className="mt-2 line-clamp-2 text-sm text-slate-600">{mall.discription || mall.description}</p>
        )}
        <span className="mt-4 inline-block text-sm font-semibold text-brand-600">Explore mall →</span>
      </div>
    </button>
  );
}

export default function Home() {
  const { malls, loading, error } = useCatalog();

  return (
    <>
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
          <div>
            <span className="inline-block rounded-full bg-brand-400/15 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brand-300">
              Shopping is easy now
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              The whole mall, <span className="text-brand-400">one tap away.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-slate-300">
              Pick a mall, explore its shops, add products to your cart and have them delivered to your door.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => document.getElementById("malls")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary"
              >
                Start shopping
              </button>
              <Link to="/about" className="btn btn-ghost !border-slate-600 !bg-transparent !text-white hover:!bg-slate-800">
                How it works
              </Link>
            </div>
          </div>
          <div className="hidden justify-center md:flex">
            <img src={logo} alt="BeeBuy mascot" className="h-72 w-auto drop-shadow-[0_20px_40px_rgba(247,189,46,0.35)]" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card flex gap-4 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-xl text-brand-600">
                <Icon />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm text-slate-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="malls" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-4 sm:px-6 lg:px-8">
        <PageHeader title="Malls" subtitle="Choose a mall to see its categories and shops." />
        {loading && <Spinner label="Loading malls..." />}
        {error && (
          <p className="card p-6 text-center text-slate-500">
            Couldn't load malls right now. Please try again in a moment.
          </p>
        )}
        {!loading && !error && malls.length === 0 && (
          <p className="card p-6 text-center text-slate-500">No malls available yet.</p>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {malls.map((mall) => (
            <MallCard key={mall.id} mall={mall} />
          ))}
        </div>
      </section>
    </>
  );
}
