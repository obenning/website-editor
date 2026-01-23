// utils/type-mappings.js
// Zentrale Type-Mapping Definitionen für alle Module

const TYPE_MAPPINGS = {
    // ===== SPACING =====
    spacing: {
        'none': '0',
        'xs': '0.5rem 1rem',
        'sm': '0.75rem 1.5rem',
        'md': '1rem 2rem',
        'lg': '1.25rem 2.5rem',
        'xl': '1.5rem 3rem'
    },
    
    // ===== RADIUS =====
    radius: {
        'none': '0',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'full': '9999px'
    },
    
    // ===== SHADOWS =====
    shadow: {
        'none': 'none',
        'sm': '0 2px 4px rgba(0,0,0,0.1)',
        'md': '0 4px 12px rgba(6,58,168,0.1)',
        'lg': '0 8px 24px rgba(6,58,168,0.15)',
        'xl': '0 12px 40px rgba(6,58,168,0.2)'
    },
    
    // ===== SIZES =====
    iconSize: {
        // Kurze Varianten
        'sm': '1.5rem',
        'md': '2rem',
        'lg': '3rem',
        'xl': '4rem',
        // Lange Varianten (für bessere Lesbarkeit)
        'small': '1.5rem',
        'medium': '2rem',
        'large': '3rem',
        'extra-large': '4rem',
        // Zusätzliche Größen
        'xs': '1rem',
        'xxl': '5rem'
    },
    
    textSize: {
        // Kurze Varianten
        'sm': '0.875rem',
        'md': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        // Lange Varianten
        'small': '0.875rem',
        'medium': '1rem',
        'large': '1.125rem',
        'extra-large': '1.25rem'
    },

    titleSize: {
        // Kurze Varianten
        'sm': '1.5rem',
        'md': '2rem',
        'lg': '2.5rem',
        'xl': '3rem',
        // Lange Varianten
        'small': '1.5rem',
        'medium': '2rem',
        'large': '2.5rem',
        'extra-large': '3rem'
    },
    
    // ===== WIDTHS =====
    maxWidth: {
        'sm': '800px',
        'md': '1200px',
        'lg': '1400px',
        'full': '100%'
    },
    
    cardMinWidth: {
        'sm': '250px',
        'md': '300px',
        'lg': '350px'
    },
    
    timelineWidth: {
        'thin': '2px',
        'medium': '4px',
        'thick': '6px'
    },
    
    // ===== ANIMATIONS =====
    transition: {
        'fast': '0.15s',
        'normal': '0.3s',
        'slow': '0.5s'
    },
    
    hoverTransform: {
        'none': 'none',
        'lift': 'translateY(-4px)',
        'scale': 'scale(1.05)',
        'both': 'translateY(-4px) scale(1.02)'
    },
    
    // ===== OPACITY =====
    opacity: {
        'transparent': '0',
        'light': '0.2',
        'medium': '0.5',
        'heavy': '0.8',
        'full': '1'
    },

    // ===== CI-FARBEN =====
    ciColors: {
        'Dunkelblau': '#063AA8',
        'Hellblau': '#009CE6',
        'Schwarz': '#212529',
        'Lila': '#B265E9',
        'Grau': '#ADB5BD',
        'Orange': '#EF8646',
        'Grün': '#57CC6F',
        'Weiß': '#FFFFFF'
    },

    // Hover-Farben für CI-Farben (automatisches Mapping)
    ciColorHovers: {
        '#063AA8': '#294FC5',  // Dunkelblau
        '#009CE6': '#007DB7',  // Hellblau
        '#212529': '#3A3F42',  // Schwarz
        '#B265E9': '#9A52CF',  // Lila
        '#ADB5BD': '#9199A1',  // Grau
        '#EF8646': '#D66B34',  // Orange
        '#57CC6F': '#3FAB5A',  // Grün
        '#FFFFFF': '#F8F9FA'   // Weiß
    },

    // ===== HEADING TAGS =====
    headingTags: {
        'H1': 'h1',
        'H2': 'h2',
        'H3': 'h3',
        'H4': 'h4'
    }
};

// Export für Nutzung in anderen Dateien
window.TYPE_MAPPINGS = TYPE_MAPPINGS;