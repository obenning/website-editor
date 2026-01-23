/**
 * UNIFIED PROPERTY TYPES REGISTRY
 *
 * Zentrale Definition aller Property-Feldtypen für das Property Panel.
 * Jeder Typ definiert, wie ein Property-Feld gerendert und behandelt wird.
 */

// =====================================================
// HELPER FUNCTIONS - Options Generator
// =====================================================

/**
 * Generiert Options-Objekt aus TYPE_MAPPINGS
 */
function generateOptionsFromMapping(mappingName) {
    const mapping = TYPE_MAPPINGS[mappingName];
    if (!mapping) return {};

    const options = {};
    for (const [key, value] of Object.entries(mapping)) {
        options[key] = value;
    }
    return options;
}

function getSizeOptions(key) {
    if (key.toLowerCase().includes('icon')) {
        return generateOptionsFromMapping('iconSize');
    } else if (key.toLowerCase().includes('title')) {
        return generateOptionsFromMapping('titleSize');
    } else {
        return generateOptionsFromMapping('textSize');
    }
}

function getSpacingOptions(key) {
    return generateOptionsFromMapping('spacing');
}

function getRadiusOptions() {
    return generateOptionsFromMapping('radius');
}

function getShadowOptions() {
    return generateOptionsFromMapping('shadow');
}

function getTransformOptions() {
    return generateOptionsFromMapping('hoverTransform');
}

function getDimensionOptions(key) {
    if (key.toLowerCase().includes('width')) {
        return generateOptionsFromMapping('maxWidth');
    }
    return { 'auto': 'auto', 'sm': '300px', 'md': '500px', 'lg': '800px' };
}

function getGradientOptions() {
    return {
        'none': 'transparent',
        'primary': 'linear-gradient(135deg, #063AA8, #009CE6)',
        'secondary': 'linear-gradient(135deg, #6c757d, #495057)',
        'success': 'linear-gradient(135deg, #28a745, #20c997)',
        'dark': 'linear-gradient(135deg, #343a40, #212529)'
    };
}

function getAlignmentOptions(key) {
    return {
        'left': 'left',
        'center': 'center',
        'right': 'right',
        'justify': 'justify'
    };
}

function getBorderOptions() {
    return {
        'none': 'none',
        'thin': '1px solid #dee2e6',
        'medium': '2px solid #dee2e6',
        'thick': '3px solid #dee2e6'
    };
}

function getEffectOptions(key) {
    return generateOptionsFromMapping('opacity');
}

function getDisplayOptions() {
    return {
        'block': 'block',
        'inline-block': 'inline-block',
        'flex': 'flex',
        'grid': 'grid',
        'none': 'none'
    };
}

function getAnimationOptions() {
    return {
        'none': 'none',
        'fadeIn': 'fadeIn 0.5s ease-in',
        'slideIn': 'slideIn 0.5s ease-out',
        'bounce': 'bounce 1s ease-in-out'
    };
}

function getGridDropdownOptions() {
    return {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '6': '6'
    };
}

function getScaleDropdownOptions() {
    return {
        'none': 'scale(1)',
        'sm': 'scale(1.05)',
        'md': 'scale(1.1)',
        'lg': 'scale(1.15)'
    };
}

// =====================================================
// PROPERTY TYPES
// =====================================================

