import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { addContactToNotion } from "@/lib/notion";

// Schéma de validation (même que dans le formulaire)
const contactSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10).max(500),
});

// Rate limiting simple en mémoire (pour production, utilisez Redis ou Upstash)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "5", 10);
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10); // 15 min

  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    console.log("📨 Nouvelle requête contact reçue");

    // Vérifier la configuration
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
      console.error("❌ Variables d'environnement Notion manquantes");
      return NextResponse.json(
        {
          error: "Configuration serveur incorrecte. Contactez l'administrateur.",
        },
        { status: 500 }
      );
    }

    // Récupérer l'IP du client pour le rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    console.log("🔍 IP client:", ip);

    // Vérifier le rate limiting
    if (!checkRateLimit(ip)) {
      console.warn("⚠️ Rate limit dépassé pour IP:", ip);
      return NextResponse.json(
        {
          error: "Trop de requêtes. Veuillez réessayer dans 15 minutes.",
        },
        { status: 429 }
      );
    }

    // Parser et valider les données
    const body = await request.json();
    console.log("📝 Données reçues:", { name: body.name, email: body.email });

    const validatedData = contactSchema.parse(body);
    console.log("✅ Validation Zod réussie");

    // Ajouter à Notion
    console.log("🔄 Envoi à Notion...");
    const result = await addContactToNotion({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      message: validatedData.message,
    });

    console.log("✅ Contact enregistré dans Notion, ID:", result.id);

    // TODO: Optionnel - Envoyer une notification email
    // await sendEmailNotification(validatedData);

    return NextResponse.json(
      {
        success: true,
        message: "Votre message a été envoyé avec succès !",
        id: result.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Erreur API contact:", error);

    // Log plus détaillé pour debug
    if (error instanceof Error) {
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);
    }

    // Erreur de validation Zod
    if (error instanceof z.ZodError) {
      console.error("❌ Erreur de validation Zod:", error.issues);
      return NextResponse.json(
        {
          error: "Données invalides",
          details: error.issues,
        },
        { status: 400 }
      );
    }

    // Autres erreurs
    return NextResponse.json(
      {
        error: "Une erreur est survenue. Veuillez réessayer plus tard.",
        details: process.env.NODE_ENV === "development" ? (error as Error).message : undefined,
      },
      { status: 500 }
    );
  }
}

// Méthode GET pour vérifier que l'API fonctionne
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "API de contact Délice Mobile",
  });
}
