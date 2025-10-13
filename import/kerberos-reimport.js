// ==========================================
// KERBEROS MODULE RE-IMPORT
// Importiert bereits exportierte Kerberos-Module zurück
// ==========================================

class KerberosReimporter {
    constructor() {
        this.propertyExtractors = this.setupPropertyExtractors();
    }
    
    // Erkenne ob es ein Kerberos-Modul ist
    isKerberosModule(html) {
        return /kerberos-module-|kerberos-guide-|kerberos-hero-|kerberos-features-/i.test(html);
    }
    
    // Extrahiere Template-ID aus dem Code
    extractTemplateId(html) {
        console.log('🔍 Suche Template-ID im Code...');
        
        // Strukturbasierte Erkennung (höchste Priorität)
        if (/guide-step.*hotspot.*overlay/is.test(html)) {
            console.log('✅ Guide-Flow erkannt (Struktur-Match)');
            return 'kerberos-guide-flow';
        }
        
        if (/(feature-card.*){3,}/is.test(html)) {
            console.log('✅ Features-Grid erkannt (3+ Feature Cards)');
            return 'kerberos-features-grid';
        }
        
        if (/hero-layout-grid.*hero-image-container/is.test(html)) {
            console.log('✅ Hero-Advanced erkannt (Layout-Grid)');
            return 'kerberos-hero-advanced-richtext';
        }
        
        // Fallback auf Guessing
        return this.guessTemplateFromContent(html);
    }
    
    // Rate Template basierend auf Inhalt
    guessTemplateFromContent(html) {
        const lower = html.toLowerCase();
        
        console.log('🔮 Versuche Template zu erraten...');
        
        // Zähle charakteristische Elemente
        const indicators = {
            guideFlow: (lower.match(/guide-step|hotspot|overlay|progress-bar/g) || []).length,
            features: (lower.match(/feature-card|features-grid/g) || []).length,
            hero: (lower.match(/hero-layout|hero-image|hero-text/g) || []).length,
            product: (lower.match(/product-card|showcase-card/g) || []).length,
            stats: (lower.match(/stat-card|statistics/g) || []).length,
            team: (lower.match(/team-member|team-card/g) || []).length
        };
        
        console.log('📊 Indicator-Scores:', indicators);
        
        // Finde höchsten Score
        let maxScore = 0;
        let bestTemplate = null;
        
        if (indicators.guideFlow > maxScore) {
            maxScore = indicators.guideFlow;
            bestTemplate = 'kerberos-guide-flow';
        }
        if (indicators.features > maxScore) {
            maxScore = indicators.features;
            bestTemplate = 'kerberos-features-grid';
        }
        if (indicators.hero > maxScore) {
            maxScore = indicators.hero;
            bestTemplate = 'kerberos-hero-advanced-richtext';
        }
        if (indicators.product > maxScore) {
            maxScore = indicators.product;
            bestTemplate = 'kerberos-product-showcase';
        }
        if (indicators.stats > maxScore) {
            maxScore = indicators.stats;
            bestTemplate = 'kerberos-stats';
        }
        if (indicators.team > maxScore) {
            maxScore = indicators.team;
            bestTemplate = 'kerberos-team-gallery';
        }
        
        console.log('🎯 Bestes Guess:', bestTemplate, 'mit Score:', maxScore);
        
        return bestTemplate;
    }
    
    // Hauptfunktion: Re-Import durchführen
    reimport(html) {
        console.log('🔄 Starte Kerberos Module Re-Import...');
        
        // 1. Template-ID ermitteln
        const templateId = this.extractTemplateId(html);
        if (!templateId) {
            console.error('❌ Konnte Template-ID nicht ermitteln');
            return null;
        }
        
        // 2. Template finden
        let template = (window.MODULE_TEMPLATES || []).find(t => t.id === templateId);

        // Fallback: Versuche ähnliche Template-ID
        if (!template && templateId) {
            console.warn('⚠️ Exakte Template-ID nicht gefunden, versuche ähnliche...');
            
            // Versuche ohne Präfix/Suffix
            const simplifiedId = templateId.replace(/^kerberos-/, '').replace(/-module$/, '');
            template = (window.MODULE_TEMPLATES || []).find(t => 
                t.id.includes(simplifiedId) || simplifiedId.includes(t.id)
            );
            
            if (template) {
                console.log('✅ Ähnliches Template gefunden:', template.id, 'für', templateId);
                templateId = template.id; // Update auf korrektes Template
            }
        }

        if (!template) {
            console.error('❌ Template nicht gefunden:', templateId);
            console.log('📚 Verfügbare Templates:', (window.MODULE_TEMPLATES || []).map(t => t.id));
            return null;
        }
        
        console.log('✅ Template gefunden:', template.name);
        
        // 3. Properties extrahieren
        const extractedProperties = this.extractProperties(html, template);
        
        // 4. Mit Template-Defaults mergen
        const finalProperties = {
            ...template.properties,
            ...extractedProperties
        };
        
        console.log('📊 Properties extrahiert:', Object.keys(extractedProperties).length);
        
        return {
            type: template.name,
            templateId: template.id,
            properties: finalProperties,
            isReimport: true,
            confidence: 100
        };
    }
    
