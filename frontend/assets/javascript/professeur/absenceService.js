import { cours, inscriptions, etudiants, utilisateurs } from './data.js';

export function getEtudiantsParClasse(id_classe) {
  const insc = inscriptions.filter(i => i.id_classe === id_classe);
  return insc.map(i => {
    const etu = etudiants.find(e => e.id_etudiant === i.id_etudiant);
    const user = utilisateurs.find(u => u.id_utilisateur === etu.id_utilisateur);
    return { ...etu, ...user };
  });
}

export function enregistrerAbsence(id_etudiant, id_cours, id_marqueur) {
  const abs = JSON.parse(localStorage.getItem("absences")) || [];
  const coursInfo = cours.find(c => c.id_cours === id_cours);
  abs.push({
    id_absence: Date.now(),
    id_etudiant,
    id_cours,
    date_absence: coursInfo.date_cours,
    heure_marquage: new Date().toISOString(),
    id_marqueur
  });
  localStorage.setItem("absences", JSON.stringify(abs));
}

export function afficherAbsences() {
    const dateFilter = document.getElementById('date-filter').value;
    const classeFilter = document.getElementById('classe-filter').value;
    const coursFilter = document.getElementById('cours-filter').value;

    // Filtrer les absences
    const absencesFiltrees = data.absences.filter(absence => {
      const cours = data.cours.find(c => c.id_cours === absence.id_cours);
      const coursClasse = data.cours_classes.find(cc => cc.id_cours === absence.id_cours);
      
      // Vérifier les filtres
      const dateMatch = !dateFilter || absence.date_absence === dateFilter;
      const classeMatch = !classeFilter || (coursClasse && coursClasse.id_classe == classeFilter);
      const coursMatch = !coursFilter || absence.id_cours == coursFilter;
      
      return dateMatch && classeMatch && coursMatch;
    });

    // Afficher les résultats
    const tbody = document.getElementById('absences-body');
    tbody.innerHTML = '';

    if (absencesFiltrees.length === 0) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">Aucune absence trouvée</td>
      `;
      tbody.appendChild(tr);
      return;
    }

    absencesFiltrees.forEach(absence => {
      const etudiant = data.etudiants.find(e => e.id_etudiant == absence.id_etudiant);
      const utilisateur = etudiant ? data.utilisateurs.find(u => u.id_utilisateur == etudiant.id_utilisateur) : null;
      const cours = data.cours.find(c => c.id_cours === absence.id_cours);
      const module = cours ? data.modules.find(m => m.id_module === cours.id_module) : null;
      const coursClasse = cours ? data.cours_classes.find(cc => cc.id_cours === cours.id_cours) : null;
      const classe = coursClasse ? data.classes.find(c => c.id_classe === coursClasse.id_classe) : null;
      const justification = data.justifications.find(j => j.id_absence === absence.id_absence);

      const tr = document.createElement('tr');
      tr.className = 'hover:bg-gray-50';
      tr.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          ${module ? module.libelle : 'Inconnu'}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${classe ? classe.libelle : 'Inconnue'}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="flex items-center">
            <div class="flex-shrink-0 h-10 w-10">
              <img class="h-10 w-10 rounded-full" src="${utilisateur ? utilisateur.avatar : ''}" alt="">
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-900">
                ${utilisateur ? utilisateur.prenom + ' ' + utilisateur.nom : 'Inconnu'}
              </div>
              <div class="text-sm text-gray-500">
                ${etudiant ? etudiant.matricule : ''}
              </div>
            </div>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${absence.date_absence}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          ${justification ? justification.motif : 'Non justifiée'}
        </td>
      `;
      tbody.appendChild(tr);
    });
  }
