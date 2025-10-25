import Image from "next/image";

export function HeroSection() {
  return (
    <section id="home" className="relative pt-16">
      <div className="relative">
        <div className="grid md:grid-cols-2">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg4tGHU6E5pQ3jU5jh3f6qciu-XJJkks_ynw&s"
            alt="Notre menue de Fast Food délicieux"
            width={1200}
            height={650}
            className="w-full h-[340px] sm:h-[420px] md:h-[520px] object-cover"
            priority
          />
          <Image
            src="/img/Fast-Food-Logo.webp"
            alt="logo Délice Mobile"
            width={1200}
            height={650}
            className="w-full h-[340px] sm:h-[420px] md:h-[520px] object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10 pointer-events-none" />
      </div>
    </section>
  );
}
