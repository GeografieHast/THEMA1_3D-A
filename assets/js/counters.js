/* Kleine, gedeelde tellers op basis van Abacus (abacus.jasoncameron.dev),
   een gratis telAPI zonder account of sleutel. Wordt gebruikt voor:
   1) de algemene bezoekersteller onderaan de site
   2) de "X leerlingen maakten dit al" teller per opdracht

   Let op: dit telt afgeronde pogingen, geen unieke leerlingen. Zonder
   inlogsysteem kan een statische site dat onderscheid niet maken.
   Als de dienst een keer niet reageert, verdwijnt de teller gewoon
   stil - hij is een leuk extraatje, geen kernonderdeel van de oefening. */

const MISSIE_NAMESPACE = "hast-hasselt.missie-aarde-vanuit-de-ruimte";

function missieCounterHit(key, onDone) {
  fetch(`https://abacus.jasoncameron.dev/hit/${MISSIE_NAMESPACE}/${encodeURIComponent(key)}`)
    .then(r => r.json())
    .then(data => onDone(data.value))
    .catch(() => onDone(null));
}

function missieCounterGet(key, onDone) {
  fetch(`https://abacus.jasoncameron.dev/get/${MISSIE_NAMESPACE}/${encodeURIComponent(key)}`)
    .then(r => r.json())
    .then(data => onDone(data.value))
    .catch(() => onDone(null));
}

/* Voegt een klein tekstregeltje toe aan een opdracht-container, zodra die
   opdracht is afgerond. Telt meteen 1 keer mee. */
function renderMissieCounterLine(container, key) {
  const line = document.createElement("div");
  line.className = "missie-counter";
  line.textContent = "👥 …";
  container.appendChild(line);
  missieCounterHit(key, (value) => {
    if (value == null) { line.remove(); return; }
    line.textContent = `👥 ${value} ${value === 1 ? "leerling maakte" : "leerlingen maakten"} deze opdracht al`;
  });
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
    el.textContent = `🛰️ Bezoekers: ${value}`;
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
