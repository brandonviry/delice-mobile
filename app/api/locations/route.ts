import { NextResponse } from "next/server";
import {
  getLocationsFromNotion,
  getCurrentLocation,
  getNextLocation,
} from "@/services/location.service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Vérifier la configuration
    if (!process.env.NOTION_API_KEY) {
      return NextResponse.json(
        { error: "Configuration serveur incorrecte" },
        { status: 500 }
      );
    }

    if (!process.env.LOCATIONS_DATABASE_ID) {
      return NextResponse.json(
        { error: "Locations database ID non configuré" },
        { status: 500 }
      );
    }

    // Récupérer les données en parallèle
    const [locations, currentLocation, nextLocation] = await Promise.all([
      getLocationsFromNotion(),
      getCurrentLocation(),
      getNextLocation(),
    ]);

    return NextResponse.json(
      {
        success: true,
        locations,
        currentLocation,
        nextLocation,
        totalLocations: locations.length,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Erreur API locations:", error);
    }

    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de la récupération des emplacements",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
