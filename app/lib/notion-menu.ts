import { Client } from "@notionhq/client";

// Créer le client Notion
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// ID de la base de données du menu
export const MENU_DATABASE_ID = process.env.MENU_DATABASE_ID || "";

// Types pour les items du menu
export interface MenuItem {
  id: number;
  name: string;
  subtitle?: string;
  price: number;
  oldPrice: number;
  rating?: number;
  image: string;
  category?: string;
  isFeatured?: boolean;
  isActive?: boolean;
}

/**
 * Récupérer tous les items du menu depuis Notion
 */
export async function getMenuItemsFromNotion(): Promise<MenuItem[]> {
  try {
    // Vérifier que le client Notion est valide
    if (!notion || typeof notion !== 'object') {
      throw new Error("Client Notion non initialisé");
    }

    // IMPORTANT: Le SDK Notion v5.3.0 n'a pas databases.query
    // On utilise search à la place pour récupérer les pages de la database

    // @ts-ignore
    const response = await notion.search({
      filter: {
        property: "object",
        value: "page"
      },
      sort: {
        direction: "ascending",
        timestamp: "last_edited_time"
      }
    });

    // Debug: afficher toutes les pages trouvées
    console.log(`🔍 Total pages trouvées par search: ${response.results.length}`);
    console.log(`🔍 MENU_DATABASE_ID attendu: ${MENU_DATABASE_ID}`);

    // Afficher les database IDs trouvés
    const foundDatabaseIds = response.results
      .map((page: any) => page.parent?.database_id)
      .filter(Boolean);
    console.log(`🔍 Database IDs trouvés dans les pages:`, [...new Set(foundDatabaseIds)]);

    // Normaliser les IDs en enlevant les tirets pour la comparaison
    const normalizeId = (id: string) => id.replace(/-/g, '');
    const normalizedMenuId = normalizeId(MENU_DATABASE_ID);

    // Filtrer pour ne garder que les pages de notre database menu
    const allPages = response.results.filter((page: any) => {
      const pageDbId = page.parent?.database_id;
      return pageDbId && normalizeId(pageDbId) === normalizedMenuId;
    });

    console.log(`🔍 Pages de la base menu trouvées: ${allPages.length}`);

    if (allPages.length === 0) {
      console.warn("⚠️ Aucun produit trouvé dans la base de données menu. Utilisation des données par défaut.");
      // Fallback avec données statiques
      return [
        {
          id: 1,
          name: "Big Combo",
          price: 16.00,
          oldPrice: 20.00,
          image: "https://placehold.co/200x120/FFEBD1/333?text=Combo"
        },
        {
          id: 2,
          name: "Carry Poulet",
          price: 10.40,
          oldPrice: 13.00,
          image: "https://placehold.co/200x120/F4E1FF/333?text=Carry"
        },
        {
          id: 3,
          name: "Samoussas Pack",
          price: 14.40,
          oldPrice: 18.00,
          image: "https://placehold.co/200x120/FFEBD1/333?text=Samossa"
        },
        {
          id: 4,
          name: "Rougail Combo",
          price: 16.00,
          oldPrice: 20.00,
          image: "https://placehold.co/200x120/F4E1FF/333?text=Rougail"
        },
        {
          id: 5,
          name: "Bowl Pack",
          price: 9.00,
          oldPrice: 11.00,
          image: "https://placehold.co/200x120/FFEBD1/333?text=Bowl"
        },
        {
          id: 6,
          name: "Bouchons Combo",
          price: 10.50,
          oldPrice: 13.00,
          image: "https://placehold.co/200x120/F4E1FF/333?text=Bouchon"
        }
      ];
    }

    // Maintenant on récupère les propriétés de chaque page pour extraire les infos
    const menuItems: MenuItem[] = allPages
      .map((page: any, index: number) => {
        const props = page.properties;

        return {
          id: index,
          name: props.Nom?.title?.[0]?.text?.content || "Produit",
          subtitle: props.Description?.rich_text?.[0]?.text?.content || "",
          price: props.Prix?.number || 0,
          oldPrice: props["Prix Barré"]?.number || 0,
          rating: props.Note?.number || undefined,
          image: props.Image?.url || props.Image?.files?.[0]?.file?.url || props.Image?.files?.[0]?.external?.url || "https://placehold.co/200x120/FFEBD1/333?text=Produit",
          category: props.Catégorie?.select?.name || "",
          isFeatured: props["Mise en avant"]?.checkbox || false,
          isActive: props.Actif?.checkbox || true,
        };
      })
      // Filtrer pour ne garder que les produits actifs et non "Mis en avant"
      .filter(item => item.isActive && !item.isFeatured);

    return menuItems;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Erreur récupération menu Notion:", error);
    }
    throw new Error("Impossible de récupérer le menu");
  }
}

/**
 * Récupérer l'item mis en avant (featured)
 */
export async function getFeaturedItem(): Promise<MenuItem | null> {
  try {
    // Utiliser search pour récupérer toutes les pages
    // @ts-ignore
    const response = await notion.search({
      filter: {
        property: "object",
        value: "page"
      }
    });

    // Normaliser les IDs
    const normalizeId = (id: string) => id.replace(/-/g, '');
    const normalizedMenuId = normalizeId(MENU_DATABASE_ID);

    // Filtrer pour trouver le produit "Mis en avant" de notre database
    const featuredPage = response.results.find((page: any) => {
      const pageDbId = page.parent?.database_id;
      return pageDbId &&
        normalizeId(pageDbId) === normalizedMenuId &&
        page.properties?.["Mise en avant"]?.checkbox === true &&
        page.properties?.Actif?.checkbox === true;
    });

    if (!featuredPage) {
      // Fallback si aucun produit mis en avant
      return {
        id: 0,
        name: "Burger Créole Royal",
        subtitle: "Viande marinée au massalé, sauce piment maison",
        price: 12.00,
        oldPrice: 15.00,
        rating: 4.8,
        image: "https://placehold.co/600x380/FFEBD1/333?text=Burger+Créole"
      };
    }

    const props = (featuredPage as any).properties;

    return {
      id: 0,
      name: props.Nom?.title?.[0]?.text?.content || "Produit Vedette",
      subtitle: props.Description?.rich_text?.[0]?.text?.content || "",
      price: props.Prix?.number || 0,
      oldPrice: props["Prix Barré"]?.number || 0,
      rating: props.Note?.number || undefined,
      image: props.Image?.url || props.Image?.files?.[0]?.file?.url || props.Image?.files?.[0]?.external?.url || "https://placehold.co/600x380/FFEBD1/333?text=Produit",
      category: props.Catégorie?.select?.name || "",
      isFeatured: true,
      isActive: true,
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Erreur récupération item featured:", error);
    }
    return null;
  }
}
