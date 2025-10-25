"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-[9999] bg-white/95 backdrop-blur border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-3" onClick={closeMenu}>
            <span className="inline-block bg-brand-olive text-white px-2 py-1 text-xs font-heading font-bold tracking-widest">
              LA RÉUNION
            </span>
            <span className="font-heading text-2xl font-bold tracking-wider text-brand-rust">
              DÉLICE MOBILE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 uppercase text-sm font-heading font-medium tracking-wider">
            <Link href="#home" className="text-stone-700 hover:text-brand-orange transition-colors">
              Accueil
            </Link>
            <Link href="#texxas" className="text-stone-700 hover:text-brand-orange transition-colors">
              Notre Histoire
            </Link>
            <Link href="#menu" className="text-stone-700 hover:text-brand-orange transition-colors">
              Carte
            </Link>
            <Link href="#delivery" className="text-stone-700 hover:text-brand-orange transition-colors">
              Nous Trouver
            </Link>
            <Link href="#contato" className="text-stone-700 hover:text-brand-orange transition-colors">
              Contact
            </Link>
          </nav>

          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5 focus:outline-none"
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-0.5 bg-brand-rust transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-brand-rust transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-brand-rust transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-3 border-t border-stone-200">
            <Link
              href="#home"
              onClick={closeMenu}
              className="block py-2 px-4 text-stone-700 hover:text-brand-orange hover:bg-brand-gold/10 transition-colors uppercase text-sm font-heading font-medium tracking-wider rounded"
            >
              Accueil
            </Link>
            <Link
              href="#texxas"
              onClick={closeMenu}
              className="block py-2 px-4 text-stone-700 hover:text-brand-orange hover:bg-brand-gold/10 transition-colors uppercase text-sm font-heading font-medium tracking-wider rounded"
            >
              Notre Histoire
            </Link>
            <Link
              href="#menu"
              onClick={closeMenu}
              className="block py-2 px-4 text-stone-700 hover:text-brand-orange hover:bg-brand-gold/10 transition-colors uppercase text-sm font-heading font-medium tracking-wider rounded"
            >
              Carte
            </Link>
            <Link
              href="#delivery"
              onClick={closeMenu}
              className="block py-2 px-4 text-stone-700 hover:text-brand-orange hover:bg-brand-gold/10 transition-colors uppercase text-sm font-heading font-medium tracking-wider rounded"
            >
              Nous Trouver
            </Link>
            <Link
              href="#contato"
              onClick={closeMenu}
              className="block py-2 px-4 text-stone-700 hover:text-brand-orange hover:bg-brand-gold/10 transition-colors uppercase text-sm font-heading font-medium tracking-wider rounded"
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
