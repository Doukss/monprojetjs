import {
    getAllCours,
  getCourById,
} from "../../../services/profServices.js";
import { handleNotifications } from "../../../store/notificationStore.js";

document.addEventListener("DOMContentLoaded", async () => {
    handleNotifications();
    console.log(await getAllCours());
    console.log(await getCourById(1));
    
    // Ajouter l'écouteur d'événement
    document.getElementById('btnVoirClasse').addEventListener('click', () => {
      voirClasse("nomClasse"); // Remplacez par le nom réel
    });
  });



 function voirClasse(nomClasse) {
    document.getElementById('classeNom').textContent = nomClasse;
    document.getElementById('classeSection').classList.remove('hidden');
  }
