// La Quête du Code – Quiz interactif
// Fichier : main.js

// Lorsque la page est chargée
document.addEventListener("DOMContentLoaded", () => {
  demarrerJeu();
});

async function chargerPlusieursQuestions(chemins) {
  try {
    const promesses = chemins.map(chemin =>
      fetch(chemin)
        .then(response => response.json())
        .then(data => data.questions) // 🔥 ajout clé ici
        .catch(error => {
          console.error(`Erreur lors du chargement de ${chemin}:`, error);
          throw error;
        })
    );

    return await Promise.all(promesses);
  } catch (error) {
    console.error('Erreur globale lors du chargement :', error);
    throw error;
  }
}

// async function demarrerJeu() {
//   const questions = await chargerQuestions("[src/js/data/bienveillance.json ,src/js/data/dev.json,src/js/data/rire.json"); // Modifier le chemin si besoin
//   poserQuestion(questions, 0);
// }

// Charger les questions depuis un fichier JSON
async function chargerQuestions(fichier) {
  const reponse = await fetch(fichier);
  const data = await reponse.json();
  return data;
}

// Affiche une question et ses réponses
function poserQuestion(liste, index) {
  const container = document.getElementById("quiz");
  container.innerHTML = ""; // Nettoyer le contenu

  const question = liste[index];

  // Titre de la question
  const h2 = document.createElement("h2");
  h2.textContent = question.question;
  container.appendChild(h2);

  // Boucle sur les réponses possibles
  question.reponses.forEach((texte, i) => {
    const bouton = document.createElement("button");
    bouton.className = "reponse";
    bouton.textContent = texte;
    bouton.addEventListener("click", () => {
      const estBonne = i === question.bonne_reponse;
      if (estBonne) {
        alert("✅ Bonne réponse !");
      } else {
        alert("❌ Raté !");
      }

      // Passer à la question suivante ou terminer
      if (index + 1 < liste.length) {
        poserQuestion(liste, index + 1);
      } else {
        afficherFin();
      }
    });
    container.appendChild(bouton);
  });
}

// Affiche un message de fin de quiz
function afficherFin() {
  const container = document.getElementById("quiz");
  container.innerHTML = `
    <div class="resultats">
      <h2>🎉 Bravo ! Tu as terminé La Quête du Code !</h2>
      <p>Merci d’avoir joué avec humour et bienveillance ✨</p>
    </div>
  `;
}