const PROPERTY_TYPES = {
    // =====================
    // TEXT & CONTENT
    // =====================

    text: {
        label: 'Text',
        description: 'Einfaches Textfeld',
        renderer: (key, value, config = {}) => {
            const placeholder = config.placeholder || '';
            return `<input type="text" class="form-control" value="${value || ''}"
                    oninput="updateProperty('${key}', this.value)"
                    placeholder="${placeholder}">`;
        }
    },

    textarea: {
        label: 'Mehrzeiliger Text',
        description: 'Textfeld für längere Inhalte',
        renderer: (key, value, config = {}) => {
            const minHeight = config.minHeight || '80px';
            const placeholder = config.placeholder || '';
            return `<textarea class="form-control"
                    oninput="updateProperty('${key}', this.value)"
                    style="min-height: ${minHeight};"
                    placeholder="${placeholder}">${value || ''}</textarea>`;
        }
    },

    richtext: {
        label: 'Rich Text',
        description: 'Editor für formatierten Text',
        renderer: (key, value, config = {}) => {
            // Nutzt die bestehende renderRichTextEditor Funktion
            return renderRichTextEditor(key, value);
        }
    },

    number: {
        label: 'Zahl',
        description: 'Numerischer Input',
        renderer: (key, value, config = {}) => {
            const min = config.min !== undefined ? config.min : '';
            const max = config.max !== undefined ? config.max : '';
            const step = config.step || '1';
            return `<input type="number" class="form-control" value="${value || 0}"
                    min="${min}" max="${max}" step="${step}"
                    oninput="updateProperty('${key}', this.value)">`;
        }
    },

    // =====================
    // VISUAL
    // =====================

    color: {
        label: 'Farbe',
        description: 'Farbauswahl',
        renderer: (key, value, config = {}) => {
            // Nutzt die bestehende renderColorPicker Funktion
            return renderColorPicker(key, value);
        }
    },

    image: {
        label: 'Bild',
        description: 'Bildauswahl',
        renderer: (key, value, config = {}) => {
            // Nutzt die bestehende renderImagePicker Funktion
            return renderImagePicker(key, value);
        }
    },

    icon: {
        label: 'Icon',
        description: 'Icon-Auswahl',
        renderer: (key, value, config = {}) => {
            // Nutzt die bestehende renderIconPicker Funktion
            return renderIconPicker(key, value);
        }
    },

    // =====================
    // BOOLEAN & SELECT
    // =====================

    boolean: {
        label: 'Ja/Nein',
        description: 'Checkbox oder Toggle',
        renderer: (key, value, config = {}) => {
            // Nutzt die bestehende renderBooleanPicker Funktion
            return renderBooleanPicker(key, value);
        }
    },

    select: {
        label: 'Auswahl',
        description: 'Dropdown-Menü',
        renderer: (key, value, config = {}) => {
            const options = config.options || [];
            let html = `<select class="form-control" oninput="updateProperty('${key}', this.value)">`;

            options.forEach(option => {
                const optionValue = typeof option === 'object' ? option.value : option;
                const optionLabel = typeof option === 'object' ? option.label : option;
                const selected = value === optionValue ? 'selected' : '';
                html += `<option value="${optionValue}" ${selected}>${optionLabel}</option>`;
            });

            html += `</select>`;
            return html;
        }
    },

    // =====================
    // SPACING & LAYOUT
    // =====================

    spacing: {
        label: 'Abstand',
        description: 'Spacing-Picker',
        renderer: (key, value, config = {}) => {
            // Nutzt die bestehende renderSpacingPicker Funktion
            return renderSpacingPicker(key, value);
        }
    },

    'spacing-dropdown': {
        label: 'Abstand (Dropdown)',
        description: 'Vordefinierte Abstandswerte',
        renderer: (key, value, config = {}) => {
            const options = getSpacingOptions(key);
            return renderDropdown(key, value, options);
        }
    },

    'size-dropdown': {
        label: 'Größe',
        description: 'Vordefinierte Größenwerte',
        renderer: (key, value, config = {}) => {
            const options = getSizeOptions(key);
            return renderDropdown(key, value, options);
        }
    },

    'dimension-dropdown': {
        label: 'Dimension',
        description: 'Breite/Höhe Werte',
        renderer: (key, value, config = {}) => {
            const options = getDimensionOptions(key);
            return renderDropdown(key, value, options);
        }
    },

    // =====================
    // STYLING
    // =====================

    'radius-dropdown': {
        label: 'Rundung',
        description: 'Border-Radius Werte',
        renderer: (key, value, config = {}) => {
            const options = getRadiusOptions();
            return renderDropdown(key, value, options);
        }
    },

    'shadow-dropdown': {
        label: 'Schatten',
        description: 'Vordefinierte Schatten',
        renderer: (key, value, config = {}) => {
            const options = getShadowOptions();
            return renderDropdown(key, value, options);
        }
    },

    'shadow-preset': {
        label: 'Schatten Preset',
        description: 'Visuelle Schatten-Auswahl',
        renderer: (key, value, config = {}) => {
            return renderShadowPreset(key, value);
        }
    },

    'border-dropdown': {
        label: 'Rahmen',
        description: 'Border-Styles',
        renderer: (key, value, config = {}) => {
            const options = getBorderOptions();
            return renderDropdown(key, value, options);
        }
    },

    'border-preset': {
        label: 'Rahmen Preset',
        description: 'Visuelle Rahmen-Auswahl',
        renderer: (key, value, config = {}) => {
            return renderBorderPreset(key, value);
        }
    },

    'gradient-dropdown': {
        label: 'Farbverlauf',
        description: 'Gradient-Styles',
        renderer: (key, value, config = {}) => {
            const options = getGradientOptions();
            return renderDropdown(key, value, options);
        }
    },

    'gradient-preset': {
        label: 'Farbverlauf Preset',
        description: 'Visuelle Gradient-Auswahl',
        renderer: (key, value, config = {}) => {
            return renderGradientPreset(key, value);
        }
    },

    // =====================
    // INTERACTION & EFFECTS
    // =====================

    'transform-dropdown': {
        label: 'Transformation',
        description: 'CSS Transform Werte',
        renderer: (key, value, config = {}) => {
            const options = getTransformOptions();
            return renderDropdown(key, value, options);
        }
    },

    'hover-preset': {
        label: 'Hover-Effekt',
        description: 'Interaktive Hover-Zustände',
        renderer: (key, value, config = {}) => {
            return renderHoverPreset(key, value);
        }
    },

    'animation-dropdown': {
        label: 'Animation',
        description: 'CSS Animations',
        renderer: (key, value, config = {}) => {
            const options = getAnimationOptions();
            return renderDropdown(key, value, options);
        }
    },

    'effect-dropdown': {
        label: 'Effekt',
        description: 'Visuelle Effekte',
        renderer: (key, value, config = {}) => {
            const options = getEffectOptions(key);
            return renderDropdown(key, value, options);
        }
    },

    // =====================
    // ALIGNMENT & POSITION
    // =====================

    position: {
        label: 'Position',
        description: 'Position-Picker',
        renderer: (key, value, config = {}) => {
            return renderPositionPicker(key, value);
        }
    },

    'alignment-dropdown': {
        label: 'Ausrichtung',
        description: 'Text/Content Alignment',
        renderer: (key, value, config = {}) => {
            const options = getAlignmentOptions(key);
            return renderDropdown(key, value, options);
        }
    },

    'display-dropdown': {
        label: 'Anzeige',
        description: 'CSS Display Werte',
        renderer: (key, value, config = {}) => {
            const options = getDisplayOptions();
            return renderDropdown(key, value, options);
        }
    },

    'layout-dropdown': {
        label: 'Layout',
        description: 'Grid/Flex Layout',
        renderer: (key, value, config = {}) => {
            if (key.includes('Grid') || key.includes('Columns')) {
                const options = getGridDropdownOptions();
                return renderDropdown(key, value, options);
            }
            return `<input type="text" class="form-control" value="${value || ''}"
                    oninput="updateProperty('${key}', this.value)">`;
        }
    },

    'scale-dropdown': {
        label: 'Skalierung',
        description: 'Scale Transform Werte',
        renderer: (key, value, config = {}) => {
            const options = getScaleDropdownOptions();
            return renderDropdown(key, value, options);
        }
    },

    'ci-color-dropdown': {
        label: 'CI-Farbe',
        description: 'Corporate Identity Farbpalette',
        renderer: (key, value, config = {}) => {
            const colors = TYPE_MAPPINGS.ciColors;
            let html = `<select class="form-control" onchange="updateProperty('${key}', this.value)" style="font-size: 0.9rem;">`;

            for (const [name, hex] of Object.entries(colors)) {
                const selected = value === hex ? 'selected' : '';
                html += `<option value="${hex}" ${selected} style="background: ${hex}; color: ${hex === '#FFFFFF' ? '#000' : '#fff'};">
                    ${name} (${hex})
                </option>`;
            }

            html += `</select>`;

            // Zeige Farb-Preview
            html += `<div style="margin-top: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                <div style="width: 40px; height: 40px; background: ${value || '#063AA8'}; border: 2px solid #ddd; border-radius: 4px;"></div>
                <span style="font-size: 0.85rem; color: #6c757d;">${value || '#063AA8'}</span>
            </div>`;

            return html;
        }
    },

    'heading-tag-dropdown': {
        label: 'Überschriften-Tag',
        description: 'HTML-Tag für Überschrift (H1-H4)',
        renderer: (key, value, config = {}) => {
            const tags = TYPE_MAPPINGS.headingTags;
            return renderDropdown(key, value, tags);
        }
    },

    // =====================
    // ADVANCED
    // =====================

    advanced: {
        label: 'Erweitert',
        description: 'Für Experten - direkter CSS-Wert',
        renderer: (key, value, config = {}) => {
            const placeholder = config.placeholder || 'Für Experten - CSS-Wert eingeben';
            return `<input type="text" class="form-control" value="${value || ''}"
                    oninput="updateProperty('${key}', this.value)"
                    placeholder="${placeholder}">
                    <small style="color: #6c757d; font-size: 0.75rem;">⚠️ Nur für fortgeschrittene Benutzer</small>`;
        }
    },

    range: {
        label: 'Slider',
        description: 'Range Slider',
        renderer: (key, value, config = {}) => {
            const min = config.min || 0;
            const max = config.max || 100;
            const step = config.step || 1;
            const unit = config.unit || '';
            const currentValue = value || min;

            return `
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <input type="range" class="form-control" value="${currentValue}"
                        min="${min}" max="${max}" step="${step}"
                        oninput="updateProperty('${key}', this.value); document.getElementById('range-value-${key}').textContent = this.value + '${unit}'"
                        style="flex: 1;">
                    <span id="range-value-${key}" style="min-width: 60px; font-size: 0.9rem; font-weight: 600; color: #063AA8;">${currentValue}${unit}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #6c757d; margin-top: 0.25rem;">
                    <span>${min}${unit}</span>
                    <span>${max}${unit}</span>
                </div>
            `;
        }
    }
};

