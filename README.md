# Missie: de aarde vanuit de ruimte 🚀

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
index.html              → de volledige site (één pagina)
assets/css/style.css    → alle styling
assets/js/quiz.js        → de quizmotor (meerkeuze, met score)
assets/js/flashcards.js  → de flashcard-motor
assets/js/map-exercise.js→ de kaartoefening-motor
assets/img/*.png         → afbeeldingen, geknipt uit het handboek
                            (zonder de antwoorden erop)
```

## Zelf aanpassen

- Vragen/flashcards aanpassen: open `index.html`, zoek de `<script>` onderaan
  en pas de teksten in `buildFlashcards(...)` of `buildQuiz(...)` aan.
- Kleuren aanpassen: alle kleuren staan bovenaan `assets/css/style.css`
  onder `:root`.
