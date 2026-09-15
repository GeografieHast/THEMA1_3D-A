# Missie: de aarde vanuit de ruimte

Studiesite voor leerlingen bij **Thema 1, Hoofdstuk 1: De aarde vanuit de ruimte**
(Concreet 3, Pelckmans Uitgevers). Bevat theorie, flashcards, een quiz en
kaartoefeningen op echte satellietbeelden/kaarten uit het handboek.

## Update (15 september)

- **Alle officiële figuren uit het handboek toegevoegd**, met schone (niet-
  watermerk) versies die je zelf aanleverde: 1.1 (maan/ISS), 1.3 (Las Vegas,
  stond er al), 1.4 (nachtbeeld ISS), 1.5 (dun/dichtbevolkt-schaal), 1.6
  (Kulusuk), 1.7 (Rio de Janeiro), 1.8 (Nederlandse zandgronden), 1.9
  (Vietnam-terrassen).
- **Ontbrekende oefeningen uit het handboek toegevoegd**, na vergelijking met
  `ZONE_CONCREET_.pdf`:
  - de eilanden-vraag bij Missie 4 (Afrika): 3 eilanden/eilandengroepen noemen
  - een volledig nieuwe "Missie 4b": de 5 genummerde gebieden in Afrika
    (Congobekken, Nijlvallei, Rwanda en Burundi, Sahara, westkust van Afrika)
    met bron B, elk met dun-/dichtbevolkt + verklaring
  - een nieuwe "Missie: Mumbai en Tibet" met de echte foto's C/D
  - de "verticale relatie temperatuur/neerslag"-vraag bij Missie 5
- **Missiestrook** bovenaan elke kaart (theorie, oefeningen, quiz), in de
  kleuren van de hero-balk zelf (grape → sky → mint).
- **Kronkelend missiepad + raketje**, zoals bij de doorstroom-site, maar met
  een eigen kleur (blauw i.p.v. koraal) en het bestaande D/A-vinraketje in
  plaats van de shuttle van doorstroom, zodat de twee sites elk hun eigen
  herkenbare "missie-mascotte" behouden.

**Let op, nog te bekijken:** de brontekst (`ZONE_CONCREET_.pdf`) zegt zelf
"Er zijn zes continenten... Er zijn zes grote werelddelen", wat afwijkt van
de 5 continenten / 8 werelddelen die nu op de site staan. Ik heb dat bewust
niet aangepast, want dat was eerder al een doelbewuste correctie van jou op
het handboek. Wil je dat toch naar 6/6 aanpassen, laat maar weten.

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
