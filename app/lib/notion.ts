import { Client } from "@notionhq/client";

// Initialiser le client Notion
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// ID de la base de données
export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || "";

// Types pour la structure de données
export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

/**
 * Ajouter un contact à la base de données Notion
 */
export async function addContactToNotion(data: ContactData) {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: NOTION_DATABASE_ID,
      },
      properties: {
        // Nom (Title)
        Nom: {
          title: [
            {
              text: {
                content: data.name,
              },
            },
          ],
        },
        // mail (Email) - nom en minuscule dans Notion
        mail: {
          email: data.email,
        },
        // phone (Phone) - seulement si présent, nom en minuscule dans Notion
        ...(data.phone && data.phone.trim() !== "" && {
          phone: {
            phone_number: data.phone,
          },
        }),
        // Message (Rich Text)
        Message: {
          rich_text: [
            {
              text: {
                content: data.message,
              },
            },
          ],
        },
        // Statut (Select) - automatiquement "Nouveau"
        Statut: {
          select: {
            name: "Nouveau",
          },
        },
        // Date de création - automatique
      },
    });

    return {
      success: true,
      id: response.id,
    };
  } catch (error) {
    // Log uniquement en développement
    if (process.env.NODE_ENV === "development") {
      console.error("Erreur Notion:", error);
    }

    throw new Error("Impossible d'enregistrer le contact");
  }
}

/**
 * Valider la configuration Notion
 */
export async function validateNotionConfig() {
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
    throw new Error("Configuration Notion manquante dans .env.local");
  }

  try {
    // Tester la connexion en récupérant la database
    await notion.databases.retrieve({
      database_id: NOTION_DATABASE_ID,
    });
    return true;
  } catch (error) {
    console.error("Erreur de configuration Notion:", error);
    throw new Error("Configuration Notion invalide");
  }
}
