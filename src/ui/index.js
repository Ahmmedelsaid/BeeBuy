import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import imageMap from "../imageMap.json";

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
  `${Number(String(n ?? 0).replace(/,/g, "") || 0).toLocaleString("en-EG", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} EGP`;

// Product/shop photos used to live in Firebase Storage (no longer available on the free plan).
// Files kept in public/images are served locally; see imageMap.json (key = original file name).
const storageFileName = (url) => {
  try {
    return decodeURIComponent(url.split("/o/")[1].split("?")[0]).split("/").pop();
  } catch (e) {
    return "";
  }
};

export const resolveImage = (url) => {
  if (!url) return url;
  // Relative paths (e.g. "images/products/...") live in public/.
  if (!/^(https?:)?\/\/|^data:/.test(url)) return `${process.env.PUBLIC_URL}/${url.replace(/^\//, "")}`;
  if (!url.includes("firebasestorage.googleapis.com")) return url;
  const local = imageMap[storageFileName(url)];
  return local ? `${process.env.PUBLIC_URL}/${local}` : url;
};

const initials = (text) =>
  (text || "?")
    .split(/s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

const hueFor = (text) => [...(text || "")].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7);

const makePlaceholder = (label) => {
  const hue = 35 + (hueFor(label) % 25); // stay in the honey/amber range
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue},90%,92%)"/><stop offset="1" stop-color="hsl(${hue},85%,80%)"/></linearGradient></defs><rect width="200" height="200" fill="url(#g)"/><text x="100" y="118" text-anchor="middle" font-family="Poppins,Arial,sans-serif" font-weight="700" font-size="64" fill="hsl(${hue},70%,32%)" opacity="0.85">${initials(label).replace(/[<>&]/g, "")}</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
};

/** <img> that serves local copies when available and falls back to a branded placeholder. */
export function SafeImage({ alt = "", src, ...props }) {
  return (
    <img
      alt={alt}
      src={resolveImage(src)}
      {...props}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = makePlaceholder(alt);
      }}
    />
  );
}
