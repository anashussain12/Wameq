"use client";

import React from "react";
import { Check, BarChart3, Megaphone, Rocket, LineChart, Users } from "lucide-react";
import Link from "next/link";

const Grad = ({ children }) => (
  <span className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
    {children}
  </span>
);

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing Services",
    areaServed: [
      { "@type": "City", name: "Dubai" },
      { "@type": "City", name: "Sydney" },
      { "@type": "City", name: "Karachi" },
      { "@type": "City", name: "Lahore" },
      { "@type": "City", name: "London" },
      { "@type": "City", name: "New York" }
    ],
    serviceType: [
      "Google Ads Management",
      "Meta & TikTok Ads",
      "SEO & Content",
      "Conversion Rate Optimization",
      "Analytics & Tracking",
      "Strategy & Consulting"
    ],
    provider: {
      "@type": "LocalBusiness",
      name: "Wameq — Digital Marketing Consultant"
    }
  };

  return (
    <main className="min-h-screen w-full bg-white text-black antialiased">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="text-sm text-black/60">Home / <span className="text-black">Services</span></div>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl lg:text-6xl">
          Full‑Stack <Grad>Digital Marketing</Grad> Services
        </h1>
        <p className="mt-4 text-lg text-black/70 max-w-2xl">
          End-to-end services to acquire, convert, and retain customers—delivered with speed, clarity, and consistent results.
        </p>
        <div className="mt-6 grid w-full max-w-xl grid-cols-3 divide-x divide-black/10 overflow-hidden rounded-2xl border border-black/10 bg-white">
          {[{ k: "Avg ROAS", v: "3.2x" }, { k: "CPA Drop", v: "-38%" }, { k: "Lift in CVR", v: "+2.3x" }].map((s, i) => (
            <div key={i} className="p-4 text-center">
              <div className="text-xs uppercase tracking-wide text-black/50">{s.k}</div>
              <div className="mt-1 text-xl font-extrabold"><Grad>{s.v}</Grad></div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="#contact" className="rounded-xl bg-black px-5 py-3 text-sm font-bold text-white hover:bg-black/90">Book Link Free Audit</Link>
          <Link href="#services" className="rounded-xl border border-black/15 px-5 py-3 text-sm font-bold hover:bg-black/5">Explore Services</Link>
        </div>
      </section>]
      <section id="services" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <BarChart3 className="h-6 w-6" />,
              title: "Google Ads Management",
              desc: "Search, Display, Shopping & Performance Max with value‑based bidding and tight structure.",
              bullets: ["ROI‑focused bidding", "Query sculpting", "Ongoing A/B tests"]
            },
            {
              icon: <Megaphone className="h-6 w-6" />,
              title: "Meta & TikTok Ads",
              desc: "Creative strategy + paid social that scales sustainably across platforms.",
              bullets: ["UGC creatives", "Audience scaling", "Retargeting"]
            },
            {
              icon: <Rocket className="h-6 w-6" />,
              title: "SEO & Content Marketing",
              desc: "Technical SEO, topic clusters, and authority building for durable organic growth.",
              bullets: ["Keyword clusters", "Backlink outreach", "Content calendar"]
            },
            {
              icon: <LineChart className="h-6 w-6" />,
              title: "Analytics & CRO",
              desc: "GA4, dashboards, and experimentation to turn insights into revenue.",
              bullets: ["GA4 setup", "Looker dashboards", "A/B testing"]
            },
            {
              icon: <Users className="h-6 w-6" />,
              title: "Strategy & Consulting",
              desc: "Audits and strategy sessions tailored to your stage and goals.",
              bullets: ["90‑day plans", "Growth frameworks", "Custom playbooks"]
            }
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-600 to-indigo-600 text-white">
                {s.icon}
              </div>
              <h3 className="mt-5 text-xl font-extrabold">{s.title}</h3>
              <p className="mt-2 text-sm text-black/70">{s.desc}</p>
              <ul className="mt-4 space-y-2 text-sm text-black/80">
                {s.bullets.map((b, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-fuchsia-500" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section id="pricing" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold sm:text-4xl">Simple, Transparent <Grad>Packages</Grad></h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { name: "Starter Sprint", price: "$1,500", items: ["Audit + 90‑day plan", "Account cleanup", "Tracking fixes", "LP brief"] },
            { name: "Growth", price: "$2,500/mo", items: ["Ads management", "Weekly tests", "CRO roadmap", "Reporting"] },
            { name: "Scale", price: "$4,500/mo", items: ["Multi‑channel", "Creative sprints", "Advanced analytics", "Quarterly planning"] },
          ].map((p, i) => (
            <div key={i} className="rounded-2xl border border-black/10 bg-white p-6">
              <div className="text-xs uppercase tracking-wide text-black/50">{p.name}</div>
              <div className="mt-2 text-3xl font-extrabold">{p.price}</div>
              <ul className="mt-4 space-y-2 text-sm text-black/80">
                {p.items.map((x, j) => (
                  <li key={j} className="flex items-center gap-2"><Check className="h-4 w-4 text-fuchsia-500" /> {x}</li>
                ))}
              </ul>
              <Link href="#contact" className="mt-6 inline-block rounded-xl bg-black px-5 py-3 text-sm font-bold text-white hover:bg-black/90">Choose</Link>
            </div>
          ))}
        </div>
      </section>
      <section id="process" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold sm:text-4xl">Proven <Grad>Process</Grad></h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { k: "01", h: "Audit", d: "Tracking, structure, creative, LPs. Get the truth fast." },
            { k: "02", h: "Plan", d: "90‑day growth plan with hypotheses & metrics." },
            { k: "03", h: "Scale", d: "Ship weekly tests, double‑down on winners." },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl border border-black/10 bg-white p-6">
              <p className="text-sm text-black/50">{s.k}</p>
              <h3 className="mt-2 text-xl font-extrabold">{s.h}</h3>
              <p className="mt-2 text-sm text-black/70">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="faq" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold sm:text-4xl">FAQs</h2>
        <div className="mt-6 divide-y divide-black/10 rounded-2xl border border-black/10 bg-white">
          {[
            { q: "How do you start engagements?", Link: "With Link rapid audit + 90‑day plan covering tracking, structure, creative, and CRO priorities." },
            { q: "What industries do you work with?", Link: "Fintech, SaaS, E‑commerce, and education primarily." },
            { q: "Do you offer one‑time projects?", Link: "Yes—Starter Sprint is designed for that." },
            { q: "Can you join stakeholder calls?", Link: "Yes, weekly or bi‑weekly check‑ins are standard." }
          ].map((f, i) => (
            <details key={i} className="group px-6 py-5 open:bg-black/[0.02]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold">
                <span>{f.q}</span>
                <span className="text-black/40 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-sm text-black/70">{f.Link}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-black/10 bg-gradient-to-r from-fuchsia-50 to-indigo-50 p-10">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Ready to Scale?</h2>
          <p className="mt-2 text-black/70">Book Link free consultation and let’s build your growth roadmap together.</p>
          <Link href="/contact" className="mt-6 inline-block rounded-xl bg-black px-6 py-3 font-bold text-white hover:bg-black/90">Book Link Free Audit</Link>
        </div>
      </section>
          
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
