export const SHIPPING_METHODS = [
  {
    id: "standard",
    label: "Standard Shipping",
    description: "3–5 business days",
    price: 0,
    note: "Free on orders over $250",
  },
  {
    id: "express",
    label: "Express Shipping",
    description: "1–2 business days",
    price: 18,
    note: "Guaranteed next business day available",
  },
  {
    id: "overnight",
    label: "Overnight Shipping",
    description: "Next business day",
    price: 32,
    note: "Order before 12pm CET",
  },
];

export const VALID_PROMO_CODES = {
  MAISON10: { discount: 10, type: "percent", label: "10% off" },
  WELCOME20: { discount: 20, type: "percent", label: "20% off" },
  FREESHIP: { discount: 0, type: "freeship", label: "Free shipping" },
};

export const COUNTRIES = [
  "United Kingdom",
  "France",
  "Germany",
  "Italy",
  "Spain",
  "Netherlands",
  "Belgium",
  "Switzerland",
  "United States",
  "Canada",
  "Australia",
  "Japan",
  "Singapore",
  "Bangladesh",
  "Other",
];
