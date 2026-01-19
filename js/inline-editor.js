/**
 * INLINE EDITOR SYSTEM
 *
 * Ermöglicht direktes Editieren von Modul-Inhalten ohne Property Panel
 * - Text-Editing mit ContentEditable
 * - Color-Picker Integration
 * - Icon-Picker Integration
 * - Image-Upload Integration
 * - Spacing-Controls
 */

// Globale State
let currentlyEditingElement = null;
let currentEditingProperty = null;
let currentEditingModuleId = null;
let inlineEditorToolbar = null;
let colorPickerPopover = null;

// =====================================================
// 1. INITIALIZATION
// =====================================================

/**
 * Initialisiert das Inline-Editing-System
 */
function initInlineEditor() {
    console.log('🎨 Initializing Inline Editor System...');

    // Erstelle Toolbar für Text-Editing
    createInlineEditorToolbar();

    // Erstelle Color-Picker-Popover
    createColorPickerPopover();

    // Event-Listener für Canvas
    setupInlineEditorListeners();

    console.log('✅ Inline Editor System initialized');
}

/**
 * Richtet Event-Listener für das Inline-Editing ein
 */
function setupInlineEditorListeners() {
    const canvas = document.getElementById('freshCanvas');

    if (!canvas) {
        console.warn('⚠️ Canvas nicht gefunden');
        return;
    }

    // Delegierte Event-Listener auf Canvas-Ebene
    canvas.addEventListener('dblclick', handleDoubleClick, true);
    canvas.addEventListener('click', handleSingleClick, true);

    // Escape-Taste zum Abbrechen
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            disableInlineEditing();
        }
    });
}

// =====================================================
// 2. TEXT-EDITING (CONTENTEDITABLE)
// =====================================================

/**
 * Behandelt Doppelklick-Events für Text-Editing
 */
function handleDoubleClick(e) {
    // Nur in editierbaren Elementen
    const editableElement = e.target.closest('[data-editable-text]');

    if (!editableElement) return;

    e.preventDefault();
    e.stopPropagation();

    const propertyKey = editableElement.getAttribute('data-editable-text');
    const moduleElement = editableElement.closest('.canvas-module');

    if (!moduleElement) {
        console.warn('⚠️ Kein Modul gefunden');
        return;
    }

    const moduleId = moduleElement.getAttribute('data-module-id');

    console.log('📝 Text-Editing aktiviert:', { moduleId, propertyKey });

    enableTextEditing(editableElement, propertyKey, moduleId);
}

/**
 * Aktiviert Text-Editing für ein Element
 */
function enableTextEditing(element, propertyKey, moduleId) {
    // Deaktiviere vorherige Bearbeitung
    if (currentlyEditingElement) {
        disableInlineEditing();
    }

    // Modul auswählen (ohne Property Panel zu öffnen)
    selectModuleForInlineEdit(moduleId);

    // Speichere Kontext
    currentlyEditingElement = element;
    currentEditingProperty = propertyKey;
    currentEditingModuleId = moduleId;

    // Aktiviere ContentEditable
    element.contentEditable = 'true';
    element.classList.add('inline-editing-active');
    element.focus();

    // Selektiere den gesamten Text
    selectElementContents(element);

    // Zeige Toolbar
    showInlineEditorToolbar(element);

    // Blur-Event zum Speichern
    element.addEventListener('blur', handleTextEditingBlur, { once: true });
}

/**
 * Behandelt Blur-Event beim Text-Editing
 */
function handleTextEditingBlur(e) {
    // Warte kurz, damit Toolbar-Klicks noch funktionieren
    setTimeout(() => {
        if (currentlyEditingElement === e.target) {
            saveTextEdit();
        }
    }, 200);
}

/**
 * Speichert Text-Änderungen
 */
function saveTextEdit() {
    if (!currentlyEditingElement || !currentEditingProperty || !currentEditingModuleId) {
        return;
    }

    const newValue = currentlyEditingElement.innerHTML;

    console.log('💾 Speichere Text:', {
        property: currentEditingProperty,
        value: newValue
    });

    // Finde das Modul
    const module = modules.find(m => m.id == currentEditingModuleId);

    if (module) {
        // Aktualisiere Property
        module.properties[currentEditingProperty] = newValue;

        // Triggere Update über das bestehende System
        if (typeof updateProperty === 'function') {
            updateProperty(currentEditingProperty, newValue);
        }
    }

    // Deaktiviere Editing
    disableInlineEditing();
}

/**
 * Deaktiviert Inline-Editing
 */
function disableInlineEditing() {
    if (currentlyEditingElement) {
        currentlyEditingElement.contentEditable = 'false';
        currentlyEditingElement.classList.remove('inline-editing-active');
        currentlyEditingElement = null;
    }

    currentEditingProperty = null;
    currentEditingModuleId = null;

    hideInlineEditorToolbar();
    hideColorPickerPopover();
}

