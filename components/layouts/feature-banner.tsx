export function FeatureBanner() {
  return (
    <section className="bg-white border-y border-brand-olive/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <p className="uppercase tracking-widest text-stone-600 font-heading font-medium">
          Découvrez nos spécialités
        </p>
        <h3 className="font-heading text-3xl md:text-4xl font-bold text-brand-red mt-1">
          Cuisine Créole Fusion
        </h3>
        <p className="mt-2 text-stone-900 font-body">
          Burgers artisanaux, carry à emporter, samoussas gourmets et bien plus encore.
        </p>
      </div>
    </section>
  );
}
