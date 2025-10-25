# 🍔 Délice Mobile

Application web complète pour food truck de hamburgers artisanaux à La Réunion, construite avec Next.js 16, TypeScript et Tailwind CSS.

## 📖 Description

Délice Mobile est une application web moderne pour un food truck spécialisé dans les hamburgers créoles gastronomiques à La Réunion. L'application offre une expérience utilisateur complète avec système de commande en ligne, intégration Notion pour la gestion du menu et des emplacements, et carte interactive en temps réel.

## ✨ Fonctionnalités

### 🏠 Page d'Accueil
- Hero section avec image du food truck et CTA
- Présentation de l'histoire et des valeurs
- Galerie de photos d'ambiance

### 🍽️ Menu Dynamique
- **Intégration Notion** : Menu géré depuis une base de données Notion
- Affichage dynamique des produits (burgers, accompagnements, boissons, desserts)
- Images hébergées sur Notion
- Prix, descriptions et catégories
- Configuration Next.js pour supporter tous les domaines d'images

### 🗺️ Carte Interactive (Leaflet)
- **Suivi en temps réel** du parcours du food truck
- Marqueurs colorés selon le statut :
  - 🔴 Gris olive : Emplacements passés
  - 🟢 Vert olive : Emplacement actuel
  - 🟠 Orange : Emplacements à venir
- Lignes de trajet (pointillées pour le passé, pleines pour le futur)
- Popups avec détails (adresse, horaires, description)
- Calcul automatique du statut basé sur date/heure (timezone Réunion)
- Navigation et zoom interactifs
- Z-index optimisé pour cohabiter avec la navbar

### 🛒 Système de Commande
- Panier d'achat interactif
- Sélection de produits depuis le menu Notion
- Option "Couverts et serviettes" (checkbox)
- Formulaire de commande avec validation
- **QR Code de commande** :
  - Génération automatique avec ID de commande
  - Date et heure de la commande
  - Téléchargeable en PNG
  - Utilisé pour la récupération de commande
- Emails de confirmation (SendGrid)

### 📞 Contact & Livraison
- Formulaire de contact
- Options de livraison
- Informations pratiques
- Liens réseaux sociaux

