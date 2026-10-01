const copyByLanguage = {
 en: {my:'My Apps',client:'Client Apps',apps:'apps',app:'Apps',appSubtitle:'Independent apps, made with care.',seeAll:'See all',made:'My top projects',contact:'Contact',search:'Search',settings:'Settings',resource:'Resources',about:'About',open:'Open',get:'Get',visit:'Visit',development:'In development',now:'AI video editor',lab:'The workbench.',labDescription:'A space for ideas taking shape.',clientSubtitle:'Apps built for clients.'},
 fr: {my:'Mes apps',client:'Apps clients',apps:'apps',app:'Apps',appSubtitle:'Des apps indépendantes, créées avec soin.',seeAll:'Tout voir',made:'Mes top projets',contact:'Contact',search:'Rechercher',settings:'Réglages',resource:'Ressources',about:'À propos',open:'Ouvrir',get:'Obtenir',visit:'Visiter',development:'En développement',now:'Éditeur vidéo IA',lab:'Au labo.',labDescription:'Des idées en train de prendre forme.',clientSubtitle:'Des apps créées pour des clients.'}
};
const contactCopy={fr:{
 title:'Parlons-en.',intro:'Pour parler de votre projet, conseils, ou simplement échanger.',reason:'De quoi souhaitez-vous parler ?',placeholder:'Choisir une raison',brief:'Votre projet en quelques mots',briefPlaceholder:'L’idée, les personnes concernées et ce que vous aimeriez créer…',draft:'Votre message · modifiable',email:'Ouvrir Email',whatsapp:'Ouvrir WhatsApp',linkedin:'Continuer sur LinkedIn',openLinkedIn:'Ouvrir LinkedIn ↗',hint:'Copiez votre message, puis ouvrez LinkedIn pour me l’envoyer.',copied:'Message copié. Ouvrez LinkedIn, puis collez-le dans votre conversation.',copyFailed:'Sélectionnez et copiez le message ci-dessus, puis ouvrez LinkedIn.',close:'Fermer',briefError:'Décrivez brièvement votre projet.',messageError:'Ajoutez un message avant de continuer.'
},en:{
 title:'Say hello.',intro:'To talk about your project, get advice, or simply connect.',reason:'What would you like to talk about?',placeholder:'Choose a reason',brief:'Your project in a few words',briefPlaceholder:'Your idea, who it’s for, and what you’d like to build…',draft:'Your message · editable',email:'Open Email',whatsapp:'Open WhatsApp',linkedin:'Continue on LinkedIn',openLinkedIn:'Open LinkedIn ↗',hint:'Copy your message, then open LinkedIn to send it to me.',copied:'Message copied. Open LinkedIn and paste it into your conversation.',copyFailed:'Select and copy the message above, then open LinkedIn.',close:'Close',briefError:'Briefly describe your project.',messageError:'Add a message before continuing.'
}};

