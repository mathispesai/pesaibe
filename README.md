# 🔐 Pesai - Geheimschrift Generator

Een interactieve webapplicatie voor het versleutelen en ontsleutelen van teksten met verschillende geheimschriftmethodes.

## ✨ Features

### 🎯 Meerdere Versleutelmethodes

De applicatie ondersteunt 40+ verschillende cipher-methodes, georganiseerd in categorieën:

- **Eenvoudig**: Woorden omkeren, tekst ondersteboven, tekst opdelen
- **Substitutie**: Caesar, Atbash, Codewoord, Lettersleutel
- **Matrix/Raster**: Polybius, Vierkant, Tralieschrift, Kijk-Kleur
- **Tijd-gebaseerd**: Jaartalmethode
- **Symbolen/Fonts**: Morse, Braille, Raam, Chinois, Dancing Men, Hiërogliefen, Semaforen, Windroos
- **Nummer/Code**: Letter↔Nummer, ASCII, Hexadecimaal

### 🎨 Gebruiksvriendelijke Interface

- **Real-time versleuteling**: Zie direct het resultaat terwijl je typt
- **Zoekfunctie**: Vind snel de gewenste methode
- **Favorieten systeem**: Markeer je meest gebruikte methodes
- **Undo/Redo**: Ctrl+Z en Ctrl+Y ondersteuning
- **Responsief design**: Werkt op desktop, tablet en mobiel

### 📊 Visuele Uitleg

Elke methode bevat:
- Stapsgewijze uitleg van het versleutelingsproces
- Visuele tabellen en matrices
- Sleuteltabellen waar van toepassing
- Voorbeelden met de ingevoerde tekst

### 📤 Export Functionaliteit

- **QR-codes**: Genereer automatisch QR-codes voor versleutelde tekst
- **PDF export**: Download resultaten inclusief QR-codes
- **Kopieer functie**: Eén klik om resultaten te kopiëren

### 🔧 Geavanceerde Features

- **Parameters**: Configureerbare opties per methode (shift, jaartal, codewoord, etc.)
- **Split chunks**: Verdeel tekst in meerdere blokken met afzonderlijke QR-codes
- **Speciale fonts**: Gebruik van custom fonts voor symbolische versleuteling

## 🎨 Technologie Stack

- **Framework**: [Astro](https://astro.build/) 5.1.3
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **QR Codes**: react-qr-code
- **PDF Export**: jsPDF
- **Icons**: lucide-react

## 📝 Gebruik

### Basis Versleuteling

1. Selecteer een cipher methode uit de categorieën
2. Voer je tekst in het invoerveld in
3. Het resultaat verschijnt automatisch in het uitvoerveld
4. Klik op "Kopieer" om het resultaat te kopiëren

### Met Parameters

Sommige methodes vereisen extra parameters:

- **Caesar**: Verschuivingsgetal (-25 tot 25)
- **Jaartalmethode**: Een jaartal (bijv. 1979)
- **Codewoord**: Een codewoord (bijv. PARKBOCHT)
- **Tralieschrift**: Aantal rijen
- **Lettersleutel**: Sleutelgetal (positie in woorden)

### QR & PDF Export

1. Versleutel je tekst
2. De QR-code wordt automatisch gegenereerd
3. Klik op "Download als PDF" voor een exporteerbaar bestand
4. Bij "Tekst opdelen" worden meerdere QR-codes aangemaakt

### Favorieten

- Klik op de ster bij een methode om deze toe te voegen aan favorieten
- Klik op "Favorieten" in de zoekbalk om alleen favorieten te tonen
- Favorieten worden lokaal opgeslagen in je browser


[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/astro-blog-starter-template)

<!-- dash-content-start -->
## Website
https://www.pesai.be/cipher

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
| `npm run deploy`          | Deploy your production site to Cloudflare        |


