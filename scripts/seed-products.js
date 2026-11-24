/**
 * Replaces the products of four shops with items that have real photos in public/images/products.
 *
 *   node scripts/seed-products.js            # dry run (prints what would change)
 *   node scripts/seed-products.js --apply    # writes to Firestore
 *
 * It talks to Firestore through the public REST API with the web API key, so it only works while the
 * Firestore rules allow client writes. With the locked-down rules in firestore.rules, run it with
 * an admin credential instead (or temporarily relax the rules).
 * A copy of the catalog before the migration is in backup/catalog-before-image-migration.json.
 */
const backup = require("../backup/catalog-before-image-migration.json");

const PROJECT = "beebuy-8d00b";
const KEY = "AIzaSyD9mLMTo7d-DKGa45I9Z29l7ZMvuPfLt8U";
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;
const APPLY = process.argv.includes("--apply");

const adidasMen = [
  ["Argentina Anthem Jacket", "Lightweight zip jacket with an all-over graphic and national-team crest.", 3199],
  ["Aeroready Training Tee", "Breathable training tee that keeps you dry through every set.", 899],
  ["Ultraboost DNA Running Shoes", "Responsive Boost cushioning with a sock-like knit upper.", 5499],
  ["Essentials Hooded Track Jacket", "Everyday zip-through jacket with a water-resistant finish.", 2799],
  ["Terrex Multi Wind Jacket", "Packable colour-block jacket for trail days.", 3299],
  ["ZX 2K Boost Shoes", "Retro-inspired runner with a glow-in-the-dark finish.", 4199],
  ["Ultraboost Heat.RDY Running Shoes", "Cool-weather-ready running shoes with Boost energy return.", 5799],
  ["Goalkeeper Jersey", "Padded-feel goalkeeper jersey in a bold green print.", 1599],
  ["Terrex Hiking Shoes", "Grippy, durable shoes for rough trails.", 3799],
  ["Essentials Training Shorts", "Soft training shorts with a drawcord waist.", 1099],
  ["NMD_R1 Shoes", "Street-ready sneakers with Boost midsole and iconic plugs.", 4599],
  ["Club Tennis Polo Shirt", "Slim-fit polo made for the court and beyond.", 1299],
  ["Copa Sense.1 Firm Ground Boots", "Soft-touch football boots for confident control.", 4299],
  ["Adicolor Classics Track Pants", "Retro track pants with the classic 3-Stripes.", 1899],
  ["Predator Edge.1 Firm Ground Boots", "Football boots built for precise finishing.", 4799],
  ["3-Stripes Training Tee", "Classic white tee with bold sleeve stripes.", 849],
  ["Performance Ankle Socks", "Cushioned ankle socks with targeted support.", 349],
  ["Classic Backpack", "Compact backpack in a soft pastel shade.", 1199],
  ["Tapered Training Pants", "Comfortable tapered pants for workouts and lounging.", 1699],
  ["Graphic Logo Tee", "Relaxed cotton tee with a bold chest graphic.", 999],
  ["Studio Lounge Tee", "Easy, soft tee in a neutral sand tone.", 899],
  ["Full-Zip Hooded Jacket", "Warm full-zip hoodie jacket with a clean black finish.", 2599],
  ["3-Stripes Training Shorts", "Lightweight navy shorts with side stripes.", 949],
  ["Two-in-One Training Shorts", "Layered shorts with built-in tights for added support.", 1399],
].map(([name, description, price], i) => ({ name, description, price, image: `images/products/adidas-originals/${String(i + 1).padStart(2, "0")}.webp` }));

const guess = [
  ["Knit Button Cardigan", "Textured knit cardigan with contrast trim.", 4200],
  ["Black Denim Shorts", "Slim-cut denim shorts with a worn-in look.", 2100],
  ["Patch Leather Bomber Jacket", "Statement leather bomber with embroidered patches.", 12900],
  ["Slim Tapered Jeans - Dark Wash", "Dark-wash stretch denim with a tapered leg.", 2900],
  ["Crew Neck Sweater", "Soft knit sweater in solid black.", 2600],
  ["Relaxed Chino Trousers", "Pleated relaxed-fit trousers in sand.", 2800],
  ["Suede-Look Blazer", "Soft camel blazer with patch pockets.", 7800],
  ["Short-Sleeve Linen Shirt", "Airy white shirt for warm days.", 2300],
  ["Western Graphic Tee", "Vintage-inspired graphic tee in sand.", 1500],
  ["Guess Gift Card", "Give the gift of choice - redeemable in store.", 1000],
  ["Cream V-Neck Tee", "Everyday V-neck tee in soft cotton jersey.", 1100],
  ["Utility Field Jacket", "Four-pocket field jacket with a stand collar.", 6400],
  ["Light Wash Straight Jeans", "Straight-leg jeans in a faded light wash.", 2900],
  ["Distressed Slim Jeans", "Slim jeans with ripped knees and a faded finish.", 3100],
  ["Guess Logo Graphic Tee", "White tee with a bold logo print.", 1400],
  ["Light Wash Slim Jeans", "Stretch slim jeans in a clean light wash.", 2900],
  ["Garment-Dyed Polo Shirt", "Washed-pink polo with a relaxed fit.", 1800],
  ["Floral Print Shirt", "Long-sleeve shirt in a bright floral print.", 2400],
  ["Faded Straight Jeans", "Classic straight denim with a sun-faded finish.", 2900],
  ["Henley Knit Sweater", "Cream knit sweater with a button placket.", 2700],
  ["Tropical Print Shirt", "Short-sleeve shirt with a soft tropical pattern.", 2200],
  ["Light Blue Skinny Jeans", "Skinny stretch jeans in a light blue wash.", 2800],
  ["Triangle Logo Tee", "White tee with the iconic triangle logo.", 1300],
  ["Washed Pullover Hoodie", "Relaxed pullover hoodie in a washed coral shade.", 3200],
].map(([name, description, price], i) => ({ name, description, price, image: `images/products/guess/${String(i + 1).padStart(2, "0")}.webp` }));