// =====================================================
// 3. COLOR-PICKER
// =====================================================

/**
 * Behandelt Single-Click-Events für Color-Picker
 */
function handleSingleClick(e) {
    // Color-Picker für farbige Elemente
    const colorElement = e.target.closest('[data-editable-color]');

    if (colorElement && !e.target.closest('.inline-editor-toolbar')) {
        e.preventDefault();
        e.stopPropagation();

        const propertyKey = colorElement.getAttribute('data-editable-color');
        const moduleElement = colorElement.closest('.canvas-module');

        if (!moduleElement) return;

        const moduleId = moduleElement.getAttribute('data-module-id');

        console.log('🎨 Color-Picker aktiviert:', { moduleId, propertyKey });

        openColorPicker(colorElement, propertyKey, moduleId);
        return;
    }

    // Icon-Picker für Icons
    const iconElement = e.target.closest('[data-editable-icon]');

    if (iconElement) {
        e.preventDefault();
        e.stopPropagation();

        const propertyKey = iconElement.getAttribute('data-editable-icon');
        const moduleElement = iconElement.closest('.canvas-module');

        if (!moduleElement) return;

        const moduleId = moduleElement.getAttribute('data-module-id');

        console.log('⭐ Icon-Picker aktiviert:', { moduleId, propertyKey });

        openIconPicker(propertyKey, moduleId);
        return;
    }
}

/**
 * Öffnet Color-Picker
 */
function openColorPicker(element, propertyKey, moduleId) {
    const module = modules.find(m => m.id == moduleId);

    if (!module) return;

    const currentColor = module.properties[propertyKey] || '#000000';

    // Position berechnen
    const rect = element.getBoundingClientRect();

    // Color-Picker-Popover positionieren
    colorPickerPopover.style.display = 'block';
    colorPickerPopover.style.left = `${rect.left}px`;
    colorPickerPopover.style.top = `${rect.bottom + 10}px`;

    // Color-Input aktualisieren
    const colorInput = colorPickerPopover.querySelector('#inline-color-input');
    colorInput.value = currentColor;

    // Event-Listener für Änderungen
    colorInput.oninput = (e) => {
        const newColor = e.target.value;

        // Live-Update
        element.style.color = newColor;
        module.properties[propertyKey] = newColor;

        if (typeof updateProperty === 'function') {
            updateProperty(propertyKey, newColor);
        }
    };

    // Schließen-Button
    const closeBtn = colorPickerPopover.querySelector('.close-color-picker');
    closeBtn.onclick = () => {
        hideColorPickerPopover();
    };
}

/**
 * Schließt Color-Picker
 */
function hideColorPickerPopover() {
    if (colorPickerPopover) {
        colorPickerPopover.style.display = 'none';
    }
}

// =====================================================
// 4. ICON-PICKER
// =====================================================

/**
 * Öffnet Icon-Picker-Modal
 */
