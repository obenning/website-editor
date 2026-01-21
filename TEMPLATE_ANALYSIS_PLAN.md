# TEMPLATE ANALYSIS PLAN - Vollständige data-property Abdeckung

## Ziel
Alle Textfelder in allen 33 Modul-Templates identifizieren und mit `data-property` Attributen versehen, um vollständige WYSIWYG-Editierbarkeit zu gewährleisten.

## Problem
Viele Textfelder sind aktuell nicht bearbeitbar, weil:
1. Statische Templates fehlen data-property Attribute auf versteckten/verschachtelten Texten
2. Dynamisch generierte Inhalte in Prozessoren fehlen data-property Attribute
3. Komplexe Strukturen (Tabellen, Listen, verschachtelte Divs) wurden übersehen
4. Nicht-Überschriften-Texte wurden nicht vollständig erfasst

## Systematische Vorgehensweise

### Phase 1: BESTANDSAUFNAHME (Analyse)
**Ziel**: Vollständige Inventur aller Textfelder pro Template

#### Schritt 1.1: Template-Liste erstellen
Alle 33 Templates aus `js/templates.js` extrahieren:

```
1. kerberos-hero-unified
2. kerberos-hero-simple
3. kerberos-hero-advanced-richtext
4. kerberos-cta-simple
5. kerberos-cta-split
6. kerberos-features-vertical
7. kerberos-features-horizontal
8. kerberos-features-grid
9. kerberos-features-cards
10. kerberos-process-timeline-fixed
11. kerberos-testimonials-simple
12. kerberos-testimonials-card
13. kerberos-testimonials-horizontal
14. kerberos-faq-simple
15. kerberos-faq-interactive
16. kerberos-pricing-simple
17. kerberos-pricing-interactive
18. kerberos-newsletter-simple
19. kerberos-newsletter-modern
20. kerberos-footer-simple
21. kerberos-footer-extended
22. kerberos-stats
23. kerberos-team-gallery
24. kerberos-logo-grid
25. kerberos-video-embed
26. kerberos-image-text-split
27. kerberos-accordion
28. kerberos-tabs
29. kerberos-comparison-table (oder feature-comparison-table)
30. kerberos-svg-hero
31. kerberos-contact-form
32. kerberos-countdown
33. kerberos-icon-boxes
```

#### Schritt 1.2: Analyseheuristik definieren

**Textfeld-Identifikationskriterien:**

```javascript
// Ein Element ist ein editierbares Textfeld wenn:
1. Es HTML-Textknoten enthält (nicht nur Bilder/Icons)
2. Es eine Property im defaultProperties hat
3. Es nicht rein dekorativ ist (z.B. keine <hr>, <br>)
4. Es sichtbar ist (nicht display:none)

// HTML-Tags die typischerweise Text enthalten:
- <h1>, <h2>, <h3>, <h4>, <h5>, <h6> (Überschriften)
- <p> (Paragraphen)
- <span> (Inline-Text)
- <div> (mit Text-Content)
- <a> (Link-Text)
- <button> (Button-Text)
- <li> (Listen-Items)
- <td>, <th> (Tabellen-Zellen)
- <label> (Form-Labels)
- <blockquote> (Zitate)
- <figcaption> (Bild-Beschriftungen)
```

#### Schritt 1.3: Analyse-Output-Format

Für jedes Template erstelle eine Markdown-Tabelle:

```markdown
## Template: kerberos-hero-unified

| Element | Aktueller HTML | Property-Key | data-property? | data-content-type? | Status | Notizen |
|---------|----------------|--------------|----------------|-------------------|--------|---------|
| Titel | `<h1>{{titleContent}}</h1>` | titleContent | ✅ Ja | ✅ html | OK | |
| Subtitle | `<p>{{subtitle}}</p>` | subtitle | ❌ Nein | ❌ Nein | FEHLT | Versteckter Text |
| Button | `<a>{{buttonText}}</a>` | buttonText | ✅ Ja | - | OK | |
| Label | `<span class="badge">Neu</span>` | - | - | - | KEIN PROPERTY | Statischer Text, nicht editierbar |

### Gefundene Probleme:
- 1 fehlendes data-property Attribut (subtitle)
- 1 statischer Text ohne Property (Label "Neu")

### Empfehlung:
1. Füge `data-property="subtitle"` zu `<p>` hinzu
2. Erwäge neue Property `badgeText` für Label
```

