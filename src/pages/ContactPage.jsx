import { useState } from "react";
import { MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { CONTACT_INFO, SUBJECTS } from "../data/contact";
import Layout from "../layouts/Layout";
import PageTitle from "../components/shared/PageTitle";

export default function ContactPage({ user, onLogout }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent! We'll be in touch within 24 hours.");
    }, 1500);
  };

  return (
    <Layout user={user} onLogout={onLogout}>
      <div className="bg-stone-100">
        <PageTitle title="Contact Us" />

        {/* Hero */}
        <section className="bg-stone-950 text-stone-100 px-5 md:px-7 py-16 md:py-24 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-amber-600 mb-4">
            Get in Touch
          </p>
          <h1 className="font-display font-light text-4xl md:text-5xl leading-tight mb-4">
            We'd love to hear from you
          </h1>
          <p className="text-sm font-light text-stone-400 max-w-md mx-auto leading-relaxed">
            Whether you have a question about an order, need sizing advice, or
            just want to say hello — we're here.
          </p>
        </section>

        {/* Content */}
        <section className="max-w-340 mx-auto px-5 md:px-7 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* Contact info */}
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-amber-600 mb-3">
                Our Details
              </p>
              <h2 className="font-display font-light text-3xl mb-8 leading-snug">
                Find us here
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {CONTACT_INFO.map((info) => (
                  <div key={info.title}>
                    <div className="flex items-center gap-2 mb-2">
                      <info.icon
                        size={15}
                        className="text-amber-600 shrink-0"
                      />
                      <h3 className="text-xs uppercase tracking-widest text-stone-950 font-medium">
                        {info.title}
                      </h3>
                    </div>
                    {info.lines.map((line) => (
                      <p
                        key={line}
                        className="text-sm text-stone-500 font-light leading-relaxed"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              <Separator className="bg-stone-300 my-10" />

              {/* Map placeholder */}
              <div className="w-full h-56 bg-stone-200 flex items-center justify-center border border-stone-300">
                <div className="text-center text-stone-400">
                  <MapPin size={28} className="mx-auto mb-2 text-amber-600" />
                  <p className="text-xs tracking-wide">
                    House 12, Road 6, Banani, Dhaka
                  </p>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-amber-600 mb-3">
                Send a Message
              </p>
              <h2 className="font-display font-light text-3xl mb-8 leading-snug">
                Write to us
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name */}
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-stone-500 mb-1.5 block">
                    Full Name <span className="text-amber-600">*</span>
                  </label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-stone-500 mb-1.5 block">
                    Email Address <span className="text-amber-600">*</span>
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="hello@example.com"
                    className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-stone-500 mb-1.5 block">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full border border-stone-300 bg-stone-50 px-3 py-2 text-sm font-sans font-light text-stone-950 outline-none focus:ring-1 focus:ring-amber-600 appearance-none cursor-pointer"
                  >
                    <option value="">Select a subject…</option>
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-stone-500 mb-1.5 block">
                    Message <span className="text-amber-600">*</span>
                  </label>
                  <Textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help…"
                    rows={5}
                    className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-xs py-5 gap-2 mt-2"
                >
                  {loading ? (
                    "Sending…"
                  ) : (
                    <>
                      <Send size={13} /> Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
