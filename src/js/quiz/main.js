// Imports statiques des fichiers JSON
import bienveillance from 'src/js/data/bienveillance.json' with { type: 'json' };
import dev from 'src/js/data/dev.json' ;
import rire from 'src/js/data/rire.json' ;

// Objet regroupant toutes les questions
const questions = {
    bienveillance: bienveillance.questions,
    dev: dev.questions,
    rire: rire.questions
};

// Fonction pour charger plusieurs thèmes de questions
function chargerPlusieursQuestions(chemins) {
    try {
        const resultats = chemins.map(chemin => {
            const theme = chemin.split('/').pop().replace('.json', '');
            return questions[theme];
        });
        return resultats;
    } catch (error) {
        console.error('Erreur lors du chargement des questions :', error);
        throw error;
    }
}

// Fonction principale de démarrage
function demarrerJeu() {
    try {
        const themes = ['bienveillance', 'dev', 'rire'];
        const toutesQuestions = chargerPlusieursQuestions(themes);
        poserQuestion(toutesQuestions.flat(), 0);
    } catch (error) {
        console.error('Erreur lors du démarrage du jeu :', error);
        const container = document.getElementById("quiz");
        container.innerHTML = `<div class="erreur">Erreur lors du chargement du jeu : ${error.message}</div>`;
    }
}

// Affiche une question et ses réponses
function poserQuestion(liste, index) {
    const container = document.getElementById("quiz");
    container.innerHTML = ""; // Nettoyer le contenu
    
    if (!liste || !liste[index]) {
        afficherFin();
        return;
    }

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
            <p>Merci d'avoir joué avec humour et bienveillance ✨</p>
        </div>
    `;
}

// Démarrer le jeu quand la page est chargée
document.addEventListener("DOMContentLoaded", demarrerJeu);