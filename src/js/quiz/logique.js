const questions = [
        {
        "id": 1,
        "question": "Qu'est-ce que le HTML ?",
        "type": "text",
        "answer": "Le HTML (Hypertext Markup Language en français langage de balise de l'hypertext) est le langage de base du web."
    },
    {
        "id": 2,
        "question": "À quoi sert-il le HTML ?",
        "type": "text",
        "answer": "il sert à structurer le contenu d'une page (titres, paragraphes, images,liens,etc.).",
        "correcte": true
    },
    {
        "id": 3,
        "question": "Que veut dire CSS ?",
        "type": "text",
        "answer": "Cascading Style sheets ou feuille de style en cascade en français"
    },
    {
        "id": 4,
        "question": "À quoi sert le CSS ?",
        "type": "text",
        "answer": "Le CSS sert à styliser le HTML : couleurs,polices,tailles,marges,positionnement,etc. Il sépare le contenu (HTML) de la présentation (CSS).",
        "correcte":true
    },
    {
        "id": 5,
        "question": "Quel est l'élement HTML utilisé pour insérer une image dans une page web ?",
        "type": "multiple",
        "choices": ["<img>", "<picture>", "<image>", "<imagefile>"],
        "answer": "<img>",
        "correcte": true
    },
    {
        "id": 6,
        "question": "Que fait la balise <p> en HTML ?",
        "type": "multiple",
        "choices": [""],
        "answer": "<img>",
        "correcte": true
    },
    {
        "id": 7,
        "question": "Quelle balise HTML est utilisée pour créer un lien hypertexte ?",
        "type": "multiple",
        "choices": ["<a>, <p>, <h1>, <h3>"],
        "answer": "<a>",
        "correcte": true
    },
    {
        "id": 8,
        "question": "quelle propriété CSS est utilisées pour changer de couleur de fond d'un élément ?",
        "type": "multiple",
        "choices": ["'color', 'background-color', 'border-color','text-color'"],
        "answer": "background-color",
        "correcte": true
    },
    {
        "id": 9,
        "question": "Quel est l'effet de la propriété CSS 'text-align ?",
        "type": "multiple",
        "choices": ["'Aligner le texte verticalement','aligner le texte horizontalement', 'Modifier la couleur du texte', 'Appliquer une ombre au texte'"],
        "answer": "Aligner le texte horizontalement",
        "correcte": true
    },
    {
        "id": 10,
        "question": "Quelle balise HTML est utilisée pour définir un titre de niveau 1 sur une page ?",
        "type": "multiple",
        "choices": ["<header> , <h1>, <title>, <h6>"],
        "answer": "<h1>",
        "correcte": true
    }

]
console.log(questions);
let currentQuestionIndex = 0;
let score = 0;

const quizcontainer = document.getElementById('quiz-container');
const themeButtons = document.querySelectorAll('#choix-theme button');

// async function chargerQuestions(){
//     try {
//         await new Promise(resolve => setTimeout (resolve,500));
//         return questions ;
//     } catch (erreur) {
//         console.error('Erreur lors du chargement du questions :', erreur);
//         throw erreur;
//     }
// }


function afficherQuestion(question) {
    const questionElement = document.createElement('div');
    questionElement.className = 'question-container';
    
    if (question.type === 'multiple') {
        questionElement.innerHTML = `
            <h3>${question.question}</h3>
            <div class="choices">
                ${question.choices.map(choice => `
                    <label>
                        <input type="radio" name="reponse-${question.id}" value="${choice}">
                        ${choice}
                    </label>
                `).join('')}
            </div>
        `;
    } else {
        questionElement.innerHTML = `
            <h3>${question.question}</h3>
            <textarea class="reponse-texte"></textarea>
        `;
    }
    
    return questionElement;
}
console.log(afficherQuestion);