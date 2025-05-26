// ce fichier permettra de charger les questions depuis le fichier JSON, affichera les options sous forme de boutons radio et calculera le score une fois le quiz soumis 
// import questions from './dev.json';
// import reponses from './dev.json';
// import bienveillance from './bienveillance.json';


let score = 0; // j'initialise le score et compte le nombre de réponse 

// const questions = await fetch ("dev.json");
// console.dir(questions);
// const reponses = await fetch ("dev.json");
// console.log(reponses);
// const bienveillance = await fetch ("bienveillance.json");
// console.log(bienveillance);
// const boutons = document.querySelector("#bouton");
// console.log(boutons);

    // Charger le fichier JSON avec fetch
    fetch('questions.json')
      .then(response => response.json())
      .then(data => {
        // Récupérer la première question
        const questionObj = data[0];
        
        // Choisir une variante aléatoire de la question
        const randomIndex = Math.floor(Math.random() * questionObj.questionsVariants.length);
        const questionText = questionObj.questionsVariants[randomIndex];
        
        // Afficher la question
        document.getElementById('question').textContent = questionText;
        
        // Afficher les choix de réponses
        const ul = document.getElementById('choices');
        ul.innerHTML = ''; // vider la liste avant d’ajouter
        
        questionObj.choices.forEach(choice => {
          const li = document.createElement('li');
          li.textContent = choice;
          ul.appendChild(li);
        });
      })
      .catch(error => {
        console.error('Erreur lors du chargement du fichier JSON:', error);
      });