/**
 * Hilfsfunktion: Ermittelt den Property-Typ basierend auf dem Key-Namen
 * Fallback für Legacy-Code, wenn kein expliziter Typ definiert ist
 */
function detectPropertyType(key, value) {
    // Farben
    if (key.toLowerCase().includes('color')) return 'color';

    // Icons
    if (key.toLowerCase().includes('icon') && !key.includes('Size') && !key.includes('Background')) {
        return 'icon';
    }

    // Bilder
    if (key.toLowerCase().includes('image') && key !== 'imageObjectFit' && key !== 'imageObjectPosition') {
        return 'image';
    }

    // Boolean
    if (key.toLowerCase().includes('show') || key.toLowerCase().includes('active') ||
        key.toLowerCase().includes('enable') || value === 'true' || value === 'false') {
        return 'boolean';
    }

    // Spacing
    if (key.toLowerCase().includes('spacing')) return 'spacing-dropdown';

    // Size
    if (key.toLowerCase().includes('size') && key.toLowerCase().includes('type')) {
        return 'size-dropdown';
    }

    // Radius
    if (key.toLowerCase().includes('radius')) return 'radius-dropdown';

    // Shadow
    if (key.toLowerCase().includes('shadow')) return 'shadow-dropdown';

    // Transform
    if (key.toLowerCase().includes('transform')) return 'transform-dropdown';

    // Hover
    if (key.toLowerCase().includes('hover')) return 'hover-preset';

    // Position
    if (key.toLowerCase().includes('position') && !key.match(/contact\d+Position/i)) {
        return 'position';
    }

    // Rich Text (Title, Description, Content)
    if (key.toLowerCase().includes('richtext') ||
        key.toLowerCase().includes('content') ||
        (key.toLowerCase().includes('title') && !key.includes('Color')) ||
        (key.toLowerCase().includes('description') && value && value.length > 100)) {
        return 'richtext';
    }

    // Textarea für längere Texte
    if (typeof value === 'string' && value.length > 100 && !value.includes('<')) {
        return 'textarea';
    }

    // Default: text
    return 'text';
}

/**
 * Rendert ein Property-Feld basierend auf dem Typ
 */
function renderPropertyByType(key, value, type, label, config = {}) {
    const propertyType = PROPERTY_TYPES[type];

    if (!propertyType) {
        console.warn(`Unknown property type: ${type}. Falling back to text input.`);
        return PROPERTY_TYPES.text.renderer(key, value, config);
    }

    let html = `<div class="form-group">`;
    html += `<label class="form-label">${label}</label>`;
    html += propertyType.renderer(key, value, config);
    html += `</div>`;

    return html;
}
