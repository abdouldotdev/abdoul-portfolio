// Live collection and a bundled copy available when the API is unreachable.
const resourceData = {
  "endpoint": "https://jeli.abdoul.dev/portfolio-resources",
  "fallback": [
    {
      "id": "guide-motion-design-publicitaire",
      "type": "document",
      "mimeType": "application/pdf",
      "title": "Guide motion design publicitaire",
      "description": "60 secondes qui vendent : style, copywriting, voix et effets sonores.",
      "link": "https://jeli.abdoul.dev/portfolio-resources/files/guide-motion-design-claude.pdf",
      "cover": "https://jeli.abdoul.dev/portfolio-resources/assets/guide-motion-design-cover-sans-texte.webp",
      "coverMimeType": "image/webp",
      "pages": 5,
      "download": "https://jeli.abdoul.dev/portfolio-resources/download/guide-motion-design-claude.pdf",
      "categoryIds": ["design", "marketing"]
    }
  ],
  "categories": [
    {"id":"design","name":"Design"},
    {"id":"vibe-coding","name":"Vibe Coding"},
    {"id":"ia","name":"IA"},
    {"id":"marketing","name":"Marketing"}
  ],
  "categoryTranslations": {
    "ia": {"en":"AI"}
  },
  "local": {
    "https://jeli.abdoul.dev/portfolio-resources/files/guide-motion-design-claude.pdf": "assets/resources/guide-motion-design-publicitaire.pdf"
  },
  "translations": {
    "guide-motion-design-publicitaire": {
      "en": {
        "title": "Advertising motion design guide",
        "description": "60 seconds that sell: style, copywriting, voice and sound effects."
      }
    }
  }
};
