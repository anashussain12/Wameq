"use client"
import React from "react";
import Link from "next/link";
const Grad = ({ children }) => (
    <span className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        {children}
    </span>
);

export default function DigitalMarketingConsultantSite() {
    return (
        <div className="w-full bg-white text-black antialiased">

            <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-md shadow-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href="/" className="text-2xl font-black tracking-tight">
                        <Grad>WAMEQ HUSSAIN</Grad>
                    </Link>
                    <nav className="hidden gap-8 text-lg font-semibold text-black/80 md:flex">
                        <Link href="/" className="hover:text-black">Home</Link>
                        <Link href="#services" className="hover:text-black">Services</Link>
                        <Link href="#pricing" className="hover:text-black">Pricing</Link>
                        <Link href="/blogs" className="hover:text-black">Blogs</Link>
                        <Link href="#contact" className="hover:text-black">Contact</Link>
                    </nav>
                </div>
            </header>


        </div>
    );
}
