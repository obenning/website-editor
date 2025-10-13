# ============================================
# KERBEROS TEMPLATE MIGRATION SCRIPT v1.0
# Bereinigt templates.js automatisch
# ============================================

$ErrorActionPreference = "Stop"

# === KONFIGURATION ===
$TemplatesPath = ".\js\templates.js"
$BackupPath = ".\js\templates.backup.js"

Write-Host "🚀 Starting Kerberos Template Migration...`n" -ForegroundColor Cyan

try {
    # 1. Backup erstellen
    Write-Host "📦 Creating backup..." -ForegroundColor Yellow
    Copy-Item $TemplatesPath $BackupPath -Force
    Write-Host "✅ Backup saved to: $BackupPath`n" -ForegroundColor Green
    
    # 2. Templates laden
    Write-Host "🔍 Loading templates..." -ForegroundColor Yellow
    $content = Get-Content $TemplatesPath -Raw -Encoding UTF8
    $originalContent = $content
    
    # === 3. PROPERTY-NAMEN MIGRIEREN ===
    Write-Host "🔄 Migrating property names..." -ForegroundColor Yellow
    
    $propertyMigrations = @{
        # Button System
        '"buttonText":'           = '"primaryButtonText":'
        '"buttonLink":'           = '"primaryButtonLink":'
        '"buttonUrl":'            = '"primaryButtonLink":'
        '"buttonBackground":'     = '"primaryButtonBackground":'
        '"buttonBg":'             = '"primaryButtonBackground":'
        '"buttonBgColor":'        = '"primaryButtonBackground":'
        '"buttonColor":'          = '"primaryButtonColor":'
        '"buttonTextColor":'      = '"primaryButtonColor":'
        '"buttonPaddingType":'    = '"primaryButtonPaddingType":'
        '"buttonPadding":'        = '"primaryButtonPadding":'
        '"buttonRadiusType":'     = '"primaryButtonRadiusType":'
        '"buttonRadius":'         = '"primaryButtonRadius":'
        '"buttonShadowType":'     = '"primaryButtonShadowType":'
        '"buttonShadow":'         = '"primaryButtonShadow":'
        '"buttonStyleType":'      = '"primaryButtonStyleType":'
        '"buttonSizeType":'       = '"primaryButtonSizeType":'
        '"buttonIcon":'           = '"primaryButtonIcon":'
        '"buttonHoverBg":'        = '"primaryButtonHoverBg":'
        '"buttonHoverColor":'     = '"primaryButtonHoverColor":'
        '"buttonHoverTransform":' = '"primaryButtonHoverTransform":'
        '"buttonHoverTransformType":' = '"primaryButtonHoverTransformType":'
        '"buttonHoverShadow":'    = '"primaryButtonHoverShadow":'
        '"buttonHoverShadowType":' = '"primaryButtonHoverShadowType":'
        '"buttonSpacing":'        = '"primaryButtonSpacing":'
        '"buttonBorderType":'     = '"primaryButtonBorderType":'
        '"buttonTarget":'         = '"primaryButtonTarget":'
        '"showButton":'           = '"showPrimaryButton":'
        '"showButtonIcon":'       = '"showPrimaryButtonIcon":'
    }
    
    $migrationCount = 0
    foreach ($old in $propertyMigrations.Keys) {
        $new = $propertyMigrations[$old]
        $matches = ([regex]::Matches($content, [regex]::Escape($old))).Count
        if ($matches -gt 0) {
            $content = $content -replace [regex]::Escape($old), $new
            $migrationCount += $matches
            Write-Host "  $old → $new ($matches x)" -ForegroundColor Gray
        }
    }
    
    Write-Host "✅ Migrated $migrationCount properties`n" -ForegroundColor Green
    
    # === 4. TYPE-VALUES NORMALISIEREN ===
    Write-Host "🔧 Normalizing Type property values..." -ForegroundColor Yellow
    
    $typeNormalizations = @{
        # Padding
        '"0\.5rem 1rem"'  = '"small"'
        '"1rem 2rem"'     = '"medium"'
        '"1rem 2\.5rem"'  = '"medium"'
        '"1\.5rem 3rem"'  = '"large"'
        
        # Radius
        '"0"'    = '"none"'
        '"4px"'  = '"small"'
        '"8px"'  = '"medium"'
        '"12px"' = '"medium"'
        '"16px"' = '"large"'
        '"50px"' = '"pill"'
        
        # Shadows (nur wenn in *Type Property)
        '": "0 2px 8px rgba\(6,58,168,0\.15\)"'  = '": "light"'
        '": "0 4px 12px rgba\(6,58,168,0\.25\)"' = '": "medium"'
        '": "0 4px 15px rgba\(6,58,168,0\.25\)"' = '": "medium"'
        '": "0 8px 24px rgba\(6,58,168,0\.35\)"' = '": "strong"'
    }
    
    $normalizationCount = 0
    foreach ($pattern in $typeNormalizations.Keys) {
        $replacement = $typeNormalizations[$pattern]
        $matches = ([regex]::Matches($content, $pattern)).Count
        if ($matches -gt 0) {
            $content = $content -replace $pattern, $replacement
            $normalizationCount += $matches
        }
    }
    
    Write-Host "✅ Normalized $normalizationCount Type values`n" -ForegroundColor Green
    
    # === 5. SHOW/HIDE NORMALISIEREN ===
    Write-Host "👁️  Normalizing show/hide properties..." -ForegroundColor Yellow
    
    # Suche alle "showXYZ": "block|none|inline-flex" und ersetze durch true/false
    $showHidePatterns = @{
        '("show\w+"):\s*"block"'       = '${1}: "true"'
        '("show\w+"):\s*"inline-flex"' = '${1}: "true"'
        '("show\w+"):\s*"inline"'      = '${1}: "true"'
        '("show\w+"):\s*"flex"'        = '${1}: "true"'
        '("show\w+"):\s*"none"'        = '${1}: "false"'
        '("show\w+"):\s*"hidden"'      = '${1}: "false"'
    }
    
    $showHideCount = 0
    foreach ($pattern in $showHidePatterns.Keys) {
        $replacement = $showHidePatterns[$pattern]
        $matches = ([regex]::Matches($content, $pattern)).Count
        if ($matches -gt 0) {
            $content = $content -replace $pattern, $replacement
            $showHideCount += $matches
        }
    }
    
    Write-Host "✅ Normalized $showHideCount show/hide values`n" -ForegroundColor Green
    
    # === 6. PLACEHOLDER-NAMEN AKTUALISIEREN ===
    Write-Host "🔨 Updating placeholders in HTML..." -ForegroundColor Yellow
    
    $placeholderMigrations = @{
        '{{buttonText}}'       = '{{primaryButtonText}}'
        '{{buttonLink}}'       = '{{primaryButtonLink}}'
        '{{buttonBackground}}' = '{{primaryButtonBackground}}'
        '{{buttonColor}}'      = '{{primaryButtonColor}}'
        '{{buttonIcon}}'       = '{{primaryButtonIcon}}'
        '{{buttonPadding}}'    = '{{primaryButtonPadding}}'
        '{{buttonRadius}}'     = '{{primaryButtonRadius}}'
        '{{buttonShadow}}'     = '{{primaryButtonShadow}}'
    }
    
    $placeholderCount = 0
    foreach ($old in $placeholderMigrations.Keys) {
        $new = $placeholderMigrations[$old]
        $matches = ([regex]::Matches($content, [regex]::Escape($old))).Count
        if ($matches -gt 0) {
            $content = $content -replace [regex]::Escape($old), $new
            $placeholderCount += $matches
        }
    }
    
    Write-Host "✅ Updated $placeholderCount placeholders`n" -ForegroundColor Green
    
    # === 7. BEREINIGTE DATEI SPEICHERN ===
    Write-Host "💾 Saving migrated templates..." -ForegroundColor Yellow
    $content | Out-File -FilePath $TemplatesPath -Encoding UTF8 -NoNewline
    Write-Host "✅ Migrated templates saved to: $TemplatesPath`n" -ForegroundColor Green
    
    # === 8. ZUSAMMENFASSUNG ===
    Write-Host ("=" * 60) -ForegroundColor Cyan
    Write-Host "📊 MIGRATION SUMMARY" -ForegroundColor Cyan
    Write-Host ("=" * 60) -ForegroundColor Cyan
    Write-Host "Property Migrations:      $migrationCount" -ForegroundColor White
    Write-Host "Type Normalizations:      $normalizationCount" -ForegroundColor White
    Write-Host "Show/Hide Normalizations: $showHideCount" -ForegroundColor White
    Write-Host "Placeholder Updates:      $placeholderCount" -ForegroundColor White
    Write-Host ("=" * 60) -ForegroundColor Cyan
    
    $totalChanges = $migrationCount + $normalizationCount + $showHideCount + $placeholderCount
    
    if ($totalChanges -gt 0) {
        Write-Host "`n✅ Migration completed successfully!" -ForegroundColor Green
        Write-Host "💡 TIP: Original backup at $BackupPath" -ForegroundColor Yellow
        Write-Host "💡 TIP: Review changes before committing" -ForegroundColor Yellow
    } else {
        Write-Host "`n⚠️  No changes detected - templates may already be migrated" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "`n❌ Migration failed: $_" -ForegroundColor Red
    Write-Host "💡 TIP: Restore from backup at $BackupPath if needed" -ForegroundColor Yellow
    exit 1
}