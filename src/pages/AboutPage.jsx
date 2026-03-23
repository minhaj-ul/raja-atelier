import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { VALUES, TEAM } from "../data/about";
import Layout from "../layouts/Layout";

export default function AboutPage({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <Layout user={user} onLogout={onLogout}>
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
            RAJA Atelier was founded on a simple belief — that the Bangladeshi
            gentleman deserves clothing chosen carefully, worn with pride, and
            loved for a long time.
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
                A wardrobe built on Bangladesh's finest traditions
              </h2>
              <p className="text-sm text-stone-600 font-light leading-relaxed mb-4">
                RAJA Atelier began in 2018 as Rahim Chowdhury's answer to a
                simple question — why couldn't Bangladesh have its own luxury
                menswear brand? Starting from a small showroom in Banani, Dhaka,
                with a curated selection of suits and sherwanis, RAJA quickly
                became the destination for the discerning Bangladeshi gentleman.
              </p>
              <p className="text-sm text-stone-600 font-light leading-relaxed">
                Today we work with master artisans from Dhaka, Rajshahi, and
                Sylhet, celebrating Bangladesh's extraordinary textile heritage
                through the lens of contemporary luxury menswear.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
                alt="Our atelier"
                className="w-full aspect-3/4 object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-amber-600 text-stone-50 px-6 py-4 hidden md:block">
                <p className="font-display text-3xl font-light">2018</p>
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
            Over fifty carefully chosen pieces for the considered Bangladeshi
            gentleman.
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
    </Layout>
  );
}
