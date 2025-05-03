/**
 * Crée une bannière moderne et réutilisable pour les différentes sections de l'application
 * @param {Object} config - Configuration de la bannière
 * @param {string} config.title - Titre principal de la bannière
 * @param {string} config.subtitle - Sous-titre descriptif
 * @param {string} config.imageUrl - URL de l'image à afficher
 * @param {string} config.altText - Texte alternatif pour l'image
 * @param {string} [config.bgColor='bg-white'] - Couleur de fond
 * @param {string} [config.textColor='text-gray-800'] - Couleur du texte
 * @param {boolean} [config.showBadge=false] - Afficher un badge optionnel
 * @param {string} [config.badgeText=''] - Texte du badge
 * @param {string} [config.badgeColor='bg-blue-100 text-blue-800'] - Couleur du badge
 * @param {boolean} [config.showAction=false] - Afficher un bouton d'action
 * @param {string} [config.actionText=''] - Texte du bouton d'action
 * @param {Function} [config.onActionClick] - Callback pour le bouton d'action
 * @param {string} [config.icon] - Icône optionnelle (classe RemixIcon)
 * @returns {HTMLElement} L'élément bannière
 */
export function createModernBanner(config) {
  // Configuration avec valeurs par défaut
  const {
    title = "Titre par défaut",
    subtitle = "Description par défaut",
    imageUrl = "",
    altText = "",
    bgColor = "bg-white",
    textColor = "text-gray-800",
    showBadge = false,
    badgeText = "",
    showAction = false,
    actionText = "",
    onActionClick = null,
    icon = "ri-user-line" // Icône par défaut
  } = config;

  // Création des éléments
  const banner = document.createElement("div");
  banner.className = `flex items-center gap-4 p-4 rounded-xl ${bgColor} shadow-md`;
  
  // Partie image/icône
  const imgBox = document.createElement("div");
  imgBox.className = "w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center";
  
  if (imageUrl) {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = altText;
    img.className = "w-full h-full object-cover rounded-full";
    imgBox.appendChild(img);
  } else {
    const iconEl = document.createElement("i");
    iconEl.className = `${icon} text-2xl text-blue-500`;
    imgBox.appendChild(iconEl);
  }

  // Partie texte
  const textBox = document.createElement("div");
  textBox.className = "flex-1";
  
  const titleEl = document.createElement("h2");
  titleEl.className = `font-semibold ${textColor}`;
  titleEl.textContent = title;
  
  const subtitleEl = document.createElement("p");
  subtitleEl.className = "text-sm text-gray-600";
  subtitleEl.textContent = subtitle;
  
  textBox.append(titleEl, subtitleEl);

  // Badge optionnel
  if (showBadge) {
    const badge = document.createElement("span");
    badge.className = "ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full";
    badge.textContent = badgeText;
    titleEl.appendChild(badge);
  }

  // Bouton optionnel
  if (showAction) {
    const btn = document.createElement("button");
    btn.className = "mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition";
    btn.textContent = actionText;
    if (onActionClick) btn.addEventListener("click", onActionClick);
    textBox.appendChild(btn);
  }

  // Assemblage final
  banner.append(imgBox, textBox);
  return banner;
}

/**
 * Crée une bannière illustrée avec un fond à motif, un titre, un sous-titre et une image flottante
 * @param {Object} config - Configuration de la bannière
 * @param {string} config.title - Titre principal
 * @param {string} config.subtitle - Sous-titre descriptif
 * @param {string} config.illustrationUrl - URL de l'image illustrative
 * @param {string} [config.bgColor='bg-blue-50'] - Couleur de fond principale
 * @param {string} [config.pattern='bg-dots'] - Classe Tailwind pour motif (ex: 'bg-dots', 'bg-grid')
 * @param {string} [config.textColor='text-gray-900'] - Couleur du texte
 * @param {string} [config.altText='Illustration'] - Texte alternatif de l’image
 * @returns {HTMLElement} Élément de la bannière
 */
export function createIllustratedBanner(config) {
  const {
    title = "Titre par défaut",
    subtitle = "Description par défaut",
    illustrationUrl = "",
    bgColor = "bg-blue-50",
    textColor = "text-gray-900",
    altText = "Illustration"
  } = config;

  const banner = document.createElement("div");
  banner.className = `relative rounded-xl p-6 ${bgColor} shadow-sm overflow-hidden`;
  
  const textBox = document.createElement("div");
  textBox.className = "relative z-10 max-w-md";
  
  const titleEl = document.createElement("h1");
  titleEl.className = `text-2xl font-bold ${textColor} mb-2`;
  titleEl.textContent = title;
  
  const subtitleEl = document.createElement("p");
  subtitleEl.className = `text-md ${textColor} opacity-80`;
  subtitleEl.textContent = subtitle;
  
  textBox.append(titleEl, subtitleEl);
  
  if (illustrationUrl) {
    const img = document.createElement("img");
    img.src = illustrationUrl;
    img.alt = altText;
    img.className = "absolute right-4 bottom-0 h-5/6";
    banner.appendChild(img);
  }

  banner.appendChild(textBox);
  return banner;
}
