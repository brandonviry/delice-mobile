import type { Metadata } from "next";
import { Farro, Raleway } from "next/font/google";
import "./globals.css";

const farro = Farro({
  variable: "--font-farro",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Délice Mobile - Food Truck Réunion | Cuisine Créole Fusion",
  description: "Food truck mobile à La Réunion. Cuisine fusion créole : burgers artisanaux, carry, samoussas gourmets. Ingrédients frais et locaux. Suivez-nous sur l'île !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${farro.variable} ${raleway.variable} font-body text-stone-800 bg-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
