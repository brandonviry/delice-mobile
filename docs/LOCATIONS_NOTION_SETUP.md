# Configuration Base de Données Emplacements Food Truck

## 🎯 Objectif

Gérer les emplacements du food truck directement depuis Notion avec une carte interactive affichant le parcours passé et futur.

## 📋 Créer la Base de Données Emplacements

### 1. Créer une Nouvelle Base de Données

1. Dans Notion, créez une nouvelle page
2. Ajoutez une base de données **"Table"**
3. Nommez-la : **"Parcours Food Truck"**

### 2. Structure de la Base de Données

Configurez les colonnes suivantes **EXACTEMENT avec ces noms** :

| Nom de la colonne | Type | Configuration | Obligatoire | Exemple |
|-------------------|------|---------------|-------------|---------|
| **Nom** | Title | Nom de l'emplacement | ✅ Oui | Place du Marché |
| **Adresse** | Text | Adresse complète | ✅ Oui | 123 Rue de la République, Saint-Denis |
| **Latitude** | Number | Coordonnée GPS | ✅ Oui | -20.8789 |
| **Longitude** | Number | Coordonnée GPS | ✅ Oui | 55.4482 |
| **Date** | Date | Date de présence | ✅ Oui | 2025-01-15 |
| **Heure Début** | Text | Heure d'arrivée (HH:mm) | ✅ Oui | 11:30 |
| **Heure Fin** | Text | Heure de départ (HH:mm) | ✅ Oui | 14:30 |
| **Description** | Text | Informations supplémentaires | ❌ Non | Près du marché |
| **Ordre** | Number | Ordre d'affichage | ✅ Oui | 1 |

### 3. Partager la Base de Données

1. Clique sur les **3 points** (...) en haut à droite
2. Va dans **"Connexions"** ou **"Add connections"**
3. Sélectionne ton intégration Notion (la même que pour les contacts/commandes)
4. Autorise l'accès

### 4. Récupérer l'ID de la Base de Données

1. Ouvre la base de données dans le navigateur
2. URL ressemble à : `https://www.notion.so/abc123def456...?v=...`
3. Copie la partie entre `.so/` et `?v=` (32 caractères)
4. Exemple : `298e9ab3829780c7a56efba4d8721e5b`

### 5. Ajouter à .env.local

```env
LOCATIONS_DATABASE_ID=ton_id_de_base_de_donnees_emplacements_ici
```

## 🗺️ Trouver les Coordonnées GPS

### Méthode 1 : Google Maps