### Phase 2: KATEGORISIERUNG
Gruppiere Templates nach Komplexität:

#### Kategorie A: EINFACH (nur statische Texte)
- Keine Loops, keine dynamische Generierung
- Beispiele: kerberos-hero-simple, kerberos-cta-simple, kerberos-video-embed

#### Kategorie B: MITTEL (einfache Loops)
- Ein einzelner Loop (z.B. Features, Team-Members)
- Beispiele: kerberos-features-vertical, kerberos-team-gallery, kerberos-stats

#### Kategorie C: KOMPLEX (verschachtelte Strukturen, Tabellen)
- Multiple Loops, Tabellen, verschachtelte Strukturen
- Beispiele: kerberos-pricing-interactive, kerberos-comparison-table, kerberos-faq-interactive

#### Kategorie D: HYBRID (Static + Dynamic)
- Template enthält statische Texte + Processor generiert dynamische Inhalte
- Beispiele: kerberos-process-timeline-fixed, kerberos-features-grid

### Phase 3: DETAILANALYSE PRO TEMPLATE

#### Template-Analyse-Struktur:

```markdown
# TEMPLATE: [Name]
**Kategorie**: [A/B/C/D]
**Processor**: [Processor-Name oder "Keiner"]

## 1. HTML-Struktur Überblick
[Kurze Beschreibung der Template-Struktur]

## 2. Statische Textfelder
[Liste aller statischen Textfelder im Template-HTML]

## 3. Dynamische Textfelder (Processor)
[Liste aller dynamisch generierten Textfelder]

## 4. Aktuelle data-property Abdeckung
- ✅ Bereits vorhanden: [Liste]
- ❌ Fehlt: [Liste]
- ⚠️ Unklar: [Liste - benötigt neue Property?]

## 5. Property-Schema Check
- Sind alle Properties im propertySchema definiert?
- Fehlen Properties im defaultProperties?

## 6. Änderungsbedarf

### 6a. Template-HTML (js/templates.js)
```html
<!-- ALT: -->
<p>{{subtitle}}</p>

<!-- NEU: -->
<p data-property="subtitle">{{subtitle}}</p>
```

### 6b. Processor (js/module-processors - vereinfacht.js)
```javascript
// ALT:
'<li>' + item.text + '</li>'

// NEU:
'<li data-property="item' + i + 'Text">' + item.text + '</li>'
```

### 6c. Property-Schema (falls neue Properties)
```javascript
// Ergänzen in propertySchema:
item1Text: { type: 'text', label: 'Item 1 Text', default: '...' }
```

## 7. Test-Checkpoints
- [ ] Alle Texte sind per Doppelklick editierbar
- [ ] Property Panel zeigt alle Properties
- [ ] Änderungen synchronisieren zwischen Canvas und Panel
- [ ] Keine Fehlermeldungen in Console
```

### Phase 4: PRIORISIERUNG

#### Batch 1 - KRITISCH (Templates mit häufiger Nutzung)
1. kerberos-hero-unified
2. kerberos-hero-simple
3. kerberos-features-grid
4. kerberos-pricing-interactive
5. kerberos-faq-interactive
6. kerberos-testimonials-horizontal
7. kerberos-cta-split

#### Batch 2 - HOCH (Feature-reiche Templates)
8. kerberos-process-timeline-fixed
9. kerberos-features-vertical
10. kerberos-features-horizontal
11. kerberos-comparison-table
12. kerberos-team-gallery
13. kerberos-accordion
14. kerberos-tabs

