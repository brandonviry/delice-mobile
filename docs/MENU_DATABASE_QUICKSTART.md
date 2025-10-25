# Guide Rapide - Base de Données Menu 🚀

## 📋 Ce que tu dois faire MAINTENANT

Pour que le menu du site vienne de Notion, suis ces 5 étapes :

### ✅ Étape 1 : Créer la Base de Données dans Notion

1. Va sur Notion
2. Crée une nouvelle page
3. Ajoute une **Table**
4. Nomme-la : **"Menu Délice Mobile"**

### ✅ Étape 2 : Ajouter les Colonnes

Ajoute ces colonnes **EXACTEMENT** comme ça :

| Nom de colonne | Type | Exemple |
|----------------|------|---------|
| Nom | Title | Burger Créole Royal |
| Description | Text | Viande marinée au massalé |
| Prix | Number | 12.00 |
| Prix Barré | Number | 15.00 |
| Note | Number | 4.8 |
| Image | URL | https://... |
| Catégorie | Select | Burgers |
| Mise en avant | Checkbox | ✓ ou vide |
| Actif | Checkbox | ✓ |
| Ordre | Number | 1 |

### ✅ Étape 3 : Ajouter des Produits

Ajoute au moins 1 produit pour tester :

```
Nom: Burger Créole Royal
Description: Viande marinée au massalé, sauce piment maison
Prix: 12.00
Prix Barré: 15.00
Note: 4.8
Image: https://placehold.co/600x380/FFEBD1/333?text=Burger
Catégorie: Burgers
Mise en avant: ✓ (coché)
Actif: ✓ (coché)
Ordre: 1
```

### ✅ Étape 4 : Partager avec l'Intégration

1. Clique sur **⋮** (3 points) en haut à droite de la base de données
2. Clique sur **"Connexions"** ou **"Add connections"**
3. Sélectionne ton intégration Notion (celle que tu utilises déjà)
4. Clique sur **"Confirmer"**

### ✅ Étape 5 : Récupérer l'ID et Configurer

1. **Copier l'ID** :
   - Ouvre la base de données dans le navigateur
   - URL = `https://www.notion.so/ABC123...?v=...`
   - Copie la partie entre `.so/` et `?v=`
   - Exemple : `296e9ab38297806db366f8105adf168d`

2. **Ajouter à .env.local** :
   ```bash
   # Ouvre le fichier .env.local
   # Remplace cette ligne :
   MENU_DATABASE_ID=ton_id_ici

   # Par exemple :
   MENU_DATABASE_ID=296e9ab38297806db366f8105adf168d
   ```

3. **Redémarrer le serveur** :
   ```bash
   # Arrête le serveur (Ctrl+C dans le terminal)
   # Puis relance :
   npm run dev
   ```

4. **Tester** :
   - Va sur `http://localhost:3000`
   - Scroll jusqu'à la section Menu
   - Tu devrais voir ton produit ! 🎉

## 🎯 Résultat Attendu

### Si tout fonctionne :

1. **Le menu se charge** (tu vois un spinner "Chargement du menu...")
2. **Le produit vedette s'affiche en grand** (celui avec "Mise en avant" coché)
3. **Les autres produits s'affichent dans la grille**
4. **Les prix et réductions sont corrects**

### Si ça ne fonctionne pas :

#### Problème : "Chargement du menu..." ne s'arrête jamais

**Solutions** :
1. Ouvre la console du navigateur (F12)
2. Regarde les erreurs
3. Vérifie que `MENU_DATABASE_ID` est bien configuré dans `.env.local`
4. Vérifie que la base de données est partagée avec l'intégration

#### Problème : Aucun produit ne s'affiche

**Vérifications** :
1. La colonne **"Actif"** est cochée ?
2. Le produit a un **Nom**, **Prix**, et **Image** ?
3. Rafraîchis la page (Ctrl+R ou F5)

## 📝 Checklist Rapide

Avant de considérer que c'est terminé :

- [ ] Base de données "Menu Délice Mobile" créée dans Notion
- [ ] 10 colonnes ajoutées (Nom, Description, Prix, etc.)
- [ ] Au moins 1 produit ajouté avec toutes les infos
- [ ] Base de données partagée avec l'intégration
- [ ] ID copié et ajouté à `.env.local`
- [ ] Serveur redémarré
- [ ] Site testé → menu s'affiche correctement

## 🎨 Personnalisation

### Ajouter Plus de Produits

1. Ouvre Notion
2. Clique sur **"+ New"** dans la base de données
3. Remplis les champs
4. Coche **"Actif"**
5. Rafraîchis le site → le produit apparaît !

### Changer le Produit Vedette

Le produit vedette est celui affiché en **GRAND** en haut du menu.

1. Décoche **"Mise en avant"** de l'ancien produit
2. Coche **"Mise en avant"** du nouveau produit
3. Rafraîchis le site

**Astuce** : Un seul produit doit avoir "Mise en avant" coché !

### Modifier un Prix

1. Ouvre Notion
2. Change le **Prix** ou **Prix Barré**
3. Rafraîchis le site → le nouveau prix s'affiche !

### Désactiver Temporairement un Produit

1. Décoche **"Actif"**
2. Le produit disparaît du site (mais reste dans Notion)

Pour le réactiver : recoche **"Actif"** !

## 🔄 Workflow Quotidien

```
1. Modifier le menu dans Notion
   ↓
2. Rafraîchir le site
   ↓
3. Les changements apparaissent immédiatement !
```

**Pas besoin de toucher au code** 🎉

## 📚 Documentation Complète

Pour plus de détails, voir :
- [`docs/MENU_NOTION_SETUP.md`](docs/MENU_NOTION_SETUP.md) - Guide complet
- Exemples de produits
- Astuces avancées
- Résolution de problèmes

## 🆘 Besoin d'Aide ?

### Erreur : "Menu database ID non configuré"

→ Ajoute `MENU_DATABASE_ID` dans `.env.local`

### Erreur : "Impossible de récupérer le menu"

→ Vérifie que la base de données est partagée avec l'intégration

### Les images ne s'affichent pas

→ Vérifie que l'URL de l'image est valide (ouvre-la dans le navigateur)

### Le produit vedette ne s'affiche pas

→ Vérifie qu'un produit a bien "Mise en avant" coché

---

**C'est tout !** 🚀

Une fois configuré, tu pourras gérer tout ton menu depuis Notion sans jamais toucher au code.
