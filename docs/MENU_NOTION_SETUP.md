# Configuration Base de Données Menu Notion

## 🎯 Objectif

Gérer le menu du site Délice Mobile directement depuis Notion. Tu pourras ajouter, modifier, désactiver des produits sans toucher au code !

## 📋 Créer la Base de Données Menu

### 1. Créer une Nouvelle Base de Données

1. Dans Notion, créez une nouvelle page
2. Ajoutez une base de données **"Table"**
3. Nommez-la : **"Menu Délice Mobile"**

### 2. Structure de la Base de Données

Configurez les colonnes suivantes **EXACTEMENT avec ces noms** :

| Nom de la colonne | Type | Configuration | Obligatoire |
|-------------------|------|---------------|-------------|
| **Nom** | Title | Nom du produit | ✅ Oui |
| **Description** | Text | Description/sous-titre du produit | ❌ Non |
| **Prix** | Number | Prix actuel en euros | ✅ Oui |
| **Prix Barré** | Number | Ancien prix (pour afficher réduction) | ✅ Oui |
| **Note** | Number | Note sur 5 (ex: 4.8) | ❌ Non |
| **Image** | URL ou Files | URL de l'image du produit | ✅ Oui |
| **Catégorie** | Select | Type de produit | ❌ Non |
| **Mise en avant** | Checkbox | Produit vedette affiché en grand | ❌ Non |
| **Actif** | Checkbox | Activer/désactiver le produit | ✅ Oui |
| **Ordre** | Number | Ordre d'affichage (1, 2, 3...) | ❌ Non |

### 3. Configurer les Options

#### Colonne "Catégorie" (Select)

