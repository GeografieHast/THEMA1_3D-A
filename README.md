# Missie: de aarde vanuit de ruimte

Studiesite voor leerlingen bij **Thema 1, Hoofdstuk 1: De aarde vanuit de ruimte**
(Concreet 3, Pelckmans Uitgevers). Bevat theorie, flashcards, een quiz en
kaartoefeningen op echte satellietbeelden/kaarten uit het handboek.

## Publiceren op GitHub Pages

1. Maak een nieuwe (of gebruik een bestaande) GitHub-repository.
2. Upload alle bestanden en mappen uit deze zip naar de root van de repository
   (dus `index.html` en de map `assets/` komen rechtstreeks in de repo,
   niet in een submap).
3. Ga naar **Settings → Pages**.
4. Kies bij **Source** de branch `main` en map `/ (root)`.
5. Na een minuutje staat de site live op
   `https://<jouw-gebruikersnaam>.github.io/<repo-naam>/`.

## Bestandsstructuur

```
index.html                 → de volledige site (één pagina)
assets/css/style.css       → alle styling
assets/js/counters.js      → gedeelde tellers (bezoekers + per opdracht)
assets/js/quiz.js          → de quizmotor (meerkeuze, met score)
assets/js/flashcards.js    → de flashcard-motor
assets/js/map-exercise.js  → de kaartoefening-motor
assets/js/examenstijl.js   → kort antwoord / open vraag / rangschikken
assets/img/*.png           → afbeeldingen, geknipt uit het handboek
                              (zonder de antwoorden erop)
```

## Bezoekersteller en opdracht-tellers

Onderaan de site staat een bezoekersteller, en bij elke opdracht (quiz,
kaartmissie, kort antwoord, open vraag, rangschikken) verschijnt na het
afronden een klein regeltje "X leerlingen maakten deze opdracht al".
Beide draaien op **Abacus** (abacus.jasoncameron.dev), een gratis telAPI
zonder account. De vorige teller (visitor-badge.laobi.icu) is vervangen
omdat dat soort losse "badge"-plaatjes regelmatig offline gaat en vaak
door ad-blockers/privacy-instellingen in browsers wordt tegengehouden;
dit is dezelfde soort gratis dienst, dus ook hier is 100% betrouwbaarheid
niet te garanderen, maar hij faalt nu stil (de tekst verdwijnt gewoon)
in plaats van een kapot plaatje te tonen.

Let op: dit telt **afgeronde pogingen**, geen unieke leerlingen. Zonder
inlogsysteem kan een statische site dat verschil niet zien; als iemand
een quiz twee keer maakt, telt dat twee keer mee.

Wil je alle tellers ooit resetten naar 0? Verander dan de waarde van
`MISSIE_NAMESPACE` bovenaan `assets/js/counters.js` naar een nieuwe,
unieke tekst (bv. voeg er het huidige schooljaar aan toe).

## Zelf aanpassen

- Vragen/flashcards aanpassen: open `index.html`, zoek de `<script>` onderaan
  en pas de teksten in `buildFlashcards(...)` of `buildQuiz(...)` aan.
- Kleuren aanpassen: alle kleuren staan bovenaan `assets/css/style.css`
  onder `:root`.
