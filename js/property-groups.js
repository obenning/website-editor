/**
 * UNIFIED PROPERTY GROUPS
 *
 * Wiederverwendbare Property-Gruppen für häufige Modul-Elemente.
 * Jede Gruppe definiert ein Set von Properties mit ihren Typen und Standard-Labels.
 */

const PROPERTY_GROUPS = {

    // =====================
    // TEXT & ÜBERSCHRIFTEN
    // =====================

    heading: {
        content: {
            type: 'richtext',
            label: 'Inhalt',
            default: '<h2>Überschrift</h2>',
            group: 'content'
        },
        tag: {
            type: 'heading-tag-dropdown',
            label: 'Überschriften-Tag',
            default: 'h2',
            group: 'content'
        },
        color: {
            type: 'ci-color-dropdown',
            label: 'Farbe',
            default: '#063AA8',
            group: 'style'
        },
        sizeType: {
            type: 'size-dropdown',
            label: 'Größe',
            default: 'medium',
            group: 'style'
        },
        spacing: {
            type: 'spacing-dropdown',
            label: 'Abstand',
            default: '2rem 0',
            group: 'layout'
        }
    },

    text: {
        content: {
            type: 'richtext',
            label: 'Text',
            default: '<p>Text eingeben...</p>',
            group: 'content'
        },
        color: {
            type: 'color',
            label: 'Farbe',
            default: '#333333',
            group: 'style'
        },
        sizeType: {
            type: 'size-dropdown',
            label: 'Schriftgröße',
            default: 'medium',
            group: 'style'
        }
    },

    subtitle: {
        content: {
            type: 'text',
            label: 'Untertitel',
            default: 'Untertitel eingeben',
            group: 'content'
        },
        color: {
            type: 'color',
            label: 'Farbe',
            default: '#6c757d',
            group: 'style'
        },
        sizeType: {
            type: 'size-dropdown',
            label: 'Größe',
            default: 'medium',
            group: 'style'
        }
    },

    // =====================
    // BUTTONS
    // =====================

    button: {
        text: {
            type: 'text',
            label: 'Button Text',
            default: 'Mehr erfahren',
            group: 'content'
        },
        link: {
            type: 'text',
            label: 'Link URL',
            default: '#',
            group: 'content'
        },
        icon: {
            type: 'icon',
            label: 'Icon',
            default: '',
            group: 'content'
        },
        background: {
            type: 'ci-color-dropdown',
            label: 'Hintergrundfarbe',
            default: '#063AA8',
            group: 'style'
        },
        textColor: {
            type: 'ci-color-dropdown',
            label: 'Textfarbe',
            default: '#ffffff',
            group: 'style'
        },
        paddingType: {
            type: 'spacing-dropdown',
            label: 'Padding',
            default: 'medium',
            group: 'style'
        },
        radiusType: {
            type: 'radius-dropdown',
            label: 'Ecken-Rundung',
            default: 'medium',
            group: 'style'
        },
        shadowType: {
            type: 'shadow-dropdown',
            label: 'Schatten',
            default: 'none',
            group: 'style'
        },
        hoverBackground: {
            type: 'ci-color-dropdown',
            label: 'Hover Hintergrundfarbe',
            default: '#294FC5',
            group: 'hover'
        },
        hoverTextColor: {
            type: 'ci-color-dropdown',
            label: 'Hover Textfarbe',
            default: '#ffffff',
            group: 'hover'
        },
        hoverTransformType: {
            type: 'transform-dropdown',
            label: 'Hover Transform',
            default: 'none',
            group: 'hover'
        }
    },

    // Vereinfachte Button-Variante (nur essentials)
    buttonSimple: {
        text: {
            type: 'text',
            label: 'Button Text',
            default: 'Mehr erfahren',
            group: 'content'
        },
        link: {
            type: 'text',
            label: 'Link',
            default: '#',
            group: 'content'
        },
        background: {
            type: 'ci-color-dropdown',
            label: 'Farbe',
            default: '#063AA8',
            group: 'style'
        },
        textColor: {
            type: 'ci-color-dropdown',
            label: 'Text',
            default: '#ffffff',
            group: 'style'
        },
        hoverBackground: {
            type: 'ci-color-dropdown',
            label: 'Hover Hintergrund',
            default: '#294FC5',
            group: 'hover'
        },
        hoverTextColor: {
            type: 'ci-color-dropdown',
            label: 'Hover Text',
            default: '#ffffff',
            group: 'hover'
        }
    },

    // =====================
    // BILDER
    // =====================

    image: {
        url: {
            type: 'image',
            label: 'Bild auswählen',
            default: '',
            group: 'content'
        },
        alt: {
            type: 'text',
            label: 'Alt-Text',
            default: '',
            group: 'content'
        },
        objectFit: {
            type: 'select',
            label: 'Einpassung',
            default: 'cover',
            config: {
                options: [
                    { value: 'cover', label: 'Cover (füllen)' },
                    { value: 'contain', label: 'Contain (einpassen)' },
                    { value: 'fill', label: 'Fill (strecken)' },
                    { value: 'scale-down', label: 'Scale-down' }
                ]
            },
            group: 'style'
        },
        radiusType: {
            type: 'radius-dropdown',
            label: 'Ecken-Rundung',
            default: 'none',
            group: 'style'
        },
        shadowType: {
            type: 'shadow-dropdown',
            label: 'Schatten',
            default: 'none',
            group: 'style'
        }
    },

    // =====================
    // ICONS
    // =====================

    icon: {
        class: {
            type: 'icon',
            label: 'Icon auswählen',
            default: '&#xf005;',
            group: 'content'
        },
        color: {
            type: 'ci-color-dropdown',
            label: 'Icon Farbe',
            default: '#063AA8',
            group: 'style'
        },
        sizeType: {
            type: 'size-dropdown',
            label: 'Icon Größe',
            default: 'medium',
            group: 'style'
        },
        backgroundColor: {
            type: 'ci-color-dropdown',
            label: 'Container Hintergrund',
            default: 'transparent',
            group: 'style'
        },
        backgroundSize: {
            type: 'range',
            label: 'Container Größe',
            default: '60',
            config: {
                min: 30,
                max: 200,
                step: 5,
                unit: 'px'
            },
            group: 'style'
        },
        backgroundRadius: {
            type: 'radius-dropdown',
            label: 'Container Rundung',
            default: 'none',
            group: 'style'
        }
    },

    // Vereinfachte Icon-Variante
    iconSimple: {
        class: {
            type: 'icon',
            label: 'Icon',
            default: '&#xf005;',
            group: 'content'
        },
        color: {
            type: 'ci-color-dropdown',
            label: 'Farbe',
            default: '#063AA8',
            group: 'style'
        },
        sizeType: {
            type: 'size-dropdown',
            label: 'Größe',
            default: 'medium',
            group: 'style'
        }
    },

    // =====================
    // KARTEN / CARDS
    // =====================

    card: {
        background: {
            type: 'color',
            label: 'Hintergrundfarbe',
            default: '#ffffff',
            group: 'style'
        },
        padding: {
            type: 'spacing-dropdown',
            label: 'Innenabstand',
            default: '2rem',
            group: 'style'
        },
        radiusType: {
            type: 'radius-dropdown',
            label: 'Ecken-Rundung',
            default: 'medium',
            group: 'style'
        },
        shadowType: {
            type: 'shadow-dropdown',
            label: 'Schatten',
            default: 'medium',
            group: 'style'
        },
        borderType: {
            type: 'border-dropdown',
            label: 'Rahmen',
            default: 'none',
            group: 'style'
        },
        hoverTransformType: {
            type: 'transform-dropdown',
            label: 'Hover Transform',
            default: 'lift',
            group: 'hover'
        },
        hoverShadowType: {
            type: 'shadow-dropdown',
            label: 'Hover Schatten',
            default: 'large',
            group: 'hover'
        }
    },

    // =====================
    // LAYOUT & SECTION
    // =====================

    section: {
        backgroundColor: {
            type: 'color',
            label: 'Hintergrundfarbe',
            default: '#ffffff',
            group: 'style'
        },
        spacing: {
            type: 'spacing-dropdown',
            label: 'Abstand',
            default: '4rem 0',
            group: 'layout'
        },
        paddingType: {
            type: 'spacing-dropdown',
            label: 'Innenabstand',
            default: '2rem',
            group: 'layout'
        }
    },

    container: {
        maxWidth: {
            type: 'dimension-dropdown',
            label: 'Maximale Breite',
            default: '1200px',
            group: 'layout'
        },
        gap: {
            type: 'spacing-dropdown',
            label: 'Abstand zwischen Elementen',
            default: '2rem',
            group: 'layout'
        },
        columns: {
            type: 'layout-dropdown',
            label: 'Spalten',
            default: '3',
            group: 'layout'
        }
    },

    // =====================
    // HOVER STATES
    // =====================

    hover: {
        transformType: {
            type: 'transform-dropdown',
            label: 'Transform',
            default: 'lift',
            group: 'hover'
        },
        shadowType: {
            type: 'shadow-dropdown',
            label: 'Schatten',
            default: 'medium',
            group: 'hover'
        },
        color: {
            type: 'ci-color-dropdown',
            label: 'Hover Farbe',
            default: '#294FC5',
            group: 'hover'
        }
    },

    // =====================
    // VISIBILITY
    // =====================

    visibility: {
        show: {
            type: 'boolean',
            label: 'Anzeigen',
            default: 'true',
            group: 'visibility'
        },
        active: {
            type: 'boolean',
            label: 'Aktiv',
            default: 'true',
            group: 'visibility'
        }
    }
};

