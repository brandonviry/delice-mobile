"use client";

import { ContactForm } from "@/components/forms";

export function DeliveryContactSection() {
  return (
    <section id="delivery" className="bg-gradient-to-br from-brand-gold/10 to-brand-orange/10 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Locations */}
          <div>
            <h4 className="font-heading text-xl font-bold mb-4 uppercase tracking-wide text-brand-rust">
              Où nous trouver ?
            </h4>
            <div className="space-y-5 text-stone-100 font-body">
              <div>
                <p className="font-semibold text-brand-gold">Food Truck Mobile</p>
                <p className="mt-2">
                  Notre camion se déplace partout sur l&apos;île !
                  <br />
                  Suivez-nous sur les réseaux sociaux pour connaître
                  <br />
                  nos emplacements du jour.
                </p>
              </div>
              <div>
                <p className="font-semibold text-brand-gold mt-4">Horaires</p>
                <p className="mt-2">
                  Lundi - Samedi : 11h30 - 14h30 & 18h - 21h30
                  <br />
                  Dimanche : Fermé
                </p>
              </div>
            </div>
          </div>

          {/* Delivery */}
          <div>
            <h4 className="font-heading text-xl font-bold mb-4 uppercase tracking-wide text-brand-rust">
              Commander
            </h4>

            {/* Option 1: Commander en ligne */}
            <div className="mb-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-brand-gold/30">
              <p className="font-semibold text-brand-gold mb-2 font-heading">📱 Commander sur le site</p>
              <p className="text-stone-100 font-body text-sm mb-3">
                Commandez en ligne et recevez votre QR code pour récupérer votre repas !
              </p>
              <a
                href="#menu"
                className="inline-block bg-brand-red hover:bg-brand-rust text-white font-bold px-6 py-2.5 rounded-lg transition-colors shadow-md"
              >
                Voir le menu →
              </a>
            </div>

            {/* Option 2: Commander par téléphone */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-brand-orange/30">
              <p className="font-semibold text-brand-gold mb-2 font-heading">📞 Commander par téléphone</p>
              <p className="text-stone-100 font-body text-sm mb-3">
                Appelez-nous pour passer commande.
                <br />
                Préparation rapide en 15-20 minutes.
              </p>
              <p className="font-heading text-2xl font-bold text-brand-gold">0692 XX XX XX</p>
              <p className="text-stone-100 font-body text-sm mt-1">contact@delicemobile-reunion.fr</p>
            </div>
          </div>

          {/* Contact Form */}
          <div id="contato">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
