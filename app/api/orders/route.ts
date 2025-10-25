import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createOrderInNotion } from "../../../lib/notion-orders";

// Schéma de validation pour les commandes
const orderItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

const orderSchema = z.object({
  items: z.array(orderItemSchema).min(1, "La commande doit contenir au moins un article"),
  totalPrice: z.number().positive(),
  totalItems: z.number().int().positive(),
  includeCutlery: z.boolean().optional(),
  customerInfo: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
  }).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Vérifier la configuration
    if (!process.env.NOTION_API_KEY) {
      return NextResponse.json(
        { error: "Configuration serveur incorrecte" },
        { status: 500 }
      );
    }

    // Parser et valider les données
    const body = await request.json();
    const validatedData = orderSchema.parse(body);

    // Créer la commande dans Notion
    const result = await createOrderInNotion(validatedData);

    return NextResponse.json(
      {
        success: true,
        message: "Commande créée avec succès !",
        orderId: result.orderId,
        notionPageId: result.notionPageId,
      },
      { status: 201 }
    );
  } catch (error) {
    // Log uniquement en développement
    if (process.env.NODE_ENV === "development") {
      console.error("Erreur API orders:", error);
    }

    // Erreur de validation Zod
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Données de commande invalides",
          details: error.issues,
        },
        { status: 400 }
      );
    }

    // Autres erreurs
    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de la création de la commande",
      },
      { status: 500 }
    );
  }
}

// GET pour vérifier l'API
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "API de commandes Délice Mobile",
  });
}