Ajoute ces options (tu peux en ajouter d'autres) :
- 🍔 Burgers
- 🍛 Currys
- 🥟 Samoussas
- 🍱 Combos
- 🥤 Boissons
- 🍰 Desserts

#### Colonne "Actif" (Checkbox)

- ✅ Coché = Le produit s'affiche sur le site
- ❌ Décoché = Le produit est caché (mais pas supprimé)

#### Colonne "Mise en avant" (Checkbox)

- ✅ Coché = Produit affiché en grand en haut (Hero section)
- ❌ Décoché = Produit normal dans la grille

**IMPORTANT** : Un seul produit doit être "Mis en avant" à la fois !

### 4. Partager la Base de Données

1. Clique sur les **3 points** (...) en haut à droite
2. Va dans **"Connexions"** ou **"Add connections"**
3. Sélectionne **"Délice Mobile Contact Form"** (ton intégration existante)
4. Autorise l'accès

### 5. Récupérer l'ID de la Base de Données

1. Ouvre la base de données dans le navigateur
2. URL ressemble à : `https://www.notion.so/abc123def456...?v=...`
3. Copie la partie entre `.so/` et `?v=` (32 caractères)
4. Exemple : `296e9ab38297806db366f8105adf168d`

### 6. Ajouter à .env.local

Ouvre le fichier `.env.local` et remplace :

```env
MENU_DATABASE_ID=ton_id_de_base_de_donnees_menu_ici
```

## 📊 Exemple de Données

Voici un exemple de produit à ajouter :

| Colonne | Valeur Exemple |
|---------|----------------|
| **Nom** | Burger Créole Royal |
| **Description** | Viande marinée au massalé, sauce piment maison |
| **Prix** | 12.00 |
| **Prix Barré** | 15.00 |
| **Note** | 4.8 |
| **Image** | https://example.com/burger.jpg |
| **Catégorie** | 🍔 Burgers |
| **Mise en avant** | ✅ (coché) |
| **Actif** | ✅ (coché) |
| **Ordre** | 1 |

### Calculer la Réduction Automatiquement

Le site calcule automatiquement le pourcentage de réduction :
- Prix Barré : 15.00€
- Prix : 12.00€
- Réduction affichée : **20% off**

## 🎨 Images des Produits

### Option 1 : URL Externe

Dans la colonne "Image", utilise le type **URL** :
```
https://example.com/images/burger-creole.jpg
```

### Option 2 : Upload Notion

Dans la colonne "Image", utilise le type **Files & media** :
1. Clique sur la cellule
2. Upload ton image
3. Le système récupérera automatiquement l'URL

## 🧪 Tester

1. Redémarre le serveur :
   ```bash
   npm run dev
   ```

2. Va sur `http://localhost:3000`

3. Vérifie que le menu se charge :
   - Le produit "Mis en avant" s'affiche en grand
   - Les autres produits s'affichent dans la grille
   - Seuls les produits "Actif" sont visibles

## 🎯 Utilisation Quotidienne

### Ajouter un Nouveau Produit

1. Ouvre la base de données Notion
2. Clique sur **"+ New"**
3. Remplis :
   - Nom
   - Prix
   - Prix Barré
   - Image (URL ou upload)
   - Coche **"Actif"**
4. Le produit apparaît immédiatement sur le site ! (rafraîchis la page)

### Modifier un Prix

1. Trouve le produit dans Notion
2. Change le **Prix** ou **Prix Barré**
3. Rafraîchis le site → le nouveau prix s'affiche !

### Désactiver Temporairement un Produit

1. Trouve le produit dans Notion
2. Décoche **"Actif"**
3. Le produit disparaît du site (mais reste dans Notion)

Pour le réactiver : recoche **"Actif"** !

### Changer le Produit Vedette

1. Décoche **"Mise en avant"** de l'ancien produit vedette
2. Coche **"Mise en avant"** du nouveau produit
3. Rafraîchis le site → le nouveau produit s'affiche en grand !

### Réorganiser les Produits

1. Change les numéros dans la colonne **"Ordre"**
   - Ordre 1 = Premier
   - Ordre 2 = Deuxième
   - etc.
2. Rafraîchis le site → les produits sont triés !

## ⚠️ Points Importants

### Noms de Colonnes EXACTS

Les noms doivent être **EXACTEMENT** comme indiqué :
- ✅ `Nom` (avec N majuscule)
- ❌ `nom` (mauvais)
- ❌ `NOM` (mauvais)

### Un Seul Produit Vedette

Si plusieurs produits ont **"Mise en avant"** coché :
- Seul le PREMIER sera affiché en grand
- Les autres seront dans la grille normale

### Prix et Prix Barré

- **Prix** doit toujours être inférieur à **Prix Barré**
- Sinon la réduction sera négative ou 0%

### Images

- Utilise des images de bonne qualité
- Recommandé : 600x400px minimum
- Formats : JPG, PNG, WebP

## 🐛 Dépannage

### Problème : Menu ne se charge pas

**Solutions** :

1. **Vérifier MENU_DATABASE_ID**
   - Ouvre `.env.local`
   - Vérifie que `MENU_DATABASE_ID` est bien rempli
   - Vérifie que l'ID est correct (32 caractères)

2. **Vérifier le partage**
   - Ouvre la base de données Notion
   - Menu 3 points → Connexions
   - L'intégration doit être connectée

3. **Vérifier les noms de colonnes**
   - Les noms doivent être exacts
   - Respecte les majuscules
   - Pas d'espaces en trop

4. **Redémarrer le serveur**
   ```bash
   # Arrête avec Ctrl+C
   npm run dev
   ```

### Problème : Produits n'apparaissent pas

**Vérifications** :

1. La colonne **"Actif"** est-elle cochée ?
2. Le produit a-t-il un **Nom** ?
3. Le produit a-t-il un **Prix** ?
4. Le produit a-t-il une **Image** ?

### Problème : Images ne s'affichent pas

**Solutions** :

1. **Si URL externe** :
   - Vérifie que l'URL est valide
   - Ouvre l'URL dans le navigateur
   - Vérifie que c'est bien une image

2. **Si upload Notion** :
   - Réupload l'image
   - Vérifie les permissions

3. **Image par défaut** :
   - Si l'image ne charge pas, un placeholder s'affiche

### Problème : Réduction incorrecte

**Vérifications** :

1. **Prix Barré** > **Prix** ?
2. Les deux sont bien des nombres (pas de texte) ?

## 💡 Astuces

### Vue Kanban par Catégorie

Crée une vue Kanban groupée par **Catégorie** pour organiser visuellement :

1. Clique sur **"+ Add a view"**
2. Choisis **"Board"**
3. Groupe par : **Catégorie**

Tu peux glisser-déposer les produits entre catégories !

### Filtres Utiles

Crée des vues filtrées :

**Vue "Produits Actifs"** :
- Filtre : Actif = ✅

**Vue "Produits Inactifs"** :
- Filtre : Actif = ❌

**Vue "Promotions"** :
- Filtre : (Prix Barré - Prix) / Prix Barré > 0.2
  (Plus de 20% de réduction)

### Formules Notion (Avancé)

Ajoute une colonne **"Réduction %"** (Formula) :

```
round((prop("Prix Barré") - prop("Prix")) / prop("Prix Barré") * 100)
```

Cela calcule automatiquement le % de réduction !

## 📝 Template de Produit

Copie-colle ce template pour ajouter rapidement des produits :

```
Nom: [Nom du produit]
Description: [Description courte]
Prix: [Prix actuel]
Prix Barré: [Ancien prix]
Note: 4.5
Image: [URL ou upload]
Catégorie: [Choisir]
Mise en avant: [ ] (cocher si produit vedette)
Actif: [✓] (toujours coché au début)
Ordre: [Numéro d'ordre]
```

## 🚀 Exemple Complet

Voici 3 produits exemple à ajouter :

### Produit 1 (Vedette)
```
Nom: Burger Créole Royal
Description: Viande marinée au massalé, sauce piment maison
Prix: 12.00
Prix Barré: 15.00
Note: 4.8
Image: https://placehold.co/600x380/FFEBD1/333?text=Burger
Catégorie: 🍔 Burgers
Mise en avant: ✓
Actif: ✓
Ordre: 1
```

### Produit 2
```
Nom: Carry Poulet
Description:
Prix: 10.40
Prix Barré: 13.00
Image: https://placehold.co/200x120/F4E1FF/333?text=Carry
Catégorie: 🍛 Currys
Mise en avant:
Actif: ✓
Ordre: 2
```

### Produit 3
```
Nom: Samoussas Pack
Description:
Prix: 14.40
Prix Barré: 18.00
Image: https://placehold.co/200x120/FFEBD1/333?text=Samossa
Catégorie: 🥟 Samoussas
Mise en avant:
Actif: ✓
Ordre: 3
```

---

**C'est terminé !** 🎉

Tu peux maintenant gérer ton menu directement depuis Notion. Plus besoin de toucher au code pour ajouter ou modifier des produits !
