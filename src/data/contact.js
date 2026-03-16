import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const CONTACT_INFO = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["12 Rue du Faubourg", "Paris, France 75008"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+33 1 23 45 67 89", "Mon–Fri, 9am–6pm CET"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["hello@maisonatelier.com", "We reply within 24 hours"],
  },
  {
    icon: Clock,
    title: "Opening Hours",
    lines: ["Mon–Sat: 10am – 7pm", "Sunday: 12pm – 5pm"],
  },
];

export const SUBJECTS = [
  "General Enquiry",
  "Order Issue",
  "Returns & Exchanges",
  "Sizing Help",
  "Press & Collaboration",
  "Other",
];
