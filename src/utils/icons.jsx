export const IC = {
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  close:  "M18 6L6 18M6 6l12 12",
  plus:   "M12 5v14M5 12h14",
  minus:  "M5 12h14",
  bag:    "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
  filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  check:  "M20 6L9 17l-5-5",
  trash:  "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  arrow:  "M5 12h14M12 5l7 7-7 7",
};

export const Icon = ({ d, size = 20, stroke = "currentColor", fill = "none", sw = 1.5 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0, display: "block" }}
  >
    <path d={d} />
  </svg>
);