# Configuration Notion - Guide Complet ✅

## 🎯 Ce que tu dois faire maintenant

Pour que le système de QR code fonctionne, tu dois ajouter **2 nouvelles colonnes** dans ta base de données Notion "Commandes".

## 📋 Étapes à Suivre

### 1. Ouvrir ta Base de Données Commandes

1. Va sur Notion
2. Ouvre ta base de données **"Commandes Délice Mobile"**
3. L'ID devrait être : `296e9ab3829780c68cd0cfcb7bce1267`

### 2. Ajouter la Colonne "Date"

1. Clique sur le **"+"** à droite des colonnes existantes
2. Nomme la colonne : **Date** (exactement comme ça, avec D majuscule)
3. Type de propriété : **Text** (pas Date !)
4. Clique pour valider

### 3. Ajouter la Colonne "Heure"

1. Clique à nouveau sur le **"+"**
2. Nomme la colonne : **Heure** (exactement comme ça, avec H majuscule)
3. Type de propriété : **Text** (pas Time !)
4. Clique pour valider

## ✅ Structure Finale de la Base de Données

Après ces ajouts, ta base de données doit avoir ces colonnes **dans cet ordre exact** :

| # | Nom de la colonne | Type | Exemple de valeur |
|---|-------------------|------|-------------------|
| 1 | **ID COMMAND** | Title | CMD-1737809450123-456 |
| 2 | **Commande** | Text | Burger Créole Royal x1 - 12.00€<br>Carry Poulet x2 - 20.80€<br><br>✓ Couverts et serviettes inclus |
| 3 | **État** | Select | Pas commencé |
| 4 | **Prix** | Number | 48.80 |
| 5 | **Date** | Text | 25/10/2025 |
| 6 | **Heure** | Text | 14:30 |

## ⚠️ Points Importants

### Noms EXACTS
Les noms doivent être **EXACTEMENT** comme indiqué :
- ✅ `Date` (avec D majuscule)
- ❌ `date` (mauvais)
- ❌ `DATE` (mauvais)
- ❌ `Date de commande` (mauvais)

- ✅ `Heure` (avec H majuscule)
- ❌ `heure` (mauvais)
- ❌ `HEURE` (mauvais)
- ❌ `Heure de commande` (mauvais)

### Type TEXT, pas DATE
Utilise le type **Text** pour les deux colonnes, PAS le type "Date" de Notion !

Pourquoi ? Parce qu'on envoie des chaînes de texte formatées (DD/MM/YYYY et HH:MM) depuis le code.

## 🧪 Comment Tester

### 1. Vérifie que les colonnes sont créées

Regarde ta base de données Notion, tu devrais voir 6 colonnes au total.

### 2. Teste une commande

1. Va sur ton site : `http://localhost:3000` (ou 3001)
2. Ajoute des articles au panier
3. Clique sur "Valider la commande"
4. Vérifie :
   - ✅ Le QR code s'affiche
   - ✅ Tu peux cliquer sur "Télécharger le QR Code"
   - ✅ Un fichier PNG est téléchargé

### 3. Vérifie dans Notion

1. Retourne dans ta base de données Notion
2. Regarde la nouvelle ligne créée
3. Vérifie que les colonnes **Date** et **Heure** sont remplies

**Exemple** :
```
ID COMMAND: CMD-1737809512345-678
Commande: Big Combo x1 - 16.00€
État: Pas commencé
Prix: 16.00
Date: 25/10/2025
Heure: 15:42
```

## 🐛 Dépannage

### Problème : Les colonnes Date/Heure sont vides dans Notion

**Solutions** :

1. **Vérifier les noms**
   - Ouvre Notion
   - Vérifie que les colonnes s'appellent exactement "Date" et "Heure"
   - Majuscule au début uniquement !

2. **Vérifier le type**
   - Clique sur le nom de la colonne
   - Regarde le type : doit être "Text"
   - Si c'est "Date", change en "Text"

