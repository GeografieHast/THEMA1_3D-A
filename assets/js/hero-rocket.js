/* Kleine interactie voor de raket in de hero: een tik of klik geeft
   een korte boost (sneller, groter vlammen, extra rookstoot). Puur
   decoratief, geen invloed op de rest van de site. */
document.addEventListener("DOMContentLoaded", () => {
  const scene = document.getElementById("heroRocketScene");
  if (!scene) return;

  let boosting = false;
  function boost() {
    if (boosting) return;
    boosting = true;
    scene.classList.add("boost");
    window.setTimeout(() => {
      scene.classList.remove("boost");
      boosting = false;
    }, 1100);
  }

  scene.addEventListener("click", boost);
  scene.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      boost();
    }
  });
});
