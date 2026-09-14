/* Kleine, gedeelde tellers op basis van Abacus (abacus.jasoncameron.dev),
   een gratis telAPI zonder account of sleutel. Wordt gebruikt voor:
   1) de algemene bezoekersteller onderaan de site
   2) de "X leerlingen maakten dit al" teller per opdracht

   Elke opdracht toont dit aantal meteen bij het laden van de pagina
   (opgevraagd, niet verhoogd), en telt zelf 1 keer mee zodra de
   bezoeker die ene opdracht afrondt.

   Let op: dit telt afgeronde pogingen, geen unieke leerlingen. Zonder
   inlogsysteem kan een statische site dat onderscheid niet maken.
   Als de dienst een keer niet reageert, verdwijnt de teller gewoon
   stil - hij is een leuk extraatje, geen kernonderdeel van de oefening. */

const MISSIE_NAMESPACE = "hast-hasselt.missie-aarde-vanuit-de-ruimte";

function missieCounterHit(key, onDone) {
  fetch(`https://abacus.jasoncameron.dev/hit/${MISSIE_NAMESPACE}/${encodeURIComponent(key)}`)
    .then(r => r.json())
    .then(data => onDone(typeof data.value === "number" ? data.value : null))
    .catch(() => onDone(null));
}

function missieCounterGet(key, onDone) {
  fetch(`https://abacus.jasoncameron.dev/get/${MISSIE_NAMESPACE}/${encodeURIComponent(key)}`)
    .then(r => r.json())
    // een nog nooit aangeraakte teller geeft een 404 "Key not found" terug:
    // dat betekent gewoon 0, geen echte fout
    .then(data => onDone(typeof data.value === "number" ? data.value : 0))
    .catch(() => onDone(null));
}

function missieCounterText(value) {
  return `${value} ${value === 1 ? "leerling maakte" : "leerlingen maakten"} deze opdracht al`;
}

/* Zet meteen een klein regeltje net ná (dus als broer/zus van, niet als
   kind-element van) een opdracht-container, met de actuele stand.
   Als broer/zus overleeft het regeltje het ook wanneer de oefening
   zelf haar eigen inhoud herbouwt (bv. bij quizvragen of het
   herschikken in de rangschik-oefening).
   Geeft een functie terug die de oefening zelf aanroept zodra de
   bezoeker de opdracht heeft afgerond. */
function attachMissieCounter(container, key) {
  const line = document.createElement("div");
  line.className = "missie-counter";
  line.textContent = "…";
  if (container.parentNode) {
    container.parentNode.insertBefore(line, container.nextSibling);
  } else {
    container.appendChild(line);
  }

  missieCounterGet(key, (value) => {
    if (value == null) { line.remove(); return; }
    line.textContent = missieCounterText(value);
  });

  let done = false;
  return function markMissieDone() {
    if (done) return;
    done = true;
    missieCounterHit(key, (value) => {
      if (value == null) return;
      line.textContent = missieCounterText(value);
    });
  };
}

/* Algemene bezoekersteller in de footer: telt maximaal 1 keer per
   sessie mee (niet bij elke pagina-herlaad), maar toont wel altijd
   de actuele stand. */
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("visit-counter");
  if (!el) return;
  const key = "site-bezoekers";
  const show = (value) => {
    if (value == null) { el.remove(); return; }
    el.textContent = `Bezoekers: ${value}`;
  };
  if (sessionStorage.getItem("missie-bezoeker-geteld")) {
    missieCounterGet(key, show);
  } else {
    missieCounterHit(key, (value) => {
      sessionStorage.setItem("missie-bezoeker-geteld", "1");
      show(value);
    });
  }
});
