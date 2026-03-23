import { Helmet } from "react-helmet-async";

const BRAND = "RAJA Atelier";

export default function PageTitle({ title }) {
  return (
    <Helmet>
      <title>{title ? `${title} — ${BRAND}` : BRAND}</title>
    </Helmet>
  );
}
