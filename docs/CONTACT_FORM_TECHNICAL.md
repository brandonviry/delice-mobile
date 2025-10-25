# Documentation Technique - Formulaire de Contact Professionnel

## 🏗️ Architecture

### Stack Technique

- **Frontend** : React 19 + Next.js 16 + TypeScript
- **Validation** : React Hook Form + Zod
- **Base de données** : Notion API
- **Styling** : Tailwind CSS v4

### Structure des Fichiers

```
delicemobile/
├── components/
│   └── forms/
│       ├── contact-form.tsx      # Composant formulaire principal
│       └── index.ts               # Barrel export
├── app/
│   └── api/
│       └── contact/
│           └── route.ts           # API endpoint Next.js
├── lib/
│   └── notion.ts                  # Client Notion + helpers
├── .env.local                     # Variables d'environnement (local)
├── .env.example                   # Template des variables
└── NOTION_SETUP.md               # Guide de configuration
```

## 🔐 Sécurité

### Protection des Données

1. **Variables d'environnement** :
   - Token Notion jamais exposé côté client
   - API Keys stockées uniquement côté serveur
   - `.env.local` dans `.gitignore`

2. **Rate Limiting** :
   ```typescript
   // 5 requêtes maximum par IP toutes les 15 minutes
   RATE_LIMIT_MAX_REQUESTS=5
   RATE_LIMIT_WINDOW_MS=900000
   ```

3. **Validation Multi-niveaux** :
   - **Frontend** : Validation en temps réel avec Zod
   - **Backend** : Re-validation dans l'API route
   - **Notion** : Types de propriétés enforced

### CORS & Headers

Les API routes Next.js gèrent automatiquement CORS pour le même domaine.

## 📝 Validation Schema (Zod)

```typescript
const contactSchema = z.object({
  name: z.string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),

  email: z.string()
    .email("Adresse email invalide")
    .min(1, "L'email est requis"),

  phone: z.string()
    .refine(
      (val) => val === "" || /^(\+262|0)[6-7]\d{8}$/.test(val),
      "Numéro de téléphone Réunion invalide (ex: 0692XXXXXX)"
    )
    .optional()
    .or(z.literal("")),

  message: z.string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(500, "Le message ne peut pas dépasser 500 caractères"),
});
```

### Règles de Validation

- **Nom** : 2-50 caractères
- **Email** : Format email standard
- **Téléphone** : Format Réunion (+262 ou 0) + 6/7 + 8 chiffres (optionnel)
- **Message** : 10-500 caractères

## 🔄 Flow de Données

### 1. Soumission Formulaire

```
User Input → React Hook Form → Zod Validation → API Call
```

### 2. API Processing

```
POST /api/contact
  ├─ Rate Limit Check
  ├─ Zod Validation
  ├─ Notion API Call
  └─ Response (201/400/429/500)
```

### 3. Stockage Notion

```typescript
// Structure de la page Notion créée
{
  parent: { database_id: "..." },
  properties: {
    Nom: { title: [...] },           // Title
    Email: { email: "..." },         // Email
    Téléphone: { phone_number: "..." }, // Phone (optionnel)
    Message: { rich_text: [...] },   // Rich Text
    Statut: { select: "Nouveau" },   // Select
    // Date: Created time (auto)
  }
}
```

## 🎨 UX/UI Features

### États du Formulaire

1. **Idle** : État initial
2. **Validating** : Validation en temps réel (onBlur)
3. **Submitting** : Envoi en cours (spinner + bouton désactivé)
4. **Success** : Message de confirmation (5 secondes)
5. **Error** : Message d'erreur

### Accessibilité (a11y)

- `aria-invalid` sur les champs en erreur
- Labels implicites via placeholder
- Focus management avec React Hook Form
- Messages d'erreur associés aux champs
- Bouton désactivé visuellement pendant l'envoi

### Responsive Design

- Mobile-first avec Tailwind
- Inputs adaptés aux écrans tactiles (py-2.5)
- Texte lisible sur tous les devices

