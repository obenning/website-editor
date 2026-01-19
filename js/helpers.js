        function shouldHideProperty(key) {
            const hiddenProperties = [
                // Größen (übernimmt Squarespace)
                'titleSize', 'textSize', 'buttonTextSize', 'numberSize', 'iconSize',
                'headingSize', 'subtitleSize', 'largeTextSize', 'smallTextSize',

                // Fonts (übernimmt Squarespace)
                'titleFont', 'textFont', 'buttonFont', 'headingFont', 'bodyFont',

                // Veraltete Layout-Properties (ersetzt durch layoutType)
                'imageOrder', 'textOrder',

                // Interne Properties
                'templateId', 'moduleId', 'version'
            ];
            
            // 🆕 CHALLENGE-SOLUTION MODULE: Automatisch generierte Helper Properties verstecken
            if (key.includes('AutoDisplay') || 
                key.startsWith('show') && (key.includes('Point') || key.includes('CTA') || key.includes('Connection') || key.includes('Bottom')) ||
                key === 'showChallengePoints' || key === 'showRequirementPoints' || key === 'showSolutionPoints' ||
                key === 'showCTA' || key === 'showBottomCTA' || key === 'showConnectionLine') {
                return true;
            }

            // === SVG-SPEZIFISCHE VERSTECKUNG (SICHER IMPLEMENTIERT) ===
            if (window.selectedModule && window.selectedModule.templateId === 'kerberos-api-hero-with-text') {
                // Verstecke alle product/global Image Properties für SVG-Module
                if (key.includes('product') && key.includes('Image')) return true;
                if (key.includes('global') && key.includes('Image')) return true;
                if (key === 'svgHeight') return true; // Automatisch berechnet
            }
            
            return hiddenProperties.includes(key);
        }

        function markSelectedModule(moduleEl, moduleId) {
            if (moduleEl) {
                moduleEl.classList.add('selected');
                moduleEl.style.zIndex = '5';
                moduleEl.style.position = 'relative';
                moduleEl.style.border = '2px solid #063AA8';
                moduleEl.style.boxShadow = '0 4px 12px rgba(6,58,168,0.2)';
                console.log('✅ DOM-Element markiert:', moduleId);
            }
        }

        // Sichere Modul-Referenz-Prüfung
        function validateModuleReference(moduleId) {
            if (!moduleId) return false;
            if (!modules || !Array.isArray(modules)) return false;
            return modules.some(m => m && m.id === moduleId);
        }
        
        // Auto-Resize Funktion (Verbessert)
        function applySVGSize(multiplier, aspectRatio) {
            console.log('🔧 applySVGSize called:', { multiplier, aspectRatio });

            const baseSize = 100; // Base-Größe in px
            const height = Math.round(baseSize * parseFloat(multiplier));
            const width = Math.round(height * parseFloat(aspectRatio));

            console.log('📐 Calculated dimensions:', { width, height, aspectRatio });

            updateProperty('svgWidth', width + 'px');
            updateProperty('svgHeight', height + 'px');

            showNotification(`📐 SVG-Größe: ${width}px × ${height}px (Verhältnis: ${aspectRatio.toFixed(2)}:1)`);

            // Properties Panel aktualisieren
            setTimeout(() => {
                renderPropertyPanel();
            }, 100);
        }

        /**
         * Toggle Accordion für Unified Property Panel
         * Unterstützt beide Aufrufvarianten: mit ID-String oder DOM-Element
         */
        function toggleAccordion(target) {
            let accordionContent, accordionIcon;

            if (typeof target === 'string') {
                // Neue Unified System Variante: ID als String
                accordionContent = document.getElementById(target);
                accordionIcon = document.getElementById(target + '-icon');
            } else {
                // Legacy Variante: DOM-Element (this)
                const header = target;
                accordionContent = header.nextElementSibling;
                accordionIcon = header.querySelector('.accordion-icon');
            }

            if (accordionContent) {
                const isVisible = accordionContent.style.display !== 'none';

                if (isVisible) {
                    accordionContent.style.display = 'none';
                    if (accordionIcon) {
                        accordionIcon.textContent = accordionIcon.textContent.includes('▼') ? '▼' : '+';
                    }
                } else {
                    accordionContent.style.display = 'block';
                    if (accordionIcon) {
                        accordionIcon.textContent = accordionIcon.textContent.includes('▼') ? '▲' : '−';
                    }
                }
            }
        }
