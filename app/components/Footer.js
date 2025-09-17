import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, LineChart, BarChart3, Rocket, Megaphone, Mail, Phone, Globe, Play, BookOpen, Users, Award, CalendarDays, PenTool, TrendingUp, ThumbsUp } from "lucide-react";
import Link from "next/link";

// Tailwind helper: gradient text
const Grad = ({ children }) => (
  <span className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
    {children}
  </span>
);

export default function DigitalMarketingConsultantSite() {
  return (
    <div className=" w-full bg-white text-black antialiased">
      {/* ... content above unchanged ... */}

      {/* FOOTER */}
      <footer className="border-t border-black/10 bg-black/[0.02]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-black/70">About</h3>
              <p className="mt-3 text-sm text-black/60">Performance-driven digital marketing consultant helping brands grow globally with ads, SEO, and CRO.</p>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-black/70">Services</h3>
              <ul className="mt-3 space-y-2 text-sm text-black/60">
                <li><a href="#services" className="hover:text-black">Google Ads Management</a></li>
                <li><a href="#services" className="hover:text-black">Meta & TikTok Ads</a></li>
                <li><a href="#services" className="hover:text-black">SEO & Content</a></li>
                <li><a href="#services" className="hover:text-black">Conversion Optimization</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-black/70">Locations</h3>
              <ul className="mt-3 space-y-2 text-sm text-black/60">
                <li><a href="#" className="hover:text-black">Digital Marketing in Dubai</a></li>
                <li><a href="#" className="hover:text-black">Digital Marketing in Sydney</a></li>
                <li><a href="#" className="hover:text-black">Digital Marketing in Karachi</a></li>
                <li><a href="#" className="hover:text-black">Digital Marketing in Lahore</a></li>
                <li><a href="#" className="hover:text-black">Digital Marketing in London</a></li>
                <li><a href="#" className="hover:text-black">Digital Marketing in New York</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-black/70">Quick Links</h3>
              <ul className="mt-3 space-y-2 text-sm text-black/60">
                <li><Link href="/blog" className="hover:text-black">Blog</Link></li>
                <li><a href="#resources" className="hover:text-black">Free Resources</a></li>
                <li><a href="#community" className="hover:text-black">Community</a></li>
                <li><a href="#faq" className="hover:text-black">FAQs</a></li>
                <li><a href="#contact" className="hover:text-black">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-6 text-sm text-black/60 sm:flex-row">
            <p>© {new Date().getFullYear()} Wameq — Digital Marketing Consultant</p>
            <div className="flex items-center gap-3">
              <a href="#" className="hover:text-black">Privacy</a>
              <span className="text-black/30">•</span>
              <a href="#" className="hover:text-black">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}