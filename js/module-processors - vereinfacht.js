// ==========================================
// MODULE PROCESSORS
// Verarbeitet Module basierend auf Template-ID
// ==========================================

// =====================================================
// GLOBALE KERBEROS HELPERS & WIEDERVERWENDBARE KOMPONENTEN
// Füge diese am ANFANG von module_processors.js ein (vor allen anderen Funktionen)
// =====================================================

        // ===== GLOBALE HELPER-FUNKTIONEN =====
        window.kerberosHelpers = {
            
            // === TYPE-MAPPING DICTIONARIES ===
            spacingMap: {
                'none': '0',
                'small': '1rem',
                'medium': '2rem',
                'large': '3rem',
                'extra-large': '4rem'
            },
            
            paddingMap: {
                'none': '0',
                'small': '0.5rem 1rem',
                'medium': '1rem 2rem',
                'large': '1.5rem 3rem',
                'extra-large': '2rem 4rem'
            },
            
            radiusMap: {
                'none': '0',
                'small': '4px',
                'medium': '8px',
                'large': '12px',
                'extra-large': '20px',
                'pill': '999px',
                'circle': '50%'
            },
            
            shadowMap: {
                'none': 'none',
                'light': '0 2px 8px rgba(6,58,168,0.1)',
                'medium': '0 4px 12px rgba(6,58,168,0.2)',
                'strong': '0 8px 24px rgba(6,58,168,0.3)',
                'extra-strong': '0 12px 32px rgba(6,58,168,0.4)'
            },
            
            opacityMap: {
                'none': '0',
                'light': '0.2',
                'medium': '0.4',
                'strong': '0.6',
                'heavy': '0.8',
                'full': '1'
            },
            
            // === CONVERTER-FUNKTIONEN ===
            convertSpacing(value) {
                return this.spacingMap[value] || value || '0';
            },
            
            convertPadding(value) {
                return this.paddingMap[value] || value || '0';
            },
            
            convertRadius(value) {
                return this.radiusMap[value] || value || '0';
            },
            
            convertShadow(value) {
                return this.shadowMap[value] || value || 'none';
            },
            
            convertOpacity(value) {
                return this.opacityMap[value] || value || '0';
            },
            
            // === AUTO-CONVERT (erkennt Type automatisch) ===
            autoConvert(value) {
                // Wenn schon CSS-Wert, return as-is
                if (!value || typeof value !== 'string') return value;
                if (value.match(/^\d+(?:px|rem|em|%|vh|vw)/)) return value;
                if (value.match(/^rgba?\(/)) return value;
                if (value === 'none' || value === 'auto') return value;
                
                // Versuche Mapping
                return this.convertSpacing(value) || 
                    this.convertPadding(value) || 
                    this.convertRadius(value) || 
                    value;
            },
            
            // === BATCH-CONVERTER FÜR PROPERTIES ===
            convertTypeProperties(props, mappings) {
                const converted = {};
                
                Object.entries(mappings).forEach(([propKey, mapType]) => {
                    const value = props[propKey];
                    if (!value) return;
                    
                    switch(mapType) {
                        case 'spacing':
                            converted[propKey] = this.convertSpacing(value);
                            break;
                        case 'padding':
                            converted[propKey] = this.convertPadding(value);
                            break;
                        case 'radius':
                            converted[propKey] = this.convertRadius(value);
                            break;
                        case 'shadow':
                            converted[propKey] = this.convertShadow(value);
                            break;
                        case 'opacity':
                            converted[propKey] = this.convertOpacity(value);
                            break;
                        default:
                            converted[propKey] = value;
                    }
                });
                
                return converted;
            }
        };

        // ===== WIEDERVERWENDBARE CAROUSEL-KOMPONENTE =====
        window.kerberosCarousel = {
            
            // Erstelle eine komplette Carousel-Implementation
            create(config) {
                const {
                    moduleId,           // Eindeutige Modul-ID
                    slides,             // Array von Slide-HTML
                    options = {}        // Optionale Konfiguration
                } = config;
                
                // Default Options
                const opts = {
                    autoPlay: options.autoPlay || false,
                    autoPlayInterval: options.autoPlayInterval || 5000,
                    showNavigation: options.showNavigation !== false,
                    showDots: options.showDots !== false,
                    prevIcon: options.prevIcon || '&#xf060;',
                    nextIcon: options.nextIcon || '&#xf061;',
                    navButtonColor: options.navButtonColor || '#063AA8',
                    dotColor: options.dotColor || '#063AA8',
                    transitionDuration: options.transitionDuration || '0.5s'
                };
                
                const slideCount = slides.length;
                
                // === HTML GENERIERUNG ===
                
                // Slides HTML
                const slidesHtml = slides.map((slideContent, index) => `
                    <div class="kerberos-carousel-slide-${moduleId}" 
                        style="flex: 0 0 100%; 
                                max-width: 100%; 
                                box-sizing: border-box; 
                                display: ${index === 0 ? 'block' : 'none'};">
                        ${slideContent}
                    </div>
                `).join('');
                
                // Navigation Buttons
                const navigationHtml = opts.showNavigation && slideCount > 1 ? `
                    <button class="kerberos-carousel-prev-${moduleId}" 
                            style="position: absolute; 
                                left: 1rem; 
                                top: 50%; 
                                transform: translateY(-50%); 
                                background: ${opts.navButtonColor}; 
                                color: white; 
                                border: none; 
                                width: 50px; 
                                height: 50px; 
                                border-radius: 50%; 
                                cursor: pointer; 
                                font-family: 'Font Awesome 5 Pro'; 
                                font-size: 1.5rem; 
                                display: flex; 
                                align-items: center; 
                                justify-content: center; 
                                box-shadow: 0 4px 12px rgba(0,0,0,0.15); 
                                transition: all 0.3s ease; 
                                z-index: 10;"
                            aria-label="Vorheriges">
                        ${opts.prevIcon}
                    </button>
                    <button class="kerberos-carousel-next-${moduleId}" 
                            style="position: absolute; 
                                right: 1rem; 
                                top: 50%; 
                                transform: translateY(-50%); 
                                background: ${opts.navButtonColor}; 
                                color: white; 
                                border: none; 
                                width: 50px; 
                                height: 50px; 
                                border-radius: 50%; 
                                cursor: pointer; 
                                font-family: 'Font Awesome 5 Pro'; 
                                font-size: 1.5rem; 
                                display: flex; 
                                align-items: center; 
                                justify-content: center; 
                                box-shadow: 0 4px 12px rgba(0,0,0,0.15); 
                                transition: all 0.3s ease; 
                                z-index: 10;"
                            aria-label="Nächstes">
                        ${opts.nextIcon}
                    </button>
                ` : '';
                
                // Dots Navigation
                const dotsHtml = opts.showDots && slideCount > 1 ? `
                    <div style="display: flex; 
                            justify-content: center; 
                            gap: 0.75rem; 
                            margin-top: 2rem;">
                        ${Array.from({ length: slideCount }, (_, i) => `
                            <button class="kerberos-carousel-dot-${moduleId}" 
                                    data-slide="${i}"
                                    style="width: 12px; 
                                        height: 12px; 
                                        border-radius: 50%; 
                                        border: 2px solid ${opts.dotColor}; 
                                        background: ${i === 0 ? opts.dotColor : 'transparent'}; 
                                        cursor: pointer; 
                                        transition: all 0.3s ease; 
                                        padding: 0;"
                                    aria-label="Gehe zu Slide ${i + 1}">
                            </button>
                        `).join('')}
                    </div>
                ` : '';
                
                // Complete Carousel HTML
                const carouselHtml = `
                    <div class="kerberos-carousel-container-${moduleId}" 
                        style="position: relative; overflow: hidden;">
                        <div class="kerberos-carousel-track-${moduleId}" 
                            style="display: flex; 
                                    transition: transform ${opts.transitionDuration} ease;">
                            ${slidesHtml}
                        </div>
                        ${navigationHtml}
                    </div>
                    ${dotsHtml}
                `;
                
                // === JAVASCRIPT GENERIERUNG ===
                const carouselJs = `
                    <script>
                    (function() {
                        const carouselId = 'carousel-${moduleId}';
                        
                        // Prevent double initialization
                        if (window['carouselInit_' + carouselId]) return;
                        window['carouselInit_' + carouselId] = true;
                        
                        let currentSlide = 0;
                        const totalSlides = ${slideCount};
                        
                        function updateCarousel(index) {
                            // Wrap around
                            if (index < 0) index = totalSlides - 1;
                            if (index >= totalSlides) index = 0;
                            
                            currentSlide = index;
                            
                            // Update slides visibility
                            const slides = document.querySelectorAll('.kerberos-carousel-slide-${moduleId}');
                            slides.forEach((slide, i) => {
                                slide.style.display = i === currentSlide ? 'block' : 'none';
                            });
                            
                            // Update dots
                            const dots = document.querySelectorAll('.kerberos-carousel-dot-${moduleId}');
                            dots.forEach((dot, i) => {
                                dot.style.background = i === currentSlide ? '${opts.dotColor}' : 'transparent';
                            });
                        }
                        
                        // Navigation buttons
                        const prevBtn = document.querySelector('.kerberos-carousel-prev-${moduleId}');
                        const nextBtn = document.querySelector('.kerberos-carousel-next-${moduleId}');
                        
                        if (prevBtn) {
                            prevBtn.addEventListener('click', (e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                updateCarousel(currentSlide - 1);
                            });
                        }
                        
                        if (nextBtn) {
                            nextBtn.addEventListener('click', () => updateCarousel(currentSlide + 1));
                        }
                        
                        // Dots navigation
                        document.querySelectorAll('.kerberos-carousel-dot-${moduleId}').forEach((dot, index) => {
                            dot.addEventListener('click', () => updateCarousel(index));
                        });
                        
                        // Auto-play
                        ${opts.autoPlay ? `
                            setInterval(() => {
                                updateCarousel(currentSlide + 1);
                            }, ${opts.autoPlayInterval});
                        ` : ''}
                        
                        // Initialize
                        updateCarousel(0);
                    })();
                    </script>
                `;
                
                return {
                    html: carouselHtml,
                    javascript: carouselJs,
                    complete: carouselHtml + carouselJs
                };
            }
        };

        // ===== CSS DEDUPLIZIERUNGS-HELPER =====
        window.kerberosCssHelper = {
            
            // Tracking für bereits generierte CSS-Blöcke
            generatedCss: new Set(),
            
            // Füge CSS nur einmal hinzu
            addOnce(cssKey, cssContent) {
                if (this.generatedCss.has(cssKey)) {
                    console.log('⏭️ CSS bereits generiert, überspringe:', cssKey);
                    return '';
                }
                
                this.generatedCss.add(cssKey);
                return cssContent;
            },
            
            // Reset (z.B. bei neuem Rendering)
            reset() {
                this.generatedCss.clear();
            }
        };

        console.log('✅ Kerberos Globale Helpers geladen:');
        console.log('   • window.kerberosHelpers - Type-Mapping & Converter');
        console.log('   • window.kerberosCarousel - Wiederverwendbare Carousel-Komponente');
        console.log('   • window.kerberosCssHelper - CSS-Deduplizierung');

        // =====================================================
        // === REPEATING ITEMS HELPER (Ersetzt 32 Loop-Funktionen) ===
        // =====================================================

        /**
         * Verarbeitet wiederholende Items (Testimonials, Features, Stats, Team, etc.)
         * @param {Object} module - Das Modul-Objekt
         * @param {Object} config - Konfiguration für die Item-Verarbeitung
         * @returns {Object} { html: string, count: number }
         */
        function processRepeatingItems(module, config) {
            const props = module.properties;
            let output = '';
            let activeCount = 0;

            for (let i = 1; i <= config.maxItems; i++) {
                // Prüfe ob Item aktiv ist (falls requireActive = true)
                const isActive = props[`${config.prefix}${i}Active`];
                if (config.requireActive && isActive !== 'true') {
                    continue;
                }

                // Hole alle Properties für dieses Item
                const itemData = {};
                config.properties.forEach(propName => {
                    const fullPropName = `${config.prefix}${i}${propName}`;
                    itemData[propName] = props[fullPropName] || '';
                });

                // Prüfe ob Pflichtfelder vorhanden sind
                if (config.requiredProps && config.requiredProps.length > 0) {
                    const hasRequiredData = config.requiredProps.every(prop => 
                        itemData[prop] && itemData[prop].trim() !== ''
                    );
                    if (!hasRequiredData) {
                        continue;
                    }
                }

                // Generiere HTML mit Template-Funktion
                output += config.template(itemData, i, props, module);
                activeCount++;
            }

            // Fallback wenn keine Items gefunden
            if (activeCount === 0 && config.fallback) {
                output = config.fallback;
            }

            console.log(`🔄 processRepeatingItems: ${config.prefix} → ${activeCount} Items generiert`);
            
            return { 
                html: output, 
                count: activeCount 
            };
        }

        /**
         * Generiert Navigation Dots für Carousels
         */
        function generateNavigationDots(count, moduleId, activeIndex = 0, dotColor = '#063AA8') {
            if (count <= 1) return '';
            
            let dots = '';
            for (let i = 0; i < count; i++) {
                const isActive = i === activeIndex;
                dots += `<button class="nav-dot nav-dot-${moduleId}" 
                    data-slide="${i}"
                    aria-label="Gehe zu Slide ${i + 1}"
                    style="width: 12px; 
                           height: 12px; 
                           border-radius: 50%; 
                           border: 2px solid ${dotColor}; 
                           background: ${isActive ? dotColor : 'transparent'}; 
                           cursor: pointer; 
                           transition: all 0.3s ease; 
                           padding: 0; 
                           margin: 0;">
                </button>`;
            }
            return dots;
        }

        console.log('✅ Repeating Items Helper geladen');

        // API-Hero-With-Text Process-Funktion (VEREINFACHT & FUNKTIONAL)
        function processKerberosApiHeroWithText(module, html) {
            console.log('🎯 Processing API Hero mit Text (VEREINFACHT):', module.id);
            
            const props = module.properties || {};
            
            // === BACKGROUND SYSTEM (VEREINFACHT) ===
            let backgroundColor = props.backgroundColor || 'linear-gradient(135deg, #063AA8, #009CE6)';
            
            // Hintergrundbild verarbeiten
            if (props.backgroundImage && props.backgroundImage.trim() !== '') {
                // Beide kombinieren für bessere Darstellung
                backgroundColor = `url('${props.backgroundImage}'), ${backgroundColor}`;
                console.log('🖼️ Hintergrundbild hinzugefügt:', props.backgroundImage);
            } else {
                console.log('🎨 Standard-Hintergrund verwendet:', backgroundColor);
            }
            
            // === SVG SYSTEM (EINFACH & FUNKTIONAL) ===
            const svgUrl = props.svgUrl || '';
            const svgSizeMap = {
                'small': '80px',
                'medium': '120px', 
                'large': '160px',
                'extra-large': '200px'
            };
            const svgSize = svgSizeMap[props.svgSizeType] || svgSizeMap['medium'];
            console.log('🎯 SVG-Größe gesetzt:', props.svgSizeType, '→', svgSize);
            const svgSpacing = props.svgSpacing || '2rem';
            
            let svgElement = '';
            if (svgUrl && svgUrl.trim() !== '') {
                // Priorität: Bild-Editor-Einstellungen > Template-Defaults
                const svgHeight = props.svgHeight || 'auto';
                const actualSvgSize = svgHeight !== 'auto' ? svgHeight : svgSize;
                
            // SVG Custom Properties aus Template lesen (ERST DEKLARIEREN)
            const svgObjectFit = props.svgObjectFit || 'contain';
            const svgObjectPosition = props.svgObjectPosition || 'center';
            const svgCustomCSS = props.svgCustomCSS || '';
            
            // CSS ohne Duplikate zusammenbauen
            const svgStyles = [
                `width: ${actualSvgSize}`,
                `height: auto`,
                `max-width: 100%`,
                `object-fit: ${svgObjectFit}`,
                `object-position: ${svgObjectPosition}`
            ];
            
            // Custom CSS nur hinzufügen wenn vorhanden und nicht Standard
            const customCSS = props.svgCustomCSS || '';
            if (customCSS && customCSS !== 'margin: 0; display: block;') {
                svgStyles.push(customCSS);
            }
                
                svgElement = `<div style="margin-bottom: ${svgSpacing}; display: flex; justify-content: center;">
                    <img src="${svgUrl}" alt="${props.svgAlt || 'API Icon'}" 
                        style="width: ${svgSize} !important; height: auto; max-width: 100%; object-fit: ${svgObjectFit}; object-position: ${svgObjectPosition}; ${svgCustomCSS}" 
                        loading="lazy" />
                </div>`;
                console.log('🖼️ SVG aktiviert - Größe:', actualSvgSize, 'ObjectFit:', svgObjectFit);
            } else {
                console.log('❌ Kein SVG');
            }
            
            // === OVERLAY SYSTEM (VEREINFACHT) ===
            let overlayElements = '';
            if (props.blueOverlayActive === 'true') {
                const blueOverlayColor = props.blueOverlayColor || '#063AA8';
                const opacityMap = { 'light': '0.2', 'medium': '0.4', 'strong': '0.6' };
                const opacity = opacityMap[props.blueOverlayOpacityType] || '0.2';
                overlayElements = `<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: ${blueOverlayColor}; opacity: ${opacity}; z-index: 2;"></div>`;
                console.log('🔵 Blue Overlay aktiviert');
            }
            

            const buttonShadowMap = {
                'none': 'none',
                'light': '0 2px 8px rgba(0,0,0,0.1)',
                'medium': '0 4px 12px rgba(6,58,168,0.2)',
                'strong': '0 8px 24px rgba(6,58,168,0.25)'
            };

            // === ALLE TEMPLATE-ERSETZUNGEN ===
            html = html.replace('{{backgroundColor}}', backgroundColor);
            html = html.replace('{{overlayElements}}', overlayElements);
            html = html.replace('{{svgElement}}', svgElement);
            // Universelle Button-Styles
            const buttonStyles = getUniversalButtonStyles(props);
            html = html.replace('{{buttonBackground}}', buttonStyles.background);
            html = html.replace('{{buttonColor}}', buttonStyles.color);
            html = html.replace('{{buttonPadding}}', buttonStyles.padding);
            html = html.replace('{{buttonRadius}}', buttonStyles.borderRadius);
            html = html.replace('{{buttonShadow}}', buttonStyles.boxShadow);
            html = html.replace('{{buttonShadow}}', buttonShadowMap[props.buttonShadowType] || '0 4px 12px rgba(6,58,168,0.2)');
            html = html.replace('{{subtitleSpacing}}', props.subtitleSpacing || '1rem');
            html = html.replace(/{{moduleId}}/g, module.id);
            
            console.log('✅ API Hero verarbeitet - Hintergrund:', backgroundColor.substring(0, 50) + '...');
            
            return html;
        }

        function processKerberosTextButtonRichtextFixed(module, html) {
            const props = module.properties;

            // === UNIVERSELLE BUTTON-STYLES ===
            const primaryButtonStyles = getUniversalButtonStyles({
                buttonStyleType: props.buttonStyleType || 'primary',
                buttonPaddingType: props.buttonPaddingType || 'medium',
                buttonRadiusType: props.buttonRadiusType || 'medium',
                buttonShadowType: props.buttonShadowType || 'medium',
                buttonBackground: props.buttonBg,
                buttonColor: props.buttonColor
            });

            const secondaryButtonStyles = getUniversalButtonStyles({
                buttonStyleType: props.secondaryButtonStyleType || 'outline',
                buttonPaddingType: props.secondaryButtonPaddingType || 'medium', 
                buttonRadiusType: props.secondaryButtonRadiusType || 'medium',
                buttonShadowType: props.secondaryButtonShadowType || 'none',
                buttonBackground: props.secondaryButtonBg || 'transparent',
                buttonColor: props.secondaryButtonColor
            });

            // === TEMPLATE-ERSETZUNGEN ===
            html = html.replace('{{primaryButtonBackground}}', primaryButtonStyles.background);
            html = html.replace('{{primaryButtonColor}}', primaryButtonStyles.color);
            html = html.replace('{{primaryButtonPadding}}', primaryButtonStyles.padding);
            html = html.replace('{{primaryButtonRadius}}', primaryButtonStyles.borderRadius);
            html = html.replace('{{primaryButtonShadow}}', primaryButtonStyles.boxShadow);
            
            html = html.replace('{{secondaryButtonBackground}}', secondaryButtonStyles.background);
            html = html.replace('{{secondaryButtonTextColor}}', secondaryButtonStyles.color);
            html = html.replace('{{secondaryButtonPadding}}', secondaryButtonStyles.padding);
            html = html.replace('{{secondaryButtonRadius}}', secondaryButtonStyles.borderRadius);
            html = html.replace('{{secondaryButtonShadow}}', secondaryButtonStyles.boxShadow);
            html = html.replace('{{secondaryButtonBorder}}', secondaryButtonStyles.border || props.secondaryButtonBorderType || '2px solid #063AA8');

            return html;
        }
        // SYSTEM-KOMPATIBLE PROCESS-FUNKTION (ÜBERARBEITET)
        function processKerberosHeroAdvancedRichtext(module, html) {
            console.log('🎯 Processing Hero Advanced Rich-Text (SYSTEM-KOMPATIBEL V2):', module.id);
            
            const props = module.properties || {};
            
            // === CONTENT EXTRAKTION ===
            const titleContent = props.titleContent || 'Hero Titel';
            const subtitleContent = props.subtitleContent || '';
            const buttonText = props.buttonText || '';
            const imageUrl = props.imageUrl || '';
            
            // === LAYOUT & STYLING ===
            const layoutType = props.layoutType || 'image-left';
            const contentGap = props.contentGap || '4rem';
            const heightType = props.heightType || 'medium';
            
            // Height-Mapping (einfach und sauber)
            const heightMap = {
                'small': '4rem 0',
                'medium': '6rem 0', 
                'large': '8rem 0',
                'extra-large': '10rem 0'
            };

            // ✅ VERBESSERTES SPACING-SYSTEM
            const isContainerResponsive = props.containerResponsive === 'true';

            // Vertical Spacing Mapping
            const verticalSpacingMap = {
                'none': '0 0',           // ✅ Korrigiert: CSS braucht beide Werte  
                'small': '1rem 0',
                'medium': '2rem 0', 
                'large': '3rem 0',
                'extra-large': '4rem 0'
            };

            const verticalPadding = verticalSpacingMap[props.verticalSpacing] || '2rem 0';
            const sectionPadding = isContainerResponsive ? '0' : (props.sectionSpacing || '6rem 0');
            const sectionMinHeight = isContainerResponsive ? '0' : '400px';
            
            // === BACKGROUND SYSTEM (KORRIGIERT) ===
            const backgroundColor = props.backgroundColor || '#009CE6';
            const backgroundImage = props.backgroundImage || '';
            const backgroundType = props.backgroundType || 'solid';
            
            let backgroundStyle = '';
            if (backgroundImage && backgroundImage.trim() !== '') {
                // Hintergrundbild verwenden
                backgroundStyle = `background-image: url('${backgroundImage}'); background-size: cover; background-position: center;`;
                console.log('🖼️ Background Image aktiviert:', backgroundImage);
            } else {
                // Fallback zu Farbe
                backgroundStyle = `background: ${backgroundColor};`;
                console.log('🎨 Background Color verwendet:', backgroundColor);
            }
            
            // === OVERLAY SYSTEM ===
            const overlayActive = props.overlayActive === 'true';
            const blueOverlayActive = props.blueOverlayActive === 'true';
            
            const overlayOpacityMap = {
                'none': '0', 'light': '0.2', 'medium': '0.4', 
                'strong': '0.6', 'heavy': '0.8', 'full': '1'
            };
            
            let overlayElements = '';
            if (overlayActive) {
                const overlayColor = props.overlayColor || '#000000';
                const overlayOpacity = overlayOpacityMap[props.overlayOpacityType] || '0.4';
                overlayElements += `<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: ${overlayColor}; opacity: ${overlayOpacity}; z-index: 1;"></div>`;
            }
            if (blueOverlayActive) {
                const blueOverlayColor = props.blueOverlayColor || '#063AA8';
                const blueOverlayOpacity = overlayOpacityMap[props.blueOverlayOpacityType] || '0.2';
                overlayElements += `<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: ${blueOverlayColor}; opacity: ${blueOverlayOpacity}; z-index: 2;"></div>`;
            }
            
            // Image-Type-Mappings
            const imageRadiusMap = {
                'none': '0',
                'small': '4px',
                'medium': '8px',
                'large': '12px',
                'extra-large': '16px',
                'circle': '50%',
                'pill': '9999px'
            };

            const imageShadowMap = {
                'none': 'none',
                'light': '0 2px 8px rgba(0,0,0,0.1)',
                'medium': '0 4px 12px rgba(6,58,168,0.2)',
                'strong': '0 8px 24px rgba(6,58,168,0.25)',
                'extra-strong': '0 16px 40px rgba(6,58,168,0.3)'
            };

            // === BUTTON-STYLING (UNIVERSELL KORRIGIERT) ===
            const buttonStyles = getUniversalButtonStyles({
                buttonStyleType: props.buttonStyleType || 'primary',
                buttonPaddingType: props.buttonSizeType || 'medium',
                buttonRadiusType: props.buttonRadiusType || 'medium',
                buttonBackground: props.buttonBackground,
                buttonColor: props.buttonColor
            });

            const actualButtonStyle = buttonStyles.background;
            const actualButtonSize = buttonStyles.padding;
            const actualButtonRadius = buttonStyles.borderRadius;
            const actualButtonColor = buttonStyles.color; // ✅ Für korrekte Textfarbe
            const actualImageRadius = imageRadiusMap[props.imageRadiusType] || '8px';
            const actualImageShadow = imageShadowMap[props.imageShadowType] || '0 2px 8px rgba(0,0,0,0.1)';

            // === CONTENT BEREICHE (MIT ECHTEN CSS-WERTEN) ===

            // Text-Bereich - MIT ECHTEN CSS-WERTEN
            const textContent = `
                <div style="text-align: ${props.textAlignment || 'left'};">
                    ${titleContent ? `<div class="title-wrapper">${titleContent}</div>` : ''}
                    ${subtitleContent ? `<div style="font-family: var(--body-font-font-family); font-size: var(--normal-text-size); line-height: var(--body-font-line-height); color: ${props.subtitleColor || '#FFFFFF'}; margin-bottom: ${props.textSpacing || '2rem'};">${subtitleContent}</div>` : ''}
                    ${buttonText ? `<a class="kerberos-btn kerberos-btn-${module.id}" href="${props.buttonLink || '#'}" style="display: inline-block; padding: ${actualButtonSize}; background: ${actualButtonStyle}; color: ${actualButtonColor}; text-decoration: none; border-radius: ${actualButtonRadius}; font-weight: 600; transition: all 0.3s ease;">${buttonText}</a>` : ''}
                </div>`;
            
            // Image-Bereich - VOLLSTÄNDIG UNIVERSELL-KOMPATIBEL
            // Das universelle System verarbeitet automatisch imageRadiusType und imageShadowType
            const imageContent = `
                <div style="position: relative; overflow: hidden; border-radius: ${actualImageRadius}; box-shadow: ${actualImageShadow};">
                    ${imageUrl ? `<img src="${imageUrl}" alt="${props.imageAlt || 'Bild'}" style="width: 100%; height: ${props.imageHeight || 'auto'}; object-fit: ${props.imageObjectFit || 'cover'}; object-position: ${props.imageObjectPosition || 'center'}; display: block; margin: 0; line-height: 0;" loading="lazy" />` : '<div style="width: 100%; height: 300px; background: #f8f9fa; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #6c757d;">Bild hinzufügen</div>'}
                </div>`;
            
            // === LAYOUT-SYSTEM (SAUBER & FUNKTIONAL) ===
            let gridContent = '';
            let gridCss = '';
            
            switch (layoutType) {
                case 'image-left':
                    gridContent = imageContent + textContent;
                    gridCss = `
                        .kerberos-module-${module.id} .hero-grid {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: ${contentGap};
                            align-items: center;
                            min-height: ${isContainerResponsive ? '0' : '300px'};
                        }`;
                    break;
                    
                case 'image-right':
                    gridContent = textContent + imageContent;
                    gridCss = `
                        .kerberos-module-${module.id} .hero-grid {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: ${contentGap};
                            align-items: center;
                            min-height: ${isContainerResponsive ? '0' : '300px'};
                        }`;
                    break;
                    
                case 'image-top':
                    gridContent = imageContent + textContent;
                    gridCss = `
                        .kerberos-module-${module.id} .hero-grid {
                            display: grid;
                            grid-template-columns: 1fr;
                            gap: ${contentGap};
                            align-items: center;
                            text-align: center;
                        }`;
                    break;
                    
                case 'image-bottom':
                    gridContent = textContent + imageContent;
                    gridCss = `
                        .kerberos-module-${module.id} .hero-grid {
                            display: grid;
                            grid-template-columns: 1fr;
                            gap: ${contentGap};
                            align-items: center;
                            text-align: center;
                        }`;
                    break;
                    
                default:
                    gridContent = textContent + imageContent;
                    gridCss = `
                        .kerberos-module-${module.id} .hero-grid {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: ${contentGap};
                            align-items: center;
                        }`;
            }
                        
            // === RESPONSIVE HEIGHT SYSTEM ===
            const mobileHeight = heightMap[props.mobileHeightType] || '4rem 0';
            const tabletHeight = heightMap[props.tabletHeightType] || '6rem 0';

            // === FINALES HTML GENERIEREN (CONTAINER-RESPONSIVE) - MODULE_3 PATTERN ===
            const content = `
                <style>
                    /* 1. SQUARESPACE CODE-BLOCK FÜLLUNG */
                    .kerberos-module-${module.id} {
                        height: 100% !important;
                        min-height: 100% !important;
                        display: block !important;
                        box-sizing: border-box !important;
                    }
                   
                    /* 2. Container-Höhen-Anpassung für Squarespace - VIEWPORT VERSION */
                    .kerberos-module-${module.id} section {
                        position: relative !important;
                        min-height: ${isContainerResponsive ? 'auto' : sectionMinHeight} !important;          
                        height: ${isContainerResponsive ? '100vh' : '100%'} !important;
                        width: 100% !important;
                        margin: 0 !important;
                        display: flex !important;
                        align-items: center !important;
                        box-sizing: border-box !important;
                        background-size: cover !important;
                        background-position: center !important;
                        background-attachment: scroll !important;
                    }
                    
                    /* 3. Responsive Heights & Mobile Fixes */
                    @media (max-width: 768px) {
                        .kerberos-module-${module.id} section { 
                            padding: ${isContainerResponsive ? verticalPadding : '3rem 0'} !important; 
                            min-height: auto !important;
                            height: auto !important;
                            background-attachment: scroll !important;
                        }
                    }
                    
                    @media (max-width: 480px) {
                        .kerberos-module-${module.id} section { 
                            padding: 2rem 0 !important; 
                        }
                        .kerberos-module-${module.id} > section > div {
                            padding: 0 1rem !important;
                        }
                    }
                    
                    @media (max-width: 380px) {
                        .kerberos-module-${module.id} section { 
                            padding: 1.5rem 0 !important; 
                        }
                    }
                    
                    @media (min-width: 769px) and (max-width: 1024px) {
                        .kerberos-module-${module.id} section { 
                            padding: ${tabletHeight} !important; 
                        }
                    }

                    /* 4. Typography Responsive - Alle RichText-Elemente */
                    .kerberos-module-${module.id} .title-wrapper h1,
                    .kerberos-module-${module.id} .title-wrapper h2,
                    .kerberos-module-${module.id} .title-wrapper h3,
                    .kerberos-module-${module.id} .title-wrapper h4,
                    .kerberos-module-${module.id} .title-wrapper p {
                        font-size: var(--heading-1-size) !important;
                    }

                    @media (max-width: 768px) {
                        .kerberos-module-${module.id} .title-wrapper h1,
                        .kerberos-module-${module.id} .title-wrapper h2,
                        .kerberos-module-${module.id} .title-wrapper h3,
                        .kerberos-module-${module.id} .title-wrapper h4,
                        .kerberos-module-${module.id} .title-wrapper p {
                            font-size: 1.8rem !important;
                            line-height: 1.2 !important;
                        }
                    }

                    @media (max-width: 480px) {
                        .kerberos-module-${module.id} .title-wrapper h1,
                        .kerberos-module-${module.id} .title-wrapper h2,
                        .kerberos-module-${module.id} .title-wrapper h3,
                        .kerberos-module-${module.id} .title-wrapper h4,
                        .kerberos-module-${module.id} .title-wrapper p {
                            font-size: 1.5rem !important;
                            line-height: 1.1 !important;
                        }
                    }

                    @media (max-width: 380px) {
                        .kerberos-module-${module.id} .title-wrapper h1,
                        .kerberos-module-${module.id} .title-wrapper h2,
                        .kerberos-module-${module.id} .title-wrapper h3,
                        .kerberos-module-${module.id} .title-wrapper h4,
                        .kerberos-module-${module.id} .title-wrapper p {
                            font-size: 1.3rem !important;
                            line-height: 1.1 !important;
                        }
                    }
                </style>
                
                <div class="kerberos-module-${module.id}">
                    <section style="position: relative; padding: ${sectionPadding}; ${backgroundStyle}; ${isContainerResponsive ? 'height: 100%; box-sizing: border-box; display: flex; align-items: center;' : ''}">
                        ${overlayElements}
                        <div style="position: relative; z-index: 3; max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                            <div class="hero-grid hero-layout-grid-${module.id}" style="display: grid; align-items: center; min-height: ${isContainerResponsive ? '0' : '300px'}; gap: ${contentGap}; ${isContainerResponsive ? `padding: ${verticalPadding};` : ''}">
                                ${gridContent}
                            </div>
                        </div>
                        <style>
                            ${gridCss}
                        </style>
                    </section>
                </div>
            `;

            // === RICHTEXT-STYLES INJECTION ===
            const richTextStyles = `
                <style>
                    /* RichText-Element-Styles für ${module.id} */
                    .kerberos-module-${module.id} .title-wrapper {
                        margin-bottom: ${props.titleSpacing || '1rem'};
                    }
                    
                    .kerberos-module-${module.id} .title-wrapper h1,
                    .kerberos-module-${module.id} .title-wrapper h2,
                    .kerberos-module-${module.id} .title-wrapper h3,
                    .kerberos-module-${module.id} .title-wrapper h4,
                    .kerberos-module-${module.id} .title-wrapper h5,
                    .kerberos-module-${module.id} .title-wrapper h6,
                    .kerberos-module-${module.id} .title-wrapper p {
                        font-family: var(--heading-font-font-family) !important;
                        color: ${props.titleColor || '#FFFFFF'} !important;
                        margin: 0 !important;
                        line-height: var(--heading-font-line-height) !important;
                        font-weight: var(--heading-font-font-weight) !important;
                    }
                    
                    /* Responsive Font Sizes für RichText */
                    .kerberos-module-${module.id} .title-wrapper h1 { font-size: var(--heading-1-size) !important; }
                    .kerberos-module-${module.id} .title-wrapper h2 { font-size: var(--heading-2-size) !important; }
                    .kerberos-module-${module.id} .title-wrapper h3 { font-size: var(--heading-3-size) !important; }
                    .kerberos-module-${module.id} .title-wrapper h4 { font-size: var(--heading-4-size) !important; }
                    .kerberos-module-${module.id} .title-wrapper p { font-size: var(--heading-1-size) !important; }
                    
                    /* Mobile Responsive für alle RichText-Elemente */
                    @media (max-width: 768px) {
                        .kerberos-module-${module.id} .title-wrapper h1,
                        .kerberos-module-${module.id} .title-wrapper h2,
                        .kerberos-module-${module.id} .title-wrapper h3,
                        .kerberos-module-${module.id} .title-wrapper h4,
                        .kerberos-module-${module.id} .title-wrapper p {
                            font-size: 1.8rem !important;
                            line-height: 1.2 !important;
                        }
                    }
                    
                    @media (max-width: 480px) {
                        .kerberos-module-${module.id} .title-wrapper h1,
                        .kerberos-module-${module.id} .title-wrapper h2,
                        .kerberos-module-${module.id} .title-wrapper h3,
                        .kerberos-module-${module.id} .title-wrapper h4,
                        .kerberos-module-${module.id} .title-wrapper p {
                            font-size: 1.5rem !important;
                            line-height: 1.1 !important;
                        }
                    }
                    
                    @media (max-width: 380px) {
                        .kerberos-module-${module.id} .title-wrapper h1,
                        .kerberos-module-${module.id} .title-wrapper h2,
                        .kerberos-module-${module.id} .title-wrapper h3,
                        .kerberos-module-${module.id} .title-wrapper h4,
                        .kerberos-module-${module.id} .title-wrapper p {
                            font-size: 1.3rem !important;
                            line-height: 1.1 !important;
                        }
                        
                        .kerberos-module-${module.id} .title-wrapper {
                            margin-bottom: 0.5rem !important;
                        }
                    }
                </style>
            `;

            const finalContent = content + richTextStyles;

            console.log('✅ Hero Advanced Rich-Text Content generiert (System-kompatibel)');

            // Template-Ersetzung
            return html.replace('{{processedContent}}', finalContent);
        }

        
        function processKerberosFAQ(module, html) {
            const props = module.properties;
            let faqItems = '';

            // Erweitert auf 10 FAQs statt nur 5
            for (let i = 1; i <= 10; i++) {
                const question = props[`faq${i}Question`];
                const answer = props[`faq${i}Answer`];
                const isActive = props[`faq${i}Active`] === 'true';

                if (question && answer && isActive) {
                    faqItems += `
                        <div class="kerberos-faq-item" data-faq-id="${i}" style="margin-bottom: 1rem; border: 1px solid ${props.borderColor}; border-radius: 8px; background: ${props.cardBackground}; transition: all 0.3s ease; cursor: default;">
                            <div class="faq-header" style="padding: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                                <h3 style="font-family: var(--heading-font-font-family); font-size: var(--heading-4-size); color: ${props.titleColor}; margin: 0; font-weight: 600;">${question}</h3>
                                <div class="faq-icon" style="font-family: 'Font Awesome 5 Pro'; font-size: 1.25rem; color: ${props.hoverColor}; transition: transform 0.3s ease;">&#xf067;</div>
                            </div>
                            <div class="faq-content" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease;">
                                <div style="padding: 0 1.5rem 1.5rem 1.5rem; color: ${props.subtitleColor}; line-height: 1.6; font-family: var(--body-font-font-family); font-size: var(--normal-text-size);">${answer}</div>
                            </div>
                        </div>`;
                }
            }

            return html.replace('{{faqItems}}', faqItems);
        }

        // Füge auch die spezifische FAQ Accordion Funktion hinzu
        function processKerberosFaqAccordion(module, html) {
            console.log('🔧 Processing FAQ Accordion für Modul:', module.name);
            return processKerberosFAQ(module, html);
        }

        // SVG-Hero Process-Funktion (VOLLSTÄNDIG KORRIGIERT)
        function processKerberosSvgHero(module, html) {
            console.log('🎯 Processing SVG Hero (KORRIGIERT V4):', module.id);
            
            const props = module.properties || {};
            
            // === GRADIENT SYSTEM ===
            const gradientMap = {
                'kerberos-primary': 'linear-gradient(135deg, #063AA8, #009CE6)',
                'kerberos-secondary': 'linear-gradient(135deg, #B265E9, #EF8646)',
                'kerberos-dark': 'linear-gradient(135deg, #212529, #495057)',
                'kerberos-light': 'linear-gradient(135deg, #F8F9FA, #E9ECEF)',
                'blue-ocean': 'linear-gradient(135deg, #0066CC, #00CCFF)',
                'purple-sunset': 'linear-gradient(135deg, #667eea, #764ba2)',
                'orange-fire': 'linear-gradient(135deg, #f093fb, #f5576c)',
                'green-nature': 'linear-gradient(135deg, #4facfe, #00f2fe)',
                'dark-night': 'linear-gradient(135deg, #2c3e50, #3498db)',
                'custom': props.backgroundColor || '#063AA8'
            };
            
            // === BACKGROUND SYSTEM ===
            const backgroundType = props.backgroundType || 'gradient';
            const backgroundImage = props.backgroundImage || '';
            const backgroundGradientType = props.backgroundGradientType || 'kerberos-primary';
            
            let responsiveBackground = '';
            if (backgroundImage && backgroundImage.trim() !== '') {
                const fallbackGradient = gradientMap[backgroundGradientType] || gradientMap['kerberos-primary'];
                responsiveBackground = `background-image: url('${backgroundImage}'); background-size: cover; background-position: center; background: ${fallbackGradient};`;
            } else if (backgroundType === 'gradient') {
                const selectedGradient = gradientMap[backgroundGradientType] || gradientMap['kerberos-primary'];
                responsiveBackground = `background: ${selectedGradient};`;
            } else {
                responsiveBackground = `background: ${props.backgroundColor || 'linear-gradient(135deg, #063AA8, #009CE6)'};`;
            }
            
            // === SVG SYSTEM (KOMPLETT KORRIGIERT) ===
            const svgType = props.svgType || 'url';
            const svgSizeMap = {
                'small': '100px',
                'medium': '150px',
                'large': '200px',
                'extra-large': '250px'
            };
            const svgSize = svgSizeMap[props.svgSizeType] || '150px';
            const svgMobileSize = props.svgMobileSize || '120px';
            const svgSpacing = props.svgSpacing || '2rem';
            const showSvg = props.showSvg === 'true';
            
            let svgElement = '';
            if (showSvg) {
                if (svgType === 'url' && props.svgUrl) {
                    svgElement = `<div style="margin-bottom: ${svgSpacing}; display: flex; justify-content: center;">
                        <img src="${props.svgUrl}" alt="${props.svgAlt || 'SVG Grafik'}" 
                            class="hero-svg"
                            style="width: ${svgSize}; height: auto; max-width: 100%; max-height: ${svgSize}; object-fit: contain;" 
                            loading="lazy" />
                    </div>`;
                    console.log('🖼️ URL-SVG aktiviert - Größe begrenzt auf:', svgSize);
                    
                } else if (svgType === 'code' && props.svgCode) {
                    svgElement = `<div style="margin-bottom: ${svgSpacing}; display: flex; justify-content: center;">
                        <div class="hero-svg-code" style="width: ${svgSize}; height: auto; max-height: ${svgSize}; color: ${props.svgColor || '#FFFFFF'}; display: flex; align-items: center; justify-content: center;">
                            ${props.svgCode}
                        </div>
                    </div>`;
                    console.log('📝 Code-SVG aktiviert - Größe begrenzt auf:', svgSize);
                } else {
                    console.log('❌ Kein gültiges SVG - Platz wird entfernt');
                }
            } else {
                console.log('🚫 SVG ausgeblendet');
            }
            
            // === OVERLAY SYSTEM ===
            const overlayActive = props.overlayActive === 'true';
            const blueOverlayActive = props.blueOverlayActive === 'true';
            
            const overlayOpacityMap = {
                'none': '0', 'light': '0.2', 'medium': '0.4', 
                'strong': '0.6', 'heavy': '0.8', 'full': '1'
            };
            
            let overlayElements = '';
            if (overlayActive) {
                const overlayColor = props.overlayColor || '#000000';
                const overlayOpacity = overlayOpacityMap[props.overlayOpacityType] || '0.4';
                overlayElements += `<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: ${overlayColor}; opacity: ${overlayOpacity}; z-index: 1;"></div>`;
            }
            if (blueOverlayActive) {
                const blueOverlayColor = props.blueOverlayColor || '#063AA8';
                const blueOverlayOpacity = overlayOpacityMap[props.blueOverlayOpacityType] || '0.2';
                overlayElements += `<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: ${blueOverlayColor}; opacity: ${blueOverlayOpacity}; z-index: 2;"></div>`;
            }
            
            // === CONTENT ELEMENTS (KORRIGIERT) ===
            const showSubtitle = props.showSubtitle === 'true';
            const showText = props.showText === 'true';
            const showButton = props.showButton === 'true';
            const showButtonIcon = props.showButtonIcon === 'true';
            
            let subtitleElement = '';
            if (showSubtitle && props.subtitle) {
                subtitleElement = `<div style="font-family: var(--body-font-font-family); font-size: var(--large-text-size); line-height: var(--body-font-line-height); color: ${props.subtitleColor || '#FFFFFF'}; max-width: 800px; margin: 0 auto ${props.textSpacing || '2rem'} auto;">${props.subtitle}</div>`;
            }
            
            let textElement = '';
            if (showText && props.text) {
                textElement = `<div style="font-family: var(--body-font-font-family); font-size: var(--body-text-size); line-height: var(--body-font-line-height); color: ${props.textColor || '#FFFFFF'}; max-width: 800px; margin: 0 auto ${props.textSpacing || '2rem'} auto;">${props.text}</div>`;
            }
            
            // === BUTTON-STYLING (UNIVERSELL) ===
            const buttonStyles = getUniversalButtonStyles(props, module.id);


            const buttonShadowMap = {
                'none': 'none',
                'light': '0 2px 8px rgba(0,0,0,0.1)',
                'medium': '0 4px 12px rgba(6,58,168,0.2)',
                'strong': '0 8px 24px rgba(6,58,168,0.25)'
            };

            let buttonElement = '';
            if (showButton && props.buttonText) {
                // Universelle Button-Styles
                const buttonStyles = getUniversalButtonStyles(props);
                const actualButtonBackground = buttonStyles.background;
                const actualButtonColor = buttonStyles.color;
                const actualButtonPadding = buttonStyles.padding;
                const actualButtonRadius = buttonStyles.borderRadius;
                const actualButtonShadow = buttonStyles.boxShadow;
                
                const iconElement = (showButtonIcon && props.buttonIcon) ? `<span style="font-family: 'Font Awesome 5 Pro';">${props.buttonIcon}</span>` : '';
                
                buttonElement = `<a class="kerberos-btn kerberos-btn-${module.id}" href="${props.buttonLink || '#'}" 
                    style="font-family: var(--button-font-family); font-weight: var(--button-font-weight); 
                        background: ${actualButtonBackground}; color: ${actualButtonColor}; 
                        padding: ${actualButtonPadding}; border-radius: ${actualButtonRadius}; 
                        text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; 
                        box-shadow: ${actualButtonShadow}; transition: all 0.3s ease; 
                        border: 2px solid rgba(255,255,255,0.3);">
                    ${props.buttonText}
                    ${iconElement}
                </a>`;
            }
            
            // === TEMPLATE-ERSETZUNGEN (ALLE WICHTIGEN) ===
            html = html.replace('{{responsiveBackground}}', responsiveBackground);
            html = html.replace('{{overlayElements}}', overlayElements);
            html = html.replace('{{svgElement}}', svgElement);
            html = html.replace('{{subtitleElement}}', subtitleElement);
            html = html.replace('{{textElement}}', textElement);
            html = html.replace('{{buttonElement}}', buttonElement);
            html = html.replace('{{svgHoverTransform}}', props.svgHoverTransform || 'scale(1.05)');
            html = html.replace('{{svgMobileSize}}', svgMobileSize);
            html = html.replace(/{{moduleId}}/g, module.id);
            
            console.log('✅ SVG Hero Content generiert - VOLLSTÄNDIG KORRIGIERT');
            
            return html;
        }
        

        function processKerberosTripleSolution(module, html) {
            const props = module.properties;

            console.log('🔍 SOLUTION TRIPLE - Process läuft!');
            // WICHTIG: Generiere die Solution Boxes HTML
            let solutionBoxesHtml = '';
            
            // Challenge Box
            if (props.challengeTitle || props.challengePoint1) {
                solutionBoxesHtml += `
                <div class="solution-box challenge-box" style="flex: 1; background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); border-top: 4px solid #e74c3c; transition: all 0.3s ease;">
                    <div class="box-header">
                        <i class="box-icon" style="color: ${props.challengeIconColor || '#e74c3c'}; font-family: 'Font Awesome 5 Pro', sans-serif; font-weight: 900; font-style: normal;">${props.challengeIcon || '⚠️'}</i>
                        <h3 class="box-title" style="color: ${props.challengeTitleColor || '#333'};">${props.challengeTitle || 'Challenge'}</h3>
                    </div>
                    <div class="box-content">
                        ${props.challengeText ? `<p style="color: ${props.challengeTextColor || '#666'};">${props.challengeText}</p>` : ''}
                        <ul class="solution-list">
                            ${props.challengePoint1 ? `<li style="display: ${props.challengePoint1AutoDisplay || 'block'};"><span style="font-family: 'Font Awesome 5 Pro', sans-serif; font-weight: 900; font-style: normal;">${props.challengeListIcon || '•'}</span> ${props.challengePoint1}</li>` : ''}
                            ${props.challengePoint2 ? `<li style="display: ${props.challengePoint2AutoDisplay || 'block'};"><span style="font-family: 'Font Awesome 5 Pro', sans-serif; font-weight: 900; font-style: normal;">${props.challengeListIcon || '•'}</span> ${props.challengePoint2}</li>` : ''}
                            ${props.challengePoint3 ? `<li style="display: ${props.challengePoint3AutoDisplay || 'block'};"><span style="font-family: 'Font Awesome 5 Pro', sans-serif; font-weight: 900; font-style: normal;">${props.challengeListIcon || '•'}</span> ${props.challengePoint3}</li>` : ''}
                            ${props.challengePoint4 ? `<li style="display: ${props.challengePoint4AutoDisplay || 'block'};"><span style="font-family: 'Font Awesome 5 Pro', sans-serif; font-weight: 900; font-style: normal;">${props.challengeListIcon || '•'}</span> ${props.challengePoint4}</li>` : ''}
                            ${props.challengePoint5 ? `<li style="display: ${props.challengePoint5AutoDisplay || 'block'};"><span style="font-family: 'Font Awesome 5 Pro', sans-serif; font-weight: 900; font-style: normal;">${props.challengeListIcon || '•'}</span> ${props.challengePoint5}</li>` : ''}
                        </ul>
                    </div>
                </div>`;
            }
            
            // Requirements Box
            if (props.requirementTitle || props.requirementPoint1) {
                solutionBoxesHtml += `
                <div class="solution-box requirement-box" style="flex: 1; background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); border-top: 4px solid #f39c12; transition: all 0.3s ease;">
                    <div class="box-header">
                        <i class="box-icon" style="color: ${props.requirementIconColor || '#f39c12'}; font-family: 'Font Awesome 5 Pro', sans-serif; font-weight: 900; font-style: normal;">${props.requirementIcon || '📋'}</i>
                        <h3 class="box-title" style="color: ${props.requirementTitleColor || '#333'};">${props.requirementTitle || 'Requirements'}</h3>
                    </div>
                    <div class="box-content">
                        ${props.requirementText ? `<p style="color: ${props.requirementTextColor || '#666'};">${props.requirementText}</p>` : ''}
                        <ul class="solution-list">
                            ${props.requirementPoint1 ? `<li style="display: ${props.requirementPoint1AutoDisplay || 'block'};"><span style="font-family: 'Font Awesome 5 Pro', sans-serif; font-weight: 900; font-style: normal;">${props.requirementListIcon || '•'}</span> ${props.requirementPoint1}</li>` : ''}
                            ${props.requirementPoint2 ? `<li style="display: ${props.requirementPoint2AutoDisplay || 'block'};"><span style="font-family: 'Font Awesome 5 Pro', sans-serif; font-weight: 900; font-style: normal;">${props.requirementListIcon || '•'}</span> ${props.requirementPoint2}</li>` : ''}
                            ${props.requirementPoint3 ? `<li style="display: ${props.requirementPoint3AutoDisplay || 'block'};"><span style="font-family: 'Font Awesome 5 Pro', sans-serif; font-weight: 900; font-style: normal;">${props.requirementListIcon || '•'}</span> ${props.requirementPoint3}</li>` : ''}
                            ${props.requirementPoint4 ? `<li style="display: ${props.requirementPoint4AutoDisplay || 'block'};"><span style="font-family: 'Font Awesome 5 Pro', sans-serif; font-weight: 900; font-style: normal;">${props.requirementListIcon || '•'}</span> ${props.requirementPoint4}</li>` : ''}
                            ${props.requirementPoint5 ? `<li style="display: ${props.requirementPoint5AutoDisplay || 'block'};"><span style="font-family: 'Font Awesome 5 Pro', sans-serif; font-weight: 900; font-style: normal;">${props.requirementListIcon || '•'}</span> ${props.requirementPoint5}</li>` : ''}
                        </ul>
                    </div>
                </div>`;
            }
            
            // Solution Box
            if (props.solutionTitle || props.solutionPoint1) {
                solutionBoxesHtml += `
                <div class="solution-box solution-box-final" style="flex: 1; background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); border-top: 4px solid #27ae60; transition: all 0.3s ease;">
                    <div class="box-header">
                        <i class="box-icon" style="color: ${props.solutionIconColor || '#27ae60'}; font-family: 'Font Awesome 5 Pro', sans-serif; font-weight: 900; font-style: normal;">${props.solutionIcon || '✅'}</i>
                        <h3 class="box-title" style="color: ${props.solutionTitleColor || '#333'};">${props.solutionTitle || 'Solution'}</h3>
                    </div>
                    <div class="box-content">
                        ${props.solutionText ? `<p style="color: ${props.solutionTextColor || '#666'};">${props.solutionText}</p>` : ''}
                        <ul class="solution-list">
                            ${props.solutionPoint1 ? `<li style="display: block;"><span style="font-family: 'Font Awesome 5 Pro', sans-serif; font-weight: 900; font-style: normal;">${props.solutionListIcon || '✓'}</span> ${props.solutionPoint1}</li>` : ''}
                            ${props.solutionPoint2 ? `<li style="display: block;"><span style="font-family: 'Font Awesome 5 Pro', sans-serif; font-weight: 900; font-style: normal;">${props.solutionListIcon || '✓'}</span> ${props.solutionPoint2}</li>` : ''}
                            ${props.solutionPoint3 ? `<li style="display: block;"><span style="font-family: 'Font Awesome 5 Pro', sans-serif; font-weight: 900; font-style: normal;">${props.solutionListIcon || '✓'}</span> ${props.solutionPoint3}</li>` : ''}
                            ${props.solutionPoint4 ? `<li style="display: ${props.showSolutionPoint4 || 'block'};"><span style="font-family: 'Font Awesome 5 Pro', sans-serif; font-weight: 900; font-style: normal;">${props.solutionListIcon || '✓'}</span> ${props.solutionPoint4}</li>` : ''}
                            ${props.solutionPoint5 ? `<li style="display: ${props.showSolutionPoint5 || 'block'};"><span style="font-family: 'Font Awesome 5 Pro', sans-serif; font-weight: 900; font-style: normal;">${props.solutionListIcon || '✓'}</span> ${props.solutionPoint5}</li>` : ''}
                        </ul>
                    </div>
                </div>`;
            }
            
            // Ersetze den solutionBoxes Platzhalter
            html = html.replace(/\{\{solutionBoxes\}\}/g, solutionBoxesHtml);
            
            console.log('✅ SolutionBoxes HTML generiert und eingesetzt');
            console.log('challengeListIcon:', props.challengeListIcon);
            console.log('requirementListIcon:', props.requirementListIcon);
            console.log('solutionListIcon:', props.solutionListIcon);

            // Auto-Display für zusätzliche Punkte
            props.challengePoint4AutoDisplay = (props.challengePoint4 && props.challengePoint4.trim() !== '') ? 'block' : 'none';
            props.challengePoint5AutoDisplay = (props.challengePoint5 && props.challengePoint5.trim() !== '') ? 'block' : 'none';

            props.requirementPoint4AutoDisplay = (props.requirementPoint4 && props.requirementPoint4.trim() !== '') ? 'block' : 'none';
            props.requirementPoint5AutoDisplay = (props.requirementPoint5 && props.requirementPoint5.trim() !== '') ? 'block' : 'none';

            props.showSolutionPoint4 = (props.solutionPoint4 && props.solutionPoint4.trim() !== '') ? 'block' : 'none';
            props.showSolutionPoint5 = (props.solutionPoint5 && props.solutionPoint5.trim() !== '') ? 'block' : 'none';

            // Auto-Hide für Punkte 1-3 (bestehende Logik)
            props.challengePoint1AutoDisplay = (props.challengePoint1 && props.challengePoint1.trim() !== '') ? 'block' : 'none';
            props.challengePoint2AutoDisplay = (props.challengePoint2 && props.challengePoint2.trim() !== '') ? 'block' : 'none';
            props.challengePoint3AutoDisplay = (props.challengePoint3 && props.challengePoint3.trim() !== '') ? 'block' : 'none';

            props.requirementPoint1AutoDisplay = (props.requirementPoint1 && props.requirementPoint1.trim() !== '') ? 'block' : 'none';
            props.requirementPoint2AutoDisplay = (props.requirementPoint2 && props.requirementPoint2.trim() !== '') ? 'block' : 'none';
            props.requirementPoint3AutoDisplay = (props.requirementPoint3 && props.requirementPoint3.trim() !== '') ? 'block' : 'none';

            props.showSolutionPoint1 = (props.solutionPoint1 && props.solutionPoint1.trim() !== '') ? 'block' : 'none';
            props.showSolutionPoint2 = (props.solutionPoint2 && props.solutionPoint2.trim() !== '') ? 'block' : 'none';
            props.showSolutionPoint3 = (props.solutionPoint3 && props.solutionPoint3.trim() !== '') ? 'block' : 'none';

            // Auto-Hide für Sektionen (wenn alle Punkte leer sind)
            const hasChallenge = props.challengePoint1 || props.challengePoint2 || props.challengePoint3 || props.challengePoint4 || props.challengePoint5;
            const hasRequirement = props.requirementPoint1 || props.requirementPoint2 || props.requirementPoint3 || props.requirementPoint4 || props.requirementPoint5;
            const hasSolution = props.solutionPoint1 || props.solutionPoint2 || props.solutionPoint3 || props.solutionPoint4 || props.solutionPoint5;

            props.showChallengePoints = hasChallenge ? 'block' : 'none';
            props.showRequirementPoints = hasRequirement ? 'block' : 'none';
            props.showSolutionPoints = hasSolution ? 'block' : 'none';

            // CTA Auto-Hide - Button nur zeigen wenn Text vorhanden
            props.showCTA = (props.ctaText && props.ctaText.trim() !== '') ? 'block' : 'none';
            props.showBottomCTA = (props.bottomCtaText && props.bottomCtaText.trim() !== '') ? 'block' : 'none';

            // Connection Line Auto-Hide
            props.showConnectionLine = (hasChallenge || hasRequirement || hasSolution) ? 'block' : 'none';

            // Platzhalter ersetzen
            let processedHtml = html;
            for (const [key, value] of Object.entries(props)) {
                const placeholder = new RegExp(`{{${key}}}`, 'g');
                processedHtml = processedHtml.replace(placeholder, value || '');
            }
            
            console.log('✅ processKerberosTripleSolution - Alle Properties ersetzt');
            return processedHtml;
        }

        // Erweiterte Testimonials Processor für bis zu 30 Testimonials
        function processKerberosTestimonials(module, html) {
            console.log('🎭 Processing Testimonials:', module.id);
            const props = module.properties;
            let testimonialSlides = '';
            let navigationDots = '';
            let slideCount = 0;

            for (let i = 1; i <= 30; i++) {
                const text = props[`testimonial${i}Text`];
                const author = props[`testimonial${i}Author`];
                const position = props[`testimonial${i}Position`];
                const company = props[`testimonial${i}Company`];
                const image = props[`testimonial${i}Image`];
                const rating = props[`testimonial${i}Rating`] || '5';
                const isActive = props[`testimonial${i}Active`] === 'true';

                if (text && author && isActive) {
                    const initial = author.charAt(0).toUpperCase();
                    const avatarStyle = image ?
                        `background: url('${image}') center/cover;` :
                        `background: linear-gradient(135deg, ${props.primaryColor || '#063AA8'}, ${props.accentColor || '#009CE6'}); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: 700;`;

                    const stars = '★'.repeat(parseInt(rating)) + '☆'.repeat(5 - parseInt(rating));

                    testimonialSlides += `
                        <div class="testimonial-slide" style="flex: 0 0 100%; max-width: 100%; box-sizing: border-box; padding: 0 1rem;">
                            <div class="testimonial-content" style="background: ${props.cardBackground || '#FFFFFF'}; border-radius: 12px; padding: 2rem; text-align: center; box-shadow: 0 8px 32px rgba(6,58,168,0.1); height: 100%; min-height: 350px; display: flex; flex-direction: column; justify-content: space-between;">
                                <div class="testimonial-quote" style="flex: 1; display: flex; flex-direction: column; justify-content: center; margin-bottom: 2rem;">
                                    <div style="font-size: 1.5rem; color: ${props.starColor || '#FFD700'}; margin-bottom: 1.5rem;">${stars}</div>
                                    <blockquote style="font-family: 'Playfair Display', serif; font-size: 1.25rem; line-height: 1.6; color: ${props.textColor || '#212529'}; margin: 0; font-style: italic;">"${text}"</blockquote>
                                </div>
                                <div class="testimonial-author" style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-top: auto;">
                                    <div class="author-avatar" style="width: 60px; height: 60px; border-radius: 50%; flex-shrink: 0; ${avatarStyle}">${image ? '' : initial}</div>
                                    <div class="author-info" style="text-align: left; min-width: 0;">
                                        <div style="font-family: var(--heading-font-font-family, Arial, sans-serif); font-weight: 600; color: ${props.authorColor || '#063AA8'}; margin-bottom: 0.25rem;">${author}</div>
                                        <div style="font-size: 0.9rem; color: ${props.subtitleColor || '#6c757d'};">${position}</div>
                                        ${company ? `<div style="font-size: 0.85rem; color: ${props.subtitleColor || '#6c757d'}; opacity: 0.8;">${company}</div>` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>`;

                    navigationDots += `
                        <button class="testimonial-dot" style="width: 12px; height: 12px; border-radius: 50%; border: none; cursor: pointer; transition: all 0.3s ease; background: #DEE2E6;" data-slide="${slideCount}"></button>`;

                    slideCount++;
                }
            }

            // Fallback für den Fall, dass keine aktiven Testimonials gefunden wurden
            if (slideCount === 0) {
                testimonialSlides = `
                    <div class="testimonial-slide" style="flex: 0 0 100%; max-width: 100%; box-sizing: border-box; padding: 0 1rem;">
                        <div class="testimonial-content" style="background: ${props.cardBackground || '#FFFFFF'}; border-radius: 12px; padding: 2rem; text-align: center; box-shadow: 0 8px 32px rgba(6,58,168,0.1); height: 100%; min-height: 350px; display: flex; flex-direction: column; justify-content: center;">
                            <div style="color: #6c757d; font-style: italic;">
                                <p>Keine aktiven Testimonials gefunden.</p>
                                <p style="font-size: 0.9rem;">Aktivieren Sie Testimonials in den Eigenschaften.</p>
                            </div>
                        </div>
                    </div>`;

                navigationDots = `<button class="testimonial-dot" style="width: 12px; height: 12px; border-radius: 50%; border: none; cursor: pointer; transition: all 0.3s ease; background: #DEE2E6;" data-slide="0"></button>`;
            }

            html = html.replace('{{testimonialSlides}}', testimonialSlides);
            html = html.replace('{{navigationDots}}', navigationDots);
                
                console.log(`✅ Testimonials verarbeitet: ${slideCount} aktive Slides`);
                return html;
            }

        // Korrigierte Team Gallery Processor 
        function processKerberosTeamGalleryFixed(module, html) {
            const props = module.properties;
            let teamMembers = '';

            // Dynamische Generierung der Team-Mitglieder (bis zu 6)
            for (let i = 1; i <= 6; i++) {
                const name = props[`member${i}Name`];
                const position = props[`member${i}Position`];
                const description = props[`member${i}Description`];
                const image = props[`member${i}Image`];
                const initialBg = props[`member${i}InitialBg`] || 'linear-gradient(135deg, #063AA8, #009CE6)';
                const isActive = props[`member${i}Active`] === 'true';

                if (name && isActive) {
                    const initial = name.charAt(0).toUpperCase();
                    const avatarStyle = image ?
                        `background: url('${image}') center/cover; background-color: #E9ECEF;` :
                        `background: ${initialBg}; background-color: #E9ECEF; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; font-weight: 700;`;
                    const avatarContent = image ? '' : initial;

                    teamMembers += `
                        <div class="team-member-card" style="background: white; border-radius: 8px; padding: ${props.cardPadding || '2rem'}; text-align: center; box-shadow: 0 4px 12px rgba(6,58,168,0.1); transition: transform 0.3s ease, box-shadow 0.3s ease; max-width: 320px; width: 100%;">
                            <div style="width: ${props.avatarSize || '120px'}; height: ${props.avatarSize || '120px'}; border-radius: 50%; margin: 0 auto 1rem auto; ${avatarStyle} transition: transform 0.3s ease;">${avatarContent}</div>
                            <h4 style="font-family: var(--heading-font-font-family); font-size: var(--heading-4-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: ${props.nameColor || '#212529'}; margin: 0 0 0.5rem 0;">${name}</h4>
                            <p style="font-family: var(--body-font-font-family); font-size: var(--small-text-size); line-height: var(--body-font-line-height); color: ${props.positionColor || '#6c757d'}; margin: 0 0 1rem 0; font-weight: 600;">${position}</p>
                            <p style="font-family: var(--body-font-font-family); font-size: var(--small-text-size); line-height: var(--body-font-line-height); color: ${props.descriptionColor || '#6c757d'}; margin: 0;">${description}</p>
                        </div>`;
                }
            }

            return html.replace('{{teamMembers}}', teamMembers);
        }

        // Produkt-Übersicht Modul Verarbeitung (Bug-frei)
        function processKerberosProductOverview(module, html) {
            const props = module.properties;

            // === HEADER CONTENT ===
            let headerContent = '';
            if (props.title) {
                headerContent += `<div style="text-align: center; margin-bottom: 3rem;">
                    <h2 style="font-family: var(--heading-font-font-family); font-size: var(--heading-2-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: ${props.titleColor || '#063AA8'}; margin: 0 0 1rem 0;">${props.title}</h2>`;

                if (props.showSubtitle === 'true' && props.subtitle) {
                    headerContent += `<p style="font-family: var(--body-font-font-family); font-size: var(--normal-text-size); line-height: var(--body-font-line-height); color: ${props.subtitleColor || '#6c757d'}; max-width: 800px; margin: 0 auto;">${props.subtitle}</p>`;
                }

                headerContent += `</div>`;
            }

            // === PRODUCT CARDS ===
            let productCards = '';
            for (let i = 1; i <= 12; i++) {
                if (props[`product${i}Active`] === 'true') {
                    const title = props[`product${i}Title`] || `Produkt ${i}`;
                    const description = props[`product${i}Description`] || 'Beschreibung';
                    const image = props[`product${i}Image`] || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop';
                    const link = props[`product${i}Link`] || '#';
                    const imageHeight = props.cardImageHeight || '200px';  // ← FIX: Korrekte Variable

                    productCards += `
                        <a href="${link}" class="kerberos-product-card kerberos-product-card-${module.id}" style="
                            background: #FFFFFF; 
                            border: 1px solid ${props.cardBorderColor || '#DEE2E6'}; 
                            border-radius: ${props.cardBorderRadius || '8px'}; 
                            overflow: hidden; 
                            text-decoration: none; 
                            display: block; 
                            cursor: pointer;
                            box-shadow: ${props.cardShadow || '0 2px 8px rgba(0,0,0,0.1)'};
                            transform: scale(1);
                            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        ">
                            <img src="${image}" alt="${title}" style="width: 100%; height: ${imageHeight}; object-fit: cover;">
                            <div style="padding: 1rem;">
                                <h4 class="product-title-${module.id}" style="font-family: var(--heading-font-font-family); color: ${props.cardTitleColor || '#212529'}; margin: 0 0 0.5rem 0; font-size: 1.1rem; transition: color 0.3s ease;">${title}</h4>
                                <p style="font-family: var(--body-font-font-family); color: ${props.cardDescriptionColor || '#6c757d'}; margin: 0; font-size: 0.9rem;">${description}</p>
                            </div>
                        </a>`;
                }
            }

            // === CONTENT ASSEMBLY ===
            const content = `
                ${headerContent}
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: ${props.cardGap || '2rem'};">
                    ${productCards}
                </div>
            `;

            // === HOVER CSS (Stark spezifisch) ===
            const hoverCSS = `<style>
                /* Überschreibe ALLE Button-Hover-Effekte */
                .kerberos-product-card-${module.id}:hover {
                    background: #FFFFFF !important;
                    color: inherit !important;
                    transform: scale(${props.cardHoverScale || '1.02'}) !important;
                    box-shadow: ${props.cardHoverShadow || '0 8px 25px rgba(6,58,168,0.15)'} !important;
                    border-color: rgba(6,58,168,0.4) !important;
                    filter: none !important;
                }
                
                .kerberos-product-card-${module.id}:hover .product-title-${module.id} {
                    color: #063AA8 !important;
                }
                
                .kerberos-product-card-${module.id}:active {
                    transform: scale(0.98) !important;
                }
                
                /* Anti-Button-System */
                a.kerberos-product-card-${module.id}:hover {
                    background: #FFFFFF !important;
                }
            </style>`;

            // === TEMPLATE ASSEMBLY ===
            html = html.replace('{{content}}', content);
            html = html.replace(/{{templateId}}/g, module.templateId || module.id);

            html = hoverCSS + html;

            return html;
        }

        function processKerberosDashboard(module, html) {
            const props = module.properties;

            // Responsive CSS hinzufügen
            const responsiveCSS = `
                <style>
                /* Dashboard Mobile Responsive */
                @media (max-width: 768px) {
                    .dashboard-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1.5rem !important;
                    }
                    .dashboard-bottom-row {
                        grid-template-columns: 1fr !important;
                        gap: 1.5rem !important;
                    }
                    .chart-container,
                    .activity-container {
                        min-height: 250px !important;
                    }
                }
                
                @media (max-width: 480px) {
                    .dashboard-card {
                        padding: 1rem !important;
                    }
                    .dashboard-card h3 {
                        font-size: 1rem !important;
                    }
                    .dashboard-value {
                        font-size: 1.8rem !important;
                    }
                }
                </style>`;

            // Dashboard Layout mit responsive Klassen
            let processedHtml = html.replace(
                'style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;"',
                'class="dashboard-bottom-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;"'
            );

            // Ersetze Platzhalter
            processedHtml = processedHtml.replace('{{dashboardCards}}', ''); // Leer für Dashboard Showcase
            processedHtml = processedHtml.replace('{{chartBars}}', ''); // Leer für Dashboard Showcase
            processedHtml = processedHtml.replace('{{activityItems}}', ''); // Leer für Dashboard Showcase

            return responsiveCSS + processedHtml;
        }

        function processKerberosDashboardShowcase(module, html) {
            const props = module.properties;
            
            // Verwende die existierende processKerberosDashboard Funktion
            return processKerberosDashboard(module, html);
        }

        function processKerberosComplianceDashboard(module, html) {
            const props = module.properties;

            // Dashboard Cards generieren
            const cardData = [
                { title: 'Aktive Prüfungen', value: '127', icon: '&#xf0e7;', color: props.primaryColor },
                { title: 'Heute abgeschlossen', value: '23', icon: '&#xf00c;', color: props.secondaryColor },
                { title: 'Risikofälle', value: '4', icon: '&#xf071;', color: '#DC3545' },
                { title: 'API-Aufrufe', value: '1.2k', icon: '&#xf1e6;', color: props.accentColor }
            ];

            let dashboardCards = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">';

            cardData.forEach(card => {
                dashboardCards += `
                    <div class="kerberos-dashboard-card" style="background: white; border-radius: 8px; padding: 1.5rem; border: 1px solid ${props.cardBorder}; transition: all 0.3s ease; cursor: default;">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                            <div style="font-family: 'Font Awesome 5 Pro'; font-size: 1.2rem; color: ${card.color};">${card.icon}</div>
                            <div style="font-size: 1.8rem; font-weight: 700; color: ${props.textColor};">${card.value}</div>
                        </div>
                        <div style="font-size: 0.9rem; color: ${props.textColor}; opacity: 0.7;">${card.title}</div>
                    </div>
                `;
            });

            dashboardCards += '</div>';

            html = html.replace('{{dashboardCards}}', dashboardCards);

            return html;
        }

        function processKerberosTestimonialsPro(module, html) {
            const props = module.properties;
            
            if (!html || typeof html !== 'string') {
                const template = MODULE_TEMPLATES.find(t => t.id === module.templateId);
                html = template ? template.html : '<div>Template fehlt</div>';
            }
            
            const helpers = window.kerberosHelpers;
            
            const containerPadding = helpers.convertPadding(props.containerPaddingType) || '2rem 3rem';
            const cardMobilePadding = helpers.convertPadding(props.cardMobilePaddingType) || '1.5rem 2.5rem';
            const slideSpacing = helpers.convertSpacing(props.slideSpacingType) || '2rem';
            const dotsSpacing = helpers.convertSpacing(props.dotsSpacingType) || '2rem';
            const cardRadius = helpers.convertRadius(props.cardRadiusType) || '12px';
            const containerRadius = helpers.convertRadius(props.containerRadiusType) || '12px';
            const cardShadow = helpers.convertShadow(props.cardShadowType) || '0 8px 24px rgba(6,58,168,0.25)';
            const containerShadow = helpers.convertShadow(props.containerShadowType) || '0 8px 24px rgba(6,58,168,0.25)';
            
            const slides = [];
            
            for (let i = 1; i <= 6; i++) {
                const quote = props['testimonial' + i + 'Quote'] || props['testimonial' + i + 'Text'];
                const author = props['testimonial' + i + 'Author'];
                const position = props['testimonial' + i + 'Position'];
                const company = props['testimonial' + i + 'Company'];
                const companyUrl = props['testimonial' + i + 'CompanyUrl'];
                const companyLogo = props['testimonial' + i + 'CompanyLogo'];
                const rating = parseInt(props['testimonial' + i + 'Rating']) || 5;
                const isActive = props['testimonial' + i + 'Active'] === 'true';
                
                if (quote && author && isActive) {
                    let stars = '';
                    for (let s = 0; s < rating; s++) {
                        stars += '★';
                    }
                    
                    let companyHTML = '';
                    if (company) {
                        const logoHTML = companyLogo ? 
                            `<img src="${companyLogo}" alt="${company} Logo" style="width: 80px; height: 40px; object-fit: contain; margin-right: 0.5rem;">` : '';
                        
                        const companyLink = companyUrl ? 
                            `<a href="${companyUrl}" target="_blank" rel="noopener" style="color: ${props.linkColor || '#063AA8'}; text-decoration: none;">${company}</a>` :
                            `<span style="color: ${props.companyColor || '#6c757d'};">${company}</span>`;
                        
                        companyHTML = `
                            <div style="display: flex; align-items: center; justify-content: center; margin-top: 0.5rem;">
                                ${logoHTML}
                                ${companyLink}
                            </div>
                        `;
                    }
                    
                    const initial = author.charAt(0).toUpperCase();
                    
                    const slideContent = `
                        <div style="background: ${props.cardBackground || '#FFFFFF'}; 
                                border-radius: ${cardRadius}; 
                                padding: ${props.cardPadding || '1.5rem 3rem'}; 
                                text-align: center; 
                                box-shadow: ${cardShadow}; 
                                min-height: ${props.cardMinHeight || '400px'}; 
                                display: flex; 
                                flex-direction: column; 
                                justify-content: space-between; 
                                border: 1px solid ${props.cardBorder || 'rgba(6,58,168,0.08)'};
                                position: relative;
                                overflow: hidden;">
                            
                            <div style="position: absolute; 
                                    top: 0; 
                                    left: 0; 
                                    right: 0; 
                                    bottom: 0; 
                                    height: 100%; 
                                    background: linear-gradient(90deg, ${props.primaryColor || '#063AA8'}, ${props.secondaryColor || '#009CE6'}); 
                                    opacity: ${props.gradientOpacity || '0.05'}; 
                                    z-index: 0;">
                            </div>
                            
                            <div style="position: relative; z-index: 1;">
                                <div style="font-family: 'Font Awesome 5 Pro'; 
                                        font-size: ${props.quoteIconSize || '2.5rem'}; 
                                        color: ${props.quoteIconColor || '#063AA8'}; 
                                        opacity: 0.3; 
                                        margin-bottom: 1rem;">
                                    ${props.quoteIcon || '&#xf10d;'}
                                </div>
                                
                                <div style="color: ${props.ratingColor || '#ffc107'}; 
                                        font-size: ${props.ratingSize || '1.5rem'}; 
                                        margin-bottom: 1.5rem;">
                                    ${stars}
                                </div>
                                
                                <blockquote style="font-size: ${props.quoteSize || '1.1rem'}; 
                                                color: ${props.quoteColor || '#333'}; 
                                                font-style: italic; 
                                                line-height: 1.7; 
                                                margin: 0 0 auto 0;">
                                    "${quote}"
                                </blockquote>
                            </div>
                            
                            <div style="position: relative; 
                                    z-index: 1; 
                                    display: flex; 
                                    align-items: center; 
                                    justify-content: center; 
                                    gap: 1rem; 
                                    margin-top: 2rem; 
                                    padding-top: 2rem; 
                                    border-top: 1px solid ${props.dividerColor || '#e5e7eb'};">
                                
                                <div style="width: 60px; 
                                        height: 60px; 
                                        border-radius: 50%; 
                                        background: linear-gradient(135deg, ${props.primaryColor || '#063AA8'}, ${props.secondaryColor || '#009CE6'}); 
                                        display: flex; 
                                        align-items: center; 
                                        justify-content: center; 
                                        color: white; 
                                        font-size: 1.75rem; 
                                        font-weight: 700; 
                                        flex-shrink: 0;">
                                    ${initial}
                                </div>
                                
                                <div style="text-align: left;">
                                    <div style="font-weight: 700; 
                                            color: ${props.authorColor || '#063AA8'}; 
                                            font-size: ${props.authorSize || '1.1rem'}; 
                                            margin-bottom: 0.25rem;">
                                        ${author}
                                    </div>
                                    <div style="color: ${props.positionColor || '#6c757d'}; 
                                            font-size: ${props.positionSize || '0.9rem'};">
                                        ${position}
                                    </div>
                                    ${companyHTML}
                                </div>
                            </div>
                        </div>
                    `;
                    
                    slides.push(slideContent);
                }
            }
            
            if (slides.length === 0) {
                slides.push(`
                    <div style="text-align: center; 
                            padding: 4rem 2rem; 
                            color: #6c757d; 
                            background: white; 
                            border-radius: ${cardRadius};">
                        <p style="font-size: 1.2rem; margin: 0 0 0.5rem 0;">Keine Testimonials konfiguriert</p>
                        <p style="font-size: 0.9rem; margin: 0; opacity: 0.7;">Aktiviere Testimonials im Property Panel</p>
                    </div>
                `);
            }
            
            const carousel = window.kerberosCarousel.create({
                moduleId: module.id,
                slides: slides,
                options: {
                    autoPlay: props.autoPlay === 'true',
                    autoPlayInterval: parseInt(props.autoPlayInterval) || 5000,
                    showNavigation: slides.length > 1 && props.showNavigation !== 'false',
                    showDots: slides.length > 1 && props.showDots !== 'false',
                    prevIcon: props.prevIcon || '&#xf060;',
                    nextIcon: props.nextIcon || '&#xf061;',
                    navButtonColor: props.navButtonBackground || '#063AA8',
                    dotColor: props.dotColor || '#063AA8',
                    transitionDuration: props.transitionDuration || '0.5s'
                }
            });
            
            // ============================================================
            // 🎯 HIER BEGINNT DER NEUE CODE - DIREKT NACH carousel.create()
            // ============================================================
            
            // Modifiziere das Carousel JavaScript für Canvas-Kompatibilität
            let modifiedCarouselJS = carousel.javascript;
            
            const customEventListeners = `
            
            // Mache updateCarousel für CustomEvents verfügbar
            window['carouselUpdate_${module.id}'] = updateCarousel;
            
            // CustomEvent Listener für Canvas-Kompatibilität
            document.addEventListener('carousel-prev-${module.id}', function() {
                if (window['carouselUpdate_${module.id}']) {
                    window['carouselUpdate_${module.id}'](currentSlide - 1);
                }
            });
            
            document.addEventListener('carousel-next-${module.id}', function() {
                if (window['carouselUpdate_${module.id}']) {
                    window['carouselUpdate_${module.id}'](currentSlide + 1);
                }
            });
            
            document.addEventListener('carousel-goto-${module.id}', function(e) {
                if (window['carouselUpdate_${module.id}'] && e.detail && typeof e.detail.index !== 'undefined') {
                    window['carouselUpdate_${module.id}'](e.detail.index);
                }
            });
        `;
            
            // Füge nach updateCarousel(0); ein
            modifiedCarouselJS = modifiedCarouselJS.replace(
                /updateCarousel\(0\);/,
                'updateCarousel(0);' + customEventListeners
            );
            
            // ============================================================
            // 🎯 HIER ENDET DER NEUE CODE
            // ============================================================
            
            html = html.replace(
                /<div class="kerberos-testimonials-pro-container">[\s\S]*?<\/div>\s*<button class="nav-button-pro nav-prev-pro"[\s\S]*?<\/button>\s*<button class="nav-button-pro nav-next-pro"[\s\S]*?<\/button>\s*<\/div>/,
                carousel.html
            );
            
            html = html.replace(
                /<div style="text-align: center; color: #6c757d; padding: 1rem;">Testimonials können im Property Panel konfiguriert werden<\/div>/,
                ''
            );
            
            const canvasFixScript = `
                <script>
                (function() {
                    setTimeout(function() {
                        const prevBtn = document.querySelector('.kerberos-carousel-prev-${module.id}');
                        const nextBtn = document.querySelector('.kerberos-carousel-next-${module.id}');
                        const dots = document.querySelectorAll('.kerberos-carousel-dot-${module.id}');
                        
                        if (prevBtn) {
                            const newPrev = prevBtn.cloneNode(true);
                            prevBtn.parentNode.replaceChild(newPrev, prevBtn);
                            newPrev.addEventListener('click', function(e) {
                                e.stopPropagation();
                                e.preventDefault();
                                document.dispatchEvent(new CustomEvent('carousel-prev-${module.id}'));
                            });
                        }
                        
                        if (nextBtn) {
                            const newNext = nextBtn.cloneNode(true);
                            nextBtn.parentNode.replaceChild(newNext, nextBtn);
                            newNext.addEventListener('click', function(e) {
                                e.stopPropagation();
                                e.preventDefault();
                                document.dispatchEvent(new CustomEvent('carousel-next-${module.id}'));
                            });
                        }
                        
                        dots.forEach(function(dot, index) {
                            const newDot = dot.cloneNode(true);
                            dot.parentNode.replaceChild(newDot, dot);
                            newDot.addEventListener('click', function(e) {
                                e.stopPropagation();
                                e.preventDefault();
                                document.dispatchEvent(new CustomEvent('carousel-goto-${module.id}', { detail: { index: index } }));
                            });
                        });
                    }, 100);
                })();
                </script>
            `;
            
            const moduleCSS = window.kerberosCssHelper.addOnce(
                'testimonials-pro-base-' + module.id,
                `<style>
                    .kerberos-carousel-container-${module.id} {
                        background: ${props.containerBackground || '#FFFFFF'};
                        border-radius: ${containerRadius};
                        padding: ${containerPadding};
                        box-shadow: ${containerShadow};
                    }
                    
                    .kerberos-carousel-prev-${module.id},
                    .kerberos-carousel-next-${module.id} {
                        z-index: 999 !important;
                        pointer-events: auto !important;
                        position: absolute !important;
                    }
                    
                    .kerberos-carousel-dot-${module.id} {
                        pointer-events: auto !important;
                        z-index: 100 !important;
                    }
                    
                    @media (max-width: 768px) {
                        .kerberos-carousel-container-${module.id} {
                            padding: ${cardMobilePadding};
                        }
                        
                        .kerberos-carousel-slide-${module.id} > div {
                            min-height: ${props.cardMobileMinHeight || '300px'} !important;
                            padding: ${cardMobilePadding} !important;
                        }
                        
                        .kerberos-carousel-prev-${module.id},
                        .kerberos-carousel-next-${module.id} {
                            display: none !important;
                        }
                    }
                    
                    .kerberos-carousel-prev-${module.id}:hover,
                    .kerberos-carousel-next-${module.id}:hover {
                        background: ${props.navButtonHoverBackground || '#009CE6'} !important;
                        transform: translateY(-50%) scale(1.1) !important;
                    }
                </style>`
            );
            
            if (html.includes('{{carouselContent}}')) {
                html = html.replace('{{carouselContent}}', carousel.html);
            } else if (!html.includes(carousel.html)) {
                html = html + carousel.html;
            }
            
            const counterText = slides.length > 0 ? `1 von ${slides.length}` : '0 von 0';
            html = html.replace('{{counterText}}', counterText);
            
            // WICHTIG: Verwende modifiedCarouselJS statt carousel.javascript!
            return moduleCSS + html + modifiedCarouselJS + canvasFixScript;
        }

        console.log('✅ processKerberosTestimonialsPro GEFIXT:');
        console.log('   • Verwendet kerberosHelpers für Type-Mapping');
        console.log('   • Verwendet kerberosCarousel für Carousel-Logik');
        console.log('   • CSS-Deduplizierung mit kerberosCssHelper');
        console.log('   • Vollständiges JavaScript wird generiert');

        console.log('✅ processKerberosTestimonialsPro GEFIXT - mit Type-Mapping und JavaScript');

        function processKerberosTextButtonRichtext(module, html) {
            const props = module.properties;

            // Secondary Button Properties hinzufügen
            if (!props.secondaryButtonBg) props.secondaryButtonBg = 'transparent';
            if (!props.secondaryButtonColor) props.secondaryButtonColor = '#063AA8';
            if (!props.secondaryButtonBorder) props.secondaryButtonBorder = '2px solid #063AA8';

            let buttonSection = '';

            // === UNIVERSELLE BUTTON-STYLES ===
            const primaryButtonStyles = getUniversalButtonStyles({
                buttonStyleType: props.buttonStyleType || 'primary',
                buttonPaddingType: props.buttonPaddingType || 'medium',
                buttonRadiusType: props.buttonRadiusType || 'medium',
                buttonShadowType: props.buttonShadowType || 'medium',
                buttonBackground: props.buttonBg,
                buttonColor: props.buttonColor
            });

            const secondaryButtonStyles = getUniversalButtonStyles({
                buttonStyleType: props.secondaryButtonStyleType || 'outline',
                buttonPaddingType: props.secondaryButtonPaddingType || 'medium',
                buttonRadiusType: props.buttonRadiusType || 'medium',
                buttonShadowType: props.secondaryButtonShadowType || 'none',
                buttonBackground: props.secondaryButtonBg || 'transparent',
                buttonColor: props.secondaryButtonColor
            });

            // Primary Button
            if (props.buttonText) {
                buttonSection += `
                    <a class="kerberos-btn kerberos-btn-${module.id}" href="${props.buttonLink || '#'}" 
                    style="font-family: var(--button-font-family); font-weight: var(--button-font-weight); background: ${primaryButtonStyles.background}; color: ${primaryButtonStyles.color}; padding: ${primaryButtonStyles.padding}; border-radius: ${primaryButtonStyles.borderRadius}; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease; box-shadow: ${primaryButtonStyles.boxShadow}; border: ${primaryButtonStyles.border || 'none'}; margin-right: 1rem;">
                        ${props.buttonText}
                        ${props.buttonIcon ? '<span style="font-family: \'Font Awesome 5 Pro\';">' + props.buttonIcon + '</span>' : ''}
                    </a>`;
            }

            // Secondary Button
            if (props.secondaryButtonText) {
                buttonSection += `
                    <a class="kerberos-btn-secondary kerberos-btn-${module.id}" href="${props.secondaryButtonLink || '#'}" 
                    style="font-family: var(--button-font-family); font-weight: var(--button-font-weight); background: ${secondaryButtonStyles.background}; color: ${secondaryButtonStyles.color}; padding: ${secondaryButtonStyles.padding}; border-radius: ${secondaryButtonStyles.borderRadius}; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease; border: ${secondaryButtonStyles.border || props.secondaryButtonBorder};">
                        ${props.secondaryButtonText}
                        ${props.secondaryButtonIcon ? '<span style="font-family: \'Font Awesome 5 Pro\';">' + props.secondaryButtonIcon + '</span>' : ''}
                    </a>`;
            }

            return html.replace('{{buttonSection}}', buttonSection);
        }

        function processKerberosFeatures(module, html) {
            const props = module.properties;
            let featureCards = '';

            for (let i = 1; i <= 12; i++) {
                const title = props[`feature${i}Title`];
                const description = props[`feature${i}Description`];
                const icon = props[`feature${i}Icon`];
                const color = props[`feature${i}Color`];
                const isActive = props[`feature${i}Active`] === 'true';

                if (title && description && isActive) {
                    featureCards += `
                        <div class="kerberos-feature-card" style="background: ${props.cardBackground}; border: 1px solid ${props.cardBorder}; border-radius: 12px; padding: 2rem; transition: all 0.3s ease; cursor: pointer; position: relative; overflow: hidden;">
                            <div class="feature-overlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, ${color}10, ${color}05); opacity: 0; transition: opacity 0.3s ease; pointer-events: none;"></div>
                            <div style="position: relative; z-index: 2;">
                                <div class="feature-icon" style="font-family: 'Font Awesome 5 Pro'; font-size: 2.5rem; color: ${color}; margin-bottom: 1.5rem; transition: all 0.3s ease;">${icon}</div>
                                <h3 style="font-family: var(--heading-font-font-family); font-size: var(--heading-4-size); font-weight: var(--heading-font-font-weight); color: ${props.textColor}; margin: 0 0 1rem 0;">${title}</h3>
                                <p style="font-family: var(--body-font-font-family); font-size: var(--normal-text-size); line-height: var(--body-font-line-height); color: ${props.subtitleColor}; margin: 0;">${description}</p>
                            </div>
                        </div>`;
                }
            }

            return html.replace('{{featureCards}}', featureCards);
        }


        function processKerberosTimeline(module, html) {
            const props = module.properties;
            let timelineSteps = '';

            for (let i = 1; i <= 8; i++) {
                const title = props['step' + i + 'Title'];
                const description = props['step' + i + 'Description'];
                const icon = props['step' + i + 'Icon'] || '&#xf00c;';
                const color = props['step' + i + 'Color'] || '#063AA8';
                const number = props['step' + i + 'Number'] || i;
                const isActive = props['step' + i + 'Active'] === 'true';

                if (title && description && isActive) {
                    const isEven = i % 2 === 0;
                    const desktopSpacing = props.timelineSpacing || '0.25rem';
                    const marginTop = i === 1 ? '0' : desktopSpacing;

                    timelineSteps +=
                        '<div class="timeline-step-wrapper timeline-wrapper-' + module.id + '" style="position: relative; margin-top: ' + marginTop + ';">' +

                        '<!-- Desktop: Card Links -->' +
                        '<div class="timeline-card-desktop timeline-card-left-' + module.id + '" style="' + (isEven ? 'display: none;' : '') + '">' +
                        '<div style="background: ' + (props.cardBackground || '#FFFFFF') + '; border: 1px solid ' + (props.cardBorder || '#E5E7EB') + '; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.08); text-align: right; height: auto;">' +
                        '<div style="display: flex; align-items: center; gap: 0.75rem; justify-content: flex-end; margin-bottom: 0.75rem;">' +
                        '<h3 style="font-family: var(--heading-font-font-family); color: ' + (props.textColor || '#212529') + '; margin: 0; font-size: 1.1rem; font-weight: 600;">' + title + '</h3>' +
                        '<div style="background: ' + color + '; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; flex-shrink: 0; min-width: 28px;">' + number + '</div>' +
                        '</div>' +
                        '<p style="font-family: var(--body-font-font-family); color: #6c757d; margin: 0; line-height: 1.5; font-size: 0.9rem;">' + description + '</p>' +
                        '</div>' +
                        '</div>' +

                        '<!-- Desktop: Card Rechts -->' +
                        '<div class="timeline-card-desktop timeline-card-right-' + module.id + '" style="' + (!isEven ? 'display: none;' : '') + '">' +
                        '<div style="background: ' + (props.cardBackground || '#FFFFFF') + '; border: 1px solid ' + (props.cardBorder || '#E5E7EB') + '; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.08); text-align: left; height: auto;">' +
                        '<div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">' +
                        '<div style="background: ' + color + '; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; flex-shrink: 0; min-width: 28px;">' + number + '</div>' +
                        '<h3 style="font-family: var(--heading-font-font-family); color: ' + (props.textColor || '#212529') + '; margin: 0; font-size: 1.1rem; font-weight: 600;">' + title + '</h3>' +
                        '</div>' +
                        '<p style="font-family: var(--body-font-font-family); color: #6c757d; margin: 0; line-height: 1.5; font-size: 0.9rem;">' + description + '</p>' +
                        '</div>' +
                        '</div>' +

                        '<!-- Mobile: Card Full Width -->' +
                        '<div class="timeline-card-mobile timeline-card-mobile-' + module.id + '" style="display: none; padding-top: 3rem;">' +
                        '<div style="background: ' + (props.cardBackground || '#FFFFFF') + '; border: 1px solid ' + (props.cardBorder || '#E5E7EB') + '; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.08); position: relative;">' +
                        '<div style="position: absolute; top: -25px; left: 50%; transform: translateX(-50%); width: 50px; height: 50px; background: ' + color + '; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 12px rgba(6,58,168,0.2);">' +
                        '<span style="font-family: \'Font Awesome 5 Pro\'; color: white; font-size: 1rem;">' + icon + '</span>' +
                        '</div>' +
                        '<div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; justify-content: flex-start;">' +
                        '<div style="background: ' + color + '; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; flex-shrink: 0; min-width: 28px;">' + number + '</div>' +
                        '<h3 style="font-family: var(--heading-font-font-family); color: ' + (props.textColor || '#212529') + '; margin: 0; font-size: 1.1rem; font-weight: 600; text-align: center;">' + title + '</h3>' +
                        '</div>' +
                        '<p style="font-family: var(--body-font-font-family); color: #6c757d; margin: 0; line-height: 1.5; font-size: 0.9rem; text-align: center;">' + description + '</p>' +
                        '</div>' +
                        '</div>' +

                        '<!-- Desktop Dot (mittig) -->' +
                        '<div class="timeline-dot-desktop timeline-dot-' + module.id + '" style="position: absolute; left: 50%; top: 2rem; transform: translateX(-50%); width: 50px; height: 50px; background: ' + color + '; border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 20; border: 3px solid white; box-shadow: 0 4px 12px rgba(6,58,168,0.2);">' +
                        '<span style="font-family: \'Font Awesome 5 Pro\'; color: white; font-size: 1rem;">' + icon + '</span>' +
                        '</div>' +
                        '</div>';
                }
            }

            // Berechne die Position des ersten und letzten aktiven Steps
            let firstActiveStep = -1;
            let lastActiveStep = -1;

            for (let i = 1; i <= 8; i++) {
                if (props['step' + i + 'Active'] === 'true' && props['step' + i + 'Title']) {
                    if (firstActiveStep === -1) firstActiveStep = i;
                    lastActiveStep = i;
                }
            }

            // Korrekte Timeline-Höhe: Strich NUR zwischen Punkten
            const timelineTopOffset = '2rem'; // Startet beim ersten Punkt
            const totalActiveSteps = Object.keys(props).filter(key => 
                key.includes('Active') && 
                key.includes('step') && 
                props[key] === 'true' && 
                props[key.replace('Active', 'Title')]
            ).length;

            const timelineHeight = totalActiveSteps > 1 ? 
                `calc(${(totalActiveSteps - 1) * 140}px)` : // Nur zwischen Punkten
                '0px'; // Kein Strich bei nur einem Punkt

            // Verbessertes CSS mit separatem Desktop/Mobile Spacing
            const responsiveCSS =
                '<style>' +
                '/* Desktop Timeline Layout */' +
                '.timeline-wrapper-' + module.id + ' { ' +
                'position: relative; ' +
                'min-height: 120px; ' +
                'padding: 1rem 0; ' +
                '}' +

                '/* Desktop Cards - BREITERE Cards (47% statt 42%) */' +
                '.timeline-card-left-' + module.id + ' { ' +
                'width: 47%; ' +
                'float: left; ' +
                'clear: left; ' +
                'margin-right: 6%; ' +
                '}' +
                '.timeline-card-right-' + module.id + ' { ' +
                'width: 47%; ' +
                'float: right; ' +
                'clear: right; ' +
                'margin-left: 6%; ' +
                '}' +

                '/* Desktop Dots - Mittig positioniert */' +
                '.timeline-dot-desktop { ' +
                'position: absolute; ' +
                'left: 50%; ' +
                'transform: translateX(-50%); ' +
                'z-index: 20; ' +
                '}' +

                '/* Clearfix für Float-Layout */' +
                '.timeline-wrapper-' + module.id + ':after { ' +
                'content: ""; ' +
                'display: table; ' +
                'clear: both; ' +
                '}' +

                '/* Hover Effects Desktop */' +
                '.timeline-wrapper-' + module.id + ':hover .timeline-card-desktop > div {' +
                'transform: scale(1.02);' +
                'box-shadow: 0 8px 24px rgba(6,58,168,0.15);' +
                'transition: all 0.3s ease;' +
                '}' +
                '.timeline-wrapper-' + module.id + ':hover .timeline-dot-' + module.id + ' {' +
                'transform: translateX(-50%) scale(1.1);' +
                'transition: all 0.3s ease;' +
                '}' +

                '/* Timeline Line Z-Index Fix */' +
                '.kerberos-module-' + module.templateId + ' > div > div[style*="position: absolute"][style*="width: 3px"] {' +
                'z-index: 5 !important;' +
                '}' +

                '/* Desktop: Dynamische Abstände über Funktion */' +
                '.timeline-wrapper-' + module.id + ' + .timeline-wrapper-' + module.id + ' {' +
                'margin-top: ' + getDesktopSpacing(props.timelineSpacing || '0.5rem') + ' !important;' +
                '}' +

                '/* Mobile Responsive */' +
                '@media (max-width: 768px) {' +
                '/* Desktop Elemente verstecken */' +
                '.timeline-card-desktop, .timeline-dot-desktop {' +
                'display: none !important;' +
                '}' +
                '/* Mobile Elemente zeigen */' +
                '.timeline-card-mobile {' +
                'display: block !important;' +
                '}' +
                '/* Timeline Line auf Mobile verstecken */' +
                '.kerberos-module-' + module.templateId + ' > div > div[style*="position: absolute"][style*="left: 50%"] {' +
                'opacity: 0 !important;' +
                'visibility: hidden !important;' +
                'z-index: -1 !important;' +
                '}' +
                '/* Mobile: Intelligente Abstände basierend auf timelineSpacing */' +
                '.timeline-wrapper-' + module.id + ' {' +
                'margin-top: ' + getMobileSpacing(props.timelineSpacing || '0.5rem') + ' !important;' +
                'position: relative;' +
                'z-index: 10;' +
                'padding: 0 !important;' +
                '}' +
                '.timeline-wrapper-' + module.id + ':first-child {' +
                'margin-top: 1.5rem !important;' +
                '}' +
                '/* Mobile Cards Styling */' +
                '.timeline-card-mobile-' + module.id + ' {' +
                'padding-top: 3rem !important;' +
                '}' +
                '.timeline-card-mobile-' + module.id + ' > div > div[style*="position: absolute"] {' +
                'top: -35px !important;' +
                '}' +
                '/* Mobile Timeline - Linksbündige Ausrichtung */' +
                '.timeline-card-mobile-' + module.id + ' > div > div[style*="display: flex"][style*="margin-bottom: 0.75rem"] {' +
                'justify-content: flex-start !important;' +
                '}' +
                '.timeline-card-mobile-' + module.id + ' h3[style*="text-align: center"] {' +
                'text-align: left !important;' +
                '}' +
                '.timeline-card-mobile-' + module.id + ' p[style*="text-align: center"] {' +
                'text-align: left !important;' +
                '}' +
                '}' +

                '/* Sehr kleine Bildschirme */' +
                '@media (max-width: 480px) {' +
                '.timeline-wrapper-' + module.id + ' {' +
                'margin-top: 2rem !important;' +
                '}' +
                '.timeline-card-mobile-' + module.id + ' {' +
                'padding-top: 2.5rem !important;' +
                '}' +
                '}' +
                '</style>';

            return responsiveCSS + html.replace('{{timelineSteps}}', timelineSteps);
        }   
        
        // === NEUE PROCESSOR-FUNKTIONEN ===

        function processKerberosFeaturesModern(module, html) {
            const props = module.properties;
            let featureCards = '';

            for (let i = 1; i <= 6; i++) {
                const title = props['feature' + i + 'Title'];
                const description = props['feature' + i + 'Description'];
                const icon = props['feature' + i + 'Icon'];
                const color = props['feature' + i + 'Color'];
                const badge = props['feature' + i + 'Badge'];
                const badgeColor = props['feature' + i + 'BadgeColor'];
                const isActive = props['feature' + i + 'Active'] === 'true';

                if (title && description && isActive) {
                    let badgeHtml = '';
                    if (badge) {
                        badgeHtml = '<div style="position: absolute; top: 1rem; right: 1rem; background: ' + badgeColor + '; color: ' + props.badgeTextColor + '; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.7rem; font-weight: 700;">' + badge + '</div>';
                    }

                    featureCards += '<div class="kerberos-feature-card" style="background: ' + props.cardBackground + '; border: 1px solid ' + props.cardBorder + '; border-radius: 12px; padding: 2rem; transition: all 0.3s ease; cursor: pointer; position: relative; overflow: hidden;">' +
                        badgeHtml +
                        '<div class="feature-overlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, ' + color + '10, ' + color + '05); opacity: 0; transition: opacity 0.3s ease; pointer-events: none;"></div>' +
                        '<div style="position: relative; z-index: 2;">' +
                        '<div class="feature-icon" style="font-family: \'Font Awesome 5 Pro\'; font-size: 2.5rem; color: ' + color + '; margin-bottom: 1.5rem; transition: all 0.3s ease;">' + icon + '</div>' +
                        '<h3 style="font-family: var(--heading-font-font-family); font-size: var(--heading-4-size); font-weight: var(--heading-font-font-weight); color: ' + props.textColor + '; margin: 0 0 1rem 0;">' + title + '</h3>' +
                        '<p style="font-family: var(--body-font-font-family); font-size: var(--normal-text-size); line-height: var(--body-font-line-height); color: ' + props.subtitleColor + '; margin: 0;">' + description + '</p>' +
                        '</div>' +
                        '</div>';
                }
            }

            return html.replace('{{featureCards}}', featureCards);
        }

        function processKerberosApiDocumentation(module, html) {
            const props = module.properties;
            let apiEndpoints = '';

            for (let i = 1; i <= 4; i++) {
                const method = props['endpoint' + i + 'Method'];
                const path = props['endpoint' + i + 'Path'];
                const title = props['endpoint' + i + 'Title'];
                const description = props['endpoint' + i + 'Description'];
                const status = props['endpoint' + i + 'Status'];
                const statusColor = props['endpoint' + i + 'StatusColor'];
                const isActive = props['endpoint' + i + 'Active'] === 'true';

                if (method && path && title && isActive) {
                    const methodColor = method === 'GET' ? '#28A745' : method === 'POST' ? '#063AA8' : '#EF8646';

                    apiEndpoints += '<div class="api-endpoint-card" style="background: ' + props.cardBackground + '; border: 1px solid ' + props.cardBorder + '; border-radius: 8px; padding: 1.5rem; transition: all 0.3s ease; cursor: default;">' +
                        '<div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">' +
                        '<span style="background: ' + methodColor + '; color: white; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.8rem; font-weight: 700;">' + method + '</span>' +
                        '<span style="background: ' + statusColor + '; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.7rem; font-weight: 700;">' + status + '</span>' +
                        '</div>' +
                        '<h4 style="font-family: var(--heading-font-font-family); color: ' + props.textColor + '; margin: 0 0 0.5rem 0; font-size: 1.1rem;">' + title + '</h4>' +
                        '<p style="font-family: \'Monaco\', \'Consolas\', monospace; color: ' + props.primaryColor + '; font-size: 0.9rem; margin: 0 0 1rem 0;">' + path + '</p>' +
                        '<p style="font-family: var(--body-font-font-family); color: ' + props.textColor + '; font-size: 0.9rem; margin: 0; opacity: 0.8;">' + description + '</p>' +
                        '</div>';
                }
            }

            return html.replace('{{apiEndpoints}}', apiEndpoints);
        }

        function processKerberosPricingInteractive(module, html) {
            const props = module.properties;
            let pricingPlans = '';
            let featureRows = '';
            let mobileFeatureCards = '';

            // Pricing Plans generieren (RESPONSIVE KORRIGIERT)
            for (let i = 1; i <= 3; i++) {
                const name = props['plan' + i + 'Name'];
                const price = props['plan' + i + 'Price'];
                const period = props['plan' + i + 'Period'];
                const description = props['plan' + i + 'Description'];
                const buttonText = props['plan' + i + 'ButtonText'];
                const buttonLink = props['plan' + i + 'ButtonLink'];
                const isPopular = props['plan' + i + 'Popular'] === 'true';
                const color = props['plan' + i + 'Color'];
                const isActive = props['plan' + i + 'Active'] === 'true';

                if (name && price && isActive) {
                    let popularBadge = '';
                    if (isPopular) {
                        const badgeColor = props.popularBadgeColor || '#063AA8';
                        const badgeTextColor = props.badgeTextColor || 'white';
                        const badgeText = props.popularBadge || 'Popular';

                        popularBadge = '<div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: ' + badgeColor + '; color: ' + badgeTextColor + '; padding: 0.5rem 1.5rem; border-radius: 20px; font-size: 0.8rem; font-weight: 700; z-index: 10;">' + badgeText + '</div>';
                    }

                    // CSS-Properties sauber definieren
                    const cardBackground = props.cardBackground || 'white';
                    const textColor = props.textColor || '#333333';
                    const subtitleColor = props.subtitleColor || '#666666';
                    const cardBorder = props.cardBorder || '#DEE2E6';
                    const popularBorderColor = props.popularBadgeColor || '#063AA8';
                    const planColor = color || '#063AA8';
                    const buttonTextVal = buttonText || 'Wählen';
                    const linkHref = buttonLink || '#';

                    // HTML-Teile als separate Variablen erstellen
                    const cardHeader = '<div style="margin-bottom: 1.5rem;">';
                    const titleElement = '<h3 style="font-family: var(--heading-font-font-family); color: ' + textColor + '; margin: 0 0 0.5rem 0; font-size: 1.5rem;">' + name + '</h3>';
                    const priceElement = '<div style="font-size: 3rem; font-weight: 900; color: ' + planColor + '; margin: 1rem 0;">' + price + '<span style="font-size: 1rem; color: ' + subtitleColor + '; font-weight: 400;">/' + period + '</span></div>';
                    const descElement = '<p style="font-family: var(--body-font-font-family); color: ' + subtitleColor + '; margin: 0;">' + description + '</p>';
                    const cardHeaderClose = '</div>';
                    const buttonElement = '<a href="' + linkHref + '" style="font-family: var(--button-font-family); background: ' + planColor + '; color: white; padding: 0.75rem 2rem; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: 700; transition: all 0.3s ease; width: 100%; box-sizing: border-box;">' + buttonTextVal + '</a>';

                    // Finale Zusammenfügung - CSS direkt ohne separate Variable
                    if (isPopular) {
                        pricingPlans += '<div class="pricing-plan" style="position: relative; background: ' + cardBackground + '; transform: scale(1.05); box-shadow: 0 8px 30px rgba(6,58,168,0.15); border: 2px solid ' + popularBorderColor + '; border-radius: 12px; padding: 2rem; text-align: center; transition: all 0.3s ease; cursor: default;">' +
                            popularBadge + cardHeader + titleElement + priceElement + descElement + cardHeaderClose + buttonElement + '</div>';
                    } else {
                        pricingPlans += '<div class="pricing-plan" style="position: relative; background: ' + cardBackground + '; border: 1px solid ' + cardBorder + '; border-radius: 12px; padding: 2rem; text-align: center; transition: all 0.3s ease; cursor: default;">' +
                            popularBadge + cardHeader + titleElement + priceElement + descElement + cardHeaderClose + buttonElement + '</div>';
                    }
                }
            }

            // Feature-Rows für Vergleichstabelle generieren
            for (let i = 1; i <= 10; i++) {
                const featureName = props['feature' + i + 'Name'];
                const plan1Feature = props['feature' + i + 'Plan1'];
                const plan2Feature = props['feature' + i + 'Plan2'];
                const plan3Feature = props['feature' + i + 'Plan3'];
                const isActive = props['feature' + i + 'Active'] === 'true';

                if (featureName && plan1Feature && plan2Feature && plan3Feature && isActive) {
                    const rowBg = i % 2 === 0 ? (props.tableRowBackground || '#f8f9fa') : 'transparent';
                    const tableTextColor = props.tableTextColor || '#333333';
                    const tableBorderColor = props.tableBorderColor || '#DEE2E6';

                    featureRows += '<div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 1rem; padding: 1rem; background: ' + rowBg + '; border-bottom: 1px solid ' + tableBorderColor + ';">' +
                        '<div style="color: ' + tableTextColor + '; font-weight: 600;">' + featureName + '</div>' +
                        '<div style="text-align: center; color: ' + tableTextColor + ';">' + plan1Feature + '</div>' +
                        '<div style="text-align: center; color: ' + tableTextColor + ';">' + plan2Feature + '</div>' +
                        '<div style="text-align: center; color: ' + tableTextColor + ';">' + plan3Feature + '</div>' +
                        '</div>';

                    // Mobile Feature Cards
                    const cardBorder = props.cardBorder || '#DEE2E6';
                    const textColor = props.textColor || '#333333';
                    const planColor = props.planColor || '#063AA8';
                    const plan1Name = props.plan1Name || 'Plan 1';
                    const plan2Name = props.plan2Name || 'Plan 2';
                    const plan3Name = props.plan3Name || 'Plan 3';

                    mobileFeatureCards += '<div style="background: white; border: 1px solid ' + cardBorder + '; border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem;">' +
                        '<h4 style="color: ' + textColor + '; margin: 0 0 1rem 0; font-size: 1.1rem;">' + featureName + '</h4>' +
                        '<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">' +
                        '<div style="text-align: center;">' +
                        '<div style="color: ' + planColor + '; margin-bottom: 0.5rem; font-size: 0.9rem;">' + plan1Name + '</div>' +
                        '<div style="color: ' + tableTextColor + '; font-size: 0.9rem;">' + plan1Feature + '</div>' +
                        '</div>' +
                        '<div style="text-align: center;">' +
                        '<div style="color: ' + planColor + '; margin-bottom: 0.5rem; font-size: 0.9rem;">' + plan2Name + '</div>' +
                        '<div style="color: ' + tableTextColor + '; font-size: 0.9rem;">' + plan2Feature + '</div>' +
                        '</div>' +
                        '<div style="text-align: center;">' +
                        '<div style="color: ' + planColor + '; margin-bottom: 0.5rem; font-size: 0.9rem;">' + plan3Name + '</div>' +
                        '<div style="color: ' + tableTextColor + '; font-size: 0.9rem;">' + plan3Feature + '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
            }

            // Template-Platzhalter ersetzen
            html = html.replace('{{pricingPlans}}', pricingPlans);
            html = html.replace('{{featureRows}}', featureRows);
            html = html.replace('{{mobileFeatureCards}}', mobileFeatureCards);

            return html;
        }

        function processKerberosNewsletterModern(module, html) {
            const props = module.properties;
            let benefitItems = '';

            for (let i = 1; i <= 4; i++) {
                const icon = props['benefit' + i + 'Icon'];
                const text = props['benefit' + i + 'Text'];
                const color = props['benefit' + i + 'Color'];
                const isActive = props['benefit' + i + 'Active'] === 'true';

                if (icon && text && isActive) {
                    // Fallback-Werte definieren
                    const benefitColor = color || '#063AA8';
                    const textColor = props.textColor || '#333333';
                    const iconText = icon || '&#xf005;';
                    const benefitText = text || '';
                    
                    // Icon-Variablen definieren (FEHLENDE VARIABLEN)
                    const iconSize = props.iconSize || '2.5rem';
                    const iconColor = props.iconColor || benefitColor;
                    const iconContainerSize = props.iconContainerSize || '60px';
                    const iconBackground = props.iconBackground || 'rgba(6,58,168,0.1)';
                    const iconRadius = props.iconRadius || '50%';
                    const iconSpacing = props.iconSpacing || '1rem';
                    const validIcon = iconText.startsWith('&#x') ? iconText : '&#xf005;';

                    // HTML-Elemente als separate Variablen
                    const containerStart = '<div style="text-align: center;">';
                    const iconElement = '<div style="font-family: \'Font Awesome 5 Pro\'; font-size: ' + iconSize + '; color: ' + iconColor + '; display: inline-flex; align-items: center; justify-content: center; width: ' + iconContainerSize + '; height: ' + iconContainerSize + '; background: ' + iconBackground + '; border-radius: ' + iconRadius + '; margin-bottom: ' + iconSpacing + ';">' + validIcon + '</div>';
                    const textElement = '<p style="font-family: var(--body-font-font-family); color: ' + textColor + '; margin: 0; font-weight: 600;">' + benefitText + '</p>';
                    const containerEnd = '</div>';

                    // Saubere String-Konkatenation
                    benefitItems += containerStart + iconElement + textElement + containerEnd;
                }
            }

            // Grid-Spalten definieren basierend auf gridColumns Property
            const gridColumns = props.gridColumns || '4';
            let gridColumnsCSS;

            if (gridColumns === 'auto-fit') {
                gridColumnsCSS = 'repeat(auto-fit, minmax(250px, 1fr))';
            } else {
                gridColumnsCSS = `repeat(${gridColumns}, 1fr)`;
            }

            // HTML Template-Platzhalter ersetzen
            html = html.replace('{{benefitItems}}', benefitItems);
            html = html.replace(/repeat\(\{\{gridColumns\}\}, 1fr\)/g, gridColumnsCSS);

            return html;
        }

        function processKerberosStats(module, html) {
            console.log('🔍 processKerberosStats aufgerufen für:', module.id);
            const props = module.properties;

            // Icon-Größen-Presets
            const iconSizes = {
                'small': { size: '2rem', background: '60px' },
                'medium': { size: '2.5rem', background: '70px' },
                'large': { size: '3rem', background: '80px' },
                'huge': { size: '4rem', background: '100px' }
            };
            const iconPreset = iconSizes[props.iconSizePreset] || iconSizes['large'];

            // Template-ID global ersetzen
            html = html.replace(/\{\{templateId\}\}/g, module.id);
            html = html.replace(/\{\{hoverTransform\}\}/g, props.hoverTransform || 'translateY(-4px)');
            html = html.replace(/\{\{hoverShadow\}\}/g, props.hoverShadow || '0 8px 24px rgba(6,58,168,0.15)');
            html = html.replace(/\{\{mobileMinWidth\}\}/g, props.mobileMinWidth || '200px');

            // REPEATING ITEMS HELPER
            const result = processRepeatingItems(module, {
                prefix: 'stat',
                maxItems: 4,
                requireActive: false,
                requiredProps: ['Number', 'Text', 'Icon'],
                properties: ['Number', 'Text', 'Icon', 'IconColor', 'NumberColor', 'TextColor'],
                
                template: (item, index, props) => `
                    <div class="kerberos-stat-card" style="background: ${props.cardBackground}; border: 1px solid ${props.cardBorder}; border-radius: ${props.cardRadius}; padding: ${props.cardPadding}; text-align: center; box-shadow: ${props.cardShadow};">
                        <div style="display: flex; align-items: center; justify-content: center; width: ${iconPreset.background}; height: ${iconPreset.background}; background: ${props.iconBackgroundColor}; border-radius: ${props.iconBackgroundRadius}; margin: 0 auto ${props.iconSpacing};">
                            <div class="kerberos-stat-icon" style="font-family: 'Font Awesome 5 Pro'; font-size: ${iconPreset.size}; color: ${item.IconColor};">${item.Icon}</div>
                        </div>
                        <div style="font-size: ${props.numberSize}; font-weight: 700; color: ${item.NumberColor}; margin-bottom: ${props.numberSpacing};">${item.Number}</div>
                        <div style="font-size: ${props.textSize}; color: ${item.TextColor}; line-height: 1.4;">${item.Text}</div>
                    </div>`
            });

            html = html.replace('{{statsBlocks}}', result.html);
            console.log(`✅ Stats verarbeitet: ${result.count} Blöcke generiert`);
            return html;
        }

        function processKerberosStatsWithHover(module, html) {
            console.log('📊 processKerberosStatsWithHover aufgerufen für:', module.id);
            const props = module.properties;
            
            // Icon-Größen-Presets
            const iconSizes = {
                'small': { size: '2rem', background: '60px' },
                'medium': { size: '2.5rem', background: '70px' },
                'large': { size: '3rem', background: '80px' },
                'huge': { size: '4rem', background: '100px' }
            };
            const iconPreset = iconSizes[props.iconSizePreset] || iconSizes['large'];

            // Template-ID global ersetzen
            html = html.replace(/\{\{templateId\}\}/g, module.id);
            html = html.replace(/\{\{hoverTransform\}\}/g, props.hoverTransform || 'translateY(-4px)');
            html = html.replace(/\{\{hoverShadow\}\}/g, props.hoverShadow || '0 8px 24px rgba(6,58,168,0.15)');
            html = html.replace(/\{\{mobileMinWidth\}\}/g, props.mobileMinWidth || '200px');

            // Hover-CSS einmalig hinzufügen
            const hoverCSS = `
                <style>
                .kerberos-stat-hover-${module.id}:hover {
                    transform: ${props.cardHoverTransform || 'translateY(-8px)'} !important;
                    box-shadow: ${props.cardHoverShadow || '0 8px 24px rgba(6,58,168,0.15)'} !important;
                    background: ${props.hoverBackground || 'rgba(6,58,168,0.05)'} !important;
                }
                .kerberos-stat-hover-${module.id}:hover .feature-icon {
                    transform: scale(1.1) !important;
                    color: #009CE6 !important;
                }
                </style>`;

            // REPEATING ITEMS HELPER
            const result = processRepeatingItems(module, {
                prefix: 'stat',
                maxItems: 4,
                requireActive: false,
                requiredProps: ['Number', 'Text', 'Icon'],
                properties: ['Number', 'Text', 'Icon', 'IconColor', 'NumberColor', 'TextColor', 'IconBgColor'],
                
                template: (item, index, props) => {
                    const iconBgColor = item.IconBgColor || props.iconBackgroundColor || 'linear-gradient(135deg, #063AA8, #009CE6)';
                    const cardBackground = props.cardBackground || '#ffffff';
                    const cardBorder = props.cardBorder || '1px solid #e9ecef';
                    const cardRadius = props.cardRadius || '12px';
                    const cardPadding = props.cardPadding || '2.5rem 2rem';
                    
                    return `
                        <div class="kerberos-stat-card kerberos-stat-hover-${module.id}" 
                            style="background: ${cardBackground}; 
                                    border: ${cardBorder}; 
                                    border-radius: ${cardRadius}; 
                                    padding: ${cardPadding}; 
                                    text-align: center; 
                                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                                    cursor: default;
                                    position: relative;
                                    overflow: hidden;">
                            <div style="display: inline-block; 
                                        width: ${iconPreset.background}; 
                                        height: ${iconPreset.background}; 
                                        background: ${iconBgColor}; 
                                        border-radius: ${props.iconBackgroundRadius || '50%'}; 
                                        display: flex; 
                                        align-items: center; 
                                        justify-content: center; 
                                        margin-bottom: 1.5rem;
                                        transition: all 0.3s ease;">
                                <span class="feature-icon" style="font-family: 'Font Awesome 5 Pro'; 
                                                                font-size: ${iconPreset.size}; 
                                                                color: ${item.IconColor || '#063AA8'}; 
                                                                line-height: 1;">
                                    ${item.Icon}
                                </span>
                            </div>
                            <div style="font-size: ${props.numberSize || '3rem'}; 
                                        font-weight: 700; 
                                        color: ${item.NumberColor || '#063AA8'}; 
                                        margin-bottom: ${props.numberSpacing || '0.5rem'}; 
                                        font-family: var(--heading-font-font-family);
                                        line-height: 1;">
                                ${item.Number}
                            </div>
                            <div style="font-size: ${props.textSize || '1rem'}; 
                                        color: ${item.TextColor || '#6c757d'}; 
                                        font-family: var(--body-font-font-family);
                                        line-height: 1.4;">
                                ${item.Text}
                            </div>
                        </div>`;
                }
            });

            html = hoverCSS + html.replace('{{statsContent}}', result.html);
            console.log(`✅ Stats with Hover verarbeitet: ${result.count} Cards generiert`);
            return html;
        }

        // Globale Verfügbarkeit sicherstellen
        window.processKerberosStatsWithHover = processKerberosStatsWithHover;


        function processKerberosProductShowcase(module, html) {
            const props = module.properties;
            let featureList = '';
            let additionalScreenshots = '';
            let mainContent = '';

            // Feature-Liste generieren
            for (let i = 1; i <= 4; i++) {
                // SCHRITT 1: Property-Zugriffe korrigieren (Template-Literals → String-Konkatenation)
                const text = props['feature' + i + 'Text'];
                const icon = props['feature' + i + 'Icon'];
                const color = props['feature' + i + 'Color'];
                const isActive = props['feature' + i + 'Active'] === 'true';

                if (text && icon && isActive) {
                    // SCHRITT 2: Fallback-Werte definieren
                    const featureColor = color || '#063AA8';
                    const textColor = props.textColor || '#333333';
                    const iconText = icon || '●';
                    const featureText = text || '';

                    // SCHRITT 3: HTML-Elemente in separate Variablen aufteilen
                    const listStart = '<li style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">';
                    const iconDiv = '<div style="font-family: \'Font Awesome 5 Pro\'; font-size: 1.25rem; color: ' + featureColor + '; width: 24px;">' + iconText + '</div>';
                    const textSpan = '<span style="font-family: var(--body-font-font-family); color: ' + textColor + ';">' + featureText + '</span>';
                    const listEnd = '</li>';

                    // SCHRITT 4: String-Konkatenation verwenden
                    featureList += listStart + iconDiv + textSpan + listEnd;
                }
            }

            // Haupt-Content (Bild oder Video)
            if (props.contentType === 'video' && props.videoUrl) {
                mainContent = `<video controls style="width: 100%; height: auto;" poster="{{mainImage}}">
                    <source src="{{videoUrl}}" type="video/mp4">
                    Ihr Browser unterstützt keine Videos.
                </video>`;
            } else {
                mainContent = `<img src="{{mainImage}}" alt="${props.mainImageAlt}" style="width: 100%; height: auto; object-fit: cover;">`;
            }

            // Screenshots generieren
            for (let i = 1; i <= 3; i++) {
                const image = props[`screenshot${i}Image`];
                const title = props[`screenshot${i}Title`];
                const description = props[`screenshot${i}Description`];
                const isActive = props[`screenshot${i}Active`] === 'true';

                if (image && title && isActive) {
                    // SCHRITT 1: Fallback-Werte definieren
                    const cardBackground = props.cardBackground || 'white';
                    const cardBorder = props.cardBorder || '#DEE2E6';
                    const textColor = props.textColor || '#333333';
                    const subtitleColor = props.subtitleColor || '#666666';
                    const cardTitle = title || '';
                    const cardDescription = description || '';

                    // SCHRITT 2: HTML-Elemente in separate Variablen aufteilen
                    const cardStart = '<div class="screenshot-card" style="background: ' + cardBackground + '; border: 1px solid ' + cardBorder + '; border-radius: 8px; overflow: hidden; transition: all 0.3s ease; cursor: default;">';
                    const responsiveImage = createResponsiveImage('{{imageUrl}}', cardTitle, '', '(max-width: 768px) 100vw, 33vw');
                    const imageElement = responsiveImage.replace('style="width: 100%; height: auto; object-fit: cover;"', 'style="width: 100%; height: 200px; object-fit: cover;"');
                    const contentStart = '<div style="padding: 1rem;">';
                    const titleElement = '<h4 style="font-family: var(--heading-font-font-family); color: ' + textColor + '; margin: 0 0 0.5rem 0; font-size: 1.1rem;">' + cardTitle + '</h4>';
                    const descriptionElement = '<p style="font-family: var(--body-font-font-family); color: ' + subtitleColor + '; margin: 0; font-size: 0.9rem;">' + cardDescription + '</p>';
                    const contentEnd = '</div>';
                    const cardEnd = '</div>';

                    // SCHRITT 3: String-Konkatenation verwenden
                    additionalScreenshots += cardStart + imageElement + contentStart + titleElement + descriptionElement + contentEnd + cardEnd;
                }
            }

            html = html.replace('{{mainContent}}', mainContent);
            html = html.replace('{{featureList}}', featureList);
            html = html.replace('{{additionalScreenshots}}', additionalScreenshots);

            return html;
        }

        function processKerberosIntegrationsGridModern(module, html) {
            const props = module.properties;
            let integrationCards = '';
            let filterButtons = '';

            // Sammle alle Kategorien
            const categories = ['all'];
            for (let i = 1; i <= 12; i++) {
                const category = props['integration' + i + 'Category'];
                if (category && !categories.includes(category)) {
                    categories.push(category);
                }
            }

            // Filter Buttons
            categories.forEach((category, index) => {
                const isActive = index === 0;
                const buttonText = category === 'all' ? 'Alle' : category.charAt(0).toUpperCase() + category.slice(1);

                filterButtons += `
                    <button class="integration-filter" data-category="${category}" 
                            style="padding: 0.75rem 1.5rem; border: 2px solid #063AA8; background: ${isActive ? '#063AA8' : 'transparent'}; color: ${isActive ? 'white' : '#063AA8'}; border-radius: 25px; cursor: pointer; font-family: var(--body-font-font-family); font-weight: 600; transition: all 0.3s ease; margin: 0.25rem;">
                        ${buttonText}
                    </button>`;
            });

            // Integration Cards
            for (let i = 1; i <= 12; i++) {
                const name = props['integration' + i + 'Name'];
                const category = props['integration' + i + 'Category'];
                const status = props['integration' + i + 'Status'];
                const description = props['integration' + i + 'Description'];
                const icon = props['integration' + i + 'Icon'];
                const isActive = props['integration' + i + 'Active'] === 'true';

                if (name && category && isActive) {
                    const statusColors = {
                        'available': '#28A745',
                        'beta': '#B265E9',
                        'development': '#EF8646',
                        'planned': '#6c757d'
                    };
                    const statusColor = statusColors[status] || '#28A745';
                    const statusText = status === 'available' ? 'Verfügbar' :
                        status === 'beta' ? 'Beta' :
                            status === 'development' ? 'In Entwicklung' : 'Geplant';

                    integrationCards += `
                        <div class="integration-card" data-category="${category}" 
                            style="background: #FFFFFF; border: 1px solid #DEE2E6; border-radius: 8px; padding: 1.5rem; text-align: center; transition: all 0.3s ease; cursor: pointer; display: block;">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">${icon || '🔗'}</div>
                            <h4 style="font-family: var(--heading-font-font-family); color: #212529; margin: 0 0 0.5rem 0; font-size: 1.1rem;">${name}</h4>
                            <div style="background: ${statusColor}; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.7rem; font-weight: 700; display: inline-block; margin-bottom: 1rem;">${statusText}</div>
                            <p style="font-family: var(--body-font-font-family); color: #212529; margin: 0; font-size: 0.9rem; opacity: 0.8;">${description}</p>
                        </div>`;
                }
            }

            // ✅ MODERNE LÖSUNG: Escaping der Template-Literals
            const filterScript = `
                <script>
                document.addEventListener('DOMContentLoaded', function() {
                    const filterButtons = document.querySelectorAll('.integration-filter');
                    const integrationCards = document.querySelectorAll('.integration-card');
                    
                    filterButtons.forEach(button => {
                        button.addEventListener('click', function() {
                            const category = this.dataset.category;
                            
                            // Reset button styles
                            filterButtons.forEach(btn => {
                                btn.style.background = 'transparent';
                                btn.style.color = '#063AA8';
                            });
                            
                            // Activate clicked button
                            this.style.background = '#063AA8';
                            this.style.color = 'white';
                            
                            // Filter cards
                            integrationCards.forEach(card => {
                                if (category === 'all' || card.dataset.category === category) {
                                    card.style.display = 'block';
                                    card.style.opacity = '1';
                                } else {
                                    card.style.display = 'none';
                                    card.style.opacity = '0';
                                }
                            });
                        });
                    });
                    
                    // Card hover effects
                    integrationCards.forEach(card => {
                        card.addEventListener('mouseenter', function() {
                            this.style.transform = 'translateY(-4px)';
                            this.style.boxShadow = '0 8px 24px rgba(6,58,168,0.15)';
                        });
                        card.addEventListener('mouseleave', function() {
                            this.style.transform = 'translateY(0)';
                            this.style.boxShadow = 'none';
                        });
                    });
                });
                <\/script>`;  // ✅ KORRIGIERT: Escaped closing script tag

            html = html.replace('{{filterButtons}}', filterButtons);
            html = html.replace('{{integrationCards}}', integrationCards);

            return html + filterScript;
        }

        // Wrapper für normale Integrations Grid
        function processKerberosIntegrationsGrid(module, html) {
            // Verwende die moderne Funktion
            return processKerberosIntegrationsGridModern(module, html);
        }

        // Neue Processor für erweiterte Module
        function processKerberosFeatureComparisonExtended(module, html) {
            const props = module.properties;
            let featureRows = '';
            let mobileFeatureCards = '';

            // Generiere Tabellenzeilen für aktive Features
            for (let i = 1; i <= 10; i++) {
                // SCHRITT 1: Property-Zugriffe korrigieren
                const col1 = props['row' + i + 'Col1'];
                const col2 = props['row' + i + 'Col2'];
                const col3 = props['row' + i + 'Col3'];
                const col4 = props['row' + i + 'Col4'];
                const isActive = props['row' + i + 'Active'] === 'true';

                if (col1 && col2 && col3 && col4 && isActive) {
                    // SCHRITT 2: Fallback-Werte für alle Properties definieren
                    const tableRowBg1 = props.tableRowBg1 || '#ffffff';
                    const tableRowBg2 = props.tableRowBg2 || '#f8f9fa';
                    const tableTextColor = props.tableTextColor || '#333333';
                    const mobileBorder = props.mobileBorder || '#DEE2E6';
                    const mobileFeatureTitle = props.mobileFeatureTitle || '#333333';
                    const col2Color = props.col2Color || '#063AA8';
                    const col3Color = props.col3Color || '#063AA8';
                    const col4Color = props.col4Color || '#063AA8';
                    const headerCol2 = props.headerCol2 || 'Column 2';
                    const headerCol3 = props.headerCol3 || 'Column 3';
                    const headerCol4 = props.headerCol4 || 'Column 4';

                    const rowBg = i % 2 === 0 ? tableRowBg2 : tableRowBg1;
                    const safeCol1 = col1 || '';
                    const safeCol2 = col2 || '';
                    const safeCol3 = col3 || '';
                    const safeCol4 = col4 || '';

                    // SCHRITT 3: Tabellen-Zeile in separate Variablen aufteilen
                    const trStart = '<tr style="background: ' + rowBg + ';">';
                    const td1 = '<td style="padding: 1rem; font-family: var(--body-font-font-family); color: ' + tableTextColor + '; font-weight: 600;">' + safeCol1 + '</td>';
                    const td2 = '<td style="padding: 1rem; text-align: center; font-family: var(--body-font-font-family); color: ' + tableTextColor + ';">' + safeCol2 + '</td>';
                    const td3 = '<td style="padding: 1rem; text-align: center; font-family: var(--body-font-font-family); color: ' + tableTextColor + ';">' + safeCol3 + '</td>';
                    const td4 = '<td style="padding: 1rem; text-align: center; font-family: var(--body-font-font-family); color: ' + tableTextColor + ';">' + safeCol4 + '</td>';
                    const trEnd = '</tr>';

                    // SCHRITT 4: Mobile-Cards in separate Variablen aufteilen
                    const mobileCardStart = '<div style="background: white; border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem; border: 1px solid ' + mobileBorder + ';">';
                    const mobileTitle = '<h4 style="font-family: var(--heading-font-font-family); color: ' + mobileFeatureTitle + '; margin: 0 0 1rem 0; font-size: 1.1rem;">' + safeCol1 + '</h4>';
                    const mobileGridStart = '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; text-align: center;">';

                    const mobileCol2Block = '<div>' +
                        '<div style="font-weight: 600; color: ' + col2Color + '; margin-bottom: 0.5rem; font-size: 0.9rem;">' + headerCol2 + '</div>' +
                        '<div style="color: ' + tableTextColor + '; font-size: 0.9rem;">' + safeCol2 + '</div>' +
                        '</div>';

                    const mobileCol3Block = '<div>' +
                        '<div style="font-weight: 600; color: ' + col3Color + '; margin-bottom: 0.5rem; font-size: 0.9rem;">' + headerCol3 + '</div>' +
                        '<div style="color: ' + tableTextColor + '; font-size: 0.9rem;">' + safeCol3 + '</div>' +
                        '</div>';

                    const mobileCol4Block = '<div>' +
                        '<div style="font-weight: 600; color: ' + col4Color + '; margin-bottom: 0.5rem; font-size: 0.9rem;">' + headerCol4 + '</div>' +
                        '<div style="color: ' + tableTextColor + '; font-size: 0.9rem;">' + safeCol4 + '</div>' +
                        '</div>';

                    const mobileGridEnd = '</div>';
                    const mobileCardEnd = '</div>';

                    // SCHRITT 5: String-Konkatenation verwenden
                    featureRows += trStart + td1 + td2 + td3 + td4 + trEnd;

                    mobileFeatureCards += mobileCardStart + mobileTitle + mobileGridStart +
                        mobileCol2Block + mobileCol3Block + mobileCol4Block +
                        mobileGridEnd + mobileCardEnd;
                }
            }

            html = html.replace('{{featureRows}}', featureRows);
            html = html.replace('{{mobileFeatureCards}}', mobileFeatureCards);

            return html;
        }

        function processKerberosPricingResponseExtended(module, html) {
            const props = module.properties;
            let featureRows = '';
            let mobileFeatureCards = '';

            // Generiere Feature-Vergleichszeilen
            for (let i = 1; i <= 10; i++) {
                // SCHRITT 1: Property-Zugriffe korrigieren
                const featureName = props['feature' + i + 'Name'];
                const plan1Feature = props['feature' + i + 'Plan1'];
                const plan2Feature = props['feature' + i + 'Plan2'];
                const plan3Feature = props['feature' + i + 'Plan3'];
                const isActive = props['feature' + i + 'Active'] === 'true';

                if (featureName && plan1Feature && plan2Feature && plan3Feature && isActive) {
                    // SCHRITT 2: Fallback-Werte für alle Properties definieren
                    const tableRowBg1 = props.tableRowBg1 || '#ffffff';
                    const tableRowBg2 = props.tableRowBg2 || '#f8f9fa';
                    const tableTextColor = props.tableTextColor || '#333333';
                    const mobileBorder = props.mobileBorder || '#DEE2E6';
                    const mobileFeatureTitle = props.mobileFeatureTitle || '#333333';
                    const plan1Color = props.plan1Color || '#063AA8';
                    const plan2Color = props.plan2Color || '#28a745';
                    const plan3Color = props.plan3Color || '#dc3545';
                    const plan1Name = props.plan1Name || 'Plan 1';
                    const plan2Name = props.plan2Name || 'Plan 2';
                    const plan3Name = props.plan3Name || 'Plan 3';

                    const rowBg = i % 2 === 0 ? tableRowBg2 : tableRowBg1;
                    const safeFeatureName = featureName || '';
                    const safePlan1Feature = plan1Feature || '';
                    const safePlan2Feature = plan2Feature || '';
                    const safePlan3Feature = plan3Feature || '';

                    // SCHRITT 3: Tabellen-Zeile in separate Variablen aufteilen
                    const trStart = '<tr style="background: ' + rowBg + ';">';
                    const tdFeatureName = '<td style="padding: 1rem; font-family: var(--body-font-font-family); color: ' + tableTextColor + '; font-weight: 600;">' + safeFeatureName + '</td>';
                    const tdPlan1 = '<td style="padding: 1rem; text-align: center; font-family: var(--body-font-font-family); color: ' + tableTextColor + ';">' + safePlan1Feature + '</td>';
                    const tdPlan2 = '<td style="padding: 1rem; text-align: center; font-family: var(--body-font-font-family); color: ' + tableTextColor + ';">' + safePlan2Feature + '</td>';
                    const tdPlan3 = '<td style="padding: 1rem; text-align: center; font-family: var(--body-font-font-family); color: ' + tableTextColor + ';">' + safePlan3Feature + '</td>';
                    const trEnd = '</tr>';

                    // SCHRITT 4: Mobile-Cards in separate Variablen aufteilen
                    const mobileCardStart = '<div style="background: white; border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem; border: 1px solid ' + mobileBorder + ';">';
                    const mobileTitle = '<h4 style="font-family: var(--heading-font-font-family); color: ' + mobileFeatureTitle + '; margin: 0 0 1rem 0; font-size: 1.1rem;">' + safeFeatureName + '</h4>';
                    const mobileGridStart = '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; text-align: center;">';

                    const mobilePlan1Block = '<div>' +
                        '<div style="font-weight: 600; color: ' + plan1Color + '; margin-bottom: 0.5rem; font-size: 0.9rem;">' + plan1Name + '</div>' +
                        '<div style="color: ' + tableTextColor + '; font-size: 0.9rem;">' + safePlan1Feature + '</div>' +
                        '</div>';

                    const mobilePlan2Block = '<div>' +
                        '<div style="font-weight: 600; color: ' + plan2Color + '; margin-bottom: 0.5rem; font-size: 0.9rem;">' + plan2Name + '</div>' +
                        '<div style="color: ' + tableTextColor + '; font-size: 0.9rem;">' + safePlan2Feature + '</div>' +
                        '</div>';

                    const mobilePlan3Block = '<div>' +
                        '<div style="font-weight: 600; color: ' + plan3Color + '; margin-bottom: 0.5rem; font-size: 0.9rem;">' + plan3Name + '</div>' +
                        '<div style="color: ' + tableTextColor + '; font-size: 0.9rem;">' + safePlan3Feature + '</div>' +
                        '</div>';

                    const mobileGridEnd = '</div>';
                    const mobileCardEnd = '</div>';

                    // SCHRITT 5: String-Konkatenation verwenden
                    featureRows += trStart + tdFeatureName + tdPlan1 + tdPlan2 + tdPlan3 + trEnd;

                    mobileFeatureCards += mobileCardStart + mobileTitle + mobileGridStart +
                        mobilePlan1Block + mobilePlan2Block + mobilePlan3Block +
                        mobileGridEnd + mobileCardEnd;
                }
            }

            html = html.replace('{{featureRows}}', featureRows);
            html = html.replace('{{mobileFeatureCards}}', mobileFeatureCards);

            return html;
        }


        // REPARIERTE HILFSFUNKTION: Auto-Hide-Verarbeitung für Challenge-Solution Module
        function processChallengeSolutionAutoHide(module, html) {
            const props = module.properties;

            // Helper: Prüfe ob Feld leer ist
            const isEmpty = (value) => !value || value.trim() === '';

            // === WICHTIG: ALLE AUTO-DISPLAY PROPERTIES ZURÜCKSETZEN ===
            // Dies verhindert das "permanent ausgeblendet" Problem
            props.challengePoint1AutoDisplay = 'block';
            props.challengePoint2AutoDisplay = 'block';
            props.challengePoint3AutoDisplay = 'block';
            props.requirementPoint1AutoDisplay = 'block';
            props.requirementPoint2AutoDisplay = 'block';
            props.requirementPoint3AutoDisplay = 'block';
            props.showSolutionPoint1 = 'block';
            props.showSolutionPoint2 = 'block';
            props.showSolutionPoint3 = 'block';
            props.showChallengePoints = 'block';
            props.showRequirementPoints = 'block';
            props.showSolutionPoints = 'block';
            props.showCTA = 'block';
            props.showBottomCTA = 'none'; // Standardmäßig ausgeblendet
            props.showConnectionLine = 'block';

            // === AUTOMATISCHE SICHTBARKEITS-UPDATES ===

            // Challenge Points einzeln prüfen und AutoDisplay setzen
            if (isEmpty(props.challengePoint1)) {
                props.challengePoint1AutoDisplay = 'none';
            }
            if (isEmpty(props.challengePoint2)) {
                props.challengePoint2AutoDisplay = 'none';
            }
            if (isEmpty(props.challengePoint3)) {
                props.challengePoint3AutoDisplay = 'none';
            }

            // Requirement Points einzeln prüfen
            if (isEmpty(props.requirementPoint1)) {
                props.requirementPoint1AutoDisplay = 'none';
            }
            if (isEmpty(props.requirementPoint2)) {
                props.requirementPoint2AutoDisplay = 'none';
            }
            if (isEmpty(props.requirementPoint3)) {
                props.requirementPoint3AutoDisplay = 'none';
            }

            // Solution Points einzeln prüfen
            if (isEmpty(props.solutionPoint1)) {
                props.showSolutionPoint1 = 'none';
            }
            if (isEmpty(props.solutionPoint2)) {
                props.showSolutionPoint2 = 'none';
            }
            if (isEmpty(props.solutionPoint3)) {
                props.showSolutionPoint3 = 'none';
            }

            // === KOMPLETTE BEREICHE AUSBLENDEN ===

            // Challenge Points-Liste ausblenden wenn alle leer
            if (isEmpty(props.challengePoint1) && isEmpty(props.challengePoint2) && isEmpty(props.challengePoint3)) {
                props.showChallengePoints = 'none';
            }

            // Requirement Points-Liste ausblenden wenn alle leer
            if (isEmpty(props.requirementPoint1) && isEmpty(props.requirementPoint2) && isEmpty(props.requirementPoint3)) {
                props.showRequirementPoints = 'none';
            }

            // Solution Points-Liste ausblenden wenn alle leer
            if (isEmpty(props.solutionPoint1) && isEmpty(props.solutionPoint2) && isEmpty(props.solutionPoint3)) {
                props.showSolutionPoints = 'none';
            }

            // === CTA BUTTONS AUSBLENDEN ===
            if (isEmpty(props.ctaText)) {
                props.showCTA = 'none';
            }

            if (isEmpty(props.bottomCtaText)) {
                props.showBottomCTA = 'none';
            } else {
                props.showBottomCTA = 'block'; // Anzeigen wenn Text vorhanden
            }

            // === VERBINDUNGSLINIE DYNAMISCH ===
            const hasChallenge = !isEmpty(props.challengeTitle);
            const hasRequirement = !isEmpty(props.requirementTitle);
            const hasSolution = !isEmpty(props.solutionTitle);
            const visibleBoxes = [hasChallenge, hasRequirement, hasSolution].filter(Boolean).length;

            if (visibleBoxes < 2) {
                props.showConnectionLine = 'none';
            }

            // === NACH den Property-Updates: Standard Property-Ersetzung ===
            // Diese Ersetzungen werden jetzt mit den korrekten Property-Werten gemacht
            Object.entries(props).forEach(([key, value]) => {
                const regex = new RegExp(`{{${key}}}`, 'g');
                const safeValue = typeof value === 'string' ?
                    value.replace(/'/g, "&#39;").replace(/"/g, "&quot;") : value;
                html = html.replace(regex, safeValue);
            });

            return html;
        }

        // VOLLSTÄNDIGE processModuleHTML Funktion - KORRIGIERT
        function processModuleHTML(module) {
            let html = module.html;

            try {
                // Universelle Template-Verarbeitung für alle Module
                html = processUniversalModule(module, html);

                // Intelligente Property-Ersetzung mit RichText-Support
                Object.entries(module.properties).forEach(([key, value]) => {
                    const regex = new RegExp(`{{${key}}}`, 'g');
                    
                    // Prüfe ob es sich um RichText-HTML handelt
                    if (typeof value === 'string' && value.includes('<') && value.includes('>')) {
                        // RichText-HTML: Direkt einsetzen ohne Escape
                        html = html.replace(regex, value);
                    } else {
                        // Normaler Text: Mit Escape für Sicherheit
                        const safeValue = typeof value === 'string' ?
                            value.replace(/'/g, "&#39;").replace(/"/g, "&quot;") : value;
                        html = html.replace(regex, safeValue);
                    }
                });

                // Fallback: Alle übrig gebliebenen Platzhalter ersetzen
                html = replaceTemplatePlaceholders(html, module);

                return html;

            } catch (error) {
                console.error('Fehler beim Verarbeiten des Moduls:', error);
                return `<div style="padding: 2rem; background: #fee; border: 1px solid #f00; color: #900;">
                    <h3>Modul-Fehler</h3>
                    <p>Das Modul "${module.name}" konnte nicht verarbeitet werden.</p>
                    <small>Fehler: ${error.message}</small>
                </div>`;
            }
        }

        // Fallback-Funktion für Template-Platzhalter
        function replaceTemplatePlaceholders(html, module) {
            // Ersetze alle übrig gebliebenen Platzhalter mit leeren Strings oder Standardwerten
            html = html.replace(/\{\{[^}]+\}\}/g, (match) => {
                console.warn('Unbekannter Platzhalter gefunden:', match, 'in Modul:', module.name);
                return ''; // Oder einen Standardwert zurückgeben
            });

            return html;
        }

        // Spezielle Verarbeitung für Statistik-Module
        function processStatsModule(module, html) {
            const props = module.properties;
            let statsBlocks = '';

            // Dynamische Generierung der Statistik-Blöcke
            for (let i = 1; i <= 4; i++) {
                const number = props['stat' + i + 'Number'];
                const text = props['stat' + i + 'Text'];
                const icon = props['stat' + i + 'Icon'];
                const iconColor = props['stat' + i + 'IconColor'];
                const numberColor = props['stat' + i + 'NumberColor'];
                const textColor = props['stat' + i + 'TextColor'];

                if (number && text) {
                    statsBlocks += '<div style="text-align: center; padding: ' + (props.statPadding || '2rem') + '; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(6,58,168,0.1);">' +
                        '<div style="font-family: \'Font Awesome 5 Pro\'; font-size: ' + (props.iconSize || '3rem') + '; color: ' + (iconColor || '#063AA8') + '; margin-bottom: ' + (props.iconSpacing || '1rem') + ';">' + (icon || '&#xf005;') + '</div>' +
                        '<div style="font-size: ' + (props.numberSize || '3rem') + '; font-weight: 700; color: ' + (numberColor || '#063AA8') + '; margin-bottom: ' + (props.numberSpacing || '0.5rem') + ';">' + number + '</div>' +
                        '<div style="font-size: ' + (props.textSize || '1rem') + '; color: ' + (textColor || '#6c757d') + ';">' + text + '</div>' +
                        '</div>';
                }
            }

            return html.replace('{{statsBlocks}}', statsBlocks);
        }

        // Spezielle Verarbeitung für Team-Gallery-Module
        function processTeamGalleryModule(module, html) {
            const props = module.properties;
            let teamMembers = '';

            // Dynamische Generierung der Team-Mitglieder (bis zu 4)
            for (let i = 1; i <= 4; i++) {
                // SCHRITT 1: Property-Zugriffe korrigieren
                const name = props['member' + i + 'Name'];
                const position = props['member' + i + 'Position'];
                const description = props['member' + i + 'Description'];
                const image = props['member' + i + 'Image'];
                const initialBg = props['member' + i + 'InitialBg'] || 'linear-gradient(135deg, #063AA8, #009CE6)';
                const isActive = props['member' + i + 'Active'] === 'true';

                if (name && isActive) {
                    // SCHRITT 2: Fallback-Werte für alle Properties definieren
                    const cardPadding = props.cardPadding || '2rem';
                    const avatarSize = props.avatarSize || '120px';
                    const nameColor = props.nameColor || '#212529';
                    const positionColor = props.positionColor || '#6c757d';
                    const descriptionColor = props.descriptionColor || '#6c757d';

                    const safeName = name || '';
                    const safePosition = position || '';
                    const safeDescription = description || '';
                    const initial = safeName.charAt(0).toUpperCase();

                    // SCHRITT 3: HTML-Elemente in separate Variablen aufteilen
                    const cardStart = '<div class="team-member-card" style="background: white; border-radius: 8px; padding: ' + cardPadding + '; text-align: center; box-shadow: 0 4px 12px rgba(6,58,168,0.1); transition: transform 0.3s ease, box-shadow 0.3s ease;">';
                        
                    // LÖSUNG: Avatar-Div bedingt erstellen (ohne separate avatarStyle Variable)
                    let avatarDiv = '';

                    if (image) {
                        // Mit Bild
                        avatarDiv = '<div class="team-avatar" style="width: ' + avatarSize + '; height: ' + avatarSize + '; border-radius: 50%; margin: 0 auto 1rem auto; background: url(\'{{imageUrl}}\') center/cover; background-color: #E9ECEF; transition: transform 0.3s ease;"></div>';
                    } else {
                        // Mit Initial-Buchstabe
                        avatarDiv = '<div class="team-avatar" style="width: ' + avatarSize + '; height: ' + avatarSize + '; border-radius: 50%; margin: 0 auto 1rem auto; background: ' + initialBg + '; background-color: #E9ECEF; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; font-weight: 700; transition: transform 0.3s ease;">' + initial + '</div>';
                    }

                    const nameElement = '<h4 style="font-family: var(--heading-font-font-family); font-size: var(--heading-4-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: ' + nameColor + '; margin: 0 0 0.5rem 0;">' + safeName + '</h4>';

                    const positionElement = '<p style="font-family: var(--body-font-font-family); font-size: var(--small-text-size); line-height: var(--body-font-line-height); color: ' + positionColor + '; margin: 0 0 1rem 0; font-weight: 600;">' + safePosition + '</p>';

                    const descriptionElement = '<p style="font-family: var(--body-font-font-family); font-size: var(--small-text-size); line-height: var(--body-font-line-height); color: ' + descriptionColor + '; margin: 0;">' + safeDescription + '</p>';

                    const cardEnd = '</div>';

                    // SCHRITT 4: String-Konkatenation verwenden
                    teamMembers += cardStart + avatarDiv + nameElement + positionElement + descriptionElement + cardEnd;
                }
            }

            // Hover-CSS für Team Cards
            const hoverCSS = `<style>
                .team-member-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 24px rgba(6,58,168,0.2);
                }
                .team-member-card:hover div[style*="border-radius: 50%"] {
                    transform: scale(1.05);
                }
            </style>`;
            return hoverCSS + html.replace('{{teamMembers}}', teamMembers);
        }

        // Neue Funktion für Kerberos Team Gallery
        function processKerberosTeamGallery(module, html) {
            // Verwende die existierende processTeamGalleryModule Funktion
            return processTeamGalleryModule(module, html);
        }


        // Produkt-Übersicht Modul Verarbeitung
        function processProductOverviewModule(module, html) {
            const props = module.properties;

            // Fallback-Werte definieren
            const titleColor = props.titleColor || '#333333';
            const subtitleColor = props.subtitleColor || '#666666';
            const cardBorderColor = props.cardBorderColor || '#DEE2E6';
            const cardTitleColor = props.cardTitleColor || '#333333';
            const cardDescriptionColor = props.cardDescriptionColor || '#666666';
            const cardHoverShadow = props.cardHoverShadow || '0 8px 24px rgba(6,58,168,0.15)';

            const safeTitle = props.title || 'Produkte';
            const safeSubtitle = props.subtitle || '';

            // Header Content (mit optionaler Subtitle)
            const headerStart = '<div style="text-align: center; margin-bottom: 3rem;">';
            const titleElement = '<h2 style="font-family: var(--heading-font-font-family); font-size: var(--heading-2-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: ' + titleColor + '; margin: 0 0 1rem 0;">' + safeTitle + '</h2>';

            let headerContent = headerStart + titleElement;

            if (props.showSubtitle === 'true' && props.subtitle) {
                const subtitleElement = '<p style="font-family: var(--body-font-font-family); font-size: var(--normal-text-size); line-height: var(--body-font-line-height); color: ' + subtitleColor + '; max-width: 800px; margin: 0 auto;">' + safeSubtitle + '</p>';
                headerContent += subtitleElement;
            }

            const headerEnd = '</div>';
            headerContent += headerEnd;

            // Product Cards (nur aktive anzeigen)
            let productCards = '';
            for (let i = 1; i <= 12; i++) {
                if (props['product' + i + 'Active'] === 'true') {
                    const title = props['product' + i + 'Title'] || 'Produkt ' + i;
                    const description = props['product' + i + 'Description'] || 'Beschreibung';
                    const image = props['product' + i + 'Image'] || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop';
                    const link = props['product' + i + 'Link'] || '#';

                    const safeProductTitle = title || '';
                    const safeProductDescription = description || '';
                    const safeProductLink = link || '#';

                    // HTML-Elemente für Product Card
                    const cardStart = '<a href="' + safeProductLink + '" class="product-card-' + module.id + '" style="background: #FFFFFF; border: 1px solid ' + cardBorderColor + '; border-radius: 8px; overflow: hidden; transition: all 0.3s ease; text-decoration: none; display: block; cursor: pointer;">';
                    const responsiveImage = createResponsiveImage('{{imageUrl}}', safeProductTitle, '', '(max-width: 768px) 100vw, 50vw');
                    const imageElement = responsiveImage.replace('style="width: 100%; height: auto; object-fit: cover;"', 'style="width: 100%; height: 200px; object-fit: cover;"');
                    const contentStart = '<div style="padding: 1rem;">';
                    const titleElement = '<h4 style="font-family: var(--heading-font-font-family); color: ' + cardTitleColor + '; margin: 0 0 0.5rem 0; font-size: 1.1rem;">' + safeProductTitle + '</h4>';
                    const descriptionElement = '<p style="font-family: var(--body-font-font-family); color: ' + cardDescriptionColor + '; margin: 0; font-size: 0.9rem;">' + safeProductDescription + '</p>';
                    const contentEnd = '</div>';
                    const cardEnd = '</a>';

                    productCards += cardStart + imageElement + contentStart + titleElement + descriptionElement + contentEnd + cardEnd;
                }
            }

            // CSS für Hover-Effekte hinzufügen
            const classId = module.id;
            const shadowValue = cardHoverShadow;

            let cssString = '<style>DOTPRODUCTCARDCLASSID:hover { transform: translateY(-4px) !important; box-shadow: SHADOWVALUE !important; border-color: rgba(6,58,168,0.3) !important; } DOTPRODUCTCARDCLASSID:active { transform: translateY(-2px) !important; transition: all 0.1s ease !important; }</style>';

            cssString = cssString.replace(/DOTPRODUCTCARDCLASSID/g, '.product-card-' + classId);
            cssString = cssString.replace(/SHADOWVALUE/g, shadowValue);

            const hoverCSS = cssString;

            // Template zusammenbauen
            html = html.replace('{{headerContent}}', headerContent);
            html = html.replace('{{productCards}}', productCards);

            // CSS hinzufügen
            html = hoverCSS + html;

            return html;
        }

        // Spezielle Verarbeitung für Bild-Text-Module
        function processImageTextModule(module, html) {
            const props = module.properties;
            const layoutType = props.layoutType || 'image-left';

            // Fallback-Werte definieren
            const iconColor = props.iconColor || '#063AA8';
            const titleColor = props.titleColor || '#333333';
            const textColor = props.textColor || '#666666';
            const buttonBgColor = props.buttonBgColor || '#063AA8';
            const buttonTextColor = props.buttonTextColor || 'white';
            const contentGap = props.contentGap || '3rem';
            const gap = contentGap; // gap war undefined im Original

            const safeTitle = props.title || '';
            const safeText = props.text || '';
            const safeButtonText = props.buttonText || 'Mehr erfahren';
            const safeButtonLink = props.buttonLink || '#';
            const safeImageAlt = props.imageAlt || 'Bild';
            const safeIconClass = props.iconClass || '';

            let layoutContent = '';

            // Icon Element (bedingt)
            let iconElement = '';
            if (props.iconClass) {
                iconElement = '<div style="font-family: \'Font Awesome 5 Pro\'; font-size: var(--large-text-size); color: ' + iconColor + '; margin-bottom: 1rem;">' + safeIconClass + '</div>';
            }

            // Text Content zusammenbauen
            const titleElement = '<h3 style="font-family: var(--heading-font-font-family); font-size: var(--heading-3-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: ' + titleColor + '; margin: 0 0 1rem 0;">' + safeTitle + '</h3>';
            const textElement = '<p style="font-family: var(--body-font-font-family); font-size: var(--normal-text-size); line-height: var(--body-font-line-height); color: ' + textColor + '; margin: 0 0 2rem 0;">' + safeText + '</p>';
            const buttonElement = '<a href="' + safeButtonLink + '" style="font-family: var(--button-font-family); font-weight: var(--button-font-weight); background: ' + buttonBgColor + '; color: ' + buttonTextColor + '; padding: 0.75rem 1.5rem; border-radius: 6px; text-decoration: none; display: inline-block;">' + safeButtonText + '</a>';

            const textContent = iconElement + titleElement + textElement + buttonElement;

            // Image Content (bedingt)
            let imageContent = '';
            if (props.imageUrl) {
                imageContent = '<img src="{{imageUrl}}" alt="' + safeImageAlt + '" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(6,58,168,0.1);">';
            } else {
                imageContent = '<div style="width: 100%; height: 300px; background: linear-gradient(135deg, #f8f9fa, #e9ecef); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #6c757d; font-size: 1.2rem;">📸 Bild hinzufügen</div>';
            }

            // Layout-spezifischer Content
            switch (layoutType) {
                case 'image-left':
                    const gridContainer1 = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: ' + gap + '; align-items: center;">';
                    const imageDiv1 = '<div class="mobile-image-first">' + imageContent + '</div>';
                    const textDiv1 = '<div class="mobile-text-second">' + textContent + '</div>';
                    const gridEnd1 = '</div>';

                    // CSS mit String-Replace-Pattern (VS-Code-freundlich)
                    let css1Template = '<style>IMAGEFIRST { order: 1; } TEXTSECOND { order: 2; } @media (max-width: 768px) { IMAGEFIRST { order: 1 !important; } TEXTSECOND { order: 2 !important; } }</style>';
                    css1Template = css1Template.replace(/IMAGEFIRST/g, '.mobile-image-first');
                    css1Template = css1Template.replace(/TEXTSECOND/g, '.mobile-text-second');
                    const css1 = css1Template;

                    layoutContent = gridContainer1 + imageDiv1 + textDiv1 + gridEnd1 + css1;
                    break;

                case 'image-right':
                    const gridContainer2 = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: ' + gap + '; align-items: center;">';
                    const imageDiv2 = '<div class="mobile-image-first">' + imageContent + '</div>';
                    const textDiv2 = '<div class="mobile-text-second">' + textContent + '</div>';
                    const gridEnd2 = '</div>';

                    // CSS mit String-Replace-Pattern (VS-Code-freundlich)
                    let css2Template = '<style>IMAGEFIRST { order: 2; } TEXTSECOND { order: 1; } @media (max-width: 768px) { IMAGEFIRST { order: 1 !important; } TEXTSECOND { order: 2 !important; } }</style>';
                    css2Template = css2Template.replace(/IMAGEFIRST/g, '.mobile-image-first');
                    css2Template = css2Template.replace(/TEXTSECOND/g, '.mobile-text-second');
                    const css2 = css2Template;

                    layoutContent = gridContainer2 + imageDiv2 + textDiv2 + gridEnd2 + css2;
                    break;

                case 'image-top':
                    const centerContainer1 = '<div style="text-align: center;">';
                    const imageSection1 = '<div style="margin-bottom: ' + contentGap + ';">' + imageContent + '</div>';
                    const textSection1 = '<div>' + textContent + '</div>';
                    const centerEnd1 = '</div>';

                    layoutContent = centerContainer1 + imageSection1 + textSection1 + centerEnd1;
                    break;

                case 'image-bottom':
                    const centerContainer2 = '<div style="text-align: center;">';
                    const textSection2 = '<div style="margin-bottom: ' + contentGap + ';">' + textContent + '</div>';
                    const imageSection2 = '<div>' + imageContent + '</div>';
                    const centerEnd2 = '</div>';

                    layoutContent = centerContainer2 + textSection2 + imageSection2 + centerEnd2;
                    break;

                default:
                    const defaultContainer = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: ' + contentGap + '; align-items: center;">';
                    const defaultImageDiv = '<div>' + imageContent + '</div>';
                    const defaultTextDiv = '<div>' + textContent + '</div>';
                    const defaultEnd = '</div>';

                    layoutContent = defaultContainer + defaultImageDiv + defaultTextDiv + defaultEnd;
            }

            return html.replace('{{layoutContent}}', layoutContent);
        }

        // ===== VOLLSTÄNDIG KORRIGIERTE processUniversalModule FUNKTION =====
        // Ersetze die gesamte processUniversalModule() Funktion mit diesem Code

        function processUniversalModule(module, html) {
            console.log('🔍 Template-ID:', module.templateId, 'für Modul:', module.name);

            // === NEUE PIPELINE: Universelle Properties + Type-Mappings ===
            if (window.processUniversalProperties) {
                module.properties = window.processUniversalProperties(module.properties);
                console.log('✅ Universelle Properties verarbeitet');
            }
            
            if (window.resolveTypeMappings) {
                module.properties = window.resolveTypeMappings(module);
                console.log('✅ Type-Mappings resolved');
            }
            
            // Rekursions-Schutz
            if (module._processing) {
                console.warn('⚠️ Rekursion erkannt für Modul:', module.name);
                return html || '<div>Rekursionsfehler verhindert</div>';
            }
            
            module._processing = true;
            
            try {
                // Basis-Validierung
                if (!module || typeof module !== 'object') {
                    console.error('❌ Ungültiges Modul-Objekt');
                    return '<div style="color: red;">Ungültiges Modul</div>';
                }
                
                if (!module.properties) {
                    module.properties = {};
                    console.warn('⚠️ Properties ergänzt für:', module.name);
                }
                
                // HTML-Quelle bestimmen
                let processedHtml = html;
                if (!processedHtml || typeof processedHtml !== 'string' || processedHtml.trim() === '') {
                    const template = MODULE_TEMPLATES.find(t => t && t.id === module.templateId);
                    if (template && template.html) {
                        processedHtml = template.html;
                        console.log('✅ HTML aus Template wiederhergestellt für:', module.name);
                    } else {
                        console.error('❌ Template nicht gefunden:', module.templateId);
                        return `<div style="padding: 2rem; background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;">
                            ❌ Template nicht gefunden: ${module.templateId}<br>
                            <small>Modul: ${module.name}</small>
                        </div>`;
                    }
                }
                
                const props = module.properties;
                
                // ===== 1. SPEZIFISCHE MODUL-VERARBEITUNG (VOLLSTÄNDIGE LISTE) =====
                console.log('🔧 Starte spezifische Verarbeitung für:', module.templateId);
                
                // === HERO MODULE ===
                if (module.templateId === 'kerberos-hero-advanced-richtext') {
                    if (typeof processKerberosHeroAdvancedRichtext === 'function') {
                        processedHtml = processKerberosHeroAdvancedRichtext(module, processedHtml);
                        console.log('✅ processKerberosHeroAdvancedRichtext ausgeführt');
                    }
                } 
                else if (module.templateId === 'kerberos-hero-advanced') {
                    if (typeof processKerberosHeroAdvanced === 'function') {
                        processedHtml = processKerberosHeroAdvanced(module, processedHtml);
                        console.log('✅ processKerberosHeroAdvanced ausgeführt');
                    }
                }
                else if (module.templateId === 'kerberos-svg-hero') {
                    if (typeof processKerberosSvgHero === 'function') {
                        processedHtml = processKerberosSvgHero(module, processedHtml);
                        console.log('✅ processKerberosSvgHero ausgeführt');
                    }
                }
                else if (module.templateId === 'kerberos-api-hero-with-text') {
                    if (typeof processKerberosApiHeroWithText === 'function') {
                        processedHtml = processKerberosApiHeroWithText(module, processedHtml);
                        console.log('✅ processKerberosApiHeroWithText ausgeführt');
                    }
                }
                
                // === GUIDE & INTERACTIVE MODULE ===
                else if (module.templateId === 'kerberos-guide-flow') {
                    if (typeof processKerberosGuideFlow === 'function') {
                        processedHtml = processKerberosGuideFlow(module, processedHtml);
                        console.log('✅ processKerberosGuideFlow ausgeführt');
                    }
                }
                else if (module.templateId === 'kerberos-pricing-interactive') {
                    if (typeof processKerberosPricingInteractive === 'function') {
                        processedHtml = processKerberosPricingInteractive(module, processedHtml);
                        console.log('✅ processKerberosPricingInteractive ausgeführt');
                    }
                }
                else if (module.templateId === 'kerberos-pricing-responsive-extended') {
                    if (typeof processKerberosPricingResponseExtended === 'function') {
                        processedHtml = processKerberosPricingResponseExtended(module, processedHtml);
                        console.log('✅ processKerberosPricingResponseExtended ausgeführt');
                    }
                }
                
                // === SOLUTION & PROCESS MODULE ===
                else if (module.templateId === 'kerberos-solution-triple-richtext') {
                    if (typeof processKerberosTripleSolution === 'function') {
                        processedHtml = processKerberosTripleSolution(module, processedHtml);
                        console.log('✅ processKerberosTripleSolution ausgeführt');
                    }
                    // SPEZIELLE BEHANDLUNG: Challenge-Solution Auto-Hide
                    if (typeof processChallengeSolutionAutoHide === 'function') {
                        processedHtml = processChallengeSolutionAutoHide(module, processedHtml);
                        console.log('✅ processChallengeSolutionAutoHide ausgeführt');
                    }
                }
                else if (module.templateId === 'kerberos-solutions-overview') {
                    if (typeof processKerberosSolutionsOverview === 'function') {
                        processedHtml = processKerberosSolutionsOverview(module, processedHtml);
                        console.log('✅ processKerberosSolutionsOverview ausgeführt');
                    }
                }
                
                // === PRODUCT MODULE ===
                else if (module.templateId === 'kerberos-product-showcase') {
                    if (typeof processKerberosProductShowcase === 'function') {
                        processedHtml = processKerberosProductShowcase(module, processedHtml);
                        console.log('✅ processKerberosProductShowcase ausgeführt');
                    }
                }
                else if (module.templateId === 'kerberos-product-overview') {
                    if (typeof processKerberosProductOverview === 'function') {
                        processedHtml = processKerberosProductOverview(module, processedHtml);
                        console.log('✅ processKerberosProductOverview ausgeführt');
                    }
                }
                else if (module.templateId === 'kerberos-product-fade-overview') {
                    if (typeof processKerberosProductFadeOverview === 'function') {
                        processedHtml = processKerberosProductFadeOverview(module, processedHtml);
                        console.log('✅ processKerberosProductFadeOverview ausgeführt');
                    }
                }
                
                // === FEATURE & COMPARISON MODULE ===
                else if (module.templateId === 'kerberos-feature-breaker') {
                    if (typeof processKerberosFeatureBreaker === 'function') {
                        processedHtml = processKerberosFeatureBreaker(module, processedHtml);
                        console.log('✅ processKerberosFeatureBreaker ausgeführt');
                    }
                }
                else if (module.templateId === 'kerberos-feature-comparison-extended') {
                    if (typeof processKerberosFeatureComparisonExtended === 'function') {
                        processedHtml = processKerberosFeatureComparisonExtended(module, processedHtml);
                        console.log('✅ processKerberosFeatureComparisonExtended ausgeführt');
                    }
                }

                // === TIMELINE MODULE ===
                else if (module.templateId === 'kerberos-process-timeline-fixed' || module.templateId === 'kerberos-process-timeline') {
                    if (typeof processKerberosTimeline === 'function') {
                        processedHtml = processKerberosTimeline(module, processedHtml);
                        console.log('✅ processKerberosTimeline ausgeführt');
                    }
                }
                
                // === FAQ & CONTENT MODULE ===
                else if (module.templateId === 'kerberos-faq-accordion') {
                    if (typeof processKerberosFaqAccordion === 'function') {
                        processedHtml = processKerberosFaqAccordion(module, processedHtml);
                        console.log('✅ processKerberosFaqAccordion ausgeführt');
                    }
                    // FALLBACK: Verwende allgemeine FAQ Funktion
                    else if (typeof processKerberosFAQ === 'function') {
                        processedHtml = processKerberosFAQ(module, processedHtml);
                        console.log('✅ processKerberosFAQ ausgeführt (Fallback)');
                    }
                }
                else if (module.templateId === 'kerberos-newsletter-modern') {
                    if (typeof processKerberosNewsletterModern === 'function') {
                        processedHtml = processKerberosNewsletterModern(module, processedHtml);
                        console.log('✅ processKerberosNewsletterModern ausgeführt');
                    }
                }
                
                // === STATS & NUMBERS MODULE ===
                else if (module.templateId === 'kerberos-stats') {
                    if (typeof processStatsModule === 'function') {
                        processedHtml = processStatsModule(module, processedHtml);
                        console.log('✅ processStatsModule ausgeführt');
                    }
                }
                else if (module.templateId === 'kerberos-stats-with-hover') {
                    if (typeof processKerberosStatsWithHover === 'function') {
                        processedHtml = processKerberosStatsWithHover(module, processedHtml);
                        console.log('✅ processKerberosStatsWithHover ausgeführt');
                    }
                    // FALLBACK: Verwende allgemeine Stats Funktion
                    else if (typeof processKerberosStats === 'function') {
                        processedHtml = processKerberosStats(module, processedHtml);
                        console.log('✅ processKerberosStats ausgeführt (Fallback für stats-with-hover)');
                    }
                }
                else if (module.templateId === 'kerberos-warning-facts') {
                    if (typeof processKerberosWarningFacts === 'function') {
                        processedHtml = processKerberosWarningFacts(module, processedHtml);
                        console.log('✅ processKerberosWarningFacts ausgeführt');
                    }
                }
                
                // === TEAM & ABOUT MODULE ===
                else if (module.templateId === 'kerberos-team-gallery') {
                    if (typeof processKerberosTeamGallery === 'function') {
                        processedHtml = processKerberosTeamGallery(module, processedHtml);
                        console.log('✅ processKerberosTeamGallery ausgeführt');
                    }
                    // FALLBACK: Verwende allgemeine Team Gallery Funktion
                    else if (typeof processTeamGalleryModule === 'function') {
                        processedHtml = processTeamGalleryModule(module, processedHtml);
                        console.log('✅ processTeamGalleryModule ausgeführt (Fallback)');
                    }
                }
                else if (module.templateId === 'kerberos-team-gallery-fixed') {
                    if (typeof processKerberosTeamGalleryFixed === 'function') {
                        processedHtml = processKerberosTeamGalleryFixed(module, processedHtml);
                        console.log('✅ processKerberosTeamGalleryFixed ausgeführt');
                    }
                }
                else if (module.templateId === 'kerberos-testimonials-carousel') {
                    if (typeof processTestimonialsCarousel === 'function') {
                        processedHtml = processTestimonialsCarousel(module, processedHtml);
                        console.log('✅ processTestimonialsCarousel ausgeführt');
                    }
                }
                else if (module.templateId === 'kerberos-testimonials-carousel-extended') {
                    if (typeof processKerberosTestimonialsCarouselExtended === 'function') {
                        processedHtml = processKerberosTestimonialsCarouselExtended(module, processedHtml);
                        console.log('✅ processKerberosTestimonialsCarouselExtended ausgeführt');
                    }
                    // FALLBACK: Verwende Standard Testimonials Carousel 
                    else if (typeof processTestimonialsCarousel === 'function') {
                        processedHtml = processTestimonialsCarousel(module, processedHtml);
                        console.log('✅ processTestimonialsCarousel ausgeführt (Fallback)');
                    }
                }
                else if (module.templateId === 'kerberos-testimonials-pro') {
                    if (typeof processKerberosTestimonialsPro === 'function') {
                        processedHtml = processKerberosTestimonialsPro(module, processedHtml);
                        console.log('✅ processKerberosTestimonialsPro ausgeführt');
                    }
                }
                else if (module.templateId === 'kerberos-company-presentation') {
                    if (typeof processKerberosCompanyPresentation === 'function') {
                        processedHtml = processKerberosCompanyPresentation(module, processedHtml);
                        console.log('✅ processKerberosCompanyPresentation ausgeführt');
                    }
                }
                
                // === DASHBOARD & SHOWCASE MODULE ===
                else if (module.templateId === 'kerberos-dashboard-showcase') {
                    if (typeof processKerberosDashboard === 'function') {
                        processedHtml = processKerberosDashboard(module, processedHtml);
                        console.log('✅ processKerberosDashboard ausgeführt');
                    }
                }
                else if (module.templateId === 'kerberos-compliance-dashboard') {
                    if (typeof processKerberosComplianceDashboard === 'function') {
                        processedHtml = processKerberosComplianceDashboard(module, processedHtml);
                        console.log('✅ processKerberosComplianceDashboard ausgeführt');
                    }
                }
                
                // === BENEFITS & CTA MODULE ===
                else if (module.templateId === 'kerberos-benefits') {
                    if (typeof processKerberosBenefits === 'function') {
                        processedHtml = processKerberosBenefits(module, processedHtml);
                        console.log('✅ processKerberosBenefits ausgeführt');
                    }
                }
               
                // === TECHNOLOGY & API MODULE ===
                else if (module.templateId === 'kerberos-api-endpoints') {
                    if (typeof processKerberosApiEndpoints === 'function') {
                        processedHtml = processKerberosApiEndpoints(module, processedHtml);
                        console.log('✅ processKerberosApiEndpoints ausgeführt');
                    }
                }
                else if (module.templateId === 'kerberos-api-documentation') {
                    if (typeof processKerberosApiDocumentation === 'function') {
                        processedHtml = processKerberosApiDocumentation(module, processedHtml);
                        console.log('✅ processKerberosApiDocumentation ausgeführt');
                    }
                }
                
                // === GRID & FEATURES MODULE ===
                else if (module.templateId === 'kerberos-integrations-grid-fixed' || module.templateId === 'kerberos-integrations-grid-modern') {
                    if (typeof processKerberosIntegrationsGridModern === 'function') {
                        processedHtml = processKerberosIntegrationsGridModern(module, processedHtml);
                        console.log('✅ processKerberosIntegrationsGridModern ausgeführt');
                    }
                }
                else if (module.templateId === 'kerberos-integrations-grid') {
                    if (typeof processKerberosIntegrationsGrid === 'function') {
                        processedHtml = processKerberosIntegrationsGrid(module, processedHtml);
                        console.log('✅ processKerberosIntegrationsGrid ausgeführt');
                    }
                }
                else if (module.templateId === 'kerberos-features-grid') {
                    if (typeof processKerberosFeaturesGrid === 'function') {
                        processedHtml = processKerberosFeaturesGrid(module, processedHtml);
                        console.log('✅ processKerberosFeaturesGrid ausgeführt');
                    }
                }
                else if (module.templateId === 'kerberos-features-modern') {
                    if (typeof processKerberosFeaturesModern === 'function') {
                        processedHtml = processKerberosFeaturesModern(module, processedHtml);
                        console.log('✅ processKerberosFeaturesModern ausgeführt');
                    }
                }
                
                // === TEXT & CONTENT MODULE ===
                else if (module.templateId === 'kerberos-text-button-richtext') {
                    if (typeof processKerberosTextButtonRichtext === 'function') {
                        processedHtml = processKerberosTextButtonRichtext(module, processedHtml);
                        console.log('✅ processKerberosTextButtonRichtext ausgeführt');
                    }
                }
                else if (module.templateId === 'kerberos-image-text-modern') {
                    if (typeof processKerberosImageTextModern === 'function') {
                        processedHtml = processKerberosImageTextModern(module, processedHtml);
                        console.log('✅ processKerberosImageTextModern ausgeführt');
                    }
                }
                
                // === IMPORTIERTE MODULE ===
                else if (module.name && module.name.includes('Importiert')) {
                    if (typeof processImportedKerberosModule === 'function') {
                        processedHtml = processImportedKerberosModule(module, processedHtml);
                        console.log('✅ processImportedKerberosModule ausgeführt');
                    }
                }

                else if (module.templateId === 'kerberos-image-text') {
                    if (typeof processKerberosImageText === 'function') {
                        processedHtml = processKerberosImageText(module, processedHtml);
                        console.log('✅ processKerberosImageText ausgeführt');
                    }
                }
                else if (module.templateId === 'kerberos-cta-modern') {
                    if (typeof processKerberosCtaModern === 'function') {
                        processedHtml = processKerberosCtaModern(module, processedHtml);
                        console.log('✅ processKerberosCtaModern ausgeführt');
                    }
                }
                else if (module.templateId === 'kerberos-testimonials-carousel') {
                    if (typeof processKerberosTestimonialsCarousel === 'function') {
                        processedHtml = processKerberosTestimonialsCarousel(module, processedHtml);
                        console.log('✅ processKerberosTestimonialsCarousel ausgeführt');
                    }
                }
                else if (module.templateId === 'kerberos-solution-triple-richtext') {
                    if (typeof processKerberosTripleSolution === 'function') {
                        processedHtml = processKerberosTripleSolution(module, processedHtml);
                        console.log('✅ processKerberosTripleSolution ausgeführt (via Alias)');
                    }
                }
                
                // === FALLBACK FÜR UNBEKANNTE TEMPLATES ===
                else {
                    console.log('ℹ️ Kein spezifischer Processor für:', module.templateId);
                }
                
                // ===== 2. UNIVERSELLE LAYOUT-VERARBEITUNG =====
                if (processedHtml.includes('{{layoutContent}}')) {
                    if (typeof processUniversalLayout === 'function') {
                        processedHtml = processUniversalLayout(module, processedHtml);
                        console.log('✅ processUniversalLayout ausgeführt');
                    }
                }

                // ===== 3. UNIVERSELLE VERARBEITUNGSSTUFEN =====
                // Legacy Image Optimization
                if (processedHtml.includes('<img src="{{imageUrl}}"') && !processedHtml.includes('{{responsiveImageElement}}')) {
                    if (typeof processLegacyImageOptimization === 'function') {
                        processedHtml = processLegacyImageOptimization(module, processedHtml);
                        console.log('✅ processLegacyImageOptimization ausgeführt');
                    }
                }
                
                // ===== 4. TYPE-MAPPINGS VERARBEITUNG (KRITISCH FÜR BUTTONS!) =====
                try {
                    if (typeof processUniversalTypeMappings === 'function') {
                        processedHtml = processUniversalTypeMappings(processedHtml, props);
                        console.log('✅ processUniversalTypeMappings ausgeführt');
                    
                        // ===== SPEZIELLE CTA-MODERN BUTTON-KORREKTUR =====
                        if (module.templateId === 'kerberos-cta-modern') {
                            // Primary Button
                            if (props.primaryButtonStyleType) {
                                const primaryStyles = getUniversalButtonStyles({
                                    buttonStyleType: props.primaryButtonStyleType,
                                    buttonPaddingType: props.primaryButtonPaddingType,
                                    buttonRadiusType: props.primaryButtonRadiusType,
                                    buttonShadowType: props.primaryButtonShadowType
                                    // ✅ Keine expliziten Farben - lass den Style-Type entscheiden!
                                });
                                processedHtml = processedHtml.replace(/\{\{primaryButtonBackground\}\}/g, primaryStyles.background);
                                processedHtml = processedHtml.replace(/\{\{primaryButtonTextColor\}\}/g, primaryStyles.color);
                            }
                            
                            // Secondary Button
                            if (props.secondaryButtonStyleType) {
                                const secondaryStyles = getUniversalButtonStyles({
                                    buttonStyleType: props.secondaryButtonStyleType,
                                    buttonPaddingType: props.secondaryButtonPaddingType,
                                    buttonRadiusType: props.secondaryButtonRadiusType,
                                    buttonShadowType: props.secondaryButtonShadowType,
                                    buttonBackground: props.secondaryButtonBackground,
                                    buttonColor: props.secondaryButtonTextColor
                                });
                                processedHtml = processedHtml.replace(/\{\{secondaryButtonBackground\}\}/g, secondaryStyles.background);
                                processedHtml = processedHtml.replace(/\{\{secondaryButtonTextColor\}\}/g, secondaryStyles.color);
                            }
                            console.log('✅ CTA-Modern Button-Styles korrigiert');
                        }
                    } else if (typeof processTypeMappingsFallback === 'function') {
                        console.log('⚠️ processUniversalTypeMappings nicht gefunden - verwende Fallback');
                        processedHtml = processTypeMappingsFallback(processedHtml, props);
                        console.log('✅ processTypeMappingsFallback ausgeführt');
                    } else {
                        console.error('❌ Beide Type-Mapping-Funktionen fehlen!');
                    }
                } catch (error) {
                    console.error('❌ Fehler bei Type-Mappings:', error);
                    // Weitermachen ohne Type-Mappings
                }

                // ===== 5. UNIVERSELLE BILD-OPTIMIERUNG =====
                if (typeof universalImageOptimization === 'function') {
                    processedHtml = universalImageOptimization(module, processedHtml);
                    console.log('✅ universalImageOptimization ausgeführt');
                }
                
                if (typeof enhanceExistingImages === 'function') {
                    processedHtml = enhanceExistingImages(processedHtml);
                    console.log('✅ enhanceExistingImages ausgeführt');
                }
                
                if (typeof processUniversalImageProperties === 'function') {
                    processedHtml = processUniversalImageProperties(module, processedHtml);
                    console.log('✅ processUniversalImageProperties ausgeführt');
                }
                
                // ===== 6. MODULE-ID ERSETZUNG =====
                if (module.templateId !== 'kerberos-guide-flow') { // Guide-Flow macht es selbst
                    processedHtml = processedHtml.replace(/\{\{moduleId\}\}/g, module.id);
                    processedHtml = processedHtml.replace(/\{\{templateId\}\}/g, module.templateId);
                }
                
                // ===== 7. STANDARD PROPERTY-ERSETZUNG =====
                // Spezielle Platzhalter für Module-spezifische Verarbeitung ausschließen
                const excludedPlaceholders = [
                    'solutionBoxes', 'challengeBoxes', 'requirementBoxes',
                    'testimonialSlides', 'featureRows', 'planBoxes', 
                    'statsBoxes', 'statsContent', 'galleryItems', 'teamMembers'
                ];

                Object.keys(props).forEach(key => {
                    // Überspringe spezielle Platzhalter
                    if (excludedPlaceholders.includes(key)) {
                        console.log('🔄 Platzhalter übersprungen für spezifische Verarbeitung:', key);
                        return;
                    }
                    
                    const value = props[key] || '';
                    const placeholder = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
                    const safeValue = String(value)
                        .replace(/'/g, "&#39;")
                        .replace(/"/g, "&quot;");
                    processedHtml = processedHtml.replace(placeholder, safeValue);
                });
                
                // ===== 8. BUTTON-KLASSEN FÜR HOVER-EFFEKTE =====
                processedHtml = processedHtml.replace(
                    /(<a[^>]*style="[^"]*background:[^"]*"[^>]*>)/g,
                    (match) => {
                        if (match.includes('kerberos-btn') || match.includes('display: inline-flex') ||
                            match.includes('padding:') || match.includes('border-radius:')) {
                            return match.replace('<a', `<a class="kerberos-btn kerberos-btn-${module.id}"`);
                        }
                        return match;
                    }
                );
                
                // ===== 9. HOVER-EFFEKTE EINBETTEN =====
                try {
                    if (typeof embedHoverEffectsCSS === 'function') {
                        processedHtml = embedHoverEffectsCSS(module, processedHtml);
                        console.log('✅ embedHoverEffectsCSS ausgeführt');
                    } else {
                        console.warn('⚠️ embedHoverEffectsCSS Funktion nicht gefunden');
                    }
                } catch (error) {
                    console.error('❌ Fehler bei Hover-Effekten:', error);
                    // Weitermachen ohne Hover-Effekte
                }

                // ===== 10. UNIVERSELLE TEMPLATE-PLATZHALTER ERSETZUNG =====
                processedHtml = processUniversalPlaceholders(processedHtml, props);
                console.log('✅ Universelle Platzhalter ersetzt');
                
                // ===== 10.5. ERWEITERTE PROPERTY-ERSETZUNG (ALLE ÜBRIGEN) =====
                // Ersetze ALLE Properties aus module.properties, die noch nicht ersetzt wurden
                Object.entries(props).forEach(([key, value]) => {
                    const placeholder = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
                    
                    // Nur ersetzen wenn Platzhalter noch vorhanden ist
                    if (processedHtml.includes(`{{${key}}}`)) {
                        const safeValue = value !== null && value !== undefined ? 
                            String(value).replace(/'/g, "&#39;").replace(/"/g, "&quot;") : '';
                        processedHtml = processedHtml.replace(placeholder, safeValue);
                    }
                });
                console.log('✅ Erweiterte Property-Ersetzung abgeschlossen');

                // ===== 11. LINK-TARGET PROCESSING =====
                if (props.linkTarget && props.linkTarget !== 'same-tab') {
                    processedHtml = processedHtml.replace(/<a\s+([^>]*?)href="([^"]*?)"([^>]*?)/g, 
                        `<a $1href="$2" target="_blank" rel="noopener noreferrer"$3`);
                }
                
                // ===== 11.5. UNIVERSELLE HOVER-CSS EINFÜGEN =====
                const hoverCSS = generateUniversalHoverCSS(module);
                if (hoverCSS) {
                    // CSS am Anfang der Section einfügen
                    processedHtml = processedHtml.replace('<section', hoverCSS + '\n<section');
                    console.log('✅ Universelle Hover-CSS eingefügt für:', module.id);
                }

                // ===== 12. FINAL VALIDATION =====
                // Prüfung auf übrige Platzhalter
                const remainingPlaceholders = processedHtml.match(/\{\{[^}]+\}\}/g);
                if (remainingPlaceholders && remainingPlaceholders.length > 0) {
                    console.warn('⚠️ Übrige Platzhalter gefunden:', remainingPlaceholders);
                    // Entferne übrige Platzhalter
                    processedHtml = processedHtml.replace(/\{\{[^}]*\}\}/g, '');
                }
                
                console.log('✅ processUniversalModule erfolgreich für:', module.name);
                return processedHtml;
                
            } catch (error) {
                console.error('❌ Fehler in processUniversalModule:', error);
                return `<div style="padding: 2rem; background: #fee; color: #900;">
                    Verarbeitungsfehler: ${error.message}
                    <br><small>Modul: ${module.name}</small>
                </div>`;
            } finally {
                // Rekursions-Schutz zurücksetzen
                delete module._processing;
            }
        }


        // UNIVERSELLE TEMPLATE-PLATZHALTER VERARBEITUNG (KORRIGIERT)
        function processUniversalPlaceholders(html, properties) {
            // Standard Properties ersetzen (NUR wenn sie noch nicht ersetzt wurden)
            Object.keys(properties).forEach(key => {
                if (!key.endsWith('Type')) { // Type-Properties bereits verarbeitet
                    const placeholder = `{{${key}}}`;
                    if (html.includes(placeholder)) {
                        const regex = new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g');
                        const value = properties[key] || '';
                        html = html.replace(regex, value);
                    }
                }
            });
            
            // Spezielle Platzhalter für häufig verwendete aber leere Templates (NUR wenn noch vorhanden)
            const commonPlaceholders = {
                '{{teamMembers}}': '<div style="text-align: center; color: #6c757d; padding: 2rem;">Team-Mitglieder können im Property Panel konfiguriert werden</div>',
                '{{endpointCards}}': '<div style="text-align: center; color: #6c757d; padding: 2rem;">API-Endpunkte können im Property Panel konfiguriert werden</div>',
                '{{testimonialSlides}}': '<div style="text-align: center; color: #6c757d; padding: 1rem;">Testimonials können im Property Panel konfiguriert werden</div>',
                '{{navigationDots}}': '',
                '{{currentSlide}}': '1',
                '{{totalSlides}}': '1',
                '{{benefitItems}}': '<div style="text-align: center; color: #6c757d; padding: 1rem;">Benefits können im Property Panel konfiguriert werden</div>',
                '{{solutionPoints}}': '<div style="text-align: center; color: #6c757d; padding: 1rem;">Lösungspunkte können im Property Panel konfiguriert werden</div>',
                '{{secondaryButtonIcon}}': '', // Oft leer gelassen
                '{{buttonIcon}}': '' // Oft leer gelassen
            };
            
            Object.keys(commonPlaceholders).forEach(placeholder => {
                if (html.includes(placeholder)) {
                    html = html.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), commonPlaceholders[placeholder]);
                }
            });
            
            return html;
        }

        // VOLLSTÄNDIG KORRIGIERTE processTypeMappingsFallback Funktion
        function processTypeMappingsFallback(html, properties) {
            console.log('🔄 processTypeMappingsFallback - nutzt TYPE_MAPPINGS');
            
            // Validierung
            if (!html || typeof html !== 'string') {
                console.warn('⚠️ processTypeMappingsFallback: Ungültiges HTML');
                return html || '';
            }
            
            if (!properties || typeof properties !== 'object') {
                console.warn('⚠️ processTypeMappingsFallback: Ungültige Properties');
                return html;
            }
            
            // Nutze den neuen Type-Resolver
            const testModule = { properties: {...properties} };
            const resolved = window.resolveTypeMappings ? 
                window.resolveTypeMappings(testModule) : 
                properties;
            
            // Ersetze alle Properties im HTML
            Object.entries(resolved).forEach(([key, value]) => {
                const placeholder = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
                html = html.replace(placeholder, value || '');
            });
            
            return html;
        }

        // Process-Funktion für automatisch importierte Kerberos Module
        function processImportedKerberosModule(module, html) {
            const props = module.properties;
            
            // Sichere Fallback-Werte
            const title = props.title || 'Importiertes Modul';
            const titleColor = props.titleColor || '#063AA8';
            const text = props.text || 'Automatisch aus Squarespace importiert';
            const textColor = props.textColor || '#212529';
            const buttonText = props.buttonText || 'Mehr erfahren';
            const buttonLink = props.buttonLink || '#';
            const buttonBgColor = props.buttonBgColor || '#063AA8';
            const buttonTextColor = props.buttonTextColor || '#FFFFFF';
            const backgroundColor = props.backgroundColor || '#FFFFFF';
            const sectionSpacing = props.sectionSpacing || '6rem 0';
            
            // Einfache Template-Verarbeitung
            html = html.replace(/\{\{title\}\}/g, title);
            html = html.replace(/\{\{titleColor\}\}/g, titleColor);
            html = html.replace(/\{\{text\}\}/g, text);
            html = html.replace(/\{\{textColor\}\}/g, textColor);
            html = html.replace(/\{\{buttonText\}\}/g, buttonText);
            html = html.replace(/\{\{buttonLink\}\}/g, buttonLink);
            html = html.replace(/\{\{buttonBgColor\}\}/g, buttonBgColor);
            html = html.replace(/\{\{buttonTextColor\}\}/g, buttonTextColor);
            html = html.replace(/\{\{backgroundColor\}\}/g, backgroundColor);
            html = html.replace(/\{\{sectionSpacing\}\}/g, sectionSpacing);
            
            return html;
        }

        // Universelle Layout-Verarbeitung für alle Bild+Text-Kombinationen
        function processUniversalLayout(module, html) {
            const props = module.properties;
            const layoutType = props.layoutType || props.layout || 'image-left';

            // Content-Blöcke intelligend erkennen
            const hasImage = props.imageUrl || html.includes('{{imageUrl}}');
            const hasIcon = props.iconClass || html.includes('{{iconClass}}');
            const hasButton = props.buttonText || html.includes('{{buttonText}}');

            // Fallback-Werte für alle Properties definieren (Schritt 2)
            const buttonHoverColor = props.buttonHoverColor || '#FFFFFF';
            const buttonHoverBg = props.buttonHoverBg || 'rgba(6,58,168,0.8)';
            const buttonHoverTransform = props.buttonHoverTransform || 'translateY(-2px)';
            const buttonHoverShadow = props.buttonHoverShadow || '0 8px 24px rgba(6,58,168,0.25)';
            // KRITISCHE DISPLAY-PROPERTIES (FEHLENDE BUTTON-ANZEIGE-REPARATUR)
            if (!props.showButton) props.showButton = (props.buttonText && props.buttonText.trim()) ? 'inline-flex' : 'none';
            if (!props.showButtonIcon) props.showButtonIcon = (props.buttonIcon && props.buttonIcon.trim()) ? 'inline' : 'none';
            if (!props.showSecondaryButton) props.showSecondaryButton = (props.secondaryButtonText && props.secondaryButtonText.trim()) ? 'inline-flex' : 'none';

            // BUTTON-PROPERTY-NORMALISIERUNG (Inkonsistente Namen reparieren)
            if (props.buttonBg && !props.buttonBgColor) props.buttonBgColor = props.buttonBg;
            if (props.buttonColor && !props.buttonTextColor) props.buttonTextColor = props.buttonColor;
            if (props.buttonBgColor && !props.buttonBg) props.buttonBg = props.buttonBgColor;
            if (props.buttonTextColor && !props.buttonColor) props.buttonColor = props.buttonTextColor;
            const iconSpacing = props.iconSpacing || '1rem';
            const iconSize = props.iconSize || '2rem';
            const iconColor = props.iconColor || '#063AA8';
            const iconContainerSize = props.iconContainerSize || '60px';
            const iconBackground = props.iconBackground || 'rgba(6,58,168,0.1)';
            const iconRadius = props.iconRadius || '50%';
            const iconClass = props.iconClass || '&#xf132;';
            // Icon-Validation hinzufügen
            const validIcon = iconClass.startsWith('&#x') ? iconClass : '&#xf132;';
            const titleColor = props.titleColor || '#063AA8';
            const titleSpacing = props.titleSpacing || '1rem';
            const title = props.title || 'Titel';
            const textColor = props.textColor || '#6c757d';
            const textSpacing = props.textSpacing || '2rem';
            const text = props.text || 'Text';
            const buttonLink = props.buttonLink || '#';
            const buttonBgColor = props.buttonBgColor || '#063AA8';
            const buttonTextColor = props.buttonTextColor || '#FFFFFF';
            const buttonPadding = props.buttonPadding || '0.75rem 1.5rem';
            const buttonRadius = props.buttonRadius || '6px';
            const buttonShadow = props.buttonShadow || '0 4px 12px rgba(6,58,168,0.2)';
            const buttonText = props.buttonText || 'Button';
            const buttonIcon = props.buttonIcon || '';
            const imageRadius = props.imageRadius || '8px';
            const imageShadow = props.imageShadow || '0 4px 12px rgba(6,58,168,0.1)';
            const imageUrl = props.imageUrl || '';
            const imageAlt = props.imageAlt || 'Bild';
            const imageHeight = props.imageHeight || 'auto';
            const imageObjectFit = props.imageObjectFit || 'cover';
            const imageObjectPosition = props.imageObjectPosition || 'center';
            const imageCustomCSS = props.imageCustomCSS || '';
            const contentGap = props.contentGap || '4rem';

            // Hover-Effekt Properties hinzufügen (falls nicht vorhanden)
            if (!props.buttonHoverColor) props.buttonHoverColor = buttonHoverColor;
            if (!props.buttonHoverBg) props.buttonHoverBg = buttonHoverBg;
            if (!props.buttonHoverTransform) props.buttonHoverTransform = buttonHoverTransform;
            if (!props.buttonHoverShadow) props.buttonHoverShadow = buttonHoverShadow;

            // HTML in separate Variablen aufteilen (Schritt 3)
            let iconElement = '';
            if (hasIcon) {
                const iconStyleStart = '<div style="margin-bottom: ' + iconSpacing + ';">';
                const iconContainerStart = '<div style="font-family: \'Font Awesome 5 Pro\'; font-size: ' + iconSize + '; color: ' + iconColor + '; display: inline-flex; align-items: center; justify-content: center; width: ' + iconContainerSize + '; height: ' + iconContainerSize + '; background: ' + iconBackground + '; border-radius: ' + iconRadius + ';">';
                const iconContainerEnd = '</div>';
                const iconStyleEnd = '</div>';
                iconElement = iconStyleStart + iconContainerStart + iconClass + iconContainerEnd + iconStyleEnd;
            }

            // Text Content erstellen
            const titleStart = '<h3 style="font-family: var(--heading-font-font-family); font-size: var(--heading-3-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: ' + titleColor + '; margin: 0 0 ' + titleSpacing + ' 0;">';
            const titleEnd = '</h3>';
            const titleElement = titleStart + title + titleEnd;

            const textStart = '<p style="font-family: var(--body-font-font-family); font-size: var(--normal-text-size); line-height: var(--body-font-line-height); color: ' + textColor + '; margin: 0 0 ' + textSpacing + ' 0;">';
            const textEnd = '</p>';
            const textElement = textStart + text + textEnd;

            let buttonElement = '';
            if (hasButton) {
                const buttonStart = '<a href="' + buttonLink + '" class="kerberos-btn kerberos-btn-' + module.id + '" style="font-family: var(--button-font-family); font-weight: var(--button-font-weight); background: ' + buttonBgColor + '; color: ' + buttonTextColor + '; padding: ' + buttonPadding + '; border-radius: ' + buttonRadius + '; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: ' + buttonShadow + '; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);">';
                const buttonIconSpan = buttonIcon ? '<span style="font-family: \'Font Awesome 5 Pro\';">' + buttonIcon + '</span>' : '';
                const buttonEnd = '</a>';
                buttonElement = buttonStart + buttonText + buttonIconSpan + buttonEnd;
            }

            const textContent = iconElement + titleElement + textElement + buttonElement;

            // Image Content erstellen
            let imageContent = '';
            if (hasImage) {
                if (imageUrl) {
                    // Template-Platzhalter-Strategie: Komplette Templates ohne CSS-Syntax
                    let containerTemplate = '<div data-style="CONTAINERSTYLES">';
                    let imageTemplate = '<img src="IMAGEURL" alt="IMAGEALT" data-style="IMAGESTYLES">';
                    let closeTemplate = '</div>';

                    // CSS-Strings separat zusammenbauen
                    const containerStyles = [
                        'position: relative',
                        'overflow: hidden',
                        'border-radius: ' + imageRadius,
                        'box-shadow: ' + imageShadow
                    ].join('; ');

                    const imageStyles = [
                        'width: 100%',
                        'height: ' + imageHeight,
                        'object-fit: ' + imageObjectFit,
                        'object-position: ' + imageObjectPosition,
                        'display: block',
                        'margin: 0',
                        'line-height: 0'
                    ].join('; ');

                    const finalImageStyles = imageCustomCSS ? imageStyles + '; ' + imageCustomCSS : imageStyles;

                    // Templates in echte HTML umwandeln
                    containerTemplate = containerTemplate.replace('data-style="CONTAINERSTYLES"', 'style="' + containerStyles + '"');
                    // URL optimieren falls Squarespace
                    const optimizedImageUrl = imageUrl && imageUrl.includes('images.squarespace-cdn.com')
                        ? imageUrl + (imageUrl.includes('?') ? '&' : '?') + 'format=1500w'
                        : imageUrl;

                    imageTemplate = imageTemplate.replace('IMAGEURL', optimizedImageUrl);
                    imageTemplate = imageTemplate.replace('IMAGEALT', imageAlt);
                    imageTemplate = imageTemplate.replace('data-style="IMAGESTYLES"', 'style="' + finalImageStyles + '"');

                    imageContent = containerTemplate + imageTemplate + closeTemplate;
                } else {
                    // Placeholder mit Template-Strategie
                    let placeholderTemplate = '<div data-style="PLACEHOLDERSTYLES">📸 Bild hinzufügen</div>';

                    const placeholderStyles = [
                        'width: 100%',
                        'height: 300px',
                        'background: linear-gradient(135deg, #f8f9fa, #e9ecef)',
                        'border-radius: ' + imageRadius,
                        'display: flex',
                        'align-items: center',
                        'justify-content: center',
                        'color: #6c757d',
                        'font-size: 1.2rem',
                        'margin: 0'
                    ].join('; ');

                    placeholderTemplate = placeholderTemplate.replace('data-style="PLACEHOLDERSTYLES"', 'style="' + placeholderStyles + '"');
                    imageContent = placeholderTemplate;
                }
            }

            // Layout-Logik (String-Konkatenation verwenden - Schritt 4)
            let layoutContent = '';

            if (!hasImage) {
                // Nur Text (zentriert)
                const containerStart = '<div style="text-align: center; max-width: 800px; margin: 0 auto;">';
                const containerEnd = '</div>';
                layoutContent = containerStart + textContent + containerEnd;
            } else {
                // Bild + Text Kombinationen
                switch (layoutType) {
                    case 'image-left':
                        const gridStartLeft = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: ' + contentGap + '; align-items: center;">';
                        const imageWrapperLeft = '<div>' + imageContent + '</div>';
                        const textWrapperLeft = '<div>' + textContent + '</div>';
                        const gridEndLeft = '</div>';
                        layoutContent = gridStartLeft + imageWrapperLeft + textWrapperLeft + gridEndLeft;
                        break;

                    case 'image-right':
                        const gridStartRight = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: ' + contentGap + '; align-items: center;">';
                        const imageWrapperRight = '<div style="order: 2; @media (max-width: 768px) { order: 1; }">' + imageContent + '</div>';
                        const textWrapperRight = '<div style="order: 1; @media (max-width: 768px) { order: 2; }">' + textContent + '</div>';
                        const gridEndRight = '</div>';
                        layoutContent = gridStartRight + imageWrapperRight + textWrapperRight + gridEndRight;
                        break;

                    case 'image-top':
                        const containerStartTop = '<div style="text-align: center; max-width: 800px; margin: 0 auto;">';
                        const imageWrapperTop = '<div style="margin-bottom: ' + contentGap + ';">' + imageContent + '</div>';
                        const textWrapperTop = '<div>' + textContent + '</div>';
                        const containerEndTop = '</div>';
                        layoutContent = containerStartTop + imageWrapperTop + textWrapperTop + containerEndTop;
                        break;

                    case 'image-bottom':
                        const containerStartBottom = '<div style="text-align: center; max-width: 800px; margin: 0 auto;">';
                        const textWrapperBottom = '<div style="margin-bottom: ' + contentGap + ';">' + textContent + '</div>';
                        const imageWrapperBottom = '<div>' + imageContent + '</div>';
                        const containerEndBottom = '</div>';
                        layoutContent = containerStartBottom + textWrapperBottom + imageWrapperBottom + containerEndBottom;
                        break;

                    default:
                        const gridStartDefault = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: ' + contentGap + '; align-items: center;">';
                        const imageWrapperDefault = '<div>' + imageContent + '</div>';
                        const textWrapperDefault = '<div>' + textContent + '</div>';
                        const gridEndDefault = '</div>';
                        layoutContent = gridStartDefault + imageWrapperDefault + textWrapperDefault + gridEndDefault;
                }
            }

            return html.replace('{{layoutContent}}', layoutContent);
        }

        // Erweiterte processKerberosApiEndpoints Funktion (MIT UNIVERSELLEN BUTTONS)
        function processKerberosApiEndpoints(module, html) {
            const props = module.properties;

            // === UNIVERSELLE BUTTON-STYLES ===
            const buttonStyles = getUniversalButtonStyles({
                buttonStyleType: props.buttonStyleType || 'primary',
                buttonPaddingType: props.buttonPaddingType || 'medium',
                buttonRadiusType: props.buttonRadiusType || 'medium',
                buttonBackground: props.buttonBackground,
                buttonColor: props.buttonColor
            });

            // Ersetze templateId im CSS
            html = html.replace(/\{\{templateId\}\}/g, module.id);

            // Method/Status Sichtbarkeit
            const showMethods = props.showMethods === 'true';
            const showStatus = props.showStatus === 'true';
            const showPaths = props.showPaths === 'true';

            let endpointCards = '';

            // Generiere Endpoint-Cards
            for (let i = 1; i <= 4; i++) {
                const isActive = props[`endpoint${i}Active`] === 'true';

                if (isActive) {
                    const method = props[`endpoint${i}Method`] || 'GET';
                    const path = props[`endpoint${i}Path`] || '/api/endpoint';
                    const title = props[`endpoint${i}Title`] || 'API Endpoint';
                    const description = props[`endpoint${i}Description`] || 'Beschreibung';
                    const status = props[`endpoint${i}Status`] || '200 OK';
                    const statusColor = props[`endpoint${i}StatusColor`] || '#28A745';

                    // Badge-HTML erstellen
                    let badgeHtml = '';
                    if (showMethods || showStatus) {
                        badgeHtml = '<div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">';

                        if (showMethods) {
                            badgeHtml += `<span style="background: ${props.primaryColor}; color: white; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.8rem; font-weight: 700;">${method}</span>`;
                        }

                        if (showStatus) {
                            badgeHtml += `<span style="background: ${statusColor}; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.7rem; font-weight: 700;">${status}</span>`;
                        }

                        badgeHtml += '</div>';
                    }

                    endpointCards += `
                    <div class="api-endpoint-card" style="background: ${props.cardBackground}; border: 1px solid ${props.cardBorder}; border-radius: 8px; padding: 1.5rem; transition: all 0.3s ease; cursor: default;">
                        ${badgeHtml}
                        <h4 style="font-family: var(--heading-font-font-family); color: ${props.textColor}; margin: 0 0 0.5rem 0; font-size: 1.1rem;">${title}</h4>
                        ${showPaths ? `<p style="font-family: 'Monaco', 'Consolas', monospace; color: ${props.primaryColor}; font-size: 0.9rem; margin: 0 0 1rem 0;">${path}</p>` : ''}
                        <p style="font-family: var(--body-font-font-family); color: ${props.textColor}; font-size: 0.9rem; margin: 0; opacity: 0.8;">${description}</p>
                    </div>`;
                }
            }

            // Ersetze Endpoint-Cards
            html = html.replace('{{endpointCards}}', endpointCards);

            // === BUTTON-TEMPLATE-ERSETZUNGEN (UNIVERSELL) ===
            html = html.replace('{{primaryColor}}', buttonStyles.background);
            html = html.replace(/color: white/g, `color: ${buttonStyles.color}`);
            html = html.replace('{{buttonPaddingType}}', buttonStyles.padding);
            html = html.replace('{{buttonRadiusType}}', buttonStyles.borderRadius);
            html = html.replace('{{buttonTextColor}}', buttonStyles.color);

            // Standard Property-Ersetzung (ohne Button-Properties, die schon ersetzt wurden)
            return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
                // Skip bereits ersetzte Button-Properties
                if (key === 'primaryColor' || key === 'buttonPaddingType' || key === 'buttonRadiusType') {
                    return match;
                }
                return props[key] || match;
            });
        }

        function processKerberosCompanyPresentation(module, html) {
            const props = module.properties;

            // Rechte Seite: Bild oder Shape
            let rightSideContent = '';

            if (props.imageUrl && props.imageUrl.trim() !== '') {
                // Template mit Fake-Attribut für Bild
                let imageTemplate = '<div data-container-styles="CONTAINERSTYLES"><img data-img-styles="IMAGESTYLES" alt="ALT_TEXT"></div>';

                // CSS separat in Arrays zusammenbauen
                const containerStyles = [
                    'position: relative',
                    'height: 300px',
                    'border-radius: 4px',
                    'overflow: hidden'
                ].join('; ');

                const imageStyles = [
                    'width: 100%',
                    'height: 100%',
                    'object-fit: cover',
                    'object-position: center'
                ].join('; ');

                // Template füllen
                imageTemplate = imageTemplate.replace('ALT_TEXT', props.imageAlt || 'Company Image');
                imageTemplate = imageTemplate.replace('data-container-styles="CONTAINERSTYLES"', 'style="' + containerStyles + '"');
                const responsiveImageUrl = props.imageUrl && props.imageUrl.includes('images.squarespace-cdn.com')
                    ? props.imageUrl + (props.imageUrl.includes('?') ? '&' : '?') + 'format=1500w'
                    : props.imageUrl;
                imageTemplate = imageTemplate.replace('data-img-styles="IMAGESTYLES"', 'src="' + responsiveImageUrl + '" style="' + imageStyles + '"');

                rightSideContent = imageTemplate;
            } else {
                // Template mit Fake-Attribut für Shape
                let shapeTemplate = '<div data-shape-styles="SHAPESTYLES"></div>';

                // CSS separat zusammenbauen
                const shapeStyles = [
                    'background: ' + props.shapeColor,
                    'border-radius: 4px',
                    'height: 300px',
                    'position: relative'
                ].join('; ');

                // Replace-Operation
                shapeTemplate = shapeTemplate.replace('data-shape-styles="SHAPESTYLES"', 'style="' + shapeStyles + '"');

                rightSideContent = shapeTemplate;
            }

            // Ersetze den Platzhalter
            html = html.replace('{{rightSideContent}}', rightSideContent);

            return html;
        }

        function processKerberosBenefits(module, html) {
            const props = module.properties;
            const showIcons = props.showIcons === 'true';
            let benefitItems = '';

            // BUGFIX: Grid-Columns korrekt verarbeiten
            const gridColumns = props.gridColumns || '4';
            let benefitMinWidth;
            
            if (gridColumns === 'auto-fit') {
                benefitMinWidth = '250px';
            } else {
                // Berechne Min-Width basierend auf Spaltenanzahl
                const columnCount = parseInt(gridColumns);
                switch(columnCount) {
                    case 2: benefitMinWidth = '400px'; break;
                    case 3: benefitMinWidth = '300px'; break;
                    case 4: benefitMinWidth = '250px'; break;
                    case 5: benefitMinWidth = '200px'; break;
                    case 6: benefitMinWidth = '180px'; break;
                    default: benefitMinWidth = '250px';
                }
            }

            for (let i = 1; i <= 6; i++) {
                const title = props['benefit' + i + 'Title'];
                const description = props['benefit' + i + 'Description'];
                const icon = props['benefit' + i + 'Icon'];
                const iconColor = props['benefit' + i + 'IconColor'];
                const titleColor = props['benefit' + i + 'TitleColor'];
                const descriptionColor = props['benefit' + i + 'DescriptionColor'];
                const isActive = props['benefit' + i + 'Active'] === 'true';

                if (title && description && isActive) {
                    // Card-Styles zusammenbauen
                    const cardStyles = [
                        'background: ' + props.cardBackground,
                        'border: 1px solid ' + props.cardBorder,
                        'border-radius: ' + props.cardRadius,
                        'padding: ' + props.cardPadding,
                        'text-align: center',
                        'transition: all 0.3s ease',
                        'cursor: default',
                        'box-shadow: ' + props.cardShadow
                    ].join('; ');

                    // Title-Styles zusammenbauen
                    const titleStyles = [
                        'font-family: var(--heading-font-font-family)',
                        'font-size: ' + props.titleSize,
                        'font-weight: var(--heading-font-font-weight)',
                        'color: ' + titleColor,
                        'margin: 0 0 ' + props.titleSpacing + ' 0'
                    ].join('; ');

                    // Description-Styles zusammenbauen
                    const descStyles = [
                        'font-family: var(--body-font-font-family)',
                        'font-size: ' + props.descriptionSize,
                        'line-height: var(--body-font-line-height)',
                        'color: ' + descriptionColor,
                        'margin: 0'
                    ].join('; ');

                    // Icon-Element separat erstellen wenn benötigt
                    let iconElement = '';
                    if (showIcons && icon) {
                        const iconStyles = [
                            'font-family: \'Font Awesome 5 Pro\'',
                            'font-size: ' + props.iconSize,
                            'color: ' + iconColor,
                            'margin-bottom: ' + props.iconSpacing,
                            'text-align: center'
                        ].join('; ');

                        iconElement = `<div style="${iconStyles}">${icon}</div>`;
                    }

                    // Card zusammenbauen
                    let cardTemplate = `<div class="kerberos-benefit-card" style="${cardStyles}">
                        ${iconElement}
                        <h3 style="${titleStyles}">${title}</h3>
                        <p style="${descStyles}">${description}</p>
                    </div>`;

                    benefitItems += cardTemplate;
                }
            }

            // BUGFIX: CSS für Hover-Effekte und Responsive Design hinzufügen
            const hoverCSS = `
            <style>
                /* Benefits Module - Universelle Hover-Effekte */
                .kerberos-benefit-card {
                    transition: all 0.3s ease !important;
                    cursor: default !important;
                }
                
                .kerberos-benefit-card:hover {
                    transform: translateY(-4px) !important;
                    box-shadow: 0 8px 24px rgba(6,58,168,0.15) !important;
                    background: rgba(6,58,168,0.05) !important;
                }
                
                /* Mobile Responsive */
                @media (max-width: 768px) {
                    section[style*="grid-template-columns"] > div > div:last-child {
                        grid-template-columns: 1fr !important;
                        gap: 1.5rem !important;
                    }
                }
                
                @media (max-width: 480px) {
                    section[style*="grid-template-columns"] > div > div:last-child {
                        grid-template-columns: 1fr !important;
                        gap: 1rem !important;
                    }
                }
            </style>`;
            // RichText-Support für Title
            if (props.title && props.title.includes('<')) {
                // Wenn title HTML enthält, extrahiere nur den Text-Inhalt für feste Templates
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = props.title;
                const cleanTitle = tempDiv.textContent || tempDiv.innerText || props.title;
                html = html.replace('{{title}}', cleanTitle);
            } else {
                // Standard-Ersetzung für normalen Text
                html = html.replace('{{title}}', props.title || '');
            }

            // Template-Platzhalter ersetzen
            html = html.replace('{{benefitItems}}', benefitItems);
            html = html.replace('{{benefitMinWidth}}', benefitMinWidth);
            
            // CSS am Anfang hinzufügen
            html = hoverCSS + html;

            return html;
        } 

        // REPARIERTE FUNKTION: Spezielle Gruppierung für Challenge-Solution Module
        function groupChallengeSolutionProperties(properties) {
            const groups = {
                content: [],
                styling: [],
                settings: []
            };

            Object.entries(properties).forEach(([key, value]) => {
                if (shouldHideProperty(key)) return;

                // CONTENT: Alle Texte, Inhalte UND ICONS
                if (key === 'mainTitle' || key === 'subtitle' ||
                    key.startsWith('challenge') || key.startsWith('requirement') ||
                    key.startsWith('solution') || key.includes('cta') || key.includes('Cta') ||
                    key.includes('Icon')) { // ← NEUE Icon-Erkennung hinzugefügt
                    groups.content.push([key, value]);
                }
                // STYLING: Alle Farben und Design-Eigenschaften
                else if (key.includes('Color') || key.includes('Background') ||
                    key.includes('Shadow') || key.includes('Radius') ||
                    key.includes('Border') || key.includes('Gradient')) {
                    groups.styling.push([key, value]);
                }
                // SETTINGS: Sichtbarkeit und Layout-Einstellungen
                else if (key.includes('show') || key.includes('Show') ||
                    key.includes('Auto') || key.includes('Spacing') ||
                    key.includes('Display') || key.includes('Active')) {
                    groups.settings.push([key, value]);
                }
                // FALLBACK zu Content
                else {
                    groups.content.push([key, value]);
                }
            });

            // Leere Gruppen entfernen
            Object.keys(groups).forEach(key => {
                if (groups[key].length === 0) {
                    delete groups[key];
                }
            });

            return groups;
        }

        // Hero-Module Process-Funktion (ERWEITERT MIT ICON FIX & GRADIENT SYSTEM)
        function processKerberosHeroAdvanced(module, html) {
            console.log('🎯 Processing Hero Advanced (VOLLSTÄNDIG V3):', module.id);
            
            const props = module.properties || {};
            
            // === GRADIENT SYSTEM ===
            const gradientMap = {
                'kerberos-primary': 'linear-gradient(135deg, #063AA8, #009CE6)',
                'kerberos-secondary': 'linear-gradient(135deg, #B265E9, #EF8646)',
                'kerberos-dark': 'linear-gradient(135deg, #212529, #495057)',
                'kerberos-light': 'linear-gradient(135deg, #F8F9FA, #E9ECEF)',
                'blue-ocean': 'linear-gradient(135deg, #0066CC, #00CCFF)',
                'purple-sunset': 'linear-gradient(135deg, #667eea, #764ba2)',
                'orange-fire': 'linear-gradient(135deg, #f093fb, #f5576c)',
                'green-nature': 'linear-gradient(135deg, #4facfe, #00f2fe)',
                'dark-night': 'linear-gradient(135deg, #2c3e50, #3498db)',
                'custom': props.backgroundColor || '#063AA8'
            };
            
            // === BACKGROUND SYSTEM ===
            const backgroundType = props.backgroundType || 'gradient';
            const backgroundImage = props.backgroundImage || '';
            const backgroundGradientType = props.backgroundGradientType || 'kerberos-primary';
            
            // In processKerberosHeroAdvanced
            const responsiveBackground = props.backgroundImage ? 
                `background-image: url('${props.backgroundImage}'); background-size: cover; background-position: center; background-repeat: no-repeat;` : 
                `background: ${props.backgroundColor || 'linear-gradient(135deg, #063AA8, #009CE6)'};`;

            html = html.replace('{{responsiveBackground}}', responsiveBackground);
            
            // === ICON SYSTEM (FIX FÜR ANZEIGE) ===
            const iconClass = props.iconClass || '';
            const iconColor = props.iconColor || '#FFFFFF';
            const iconSizeMap = {
                'small': '1.25rem',
                'medium': '1.75rem', 
                'large': '2.5rem',
                'extra-large': '4rem'
            };
            const actualIconSize = iconSizeMap[props.iconSizeType] || '2.5rem';
            const iconSpacing = props.iconSpacing || '1.5rem';
            
            // Icon-Container nur anzeigen wenn Icon vorhanden
            let iconElement = '';
            if (iconClass && iconClass.trim() !== '') {
                iconElement = `<div style="font-family: 'Font Awesome 5 Pro'; font-size: ${actualIconSize}; color: ${iconColor}; margin-bottom: ${iconSpacing};">${iconClass}</div>`;
                console.log('🎯 Icon aktiviert:', iconClass);
            } else {
                console.log('❌ Kein Icon - Platz wird entfernt');
            }
            
            // === OVERLAY SYSTEM ===
            const overlayActive = props.overlayActive === 'true';
            const blueOverlayActive = props.blueOverlayActive === 'true';
            
            const overlayOpacityMap = {
                'none': '0', 'light': '0.2', 'medium': '0.4', 
                'strong': '0.6', 'heavy': '0.8', 'full': '1'
            };
            
            let overlayElements = '';
            if (overlayActive) {
                const overlayColor = props.overlayColor || '#000000';
                const overlayOpacity = overlayOpacityMap[props.overlayOpacityType] || '0.4';
                overlayElements += `<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: ${overlayColor}; opacity: ${overlayOpacity}; z-index: 1;"></div>`;
            }
            if (blueOverlayActive) {
                const blueOverlayColor = props.blueOverlayColor || '#063AA8';
                const blueOverlayOpacity = overlayOpacityMap[props.blueOverlayOpacityType] || '0.2';
                overlayElements += `<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: ${blueOverlayColor}; opacity: ${blueOverlayOpacity}; z-index: 2;"></div>`;
            }
            
            // === BUTTON-STYLING (UNIVERSELL KORRIGIERT) ===
            const buttonStyles = getUniversalButtonStyles({
                buttonStyleType: props.buttonStyleType || 'primary',
                buttonPaddingType: props.buttonPaddingType || 'medium',
                buttonRadiusType: props.buttonRadiusType || 'medium',
                buttonBackground: props.buttonBackground,
                buttonColor: props.buttonColor
            });

            // === TEMPLATE-ERSETZUNGEN ===
            html = html.replace('{{responsiveBackground}}', responsiveBackground);
            html = html.replace('{{overlayElements}}', overlayElements);
            html = html.replace('{{iconElement}}', iconElement);
            // Universelle Button-Styles (KORRIGIERT)
            html = html.replace('{{buttonBackground}}', buttonStyles.background);
            html = html.replace('{{buttonColor}}', buttonStyles.color);
            html = html.replace('{{buttonPadding}}', buttonStyles.padding);
            html = html.replace('{{buttonRadius}}', buttonStyles.borderRadius);

            return html;
        }

        // === ERWEITERTE SVG HERO PROCESSING ===
        function processSvgHero(template, properties) {
            let html = template.html;
            
            // SVG Element Processing
            let svgElement = '';
            if (properties.svgType === 'url' && properties.svgUrl) {
                const widthMapping = getSizeOptions('svgWidth');
                const heightMapping = getSizeOptions('svgHeight');
                const width = widthMapping[properties.svgWidthType] || properties.svgWidthType;
                const height = heightMapping[properties.svgHeightType] || properties.svgHeightType;
                
                svgElement = `<img src="${properties.svgUrl}" alt="${properties.svgAlt}" class="hero-svg" style="width: ${width}; height: ${height}; opacity: ${properties.svgOpacityType}; filter: ${properties.svgFilterType};" />`;
            } else if (properties.svgType === 'code' && properties.svgCode) {
                svgElement = `<div class="hero-svg-code" style="width: ${width}; height: ${height}; opacity: ${properties.svgOpacityType}; filter: ${properties.svgFilterType}; color: ${properties.svgColor};">${properties.svgCode}</div>`;
            }
            
            html = html.replace('{{svgElement}}', svgElement);
            
            // Button Processing mit Type-Mappings
            const buttonPaddingMapping = getSpacingOptions('buttonPadding');
            const buttonRadiusMapping = getRadiusOptions();
            const buttonShadowMapping = getShadowOptions();
            
            html = html.replace('{{buttonPaddingType}}', buttonPaddingMapping[properties.buttonPaddingType] || properties.buttonPaddingType);
            html = html.replace('{{buttonRadiusType}}', buttonRadiusMapping[properties.buttonRadiusType] || properties.buttonRadiusType);
            html = html.replace('{{buttonShadowType}}', buttonShadowMapping[properties.buttonShadowType] || properties.buttonShadowType);
            
            return html;
        }

        // === ERWEITERTE FEATURES GRID PROCESSING ===
        function processFeaturesGrid(template, properties) {
            let html = template.html;
            
            // Card Styling mit Type-Mappings
            const cardRadiusMapping = getRadiusOptions();
            const cardShadowMapping = getShadowOptions();
            const cardPaddingMapping = getSpacingOptions('cardPadding');
            
            html = html.replace('{{cardRadiusType}}', cardRadiusMapping[properties.cardRadiusType] || properties.cardRadiusType);
            html = html.replace('{{cardShadowType}}', cardShadowMapping[properties.cardShadowType] || properties.cardShadowType);
            html = html.replace('{{cardPaddingType}}', cardPaddingMapping[properties.cardPaddingType] || properties.cardPaddingType);
            
            // Features Generation
            let featureCards = '';
            for (let i = 1; i <= 12; i++) {
                if (properties[`feature${i}Active`] === 'true' && properties[`feature${i}Title`]) {
                    featureCards += `
                        <div class="kerberos-feature-card" style="background: ${properties.cardBackground}; border: 1px solid ${properties.cardBorder}; border-radius: ${cardRadiusMapping[properties.cardRadiusType]}; padding: ${cardPaddingMapping[properties.cardPaddingType]}; text-align: center;">
                            <div class="feature-icon" style="font-family: 'Font Awesome 5 Pro'; font-size: 2.5rem; color: ${properties[`feature${i}Color`]}; margin-bottom: 1.5rem;">${properties[`feature${i}Icon`]}</div>
                            <h3 style="color: ${properties[`feature${i}Color`]}; margin-bottom: 1rem;">${properties[`feature${i}Title`]}</h3>
                            <p style="color: ${properties.textColor}; line-height: 1.6;">${properties[`feature${i}Description`]}</p>
                        </div>
                    `;
                }
            }
            
            html = html.replace('{{featureCards}}', featureCards);
            
            return html;
        }

          // 6. UNIVERSELLE PROCESS-FUNKTION FÜR TYPE-MAPPINGS
        function processUniversalTypeMappings(html, properties) {
            // Durchsuche alle Properties nach *Type-Endungen
            Object.keys(properties).forEach(key => {
                if (key.endsWith('Type')) {
                    const value = properties[key];
                    let mappedValue = value;
                    
                    // Ermittle Mapping basierend auf Key-Typ
                    if (key.includes('Size')) {
                        const mapping = getSizeOptions(key);
                        mappedValue = mapping[value] || value;
                    } else if (key.includes('Padding') || key.includes('Spacing')) {
                        const mapping = getSpacingOptions(key);
                        mappedValue = mapping[value] || value;
                    } else if (key.includes('Radius')) {
                        const mapping = getRadiusOptions();
                        mappedValue = mapping[value] || value;
                    } else if (key.includes('Shadow')) {
                        const mapping = getShadowOptions();
                        mappedValue = mapping[value] || value;
                    } else if (key.includes('Transform')) {
                        const mapping = getTransformOptions();
                        mappedValue = mapping[value] || value;
                    } else if (key.includes('Width') || key.includes('Height')) {
                        const mapping = getDimensionOptions(key);
                        mappedValue = mapping[value] || value;
                    } else if (key.includes('buttonStyle') || key.includes('ButtonStyle')) {
                        // Universelle Button-Verarbeitung
                        if (key.includes('secondary') || key.includes('Secondary')) {
                            // Secondary Button
                            const secondaryButtonStyles = getUniversalButtonStyles({
                                buttonStyleType: properties.secondaryButtonStyleType || 'outline',
                                buttonPaddingType: properties.secondaryButtonPaddingType || 'large',
                                buttonRadiusType: properties.secondaryButtonRadiusType || 'medium',
                                buttonShadowType: properties.secondaryButtonShadowType || 'none',
                                buttonBackground: properties.secondaryButtonBackground,
                                buttonColor: properties.secondaryButtonColor
                            });
                            html = html.replace(/\{\{secondaryButtonBackground\}\}/g, secondaryButtonStyles.background);
                            html = html.replace(/\{\{secondaryButtonColor\}\}/g, secondaryButtonStyles.color);
                            html = html.replace(/\{\{secondaryButtonPadding\}\}/g, secondaryButtonStyles.padding);
                            html = html.replace(/\{\{secondaryButtonRadius\}\}/g, secondaryButtonStyles.borderRadius);
                            html = html.replace(/\{\{secondaryButtonShadow\}\}/g, secondaryButtonStyles.boxShadow);
                            html = html.replace(/\{\{secondaryButtonBorder\}\}/g, secondaryButtonStyles.border);
                            console.log('✅ Secondary Button-Styles angewendet für:', key);
                        } else {
                            // Primary Button
                            const buttonStyles = getUniversalButtonStyles(properties);
                            html = html.replace(/\{\{buttonBackground\}\}/g, buttonStyles.background);
                            html = html.replace(/\{\{buttonColor\}\}/g, buttonStyles.color);
                            html = html.replace(/\{\{buttonPadding\}\}/g, buttonStyles.padding);
                            html = html.replace(/\{\{buttonRadius\}\}/g, buttonStyles.borderRadius);
                            html = html.replace(/\{\{buttonShadow\}\}/g, buttonStyles.boxShadow);
                            html = html.replace(/\{\{buttonBorder\}\}/g, buttonStyles.border || 'none');
                            console.log('✅ Primary Button-Styles angewendet für:', key);
                        }
                    } else if (key.includes('buttonStyle') || key.includes('ButtonStyle')) {
                        // Button-Styling über universelle Funktion verarbeiten
                        const buttonStyles = getUniversalButtonStyles(properties, 'universal');
                        // Button-Properties in HTML einsetzen
                        html = html.replace(/{{buttonBackground}}/g, buttonStyles.background);
                        html = html.replace(/{{buttonColor}}/g, buttonStyles.color);
                        html = html.replace(/{{buttonPadding}}/g, buttonStyles.padding);
                        html = html.replace(/{{buttonRadius}}/g, buttonStyles.borderRadius);
                        html = html.replace(/{{buttonShadow}}/g, buttonStyles.boxShadow);
                        html = html.replace(/{{buttonBorder}}/g, buttonStyles.border || 'none');
                        console.log('✅ Universelle Button-Styles angewendet');
                    } else if (key.includes('Alignment') || key.includes('Justify')) {
                        const mapping = getAlignmentOptions(key);
                        mappedValue = mapping[value] || value;
                    } else if (key.includes('Border')) {
                        const mapping = getBorderOptions();
                        mappedValue = mapping[value] || value;
                    } else if (key.includes('Opacity') || key.includes('Filter')) {
                        const mapping = getEffectOptions(key);
                        mappedValue = mapping[value] || value;
                    } else if (key.includes('Display')) {
                        const mapping = getDisplayOptions();
                        mappedValue = mapping[value] || value;
                    } else if (key.includes('Speed') || key.includes('Duration')) {
                        const mapping = getAnimationOptions();
                        mappedValue = mapping[value] || value;
                    } else if (key.includes('backgroundPattern') || key.includes('BackgroundPattern')) {
                        const backgroundPatternMap = {
                            'none': 'none',
                            'diagonal': 'repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 20px)',
                            'repeating-diagonal': 'repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 40px)',
                            'dots': 'radial-gradient(circle at 20px 20px, rgba(255,255,255,0.1) 2px, transparent 2px)',
                            'grid': 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                            'waves': 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                        };
                        mappedValue = backgroundPatternMap[value] || 'none';
                    } else if (key.includes('backgroundOpacity') || key.includes('BackgroundOpacity')) {
                        const backgroundOpacityMap = {
                            'none': '0',
                            'light': '0.2', 
                            'medium': '0.4',
                            'strong': '0.6',
                            'heavy': '0.8',
                            'full': '1'
                        };
                        mappedValue = backgroundOpacityMap[value] || '0.2';
                    }
                    
                    // Ersetze im HTML
                    html = html.replace(new RegExp(`{{${key}}}`, 'g'), mappedValue);
                }
            });
            
            return html;
        }

        // === ERWEITERTE TESTIMONIALS PROCESSING ===
        function processTestimonialsCarousel(template, properties) {
            let html = template.html;
            
            // Navigation Button Processing
            const navButtonSizeMapping = getSizeOptions('navButton');
            const navButtonRadiusMapping = getRadiusOptions();
            const navButtonShadowMapping = getShadowOptions();
            
            html = html.replace('{{navButtonSizeType}}', navButtonSizeMapping[properties.navButtonSizeType] || properties.navButtonSizeType);
            html = html.replace('{{navButtonRadiusType}}', navButtonRadiusMapping[properties.navButtonRadiusType] || properties.navButtonRadiusType);
            html = html.replace('{{navButtonShadowType}}', navButtonShadowMapping[properties.navButtonShadowType] || properties.navButtonShadowType);
            
            // Animation Processing
            const transitionMapping = getAnimationOptions();
            html = html.replace('{{transitionSpeedType}}', transitionMapping[properties.transitionSpeedType] || properties.transitionSpeedType);
            
            // Testimonial Slides Generation
            let testimonialSlides = '';
            for (let i = 1; i <= 15; i++) {
                if (properties[`testimonial${i}Active`] === 'true' && properties[`testimonial${i}Text`]) {
                    testimonialSlides += `
                        <div class="testimonial-slide" style="flex: 0 0 100%; padding: 0 1rem;">
                            <div class="testimonial-content" style="background: white; padding: 2rem; border-radius: 12px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                                <div class="testimonial-rating" style="margin-bottom: 1rem;">
                                    ${'★'.repeat(parseInt(properties[`testimonial${i}Rating`]) || 5)}
                                </div>
                                <p style="font-style: italic; margin-bottom: 2rem; font-size: 1.1rem; line-height: 1.6;">"${properties[`testimonial${i}Text`]}"</p>
                                <div class="testimonial-author">
                                    <div style="font-weight: 600; color: #063AA8;">${properties[`testimonial${i}Author`]}</div>
                                    <div style="font-size: 0.9rem; color: #6c757d;">${properties[`testimonial${i}Position`]}</div>
                                    <div style="font-size: 0.85rem; color: #6c757d;">${properties[`testimonial${i}Company`]}</div>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }
            
            html = html.replace('{{testimonialSlides}}', testimonialSlides);
            
            return html;
        }
        
        // Legacy-Bild-Optimierung für ältere Module
        function processLegacyImageOptimization(module, html) {
            const props = module.properties;

            // Suche nach allen img-Tags mit {{imageUrl}}
            const imgRegex = /<img([^>]*src="{{imageUrl}}"[^>]*)>/g;
            let match;

            while ((match = imgRegex.exec(html)) !== null) {
                const originalImg = match[0];
                const attributes = match[1];

                // Alt-Text extrahieren
                const altMatch = attributes.match(/alt="([^"]*)"/) || attributes.match(/alt="{{([^}]*)}}"/) || ['', 'Bild'];
                const altText = altMatch[1] === 'imageAlt' ? (props.imageAlt || '') : altMatch[1];

                // Style-Attribute extrahieren  
                const styleMatch = attributes.match(/style="([^"]*)"/) || ['', ''];
                const originalStyle = styleMatch[1];

                if (props.imageUrl) {
                    // Responsive Image erstellen
                    const responsiveImg = createResponsiveImage(
                        props.imageUrl,
                        altText,
                        '',
                        '(max-width: 768px) 100vw, 50vw'
                    );

                    // Original Styles beibehalten
                    const optimizedImg = responsiveImg.replace(
                        'style="width: 100%; height: auto; object-fit: cover;"',
                        originalStyle ? `style="${originalStyle}"` : 'style="width: 100%; height: auto; object-fit: cover;"'
                    );

                    html = html.replace(originalImg, optimizedImg);
                } else {
                    // Fallback: Platzhalter entfernen
                    html = html.replace(originalImg, '');
                }
            }

            return html;
        }

        // Universelle Bild-Verarbeitung für ALLE Module
        function processUniversalImageProperties(module, html) {
            // ROBUSTE SICHERHEITSPRÜFUNGEN
            if (!module || typeof module !== 'object') {
                console.warn('processUniversalImageProperties: Ungültiges Modul-Objekt');
                return html || '<div>Fehler: Ungültiges Modul</div>';
            }
            
            if (!module.properties || typeof module.properties !== 'object') {
                console.warn('processUniversalImageProperties: Keine Properties für Modul', module.name || module.id);
                return html || '<div>Fehler: Keine Properties</div>';
            }
            
            if (!html || typeof html !== 'string' || html.trim() === '') {
                console.warn('processUniversalImageProperties: Ungültiger HTML-String für Modul', module.name || module.id);
                // KEIN processUniversalModule Aufruf - das führt zur Rekursion!
                // Stattdessen: Sauberer Fallback ohne weitere Verarbeitung
                const template = MODULE_TEMPLATES.find(t => t.id === module.templateId);
                if (template && template.html) {
                    html = template.html;
                    console.log('✅ HTML aus Template wiederhergestellt (ohne Rekursion)');
                    
                    // EINFACHE Platzhalter-Ersetzung ohne processUniversalModule
                    Object.keys(module.properties || {}).forEach(key => {
                        const value = module.properties[key] || '';
                        const placeholder = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
                        html = html.replace(placeholder, value);
                    });
                } else {
                    console.error('❌ Template nicht gefunden für:', module.templateId);
                    return '<div style="padding: 2rem; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; color: #721c24;">❌ Template nicht gefunden: ' + (module.templateId || 'unbekannt') + '</div>';
                }
            }
            
            const props = module.properties;
            
            try {
                // REST DER FUNKTION BLEIBT GLEICH...
                Object.keys(props).forEach(key => {
                    const propValue = props[key];
                    
                    if ((key.toLowerCase().includes('image') || key.toLowerCase().includes('url')) && 
                        propValue && 
                        typeof propValue === 'string' && 
                        propValue.trim() !== '') {
                        
                        const baseKey = key.replace('Url', '').replace('Image', '').replace('image', '');
                        
                        const objectFit = props[`${baseKey}ObjectFit`] || 'cover';
                        const objectPosition = props[`${baseKey}ObjectPosition`] || 'center';
                        const height = props[`${baseKey}Height`] || 'auto';
                        const customCSS = props[`${baseKey}CustomCSS`] || '';
                        
                        const imgStyle = `width: 100%; height: ${height}; object-fit: ${objectFit}; object-position: ${objectPosition}; display: block; margin: 0; line-height: 0; ${customCSS}`;
                        
                        const escapedUrl = propValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        
                        try {
                            const styleRegex = new RegExp(`(<img[^>]*src="${escapedUrl}"[^>]*?)style="[^"]*"([^>]*>)`, 'g');
                            html = html.replace(styleRegex, `$1style="${imgStyle}"$2`);
                            
                            const noStyleRegex = new RegExp(`(<img[^>]*src="${escapedUrl}"[^>]*?)(?!.*style=)([^>]*>)`, 'g');
                            html = html.replace(noStyleRegex, `$1 style="${imgStyle}"$2`);
                        } catch (regexError) {
                            console.warn('Regex error für URL:', propValue, regexError);
                        }
                        
                        try {
                            html = html.replace(new RegExp(`{{${key}}}`, 'g'), propValue);
                        } catch (placeholderError) {
                            console.warn('Placeholder error für key:', key, placeholderError);
                        }
                    }
                });
            } catch (error) {
                console.error('Fehler in processUniversalImageProperties:', error);
                return html;
            }
            
            return html;
        }

        // Image-Text-Modern Process-Funktion - VOLLSTÄNDIG REPARIERT
        function processKerberosImageTextModern(module, html) {
            const props = module.properties;

            if (props.imageUrl) {
                const responsiveImg = createResponsiveImage(
                    props.imageUrl,
                    props.imageAlt || 'Bild',
                    '',
                    '(max-width: 768px) 100vw, 50vw'
                );

                // Automatische Style-Generierung basierend auf Properties
                const autoHeight = props.imageHeight || 'auto';
                const autoObjectFit = props.imageObjectFit || 'cover';
                const autoObjectPosition = props.imageObjectPosition || 'center';
                const customCSS = props.imageCustomCSS || '';

                const finalStyle = `width: 100%; height: ${autoHeight}; object-fit: ${autoObjectFit}; object-position: ${autoObjectPosition}; display: block; margin: 0; line-height: 0; ${customCSS}`;

                const finalImg = responsiveImg.replace(
                    'style="width: 100%; height: auto; object-fit: cover;"',
                    `style="${finalStyle}"`
                );

                html = html.replace('{{responsiveImageElement}}', finalImg);
            } else {
                // Platzhalter für leeres Bild
                html = html.replace('{{responsiveImageElement}}', '<div style="width: 100%; height: 300px; background: #f8f9fa; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #6c757d; font-size: 1.2rem;">📸 Bild hinzufügen</div>');
            }

            return html;
        }

        function processKerberosGuideFlow(module, html) {
            const props = module.properties;
            const moduleId = module.id;

            // === CHARACTER-CODES für 100% VS-Code-Sicherheit ===
            const colon = String.fromCharCode(58);        // ":"
            const semicolon = String.fromCharCode(59);    // ";"
            const quote = String.fromCharCode(34);        // '"'
            const openBracket = String.fromCharCode(60);  // "<"
            const closeBracket = String.fromCharCode(62); // ">"
            const slash = String.fromCharCode(47);        // "/"
            const equals = String.fromCharCode(61);       // "="
            const percent = String.fromCharCode(37);      // "%"

            // HTML-Tags als Character-Codes
            const scriptTag = String.fromCharCode(115, 99, 114, 105, 112, 116);
            const styleTag = String.fromCharCode(115, 116, 121, 108, 101);
            const styleAttr = String.fromCharCode(115, 116, 121, 108, 101);
            const divTag = String.fromCharCode(100, 105, 118);

            // CSS-Properties als Character-Arrays
            const position = String.fromCharCode(112, 111, 115, 105, 116, 105, 111, 110);
            const background = String.fromCharCode(98, 97, 99, 107, 103, 114, 111, 117, 110, 100);
            const width = String.fromCharCode(119, 105, 100, 116, 104);
            const height = String.fromCharCode(104, 101, 105, 103, 104, 116);
            const color = String.fromCharCode(99, 111, 108, 111, 114);
            const display = String.fromCharCode(100, 105, 115, 112, 108, 97, 121);
            const margin = String.fromCharCode(109, 97, 114, 103, 105, 110);
            const padding = String.fromCharCode(112, 97, 100, 100, 105, 110, 103);
            const border = String.fromCharCode(98, 111, 114, 100, 101, 114);
            const opacity = String.fromCharCode(111, 112, 97, 99, 105, 116, 121);
            const transform = String.fromCharCode(116, 114, 97, 110, 115, 102, 111, 114, 109);
            const transition = String.fromCharCode(116, 114, 97, 110, 115, 105, 116, 105, 111, 110);
            const zIndex = String.fromCharCode(122, 45, 105, 110, 100, 101, 120);

            // CSS-Werte als Character-Arrays
            const absolute = String.fromCharCode(97, 98, 115, 111, 108, 117, 116, 101);
            const relative = String.fromCharCode(114, 101, 108, 97, 116, 105, 118, 101);
            const fixed = String.fromCharCode(102, 105, 120, 101, 100);
            const flex = String.fromCharCode(102, 108, 101, 120);
            const center = String.fromCharCode(99, 101, 110, 116, 101, 114);
            const white = String.fromCharCode(119, 104, 105, 116, 101);
            const pointer = String.fromCharCode(112, 111, 105, 110, 116, 101, 114);
            const hidden = String.fromCharCode(104, 105, 100, 100, 101, 110);
            const visible = String.fromCharCode(118, 105, 115, 105, 98, 108, 101);
            const none = String.fromCharCode(110, 111, 110, 101);
            const block = String.fromCharCode(98, 108, 111, 99, 107);

            // Helper-Funktionen
            function createStyleAttribute(cssText) {
                return styleAttr + equals + quote + cssText + quote;
            }

            function buildCSSProperty(property, value) {
                return property + colon + ' ' + value;
            }

            function buildCSSText(properties) {
                const parts = [];
                for (let i = 0; i < properties.length; i++) {
                    parts.push(properties[i]);
                    if (i < properties.length - 1) {
                        parts.push(semicolon + ' ');
                    }
                }
                return parts.join('');
            }

            // === CONTENT BUILDING ===

            // Color Variables
            const primaryColor = props.primaryColor || '#063AA8';
            const secondaryColor = props.secondaryColor || '#009CE6';
            const titleColor = props.titleColor || primaryColor;
            const subtitleColor = props.subtitleColor || '#6c757d';

            // Bildabmessungen basierend auf Gerätetyp
            let imageWidth = '100%';
            let imageHeight = '400px';
            let containerMaxWidth = '800px';

            const deviceType = props.deviceType || 'desktop';
            switch (deviceType) {
                case 'smartphone':
                    imageWidth = '375px';
                    imageHeight = '667px';
                    containerMaxWidth = '400px';
                    break;
                case 'tablet':
                    imageWidth = '768px';
                    imageHeight = '1024px';
                    containerMaxWidth = '800px';
                    break;
                case 'laptop':
                    imageWidth = '1440px';
                    imageHeight = '900px';
                    containerMaxWidth = '1000px';
                    break;
                case 'desktop':
                default:
                    imageWidth = '100%';
                    imageHeight = props.customHeight || '400px';
                    containerMaxWidth = props.customWidth || '800px';
                    break;
                case 'custom':
                    imageWidth = props.customWidth || '800px';
                    imageHeight = props.customHeight || '400px';
                    containerMaxWidth = props.customWidth || '800px';
                    break;
            }

            // Header Content (Mit DIREKTEN INLINE-STYLES für Icons)
            let headerContent = '';
            if (props.showHeader !== 'false') {
                if (props.showStepsBadge !== 'false' && props.stepsActive) {
                    const badgeIcon = props.stepsIcon || '&#xf04b;'; // Unicode für fa-play
                    headerContent += '<div data-style="BADGE_STYLES">' +
                        '<span style="font-family: \'Font Awesome 5 Pro\'; margin-right: 0.5rem;">' + badgeIcon + '</span>' +
                        (props.stepsActive || 5) + ' Schritte' +
                        '</div>';
                }

                if (props.title) {
                    headerContent += '<h2 data-style="TITLE_STYLES">' + (props.title || 'Produkttour') + '</h2>';
                }
                if (props.subtitle) {
                    headerContent += '<p data-style="SUBTITLE_STYLES">' + (props.subtitle || 'Entdecken Sie alle Funktionen') + '</p>';
                }
            }

            // Guide Steps Building mit DIREKTEN INLINE-STYLES für Hotspot-Icons
            let stepsContent = '';
            let overlayContent = '';
            let maxSteps = parseInt(props.stepsActive) || 5;

            for (let i = 1; i <= maxSteps; i++) {
                let stepImage = props['step' + i + 'Image'] || '';
                let stepTitle = props['step' + i + 'Title'] || 'Schritt ' + i;
                let stepDescription = props['step' + i + 'Description'] || 'Beschreibung für Schritt ' + i;
                let stepIcon = props['step' + i + 'Icon'] || '&#xf135;'; // Unicode statt fa-class

                stepsContent += '<div class="guide-step" data-step="' + i + '" data-style="GUIDE_STEP_STYLES">' +
                    '<img src="' + stepImage + '" alt="' + stepTitle + '" data-style="STEP_IMAGE_STYLES">' +
                    '<div class="hotspot" data-step="' + i + '" data-style="HOTSPOT_' + i + '_STYLES">' +
                    '<div class="hotspot-btn" data-step="' + i + '" data-style="HOTSPOT_BTN_STYLES">' +
                    '<span style="font-family: \'Font Awesome 5 Pro\'; color: white; font-size: 1rem;">' + stepIcon + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }

            // Overlay-System mit DIREKTEN INLINE-STYLES für Navigation-Icons
            overlayContent = '<div class="guide-overlay" id="guide-overlay-' + moduleId + '" data-style="OVERLAY_STYLES">' +
                '<div class="overlay-content" data-style="OVERLAY_CONTENT_STYLES">' +
                '<button class="overlay-close" data-style="OVERLAY_CLOSE_STYLES">&times;</button>' +
                '<div class="overlay-header" data-style="OVERLAY_HEADER_STYLES">' +
                '<h3 class="overlay-title" data-style="OVERLAY_TITLE_STYLES" id="overlay-title-' + moduleId + '">Titel</h3>' +
                '</div>' +
                '<div class="overlay-body" data-style="OVERLAY_BODY_STYLES">' +
                '<p class="overlay-text" data-style="OVERLAY_TEXT_STYLES" id="overlay-text-' + moduleId + '">Beschreibung</p>' +
                '</div>' +
                '<div class="overlay-navigation" data-style="OVERLAY_NAV_STYLES">' +
                '<button class="overlay-btn overlay-prev" data-style="OVERLAY_BTN_STYLES" id="overlay-prev-' + moduleId + '">' +
                '<span style="font-family: \'Font Awesome 5 Pro\'; font-size: 0.8rem;">&#xf053;</span> Zurück' +
                '</button>' +
                '<button class="overlay-btn overlay-next" data-style="OVERLAY_BTN_STYLES" id="overlay-next-' + moduleId + '">' +
                'Weiter <span style="font-family: \'Font Awesome 5 Pro\'; font-size: 0.8rem;">&#xf054;</span>' +
                '</button>' +
                '</div>' +
                '</div>' +
                '</div>';

            // Navigation Dots
            let navigationContent = '';
            for (let i = 1; i <= maxSteps; i++) {
                navigationContent += '<div class="nav-dot" data-step="' + i + '" data-style="NAV_DOT_STYLES"></div>';
            }

            // === HTML ASSEMBLY ===
            let content = '';

            // Optionaler Header
            if (headerContent) {
                content += '<div data-style="HEADER_CONTAINER_STYLES">' + headerContent + '</div>';
            }

            // Hauptcontainer mit Overlay
            content += '<div data-style="GUIDE_CONTAINER_STYLES">' +
                '<div class="step-display" data-style="STEP_DISPLAY_STYLES">' +
                stepsContent +
                overlayContent +
                '</div>' +
                '<div class="progress-bar" data-style="PROGRESS_BAR_STYLES">' +
                '<div class="progress-fill" data-style="PROGRESS_FILL_STYLES"></div>' +
                '</div>' +
                '<div class="navigation" data-style="NAVIGATION_STYLES">' +
                navigationContent +
                '</div>' +
                '</div>';

            // === CSS ARRAYS (OHNE ICON-SPECIFIC PROPERTIES) ===

            // Header Styles (squarespace-optimiert mit besserer Zentrierung)
            const headerContainerProperties = [];
            headerContainerProperties.push(buildCSSProperty('text-align', center));
            headerContainerProperties.push(buildCSSProperty('margin-bottom', '2rem')); // Mehr Abstand für bessere Optik
            headerContainerProperties.push(buildCSSProperty('padding', '1rem 2rem 0')); // Seitliches Padding hinzugefügt
            headerContainerProperties.push(buildCSSProperty('width', '100%'));
            headerContainerProperties.push(buildCSSProperty('box-sizing', 'border-box'));
            const headerContainerStyles = buildCSSText(headerContainerProperties);

            const titleProperties = [];
            titleProperties.push(buildCSSProperty('font-family', 'var(--heading-font-font-family)'));
            titleProperties.push(buildCSSProperty('font-size', 'var(--heading-2-size)'));
            titleProperties.push(buildCSSProperty('font-weight', 'var(--heading-font-font-weight)'));
            titleProperties.push(buildCSSProperty(color, titleColor));
            titleProperties.push(buildCSSProperty(margin, '0 0 0.5rem 0'));
            titleProperties.push(buildCSSProperty('text-align', center));
            const titleStyles = buildCSSText(titleProperties);

            const subtitleProperties = [];
            subtitleProperties.push(buildCSSProperty('font-family', 'var(--body-font-font-family)'));
            subtitleProperties.push(buildCSSProperty('font-size', 'var(--normal-text-size)'));
            subtitleProperties.push(buildCSSProperty('line-height', '1.6'));
            subtitleProperties.push(buildCSSProperty(color, subtitleColor));
            subtitleProperties.push(buildCSSProperty(margin, '0 0 1rem 0'));
            subtitleProperties.push(buildCSSProperty('text-align', center));
            subtitleProperties.push(buildCSSProperty('max-width', '600px'));
            subtitleProperties.push(buildCSSProperty('margin-left', 'auto'));
            subtitleProperties.push(buildCSSProperty('margin-right', 'auto'));
            const subtitleStyles = buildCSSText(subtitleProperties);

            const badgeProperties = [];
            badgeProperties.push(buildCSSProperty(display, 'inline-flex'));
            badgeProperties.push(buildCSSProperty('align-items', center));
            badgeProperties.push(buildCSSProperty('gap', '0.5rem'));
            badgeProperties.push(buildCSSProperty(padding, '0.4rem 1rem'));
            badgeProperties.push(buildCSSProperty(background, 'linear-gradient(135deg, ' + primaryColor + ', ' + secondaryColor + ')'));
            badgeProperties.push(buildCSSProperty(color, white));
            badgeProperties.push(buildCSSProperty('border-radius', '16px'));
            badgeProperties.push(buildCSSProperty('font-size', '0.8rem'));
            badgeProperties.push(buildCSSProperty('font-weight', '600'));
            badgeProperties.push(buildCSSProperty('margin-bottom', '0.75rem'));
            const badgeStyles = buildCSSText(badgeProperties);

            // Hauptcontainer (SQUARESPACE-OPTIMIERT mit Zentrierung)
            const guideContainerProperties = [];
            guideContainerProperties.push(buildCSSProperty(position, relative));
            guideContainerProperties.push(buildCSSProperty(background, 'transparent'));
            guideContainerProperties.push(buildCSSProperty('border-radius', '12px'));
            guideContainerProperties.push(buildCSSProperty('overflow', visible)); // Wichtig für Overlay
            guideContainerProperties.push(buildCSSProperty('box-shadow', '0 4px 16px rgba(6,58,168,0.1)'));
            guideContainerProperties.push(buildCSSProperty(border, '1px solid rgba(6,58,168,0.1)'));
            guideContainerProperties.push(buildCSSProperty('max-width', containerMaxWidth));
            guideContainerProperties.push(buildCSSProperty(margin, '1rem auto 0.5rem auto')); // Reduziertes Bottom-Spacing
            guideContainerProperties.push(buildCSSProperty('width', '100%'));
            guideContainerProperties.push(buildCSSProperty('box-sizing', 'border-box'));
            guideContainerProperties.push(buildCSSProperty('clear', 'both')); // Squarespace Float-Fix
            const guideContainerStyles = buildCSSText(guideContainerProperties);

            const stepDisplayProperties = [];
            stepDisplayProperties.push(buildCSSProperty(position, relative));
            stepDisplayProperties.push(buildCSSProperty('min-height', imageHeight));
            stepDisplayProperties.push(buildCSSProperty(background, white));
            stepDisplayProperties.push(buildCSSProperty('border-radius', '12px'));
            stepDisplayProperties.push(buildCSSProperty('overflow', hidden));
            const stepDisplayStyles = buildCSSText(stepDisplayProperties);

            const guideStepProperties = [];
            guideStepProperties.push(buildCSSProperty(position, absolute));
            guideStepProperties.push(buildCSSProperty('top', '0'));
            guideStepProperties.push(buildCSSProperty('left', '0'));
            guideStepProperties.push(buildCSSProperty(width, '100' + percent));
            guideStepProperties.push(buildCSSProperty(height, '100' + percent));
            guideStepProperties.push(buildCSSProperty(opacity, '0'));
            guideStepProperties.push(buildCSSProperty('visibility', hidden));
            guideStepProperties.push(buildCSSProperty(transition, 'all 0.4s ease'));
            guideStepProperties.push(buildCSSProperty('z-index', '1'));
            const guideStepStyles = buildCSSText(guideStepProperties);

            // Bildstyles (anpassbare Größe)
            const stepImageProperties = [];
            stepImageProperties.push(buildCSSProperty(width, '100%')); // IMMER 100% für responsive Verhalten
            stepImageProperties.push(buildCSSProperty(height, imageHeight));
            stepImageProperties.push(buildCSSProperty('object-fit', 'cover'));
            stepImageProperties.push(buildCSSProperty(display, block));
            stepImageProperties.push(buildCSSProperty(margin, '0 auto'));
            const stepImageStyles = buildCSSText(stepImageProperties);

            const hotspotBtnProperties = [];
            hotspotBtnProperties.push(buildCSSProperty(width, '44px'));
            hotspotBtnProperties.push(buildCSSProperty(height, '44px'));
            hotspotBtnProperties.push(buildCSSProperty(background, 'linear-gradient(135deg, ' + primaryColor + ', ' + secondaryColor + ')'));
            hotspotBtnProperties.push(buildCSSProperty(border, '3px solid ' + white));
            hotspotBtnProperties.push(buildCSSProperty('border-radius', '50' + percent));
            hotspotBtnProperties.push(buildCSSProperty(display, flex));
            hotspotBtnProperties.push(buildCSSProperty('align-items', center));
            hotspotBtnProperties.push(buildCSSProperty('justify-content', center));
            hotspotBtnProperties.push(buildCSSProperty('cursor', pointer));
            hotspotBtnProperties.push(buildCSSProperty('animation', 'pulse-' + moduleId.replace(/[^a-zA-Z0-9]/g, '') + ' 2.5s infinite'));
            hotspotBtnProperties.push(buildCSSProperty('box-shadow', '0 6px 20px rgba(6,58,168,0.4)'));
            hotspotBtnProperties.push(buildCSSProperty(transition, 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'));
            const hotspotBtnStyles = buildCSSText(hotspotBtnProperties);

            // === OVERLAY STYLES ===
            const overlayProperties = [];
            overlayProperties.push(buildCSSProperty(position, absolute));
            overlayProperties.push(buildCSSProperty('z-index', '100'));
            overlayProperties.push(buildCSSProperty(opacity, '0'));
            overlayProperties.push(buildCSSProperty('visibility', hidden));
            overlayProperties.push(buildCSSProperty(transform, 'scale(0.8)'));
            overlayProperties.push(buildCSSProperty(transition, 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'));
            overlayProperties.push(buildCSSProperty('pointer-events', none));
            const overlayStyles = buildCSSText(overlayProperties);

            const overlayContentProperties = [];
            overlayContentProperties.push(buildCSSProperty(background, white));
            overlayContentProperties.push(buildCSSProperty('border-radius', '12px'));
            overlayContentProperties.push(buildCSSProperty('box-shadow', '0 20px 60px rgba(0,0,0,0.3)'));
            overlayContentProperties.push(buildCSSProperty(padding, '0'));
            overlayContentProperties.push(buildCSSProperty('max-width', '300px'));
            overlayContentProperties.push(buildCSSProperty('min-width', '250px'));
            overlayContentProperties.push(buildCSSProperty(border, '1px solid rgba(6,58,168,0.1)'));
            overlayContentProperties.push(buildCSSProperty('overflow', hidden));
            const overlayContentStyles = buildCSSText(overlayContentProperties);

            const overlayCloseProperties = [];
            overlayCloseProperties.push(buildCSSProperty(position, absolute));
            overlayCloseProperties.push(buildCSSProperty('top', '8px'));
            overlayCloseProperties.push(buildCSSProperty('right', '8px'));
            overlayCloseProperties.push(buildCSSProperty(background, none));
            overlayCloseProperties.push(buildCSSProperty(border, none));
            overlayCloseProperties.push(buildCSSProperty('font-size', '18px'));
            overlayCloseProperties.push(buildCSSProperty(color, '#999'));
            overlayCloseProperties.push(buildCSSProperty('cursor', pointer));
            overlayCloseProperties.push(buildCSSProperty(width, '24px'));
            overlayCloseProperties.push(buildCSSProperty(height, '24px'));
            overlayCloseProperties.push(buildCSSProperty('line-height', '1'));
            overlayCloseProperties.push(buildCSSProperty(transition, 'all 0.2s ease'));
            overlayCloseProperties.push(buildCSSProperty('z-index', '10'));
            const overlayCloseStyles = buildCSSText(overlayCloseProperties);

            const overlayHeaderProperties = [];
            overlayHeaderProperties.push(buildCSSProperty(padding, '1rem 1rem 0.5rem'));
            overlayHeaderProperties.push(buildCSSProperty('border-bottom', '1px solid #e5e7eb'));
            const overlayHeaderStyles = buildCSSText(overlayHeaderProperties);

            const overlayTitleProperties = [];
            overlayTitleProperties.push(buildCSSProperty('font-family', 'var(--heading-font-font-family)'));
            overlayTitleProperties.push(buildCSSProperty('font-size', '1.1rem'));
            overlayTitleProperties.push(buildCSSProperty('font-weight', 'var(--heading-font-font-weight)'));
            overlayTitleProperties.push(buildCSSProperty(color, primaryColor));
            overlayTitleProperties.push(buildCSSProperty(margin, '0'));
            overlayTitleProperties.push(buildCSSProperty('padding-right', '2rem'));
            const overlayTitleStyles = buildCSSText(overlayTitleProperties);

            const overlayBodyProperties = [];
            overlayBodyProperties.push(buildCSSProperty(padding, '1rem'));
            const overlayBodyStyles = buildCSSText(overlayBodyProperties);

            const overlayTextProperties = [];
            overlayTextProperties.push(buildCSSProperty('font-family', 'var(--body-font-font-family)'));
            overlayTextProperties.push(buildCSSProperty('font-size', '0.9rem'));
            overlayTextProperties.push(buildCSSProperty('line-height', '1.5'));
            overlayTextProperties.push(buildCSSProperty(color, '#444'));
            overlayTextProperties.push(buildCSSProperty(margin, '0 0 1rem 0'));
            const overlayTextStyles = buildCSSText(overlayTextProperties);

            const overlayNavProperties = [];
            overlayNavProperties.push(buildCSSProperty(display, flex));
            overlayNavProperties.push(buildCSSProperty('gap', '0.5rem'));
            overlayNavProperties.push(buildCSSProperty('justify-content', 'space-between'));
            const overlayNavStyles = buildCSSText(overlayNavProperties);

            const overlayBtnProperties = [];
            overlayBtnProperties.push(buildCSSProperty(background, primaryColor));
            overlayBtnProperties.push(buildCSSProperty(color, white));
            overlayBtnProperties.push(buildCSSProperty(border, none));
            overlayBtnProperties.push(buildCSSProperty(padding, '0.5rem 1rem'));
            overlayBtnProperties.push(buildCSSProperty('border-radius', '6px'));
            overlayBtnProperties.push(buildCSSProperty('font-size', '0.85rem'));
            overlayBtnProperties.push(buildCSSProperty('cursor', pointer));
            overlayBtnProperties.push(buildCSSProperty(transition, 'all 0.2s ease'));
            overlayBtnProperties.push(buildCSSProperty('flex', '1'));
            const overlayBtnStyles = buildCSSText(overlayBtnProperties);

            // Progress Bar & Navigation
            const progressBarProperties = [];
            progressBarProperties.push(buildCSSProperty(position, absolute));
            progressBarProperties.push(buildCSSProperty('bottom', '0'));
            progressBarProperties.push(buildCSSProperty('left', '0'));
            progressBarProperties.push(buildCSSProperty('right', '0'));
            progressBarProperties.push(buildCSSProperty(height, '3px'));
            progressBarProperties.push(buildCSSProperty(background, 'rgba(6,58,168,0.1)'));
            progressBarProperties.push(buildCSSProperty('z-index', '20')); // FORTSCHRITTSBALKEN ÜBER BILDER
            const progressBarStyles = buildCSSText(progressBarProperties);

            const progressFillProperties = [];
            progressFillProperties.push(buildCSSProperty(height, '100' + percent));
            progressFillProperties.push(buildCSSProperty(background, 'linear-gradient(90deg, ' + primaryColor + ', ' + secondaryColor + ')'));
            progressFillProperties.push(buildCSSProperty(width, '20' + percent));
            progressFillProperties.push(buildCSSProperty(transition, width + ' 0.4s ease'));
            const progressFillStyles = buildCSSText(progressFillProperties);

            const navigationProperties = [];
            navigationProperties.push(buildCSSProperty(position, absolute));
            navigationProperties.push(buildCSSProperty('bottom', '15px'));
            navigationProperties.push(buildCSSProperty('left', '15px'));
            navigationProperties.push(buildCSSProperty(display, flex));
            navigationProperties.push(buildCSSProperty('gap', '0.4rem'));
            const navigationStyles = buildCSSText(navigationProperties);

            const navDotProperties = [];
            navDotProperties.push(buildCSSProperty(width, '10px'));
            navDotProperties.push(buildCSSProperty(height, '10px'));
            navDotProperties.push(buildCSSProperty('border-radius', '50' + percent));
            navDotProperties.push(buildCSSProperty(background, primaryColor));
            navDotProperties.push(buildCSSProperty('cursor', pointer));
            navDotProperties.push(buildCSSProperty(transition, 'all 0.3s ease'));
            navDotProperties.push(buildCSSProperty(opacity, '0.5'));
            const navDotStyles = buildCSSText(navDotProperties);

            // === CSS RULES (MIT SQUARESPACE-FIXES UND ZENTRIERUNG) ===
            const cssRules = [];
            cssRules.push('/* Kerberos Guide Flow Module ' + moduleId + ' - SQUARESPACE OPTIMIERT */');

            // SQUARESPACE CODE BLOCK RESET & ZENTRIERUNG (SPACING OPTIMIERT)
            cssRules.push('.kerberos-guide-' + moduleId + ' { margin' + colon + ' 0 auto !important' + semicolon + ' padding' + colon + ' 0 !important' + semicolon + ' }');
            cssRules.push('.sqs-block-code .kerberos-guide-' + moduleId + ' { margin' + colon + ' 0 auto !important' + semicolon + ' }');
            cssRules.push('.sqs-block-embed .kerberos-guide-' + moduleId + ' { margin' + colon + ' 0 auto !important' + semicolon + ' }');
            cssRules.push('section.kerberos-guide-' + moduleId + ' { margin' + colon + ' 0 auto !important' + semicolon + ' display' + colon + ' block !important' + semicolon + ' }');

            // CONTAINER PARENT RESET
            cssRules.push('.kerberos-guide-' + moduleId + ' * { box-sizing' + colon + ' border-box !important' + semicolon + ' }');

            // ANIMATION
            cssRules.push('@keyframes pulse-' + moduleId.replace(/[^a-zA-Z0-9]/g, '') + ' {');
            cssRules.push('0' + percent + ' { box-shadow' + colon + ' 0 6px 20px rgba(6,58,168,0.4), 0 0 0 0 rgba(6,58,168,0.5)' + semicolon + ' }');
            cssRules.push('70' + percent + ' { box-shadow' + colon + ' 0 6px 20px rgba(6,58,168,0.4), 0 0 0 25px transparent' + semicolon + ' }');
            cssRules.push('100' + percent + ' { box-shadow' + colon + ' 0 6px 20px rgba(6,58,168,0.4), 0 0 0 0 transparent' + semicolon + ' }');
            cssRules.push('}');

            // RESPONSIVE MEDIA QUERIES - KORRIGIERT MIT SPAN STATT I
            cssRules.push('@media (max-width' + colon + ' 768px) {');
            cssRules.push('.kerberos-guide-' + moduleId + ' .guide-overlay .overlay-content { max-width' + colon + ' 320px !important' + semicolon + ' min-width' + colon + ' 250px !important' + semicolon + ' }');
            cssRules.push('.kerberos-guide-' + moduleId + ' .hotspot-btn { width' + colon + ' 36px !important' + semicolon + ' height' + colon + ' 36px !important' + semicolon + ' }');
            cssRules.push('.kerberos-guide-' + moduleId + ' .hotspot-btn span { font-size' + colon + ' 0.85rem !important' + semicolon + ' }');
            cssRules.push('.kerberos-guide-' + moduleId + ' .overlay-title { font-size' + colon + ' 1rem !important' + semicolon + ' }');
            cssRules.push('.kerberos-guide-' + moduleId + ' .overlay-text { font-size' + colon + ' 0.85rem !important' + semicolon + ' }');
            cssRules.push('}');

            cssRules.push('@media (max-width' + colon + ' 480px) {');
            cssRules.push('.kerberos-guide-' + moduleId + ' .guide-overlay .overlay-content { max-width' + colon + ' 280px !important' + semicolon + ' min-width' + colon + ' 220px !important' + semicolon + ' }');
            cssRules.push('.kerberos-guide-' + moduleId + ' .hotspot-btn { width' + colon + ' 32px !important' + semicolon + ' height' + colon + ' 32px !important' + semicolon + ' }');
            cssRules.push('.kerberos-guide-' + moduleId + ' .hotspot-btn span { font-size' + colon + ' 0.75rem !important' + semicolon + ' }');
            cssRules.push('.kerberos-guide-' + moduleId + ' .overlay-title { font-size' + colon + ' 0.95rem !important' + semicolon + ' }');
            cssRules.push('.kerberos-guide-' + moduleId + ' .overlay-text { font-size' + colon + ' 0.8rem !important' + semicolon + ' }');
            cssRules.push('.kerberos-guide-' + moduleId + ' .overlay-header { padding' + colon + ' 0.8rem 0.8rem 0.4rem !important' + semicolon + ' }');
            cssRules.push('.kerberos-guide-' + moduleId + ' .overlay-body { padding' + colon + ' 0.8rem !important' + semicolon + ' }');
            cssRules.push('.kerberos-guide-' + moduleId + ' .overlay-btn { padding' + colon + ' 0.4rem 0.8rem !important' + semicolon + ' font-size' + colon + ' 0.8rem !important' + semicolon + ' }');
            cssRules.push('}');

            // RESPONSIVE SPACING-FIXES - REDUZIERT
            cssRules.push('@media (max-width' + colon + ' 768px) {');
            cssRules.push('.kerberos-guide-' + moduleId + ' { margin' + colon + ' 0.5rem auto 0.25rem !important' + semicolon + ' padding' + colon + ' 0.5rem 0 0.25rem 0 !important' + semicolon + ' }');
            cssRules.push('}');
            cssRules.push('@media (max-width' + colon + ' 480px) {');
            cssRules.push('.kerberos-guide-' + moduleId + ' { margin' + colon + ' 0.25rem auto 0.125rem !important' + semicolon + ' padding' + colon + ' 0.25rem 0 0.125rem 0 !important' + semicolon + ' }');
            cssRules.push('}');

            // Active States
            cssRules.push('.kerberos-guide-' + moduleId + ' .nav-dot' + colon + 'first-child { ' + opacity + colon + ' 1 !important' + semicolon + ' }');

            // BOTTOM-SPACING KONTROLLE
            cssRules.push('.kerberos-guide-' + moduleId + ' { margin-bottom' + colon + ' 0.5rem !important' + semicolon + ' }');
            cssRules.push('.sqs-block-code .kerberos-guide-' + moduleId + ' { margin-bottom' + colon + ' 0.5rem !important' + semicolon + ' }');

            // Hover Effects
            cssRules.push('.kerberos-guide-' + moduleId + ' .hotspot-btn' + colon + 'hover { ' + transform + colon + ' scale(1.1) !important' + semicolon + ' }');
            cssRules.push('.kerberos-guide-' + moduleId + ' .nav-dot' + colon + 'hover { ' + opacity + colon + ' 0.8 !important' + semicolon + ' ' + transform + colon + ' scale(1.2) !important' + semicolon + ' }');
            cssRules.push('.kerberos-guide-' + moduleId + ' .overlay-close' + colon + 'hover { ' + color + colon + ' ' + primaryColor + ' !important' + semicolon + ' }');
            cssRules.push('.kerberos-guide-' + moduleId + ' .overlay-btn' + colon + 'hover { ' + background + colon + ' rgba(6,58,168,0.8) !important' + semicolon + ' }');

            // Overlay Show State
            cssRules.push('.kerberos-guide-' + moduleId + ' .guide-overlay.show { ' + opacity + colon + ' 1 !important' + semicolon + ' visibility' + colon + ' ' + visible + ' !important' + semicolon + ' ' + transform + colon + ' scale(1) !important' + semicolon + ' pointer-events' + colon + ' auto !important' + semicolon + ' }');

            const animationCSS = openBracket + styleTag + closeBracket + cssRules.join(' ') + openBracket + slash + styleTag + closeBracket;

            // === JAVASCRIPT (UNVERÄNDERT) ===
            const jsContent = openBracket + scriptTag + closeBracket +
                '(function() {' +
                'console.log("=== Guide Flow ' + moduleId + ' Loading - DIREKTE ICON-STYLES ===");' +

                // Daten für Steps (für Editor-Kompatibilität)
                'const stepData = [' +
                Array.from({ length: maxSteps }, (_, i) => {
                    const stepNum = i + 1;
                    return '{' +
                        'title: "' + (props['step' + stepNum + 'Title'] || 'Schritt ' + stepNum) + '",' +
                        'description: "' + (props['step' + stepNum + 'Description'] || 'Beschreibung für Schritt ' + stepNum) + '",' +
                        'hotspotX: ' + (props['step' + stepNum + 'HotspotX'] || 50) + ',' +
                        'hotspotY: ' + (props['step' + stepNum + 'HotspotY'] || 50) +
                        '}';
                }).join(',') +
                '];' +

                'let initAttempts = 0;' +
                'const maxAttempts = 20;' +

                'function initGuideFlow' + moduleId.replace(/[^a-zA-Z0-9]/g, '') + '() {' +
                'initAttempts++;' +
                'console.log("Init attempt #" + initAttempts + " for Guide Flow ' + moduleId + '");' +

                // Robustere Container-Suche
                'let container = document.querySelector(\'.kerberos-guide-' + moduleId + '\');' +
                'if (!container) {' +
                'console.log("Container not found with class .kerberos-guide-' + moduleId + '");' +
                'container = document.querySelector(\'[class*="kerberos-guide-' + moduleId + '"]\');' +
                '}' +
                'if (!container) {' +
                'console.log("Container still not found, searching all containers...");' +
                'const allContainers = document.querySelectorAll(\'[class*="kerberos-guide"]\');' +
                'console.log("Found " + allContainers.length + " guide containers");' +
                'if (allContainers.length > 0) container = allContainers[allContainers.length - 1];' +
                '}' +

                'if (!container) {' +
                'if (initAttempts < maxAttempts) {' +
                'console.log("Container not found, retrying in 200ms...");' +
                'setTimeout(initGuideFlow' + moduleId.replace(/[^a-zA-Z0-9]/g, '') + ', 200);' +
                'return;' +
                '} else {' +
                'console.error("Guide Flow ' + moduleId + ' - Container not found after " + maxAttempts + " attempts");' +
                'return;' +
                '}' +
                '}' +

                'console.log("Container found:", container);' +

                // Robustere Element-Selektion
                'const steps = container.querySelectorAll(\'.guide-step\');' +
                'const dots = container.querySelectorAll(\'.nav-dot\');' +
                'const progressFill = container.querySelector(\'.progress-fill\');' +
                'const hotspots = container.querySelectorAll(\'.hotspot-btn\');' +
                'const overlay = container.querySelector(\'.guide-overlay\');' +
                'const overlayTitle = container.querySelector(\'.overlay-title\');' +
                'const overlayText = container.querySelector(\'.overlay-text\');' +
                'const overlayClose = container.querySelector(\'.overlay-close\');' +
                'const overlayPrev = container.querySelector(\'.overlay-prev\');' +
                'const overlayNext = container.querySelector(\'.overlay-next\');' +

                'console.log("Elements found:");' +
                'console.log("- Steps:", steps.length);' +
                'console.log("- Dots:", dots.length);' +
                'console.log("- Hotspots:", hotspots.length);' +
                'console.log("- Overlay:", !!overlay);' +

                'if (steps.length === 0) {' +
                'console.error("No guide steps found!");' +
                'return;' +
                '}' +

                'let currentStep = 0;' +
                'let autoAdvanceInterval;' +
                'let overlayVisible = false;' +
                'let initialized = false;' +
                'let resizeTimeout;' +

                'function showStep(stepIndex) {' +
                'console.log("Showing step:", stepIndex + 1);' +
                'steps.forEach((step, index) => {' +
                'if (step) {' +
                'step.style.opacity = index === stepIndex ? \'1\' : \'0\';' +
                'step.style.visibility = index === stepIndex ? \'visible\' : \'hidden\';' +
                'step.style.zIndex = index === stepIndex ? \'2\' : \'1\';' +
                '}' +
                '});' +
                'dots.forEach((dot, index) => {' +
                'if (dot) {' +
                'dot.style.opacity = index === stepIndex ? \'1\' : \'0.5\';' +
                '}' +
                '});' +
                'const progress = ((stepIndex + 1) / steps.length) * 100;' +
                'if (progressFill) progressFill.style.width = progress + \'%\';' +
                'currentStep = stepIndex;' +

                // Overlay positionieren und Text aktualisieren
                'if (overlayVisible && overlay) {' +
                'positionOverlay(stepIndex);' +
                'updateOverlayContent(stepIndex);' +
                '}' +
                '}' +

                // INTELLIGENTE MULTI-POSITION OVERLAY-LOGIK
                'function positionOverlay(stepIndex) {' +
                'if (!overlay || !stepData[stepIndex]) return;' +
                'const stepContainer = steps[stepIndex];' +
                'if (!stepContainer) return;' +

                'try {' +
                'const containerRect = stepContainer.getBoundingClientRect();' +
                'const hotspotX = stepData[stepIndex].hotspotX;' +
                'const hotspotY = stepData[stepIndex].hotspotY;' +

                // Hotspot-Position berechnen
                'const hotspotLeft = (containerRect.width * hotspotX / 100);' +
                'const hotspotTop = (containerRect.height * hotspotY / 100);' +

                // RESPONSIVE OVERLAY-GRÖSSEN
                'const viewportWidth = window.innerWidth;' +
                'const isSmallScreen = viewportWidth < 768;' +
                'const isMobile = viewportWidth < 480;' +

                'let overlayWidth, overlayHeight;' +
                'if (isMobile) {' +
                'overlayWidth = Math.min(280, containerRect.width - 40);' +
                'overlayHeight = 160;' +
                '} else if (isSmallScreen) {' +
                'overlayWidth = Math.min(320, containerRect.width - 60);' +
                'overlayHeight = 180;' +
                '} else {' +
                'overlayWidth = Math.min(350, containerRect.width - 80);' +
                'overlayHeight = 200;' +
                '}' +

                // POSITION-TESTING: Teste alle 4 Positionen
                'const margin = 20;' +
                'const positions = [];' +

                // Position 1: OBERHALB des Hotspots
                'const topPos = {' +
                'left: Math.max(margin, Math.min(hotspotLeft - overlayWidth/2, containerRect.width - overlayWidth - margin)),' +
                'top: Math.max(margin, hotspotTop - overlayHeight - 30),' +
                'preference: hotspotTop > overlayHeight + 50 ? 3 : 1,' +
                'name: "top"' +
                '};' +

                // Position 2: UNTERHALB des Hotspots
                'const bottomPos = {' +
                'left: Math.max(margin, Math.min(hotspotLeft - overlayWidth/2, containerRect.width - overlayWidth - margin)),' +
                'top: Math.min(containerRect.height - overlayHeight - margin, hotspotTop + 60),' +
                'preference: (containerRect.height - hotspotTop) > overlayHeight + 80 ? 3 : 2,' +
                'name: "bottom"' +
                '};' +

                // Position 3: LINKS vom Hotspot
                'const leftPos = {' +
                'left: Math.max(margin, hotspotLeft - overlayWidth - 30),' +
                'top: Math.max(margin, Math.min(hotspotTop - overlayHeight/2, containerRect.height - overlayHeight - margin)),' +
                'preference: hotspotLeft > overlayWidth + 50 ? 2 : 1,' +
                'name: "left"' +
                '};' +

                // Position 4: RECHTS vom Hotspot
                'const rightPos = {' +
                'left: Math.min(containerRect.width - overlayWidth - margin, hotspotLeft + 60),' +
                'top: Math.max(margin, Math.min(hotspotTop - overlayHeight/2, containerRect.height - overlayHeight - margin)),' +
                'preference: (containerRect.width - hotspotLeft) > overlayWidth + 80 ? 2 : 1,' +
                'name: "right"' +
                '};' +

                'positions.push(topPos, bottomPos, leftPos, rightPos);' +

                // KOLLISIONSERKENNUNG
                'function checkHotspotCollision(pos, hotspotLeft, hotspotTop) {' +
                'const hotspotSize = 44;' +
                'const buffer = 15;' +
                'const hotspotBounds = {' +
                'left: hotspotLeft - hotspotSize/2 - buffer,' +
                'right: hotspotLeft + hotspotSize/2 + buffer,' +
                'top: hotspotTop - hotspotSize/2 - buffer,' +
                'bottom: hotspotTop + hotspotSize/2 + buffer' +
                '};' +
                'const overlayBounds = {' +
                'left: pos.left,' +
                'right: pos.left + overlayWidth,' +
                'top: pos.top,' +
                'bottom: pos.top + overlayHeight' +
                '};' +
                'return !(overlayBounds.right < hotspotBounds.left || ' +
                'overlayBounds.left > hotspotBounds.right || ' +
                'overlayBounds.bottom < hotspotBounds.top || ' +
                'overlayBounds.top > hotspotBounds.bottom);' +
                '}' +

                // BESTE POSITION WÄHLEN
                'positions.sort((a, b) => b.preference - a.preference);' +
                'let bestPosition = null;' +

                // 1. PRIORITÄT: Sichtbar UND keine Kollision
                'for (let pos of positions) {' +
                'const isVisible = pos.left >= margin && ' +
                'pos.top >= margin && ' +
                'pos.left + overlayWidth <= containerRect.width - margin && ' +
                'pos.top + overlayHeight <= containerRect.height - margin;' +
                'const hasCollision = checkHotspotCollision(pos, hotspotLeft, hotspotTop);' +
                'if (isVisible && !hasCollision) {' +
                'bestPosition = pos;' +
                'break;' +
                '}' +
                '}' +

                // 2. PRIORITÄT: Nur sichtbar
                'if (!bestPosition) {' +
                'for (let pos of positions) {' +
                'const isVisible = pos.left >= margin && ' +
                'pos.top >= margin && ' +
                'pos.left + overlayWidth <= containerRect.width - margin && ' +
                'pos.top + overlayHeight <= containerRect.height - margin;' +
                'if (isVisible) {' +
                'bestPosition = pos;' +
                'break;' +
                '}' +
                '}' +
                '}' +

                // 3. FALLBACK
                'if (!bestPosition) {' +
                'bestPosition = positions[0];' +
                '}' +

                // OVERLAY POSITIONIEREN
                'overlay.style.left = bestPosition.left + "px";' +
                'overlay.style.top = bestPosition.top + "px";' +

                // RESPONSIVE OVERLAY-GRÖSSE SETZEN
                'const overlayContent = overlay.querySelector(".overlay-content");' +
                'if (overlayContent) {' +
                'overlayContent.style.width = overlayWidth + "px";' +
                'overlayContent.style.maxWidth = overlayWidth + "px";' +
                'overlayContent.style.minWidth = Math.min(250, overlayWidth) + "px";' +
                '}' +

                'console.log("Overlay positioned:", bestPosition.name, "at", bestPosition.left, bestPosition.top);' +
                '} catch(e) {' +
                'console.warn("Error positioning overlay:", e);' +
                '}' +
                '}' +

                'function updateOverlayContent(stepIndex) {' +
                'if (!stepData[stepIndex]) return;' +
                'if (overlayTitle) overlayTitle.textContent = stepData[stepIndex].title;' +
                'if (overlayText) overlayText.textContent = stepData[stepIndex].description;' +
                'if (overlayPrev) overlayPrev.style.display = stepIndex === 0 ? \'none\' : \'block\';' +
                'if (overlayNext) overlayNext.style.display = stepIndex === steps.length - 1 ? \'none\' : \'block\';' +
                '}' +

                'function showOverlay(stepIndex) {' +
                'console.log("Showing overlay for step:", stepIndex + 1);' +
                'if (!overlay) return;' +
                'overlayVisible = true;' +
                'stopAutoAdvance();' +
                'positionOverlay(stepIndex);' +
                'updateOverlayContent(stepIndex);' +
                'overlay.classList.add(\'show\');' +
                '}' +

                'function hideOverlay() {' +
                'console.log("Hiding overlay");' +
                'if (!overlay) return;' +
                'overlayVisible = false;' +
                'overlay.classList.remove(\'show\');' +
                'startAutoAdvance();' +
                '}' +

                'function startAutoAdvance() {' +
                'if ("' + (props.autoAdvance || 'true') + '" === "true") {' +
                'const interval = parseInt("' + (props.autoAdvanceInterval || '4000') + '") || 4000;' +
                'console.log("Starting auto-advance with interval:", interval + "ms");' +
                'autoAdvanceInterval = setInterval(() => {' +
                'if (!overlayVisible && initialized) {' +
                'const nextStep = (currentStep + 1) % steps.length;' +
                'showStep(nextStep);' +
                '}' +
                '}, interval);' +
                '}' +
                '}' +

                'function stopAutoAdvance() {' +
                'if (autoAdvanceInterval) {' +
                'clearInterval(autoAdvanceInterval);' +
                'autoAdvanceInterval = null;' +
                '}' +
                '}' +

                'function goToStep(stepIndex) {' +
                'if (stepIndex >= 0 && stepIndex < steps.length) {' +
                'showStep(stepIndex);' +
                'if (overlayVisible) {' +
                'positionOverlay(stepIndex);' +
                'updateOverlayContent(stepIndex);' +
                '}' +
                '}' +
                '}' +

                // Event Listeners
                'function addEventListeners() {' +
                'console.log("Adding event listeners...");' +

                // Dot Navigation
                'dots.forEach((dot, index) => {' +
                'if (dot) {' +
                'dot.addEventListener(\'click\', function(e) {' +
                'e.preventDefault();' +
                'e.stopPropagation();' +
                'console.log("Dot clicked:", index + 1);' +
                'stopAutoAdvance();' +
                'showStep(index);' +
                'if (!overlayVisible) startAutoAdvance();' +
                '});' +
                'dot.addEventListener(\'mouseenter\', function() {' +
                'this.style.transform = \'scale(1.2)\';' +
                '});' +
                'dot.addEventListener(\'mouseleave\', function() {' +
                'this.style.transform = \'scale(1)\';' +
                '});' +
                '}' +
                '});' +

                // Hotspot Clicks
                'hotspots.forEach((hotspot, index) => {' +
                'if (hotspot) {' +
                'hotspot.addEventListener(\'click\', function(e) {' +
                'e.preventDefault();' +
                'e.stopPropagation();' +
                'console.log("Hotspot clicked:", index + 1);' +
                'const stepIndex = parseInt(hotspot.getAttribute(\'data-step\')) - 1;' +
                'if (stepIndex >= 0 && stepIndex < steps.length) {' +
                'showStep(stepIndex);' +
                'showOverlay(stepIndex);' +
                '}' +
                '});' +
                'hotspot.addEventListener(\'mouseenter\', function() {' +
                'this.style.transform = \'scale(1.1)\';' +
                '});' +
                'hotspot.addEventListener(\'mouseleave\', function() {' +
                'this.style.transform = \'scale(1)\';' +
                '});' +
                '}' +
                '});' +

                // Overlay Controls
                'if (overlayClose) {' +
                'overlayClose.addEventListener(\'click\', function(e) {' +
                'e.preventDefault();' +
                'e.stopPropagation();' +
                'hideOverlay();' +
                '});' +
                '}' +
                'if (overlayPrev) {' +
                'overlayPrev.addEventListener(\'click\', function(e) {' +
                'e.preventDefault();' +
                'e.stopPropagation();' +
                'if (currentStep > 0) goToStep(currentStep - 1);' +
                '});' +
                '}' +
                'if (overlayNext) {' +
                'overlayNext.addEventListener(\'click\', function(e) {' +
                'e.preventDefault();' +
                'e.stopPropagation();' +
                'if (currentStep < steps.length - 1) goToStep(currentStep + 1);' +
                '});' +
                '}' +
                '}' +

                // Globale Event Listeners
                'function addGlobalListeners() {' +
                'document.addEventListener(\'keydown\', function(e) {' +
                'if (e.key === \'Escape\' && overlayVisible) {' +
                'hideOverlay();' +
                '}' +
                '});' +
                'window.addEventListener(\'resize\', function() {' +
                'if (resizeTimeout) clearTimeout(resizeTimeout);' +
                'resizeTimeout = setTimeout(() => {' +
                'if (overlayVisible) {' +
                'positionOverlay(currentStep);' +
                '}' +
                '}, 150);' +
                '});' +
                '}' +

                // Initialisierung
                'try {' +
                'addEventListeners();' +
                'addGlobalListeners();' +
                'showStep(0);' +
                'initialized = true;' +
                'startAutoAdvance();' +
                'console.log("✅ Guide Flow ' + moduleId + ' successfully initialized with DIRECT ICON STYLES!");' +
                '} catch(error) {' +
                'console.error("❌ Error initializing Guide Flow ' + moduleId + ':", error);' +
                '}' +
                '}' +

                // Multiple Initialisierung-Strategien
                'function tryInitialization() {' +
                'initGuideFlow' + moduleId.replace(/[^a-zA-Z0-9]/g, '') + '();' +
                '}' +

                'if (document.readyState === \'complete\' || document.readyState === \'interactive\') {' +
                'setTimeout(tryInitialization, 10);' +
                '} else {' +
                'document.addEventListener(\'DOMContentLoaded\', tryInitialization);' +
                'window.addEventListener(\'load\', tryInitialization);' +
                '}' +

                'setTimeout(tryInitialization, 500);' +
                'setTimeout(tryInitialization, 2000);' +
                '})();' +
                openBracket + slash + scriptTag + closeBracket;

            // === STYLE REPLACEMENTS (OHNE ICON-REPLACEMENTS) ===
            if (headerContent) {
                content = content.replace('data-style="HEADER_CONTAINER_STYLES"', createStyleAttribute(headerContainerStyles));
                content = content.replace('data-style="TITLE_STYLES"', createStyleAttribute(titleStyles));
                content = content.replace('data-style="SUBTITLE_STYLES"', createStyleAttribute(subtitleStyles));
                content = content.replace('data-style="BADGE_STYLES"', createStyleAttribute(badgeStyles));
                // ENTFERNT: BADGE_ICON_STYLES replacement
            }

            content = content.replace('data-style="GUIDE_CONTAINER_STYLES"', createStyleAttribute(guideContainerStyles));
            content = content.replace('data-style="STEP_DISPLAY_STYLES"', createStyleAttribute(stepDisplayStyles));
            content = content.replace(/data-style="GUIDE_STEP_STYLES"/g, createStyleAttribute(guideStepStyles));
            content = content.replace(/data-style="STEP_IMAGE_STYLES"/g, createStyleAttribute(stepImageStyles));
            content = content.replace(/data-style="HOTSPOT_BTN_STYLES"/g, createStyleAttribute(hotspotBtnStyles));
            // ENTFERNT: HOTSPOT_ICON_STYLES replacement
            content = content.replace('data-style="PROGRESS_BAR_STYLES"', createStyleAttribute(progressBarStyles));
            content = content.replace('data-style="PROGRESS_FILL_STYLES"', createStyleAttribute(progressFillStyles));
            content = content.replace('data-style="NAVIGATION_STYLES"', createStyleAttribute(navigationStyles));
            content = content.replace(/data-style="NAV_DOT_STYLES"/g, createStyleAttribute(navDotStyles));

            // Overlay Styles
            content = content.replace('data-style="OVERLAY_STYLES"', createStyleAttribute(overlayStyles));
            content = content.replace('data-style="OVERLAY_CONTENT_STYLES"', createStyleAttribute(overlayContentStyles));
            content = content.replace('data-style="OVERLAY_CLOSE_STYLES"', createStyleAttribute(overlayCloseStyles));
            content = content.replace('data-style="OVERLAY_HEADER_STYLES"', createStyleAttribute(overlayHeaderStyles));
            content = content.replace('data-style="OVERLAY_TITLE_STYLES"', createStyleAttribute(overlayTitleStyles));
            content = content.replace('data-style="OVERLAY_BODY_STYLES"', createStyleAttribute(overlayBodyStyles));
            content = content.replace('data-style="OVERLAY_TEXT_STYLES"', createStyleAttribute(overlayTextStyles));
            content = content.replace('data-style="OVERLAY_NAV_STYLES"', createStyleAttribute(overlayNavStyles));
            content = content.replace(/data-style="OVERLAY_BTN_STYLES"/g, createStyleAttribute(overlayBtnStyles));
            // ENTFERNT: OVERLAY_BTN_ICON_STYLES replacement

            // Hotspot positioning (responsive with CSS calc)
            for (let i = 1; i <= maxSteps; i++) {
                const hotspotX = props['step' + i + 'HotspotX'] || 50;
                const hotspotY = props['step' + i + 'HotspotY'] || 50;
                const hotspotPositionProperties = [];
                hotspotPositionProperties.push(buildCSSProperty(position, absolute));
                hotspotPositionProperties.push(buildCSSProperty('top', 'calc(' + hotspotY + '% - 22px)'));
                hotspotPositionProperties.push(buildCSSProperty('left', 'calc(' + hotspotX + '% - 22px)'));
                hotspotPositionProperties.push(buildCSSProperty('z-index', '10'));
                const hotspotPositionStyles = buildCSSText(hotspotPositionProperties);
                content = content.replace('data-style="HOTSPOT_' + i + '_STYLES"', createStyleAttribute(hotspotPositionStyles));
            }

            // SECTION PADDING OPTIMIERUNG - REDUZIERT
            html = html.replace('style="padding: 0; background: transparent; margin: 0;"', 'style="padding: 1rem 0 0.5rem 0; background: transparent; margin: 0;"');

            // === TEMPLATE ASSEMBLY ===
            html = html.replace('{{content}}', content);
            html = html.replace(/{{templateId}}/g, moduleId);

            return animationCSS + html + jsContent;
        }

        function processKerberosSolutionsOverview(module, html) {
            const props = module.properties;

            // Header erstellen
            let headerContent = '';
            if (props.title) {
                headerContent = '<div style="text-align: center; margin-bottom: 3rem;">' +
                    '<h2 style="font-family: var(--heading-font-font-family); font-size: var(--heading-2-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: ' + props.titleColor + '; margin: 0 0 1rem 0;">' + props.title + '</h2>';

                if (props.showSubtitle === 'true' && props.subtitle) {
                    headerContent += '<p style="font-family: var(--body-font-font-family); font-size: var(--normal-text-size); line-height: var(--body-font-line-height); color: ' + props.subtitleColor + '; max-width: 800px; margin: 0 auto;">' + props.subtitle + '</p>';
                }

                headerContent += '</div>';
            }

            // Responsive CSS hinzufügen
            const responsiveCSS = `<style>
                @media (max-width: 768px) {
                    .solutions-card-${module.id} {
                        margin-bottom: 1.5rem !important;
                    }
                    .solutions-grid-${module.id} {
                        grid-template-columns: 1fr !important;
                        gap: 1.5rem !important;
                    }
                }
            </style>`;

            // CSS mit korrigierten Klassen-Namen
            const moduleCSS = '<style>' +
            '.solutions-card-' + module.id + ' { ' +
            'background: #FFFFFF; ' +
            'border: 1px solid #DEE2E6; ' +
            'border-radius: 8px; ' +
            'overflow: hidden; ' +
            'text-decoration: none; ' +
            'display: block; ' +
            'box-shadow: 0 2px 8px rgba(0,0,0,0.1); ' +
            'cursor: pointer; ' +
            'transition: all 0.4s ease; ' +
            '}' +
            '.solutions-card-' + module.id + ':hover { ' +
            'background: ' + props.hoverBackgroundColor + ' !important; ' +
            'transform: translateY(-8px) !important; ' +
            'box-shadow: 0 12px 32px rgba(6,58,168,0.3) !important; ' +
            '}' +
            '.solutions-title-' + module.id + ' { ' +
            'font-family: var(--heading-font-font-family); ' +
            'color: #212529; ' +
            'margin: 0 0 0.5rem 0; ' +
            'font-size: 1.1rem; ' +
            'transition: color 0.4s ease; ' +
            '}' +
            '.solutions-desc-' + module.id + ' { ' +
            'font-family: var(--body-font-font-family); ' +
            'color: #6c757d; ' +
            'margin: 0; ' +
            'font-size: 0.9rem; ' +
            'transition: color 0.4s ease; ' +
            '}' +
            '.solutions-card-' + module.id + ':hover .solutions-title-' + module.id + ' { ' +
            'color: ' + props.hoverTitleColor + ' !important; ' +
            '}' +
            '.solutions-card-' + module.id + ':hover .solutions-desc-' + module.id + ' { ' +
            'color: ' + props.hoverDescriptionColor + ' !important; ' +
            '}' +
            '.solutions-card-' + module.id + ':hover img { ' +
            'transform: scale(1.05) !important; ' +
            'filter: brightness(1.1) !important; ' +
            '}' +
            '</style>';

            // Dynamische Produkt-Karten
            let productCards = '';
            for (let i = 1; i <= 12; i++) {
                if (props['product' + i + 'Active'] === 'true') {
                    const title = props['product' + i + 'Title'] || 'Produkt ' + i;
                    const description = props['product' + i + 'Description'] || 'Beschreibung';
                    const image = props['product' + i + 'Image'] || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop';
                    const link = props['product' + i + 'Link'] || '#';

                    // Responsive Image verwenden
                    const responsiveImage = createResponsiveImage(image, title, '', '(max-width: 768px) 100vw, 50vw');
                    const optimizedImage = responsiveImage.replace('style="width: 100%; height: auto; object-fit: cover;"', 'style="width: 100%; height: 200px; object-fit: cover; transition: transform 0.4s ease, filter 0.4s ease;"');

                    productCards += '<a class="solutions-card-' + module.id + '" href="' + link + '">' +
                        optimizedImage +
                        '<div style="padding: 1rem;">' +
                        '<h4 class="solutions-title-' + module.id + '">' + title + '</h4>' +
                        '<p class="solutions-desc-' + module.id + '">' + description + '</p>' +
                        '</div>' +
                        '</a>';
                }
            }

            // Grid-Container
            const productGrid = '<div class="solutions-grid-' + module.id + '" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: ' + props.contentGap + ';">' +
                productCards +
                '</div>';

            // Alles zusammenfügen
            const fullContent = responsiveCSS + moduleCSS + headerContent + productGrid;

            // Ersetze den korrekten Platzhalter
            html = html.replace('{{solutionsContent}}', fullContent);
            return html;
        }

        function processKerberosProductShowcase(module, html) {
            console.log('🎯 Processing Product Showcase Module:', module.id);
            console.log('📊 Properties:', Object.keys(module.properties).length);
            const props = module.properties;

            // Debug: Zeige erste 3 Produkte
            for (let i = 1; i <= 3; i++) {
                if (props[`product${i}Active`] === 'true') {
                    console.log(`📦 Produkt ${i}:`, {
                        title: props[`product${i}Title`],
                        desc: props[`product${i}Description`]?.substring(0, 30) + '...',
                        active: props[`product${i}Active`]
                    });
                }
            }

            // Header Content
            let headerContent = '';
            if (props.title) {
                headerContent = '<div style="text-align: center; margin-bottom: 4rem;">' +
                    '<h2 style="font-family: var(--heading-font-font-family); font-size: var(--heading-2-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: ' + props.titleColor + '; margin: 0 0 1rem 0;">' + props.title + '</h2>';

                if (props.showSubtitle === 'true' && props.subtitle) {
                    headerContent += '<p style="font-family: var(--body-font-font-family); font-size: var(--normal-text-size); line-height: var(--body-font-line-height); color: ' + props.subtitleColor + '; max-width: 700px; margin: 0 auto;">' + props.subtitle + '</p>';
                }

                headerContent += '</div>';
            }

            // Product Cards generieren
            let productCards = '';
            for (let i = 1; i <= 9; i++) {
                if (props['product' + i + 'Active'] === 'true') {
                    const title = props['product' + i + 'Title'] || 'Produkt ' + i;
                    const description = props['product' + i + 'Description'] || 'Beschreibung';
                    const image = props['product' + i + 'Image'] || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop';
                    const link = props['product' + i + 'Link'] || '#';
                    const price = props['product' + i + 'Price'] || '';
                    const badge = props['product' + i + 'Badge'] || '';

                    productCards += '<a class="showcase-card-' + module.id + '" href="' + link + '" style="background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; overflow: hidden; text-decoration: none; display: block; box-shadow: 0 2px 8px rgba(0,0,0,0.1); cursor: pointer; transition: all 0.3s ease; position: relative;">' +
                        (badge ? '<div style="position: absolute; top: 1rem; right: 1rem; background: linear-gradient(135deg, #063AA8, #009CE6); color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; z-index: 2;">' + badge + '</div>' : '') +
                        '<img src="' + image + '" alt="' + title + '" style="width: 100%; height: 200px; object-fit: cover; transition: transform 0.4s ease;">' +
                        '<div style="padding: 1.5rem;">' +
                        '<h3 style="font-family: var(--heading-font-font-family); color: #212529; margin: 0 0 0.75rem 0; font-size: 1.25rem; font-weight: 600;">' + title + '</h3>' +
                        '<p style="font-family: var(--body-font-font-family); color: #6c757d; margin: 0 0 1rem 0; font-size: 0.9rem; line-height: 1.5;">' + description + '</p>' +
                        (price ? '<div style="font-weight: 600; color: #063AA8; font-size: 1.1rem;">' + price + '</div>' : '') +
                        '</div>' +
                        '</a>';
                }
            }

            // CSS für Hover-Effekte
            const responsiveCSS = '<style>' +
                '.product-card-' + module.id + ':hover h4, ' +
                '.product-card-' + module.id + ':hover p, ' +
                '.product-card-' + module.id + ':hover span, ' +
                '.product-card-' + module.id + ':hover div { ' +
                'color: ' + (props.hoverTextColor || 'white') + ' !important; ' +
                '}' +
                '</style>';

            // Grid-Container
            const gridColumns = getGridColumns(props.gridColumnsType || 'auto-fit-300');
            const productGrid = '<div class="showcase-grid-' + module.id + '" style="display: grid; grid-template-columns: ' + gridColumns + '; gap: ' + (props.contentGap || '2rem') + ';">' +
                productCards +
                '</div>';

            // Alles zusammenfügen
            const fullContent = responsiveCSS + headerContent + productGrid;

            // Template-Platzhalter ersetzen
            const beforeReplace = html.includes('{{showcaseContent}}');
            html = html.replace('{{showcaseContent}}', fullContent);
            const afterReplace = !html.includes('{{showcaseContent}}');

            console.log('🔄 Platzhalter-Ersetzung:', {
                foundPlaceholder: beforeReplace,
                replacedSuccessfully: afterReplace,
                contentLength: fullContent.length,
                productCardsLength: productCards.length
            });

            if (productCards.length === 0) {
                console.warn('⚠️ Keine Product Cards generiert!');
            }

            console.log('✅ Product Showcase erfolgreich verarbeitet');
            return html;
        }

        // ✨ FADE HOVER PRODUKT-ÜBERSICHT MODUL (KORRIGIERT) ✨
        function processKerberosProductFadeOverview(module, html) {
            console.log('🔥 Process-Funktion wird ausgeführt für:', module.name);
            const props = module.properties;

            // === HEADER CONTENT ===
            let headerContent = '';
            if (props.title) {
                let titleTemplate = '<h2 data-style="TITLE_STYLES">' + props.title + '</h2>';

                const titleStyles = [
                    'font-family: var(--heading-font-font-family)',
                    'font-size: var(--heading-2-size)',
                    'font-weight: var(--heading-font-font-weight)',
                    'line-height: var(--heading-font-line-height)',
                    'color: ' + props.titleColor,
                    'margin: 0 0 1rem 0'
                ].join('; ');

                titleTemplate = titleTemplate.replace('data-style="TITLE_STYLES"', 'style="' + titleStyles + '"');
                headerContent += titleTemplate;
            }

            if (props.showSubtitle === 'true' && props.subtitle) {
                let subtitleTemplate = '<p data-style="SUBTITLE_STYLES">' + props.subtitle + '</p>';

                const subtitleStyles = [
                    'font-family: var(--body-font-font-family)',
                    'font-size: var(--normal-text-size)',
                    'line-height: var(--body-font-line-height)',
                    'color: ' + props.subtitleColor,
                    'margin: 0 0 2rem 0'
                ].join('; ');

                subtitleTemplate = subtitleTemplate.replace('data-style="SUBTITLE_STYLES"', 'style="' + subtitleStyles + '"');
                headerContent += subtitleTemplate;
            }

            // === PRODUCT CARDS ===
            let productCards = '';
            for (let i = 1; i <= 3; i++) {
                const productTitle = props['product' + i + 'Title'];
                const productDescription = props['product' + i + 'Description'];
                const productImage = props['product' + i + 'Image'];
                const productLink = props['product' + i + 'Link'];
                const productButtonText = props['product' + i + 'ButtonText'];
                const isActive = props['product' + i + 'Active'] === 'true';

                if (productTitle && productDescription && isActive) {
                    let cardTemplate = '<div class="product-fade-card" data-style="CARD_STYLES">' +
                        '<div class="fade-overlay" data-style="OVERLAY_STYLES"></div>' +
                        '<div data-style="CARD_CONTENT_STYLES">';

                    // CSS für Karte, Overlay und Content
                    const cardStyles = [
                        'background: ' + props.cardBackground,
                        'border: 1px solid ' + props.cardBorder,
                        'border-radius: 12px',
                        'padding: 2rem',
                        'transition: all 0.3s ease',
                        'cursor: pointer',
                        'position: relative',
                        'overflow: hidden'
                    ].join('; ');

                    const overlayStyles = [
                        'position: absolute',
                        'top: 0',
                        'left: 0',
                        'right: 0',
                        'bottom: 0',
                        'background: linear-gradient(135deg, ' + props.primaryColor + '10, ' + props.primaryColor + '05)',
                        'opacity: 0',
                        'transition: opacity 0.3s ease',
                        'pointer-events: none'
                    ].join('; ');

                    const cardContentStyles = [
                        'position: relative',
                        'z-index: 2'
                    ].join('; ');

                    if (productImage) {
                        let imageTemplate = '<div data-style="IMAGE_CONTAINER_STYLES">' +
                            '<img src="' + productImage + '" alt="' + productTitle + '" data-style="IMAGE_STYLES">' +
                            '</div>';

                        const imageContainerStyles = [
                            'margin-bottom: 1.5rem',
                            'text-align: center'
                        ].join('; ');

                        const imageStyles = [
                            'max-width: 100%',
                            'height: 200px',
                            'object-fit: cover',
                            'border-radius: 8px'
                        ].join('; ');

                        imageTemplate = imageTemplate.replace('data-style="IMAGE_CONTAINER_STYLES"', 'style="' + imageContainerStyles + '"');
                        imageTemplate = imageTemplate.replace('data-style="IMAGE_STYLES"', 'style="' + imageStyles + '"');
                        cardTemplate += imageTemplate;
                    }

                    let productTitleTemplate = '<h3 data-style="PRODUCT_TITLE_STYLES">' + productTitle + '</h3>';
                    let productDescTemplate = '<p data-style="PRODUCT_DESC_STYLES">' + productDescription + '</p>';

                    const productTitleStyles = [
                        'font-family: var(--heading-font-font-family)',
                        'font-size: var(--heading-4-size)',
                        'font-weight: var(--heading-font-font-weight)',
                        'color: ' + props.textColor,
                        'margin: 0 0 1rem 0'
                    ].join('; ');

                    const productDescStyles = [
                        'font-family: var(--body-font-font-family)',
                        'font-size: var(--normal-text-size)',
                        'line-height: var(--body-font-line-height)',
                        'color: ' + props.subtitleColor,
                        'margin: 0 0 1.5rem 0'
                    ].join('; ');

                    productTitleTemplate = productTitleTemplate.replace('data-style="PRODUCT_TITLE_STYLES"', 'style="' + productTitleStyles + '"');
                    productDescTemplate = productDescTemplate.replace('data-style="PRODUCT_DESC_STYLES"', 'style="' + productDescStyles + '"');

                    cardTemplate += productTitleTemplate + productDescTemplate;

                    if (productButtonText && productLink) {
                        let buttonTemplate = '<a href="' + productLink + '" class="kerberos-btn kerberos-btn-' + module.id + '" data-style="PRODUCT_BUTTON_STYLES">' + productButtonText + '</a>';

                        const productButtonStyles = [
                            'font-family: var(--button-font-family)',
                            'font-weight: var(--button-font-weight)',
                            'background: ' + props.primaryColor,
                            'color: white',
                            'padding: 0.75rem 1.5rem',
                            'border-radius: 6px',
                            'text-decoration: none',
                            'display: inline-block',
                            'transition: all 0.3s ease'
                        ].join('; ');

                        buttonTemplate = buttonTemplate.replace('data-style="PRODUCT_BUTTON_STYLES"', 'style="' + productButtonStyles + '"');
                        cardTemplate += buttonTemplate;
                    }

                    cardTemplate += '</div></div>';

                    // Replace-Operationen für die Karte
                    cardTemplate = cardTemplate.replace('data-style="CARD_STYLES"', 'style="' + cardStyles + '"');
                    cardTemplate = cardTemplate.replace('data-style="OVERLAY_STYLES"', 'style="' + overlayStyles + '"');
                    cardTemplate = cardTemplate.replace('data-style="CARD_CONTENT_STYLES"', 'style="' + cardContentStyles + '"');

                    productCards += cardTemplate;
                }
            }

            // Fade Hover CSS mit Template-Platzhalter-Strategie
            let cssTemplate = '<style>FADE_OVERLAY_HOVER CARD_HOVER BUTTON_HOVER MOBILE_MEDIA</style>';

            // CSS-Regeln in Arrays aufbauen
            const fadeOverlayHover = [
                '.product-fade-card:hover .fade-overlay {',
                '    opacity: 1 !important;',
                '}'
            ].join('\n');

            const cardHover = [
                '.product-fade-card:hover {',
                '    transform: translateY(-5px) !important;',
                '    box-shadow: 0 12px 30px rgba(0,0,0,0.15) !important;',
                '}'
            ].join('\n');

            const buttonHover = [
                '.kerberos-btn-' + module.id + ':hover {',
                '    background: rgba(6,58,168,0.8) !important;',
                '    transform: translateY(-2px) !important;',
                '}'
            ].join('\n');

            const mobileMedia = [
                '@media (max-width: 768px) {',
                '    .kerberos-btn-' + module.id + ':hover {',
                '        transform: translateY(-4px) !important;',
                '    }',
                '}'
            ].join('\n');

            // Replace-Operationen
            const fadeHoverCSS = cssTemplate
                .replace('FADE_OVERLAY_HOVER', fadeOverlayHover)
                .replace('CARD_HOVER', cardHover)
                .replace('BUTTON_HOVER', buttonHover)
                .replace('MOBILE_MEDIA', mobileMedia);

            // === TEMPLATE ZUSAMMENBAUEN ===
            html = html.replace('{{headerContent}}', headerContent);
            html = html.replace('{{productCards}}', productCards);

            // CSS hinzufügen
            html = fadeHoverCSS + html;

            console.log('✅ Process-Funktion erfolgreich ausgeführt');
            return html;
        }

        function processKerberosFeatureBreaker(module, html) {
            console.log('🎯 Processing Feature Breaker (RICHTEXT-BASIERT FINAL):', module.id);
            
            const props = module.properties || {};
            
            // === UNIVERSELLE BUTTON-STYLES ===
            const buttonStyles = getUniversalButtonStyles({
                buttonStyleType: props.buttonStyleType || 'secondary',
                buttonPaddingType: props.buttonPaddingType || 'large',
                buttonRadiusType: props.buttonRadiusType || 'medium',
                buttonShadowType: props.buttonShadowType || 'strong',
                buttonBackground: props.buttonBackground,
                buttonColor: props.buttonColor
            });

            const secondaryButtonStyles = getUniversalButtonStyles({
                buttonStyleType: props.secondaryButtonStyleType || 'outline',
                buttonPaddingType: props.secondaryButtonPaddingType || 'large',
                buttonRadiusType: props.secondaryButtonRadiusType || 'medium', 
                buttonShadowType: props.secondaryButtonShadowType || 'none',
                buttonBackground: props.secondaryButtonBackground,
                buttonColor: props.secondaryButtonColor
            });

            // === CONTENT GENERIEREN (RICHTEXT-EDITOR-BASIERT) ===
            let breakerContent = '<div style="text-align: center; position: relative; z-index: 3;">';
            
            // Titel (RichText-Editor-Inhalt direkt verwenden)
            if (props.title) {
                breakerContent += `<div style="color: ${props.titleColor || '#FFFFFF'}; margin: 0 0 ${props.titleSpacing || '1rem'} 0;">${props.title}</div>`;
            }
            
            // Untertitel (RichText-Editor-Inhalt direkt verwenden)
            if (props.subtitle) {
                breakerContent += `<div style="color: ${props.subtitleColor || '#FFFFFF'}; margin: 0 0 ${props.subtitleSpacing || '1.5rem'} 0;">${props.subtitle}</div>`;
            }
            
            // Beschreibung (Standard-Textarea)
            if (props.description) {
                breakerContent += `<p style="font-family: var(--body-font-font-family); font-size: var(--normal-text-size); line-height: var(--body-font-line-height); color: ${props.descriptionColor || 'rgba(255,255,255,0.9)'}; margin: 0 0 ${props.descriptionSpacing || '2rem'} 0; max-width: 600px; margin-left: auto; margin-right: auto;">${props.description}</p>`;
            }
            
            // Button Container
            if (props.buttonText || (props.secondaryButtonText && props.showSecondaryButton === 'true')) {
                breakerContent += `<div style="display: flex; gap: ${props.buttonGap || '1rem'}; justify-content: center; flex-wrap: wrap; margin-top: ${props.buttonSpacing || '3rem'};">`;
                
                // Primary Button (PLATZHALTER-BASIERT)
                if (props.buttonText) {
                    breakerContent += `<a class="kerberos-btn kerberos-btn-${module.id}" href="${props.buttonLink || '#'}" style="display: inline-flex; align-items: center; gap: 0.75rem; font-family: var(--button-font-family); font-weight: var(--button-font-weight); background: {{buttonBackground}}; color: {{buttonColor}}; padding: {{buttonPadding}}; border-radius: {{buttonRadius}}; box-shadow: {{buttonShadow}}; border: {{buttonBorder}}; text-decoration: none; transition: all 0.3s ease; font-size: 1.1rem;">${props.buttonText}`;
                    
                    if (props.buttonIcon) {
                        breakerContent += `<span style="font-family: 'Font Awesome 5 Pro';">${props.buttonIcon}</span>`;
                    }
                    
                    breakerContent += `</a>`;
                }
                
                // Secondary Button (PLATZHALDER-BASIERT)
                if (props.secondaryButtonText && props.showSecondaryButton === 'true') {
                    breakerContent += `<a class="kerberos-btn-secondary kerberos-btn-${module.id}" href="${props.secondaryButtonLink || '#'}" style="display: inline-flex; align-items: center; gap: 0.75rem; font-family: var(--button-font-family); font-weight: var(--button-font-weight); background: {{secondaryButtonBackground}}; color: {{secondaryButtonColor}}; padding: {{secondaryButtonPadding}}; border-radius: {{secondaryButtonRadius}}; box-shadow: {{secondaryButtonShadow}}; border: {{secondaryButtonBorder}}; text-decoration: none; transition: all 0.3s ease; font-size: 1.1rem;">${props.secondaryButtonText}`;
                    
                    if (props.secondaryButtonIcon) {
                        breakerContent += `<span style="font-family: 'Font Awesome 5 Pro';">${props.secondaryButtonIcon}</span>`;
                    }
                    
                    breakerContent += `</a>`;
                }
                
                breakerContent += `</div>`;
            }
            
            // PRICING (RichText-Editor-Inhalt direkt verwenden)
            if (props.showPricing === 'true' && props.pricingText) {
                breakerContent += `<div style="margin-top: ${props.pricingSpacing || '2rem'}; color: ${props.pricingColor || '#FFFFFF'}; text-align: center;">${props.pricingText}</div>`;
            }
            
            // COUNTDOWN (Standard-Text)
            if (props.countdownActive === 'true') {
                breakerContent += `<p style="margin-top: ${props.countdownSpacing || '2rem'}; font-family: var(--body-font-font-family); font-size: var(--normal-text-size); color: ${props.countdownColor || '#FFFFFF'}; text-align: center; font-weight: 600; line-height: var(--body-font-line-height);">${props.countdownText || '⏰ Begrenzte Zeit verfügbar!'}</p>`;
            }
            
            breakerContent += '</div>';
            
            console.log('✅ Feature Breaker Content generiert (RichText-basiert Final)');
            
            // NUR CONTENT ERSETZEN, TEMPLATE BLEIBT INTAKT
            return html.replace('{{breakerContent}}', breakerContent);
        }
        
        function processKerberosWarningFacts(module, html) {
            const props = module.properties;

            // === DROPDOWN-WERTE KONVERTIEREN ===
            
            // 1. Background Opacity
            const opacityMap = {
                'none': '0',
                'light': '0.2',
                'medium': '0.4', 
                'strong': '0.6',
                'heavy': '0.8',
                'full': '1'
            };
            const backgroundOpacityValue = opacityMap[props.backgroundOpacityType] || '0.15';
            
            // 2. Button Padding
            const paddingMap = {
                'none': '0',
                'small': '0.5rem 1rem',
                'medium': '1rem 2rem',
                'large': '1.5rem 3rem',
                'extra-large': '2rem 4rem'
            };
            const buttonPaddingValue = paddingMap[props.buttonPaddingType] || '1rem 2rem';
            
            // 3. Button Radius
            const radiusMap = {
                'none': '0',
                'small': '4px',
                'medium': '8px',
                'large': '12px',
                'extra-large': '20px',
                'circle': '50%',
                'pill': '999px'
            };
            const buttonRadiusValue = radiusMap[props.buttonRadiusType] || '8px';
            
            // 4. Button Shadow
            const shadowMap = {
                'none': 'none',
                'light': '0 2px 8px rgba(6,58,168,0.1)',
                'medium': '0 4px 12px rgba(6,58,168,0.2)',
                'strong': '0 8px 24px rgba(6,58,168,0.3)',
                'extra-strong': '0 12px 32px rgba(6,58,168,0.4)'
            };
            const buttonShadowValue = shadowMap[props.buttonShadowType] || '0 4px 12px rgba(6,58,168,0.2)';
            
            // 5. Fact Number Size
            const factNumberSizeMap = {
                'heading-1': 'var(--heading-1-size)',
                'heading-2': 'var(--heading-2-size)', 
                'heading-3': 'var(--heading-3-size)',
                'heading-4': 'var(--heading-4-size)',
                'large-text': 'var(--large-text-size)'
            };
            const factNumberSizeVar = factNumberSizeMap[props.factNumberSizeType] || 'var(--heading-2-size)';
            
            // 6. Fact Text Size
            const factTextSizeMap = {
                'large-text': 'var(--large-text-size)',
                'normal-text': 'var(--normal-text-size)',
                'small-text': 'var(--small-text-size)',
                'normal-meta': 'var(--normal-meta-size)'
            };
            const factTextSizeVar = factTextSizeMap[props.factTextSizeType] || 'var(--normal-text-size)';

            // === SAMMLE AKTIVE FACTS ===
            const facts = [];
            for (let i = 1; i <= 6; i++) {
                const active = props['fact' + i + 'Active'];
                const number = props['fact' + i + 'Number'];
                const description = props['fact' + i + 'Description'];

                if (active === 'true' && number && description) {
                    facts.push({
                        number: number,
                        description: description
                    });
                }
            }

            // === GENERIERE FACTS HTML ===
            let factsHTML = '';
            if (facts.length > 0) {
                factsHTML = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: ' + props.factsGap + '; margin-top: ' + props.factsSpacing + ';">';

                facts.forEach(fact => {
                    factsHTML += '<div style="text-align: center; position: relative;">' +
                        '<div style="display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">' +
                            '<div style="width: 2px; height: 80px; background: ' + props.lineColor + '; margin-right: 1rem; border-radius: 2px;"></div>' +
                            '<div>' +
                                '<div style="font-size: ' + factNumberSizeVar + '; font-weight: var(--heading-font-font-weight); color: ' + props.factNumberColor + '; line-height: 1.2; margin-bottom: 0.5rem; font-family: var(--heading-font-font-family);">' + fact.number + '</div>' +
                                '<div style="font-size: ' + factTextSizeVar + '; color: ' + props.factTextColor + '; line-height: 1.4; font-family: var(--body-font-font-family);">' + fact.description + '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
                });

                factsHTML += '</div>';
            }

            // === ERSETZE ALLE PLATZHALTER ===
            return html
                .replace('{{factsContent}}', factsHTML)
                .replace('{{backgroundOpacityValue}}', backgroundOpacityValue)
                .replace('{{buttonPaddingValue}}', buttonPaddingValue)
                .replace('{{buttonRadiusValue}}', buttonRadiusValue) 
                .replace('{{buttonShadowValue}}', buttonShadowValue);
        }

        function processKerberosFeaturesGrid(module, html) {
            console.log('🎯 Processing Features Grid Module:', module.id);
            const props = module.properties;
            
            // === UNIVERSELLE BUTTON-STYLES ===
            const buttonStyles = getUniversalButtonStyles({
                buttonStyleType: props.buttonStyleType || 'primary',
                buttonPaddingType: props.ctaPaddingType || 'large',
                buttonRadiusType: props.ctaRadiusType || 'medium',
                buttonShadowType: props.ctaShadowType || 'medium',
                buttonBackground: props.ctaBackground,
                buttonColor: props.ctaColor
            });
            
            // === FALLBACK-WERTE FÜR ALLE PROPERTIES ===
            const fallbacks = {
                title: props.title || 'Unsere Leistungen',
                titleColor: props.titleColor || '#063AA8',
                subtitle: props.subtitle || 'Profitieren Sie von vollumfänglicher Betreuung',
                subtitleColor: props.subtitleColor || '#6c757d',
                backgroundColor: props.backgroundColor || '#FFFFFF',
                sectionSpacing: props.sectionSpacing || '6rem 0',
                titleSpacing: props.titleSpacing || '2rem',
                cardGap: props.cardGap || '2rem',
                cardMinWidth: props.cardMinWidth || '280px',
                cardShadowType: props.cardShadowType || '0 2px 8px rgba(0,0,0,0.1)',
                cardHoverTransformType: props.cardHoverTransformType || 'translateY(-8px)',
                cardHoverShadowType: props.cardHoverShadowType || '0 4px 12px rgba(6,58,168,0.2)',
                iconHoverTransformType: props.iconHoverTransformType || 'translateY(-4px)',
                overlayHoverOpacityType: props.overlayHoverOpacityType || '0',
                ctaSpacing: props.ctaSpacing || '3rem',
                ctaText: props.buttonText || 'Jetzt anfragen',
                ctaLink: props.buttonLink || '#',
                ctaBackground: buttonStyles.background,  // ✅ Universell
                ctaColor: buttonStyles.color,            // ✅ Universell
                ctaPaddingType: buttonStyles.padding,    // ✅ Universell
                ctaRadiusType: buttonStyles.borderRadius, // ✅ Universell
                ctaShadowType: buttonStyles.boxShadow,   // ✅ Universell
                ctaIcon: props.buttonIcon || '&#xf061;',
                buttonHoverBg: props.buttonHoverBg || 'rgba(6,58,168,0.8)',
                buttonHoverColor: props.buttonHoverColor || '#FFFFFF',
                buttonHoverTransformType: props.buttonHoverTransformType || 'translateY(-2px)',
                buttonHoverShadowType: props.buttonHoverShadowType || '0 8px 24px rgba(6,58,168,0.25)'
            };
            
            // === FEATURE CARDS GENERIEREN ===
            let featureCards = '';
            
            for (let i = 1; i <= 8; i++) {
                const isActive = props[`feature${i}Active`] === 'true';
                if (!isActive) continue;
                
                const feature = {
                    icon: props[`feature${i}Icon`] || '&#xf0ac;',
                    title: props[`feature${i}Title`] || `Feature ${i}`,
                    description: props[`feature${i}Description`] || `Beschreibung für Feature ${i}`,
                    color: props[`feature${i}IconColor`] || props[`feature${i}Color`] || '#063AA8',
                    background: props[`feature${i}Background`] || '#FFFFFF',
                    borderColor: props[`feature${i}BorderColor`] || '#DEE2E6'
                };
                
                featureCards += `
                    <div class="kerberos-feature-card" style="background: ${feature.background}; border: 1px solid ${feature.borderColor}; border-radius: 12px; padding: 2rem; transition: all 0.3s ease; cursor: default; position: relative; overflow: hidden;">
                        <div class="feature-overlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, ${feature.color}10, ${feature.color}05); opacity: 0; transition: opacity 0.3s ease; pointer-events: none;"></div>
                        <div style="position: relative; z-index: 2;">
                            <div class="feature-icon" style="font-family: 'Font Awesome 5 Pro'; font-size: 2.5rem; color: ${feature.color}; margin-bottom: 1.5rem; transition: all 0.3s ease;">${feature.icon}</div>
                            <h3 style="font-family: var(--heading-font-font-family); font-size: var(--heading-4-size); font-weight: var(--heading-font-font-weight); color: #212529; margin: 0 0 1rem 0;">${feature.title}</h3>
                            <p style="font-family: var(--body-font-font-family); font-size: var(--normal-text-size); line-height: var(--body-font-line-height); color: #6c757d; margin: 0;">${feature.description}</p>
                        </div>
                    </div>
                `;
            }
            
            // === ALLE PLATZHALTER ERSETZEN ===
            Object.keys(fallbacks).forEach(key => {
                const placeholder = `{{${key}}}`;
                html = html.replace(new RegExp(placeholder, 'g'), fallbacks[key]);
            });
            
            // === FEATURE CARDS EINSETZEN ===
            html = html.replace('{{featureCards}}', featureCards);
            
            console.log('✅ Features Grid erfolgreich verarbeitet');
            return html;
        }


        // Standard-Layout mit Bild links/rechts und Text
        function processKerberosImageText(module, html) {
            const props = module.properties;
            
            // Validierung
            if (!html) {
                const template = MODULE_TEMPLATES.find(t => t.id === module.templateId);
                html = template ? template.html : '<div>Template nicht gefunden</div>';
            }
            
            // Responsive CSS
            const responsiveCSS = `
                <style>
                    @media (max-width: 768px) {
                        .kerberos-image-text-${module.id} {
                            flex-direction: column !important;
                        }
                        .kerberos-image-text-${module.id} > div {
                            width: 100% !important;
                        }
                    }
                </style>
            `;
            
            return responsiveCSS + html;
        }

        // 2. MODERNE CALL-TO-ACTION
        function processKerberosCtaModern(module, html) {
            const props = module.properties;
            
            // Validierung
            if (!html) {
                const template = MODULE_TEMPLATES.find(t => t.id === module.templateId);
                html = template ? template.html : '<div>Template nicht gefunden</div>';
            }
            
            // Animation CSS
            const animationCSS = `
                <style>
                    .kerberos-cta-modern-${module.id} {
                        animation: fadeInUp 0.6s ease-out;
                    }
                    
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    @media (max-width: 768px) {
                        .kerberos-cta-modern-${module.id} {
                            padding: 3rem 1.5rem !important;
                        }
                    }
                </style>
            `;
            
            return animationCSS + html;
        }

        // 3. TESTIMONIALS CAROUSEL
        function processKerberosTestimonialsCarousel(module, html) {
            const props = module.properties;
            
            // ===== KRITISCHER FIX: HTML VALIDIERUNG =====
            if (!html || typeof html !== 'string') {
                const template = MODULE_TEMPLATES.find(t => t.id === module.templateId);
                if (template && template.html) {
                    html = template.html;
                    console.log('✅ HTML aus Template wiederhergestellt für Carousel');
                } else {
                    console.error('❌ Template HTML nicht gefunden für:', module.templateId);
                    return '<div style="padding: 2rem; background: #fee; color: #900;">❌ Template HTML fehlt für Testimonials Carousel</div>';
                }
            }
            
            let testimonialSlides = '';
            let navigationDots = '';
            let activeCount = 0;
            
            // Sammle aktive Testimonials
            for (let i = 1; i <= 6; i++) {
                const quote = props['testimonial' + i + 'Quote'] || props['testimonial' + i + 'Text'];  // Fallback auf Text
                const author = props['testimonial' + i + 'Author'];
                const position = props['testimonial' + i + 'Position'];
                const company = props['testimonial' + i + 'Company'];
                const image = props['testimonial' + i + 'Image'];
                const rating = parseInt(props['testimonial' + i + 'Rating']) || 5;
                const isActive = props['testimonial' + i + 'Active'] === 'true';
                
                if (quote && author && isActive) {
                    // Sterne generieren
                    let stars = '';
                    for (let s = 0; s < rating; s++) {
                        stars += '<span style="color: #ffc107; font-size: 1.5rem;">★</span>';
                    }
                    
                    // Slide HTML
                    const isFirst = activeCount === 0;
                    testimonialSlides += `
                        <div class="testimonial-slide-${module.id}" 
                            style="display: ${isFirst ? 'flex' : 'none'}; 
                                    flex-direction: column; 
                                    align-items: center; 
                                    text-align: center; 
                                    padding: 3rem 2rem; 
                                    min-height: 400px; 
                                    justify-content: center;">
                            ${image ? `
                                <img src="${image}" 
                                    style="width: 80px; 
                                            height: 80px; 
                                            border-radius: 50%; 
                                            object-fit: cover; 
                                            margin-bottom: 2rem; 
                                            border: 4px solid ${props.accentColor || '#063AA8'};">
                            ` : ''}
                            
                            <div style="margin-bottom: 2rem;">
                                ${stars}
                            </div>
                            
                            <blockquote style="font-size: 1.25rem; 
                                            color: ${props.quoteColor || '#333'}; 
                                            font-style: italic; 
                                            line-height: 1.8; 
                                            margin: 0 0 2rem 0; 
                                            max-width: 700px;">
                                "${quote}"
                            </blockquote>
                            
                            <div style="font-weight: 700; 
                                    color: ${props.authorColor || '#063AA8'}; 
                                    font-size: 1.1rem; 
                                    margin-bottom: 0.5rem;">
                                ${author}
                            </div>
                            
                            <div style="color: ${props.positionColor || '#6c757d'}; 
                                    font-size: 0.95rem;">
                                ${position}${company ? ` • ${company}` : ''}
                            </div>
                        </div>
                    `;
                    
                    // Navigation Dot
                    navigationDots += `
                        <button onclick="window.showTestimonialSlide_${module.id}(${activeCount})" 
                                class="nav-dot-${module.id}" 
                                style="width: 12px; 
                                    height: 12px; 
                                    border-radius: 50%; 
                                    border: 2px solid ${props.dotColor || '#063AA8'}; 
                                    background: ${isFirst ? props.dotColor || '#063AA8' : 'transparent'}; 
                                    cursor: pointer; 
                                    transition: all 0.3s ease; 
                                    padding: 0; 
                                    margin: 0 0.5rem;">
                        </button>
                    `;
                    
                    activeCount++;
                }
            }
            
            // Falls keine aktiven Testimonials
            if (activeCount === 0) {
                testimonialSlides = `
                    <div style="text-align: center; padding: 4rem 2rem; color: #6c757d;">
                        <p style="font-size: 1.2rem; margin: 0;">Keine Testimonials konfiguriert</p>
                        <p style="font-size: 0.9rem; margin: 0.5rem 0 0 0;">Füge Testimonials im Property Panel hinzu</p>
                    </div>
                `;
            }
            
            // Navigation Buttons
            const prevButton = activeCount > 1 ? `
                <button onclick="window.prevTestimonial_${module.id}()" 
                        style="position: absolute; 
                            left: 1rem; 
                            top: 50%; 
                            transform: translateY(-50%); 
                            background: ${props.buttonBackground || '#063AA8'}; 
                            color: white; 
                            border: none; 
                            width: 50px; 
                            height: 50px; 
                            border-radius: 50%; 
                            cursor: pointer; 
                            font-size: 1.5rem; 
                            display: flex; 
                            align-items: center; 
                            justify-content: center; 
                            box-shadow: 0 4px 12px rgba(0,0,0,0.15); 
                            transition: all 0.3s ease; 
                            z-index: 10;">
                    ‹
                </button>
            ` : '';
            
            const nextButton = activeCount > 1 ? `
                <button onclick="window.nextTestimonial_${module.id}()" 
                        style="position: absolute; 
                            right: 1rem; 
                            top: 50%; 
                            transform: translateY(-50%); 
                            background: ${props.buttonBackground || '#063AA8'}; 
                            color: white; 
                            border: none; 
                            width: 50px; 
                            height: 50px; 
                            border-radius: 50%; 
                            cursor: pointer; 
                            font-size: 1.5rem; 
                            display: flex; 
                            align-items: center; 
                            justify-content: center; 
                            box-shadow: 0 4px 12px rgba(0,0,0,0.15); 
                            transition: all 0.3s ease; 
                            z-index: 10;">
                    ›
                </button>
            ` : '';
            
            // Carousel Container
            const carouselHTML = `
                <div style="position: relative; 
                            background: ${props.backgroundColor || 'white'}; 
                            border-radius: ${props.borderRadius || '12px'}; 
                            box-shadow: ${props.boxShadow || '0 4px 20px rgba(0,0,0,0.1)'}; 
                            overflow: hidden;">
                    ${prevButton}
                    ${testimonialSlides}
                    ${nextButton}
                    
                    ${activeCount > 1 ? `
                        <div style="display: flex; 
                                justify-content: center; 
                                align-items: center; 
                                padding: 2rem 0 1rem 0; 
                                gap: 0.5rem;">
                            ${navigationDots}
                        </div>
                    ` : ''}
                </div>
            `;
            
            // JavaScript für Carousel-Funktionalität (nur wenn mehrere Slides)
            const carouselJS = activeCount > 1 ? `
                <script>
                (function() {
                    if (window.testimonialCarousel_${module.id}_initialized) return;
                    window.testimonialCarousel_${module.id}_initialized = true;
                    
                    let currentSlide_${module.id} = 0;
                    const totalSlides_${module.id} = ${activeCount};
                    
                    window.showTestimonialSlide_${module.id} = function(index) {
                        const slides = document.querySelectorAll('.testimonial-slide-${module.id}');
                        const dots = document.querySelectorAll('.nav-dot-${module.id}');
                        
                        slides.forEach((slide, i) => {
                            slide.style.display = i === index ? 'flex' : 'none';
                        });
                        
                        dots.forEach((dot, i) => {
                            dot.style.background = i === index ? '${props.dotColor || '#063AA8'}' : 'transparent';
                        });
                        
                        currentSlide_${module.id} = index;
                    };
                    
                    window.nextTestimonial_${module.id} = function() {
                        const nextIndex = (currentSlide_${module.id} + 1) % totalSlides_${module.id};
                        window.showTestimonialSlide_${module.id}(nextIndex);
                    };
                    
                    window.prevTestimonial_${module.id} = function() {
                        const prevIndex = (currentSlide_${module.id} - 1 + totalSlides_${module.id}) % totalSlides_${module.id};
                        window.showTestimonialSlide_${module.id}(prevIndex);
                    };
                    
                    // Auto-play (optional)
                    ${props.autoPlay === 'true' ? `
                        setInterval(function() {
                            window.nextTestimonial_${module.id}();
                        }, ${props.autoPlayInterval || '5000'});
                    ` : ''}
                })();
                </script>
            ` : '';
            
            // Responsive CSS
            const responsiveCSS = `
                <style>
                    @media (max-width: 768px) {
                        .testimonial-slide-${module.id} {
                            padding: 2rem 1rem !important;
                            min-height: 350px !important;
                        }
                        .testimonial-slide-${module.id} blockquote {
                            font-size: 1.1rem !important;
                        }
                        button[onclick*="Testimonial_${module.id}"] {
                            width: 40px !important;
                            height: 40px !important;
                            font-size: 1.2rem !important;
                        }
                    }
                </style>
            `;
            
            // ===== KRITISCHER FIX: SICHERE REPLACEMENT =====
            if (html.includes('{{carouselContent}}')) {
                html = html.replace('{{carouselContent}}', carouselHTML);
            } else {
                console.warn('⚠️ {{carouselContent}} Platzhalter nicht gefunden, füge Content am Ende hinzu');
                html = html + carouselHTML;
            }
            
            return responsiveCSS + html + carouselJS;
        }

    


// Am Ende: Namespace erstellen
window.ModuleProcessors = {
    processKerberosApiHeroWithText,
    processKerberosTextButtonRichtextFixed,
    processKerberosHeroAdvancedRichtext,
    processKerberosFAQ,
    processKerberosFaqAccordion,
    processKerberosSvgHero,
    processKerberosTripleSolution,
    processKerberosTestimonials,
    processKerberosTeamGalleryFixed,
    processKerberosProductOverview,
    processKerberosDashboard,
    processKerberosDashboardShowcase,
    processKerberosComplianceDashboard,
    processKerberosTestimonialsPro,
    processKerberosTextButtonRichtext,
    processKerberosFeatures,
    processKerberosTimeline,
    processKerberosFeaturesModern,
    processKerberosApiDocumentation,
    processKerberosPricingInteractive,
    processKerberosNewsletterModern,
    processKerberosStats,
    processKerberosStatsWithHover,
    processKerberosProductShowcase,
    processKerberosIntegrationsGridModern,
    processKerberosIntegrationsGrid,
    processKerberosFeatureComparisonExtended,
    processKerberosPricingResponseExtended,
    processChallengeSolutionAutoHide,
    processModuleHTML,
    processStatsModule,
    processTeamGalleryModule,
    processKerberosTeamGallery,
    processProductOverviewModule,
    processImageTextModule,
    processUniversalModule,
    processUniversalPlaceholders,
    processTypeMappingsFallback,
    processImportedKerberosModule,
    processUniversalLayout,
    processKerberosApiEndpoints,
    processKerberosCompanyPresentation,
    processKerberosBenefits,
    processKerberosHeroAdvanced,
    processSvgHero,
    processFeaturesGrid,
    processUniversalTypeMappings,
    processTestimonialsCarousel,
    processLegacyImageOptimization,
    processUniversalImageProperties,
    processKerberosImageTextModern,
    processKerberosGuideFlow,
    processKerberosSolutionsOverview,
    processKerberosProductShowcase,
    processKerberosProductFadeOverview,
    processKerberosFeatureBreaker,
    processKerberosWarningFacts,
    processKerberosFeaturesGrid
};

// Für Rückwärtskompatibilität: Alle Funktionen global verfügbar
Object.assign(window, window.ModuleProcessors);

console.log('🔧 Module Processors geladen:', Object.keys(window.ModuleProcessors).length, 'Funktionen');

window.processKerberosSolutionTripleRichtext = processKerberosTripleSolution;

console.log('✅ Processor-Funktionen geladen: Image-Text, CTA-Modern, Testimonials-Carousel');