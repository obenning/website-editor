// ============================================
// KERBEROS TEMPLATE MIGRATION SCRIPT v1.0
// Bereinigt templates.js automatisch
// ============================================

const fs = require('fs');
const path = require('path');

// === KONFIGURATION ===
const TEMPLATES_PATH = './js/templates.js';
const BACKUP_PATH = './js/templates.backup.js';
const OUTPUT_PATH = './js/templates.js';

// === 1. PROPERTY-MAPPINGS (ALT → NEU) ===
const PROPERTY_MIGRATIONS = {
    // === BUTTON SYSTEM ===
    // Generic → Primary
    'buttonText': 'primaryButtonText',
    'buttonLink': 'primaryButtonLink',
    'buttonUrl': 'primaryButtonLink',
    'buttonBackground': 'primaryButtonBackground',
    'buttonBg': 'primaryButtonBackground',
    'buttonBgColor': 'primaryButtonBackground',
    'buttonColor': 'primaryButtonColor',
    'buttonTextColor': 'primaryButtonColor',
    'buttonPaddingType': 'primaryButtonPaddingType',
    'buttonPadding': 'primaryButtonPadding',
    'buttonRadiusType': 'primaryButtonRadiusType',
    'buttonRadius': 'primaryButtonRadius',
    'buttonShadowType': 'primaryButtonShadowType',
    'buttonShadow': 'primaryButtonShadow',
    'buttonStyleType': 'primaryButtonStyleType',
    'buttonSizeType': 'primaryButtonSizeType',
    'buttonIcon': 'primaryButtonIcon',
    'buttonHoverBg': 'primaryButtonHoverBg',
    'buttonHoverColor': 'primaryButtonHoverColor',
    'buttonHoverTransform': 'primaryButtonHoverTransform',
    'buttonHoverTransformType': 'primaryButtonHoverTransformType',
    'buttonHoverShadow': 'primaryButtonHoverShadow',
    'buttonHoverShadowType': 'primaryButtonHoverShadowType',
    'buttonSpacing': 'primaryButtonSpacing',
    'buttonGap': 'buttonGap', // Bleibt, da es um Layout geht
    'buttonGapType': 'buttonGapType',
    'buttonJustifyType': 'buttonJustifyType',
    'buttonBorderType': 'primaryButtonBorderType',
    'buttonTarget': 'primaryButtonTarget',
    
    // Show/Hide
    'showButton': 'showPrimaryButton',
    'showButtonIcon': 'showPrimaryButtonIcon',
    
    // === ICON SYSTEM ===
    'iconBackgroundSizeType': 'iconContainerSizeType', // Vereinheitlichen
    
    // === IMAGE SYSTEM ===
    'imageHeight': 'imageHeightValue', // Trennung Type/Value
    'imageObjectFit': 'imageObjectFitValue',
    'imageObjectPosition': 'imageObjectPositionValue',
    
    // === TEXT SYSTEM ===
    'textAlignment': 'textAlignmentValue',
    
    // === LAYOUT ===
    'layout': 'layoutValue',
    
    // === BACKGROUND ===
    'backgroundOpacity': 'backgroundOpacityValue',
    'overlayOpacity': 'overlayOpacityValue',
    'blueOverlayOpacity': 'blueOverlayOpacityValue'
};

// === 2. TYPE-VALUE NORMALISIERUNG ===
// Konvertiert direkte Werte in Mapping-Keys
const TYPE_VALUE_NORMALIZATIONS = {
    // Padding
    '0.5rem 1rem': 'small',
    '1rem 2rem': 'medium',
    '1.5rem 3rem': 'large',
    
    // Radius
    '0': 'none',
    '4px': 'small',
    '8px': 'medium',
    '12px': 'medium',
    '16px': 'large',
    '50px': 'pill',
    
    // Shadows
    'none': 'none',
    '0 2px 8px rgba(6,58,168,0.15)': 'light',
    '0 4px 12px rgba(6,58,168,0.25)': 'medium',
    '0 4px 15px rgba(6,58,168,0.25)': 'medium',
    '0 8px 24px rgba(6,58,168,0.35)': 'strong',
    
    // Icon Sizes
    '1.5rem': 'small',
    '2.5rem': 'medium',
    '4rem': 'large',
    '6rem': 'extra-large',
    
    // Text Sizes
    '0.875rem': 'small',
    '1rem': 'medium',
    '1.25rem': 'large',
    '1.5rem': 'extra-large'
};

// === 3. SHOW/HIDE NORMALISIERUNG ===
// Konvertiert CSS-Werte in Boolean-Strings
const SHOW_HIDE_NORMALIZATIONS = {
    'block': 'true',
    'inline-flex': 'true',
    'inline': 'true',
    'flex': 'true',
    'none': 'false',
    'hidden': 'false',
    'true': 'true',
    'false': 'false'
};

