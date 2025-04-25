import { filtrerCoursParDate, getCoursParProf } from "../assets/javascript/professeur/courService.js";
import { fetchData } from "./apiService.js";

// export async function getAllCours() {
//   try {
//     const cours = await fetchData("cours");
//     const courClass = document.getElementById("courClass");
//     return cours;
//   } catch (error) {
//     console.log(error);
//   }
// }

const courClass = document.getElementById("courClass");
const id_utilisateur_connecte = 1; // Exemple de prof connecté
let listeCours = getCoursParProf(id_utilisateur_connecte);

// Fonction pour afficher les cours dans le conteneur `#courClass`
function afficherCoursDansHTML(cours) {
  courClass.innerHTML = ""; // On vide le contenu précédent

  cours.forEach(c => {
    const div = document.createElement("div");
    div.className = "p-4 bg-white rounded shadow";

    div.innerHTML = `
      <h3 class="text-lg font-bold">${c.intitule}</h3>
      <p>Classe : ${c.classe}</p>
      <p>Date : ${c.date_cours}</p>
      <button class="mt-2 bg-blue-500 text-white px-3 py-1 rounded" onclick="afficherEtudiants(${c.id_cours}, ${id_utilisateur_connecte})">Voir les étudiants</button>
    `;

    courClass.appendChild(div);
  });
}

// Affichage initial
afficherCoursDansHTML(listeCours);

// Filtrage par date
document.getElementById("filtreDate").addEventListener("change", (e) => {
  const date = e.target.value;
  const coursFiltres = filtrerCoursParDate(listeCours, date);
  afficherCoursDansHTML(coursFiltres);
});


export async function getCourById(id) {
  try {
    const cours = await fetchData("cours");
    const validCours = cours.find((u) => u.id_cours == id);
    return validCours;
  } catch (error) {
    console.log(error);
  }
}


