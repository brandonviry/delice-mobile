# Design System - Délice Mobile

## 🎨 Palette de Couleurs

### Couleurs Principales

| Nom | Hex | RGB | Utilisation | Classe Tailwind |
|-----|-----|-----|-------------|-----------------|
| **Vert Olive** | `#a9bf04` | rgb(169,191,4) | Badge "Depuis 1998", scrollbar, accents | `bg-brand-olive` `text-brand-olive` |
| **Jaune Or** | `#f2c12e` | rgb(242,193,46) | Backgrounds légers, dégradés | `bg-brand-gold` `text-brand-gold` |
| **Orange** | `#f29727` | rgb(242,151,39) | Hover states, liens | `bg-brand-orange` `text-brand-orange` |
| **Rouille** | `#bf4904` | rgb(191,73,4) | Footer, titres principaux | `bg-brand-rust` `text-brand-rust` |
| **Rouge** | `#bf1304` | rgb(191,19,4) | CTA, highlights, numéros importants | `bg-brand-red` `text-brand-red` |

### Utilisation Recommandée

```tsx
// Titres principaux
<h1 className="text-brand-rust">Titre</h1>

// Boutons CTA
<button className="bg-brand-red hover:bg-brand-rust">Action</button>

// Liens hover
<a className="hover:text-brand-orange">Lien</a>

// Badges
<span className="bg-brand-olive text-white">Badge</span>

// Backgrounds légers
<section className="bg-gradient-to-br from-brand-gold/10 to-brand-orange/10">
```

## 🔤 Typographie

### Polices Google Fonts

#### Farro (Headings)
- **Famille** : `Farro`
- **Poids** : 300, 400, 500, 700
- **Usage** : Titres, navigation, boutons, labels
- **Classe** : `font-heading`

```tsx
<h1 className="font-heading font-bold">Titre Principal</h1>
<nav className="font-heading font-medium">Navigation</nav>
```

#### Raleway (Body)
- **Famille** : `Raleway`
- **Poids** : 300, 400, 500, 700
- **Usage** : Texte courant, paragraphes, descriptions
- **Classe** : `font-body`

```tsx
<p className="font-body">Texte de paragraphe...</p>
<div className="font-body text-sm">Petit texte</div>
```

### Hiérarchie Typographique

| Élément | Classe | Taille |
|---------|--------|--------|
| H1 - Titre principal | `font-heading text-4xl md:text-5xl font-bold` | 36-48px |
| H2 - Section | `font-heading text-2xl md:text-3xl font-bold` | 24-30px |
| H3 - Sous-section | `font-heading text-xl font-bold` | 20px |
| H4 - Label | `font-heading text-lg font-semibold` | 18px |
| Body - Normal | `font-body text-base` | 16px |
| Body - Small | `font-body text-sm` | 14px |
| Body - XSmall | `font-body text-xs` | 12px |

## 🎯 Composants

### Header

```tsx
<header className="fixed top-0 bg-white/95 backdrop-blur shadow-sm">
  <span className="bg-brand-olive text-white font-heading">Badge</span>
  <span className="font-heading text-brand-rust">Logo</span>
  <nav className="font-heading hover:text-brand-orange">Liens</nav>
</header>
```

### Footer

```tsx
<footer className="bg-brand-rust text-white">
  <h3 className="font-heading">Titre</h3>
  <p className="font-body">Contenu</p>
</footer>
```

### Boutons

```tsx
// Primaire
<button className="bg-brand-red hover:bg-brand-rust text-white font-heading font-semibold">
  Action
</button>

// Secondaire
<button className="bg-brand-olive hover:bg-brand-orange text-white font-heading">
  Action
</button>

// Outline
<button className="border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white">
  Action
</button>
```

### Inputs

```tsx
<input
  type="text"
  className="border-stone-300 focus:border-brand-orange focus:ring-brand-orange font-body"
/>
```

### Cards

```tsx
<div className="bg-white rounded shadow-soft p-6">
  <h3 className="font-heading text-brand-rust">Titre</h3>
  <p className="font-body text-stone-700">Description</p>
</div>
```

## 🌈 Dégradés

### Backgrounds Doux

```tsx
// Or vers Orange
<div className="bg-gradient-to-br from-brand-gold/10 to-brand-orange/10">

// Vert vers Jaune
<div className="bg-gradient-to-r from-brand-olive/20 to-brand-gold/20">
```

## 📏 Espacements

Utiliser l'échelle Tailwind standard :
- `gap-2` (8px) - Entre éléments très proches
- `gap-4` (16px) - Entre éléments proches
- `gap-6` (24px) - Entre sections mineures
- `gap-8` (32px) - Entre sections
- `gap-10` (40px) - Entre grandes sections
- `py-12` (48px) - Padding vertical sections
- `py-16` (64px) - Padding vertical grandes sections

## 🎭 États Interactifs

### Hover

```tsx
// Liens
<a className="hover:text-brand-orange transition-colors">

// Boutons
<button className="hover:bg-brand-rust transition">

// Images
<img className="hover:scale-105 transition-transform">
```

### Focus

```tsx
// Inputs
<input className="focus:border-brand-orange focus:ring-brand-orange">

// Boutons
<button className="focus:ring-2 focus:ring-brand-red focus:ring-offset-2">
```

## 📱 Responsive

### Breakpoints Tailwind

- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px
- `2xl:` - 1536px

### Mobile First

```tsx
// Taille mobile par défaut, puis desktop
<h1 className="text-2xl md:text-4xl">
<div className="grid md:grid-cols-2 lg:grid-cols-3">
```

## 🎨 Exemples de Sections

### Section Hero

```tsx
<section className="relative pt-16">
  <Image /> {/* Images principales */}
  <div className="absolute bg-gradient-to-b from-black/20 to-black/10" />
</section>
```

### Section Contenu

```tsx
<section className="bg-gradient-to-br from-brand-gold/10 to-brand-orange/10 py-12 lg:py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="font-heading text-brand-rust">...</h2>
    <p className="font-body text-stone-700">...</p>
  </div>
</section>
```

## ✨ Animations

```tsx
// Smooth scroll
<html className="scroll-smooth">

// Transitions
<button className="transition-colors duration-200">
<div className="transition-transform hover:scale-105">
```

## 🎯 Accessibilité

- ✅ Contraste minimum 4.5:1 pour le texte
- ✅ Focus visible sur tous les éléments interactifs
- ✅ Texte alternatif sur toutes les images
- ✅ Labels sur tous les inputs
- ✅ Navigation au clavier possible

## 📦 Variables CSS

```css
:root {
  --vert-olive: #a9bf04;
  --jaune-or: #f2c12e;
  --orange: #f29727;
  --rouille: #bf4904;
  --rouge: #bf1304;
}
```

---

**Version** : 1.0.0
**Dernière mise à jour** : 24 octobre 2025
