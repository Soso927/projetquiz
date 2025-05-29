// Fonction pour charger les données JSON
async function chargerQuestions(fichier) {
    try {
        const reponse = await fetch(fichier);
        return await reponse.json();
    } catch (erreur) {
        console.error(`Erreur de chargement: ${erreur}`);
        return null;
    }
}

// Fonction pour afficher une question
function afficherQuestion(questionObj) {
    const questionElement = document.getElementById('question');
    const choixElement = document.getElementById('choices');
    
    // Afficher la question
    questionElement.textContent = questionObj.question;
    
    // Créer les boutons radio
    choixElement.innerHTML = '';
    questionObj.choices.forEach((choix, index) => {
        const div = document.createElement('div');
        div.className = 'choix';
        div.innerHTML = `
            <input type="radio" name="reponse" value="${index}" id="choix${index}">
            <label for="choix${index}">${choix}</label>
        `;
        choixElement.appendChild(div);
    });
}

// Initialisation du quiz
async function initialiserQuiz() {
    const donnees = await chargerQuestions('questions.json');
    if (donnees && donnees.length > 0) {
        afficherQuestion(donnees[0]);
    } else {
        console.error('Aucune donnée trouvée');
    }
}

// Démarrer le quiz
initialiserQuiz();