const adidasKids = [
  ["Real Madrid Home Jersey", "Kids' replica home jersey in breathable fabric.", 1999],
  ["Future Icons Full-Zip Hoodie", "Black zip hoodie with 3-Stripes on the sleeves.", 1699],
  ["Tiro Track Pants", "Slim tapered training pants with zip pockets.", 1199],
  ["Essentials Shorts", "Soft black shorts with a logo detail.", 799],
  ["Techfit Training Tights", "Close-fitting tights for running and training.", 899],
  ["Adicolor Track Pants", "Classic track pants with side stripes.", 1099],
  ["3-Stripes Swimsuit", "Chlorine-resistant swimsuit with a racerback.", 949],
  ["Adicolor SST Track Jacket", "Iconic red track jacket with the Trefoil logo.", 1799],
  ["Tiro Track Jacket", "Black and red training jacket with stand collar.", 1699],
  ["Allover Print Track Top", "Patterned track top with a bold graphic print.", 1599],
  ["Training Tee and Shorts Set", "Bright tee and shorts set for match days.", 1299],
  ["Camo Trefoil Hoodie", "Blue hoodie with a camo Trefoil print.", 1599],
  ["Linear Full-Zip Hoodie", "Comfy black zip hoodie with a linear logo.", 1499],
  ["Printed Training Tee", "Quick-dry tee with a dark all-over print.", 749],
  ["Japan Home Jersey", "Kids' replica football jersey in royal blue.", 1999],
  ["Spain Away Jersey", "Kids' replica away jersey in light blue.", 1999],
  ["Belgium Home Jersey", "Kids' replica home jersey in bold red.", 1999],
  ["Badge of Sport Tee", "Black cotton tee with a large logo.", 699],
  ["Printed Training Leggings", "Stretchy leggings with a tonal animal print.", 949],
  ["Graphic Logo Tee", "Bright tee with a colourful logo print.", 749],
  ["Aeroready Training Tee", "Quick-dry training tee in pink.", 699],
  ["Logo Print Tee", "Dark tee with a layered logo pattern.", 749],
  ["Germany Tiro Track Pants", "Training pants with orange details.", 1199],
  ["Adicolor Originals Tee", "White cotton tee with an Originals graphic.", 799],
].map(([name, description, price], i) => ({ name, description, price, image: `images/products/adidas-kids-citystars/${String(i + 1).padStart(2, "0")}.webp` }));

const targets = [
  { mall: "City Stars", shop: "Adidas Originals", items: adidasMen },
  { mall: "City Stars", shop: "Guess", items: guess },
  { mall: "City Stars", shop: "Adidas Kids", items: adidasKids },
  { mall: "Cairo Festival City", shop: "Adidas Kids", items: adidasKids },
];

const str = (v) => ({ stringValue: String(v) });

async function call(method, path, body) {
  const res = await fetch(`${BASE}/${path}${path.includes("?") ? "&" : "?"}key=${KEY}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status} ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

(async () => {
  for (const t of targets) {
    const mall = backup.find((m) => m.name === t.mall);
    const cat = mall.cats.find((c) => c.shops.some((s) => s.name === t.shop));
    const shop = cat.shops.find((s) => s.name === t.shop);
    const path = `malls/${mall.id}/Categories/${cat.id}/shops/${shop.id}/products`;
    console.log(`${APPLY ? "APPLY" : "DRY"}: ${t.mall} / ${t.shop}: remove ${shop.products.length}, add ${t.items.length}`);
    if (!APPLY) continue;

    for (const old of shop.products) await call("DELETE", `${path}/${old.id}`);
    for (const item of t.items) {
      await call("POST", path, {
        fields: {
          name: str(item.name),
          description: str(item.description),
          price: str(item.price.toFixed(2)),
          imageUrl: str(item.image),
          mallName: str(t.mall),
          storeName: str(t.shop),
          category: str(cat.name),
        },
      });
    }
  }
  console.log("done");
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