#### Batch 3 - MITTEL (Spezial-Templates)
15. kerberos-stats
16. kerberos-newsletter-modern
17. kerberos-footer-extended
18. kerberos-image-text-split
19. kerberos-icon-boxes
20. kerberos-contact-form

#### Batch 4 - NIEDRIG (Einfache/Seltene Templates)
21. kerberos-cta-simple
22. kerberos-testimonials-simple
23. kerberos-testimonials-card
24. kerberos-faq-simple
25. kerberos-pricing-simple
26. kerberos-newsletter-simple
27. kerberos-footer-simple
28. kerberos-logo-grid
29. kerberos-video-embed
30. kerberos-svg-hero
31. kerberos-countdown
32. kerberos-features-cards
33. kerberos-hero-advanced-richtext

## Umsetzungsplan

### STEP 1: Analyse-Phase (Batch für Batch)
**Für jeden Batch:**
1. Lese Template-HTML aus `js/templates.js`
2. Identifiziere alle `{{propertyKey}}` Placeholders
3. Finde entsprechende HTML-Elemente
4. Prüfe ob `data-property="propertyKey"` vorhanden
5. Prüfe ob `data-content-type` gesetzt (bei HTML-Content)
6. Dokumentiere Ergebnisse in Markdown-Tabelle

**Tool-Stack:**
- Read: Template-HTML lesen
- Grep: Properties finden (Pattern: `\{\{(\w+)\}\}`)
- Manual Inspection: Verschachtelte Strukturen verstehen

**Output pro Batch:**
- `BATCH_X_ANALYSIS.md` mit vollständiger Analyse aller Templates

### STEP 2: Processor-Check
**Für jeden Processor:**
1. Lese Processor-Code aus `js/module-processors - vereinfacht.js`
2. Identifiziere alle String-Konkatenationen mit HTML
3. Finde alle generierten Textfelder
4. Prüfe ob `data-property` Attribute vorhanden
5. Dokumentiere fehlende Attribute

**Processor-Liste:**
```
1. processKerberosTimeline (Timeline Steps)
2. processKerberosFeatures (Feature-Items)
3. processKerberosFeaturesGrid (Feature-Cards)
4. processKerberosPricingInteractive (Plans, Features, Table)
5. processKerberosTestimonialsHorizontal (Testimonials)
6. processKerberosFaqInteractive (FAQ Items)
7. processKerberosNewsletterModern (Benefits)
8. processStatsModule (Stats)
9. processKerberosFeatureComparisonTable (Table Cells)
10. processKerberosTeamGallery (Team Members)
11. processKerberosAccordion (Accordion Items)
12. processKerberosTabs (Tab Content)
13. processKerberosIconBoxes (Icon Boxes)
```

**Output:**
- `PROCESSOR_ANALYSIS.md` mit allen fehlenden Attributen

### STEP 3: Implementierung (Batch für Batch)

#### 3.1 Template-Updates
**Für jedes Template:**
```javascript
// Pattern:
<[tag]>{{propertyKey}}</[tag]>

// Wird zu:
<[tag] data-property="propertyKey">{{propertyKey}}</[tag]>

// Bei HTML-Content:
<[tag] data-property="propertyKey" data-content-type="html">{{propertyKey}}</[tag>
```

**Wichtige Regeln:**
- Attribute auf ÄUSSERSTE Elemente setzen (div statt p, ul statt li)
- Bei Listen: `<ul data-property="listContent">` nicht auf jedes `<li>`
- Bei verschachtelten Strukturen: Nur auf editierbare Teile

#### 3.2 Processor-Updates
**Pattern für Loops:**
```javascript
// Single Property in Loop:
for (let i = 0; i < items.length; i++) {
  html += '<div data-property="item' + i + 'Text">' + items[i].text + '</div>';
}

// Multiple Properties in Loop:
for (let i = 0; i < items.length; i++) {
  html += '<h3 data-property="item' + i + 'Title">' + items[i].title + '</h3>';
  html += '<p data-property="item' + i + 'Description">' + items[i].description + '</p>';
}

// HTML Content:
html += '<div data-property="item' + i + 'Content" data-content-type="html">' + items[i].html + '</div>';
```