1. Va sur [Google Maps](https://maps.google.com)
2. Clique droit sur l'emplacement
3. Clique sur les coordonnées (exemple : -20.8789, 55.4482)
4. Copie-colle dans Notion

### Méthode 2 : OpenStreetMap

1. Va sur [OpenStreetMap](https://www.openstreetmap.org)
2. Cherche l'adresse
3. Clique droit → "Afficher l'adresse"
4. Copie latitude et longitude

### Format Important

- **Latitude** : Nombre décimal (ex: -20.8789)
- **Longitude** : Nombre décimal (ex: 55.4482)
- **Pas de guillemets**, juste le nombre

## 📊 Exemple de Données

Voici 3 exemples d'emplacements :

### Emplacement 1 (Passé)
```
Nom: Place du Marché Saint-Denis
Adresse: Place du Marché, Saint-Denis 97400
Latitude: -20.8789
Longitude: 55.4482
Date: 2025-10-20
Heure Début: 11:30
Heure Fin: 14:30
Description: Tous les lundis, à côté du marché
Ordre: 1
```

### Emplacement 2 (Actuel)
```
Nom: Plage de l'Hermitage
Adresse: Plage de l'Hermitage, Saint-Gilles 97434
Latitude: -21.0656
Longitude: 55.2194
Date: 2025-10-25
Heure Début: 11:00
Heure Fin: 16:00
Description: Face à la plage
Ordre: 2
```

### Emplacement 3 (Futur)
```
Nom: Centre-ville Saint-Pierre
Adresse: Rue des Bons Enfants, Saint-Pierre 97410
Latitude: -21.3394
Longitude: 55.4781
Date: 2025-10-28
Heure Début: 12:00
Heure Fin: 15:00
Description: Parking du centre commercial
Ordre: 3
```

## 🎨 Fonctionnement de la Carte

### Statuts Automatiques

Le système détermine automatiquement le statut basé sur la date et l'heure :

- **Passé** (gris) : L'heure de fin est dépassée
- **Actuel** (vert) : Nous sommes entre l'heure de début et de fin aujourd'hui
- **À venir** (orange) : La date est future

### Couleurs de la Carte

- **Ligne grise pointillée** : Parcours passé
- **Ligne orange continue** : Parcours futur
- **Marqueur gris** : Emplacement passé
- **Marqueur vert** : Emplacement actuel (en cours)
- **Marqueur orange** : Emplacement futur

### Popups Interactives

Cliquez sur un marqueur pour voir :
- Nom de l'emplacement
- Adresse
- Date (jour complet, ex: "lundi 25 octobre")
- Heures (ex: "11:00 - 14:30")
- Description (si renseignée)
- Statut (Passé/En cours/À venir)

## ⚙️ Gestion au Quotidien

### Ajouter un Nouvel Emplacement

1. Ouvre la base de données Notion
2. Clique sur **"+ New"**
3. Remplis tous les champs obligatoires
4. Définis l'**Ordre** (numéro suivant)
5. Rafraîchis le site → l'emplacement apparaît !

### Modifier un Emplacement

1. Trouve l'emplacement dans Notion
2. Modifie les champs (date, heures, etc.)
3. Rafraîchis le site → les changements apparaissent

### Supprimer un Emplacement

Supprime la ligne dans Notion → l'emplacement disparaît du site

## 🧪 Tester

1. Redémarre le serveur :
   ```bash
   npm run dev
   ```

2. Va sur `http://localhost:3000`

3. Scroll jusqu'à la section **"Suivez Notre Parcours"**

4. Vérifie :
   - ✅ La carte se charge
   - ✅ Les marqueurs s'affichent aux bons emplacements
   - ✅ Les couleurs correspondent aux statuts
   - ✅ Les lignes de parcours sont tracées
   - ✅ Les popups affichent les bonnes informations
   - ✅ L'emplacement actuel s'affiche dans la carte verte
   - ✅ Le prochain emplacement s'affiche dans la carte orange

## 🐛 Dépannage

### Problème : Carte ne se charge pas

**Solutions** :

1. **Vérifier LOCATIONS_DATABASE_ID**
   - Ouvre `.env.local`
   - Vérifie que `LOCATIONS_DATABASE_ID` est rempli
   - Vérifie que l'ID est correct (32 caractères)

2. **Vérifier le partage**
   - La base de données doit être partagée avec l'intégration

3. **Redémarrer le serveur**
   ```bash
   # Ctrl+C puis :
   npm run dev
   ```

### Problème : Marqueurs au mauvais endroit

**Solutions** :

1. **Vérifier les coordonnées**
   - Latitude et Longitude doivent être des nombres décimaux
   - Format : -20.8789 (pas de guillemets)
   - Vérifier sur Google Maps que les coordonnées sont correctes

2. **Inverser Latitude/Longitude ?**
   - Latitude = position Nord/Sud (pour la Réunion : -20 à -21)
   - Longitude = position Est/Ouest (pour la Réunion : 55)

### Problème : Mauvais statut (Passé/Actuel/Futur)

**Vérifications** :

1. **Date** au bon format (YYYY-MM-DD)
2. **Heure Début** et **Heure Fin** au format HH:mm (ex: 11:30)
3. L'heure du serveur est correcte (UTC+4 pour La Réunion)

### Problème : Ligne de parcours ne s'affiche pas

**Solutions** :

1. **Minimum 2 emplacements** nécessaires
2. **Ordre** correct (1, 2, 3...)
3. Emplacements du même statut (passés ensemble, futurs ensemble)

## 💡 Astuces

### Vue Calendrier

Crée une vue **Calendar** dans Notion groupée par **Date** pour visualiser le planning du mois

### Templates

Crée un template dans Notion avec les champs pré-remplis :
- Heure Début : 11:30
- Heure Fin : 14:30
- Description : vide

### Ordre Automatique

Pour l'**Ordre**, utilise des multiples de 10 (10, 20, 30...) pour pouvoir insérer facilement des emplacements entre deux existants

### Export Planning

Depuis Notion, tu peux exporter le planning en PDF ou CSV pour le partager

## 🎯 Cas d'Usage

### Planifier une Tournée

1. Ajoute tous les emplacements avec dates futures
2. Définis l'ordre de passage
3. Les clients voient le parcours sur la carte
4. Au fur et à mesure que tu passes, les statuts changent automatiquement

### Informer les Clients

Les clients peuvent :
- Voir où tu es **maintenant** (carte verte)
- Voir où tu seras **prochainement** (carte orange)
- Voir ton **parcours** complet sur la carte

### Analyser le Parcours

Dans Notion, tu peux :
- Filtrer par date
- Grouper par quartier/ville
- Analyser quels emplacements marchent le mieux

## 📱 Affichage Mobile

La carte est **responsive** :
- S'adapte aux petits écrans
- Touch-friendly (pinch to zoom)
- Popups optimisées mobile

## 🚀 Architecture Technique

Conforme à `docs/architecture.md` :

```
types/location.ts           → Interfaces TypeScript
services/location.service.ts → Service Layer (Notion)
app/api/locations/route.ts  → API Route
components/ui/food-truck-map.tsx → Composant carte
components/layouts/ambiance-photo.tsx → Composant parent
```

## 📚 Fichiers Créés

- ✅ `types/location.ts` - Types TypeScript
- ✅ `services/location.service.ts` - Service Notion
- ✅ `app/api/locations/route.ts` - API endpoint
- ✅ `components/ui/food-truck-map.tsx` - Carte interactive
- ✅ `components/layouts/ambiance-photo.tsx` - Section parcours
- ✅ `docs/LOCATIONS_NOTION_SETUP.md` - Cette documentation

## ✅ Checklist Finale

Avant de considérer que c'est terminé :

- [ ] Base de données "Parcours Food Truck" créée dans Notion
- [ ] 9 colonnes ajoutées (Nom, Adresse, Latitude, etc.)
- [ ] Au moins 3 emplacements ajoutés (passé, actuel, futur)
- [ ] Base de données partagée avec l'intégration
- [ ] ID copié et ajouté à `.env.local`
- [ ] Serveur redémarré
- [ ] Site testé → carte s'affiche correctement
- [ ] Marqueurs cliquables avec popups
- [ ] Lignes de parcours affichées
- [ ] Statuts corrects (couleurs)

---

**Date de création** : 25/10/2025
**Version** : 1.0
**Status** : ✅ Production Ready
