/* Drie extra oefenvormen, in de stijl van een klassieke overhoring:
   - buildShortAnswer: typ een kort antwoord, klik op nakijken
   - buildOpenReveal: open vraag, klik om het modelantwoord te tonen
   - buildRanking: rangschik items met omhoog/omlaag-knoppen, klik op nakijken
*/

function buildShortAnswer(container, config) {
  container.innerHTML = `
    ${config.image ? `<img src="${config.image}" alt="${config.alt || ""}" style="border-radius:14px;margin-bottom:16px;border:3px solid #ecebf7;max-width:100%;">` : ""}
    <div class="quiz-question">${config.q}</div>
    <div class="short-answer-row">
      <input type="text" class="short-answer-input" placeholder="Typ je antwoord..." autocomplete="off">
      <button class="btn secondary short-answer-check">Nakijken</button>
    </div>
    <div class="quiz-feedback"></div>
  `;

  const input = container.querySelector(".short-answer-input");
  const checkBtn = container.querySelector(".short-answer-check");
  const feedback = container.querySelector(".quiz-feedback");

  function normalize(s) {
    return s.toLowerCase().trim()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const accepted = config.accepted.map(normalize);
  const markMissieDone = (typeof attachMissieCounter === "function")
    ? attachMissieCounter(container, container.id)
    : null;

  function check() {
    const val = normalize(input.value);
    const correct = val.length > 0 && accepted.some(a => val === a || val.includes(a) || a.includes(val));
    feedback.classList.add("show");
    if (correct) {
      feedback.classList.remove("bad");
      feedback.classList.add("good");
      feedback.textContent = "🎉 Juist! Correct antwoord: " + config.accepted[0] + ".";
    } else {
      feedback.classList.remove("good");
      feedback.classList.add("bad");
      feedback.textContent = "🤔 Niet helemaal. Correct antwoord: " + config.accepted[0] + ".";
    }
    if (markMissieDone) markMissieDone();
  }

  checkBtn.addEventListener("click", check);
  input.addEventListener("keydown", e => { if (e.key === "Enter") check(); });
}

function buildOpenReveal(container, config) {
  container.innerHTML = `
    ${config.image ? `<img src="${config.image}" alt="${config.alt || ""}" style="border-radius:14px;margin-bottom:16px;border:3px solid #ecebf7;max-width:100%;">` : ""}
    <div class="quiz-question">${config.q}</div>
    <textarea class="open-answer-box" rows="3" placeholder="Schrijf hier eerst zelf je antwoord..."></textarea>
    <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap;">
      ${config.hint ? `<button class="btn secondary open-hint-btn">Nood aan een hint?</button>` : ""}
      <button class="btn secondary open-reveal-btn">Bekijk modelantwoord</button>
    </div>
    <div class="open-hint"></div>
    <div class="open-model-answer"></div>
  `;

  if (config.hint) {
    const hintBtn = container.querySelector(".open-hint-btn");
    const hintBox = container.querySelector(".open-hint");
    hintBtn.addEventListener("click", () => {
      hintBox.classList.add("show");
      hintBox.innerHTML = `💡 <strong>Hint:</strong> ${config.hint}`;
      hintBtn.style.display = "none";
    });
  }

  const markMissieDone = (typeof attachMissieCounter === "function")
    ? attachMissieCounter(container, container.id)
    : null;

  const btn = container.querySelector(".open-reveal-btn");
  const modelBox = container.querySelector(".open-model-answer");
  btn.addEventListener("click", () => {
    modelBox.classList.add("show");
    modelBox.innerHTML = `<strong>Modelantwoord:</strong><br>${config.model}`;
    btn.style.display = "none";
    if (markMissieDone) markMissieDone();
  });
}

function buildRanking(container, config) {
  // config.items: [{ id, label }], config.order: array of ids, correct volgorde
  let current = config.items.map(i => i.id);
  // shuffle start order (simple fixed shuffle so it's not already correct)
  current = config.shuffled || current.slice().reverse();
  const markMissieDone = (typeof attachMissieCounter === "function")
    ? attachMissieCounter(container, container.id)
    : null;

  function render() {
    const rows = current.map((id, idx) => {
      const item = config.items.find(i => i.id === id);
      return `
        <li class="ranking-item" data-id="${id}">
          <span class="ranking-label">${item.label}</span>
          <span class="ranking-controls">
            <button class="ranking-btn" data-dir="up" data-idx="${idx}" ${idx === 0 ? "disabled" : ""}>&uarr;</button>
            <button class="ranking-btn" data-dir="down" data-idx="${idx}" ${idx === current.length - 1 ? "disabled" : ""}>&darr;</button>
          </span>
        </li>`;
    }).join("");

    container.innerHTML = `
      <div class="quiz-question">${config.q}</div>
      <p style="color:var(--ink-soft);font-size:0.9rem;margin-top:-10px;">${config.hint || ""}</p>
      <ol class="ranking-list">${rows}</ol>
      <button class="btn secondary ranking-check">Nakijken</button>
      <div class="quiz-feedback"></div>
    `;

    container.querySelectorAll(".ranking-btn").forEach(b => {
      b.addEventListener("click", () => {
        const idx = parseInt(b.dataset.idx, 10);
        const dir = b.dataset.dir;
        const swapWith = dir === "up" ? idx - 1 : idx + 1;
        if (swapWith < 0 || swapWith >= current.length) return;
        [current[idx], current[swapWith]] = [current[swapWith], current[idx]];
        render();
      });
    });

    container.querySelector(".ranking-check").addEventListener("click", () => {
      const feedback = container.querySelector(".quiz-feedback");
      feedback.classList.add("show");
      const isCorrect = current.every((id, idx) => id === config.order[idx]);
      if (isCorrect) {
        feedback.classList.remove("bad");
        feedback.classList.add("good");
        feedback.textContent = "🎉 Juist gerangschikt!";
      } else {
        feedback.classList.remove("good");
        feedback.classList.add("bad");
        feedback.textContent = "🤔 Nog niet juist, probeer de volgorde te wijzigen met de pijltjes.";
      }
      if (markMissieDone) markMissieDone();
    });
  }

  render();
}