#### 3.3 Property-Schema-Check
**Für jedes Template prüfen:**
1. Sind alle data-property Keys im `propertySchema` definiert?
2. Haben alle Properties sinnvolle Labels?
3. Sind die richtigen Types gesetzt (text vs richtext)?

### STEP 4: Testing (Batch für Batch)

**Test-Checkliste pro Template:**
```
Template: [Name]
✅/❌ Alle Headlines editierbar (Doppelklick)
✅/❌ Alle Subtitles editierbar
✅/❌ Alle Listen-Items editierbar
✅/❌ Alle Tabellen-Zellen editierbar
✅/❌ Alle Button-Texte editierbar (via Menu)
✅/❌ Alle Links editierbar (via Menu)
✅/❌ Farben editierbar (Shift+Klick)
✅/❌ Icons editierbar (Shift+Klick)
✅/❌ Bilder editierbar (Hover)
✅/❌ Property Panel synchronisiert
✅/❌ Keine Console-Errors

Gefundene Probleme:
[Liste von Bugs/Issues]
```

### STEP 5: Dokumentation

**Abschlussdokumentation:**
```markdown
# TEMPLATE EDITABILITY REPORT

## Übersicht
- Templates analysiert: 33/33
- Textfelder identifiziert: [Anzahl]
- data-property Attribute hinzugefügt: [Anzahl]
- Neue Properties erstellt: [Anzahl]

## Statistik pro Template
| Template | Textfelder | data-property Vorher | data-property Nachher | Abdeckung |
|----------|------------|---------------------|----------------------|-----------|
| kerberos-hero-unified | 5 | 3 | 5 | 100% |
| ... | ... | ... | ... | ... |

## Häufige Probleme
1. [Problem 1 + Lösung]
2. [Problem 2 + Lösung]
...

## Spezialfälle
[Templates mit besonderen Herausforderungen]

## Testing-Ergebnisse
[Zusammenfassung der Tests]
```

## Erweiterte Analyse-Aspekte

### Spezielle Texttypen

#### 1. Platzhalter-Texte
```html
<input placeholder="E-Mail eingeben">
<!-- Benötigt: data-property="emailPlaceholder" auf input -->
```

#### 2. Alt-Texte (Bilder)
```html
<img src="..." alt="Beschreibung">
<!-- Wird via Image-Editor bearbeitet, kein data-property nötig -->
```

#### 3. Aria-Labels (Accessibility)
```html
<button aria-label="Schließen">X</button>
<!-- Eventuell eigene Property: data-property="closeButtonAriaLabel" -->
```

#### 4. Title-Attribute (Tooltips)
```html
<a href="#" title="Mehr erfahren">Link</a>
<!-- Eventuell eigene Property: data-property="linkTitle" -->
```

#### 5. Data-Attribute (Custom)
```html
<div data-section-label="Features"></div>
<!-- Prüfen ob editierbar sein soll -->
```

### Verschachtelte Strukturen

#### Tabellen
```html
<table>
  <thead>
    <tr>
      <th data-property="column1Header">Spalte 1</th>
      <th data-property="column2Header">Spalte 2</th>
    </tr>
  </thead>
  <tbody>
    <!-- Rows werden meist dynamisch generiert -->
  </tbody>
</table>
```

#### Listen (verschachtelt)
```html
<ul data-property="mainList">
  <li>Item 1
    <ul>
      <li>Sub-Item 1.1</li>
      <li>Sub-Item 1.2</li>
    </ul>
  </li>
</ul>
<!-- Problem: Wie macht man Sub-Items einzeln editierbar? -->
<!-- Lösung: Separate Properties oder HTML-Content-Type -->
```

#### Cards mit Multiple Texts
```html
<div class="card">
  <h3 data-property="cardTitle">Titel</h3>
  <span class="badge" data-property="cardBadge">Neu</span>
  <p data-property="cardDescription">Beschreibung</p>
  <a data-property="cardButtonText">Button</a>
</div>
```