// Interface and content translations: [English, français]. Brand names stay unchanged.
const translationPairs = [
  ['My apps', 'Mes apps'],
  ['Client apps', 'Apps clients'],
  ["View", "Voir"],
  ["Mobile money and crypto", "Mobile money et crypto"],
  ["Text size", "Taille du texte"],
  ["Standard", "Standard"],
  ["Large", "Grande"],
  ["Extra large", "Très grande"],
  ["Dismiss sheet", "Fermer la fenêtre"],
  ["Previous apps", "Apps précédentes"],
  ["Next apps", "Apps suivantes"],
  ["Independent apps, made with care.", "Des apps indépendantes, créées avec soin."],
  ["I start with a real need, then design and launch mobile products that are easy to use and carefully crafted down to the details.", "Je pars d’un besoin concret, puis je conçois et lance des produits mobiles simples à utiliser, soignés jusque dans les détails."],
  ["I’ve worked with clients in several countries. More than 100,000 people have used our apps, which have generated millions for their businesses. I also share what I learn along the way.", "J’ai accompagné des clients dans plusieurs pays. Plus de 100 000 personnes ont utilisé nos apps, qui ont généré des millions pour leurs activités. Je partage aussi ce que j’apprends en chemin."],
  ["Useful links, tools and ideas worth keeping. The collection is coming soon.", "Des liens, des outils et des idées à garder sous la main. La collection arrive bientôt."],
  ["Turn raw footage into a tighter edit. An AI video editor for the parts you’d rather skip.", "Transforme tes rushes en montages plus rythmés. Un éditeur vidéo assisté par IA pour passer moins de temps sur les tâches répétitives."],
  ["Introducing Abdoul", "Présentation d’Abdoul"],
  ["Email", "E-mail"],
  ["Turn raw talking-head footage into a tighter edit.", "Transforme une vidéo face caméra en montage plus rythmé."],
  ["Horizontal scrolling", "Défilement horizontal"],
  [
    "Abdoul — iPhone Portfolio",
    "Abdoul — Portfolio iPhone"
  ],
  [
    "Interactive portfolio inside an iPhone",
    "Portfolio interactif dans un iPhone"
  ],
  [
    "Cutiz. Open the site to try it.",
    "Cutiz. Ouvrez le site pour essayer le projet."
  ],
  [
    "Music playing",
    "Musique en cours"
  ],
  [
    "AI video editor",
    "Éditeur vidéo IA"
  ],
  [
    "IN THE LAB",
    "AU LABO"
  ],
  [
    "You film. Cutiz prepares the edit.",
    "Tu filmes. Cutiz prépare le montage."
  ],
  [
    "Cuts, captions, audio: tweak it, then post it.",
    "Coupes, sous-titres, son : ajuste, puis publie."
  ],
  [
    "Completion level",
    "Niveau de réalisation"
  ],
  [
    "iOS · AI",
    "iOS · IA"
  ],
  [
    "Try it ↗",
    "Tester ↗"
  ],
  [
    "About Abdoul Rachid Tapsoba",
    "À propos d’Abdoul Rachid Tapsoba"
  ],
  [
    "Hey, I’m Abdoul.",
    "Salut, moi c’est Abdoul."
  ],
  [
    "App entrepreneur & product builder",
    "Entrepreneur d’apps et créateur de produits"
  ],
  [
    "Small details.",
    "Le sens du détail."
  ],
  [
    "Useful products.",
    "Des produits utiles."
  ],
  [
    "100,000+ users. Millions in revenue generated for my clients.",
    "100 000+ utilisateurs. Des millions de chiffre d’affaires générés pour mes clients."
  ],
  [
    "More about me",
    "Plus sur moi"
  ],
  [
    "Mobile. Design. A little obsession.",
    "Mobile. Design. Le souci du détail."
  ],
  [
    "Explore my portfolio",
    "Découvrir mon portfolio"
  ],
  [
    "Projects",
    "Projets"
  ],
  [
    "Projects",
    "Projets"
  ],
  [
    "Open source",
    "Open source"
  ],
  [
    "Resources",
    "Ressources"
  ],
  [
    "About",
    "À propos"
  ],
  [
    "My top projects",
    "Mes top projets"
  ],
  [
    "See all my apps",
    "Voir toutes mes apps"
  ],
  [
    "See all",
    "Tout voir"
  ],
  [
    "Open Lab — Cutiz",
    "Ouvrir l’atelier — Cutiz"
  ],
  [
    "ON MY WORKBENCH",
    "DANS MON ATELIER"
  ],
  [
    "Quick actions",
    "Actions rapides"
  ],
  [
    "Search",
    "Rechercher"
  ],
  [
    "Settings",
    "Réglages"
  ],
  [
    "App collection",
    "Collection d’apps"
  ],
  [
    "Products I’m building with Appbiz Studio.",
    "Des produits que je développe avec Appbiz Studio."
  ],
  [
    "Code and tools I share.",
    "Du code et des outils que je partage."
  ],
  [
    "About Abdoul",
    "À propos d’Abdoul"
  ],
  [
    "THE PERSON BEHIND THE APPS",
    "DERRIÈRE LES APPS"
  ],
  [
    "App entrepreneur. Product builder.",
    "Entrepreneur d’apps. Créateur de produits."
  ],
  [
    "Let’s talk",
    "Parlons-en"
  ],
  [
    "Apps people actually use.",
    "Des apps qui servent vraiment."
  ],
  [
    "What I build",
    "Ce que je crée"
  ],
  [
    "Consumer apps",
    "Apps grand public"
  ],
  [
    "Easy to pick up, built around real needs.",
    "Simples à adopter, pensées pour des besoins bien réels."
  ],
  [
    "We’re building the best money transfer infrastructure for Africans.",
    "On construit la meilleure infrastructure de transfert d’argent pour les Africains."
  ],
  [
    "AI & open source",
    "IA & open source"
  ],
  [
    "I build AI tools and share their code and the value they create.",
    "Je crée des outils IA, partage le code et la valeur qu’ils génèrent."
  ],
  [
    "The way I work",
    "Ma façon de travailler"
  ],
  [
    "I create",
    "Je crée"
  ],
  [
    "I launch",
    "Je lance"
  ],
  [
    "I improve",
    "J’améliore"
  ],
  [
    "Ship",
    "Je lance"
  ],
  [
    "Learn",
    "J’apprends"
  ],
  [
    "Share",
    "Partager"
  ],
  [
    "Social profiles",
    "Mes réseaux sociaux"
  ],
  [
    "Made with care.",
    "Créé avec soin."
  ],
  [
    "Useful finds. Worth keeping.",
    "Des découvertes utiles, à garder."
  ],
  [
    "A little library,",
    "Une bibliothèque"
  ],
  [
    "in the making.",
    "en construction."
  ],
  [
    "Coming soon",
    "Bientôt disponible"
  ],
  [
    "Lab",
    "Atelier"
  ],
  [
    "The workbench.",
    "Au labo."
  ],
  [
    "A space for ideas taking shape.",
    "Des idées en train de prendre forme."
  ],
  [
    "IN DEVELOPMENT",
    "EN DÉVELOPPEMENT"
  ],
  [
    "VERTICAL VIDEO EDITING",
    "MONTAGE VERTICAL"
  ],
  [
    "Cutiz handles the tedious part.",
    "Le travail ingrat du montage ? Cutiz s’en charge."
  ],
  [
    "It cuts silences, syncs word-by-word captions and cleans the audio. You stay in control, then publish.",
    "Cutiz coupe les silences, cale les sous-titres mot à mot et nettoie la voix. Tu ajustes, tu publies."
  ],
  [
    "Try Cutiz for free",
    "Essayer Cutiz gratuitement"
  ],
  [
    "In development",
    "En développement"
  ],
  [
    "Explore the project",
    "Découvrir le projet"
  ],
  [
    "Back",
    "Retour"
  ],
  [
    "Open",
    "Ouvrir"
  ],
  [
    "Get",
    "Obtenir"
  ],
  [
    "Visit",
    "Visiter"
  ],
  [
    "App actions",
    "Actions de l’app"
  ],
  [
    "Share Faith Lock",
    "Partager Faith Lock"
  ],
  [
    "Faith Lock on the App Store",
    "Faith Lock sur l’App Store"
  ],
  [
    "Faith Lock: Bible",
    "Faith Lock : Bible"
  ],
  [
    "Prayer Focus",
    "Prière et concentration"
  ],
  [
    "Christian Screen Time Prayer",
    "Prière chrétienne et temps d’écran"
  ],
  [
    "App information summary",
    "Informations sur l’app"
  ],
  [
    "Release Date",
    "Date de sortie"
  ],
  [
    "Ratings",
    "Notes"
  ],
  [
    "Rating",
    "Note"
  ],
  [
    "4.2 ★",
    "4,2 ★"
  ],
  [
    "Jan 21",
    "21 janv."
  ],
  [
    "Age Rating",
    "Classification d’âge"
  ],
  [
    "Years",
    "ans"
  ],
  [
    "Category",
    "Catégorie"
  ],
  [
    "Reference",
    "Références"
  ],
  [
    "Developer",
    "Développeur"
  ],
  [
    "Language",
    "Langue"
  ],
  [
    "Languages",
    "Langues"
  ],
  [
    "English",
    "Anglais"
  ],
  [
    "French",
    "Français"
  ],
  [
    "Preview",
    "Aperçu"
  ],
  [
    "Faith Lock screenshots",
    "Captures de Faith Lock"
  ],
  [
    "more",
    "plus"
  ],
  [
    "less",
    "moins"
  ],
  [
    "App Privacy",
    "Confidentialité de l’app"
  ],
  [
    "See Details",
    "Voir les détails"
  ],
  [
    "Data Used to Track You",
    "Données utilisées pour vous suivre"
  ],
  [
    "Data Linked to You",
    "Données liées à vous"
  ],
  [
    "Data Not Linked to You",
    "Données non liées à vous"
  ],
  [
    "The developer indicated that this app’s privacy practices may include handling of purchases and usage data.",
    "Le développeur indique que les pratiques de confidentialité de cette app peuvent inclure le traitement de données d’achats et d’utilisation."
  ],
  [
    "Accessibility",
    "Accessibilité"
  ],
  [
    "The developer has not yet indicated which accessibility features this app supports.",
    "Le développeur n’a pas encore indiqué les fonctionnalités d’accessibilité prises en charge par cette app."
  ],
  [
    "Seller",
    "Vendeur"
  ],
  [
    "Compatibility",
    "Compatibilité"
  ],
  [
    "Requires iOS 13.0 or later",
    "Nécessite iOS 13.0 ou une version ultérieure"
  ],
  [
    "In-App Purchases",
    "Achats intégrés"
  ],
  [
    "Yes ›",
    "Oui ›"
  ],
  [
    "Copyright",
    "Droits d’auteur"
  ],
  [
    "1.0.5 · July 7, 2026",
    "1.0.5 · 7 juillet 2026"
  ],
  [
    "Appbiz Studio developer page",
    "Page du développeur Appbiz Studio"
  ],
  [
    "Latest Release",
    "Dernière sortie"
  ],
  [
    "App Store tabs",
    "Onglets de l’App Store"
  ],
  [
    "Today",
    "Aujourd’hui"
  ],
  [
    "Games",
    "Jeux"
  ],
  [
    "Close screenshot",
    "Fermer la capture"
  ],
  [
    "Copy",
    "Copier"
  ],
  [
    "Send by Email",
    "Envoyer par e-mail"
  ],
  [
    "Add to Reading List",
    "Ajouter à la liste de lecture"
  ],
  [
    "App Previews",
    "Aperçus de l’app"
  ],
  [
    "Premium Membership",
    "Abonnement Premium"
  ],
  [
    "The developer indicated that usage data may be used to track you. Purchases and usage data may be linked to your identity, while some product interaction data may be collected without being linked to you.",
    "Le développeur indique que des données d’utilisation peuvent servir à vous suivre. Les achats et données d’utilisation peuvent être liés à votre identité, tandis que certaines données d’interaction peuvent être recueillies sans vous être associées."
  ],
  [
    "Developer’s Privacy Policy",
    "Politique de confidentialité du développeur"
  ],
  [
    "Done",
    "Terminé"
  ],
  [
    "Link copied",
    "Lien copié"
  ],
  [
    "Search portfolio",
    "Rechercher dans le portfolio"
  ],
  [
    "Search…",
    "Rechercher…"
  ],
  [
    "Close search",
    "Fermer la recherche"
  ],
  [
    "Personalize the portfolio’s appearance on this device.",
    "Personnalisez l’apparence et la langue du portfolio sur cet appareil."
  ],
  [
    "Dark Mode",
    "Mode sombre"
  ],
  [
    "On",
    "Activé"
  ],
  [
    "Off",
    "Désactivé"
  ],
  [
    "Link coming soon",
    "Lien à venir"
  ],
  [
    "Open project ↗",
    "Ouvrir le projet ↗"
  ],
  [
    "Open source",
    "Open source"
  ],
  [
    "Projects",
    "Projets"
  ],
  [
    "Pages & Actions",
    "Pages et actions"
  ],
  [
    "All Apps",
    "Toutes les apps"
  ],
  [
    "Projects · Open source",
    "Projets · Open source"
  ],
  [
    "Links, tools & ideas · Coming soon",
    "Liens, outils et idées · Bientôt disponible"
  ],
  [
    "Cutiz · Work in progress",
    "Cutiz · En développement"
  ],
  [
    "Profile · product builder",
    "Profil · Créateur de produits"
  ],
  [
    "Appearance · Dark Mode",
    "Apparence · Mode sombre"
  ],
  [
    "No results",
    "Aucun résultat"
  ],
  [
    "Try another app, project, page or keyword.",
    "Essayez une autre app, un projet, une page ou un mot-clé."
  ],
  [
    "Local agriculture",
    "Agriculture proche"
  ],
  [
    "Utilities",
    "Utilitaires"
  ],
  [
    "Hairstyle Try on, Hair App",
    "Essayage de coiffures et couleurs"
  ],
  [
    "Tickets & events",
    "Tickets et événements"
  ],
  [
    "Shopping",
    "Achats"
  ],
  [
    "Interview & Accent Train",
    "Entretiens et prononciation"
  ],
  [
    "Productivity",
    "Productivité"
  ],
  [
    "AI video editor",
    "Éditeur vidéo IA"
  ],
  [
    "Mobile finance",
    "Finance mobile"
  ],
  [
    "Creator tool · AI",
    "Outil créatif · IA"
  ],
  [
    "An AI video editor that removes editing busywork, so creators can spend more time making.",
    "Un éditeur vidéo IA qui simplifie le montage pour laisser plus de temps à la création."
  ],
  [
    "One place for everyday money movement.",
    "Un seul endroit pour vos transferts au quotidien."
  ],
  [
    "A mobile finance experience designed to simplify transactions across networks and make everyday payments smoother.",
    "Une expérience financière mobile pensée pour simplifier les opérations entre réseaux et rendre les usages du quotidien beaucoup plus fluides."
  ],
  [
    "A focus app that turns the urge to open a distracting app into an intentional moment of reading and prayer.",
    "Une app de focus qui transforme le réflexe d’ouvrir une app distrayante en un moment intentionnel de lecture et de prière."
  ],
  [
    "An AI conversation coach for natural practice, helpful corrections and progress in spoken English.",
    "Un coach conversationnel IA pour pratiquer naturellement, recevoir des corrections et progresser à l’oral."
  ],
  [
    "An AI beauty experience for trying new hairstyles and colors on your phone.",
    "Une expérience mobile de visualisation beauté assistée par IA, centrée sur les transformations de style et de couleur."
  ],
  [
    "Faith before the scroll.",
    "La foi avant le défilement."
  ],
  [
    "Focus · iOS",
    "Concentration · iOS"
  ],
  [
    "Education · AI",
    "Éducation · IA"
  ],
  [
    "Practice English by actually speaking it.",
    "Pratiquez l’anglais en le parlant vraiment."
  ],
  [
    "AI · Beauty",
    "IA · Beauté"
  ],
  [
    "Try a new look before making it real.",
    "Essayez un nouveau look avant de l’adopter."
  ],
  [
    "AI video",
    "Vidéo IA"
  ],
  [
    "Creators",
    "Créateurs"
  ],
  [
    "Screen Time",
    "Temps d’écran"
  ],
  [
    "Habits",
    "Habitudes"
  ],
  [
    "Voice AI",
    "IA vocale"
  ],
  [
    "Education",
    "Éducation"
  ],
  [
    "Generative AI",
    "IA générative"
  ],
  [
    "Beauty",
    "Beauté"
  ],
  [
    "B2C + B2B",
    "Particuliers et entreprises"
  ],
  [
    "Glowe: Hair Color Changer",
    "Glowe : couleur de cheveux"
  ],
  [
    "Faith Lock: Bible Prayer Focus",
    "Faith Lock : Bible et prière"
  ],
  [
    "Fluenzy: AI English Tutor",
    "Fluenzy : coach d’anglais IA"
  ],
  [
    "FastCash — Sports Betting",
    "FastCash — Paris Sportifs"
  ],
  [
    "KANNO - Online ticketing",
    "KANNO - Billetterie en ligne"
  ],
  [
    "Open screenshot 1",
    "Ouvrir la capture 1"
  ],
  [
    "1 of 8",
    "1 sur 8"
  ],
  [
    "Open screenshot 2",
    "Ouvrir la capture 2"
  ],
  [
    "2 of 8",
    "2 sur 8"
  ],
  [
    "Open screenshot 3",
    "Ouvrir la capture 3"
  ],
  [
    "3 of 8",
    "3 sur 8"
  ],
  [
    "Open screenshot 4",
    "Ouvrir la capture 4"
  ],
  [
    "4 of 8",
    "4 sur 8"
  ],
  [
    "Open screenshot 5",
    "Ouvrir la capture 5"
  ],
  [
    "5 of 8",
    "5 sur 8"
  ],
  [
    "Open screenshot 6",
    "Ouvrir la capture 6"
  ],
  [
    "6 of 8",
    "6 sur 8"
  ],
  [
    "Open screenshot 7",
    "Ouvrir la capture 7"
  ],
  [
    "7 of 8",
    "7 sur 8"
  ],
  [
    "Open screenshot 8",
    "Ouvrir la capture 8"
  ],
  [
    "8 of 8",
    "8 sur 8"
  ],
  [
    "Stop Scrolling. Start Scripture.\n\nFaithLock is a prayer lock app that blocks distracting apps and unlocks them with Bible verses — turning screen time into faith time.\n\nBuild a daily prayer habit without willpower. Perfect for Christians who want prayer before phone time, and faith before the scroll.\n\nWHY FAITHLOCK?\n\nThe average person checks their phone 96 times per day. What if every unlock was a moment of prayer with God?\n\nFaithLock transforms your biggest distraction into your most powerful spiritual discipline. No more guilt. No more “I’ll read later.” Just 30 seconds with Scripture before Instagram, TikTok, or any app you choose.\n\nHOW IT WORKS\n\n1. CHOOSE YOUR DISTRACTIONS — Lock social media, games, shopping, or any app stealing your focus.\n\n2. UNLOCK WITH PRAYER & SCRIPTURE — Read a daily Bible verse and pray before accessing your locked apps.\n\n3. BUILD YOUR PRAYER HABIT — Track your prayer streak and watch your faith grow day by day.\n\nFEATURES YOU’LL LOVE\n\nDaily Bible verses, prayer lock and app blocking, scheduled lock times, prayer streak tracking, faith insights and stats, prayer reminders, dark mode, and cloud sync for Premium members.\n\nFaith over phone. Prayer over scrolling. Every time.",
    "Arrêtez de défiler. Ouvrez les Écritures.\n\nFaithLock bloque les apps distrayantes et les déverrouille avec des versets bibliques : le temps d’écran devient un temps de foi.\n\nCréez une habitude quotidienne de prière. Pour les chrétiens qui souhaitent privilégier la prière avant le téléphone.\n\nPOURQUOI FAITHLOCK ?\n\nUne personne consulte son téléphone en moyenne 96 fois par jour. Et si chaque déverrouillage devenait un moment de prière ?\n\nFaithLock transforme votre principale distraction en une discipline spirituelle : 30 secondes avec les Écritures avant Instagram, TikTok ou toute autre app choisie.\n\nCOMMENT ÇA MARCHE\n\n1. CHOISISSEZ VOS DISTRACTIONS — Bloquez réseaux sociaux, jeux, achats ou toute app qui capte votre attention.\n\n2. DÉVERROUILLEZ PAR LA PRIÈRE — Lisez un verset biblique et priez avant d’accéder aux apps bloquées.\n\n3. CULTIVEZ VOTRE HABITUDE — Suivez vos jours de prière consécutifs.\n\nLES FONCTIONNALITÉS\n\nVersets quotidiens, verrouillage par la prière, horaires de blocage, suivi des habitudes, statistiques, rappels, mode sombre et synchronisation pour les abonnés Premium.\n\nLa foi avant le téléphone. La prière avant le défilement."
  ]
];

translationPairs.push(["Guides, tools & ideas","Guides, outils et idées"],["Document reader","Lecteur de document"],["Document pages","Pages du document"],["Download","Télécharger"],["Retry","Réessayer"]);

translationPairs.push(["Online tontine","Tontine en ligne"]);
