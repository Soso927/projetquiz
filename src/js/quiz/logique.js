document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("#choix-theme button");
    const quizContainer = document.getElementById("quiz-container");
    let currentQuestions = [];
    let currentQuestionIndex = 0;

    // Ne pas appeler afficherQuestion sans argument ici (questionObj undefined)
    // afficherQuestion();  <-- supprimé

    buttons.forEach(button => {
        button.addEventListener("click", async () => {
            const theme = button.dataset.theme;
            console.log(theme);
            const url = `src/js/data/${theme}.json`;
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Erreur lors du chargement des données");
                const data = await response.json();
                console.log(data);

                if (data && data.questions && data.questions.length > 0) {
                    currentQuestions = data.questions;
                    currentQuestionIndex = 0;
                    afficherQuestion(currentQuestions[currentQuestionIndex]);
                } else {
                    quizContainer.innerHTML = "<p>Désolé, aucune question disponible pour ce thème.</p>";
                }
            } catch (error) {
                quizContainer.innerHTML = `<p>Erreur : ${error.message}</p>`;
            }
        });
    });

    function afficherQuestion(questionObj) {
        const question = document.querySelector('#question');
        const reponses = document.querySelector('#answers');
        question.textContent = questionObj.question;
        reponses.innerHTML = '';

        questionObj.reponses.forEach((reponse, index) => {
            const li = document.createElement('li');
            li.textContent = reponse;
            li.setAttribute("data-index", index);
            li.classList.add("choice-btn"); // pour pouvoir désactiver plus tard
            reponses.appendChild(li);

            // Ajout de l'écouteur ici pour chaque réponse
            li.addEventListener("click", () => {
                verifierReponse(index, questionObj.correct, questionObj.reponses);
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

        const buttons = document.querySelectorAll(".choice-btn");
        buttons.forEach(b => b.disabled = true);

        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < currentQuestions.length) {
                afficherQuestion(currentQuestions[currentQuestionIndex]);
                feedback.textContent = ""; // reset feedback
            } else {
                quizContainer.innerHTML = "<p>🎯 Bravo, vous avez terminé ce thème de La Quête du Code !</p>";
            }
        }, 2000);
    }
});
