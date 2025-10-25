"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { LocationsResponse } from "@/types/location";

// Importer le composant carte uniquement côté client (pas de SSR)
const FoodTruckMap = dynamic(
  () => import("@/components/ui/food-truck-map").then((mod) => mod.FoodTruckMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Chargement de la carte...</p>
      </div>
    ),
  }
);

export function AmbiancePhoto() {
  const [locationsData, setLocationsData] = useState<LocationsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/locations");
        const data = await response.json();

        if (data.success) {
          setLocationsData(data);
        } else {
          setError(data.error || "Erreur lors du chargement");
        }
      } catch (err) {
        console.error("Erreur chargement emplacements:", err);
        setError("Impossible de charger les emplacements");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return (
    <section className="py-12 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-brand-rust sm:text-4xl font-heading uppercase tracking-wide">
            Suivez Notre Parcours
          </h2>
          <p className="mt-3 text-xl text-stone-800 font-body">
            Découvrez où nous sommes et où nous serons prochainement
          </p>
        </div>

        {/* Carte ou état de chargement */}
        {isLoading ? (
          <div className="w-full h-[500px] bg-white rounded-lg flex items-center justify-center shadow-lg">
            <div className="text-center">
              <svg
                className="animate-spin h-12 w-12 text-brand-olive mx-auto mb-4"
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
              <p className="text-gray-600">Chargement de la carte...</p>
            </div>
          </div>
        ) : error ? (
          <div className="w-full h-[500px] bg-red-50 rounded-lg flex items-center justify-center shadow-lg border-2 border-red-200">
            <div className="text-center p-6">
              <p className="text-red-600 font-semibold">⚠️ {error}</p>
              <p className="text-sm text-red-500 mt-2">
                Vérifiez la configuration Notion
              </p>
            </div>
          </div>
        ) : locationsData && locationsData.locations.length > 0 ? (
          <>
            {/* Informations actuelles */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Emplacement actuel */}
              {locationsData.currentLocation && (
                <div className="bg-brand-gold/10 border-2 border-brand-olive rounded-lg p-6 shadow-md">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">📍</span>
                    <div>
                      <p className="text-sm font-semibold text-brand-olive uppercase">
                        Nous sommes ici maintenant
                      </p>
                      <h3 className="text-xl font-bold text-gray-900">
                        {locationsData.currentLocation.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-stone-700 mb-2">
                    {locationsData.currentLocation.address}
                  </p>
                  <p className="text-sm text-stone-600">
                    🕐 {locationsData.currentLocation.startTime} -{" "}
                    {locationsData.currentLocation.endTime}
                  </p>
                </div>
              )}

              {/* Prochain emplacement */}
              {locationsData.nextLocation && (
                <div className="bg-brand-orange/10 border-2 border-brand-rust rounded-lg p-6 shadow-md">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">🚚</span>
                    <div>
                      <p className="text-sm font-semibold text-brand-rust uppercase">
                        Prochaine destination
                      </p>
                      <h3 className="text-xl font-bold text-gray-900">
                        {locationsData.nextLocation.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-stone-700 mb-2">
                    {locationsData.nextLocation.address}
                  </p>
                  <p className="text-sm text-stone-600">
                    📅{" "}
                    {new Date(locationsData.nextLocation.date).toLocaleDateString(
                      "fr-FR",
                      { weekday: "long", day: "numeric", month: "long" }
                    )}
                  </p>
                  <p className="text-sm text-stone-600">
                    🕐 {locationsData.nextLocation.startTime} -{" "}
                    {locationsData.nextLocation.endTime}
                  </p>
                </div>
              )}
            </div>

            {/* Carte interactive */}
            <FoodTruckMap
              locations={locationsData.locations}
              currentLocation={locationsData.currentLocation}
              nextLocation={locationsData.nextLocation}
            />

            {/* Légende */}
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#8c8577" }}></div>
                <span className="text-gray-700 font-medium">Emplacements passés</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-brand-olive"></div>
                <span className="text-gray-700 font-medium">Emplacement actuel</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-brand-orange"></div>
                <span className="text-gray-700 font-medium">Emplacements à venir</span>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-[500px] bg-gray-50 rounded-lg flex items-center justify-center shadow-lg">
            <p className="text-gray-500">
              Aucun emplacement configuré pour le moment
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
