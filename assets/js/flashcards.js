/* Flashcards: klik/tik om te draaien, pijlen om te bladeren.
   Gebruik: buildFlashcards(el, { cards: [{front, back}, ...] })
*/
function buildFlashcards(container, config) {
  const cards = config.cards;
  let index = 0;

  function render() {
    const card = cards[index];
    container.innerHTML = `
      <div class="flashcard-wrap">
        <div class="flashcard-hint">Klik op de kaart om het antwoord te zien</div>
        <div class="flashcard" id="fc-card">
          <div class="flashcard-inner">
            <div class="flashcard-face flashcard-front">${card.front}</div>
            <div class="flashcard-face flashcard-back">${card.back}</div>
          </div>
        </div>
        <div class="flashcard-controls">
          <button class="btn secondary" id="fc-prev">&larr; Vorige</button>
          <span class="flashcard-counter">${index + 1} / ${cards.length}</span>
          <button class="btn secondary" id="fc-next">Volgende &rarr;</button>
        </div>
      </div>
    `;

    const cardEl = container.querySelector("#fc-card");
    cardEl.addEventListener("click", () => cardEl.classList.toggle("flipped"));

    container.querySelector("#fc-prev").addEventListener("click", () => {
      index = (index - 1 + cards.length) % cards.length;
      render();
    });
    container.querySelector("#fc-next").addEventListener("click", () => {
      index = (index + 1) % cards.length;
      render();
    });
  }

  render();
}
