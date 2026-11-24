import { slugify, withSlugs, shopPath } from "./slug";

test("slugify makes readable url segments", () => {
  expect(slugify("Men's Wear")).toBe("mens-wear");
  expect(slugify("Cairo Festival City")).toBe("cairo-festival-city");
  expect(slugify("H&M  Kids!")).toBe("h-m-kids");
  expect(slugify("كايرو")).toBe("item");
});

test("withSlugs keeps slugs unique inside one list", () => {
  const out = withSlugs([{ id: "a", name: "Adidas Kids" }, { id: "b", name: "Adidas Kids" }, { id: "c", name: "Guess" }]);
  expect(out.map((i) => i.slug)).toEqual(["adidas-kids", "adidas-kids-2", "guess"]);
});

test("shopPath builds /mall/category/shop", () => {
  expect(shopPath({ slug: "city-stars" }, { slug: "mens-wear" }, { slug: "guess" })).toBe("/city-stars/mens-wear/guess");
});