/**
 * Hilfsfunktion: Erstellt Properties aus einer Gruppe mit einem Präfix
 *
 * @param {string} groupName - Name der Property-Gruppe (z.B. 'button')
 * @param {string} prefix - Präfix für die Property-Keys (z.B. 'primaryButton')
 * @param {object} options - Optionen
 * @param {object} options.overrides - Überschreibungen für einzelne Properties
 * @param {array} options.only - Nur diese Properties aus der Gruppe nehmen
 * @param {array} options.exclude - Diese Properties ausschließen
 * @returns {object} - Property-Schema-Objekt
 */
function createPropertyGroup(groupName, prefix, options = {}) {
    const group = PROPERTY_GROUPS[groupName];

    if (!group) {
        console.warn(`Property group "${groupName}" not found`);
        return {};
    }

    const { overrides = {}, only = null, exclude = [] } = options;
    const properties = {};

    for (const [propKey, propDef] of Object.entries(group)) {
        // Überspringe, wenn "only" angegeben und propKey nicht darin
        if (only && !only.includes(propKey)) continue;

        // Überspringe, wenn in "exclude" Liste
        if (exclude.includes(propKey)) continue;

        const fullKey = prefix + propKey.charAt(0).toUpperCase() + propKey.slice(1);

        properties[fullKey] = {
            ...propDef,
            ...(overrides[propKey] || {})
        };
    }

    return properties;
}

