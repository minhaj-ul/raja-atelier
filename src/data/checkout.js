export const SHIPPING_METHODS = [
  {
    id: "standard",
    label: "Standard Delivery",
    description: "3–5 business days",
    price: 0,
    note: "Free on orders over ৳5,000",
  },
  {
    id: "express",
    label: "Express Delivery",
    description: "1–2 business days",
    price: 350,
    note: "Available within Dhaka & major cities",
  },
  {
    id: "overnight",
    label: "Same Day Delivery",
    description: "Within Dhaka only",
    price: 600,
    note: "Order before 12pm BST",
  },
];

export const VALID_PROMO_CODES = {
  RAJA10: { discount: 10, type: "percent", label: "10% off" },
  WELCOME20: { discount: 20, type: "percent", label: "20% off" },
  FREESHIP: { discount: 0, type: "freeship", label: "Free shipping" },
};

export const COUNTRIES = [
  "Bangladesh",
  "India",
  "Pakistan",
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "UAE",
  "Saudi Arabia",
  "Qatar",
  "Malaysia",
  "Singapore",
  "Japan",
  "Germany",
  "France",
  "Other",
];
