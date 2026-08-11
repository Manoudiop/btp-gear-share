export type Language = "fr" | "en";

/**
 * Dictionnaire FR/EN de l'interface.
 *
 * Convention de clés : `zone.element`. Les valeurs peuvent contenir des
 * variables `{nom}`, remplacées par `t(clé, { nom: valeur })`.
 */
export const translations: Record<string, Record<Language, string>> = {
  // ---------------------------------------------------------------- Navigation
  "nav.home": { fr: "Accueil", en: "Home" },
  "nav.equipment": { fr: "Équipement", en: "Equipment" },
  "nav.materials": { fr: "Matériaux", en: "Materials" },
  "nav.howItWorks": { fr: "Comment ça marche", en: "How it works" },
  "nav.pricing": { fr: "Tarifs", en: "Pricing" },
  "nav.about": { fr: "À propos", en: "About" },
  "nav.contact": { fr: "Contact", en: "Contact" },
  "nav.search": { fr: "Rechercher", en: "Search" },
  "nav.login": { fr: "Connexion", en: "Login" },
  "nav.becomeOwner": { fr: "Devenir loueur", en: "Become a renter" },
  "nav.myAccount": { fr: "Mon compte", en: "My account" },
  "nav.dashboard": { fr: "Tableau de bord", en: "Dashboard" },
  "nav.settings": { fr: "Paramètres", en: "Settings" },
  "nav.logout": { fr: "Se déconnecter", en: "Logout" },
  "nav.cart": { fr: "Panier", en: "Cart" },

  // -------------------------------------------------------------------- Commun
  "common.viewAll": { fr: "Voir tout", en: "View all" },
  "common.view": { fr: "Voir", en: "View" },
  "common.back": { fr: "Retour", en: "Back" },
  "common.free": { fr: "Offert", en: "Free" },
  "common.perDay": { fr: "/jour", en: "/day" },
  "common.unavailable": { fr: "Non disponible", en: "Unavailable" },
  "common.available": { fr: "Disponible", en: "Available" },
  "common.all": { fr: "Tout", en: "All" },
  "common.total": { fr: "Total", en: "Total" },
  "common.subtotal": { fr: "Sous-total", en: "Subtotal" },
  "common.delivery": { fr: "Livraison", en: "Delivery" },
  "common.quickResponse": { fr: "Réponse rapide", en: "Fast response" },
  "common.sortBy": { fr: "Trier par", en: "Sort by" },
  "common.relevance": { fr: "Pertinence", en: "Relevance" },
  "common.priceAsc": { fr: "Prix croissant", en: "Price: low to high" },
  "common.priceDesc": { fr: "Prix décroissant", en: "Price: high to low" },
  "common.bestRated": { fr: "Meilleures notes", en: "Best rated" },
  "common.loading": { fr: "Chargement", en: "Loading" },

  // ------------------------------------------------------------------- Accueil
  "home.whyTitle": { fr: "Pourquoi choisir BTP Location ?", en: "Why choose BTP Location?" },
  "home.whySubtitle": {
    fr: "Notre plateforme offre une expérience unique pour la location de matériel de construction",
    en: "Our platform offers a unique experience for renting construction equipment",
  },
  "home.feature.secure.title": { fr: "Location sécurisée", en: "Secure rental" },
  "home.feature.secure.desc": {
    fr: "Matériel vérifié, contrats sécurisés et paiements protégés pour votre tranquillité d'esprit.",
    en: "Verified equipment, secure contracts and protected payments for your peace of mind.",
  },
  "home.feature.delivery.title": { fr: "Livraison sur chantier", en: "On-site delivery" },
  "home.feature.delivery.desc": {
    fr: "Livraison et récupération directement sur votre lieu de travail pour plus de commodité.",
    en: "Delivery and pickup straight to your worksite for maximum convenience.",
  },
  "home.feature.booking.title": { fr: "Réservation rapide", en: "Fast booking" },
  "home.feature.booking.desc": {
    fr: "Processus de réservation simplifié et confirmation instantanée de votre matériel.",
    en: "Streamlined booking process and instant confirmation of your equipment.",
  },
  "home.feature.chat.title": { fr: "Communication directe", en: "Direct communication" },
  "home.feature.chat.desc": {
    fr: "Échangez facilement avec les propriétaires pour organiser votre location.",
    en: "Talk directly with owners to organise your rental.",
  },
  "home.feature.flexible.title": { fr: "Flexibilité des durées", en: "Flexible durations" },
  "home.feature.flexible.desc": {
    fr: "Louez à la journée, semaine ou mois selon vos besoins de chantier.",
    en: "Rent by the day, week or month depending on your site needs.",
  },
  "home.feature.pricing.title": { fr: "Paiements transparents", en: "Transparent payments" },
  "home.feature.pricing.desc": {
    fr: "Tarifs clairs, sans frais cachés et multiples options de paiement.",
    en: "Clear pricing, no hidden fees and multiple payment options.",
  },
  "home.cta.title": {
    fr: "Prêt à louer ou proposer votre matériel ?",
    en: "Ready to rent or list your equipment?",
  },
  "home.cta.subtitle": {
    fr: "Rejoignez notre communauté de professionnels du BTP et transformez la façon dont vous gérez vos équipements de chantier.",
    en: "Join our community of construction professionals and transform how you manage your site equipment.",
  },
  "home.cta.find": { fr: "Trouver du matériel", en: "Find equipment" },
  "home.testimonials.title": { fr: "Ce que disent nos utilisateurs", en: "What our users say" },
  "home.testimonials.subtitle": {
    fr: "Découvrez les expériences de ceux qui utilisent déjà notre plateforme",
    en: "Discover the experiences of those already using our platform",
  },
  "home.testimonials.quote": {
    fr: "BTP Location a changé notre façon de gérer nos équipements. Nous pouvons maintenant obtenir exactement ce dont nous avons besoin, quand nous en avons besoin, sans les coûts d'achat.",
    en: "BTP Location changed the way we manage our equipment. We can now get exactly what we need, when we need it, without the cost of buying.",
  },
  "home.testimonials.role": { fr: "Entrepreneur en construction", en: "Construction contractor" },

  // --------------------------------------------------------------------- Hero
  "hero.title1": { fr: "La plateforme de location ", en: "The rental platform " },
  "hero.title2": { fr: "qui révolutionne le BTP", en: "transforming construction" },
  "hero.subtitle": {
    fr: "Louez des équipements de qualité pour vos chantiers ou achetez des matériaux de construction directement auprès de professionnels vérifiés.",
    en: "Rent quality equipment for your sites or buy construction materials directly from verified professionals.",
  },
  "hero.buyMaterials": { fr: "Acheter des matériaux", en: "Buy materials" },
  "hero.stat.catalog": { fr: "+5000 équipements", en: "5,000+ machines" },
  "hero.stat.delivery": { fr: "Livraison 24-48h", en: "Delivery in 24-48h" },
  "hero.stat.support": { fr: "Support 7j/7", en: "Support 7 days a week" },
  "hero.saveUpTo": { fr: "Économisez jusqu'à", en: "Save up to" },
  "hero.saveOn": { fr: "sur vos locations d'équipements", en: "on your equipment rentals" },

  // ------------------------------------------------------------- Comment ça marche
  "how.title": { fr: "Comment fonctionne BTP Location", en: "How BTP Location works" },
  "how.subtitle": {
    fr: "Nous simplifions la location de matériel de construction pour que vous puissiez vous concentrer sur votre chantier.",
    en: "We simplify construction equipment rental so you can focus on your site.",
  },
  "how.introTitle": {
    fr: "Location d'équipement BTP simplifiée",
    en: "Construction equipment rental, made simple",
  },
  "how.introDesc": {
    fr: "BTP Location connecte les propriétaires d'équipements de construction avec les entrepreneurs et professionnels qui en ont besoin. Notre plateforme permet de louer facilement et en toute sécurité des équipements de qualité à des prix compétitifs.",
    en: "BTP Location connects construction equipment owners with the contractors and professionals who need them. Our platform makes it easy and safe to rent quality equipment at competitive prices.",
  },
  "how.point1": { fr: "Accès à des milliers d'équipements", en: "Access to thousands of machines" },
  "how.point2": { fr: "Économies importantes", en: "Significant savings" },
  "how.point3": { fr: "Processus simple et rapide", en: "Simple, fast process" },
  "how.point4": { fr: "Support client dédié", en: "Dedicated customer support" },
  "how.stepsTitle": { fr: "En 4 étapes simples", en: "In 4 simple steps" },
  "how.step1.title": { fr: "Recherchez votre équipement", en: "Search for your equipment" },
  "how.step1.desc": {
    fr: "Parcourez notre vaste catalogue d'équipements de construction et filtrez par type, localisation et disponibilité.",
    en: "Browse our extensive catalog and filter by type, location and availability.",
  },
  "how.step2.title": { fr: "Réservez en quelques clics", en: "Book in a few clicks" },
  "how.step2.desc": {
    fr: "Sélectionnez vos dates, vérifiez la disponibilité et réservez instantanément sans paperasse.",
    en: "Pick your dates, check availability and book instantly with no paperwork.",
  },
  "how.step3.title": { fr: "Paiement sécurisé", en: "Secure payment" },
  "how.step3.desc": {
    fr: "Effectuez votre paiement en toute sécurité via notre plateforme de paiement protégée.",
    en: "Pay safely through our protected payment platform.",
  },
  "how.step4.title": { fr: "Récupérez ou faites-vous livrer", en: "Collect or get it delivered" },
  "how.step4.desc": {
    fr: "Récupérez l'équipement au point de collecte ou optez pour une livraison directe sur votre chantier.",
    en: "Pick the equipment up at the collection point or have it delivered straight to your site.",
  },
  "how.whyTitle": { fr: "Pourquoi choisir BTP Location ?", en: "Why choose BTP Location?" },
  "how.whySubtitle": {
    fr: "Nous révolutionnons la façon dont les professionnels du BTP accèdent aux équipements",
    en: "We are changing how construction professionals access equipment",
  },
  "how.benefit1.title": { fr: "Économisez jusqu'à 40%", en: "Save up to 40%" },
  "how.benefit1.desc": {
    fr: "Louez uniquement ce dont vous avez besoin, quand vous en avez besoin.",
    en: "Rent only what you need, when you need it.",
  },
  "how.benefit2.title": { fr: "Équipements certifiés", en: "Certified equipment" },
  "how.benefit2.desc": {
    fr: "Tous nos équipements sont vérifiés et certifiés pour votre sécurité.",
    en: "All our equipment is inspected and certified for your safety.",
  },
  "how.benefit3.title": { fr: "Assurance incluse", en: "Insurance included" },
  "how.benefit3.desc": {
    fr: "Chaque location comprend une assurance complète pour votre tranquillité d'esprit.",
    en: "Every rental includes full insurance for your peace of mind.",
  },
  "how.benefit4.title": { fr: "Support client 24/7", en: "24/7 customer support" },
  "how.benefit4.desc": {
    fr: "Notre équipe d'experts est disponible à tout moment pour vous aider.",
    en: "Our team of experts is available at any time to help you.",
  },
  "how.ctaTitle": { fr: "Prêt à commencer ?", en: "Ready to get started?" },
  "how.ctaDesc": {
    fr: "Rejoignez des milliers de professionnels qui font confiance à BTP Location pour leurs besoins en équipement de construction.",
    en: "Join thousands of professionals who trust BTP Location for their construction equipment needs.",
  },
  "how.ctaButton": { fr: "Explorer les équipements", en: "Explore equipment" },

  // ------------------------------------------------------------------ À propos
  "about.missionTitle": { fr: "Notre mission", en: "Our mission" },
  "about.missionDesc": {
    fr: "Faciliter l'accès aux équipements de construction pour tous les professionnels du BTP, quelle que soit la taille de leur entreprise.",
    en: "Make construction equipment accessible to every professional, whatever the size of their company.",
  },
  "about.storyTitle": { fr: "Notre histoire", en: "Our story" },
  "about.story1": {
    fr: "BTP Location est née en 2018 d'une frustration commune à de nombreux professionnels du BTP : la difficulté d'accéder à des équipements de qualité à des prix abordables.",
    en: "BTP Location was born in 2018 out of a frustration shared by many construction professionals: how hard it is to access quality equipment at affordable prices.",
  },
  "about.story2": {
    fr: "Notre fondatrice, Marie Dupont, ancienne ingénieure sur des chantiers de grande envergure, a constaté que de nombreuses petites et moyennes entreprises ne pouvaient pas se permettre d'acheter des équipements coûteux, tandis que d'autres avaient des équipements sous-utilisés.",
    en: "Our founder, Marie Dupont, a former engineer on large-scale sites, saw that many small and mid-sized firms could not afford expensive machines, while others had equipment sitting idle.",
  },
  "about.story3": {
    fr: "C'est ainsi qu'est née l'idée de créer une plateforme qui connecte les propriétaires d'équipements avec ceux qui en ont besoin, créant une économie collaborative dans le secteur du BTP.",
    en: "That is how the idea took shape: a platform connecting equipment owners with those who need them, building a sharing economy for construction.",
  },
  "about.valuesTitle": { fr: "Nos valeurs", en: "Our values" },
  "about.value1.title": { fr: "Simplicité", en: "Simplicity" },
  "about.value1.desc": {
    fr: "Nous rendons la location d'équipement BTP aussi simple que possible.",
    en: "We make construction equipment rental as simple as possible.",
  },
  "about.value2.title": { fr: "Fiabilité", en: "Reliability" },
  "about.value2.desc": {
    fr: "Nos équipements sont vérifiés et certifiés pour votre sécurité.",
    en: "Our equipment is inspected and certified for your safety.",
  },
  "about.value3.title": { fr: "Innovation", en: "Innovation" },
  "about.value3.desc": {
    fr: "Nous utilisons la technologie pour améliorer constamment notre service.",
    en: "We use technology to keep improving our service.",
  },
  "about.stat1": { fr: "Équipements disponibles", en: "Machines available" },
  "about.stat2": { fr: "Utilisateurs actifs", en: "Active users" },
  "about.stat3": { fr: "Villes couvertes", en: "Cities covered" },
  "about.stat4": { fr: "Clients satisfaits", en: "Satisfied customers" },
  "about.teamTitle": { fr: "Notre équipe", en: "Our team" },
  "about.team1.role": { fr: "CEO & Fondatrice", en: "CEO & Founder" },
  "about.team1.bio": {
    fr: "Ancienne ingénieure en BTP, Marie a fondé BTP Location après avoir constaté les difficultés d'accès au matériel de qualité.",
    en: "A former construction engineer, Marie founded BTP Location after seeing how hard quality equipment was to come by.",
  },
  "about.team2.role": { fr: "Directeur technique", en: "Technical director" },
  "about.team2.bio": {
    fr: "Avec 15 ans d'expérience dans le secteur du BTP, Pierre supervise la sélection et la qualité de tous les équipements.",
    en: "With 15 years in construction, Pierre oversees the selection and quality of every machine.",
  },
  "about.team3.role": { fr: "Responsable relations clients", en: "Head of customer relations" },
  "about.team3.bio": {
    fr: "Sophie assure que chaque client reçoive un service personnalisé et une assistance réactive.",
    en: "Sophie makes sure every customer gets personal service and quick support.",
  },
  "about.team4.role": { fr: "Directeur marketing", en: "Marketing director" },
  "about.team4.bio": {
    fr: "Thomas met en valeur notre offre et développe des partenariats stratégiques dans le secteur du BTP.",
    en: "Thomas promotes our offering and builds strategic partnerships across the construction sector.",
  },
  "about.whyTitle": { fr: "Pourquoi nous choisir", en: "Why choose us" },
  "about.why1": { fr: "Sélection rigoureuse des équipements", en: "Rigorous equipment selection" },
  "about.why2": { fr: "Processus de location simplifié", en: "Streamlined rental process" },
  "about.why3": { fr: "Tarifs transparents et compétitifs", en: "Transparent, competitive pricing" },
  "about.why4": { fr: "Support client réactif", en: "Responsive customer support" },
  "about.why5": { fr: "Garantie de satisfaction", en: "Satisfaction guarantee" },
  "about.why6": { fr: "Livraison et enlèvement flexibles", en: "Flexible delivery and collection" },
  "about.joinTitle": {
    fr: "Rejoignez la communauté BTP Location",
    en: "Join the BTP Location community",
  },
  "about.joinDesc": {
    fr: "Nous sommes fiers de construire une communauté de professionnels qui transforment le secteur du BTP grâce à une approche collaborative et innovante.",
    en: "We are proud to build a community of professionals transforming construction through collaboration and innovation.",
  },
  "about.becomePartner": { fr: "Devenir partenaire", en: "Become a partner" },

  // -------------------------------------------------------------------- Contact
  "contact.title": { fr: "Contactez-nous", en: "Contact us" },
  "contact.subtitle": {
    fr: "Une question, un besoin spécifique ou une demande de partenariat ? Notre équipe est à votre écoute.",
    en: "A question, a specific need or a partnership request? Our team is here to help.",
  },
  "contact.phone": { fr: "Téléphone", en: "Phone" },
  "contact.phoneDesc": {
    fr: "Appelez-nous pour une assistance immédiate",
    en: "Call us for immediate assistance",
  },
  "contact.emailDesc": {
    fr: "Envoyez-nous un email et nous vous répondrons sous 24h",
    en: "Email us and we will reply within 24 hours",
  },
  "contact.address": { fr: "Adresse", en: "Address" },
  "contact.addressDesc": {
    fr: "Venez nous rencontrer à nos bureaux",
    en: "Come and meet us at our offices",
  },
  "contact.formTitle": { fr: "Envoyez-nous un message", en: "Send us a message" },
  "contact.sent": { fr: "Message envoyé avec succès", en: "Message sent successfully" },
  "contact.sentDesc": {
    fr: "Merci pour votre message. Notre équipe vous contactera rapidement.",
    en: "Thanks for your message. Our team will get back to you shortly.",
  },
  "contact.fullName": { fr: "Nom complet", en: "Full name" },
  "contact.subject": { fr: "Sujet", en: "Subject" },
  "contact.selectSubject": { fr: "Sélectionnez un sujet", en: "Select a subject" },
  "contact.subject.rental": { fr: "Location d'équipement", en: "Equipment rental" },
  "contact.subject.partnership": { fr: "Partenariat", en: "Partnership" },
  "contact.subject.support": { fr: "Support technique", en: "Technical support" },
  "contact.subject.billing": { fr: "Facturation", en: "Billing" },
  "contact.subject.other": { fr: "Autre", en: "Other" },
  "contact.message": { fr: "Message", en: "Message" },
  "contact.send": { fr: "Envoyer le message", en: "Send message" },
  "contact.faqTitle": { fr: "Foire aux questions", en: "Frequently asked questions" },
  "contact.faq1.q": { fr: "Comment puis-je louer un équipement ?", en: "How do I rent equipment?" },
  "contact.faq1.a": {
    fr: "Pour louer un équipement, il vous suffit de créer un compte, de naviguer dans notre catalogue, de sélectionner l'équipement souhaité et de suivre le processus de réservation en ligne.",
    en: "Create an account, browse the catalog, pick the machine you need and follow the online booking process.",
  },
  "contact.faq2.q": {
    fr: "Quelles sont les conditions de location ?",
    en: "What are the rental conditions?",
  },
  "contact.faq2.a": {
    fr: "Les conditions de location varient selon l'équipement. Généralement, une caution est demandée et une assurance est incluse. Vous pouvez consulter les conditions spécifiques sur la page de chaque équipement.",
    en: "Conditions vary by machine. A deposit is usually required and insurance is included. Specific terms are shown on each equipment page.",
  },
  "contact.faq3.q": { fr: "Comment fonctionne la livraison ?", en: "How does delivery work?" },
  "contact.faq3.a": {
    fr: "Vous pouvez soit récupérer l'équipement au point de collecte désigné, soit opter pour une livraison directement sur votre chantier moyennant des frais supplémentaires qui varient selon la distance.",
    en: "You can either collect the equipment at the designated pickup point or have it delivered to your site for an extra fee based on distance.",
  },
  "contact.faq4.q": {
    fr: "Que faire en cas de panne d'équipement ?",
    en: "What if the equipment breaks down?",
  },
  "contact.faq4.a": {
    fr: "En cas de panne, contactez immédiatement notre service client. Nous organiserons soit une réparation rapide, soit un remplacement de l'équipement selon la situation.",
    en: "Contact our customer service straight away. We will arrange either a quick repair or a replacement, depending on the situation.",
  },
  "contact.faq5.q": {
    fr: "Comment devenir partenaire ou loueur ?",
    en: "How do I become a partner or owner?",
  },
  "contact.faq5.a": {
    fr: "Pour devenir partenaire ou proposer votre équipement à la location, contactez-nous via le formulaire ci-contre ou appelez notre équipe commerciale pour discuter des possibilités de collaboration.",
    en: "To become a partner or list your equipment, use the form alongside or call our sales team to discuss the options.",
  },

  // -------------------------------------------------------------- Devenir loueur
  "owner.title": { fr: "Devenir loueur", en: "Become an owner" },
  "owner.subtitle": {
    fr: "Rejoignez notre communauté de propriétaires d'équipements et commencez à générer des revenus avec votre matériel BTP.",
    en: "Join our community of equipment owners and start earning from your construction machinery.",
  },
  "owner.step1": { fr: "Informations personnelles", en: "Personal information" },
  "owner.step2": { fr: "Détails de l'équipement", en: "Equipment details" },
  "owner.step3": { fr: "Confirmation", en: "Confirmation" },
  "owner.firstName": { fr: "Prénom", en: "First name" },
  "owner.lastName": { fr: "Nom", en: "Last name" },
  "owner.company": { fr: "Entreprise (optionnel)", en: "Company (optional)" },
  "owner.address": { fr: "Adresse", en: "Address" },
  "owner.equipmentTypes": { fr: "Types d'équipements", en: "Equipment types" },
  "owner.equipmentTypesHelp": {
    fr: "Listez les types d'équipements que vous souhaitez proposer à la location",
    en: "List the types of equipment you would like to rent out",
  },
  "owner.equipmentTypesPlaceholder": {
    fr: "Pelleteuses, Camions, Échafaudages…",
    en: "Excavators, trucks, scaffolding…",
  },
  "owner.moreInfo": {
    fr: "Informations complémentaires (optionnel)",
    en: "Additional information (optional)",
  },
  "owner.moreInfoPlaceholder": {
    fr: "Partagez plus d'informations sur vos équipements, leur état, disponibilité, etc.",
    en: "Tell us more about your equipment, its condition, availability, and so on.",
  },
  "owner.continue": { fr: "Continuer", en: "Continue" },
  "owner.submit": { fr: "Soumettre ma demande", en: "Submit my application" },
  "owner.submitting": { fr: "Traitement en cours…", en: "Processing…" },
  "owner.successTitle": { fr: "Demande envoyée avec succès !", en: "Application sent successfully!" },
  "owner.successDesc": {
    fr: "Merci pour votre intérêt ! Notre équipe va examiner votre demande et vous contactera sous 48h pour finaliser votre inscription et configurer votre compte loueur.",
    en: "Thanks for your interest! Our team will review your application and contact you within 48 hours to finalise your registration and set up your owner account.",
  },
  "owner.backHome": { fr: "Retourner à l'accueil", en: "Back to home" },
  "owner.toastTitle": { fr: "Inscription réussie !", en: "Application received!" },
  "owner.toastDesc": {
    fr: "Nous vous contacterons bientôt pour finaliser votre inscription.",
    en: "We will contact you shortly to finalise your registration.",
  },
  "owner.whyTitle": {
    fr: "Pourquoi devenir loueur sur BTP Location ?",
    en: "Why become an owner on BTP Location?",
  },
  "owner.why1": {
    fr: "Générez des revenus avec votre matériel inutilisé",
    en: "Earn from equipment sitting idle",
  },
  "owner.why2": {
    fr: "Profitez d'une visibilité auprès de milliers de professionnels",
    en: "Get visibility with thousands of professionals",
  },
  "owner.why3": {
    fr: "Bénéficiez d'une assurance complète pour vos équipements",
    en: "Benefit from full insurance on your equipment",
  },
  "owner.why4": {
    fr: "Gérez facilement vos locations via notre plateforme intuitive",
    en: "Manage your rentals easily through our platform",
  },
  "owner.error.firstName": {
    fr: "Le prénom doit contenir au moins 2 caractères",
    en: "First name must be at least 2 characters",
  },
  "owner.error.lastName": {
    fr: "Le nom doit contenir au moins 2 caractères",
    en: "Last name must be at least 2 characters",
  },
  "owner.error.phone": { fr: "Numéro de téléphone invalide", en: "Invalid phone number" },
  "owner.error.address": { fr: "Adresse invalide", en: "Invalid address" },
  "owner.error.city": { fr: "Ville invalide", en: "Invalid city" },
  "owner.error.postalCode": { fr: "Code postal invalide", en: "Invalid postcode" },
  "owner.error.equipmentTypes": {
    fr: "Veuillez préciser les types d'équipements",
    en: "Please specify the equipment types",
  },

  // ------------------------------------------------------------ Mot de passe oublié
  "forgot.title": { fr: "Mot de passe oublié", en: "Forgot password" },
  "forgot.desc": {
    fr: "Saisissez votre adresse email : nous vous enverrons un lien de réinitialisation.",
    en: "Enter your email address and we will send you a reset link.",
  },
  "forgot.send": { fr: "Envoyer le lien", en: "Send link" },
  "forgot.sent": { fr: "Email envoyé", en: "Email sent" },
  "forgot.sentDesc": {
    fr: "Si un compte existe pour cette adresse, vous recevrez un lien de réinitialisation.",
    en: "If an account exists for this address, you will receive a reset link.",
  },
  "forgot.backToLogin": { fr: "Retour à la connexion", en: "Back to login" },

  // --------------------------------------------------------------- Devis sur mesure
  "quote.title": { fr: "Devis personnalisé", en: "Custom quote" },
  "quote.subtitle": {
    fr: "Remplissez ce formulaire pour recevoir un devis adapté à vos besoins spécifiques.",
    en: "Fill in this form to receive a quote tailored to your specific needs.",
  },
  "quote.stepOf": { fr: "Étape {current} sur {total}", en: "Step {current} of {total}" },

  // -------------------------------------------------------------- Titres de page
  "seo.home": {
    fr: "Location de matériel et vente de matériaux BTP",
    en: "Construction equipment rental and material sales",
  },
  "seo.homeDesc": {
    fr: "Louez du matériel de chantier et commandez vos matériaux de construction auprès de professionnels vérifiés.",
    en: "Rent site equipment and order construction materials from verified professionals.",
  },
  "seo.equipmentDesc": {
    fr: "Parcourez notre catalogue d'équipements de chantier disponibles à la location partout en France.",
    en: "Browse our catalog of construction equipment available for rent across France.",
  },
  "seo.materialsDesc": {
    fr: "Sable, ciment, béton, granulats : commandez vos matériaux et faites-vous livrer sur chantier.",
    en: "Sand, cement, concrete, aggregates: order your materials and get them delivered on site.",
  },
  "legal.privacy": { fr: "Politique de confidentialité", en: "Privacy policy" },
  "legal.terms": { fr: "Conditions d'utilisation", en: "Terms of service" },
  "legal.cookies": { fr: "Politique des cookies", en: "Cookie policy" },

  // ---------------------------------------------------------------- Catégories
  // Le libellé français fait office d'identifiant de filtre ; seule l'étiquette
  // affichée est traduite (via `categoryLabel`, qui retombe sur la valeur brute).
  "category.Pelleteuses": { fr: "Pelleteuses", en: "Excavators" },
  "category.Chargeuses": { fr: "Chargeuses", en: "Loaders" },
  "category.Camions": { fr: "Camions", en: "Trucks" },
  "category.Bétonnières": { fr: "Bétonnières", en: "Concrete mixers" },
  "category.Marteaux piqueurs": { fr: "Marteaux piqueurs", en: "Jackhammers" },
  "category.Échafaudages": { fr: "Échafaudages", en: "Scaffolding" },
  "category.Outillage": { fr: "Outillage", en: "Power tools" },
  "category.Sable": { fr: "Sable", en: "Sand" },
  "category.Ciment": { fr: "Ciment", en: "Cement" },
  "category.Béton": { fr: "Béton", en: "Concrete" },
  "category.Agrégats": { fr: "Agrégats", en: "Aggregates" },
  "category.Terre": { fr: "Terre", en: "Topsoil" },

  // ---------------------------------------------------------------- Équipements
  "equipment.gridTitle": {
    fr: "Trouvez l'équipement parfait pour votre chantier",
    en: "Find the perfect equipment for your site",
  },
  "equipment.gridSubtitle": {
    fr: "Des milliers d'équipements à louer pour tous vos travaux, de la petite rénovation aux grands chantiers",
    en: "Thousands of machines to rent for every job, from small renovations to major works",
  },
  "equipment.popularCategories": { fr: "Catégories populaires", en: "Popular categories" },
  "equipment.recent": { fr: "Équipements récents", en: "Recent equipment" },
  "equipment.explore": { fr: "Explorer plus d'équipements", en: "Explore more equipment" },
  "equipment.pageTitle": { fr: "Équipements disponibles", en: "Available equipment" },
  "equipment.pageSubtitle": {
    fr: "Trouvez l'équipement parfait pour votre chantier parmi notre large sélection",
    en: "Find the perfect equipment for your site among our wide selection",
  },
  "equipment.filterByCategory": { fr: "Filtrer par catégorie", en: "Filter by category" },
  "equipment.viewGrid": { fr: "Grille", en: "Grid" },
  "equipment.viewMap": { fr: "Carte", en: "Map" },
  "equipment.mapSoon": { fr: "La vue carte arrive bientôt.", en: "Map view is coming soon." },
  "equipment.results": {
    fr: "{count} résultat(s) trouvé(s)",
    en: "{count} result(s) found",
  },
  "equipment.noResults": {
    fr: "Aucun équipement ne correspond à votre recherche.",
    en: "No equipment matches your search.",
  },
  "equipment.searchPlaceholder": {
    fr: "Rechercher un équipement, une ville…",
    en: "Search for equipment, a city…",
  },
  "equipment.notFound": { fr: "Équipement non trouvé", en: "Equipment not found" },
  "equipment.notFoundDesc": {
    fr: "L'équipement que vous cherchez n'existe pas ou a été supprimé.",
    en: "The equipment you are looking for does not exist or has been removed.",
  },
  "equipment.backToList": { fr: "Retour aux équipements", en: "Back to equipment" },
  "equipment.deposit": { fr: "Caution", en: "Deposit" },
  "equipment.bookNow": { fr: "Réserver maintenant", en: "Book now" },
  "equipment.bookTitle": { fr: "Réserver {name}", en: "Book {name}" },
  "equipment.bookDesc": {
    fr: "Sélectionnez les dates souhaitées pour votre location",
    en: "Select the dates you need for your rental",
  },
  "equipment.availableDates": { fr: "Dates disponibles", en: "Available dates" },
  "equipment.noDates": {
    fr: "Aucune date disponible pour le moment. Contactez le loueur pour connaître ses prochaines disponibilités.",
    en: "No dates available right now. Contact the owner for upcoming availability.",
  },
  "equipment.pricePerDay": { fr: "Prix par jour", en: "Price per day" },
  "equipment.numberOfDays": { fr: "Nombre de jours", en: "Number of days" },
  "equipment.depositRefundable": { fr: "Caution (remboursable)", en: "Deposit (refundable)" },
  "equipment.confirmBooking": { fr: "Confirmer la réservation", en: "Confirm booking" },
  "equipment.about": { fr: "À propos de cet équipement", en: "About this equipment" },
  "equipment.deliveryOnRequest": { fr: "Disponible sur demande", en: "Available on request" },
  "equipment.insuranceIncluded": { fr: "Assurance incluse", en: "Insurance included" },
  "equipment.basicProtection": { fr: "Protection de base", en: "Basic protection" },
  "equipment.respondsIn": { fr: "Répond en {time}", en: "Responds in {time}" },
  "equipment.contactOwner": { fr: "Contacter le loueur", en: "Contact the owner" },
  "equipment.specifications": { fr: "Spécifications", en: "Specifications" },
  "equipment.features": { fr: "Caractéristiques", en: "Features" },
  "equipment.reviews": { fr: "Avis", en: "Reviews" },
  "equipment.questions": { fr: "Questions", en: "Questions" },
  "equipment.insurance": { fr: "Assurance", en: "Insurance" },
  "equipment.customerReviews": { fr: "{count} avis clients", en: "{count} customer reviews" },
  "equipment.stars": { fr: "{count} étoiles", en: "{count} stars" },
  "equipment.noReviews": { fr: "Aucun avis pour cet équipement", en: "No reviews for this equipment" },
  "equipment.leaveReview": { fr: "Laisser un avis", en: "Leave a review" },
  "equipment.noQuestions": {
    fr: "Aucune question pour cet équipement",
    en: "No questions for this equipment",
  },
  "equipment.askQuestion": { fr: "Poser une question", en: "Ask a question" },
  "equipment.ownerAnswer": { fr: "Réponse du loueur :", en: "Owner's answer:" },
  "equipment.insuranceNote": {
    fr: "L'assurance de base est incluse dans le prix de la location. Des options supplémentaires peuvent être souscrites lors de la finalisation de votre réservation.",
    en: "Basic insurance is included in the rental price. Additional options can be added when finalising your booking.",
  },
  "equipment.reducedExcess": { fr: "Franchise réduite", en: "Reduced excess" },
  "equipment.reducedExcessDesc": {
    fr: "Réduisez votre franchise en cas de sinistre de 80%",
    en: "Reduce your excess by 80% in the event of a claim",
  },
  "equipment.fullCoverage": { fr: "Assurance tous risques", en: "Comprehensive insurance" },
  "equipment.fullCoverageDesc": {
    fr: "Couverture complète incluant les dommages accidentels",
    en: "Full coverage including accidental damage",
  },
  "equipment.similar": { fr: "Équipements similaires", en: "Similar equipment" },
  "equipment.bookingSent": { fr: "Réservation en cours", en: "Booking in progress" },
  "equipment.bookingSentDesc": {
    fr: "Demande de réservation envoyée pour {count} jour(s)",
    en: "Booking request sent for {count} day(s)",
  },
  "equipment.selectDateError": {
    fr: "Veuillez sélectionner au moins une date",
    en: "Please select at least one date",
  },

  // ------------------------------------------------------------------ Matériaux
  "materials.gridTitle": {
    fr: "Matériaux de construction de qualité",
    en: "Quality construction materials",
  },
  "materials.gridSubtitle": {
    fr: "Commandez du sable, ciment, béton et autres matériaux directement auprès de nos fournisseurs certifiés",
    en: "Order sand, cement, concrete and more directly from our certified suppliers",
  },
  "materials.categories": { fr: "Catégories de matériaux", en: "Material categories" },
  "materials.count": {
    fr: "{count} matériau(x) disponible(s)",
    en: "{count} material(s) available",
  },
  "materials.noResults": {
    fr: "Aucun matériau ne correspond à votre recherche.",
    en: "No material matches your search.",
  },
  "materials.searchPlaceholder": { fr: "Rechercher un matériau…", en: "Search for a material…" },
  "materials.addToCart": { fr: "Ajouter au panier", en: "Add to cart" },
  "materials.add": { fr: "Ajouter", en: "Add" },
  "materials.buyNow": { fr: "Acheter maintenant", en: "Buy now" },
  "materials.addedToCart": { fr: "Ajouté au panier", en: "Added to cart" },
  "materials.addedToCartDesc": {
    fr: "{quantity} {unit} de {name} ajouté au panier",
    en: "{quantity} {unit} of {name} added to cart",
  },
  "materials.outOfStock": {
    fr: "Ce matériau est actuellement en rupture de stock.",
    en: "This material is currently out of stock.",
  },
  "materials.notFound": { fr: "Matériau non trouvé", en: "Material not found" },
  "materials.notFoundDesc": {
    fr: "Le matériau que vous cherchez n'existe pas ou a été supprimé.",
    en: "The material you are looking for does not exist or has been removed.",
  },
  "materials.backToList": { fr: "Retour aux matériaux", en: "Back to materials" },
  "materials.stock": { fr: "Stock", en: "Stock" },
  "materials.minQuantity": { fr: "Quantité min.", en: "Min. quantity" },
  "materials.description": { fr: "Description", en: "Description" },
  "materials.soldBy": { fr: "Vendu et expédié par {supplier}", en: "Sold and shipped by {supplier}" },
  "materials.deliveryVariable": {
    fr: "Délais et tarifs variables",
    en: "Variable lead times and rates",
  },
  "materials.qualityGuarantee": { fr: "Garantie qualité", en: "Quality guarantee" },
  "materials.certified": { fr: "Matériaux certifiés", en: "Certified materials" },
  "materials.deliveryOptions": { fr: "Options de livraison", en: "Delivery options" },
  "materials.deliveryType": { fr: "Type", en: "Type" },
  "materials.deliveryDelay": { fr: "Délai estimé", en: "Estimated lead time" },
  "materials.deliveryPrice": { fr: "Tarif", en: "Rate" },
  "materials.deliveryNote": {
    fr: "Les délais de livraison sont indicatifs et peuvent varier selon votre zone géographique. Pour une estimation précise, veuillez finaliser votre commande ou nous contacter.",
    en: "Lead times are indicative and may vary by area. For an accurate estimate, complete your order or contact us.",
  },
  "materials.importantInfo": { fr: "Informations importantes", en: "Important information" },
  "materials.info1": {
    fr: "Les matériaux en vrac sont livrés par camion benne et déchargés à l'adresse indiquée.",
    en: "Bulk materials are delivered by tipper truck and unloaded at the given address.",
  },
  "materials.info2": {
    fr: "L'accès au site de livraison doit être adapté pour un camion de grande taille.",
    en: "Site access must be suitable for a large truck.",
  },
  "materials.info3": {
    fr: "La présence d'une personne est requise pour réceptionner la livraison.",
    en: "Someone must be present to receive the delivery.",
  },
  "materials.info4": {
    fr: "Pour des quantités importantes, plusieurs livraisons peuvent être nécessaires.",
    en: "Large quantities may require several deliveries.",
  },
  "materials.noReviews": { fr: "Aucun avis pour ce matériau", en: "No reviews for this material" },
  "materials.related": { fr: "Produits associés", en: "Related products" },
  "materials.customTitle": { fr: "Besoin d'une quantité spécifique ?", en: "Need a specific quantity?" },
  "materials.customDesc": {
    fr: "Notre équipe est à votre disposition pour vous aider à calculer les quantités exactes nécessaires pour votre projet et vous proposer les meilleurs prix pour les commandes en gros.",
    en: "Our team can help you work out the exact quantities your project needs and offer the best prices for bulk orders.",
  },
  "materials.contactAdvisor": { fr: "Contacter un conseiller", en: "Contact an advisor" },
  "materials.requestQuote": { fr: "Demander un devis personnalisé", en: "Request a custom quote" },

  // --------------------------------------------------------------------- Panier
  "cart.title": { fr: "Votre panier", en: "Your cart" },
  "cart.empty": { fr: "Votre panier est vide", en: "Your cart is empty" },
  "cart.emptyDesc": {
    fr: "Parcourez nos matériaux et ajoutez-les à votre panier",
    en: "Browse our materials and add them to your cart",
  },
  "cart.seeMaterials": { fr: "Voir les matériaux", en: "See materials" },
  "cart.clear": { fr: "Vider le panier", en: "Empty cart" },
  "cart.supplier": { fr: "Fournisseur", en: "Supplier" },
  "cart.summary": { fr: "Récapitulatif", en: "Summary" },
  "cart.checkout": { fr: "Commander", en: "Checkout" },
  "cart.continue": { fr: "Continuer les achats", en: "Continue shopping" },

  // ------------------------------------------------------------------ Commande
  "checkout.title": { fr: "Validation de commande", en: "Checkout" },
  "checkout.backToCart": { fr: "Retour au panier", en: "Back to cart" },
  "checkout.shippingAddress": { fr: "Adresse de livraison", en: "Delivery address" },
  "checkout.recipient": { fr: "Destinataire", en: "Recipient" },
  "checkout.recipientPlaceholder": {
    fr: "Nom et prénom ou raison sociale",
    en: "Full name or company name",
  },
  "checkout.street": { fr: "Adresse du chantier", en: "Site address" },
  "checkout.postalCode": { fr: "Code postal", en: "Postcode" },
  "checkout.city": { fr: "Ville", en: "City" },
  "checkout.phone": { fr: "Téléphone", en: "Phone" },
  "checkout.notes": { fr: "Consignes d'accès (facultatif)", en: "Access notes (optional)" },
  "checkout.notesPlaceholder": {
    fr: "Accès camion, horaires de réception, contact sur place…",
    en: "Truck access, receiving hours, on-site contact…",
  },
  "checkout.deliveryMethod": { fr: "Mode de livraison", en: "Delivery method" },
  "checkout.delivery.standard": { fr: "Standard", en: "Standard" },
  "checkout.delivery.standardDelay": { fr: "3 à 5 jours ouvrés", en: "3 to 5 business days" },
  "checkout.delivery.express": { fr: "Express", en: "Express" },
  "checkout.delivery.expressDelay": { fr: "24 heures", en: "24 hours" },
  "checkout.delivery.pickup": { fr: "Retrait sur site", en: "Site pickup" },
  "checkout.delivery.pickupDelay": { fr: "Dès demain", en: "From tomorrow" },
  "checkout.payment": { fr: "Paiement", en: "Payment" },
  "checkout.payment.card": { fr: "Carte bancaire", en: "Credit card" },
  "checkout.payment.cardDetail": { fr: "Visa, Mastercard, CB", en: "Visa, Mastercard, CB" },
  "checkout.payment.transfer": { fr: "Virement bancaire", en: "Bank transfer" },
  "checkout.payment.transferDetail": { fr: "Sous 48h ouvrées", en: "Within 48 business hours" },
  "checkout.demoNotice": {
    fr: "Démonstration : aucun paiement réel n'est effectué et aucune coordonnée bancaire n'est demandée ni stockée.",
    en: "Demo: no real payment is processed and no banking details are requested or stored.",
  },
  "checkout.confirm": { fr: "Confirmer la commande", en: "Place order" },
  "checkout.processing": { fr: "Traitement…", en: "Processing…" },
  "checkout.confirmed": { fr: "Commande confirmée", en: "Order confirmed" },
  "checkout.confirmedDesc": {
    fr: "Votre commande {reference} a bien été enregistrée.",
    en: "Your order {reference} has been recorded.",
  },
  "checkout.error.name": { fr: "Indiquez le nom du destinataire", en: "Enter the recipient's name" },
  "checkout.error.street": { fr: "Indiquez l'adresse du chantier", en: "Enter the site address" },
  "checkout.error.postalCode": {
    fr: "Code postal invalide (5 chiffres)",
    en: "Invalid postcode (5 digits)",
  },
  "checkout.error.city": { fr: "Indiquez la ville", en: "Enter the city" },
  "checkout.error.phone": { fr: "Numéro de téléphone invalide", en: "Invalid phone number" },
  "checkout.error.notes": { fr: "500 caractères maximum", en: "500 characters maximum" },

  // -------------------------------------------------------------- Confirmation
  "confirmation.title": {
    fr: "Merci, votre commande est confirmée",
    en: "Thank you, your order is confirmed",
  },
  "confirmation.reference": {
    fr: "Référence {reference} · passée le {date}",
    en: "Reference {reference} · placed on {date}",
  },
  "confirmation.details": { fr: "Détail de la commande", en: "Order details" },
  "confirmation.tracking": { fr: "Suivi", en: "Tracking" },
  "confirmation.method": { fr: "Mode", en: "Method" },
  "confirmation.estimated": { fr: "Livraison estimée", en: "Estimated delivery" },
  "confirmation.paymentLabel": { fr: "Paiement", en: "Payment" },
  "confirmation.trackOrders": { fr: "Suivre mes commandes", en: "Track my orders" },
  "confirmation.keepShopping": { fr: "Continuer mes achats", en: "Continue shopping" },
  "confirmation.notFound": { fr: "Commande introuvable", en: "Order not found" },
  "confirmation.notFoundDesc": {
    fr: "Cette référence de commande n'existe pas ou n'est plus disponible.",
    en: "This order reference does not exist or is no longer available.",
  },

  // ------------------------------------------------------------ Authentification
  "auth.login": { fr: "Connexion", en: "Login" },
  "auth.register": { fr: "Inscription", en: "Sign up" },
  "auth.name": { fr: "Nom", en: "Name" },
  "auth.namePlaceholder": { fr: "Votre nom", en: "Your name" },
  "auth.email": { fr: "Email", en: "Email" },
  "auth.password": { fr: "Mot de passe", en: "Password" },
  "auth.confirmPassword": { fr: "Confirmer le mot de passe", en: "Confirm password" },
  "auth.forgot": { fr: "Mot de passe oublié ?", en: "Forgot password?" },
  "auth.signIn": { fr: "Se connecter", en: "Sign in" },
  "auth.signUp": { fr: "S'inscrire", en: "Sign up" },
  "auth.noAccount": { fr: "Pas encore de compte ?", en: "No account yet?" },
  "auth.hasAccount": { fr: "Déjà un compte ?", en: "Already have an account?" },
  "auth.iWant": { fr: "Je souhaite", en: "I want to" },
  "auth.role.client": { fr: "Client", en: "Customer" },
  "auth.role.clientDesc": { fr: "Louer du matériel", en: "Rent equipment" },
  "auth.role.owner": { fr: "Loueur", en: "Owner" },
  "auth.role.ownerDesc": { fr: "Proposer vos équipements", en: "List your equipment" },
  "auth.demoTitle": { fr: "Comptes de démonstration", en: "Demo accounts" },
  "auth.demoDesc": {
    fr: "L'authentification est simulée côté client, en attendant le backend.",
    en: "Authentication is simulated client-side until the backend is connected.",
  },
  "auth.demo.client": {
    fr: "Louer du matériel et commander des matériaux",
    en: "Rent equipment and order materials",
  },
  "auth.demo.owner": {
    fr: "Proposer et gérer ses équipements",
    en: "List and manage equipment",
  },
  "auth.demo.admin": { fr: "Administrer la plateforme", en: "Administer the platform" },
  "auth.loginSuccess": { fr: "Connexion réussie", en: "Signed in" },
  "auth.welcome": { fr: "Bienvenue {name} sur BTP Location.", en: "Welcome to BTP Location, {name}." },
  "auth.registerSuccess": { fr: "Inscription réussie", en: "Account created" },
  "auth.registerSuccessDesc": {
    fr: "Votre compte a été créé avec succès.",
    en: "Your account was created successfully.",
  },
  "auth.badCredentials": {
    fr: "Identifiants incorrects. Utilisez un compte de démonstration ci-dessous.",
    en: "Incorrect credentials. Use one of the demo accounts below.",
  },
  "auth.error.email": { fr: "Email invalide", en: "Invalid email" },
  "auth.error.password": {
    fr: "Le mot de passe doit contenir au moins 8 caractères",
    en: "Password must be at least 8 characters",
  },
  "auth.error.name": {
    fr: "Le nom doit contenir au moins 2 caractères",
    en: "Name must be at least 2 characters",
  },
  "auth.error.mismatch": {
    fr: "Les mots de passe ne correspondent pas",
    en: "Passwords do not match",
  },
  "auth.terms": {
    fr: "En vous inscrivant, vous acceptez nos",
    en: "By signing up, you agree to our",
  },
  "auth.termsLink": { fr: "conditions d'utilisation", en: "terms of service" },
  "auth.and": { fr: "et notre", en: "and our" },
  "auth.privacyLink": { fr: "politique de confidentialité", en: "privacy policy" },

  // ------------------------------------------------------------------- Tarifs
  "pricing.badge": { fr: "Tarification", en: "Pricing" },
  "pricing.title1": { fr: "Des plans adaptés à ", en: "Plans tailored to " },
  "pricing.title2": { fr: "chaque besoin", en: "every need" },
  "pricing.subtitle": {
    fr: "Choisissez le forfait qui correspond le mieux à vos besoins en matériel de construction",
    en: "Choose the plan that best fits your construction equipment needs",
  },
  "pricing.monthly": { fr: "Mensuel", en: "Monthly" },
  "pricing.annually": { fr: "Annuel", en: "Annual" },
  "pricing.perMonth": { fr: "/mois", en: "/month" },
  "pricing.billedAnnually": { fr: "facturé annuellement", en: "billed annually" },
  "pricing.forever": { fr: "Pour toujours", en: "Forever" },
  "pricing.mostPopular": { fr: "Le plus populaire", en: "Most popular" },
  "pricing.comparison": { fr: "Comparaison détaillée", en: "Detailed comparison" },
  "pricing.feature": { fr: "Fonctionnalité", en: "Feature" },
  "pricing.faq": { fr: "Questions fréquentes", en: "FAQ" },
  "pricing.customTitle": {
    fr: "Besoin d'une solution sur mesure ?",
    en: "Need a custom solution?",
  },
  "pricing.customDesc": {
    fr: "Contactez notre équipe commerciale pour discuter de vos besoins spécifiques et obtenir une tarification personnalisée.",
    en: "Contact our sales team to discuss your specific needs and get custom pricing.",
  },
  "pricing.customCta": { fr: "Demander un devis personnalisé", en: "Request a custom quote" },

  "plan.free.name": { fr: "Gratuit", en: "Free" },
  "plan.free.desc": {
    fr: "Pour découvrir la plateforme et les petits projets",
    en: "To discover the platform and small projects",
  },
  "plan.free.cta": { fr: "Commencer gratuitement", en: "Start for free" },
  "plan.pro.name": { fr: "Pro", en: "Pro" },
  "plan.pro.desc": {
    fr: "Pour les entrepreneurs et PME du BTP",
    en: "For contractors and SMEs in construction",
  },
  "plan.pro.cta": { fr: "Essayer 14 jours gratuits", en: "Try 14 days free" },
  "plan.enterprise.name": { fr: "Enterprise", en: "Enterprise" },
  "plan.enterprise.desc": {
    fr: "Pour les grandes entreprises avec besoins réguliers",
    en: "For large companies with regular needs",
  },
  "plan.enterprise.cta": { fr: "Contacter les ventes", en: "Contact sales" },

  "feature.catalog": {
    fr: "Accès au catalogue d'équipements",
    en: "Access to equipment catalog",
  },
  "feature.3requests": {
    fr: "Jusqu'à 3 demandes de location par mois",
    en: "Up to 3 rental requests per month",
  },
  "feature.emailSupport": { fr: "Support client par email", en: "Email customer support" },
  "feature.securePayment": { fr: "Paiement sécurisé", en: "Secure payment" },
  "feature.allFree": { fr: "Tout ce qui est inclus dans Gratuit", en: "Everything in Free" },
  "feature.unlimited": { fr: "Demandes de location illimitées", en: "Unlimited rental requests" },
  "feature.priority": { fr: "Réservation prioritaire", en: "Priority booking" },
  "feature.support247": { fr: "Support client 24/7", en: "24/7 customer support" },
  "feature.freeDelivery50": { fr: "Livraison gratuite (< 50km)", en: "Free delivery (< 50km)" },
  "feature.discount10": {
    fr: "Remise de 10% sur toutes les locations",
    en: "10% discount on all rentals",
  },
  "feature.standardInsurance": {
    fr: "Assurance standard incluse",
    en: "Standard insurance included",
  },
  "feature.allPro": { fr: "Tout ce qui est inclus dans Pro", en: "Everything in Pro" },
  "feature.dedicatedManager": { fr: "Gestionnaire de compte dédié", en: "Dedicated account manager" },
  "feature.api": { fr: "API pour intégration", en: "API for integration" },
  "feature.freeDelivery100": { fr: "Livraison gratuite (< 100km)", en: "Free delivery (< 100km)" },
  "feature.discount20": {
    fr: "Remise de 20% sur toutes les locations",
    en: "20% discount on all rentals",
  },
  "feature.premiumInsurance": { fr: "Assurance premium incluse", en: "Premium insurance included" },
  "feature.reports": { fr: "Rapports détaillés et analyses", en: "Detailed reports and analytics" },
  "feature.training": { fr: "Formations personnalisées", en: "Personalized training" },

  "limit.noPriority": { fr: "Pas de réservation prioritaire", en: "No priority booking" },
  "limit.noPremiumInsurance": { fr: "Pas d'assurance premium", en: "No premium insurance" },
  "limit.noFreeDelivery": { fr: "Pas de livraison gratuite", en: "No free delivery" },
  "limit.noDiscounts": { fr: "Pas de remises exclusives", en: "No exclusive discounts" },

  "comp.rentalRequests": { fr: "Demandes de location", en: "Rental requests" },
  "comp.support": { fr: "Support client", en: "Customer support" },
  "comp.freeDelivery": { fr: "Livraison gratuite", en: "Free delivery" },
  "comp.discount": { fr: "Remise sur locations", en: "Rental discount" },
  "comp.priorityBooking": { fr: "Réservation prioritaire", en: "Priority booking" },
  "comp.standardInsurance": { fr: "Assurance standard", en: "Standard insurance" },
  "comp.premiumInsurance": { fr: "Assurance premium", en: "Premium insurance" },
  "comp.api": { fr: "API & intégrations", en: "API & integrations" },
  "comp.reports": { fr: "Rapports & analyses", en: "Reports & analytics" },
  "comp.dedicatedManager": { fr: "Gestionnaire dédié", en: "Dedicated manager" },
  "comp.3perMonth": { fr: "3/mois", en: "3/month" },
  "comp.unlimited": { fr: "Illimitées", en: "Unlimited" },
  "comp.email": { fr: "Email", en: "Email" },
  "comp.247": { fr: "24/7", en: "24/7" },
  "comp.dedicated": { fr: "Dédié", en: "Dedicated" },

  "faq.q1": { fr: "Puis-je changer de plan à tout moment ?", en: "Can I change plans at any time?" },
  "faq.a1": {
    fr: "Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Le changement prend effet immédiatement et la facturation est ajustée au prorata.",
    en: "Yes, you can upgrade or downgrade your plan at any time. The change takes effect immediately and billing is prorated.",
  },
  "faq.q2": {
    fr: "Comment fonctionne l'essai gratuit de 14 jours ?",
    en: "How does the 14-day free trial work?",
  },
  "faq.a2": {
    fr: "L'essai gratuit vous donne accès à toutes les fonctionnalités du plan Pro pendant 14 jours. Aucune carte bancaire n'est requise pour commencer.",
    en: "The free trial gives you access to all Pro plan features for 14 days. No credit card is required to start.",
  },
  "faq.q3": { fr: "Quels moyens de paiement acceptez-vous ?", en: "What payment methods do you accept?" },
  "faq.a3": {
    fr: "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), les virements SEPA et les prélèvements automatiques pour les plans annuels.",
    en: "We accept credit cards (Visa, Mastercard, American Express), SEPA transfers and direct debits for annual plans.",
  },
  "faq.q4": { fr: "Y a-t-il un engagement de durée ?", en: "Is there a commitment period?" },
  "faq.a4": {
    fr: "Non, les plans mensuels sont sans engagement. Les plans annuels bénéficient d'une réduction de 20% et sont facturés annuellement.",
    en: "No, monthly plans are commitment-free. Annual plans benefit from a 20% discount and are billed annually.",
  },
  "faq.q5": {
    fr: "L'assurance est-elle incluse dans tous les plans ?",
    en: "Is insurance included in all plans?",
  },
  "faq.a5": {
    fr: "L'assurance standard est incluse dans le plan Pro. L'assurance premium est incluse uniquement dans le plan Enterprise.",
    en: "Standard insurance is included in the Pro plan. Premium insurance is included only in the Enterprise plan.",
  },

  // ------------------------------------------------------------------- Footer
  "footer.tagline": {
    fr: "BTP Location révolutionne la location d'équipements et l'achat de matériaux pour les professionnels du BTP.",
    en: "BTP Location transforms equipment rental and material purchasing for construction professionals.",
  },
  "footer.explore": { fr: "Explorer", en: "Explore" },
  "footer.company": { fr: "Entreprise", en: "Company" },
  "footer.legal": { fr: "Légal", en: "Legal" },
  "footer.privacy": { fr: "Confidentialité", en: "Privacy" },
  "footer.terms": { fr: "Conditions d'utilisation", en: "Terms of service" },
  "footer.cookies": { fr: "Cookies", en: "Cookies" },
  "footer.rights": { fr: "Tous droits réservés.", en: "All rights reserved." },

  // ------------------------------------------------------------- Footer (suite)
  "footer.services": { fr: "Services", en: "Services" },
  "footer.info": { fr: "Informations", en: "Information" },
  "footer.equipmentRental": { fr: "Location d'équipements", en: "Equipment rental" },
  "footer.materialPurchase": { fr: "Achat de matériaux", en: "Material purchase" },
  "footer.customQuote": { fr: "Devis personnalisé", en: "Custom quote" },
  "footer.newsletter": { fr: "Newsletter", en: "Newsletter" },
  "footer.newsletterDesc": {
    fr: "Recevez nos actualités et offres exclusives",
    en: "Get our news and exclusive offers",
  },
  "footer.emailPlaceholder": { fr: "Votre email", en: "Your email" },
  "footer.newsletterSuccess": { fr: "Inscription réussie !", en: "You are subscribed!" },
  "footer.newsletterSuccessDesc": {
    fr: "Vous êtes maintenant inscrit à notre newsletter.",
    en: "You are now signed up for our newsletter.",
  },
  "footer.privacyPolicy": { fr: "Politique de confidentialité", en: "Privacy policy" },

  // --------------------------------------------------------------------- 404
  "notFound.title": { fr: "Page introuvable", en: "Page not found" },
  "notFound.desc": {
    fr: "La page que vous cherchez n'existe pas ou a été déplacée.",
    en: "The page you are looking for does not exist or has moved.",
  },
  "notFound.home": { fr: "Retour à l'accueil", en: "Back to home" },

  // -------------------------------------------------------------------- Compte
  "account.dashboard": { fr: "Tableau de bord", en: "Dashboard" },
  "account.orders": { fr: "Mes commandes", en: "My orders" },
  "account.history": { fr: "Historique", en: "History" },
  "account.settings": { fr: "Paramètres", en: "Settings" },
  "account.myEquipment": { fr: "Mes équipements", en: "My equipment" },
  "account.currentRentals": { fr: "Locations en cours", en: "Active rentals" },
  "account.income": { fr: "Mes revenus", en: "My income" },
  "account.stats": { fr: "Statistiques", en: "Statistics" },
  "account.users": { fr: "Utilisateurs", en: "Users" },
  "account.equipment": { fr: "Équipements", en: "Equipment" },
  "account.materials": { fr: "Matériaux", en: "Materials" },
  "account.role.admin": { fr: "Admin", en: "Admin" },
  "account.role.owner": { fr: "Loueur", en: "Owner" },
  "account.role.client": { fr: "Client", en: "Customer" },

  // ------------------------------------------------------------------ Général
  "general.language": { fr: "Langue", en: "Language" },
  "general.currency": { fr: "Devise", en: "Currency" },
};