/**
 * Erstellt wiederholende Properties (z.B. benefit1, benefit2, ...)
 *
 * @param {string} groupName - Name der Property-Gruppe
 * @param {string} prefix - Basis-Präfix (z.B. 'benefit')
 * @param {number} count - Anzahl der Wiederholungen
 * @param {object} overrides - Optionale Überschreibungen
 * @returns {object} - Property-Schema-Objekt
 */
function createRepeatingPropertyGroups(groupName, prefix, count, overrides = {}) {
    const properties = {};

    for (let i = 1; i <= count; i++) {
        const indexedPrefix = `${prefix}${i}`;
        const groupProps = createPropertyGroup(groupName, indexedPrefix, overrides);
        Object.assign(properties, groupProps);

        // Add visibility control
        properties[`${indexedPrefix}Active`] = {
            type: 'boolean',
            label: `${prefix} ${i} aktiv`,
            default: i <= 3 ? 'true' : 'false', // First 3 active by default
            group: 'visibility'
        };
    }

    return properties;
}

/**
 * Kombiniert mehrere Property-Gruppen zu einem Schema
 *
 * @param {array} groups - Array von {groupName, prefix, overrides} Objekten
 * @returns {object} - Kombiniertes Property-Schema
 */
function combinePropertyGroups(...groups) {
    const combined = {};

    groups.forEach(({ groupName, prefix = '', overrides = {} }) => {
        const groupProps = createPropertyGroup(groupName, prefix, overrides);
        Object.assign(combined, groupProps);
    });

    return combined;
}

/**
 * Standard-Modul-Schema: Section + Title + Content
 */
const STANDARD_MODULE_SCHEMA = {
    ...createPropertyGroup('section', 'section'),
    ...createPropertyGroup('heading', 'title'),
    ...createPropertyGroup('text', 'content')
};

/**
 * Hero-Schema: Section + Title + Subtitle + CTA Buttons + Background Image
 */
const HERO_MODULE_SCHEMA = {
    ...createPropertyGroup('section', 'section'),
    ...createPropertyGroup('heading', 'title'),
    ...createPropertyGroup('subtitle', 'subtitle'),
    ...createPropertyGroup('button', 'primaryButton'),
    ...createPropertyGroup('buttonSimple', 'secondaryButton'),
    ...createPropertyGroup('image', 'background')
};

/**
 * Card-Grid-Schema: Section + Cards mit Icon/Image + Title + Description
 */
function createCardGridSchema(cardCount = 3) {
    return {
        ...createPropertyGroup('section', 'section'),
        ...createPropertyGroup('heading', 'title'),
        ...createPropertyGroup('container', 'grid'),
        ...createRepeatingPropertyGroups('card', 'card', cardCount)
    };
}
