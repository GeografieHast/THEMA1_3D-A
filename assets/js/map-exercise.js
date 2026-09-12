/* Kaartoefening: een echte afbeelding uit het boek, met een reeks
   meerkeuzevragen die elk apart en meteen nagekeken worden.
   Gebruik: buildMapExercise(el, {
     image: "assets/img/....png",
     caption: "...",
     items: [{ q: "Wat stelt nummer 1 voor?", options: [...], correct: 0 }]
   })
*/
function buildMapExercise(container, config) {
  container.innerHTML = `
    <img src="${config.image}" alt="${config.alt || ""}">
    ${config.caption ? `<p style="color:var(--ink-soft);font-size:0.88rem;margin-top:-10px;">${config.caption}</p>` : ""}
    <div class="map-items"></div>
  `;

  const list = container.querySelector(".map-items");

  config.items.forEach((item, idx) => {
    const wrap = document.createElement("div");
    wrap.className = "map-item";
    wrap.innerHTML = `
      <div class="map-item-q">${idx + 1}. ${item.q}</div>
      <div class="quiz-options">
        ${item.options.map((opt, i) => `<button class="quiz-option" data-i="${i}">${opt}</button>`).join("")}
      </div>
      <div class="map-item-result"></div>
    `;
    list.appendChild(wrap);

    const buttons = wrap.querySelectorAll(".quiz-option");
    let done = false;
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        if (done) return;
        done = true;
        const chosen = parseInt(btn.dataset.i, 10);
        const result = wrap.querySelector(".map-item-result");
        buttons.forEach(b => (b.disabled = true));
        if (chosen === item.correct) {
          btn.classList.add("correct");
          result.classList.add("show", "good");
          result.textContent = "🎉 Juist!" + (item.explain ? " " + item.explain : "");
        } else {
          btn.classList.add("incorrect");
          buttons[item.correct].classList.add("correct");
          result.classList.add("show", "bad");
          result.textContent = "🤔 Niet juist — het juiste antwoord is aangeduid." + (item.explain ? " " + item.explain : "");
        }
      });
    });
  });
}
