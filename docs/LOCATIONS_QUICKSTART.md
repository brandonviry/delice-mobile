# Guide Rapide - Carte Parcours Food Truck 🗺️

## 🚀 Ce qui a été créé

Une **carte interactive** affichant le parcours du food truck avec :
- 🔴 Emplacements passés (gris)
- 🟢 Emplacement actuel (vert)
- 🟠 Emplacements à venir (orange)
- Lignes de parcours
- Popups avec détails

## ✅ Ce que tu dois faire MAINTENANT

### 1. Créer la Base de Données dans Notion

1. Va sur Notion
2. Crée une nouvelle page → Table
3. Nomme-la : **"Parcours Food Truck"**

### 2. Ajouter les Colonnes

| Colonne | Type | Exemple |
|---------|------|---------|
| **Nom** | Title | Place du Marché |
| **Adresse** | Text | 123 Rue de la République |
| **Latitude** | Number | -20.8789 |
| **Longitude** | Number | 55.4482 |
| **Date** | Date | 2025-10-25 |
| **Heure Début** | Text | 11:30 |
| **Heure Fin** | Text | 14:30 |
| **Description** | Text | Près du marché |
| **Ordre** | Number | 1 |

### 3. Ajouter des Emplacements de Test

**Emplacement 1 (Passé)** :
```
Nom: Marché Saint-Denis
Adresse: Place du Marché, Saint-Denis
Latitude: -20.8789
Longitude: 55.4482
Date: 2025-10-20
Heure Début: 11:30
Heure Fin: 14:30
Ordre: 1
```

**Emplacement 2 (Actuel - AUJOURD'HUI)** :
```
Nom: Plage de l'Hermitage
Adresse: Plage de l'Hermitage, Saint-Gilles
Latitude: -21.0656
Longitude: 55.2194
Date: [DATE D'AUJOURD'HUI]
Heure Début: 11:00
Heure Fin: 16:00
Ordre: 2
```

**Emplacement 3 (Futur)** :
```
Nom: Centre-ville Saint-Pierre
Adresse: Rue des Bons Enfants, Saint-Pierre
Latitude: -21.3394
Longitude: 55.4781
Date: [DATE FUTURE +3 jours]
Heure Début: 12:00
Heure Fin: 15:00
Ordre: 3
```

### 4. Partager avec l'Intégration

1. **3 points** (⋮) → **Connexions**
2. Sélectionne ton intégration Notion
3. Confirme

### 5. Récupérer l'ID

1. Ouvre la base de données dans le navigateur
2. URL = `https://www.notion.so/ABC123...?v=...`
3. Copie entre `.so/` et `?v=`

### 6. Configurer .env.local

```bash
# Ouvre .env.local
# Remplace :
LOCATIONS_DATABASE_ID=ton_id_ici

# Par exemple :
LOCATIONS_DATABASE_ID=298e9ab3829780c7a56efba4d8721e5b
```

### 7. Redémarrer le Serveur

```bash
# Ctrl+C puis :
npm run dev
```

### 8. Tester

Va sur `http://localhost:3000` et scroll jusqu'à **"Suivez Notre Parcours"**

Tu devrais voir :
- ✅ Carte avec 3 marqueurs
- ✅ Marqueur vert sur l'emplacement actuel
- ✅ Cartes vertes et oranges au-dessus
- ✅ Lignes de parcours
- ✅ Popups en cliquant sur les marqueurs

## 🗺️ Comment Trouver les Coordonnées GPS ?

### Méthode Rapide (Google Maps)

1. Va sur [Google Maps](https://maps.google.com)
2. Cherche l'adresse
3. **Clique droit** sur le point exact
4. Clique sur les coordonnées (ex: `-20.8789, 55.4482`)
5. Copie dans Notion :
   - Latitude = -20.8789
   - Longitude = 55.4482

## 🎨 Résultat Attendu

### Sur le Site

```
┌─────────────────────────────────────────┐
│     Suivez Notre Parcours              │
│                                         │
│  [Carte verte]         [Carte orange]  │
│  📍 Nous sommes ici    🚚 Prochaine    │
│  Plage de l'Hermitage  Saint-Pierre    │
│  11:00 - 16:00        lundi 28/10      │
│                                         │
│  [CARTE INTERACTIVE avec marqueurs]    │
│  - Gris : Passé                        │
│  - Vert : Actuel                       │
│  - Orange : Futur                      │
│                                         │
│  Légende : ● Passé ● Actuel ● À venir │
└─────────────────────────────────────────┘
```

### Dans Notion

| Nom | Adresse | Lat | Long | Date | Début | Fin | Ordre |
|-----|---------|-----|------|------|-------|-----|-------|
| Marché Saint-Denis | Place... | -20.8789 | 55.4482 | 20/10 | 11:30 | 14:30 | 1 |
| Plage l'Hermitage | Plage... | -21.0656 | 55.2194 | 25/10 | 11:00 | 16:00 | 2 |
| Centre Saint-Pierre | Rue... | -21.3394 | 55.4781 | 28/10 | 12:00 | 15:00 | 3 |

## 🐛 Problèmes Fréquents

### "Aucun emplacement configuré"

→ Vérifie que :
1. `LOCATIONS_DATABASE_ID` est dans `.env.local`
2. La base est partagée avec l'intégration
3. Il y a au moins 1 ligne dans Notion
4. Le serveur est redémarré

### Marqueurs au mauvais endroit

→ Vérifie les coordonnées :
- **Latitude** (Nord/Sud) : -20 à -21 pour La Réunion
- **Longitude** (Est/Ouest) : 55 pour La Réunion
- Format : **nombres décimaux** sans guillemets

### Statut incorrect

→ Vérifie :
- **Date** au format YYYY-MM-DD
- **Heures** au format HH:mm (ex: 11:30)
- L'heure du jour est correcte

## 💡 Astuces

### Ordre des Emplacements

Utilise des multiples de 10 : 10, 20, 30...
→ Tu peux insérer facilement un emplacement entre deux (ex: 15)

### Description

Ajoute des infos utiles :
- "Près du marché"
- "Parking gratuit"
- "Ombragé"

### Vue Calendrier dans Notion

Crée une vue Calendar pour visualiser le planning du mois !

## ✅ Checklist

- [ ] Base de données créée
- [ ] 9 colonnes ajoutées
- [ ] 3 emplacements test ajoutés
- [ ] Base partagée avec intégration
- [ ] ID dans `.env.local`
- [ ] Serveur redémarré
- [ ] Carte s'affiche
- [ ] Marqueurs corrects
- [ ] Popups fonctionnent

## 📚 Documentation Complète

Voir [`docs/LOCATIONS_NOTION_SETUP.md`](docs/LOCATIONS_NOTION_SETUP.md) pour :
- Détails techniques
- Résolution de problèmes
- Cas d'usage avancés

---

**C'est tout !** 🎉 Une fois configuré, la carte se met à jour automatiquement quand tu modifies Notion.
