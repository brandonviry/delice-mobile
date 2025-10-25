# 🔴 ERREUR NOTION - SOLUTION

## Problème Identifié

```
Could not find database with ID: 296e9ab3-8297-806d-b366-f8105adf168d.
Make sure the relevant pages and databases are shared with your integration.
```

**La base de données Notion n'est PAS partagée avec votre intégration !**

## ✅ Solution (5 minutes)

### Étape 1: Ouvrir votre Base de Données Notion

1. Allez dans Notion
2. Ouvrez votre base de données "Contacts Délice Mobile"

### Étape 2: Partager avec l'Intégration

1. Cliquez sur les **3 points** (...) en haut à droite de la page
2. Descendez et cliquez sur **"Connexions"** ou **"Add connections"**
3. Recherchez **"Délice Mobile Contact Form"** (ou le nom de votre intégration)
4. Cliquez dessus pour l'autoriser

### Étape 3: Vérifier

1. Rechargez la page de test: http://localhost:3000/api/test-notion
2. Vous devriez voir: `{"success": true}`

### Étape 4: Tester le Formulaire

1. Allez sur: http://localhost:3000/#contato
2. Remplissez et soumettez le formulaire
3. Vérifiez dans Notion que le contact apparaît

## 🎯 Checklist de Vérification

- [ ] La base de données existe dans Notion
- [ ] L'intégration a été créée sur https://www.notion.so/my-integrations
- [ ] La base de données est **partagée** avec l'intégration ⚠️ **C'est ici que ça bloque !**
- [ ] Le NOTION_API_KEY dans .env.local est correct
- [ ] Le NOTION_DATABASE_ID dans .env.local est correct
- [ ] Le serveur Next.js a été redémarré après modification du .env

## 📸 Captures d'Écran du Processus

### Comment partager la base de données:

1. **Ouvrir la base de données dans Notion**
   ```
   Votre base de données "Contacts Délice Mobile"
   ```

2. **Cliquer sur les 3 points en haut à droite**
   ```
   ⋮ (menu)
   ```

3. **Chercher "Connexions" ou "Add connections"**
   ```
   🔗 Connexions
   ```

4. **Sélectionner votre intégration**
   ```
   [ ] Délice Mobile Contact Form
   ```

5. **Confirmer**
   ```
   ✅ L'intégration a maintenant accès
   ```

## 🔍 Vérification Alternative

Si vous ne trouvez pas l'option "Connexions", essayez:

1. Menu ⋮ → **Share** → **Invite**
2. Recherchez votre intégration dans la liste
3. Donnez l'accès "Can edit"

## 🆘 Si ça ne fonctionne toujours pas

### Vérifier le Database ID

1. Ouvrez la base de données dans le navigateur
2. L'URL doit ressembler à:
   ```
   https://www.notion.so/296e9ab38297806db366f8105adf168d?v=...
   ```
3. Votre Database ID dans .env.local:
   ```
   NOTION_DATABASE_ID=296e9ab38297806db366f8105adf168d
   ```
4. Ils doivent être identiques (avec ou sans tirets)

### Vérifier l'API Key

1. Allez sur https://www.notion.so/my-integrations
2. Cliquez sur votre intégration
3. Copiez à nouveau le "Internal Integration Token"
4. Remplacez dans .env.local:
   ```
   NOTION_API_KEY=ntn_votre_nouveau_token_ici
   ```
5. Redémarrez le serveur: `npm run dev`

## 📞 Support

Si le problème persiste, vérifiez:
- Les logs du terminal où tourne `npm run dev`
- La console du navigateur (F12)
- L'API de test: http://localhost:3000/api/test-notion

## 🎉 Une fois Résolu

Le formulaire fonctionnera automatiquement et chaque soumission créera une nouvelle ligne dans votre base de données Notion !