3. **Recréer les colonnes**
   - Supprime les colonnes Date et Heure
   - Recrée-les exactement comme indiqué ci-dessus

4. **Redémarrer le serveur**
   ```bash
   # Arrête le serveur (Ctrl+C)
   npm run dev
   ```

### Problème : Erreur "Date is not a property"

Cela veut dire que la colonne n'existe pas ou le nom est incorrect.

**Solution** :
- Vérifie que la colonne s'appelle exactement **"Date"** (avec D majuscule)
- Pas d'espaces avant/après
- Type = Text

### Problème : QR code ne s'affiche pas

**Solutions** :

1. **Vérifier la console du navigateur**
   - F12 pour ouvrir DevTools
   - Onglet Console
   - Regarde les erreurs

2. **Vérifier que la commande est créée**
   - Regarde dans Notion
   - Une nouvelle ligne doit apparaître

3. **Vérifier les dépendances**
   ```bash
   cd "D:\Délice Mobile\app\DéliceMobile\delicemobile"
   npm install qrcode.react
   ```

### Problème : Téléchargement ne fonctionne pas

**Solution** :
- Utilise un navigateur moderne (Chrome, Firefox, Edge)
- Vérifie que les pop-ups ne sont pas bloquées

## 📊 Exemple de Résultat Final

Quand tout fonctionne, voici ce que tu devrais voir :

### Sur le Site

```
┌─────────────────────────────────┐
│  ✓ Commande créée avec succès ! │
│  Scannez ou téléchargez votre   │
│  QR code ci-dessous              │
├─────────────────────────────────┤
│         [QR CODE IMAGE]          │
│                                  │
│    CMD-1737809512345-678         │
│    25/10/2025 à 15:42            │
│                                  │
│  [Télécharger le QR Code]       │
│                                  │
│  Présentez ce QR code au food   │
│  truck pour récupérer votre     │
│  commande                        │
└─────────────────────────────────┘
```

### Dans Notion

| ID COMMAND | Commande | État | Prix | Date | Heure |
|------------|----------|------|------|------|-------|
| CMD-1737809512345-678 | Big Combo x1 - 16.00€<br>Carry Poulet x2 - 20.80€<br><br>✓ Couverts et serviettes inclus | Pas commencé | 48.80 | 25/10/2025 | 15:42 |

### PNG Téléchargé

Le fichier `commande-CMD-1737809512345-678.png` contient :
- QR code de 600x600px
- Texte "Délice Mobile"
- Numéro de commande
- Date et heure
- Fond blanc, haute qualité

## ✅ Checklist Finale

Avant de considérer que c'est terminé, vérifie :

- [ ] Colonne "Date" créée dans Notion (type Text)
- [ ] Colonne "Heure" créée dans Notion (type Text)
- [ ] Base de données partagée avec l'intégration Notion
- [ ] Test : créer une commande
- [ ] Test : QR code s'affiche
- [ ] Test : télécharger le PNG
- [ ] Test : scanner le QR code avec un téléphone
- [ ] Test : colonnes Date et Heure remplies dans Notion
- [ ] Test : info "Couverts et serviettes" apparaît si cochée

## 🎉 C'est Terminé !

Si tous les tests passent, la fonctionnalité QR code est complètement opérationnelle !

Tes clients peuvent maintenant :
1. Commander sur le site
2. Recevoir un QR code unique
3. Le télécharger en PNG
4. Le présenter au food truck pour récupérer leur commande

Le food truck peut :
1. Scanner le QR code
2. Voir le numéro de commande
3. La retrouver dans Notion
4. Valider la récupération

---

**Besoin d'aide ?**
- Voir `docs/QRCODE_SYSTEM.md` pour les détails techniques
- Voir `docs/QRCODE_FEATURE_SUMMARY.md` pour le résumé
- Voir `docs/ORDERS_NOTION_SETUP.md` pour la configuration complète