    // Extrahiere Properties aus HTML
    extractProperties(html, template) {
        const properties = {};
        const templateProperties = template.properties || {};
        
        console.log('🔍 Extrahiere Properties für Template:', template.id);
        
        // Spezifische Extraktoren für bekannte Templates
        if (template.id === 'kerberos-guide-flow') {
            return this.extractGuideFlowProperties(html, templateProperties);
        }
        
        if (template.id.includes('hero')) {
            return this.extractHeroProperties(html, templateProperties);
        }
        
        if (template.id.includes('features')) {
            return this.extractFeaturesProperties(html, templateProperties);
        }
        
        // Generische Extraktion
        return this.extractGenericProperties(html, templateProperties);
    }
    
    // === SPEZIFISCHE PROPERTY-EXTRAKTOREN ===
    
    extractGuideFlowProperties(html, templateProps) {
        const props = {};
        
        // Badge Text
        const badgeMatch = html.match(/(\d+)\s+Schritte/i);
        if (badgeMatch) {
            props.badgeText = badgeMatch[1] + ' Schritte';
            props.stepsActive = badgeMatch[1];
        }
        
        // Haupttitel
        const titleMatch = html.match(/<h2[^>]*>([^<]+)<\/h2>/i);
        if (titleMatch) {
            props.title = this.cleanText(titleMatch[1]);
        }
        
        // Untertitel
        const subtitleMatch = html.match(/<p[^>]*style="[^"]*max-width: 600px[^"]*>([^<]+)<\/p>/i);
        if (subtitleMatch) {
            props.subtitle = this.cleanText(subtitleMatch[1]);
        }
        
        // Extrahiere Steps
        const stepRegex = /<div class="guide-step"[^>]*data-step="(\d+)"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"[^>]*alt="([^"]+)"[\s\S]*?<\/div>/gi;
        let stepMatch;
        let stepIndex = 1;
        
        while ((stepMatch = stepRegex.exec(html)) && stepIndex <= 5) {
            props[`step${stepIndex}Title`] = this.cleanText(stepMatch[3]) || `Schritt ${stepIndex}`;
            props[`step${stepIndex}Image`] = stepMatch[2];
            
            // Versuche Beschreibung zu finden (muss anders gemacht werden)
            // Die Beschreibungen sind im Script, nicht im HTML
            
            stepIndex++;
        }
        
        // Versuche Daten aus dem Script-Block zu extrahieren
        const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/i);
        if (scriptMatch) {
            const scriptContent = scriptMatch[1];
            
            // Extrahiere stepData Array
            const stepDataMatch = scriptContent.match(/const stepData = \[([\s\S]*?)\];/);
            if (stepDataMatch) {
                const stepDataStr = '[' + stepDataMatch[1] + ']';
                try {
                    // Versuche step data zu parsen (vorsichtig!)
                    const steps = this.parseStepData(stepDataStr);
                    steps.forEach((step, index) => {
                        const num = index + 1;
                        if (num <= 5) {
                            props[`step${num}Title`] = step.title || props[`step${num}Title`];
                            props[`step${num}Description`] = step.description || '';
                            props[`step${num}HotspotX`] = step.hotspotX || 50;
                            props[`step${num}HotspotY`] = step.hotspotY || 50;
                        }
                    });
                } catch (e) {
                    console.warn('⚠️ Konnte stepData nicht parsen:', e);
                }
            }
        }
        
        console.log('✅ Guide-Flow Properties extrahiert:', Object.keys(props).length);
        return props;
    }
    
    extractHeroProperties(html, templateProps) {
        const props = {};
        
        // Titel
        const titleMatch = html.match(/<h[1-3][^>]*>([^<]+)<\/h[1-3]>/i);
        if (titleMatch) {
            props.titleContent = this.cleanText(titleMatch[1]);
        }
        
        // Text
        const textMatch = html.match(/<p[^>]*>([^<]+)<\/p>/i);
        if (textMatch) {
            props.subtitleContent = this.cleanText(textMatch[1]);
        }
        
        // Bild
        const imgMatch = html.match(/<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/i);
        if (imgMatch) {
            props.imageUrl = imgMatch[1];
            props.imageAlt = imgMatch[2] || 'Hero Bild';
        }
        
        // Button
        const btnMatch = html.match(/<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/i);
        if (btnMatch) {
            props.buttonLink = btnMatch[1];
            props.buttonText = this.cleanText(btnMatch[2]);
        }
        
        return props;
    }
    
    extractFeaturesProperties(html, templateProps) {
        const props = {};
        
        // Haupttitel
        const titleMatch = html.match(/<h2[^>]*>([^<]+)<\/h2>/i);
        if (titleMatch) {
            props.title = this.cleanText(titleMatch[1]);
        }
        
        // Feature Cards extrahieren
        const featureRegex = /<div[^>]*class="[^"]*feature-card[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
        let featureMatch;
        let featureIndex = 1;
        
        while ((featureMatch = featureRegex.exec(html)) && featureIndex <= 8) {
            const featureHtml = featureMatch[1];
            
            // Icon
            const iconMatch = featureHtml.match(/&#x([a-fA-F0-9]+);/);
            if (iconMatch) {
                props[`feature${featureIndex}Icon`] = iconMatch[0];
            }
            
            // Titel
            const ftitleMatch = featureHtml.match(/<h[3-6][^>]*>([^<]+)<\/h[3-6]>/i);
            if (ftitleMatch) {
                props[`feature${featureIndex}Title`] = this.cleanText(ftitleMatch[1]);
            }
            
            // Beschreibung
            const fdescMatch = featureHtml.match(/<p[^>]*>([^<]+)<\/p>/i);
            if (fdescMatch) {
                props[`feature${featureIndex}Description`] = this.cleanText(fdescMatch[1]);
            }
            
            props[`feature${featureIndex}Active`] = 'true';
            
            featureIndex++;
        }
        
        // Deaktiviere restliche Features
        for (let i = featureIndex; i <= 8; i++) {
            props[`feature${i}Active`] = 'false';
        }
        
        return props;
    }
    
    extractGenericProperties(html, templateProps) {
        const props = {};
        
        // Durchlaufe alle Template-Properties und versuche Werte zu finden
        Object.keys(templateProps).forEach(key => {
            const lowerKey = key.toLowerCase();
            
            // Titel
            if (lowerKey.includes('title') && !props[key]) {
                const match = html.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/i);
                if (match) props[key] = this.cleanText(match[1]);
            }
            
            // Text
            if ((lowerKey.includes('text') || lowerKey.includes('content')) && !props[key]) {
                const match = html.match(/<p[^>]*>([^<]+)<\/p>/i);
                if (match) props[key] = this.cleanText(match[1]);
            }
            
            // Bilder
            if (lowerKey.includes('image') && lowerKey.includes('url') && !props[key]) {
                const match = html.match(/<img[^>]*src="([^"]+)"/i);
                if (match) props[key] = match[1];
            }
            
            // Links
            if (lowerKey.includes('link') && !props[key]) {
                const match = html.match(/<a[^>]*href="([^"]+)"/i);
                if (match) props[key] = match[1];
            }
        });
        
        return props;
    }
    
