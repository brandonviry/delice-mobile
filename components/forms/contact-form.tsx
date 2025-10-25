"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

// Schéma de validation Zod
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
  email: z
    .string()
    .email("Adresse email invalide")
    .min(1, "L'email est requis"),
  phone: z
    .string()
    .refine(
      (val) => val === "" || /^(\+262|0)[6-7]\d{8}$/.test(val),
      "Numéro de téléphone Réunion invalide (ex: 0692XXXXXX)"
    )
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(500, "Le message ne peut pas dépasser 500 caractères"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Gérer les erreurs spécifiques
        if (response.status === 429) {
          throw new Error("Trop de requêtes. Veuillez réessayer dans 15 minutes.");
        }
        throw new Error(result.error || "Une erreur est survenue");
      }

      // Succès
      console.log("Contact enregistré:", result.id);
      setSubmitStatus("success");
      reset();

      // Réinitialiser le message de succès après 5 secondes
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h4 className="font-heading text-xl font-bold mb-4 uppercase tracking-wide text-brand-rust">
        Contact
      </h4>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Nom */}
        <div>
          <input
            {...register("name")}
            type="text"
            placeholder="Nom *"
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.name
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-stone-300 focus:border-brand-olive focus:ring-brand-olive"
            } bg-white text-stone-900 placeholder:text-stone-500 transition-colors`}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 font-medium">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Email *"
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.email
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-stone-300 focus:border-brand-olive focus:ring-brand-olive"
            } bg-white text-stone-900 placeholder:text-stone-500 transition-colors`}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 font-medium">{errors.email.message}</p>
          )}
        </div>

        {/* Téléphone */}
        <div>
          <input
            {...register("phone")}
            type="tel"
            placeholder="Téléphone (optionnel)"
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.phone
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-stone-300 focus:border-brand-olive focus:ring-brand-olive"
            } bg-white text-stone-900 placeholder:text-stone-500 transition-colors`}
            aria-invalid={errors.phone ? "true" : "false"}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 font-medium">{errors.phone.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <textarea
            {...register("message")}
            rows={4}
            placeholder="Votre message *"
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.message
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-stone-300 focus:border-brand-olive focus:ring-brand-olive"
            } bg-white text-stone-900 placeholder:text-stone-500 resize-none transition-colors`}
            aria-invalid={errors.message ? "true" : "false"}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600 font-medium">{errors.message.message}</p>
          )}
        </div>

        {/* Messages de statut */}
        {submitStatus === "success" && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3">
            <p className="text-sm text-green-800 font-medium">
              ✓ Message envoyé avec succès ! Nous vous répondrons rapidement.
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3">
            <p className="text-sm text-red-800 font-medium">
              ✗ Erreur lors de l'envoi. Veuillez réessayer.
            </p>
          </div>
        )}

        {/* Bouton de soumission */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full inline-flex items-center justify-center px-5 py-3 rounded-lg font-heading font-semibold uppercase tracking-wide transition-all ${
            isSubmitting
              ? "bg-stone-400 cursor-not-allowed"
              : "bg-brand-red hover:bg-brand-rust shadow-md hover:shadow-lg"
          } text-white`}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Envoi en cours...
            </>
          ) : (
            "Envoyer"
          )}
        </button>

        <p className="text-xs text-stone-500 italic">* Champs obligatoires</p>
      </form>
    </div>
  );
}
