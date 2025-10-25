"use client";

import { useEffect, useState } from "react";

export function Footer() {
  const [year, setYear] = useState<number>(2025);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-brand-rust text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div>
            <div className="font-heading text-3xl font-bold tracking-wider">DÉLICE MOBILE</div>
            <p className="text-sm text-white/90 mt-1 font-body">
              Food truck - Cuisine créole fusion à La Réunion
            </p>
          </div>
          <div className="text-sm font-body">
            <p className="font-semibold">Horaires</p>
            <p className="text-white/90">Lun – Sam: 11h30 – 14h30 & 18h – 21h30</p>
          </div>
          <div className="text-sm font-body">
            <p className="mb-1 font-semibold">Paiements acceptés</p>
            <div className="flex gap-2 text-white/90">CB • Espèces • Chèques</div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-xs text-white/80 font-body">
          © {year} DÉLICE MOBILE. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
