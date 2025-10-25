# Configuration Base de Données Commandes Notion

## 📋 Créer la Base de Données des Commandes

### 1. Créer une Nouvelle Base de Données

1. Dans Notion, créez une nouvelle page
2. Ajoutez une base de données **"Table"**
3. Nommez-la : **"Commandes Délice Mobile"**

### 2. Structure de la Base de Données

Configurez les colonnes suivantes **EXACTEMENT avec ces noms** :

| Nom de la colonne | Type de propriété | Configuration |
|-------------------|-------------------|---------------|
| **ID COMMAND** | Title | (colonne titre par défaut) |
| **Commande** | Text | Long text |
| **État** | Select | Options ci-dessous |
| **Prix** | Number | Format: € (optionnel) |
| **Date** | Text | Date de la commande |
| **Heure** | Text | Heure de la commande |

### 3. Configurer les Options d'État

Dans la colonne **État** (Select), ajoutez ces 3 options :

1. 🔵 **Pas commencé** (couleur bleue)
2. 🟡 **En cours** (couleur jaune)
3. 🟢 **Terminé** (couleur verte)

**IMPORTANT** : Le système créera automatiquement les commandes avec le statut "Pas commencé".

### 4. Partager la Base de Données

1. Cliquez sur les **3 points** (...) en haut à droite
2. Allez dans **"Connexions"** ou **"Add connections"**
3. Sélectionnez **"Délice Mobile Contact Form"** (votre intégration)
4. Autoriser l'accès

### 5. Récupérer l'ID de la Base de Données

1. Ouvrez la base de données dans le navigateur
2. URL ressemble à : `https://www.notion.so/296e9ab3829780c68cd0cfcb7bce1267?v=...`
3. Copiez la partie entre `.so/` et `?v=` : `296e9ab3829780c68cd0cfcb7bce1267`

### 6. Ajouter à .env.local

```env
ORDERS_DATABASE_ID=296e9ab3829780c68cd0cfcb7bce1267
```

## 🧪 Tester

1. Redémarrez le serveur : `npm run dev`
2. Ajoutez des articles au panier sur le site
3. Cliquez sur "Valider la commande"
4. Vérifiez dans Notion qu'une nouvelle ligne apparaît avec:
   - ID COMMAND : CMD-timestamp-xxx
   - Commande : Liste des articles
   - État : Pas commencé
   - Prix : Total

## 📊 Exemple de Commande dans Notion

```
ID COMMAND: CMD-1761334889-123
Commande:
  Burger Créole Royal x1 - 12.00€
  Carry Poulet x2 - 20.80€
  Big Combo x1 - 16.00€

  ✓ Couverts et serviettes inclus
État: Pas commencé
Prix: 48.80
Date: 25/10/2025
Heure: 14:30
```

## 🎯 Workflow Recommandé

### Vue Kanban par État

Créez une vue Kanban groupée par **État** pour gérer visuellement les commandes :

- **Pas commencé** → Nouvelles commandes
- **En cours** → En préparation
- **Terminé** → Prêtes / Récupérées

### Automatisations Notion (Optionnel)

1. Ajouter une colonne **"Date de création"** (Created time)
2. Ajouter une colonne **"Heure estimée"** (Date)
3. Notifications automatiques quand statut change

## 🔍 Dépannage

### Erreur : "ID COMMAND is not a property"

→ Vérifiez que la colonne s'appelle **EXACTEMENT** "ID COMMAND" (tout en majuscule)

### Erreur : "État is not a property"

→ Vérifiez que la colonne s'appelle "État" avec accent

### Erreur : "Pas commencé is not an option"

→ Créez l'option "Pas commencé" dans la colonne Select

### Commande non créée

→ Vérifiez que la base de données est partagée avec l'intégration

## 💡 Fonctionnalités du Système

✅ **ID unique** généré automatiquement (CMD-timestamp-random)
✅ **Liste complète** des articles avec quantités et prix
✅ **Couverts et serviettes** ajoutés si case cochée
✅ **Date et heure** de la commande enregistrées (fuseau horaire Réunion UTC+4)
✅ **QR Code** avec toutes les infos de commande
✅ **Téléchargement PNG** du QR code pour le client
✅ **Statut initial** "Pas commencé"
✅ **Total** calculé automatiquement
✅ **Panier vidé** après validation
✅ **Spinner** pendant l'envoi
✅ **Message de confirmation** pendant 30 secondes

## 📱 Expérience Utilisateur

1. Client ajoute des articles au panier
2. Client coche/décoche "Couverts et serviettes" selon besoin
3. Client clique sur "Valider la commande"
4. Spinner s'affiche "Envoi en cours..."
5. Commande créée dans Notion avec toutes les infos
6. **QR Code s'affiche** avec :
   - Numéro de commande : CMD-1761334889-123
   - Date et heure de la commande
   - Code scannable pour récupération
7. Client peut **télécharger le QR code en PNG**
8. Panier se vide automatiquement
9. Client **scanne ou présente le QR code** au food truck pour récupérer sa commande

## 📲 Système de QR Code

### Contenu du QR Code

Le QR code contient les données suivantes au format JSON :

```json
{
  "id": "CMD-1761334889-123",
  "date": "25/10/2025",
  "time": "14:30",
  "restaurant": "Délice Mobile"
}
```

### Fonctionnalités du QR Code

1. **Affichage immédiat** après validation de commande
2. **Scannable** avec n'importe quel lecteur QR code
3. **Téléchargement PNG** haute qualité (800x1000px)
4. Le fichier PNG inclut :
   - Le QR code scannable
   - Le nom du restaurant "Délice Mobile"
   - Le numéro de commande
   - La date et l'heure

### Utilisation au Food Truck

Le personnel peut scanner le QR code du client pour :
- Vérifier le numéro de commande
- Voir la date et l'heure de commande
- Retrouver rapidement la commande dans Notion
- Valider la récupération

## 🚀 Prochaines Étapes

- [x] QR Code avec numéro de commande
- [x] Téléchargement PNG du QR code
- [ ] Scanner QR code côté food truck (interface admin)
- [ ] Ajouter coordonnées client (nom, téléphone)
- [ ] Envoyer SMS/email de confirmation
- [ ] Afficher temps d'attente estimé
- [ ] Permettre suivi en temps réel du statut
- [ ] Historique des commandes client

