import { Client } from "@notionhq/client";
import { FoodTruckLocation, LocationStatus } from "@/types/location";

// Client Notion
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// ID de la base de données des emplacements
export const LOCATIONS_DATABASE_ID = process.env.LOCATIONS_DATABASE_ID || "";

/**
 * Récupérer tous les emplacements du food truck depuis Notion
 */
export async function getLocationsFromNotion(): Promise<FoodTruckLocation[]> {
  try {
    // @ts-ignore
    const response = await notion.search({
      filter: {
        property: "object",
        value: "page",
      },
      sort: {
        direction: "ascending",
        timestamp: "last_edited_time",
      },
    });

    // Normaliser les IDs
    const normalizeId = (id: string) => id.replace(/-/g, "");
    const normalizedLocationsId = normalizeId(LOCATIONS_DATABASE_ID);

    // Filtrer pour les pages de notre database
    const locationPages = response.results.filter((page: any) => {
      const pageDbId = page.parent?.database_id;
      return pageDbId && normalizeId(pageDbId) === normalizedLocationsId;
    });

    const now = new Date();
    const locations: FoodTruckLocation[] = locationPages
      .map((page: any) => {
        const props = page.properties;

        // Récupérer les données
        const name = props.Nom?.title?.[0]?.text?.content || "Emplacement";
        const address = props.Adresse?.rich_text?.[0]?.text?.content || "";
        const latitude = props.Latitude?.number || 0;
        const longitude = props.Longitude?.number || 0;
        const dateStr = props.Date?.date?.start || "";
        const startTime = props["Heure Début"]?.rich_text?.[0]?.text?.content || "00:00";
        const endTime = props["Heure Fin"]?.rich_text?.[0]?.text?.content || "23:59";
        const description = props.Description?.rich_text?.[0]?.text?.content || "";
        const order = props.Ordre?.number || 0;

        // Déterminer le statut
        let status = LocationStatus.UPCOMING;
        if (dateStr) {
          const locationDate = new Date(dateStr);
          const locationEndDateTime = new Date(`${dateStr}T${endTime}`);

          if (locationEndDateTime < now) {
            status = LocationStatus.PASSED;
          } else if (locationDate <= now && locationEndDateTime >= now) {
            status = LocationStatus.CURRENT;
          }
        }

        return {
          id: page.id,
          name,
          address,
          latitude,
          longitude,
          date: dateStr,
          startTime,
          endTime,
          status,
          description,
          order,
        };
      })
      // Trier par ordre
      .sort((a, b) => a.order - b.order);

    return locations;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Erreur récupération emplacements Notion:", error);
    }
    throw new Error("Impossible de récupérer les emplacements");
  }
}

/**
 * Récupérer l'emplacement actuel du food truck
 */
export async function getCurrentLocation(): Promise<FoodTruckLocation | null> {
  const locations = await getLocationsFromNotion();
  return locations.find((loc) => loc.status === LocationStatus.CURRENT) || null;
}

/**
 * Récupérer le prochain emplacement du food truck
 */
export async function getNextLocation(): Promise<FoodTruckLocation | null> {
  const locations = await getLocationsFromNotion();
  const upcomingLocations = locations
    .filter((loc) => loc.status === LocationStatus.UPCOMING)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return upcomingLocations[0] || null;
}
