// ==========================================
// SQUARESPACE IMPORT ANALYZER v2.0
// Generischer, wartbarer Import-Engine
// ==========================================

// ===== 1. CONTENT EXTRACTOR =====
class ContentExtractor {
    extract(html) {
        return {
            headings: this.extractHeadings(html),
            paragraphs: this.extractParagraphs(html),
            images: this.extractImages(html),
            links: this.extractLinks(html),
            lists: this.extractLists(html),
            structure: this.analyzeStructure(html),
            colors: this.extractColors(html),
            layout: this.detectLayout(html)
        };
    }
    
    extractHeadings(html) {
        const headings = [];
        for (let level = 1; level <= 6; level++) {
            const regex = new RegExp(`<h${level}[^>]*>(.+?)<\/h${level}>`, 'gis');
            let match;
            while (match = regex.exec(html)) {
                const text = this.cleanText(match[1]);
                if (text.length > 0) {
                    headings.push({
                        level,
                        text,
                        priority: 7 - level
                    });
                }
            }
        }
        return headings.sort((a, b) => b.priority - a.priority);
    }
    
    extractParagraphs(html) {
        const paragraphs = [];
        const regex = /<p[^>]*>(.+?)<\/p>/gis;
        let match;
        while (match = regex.exec(html)) {
            const text = this.cleanText(match[1]);
            if (text.length > 10) {
                paragraphs.push({ 
                    text, 
                    length: text.length,
                    isShort: text.length < 100
                });
            }
        }
        return paragraphs;
    }
    
    extractImages(html) {
        const images = [];
        const regex = /<img[^>]*src=["']([^"']+)["'][^>]*(?:alt=["']([^"']*)["'])?/gi;
        let match;
        while (match = regex.exec(html)) {
            images.push({
                src: match[1],
                alt: match[2] || '',
                isBackground: false
            });
        }
        
        // Background-Images
        const bgRegex = /background-image:\s*url\(['"]?([^'"()]+)['"]?\)/gi;
        while (match = bgRegex.exec(html)) {
            images.push({
                src: match[1],
                alt: '',
                isBackground: true
            });
        }
        
        return images;
    }
    
    extractLinks(html) {
        const links = [];
        const regex = /<a[^>]*href=["']([^"']+)["'][^>]*>(.+?)<\/a>/gis;
        let match;
        while (match = regex.exec(html)) {
            const text = this.cleanText(match[2]);
            if (text.length > 0 && text.length < 100) { // Buttons sind kurz
                links.push({
                    href: match[1],
                    text,
                    isButton: text.length < 30
                });
            }
        }
        return links;
    }
    
    extractLists(html) {
        const lists = [];
        const regex = /<[uo]l[^>]*>(.*?)<\/[uo]l>/gis;
        let match;
        while (match = regex.exec(html)) {
            const items = [];
            const itemRegex = /<li[^>]*>(.+?)<\/li>/gis;
            let itemMatch;
            while (itemMatch = itemRegex.exec(match[1])) {
                items.push(this.cleanText(itemMatch[1]));
            }
            if (items.length > 0) {
                lists.push({ items, count: items.length });
            }
        }
        return lists;
    }
    
    extractColors(html) {
        const colors = new Set();
        const regex = /#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}|rgba?\([^)]+\)/g;
        let match;
        while (match = regex.exec(html)) {
            colors.add(match[0]);
        }
        return Array.from(colors);
    }
    
    analyzeStructure(html) {
        const lower = html.toLowerCase();
        return {
            raw: html, // ← NEU: Rohen HTML-Code speichern
            hasGrid: /display:\s*grid|grid-template/i.test(html),
            hasFlex: /display:\s*flex|flex-direction/i.test(html),
            hasCards: /class=["'][^"']*card[^"']*["']/i.test(html),
            hasColumns: /column|col-/i.test(html),
            hasBackground: /background(?:-image)?:\s*url/i.test(html),
            hasSection: /<section/i.test(html),
            cardCount: (html.match(/card|feature-card/gi) || []).length,
            hasOverlay: /overlay|rgba\([^)]*,\s*0\.[0-9]+\)/i.test(html),
            isKerberosModule: /kerberos-module-|kerberos-guide-/i.test(html) // ← NEU
        };
    }
    
