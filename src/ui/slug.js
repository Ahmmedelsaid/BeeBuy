/** "Men's Wear" -> "mens-wear". Non-latin names fall back to "item". */
export const slugify = (text) =>
  String(text || "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "item";

/** Adds a unique `slug` to every item of a list (duplicates become "name-2", "name-3"...). */
export function withSlugs(items) {
  const seen = {};
  return items.map((item) => {
    const base = slugify(item.name || item.id);
    seen[base] = (seen[base] || 0) + 1;
    return { ...item, slug: seen[base] > 1 ? `${base}-${seen[base]}` : base };
  });
}

export const mallPath = (mall) => `/${mall.slug}`;
export const categoryPath = (mall, category) => `/${mall.slug}/${category.slug}`;
export const shopPath = (mall, category, shop) => `/${mall.slug}/${category.slug}/${shop.slug}`;
