/**
 * UNIVERSAL SYNCHRONIZATION MANAGER
 *
 * Synchronisiert Änderungen zwischen Canvas (WYSIWYG) und Property Panel
 * ohne vollständiges Re-Rendering, basierend auf data-property Attributen.
 */

// Sync-Status Flag zur Vermeidung von Endlos-Schleifen
let isSyncing = false;

/**
 * Aktualisiert ein Property im Canvas über data-property Attribut
 * @param {string} moduleId - Die Modul-ID
 * @param {string} propertyKey - Der Property-Key (z.B. 'titleContent')
 * @param {*} value - Der neue Wert
 * @param {string} source - Quelle der Änderung ('canvas' oder 'panel')
 * @returns {boolean} - true wenn erfolgreich aktualisiert
 */
function syncPropertyToCanvas(moduleId, propertyKey, value, source = 'panel') {
    // Verhindere Endlos-Schleifen
    if (isSyncing && source === 'canvas') return false;

    try {
        isSyncing = true;

        const moduleElement = document.querySelector(`[data-module-id="${moduleId}"]`);
        if (!moduleElement) {
            console.warn('⚠️ Modul nicht im Canvas gefunden:', moduleId);
            return false;
        }

        // Finde das Element mit dem entsprechenden data-property Attribut
        const targetElement = moduleElement.querySelector(`[data-property="${propertyKey}"]`);

        if (!targetElement) {
            console.log('ℹ️ Kein data-property Element gefunden für:', propertyKey);
            return false;
        }

        // Bestimme, ob es sich um HTML oder Plaintext handelt
        const contentType = targetElement.getAttribute('data-content-type') || 'plaintext';

        // Aktualisiere den Inhalt
        if (propertyKey.toLowerCase().includes('color') ||
            propertyKey.toLowerCase().includes('background')) {
            // Farb-Properties -> style.color oder style.backgroundColor
            if (propertyKey.toLowerCase().includes('background') &&
                !propertyKey.toLowerCase().includes('text')) {
                targetElement.style.backgroundColor = value;
            } else {
                targetElement.style.color = value;
            }
            console.log('✅ Farbe synchronisiert:', propertyKey, value);
        } else if (propertyKey.toLowerCase().includes('icon') &&
                   propertyKey.toLowerCase().includes('class')) {
            // Icon-Properties -> innerHTML
            targetElement.innerHTML = value;
            console.log('✅ Icon synchronisiert:', propertyKey);
        } else if (propertyKey.toLowerCase().includes('link') ||
                   propertyKey.toLowerCase().includes('url')) {
            // Link/URL-Properties -> href oder src
            if (targetElement.tagName === 'A') {
                targetElement.href = value;
            } else if (targetElement.tagName === 'IMG') {
                targetElement.src = value;
            }
            console.log('✅ Link/URL synchronisiert:', propertyKey, value);
        } else {
            // Text-Properties -> innerHTML oder textContent
            if (contentType === 'html') {
                targetElement.innerHTML = value;
            } else {
                targetElement.textContent = value;
            }
            console.log('✅ Text synchronisiert:', propertyKey);
        }

        return true;

    } catch (error) {
        console.error('❌ Sync-Fehler:', error);
        return false;
    } finally {
        setTimeout(() => {
            isSyncing = false;
        }, 100);
    }
}

/**
 * Aktualisiert das Property Panel wenn eine Änderung im Canvas vorgenommen wurde
 * @param {string} propertyKey - Der Property-Key
 * @param {*} value - Der neue Wert
 */
