# Architecture du Projet Délice Mobile

## Vue d'ensemble

Ce document décrit l'architecture du projet **Délice Mobile**, une application Next.js 16 avec TypeScript et Tailwind CSS.

## Structure du Projet

```
delicemobile/
├── app/                          # App Router Next.js 16
│   ├── (auth)/                   # Groupe de routes - Authentification
│   │   ├── login/               # Page de connexion
│   │   │   └── page.tsx
│   │   └── register/            # Page d'inscription
│   │       └── page.tsx
│   ├── (dashboard)/              # Groupe de routes - Dashboard
│   │   ├── layout.tsx           # Layout spécifique au dashboard
│   │   ├── page.tsx             # Page principale du dashboard
│   │   ├── profile/             # Page de profil
│   │   └── settings/            # Page de paramètres
│   ├── api/                      # API Routes
│   │   ├── auth/                # Routes d'authentification
│   │   ├── users/               # Routes utilisateurs
│   │   └── products/            # Routes produits
│   ├── globals.css              # Styles globaux
│   ├── layout.tsx               # Layout racine
│   └── page.tsx                 # Page d'accueil
│
├── components/                   # Composants réutilisables
│   ├── ui/                      # Composants UI de base (shadcn/ui style)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── forms/                   # Composants de formulaires
│   │   ├── login-form.tsx
│   │   ├── register-form.tsx
│   │   └── ...
│   ├── layouts/                 # Composants de layout
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── sidebar.tsx
│   │   └── ...
│   └── shared/                  # Composants partagés
│       ├── loading.tsx
│       ├── error-boundary.tsx
│       └── ...
│
├── lib/                         # Bibliothèques et utilitaires
│   ├── utils.ts                # Fonctions utilitaires (cn, formatDate, etc.)
│   ├── api.ts                  # Client API et gestion des requêtes
│   ├── constants.ts            # Constantes globales
│   └── validations.ts          # Schémas de validation (Zod)
│
├── hooks/                       # Custom React Hooks
│   ├── use-auth.ts             # Hook d'authentification
│   ├── use-toast.ts            # Hook pour les notifications
│   ├── use-media-query.ts      # Hook pour responsive design
│   └── ...
│
├── types/                       # Types TypeScript
│   ├── index.ts                # Types globaux
│   ├── user.ts                 # Types utilisateur
│   ├── product.ts              # Types produit
│   └── api.ts                  # Types pour les réponses API
│
├── services/                    # Services API
│   ├── auth.service.ts         # Service d'authentification
│   ├── user.service.ts         # Service utilisateur
│   ├── product.service.ts      # Service produit
│   └── ...
│
├── stores/                      # State Management
│   ├── auth.store.ts           # Store d'authentification (Zustand)
│   ├── ui.store.ts             # Store UI (modales, sidebars, etc.)
│   └── ...
│
├── config/                      # Configuration
│   ├── site.ts                 # Configuration du site
│   └── navigation.ts           # Configuration de la navigation
│
├── public/                      # Fichiers statiques
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── docs/                        # Documentation
│   ├── architecture.md         # Ce fichier
│   ├── api.md                  # Documentation API
│   └── deployment.md           # Guide de déploiement
│
├── .env.local                   # Variables d'environnement locales
├── .env.example                 # Exemple de variables d'environnement
├── next.config.ts               # Configuration Next.js
├── tailwind.config.ts           # Configuration Tailwind CSS
├── tsconfig.json                # Configuration TypeScript
└── package.json                 # Dépendances npm
```

## Principes d'Architecture

### 1. **App Router (Next.js 16)**
- Utilisation du nouveau App Router de Next.js
- Server Components par défaut
- Client Components uniquement quand nécessaire (`'use client'`)
- Groupes de routes avec `(nom)` pour organiser sans affecter l'URL

### 2. **TypeScript**
- Mode strict activé
- Types explicites pour toutes les fonctions
- Interfaces pour les objets complexes
- Pas de `any` sauf cas exceptionnels

### 3. **Composants**
- **Composants UI** : Composants de base réutilisables, sans logique métier
- **Composants Forms** : Formulaires avec validation
- **Composants Layouts** : Structure de la page
- **Composants Shared** : Composants partagés avec logique métier

### 4. **State Management**
- **React State** : Pour l'état local des composants
- **Server State** : Avec React Server Components et Server Actions
- **Global State** : Zustand pour l'état client global (auth, UI)

### 5. **Data Fetching**
- Server Components pour le SSR
- API Routes pour les endpoints backend
- Services pour encapsuler la logique API
- SWR ou TanStack Query pour le cache côté client (optionnel)

### 6. **Styling**
- Tailwind CSS v4
- Classes utilitaires avec fonction `cn()` pour fusionner les classes
- Responsive design mobile-first
- Dark mode support

### 7. **Validation**
- Zod pour la validation des schémas
- Validation côté client et serveur
- Types TypeScript générés depuis les schémas Zod

## Conventions de Nommage

### Fichiers
- **Composants React** : `kebab-case.tsx` (ex: `user-profile.tsx`)
- **Hooks** : `use-*.ts` (ex: `use-auth.ts`)
- **Types** : `*.types.ts` ou dans dossier `types/`
- **Services** : `*.service.ts` (ex: `auth.service.ts`)
- **Stores** : `*.store.ts` (ex: `auth.store.ts`)

### Code
- **Composants** : `PascalCase` (ex: `UserProfile`)
- **Fonctions** : `camelCase` (ex: `getUserProfile`)
- **Constantes** : `UPPER_SNAKE_CASE` (ex: `API_BASE_URL`)
- **Types/Interfaces** : `PascalCase` (ex: `User`, `ApiResponse`)

## Routes

### Routes Publiques
- `/` - Page d'accueil
- `/login` - Connexion
- `/register` - Inscription

### Routes Protégées
- `/dashboard` - Tableau de bord
- `/profile` - Profil utilisateur
- `/settings` - Paramètres

### API Routes
- `/api/auth/*` - Authentification
- `/api/users/*` - Gestion des utilisateurs
- `/api/products/*` - Gestion des produits

## Flux de Données

```
User Action
    ↓
Component (Client/Server)
    ↓
Service Layer
    ↓
API Route / Server Action
    ↓
Business Logic
    ↓
Database
    ↓
Response
    ↓
Component Update
```

## Sécurité

- Authentification JWT ou sessions
- Middleware pour protéger les routes
- Validation des données côté serveur
- CSRF protection
- Rate limiting sur les API
- Variables d'environnement pour les secrets

## Performance

- **Code Splitting** : Automatique avec Next.js
- **Image Optimization** : Composant `next/image`
- **Font Optimization** : Composant `next/font`
- **Server Components** : Réduction du JavaScript côté client
- **Static Generation** : Pour les pages qui ne changent pas souvent

## Tests

```
tests/
├── unit/              # Tests unitaires
├── integration/       # Tests d'intégration
└── e2e/              # Tests end-to-end (Playwright/Cypress)
```

## Déploiement

- **Développement** : `npm run dev`
- **Production** : `npm run build && npm start`
- **Hébergement** : Vercel (recommandé) ou autre plateforme Node.js

## Variables d'Environnement

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Database
DATABASE_URL=

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# External Services
# ...
```

## Évolutions Futures

- [ ] Ajout de tests automatisés
- [ ] Mise en place de Storybook pour les composants
- [ ] CI/CD avec GitHub Actions
- [ ] Monitoring et analytics
- [ ] PWA support
- [ ] Internationalisation (i18n)

## Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)

---

**Dernière mise à jour** : 24 octobre 2025
**Version** : 1.0.0
