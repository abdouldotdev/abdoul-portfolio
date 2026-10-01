# Portfolio Abdoul

Portfolio statique en HTML, CSS et JavaScript, sans installation de dépendances.

## Structure

```text
portfolio/
├── index.html                    # Structure de la page
├── css/
│   ├── styles.css                # Styles partagés et vues App Store
│   ├── home.css                  # Pages et mises en page
│   ├── components.css            # Boutons, cartes, champs, menus, switches
│   ├── liquid-glass.css          # Matériau optique partagé, clair/sombre
│   └── native-ui.css             # Gestes, titres, accessibilité et vrais iPhone
├── data/
│   ├── projects.js               # Fiches projets et listes d’apps
│   ├── profile.js                # Coordonnées, réseaux et motifs de contact
│   └── translations.js           # Contenus français / anglais
├── js/
│   ├── theme.js                  # Thème initial, chargé avant les styles
│   ├── app.js                    # Navigation, contact, langue et défilement
│   ├── components.js             # Composants réutilisables et menus accessibles
│   ├── liquid-glass.js           # Cartes de réfraction et filtres SVG
│   └── native-ui.js              # Transitions, gestes et gestion du focus
└── assets/
    ├── logos/                    # Logos officiels des applications
    ├── images/                   # Photo de profil
    ├── fonts/                    # Police Satoshi
    └── screenshots/faithlock/    # Captures iPhone et iPad
```

## Démarrer

Lancer depuis ce dossier (HTTP est nécessaire au lecteur PDF) :

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Puis ouvrir http://localhost:8000.

## Modifier

- Accueil, présentation et barre d’état : `css/home.css` ; styles partagés : `css/styles.css`.
- Contenu HTML : `index.html`.
- Projets et liste des applications : `projects` et `appbizApps` dans `data/projects.js`. `group` vaut `my` ou `client` ; les chemins de logos sont relatifs à `index.html`.
- Coordonnées et liens sociaux : `profileData` dans `data/profile.js`. Les liens TikTok, Facebook et X vides sont affichés comme indisponibles, sans destination inventée. Renseigner leurs URL HTTPS pour les activer.
- Contact : les motifs et messages de départ sont dans `contactReasons`, dans `data/profile.js`. Email et WhatsApp ouvrent un brouillon, sans envoi automatique. LinkedIn prépare le texte à coller, puis propose d’ouvrir le profil.
- Traductions : `data/translations.js`. Le réglage de langue est mémorisé sur l’appareil. Les noms de marques et les captures originales des apps restent ceux des produits.
- Composants : `UIComponents` dans `js/components.js`. `UIComponents.navigationBar(title, {titleId, backAttribute, large})` génère toutes les barres des pages, avec variante grand titre ou compacte. Modifier une famille dans `css/components.css` change tous ses usages. Les liens « Tout voir » utilisent le composant texte, sans verre.
- Logos : remplacer les fichiers de `assets/logos/`, ou ajouter un fichier et renseigner son chemin dans `appbizApps`.
- Les icônes SVG sont définies dans `iconPaths` dans `js/app.js` et animées dans `css/home.css`. Les animations respectent la préférence de réduction des mouvements.
- Les chemins des images dans le HTML et le JavaScript sont relatifs à `index.html` ; ceux du CSS sont relatifs à `css/styles.css`.

## Resources

`data/resources.js` configure l’API `https://jeli.abdoul.dev/portfolio-resources`, la copie de secours du guide et ses traductions. Le format attendu est `{version: 1, resources: [{id, type, mimeType, title, description, link, cover, pages}]}`. Les liens doivent être HTTPS. Les libellés de l’interface sont bilingues ; les PDF restent dans leur langue d’origine.

`js/resources.js` charge la collection à l’ouverture. Les documents PDF s’ouvrent dans le portfolio, avec défilement continu, texte sélectionnable, zoom et téléchargement visible en permanence. PDF.js 5.4.624 (Apache-2.0, licence dans `assets/vendor/pdfjs/LICENSE`) est chargé uniquement à l’ouverture d’un PDF ; les pages proches du viewport sont rendues séquentiellement. La fermeture libère le document et les URL temporaires.

Le serveur doit autoriser CORS sur l’API et les PDF (`Access-Control-Allow-Origin: *` pour ces fichiers publics). Cette configuration a été vérifiée sur l’endpoint réel. Le lecteur ne dépend pas d’une iframe : `X-Frame-Options: DENY` peut rester en place. Une copie locale du guide permet une lecture de secours si le serveur est indisponible. Servir le portfolio via HTTP(S), pas `file://`.

Vérification : `node tests/resources.cjs`.

