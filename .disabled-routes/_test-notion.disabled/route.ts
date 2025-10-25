import { NextResponse } from "next/server";
import { notion, NOTION_DATABASE_ID } from "../../../lib/notion";

export async function GET() {
  try {
    console.log("🧪 Test de configuration Notion");
    console.log("Database ID:", NOTION_DATABASE_ID);
    console.log("API Key présente:", !!process.env.NOTION_API_KEY);

    // Tester la récupération de la database
    const database = await notion.databases.retrieve({
      database_id: NOTION_DATABASE_ID,
    });

    console.log("✅ Base de données trouvée");

    return NextResponse.json({
      success: true,
      message: "Configuration Notion OK",
      database: {
        id: database.id,
      },
    });
  } catch (error) {
    console.error("❌ Erreur test Notion:", error);

    if (error instanceof Error) {
      console.error("Message:", error.message);
    }

    // Log détaillé de l'erreur Notion
    if (typeof error === 'object' && error !== null) {
      console.error("Détails:", JSON.stringify(error, null, 2));
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
        details: error,
      },
      { status: 500 }
    );
  }
}
