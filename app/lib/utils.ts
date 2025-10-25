import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utilitaire pour fusionner les classes Tailwind CSS
 * @param inputs - Classes CSS à fusionner
 * @returns Classes fusionnées
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatte une date en français
 * @param date - Date à formater
 * @returns Date formatée
 */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
  }).format(new Date(date));
}

/**
 * Formatte un prix en euros
 * @param amount - Montant à formater
 * @returns Prix formaté
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}
