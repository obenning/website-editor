// Universelle Property-Handler für die 21 häufigsten Properties
const UNIVERSAL_PROPERTY_HANDLERS = {
    // Layout & Spacing
    'sectionSpacing': (value) => value || '4rem 0',
    'titleSpacing': (value) => value || '0 0 1rem 0',
    'textSpacing': (value) => value || '0 0 2rem 0',
    'contentGap': (value) => value || '2rem',
    'ctaSpacing': (value) => value || '2rem 0 0 0',
    
    // Colors
    'backgroundColor': (value) => value || '#FFFFFF',
    'titleColor': (value) => value || '#1A1A1A',
    'subtitleColor': (value) => value || '#666666',
    'textColor': (value) => value || '#333333',
    
    // Content
    'title': (value) => value || '',
    'subtitle': (value) => value || '',
    'templateId': (value) => value,
    
    // Primary Button
    'primaryButtonText': (value) => value || 'Mehr erfahren',
    'primaryButtonLink': (value) => value || '#',
    'primaryButtonBackground': (value) => value || '#063AA8',
    'primaryButtonColor': (value) => value || '#FFFFFF',
    'primaryButtonPadding': (value) => value || '1rem 2rem',
    'primaryButtonRadius': (value) => value || '4px',
    'primaryButtonIcon': (value) => value || ''
};

window.UNIVERSAL_PROPERTY_HANDLERS = UNIVERSAL_PROPERTY_HANDLERS;

// === UNIVERSELLE PROPERTIES VERARBEITEN ===
function processUniversalProperties(properties) {
    const processed = {...properties};
    
    Object.keys(UNIVERSAL_PROPERTY_HANDLERS).forEach(key => {
        if (processed[key] !== undefined) {
            processed[key] = UNIVERSAL_PROPERTY_HANDLERS[key](processed[key]);
        }
    });
    
    return processed;
}

window.processUniversalProperties = processUniversalProperties;
console.log('✅ Universelle Property-Handler geladen:', Object.keys(UNIVERSAL_PROPERTY_HANDLERS).length);