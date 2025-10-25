import Image from "next/image";

export function AboutSection() {

  const srcImages =  ["/img/Realistic_and_artistic_photo_of_a_food_truck_inter-1761374020592.webp",
              "/img/Realistic_and_professional_photo_of_a_modern_food_-1761374409693.webp",
              "https://image.over-blog.com/ObA4emn4FVND0t_DTBAOQlFhj3w=/filters:no_upscale()/image%2F4601111%2F20240328%2Fob_272f69_roti-de-porc-a-la-marmite.jpg",
              "https://image.over-blog.com/Kro-aYqt1KqEpvkpfIFv8K8q0Jw=/filters:no_upscale()/image%2F4601111%2F20210709%2Fob_060faa_sauce-sardine.jpg",
              "https://www.carrefour-reunion.com/glide/local/attachments/14b/7ov/eej/14b7oveejx24xzackh7ux2fjq.png?w=512&h=512&fit=crop&fm=webp&q=95&s=0018387cb564b1d6355f51ed8601a7c2",
              "https://www.recette-healthy.com/wp-content/uploads/2020/05/carri-de-poulet.jpg"]

  return (
    <section id="texxas" className="bg-gradient-to-br from-brand-gold/10 to-brand-orange/10 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-wide mb-4 text-brand-rust">
              Savourez l&apos;Authentique Délice Mobile
            </h2>
            <p className="text-stone-100 leading-relaxed mb-6 font-body">
              Au cœur de l&apos;île de la Réunion, notre food truck vous propose une cuisine
              fusion unique où les saveurs créoles rencontrent les classiques internationaux.
              Chaque plat est préparé avec amour, des ingrédients frais et locaux, pour vous
              offrir une explosion de goûts à chaque bouchée.
            </p>
            <p className="text-stone-100 leading-relaxed font-body">
              De nos burgers signatures aux spécialités réunionnaises revisitées, laissez-vous
              transporter par nos créations gourmandes. Que ce soit pour un déjeuner rapide ou
              un moment convivial, Délice Mobile vous accompagne partout sur l&apos;île !
            </p>
          </div>

          <div className="lg:col-span-7">
            <Image
              src="/img/Realistic_photo_of_a_white_food_truck_with_a_strip-1761373581703.webp"
              alt="Intérieur du restaurant"
              width={900}
              height={260}
              className="w-full h-64 object-cover rounded shadow-soft"
            />
            <div className="grid grid-cols-6 gap-2 mt-3">
              {srcImages.map((i, index) => (
                <Image
                  key={index}
                  src={`${i}`}
                  alt={`Miniature ${i}`}
                  width={140}
                  height={90}
                  className="w-full h-20 object-cover rounded hover:scale-105 transition-transform"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
