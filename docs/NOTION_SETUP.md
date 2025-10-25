# Configuration Notion pour le Formulaire de Contact

Ce guide vous explique comment configurer la base de données Notion pour stocker les contacts du formulaire.

## 📋 Prérequis

- Un compte Notion (gratuit)
- Accès aux intégrations Notion

## 🔧 Étapes de Configuration

### 1. Créer une Intégration Notion

1. Allez sur https://www.notion.so/my-integrations
2. Cliquez sur **"+ Nouvelle intégration"**
3. Remplissez les informations :
   - **Nom** : Délice Mobile Contact Form
   - **Espace de travail** : Sélectionnez votre espace
   - **Type** : Internal Integration
4. Cliquez sur **"Soumettre"**
5. **Copiez le "Internal Integration Token"** (commence par `secret_`)
   - ⚠️ Ne partagez jamais ce token publiquement !

### 2. Créer la Base de Données Notion

1. Dans Notion, créez une nouvelle page
2. Ajoutez une base de données **"Table"**
3. Nommez-la : **"Contacts Délice Mobile"**

#### Structure de la Base de Données

Configurez les colonnes suivantes :

| Nom de la colonne | Type de propriété | Configuration |
|-------------------|-------------------|---------------|
| **Nom** | Title | (colonne par défaut) |
| **Email** | Email | - |
| **Téléphone** | Phone | - |
| **Message** | Text | Long text |
| **Statut** | Select | Options: Nouveau (bleu), En cours (jaune), Traité (vert) |
| **Date** | Created time | - |

#### Créer les Statuts

1. Cliquez sur la colonne **Statut**
2. Ajoutez ces options :
   - 🔵 **Nouveau** (couleur bleue)
   - 🟡 **En cours** (couleur jaune)
   - 🟢 **Traité** (couleur verte)

### 3. Partager la Base de Données avec l'Intégration

1. Ouvrez votre base de données Notion
2. Cliquez sur les **3 points** en haut à droite
3. Allez dans **"Connexions"** ou **"Add connections"**
4. Recherchez **"Délice Mobile Contact Form"**
5. Cliquez pour autoriser l'accès

### 4. Récupérer l'ID de la Base de Données

1. Ouvrez votre base de données dans le navigateur
2. Regardez l'URL, elle ressemble à :
   ```
   https://www.notion.so/xxxxxxxxxxxxxxxxxxxxxxxxxxxxx?v=yyyyy
   ```
3. Copiez la partie **`xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`** (entre `.so/` et `?v=`)
   - C'est votre **Database ID**

### 5. Configurer les Variables d'Environnement

1. Copiez `.env.example` vers `.env.local` :
   ```bash
   cp .env.example .env.local
   ```

2. Éditez `.env.local` et remplissez :
   ```env
   NOTION_API_KEY=secret_votre_token_ici
   NOTION_DATABASE_ID=votre_database_id_ici
   ```

3. **Ne commitez JAMAIS le fichier `.env.local`** (déjà dans .gitignore)

## 🧪 Tester la Configuration

1. Démarrez le serveur de développement :
   ```bash
   npm run dev
   ```

2. Allez sur la page contact : http://localhost:3000/#contato

3. Remplissez et soumettez le formulaire

4. Vérifiez dans votre base de données Notion :
   - Un nouveau contact doit apparaître
   - Le statut doit être "Nouveau"
   - Tous les champs doivent être remplis

## 🎨 Personnalisation de la Base de Données (Optionnel)

### Vues Recommandées

1. **Vue Kanban** (par Statut) :
   - Grouper par : Statut
   - Afficher : Nom, Email, Date

2. **Vue Calendrier** :
   - Propriété de date : Date (Created time)
   - Afficher les contacts par date de soumission

3. **Vue Tableau** (par défaut) :
   - Filtrer par : Statut = "Nouveau"
   - Trier par : Date (décroissant)

### Colonnes Additionnelles (Optionnel)

Vous pouvez ajouter :

- **Source** (Select) : Site web, Facebook, Instagram, etc.
- **Priorité** (Select) : Haute, Moyenne, Basse
- **Assigné à** (Person) : Pour attribuer les contacts
- **Notes** (Text) : Pour vos remarques internes
- **Date de réponse** (Date) : Quand vous avez répondu

## 🔒 Sécurité

### Points Importants

- ✅ Le token Notion reste côté serveur (Next.js API Routes)
- ✅ Rate limiting activé (5 requêtes par 15 minutes)
- ✅ Validation des données avec Zod
- ✅ Variables d'environnement protégées
- ❌ Ne jamais exposer `NOTION_API_KEY` côté client

## 🚀 Déploiement (Production)

### Vercel

1. Dans les paramètres du projet Vercel
2. Allez dans **Environment Variables**
3. Ajoutez :
   - `NOTION_API_KEY` = votre token
   - `NOTION_DATABASE_ID` = votre database ID
4. Redéployez l'application

### Autres Plateformes

Consultez la documentation de votre hébergeur pour ajouter les variables d'environnement.

## 📧 Notifications Email (Optionnel)

Pour recevoir un email à chaque nouveau contact, ajoutez ces variables dans `.env.local` :

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre_email@gmail.com
SMTP_PASSWORD=votre_mot_de_passe_application
SMTP_FROM=noreply@delicemobile-reunion.fr
```

### Configuration Gmail

1. Activez la validation en 2 étapes
2. Générez un "Mot de passe d'application"
3. Utilisez ce mot de passe dans `SMTP_PASSWORD`

## 🐛 Dépannage

### Erreur : "Unauthorized"
- Vérifiez que le token Notion est correct
- Vérifiez que la base de données est partagée avec l'intégration

### Erreur : "Database not found"
- Vérifiez que le Database ID est correct
- Vérifiez que l'intégration a accès à la database

### Erreur : "Validation failed"
- Vérifiez la structure de votre base de données
- Les noms de colonnes doivent correspondre exactement

## 📚 Ressources

- [Documentation Notion API](https://developers.notion.com/)
- [SDK Notion JavaScript](https://github.com/makenotion/notion-sdk-js)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## 💡 Conseils

- Testez d'abord en local avant de déployer
- Créez une copie de votre base de données pour les tests
- Configurez des filtres et des vues pour organiser vos contacts
- Ajoutez des automatisations Notion pour les notifications
