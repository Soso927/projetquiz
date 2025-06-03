document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("#choix-theme button");
  const quizContainer = document.getElementById("quiz-container");

  let currentQuestions = [];
  let currentQuestionIndex = 0;

  buttons.forEach(button => {
    button.addEventListener("click", async () => {
      const theme = button.dataset.theme;
      const data = await fetchQuizData(theme);
      if (data && data.length > 0) {
        currentQuestions = data;
        currentQuestionIndex = 0;
        afficherQuestion(currentQuestions[currentQuestionIndex]);
      } else {
        quizContainer.innerHTML = "<p>Désolé, aucune question disponible pour ce thème.</p>";
      }
    });
  });

  async function fetchQuizData(theme) {
    try {
      // Assure-toi que tes fichiers sont bien dans ./src/js/ et que le nom correspond au data-theme des boutons
      const filePath = `./src/js/data/${theme}.json`;
      const response = await fetch(filePath);
      if (!response.ok) throw new Error(`Erreur HTTP ! statut : ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Erreur : les données sont parties en pause café. Le thème devra attendre. ${theme} :`, error);
      return null;
    }
  }

  function afficherQuestion(questionObj) {
    // Exemple de structure JSON attendue :
    // {
    //   "question": "Quelle est la capitale de la France ?",
    //   "choices": ["Paris", "Lyon", "Marseille", "Bordeaux"],
    //   "answer": "Paris"
    // }

    let html = `<div class="question"><strong>Question :</strong> ${questionObj.question}</div>`;
    html += `<div class="choices">`;

    questionObj.choices.forEach(choice => {
      html += `<button class="choice-btn">${choice}</button>`;
    });

    html += `</div><div id="feedback"></div>`;

    quizContainer.innerHTML = html;

    // Ajouter event listener à chaque bouton réponse
    const choiceButtons = quizContainer.querySelectorAll(".choice-btn");
    choiceButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        verifierReponse(btn.textContent, questionObj.answer);
      });
    });
  }

  function verifierReponse(reponseUtilisateur, bonneReponse) {
    const feedback = document.getElementById("feedback");
    if (reponseUtilisateur === bonneReponse) {
      feedback.textContent = "Félicitations ! 🎉";
    } else {
      feedback.textContent = "Perdu... 😞";
    }

    // Désactiver les boutons pour éviter plusieurs réponses
    const buttons = quizContainer.querySelectorAll(".choice-btn");
    buttons.forEach(b => b.disabled = true);

    // Après 2 secondes, passer à la question suivante ou finir
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < currentQuestions.length) {
        afficherQuestion(currentQuestions[currentQuestionIndex]);
      } else {
        quizContainer.innerHTML = "<p>🎯 Bravo, vous avez terminé ce thème de La Quête du Code !</p>";
      }
    }, 2000);
  }
});
