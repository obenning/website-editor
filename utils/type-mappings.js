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
        'sm': '1.5rem',
        'md': '2rem',
        'lg': '3rem',
        'xl': '4rem'
    },
    
    textSize: {
        'sm': '0.875rem',
        'md': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem'
    },
    
    titleSize: {
        'sm': '1.5rem',
        'md': '2rem',
        'lg': '2.5rem',
        'xl': '3rem'
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
    }
};

// Export für Nutzung in anderen Dateien
window.TYPE_MAPPINGS = TYPE_MAPPINGS;