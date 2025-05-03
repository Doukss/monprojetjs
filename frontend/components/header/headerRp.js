/**
 * Crée un header responsive pour l'interface Responsable Pédagogique
 * @param {Object} config - Configuration du header
 * @param {string} config.currentPage - Page actuelle
 * @param {string} config.userName - Nom de l'utilisateur
 * @param {number} config.currentYear - Année académique en cours
 * @param {Function} [config.onThemeChange] - Callback pour changer de thème
 * @param {Function} [config.onMenuClick] - Callback pour ouvrir le sidebar
 * @returns {HTMLElement} L'élément header
 */
export function createResponsiveRPHeader(config) {
  const {
    currentPage = "Tableau de bord",
    userName = "Responsable Pédagogique",
    currentYear = new Date().getFullYear(),
    onThemeChange = () => {},
    onMenuClick = () => openSidebar(),
  } = config;

  // Création du header
  const header = document.createElement("header");
  header.className =
    " shadow-md py-3 rounded px-4 sm:px-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-700";

  // Partie gauche (Menu burger + Fil d'Ariane)
  const leftSection = document.createElement("div");
  leftSection.className = "flex items-center space-x-4";

  // Bouton menu (visible uniquement sur mobile/tablette)
  const menuButton = document.createElement("button");
  menuButton.className =
    "lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors";
  menuButton.innerHTML = '<i class="ri-dashboard-line text-xl"></i>';
  menuButton.addEventListener("click", onMenuClick);

  // Conteneur pour le fil d'Ariane et message
  const breadcrumbContainer = document.createElement("div");
  breadcrumbContainer.className = "flex flex-col";

  // Fil d'Ariane
  const breadcrumb = document.createElement("div");
  breadcrumb.className = "flex items-center text-sm text-gray-600";
  breadcrumb.innerHTML = `
    <a href="/frontend/pages/rp/dashboard.html" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center">
      <i class="ri-home-4-line mr-2"></i>Accueil
    </a>
    <span class="mx-2 text-gray-400 dark:text-gray-500">/</span>
    <span class="text-gray-800 dark:text-gray-200 font-medium flex items-center">
      ${
        currentPage.includes("cours")
          ? '<i class="ri-calendar-todo-line mr-2"></i>'
          : ""
      }
      ${
        currentPage.includes("classes")
          ? '<i class="ri-team-line mr-2"></i>'
          : ""
      }
      ${
        currentPage.includes("crofesseurs")
          ? '<i class="ri-user-3-line mr-2"></i>'
          : ""
      }
      ${currentPage}
    </span>
  `;

  // Message de bienvenue (caché sur mobile)
  const welcomeMsg = document.createElement("h1");
  welcomeMsg.className = "text-lg font-medium text-gray-300 hidden lg:flex";
  welcomeMsg.textContent = `Espace administrateur, ${userName}`;

  breadcrumbContainer.appendChild(breadcrumb);
  breadcrumbContainer.appendChild(welcomeMsg);

  leftSection.appendChild(menuButton);
  leftSection.appendChild(breadcrumbContainer);

  // Partie droite (Année + Thème)
  const rightSection = document.createElement("div");
  rightSection.className = "flex items-center space-x-4";

  // Affichage de l'année académique
  const yearContainer = document.createElement("div");
  yearContainer.className =
    "flex items-center text-sm bg-gray-100 dark:bg-gray-500 rounded px-3 py-1";
  yearContainer.innerHTML = `
    <i class="ri-calendar-line text-gray-600 dark:text-gray-300 mr-2"></i>
    <span class="text-gray-800 dark:text-gray-200 font-medium">${currentYear}-${
    currentYear + 1
  }</span>
  `;

  // Bouton de changement de thème
  const themeButton = document.createElement("button");
  themeButton.className =
    "p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors text-gray-600 dark:text-gray-300";
  ;
  themeButton.addEventListener("click", onThemeChange);

  rightSection.appendChild(yearContainer);
  rightSection.appendChild(themeButton);

  // Assemblage final
  header.appendChild(leftSection);
  header.appendChild(rightSection);

  return header;
}

function openSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.remove("-translate-x-full");
}