// === 4. HAUPT-FUNKTION ===
function migrateTemplates() {
    console.log('🚀 Starting Kerberos Template Migration...\n');
    
    try {
        // 1. Backup erstellen
        console.log('📦 Creating backup...');
        const originalContent = fs.readFileSync(TEMPLATES_PATH, 'utf8');
        fs.writeFileSync(BACKUP_PATH, originalContent, 'utf8');
        console.log(`✅ Backup saved to: ${BACKUP_PATH}\n`);
        
        // 2. Templates parsen
        console.log('🔍 Parsing templates...');
        let content = originalContent;
        
        // 3. Property-Namen migrieren
        console.log('🔄 Migrating property names...');
        const propertyMigrations = [];
        
        for (const [oldName, newName] of Object.entries(PROPERTY_MIGRATIONS)) {
            const regex = new RegExp(`"${oldName}"\\s*:`, 'g');
            const matches = content.match(regex);
            
            if (matches && matches.length > 0) {
                content = content.replace(regex, `"${newName}":`);
                propertyMigrations.push({
                    old: oldName,
                    new: newName,
                    count: matches.length
                });
            }
        }
        
        console.log(`✅ Migrated ${propertyMigrations.length} property types\n`);
        
        // 4. Type-Values normalisieren
        console.log('🔧 Normalizing Type property values...');
        const typeNormalizations = [];
        
        for (const [oldValue, newValue] of Object.entries(TYPE_VALUE_NORMALIZATIONS)) {
            // Suche nur in *Type Properties
            const regex = new RegExp(`("\\w+Type"\\s*:\\s*)"${escapeRegex(oldValue)}"`, 'g');
            const matches = content.match(regex);
            
            if (matches && matches.length > 0) {
                content = content.replace(regex, `$1"${newValue}"`);
                typeNormalizations.push({
                    old: oldValue,
                    new: newValue,
                    count: matches.length
                });
            }
        }
        
        console.log(`✅ Normalized ${typeNormalizations.length} Type values\n`);
        
        // 5. Show/Hide Properties normalisieren
        console.log('👁️  Normalizing show/hide properties...');
        const showHideNormalizations = [];
        
        for (const [oldValue, newValue] of Object.entries(SHOW_HIDE_NORMALIZATIONS)) {
            const regex = new RegExp(`("show\\w+"\\s*:\\s*)"${escapeRegex(oldValue)}"`, 'g');
            const matches = content.match(regex);
            
            if (matches && matches.length > 0) {
                content = content.replace(regex, `$1"${newValue}"`);
                showHideNormalizations.push({
                    old: oldValue,
                    new: newValue,
                    count: matches.length
                });
            }
        }
        
        console.log(`✅ Normalized ${showHideNormalizations.length} show/hide values\n`);
        
        // 6. Spezial-Fixes
        console.log('🔨 Applying special fixes...');
        
        // Fix: Placeholder-Namen aktualisieren
        content = content.replace(/\{\{buttonText\}\}/g, '{{primaryButtonText}}');
        content = content.replace(/\{\{buttonLink\}\}/g, '{{primaryButtonLink}}');
        content = content.replace(/\{\{buttonBackground\}\}/g, '{{primaryButtonBackground}}');
        content = content.replace(/\{\{buttonColor\}\}/g, '{{primaryButtonColor}}');
        content = content.replace(/\{\{buttonIcon\}\}/g, '{{primaryButtonIcon}}');
        
        console.log('✅ Applied special fixes\n');
        
        // 7. Bereinigte Datei speichern
        console.log('💾 Saving migrated templates...');
        fs.writeFileSync(OUTPUT_PATH, content, 'utf8');
        console.log(`✅ Migrated templates saved to: ${OUTPUT_PATH}\n`);
        
        // 8. Zusammenfassung
        console.log('📊 MIGRATION SUMMARY\n' + '='.repeat(50));
        console.log(`Property Migrations: ${propertyMigrations.length}`);
        console.log(`Type Normalizations: ${typeNormalizations.length}`);
        console.log(`Show/Hide Normalizations: ${showHideNormalizations.length}`);
        console.log('='.repeat(50) + '\n');
        
        // 9. Detaillierte Liste (optional)
        if (process.argv.includes('--verbose')) {
            console.log('📋 DETAILED CHANGES\n');
            
            console.log('Property Migrations:');
            propertyMigrations.forEach(m => {
                console.log(`  ${m.old} → ${m.new} (${m.count}x)`);
            });
            
            console.log('\nType Normalizations:');
            typeNormalizations.forEach(m => {
                console.log(`  "${m.old}" → "${m.new}" (${m.count}x)`);
            });
            
            console.log('\nShow/Hide Normalizations:');
            showHideNormalizations.forEach(m => {
                console.log(`  "${m.old}" → "${m.new}" (${m.count}x)`);
            });
        }
        
        console.log('✅ Migration completed successfully!');
        console.log(`\n💡 TIP: Run with --verbose flag for detailed changes`);
        console.log(`💡 TIP: Original backup at ${BACKUP_PATH}`);
        
    } catch (error) {
        console.error('❌ Migration failed:', error.message);
        process.exit(1);
    }
}

// === HELPER FUNCTIONS ===
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// === RUN ===
if (require.main === module) {
    migrateTemplates();
}

module.exports = { migrateTemplates };