    // === HELPER FUNKTIONEN ===
    
    parseStepData(stepDataStr) {
        // Sicheres Parsen von stepData
        const steps = [];
        const stepMatches = stepDataStr.match(/\{[^}]+\}/g);
        
        if (stepMatches) {
            stepMatches.forEach(stepStr => {
                const step = {};
                
                const titleMatch = stepStr.match(/title:\s*["']([^"']+)["']/);
                if (titleMatch) step.title = titleMatch[1];
                
                const descMatch = stepStr.match(/description:\s*["']([^"']+)["']/);
                if (descMatch) step.description = descMatch[1];
                
                const xMatch = stepStr.match(/hotspotX:\s*(\d+)/);
                if (xMatch) step.hotspotX = parseInt(xMatch[1]);
                
                const yMatch = stepStr.match(/hotspotY:\s*(\d+)/);
                if (yMatch) step.hotspotY = parseInt(yMatch[1]);
                
                steps.push(step);
            });
        }
        
        return steps;
    }
    
    cleanText(text) {
        return text
            .replace(/<[^>]+>/g, '')
            .replace(/&[^;]+;/g, ' ')
            .trim();
    }
    
    setupPropertyExtractors() {
        // Hier könnten spezifische Extraktoren registriert werden
        return {};
    }
}

// === GLOBALE API ===

function analyzeSquarespaceCode() {
    const codeInput = document.getElementById('squarespaceCodeInput');
    const code = codeInput?.value.trim();
    
    if (!code) {
        if (typeof showNotification === 'function') {
            showNotification('⚠️ Bitte Code einfügen');
        }
        return;
    }
    
    try {
        // Prüfe zuerst ob es ein Kerberos-Modul ist
        const reimporter = new KerberosReimporter();
        
        if (reimporter.isKerberosModule(code)) {
            console.log('🔄 Erkenne Kerberos-Modul - starte Re-Import');
            const result = reimporter.reimport(code);
            
            if (result) {
                window.analyzedModuleData = result;
                window.currentImportCode = code;
                
                if (confirm(`✅ Kerberos-Modul "${result.type}" erkannt!\n\nJetzt re-importieren?`)) {
                    autoImportAnalyzedCode();
                }
                return;
            }
        }
        
        // Sonst normaler Squarespace-Import
        const analyzer = new SquarespaceAnalyzer();
        window.analyzedModuleData = analyzer.analyze(code);
        window.currentImportCode = code;
        
        if (window.analyzedModuleData) {
            showImportResults(window.analyzedModuleData);
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

// Export
window.KerberosReimporter = KerberosReimporter;
window.analyzeSquarespaceCode = analyzeSquarespaceCode;

console.log('✅ Kerberos Re-Import geladen');