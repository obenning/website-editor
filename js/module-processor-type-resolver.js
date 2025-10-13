// Resolver für alle Type-Mapping Properties
function resolveTypeMappings(module) {
    if (!window.TYPE_MAPPINGS) {
        console.warn('⚠️ TYPE_MAPPINGS nicht verfügbar');
        return module.properties;
    }
    
    const props = {...module.properties};
    const mappingRules = {
        // Button (alle Varianten)
        'primaryButtonPaddingType': TYPE_MAPPINGS.spacing,
        'primaryButtonRadiusType': TYPE_MAPPINGS.radius,
        'primaryButtonShadowType': TYPE_MAPPINGS.shadow,
        'secondaryButtonPaddingType': TYPE_MAPPINGS.spacing,
        'secondaryButtonRadiusType': TYPE_MAPPINGS.radius,
        'secondaryButtonShadowType': TYPE_MAPPINGS.shadow,
        'buttonPaddingType': TYPE_MAPPINGS.spacing,
        'buttonRadiusType': TYPE_MAPPINGS.radius,
        'buttonShadowType': TYPE_MAPPINGS.shadow,
        
        // CTA
        'ctaPaddingType': TYPE_MAPPINGS.spacing,
        'ctaRadiusType': TYPE_MAPPINGS.radius,
        'ctaShadowType': TYPE_MAPPINGS.shadow,
        
        // Icon
        'iconSizeType': TYPE_MAPPINGS.iconSize,
        'iconContainerSizeType': TYPE_MAPPINGS.iconSize,
        'iconRadiusType': TYPE_MAPPINGS.radius,
        'iconHoverTransformType': TYPE_MAPPINGS.hoverTransform,
        
        // Card
        'cardShadowType': TYPE_MAPPINGS.shadow,
        'cardRadiusType': TYPE_MAPPINGS.radius,
        'cardPaddingType': TYPE_MAPPINGS.spacing,
        'cardMinWidthType': TYPE_MAPPINGS.cardMinWidth,
        'cardHoverTransformType': TYPE_MAPPINGS.hoverTransform,
        'cardHoverShadowType': TYPE_MAPPINGS.shadow,
        
        // Layout
        'maxWidthType': TYPE_MAPPINGS.maxWidth,
        'timelineWidthType': TYPE_MAPPINGS.timelineWidth,
        'timelineRadiusType': TYPE_MAPPINGS.radius,
        
        // Animation
        'transitionSpeedType': TYPE_MAPPINGS.transition,
        'hoverTransformType': TYPE_MAPPINGS.hoverTransform,
        'buttonHoverTransformType': TYPE_MAPPINGS.hoverTransform,
        
        // Typography & Opacity
        'textSizeType': TYPE_MAPPINGS.textSize,
        'titleSizeType': TYPE_MAPPINGS.titleSize,
        'backgroundOpacityType': TYPE_MAPPINGS.opacity,
        'overlayOpacityType': TYPE_MAPPINGS.opacity
    };
    
    Object.entries(mappingRules).forEach(([typeProp, mapping]) => {
        if (props[typeProp] && mapping[props[typeProp]]) {
            props[typeProp] = mapping[props[typeProp]];
        }
    });
    
    return props;
}

window.resolveTypeMappings = resolveTypeMappings;

console.log('✅ Type-Mapping Resolver geladen');