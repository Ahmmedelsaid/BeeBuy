import React from "react";
import { Link } from "react-router-dom";
import { FaClock, FaHeart, FaShieldAlt, FaTruck, FaUsers } from "react-icons/fa";
import { PageHeader } from "../ui";

const points = [
  { icon: FaTruck, title: "Easy delivery", text: "Products from the malls delivered to your door by motorcycle or pick-up truck, depending on your order." },
  { icon: FaUsers, title: "Less crowding", text: "Fewer people in the malls means healthier, calmer shopping for everyone." },
  { icon: FaShieldAlt, title: "Trusted places", text: "Purchases and refunds only from known, trusted shops." },
  { icon: FaClock, title: "Fast shipping", text: "An additional shipping service delivers your products within 24 hours." },
];

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader title="About BeeBuy" subtitle="Shopping the malls, without leaving the house." />

      <section className="card p-6 sm:p-8">
        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
          <FaHeart className="text-brand-500" /> Our mission
        </h2>
        <p className="mt-3 leading-relaxed text-slate-600">
          Some people find it hard to go to the mall, need assistance in their daily lives, or live far from the shops.
          Our mission is to make it easier for everyone to shop in the malls from home, without needing anyone's help:
          open your phone, browse the mall as if you were inside it, choose what you want and we send it to you.
        </p>
      </section>

      <h2 className="mb-4 mt-10 text-xl font-bold text-slate-900">What we do</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {points.map(({ icon: Icon, title, text }) => (
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

      <div className="mt-10 rounded-2xl bg-slate-900 p-8 text-center">
        <h2 className="text-xl font-bold text-white">Ready to try it?</h2>
        <Link to="/" className="btn-primary mt-4">Explore malls</Link>
      </div>
    </div>
  );
}
