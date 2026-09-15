/* Kronkelend "missiepad": een gestippeld spoor dat gewoon normaal met de
   pagina meescrolt (getekend in de document-coördinaten van .wrap), met
   een raketje dat op een VASTE plek in het scherm blijft (position:fixed)
   en links-rechts wiebelt volgens hoever je gescrold bent. Zo is het
   raketje altijd zichtbaar, nooit ergens boven het scherm "verstopt".

   Eerdere versies plaatsten het raketje ZELF ook in document-coördinaten
   en probeerden zijn positie exact aan de scrollafstand te koppelen. Dat
   bleek telkens bovenaan het scherm te blijven hangen (of zelfs net erboven,
   dus onzichtbaar): wiskundig kwam de raketpositie namelijk altijd exact
   overeen met de bovenrand van het venster. Door het raketje zelf "fixed"
   te maken, en enkel zijn horizontale positie te laten meebewegen met het
   pad (op basis van welk stuk van het pad er net op een vaste hoogte in
   het scherm voorbijkomt), blijft het altijd in beeld. */

(function () {
  const AMPLITUDE_MAX = 130;
  const AMPLITUDE_RATIO = 0.3;
  const PERIOD = 640;
  const STEP = 26;
  const ROCKET_VIEWPORT_TOP = 130; // vaste afstand (px) vanaf de bovenkant van het scherm
  const FADE_IN_AFTER = 380; // pas tonen nadat de hero grotendeels voorbij is

  let builtWidth = 0;
  let builtHeight = 0;
  let wrapTopOffset = 0;
  let wrapLeftViewport = 0;

  function trailX(y, width) {
    const amplitude = Math.min(AMPLITUDE_MAX, width * AMPLITUDE_RATIO);
    const centerX = width / 2;
    return centerX + Math.sin((y / PERIOD) * Math.PI * 2) * amplitude;
  }

  function buildTrail() {
    const wrap = document.querySelector(".wrap");
    const svg = document.getElementById("missionTrailSvg");
    if (!wrap || !svg) return;

    const width = wrap.clientWidth;
    const height = wrap.scrollHeight;
    if (!width || !height) return;

    builtWidth = width;
    builtHeight = height;
    const rect = wrap.getBoundingClientRect();
    wrapTopOffset = rect.top + window.scrollY;
    wrapLeftViewport = rect.left;

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    let d = `M ${trailX(0, width).toFixed(1)} 0`;
    for (let y = STEP; y <= height; y += STEP) {
      d += ` L ${trailX(y, width).toFixed(1)} ${y}`;
    }
    svg.innerHTML = `<path d="${d}"></path>`;

    positionRocket();
  }

  function positionRocket() {
    if (builtHeight <= 0) return;
    const rocket = document.getElementById("missionTrailRocket");
    if (!rocket) return;

    // Welk punt van het (document-vaste) pad bevindt zich net op de
    // vaste hoogte ROCKET_VIEWPORT_TOP in het scherm?
    const documentY = window.scrollY + ROCKET_VIEWPORT_TOP;
    let wrapY = documentY - wrapTopOffset;
    wrapY = Math.min(builtHeight, Math.max(0, wrapY));
    const x = trailX(wrapY, builtWidth);

    rocket.style.left = (wrapLeftViewport + x) + "px";
    rocket.classList.toggle("is-visible", window.scrollY > FADE_IN_AFTER);
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      positionRocket();
      ticking = false;
    });
  }, { passive: true });

  let resizeT = null;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeT);
    resizeT = window.setTimeout(buildTrail, 150);
  });

  document.addEventListener("DOMContentLoaded", buildTrail);
  window.addEventListener("load", buildTrail);

  // Vangt alle latere hoogteveranderingen op (o.a. de bezoekerstellers
  // die pas na hun fetch een regeltje toevoegen), hoe laat ook. Dit
  // beïnvloedt hier vooral het getekende pad zelf, niet zozeer de
  // raketpositie (die hangt af van scroll + een vaste schermhoogte).
  if (typeof ResizeObserver !== "undefined") {
    let roT = null;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(roT);
      roT = window.setTimeout(buildTrail, 60);
    });
    document.addEventListener("DOMContentLoaded", () => {
      const wrap = document.querySelector(".wrap");
      if (wrap) ro.observe(wrap);
    });
  } else {
    window.addEventListener("load", () => {
      window.setTimeout(buildTrail, 400);
      window.setTimeout(buildTrail, 1200);
      window.setTimeout(buildTrail, 3000);
    });
  }
})();
