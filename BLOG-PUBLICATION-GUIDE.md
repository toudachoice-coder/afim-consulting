# Guide de publication — Blog AFIM Consulting

Ce guide explique comment publier une nouvelle actualité ou une nouvelle norme (ou tout autre
article) sur le blog du site, sans base de données ni interface d'administration : le blog est du
HTML statique. Publier un article revient à créer un fichier, puis à mettre à jour une poignée de
fichiers existants.

Il s'adresse à toute personne qui met à jour le site, y compris sans expérience technique poussée.

---

## 1. Checklist des fichiers à mettre à jour

Un article qui manque une seule de ces étapes reste invisible ou casse une partie du site. Cochez
chaque ligne avant de considérer la publication terminée.

- [ ] **Nouvelle page article** créée à partir du gabarit : `/blog/<slug>/index.html`
- [ ] **`blog/index.html`** : nouvelle carte ajoutée dans la grille `#blog-articles`, compteur
      `#blog-status` mis à jour (« *N* articles publiés. »)
- [ ] **Page de catégorie** correspondante (`/blog/<categorie>/index.html`) : nouvelle carte ajoutée
      dans sa grille, compteur du titre de section mis à jour (« *N* article(s) dans cette
      rubrique »), et JSON-LD `CollectionPage` → `mainEntity.itemListElement` mis à jour
- [ ] **`sitemap.xml`** : une entrée `<url>` ajoutée pour le nouvel article, avec `lastmod` réel.
      Mettre aussi à jour le `lastmod` de `/blog/` et de la page de catégorie
- [ ] **`blog/feed.xml`** : un `<item>` ajouté en haut de la liste, URL absolue, `pubDate` au format
      RFC 822. Conserver au maximum les 15 articles les plus récents, aucun brouillon
- [ ] **JSON-LD `Blog`** dans le `<head>` de `blog/index.html` : un objet `BlogPosting` ajouté au
      tableau `blogPost`
- [ ] **Liens internes** : au moins deux liens entrants pertinents vers le nouvel article, depuis
      des pages `/services/`, `/secteurs/` ou d'autres articles du blog (voir section 4)
- [ ] **Page d'accueil** (`index.html`, section « Nos derniers articles ») : mise à jour uniquement
      si le nouvel article fait partie des contenus les plus récents. Le bloc reste à 3 cartes ;
      remplacez la carte la moins prioritaire
- [ ] **`datePublished`** et **`dateModified`** cohérents entre le JSON-LD `BlogPosting`, la balise
      `<time>` visible et les métadonnées `article:published_time` / `article:modified_time`
- [ ] **Sources officielles vérifiées** : chaque affirmation réglementaire s'appuie sur une source
      officielle identifiée, datée, et vérifiée le jour de la publication (voir section 3)

---

## 2. Publier un article, étape par étape

### Étape 1 — Choisir le slug

- minuscules uniquement, mots séparés par des tirets, aucun accent ni apostrophe
- court et descriptif (3 à 6 mots), si possible proche de la requête principale visée
- définitif : une fois publié, il ne change plus (le modifier casse les liens et le référencement)

Exemple : `cbam-exportateurs-marocains-europe`, pas `CBAM-2026-tout-ce-qu-il-faut-savoir!`.

### Étape 2 — Créer le fichier

Copier `/blog/_templates/article.html` vers `/blog/<slug>/index.html`, puis remplacer chaque jeton
`{{ENTRE_DOUBLES_ACCOLADES}}` par le contenu réel. Le gabarit porte une balise
`<meta name="robots" content="noindex, nofollow">` : **remplacez-la** par
`<meta name="robots" content="index, follow, max-image-preview:large">` avant publication, sinon
l'article ne sera jamais indexé.

Le dossier `/blog/_templates/` n'est jamais publié tel quel : il ne figure ni dans le sitemap ni
dans le flux RSS, et ne doit jamais être copié dans `/blog/` sans être entièrement rempli.

### Étape 3 — Renseigner le `<head>`

