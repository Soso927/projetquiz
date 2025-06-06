document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("#choix-theme button");
  const quizContainer = document.getElementById("quiz-container");

  let currentQuestions = [];
  let currentQuestionIndex = 0;

  buttons.forEach(button => {
    button.addEventListener("click", async () => {
      const theme = button.dataset.theme;
      const data = await fetchQuizData(theme);
      if (data && data.questions && data.questions.length > 0) {
        currentQuestions = data.questions;
        currentQuestionIndex = 0;
        afficherQuestion(currentQuestions[currentQuestionIndex]);
      } else {
        quizContainer.innerHTML = "<p>Désolé, aucune question disponible pour ce thème.</p>";
      }
    });
  });

  async function fetchQuizData(theme) {
    try {
      const filePath = `./src/js/data/${theme}.json`;
      const response = await fetch(filePath);
      if (!response.ok) throw new Error(`Erreur HTTP ! statut : ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors du chargement des données pour le thème "${theme}" :`, error);
      return null;
    }
  }

  function afficherQuestion(questionObj) {
    if (!questionObj || !Array.isArray(questionObj.answers)) {
      quizContainer.innerHTML = "<p>Erreur : données de question invalides.</p>";
      return;
    }

    let html = `<div class="question"><strong>Question :</strong> ${questionObj.question}</div>`;
    html += `<div class="choices">`;

    questionObj.answers.forEach(answer => {
      html += `<button class="choice-btn">${answer}</button>`;
    });

    html += `</div><div id="feedback"></div>`;

    quizContainer.innerHTML = html;

    const choiceButtons = quizContainer.querySelectorAll(".choice-btn");
    choiceButtons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        verifierReponse(index, questionObj.correct, questionObj.answers);
      });
    });
  }

  function verifierReponse(indexUtilisateur, indexCorrect, answers) {
    const feedback = document.getElementById("feedback");
    if (indexUtilisateur === indexCorrect) {
      feedback.textContent = "Félicitations ! 🎉";
    } else {
      feedback.textContent = `Perdu... 😞 La bonne réponse était : "${answers[indexCorrect]}"`;
    }

    const buttons = quizContainer.querySelectorAll(".choice-btn");
    buttons.forEach(b => b.disabled = true);

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