    detectLayout(html) {
        const lower = html.toLowerCase();
        return {
            type: this.guessLayoutType(html),
            isCentered: /text-align:\s*center|margin:\s*[^;]*auto/i.test(html),
            hasHeroStructure: /hero|jumbotron|banner/i.test(html),
            columns: this.detectColumnCount(html)
        };
    }
    
    guessLayoutType(html) {
        if (/hero|banner/i.test(html)) return 'hero';
        if ((html.match(/card|column/gi) || []).length >= 3) return 'grid';
        if (/<img[^>]*>/.test(html) && /<p[^>]*>/i.test(html)) return 'content';
        return 'unknown';
    }
    
    detectColumnCount(html) {
        const gridMatch = html.match(/grid-template-columns:\s*repeat\(([^,]+),/i);
        if (gridMatch) {
            const match = gridMatch[1].match(/\d+/);
            return match ? parseInt(match[0]) : 3;
        }
        return (html.match(/col-|column/gi) || []).length || 1;
    }
    
    cleanText(html) {
        return html
            .replace(/<[^>]+>/g, '')
            .replace(/&[^;]+;/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }
}

// ===== 2. TEMPLATE MATCHER =====
class TemplateMatcher {
    constructor(templates) {
        this.templates = templates || [];
    }
    
    findBestMatch(content) {
        if (!this.templates || this.templates.length === 0) {
            console.error('Keine Templates verfügbar');
            return null;
        }
        
        const scores = this.templates
            .filter(t => t && t.id) // Nur gültige Templates
            .map(template => ({
                template,
                score: this.calculateScore(template, content),
                reasons: this.getMatchReasons(template, content)
            }));
        
        scores.sort((a, b) => b.score - a.score);
        
        return {
            best: scores[0] || null,
            alternatives: scores.slice(1, 4)
        };
    }
    
    calculateScore(template, content) {
        let score = 0;
        
        // === NEU: KERBEROS-MODUL-ERKENNUNG ===
        const htmlLower = content.structure.raw ? content.structure.raw.toLowerCase() : '';
        
        // Erkenne eigene exportierte Module
        if (htmlLower.includes('kerberos-module-') || htmlLower.includes('kerberos-guide-')) {
            console.log('🎯 Erkenne Kerberos-Modul im Code');
            
            // Extrahiere Template-ID aus dem Code
            const templateMatch = htmlLower.match(/kerberos-([a-z-]+)-module/);
            if (templateMatch && template.id.includes(templateMatch[1])) {
                score += 100; // Perfekte Übereinstimmung
                console.log('✅ Perfekte Übereinstimmung für:', template.id);
            }
        }
        
        // Content-Type Scoring
        if (content.headings.length > 0 && this.templateHas(template, 'title')) {
            score += 20;
        }
        
        if (content.paragraphs.length > 0 && this.templateHas(template, 'text|content|description')) {
            score += 15;
        }
        
        if (content.images.length > 0 && this.templateHas(template, 'image|img')) {
            score += 15;
        }
        
        if (content.links.length > 0 && this.templateHas(template, 'button|link')) {
            score += 10;
        }
        
        // Structure Scoring
        if (content.structure.hasGrid && /grid/i.test(template.id)) {
            score += 30;
        }
        
        if (content.structure.hasCards && /card|feature|showcase/i.test(template.id)) {
            score += 25;
        }
        
        if (content.structure.cardCount >= 3 && /features|grid|showcase/i.test(template.id)) {
            score += 35;
        }
        
        // Layout Scoring
        if (content.layout.type === 'hero' && /hero|banner/i.test(template.id)) {
            score += 40;
        }
        
        if (content.layout.type === 'grid' && /grid|showcase|features/i.test(template.id)) {
            score += 35;
        }
        
        // List Scoring (für Features)
        if (content.lists.length > 0 && /features|list/i.test(template.id)) {
            score += 30;
        }
        
        // Multi-Image Scoring
        if (content.images.length >= 3 && /gallery|team|grid/i.test(template.id)) {
            score += 25;
        }
        
        // Penalty für SVG-Templates ohne SVG
        if (/svg/i.test(template.id) && !/<svg/i.test(content)) {
            score -= 20;
        }
        
        return Math.max(0, score);
    }
    
    getMatchReasons(template, content) {
        const reasons = [];
        
        if (content.headings.length > 0) reasons.push(`${content.headings.length} Titel`);
        if (content.paragraphs.length > 0) reasons.push(`${content.paragraphs.length} Texte`);
        if (content.images.length > 0) reasons.push(`${content.images.length} Bilder`);
        if (content.links.length > 0) reasons.push(`${content.links.length} Links`);
        if (content.structure.hasGrid) reasons.push('Grid-Layout');
        if (content.structure.hasCards) reasons.push(`${content.structure.cardCount} Cards`);
        
        return reasons;
    }
    
    templateHas(template, keywords) {
        if (!template) return false;
        
        const props = Object.keys(template.properties || {}).join(' ').toLowerCase();
        const html = (template.html || '').toLowerCase();
        const searchText = props + ' ' + html;
        
        const keywordList = keywords.split('|');
        return keywordList.some(keyword => searchText.includes(keyword.toLowerCase()));
    }
}

// ===== 3. FIELD MAPPER =====
class FieldMapper {
    mapContentToTemplate(content, template) {
        const mapping = {};
        const properties = template.properties || {};
        
        let headingIndex = 0;
        let paragraphIndex = 0;
        let imageIndex = 0;
        let linkIndex = 0;
        
        Object.keys(properties).forEach(key => {
            const lowerKey = key.toLowerCase();
            
            // Title Mapping
            if (lowerKey.includes('title') && !lowerKey.includes('subtitle')) {
                if (content.headings[headingIndex]) {
                    mapping[key] = content.headings[headingIndex].text;
                    headingIndex++;
                }
            }
            
            // Subtitle Mapping
            else if (lowerKey.includes('subtitle')) {
                if (content.headings[headingIndex]) {
                    mapping[key] = content.headings[headingIndex].text;
                    headingIndex++;
                } else if (content.paragraphs[paragraphIndex]?.isShort) {
                    mapping[key] = content.paragraphs[paragraphIndex].text;
                    paragraphIndex++;
                }
            }
            
            // Text/Content/Description Mapping
            else if (lowerKey.match(/text|content|description/) && !lowerKey.includes('button')) {
                if (content.paragraphs[paragraphIndex]) {
                    mapping[key] = content.paragraphs[paragraphIndex].text;
                    paragraphIndex++;
                }
            }
            
            // Image Mapping
            else if (lowerKey.match(/image|img/) && lowerKey.match(/url|src/)) {
                if (content.images[imageIndex]) {
                    mapping[key] = content.images[imageIndex].src;
                    imageIndex++;
                }
            }
            
            // Image Alt Mapping
            else if (lowerKey.includes('alt') && lowerKey.match(/image|img/)) {
                if (content.images[imageIndex - 1]) {
                    mapping[key] = content.images[imageIndex - 1].alt || 'Importiertes Bild';
                }
            }
            
            // Button Text Mapping
            else if (lowerKey.includes('button') && lowerKey.match(/text|label/)) {
                if (content.links[linkIndex]) {
                    mapping[key] = content.links[linkIndex].text;
                }
            }
            
            // Button Link Mapping
            else if (lowerKey.includes('button') && lowerKey.match(/link|href|url/)) {
                if (content.links[linkIndex]) {
                    mapping[key] = content.links[linkIndex].href;
                    linkIndex++;
                }
            }
            
            // Link Mapping (generic)
            else if (lowerKey.match(/link|href|url/) && !lowerKey.includes('button')) {
                if (content.links[linkIndex]) {
                    mapping[key] = content.links[linkIndex].href;
                    linkIndex++;
                }
            }
        });
        
        console.log('📋 Field Mapping abgeschlossen:', {
            mapped: Object.keys(mapping).length,
            total: Object.keys(properties).length,
            unused: {
                headings: content.headings.length - headingIndex,
                paragraphs: content.paragraphs.length - paragraphIndex,
                images: content.images.length - imageIndex,
                links: content.links.length - linkIndex
            }
        });
        
        return mapping;
    }
}

// ===== 4. MAIN ANALYZER =====
class SquarespaceAnalyzer {
    constructor() {
        this.extractor = new ContentExtractor();
        this.mapper = new FieldMapper();
        this._matcher = null; // Lazy loading
    }
    
    getMatcher() {
        if (!this._matcher) {
            const templates = window.MODULE_TEMPLATES || [];
            console.log('📚 Templates beim Analyzer geladen:', templates.length);
            if (templates.length === 0) {
                console.error('❌ MODULE_TEMPLATES ist leer!');
            }
            this._matcher = new TemplateMatcher(templates);
        }
        return this._matcher;
    }
    
    
    analyze(html) {
        console.log('🔍 Starte Analyse...');
        
        // 1. Content extrahieren
        const content = this.extractor.extract(html);
        console.log('📊 Content extrahiert:', content);
        
        // 2. Bestes Template finden (mit lazy loading)
        const match = this.getMatcher().findBestMatch(content);// ← ÄNDERUNG
        if (!match || !match.best) {
            console.error('❌ Kein passendes Template gefunden');
            return null;
        }
        
        console.log('✅ Template gefunden:', match.best.template.name, `(${match.best.score} Punkte)`);
        
        // 3. Content zu Template-Properties mappen
        const mappedProperties = this.mapper.mapContentToTemplate(content, match.best.template);
        
        // 4. Mit Template-Defaults mergen
        const finalProperties = {
            ...match.best.template.properties,
            ...mappedProperties
        };
        
        return {
            type: match.best.template.name,
            templateId: match.best.template.id,
            properties: finalProperties,
            confidence: match.best.score,
            reasons: match.best.reasons,
            alternatives: match.alternatives,
            originalContent: content
        };
    }
}

// ===== 5. GLOBALE API (Kompatibilität mit bestehendem Code) =====

let analyzedModuleData = null;
let currentImportCode = null;

function analyzeSquarespaceCode() {
    // WICHTIG: Templates müssen geladen sein
    if (!window.MODULE_TEMPLATES || window.MODULE_TEMPLATES.length === 0) {
        console.error('❌ MODULE_TEMPLATES nicht verfügbar!');
        if (typeof showNotification === 'function') {
            showNotification('❌ Editor nicht bereit - bitte Seite neu laden');
        }
        return;
    }
    
    const codeInput = document.getElementById('squarespaceCodeInput');
    const code = codeInput?.value.trim();
    
    if (!code) {
        if (typeof showNotification === 'function') {
            showNotification('⚠️ Bitte Code einfügen');
        }
        return;
    }
    
    try {
        const analyzer = new SquarespaceAnalyzer();
        analyzedModuleData = analyzer.analyze(code);
        currentImportCode = code;
        
        if (analyzedModuleData) {
            showImportResults(analyzedModuleData);
        } else {
            showNoMatchFound(code);
        }
        
    } catch (error) {
        console.error('Analyzer Fehler:', error);
        if (typeof showNotification === 'function') {
            showNotification('❌ Analyse-Fehler: ' + error.message);
        }
    }
}

function showImportResults(data) {
    // Zeige Ergebnisse an
    console.log('📊 Import-Ergebnisse:', data);
    
    if (data.confidence > 60) {
        // Automatischer Import bei hoher Confidence
        if (confirm(`Template "${data.type}" gefunden (${data.confidence}% Übereinstimmung).\n\nJetzt importieren?`)) {
            autoImportAnalyzedCode();
        }
    } else {
        // Zeige Alternativen bei niedriger Confidence
        showTemplateSelection(data);
    }
}

function showNoMatchFound(code) {
    console.warn('⚠️ Kein Template gefunden');
    
    // Prüfe ob es ein Kerberos-Modul ist
    if (/kerberos-module-|kerberos-guide-/i.test(code)) {
        if (typeof showNotification === 'function') {
            showNotification('ℹ️ Dies scheint bereits ein fertiges Kerberos-Modul zu sein. Bitte direkt ins Canvas ziehen.');
        }
        if (typeof closeSquarespaceImporter === 'function') {
            closeSquarespaceImporter();
        }
        return;
    }
    
    if (typeof showNotification === 'function') {
        showNotification('⚠️ Kein passendes Template gefunden - bitte manuell auswählen');
    }
    
    // Zeige alle Templates zur manuellen Auswahl
    if (typeof showAllTemplatesSelection === 'function') {
        showAllTemplatesSelection();
    }
}

function showTemplateSelection(data) {
    const modal = document.createElement('div');
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999; display: flex; align-items: center; justify-content: center;';
    
    let optionsHTML = `
        <div style="background: white; padding: 2rem; border-radius: 12px; max-width: 600px; width: 90%;">
            <h3 style="margin: 0 0 1rem; color: #063AA8;">🎯 Template-Vorschlag</h3>
            
            <div style="padding: 1rem; background: #f8f9fa; border-radius: 8px; border-left: 4px solid ${data.confidence > 60 ? '#28a745' : '#ffc107'}; margin-bottom: 1rem;">
                <strong>${data.type}</strong><br>
                <small>Übereinstimmung: ${data.confidence}%</small><br>
                <small style="color: #666;">${data.reasons.join(' • ')}</small>
            </div>
    `;
    
    if (data.alternatives && data.alternatives.length > 0) {
        optionsHTML += '<h4 style="margin: 1.5rem 0 0.5rem; font-size: 0.9rem; color: #666;">Alternativen:</h4>';
        data.alternatives.forEach(alt => {
            optionsHTML += `
                <div onclick="selectAlternativeTemplate('${alt.template.id}')" 
                     style="padding: 0.75rem; background: white; border: 1px solid #dee2e6; border-radius: 6px; margin-bottom: 0.5rem; cursor: pointer;">
                    <strong style="font-size: 0.9rem;">${alt.template.name}</strong>
                    <small style="color: #666; display: block;">${alt.score}% - ${alt.reasons.join(', ')}</small>
                </div>
            `;
        });
    }
    
    optionsHTML += `
            <div style="margin-top: 1.5rem; display: flex; gap: 0.5rem;">
                <button onclick="autoImportAnalyzedCode()" class="btn btn-success" style="flex: 1;">✅ Importieren</button>
                <button onclick="closeTemplateSelection()" class="btn btn-secondary">Abbrechen</button>
            </div>
        </div>
    `;
    
    modal.innerHTML = optionsHTML;
    modal.id = 'templateSelectionModal';
    document.body.appendChild(modal);
}

function selectAlternativeTemplate(templateId) {
    const template = (window.MODULE_TEMPLATES || []).find(t => t.id === templateId);
    if (template && analyzedModuleData) {
        analyzedModuleData.templateId = templateId;
        analyzedModuleData.type = template.name;
        closeTemplateSelection();
        autoImportAnalyzedCode();
    }
}

function closeTemplateSelection() {
    const modal = document.getElementById('templateSelectionModal');
    if (modal) modal.remove();
}

function autoImportAnalyzedCode() {
    if (!analyzedModuleData) {
        console.error('Keine Daten zum Importieren');
        return;
    }
    
    try {
        const newModule = {
            id: `module_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: analyzedModuleData.type,
            templateId: analyzedModuleData.templateId,
            properties: analyzedModuleData.properties
        };
        
        if (window.modules && Array.isArray(window.modules)) {
            window.modules.push(newModule);
        }
        
        // Render Canvas
        if (typeof renderCanvas === 'function') {
            renderCanvas();
            setTimeout(() => {
                if (typeof selectModule === 'function') {
                    selectModule(newModule.id);
                }
            }, 100);
        }
        
        // Close Modals
        closeTemplateSelection();
        if (typeof closeSquarespaceImporter === 'function') {
            closeSquarespaceImporter();
        }
        
        if (typeof showNotification === 'function') {
            showNotification(`✅ "${analyzedModuleData.type}" importiert`);
        }
        
        console.log('✅ Modul erfolgreich importiert:', newModule);
        
    } catch (error) {
        console.error('Import-Fehler:', error);
        if (typeof showNotification === 'function') {
            showNotification('❌ Import fehlgeschlagen: ' + error.message);
        }
    }
}

// Export für globale Verwendung
window.SquarespaceAnalyzer = SquarespaceAnalyzer;
window.analyzeSquarespaceCode = analyzeSquarespaceCode;
window.autoImportAnalyzedCode = autoImportAnalyzedCode;
window.selectAlternativeTemplate = selectAlternativeTemplate;
window.closeTemplateSelection = closeTemplateSelection;

console.log('✅ Squarespace Analyzer v2.0 geladen');