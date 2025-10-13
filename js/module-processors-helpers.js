// === GENERISCHE HELPER-FUNKTIONEN ===

/**
 * Verarbeitet wiederholende Items (Testimonials, Features, Stats, etc.)
 * Ersetzt 32+ spezialisierte Funktionen!
 */
function processRepeatingItems(module, config) {
    const props = module.properties;
    let output = '';
    let activeCount = 0;

    for (let i = 1; i <= config.maxItems; i++) {
        // Prüfe ob Item aktiv ist
        const isActive = props[`${config.prefix}${i}Active`];
        if (isActive !== 'true' && config.requireActive) continue;

        // Hole alle Properties für dieses Item
        const itemData = {};
        config.properties.forEach(propName => {
            itemData[propName] = props[`${config.prefix}${i}${propName}`] || '';
        });

        // Prüfe ob Pflichtfelder vorhanden sind
        const hasRequiredData = config.requiredProps.every(prop => itemData[prop]);
        if (!hasRequiredData) continue;

        // Generiere HTML mit Template-Funktion
        output += config.template(itemData, i, props);
        activeCount++;
    }

    // Fallback wenn keine Items gefunden
    if (activeCount === 0 && config.fallback) {
        output = config.fallback;
    }

    return { html: output, count: activeCount };
}