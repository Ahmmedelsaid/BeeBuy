import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

export function Spinner({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-slate-500" role="status">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-500" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-slate-500">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-sm text-slate-500">
      {items.map((item, i) => (
        <React.Fragment key={item.label + i}>
          {i > 0 && <FaChevronRight className="text-[10px]" />}
          {item.to ? (
            <Link to={item.to} className="hover:text-brand-600">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-slate-800">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="card mx-auto flex max-w-md flex-col items-center px-6 py-14 text-center">
      {Icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-2xl text-brand-600">
          <Icon />
        </div>
      )}
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      {text && <p className="mt-1 text-sm text-slate-500">{text}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export const formatPrice = (n) =>
  `${Number(n || 0).toLocaleString("en-EG", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} EGP`;

const placeholder =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="#f1f5f9"/><g fill="none" stroke="#cbd5e1" stroke-width="4" stroke-linejoin="round"><path d="M60 30 88 46v32L60 94 32 78V46z"/><path d="M32 46l28 16 28-16M60 62v32"/></g></svg>'
  );

/** <img> that swaps to a neutral placeholder if the remote image fails to load. */
export function SafeImage({ alt = "", ...props }) {
  return (
    <img
      alt={alt}
      {...props}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = placeholder;
        e.currentTarget.classList.add("!object-contain", "p-6");
      }}
    />
  );
}