- **`<title>`** : 50 à 60 caractères, avec la requête principale que les gens tapent réellement
- **`<meta name="description">`** : 140 à 160 caractères, une ou deux phrases concrètes — pas de
  liste de mots-clés, et **jamais de balise `meta keywords`**
- **`<link rel="canonical">`** : URL absolue, avec le slash final
- **Open Graph et Twitter** : reprendre le titre et la description, même URL canonique dans `og:url`
- Vérifier qu'aucun autre article n'a le même `title` ni la même `description`

### Étape 4 — Écrire le contenu

Un seul sujet, une seule requête principale par article. Structure attendue :

| Élément | Règle |
| --- | --- |
| `<h1>` | Un seul par page, identique au `headline` du JSON-LD |
| Introduction | Répond à la question principale dès les premières lignes |
| Sommaire | Liens d'ancre vers chaque `<h2>` |
| `<h2>` / `<h3>` | Hiérarchie logique, pas de saut de niveau |
| Ce qui change | Une explication claire de la nouveauté |
| Qui est concerné | Personnes, entreprises ou produits concernés, explicitement |
| Démarches | Ce que le lecteur doit faire, dans l'ordre |
| Dates clés | Un tableau ou une liste des dates importantes |
| Risques | Erreurs fréquentes à éviter |
| Checklist | Si elle apporte une vraie valeur pratique |
| FAQ | Questions réellement posées, réponses visibles à l'écran |
| Sources officielles | Voir section 3 |
| CTA | Discret en milieu d'article, plus complet en fin d'article |
| « À lire aussi » | 2 à 3 articles liés, dans la colonne latérale |

Ton : français naturel, phrases courtes, vocabulaire technique expliqué. Pas de formule d'ambiance
(« dans un monde en constante évolution »), pas de promesse commerciale (« nous garantissons »,
« en 24 h »), pas d'affirmation juridique sans source. AFIM Consulting est un cabinet de conseil et
d'accompagnement, pas une administration ni un cabinet juridique : le dire clairement chaque fois
que c'est pertinent.

**SEO sans keyword stuffing** : la requête principale doit apparaître naturellement dans le title,
le H1, l'introduction, au moins un H2, le slug (si lisible), la meta description et certains liens
internes — jamais de façon mécanique ou répétée. Aucune liste de mots-clés visible sur la page.

### Étape 5 — Dates

Deux dates, au format `AAAA-MM-JJ` :

```html
<time datetime="2026-09-15">15 septembre 2026</time>
```

- **Date de publication** : la date réelle de mise en ligne, elle ne change jamais ensuite
- **Date de mise à jour** (« Dernière mise à jour ») : à ajouter uniquement lors d'une modification
  de fond (procédure changée, source actualisée, section ajoutée). Une faute d'orthographe corrigée
  ne justifie pas de changer cette date

Ne jamais antidater ni postdater un article.

### Étape 6 — Sources officielles (obligatoire dès qu'une réglementation est mentionnée)

Avant d'écrire, vérifiez systématiquement :

