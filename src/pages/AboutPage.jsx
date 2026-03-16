import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const VALUES = [
  {
    title: "Craftsmanship",
    description:
      "Every piece in our collection is selected for its exceptional quality. We work only with makers who share our commitment to fine materials and careful construction.",
  },
  {
    title: "Intention",
    description:
      "We believe in buying less and choosing well. Our edits are deliberately small — each item chosen to last seasons, not just one.",
  },
  {
    title: "Sustainability",
    description:
      "From natural fibres to responsible packaging, we make choices that are better for people and the planet without compromising on beauty.",
  },
  {
    title: "Timelessness",
    description:
      "Trends come and go. We curate pieces that transcend them — garments and accessories you will reach for year after year.",
  },
];

const TEAM = [
  {
    name: "Isabelle Laurent",
    role: "Founder & Creative Director",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
  },
  {
    name: "Marcus Chen",
    role: "Head of Buying",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80",
  },
  {
    name: "Sofia Andersen",
    role: "Brand & Communications",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
];

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-stone-100">
      {/* Hero */}
      <section className="relative bg-stone-950 text-stone-100 px-5 md:px-7 py-20 md:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(184,148,63,0.08),transparent_60%)] pointer-events-none" />
        <p className="text-[10px] tracking-[0.4em] uppercase text-amber-600 mb-4">
          Our Story
        </p>
        <h1 className="font-display font-light text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
          Dressed with
          <br />
          <em>intention</em>
        </h1>
        <p className="text-sm md:text-base font-light text-stone-400 max-w-xl mx-auto leading-relaxed">
          Maison Atelier was founded on a simple belief — that what we wear
          should be chosen carefully, worn often, and loved for a long time.
        </p>
      </section>

      {/* Story */}
      <section className="max-w-340 mx-auto px-5 md:px-7 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-amber-600 mb-4">
              How it began
            </p>
            <h2 className="font-display font-light text-3xl md:text-4xl mb-6 leading-snug">
              A wardrobe built on fewer, better things
            </h2>
            <p className="text-sm text-stone-600 font-light leading-relaxed mb-4">
              Maison Atelier began in 2019 as a small edit of pieces that
              Isabelle Laurent, our founder, couldn't find anywhere else —
              garments that were beautifully made, quietly elegant, and built to
              last. What started as a personal project quickly became a
              community of like-minded dressers.
            </p>
            <p className="text-sm text-stone-600 font-light leading-relaxed">
              Today we work with a small network of independent makers across
              Europe and Asia, bringing their finest work to people who
              appreciate the difference that quality makes.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
              alt="Our atelier"
              className="w-full aspect-3/4 object-cover"
            />
            <div className="absolute -bottom-4 -left-4 bg-amber-600 text-stone-50 px-6 py-4 hidden md:block">
              <p className="font-display text-3xl font-light">2019</p>
              <p className="text-[10px] tracking-widest uppercase mt-0.5">
                Founded
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-stone-300 max-w-340 mx-auto" />

      {/* Values */}
      <section className="max-w-340 mx-auto px-5 md:px-7 py-16 md:py-24">
        <p className="text-[10px] tracking-[0.3em] uppercase text-amber-600 mb-3">
          What we stand for
        </p>
        <h2 className="font-display font-light text-3xl md:text-4xl mb-12 leading-snug">
          Our values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
          {VALUES.map((value) => (
            <div key={value.title}>
              <h3 className="font-display font-normal text-xl mb-3 text-stone-950">
                {value.title}
              </h3>
              <Separator className="bg-amber-600 w-8 mb-4" />
              <p className="text-sm text-stone-600 font-light leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="bg-stone-300 max-w-340 mx-auto" />

      {/* Team */}
      <section className="max-w-340 mx-auto px-5 md:px-7 py-16 md:py-24">
        <p className="text-[10px] tracking-[0.3em] uppercase text-amber-600 mb-3">
          The people behind it
        </p>
        <h2 className="font-display font-light text-3xl md:text-4xl mb-12 leading-snug">
          Our team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {TEAM.map((member) => (
            <div key={member.name}>
              <img
                src={member.image}
                alt={member.name}
                className="w-full aspect-square object-cover mb-4 grayscale hover:grayscale-0 transition-all duration-500"
              />
              <h3 className="font-display font-normal text-lg text-stone-950">
                {member.name}
              </h3>
              <p className="text-xs tracking-wide text-amber-600 uppercase mt-0.5">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="bg-stone-300 max-w-340 mx-auto" />

      {/* CTA */}
      <section className="max-w-340 mx-auto px-5 md:px-7 py-16 md:py-24 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-amber-600 mb-4">
          Ready to explore?
        </p>
        <h2 className="font-display font-light text-3xl md:text-4xl mb-6">
          Discover the collection
        </h2>
        <p className="text-sm text-stone-500 font-light max-w-sm mx-auto mb-8 leading-relaxed">
          Twelve carefully chosen pieces for the considered wardrobe.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-xs px-8 py-5 gap-2"
        >
          Shop Now
          <ArrowRight size={14} />
        </Button>
      </section>
    </div>
  );
}
