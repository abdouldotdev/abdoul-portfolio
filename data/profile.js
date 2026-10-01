// Edit contact details and social URLs here. Empty social URLs remain unavailable.
const profileData = {
 avatar: 'assets/images/abdoul.png',
 contact: {
  email: 'hey@abdoul.dev',
  whatsapp: '22658266534', // International format, digits only.
  linkedin: 'https://www.linkedin.com/in/abdouldev/'
 },
 socials: [
  {key:'tiktok', label:'TikTok', url:'https://www.tiktok.com/@abdoul.dev'},
  {key:'facebook', label:'Facebook', url:'https://web.facebook.com/abdoul.rachid.tapsoba.419548/'},
  {key:'linkedin', label:'LinkedIn', url:'https://www.linkedin.com/in/abdouldev/'},
  {key:'x', label:'X', url:'https://x.com/abdouldev'}
 ]
};

// Reasons and opening messages in French and English.
const contactReasons = {
 project: {fr:['Un projet client','J’aimerais vous confier un projet et échanger sur sa réalisation.'],en:['A client project','I’d like to discuss a project I’m looking to build with you.']},
 advice: {fr:['Un conseil produit ou technique','J’aimerais avoir votre avis sur une question produit ou technique. Seriez-vous disponible pour en discuter ?'],en:['Product or technical advice','I’d love your advice on a product or technical question. Would you be open to a conversation?']},
 audit: {fr:['Un avis sur mon app ou son design','J’aimerais un regard extérieur sur mon application, son design et les améliorations possibles. Comment pourrions-nous en discuter ?'],en:['Feedback on my app or design','I’d appreciate an outside perspective on my app, its design and possible improvements. How could we discuss this?']},
 collaboration: {fr:['Une collaboration ou un partenariat','J’aimerais vous proposer une collaboration et explorer ce que nous pourrions créer ensemble.'],en:['A collaboration or partnership','I’d like to propose a collaboration and explore what we could create together.']},
 mentoring: {fr:['Un échange sur mon parcours','J’aimerais échanger sur mon parcours dans le développement et la création de produits, et bénéficier de vos conseils.'],en:['Career advice or mentoring','I’d love to discuss my journey in development and product building, and hear your advice.']},
 speaking: {fr:['Une invitation · événement ou podcast','J’aimerais vous inviter à partager votre expérience lors d’un événement ou d’un podcast. Puis-je vous envoyer les détails ?'],en:['An event or podcast invitation','I’d like to invite you to share your experience at an event or on a podcast. May I send you the details?']},
 hello: {fr:['Simplement échanger','J’ai découvert votre travail et j’avais envie de faire connaissance. Au plaisir d’échanger !'],en:['Just saying hello','I came across your work and wanted to introduce myself. I’d love to connect!']}
};