## 🔌 API Endpoints

### POST /api/contact

**Request:**
```json
{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "phone": "0692123456",
  "message": "Je souhaite des informations..."
}
```

**Response Success (201):**
```json
{
  "success": true,
  "message": "Votre message a été envoyé avec succès !",
  "id": "notion-page-id"
}
```

**Response Error (400):**
```json
{
  "error": "Données invalides",
  "details": [
    {
      "path": ["email"],
      "message": "Adresse email invalide"
    }
  ]
}
```

**Response Rate Limited (429):**
```json
{
  "error": "Trop de requêtes. Veuillez réessayer dans 15 minutes."
}
```

### GET /api/contact

Health check endpoint.

**Response (200):**
```json
{
  "status": "ok",
  "message": "API de contact Délice Mobile"
}
```

## 🧪 Testing

### Tests Manuels

1. **Validation Frontend** :
   - Soumettre avec champs vides
   - Email invalide
   - Téléphone invalide
   - Message trop court/long

2. **Rate Limiting** :
   - Envoyer 6 requêtes en moins de 15 minutes
   - Vérifier le 429

3. **Success Flow** :
   - Remplir correctement
   - Vérifier dans Notion
   - Vérifier le reset du formulaire

### Tests Automatisés (TODO)

```bash
npm test -- contact-form
```

Utiliser Jest + React Testing Library pour :
- Validation Zod
- Submit handlers
- Error states
- Success states

## 📊 Monitoring & Logs

### Console Logs

```typescript
// Success
console.log("Contact enregistré:", result.id);

// Error
console.error("Erreur lors de l'envoi:", error);
console.error("Erreur API contact:", error);
console.error("Erreur lors de l'ajout à Notion:", error);
```

### Production Monitoring

Recommandations :
- **Sentry** : Pour le tracking d'erreurs
- **Vercel Analytics** : Pour les métriques
- **Notion API Logs** : Dans le dashboard Notion

## 🚀 Performance

### Optimisations

1. **React Hook Form** :
   - Pas de re-renders inutiles
   - Validation asynchrone optimisée

2. **API Routes** :
   - Edge runtime possible (TODO)
   - Rate limiting en mémoire (léger)

3. **Notion API** :
   - Appels minimaux (1 par soumission)
   - Pas de cache nécessaire

### Métriques Cibles

- First Input Delay : < 100ms
- API Response Time : < 2s
- Form Submission : < 3s total

## 🔮 Améliorations Futures

### Court Terme

- [ ] Tests unitaires et e2e
- [ ] Emails de notification (SMTP)
- [ ] Email de confirmation au client
- [ ] Honeypot anti-spam
- [ ] CAPTCHA (si spam)

### Moyen Terme

- [ ] Webhook Notion pour synchronisation
- [ ] Dashboard admin pour gérer les contacts
- [ ] Export CSV des contacts
- [ ] Statistiques de conversion

### Long Terme

- [ ] CRM intégré
- [ ] Réponses automatiques
- [ ] Chatbot avec IA
- [ ] Multi-langues (FR/EN)

## 📦 Dépendances

```json
{
  "dependencies": {
    "@hookform/resolvers": "^5.2.2",
    "@notionhq/client": "^5.3.0",
    "react-hook-form": "^7.65.0",
    "zod": "^4.1.12"
  }
}
```

## 🛠️ Maintenance

### Mises à Jour

Vérifier régulièrement :
- Notion SDK : `npm outdated @notionhq/client`
- React Hook Form : `npm outdated react-hook-form`
- Zod : `npm outdated zod`

### Backup

- La base de données Notion est automatiquement sauvegardée
- Exporter régulièrement en CSV depuis Notion

## 📚 Ressources

- [React Hook Form Docs](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [Notion API Reference](https://developers.notion.com/reference)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

**Auteur** : Claude Code
**Version** : 1.0.0
**Dernière mise à jour** : 2025