1. **la source officielle** exacte (organisme, page ou document précis — jamais la seule page
   d'accueil) ;
2. **la date de publication** du texte ;
3. **la date d'entrée en vigueur**, si elle diffère de la date de publication ;
4. **les entreprises, produits ou pays concernés**, précisément ;
5. **la différence entre une obligation légale, une recommandation et une simple annonce**.

Un article de presse peut servir à repérer un sujet, jamais à prouver seul une obligation légale :
remontez toujours jusqu'au texte ou à la page officielle de l'organisme compétent.

En bas d'article :

```html
<section class="blog-sources" aria-labelledby="sources-titre">
  <h2 id="sources-titre">Sources officielles</h2>
  <ul>
    <li><a href="[URL de la page ou du document précis]" target="_blank" rel="noopener noreferrer">Nom de l'organisme — intitulé de la page</a></li>
  </ul>
  <p class="blog-sources__checked">Informations vérifiées le&nbsp;: <time datetime="2026-09-15">15 septembre 2026</time>. …</p>
</section>
```

Ne jamais ajouter `rel="nofollow"` sur un lien vers une source officielle. Conserver
`rel="noopener noreferrer"` sur tout lien externe ouvert en nouvel onglet (avec `target="_blank"`).

Sources marocaines à privilégier : Administration des Douanes et Impôts Indirects, PortNet, ONSSA,
Morocco Foodex, IMANOR, Ministère de l'Industrie et du Commerce, Ministère de l'Économie et des
Finances, Office des Changes, AMDIE, Bank Al-Maghrib, Bulletin officiel. Sources internationales :
Commission européenne, EUR-Lex, Access2Markets, autorités douanières et sanitaires du pays de
destination, organismes internationaux reconnus.

### Étape 7 — Données structurées (JSON-LD)

- **`BlogPosting`** : `headline` doit correspondre exactement au `<h1>` réel. Ne jamais inventer de
  nom d'auteur — `AFIM Consulting` sert d'auteur et d'éditeur
- **`BreadcrumbList`** : Accueil → Blog → Catégorie → Article
- **`FAQPage`** : uniquement si les questions et réponses sont réellement visibles sur la page. Ne
  jamais masquer une FAQ pour obtenir le balisage, et ne jamais laisser un `FAQPage` dont le
  contenu ne correspond plus à la FAQ visible
- Ajouter `image` uniquement si une image réelle et pertinente existe sur le site
- Vérifier la validité du JSON (pas de virgule en trop, guillemets droits `"`, pas d'apostrophe non
  échappée) avant de publier

### Étape 8 — Ajouter l'article aux listes (voir aussi la checklist en section 1)

**a. `/blog/index.html`** — copier une carte existante dans `#blog-articles` et adapter les cinq
champs (catégorie, titre/lien, résumé, date/temps de lecture, lien « Lire l'article »). Mettre à
jour le compteur `#blog-status`.

**b. Page de catégorie** — ajouter la même carte dans `/blog/<categorie>/index.html`, mettre à jour
le compteur du titre de section et le JSON-LD `CollectionPage`. **Si la catégorie n'a pas encore de
page**, ne pas en créer une pour un seul article : attendre d'en avoir au moins deux, et laisser la
catégorie en simple filtre désactivé (`disabled`) sur la page principale. N'activez un filtre
(`data-blog-filter`) qu'une fois sa page de catégorie publiée avec du contenu réel.

**c. `sitemap.xml`** — ajouter l'URL de l'article, mettre à jour le `lastmod` de `/blog/` et de la
page de catégorie concernée. Ne jamais modifier les URL ou priorités des autres pages du site.

**d. `blog/feed.xml`** — ajouter un `<item>` en haut de la liste.

### Temps de lecture

À estimer honnêtement, environ 200 mots par minute, arrondi. Ne pas gonfler ce chiffre.

---

## 3. Ce qu'il ne faut jamais faire

- inventer une norme, une loi, une date, une procédure ou une autorité
- présenter une information ancienne comme une actualité
- publier une réglementation sans avoir vérifié sa date d'entrée en vigueur
- confondre une obligation légale avec une recommandation ou une simple annonce de presse
- publier une page de catégorie indexable sans au moins un article réel dedans
- activer un filtre de catégorie (`data-blog-filter`, sans `disabled`) avant que sa page existe
- afficher un nombre de vues, de commentaires ou un classement « populaire » fabriqué
- inventer un témoignage client, une étude de cas, un partenaire ou un logo institutionnel
- créer un numéro de téléphone ou une adresse e-mail différents de ceux d'AFIM Consulting
- mentionner Bouskoura : l'adresse officielle est Quartier Bourgogne, Casablanca, Maroc
- publier deux URL pour le même contenu, ou changer l'URL d'un article existant
- recopier du contenu provenant d'un autre site ou d'un texte réglementaire
- pratiquer le bourrage de mots-clés (répétition artificielle de la requête ciblée)
- ajouter une balise `meta keywords`
- laisser un article accessible uniquement via JavaScript (toutes les cartes et tous les liens
  doivent être présents en dur dans le HTML)

---

## 4. Liens internes : la règle des deux entrées

Chaque nouvel article doit recevoir **au moins deux liens entrants pertinents** depuis des pages
`/services/`, `/secteurs/` ou d'autres articles du blog (les liens depuis `blog/index.html` et la
page de catégorie de l'article ne comptent pas dans ce total : ce sont des liens de listing, pas
des liens éditoriaux).

Pour ajouter un lien depuis une page `/services/` ou `/secteurs/` qui n'a pas encore de bloc
« À lire sur le blog », insérer juste avant la section `<!-- ===== BOTTOM CTA ===== -->` :

```html
<section class="sector-detail-section alt" aria-labelledby="blog-links-title">
    <div class="container">
        <div class="sector-block-head">
            <span class="section-tag">Ressources</span>
            <h2 id="blog-links-title" class="section-title">À lire sur le blog</h2>
            <div class="section-divider"></div>
        </div>
        <ul class="check-list" style="grid-template-columns:1fr;">
            <li><i class="fas fa-arrow-right" aria-hidden="true"></i> <a style="color:var(--accent);font-weight:600;" href="../blog/<slug>/">Titre de l'article</a></li>
        </ul>
    </div>
</section>
```

Si la page a déjà ce bloc, ajouter simplement une nouvelle `<li>` à la liste existante.

---

## 5. Mettre à jour un article existant

1. Modifier le contenu
2. Mettre à jour la date affichée (« Dernière mise à jour ») et `dateModified` dans le JSON-LD
3. Mettre à jour la date de vérification des sources si elles ont été recontrôlées
4. Mettre à jour `lastmod` dans `sitemap.xml`
5. **Ne pas changer l'URL.** Si un changement d'URL est indispensable, mettre en place une
   redirection 301 depuis l'ancienne adresse (via `_redirects` ou `netlify.toml`)

Les articles réglementaires méritent une relecture au moins une fois par an, ou dès qu'un
changement est annoncé par un organisme officiel.

---

## 6. Vérifications techniques avant chaque mise en ligne

| Contrôle | Comment |
| --- | --- |
| Un seul `<h1>` par page | `grep -o "<h1" fichier.html \| wc -l` doit renvoyer 1 |
| Canonical présent | Vérifier `<link rel="canonical">` sur chaque page |
| Liens internes | Parcourir l'article et cliquer chaque lien interne |
| Sitemap valide | Ouvrir `/sitemap.xml` dans un navigateur : aucune erreur d'analyse |
| RSS valide | Validateur de flux du W3C, ou `python3 -c "import xml.dom.minidom as m; m.parse('blog/feed.xml')"` |
| JSON-LD valide | Test des résultats enrichis de Google, ou parser chaque bloc en JSON |
| Rendu mobile | Réduire la fenêtre du navigateur à 320 px, vérifier le menu mobile |
| Sans JavaScript | Désactiver JavaScript et vérifier que l'article reste accessible |
| Filtres et recherche | Vérifier que les nouvelles catégories filtrent correctement les cartes |
| Coordonnées | Téléphone, e-mail et adresse identiques à ceux du reste du site |

Après mise en ligne, soumettre l'URL dans la Google Search Console pour accélérer l'indexation.

---

## 7. Rappel des coordonnées à utiliser

Ces informations sont les seules à réutiliser dans les CTA. Elles ne doivent jamais être modifiées
sans confirmation d'AFIM Consulting.

- Téléphone : `+212 763 738 280` — lien `tel:+212763738280`
- E-mail : `afim.consulting.contact@gmail.com`
- WhatsApp : lien `wa.me/212763738280` avec le message pré-rempli déjà utilisé sur le site
- Adresse : Quartier Bourgogne, Casablanca, Maroc
- Formulaire : section contact de la page d'accueil (`https://afimconsulting.com/#contact-section`)

Bouton principal : « Demander une consultation ». Un CTA principal en fin d'article, éventuellement
un CTA discret au milieu des guides longs. Jamais un CTA après chaque paragraphe.