### Edge Cases

#### 1. Conditional Rendering
```html
{{#if showSubtitle}}
  <p>{{subtitle}}</p>
{{/if}}
```
**Frage**: data-property auch bei bedingter Anzeige?
**Antwort**: Ja, immer hinzufügen

#### 2. Iterationen mit Index
```html
{{#each items}}
  <div data-property="item{{@index}}Text">{{text}}</div>
{{/each}}
```
**Problem**: Template-Engine vs. Processor
**Lösung**: Im Processor mit `i` Index arbeiten

#### 3. Interpolation in Attributen
```html
<div class="text-{{color}}">{{content}}</div>
```
**Frage**: Wohin kommt data-property?
**Antwort**: Auf das editierbare Text-Element
```html
<div class="text-{{color}}" data-property="content">{{content}}</div>
```

#### 4. Gemischter Content
```html
<p>Text mit <strong>{{boldText}}</strong> und mehr</p>
```
**Problem**: Nur Teil ist Property
**Lösung**: Ganzes Element als HTML-Content oder Split
```html
<p data-property="paragraphContent" data-content-type="html">
  Text mit <strong>{{boldText}}</strong> und mehr
</p>
```

## Quality Assurance Checkliste

### Pre-Implementation
- [ ] Alle 33 Templates identifiziert
- [ ] Alle Processors identifiziert
- [ ] Analyse-Format definiert
- [ ] Batch-Einteilung festgelegt

### During Implementation (pro Batch)
- [ ] Templates analysiert und dokumentiert
- [ ] Fehlende Attribute identifiziert
- [ ] Code-Änderungen durchgeführt
- [ ] Commit mit aussagekräftiger Message
- [ ] Lokaler Test durchgeführt

### Post-Implementation
- [ ] Alle Batches abgeschlossen
- [ ] Vollständiger Test aller Templates
- [ ] Dokumentation erstellt
- [ ] README aktualisiert
- [ ] Git push durchgeführt

## Zeitabschätzung

**Pro Template (Durchschnitt):**
- Analyse: 5-10 Minuten
- Implementierung: 5-15 Minuten
- Testing: 3-5 Minuten
- **Total pro Template: ~15-30 Minuten**

**Gesamt für 33 Templates:**
- Optimistisch: ~8 Stunden
- Realistisch: ~12 Stunden
- Pessimistisch: ~16 Stunden

**Aufgeteilt in 4 Batches:**
- **Batch 1** (7 Templates): ~3 Stunden
- **Batch 2** (7 Templates): ~3 Stunden
- **Batch 3** (7 Templates): ~3 Stunden
- **Batch 4** (12 Templates): ~3 Stunden

## Nächste Schritte (für neue Session)

### Session-Start Checklist:
1. ✅ Lies `TEMPLATE_ANALYSIS_PLAN.md` (diese Datei)
2. ✅ Starte mit Batch 1 (Templates 1-7)
3. ✅ Erstelle `BATCH_1_ANALYSIS.md`
4. ✅ Für jedes Template in Batch 1:
   - Lese Template-HTML
   - Identifiziere alle Textfelder
   - Dokumentiere Status (✅ OK / ❌ FEHLT)
   - Erstelle Änderungs-Plan
5. ✅ Implementiere Änderungen für Batch 1
6. ✅ Teste alle Templates aus Batch 1
7. ✅ Commit + Push
8. ✅ Wiederhole für Batch 2-4

### Template für Batch-Analyse:

