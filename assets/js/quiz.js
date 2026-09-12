/* Eenvoudige meerkeuze-quiz engine.
   Gebruik: buildQuiz(document.getElementById('quiz-1'), { questions: [...] })
   Elke vraag: { q: "...", options: ["a","b","c"], correct: 0, explain: "..." }
*/
function buildQuiz(container, config) {
  const questions = config.questions;
  let current = 0;
  let score = 0;
  let answered = false;

  function render() {
    const q = questions[current];
    const pct = Math.round((current / questions.length) * 100);

    container.innerHTML = `
      <div class="quiz-progress">Vraag ${current + 1} van ${questions.length}</div>
      <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
      <div class="quiz-question">${q.q}</div>
      ${q.img ? `<img src="${q.img}" alt="" style="border-radius:10px;margin-bottom:16px;border:1px solid #e6e0d3;">` : ""}
      <div class="quiz-options">
        ${q.options.map((opt, i) => `<button class="quiz-option" data-i="${i}">${opt}</button>`).join("")}
      </div>
      <div class="quiz-feedback"></div>
      <div class="quiz-footer">
        <span></span>
        <button class="btn" id="quiz-next" style="display:none;">Volgende</button>
      </div>
    `;

    answered = false;
    const optionButtons = container.querySelectorAll(".quiz-option");
    optionButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        const chosen = parseInt(btn.dataset.i, 10);
        const feedback = container.querySelector(".quiz-feedback");
        optionButtons.forEach(b => (b.disabled = true));

        if (chosen === q.correct) {
          btn.classList.add("correct");
          score++;
          feedback.classList.add("show", "good");
          feedback.textContent = q.explain ? "🎉 Juist! " + q.explain : "🎉 Juist!";
        } else {
          btn.classList.add("incorrect");
          optionButtons[q.correct].classList.add("correct");
          feedback.classList.add("show", "bad");
          feedback.textContent = q.explain ? "🤔 Niet juist. " + q.explain : "🤔 Niet juist.";
        }

        const nextBtn = container.querySelector("#quiz-next");
        nextBtn.style.display = "inline-block";
        nextBtn.textContent = current === questions.length - 1 ? "Resultaat" : "Volgende";
        nextBtn.addEventListener("click", () => {
          current++;
          if (current < questions.length) {
            render();
          } else {
            renderScore();
          }
        }, { once: true });
      });
    });
  }

  function renderScore() {
    const pct = Math.round((score / questions.length) * 100);
    let msg = "Goed geprobeerd, herhaal dit hoofdstuk nog eens!";
    let stars = "⭐";
    let emoji = "🛰️";
    if (pct >= 80) { msg = "Topmissie! Je beheerst deze leerstof heel goed."; stars = "⭐⭐⭐"; emoji = "🚀"; }
    else if (pct >= 50) { msg = "Al behoorlijk goed, maar er is nog winst te halen."; stars = "⭐⭐"; emoji = "🪐"; }

    container.innerHTML = `
      <div class="quiz-score">
        <div class="stars">${stars}</div>
        <div class="big">${score} / ${questions.length}</div>
        <p>${emoji} ${msg}</p>
        <button class="btn alt" id="quiz-restart">Opnieuw proberen</button>
      </div>
    `;
    container.querySelector("#quiz-restart").addEventListener("click", () => {
      current = 0;
      score = 0;
      render();
    });

    if (typeof renderMissieCounterLine === "function") {
      renderMissieCounterLine(container, container.id);
    }
  }

  render();
}