function syncPropertyToPanel(propertyKey, value) {
    // Verhindere Endlos-Schleifen
    if (isSyncing) return;

    try {
        isSyncing = true;

        // Finde das entsprechende Input-Feld im Property Panel
        const propertyPanel = document.getElementById('propertyPanel');
        if (!propertyPanel) return;

        // Suche nach verschiedenen Input-Typen
        let inputElement = null;

        // Text-Input
        inputElement = propertyPanel.querySelector(`input[oninput*="updateProperty('${propertyKey}'"]`);

        // Textarea
        if (!inputElement) {
            inputElement = propertyPanel.querySelector(`textarea[oninput*="updateProperty('${propertyKey}'"]`);
        }

        // Select
        if (!inputElement) {
            inputElement = propertyPanel.querySelector(`select[oninput*="updateProperty('${propertyKey}'"]`);
        }

        // Color-Input
        if (!inputElement) {
            inputElement = propertyPanel.querySelector(`input[type="color"][data-property-key="${propertyKey}"]`);
        }

        // Rich-Text-Editor
        if (!inputElement) {
            const richTextDiv = propertyPanel.querySelector(`div[contenteditable][data-property-key="${propertyKey}"]`);
            if (richTextDiv) {
                richTextDiv.innerHTML = value;
                console.log('✅ Rich-Text-Editor im Panel aktualisiert:', propertyKey);
                return;
            }
        }

        // Wenn Input gefunden, aktualisiere den Wert
        if (inputElement) {
            if (inputElement.type === 'checkbox') {
                inputElement.checked = value === 'true' || value === true;
            } else {
                inputElement.value = value;
            }
            console.log('✅ Property Panel aktualisiert:', propertyKey);
        }

    } catch (error) {
        console.error('❌ Panel-Sync-Fehler:', error);
    } finally {
        setTimeout(() => {
            isSyncing = false;
        }, 100);
    }
}

/**
 * Universelle Sync-Funktion die von beiden Seiten aufgerufen werden kann
 * @param {string} moduleId - Die Modul-ID
 * @param {string} propertyKey - Der Property-Key
 * @param {*} value - Der neue Wert
 * @param {string} source - 'canvas' oder 'panel'
 */
function syncProperty(moduleId, propertyKey, value, source = 'panel') {
    console.log('🔄 Sync gestartet:', { moduleId, propertyKey, value, source });

    // Finde das Modul und aktualisiere die Properties
    const module = modules.find(m => m.id == moduleId);
    if (module) {
        module.properties[propertyKey] = value;
    }

    if (source === 'canvas') {
        // Canvas → Panel: Aktualisiere Property Panel
        syncPropertyToPanel(propertyKey, value);
    } else if (source === 'panel') {
        // Panel → Canvas: Aktualisiere Canvas-Element
        const success = syncPropertyToCanvas(moduleId, propertyKey, value, source);

        // Bei Fehlschlag: Fallback auf vollständiges Re-Rendering
        if (!success && typeof renderCanvas === 'function') {
            console.log('⚠️ Fallback: Vollständiges Re-Rendering');
            renderCanvas();
        }
    }
}

/**
 * Erweiterte Sync-Funktion mit intelligenter Update-Strategie
 * Versucht zuerst Live-Update, fällt zurück auf Re-Render wenn nötig
 */
function smartSync(moduleId, propertyKey, value, source = 'panel') {
    // Finde das Modul
    const module = modules.find(m => m.id == moduleId);
    if (!module) return;

    // Aktualisiere Properties
    module.properties[propertyKey] = value;

    // Versuche Live-Update über data-property
    const liveUpdateSuccess = syncPropertyToCanvas(moduleId, propertyKey, value, source);

    // Synchronisiere zur anderen Seite
    if (source === 'canvas' && liveUpdateSuccess) {
        syncPropertyToPanel(propertyKey, value);
    }

    // Fallback: Vollständiges Re-Rendering für komplexe Properties
    const complexProperties = [
        'spacing', 'padding', 'margin', 'layout', 'grid', 'flex',
        'position', 'display', 'width', 'height', 'radius', 'shadow'
    ];

    const isComplexProperty = complexProperties.some(prop =>
        propertyKey.toLowerCase().includes(prop)
    );

    if (!liveUpdateSuccess || isComplexProperty) {
        console.log('ℹ️ Komplexes Property oder Sync fehlgeschlagen - Re-Rendering');
        if (typeof renderCanvas === 'function') {
            setTimeout(() => renderCanvas(), 50);
        }
    }
}

// Exportiere Funktionen für globale Nutzung
window.syncPropertyToCanvas = syncPropertyToCanvas;
window.syncPropertyToPanel = syncPropertyToPanel;
window.syncProperty = syncProperty;
window.smartSync = smartSync;

console.log('✅ Sync-Manager geladen');
