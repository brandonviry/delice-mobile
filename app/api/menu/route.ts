import { NextResponse } from "next/server";
import { getMenuItemsFromNotion, getFeaturedItem } from "../../lib/notion-menu";

export const dynamic = "force-dynamic"; // Désactiver le cache pour toujours avoir des données fraîches

export async function GET() {
  try {
    // Vérifier la configuration
    if (!process.env.NOTION_API_KEY) {
      return NextResponse.json(
        { error: "Configuration serveur incorrecte" },
        { status: 500 }
      );
    }

    if (!process.env.MENU_DATABASE_ID) {
      return NextResponse.json(
        { error: "Menu database ID non configuré" },
        { status: 500 }
      );
    }

    // Récupérer le menu et l'item featured en parallèle
    const [menuItems, featuredItem] = await Promise.all([
      getMenuItemsFromNotion(),
      getFeaturedItem(),
    ]);

    return NextResponse.json(
      {
        success: true,
        featuredItem,
        menuItems: menuItems.filter(item => !item.isFeatured), // Exclure l'item featured de la liste
        totalItems: menuItems.length,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Erreur API menu:", error);
    }

    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de la récupération du menu",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
