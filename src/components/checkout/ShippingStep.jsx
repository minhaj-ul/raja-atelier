import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SHIPPING_METHODS, COUNTRIES } from "../../data/checkout";

function Field({ label, required, children }) {
  return (
    <div>
      <label className="text-[10px] tracking-widest uppercase text-stone-500 mb-1.5 block">
        {label} {required && <span className="text-amber-600">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function ShippingStep({
  data,
  onChange,
  selectedShipping,
  onSelectShipping,
}) {
  return (
    <div className="flex flex-col gap-5">
      {/* Contact info */}
      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-amber-600 mb-4">
          Contact Information
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="First Name" required>
            <Input
              value={data.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              placeholder="Isabelle"
              className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
            />
          </Field>
          <Field label="Last Name" required>
            <Input
              value={data.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              placeholder="Laurent"
              className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
            />
          </Field>
          <Field label="Email Address" required>
            <Input
              type="email"
              value={data.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="hello@example.com"
              className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
            />
          </Field>
          <Field label="Phone Number">
            <Input
              type="tel"
              value={data.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="+33 1 23 45 67 89"
              className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
            />
          </Field>
        </div>
      </div>

      <Separator className="bg-stone-200" />

      {/* Shipping address */}
      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-amber-600 mb-4">
          Shipping Address
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Address Line 1" required>
            <Input
              value={data.address1}
              onChange={(e) => onChange("address1", e.target.value)}
              placeholder="12 Rue du Faubourg"
              className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
            />
          </Field>
          <Field label="Address Line 2">
            <Input
              value={data.address2}
              onChange={(e) => onChange("address2", e.target.value)}
              placeholder="Apartment, suite, etc."
              className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
            />
          </Field>
          <Field label="City" required>
            <Input
              value={data.city}
              onChange={(e) => onChange("city", e.target.value)}
              placeholder="Paris"
              className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
            />
          </Field>
          <Field label="Postal Code" required>
            <Input
              value={data.postalCode}
              onChange={(e) => onChange("postalCode", e.target.value)}
              placeholder="75008"
              className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
            />
          </Field>
          <Field label="Country" required>
            <select
              value={data.country}
              onChange={(e) => onChange("country", e.target.value)}
              className="w-full border border-stone-300 bg-stone-50 px-3 py-2 text-sm font-sans font-light text-stone-950 outline-none focus:ring-1 focus:ring-amber-600 appearance-none cursor-pointer"
            >
              <option value="">Select a country…</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      <Separator className="bg-stone-200" />

      {/* Shipping method */}
      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-amber-600 mb-4">
          Shipping Method
        </p>
        <div className="flex flex-col gap-3">
          {SHIPPING_METHODS.map((method) => (
            <button
              key={method.id}
              onClick={() => onSelectShipping(method)}
              className={`
                flex items-center justify-between p-4 border text-left transition-all
                ${
                  selectedShipping?.id === method.id
                    ? "border-amber-600 bg-amber-50"
                    : "border-stone-300 bg-stone-50 hover:border-stone-400"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                  w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0
                  ${
                    selectedShipping?.id === method.id
                      ? "border-amber-600"
                      : "border-stone-300"
                  }
                `}
                >
                  {selectedShipping?.id === method.id && (
                    <div className="w-2 h-2 rounded-full bg-amber-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-950">
                    {method.label}
                  </p>
                  <p className="text-xs text-stone-500 font-light">
                    {method.description} · {method.note}
                  </p>
                </div>
              </div>
              <span className="text-sm font-medium text-stone-950 shrink-0 ml-4">
                {method.price === 0 ? "Free" : `$${method.price}`}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