```markdown
# BATCH X ANALYSIS

## Templates in diesem Batch
1. [Template 1]
2. [Template 2]
...

---

## [Template Name 1]
**Status**: ⚠️ IN BEARBEITUNG / ✅ ABGESCHLOSSEN
**Kategorie**: [A/B/C/D]
**Processor**: [Name oder "Keiner"]

### Textfelder-Inventur
| # | Element | HTML | Property Key | data-property? | Status |
|---|---------|------|--------------|----------------|--------|
| 1 | Title   | `<h1>` | titleContent | ✅ | OK |
| 2 | Subtitle | `<p>` | subtitle | ❌ | FEHLT |
...

### Änderungen erforderlich
```diff
- <p>{{subtitle}}</p>
+ <p data-property="subtitle">{{subtitle}}</p>
```

### Processor-Änderungen
[Falls vorhanden]

---

## [Template Name 2]
...

---

## Batch-Zusammenfassung
- Templates analysiert: X/Y
- Textfelder gefunden: X
- Fehlende data-property: X
- Neue Properties benötigt: X
```

## Automatisierungs-Möglichkeiten

### Regex für Template-Analyse
```javascript
// Finde alle Property-Placeholders:
const propertyPattern = /\{\{(\w+)\}\}/g;

// Finde alle data-property Attribute:
const dataPropertyPattern = /data-property="(\w+)"/g;

// Finde alle HTML-Text-Elemente:
const textElementPattern = /<(h[1-6]|p|span|div|a|button|li|td|th)[^>]*>.*?<\/\1>/g;

// Prüfe ob Element data-property hat:
const hasDataProperty = (elementHtml) => /data-property="[\w]+"/.test(elementHtml);
```

### Helper-Script (Konzept)
```javascript
// analyze-template.js
function analyzeTemplate(templateHtml, defaultProperties) {
  const properties = Object.keys(defaultProperties);
  const findings = [];

  properties.forEach(propKey => {
    // Suche nach {{propKey}} in HTML
    const placeholderMatch = templateHtml.match(new RegExp(`{{${propKey}}}`, 'g'));

    if (placeholderMatch) {
      // Finde umgebendes HTML-Element
      const elementMatch = templateHtml.match(new RegExp(`<[^>]+>{{${propKey}}}<\/[^>]+>`));

      if (elementMatch) {
        const hasDataProperty = elementMatch[0].includes(`data-property="${propKey}"`);

        findings.push({
          property: propKey,
          hasPlaceholder: true,
          hasDataProperty: hasDataProperty,
          element: elementMatch[0],
          status: hasDataProperty ? 'OK' : 'MISSING'
        });
      }
    }
  });

  return findings;
}
```

## Wichtige Erkenntnisse aus bisheriger Arbeit

### Was funktioniert gut:
1. ✅ data-property auf Überschriften (h1, h2, h3)
2. ✅ data-property auf Buttons mit Text
3. ✅ data-content-type="html" für Rich-Text
4. ✅ Synchronisation über sync-manager.js
5. ✅ Button-Edit-Menu für Links

### Bekannte Herausforderungen:
1. ⚠️ Verschachtelte Listen (ul > li > ul > li)
2. ⚠️ Tabellen mit dynamischen Rows/Columns
3. ⚠️ Conditional Rendering ({{#if}})
4. ⚠️ Templates mit Processor-Kombinationen
5. ⚠️ Sehr lange Property-Namen bei Loops (item12Title)

### Best Practices:
1. Immer äußerstes editierbares Element markieren
2. Bei Listen: Komplette Liste als HTML-Content
3. Bei Tabellen: Einzelne Zellen markieren
4. Property-Namen konsistent halten (itemXTitle, itemXDescription)
5. data-content-type nur bei echtem HTML (mit Tags)

## Glossar

**data-property**: HTML-Attribut das angibt, welche Property des Moduls bearbeitet wird
**data-content-type**: Gibt an ob Content HTML oder Plaintext ist
**Property Schema**: Definition aller Properties im Template (propertySchema)
**Default Properties**: Standard-Werte für alle Properties
**Processor**: JavaScript-Funktion die dynamische Inhalte generiert
**Sync-Manager**: System zur Synchronisation zwischen Canvas und Property Panel
**WYSIWYG**: What You See Is What You Get - Direktes Editing im Canvas

---

**Erstellt am**: 2026-01-21
**Version**: 1.0
**Status**: 📋 BEREIT FÜR UMSETZUNG