function openIconPicker(propertyKey, moduleId) {
    const module = modules.find(m => m.id == moduleId);

    if (!module) return;

    // Nutze existierenden Icon-Picker aus property-types.js
    if (typeof renderIconPicker === 'function') {
        // Erstelle temporäres Container-Element
        const container = document.createElement('div');
        container.innerHTML = renderIconPicker(propertyKey, module.properties[propertyKey]);

        // Erstelle Modal
        const modal = document.createElement('div');
        modal.className = 'inline-editor-modal';
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 600px;
            width: 90%;
        `;

        // Backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'inline-editor-backdrop';
        backdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
        `;

        modal.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h3 style="margin: 0; font-family: var(--heading-font-font-family);">Icon auswählen</h3>
                <button class="close-modal" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
            </div>
            ${container.innerHTML}
        `;

        document.body.appendChild(backdrop);
        document.body.appendChild(modal);

        // Schließen-Handler
        const closeModal = () => {
            modal.remove();
            backdrop.remove();
        };

        modal.querySelector('.close-modal').onclick = closeModal;
        backdrop.onclick = closeModal;
    } else {
        alert('Icon-Picker noch nicht verfügbar. Nutzen Sie das Property Panel.');
    }
}

// =====================================================
// 5. UI-KOMPONENTEN
// =====================================================

/**
 * Erstellt die Formatierungs-Toolbar
 */
function createInlineEditorToolbar() {
    const toolbar = document.createElement('div');
    toolbar.id = 'inline-editor-toolbar';
    toolbar.className = 'inline-editor-toolbar';
    toolbar.style.cssText = `
        position: absolute;
        display: none;
        background: linear-gradient(135deg, #063AA8, #009CE6);
        padding: 0.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 9999;
        gap: 0.25rem;
    `;

    toolbar.innerHTML = `
        <button onclick="document.execCommand('bold')" title="Fett" style="background: white; border: none; padding: 0.5rem; border-radius: 4px; cursor: pointer; font-weight: bold;">B</button>
        <button onclick="document.execCommand('italic')" title="Kursiv" style="background: white; border: none; padding: 0.5rem; border-radius: 4px; cursor: pointer; font-style: italic;">I</button>
        <button onclick="document.execCommand('underline')" title="Unterstrichen" style="background: white; border: none; padding: 0.5rem; border-radius: 4px; cursor: pointer; text-decoration: underline;">U</button>
        <div style="width: 1px; background: rgba(255,255,255,0.3); margin: 0 0.25rem;"></div>
        <button onclick="saveTextEdit()" title="Speichern" style="background: #28a745; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-weight: 600;">✓ Speichern</button>
        <button onclick="disableInlineEditing()" title="Abbrechen" style="background: #dc3545; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">✕ Abbrechen</button>
    `;

    document.body.appendChild(toolbar);
    inlineEditorToolbar = toolbar;
}

/**
 * Zeigt die Toolbar über dem Element
 */
function showInlineEditorToolbar(element) {
    if (!inlineEditorToolbar) return;

    const rect = element.getBoundingClientRect();

    inlineEditorToolbar.style.display = 'flex';
    inlineEditorToolbar.style.left = `${rect.left}px`;
    inlineEditorToolbar.style.top = `${rect.top - 60}px`;
}

/**
 * Versteckt die Toolbar
 */
function hideInlineEditorToolbar() {
    if (inlineEditorToolbar) {
        inlineEditorToolbar.style.display = 'none';
    }
}

/**
 * Erstellt Color-Picker-Popover
 */
function createColorPickerPopover() {
    const popover = document.createElement('div');
    popover.id = 'color-picker-popover';
    popover.className = 'color-picker-popover';
    popover.style.cssText = `
        position: fixed;
        display: none;
        background: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 9999;
    `;

    popover.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <label style="font-weight: 600; font-size: 0.9rem; color: #333;">Farbe auswählen</label>
            <input type="color" id="inline-color-input" style="width: 100%; height: 50px; border: none; border-radius: 4px; cursor: pointer;">
            <button class="close-color-picker" style="background: #063AA8; color: white; border: none; padding: 0.5rem; border-radius: 4px; cursor: pointer; font-weight: 600;">Fertig</button>
        </div>
    `;

    document.body.appendChild(popover);
    colorPickerPopover = popover;
}

// =====================================================
// 6. HELPER-FUNKTIONEN
// =====================================================

/**
 * Selektiert den gesamten Inhalt eines Elements
 */
function selectElementContents(element) {
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}

/**
 * Wählt ein Modul aus (ohne Property Panel)
 */
function selectModuleForInlineEdit(moduleId) {
    // Deselektiere andere Module
    document.querySelectorAll('.canvas-module').forEach(el => {
        el.classList.remove('selected');
    });

    // Markiere neues Modul
    const moduleEl = document.querySelector(`[data-module-id="${moduleId}"]`);
    if (moduleEl) {
        moduleEl.classList.add('selected');
    }

    // Setze globale Variable (aber öffne NICHT das Property Panel)
    const module = modules.find(m => m.id == moduleId);
    if (module) {
        window.selectedModule = module;
        selectedModule = module;
    }
}

// =====================================================
// 7. CSS-STYLES
// =====================================================

/**
 * Fügt CSS-Styles für Inline-Editor hinzu
 */
function injectInlineEditorStyles() {
    const styles = `
        <style id="inline-editor-styles">
            /* Inline-Editing aktiv */
            .inline-editing-active {
                outline: 2px solid #063AA8 !important;
                outline-offset: 2px;
                background: rgba(6, 58, 168, 0.05) !important;
                cursor: text !important;
            }

            /* Editierbare Elemente Hover */
            [data-editable-text]:hover:not(.inline-editing-active),
            [data-editable-color]:hover,
            [data-editable-icon]:hover {
                outline: 2px dashed #009CE6;
                outline-offset: 2px;
                cursor: pointer;
            }

            /* Toolbar Buttons */
            .inline-editor-toolbar button:hover {
                opacity: 0.9;
                transform: scale(1.05);
            }

            /* Verhindere Auswahl während Editing */
            .inline-editing-active * {
                user-select: text !important;
            }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', styles);
}

// =====================================================
// 8. INITIALIZATION ON LOAD
// =====================================================

// Auto-initialisierung wenn DOM bereit ist
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        injectInlineEditorStyles();
        // initInlineEditor() wird später von canvas.js aufgerufen
    });
} else {
    injectInlineEditorStyles();
}

console.log('📦 Inline Editor Module geladen');
