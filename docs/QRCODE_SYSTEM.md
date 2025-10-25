# Système de QR Code - Délice Mobile

## 🎯 Vue d'ensemble

Le système de QR Code permet aux clients de recevoir un code unique pour leur commande, qu'ils peuvent scanner ou télécharger pour récupérer leur commande au food truck.

## ✨ Fonctionnalités

### Pour le Client

1. **Génération automatique** : Un QR code est créé immédiatement après validation de la commande
2. **Affichage instantané** : Le QR code s'affiche dans le panier avec toutes les informations
3. **Téléchargement PNG** : Bouton pour télécharger le QR code en haute qualité (800x1000px)
4. **Informations incluses** :
   - Numéro de commande unique (CMD-timestamp-random)
   - Date de la commande (format DD/MM/YYYY)
   - Heure de la commande (format HH:MM)
   - Nom du restaurant "Délice Mobile"

### Pour le Food Truck

Le QR code peut être scanné pour :
- Identifier rapidement la commande
- Vérifier la date et l'heure de création
- Retrouver la commande dans Notion
- Confirmer la récupération

## 📱 Format des Données

Le QR code contient un objet JSON :

```json
{
  "id": "CMD-1737809450123-456",
  "date": "25/10/2025",
  "time": "14:30",
  "restaurant": "Délice Mobile"
}
```

## 🎨 Design du QR Code PNG

Quand le client télécharge le QR code :

```
┌─────────────────────────┐
│                         │
│     [QR CODE IMAGE]     │
│                         │
│    Délice Mobile        │
│ Commande: CMD-xxx-xxx   │
│   25/10/2025 à 14:30    │
│                         │
└─────────────────────────┘
```

**Caractéristiques** :
- Taille : 800x1000 pixels
- Fond blanc
- QR code : 600x600 pixels centré
- Texte en Arial, différentes tailles
- Haute qualité pour impression

## 🔧 Implémentation Technique

### Composants

**OrderQRCode** (`components/ui/order-qrcode.tsx`)
- Affiche le QR code avec `QRCodeSVG` de `qrcode.react`
- Convertit SVG en PNG via Canvas API
- Ajoute texte et mise en forme
- Gère le téléchargement

### Props

```typescript
interface OrderQRCodeProps {
  orderId: string;      // CMD-1737809450123-456
  orderDate: string;    // 25/10/2025
  orderTime: string;    // 14:30
}
```

### Intégration

Le composant est intégré dans `MenuGallery` :

```tsx
{orderSuccess && (
  <OrderQRCode
    orderId={orderSuccess.orderId}
    orderDate={orderSuccess.orderDate}
    orderTime={orderSuccess.orderTime}
  />
)}
```

## 📊 Stockage Notion

Les informations du QR code sont également sauvegardées dans Notion :

| Colonne | Valeur |
|---------|--------|
| ID COMMAND | CMD-1737809450123-456 |
| Date | 25/10/2025 |
| Heure | 14:30 |
| Commande | Liste des articles + couverts |
| État | Pas commencé |
| Prix | 48.80 |

## 🌍 Fuseau Horaire

Les dates et heures sont enregistrées selon le fuseau horaire de La Réunion (UTC+4).

```typescript
const reunionDate = new Date(orderDate.getTime() + (4 * 60 * 60 * 1000));
```

## 🚀 Workflow Complet

### Étape 1 : Création de commande
```
Client valide commande → API /api/orders
```

### Étape 2 : Génération
```
Notion crée l'entrée → Retourne orderId, date, heure
```

### Étape 3 : Affichage
```
MenuGallery affiche OrderQRCode → Client voit le QR code
```

### Étape 4 : Téléchargement (optionnel)
```
Client clique "Télécharger" → PNG généré → Fichier téléchargé
```

### Étape 5 : Récupération
```
Client présente QR code → Food truck scanne → Retrouve commande
```

## 🔐 Sécurité

- **ID unique** : Timestamp + nombre aléatoire (1000 combinaisons par milliseconde)
- **Format standardisé** : JSON facilement validable
- **Pas de données sensibles** : Uniquement ID, date, heure, restaurant

## 📦 Dépendances

```json
{
  "qrcode.react": "^4.1.0"
}
```

## 🎯 Cas d'Usage

### Client oublie son téléphone
✅ Peut noter le numéro de commande affiché

### Mauvaise connexion
✅ Télécharge le PNG avant de partir

### Plusieurs commandes
✅ Chaque QR code est unique et identifiable

### Vérification rapide
✅ Scanner suffit, pas besoin de chercher manuellement

## 🛠️ Personnalisation

### Modifier la taille du QR code

Dans `order-qrcode.tsx` :
```tsx
<QRCodeSVG
  value={qrData}
  size={200}  // ← Modifier ici (affichage)
  level="H"
/>
```

Pour le PNG téléchargé, modifier dans `downloadQRCode()` :
```typescript
const qrSize = 600;  // ← Modifier ici (download)
```

### Modifier le niveau de correction d'erreur

```tsx
<QRCodeSVG
  level="H"  // L (7%), M (15%), Q (25%), H (30%)
/>
```

**Recommandation** : Garder "H" (30%) pour résistance aux dommages

## 📝 Notes de Développement

- Le QR code utilise SVG pour l'affichage (léger, scalable)
- Conversion en PNG uniquement au téléchargement
- Canvas API utilisé pour la conversion SVG→PNG
- Timeout de 30 secondes pour laisser temps de télécharger
- Auto-nettoyage après timeout (libère mémoire)

## 🐛 Dépannage

### QR code ne s'affiche pas
→ Vérifier que `qrcode.react` est installé : `npm install qrcode.react`

### Téléchargement ne fonctionne pas
→ Vérifier que le navigateur supporte Canvas API

### QR code illisible
→ Augmenter `level` à "H" ou augmenter `size`

### Date/heure incorrecte
→ Vérifier le fuseau horaire UTC+4 dans `notion-orders.ts`

## 🎨 Personnalisation du Design

Pour personnaliser les couleurs dans le bouton de téléchargement :

```tsx
className="bg-brand-olive hover:bg-brand-orange"
```

Modifier dans `order-qrcode.tsx` ligne 104.