## Vérification

```sh
node --check js/app.js
node --check js/components.js
node --check js/liquid-glass.js
node tests/contact.cjs
node tests/native.cjs
node tests/appearance.cjs
node tests/performance.cjs
```

Le contrôle navigateur utilise Playwright et Chrome installés sur la machine. Il vérifie les brouillons sans envoyer de message, les langues, les menus, la recherche, les composants et le défilement à la souris.

## Liquid Glass

La stratégie suit [Liquid Glass in the Browser, kube.io](https://kube.io/blog/liquid-glass-css-svg/) : profil convexe en squircle, réfraction selon Snell, carte de déplacement RG, reflet spéculaire et filtre SVG appliqué à l’arrière-plan. Le pouce du switch utilise le profil « lip ». Les cartes sont adaptées aux dimensions et réutilisées par taille.

La réfraction SVG est activée dans Chromium (dont Arc et Chrome). Safari et Firefox utilisent un repli avec flou, transparence et reflets. Sur iOS, les listes ouvrent le sélecteur système ; sur desktop, elles utilisent un menu en verre navigable au clavier.

## Analytics et session replay

`data/analytics.js` contient la configuration publique du projet PostHog **339255**, US Cloud ; `js/analytics.js` charge le SDK de manière asynchrone et observe les composants partagés. Une panne ou un bloqueur PostHog ne bloque pas le site.

- Navigation : `$pageview` pour chaque page virtuelle, `view_engagement`, `$pageleave`, ouvertures/fermetures des feuilles et recherche.
- Applications : sélection d’un projet, sorties App Store et liens externes, partage, captures, Dynamic Island.
- Contact : canal, motif, validation, champs remplis et longueurs, demande d’ouverture d’un brouillon, étape LinkedIn prête. Ce sont des intentions et étapes de parcours, pas une confirmation de message envoyé.
- Recherche : nombre de caractères, nombre de résultats et sélection d’un résultat ; aucune requête brute.
- Usage : thème, langue, taille du texte, visibilité, carrousels et profondeur de défilement par paliers 25/50/75/100, autocapture masquée, clics répétés/inactifs, heatmaps et Core Web Vitals.
- Qualité : erreurs JavaScript/rejets limités à leur type, fichier, ligne et colonne (dix maximum par chargement), sans texte arbitraire des erreurs ni logs console.

Le replay est activé côté SDK avec masquage des champs et exclusion des zones de texte du contact. Aucune description de projet, message, saisie de recherche, corps/entête réseau ou contenu du presse-papiers n’est envoyé. Les URL de télémétrie perdent leurs paramètres et fragments. Do Not Track et Global Privacy Control désactivent le chargement.

Les pages `file:`, localhost, `.local`, `.test` et les navigateurs automatisés sont exclus par défaut. Pour une vérification intentionnelle, ajouter `?analytics=debug` ; les événements portent alors `environment=debug` et doivent être exclus des tableaux de production. Le test `node tests/analytics.cjs` remplace le SDK par un faux : aucune télémétrie n’est envoyée.

**Configuration serveur à vérifier :** activer « Record user sessions » dans [les paramètres replay du projet](https://us.posthog.com/project/339255/settings#replay). Le projet, la région et le jeton ont été confirmés dans l’onglet PostHog existant d’Arc. Le connecteur renvoie 404 pour ce projet et le navigateur était utilisé par son propriétaire : le réglage replay serveur n’a donc pas été vérifié ou modifié. Le jeton fourni autorise l’ingestion, pas l’administration. Les bloqueurs, limites du forfait et règles serveur peuvent empêcher certains enregistrements.

Références : [configuration du SDK](https://posthog.com/docs/libraries/js/config), [session replay](https://posthog.com/docs/libraries/js/usage#session-replay).

## Interactions iOS

`js/native-ui.js` partage les transitions d’ouverture/retour, le retour depuis le bord gauche et la fermeture des panneaux par leur poignée (distance et vitesse). Les carrousels gardent le défilement tactile natif et ajoutent une inertie à la souris. Les titres se réduisent avec le défilement.

Les réglages proposent trois tailles de texte mémorisées. Les panneaux gèrent le focus clavier et les mouvements/contrastes suivent les préférences système. La page Apps présente deux sections simultanées, Mes apps et Apps clients, avec leurs carrousels indépendants. Sur un vrai iPhone, les barres système simulées sont masquées et les zones sûres ainsi que le clavier sont pris en compte via `visualViewport`.

`tests/native.cjs` vérifie les gestes, le titre, le focus, la taille du texte, la réduction des mouvements et un clavier simulé en émulation iPhone sous Chrome. Une validation sur Safari/iPhone physique reste nécessaire pour les comportements propres à WebKit.

## Repères iOS

Les titres de section Accueil/Apps partagent le même style (20 px, semibold). La barre commune utilise un grand titre 34 px/bold, un titre compact 17 px/semibold, une commande retour de 44 × 44 px et un chevron centré de 22 px. Les cartes Apps/Recherche utilisent un matériau standard sans ombre externe ; les commandes conservent le Liquid Glass. Les carrousels fonctionnent par glissement tactile, souris, trackpad ou clavier, sans boutons latéraux.

Références Apple : [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars), [Typography](https://developer.apple.com/design/human-interface-guidelines/typography), [Materials](https://developer.apple.com/design/human-interface-guidelines/materials), [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons). Les valeurs CSS reproduisent les proportions à l’échelle 1 ; une page web n’utilise pas les composants UIKit natifs.

## Performance et contrôles

Les montages de composants sont idempotents. La traduction observe uniquement les sous-arbres modifiés de l’écran, sans réobserver ses propres écritures. Le verre sépare lectures de dimensions et écritures, réutilise ses filtres, échantillonne les cartes optiques sur 256 px maximum et construit au plus un nouveau filtre par frame. Le flou CSS reste visible pendant cette préparation. Les éléments retirés sont désinscrits du ResizeObserver.

Les barres musicales utilisent `transform` au lieu de changer leur hauteur ; les animations décoratives sont suspendues hors écran et dans un onglet masqué. L’ombre du téléphone est une box-shadow, sans filtre portant sur tout son contenu. La police Satoshi est hébergée avec le site ; les grandes captures utilisent le chargement différé.

Mesure locale Chrome, parcours identique (accueil, Apps, recherche, contact, réglages), avant/après correction : temps JavaScript **3,63 s → 0,39 s**, recalculs de style **180 → 41**, layouts **94 → 26**. Ce sont des mesures de ce parcours sur cette machine, pas une garantie de fréquence d’images sur tous les appareils.

`tests/performance.cjs` empêche le retour de la boucle au repos et vérifie le montage sans mutations répétées, la libération des observations, la police système et les contrôles. Le switch utilise une piste 51 × 31 px avec une cible de 44 px de haut. Les sélecteurs des réglages gardent 12 px d’espace vertical ; la barre du bas utilise des symboles sur une seule surface de verre.

## Vérification adaptative iPhone

`node tests/iphone-adaptive.cjs` parcourt 12 formats : SE 320 px, SE 3, 13 mini, 13, 15 Pro, 16 Pro, 15 Pro Max, 17 Pro Max, Air, puis trois formats paysage. Les dimensions sont celles du viewport navigateur, pas de la dalle complète. Le contrôle couvre accueil, réglages, langue, texte à 130 %, carrousels, présentation, recherche, contact, empreinte de clavier simulée, ressources et PDF. Il vérifie les débordements, les erreurs JS, le zoom natif préservé et le téléchargement PDF sur les formats extrêmes.

Les captures et rapports JSON sont écrits dans `/tmp/portfolio-iphone-audit`. On peut cibler une reprise avec `MODELS='iPhone SE|iPhone 13 landscape' node tests/iphone-adaptive.cjs`. `ENGINE=webkit` sélectionne WebKit quand sa version installée fonctionne sur le système hôte. L’émulation ne remplace pas une validation sur un iPhone physique.

Corrections issues du contrôle : suppression des anciennes marges réservées à la barre système simulée sur les vrais iPhone, suppression du cadre de 2 px, conservation du zoom au pincement sans rétrécir la mise en page, champ de recherche à 16 px pour éviter le zoom automatique Safari.

Résultat du 30 septembre 2026 : 12 formats parcourus sous Chrome en émulation iPhone, aucun débordement ni erreur JS dans le parcours final. Les reprises SE/SE 3/Pro Max/paysage valident les corrections, notamment les marges asymétriques de sécurité (59 px en haut, 34 px en bas). Le wrapper iPhone est désormais positionné dans la zone utile réelle, au lieu de rester centré sur l’écran entier.

Limite de validation : WebKit 26.6 de Playwright plante à la création d’une page sur ce Mac. Un simulateur SE 3 isolé sous iOS 26.2 a été créé, mais Safari n’a pas démarré (deux expirations de `simctl openurl`, lancement bloqué). Safari, le clavier iOS réel et les appareils physiques ne sont donc pas déclarés validés. Les captures/rapports Chrome sont disponibles dans `/tmp/portfolio-iphone-audit/chromium-final-report.json`.
