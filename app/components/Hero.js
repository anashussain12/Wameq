"use client";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

export default function Hero() {
  return (
    <section className=" text-black py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        
        {/* Left Side Content */}
        <div>
          <h1
            className={`${poppins.className} text-4xl sm:text-5xl md:text-6xl font-extrabold`}
          >
            <span className="text-[#caac04]">Digital</span> Marketing That
            Delivers Results
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            I help businesses grow by creating{" "}
            <span className="text-[#caac04] font-semibold">data-driven</span>{" "}
            marketing strategies that generate leads, increase sales, and build
            strong online presence.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#services"
              className="bg-black text-white  px-6 py-3 rounded-md font-semibold text-lg hover:bg-yellow-400 transition"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/hero-marketing.png" // ⚡ place your image in public folder
            alt="Digital Marketing"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
