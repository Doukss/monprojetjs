import { professeurs, cours, cours_classes, classes, utilisateurs } from './data.js';

export function getCoursParProf(id_utilisateur) {
  const prof = professeurs.find(p => p.id_utilisateur === id_utilisateur);
  if (!prof) return [];

  return cours
    .filter(c => c.id_professeur === prof.id_professeur)
    .map(c => {
      const lienClasse = cours_classes.find(cc => cc.id_cours === c.id_cours);
      const nomClasse = classes.find(cl => cl.id_classe === lienClasse?.id_classe)?.libelle || 'Inconnue';
      return { ...c, classe: nomClasse };
    });
}

export function filtrerCoursParDate(cours, date) {
  return cours.filter(c => c.date_cours === date);
}
