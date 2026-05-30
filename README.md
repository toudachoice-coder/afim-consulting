# AFIM Consulting — Site Web Officiel

Site web statique **premium**, **professionnel** et **100% responsive** pour **AFIM Consulting**, cabinet de conseil et d'accompagnement en import/export, formalités administratives, commerce international et transport de marchandises, basé à Bouskoura, Maroc.

> ✅ **Prêt à déployer directement sur Netlify** — HTML, CSS, JavaScript pur, aucun backend, aucune dépendance build.

---

## 🚀 Déploiement Netlify (1 minute)

### Option A — Drag & Drop
1. Aller sur [app.netlify.com/drop](https://app.netlify.com/drop).
2. Déposer **tout le dossier** du projet.
3. C'est en ligne ✅.

### Option B — Git (recommandé)
1. Pousser le projet sur GitHub / GitLab / Bitbucket.
2. Sur Netlify : **Add new site → Import an existing project**.
3. Configuration :
   - Build command : *(vide)*
   - Publish directory : `.`
4. Déployer.

### Activer les notifications de formulaire
Netlify détecte automatiquement le formulaire (`data-netlify="true"`).
Dans **Forms → Settings → Form notifications**, ajouter votre email pour recevoir chaque demande.

---

## 🆕 Améliorations apportées (version révisée)

### ✅ Compatibilité Netlify Forms — renforcée
- **Formulaire HTML statique caché** ajouté en haut du `<body>` pour garantir la détection au build par Netlify (même si le formulaire visible utilise JS).
- Attribut `data-netlify-honeypot="bot-field"` (syntaxe officielle Netlify).
- **Action `/merci.html`** : redirection automatique vers une page de remerciement dédiée si JS est désactivé.
- **Soumission AJAX** via `fetch()` avec encoding `application/x-www-form-urlencoded` (format attendu par Netlify Forms).
- Page de succès `merci.html` complète et responsive (titre, icône check animée, boutons d'appel et WhatsApp).
- `noindex` sur la page de remerciement (SEO).
- Champ honeypot **complètement masqué** (off-screen + `tabindex="-1"`).
- **Validation en temps réel** sur blur/input (classe `.invalid` rouge).

### ✅ Mobile responsive — entièrement repensé
- **Hauteur header mobile réduite** (68px au lieu de 78px) → plus d'espace.
- **`scroll-padding-top`** géré dynamiquement par breakpoint (corrige les ancres).
- **Hero adapté mobile** : boutons en pleine largeur, trust badges en colonne.
- **`min-height: 100svh`** (small viewport units) pour iOS — corrige le bug de barre d'adresse Safari.
- **Verrouillage du body** quand le menu mobile est ouvert (`overflow: hidden`).
- **Backdrop sombre** + fermeture au clic en dehors + touche Échap.
- **Fermeture automatique** du menu après clic sur un lien.
- **Tailles tactiles minimales** : tous les boutons ≥ 48px (WCAG / Apple HIG).
- **Font-size 16px sur inputs** : empêche le zoom iOS au focus.
- **Select stylisé** avec flèche SVG personnalisée.
- **3 breakpoints supplémentaires** : 1100px, 900px, 720px, 420px, 360px.
- **Aucun débordement horizontal** garanti (`overflow-x: hidden` + `word-break`).
- **WhatsApp flottant** : taille adaptée, tooltip caché sur mobile.

### ✅ WhatsApp button — amélioré
- Liens unifiés sur **toutes les occurrences** (header mobile, hero, CTA, contact, footer, floating).
- **Message pré-rempli encodé correctement** (URL-encoded apostrophe `%E2%80%99`).
- Ajout d'un lien WhatsApp dans le **footer** et dans le **menu mobile**.
- **Tooltip "Chat WhatsApp"** au survol du bouton flottant (desktop).
- Tous les liens externes : `target="_blank"` + `rel="noopener noreferrer"` (sécurité).
- Bouton **WhatsApp dans le menu mobile** sous le CTA principal.
- Animation `pulseWhatsapp` subtile pour attirer l'attention.

### ✅ Google Maps button — amélioré
- **Deux boutons** désormais :
  - 🚗 **Ouvrir l'itinéraire** (URL `/dir/?api=1&destination=...`)
  - 📍 **Voir sur Google Maps** (URL `/maps?q=...`)
- **Carte iframe** plus performante : `https://maps.google.com/maps?q=...` (pas besoin d'API key).
- **Lazy load** explicite via IntersectionObserver.
- **Cartographie cliquable depuis la section contact** (coordonnées GPS = lien direct).
- Lien **Maps dans le footer** également.

### ✅ SEO — optimisé en profondeur
- **JSON-LD `ProfessionalService`** : nom, téléphone, adresse, géolocalisation, horaires, services.
- **JSON-LD `FAQPage`** : les 5 FAQs sont indexables comme rich snippets Google.
- **Meta géo** : `geo.region`, `geo.position`, `geo.placename`, `ICBM`.
- **Open Graph complet** : title, description, image, type, locale, site_name, url.
- **Twitter Card** : `summary_large_image`.
- **Canonical URL** ajouté.
- **`theme-color`** pour la barre de navigateur mobile (#0B1F3A).
- **`apple-touch-icon`** pour iOS.
- **`preload` sur l'image hero** (LCP optimisé).
- **`preconnect`** vers Google Fonts, Font Awesome CDN.
- **`dns-prefetch`** vers Google Maps.
- **`script defer`** pour ne pas bloquer le rendu.
- **Skip-link d'accessibilité** : "Aller au contenu principal".
- **Tous les `<section>`** ont `aria-labelledby` pointant vers leur titre.
- **Tous les `<i>` icônes** ont `aria-hidden="true"`.
- **Sitemap XML enrichi** avec ancres principales et priorités.
- **robots.txt** mis à jour : `noindex` sur `/merci.html`.
- **404.html dédié** : page d'erreur premium avec retour à l'accueil.
- **manifest.webmanifest** : PWA-ready (icônes SVG inline).

### ✅ Layout desktop — peaufiné
- **Grille contact** rééquilibrée : 1fr / 1.3fr (avant 1fr / 1.3fr déjà OK, mais ajout du gap).
- **Boutons rapides** dans le contact info : tailles réduites pour éviter l'overflow.
- **Coordonnées GPS** désormais cliquables → ouvre Google Maps directement.
- **Map action** en flexbox : 2 boutons côte à côte sur desktop, empilés sur mobile.
- **Footer contact** : tous les éléments sont des liens (téléphones, WhatsApp, Maps).
- **Outline focus** doré visible (`:focus-visible`) sur tous les éléments interactifs.
- **Print stylesheet** : version imprimable propre.

---

## ✅ Fonctionnalités complètes

### 🎨 Design & UX
- Design corporate premium (palette navy, deep blue, or, blanc).
- Typographies élégantes **Montserrat** + **Inter**.
- Animations subtiles au scroll (IntersectionObserver).
- Header sticky avec effet au scroll.
- Hero plein écran avec visuel international.
- Cartes modernes avec effets de survol premium.
- Support `prefers-reduced-motion` pour utilisateurs sensibles.

### 📱 Responsive (Desktop / Tablet / Mobile)
- 5 breakpoints : 1100px / 900px / 720px / 420px / 360px.
- Hamburger menu avec backdrop, slide-down, body-lock et fermeture Échap.
- Aucun scroll horizontal (garanti).
- WhatsApp flottant sticky avec animation pulse.
- Bouton « back to top » apparaissant après 400px scroll.
- Liens click-to-call (`tel:`) sur tous les numéros.
- Tous boutons / liens ≥ 48px (touch-friendly).

### 📋 Sections (16)
1. Header + hamburger mobile + WhatsApp rapide.
2. Hero plein écran avec 2 CTA et 3 trust indicators.
3. Trust Badges (5 badges premium).
4. À propos + 3 valeurs + image consultant.
5. Services (8 cartes premium).
6. Export USA / Canada + 2 marchés + 7 points clés.
7. Formalités (6 cartes) + note professionnelle.
8. Secteurs accompagnés (10 secteurs).
9. Transport & Négoce + image port.
10. Méthode (4 étapes numérotées).
11. Pourquoi nous choisir (10 atouts).
12. CTA tripartite (Appel, WhatsApp, Consultation).
13. FAQ accordéon (5 questions).
14. Contact (coordonnées + formulaire Netlify).
15. Map Google + 2 boutons (itinéraire, voir).
16. Footer 4 colonnes + bottom copyright.

### 📨 Formulaire Netlify
- Champs : Nom, Téléphone, Email, Service souhaité, Message.
- 8 options dans le dropdown service.
- Validation client + serveur (Netlify).
- Honeypot anti-spam (`bot-field`).
- Soumission AJAX avec feedback inline français.
- Redirection vers `/merci.html` si JS désactivé.

### 🔍 SEO
- Meta title et description optimisés (français).
- Open Graph + Twitter Card.
- JSON-LD : ProfessionalService + FAQPage.
- HTML5 sémantique complet.
- H1 → H2 → H3 hiérarchie propre.
- `alt` text sur toutes les images.
- `loading="lazy"` sur les images non-critiques.
- `fetchpriority="high"` sur l'image hero (LCP).
- `width` + `height` sur les images (CLS).
- Sitemap.xml et robots.txt.

### ⚡ Performances
- Fonts préchargées (`preconnect`).
- Image hero préchargée.
- Script JS avec `defer`.
- Aucun framework (vanilla JS).
- Cache headers configurés via `netlify.toml`.
- Tous les CSS et JS minifiables.

---

## 📍 URIs et points d'entrée

| URI | Description |
|---|---|
| `/` | Page d'accueil (single-page) |
| `/merci.html` | Page de remerciement après envoi formulaire |
| `/404.html` | Page d'erreur 404 |
| `/sitemap.xml` | Sitemap XML |
| `/robots.txt` | Directives crawlers |
| `/manifest.webmanifest` | Manifeste PWA |
| `/netlify.toml` | Configuration Netlify |

### Ancres du single-page
`#hero-section`, `#about-section`, `#services-section`, `#export-section`, `#formalites-section`, `#secteurs-section`, `#faq-section`, `#contact-section`, `#map-section`

### Liens d'action
| Action | URI |
|---|---|
| Appel principal | `tel:+212666038036` |
| Appel secondaire | `tel:+212520237817` |
| WhatsApp | `https://wa.me/212666038036?text=...` |
| Itinéraire Maps | `https://www.google.com/maps/dir/?api=1&destination=33.44978493111717,-7.652362301424107` |
| Voir sur Maps | `https://www.google.com/maps?q=33.44978493111717,-7.652362301424107` |
| Soumission formulaire | `POST /` (Netlify Forms) → redirection `/merci.html` |

---

## 📦 Structure des fichiers

```
/
├── index.html              Page principale single-page
├── merci.html              Page de remerciement après formulaire
├── 404.html                Page d'erreur 404
├── style.css               Styles complets (43 Ko)
├── script.js               JavaScript vanilla (12 Ko)
├── netlify.toml            Config Netlify (cache, headers, sécurité)
├── _redirects              Redirections Netlify
├── robots.txt              SEO crawlers
├── sitemap.xml             Sitemap XML
├── manifest.webmanifest    Manifeste PWA
├── README.md               Documentation projet
└── assets/
    └── images/
        ├── hero.jpg        Conteneurs port (hero, ~671 Ko)
        ├── about.jpg       Consultant business (~311 Ko)
        ├── logistics.jpg   Port logistique (~574 Ko)
        └── cta.jpg         Background CTA (~144 Ko)
```

---

## 🎨 Palette & typographie

| Élément | Valeur |
|---|---|
| Navy primaire | `#0B1F3A` |
| Deep blue | `#12355B` |
| Or accent | `#C9A24D` |
| Or clair | `#d9b86a` |
| Or foncé | `#b08e3d` |
| Blanc | `#FFFFFF` |
| Gris clair | `#F5F7FA` |
| Texte sombre | `#1F2937` |
| WhatsApp | `#25D366` |
| Titres | Montserrat (500–800) |
| Corps | Inter (300–700) |

---

## 📞 Coordonnées intégrées

| Information | Valeur |
|---|---|
| Téléphone / WhatsApp principal | **+212 666 038 036** |
| Téléphone secondaire | **+212 520 237 817** |
| Adresse | Bouskoura, Maroc |
| GPS | 33.44978493111717, -7.652362301424107 |

---

## 🧪 Test rapide en local

Aucun build nécessaire. Servir simplement le dossier :

```bash
# Python 3
python3 -m http.server 8080

# Ou Node.js
npx serve .

# Ou Live Server (VS Code)
```

Puis ouvrir [http://localhost:8080](http://localhost:8080).

> ⚠️ Le formulaire Netlify ne fonctionnera **réellement** qu'après déploiement sur Netlify (en local, la soumission AJAX échouera car aucune URL Netlify n'est disponible).

---

## 🔧 Fonctionnalités non implémentées (par choix de portée)

- ❌ Blog / CMS (site vitrine uniquement).
- ❌ Multilingue (brief : français uniquement).
- ❌ Chatbot ou prise de RDV en ligne.
- ❌ Système d'authentification.

---

## 📝 Évolutions futures recommandées

1. **Blog SEO** (FOODEX, PortNet, marchés USA/Canada) → trafic organique.
2. **Témoignages clients** + études de cas.
3. **Multilingue** (anglais, arabe) → marchés internationaux.
4. **Google Analytics 4** ou **Plausible** (privacy-friendly).
5. **Images en WebP** + AVIF avec fallback (gain de poids).
6. **Open Graph image personnalisée** (1200×630).
7. **Page mentions légales / RGPD** (obligation légale).
8. **Calendly intégré** pour prise de RDV.
9. **Lazy-load aussi pour les sections** (perf++).
10. **Service Worker** pour offline (PWA complète).

---

## ⚖️ Wording légal — préservé

Le site utilise systématiquement un vocabulaire prudent :
✅ « accompagnement », « assistance », « orientation », « organisation du dossier », « suivi des démarches ».
❌ Aucune promesse d'approbation garantie.
❌ Aucune affiliation officielle revendiquée envers FOODEX, PortNet, Douane, RNA ou Artisanat.

---

## 📄 Licence

© 2026 AFIM Consulting. Tous droits réservés.
