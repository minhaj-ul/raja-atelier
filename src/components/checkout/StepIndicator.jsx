import { Check, Truck, CreditCard, ClipboardList } from "lucide-react";

const STEPS = [
  { label: "Shipping", icon: Truck },
  { label: "Payment", icon: CreditCard },
  { label: "Review", icon: ClipboardList },
];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        return (
          <div key={step.label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`
                w-9 h-9 rounded-full flex items-center justify-center transition-all
                ${
                  isCompleted
                    ? "bg-amber-600 text-stone-50"
                    : isActive
                      ? "bg-stone-950 text-stone-50"
                      : "bg-stone-200 text-stone-400"
                }
              `}
              >
                {isCompleted ? <Check size={15} /> : <Icon size={15} />}
              </div>
              <span
                className={`text-[10px] uppercase tracking-widest ${
                  isActive ? "text-stone-950" : "text-stone-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={`w-16 md:w-24 h-px mx-2 mb-5 ${
                  isCompleted ? "bg-amber-600" : "bg-stone-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
