import { Client } from "@notionhq/client";

// Utiliser le même client Notion
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// ID de la base de données des commandes
export const ORDERS_DATABASE_ID = process.env.ORDERS_DATABASE_ID || "296e9ab3829780c68cd0cfcb7bce1267";

// Types pour les commandes
export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderData {
  items: OrderItem[];
  totalPrice: number;
  totalItems: number;
  includeCutlery?: boolean;
  customerInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

/**
 * Générer un ID de commande unique
 */
export function generateOrderId(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `CMD-${timestamp}-${random}`;
}

/**
 * Créer une commande dans Notion
 */
export async function createOrderInNotion(orderData: OrderData) {
  try {
    const orderId = generateOrderId();
    const orderDate = new Date();

    // Formater date et heure pour Réunion (UTC+4)
    const reunionDate = new Date(orderDate.getTime() + (4 * 60 * 60 * 1000));
    const dateFormatted = reunionDate.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const timeFormatted = reunionDate.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Formater les items pour le texte
    const itemsText = orderData.items
      .map(item => `${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)}€`)
      .join('\n');

    // Ajouter l'info couverts si demandés
    const fullOrderText = orderData.includeCutlery
      ? `${itemsText}\n\n✓ Couverts et serviettes inclus`
      : itemsText;

    const response = await notion.pages.create({
      parent: {
        database_id: ORDERS_DATABASE_ID,
      },
      properties: {
        // ID COMMAND (Title)
        "ID COMMAND": {
          title: [
            {
              text: {
                content: orderId,
              },
            },
          ],
        },
        // Commande (Text) - Liste des items
        "Commande": {
          rich_text: [
            {
              text: {
                content: fullOrderText,
              },
            },
          ],
        },
        // État (Select) - "Pas commencé"
        "État": {
          select: {
            name: "Pas commencé",
          },
        },
        // Prix total (optionnel si vous avez cette colonne)
        ...(orderData.totalPrice && {
          "Prix": {
            number: orderData.totalPrice,
          },
        }),
        // Date et heure de la commande
        "Date": {
          rich_text: [
            {
              text: {
                content: dateFormatted,
              },
            },
          ],
        },
        "Heure": {
          rich_text: [
            {
              text: {
                content: timeFormatted,
              },
            },
          ],
        },
      },
    });

    return {
      success: true,
      orderId,
      orderDate: dateFormatted,
      orderTime: timeFormatted,
      notionPageId: response.id,
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Erreur création commande Notion:", error);
    }
    throw new Error("Impossible de créer la commande");
  }
}

/**
 * Mettre à jour le statut d'une commande
 */
export async function updateOrderStatus(pageId: string, status: string) {
  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        "État": {
          select: {
            name: status,
          },
        },
      },
    });

    return { success: true };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Erreur mise à jour statut:", error);
    }
    throw new Error("Impossible de mettre à jour le statut");
  }
}