### 🎨 Design & UX
- Design responsive (mobile, tablet, desktop)
- Palette de couleurs créole :
  - Rouge rustique (#c1440e)
  - Olive (#6b7c59)
  - Doré (#d4af37)
  - Orange (#f4a261)
  - Tons pierre (stone-50 à stone-900)
- Polices Google Fonts : Oswald (titres) + Inter (texte)
- Navigation sticky avec backdrop blur
- Animations et transitions fluides
- Loading states et error handling

## 🚀 Technologies

### Frontend
- **Next.js 16** - Framework React avec App Router et Turbopack
- **TypeScript** - Typage statique pour la sécurité du code
- **Tailwind CSS v4** - Framework CSS utilitaire moderne
- **React 19** - Bibliothèque UI avec Server Components
- **Leaflet** - Cartographie interactive
- **React-Leaflet** - Intégration React pour Leaflet
- **QRCode.react** - Génération de QR codes

### Backend & Services
- **Notion API** - CMS headless pour menu et emplacements
- **SendGrid** - Service d'emails transactionnels
- **Next.js API Routes** - Endpoints RESTful

### Dev Tools
- **ESLint** - Linter pour la qualité du code
- **TypeScript** - Vérification de types
- **Git** - Contrôle de version

## 📁 Structure du Projet

```
delicemobile/
├── app/                              # App Router Next.js
│   ├── api/                         # API Routes
│   │   ├── locations/route.ts       # Endpoints emplacements food truck
│   │   ├── contact/route.ts         # Endpoint formulaire contact
│   │   └── order/route.ts           # Endpoint commandes
│   ├── page.tsx                     # Page d'accueil
│   ├── layout.tsx                   # Layout racine
│   └── globals.css                  # Styles globaux + Tailwind
├── components/                       # Composants réutilisables
│   ├── ui/                          # Composants UI de base
│   │   ├── food-truck-map.tsx      # Carte interactive Leaflet
│   │   └── qr-code-display.tsx     # Affichage QR code
│   ├── layouts/                     # Sections de layout
│   │   ├── header.tsx              # Navigation + menu mobile
│   │   ├── footer.tsx              # Pied de page
│   │   ├── hero-section.tsx        # Hero avec CTA
│   │   ├── menu-gallery.tsx        # Menu dynamique (Notion)
│   │   ├── ambiance-photo.tsx      # Carte interactive
│   │   └── delivery-contact-section.tsx  # Contact/Livraison
│   ├── forms/                       # Composants formulaires
│   └── shared/                      # Composants partagés
├── lib/                             # Utilitaires et helpers
│   ├── notion.ts                   # Client Notion API
│   ├── notion-menu.ts              # Service menu Notion
│   ├── sendgrid.ts                 # Client SendGrid
│   └── utils.ts                    # Fonctions utilitaires
├── types/                           # Types TypeScript
│   ├── location.ts                 # Types emplacements
│   ├── menu.ts                     # Types menu/produits
│   └── order.ts                    # Types commandes
├── services/                        # Services métier
│   └── location.service.ts         # Logique emplacements
├── docs/                            # Documentation
│   ├── architecture.md             # Architecture du projet
│   ├── LOCATIONS_NOTION_SETUP.md   # Guide base Notion emplacements
│   ├── LOCATIONS_QUICKSTART.md     # Démarrage rapide emplacements
│   └── EXEMPLE_DONNEES_PARCOURS.md # Exemples données réalistes
├── public/                          # Fichiers statiques
│   └── images/                     # Images du site
├── .env.local                       # Variables d'environnement
├── next.config.ts                   # Configuration Next.js
├── tailwind.config.ts               # Configuration Tailwind
└── tsconfig.json                    # Configuration TypeScript
```

Pour plus de détails sur l'architecture, consultez [docs/architecture.md](./docs/architecture.md).

## 🛠️ Installation

```bash
# Cloner le projet
git clone [URL_DU_REPO]
cd delicemobile

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env.local
```

### Configuration des Variables d'Environnement

Créez un fichier `.env.local` à la racine avec :

```env
# Notion API
NOTION_API_KEY=secret_votre_cle_notion
MENU_DATABASE_ID=votre_id_base_menu
LOCATIONS_DATABASE_ID=votre_id_base_emplacements

# SendGrid (Email)
SENDGRID_API_KEY=SG.votre_cle_sendgrid
SENDGRID_FROM_EMAIL=noreply@delicemobile.re

# Next.js
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Configuration Notion

1. **Créer une intégration Notion** :
   - Allez sur [notion.so/my-integrations](https://www.notion.so/my-integrations)
   - Créez une nouvelle intégration
   - Copiez le "Internal Integration Token"

2. **Créer la base "Menu"** :
   - Colonnes : Nom (titre), Description (texte), Prix (nombre), Catégorie (select), Image (fichier)
   - Partagez la page avec votre intégration
   - Copiez l'ID de la base → `MENU_DATABASE_ID`

3. **Créer la base "Parcours Food Truck"** :
   - Colonnes : Nom, Adresse, Latitude, Longitude, Date, Heure Début, Heure Fin, Description, Ordre
   - Consultez [docs/LOCATIONS_NOTION_SETUP.md](./docs/LOCATIONS_NOTION_SETUP.md)
   - Utilisez les exemples de [docs/EXEMPLE_DONNEES_PARCOURS.md](./docs/EXEMPLE_DONNEES_PARCOURS.md)
   - Copiez l'ID de la base → `LOCATIONS_DATABASE_ID`

4. **Configurer SendGrid** :
   - Créez un compte sur [sendgrid.com](https://sendgrid.com)
   - Générez une API Key
   - Vérifiez votre email expéditeur

## 🚀 Démarrage

```bash
# Mode développement
npm run dev

# Build de production
npm run build

# Démarrer en production
npm start

# Linter
npm run lint
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📝 Scripts Disponibles

- `npm run dev` - Lance le serveur de développement avec Turbopack (port 3000)
- `npm run build` - Compile l'application pour la production
- `npm start` - Lance le serveur de production
- `npm run lint` - Vérifie le code avec ESLint
- `npm run type-check` - Vérification TypeScript

## 🎨 Personnalisation

### Couleurs de la Marque

Les couleurs sont définies dans `tailwind.config.ts`:

```typescript
colors: {
  brand: {
    rust: '#c1440e',      // Rouge rustique (titres, accents)
    olive: '#6b7c59',     // Vert olive (nature, authentique)
    gold: '#d4af37',      // Doré (luxe, premium)
    orange: '#f4a261',    // Orange chaleureux (CTA, futurs)
    red: '#d62828',       // Rouge vif (urgence, promo)
  }
}
```

### Polices

Le projet utilise Google Fonts :
- **Oswald** - Pour les titres en majuscules (`font-heading`)
- **Inter** - Pour le texte courant (`font-body`)

### Images Next.js

Configuration dans `next.config.ts` pour autoriser tous les domaines d'images :

```typescript
remotePatterns: [
  { protocol: 'https', hostname: '**' }, // Tous domaines HTTPS
  { protocol: 'https', hostname: '**.notion.so' },
  { protocol: 'https', hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com' },
]
```

## 📚 Documentation

### Documentation Projet
- [Architecture du projet](./docs/architecture.md) - Architecture complète et patterns
- [Configuration Notion Emplacements](./docs/LOCATIONS_NOTION_SETUP.md) - Guide détaillé
- [Démarrage Rapide Emplacements](./docs/LOCATIONS_QUICKSTART.md) - Quick start
- [Exemples de Données](./docs/EXEMPLE_DONNEES_PARCOURS.md) - 25 emplacements réalistes

### Documentation Externe
- [Next.js Documentation](https://nextjs.org/docs) - Framework React
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Styles utilitaires
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Types et interfaces
- [Notion API](https://developers.notion.com/) - Intégration CMS
- [Leaflet Documentation](https://leafletjs.com/) - Cartographie
- [SendGrid API](https://docs.sendgrid.com/) - Emails transactionnels

## 🔮 Roadmap & Tâches Futures

### 🏗️ Phase 1 : Optimisation & Performance
- [ ] **Optimisation des performances**
  - [ ] Lazy loading des images
  - [ ] Code splitting avancé
  - [ ] Optimisation des bundles JavaScript
  - [ ] Mise en cache côté client (React Query / SWR)
  - [ ] Service Worker pour mode offline
  - [ ] Compression des images (format WebP, AVIF)

- [ ] **SEO & Accessibilité**
  - [ ] Métadonnées dynamiques (Open Graph, Twitter Cards)
  - [ ] Sitemap.xml dynamique
  - [ ] Robots.txt optimisé
  - [ ] Schema.org markup (LocalBusiness, Restaurant)
  - [ ] Amélioration score Lighthouse (>90)
  - [ ] Support ARIA complet
  - [ ] Navigation au clavier
  - [ ] Mode contraste élevé

### 🧩 Phase 2 : Modularité & Clean Code
- [ ] **Refactoring & Architecture**
  - [ ] Extraction de composants réutilisables supplémentaires
  - [ ] Création de hooks personnalisés (useMenu, useLocations, useCart)
  - [ ] Implémentation de Context API pour état global
  - [ ] Migration vers Zustand ou Redux Toolkit (state management)
  - [ ] Découpage des API routes en modules
  - [ ] Pattern Repository pour accès aux données

- [ ] **Tests**
  - [ ] Tests unitaires (Jest + React Testing Library)
  - [ ] Tests d'intégration (Cypress ou Playwright)
  - [ ] Tests E2E pour parcours utilisateur
  - [ ] Tests des API routes
  - [ ] CI/CD avec GitHub Actions
  - [ ] Code coverage >80%

- [ ] **Documentation du Code**
  - [ ] JSDoc pour toutes les fonctions publiques
  - [ ] Storybook pour composants UI
  - [ ] Guide de contribution (CONTRIBUTING.md)
  - [ ] Changelog automatisé

### 🎯 Phase 3 : Nouvelles Fonctionnalités
- [ ] **Authentification & Comptes**
  - [ ] Système d'authentification (NextAuth.js)
  - [ ] Comptes utilisateurs
  - [ ] Historique des commandes
  - [ ] Favoris / Menu personnalisé
  - [ ] Programme de fidélité avec points

- [ ] **Paiement en Ligne**
  - [ ] Intégration Stripe
  - [ ] Support des cartes bancaires
  - [ ] Paiement mobile (Apple Pay, Google Pay)
  - [ ] Gestion des remboursements

- [ ] **Notifications**
  - [ ] Push notifications (Progressive Web App)
  - [ ] Notifications SMS (Twilio)
  - [ ] Alertes de proximité (géolocalisation)
  - [ ] Rappels de commande

- [ ] **Réservations & Événements**
  - [ ] Système de réservation de créneaux
  - [ ] Événements privés (food truck pour événements)
  - [ ] Calendrier de disponibilités
  - [ ] Traiteur pour entreprises

### 🌐 Phase 4 : Internationalisation & Multi-supports
- [ ] **i18n (Internationalisation)**
  - [ ] Support multilingue (Français, Créole réunionnais, Anglais)
  - [ ] next-intl ou react-i18next
  - [ ] Détection automatique de la langue
  - [ ] Traduction du contenu Notion

- [ ] **Progressive Web App (PWA)**
  - [ ] Manifest.json optimisé
  - [ ] Installation sur mobile/desktop
  - [ ] Mode offline avancé
  - [ ] Push notifications natives
  - [ ] App icons adaptatives

- [ ] **Multi-plateformes**
  - [ ] Application mobile React Native (iOS + Android)
  - [ ] Synchronisation avec web app
  - [ ] Notifications push natives

### 📊 Phase 5 : Analytics & Business Intelligence
- [ ] **Tracking & Analytics**
  - [ ] Google Analytics 4
  - [ ] Hotjar ou Microsoft Clarity (heatmaps)
  - [ ] Suivi des conversions
  - [ ] A/B testing (Vercel Analytics)
  - [ ] Tracking des erreurs (Sentry)

- [ ] **Dashboard Admin**
  - [ ] Interface d'administration
  - [ ] Statistiques en temps réel
  - [ ] Gestion des commandes
  - [ ] Gestion du menu (alternative à Notion)
  - [ ] Gestion des emplacements (CRUD)
  - [ ] Rapports de ventes
  - [ ] Analytics clients

### 🔧 Phase 6 : DevOps & Infrastructure
- [ ] **Infrastructure**
  - [ ] Migration base de données (PostgreSQL / Supabase)
  - [ ] Redis pour cache avancé
  - [ ] CDN pour assets statiques
  - [ ] Rate limiting des API
  - [ ] Sécurité renforcée (helmet, CORS)

- [ ] **Monitoring & Logging**
  - [ ] Monitoring serveur (Datadog, New Relic)
  - [ ] Logs structurés (Winston, Pino)
  - [ ] Alertes automatiques (Discord, Slack)
  - [ ] Uptime monitoring

- [ ] **Backup & Disaster Recovery**
  - [ ] Sauvegarde automatisée des données
  - [ ] Plan de reprise d'activité
  - [ ] Environnements staging/production séparés

### 🎨 Phase 7 : UX/UI Améliorations
- [ ] **Expérience Utilisateur**
  - [ ] Animations micro-interactions (Framer Motion)
  - [ ] Skeleton loaders avancés
  - [ ] Transitions de page fluides
  - [ ] Dark mode complet
  - [ ] Mode haute accessibilité

- [ ] **Design System**
  - [ ] Création d'un design system complet
  - [ ] Figma/Sketch design kit
  - [ ] Composants documentés
  - [ ] Tokens de design

### 🔐 Phase 8 : Sécurité & Conformité
- [ ] **Sécurité**
  - [ ] Audit de sécurité complet
  - [ ] Protection CSRF
  - [ ] Validation inputs stricte (Zod)
  - [ ] Rate limiting avancé
  - [ ] Authentification 2FA

- [ ] **RGPD & Conformité**
  - [ ] Politique de confidentialité
  - [ ] Cookie consent banner
  - [ ] Export des données utilisateur
  - [ ] Droit à l'oubli
  - [ ] Conditions générales de vente

## 🚀 Déploiement

### Déploiement Vercel (Recommandé)

Le moyen le plus simple de déployer est d'utiliser [Vercel](https://vercel.com):

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Production
vercel --prod
```

**Avantages Vercel** :
- Déploiement automatique depuis Git
- Preview deployments pour chaque PR
- Analytics intégrés
- Edge Functions
- Optimisations Next.js automatiques

### Autres Plateformes

#### Netlify
```bash
npm run build
netlify deploy --prod
```

#### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### AWS Amplify
- Connectez votre repository Git
- Amplify détecte automatiquement Next.js
- Configuration des variables d'environnement dans la console

### Variables d'Environnement en Production

N'oubliez pas de configurer ces variables sur votre plateforme de déploiement :
- `NOTION_API_KEY`
- `MENU_DATABASE_ID`
- `LOCATIONS_DATABASE_ID`
- `SENDGRID_API_KEY`
- `SENDGRID_FROM_EMAIL`
- `NEXT_PUBLIC_SITE_URL` (URL de production)

## 📄 Licence

© 2025 Délice Mobile. Tous droits réservés.

## 🤝 Contribution

Les contributions sont les bienvenues !

### Comment Contribuer

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### Standards de Code

- Suivez l'architecture documentée dans [docs/architecture.md](./docs/architecture.md)
- Respectez les règles ESLint du projet
- Écrivez des tests pour les nouvelles fonctionnalités
- Utilisez TypeScript strict mode
- Commentez le code complexe avec JSDoc

### Besoin d'Aide ?

- Consultez la [documentation](./docs/)
- Ouvrez une issue GitHub
- Contactez l'équipe : dev@delicemobile.re

---

**Fait avec ❤️ à La Réunion 🇷🇪**
