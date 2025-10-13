        const MODULE_TEMPLATES = [
            {
                "id": "kerberos-guide-flow",
                "name": "Interaktiver Guide-Flow",
                "category": "Interactive & Media",
                "description": "Moderner, responsiver Guide-Flow mit automatischer Slideshow und Hotspot-Interaktion.",
                "html": "<section style=\"padding: {{sectionSpacing}}; background: {{backgroundColor}}; margin: 0;\" class=\"kerberos-guide-{{templateId}}\"><div style=\"max-width: 100%; margin: 0 auto; padding: 0;\">{{content}}</div></section>",
                "properties": {
                    // === HAUPTINHALTE ===
                    "title": "Produkttour",
                    "subtitle": "Entdecken Sie alle Funktionen unserer Plattform in wenigen Schritten",
                    "titleColor": "#063AA8",
                    "subtitleColor": "#6c757d",

                    // === LAYOUT & DESIGN ===
                    "backgroundColor": "#F8F9FA",
                    "primaryColor": "#063AA8",
                    "secondaryColor": "#009CE6",
                    "sectionSpacing": "5rem 0",

                    // === FUNKTIONALITÄT ===
                    "stepsActive": "5",
                    "showHeader": "true",
                    "showStepsBadge": "true",
                    "autoAdvance": "true",
                    "autoAdvanceInterval": "4000",
                    "stepsIcon": "&#xf04b;",

                    // === DEVICE & DARSTELLUNG ===
                    "deviceType": "desktop",
                    "customWidth": "800px",
                    "customHeight": "400px",

                    // === STEPS 1-10 (Komplett) ===
                    "step1Image": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
                    "step1Title": "Willkommen bei Kerberos",
                    "step1Description": "Beginnen Sie Ihre Reise mit unserer innovativen Compliance-Plattform.",
                    "step1HotspotX": "30",
                    "step1HotspotY": "40",
                    "step1Icon": "&#xf135;",

                    "step2Image": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop",
                    "step2Title": "Intuitive Navigation",
                    "step2Description": "Finden Sie sich mühelos in unserem benutzerfreundlichen Interface zurecht.",
                    "step2HotspotX": "60",
                    "step2HotspotY": "30",
                    "step2Icon": "&#xf14e;",

                    "step3Image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop",
                    "step3Title": "Leistungsstarke Features",
                    "step3Description": "Nutzen Sie unsere fortschrittlichen Tools für maximale Effizienz.",
                    "step3HotspotX": "45",
                    "step3HotspotY": "60",
                    "step3Icon": "&#xf085;",

                    "step4Image": "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop",
                    "step4Title": "Personalisiertes Dashboard",
                    "step4Description": "Behalten Sie alle wichtigen Metriken im Überblick.",
                    "step4HotspotX": "50",
                    "step4HotspotY": "25",
                    "step4Icon": "&#xf201;",

                    "step5Image": "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
                    "step5Title": "Tour abgeschlossen",
                    "step5Description": "Herzlichen Glückwunsch! Sie sind bereit durchzustarten.",
                    "step5HotspotX": "50",
                    "step5HotspotY": "50",
                    "step5Icon": "&#xf058;",

                    "step6Image": "",
                    "step6Title": "Erweiterte Funktionen",
                    "step6Description": "Entdecken Sie weitere Möglichkeiten unserer Plattform.",
                    "step6HotspotX": "40",
                    "step6HotspotY": "30",
                    "step6Icon": "&#xf0ad;",

                    "step7Image": "",
                    "step7Title": "Integration",
                    "step7Description": "Verbinden Sie Kerberos mit Ihren bestehenden Systemen.",
                    "step7HotspotX": "70",
                    "step7HotspotY": "50",
                    "step7Icon": "&#xf0c1;",

                    "step8Image": "",
                    "step8Title": "Reporting",
                    "step8Description": "Erstellen Sie detaillierte Reports und Analysen.",
                    "step8HotspotX": "35",
                    "step8HotspotY": "65",
                    "step8Icon": "&#xf1fe;",

                    "step9Image": "",
                    "step9Title": "Support",
                    "step9Description": "Unser Team steht Ihnen jederzeit zur Verfügung.",
                    "step9HotspotX": "60",
                    "step9HotspotY": "40",
                    "step9Icon": "&#xf4ad;",

                    "step10Image": "",
                    "step10Title": "Erfolg",
                    "step10Description": "Erreichen Sie Ihre Compliance-Ziele erfolgreich.",
                    "step10HotspotX": "50",
                    "step10HotspotY": "30",
                    "step10Icon": "&#xf091;"
                },
                "customized": true
            },

            {
                "id": "kerberos-benefits",
                "name": "Benefits mit Icons",
                "category": "Content & Services", 
                "description": "Flexible Benefits-Darstellung mit Icons und variablen Grid-Layouts",
                "html": `<style>
                    /* Benefits Module Universelle Hover-Effekte */
                    .kerberos-module-{{templateId}} .kerberos-benefit-card {
                        transition: all 0.3s ease !important;
                        cursor: default !important;
                    }
                    
                    .kerberos-module-{{templateId}} .kerberos-benefit-card:hover {
                        transform: translateY(-4px) !important;
                        box-shadow: 0 8px 24px rgba(6,58,168,0.15) !important;
                        background: rgba(6,58,168,0.05) !important;
                    }
                    
                    /* Mobile Responsive */
                    @media (max-width: 768px) {
                        .kerberos-module-{{templateId}} .benefits-grid {
                            grid-template-columns: 1fr !important;
                            gap: 1.5rem !important;
                        }
                    }
                    
                    @media (max-width: 480px) {
                        .kerberos-module-{{templateId}} .benefits-grid {
                            grid-template-columns: 1fr !important;
                            gap: 1rem !important;
                        }
                    }
                </style>
                <section style="padding: {{sectionSpacing}}; background: {{backgroundColor}};" class="kerberos-module-{{templateId}}">
                    <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                        <div style="text-align: center; margin-bottom: {{titleSpacing}};">
                            <div class="title-wrapper" style="color: {{titleColor}}; margin: 0;">{{titleContent}}</div>
                            <p style="font-family: var(--body-font-font-family); font-size: var(--normal-text-size); line-height: var(--body-font-line-height); color: {{subtitleColor}}; margin: 1rem 0 0 0;">{{subtitle}}</p>
                        </div>
                        <div class="benefits-grid" style="display: grid; grid-template-columns: repeat({{gridColumns}}, 1fr); gap: {{benefitsGap}};">
                            {{benefitItems}}
                        </div>
                        <div style="text-align: center; margin-top: {{primaryButtonSpacing}};">
                            <a href="{{primaryButtonLink}}" target="{{primaryButtonTarget}}" style="font-family: var(--button-font-family); font-weight: var(--button-font-weight); background: {{primaryButtonBackground}}; color: {{primaryButtonColor}}; padding: {{primaryButtonPadding}}; border-radius: {{primaryButtonRadius}}; text-decoration: none; display: inline-block; transition: all 0.3s ease;">{{primaryButtonText}}</a>
                        </div>
                    </div>
                </section>`,
                "properties": {
                    "titleContent": "<h2>Ihre Vorteile</h2>",
                    "titleColor": "#063AA8",
                    "titleSpacing": "1rem",
                    "subtitle": "So profitieren Sie von den Datenschutz-Leistungen von Kerberos.",
                    "subtitleColor": "#6c757d",
                    "backgroundColor": "#FFFFFF",
                    "sectionSpacing": "2rem 0",
                    "benefitsGap": "2rem",
                    "gridColumns": "4",
                    "cardPadding": "2rem",
                    "cardBackground": "#FFFFFF",
                    "cardBorder": "#E9ECEF",
                    "cardRadius": "12px",
                    "cardShadow": "0 4px 12px rgba(6,58,168,0.08)",
                    "showIcons": "true",
                    "iconSize": "3rem",
                    "iconSpacing": "1.5rem",
                    "titleSize": "var(--heading-4-size)",
                    "descriptionSize": "var(--normal-text-size)",
                    "benefit1Title": "Vertrauen",
                    "benefit1Description": "Erfüllen Sie das Bedürfnis Ihrer Kund:innen nach Datenschutz.",
                    "benefit1Icon": "&#xf505;",
                    "benefit1IconColor": "#063AA8",
                    "benefit1TitleColor": "#212529",
                    "benefit1DescriptionColor": "#6c757d",
                    "benefit1Active": "true",
                    "benefit2Title": "Sicherheit",
                    "benefit2Description": "Schützen Sie sich vor hohen Bußgeldern aufgrund von DSGVO-Verstößen.",
                    "benefit2Icon": "&#xf132;",
                    "benefit2IconColor": "#009CE6",
                    "benefit2TitleColor": "#212529",
                    "benefit2DescriptionColor": "#6c757d",
                    "benefit2Active": "true",
                    "benefit3Title": "Übersichtlichkeit",
                    "benefit3Description": "Profitieren Sie von einem Ansprechpartner für Ihre gesamte DSGVO-Compliance.",
                    "benefit3Icon": "&#xf058;",
                    "benefit3IconColor": "#B265E9",
                    "benefit3TitleColor": "#212529",
                    "benefit3DescriptionColor": "#6c757d",
                    "benefit3Active": "true",
                    "benefit4Title": "Effizienz",
                    "benefit4Description": "Setzen Sie Datenschutz-Vorgaben schnell und effektiv in die Praxis um.",
                    "benefit4Icon": "&#xf201;",
                    "benefit4IconColor": "#EF8646",
                    "benefit4TitleColor": "#212529",
                    "benefit4DescriptionColor": "#6c757d",
                    "benefit4Active": "true",
                    "benefit5Title": "Rechtssicherheit",
                    "benefit5Description": "100% konforme Umsetzung aller aktuellen Gesetze und Vorschriften.",
                    "benefit5Icon": "&#xf0e3;",
                    "benefit5IconColor": "#28a745",
                    "benefit5TitleColor": "#212529",
                    "benefit5DescriptionColor": "#6c757d",
                    "benefit5Active": "false",
                    "benefit6Title": "Kosteneffizienz",
                    "benefit6Description": "Optimale Kosten-Nutzen-Verhältnis durch automatisierte Prozesse.",
                    "benefit6Icon": "&#xf51e;",
                    "benefit6IconColor": "#dc3545",
                    "benefit6TitleColor": "#212529",
                    "benefit6DescriptionColor": "#6c757d",
                    "benefit6Active": "false",
                    
                    // === BUTTON SYSTEM (Bereinigt) ===
                    "showPrimaryButton": "true",
                    "primaryButtonText": "Jetzt kostenlos beraten lassen",
                    "primaryButtonLink": "/unternehmen/kontakt",
                    "primaryButtonBackground": "#063AA8",
                    "primaryButtonColor": "#FFFFFF",
                    "primaryButtonPaddingType": "medium",
                    "primaryButtonRadiusType": "medium",
                    "primaryButtonSpacing": "3rem",
                    "primaryButtonTarget": "_self"
                }
            },
            {
                id: 'kerberos-warning-facts',
                name: 'Warnungs-Modul mit Fakten',
                category: 'Content & Services',
                description: 'Aufmerksamkeitsstarkes Modul mit Hauptmeldung, Statistiken und Call-to-Action',
                html: `<style>
                    /* Kerberos Button Hover Effects - Modul {{templateId}} */
                    .kerberos-btn-{{templateId}} {
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                        cursor: pointer !important;
                        position: relative !important;
                        overflow: hidden !important;
                    }
                    .kerberos-btn-{{templateId}}:hover {
                        background: rgba(6,58,168,0.8) !important;
                        color: #FFFFFF !important;
                        transform: translateY(-2px) !important;
                        box-shadow: 0 8px 24px rgba(6,58,168,0.25) !important;
                    }
                    .kerberos-btn-{{templateId}}:active {
                        transform: translateY(0px) !important;
                        transition: all 0.1s ease !important;
                    }

                    /* Fallback für Buttons ohne spezifische Klasse */
                    .kerberos-module-{{templateId}} a[style*="background"]:not(.kerberos-btn):hover {
                        filter: brightness(1.1) saturate(1.1) !important;
                        transform: translateY(-1px) !important;
                        box-shadow: 0 6px 20px rgba(6,58,168,0.2) !important;
                        transition: all 0.3s ease !important;
                    }

                    /* RESPONSIVE STYLES FÜR WARNUNGS-MODUL */
                    @media (max-width: 768px) {
                        .kerberos-warning-module h2 {
                            font-size: 1.5rem !important;
                            line-height: 1.3 !important;
                        }
                        
                        .kerberos-warning-module h3 {
                            font-size: 1.2rem !important;
                        }
                        
                        .kerberos-warning-module .background-overlay {
                            opacity: 0.05 !important;
                        }
                    }

                    @media (max-width: 480px) {
                        .kerberos-warning-module div[style*="grid-template-columns"] {
                            grid-template-columns: 1fr !important;
                            gap: 1.5rem !important;
                        }
                        
                        .kerberos-warning-module div[style*="height: 80px"] {
                            height: 60px !important;
                        }
                    }
                    </style>
                    <section style="padding: {{sectionSpacing}}; background: {{backgroundColor}}; position: relative; overflow: hidden;" class="kerberos-warning-module kerberos-module-{{templateId}}">
                        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: url('{{backgroundImage}}') center/cover; opacity: {{backgroundOpacityValue}};" class="background-overlay"></div>
                        <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; position: relative; z-index: 2;">
                            <div style="text-align: center; margin-bottom: {{contentGap}};">
                                <h2 style="font-family: var(--heading-font-font-family); font-size: var(--heading-2-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: {{titleColor}}; margin-bottom: {{titleSpacing}}; text-align: center;">
                                    {{titleContent}}
                                </h2>
                                <h3 style="font-family: var(--heading-font-font-family); font-size: var(--heading-3-size); font-weight: var(--heading-font-font-weight); color: {{subtitleColor}}; margin-bottom: {{subtitleSpacing}}; text-align: center;">
                                    {{subtitleContent}}
                                </h3>
                                <div style="margin: {{primaryButtonSpacing}}; text-align: center;">
                                    <a class="kerberos-btn kerberos-btn-{{templateId}}" href="{{primaryButtonLink}}" style="display: inline-block; font-family: var(--button-font-family); font-weight: var(--button-font-weight); background: {{primaryButtonBackground}}; color: {{primaryButtonColor}}; padding: {{primaryButtonPadding}}; border-radius: {{primaryButtonRadius}}; text-decoration: none; border: none; cursor: pointer; transition: all 0.3s ease; box-shadow: {{primaryButtonShadow}};">{{primaryButtonText}}</a>
                                </div>
                            </div>
                            
                            {{factsContent}}
                        </div>
                    </section>`,
                properties: {
                    // === TITEL (RichText) ===
                    titleContent: '<span style="background: linear-gradient(180deg, transparent 70%, rgba(138, 43, 226, 0.4) 70%); padding: 0 0.2rem;">Wissen Sie nicht,</span><br><span style="background: linear-gradient(180deg, transparent 70%, rgba(138, 43, 226, 0.4) 70%); padding: 0 0.2rem;">was Sie tun müssen?</span>',
                    titleColor: "#FFFFFF",
                    titleSpacing: "1rem",
                    
                    // === UNTERTITEL (RichText) ===
                    subtitleContent: '<strong>Sprechen Sie jetzt mit unseren Expert:innen.</strong>',
                    subtitleColor: "#FFFFFF",
                    subtitleSpacing: "2rem",
                    
                    // === PRIMARY BUTTON ===
                    primaryButtonText: "Kostenfreie Beratung",
                    primaryButtonLink: "/unternehmen/kontakt",
                    primaryButtonBackground: "rgba(255,255,255,0.9)",
                    primaryButtonColor: "#063AA8",
                    primaryButtonPaddingType: "medium",
                    primaryButtonRadiusType: "medium",
                    primaryButtonShadowType: "medium",
                    primaryButtonSpacing: "2rem 0",
                    
                    // === BACKGROUND ===
                    backgroundColor: "#1a1a1a",
                    backgroundImage: "",
                    backgroundOpacityType: "light",
                    
                    // === LAYOUT & SPACING ===
                    sectionSpacing: "6rem 0",
                    contentGap: "3rem",
                    factsSpacing: "4rem",
                    factsGap: "2rem",
                    
                    // === FACTS STYLING ===
                    lineColor: "#8A2BE2",
                    factNumberSizeType: "heading-2",
                    factNumberColor: "#009CE6",
                    factTextSizeType: "normal-text",
                    factTextColor: "#FFFFFF",
                    
                    // === FACTS CONTENT (1-6) ===
                    fact1Number: "100+ Mrd. €",
                    fact1Description: "Werden pro Jahr in Deutschland gewaschen",
                    fact1Active: "true",
                    fact2Number: "30+ Änderungen",
                    fact2Description: "im Geldwäschegesetz seit 2007",
                    fact2Active: "true",
                    fact3Number: "Bis zu 1 Mio. € Bußgeld",
                    fact3Description: "bei Verstößen gegen das Geldwäschegesetz möglich",
                    fact3Active: "true",
                    fact4Number: "95% der Unternehmen",
                    fact4Description: "haben keine vollständige Compliance-Strategie",
                    fact4Active: "false",
                    fact5Number: "24/7 Überwachung",
                    fact5Description: "durch Aufsichtsbehörden möglich",
                    fact5Active: "false",
                    fact6Number: "50+ Prüfpunkte",
                    fact6Description: "müssen regelmäßig kontrolliert werden",
                    fact6Active: "false"
                }
            },
            {
                "id": "kerberos-hero-advanced",
                "name": "Hero mit Bild & Icon",
                "category": "Hero & Headers",
                "description": "Hero-Bereich mit anpassbarem Bild und Icon",
                "html": `<section style="{{responsiveBackground}}; color: white; padding: {{sectionSpacing}}; text-align: center; margin-bottom: 0; position: relative;" class="kerberos-module-{{moduleId}}">
                    {{overlayElements}}
                    <div style="position: relative; z-index: 3; max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                        {{iconElement}}
                        <h1 style="font-family: var(--heading-font-font-family); font-size: var(--heading-1-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: {{titleColor}}; margin-bottom: {{titleSpacing}};">{{titleContent}}</h1>
                        <p style="font-family: var(--body-font-font-family); font-size: var(--large-text-size); line-height: var(--body-font-line-height); opacity: 0.9; color: {{subtitleColor}}; margin-bottom: {{textSpacing}};">{{subtitleContent}}</p>
                        <a class="kerberos-btn kerberos-btn-{{moduleId}}" href="{{primaryButtonLink}}" style="font-family: var(--button-font-family); font-weight: var(--button-font-weight); background: {{primaryButtonBackground}}; color: {{primaryButtonColor}}; padding: {{primaryButtonPadding}}; border-radius: {{primaryButtonRadius}}; text-decoration: none; display: inline-block; border: 2px solid rgba(255,255,255,0.3); transition: all 0.3s ease;">{{primaryButtonText}}</a>
                    </div>
                </section>`,
                "properties": {
                    // === CONTENT ===
                    "titleContent": "Compliance & Security Excellence",
                    "titleColor": "#FFFFFF",
                    "subtitleContent": "Professionelle Lösungen für Ihre Compliance-Anforderungen",
                    "subtitleColor": "#FFFFFF",
                    
                    // === PRIMARY BUTTON ===
                    "primaryButtonText": "Jetzt Beratung anfragen",
                    "primaryButtonColor": "#FFFFFF",
                    "primaryButtonLink": "#kontakt",
                    "primaryButtonStyleType": "primary",
                    "primaryButtonPaddingType": "medium",
                    "primaryButtonRadiusType": "medium",
                    
                    // === ICON ===
                    "iconClass": "",
                    "iconColor": "#FFFFFF",
                    "iconSizeType": "large",
                    
                    // === BACKGROUND ===
                    "backgroundImage": "",
                    "backgroundColor": "linear-gradient(135deg, #063AA8, #009CE6)",
                    "backgroundType": "gradient",
                    "backgroundGradientType": "kerberos-primary",
                    
                    // === OVERLAY SYSTEM ===
                    "overlayActive": "false",
                    "overlayColor": "#000000",
                    "overlayOpacityType": "medium",
                    "blueOverlayActive": "true",
                    "blueOverlayColor": "#063AA8", 
                    "blueOverlayOpacityType": "light",
                    
                    // === SPACING ===
                    "sectionSpacing": "6rem 0",
                    "iconSpacing": "1.5rem",
                    "titleSpacing": "1rem",
                    "textSpacing": "2rem"
                }
            },
            {
                "id": "kerberos-hero-advanced",
                "name": "Hero mit Bild & Icon",
                "category": "Hero & Headers",
                "description": "Hero-Bereich mit anpassbarem Bild und Icon",
                "html": `<section style="{{responsiveBackground}}; color: white; padding: {{sectionSpacing}}; text-align: center; margin-bottom: 0; position: relative;" class="kerberos-module-{{moduleId}}">
                    {{overlayElements}}
                    <div style="position: relative; z-index: 3; max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                        {{iconElement}}
                        <h1 style="font-family: var(--heading-font-font-family); font-size: var(--heading-1-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: {{titleColor}}; margin-bottom: {{titleSpacing}};">{{titleContent}}</h1>
                        <p style="font-family: var(--body-font-font-family); font-size: var(--large-text-size); line-height: var(--body-font-line-height); opacity: 0.9; color: {{subtitleColor}}; margin-bottom: {{textSpacing}};">{{subtitleContent}}</p>
                        <a class="kerberos-btn kerberos-btn-{{moduleId}}" href="{{primaryButtonLink}}" style="font-family: var(--button-font-family); font-weight: var(--button-font-weight); background: {{primaryButtonBackground}}; color: {{primaryButtonColor}}; padding: {{primaryButtonPadding}}; border-radius: {{primaryButtonRadius}}; text-decoration: none; display: inline-block; border: 2px solid rgba(255,255,255,0.3); transition: all 0.3s ease;">{{primaryButtonText}}</a>
                    </div>
                </section>`,
                "properties": {
                    // === CONTENT ===
                    "titleContent": "Compliance & Security Excellence",
                    "titleColor": "#FFFFFF",
                    "subtitleContent": "Professionelle Lösungen für Ihre Compliance-Anforderungen",
                    "subtitleColor": "#FFFFFF",
                    
                    // === PRIMARY BUTTON ===
                    "primaryButtonText": "Jetzt Beratung anfragen",
                    "primaryButtonColor": "#FFFFFF",
                    "primaryButtonLink": "#kontakt",
                    "primaryButtonStyleType": "primary",
                    "primaryButtonPaddingType": "medium",
                    "primaryButtonRadiusType": "medium",
                    
                    // === ICON ===
                    "iconClass": "",
                    "iconColor": "#FFFFFF",
                    "iconSizeType": "large",
                    
                    // === BACKGROUND ===
                    "backgroundImage": "",
                    "backgroundColor": "linear-gradient(135deg, #063AA8, #009CE6)",
                    "backgroundType": "gradient",
                    "backgroundGradientType": "kerberos-primary",
                    
                    // === OVERLAY SYSTEM ===
                    "overlayActive": "false",
                    "overlayColor": "#000000",
                    "overlayOpacityType": "medium",
                    "blueOverlayActive": "true",
                    "blueOverlayColor": "#063AA8", 
                    "blueOverlayOpacityType": "light",
                    
                    // === SPACING ===
                    "sectionSpacing": "6rem 0",
                    "iconSpacing": "1.5rem",
                    "titleSpacing": "1rem",
                    "textSpacing": "2rem"
                }
            },

            {
                "id": "kerberos-solution-triple-richtext",
                "name": "Challenge-Requirement-Solution",
                "category": "Content & Services",
                "description": "Ein Lösungsmodul mit drei Kästchen im Kerberos Design - Auto-Hide für leere Felder",
                "html": `<style>
                    .kerberos-module-{{templateId}} .solution-box {
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        cursor: default;
                        position: relative;
                        overflow: hidden;
                    }
                    .kerberos-module-{{templateId}} .challenge-box:hover {
                        transform: {{hoverTransformType}};
                        box-shadow: {{hoverShadowType}};
                        border-top-color: {{challengeColor}};
                    }
                    .kerberos-module-{{templateId}} .requirement-box:hover {
                        transform: {{hoverTransformType}};
                        box-shadow: {{hoverShadowType}};
                        border-top-color: {{requirementColor}};
                    }
                    .kerberos-module-{{templateId}} .solution-highlight:hover {
                        transform: {{hoverTransformType}};
                        box-shadow: {{hoverShadowType}};
                        border-top-color: {{solutionColor}};
                    }
                </style>
                <section style="padding: {{sectionSpacing}}; background: {{backgroundColor}}; position: relative;" class="kerberos-module-{{templateId}}">
                    <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                        <div style="text-align: center; margin-bottom: {{titleSpacing}};">
                            <h2 style="font-family: var(--heading-font-font-family); font-size: var(--heading-2-size); font-weight: var(--heading-font-font-weight); color: {{titleColor}}; margin: 0 0 1rem 0;">{{mainTitleRichtext}}</h2>
                            <p style="font-family: var(--body-font-font-family); font-size: var(--large-text-size); color: {{subtitleColor}}; margin: 0; opacity: 0.9; max-width: 800px; margin-left: auto; margin-right: auto;">{{subtitleRichtext}}</p>
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: {{contentGap}}; margin-bottom: {{bottomSpacing}};">
                            {{solutionBoxes}}
                        </div>
                        <div style="text-align: center; margin: {{ctaSpacing}} 0; display: {{showCTA}};">
                            <a href="{{ctaLink}}" style="background: {{ctaBackgroundColor}}; color: {{ctaTextColor}}; text-decoration: none; padding: {{primaryButtonPaddingType}}; border-radius: {{primaryButtonRadiusType}}; font-weight: 700; font-size: 1.1rem; transition: all 0.3s ease; font-family: var(--body-font-font-family); box-shadow: {{primaryButtonShadowType}}; display: inline-block;">{{ctaText}}</a>
                        </div>
                        <div style="height: 3px; background: linear-gradient(to right, {{challengeColor}} 0%, {{challengeColor}} 33%, {{requirementColor}} 33%, {{requirementColor}} 66%, {{solutionColor}} 66%, {{solutionColor}} 100%); margin: 0 auto 2rem auto; border-radius: 2px; opacity: 0.8; max-width: 600px; display: {{showConnectionLine}};"></div>
                        <div style="text-align: center; margin-top: {{ctaSpacing}}; display: {{showBottomCTA}};">
                            <a href="{{bottomCtaLink}}" style="background: {{ctaBackgroundColor}}; color: {{ctaTextColor}}; text-decoration: none; padding: {{primaryButtonPaddingType}}; border-radius: {{primaryButtonRadiusType}}; font-weight: 700; font-size: 1.1rem; transition: all 0.3s ease; font-family: var(--body-font-font-family); box-shadow: {{primaryButtonShadowType}};">{{bottomCtaText}}</a>
                        </div>
                    </div>
                </section>`,
                "properties": {
                    // === HAUPTINHALTE ===
                    "mainTitleRichtext": "Von der Herausforderung zur Lösung",
                    "subtitleRichtext": "Verstehen Sie auf einen Blick, wie unsere Compliance-Lösung Ihre Probleme addressiert", 
                    "titleColor": "#063AA8",
                    "subtitleColor": "#495057",

                    // === CHALLENGE SEKTION ===
                    "challengeTitle": "Herausforderung",
                    "challengeText": "Die aktuellen Compliance-Probleme und regulatorischen Schwierigkeiten, mit denen Sie konfrontiert sind.",
                    "challengeIcon": "&#xf071;",
                    "challengeColor": "#F4541D",
                    "challengePoint1": "Komplexe Regulatorik",
                    "challengePoint2": "Hohe Bußgeldrisiken",
                    "challengePoint3": "Zeitaufwändige Prozesse",
                    "challengePoint4": "",
                    "challengePoint5": "",

                    // === REQUIREMENT SEKTION ===
                    "requirementTitle": "Anforderungen",
                    "requirementText": "Was Sie wirklich brauchen, um Compliance-Ziele zu erreichen und Risiken zu minimieren.",
                    "requirementIcon": "&#xf0ea;",
                    "requirementColor": "#FAAE00",
                    "requirementPoint1": "Automatisierte Überwachung",
                    "requirementPoint2": "Rechtssichere Dokumentation",
                    "requirementPoint3": "Effiziente Workflows",
                    "requirementPoint4": "",
                    "requirementPoint5": "",

                    // === SOLUTION SEKTION ===
                    "solutionTitle": "Kerberos Lösung",
                    "solutionText": "Die perfekte Antwort auf Ihre Compliance-Herausforderungen mit unserer bewährten Expertise.",
                    "solutionIcon": "&#xf3ed;",
                    "solutionColor": "#57CC6F",
                    "solutionPoint1": "KI-gestützte Compliance-Engine",
                    "solutionPoint2": "Vollständige Audit-Trails",
                    "solutionPoint3": "Intuitive Benutzeroberfläche",
                    "solutionPoint4": "",
                    "solutionPoint5": "",

                    // === CTA BEREICH ===
                    "ctaText": "",
                    "ctaLink": "#contact",
                    "bottomCtaText": "",
                    "bottomCtaLink": "#contact",
                    "ctaBackgroundColor": "#063AA8",
                    "ctaTextColor": "#FFFFFF",

                    // === DESIGN & LAYOUT ===
                    "backgroundColor": "#F8F9FA",
                    "boxBackgroundColor": "#FFFFFF",
                    "textColor": "#495057",
                    "contentGap": "2rem",
                    "titleSpacing": "3rem",
                    "bottomSpacing": "3rem",
                    "ctaSpacing": "2rem",

                    // === EFFEKTE & INTERAKTION ===
                    "hoverTransformType": "translateY(-8px)",
                    "hoverShadowType": "strong",
                    "primaryButtonPaddingType": "large",
                    "primaryButtonRadiusType": "medium",
                    "primaryButtonShadowType": "medium",

                    // === SICHTBARKEITS-EINSTELLUNGEN ===
                    "showConnectionLine": "true",
                    "showBottomCTA": "false",
                    "sectionSpacing": "4rem 0"
                }
            },

            {
                "id": "kerberos-svg-hero",
                "name": "Hero mit SVG-Grafik",
                "category": "Hero & Headers",
                "description": "Hero-Bereich mit optimierten SVG-Grafiken und Call-to-Action",
                "html": `<section style="{{responsiveBackground}}; padding: {{sectionSpacing}}; text-align: center; margin-bottom: 0; position: relative;" class="kerberos-module-{{moduleId}}">
                    {{overlayElements}}
                    <div style="position: relative; z-index: 3; max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                        {{svgElement}}
                        <h1 style="font-family: var(--heading-font-font-family); font-size: var(--heading-1-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: {{titleColor}}; margin: 0 0 {{titleSpacing}} 0;">{{title}}</h1>
                        {{subtitleElement}}
                        {{textElement}}
                        {{buttonElement}}
                    </div>
                    
                    <style>
                        .kerberos-module-{{moduleId}} .hero-svg,
                        .kerberos-module-{{moduleId}} .hero-svg-code {
                            transition: all 0.3s ease;
                            max-width: 100%;
                            height: auto;
                        }
                        .kerberos-module-{{moduleId}} .hero-svg:hover,
                        .kerberos-module-{{moduleId}} .hero-svg-code:hover {
                            transform: {{svgHoverTransform}};
                            filter: brightness(1.1);
                        }
                        @media (max-width: 768px) {
                            .kerberos-module-{{moduleId}} .hero-svg,
                            .kerberos-module-{{moduleId}} .hero-svg-code {
                                width: {{svgMobileSize}} !important;
                                height: auto !important;
                            }
                        }
                    </style>
                </section>`,
                "properties": {
                    // === CONTENT ===
                    "title": "Moderne SVG-Hero Darstellung",
                    "titleColor": "#FFFFFF",
                    "titleSpacing": "1.5rem",
                    "subtitle": "Beschreibung mit optimierten SVG-Grafiken für schnelle Ladezeiten.",
                    "subtitleColor": "#FFFFFF",
                    "text": "Zusätzlicher Text für detaillierte Informationen und weitere Beschreibungen.",
                    "textColor": "#FFFFFF",
                    "textSpacing": "2rem",

                    // === SICHTBARKEIT ===
                    "showSubtitle": "true",
                    "showText": "true",
                    "showSvg": "true",
                    "showPrimaryButton": "true",
                    "showPrimaryButtonIcon": "true",

                    // === SVG PROPERTIES (OPTIMIERT) ===
                    "svgType": "url",
                    "svgUrl": "https://www.svgrepo.com/show/530438/ddos-protection.svg",
                    "svgCode": "<svg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"currentColor\"/></svg>",
                    "svgAlt": "Hero SVG Grafik",
                    "svgSizeType": "medium",
                    "svgMobileSize": "120px",
                    "svgSpacing": "2rem",
                    "svgColor": "#FFFFFF",
                    "svgHoverTransform": "scale(1.05)",

                    // === PRIMARY BUTTON ===
                    "primaryButtonText": "Mehr erfahren",
                    "primaryButtonLink": "#",
                    "primaryButtonStyleType": "outline",
                    "primaryButtonColor": "#FFFFFF",
                    "primaryButtonPaddingType": "medium",
                    "primaryButtonRadiusType": "medium",
                    "primaryButtonIcon": "&#xf061;",
                    "primaryButtonShadowType": "medium",

                    // === BACKGROUND (MIT GRADIENT SYSTEM) ===
                    "backgroundColor": "linear-gradient(135deg, #063AA8, #009CE6)",
                    "backgroundImage": "",
                    "backgroundType": "gradient",
                    "backgroundGradientType": "kerberos-primary",
                    
                    // === OVERLAY SYSTEM ===
                    "overlayActive": "false",
                    "overlayColor": "#000000",
                    "overlayOpacityType": "medium",
                    "blueOverlayActive": "true",
                    "blueOverlayColor": "#063AA8", 
                    "blueOverlayOpacityType": "light",
                    
                    "sectionSpacing": "6rem 0"
                },
                "customized": true
            },

            {
                "id": "kerberos-api-hero-with-text",
                "name": "API Hero mit Text", 
                "category": "Hero & Headers",
                "description": "API-Hero mit SVG-Grafik und erweiterten Textfeldern",
                "html": `<section style="background: {{backgroundColor}}; padding: {{sectionSpacing}}; text-align: center; margin-bottom: 0; position: relative;" class="kerberos-module-{{moduleId}}">
                    {{overlayElements}}
                    <div style="position: relative; z-index: 3; max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                        {{svgElement}}
                        <h1 style="font-family: var(--heading-font-font-family); font-size: var(--heading-1-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: {{titleColor}}; margin: 0 0 {{titleSpacing}} 0;">{{title}}</h1>
                        <div style="font-family: var(--body-font-font-family); font-size: var(--large-text-size); line-height: var(--body-font-line-height); color: {{subtitleColor}}; max-width: 800px; margin: 0 auto {{subtitleSpacing}} auto;">{{subtitle}}</div>
                        <div style="font-family: var(--body-font-font-family); font-size: var(--body-text-size); line-height: var(--body-font-line-height); color: {{textColor}}; max-width: 900px; margin: 0 auto {{textSpacing}} auto;">{{text}}</div>
                        <a class="kerberos-btn kerberos-btn-{{moduleId}}" href="{{primaryButtonLink}}" style="font-family: var(--button-font-family); font-weight: var(--button-font-weight); background: {{primaryButtonBackground}}; color: {{primaryButtonColor}}; padding: {{primaryButtonPadding}}; border-radius: {{primaryButtonRadius}}; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: {{primaryButtonShadow}}; transition: all 0.3s ease;">
                            {{primaryButtonText}}
                            <span style="font-family: 'Font Awesome 5 Pro';">{{primaryButtonIcon}}</span>
                        </a>
                    </div>
                </section>`,
                "properties": {
                    // === SVG PROPERTIES (KORRIGIERT) ===
                    "svgUrl": "https://www.svgrepo.com/show/530440/api.svg",
                    "svgAlt": "API Integration Icon",
                    "svgSizeType": "medium",
                    "svgSpacing": "2rem",
                    "svgObjectFit": "contain",
                    "svgObjectPosition": "center", 
                    "svgCustomCSS": "margin: 0; display: block;",
                    
                    // === CONTENT ===
                    "title": "KYC/AML-API: Automatische GwG-Standardprüfung",
                    "titleColor": "#FFFFFF",
                    "titleSpacing": "1.5rem",
                    "subtitle": "Reduzieren Sie Ihren Compliance-Aufwand durch automatisierte Prüfprozesse. Sparen Sie 15-30 Minuten pro Prüfung.",
                    "subtitleColor": "#FFFFFF",
                    "subtitleSpacing": "1rem",
                    "text": "Entwicklerfreundliche RESTful-API für automatisierte Compliance-Prüfungen. Echtzeitzugriff auf Sanktionen, PEPs und Hochrisikoländer.",
                    "textColor": "#FFFFFF",
                    "textSpacing": "2rem",

                    // === PRIMARY BUTTON ===
                    "primaryButtonText": "API jetzt testen",
                    "primaryButtonLink": "/unternehmen/kontakt",
                    "primaryButtonStyleType": "outline",
                    "primaryButtonColor": "#FFFFFF",
                    "primaryButtonBackground": "transparent",
                    "primaryButtonPaddingType": "medium",
                    "primaryButtonRadiusType": "medium",
                    "primaryButtonIcon": "&#xf061;",
                    "primaryButtonShadowType": "medium",

                    // === BACKGROUND (MIT GRADIENT SYSTEM) ===
                    "backgroundColor": "linear-gradient(135deg, #063AA8, #009CE6)",
                    "backgroundImage": "",
                    "backgroundType": "gradient",
                    "backgroundGradientType": "kerberos-primary",
                    
                    // === OVERLAY SYSTEM ===
                    "overlayActive": "false",
                    "overlayColor": "#000000",
                    "overlayOpacityType": "medium",
                    "blueOverlayActive": "true",
                    "blueOverlayColor": "#063AA8", 
                    "blueOverlayOpacityType": "light",
                    
                    "sectionSpacing": "6rem 0"
                },
                "customized": true
            },

            {
                "id": "kerberos-compliance-dashboard",
                "name": "Compliance Dashboard (Interaktiv)",
                "category": "Technology & Tools",
                "description": "Interaktives Dashboard mit Echtzeit-Compliance-Daten, Statistiken und Aktivitätsfeeds",
                "html": `<section style="padding: {{sectionSpacing}}; background: {{backgroundColor}};" class="kerberos-module-{{templateId}}">
                    <div style="max-width: 1400px; margin: 0 auto; padding: 0 2rem;">
                        <div style="text-align: center; margin-bottom: {{titleSpacing}};">
                            <h2 style="font-family: var(--heading-font-font-family); font-size: var(--heading-2-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: {{titleColor}}; margin: 0 0 1rem 0;">{{title}}</h2>
                            <p style="font-family: var(--body-font-font-family); font-size: var(--normal-text-size); line-height: var(--body-font-line-height); color: {{subtitleColor}}; max-width: 700px; margin: 0 auto;">{{subtitle}}</p>
                        </div>
                        <div style="background: {{cardBackground}}; border-radius: {{cardRadiusType}}; padding: {{cardPaddingType}}; box-shadow: {{cardShadowType}}; border: 1px solid {{cardBorder}}; position: relative; overflow: hidden;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: {{headerSpacing}}; padding-bottom: 1rem; border-bottom: 1px solid {{cardBorder}};">
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <div style="font-family: 'Font Awesome 5 Pro'; font-size: {{iconSizeType}}; color: {{primaryColor}};">{{dashboardIcon}}</div>
                                    <h3 style="font-family: var(--heading-font-font-family); color: {{primaryColor}}; margin: 0; font-size: {{headingSizeType}};">{{dashboardTitle}}</h3>
                                </div>
                                <div style="background: {{statusColor}}; color: white; padding: {{statusPaddingType}}; border-radius: {{statusRadiusType}}; font-size: {{statusTextSizeType}}; font-weight: 600;">{{statusText}}</div>
                            </div>
                            {{dashboardCards}}
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: {{contentGap}}; margin-top: {{bottomSpacing}};">
                                <div style="background: white; border-radius: {{cardRadiusType}}; padding: {{cardPaddingType}}; border: 1px solid {{cardBorder}};">
                                    <h4 style="font-family: var(--heading-font-font-family); color: {{textColor}}; margin: 0 0 1rem 0; font-size: {{subHeadingSizeType}};">{{chartTitle}}</h4>
                                    <div style="height: {{chartHeightType}}; background: linear-gradient(45deg, {{primaryColor}}20, {{secondaryColor}}20); border-radius: {{chartRadiusType}}; position: relative; overflow: hidden;">
                                        {{chartBars}}
                                    </div>
                                </div>
                                <div style="background: white; border-radius: {{cardRadiusType}}; padding: {{cardPaddingType}}; border: 1px solid {{cardBorder}};">
                                    <h4 style="font-family: var(--heading-font-font-family); color: {{textColor}}; margin: 0 0 1rem 0; font-size: {{subHeadingSizeType}};">{{activityTitle}}</h4>
                                    <div>
                                        {{activityItems}}
                                    </div>
                                </div>
                            </div>
                            <div style="text-align: center; margin-top: {{ctaSpacing}}; padding-top: {{ctaSpacing}}; border-top: 1px solid {{cardBorder}};">
                                <a href="{{primaryButtonLink}}" style="font-family: var(--button-font-family); font-weight: var(--button-font-weight); background: {{primaryColor}}; color: white; padding: {{primaryButtonPaddingType}}; border-radius: {{primaryButtonRadiusType}}; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease; box-shadow: {{primaryButtonShadowType}};">{{primaryButtonText}}<span style="font-family: 'Font Awesome 5 Pro';">{{primaryButtonIcon}}</span></a>
                            </div>
                        </div>
                    </div>
                </section>`,
                "properties": {
                    // === HEADER ===
                    "title": "Kerberos Compliance Dashboard",
                    "titleColor": "#063AA8",
                    "titleSpacing": "3rem",
                    "subtitle": "Behalten Sie den Überblick über alle Compliance-Aktivitäten in Echtzeit",
                    "subtitleColor": "#6c757d",

                    // === LAYOUT ===
                    "backgroundColor": "#F8F9FA",
                    "sectionSpacing": "6rem 0",
                    "contentGap": "2rem",
                    "headerSpacing": "2rem",
                    "bottomSpacing": "2rem",
                    "ctaSpacing": "2rem",

                    // === CARD STYLING ===
                    "cardBackground": "#FFFFFF",
                    "cardBorder": "#DEE2E6",
                    "cardRadiusType": "medium",
                    "cardPaddingType": "large",
                    "cardShadowType": "strong",

                    // === FARBEN ===
                    "primaryColor": "#063AA8",
                    "secondaryColor": "#009CE6",
                    "accentColor": "#B265E9",
                    "textColor": "#212529",

                    // === DASHBOARD HEADER ===
                    "dashboardIcon": "&#xf0e4;",
                    "dashboardTitle": "Compliance Control Center",
                    "statusText": "Aktiv",
                    "statusColor": "#28A745",
                    "statusPaddingType": "small",
                    "statusRadiusType": "pill",
                    "statusTextSizeType": "small",

                    // === GRÖSSEN ===
                    "iconSizeType": "medium",
                    "headingSizeType": "medium",
                    "subHeadingSizeType": "small",

                    // === CHART & ACTIVITY ===
                    "chartTitle": "Monatliche Trends",
                    "chartHeightType": "medium",
                    "chartRadiusType": "small",
                    "activityTitle": "Letzte Aktivitäten",
                    "activity1": "KYC-Prüfung abgeschlossen",
                    "activity2": "Risikobewertung aktualisiert",
                    "activity3": "Compliance-Bericht generiert",

                    // === PRIMARY BUTTON ===
                    "primaryButtonText": "Live-Demo anfordern",
                    "primaryButtonLink": "#demo",
                    "primaryButtonIcon": "&#xf04b;",
                    "primaryButtonPaddingType": "medium",
                    "primaryButtonRadiusType": "medium",
                    "primaryButtonShadowType": "medium"
                },
                "customized": true
            },

            {
                "id": "kerberos-api-endpoints",
                "name": "API Endpoints Übersicht",
                "category": "Technology & Tools",
                "description": "Zeigt API-Endpoints in einer übersichtlichen Grid-Struktur mit optionalen Methods/Status",
                "html": `<style>
                    .kerberos-btn-{{templateId}} {
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                        cursor: pointer !important;
                    }
                    .kerberos-btn-{{templateId}}:hover {
                        background: {{primaryButtonHoverBg}} !important;
                        color: {{primaryButtonHoverColor}} !important;
                        transform: {{primaryButtonHoverTransformType}} !important;
                        box-shadow: {{primaryButtonHoverShadowType}} !important;
                    }
                    .kerberos-module-{{templateId}} .api-endpoint-card {
                        transition: all 0.3s ease !important;
                    }
                    .kerberos-module-{{templateId}} .api-endpoint-card:hover {
                        transform: {{cardHoverTransformType}} !important;
                        box-shadow: {{cardHoverShadowType}} !important;
                        border-color: {{primaryColor}} !important;
                    }
                </style>
                <section style="padding: {{sectionSpacing}}; background: {{backgroundColor}};" class="kerberos-module-{{templateId}}">
                    <div style="max-width: 1400px; margin: 0 auto; padding: 0 2rem;">
                        <div style="text-align: center; margin-bottom: {{titleSpacing}};">
                            <h2 style="font-family: var(--heading-font-font-family); font-size: var(--heading-2-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: {{titleColor}}; margin: 0 0 1rem 0;">{{title}}</h2>
                            <p style="font-family: var(--body-font-font-family); font-size: var(--normal-text-size); line-height: var(--body-font-line-height); color: {{subtitleColor}}; max-width: 800px; margin: 0 auto;">{{subtitle}}</p>
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: {{endpointGap}};">
                            {{endpointCards}}
                        </div>
                        <div style="margin-top: {{ctaSpacing}}; text-align: center;">
                            <a class="kerberos-btn kerberos-btn-{{templateId}}" href="{{docsLink}}" style="font-family: var(--button-font-family); font-weight: var(--button-font-weight); background: {{primaryColor}}; color: {{buttonTextColor}}; padding: {{primaryButtonPaddingType}}; border-radius: {{primaryButtonRadiusType}}; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease;">{{primaryButtonText}}<span style="font-family: 'Font Awesome 5 Pro';">{{primaryButtonIcon}}</span></a>
                        </div>
                    </div>
                </section>`,
                "properties": {
                    // === KONTROLL-EIGENSCHAFTEN ===
                    "showMethods": "true",
                    "showStatus": "true",
                    "showPaths": "true",

                    // === HEADER ===
                    "title": "Kerberos API Integration",
                    "titleColor": "#063AA8",
                    "titleSpacing": "3rem",
                    "subtitle": "Integrieren Sie Kerberos nahtlos in Ihre bestehenden Systeme mit unserer RESTful API",
                    "subtitleColor": "#6c757d",

                    // === LAYOUT ===
                    "backgroundColor": "#F8F9FA",
                    "primaryColor": "#063AA8",
                    "sectionSpacing": "2rem 0",
                    "endpointGap": "2rem",
                    "ctaSpacing": "3rem",

                    // === ENDPOINTS 1-4 ===
                    "endpoint1Method": "POST",
                    "endpoint1Path": "/api/v1/kyc/check",
                    "endpoint1Title": "KYC-Prüfung starten",
                    "endpoint1Description": "Startet eine KYC-Prüfung für einen neuen Kunden mit automatischer Validierung",
                    "endpoint1Status": "200 OK",
                    "endpoint1StatusColor": "#28A745",
                    "endpoint1Active": "true",

                    "endpoint2Method": "GET",
                    "endpoint2Path": "/api/v1/transactions/risk",
                    "endpoint2Title": "Risikobewertung abrufen",
                    "endpoint2Description": "Ruft die aktuelle Risikobewertung für Transaktionen ab",
                    "endpoint2Status": "200 OK",
                    "endpoint2StatusColor": "#28A745",
                    "endpoint2Active": "true",

                    "endpoint3Method": "POST",
                    "endpoint3Path": "/api/v1/reports/generate",
                    "endpoint3Title": "Compliance-Bericht generieren",
                    "endpoint3Description": "Generiert automatisch einen Compliance-Bericht für den gewählten Zeitraum",
                    "endpoint3Status": "202 Accepted",
                    "endpoint3StatusColor": "#EF8646",
                    "endpoint3Active": "true",

                    "endpoint4Method": "GET",
                    "endpoint4Path": "/api/v1/monitoring/alerts",
                    "endpoint4Title": "Aktive Alerts abrufen",
                    "endpoint4Description": "Ruft alle aktiven Compliance-Alerts und Warnungen ab",
                    "endpoint4Status": "200 OK",
                    "endpoint4StatusColor": "#28A745",
                    "endpoint4Active": "true",

                    // === BUTTON & LINKS ===
                    "docsLink": "/unternehmen/kontakt",
                    "primaryButtonText": "Vollständige API-Dokumentation",
                    "primaryButtonIcon": "&#xf35d;",

                    // === STYLING ===
                    "cardBackground": "#FFFFFF",
                    "cardBorder": "#DEE2E6",
                    "textColor": "#212529",
                    "primaryButtonPaddingType": "medium",
                    "primaryButtonRadiusType": "medium",

                    // === HOVER EFFEKTE ===
                    "buttonTextColor": "#FFFFFF",
                    "primaryButtonHoverColor": "#FFFFFF",
                    "primaryButtonHoverBg": "rgba(6,58,168,0.8)",
                    "primaryButtonHoverTransformType": "translateY(-2px)",
                    "primaryButtonHoverShadowType": "strong",
                    "cardHoverTransformType": "translateY(-2px)",
                    "cardHoverShadowType": "strong"
                },
                "customized": true
            },

            {
                "id": "kerberos-product-showcase",
                "name": "Product Showcase",
                "category": "Content & Services",
                "description": "Responsive Produkt-Showcase mit modernen Hover-Effekten",
                "html": `<section style="padding: {{sectionSpacing}}; background: {{backgroundColor}};" class="kerberos-module-{{templateId}}">
                    <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                        {{showcaseContent}}
                    </div>
                </section>`,
                "properties": {
                    // === HEADER ===
                    "title": "Unsere Produktwelt",
                    "titleColor": "#063AA8",
                    "subtitle": "Entdecken Sie innovative Lösungen für Ihr Unternehmen",
                    "subtitleColor": "#6c757d",
                    "showSubtitle": "true",

                    // === LAYOUT ===
                    "backgroundColor": "#FFFFFF",
                    "sectionSpacing": "6rem 0",
                    "contentGap": "2rem",
                    "gridColumnsType": "auto-fit-300",

                    // === CARD STYLING ===
                    "cardRadiusType": "medium",
                    "cardBorderColor": "#E5E7EB",
                    "cardShadowType": "light",
                    "cardHoverShadowType": "strong",

                    // === HOVER EFFECTS ===
                    "hoverTransformType": "translateY(-8px)",
                    "hoverScaleType": "scale(1.02)",

                    // === PRODUKTE 1-3 ===
                    "product1Active": "true",
                    "product1Title": "Kerberos Academy",
                    "product1Description": "Interaktive Schulungsplattform mit Zertifizierung",
                    "product1Image": "https://images.squarespace-cdn.com/content/651eacf7cae17a228645a660/d35f20ab-9a62-4e2f-82f9-831eb86fa73a/Academy_Laptop.png?content-type=image%2Fpng",
                    "product1Link": "/academy",
                    "product1Price": "Ab 49€/Monat",
                    "product1Badge": "Beliebt",

                    "product2Active": "true",
                    "product2Title": "KYC Scanner",
                    "product2Description": "Automatisierte Identitätsprüfung in Echtzeit",
                    "product2Image": "https://images.squarespace-cdn.com/content/651eacf7cae17a228645a660/7bb592ba-baef-4e6a-b797-fa5826ada6cb/KYC+App+auf+Handy.jpg?content-type=image%2Fjpeg",
                    "product2Link": "/kyc",
                    "product2Price": "Ab 99€/Monat",
                    "product2Badge": "Neu",

                    "product3Active": "true",
                    "product3Title": "Compliance Dashboard",
                    "product3Description": "Zentrale Übersicht aller Compliance-Aktivitäten",
                    "product3Image": "https://images.squarespace-cdn.com/content/651eacf7cae17a228645a660/03b37d45-daff-4dcd-baf2-05d6c25aab0e/Due+Diligence+Report+-+Laptop.png?content-type=image%2Fpng",
                    "product3Link": "/dashboard",
                    "product3Price": "Ab 199€/Monat",
                    "product3Badge": "Premium",

                    // === PRODUKTE 4-6 ===
                    "product4Active": "false",
                    "product4Title": "Risk Assessment Tool",
                    "product4Description": "Automatische Risikobewertung für Geschäftspartner",
                    "product4Image": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
                    "product4Link": "/risk-assessment",
                    "product4Price": "Ab 149€/Monat", 
                    "product4Badge": "",

                    "product5Active": "false",
                    "product5Title": "Document Manager",
                    "product5Description": "Sichere Verwaltung von Compliance-Dokumenten",
                    "product5Image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
                    "product5Link": "/documents",
                    "product5Price": "Ab 79€/Monat",
                    "product5Badge": "Neu",

                    "product6Active": "false", 
                    "product6Title": "Audit Trail",
                    "product6Description": "Lückenlose Nachverfolgung aller Compliance-Aktivitäten",
                    "product6Image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
                    "product6Link": "/audit-trail",
                    "product6Price": "Ab 119€/Monat",
                    "product6Badge": "Enterprise",

                    // === PRODUKTE 7-9 ===
                    "product7Active": "false",
                    "product7Title": "Alert System",
                    "product7Description": "Echtzeit-Benachrichtigungen bei Compliance-Verstößen",
                    "product7Image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
                    "product7Link": "/alerts",
                    "product7Price": "Ab 89€/Monat",
                    "product7Badge": "24/7",

                    "product8Active": "false",
                    "product8Title": "Integration Hub",
                    "product8Description": "Nahtlose Integration in bestehende Unternehmenssysteme",
                    "product8Image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
                    "product8Link": "/integrations",
                    "product8Price": "Ab 199€/Monat",
                    "product8Badge": "API",

                    "product9Active": "false",
                    "product9Title": "Analytics Suite",
                    "product9Description": "Detaillierte Analysen und Compliance-Berichte",
                    "product9Image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
                    "product9Link": "/analytics",
                    "product9Price": "Ab 249€/Monat",
                    "product9Badge": "Pro"
                }
            },

            {
                "id": "kerberos-solutions-overview",
                "name": "Kerberos Lösungsübersicht",
                "category": "Content & Services",
                "description": "Editierbare Produkt-/Lösungsübersicht mit Hover-Effekten",
                "html": `<section style="padding: {{sectionSpacing}}; background: {{backgroundColor}};" class="kerberos-module-{{templateId}}">
                    <div style="max-width: 1400px; margin: 0 auto; padding: 0 2rem;">
                        {{solutionsContent}}
                    </div>
                </section>`,
                "properties": {
                    // === HEADER ===
                    "title": "Unsere Lösungen im Überblick",
                    "titleColor": "#063AA8",
                    "subtitle": "Entdecken Sie die passende Lösung für Ihr Unternehmen",
                    "subtitleColor": "#6c757d",
                    "showSubtitle": "true",

                    // === LAYOUT ===
                    "backgroundColor": "#FFFFFF",
                    "sectionSpacing": "2rem 0",
                    "contentGap": "2rem",

                    // === HOVER-EFFEKTE ===
                    "hoverBackgroundColor": "#063AA8",
                    "hoverTitleColor": "#FFFFFF",
                    "hoverDescriptionColor": "rgba(255,255,255,0.9)",

                    // === PRODUKTE 1-12 (Vollständig) ===
                    "product1Active": "true",
                    "product1Title": "AML-as-a-Service",
                    "product1Description": "Geldwäscheprävention im Abo - Alle Pflichten digital ausgelagert",
                    "product1Image": "https://images.squarespace-cdn.com/content/651eacf7cae17a228645a660/aml-service-dashboard.png?content-type=image%2Fpng",
                    "product1Link": "/loesungen/geldwaeschepraevention",

                    "product2Active": "true",
                    "product2Title": "MLRO-as-a-Service",
                    "product2Description": "Bestellung externer Geldwäschebeauftragter mit vollumfänglicher Betreuung",
                    "product2Image": "https://images.squarespace-cdn.com/content/651eacf7cae17a228645a660/mlro-service.png?content-type=image%2Fpng",
                    "product2Link": "/loesungen/geldwaeschebeauftragte",

                    "product3Active": "true",
                    "product3Title": "Geschäftspartnerprüfungen (KYC)",
                    "product3Description": "Von natürlichen Personen und Unternehmen - schnell und rechtssicher",
                    "product3Image": "https://images.squarespace-cdn.com/content/651eacf7cae17a228645a660/7bb592ba-baef-4e6a-b797-fa5826ada6cb/KYC+App+auf+Handy.jpg?content-type=image%2Fjpeg",
                    "product3Link": "/loesungen/kyc-due-diligence",

                    "product4Active": "true",
                    "product4Title": "KYC/AML API",
                    "product4Description": "Automatische AML-Standardprüfungen über API-Integration",
                    "product4Image": "https://images.squarespace-cdn.com/content/651eacf7cae17a228645a660/api-integration.png?content-type=image%2Fpng",
                    "product4Link": "/loesungen/kyc-due-diligence",

                    "product5Active": "true",
                    "product5Title": "(enhanced) Due Diligence",
                    "product5Description": "Tiefergehende Geschäftspartnerprüfungen mit Handlungsempfehlungen",
                    "product5Image": "https://images.squarespace-cdn.com/content/651eacf7cae17a228645a660/03b37d45-daff-4dcd-baf2-05d6c25aab0e/Due+Diligence+Report+-+Laptop.png?content-type=image%2Fpng",
                    "product5Link": "/loesungen/due-diligence",

                    "product6Active": "true",
                    "product6Title": "Schulungen zur Geldwäscheprävention",
                    "product6Description": "Digital & Inhouse-Schulungen für alle Branchen mit Zertifikaten",
                    "product6Image": "https://images.squarespace-cdn.com/content/651eacf7cae17a228645a660/d35f20ab-9a62-4e2f-82f9-831eb86fa73a/Academy_Laptop.png?content-type=image%2Fpng",
                    "product6Link": "/loesungen/mitarbeiterschulungen",

                    "product7Active": "true",
                    "product7Title": "Weiterbildungen / Zertifizierungen",
                    "product7Description": "Für Geldwäschebeauftragte in Kooperation mit der DEKRA",
                    "product7Image": "https://images.squarespace-cdn.com/content/651eacf7cae17a228645a660/1724242583984-74UB1Y0VQ8LLX47IPP2P/Anw%C3%A4ltin-am-Schreibtisch.jpg?content-type=image%2Fjpeg",
                    "product7Link": "/loesungen/zertifizierungen",

                    "product8Active": "true",
                    "product8Title": "Hinweisgebersysteme",
                    "product8Description": "Zur Einhaltung des Hinweisgeberschutzgesetzes - DSGVO-konform",
                    "product8Image": "https://images.squarespace-cdn.com/content/651eacf7cae17a228645a660/77d7fe85-e643-4576-bbec-ece33bf2f20c/Whistleblower-System+-+Pfeife+auf+einer+Tastatur.png?content-type=image%2Fpng",
                    "product8Link": "/loesungen/hinweisgebersystem",

                    "product9Active": "true",
                    "product9Title": "Datenschutzbeauftragte",
                    "product9Description": "Bestellung eines DSB im Abo - externe Datenschutzbeauftragte",
                    "product9Image": "https://images.squarespace-cdn.com/content/651eacf7cae17a228645a660/2b0dd428-0073-4e51-a625-4e33c470a925/GDPR+-+DSGVO+-+Laptop+mit+EU-Flagge+und+Schloss.jpg?content-type=image%2Fjpeg",
                    "product9Link": "/loesungen/datenschutz",

                    "product10Active": "true",
                    "product10Title": "Data Protection Management System",
                    "product10Description": "Bereitstellung eines DPMS im Abo - Cloud-basiert und DSGVO-konform",
                    "product10Image": "https://images.squarespace-cdn.com/content/651eacf7cae17a228645a660/dpms-dashboard.png?content-type=image%2Fpng",
                    "product10Link": "/loesungen/datenschutz",

                    "product11Active": "true",
                    "product11Title": "Kontakt für weitere Unterstützung",
                    "product11Description": "Erstellung Risikoanalyse, individuelle Beratung und maßgeschneiderte Lösungen",
                    "product11Image": "https://images.squarespace-cdn.com/content/651eacf7cae17a228645a660/consulting-meeting.jpg?content-type=image%2Fjpeg",
                    "product11Link": "/kontakt",

                    "product12Active": "false",
                    "product12Title": "Mobile Compliance",
                    "product12Description": "Compliance-Management unterwegs mit unserer mobilen App",
                    "product12Image": "https://images.squarespace-cdn.com/content/651eacf7cae17a228645a660/mobile-compliance.jpg?content-type=image%2Fjpeg",
                    "product12Link": "/loesungen/mobile-compliance"
                }
            },

            {
                "id": "kerberos-company-presentation",
                "name": "Company Presentation",
                "category": "Team & About",
                "description": "Unternehmensvorstellung mit Haupttext, Button und Statistiken im Grid-Layout",
                "html": `<section style="padding: {{sectionSpacing}}; background: {{backgroundColor}}; position: relative;" class="kerberos-company-presentation">
                    <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                        <div style="display: grid; grid-template-columns: 1fr; gap: {{contentGap}}; align-items: center;">
                            <div style="display: grid; grid-template-columns: 1fr 400px; gap: {{mainContentGap}}; align-items: center; margin-bottom: {{sectionSpacing}};">
                                <div>
                                    <h2 style="font-family: var(--heading-font-font-family); font-size: var(--heading-2-size); font-weight: var(--heading-font-font-weight); color: {{titleColor}}; margin: 0 0 {{titleSpacing}} 0; line-height: 1.2;">{{title}}</h2>
                                    <div style="color: {{textColor}}; font-size: {{textSizeType}}; line-height: {{lineHeightType}}; margin-bottom: {{textSpacing}};">{{description}}</div>
                                    <a href="{{primaryButtonLink}}" style="display: inline-flex; align-items: center; gap: 0.5rem; background: {{primaryButtonBackground}}; color: {{primaryButtonColor}}; padding: {{primaryButtonPaddingType}}; border-radius: {{primaryButtonRadiusType}}; text-decoration: none; font-weight: 500; transition: all 0.3s ease;">{{primaryButtonText}}</a>
                                </div>
                                {{rightSideContent}}
                            </div>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: {{statsGap}};">
                                {{statisticsGrid}}
                            </div>
                        </div>
                    </div>
                    <style>
                        @media (max-width: 768px) {
                            .kerberos-company-presentation div[style*="grid-template-columns: 1fr 400px"] {
                                grid-template-columns: 1fr !important;
                                gap: {{mobileGap}} !important;
                            }
                        }
                    </style>
                </section>`,
                "properties": {
                    // === HAUPTINHALT ===
                    "title": "Geldwäsche-Compliance für alle seit 2017",
                    "titleColor": "#063AA8",
                    "titleSpacing": "1.5rem",
                    "description": "Seit 2017 ist es unsere Aufgabe, die Anforderungen des Geldwäschegesetz für alle umsetzbar zu machen. Wir beraten und unterstützen Unternehmen nicht nur mit fachlicher Expertise, sondern bauen zudem unser Angebot technischer und standardisierter Lösungen stetig aus.<br><br>Als einer der größten Dienstleister für Anti-Geldwäsche Compliance Deutschlands tragen wir maßgeblich dazu bei, <strong>Compliance für alle</strong> zu ermöglichen.",
                    "textColor": "#212529",
                    "textSizeType": "medium",
                    "lineHeightType": "comfortable",
                    "textSpacing": "2rem",

                    // === IMAGE/SHAPE SYSTEM ===
                    "imageUrl": "",
                    "imageAlt": "Unternehmensbild",
                    "showImage": "false",

                    // === PRIMARY BUTTON ===
                    "primaryButtonText": "Über uns",
                    "primaryButtonLink": "/unternehmen/ueber-uns",
                    "primaryButtonBackground": "#063AA8",
                    "primaryButtonColor": "#FFFFFF",
                    "primaryButtonPaddingType": "medium",
                    "primaryButtonRadiusType": "small",

                    // === DESIGN ===
                    "backgroundColor": "#FFFFFF",
                    "primaryColor": "#063AA8",
                    "shapeColor": "hsla(226, 94%, 34%, 0.14)",
                    "sectionSpacing": "6rem 0",
                    "contentGap": "3rem",
                    "mainContentGap": "3rem",
                    "statsGap": "2rem",
                    "mobileGap": "2rem",

                    // === STATISTIKEN ===
                    "stat1Value": "Alle Branchen",
                    "stat1Description": "Unsere Kunden stammen aus allen verpflichteten Branchen",

                    "stat2Value": "1.000+",
                    "stat2Description": "Erfolgreich abgeschlossene Behördenvorgänge",

                    "stat3Value": "60+",
                    "stat3Description": "Mitarbeiterinnen und Mitarbeiter",

                    "stat4Value": "Zertifiziert",
                    "stat4Description": "Nach den Standards ISO 37301, ISO 27001 und ISO 27701"
                }
            },

            {
                "id": "kerberos-testimonials-pro",
                "name": "Testimonials Professional",
                "category": "Content & Images",
                "description": "Professionelles Testimonial-Modul mit Logos und Links für bis zu 15 Kundenbewertungen",
                "html": `<style>
                    .kerberos-testimonials-pro-container {
                        max-width: 100%;
                        overflow: hidden;
                        position: relative;
                        background: {{containerBackground}};
                        border-radius: {{containerRadiusType}};
                        padding: {{containerPaddingType}};
                        box-shadow: {{containerShadowType}};
                    }
                    .kerberos-testimonials-pro-track {
                        display: flex;
                        transition: transform {{transitionSpeedType}} cubic-bezier(0.25, 0.46, 0.45, 0.94);
                        width: fit-content;
                    }
                    .testimonial-pro-slide {
                        flex: 0 0 100%;
                        max-width: 100%;
                        box-sizing: border-box;
                        padding: 0 {{slideSpacingType}};
                    }
                    .testimonial-pro-content {
                        background: {{cardBackground}};
                        border-radius: {{cardRadiusType}};
                        padding: {{cardPaddingType}};
                        text-align: center;
                        box-shadow: {{cardShadowType}};
                        height: 100%;
                        min-height: {{cardMinHeightType}};
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        border: 1px solid {{cardBorderColor}};
                        position: relative;
                        overflow: hidden;
                    }
                    .testimonial-pro-content::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: {{topBorderHeightType}};
                        background: linear-gradient(90deg, {{primaryColor}}, {{accentColor}});
                    }
                    .nav-button-pro {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        background: {{primaryColor}};
                        color: white;
                        border: none;
                        width: {{navButtonSizeType}};
                        height: {{navButtonSizeType}};
                        border-radius: 50%;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: {{navButtonShadowType}};
                        transition: all 0.3s ease;
                        z-index: 20;
                        font-family: 'Font Awesome 5 Pro';
                        font-size: {{navButtonIconSizeType}};
                    }
                    .nav-button-pro:hover {
                        background: {{accentColor}};
                        transform: translateY(-50%) {{navButtonHoverScaleType}};
                    }
                    .nav-prev-pro { left: -{{navButtonOffsetType}}; }
                    .nav-next-pro { right: -{{navButtonOffsetType}}; }
                    @media (max-width: 768px) {
                        .testimonial-pro-content {
                            padding: {{cardMobilePaddingType}};
                            min-height: {{cardMobileHeightType}};
                        }
                        .nav-button-pro { display: {{mobileNavDisplayType}}; }
                    }
                </style>
                <section style="padding: {{sectionSpacing}}; background: {{backgroundColor}};" class="kerberos-module-{{templateId}}">
                    <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                        <div style="text-align: center; margin-bottom: {{titleSpacing}};">
                            <h2 style="font-family: var(--heading-font-font-family); font-size: var(--heading-2-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: {{titleColor}}; margin: 0 0 1rem 0;">{{title}}</h2>
                            <p style="font-family: var(--body-font-font-family); font-size: var(--normal-text-size); line-height: var(--body-font-line-height); color: {{subtitleColor}}; max-width: 600px; margin: 0 auto;">{{subtitle}}</p>
                        </div>
                        <div class="kerberos-testimonials-pro-container">
                            <div class="kerberos-testimonials-pro-track">
                                {{testimonialSlides}}
                            </div>
                            <button class="nav-button-pro nav-prev-pro" aria-label="Vorheriges Testimonial">&#xf060;</button>
                            <button class="nav-button-pro nav-next-pro" aria-label="Nächstes Testimonial">&#xf061;</button>
                        </div>
                        <div style="display: flex; justify-content: center; gap: {{dotsSpacingType}}; margin-top: {{dotsMarginType}};">
                            {{navigationDots}}
                        </div>
                        <div style="text-align: center; margin-top: {{counterMarginType}}; font-size: {{counterSizeType}}; color: {{subtitleColor}}; font-weight: 500;">
                            {{currentSlide}} von {{totalSlides}}
                        </div>
                    </div>
                </section>`,
                "properties": {
                    // === HEADER ===
                    "title": "Was unsere Kunden sagen",
                    "titleColor": "#063AA8",
                    "subtitle": "Vertrauen Sie auf die Erfahrungen von über 500 zufriedenen Kunden aus verschiedenen Branchen",
                    "subtitleColor": "#6c757d",
                    "titleSpacing": "3rem",

                    // === LAYOUT ===
                    "backgroundColor": "#F8F9FA",
                    "sectionSpacing": "6rem 0",

                    // === CONTAINER STYLING ===
                    "containerBackground": "#FFFFFF",
                    "containerRadiusType": "large",
                    "containerPaddingType": "large",
                    "containerShadowType": "strong",

                    // === CARD STYLING ===
                    "cardBackground": "#FFFFFF",
                    "cardRadiusType": "large",
                    "cardPaddingType": "extra-large",
                    "cardShadowType": "strong",
                    "cardMinHeightType": "large",
                    "cardMobilePaddingType": "medium",
                    "cardMobileHeightType": "medium",
                    "cardBorderColor": "rgba(6,58,168,0.08)",
                    "topBorderHeightType": "medium",

                    // === FARBEN ===
                    "primaryColor": "#063AA8",
                    "accentColor": "#009CE6",
                    "quoteIconColor": "#063AA8",
                    "textColor": "#212529",
                    "authorColor": "#063AA8",
                    "companyColor": "#6c757d",

                    // === NAVIGATION ===
                    "navButtonSizeType": "large",
                    "navButtonIconSizeType": "medium",
                    "navButtonShadowType": "medium",
                    "navButtonHoverScaleType": "scale(1.1)",
                    "navButtonOffsetType": "medium",
                    "mobileNavDisplayType": "none",

                    // === ANIMATION ===
                    "transitionSpeedType": "medium",
                    "slideSpacingType": "medium",

                    // === DOTS & COUNTER ===
                    "dotsSpacingType": "medium",
                    "dotsMarginType": "large",
                    "counterMarginType": "medium",
                    "counterSizeType": "small",

                    // === TESTIMONIALS 1-15 ===
                    "testimonial1Text": "Kerberos hat unsere Compliance-Prozesse revolutioniert. Was früher Wochen dauerte, erledigen wir jetzt in Minuten. Eine Investition, die sich bereits nach wenigen Monaten amortisiert hat.",
                    "testimonial1Author": "Dr. Michael Schmidt",
                    "testimonial1Position": "Geschäftsführer",
                    "testimonial1Company": "FinTech Solutions GmbH",
                    "testimonial1CompanyLogo": "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=80&h=40&fit=crop",
                    "testimonial1CompanyLink": "https://www.fintech-solutions.de",
                    "testimonial1Rating": "5",
                    "testimonial1Image": "",
                    "testimonial1Active": "true",

                    "testimonial2Text": "Die beste Investition für unser Unternehmen. Endlich haben wir Rechtssicherheit und können uns aufs Kerngeschäft konzentrieren. Der Support ist hervorragend.",
                    "testimonial2Author": "Sarah Weber",
                    "testimonial2Position": "Compliance Officer",
                    "testimonial2Company": "Real Estate Partners",
                    "testimonial2CompanyLogo": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=40&fit=crop",
                    "testimonial2CompanyLink": "https://www.realestate-partners.com",
                    "testimonial2Rating": "5",
                    "testimonial2Image": "",
                    "testimonial2Active": "true",

                    "testimonial3Text": "Hervorragender Support und eine Plattform, die wirklich funktioniert. Kerberos versteht die Bedürfnisse von KMUs perfekt.",
                    "testimonial3Author": "Thomas Müller",
                    "testimonial3Position": "CFO",
                    "testimonial3Company": "TechStart Industries",
                    "testimonial3CompanyLogo": "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=80&h=40&fit=crop",
                    "testimonial3CompanyLink": "https://www.techstart.com",
                    "testimonial3Rating": "5",
                    "testimonial3Image": "",
                    "testimonial3Active": "true",

                    "testimonial4Text": "Die Automatisierung hat uns enorm geholfen. Compliance ist jetzt kein Stressfaktor mehr, sondern läuft im Hintergrund.",
                    "testimonial4Author": "Julia Schneider",
                    "testimonial4Position": "Geschäftsführerin",
                    "testimonial4Company": "Green Energy Solutions",
                    "testimonial4CompanyLogo": "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=80&h=40&fit=crop",
                    "testimonial4CompanyLink": "https://www.green-energy.de",
                    "testimonial4Rating": "5",
                    "testimonial4Image": "",
                    "testimonial4Active": "true",

                    "testimonial5Text": "Professionell, zuverlässig und effizient. Kerberos hat unsere Erwartungen übertroffen und wird dauerhaft Teil unserer Infrastruktur bleiben.",
                    "testimonial5Author": "Robert König",
                    "testimonial5Position": "Legal Director",
                    "testimonial5Company": "Manufacturing Excellence",
                    "testimonial5CompanyLogo": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=80&h=40&fit=crop",
                    "testimonial5CompanyLink": "https://www.manufacturing-excellence.com",
                    "testimonial5Rating": "5",
                    "testimonial5Image": "",
                    "testimonial5Active": "true",

                    // === TESTIMONIALS 6-15 (INACTIVE BY DEFAULT) ===
                    "testimonial6Text": "",
                    "testimonial6Author": "",
                    "testimonial6Position": "",
                    "testimonial6Company": "",
                    "testimonial6CompanyLogo": "",
                    "testimonial6CompanyLink": "",
                    "testimonial6Rating": "5",
                    "testimonial6Image": "",
                    "testimonial6Active": "false",

                    "testimonial7Text": "",
                    "testimonial7Author": "",
                    "testimonial7Position": "",
                    "testimonial7Company": "",
                    "testimonial7CompanyLogo": "",
                    "testimonial7CompanyLink": "",
                    "testimonial7Rating": "5",
                    "testimonial7Image": "",
                    "testimonial7Active": "false",

                    "testimonial8Text": "",
                    "testimonial8Author": "",
                    "testimonial8Position": "",
                    "testimonial8Company": "",
                    "testimonial8CompanyLogo": "",
                    "testimonial8CompanyLink": "",
                    "testimonial8Rating": "5",
                    "testimonial8Image": "",
                    "testimonial8Active": "false",

                    "testimonial9Text": "",
                    "testimonial9Author": "",
                    "testimonial9Position": "",
                    "testimonial9Company": "",
                    "testimonial9CompanyLogo": "",
                    "testimonial9CompanyLink": "",
                    "testimonial9Rating": "5",
                    "testimonial9Image": "",
                    "testimonial9Active": "false",

                    "testimonial10Text": "",
                    "testimonial10Author": "",
                    "testimonial10Position": "",
                    "testimonial10Company": "",
                    "testimonial10CompanyLogo": "",
                    "testimonial10CompanyLink": "",
                    "testimonial10Rating": "5",
                    "testimonial10Image": "",
                    "testimonial10Active": "false",

                    "testimonial11Text": "",
                    "testimonial11Author": "",
                    "testimonial11Position": "",
                    "testimonial11Company": "",
                    "testimonial11CompanyLogo": "",
                    "testimonial11CompanyLink": "",
                    "testimonial11Rating": "5",
                    "testimonial11Image": "",
                    "testimonial11Active": "false",

                    "testimonial12Text": "",
                    "testimonial12Author": "",
                    "testimonial12Position": "",
                    "testimonial12Company": "",
                    "testimonial12CompanyLogo": "",
                    "testimonial12CompanyLink": "",
                    "testimonial12Rating": "5",
                    "testimonial12Image": "",
                    "testimonial12Active": "false",

                    "testimonial13Text": "",
                    "testimonial13Author": "",
                    "testimonial13Position": "",
                    "testimonial13Company": "",
                    "testimonial13CompanyLogo": "",
                    "testimonial13CompanyLink": "",
                    "testimonial13Rating": "5",
                    "testimonial13Image": "",
                    "testimonial13Active": "false",

                    "testimonial14Text": "",
                    "testimonial14Author": "",
                    "testimonial14Position": "",
                    "testimonial14Company": "",
                    "testimonial14CompanyLogo": "",
                    "testimonial14CompanyLink": "",
                    "testimonial14Rating": "5",
                    "testimonial14Image": "",
                    "testimonial14Active": "false",

                    "testimonial15Text": "",
                    "testimonial15Author": "",
                    "testimonial15Position": "",
                    "testimonial15Company": "",
                    "testimonial15CompanyLogo": "",
                    "testimonial15CompanyLink": "",
                    "testimonial15Rating": "5",
                    "testimonial15Image": "",
                    "testimonial15Active": "false"
                }
            },

            {
                "id": "kerberos-team-gallery",
                "name": "Team Galerie",
                "category": "Team & About",
                "description": "Mitarbeiter-Galerie mit Bildern und Fallback-Avatars",
                "html": `<section style="padding: {{sectionSpacing}}; background: {{backgroundColor}};">
                    <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                        <div style="text-align: center; margin-bottom: {{titleSpacing}};">
                            <h2 style="font-family: var(--heading-font-font-family); font-size: var(--heading-2-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: {{titleColor}}; margin: 0 0 1rem 0;">{{title}}</h2>
                            <p style="font-family: var(--body-font-font-family); font-size: var(--normal-text-size); line-height: var(--body-font-line-height); color: {{subtitleColor}}; max-width: 600px; margin: 0 auto;">{{subtitle}}</p>
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax({{cardMinWidthType}}, 1fr)); gap: {{teamGap}}; max-width: {{maxWidthType}};">
                            {{teamMembers}}
                        </div>
                    </div>
                </section>`,
                "properties": {
                    // === HEADER ===
                    "title": "Unser Expertenteam",
                    "titleColor": "#063AA8",
                    "titleSpacing": "3rem",
                    "subtitle": "Professionelle Compliance-Beratung von erfahrenen Spezialisten",
                    "subtitleColor": "#6c757d",

                    // === LAYOUT ===
                    "backgroundColor": "#FFFFFF",
                    "sectionSpacing": "6rem 0",
                    "teamGap": "2rem",
                    "cardMinWidthType": "medium",
                    "maxWidthType": "large",

                    // === CARD STYLING ===
                    "cardPaddingType": "large",
                    "avatarSizeType": "large",

                    // === TEAM MEMBER COUNT ===
                    "teamMemberCount": "2",

                    // === TEAM MEMBERS ===
                    "member1Name": "Dr. Michael Kerberos",
                    "member1Position": "Senior Compliance Consultant",
                    "member1Description": "Über 15 Jahre Erfahrung in Geldwäsche-Prävention und Compliance-Management.",
                    "member1Image": "",
                    "member1InitialBg": "linear-gradient(135deg, #063AA8, #009CE6)",
                    "member1Active": "true",

                    "member2Name": "Anna Schmidt",
                    "member2Position": "DSGVO & Datenschutz Spezialistin",
                    "member2Description": "Expertin für Datenschutzrecht und DSGVO-konforme Implementierungen.",
                    "member2Image": "",
                    "member2InitialBg": "linear-gradient(135deg, #B265E9, #EF8646)",
                    "member2Active": "true",

                    "member3Name": "Thomas Müller",
                    "member3Position": "IT-Security Experte",
                    "member3Description": "Spezialist für Cybersecurity und technische Compliance-Implementierung.",
                    "member3Image": "",
                    "member3InitialBg": "linear-gradient(135deg, #EF8646, #28a745)",
                    "member3Active": "false",

                    "member4Name": "Sarah Weber",
                    "member4Position": "Legal Consultant",
                    "member4Description": "Rechtsanwältin mit Fokus auf Compliance und Unternehmensrecht.",
                    "member4Image": "",
                    "member4InitialBg": "linear-gradient(135deg, #28a745, #063AA8)",
                    "member4Active": "false",

                    // === TEXT FARBEN ===
                    "nameColor": "#212529",
                    "positionColor": "#6c757d",
                    "descriptionColor": "#6c757d"
                }
            },

            {
                "id": "kerberos-stats",
                "name": "Statistiken mit Icons",
                "category": "Statistics & Numbers",
                "description": "Zahlen und Fakten mit anpassbaren Icons und Abständen",
                "html": `<style>
                    .kerberos-module-{{templateId}} .kerberos-stat-card {
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                        cursor: pointer !important;
                    }
                    .kerberos-module-{{templateId}} .kerberos-stat-card:hover {
                        transform: {{hoverTransformType}} !important;
                        box-shadow: {{hoverShadowType}} !important;
                    }
                    .kerberos-module-{{templateId}} .kerberos-stat-icon {
                        transition: all 0.3s ease !important;
                    }
                    .kerberos-module-{{templateId}} .kerberos-stat-card:hover .kerberos-stat-icon {
                        transform: {{iconHoverTransformType}} !important;
                    }
                    @media (max-width: 768px) {
                        .kerberos-module-{{templateId}} .kerberos-stats-grid {
                            grid-template-columns: repeat(auto-fit, minmax({{mobileMinWidthType}}, 1fr)) !important;
                            gap: {{mobileGapType}} !important;
                        }
                        .kerberos-module-{{templateId}} .kerberos-stat-card {
                            padding: {{mobilePaddingType}} !important;
                        }
                    }
                </style>
                <section style="padding: {{sectionSpacing}}; background: {{backgroundColor}};" class="kerberos-module-{{templateId}}">
                    <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                        <div style="text-align: center; margin-bottom: {{titleSpacing}};">
                            <h2 style="font-family: var(--heading-font-font-family); font-size: var(--heading-2-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: {{titleColor}}; margin: 0;">{{title}}</h2>
                        </div>
                        <div class="kerberos-stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax({{statMinWidthType}}, 1fr)); gap: {{statsGap}};">
                            {{statsBlocks}}
                        </div>
                    </div>
                </section>`,
                "properties": {
                    // === GRUNDLAGEN ===
                    "title": "Unsere Erfolge in Zahlen",
                    "titleColor": "#063AA8",
                    "titleSpacing": "3rem",
                    "sectionSpacing": "6rem 0",
                    "backgroundColor": "#FFFFFF",

                    // === LAYOUT & DESIGN ===
                    "statsGap": "2rem",
                    "statMinWidthType": "medium",
                    "cardBackground": "#FFFFFF",
                    "cardBorder": "#E9ECEF",
                    "cardRadiusType": "medium",
                    "cardPaddingType": "large",
                    "cardShadowType": "light",

                    // === HOVER EFFEKTE ===
                    "enableHoverEffects": "true",
                    "hoverTransformType": "translateY(-4px)",
                    "hoverShadowType": "strong",
                    "iconHoverTransformType": "scale(1.1)",

                    // === ICON DESIGN ===
                    "iconSizeType": "large",
                    "iconBackgroundSizeType": "large",
                    "iconRadiusType": "circle",
                    "iconBackgroundColor": "rgba(6,58,168,0.1)",
                    "iconSpacing": "1rem",

                    // === TEXT GRÖSSEN ===
                    "numberSizeType": "extra-large",
                    "numberSpacing": "0.5rem",
                    "textSizeType": "medium",

                    // === RESPONSIVE ===
                    "mobileMinWidthType": "small",
                    "mobilePaddingType": "medium",
                    "mobileGapType": "medium",

                    // === STATISTIK-DATEN ===
                    "stat1Number": "500+",
                    "stat1Text": "Zufriedene Kunden",
                    "stat1Icon": "&#xf0c0;",
                    "stat1IconColor": "#063AA8",
                    "stat1NumberColor": "#063AA8",
                    "stat1TextColor": "#6c757d",

                    "stat2Number": "15+",
                    "stat2Text": "Jahre Erfahrung",
                    "stat2Icon": "&#xf559;",
                    "stat2IconColor": "#009CE6",
                    "stat2NumberColor": "#009CE6",
                    "stat2TextColor": "#6c757d",

                    "stat3Number": "99%",
                    "stat3Text": "Erfolgsquote",
                    "stat3Icon": "&#xf005;",
                    "stat3IconColor": "#B265E9",
                    "stat3NumberColor": "#B265E9",
                    "stat3TextColor": "#6c757d",

                    "stat4Number": "24/7",
                    "stat4Text": "Support",
                    "stat4Icon": "&#xf590;",
                    "stat4IconColor": "#EF8646",
                    "stat4NumberColor": "#EF8646",
                    "stat4TextColor": "#6c757d"
                }
            },

            {
                "id": "kerberos-image-text",
                "name": "Bild-Text Kombination",
                "category": "Content & Images",
                "description": "Kombination aus Bild und Text mit Icon und Button",
                "html": `<section style="background: {{backgroundColor}}; padding: {{sectionSpacing}};">
                    <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                        {{layoutContent}}
                    </div>
                </section>`,
                "properties": {
                    // === CONTENT ===
                    "title": "Professionelle Compliance-Lösungen",
                    "titleColor": "#063AA8",
                    "text": "Wir unterstützen Sie bei der Umsetzung aller Compliance-Anforderungen. Von der Erstberatung bis zur vollständigen Implementierung stehen wir Ihnen zur Seite.",
                    "textColor": "#6c757d",

                    // === PRIMARY BUTTON ===
                    "primaryButtonText": "Mehr erfahren",
                    "primaryButtonLink": "#",
                    "primaryButtonBackground": "#063AA8",
                    "primaryButtonColor": "#FFFFFF",

                    // === IMAGE ===
                    "imageUrl": "https://images.squarespace-cdn.com/content/651eacf7cae17a228645a660/384fcd3a-8979-4ff0-a714-da53b56331a7/KYC-Pr%C3%BCfbericht+-+Max+Mustermann+-+API.jpg",
                    "imageAlt": "Compliance Beratung",
                    "imageHeightType": "auto",
                    "imageObjectFitType": "cover",
                    "imageObjectPositionType": "center",
                    "imageCustomCSS": "",

                    // === ICON ===
                    "iconClass": "&#xf132;",
                    "iconColor": "#063AA8",

                    // === LAYOUT ===
                    "backgroundColor": "#FFFFFF",
                    "layoutType": "image-left",
                    "sectionSpacing": "6rem 0",
                    "contentGap": "4rem"
                }
            },

            {
                "id": "kerberos-image-text-modern",
                "name": "Modernes Bild-Text Layout",
                "category": "Content & Images",
                "description": "Vollständig responsives Bild-Text Layout mit modernen Design-Elementen",
                "html": `<section style="padding: {{sectionSpacing}}; background: {{backgroundColor}};">
                    <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: {{contentGap}}; align-items: center; min-height: {{minHeightType}};">
                            <div style="order: {{imageOrder}};">
                                <div style="position: relative; overflow: hidden; border-radius: {{imageRadiusType}}; box-shadow: {{imageShadowType}};">
                                    {{responsiveImageElement}}
                                </div>
                            </div>
                            <div style="order: {{textOrder}}; padding: {{contentPaddingType}};">
                                <div style="margin-bottom: {{iconSpacing}}; display: {{showIcon}};">
                                    <div style="font-family: 'Font Awesome 5 Pro'; font-size: {{iconSizeType}}; color: {{iconColor}}; display: inline-flex; align-items: center; justify-content: center; width: {{iconContainerSizeType}}; height: {{iconContainerSizeType}}; background: {{iconBackground}}; border-radius: {{iconRadiusType}};">{{iconClass}}</div>
                                </div>
                                <div style="margin-bottom: {{titleSpacing}};">
                                    <h3 style="font-family: var(--heading-font-font-family); font-size: {{titleSizeType}}; font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: {{titleColor}}; margin: 0;">{{title}}</h3>
                                </div>
                                <div style="margin-bottom: {{textSpacing}};">
                                    <p style="font-family: var(--body-font-font-family); font-size: {{textSizeType}}; line-height: var(--body-font-line-height); color: {{textColor}}; margin: 0;">{{text}}</p>
                                </div>
                                <div style="margin-top: {{primaryButtonSpacing}}; display: {{showPrimaryButton}};">
                                    <a href="{{primaryButtonLink}}" style="font-family: var(--button-font-family); font-weight: var(--button-font-weight); background: {{primaryButtonBackground}}; color: {{primaryButtonColor}}; padding: {{primaryButtonPaddingType}}; border-radius: {{primaryButtonRadiusType}}; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; border: {{primaryButtonBorderType}}; box-shadow: {{primaryButtonShadowType}};">
                                        {{primaryButtonText}}
                                        <span style="font-family: 'Font Awesome 5 Pro'; display: {{showPrimaryButtonIcon}};">{{primaryButtonIcon}}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>`,
                "properties": {
                    // === CONTENT ===
                    "title": "Professionelle Compliance-Lösungen",
                    "titleColor": "#063AA8",
                    "titleSizeType": "large",
                    "titleSpacing": "1rem",
                    "text": "Wir unterstützen Sie bei der Umsetzung aller Compliance-Anforderungen. Von der Erstberatung bis zur vollständigen Implementierung stehen wir Ihnen zur Seite.",
                    "textColor": "#6c757d",
                    "textSizeType": "medium",
                    "textSpacing": "2rem",

                    // === PRIMARY BUTTON ===
                    "primaryButtonText": "Mehr erfahren",
                    "primaryButtonLink": "#",
                    "primaryButtonBackground": "#063AA8",
                    "primaryButtonColor": "#FFFFFF",
                    "primaryButtonPaddingType": "medium",
                    "primaryButtonRadiusType": "medium",
                    "primaryButtonBorderType": "none",
                    "primaryButtonShadowType": "medium",
                    "primaryButtonSpacing": "2rem",
                    "primaryButtonIcon": "&#xf061;",
                    "showPrimaryButton": "true",
                    "showPrimaryButtonIcon": "true",

                    // === IMAGE ===
                    "imageUrl": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500",
                    "imageAlt": "Compliance Beratung",
                    "imageRadiusType": "medium",
                    "imageShadowType": "strong",
                    "imageHeightType": "auto",
                    "imageObjectFitType": "cover",
                    "imageObjectPositionType": "center",
                    "imageCustomCSS": "",

                    // === ICON ===
                    "iconClass": "&#xf132;",
                    "iconColor": "#063AA8",
                    "iconSizeType": "large",
                    "iconBackground": "rgba(6,58,168,0.1)",
                    "iconRadiusType": "circle",
                    "iconSpacing": "1rem",
                    "iconContainerSizeType": "medium",
                    "showIcon": "true",

                    // === LAYOUT ===
                    "backgroundColor": "#FFFFFF",
                    "imageOrder": "1",
                    "textOrder": "2",
                    "sectionSpacing": "6rem 0",
                    "contentGap": "4rem",
                    "contentPaddingType": "none",
                    "minHeightType": "medium"
                }
            },

            {
                "id": "kerberos-cta-modern",
                "name": "Moderne Call-to-Action",
                "category": "Contact & CTA",
                "description": "Moderne CTA-Sektion mit Gradient-Hintergrund und animierten Elementen",
                "html": `<section style="padding: {{sectionSpacing}}; background: {{backgroundColor}}; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: {{backgroundPattern}}; opacity: {{backgroundOpacityType}};"></div>
                    <div style="max-width: 1000px; margin: 0 auto; padding: 0 2rem; text-align: center; position: relative; z-index: 2;">
                        <div style="margin-bottom: {{iconSpacing}}; display: {{showIcon}};">
                            <div style="font-family: 'Font Awesome 5 Pro'; font-size: {{iconSizeType}}; color: {{iconColor}}; display: inline-flex; align-items: center; justify-content: center; width: {{iconContainerSizeType}}; height: {{iconContainerSizeType}}; background: {{iconBackground}}; border-radius: {{iconRadiusType}}; box-shadow: {{iconShadowType}};">{{iconClass}}</div>
                        </div>
                        <div style="margin-bottom: {{titleSpacing}};">
                            <h2 style="font-family: var(--heading-font-font-family); font-size: {{titleSizeType}}; font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: {{titleColor}}; margin: 0;">{{title}}</h2>
                        </div>
                        <div style="margin-bottom: {{textSpacing}};">
                            <p style="font-family: var(--body-font-font-family); font-size: {{textSizeType}}; line-height: var(--body-font-line-height); color: {{textColor}}; margin: 0; max-width: 700px; margin-left: auto; margin-right: auto;">{{text}}</p>
                        </div>
                        <div style="display: flex; flex-wrap: wrap; gap: {{buttonGap}}; justify-content: center; margin-top: {{buttonSpacing}};">
                            <a href="{{primaryButtonLink}}" style="font-family: var(--button-font-family); font-weight: var(--button-font-weight); background: {{primaryButtonBackground}}; color: {{primaryButtonTextColor}}; padding: {{primaryButtonPaddingType}}; border-radius: {{primaryButtonRadiusType}}; text-decoration: none; display: inline-flex; align-items: center; gap: 0.75rem; border: none; transition: all 0.3s ease; box-shadow: {{primaryButtonShadowType}}; font-size: var(--button-font-size);">
                                {{primaryButtonText}}
                                <span style="font-family: 'Font Awesome 5 Pro';">{{primaryButtonIcon}}</span>
                            </a>
                            <a href="{{secondaryButtonLink}}" style="font-family: var(--button-font-family); font-weight: var(--button-font-weight); background: {{secondaryButtonBackground}}; color: {{secondaryButtonTextColor}}; padding: {{secondaryButtonPaddingType}}; border-radius: {{secondaryButtonRadiusType}}; text-decoration: none; display: {{showSecondaryButton}}; align-items: center; gap: 0.75rem; border: 2px solid rgba(255,255,255,0.3); transition: all 0.3s ease; box-shadow: {{secondaryButtonShadowType}}; font-size: var(--button-font-size);">
                                {{secondaryButtonText}}
                                <span style="font-family: 'Font Awesome 5 Pro';">{{secondaryButtonIcon}}</span>
                            </a>
                        </div>
                    </div>
                </section>`,
                "properties": {
                    // === CONTENT ===
                    "title": "Bereit für professionelle Compliance?",
                    "titleColor": "#FFFFFF",
                    "titleSizeType": "extra-large",
                    "titleSpacing": "1.5rem",
                    "text": "Lassen Sie uns gemeinsam Ihre Compliance-Herausforderungen meistern. Kontaktieren Sie unser Expertenteam für eine kostenlose Erstberatung.",
                    "textColor": "rgba(255,255,255,0.9)",
                    "textSizeType": "medium",
                    "textSpacing": "3rem",

                    // === ICON ===
                    "iconClass": "&#xf0e0;",
                    "iconColor": "#FFFFFF",
                    "iconSizeType": "extra-large",
                    "iconContainerSizeType": "large",
                    "iconBackground": "rgba(255,255,255,0.1)",
                    "iconRadiusType": "circle",
                    "iconShadowType": "strong",
                    "iconSpacing": "2rem",
                    "showIcon": "true",

                    // === PRIMARY BUTTON ===
                    "primaryButtonText": "Kostenlose Beratung",
                    "primaryButtonLink": "#kontakt",
                    "primaryButtonBackground": "#FFFFFF",
                    "primaryButtonTextColor": "#063AA8",
                    "primaryButtonStyleType": "primary",
                    "primaryButtonPaddingType": "large",
                    "primaryButtonRadiusType": "medium",
                    "primaryButtonShadowType": "strong",
                    "primaryButtonIcon": "&#xf095;",

                    // === SECONDARY BUTTON ===
                    "secondaryButtonText": "Portfolio ansehen",
                    "secondaryButtonLink": "#portfolio",
                    "secondaryButtonBackground": "transparent",
                    "secondaryButtonTextColor": "#FFFFFF",
                    "secondaryButtonStyleType": "outline",
                    "secondaryButtonPaddingType": "large",
                    "secondaryButtonRadiusType": "medium",
                    "secondaryButtonShadowType": "none",
                    "secondaryButtonIcon": "&#xf35d;",
                    "showSecondaryButton": "true",

                    // === LAYOUT ===
                    "buttonSpacing": "3rem",
                    "buttonGap": "1rem",
                    "sectionSpacing": "8rem 0",

                    // === BACKGROUND ===
                    "backgroundColor": "linear-gradient(135deg, #063AA8, #009CE6)",
                    "backgroundPattern": "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                    "backgroundOpacityType": "light"
                }
            },

            {
                "id": "kerberos-feature-breaker",
                "name": "Feature Breaker",
                "category": "Content & Services", 
                "description": "Auffälliges Breaker-Modul für besondere Ankündigungen - ALLE PROPERTIES FUNKTIONIEREN",
                "html": `<section style="padding: {{sectionSpacing}}; background: {{backgroundGradient}}; position: relative; overflow: hidden;" class="kerberos-module-{{templateId}}">
                    <div class="breaker-animated-bg" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: {{backgroundOpacityType}}; background: {{backgroundPatternType}}; z-index: 1;"></div>
                    <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; position: relative; z-index: 2;">
                        {{breakerContent}}
                    </div>
                </section>`,
                "properties": {
                    // === CONTENT (RICHTEXT + FARBEN + SPACING) ===
                    "title": "🚀 Neues Feature verfügbar!",
                    "titleColor": "#FFFFFF", 
                    "titleSpacing": "1rem",
                    "subtitle": "Entdecken Sie unsere neueste Innovation",
                    "subtitleColor": "#FFFFFF",
                    "subtitleSpacing": "1.5rem",
                    "description": "Revolutionäre Compliance-Lösung jetzt verfügbar. Begrenzte Zeit - exklusiver Zugang!",
                    "descriptionColor": "rgba(255,255,255,0.9)",
                    "descriptionSpacing": "2rem",

                    // === PRIMARY BUTTON ===
                    "primaryButtonText": "Jetzt entdecken", 
                    "primaryButtonLink": "#",
                    "primaryButtonIcon": "&#xf061;",
                    "primaryButtonStyleType": "secondary", 
                    "primaryButtonPaddingType": "large",
                    "primaryButtonRadiusType": "medium", 
                    "primaryButtonShadowType": "strong",
                    "primaryButtonBackground": "#FFFFFF", 
                    "primaryButtonColor": "#063AA8",

                    // === SECONDARY BUTTON ===
                    "secondaryButtonText": "Mehr erfahren",
                    "secondaryButtonLink": "#",
                    "secondaryButtonIcon": "&#xf0c2;",
                    "secondaryButtonStyleType": "outline",
                    "secondaryButtonPaddingType": "large",
                    "secondaryButtonRadiusType": "medium",
                    "secondaryButtonShadowType": "none", 
                    "secondaryButtonBackground": "transparent",
                    "secondaryButtonColor": "#FFFFFF",
                    "showSecondaryButton": "true",

                    // === BUTTON LAYOUT ===
                    "buttonSpacing": "3rem",
                    "buttonGap": "1rem",

                    // === PRICING & COUNTDOWN (RICHTEXT + FARBEN + SPACING) ===
                    "showPricing": "false",
                    "pricingText": "Ab 99€/Monat",
                    "pricingColor": "#FFFFFF",
                    "pricingSpacing": "2rem",
                    "countdownActive": "false", 
                    "countdownText": "⏰ Begrenzte Zeit verfügbar!",
                    "countdownColor": "#FFFFFF",
                    "countdownSpacing": "2rem",

                    // === DESIGN (KORREKTE MAPPINGS) ===
                    "backgroundGradient": "linear-gradient(135deg, #063AA8 0%, #1E5FDC 50%, #3A7FFF 100%)",
                    "backgroundPatternType": "repeating-diagonal",
                    "backgroundOpacityType": "light",
                    "sectionSpacing": "4rem 0",

                    // === HOVER PROPERTIES ===  
                    "primaryButtonHoverBg": "rgba(6,58,168,0.8)",
                    "primaryButtonHoverColor": "#FFFFFF",
                    "secondaryButtonHoverBg": "#FFFFFF",
                    "secondaryButtonHoverColor": "#063AA8"
                }
            },

            {
                "id": "kerberos-testimonials-carousel",
                "name": "Testimonials Carousel",
                "category": "Team & About",
                "description": "Kundenbewertungen mit automatischem Carousel - JAVASCRIPT REPARIERT",
                "html": `<section style="padding: {{sectionSpacing}}; background: {{backgroundColor}}; overflow: hidden;" class="kerberos-module-{{templateId}}">
                    <div style="max-width: {{maxWidthType}}; margin: 0 auto; padding: 0 2rem;">
                        <div style="text-align: center; margin-bottom: {{titleSpacing}};">
                            <h2 style="font-family: var(--heading-font-font-family); font-size: var(--heading-2-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: {{titleColor}}; margin: 0 0 1rem 0;">{{title}}</h2>
                            <p style="font-family: var(--body-font-font-family); font-size: var(--normal-text-size); line-height: var(--body-font-line-height); color: {{subtitleColor}}; max-width: 700px; margin: 0 auto;">{{subtitle}}</p>
                        </div>
                        <div class="kerberos-testimonials-container" style="position: relative; max-width: 800px; margin: 0 auto;">
                            <div class="kerberos-testimonials-track" style="display: flex; transition: transform {{transitionSpeedType}} ease; overflow: hidden;">
                                {{testimonialSlides}}
                            </div>
                            <div class="testimonials-navigation" style="display: flex; justify-content: center; align-items: center; gap: {{navGapType}}; margin-top: {{navSpacingType}};">
                                <button class="kerberos-prev" style="background: {{navButtonColor}}; color: {{navButtonTextColor}}; border: none; width: {{navButtonSizeType}}; height: {{navButtonSizeType}}; border-radius: {{navButtonRadiusType}}; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: {{navButtonTextSizeType}}; transition: all 0.3s ease; box-shadow: {{navButtonShadowType}};" title="Vorheriges">‹</button>
                                <div class="testimonials-dots" style="display: flex; gap: {{dotsGapType}};">
                                    {{testimonialDots}}
                                </div>
                                <button class="kerberos-next" style="background: {{navButtonColor}}; color: {{navButtonTextColor}}; border: none; width: {{navButtonSizeType}}; height: {{navButtonSizeType}}; border-radius: {{navButtonRadiusType}}; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: {{navButtonTextSizeType}}; transition: all 0.3s ease; box-shadow: {{navButtonShadowType}};" title="Nächstes">›</button>
                            </div>
                        </div>
                    </div>
                </section>`,
                "properties": {
                    // === HEADER ===
                    "title": "Was unsere Kunden sagen",
                    "titleColor": "#063AA8",
                    "subtitle": "Erfahrungen und Bewertungen von zufriedenen Kunden",
                    "subtitleColor": "#6c757d",
                    "titleSpacing": "3rem",

                    // === LAYOUT ===
                    "backgroundColor": "#F8F9FA",
                    "maxWidthType": "extra-large",
                    "sectionSpacing": "6rem 0",

                    // === NAVIGATION ===
                    "navButtonColor": "#063AA8",
                    "navButtonTextColor": "#FFFFFF",
                    "navButtonSizeType": "medium",
                    "navButtonRadiusType": "circle",
                    "navButtonTextSizeType": "large",
                    "navButtonShadowType": "light",
                    "navGapType": "medium",
                    "navSpacingType": "large",
                    "dotsGapType": "small",

                    // === ANIMATION ===
                    "transitionSpeedType": "medium",

                    // === TESTIMONIALS 1-3 ===
                    "testimonial1Text": "Kerberos hat unsere Compliance-Prozesse revolutioniert. Die Automatisierung spart uns wöchentlich Stunden an manueller Arbeit.",
                    "testimonial1Author": "Michael Weber",
                    "testimonial1Position": "CFO",
                    "testimonial1Company": "FinanzGruppe Nord",
                    "testimonial1Rating": "5",
                    "testimonial1Active": "true",

                    "testimonial2Text": "Endlich eine Lösung, die sowohl gründlich als auch benutzerfreundlich ist. Das Support-Team ist exzellent.",
                    "testimonial2Author": "Sarah Zimmermann",
                    "testimonial2Position": "Compliance Officer",
                    "testimonial2Company": "TechConsult GmbH",
                    "testimonial2Rating": "5",
                    "testimonial2Active": "true",

                    "testimonial3Text": "Die Implementierung war überraschend einfach. Innerhalb von wenigen Wochen waren wir vollständig einsatzbereit.",
                    "testimonial3Author": "Dr. Andreas Müller",
                    "testimonial3Position": "Geschäftsführer",
                    "testimonial3Company": "Innovation Partners",
                    "testimonial3Rating": "5",
                    "testimonial3Active": "true",

                    // === TESTIMONIALS 4-15 (INACTIVE) ===
                    "testimonial4Text": "",
                    "testimonial4Author": "",
                    "testimonial4Position": "",
                    "testimonial4Company": "",
                    "testimonial4Rating": "5",
                    "testimonial4Active": "false",

                    "testimonial5Text": "",
                    "testimonial5Author": "",
                    "testimonial5Position": "",
                    "testimonial5Company": "",
                    "testimonial5Rating": "5",
                    "testimonial5Active": "false",

                    "testimonial6Text": "",
                    "testimonial6Author": "",
                    "testimonial6Position": "",
                    "testimonial6Company": "",
                    "testimonial6Rating": "5",
                    "testimonial6Active": "false",

                    "testimonial7Text": "",
                    "testimonial7Author": "",
                    "testimonial7Position": "",
                    "testimonial7Company": "",
                    "testimonial7Rating": "5",
                    "testimonial7Active": "false",

                    "testimonial8Text": "",
                    "testimonial8Author": "",
                    "testimonial8Position": "",
                    "testimonial8Company": "",
                    "testimonial8Rating": "5",
                    "testimonial8Active": "false",

                    "testimonial9Text": "",
                    "testimonial9Author": "",
                    "testimonial9Position": "",
                    "testimonial9Company": "",
                    "testimonial9Rating": "5",
                    "testimonial9Active": "false",

                    "testimonial10Text": "",
                    "testimonial10Author": "",
                    "testimonial10Position": "",
                    "testimonial10Company": "",
                    "testimonial10Rating": "5",
                    "testimonial10Active": "false",

                    "testimonial11Text": "",
                    "testimonial11Author": "",
                    "testimonial11Position": "",
                    "testimonial11Company": "",
                    "testimonial11Rating": "5",
                    "testimonial11Active": "false",

                    "testimonial12Text": "",
                    "testimonial12Author": "",
                    "testimonial12Position": "",
                    "testimonial12Company": "",
                    "testimonial12Rating": "5",
                    "testimonial12Active": "false",

                    "testimonial13Text": "",
                    "testimonial13Author": "",
                    "testimonial13Position": "",
                    "testimonial13Company": "",
                    "testimonial13Rating": "5",
                    "testimonial13Active": "false",

                    "testimonial14Text": "",
                    "testimonial14Author": "",
                    "testimonial14Position": "",
                    "testimonial14Company": "",
                    "testimonial14Rating": "5",
                    "testimonial14Active": "false",

                    "testimonial15Text": "",
                    "testimonial15Author": "",
                    "testimonial15Position": "",
                    "testimonial15Company": "",
                    "testimonial15Rating": "5",
                    "testimonial15Active": "false"
                }
            },

            {
                "id": "kerberos-process-timeline-fixed",
                "name": "Process Timeline (Responsive)",
                "category": "Content & Services",
                "description": "Prozess-Timeline mit perfekter Responsivität und modernen Hover-Effekten",
                "html": `<section style="padding: {{sectionSpacing}}; background: {{backgroundColor}};" class="kerberos-module-{{templateId}}">
                    <div style="max-width: 1000px; margin: 0 auto; padding: 0 2rem;">
                        <div style="text-align: center; margin-bottom: {{titleSpacing}};">
                            <h2 style="font-family: var(--heading-font-font-family); font-size: var(--heading-2-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: {{titleColor}}; margin: 0 0 1rem 0;">{{title}}</h2>
                            <p style="font-family: var(--body-font-font-family); font-size: var(--normal-text-size); line-height: var(--body-font-line-height); color: {{subtitleColor}}; max-width: 600px; margin: 0 auto;">{{subtitle}}</p>
                        </div>
                        <div style="position: relative; max-width: 800px; margin: 0 auto;">
                            <div style="position: absolute; left: 50%; top: 0; bottom: 0; width: {{timelineWidthType}}; background: linear-gradient(to bottom, {{timelineStartColor}}, {{timelineEndColor}}); transform: translateX(-50%); border-radius: {{timelineRadiusType}}; z-index: 1;"></div>
                            {{timelineSteps}}
                        </div>
                        <div style="text-align: center; margin-top: {{ctaSpacing}}; padding-top: {{ctaSpacing}}; border-top: 1px solid rgba(0,0,0,0.05);">
                            <a href="{{ctaLink}}" style="font-family: var(--button-font-family); font-weight: var(--button-font-weight); background: {{ctaBackground}}; color: {{ctaColor}}; padding: {{ctaPaddingType}}; border-radius: {{ctaRadiusType}}; text-decoration: none; display: inline-flex; align-items: center; gap: 0.75rem; transition: all 0.3s ease; box-shadow: {{ctaShadowType}};">
                                {{ctaText}}
                                <span style="font-family: 'Font Awesome 5 Pro';">{{ctaIcon}}</span>
                            </a>
                        </div>
                    </div>
                </section>`,
                "properties": {
                    // === HEADER ===
                    "title": "So funktioniert Kerberos",
                    "titleColor": "#063AA8",
                    "subtitle": "In 4 einfachen Schritten zur vollständigen Compliance-Lösung",
                    "subtitleColor": "#6c757d",
                    "titleSpacing": "3rem",

                    // === LAYOUT ===
                    "backgroundColor": "#F8F9FA",
                    "sectionSpacing": "6rem 0",

                    // === TIMELINE STYLING ===
                    "timelineStartColor": "#063AA8",
                    "timelineEndColor": "#009CE6",
                    "timelineWidthType": "thin",
                    "timelineRadiusType": "small",
                    "timelineSpacingType": "compact",
                    "cardBackground": "#FFFFFF",
                    "cardBorder": "#E5E7EB",
                    "textColor": "#212529",

                    // === STEPS ===
                    "step1Title": "Anmeldung & Setup",
                    "step1Description": "Registrieren Sie sich und richten Sie Ihr Unternehmensprofil in wenigen Minuten ein.",
                    "step1Icon": "&#xf007;",
                    "step1Color": "#063AA8",
                    "step1Number": "1",
                    "step1Active": "true",

                    "step2Title": "Konfiguration",
                    "step2Description": "Passen Sie die Compliance-Module an Ihre Branche und Anforderungen an.",
                    "step2Icon": "&#xf013;",
                    "step2Color": "#009CE6",
                    "step2Number": "2",
                    "step2Active": "true",

                    "step3Title": "Team-Integration",
                    "step3Description": "Laden Sie Ihr Team ein und vergeben Sie die entsprechenden Rollen und Berechtigungen.",
                    "step3Icon": "&#xf0c0;",
                    "step3Color": "#B265E9",
                    "step3Number": "3",
                    "step3Active": "true",

                    "step4Title": "Go-Live & Support",
                    "step4Description": "Starten Sie mit der vollständigen Compliance-Lösung und profitieren Sie von unserem 24/7 Support.",
                    "step4Icon": "&#xf135;",
                    "step4Color": "#EF8646",
                    "step4Number": "4",
                    "step4Active": "true",

                    // === WEITERE STEPS (INACTIVE) ===
                    "step5Title": "",
                    "step5Description": "",
                    "step5Icon": "",
                    "step5Color": "#28A745",
                    "step5Number": "5",
                    "step5Active": "false",

                    "step6Title": "",
                    "step6Description": "",
                    "step6Icon": "",
                    "step6Color": "#DC3545",
                    "step6Number": "6",
                    "step6Active": "false",

                    "step7Title": "",
                    "step7Description": "",
                    "step7Icon": "",
                    "step7Color": "#6C757D",
                    "step7Number": "7",
                    "step7Active": "false",

                    "step8Title": "",
                    "step8Description": "",
                    "step8Icon": "",
                    "step8Color": "#FFC107",
                    "step8Number": "8",
                    "step8Active": "false",

                    // === CTA ===
                    "ctaText": "Jetzt starten",
                    "ctaLink": "/signup",
                    "ctaBackground": "#063AA8",
                    "ctaColor": "#FFFFFF",
                    "ctaIcon": "&#xf061;",
                    "ctaSpacing": "4rem",
                    "ctaPaddingType": "large",
                    "ctaRadiusType": "medium",
                    "ctaShadowType": "medium"
                }
            },

            {
                "id": "kerberos-process-timeline",
                "name": "Process Timeline (Standard)",
                "category": "Content & Services",
                "description": "Standard Prozess-Timeline mit editierbaren Schritten",
                "html": `<section style="padding: {{sectionSpacing}}; background: {{backgroundColor}};" class="kerberos-module-{{templateId}}">
                    <div style="max-width: 1000px; margin: 0 auto; padding: 0 2rem;">
                        <div style="text-align: center; margin-bottom: {{titleSpacing}};">
                            <h2 style="font-family: var(--heading-font-font-family); font-size: var(--heading-2-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: {{titleColor}}; margin: 0 0 1rem 0;">{{title}}</h2>
                            <p style="font-family: var(--body-font-font-family); font-size: var(--normal-text-size); line-height: var(--body-font-line-height); color: {{subtitleColor}}; max-width: 600px; margin: 0 auto;">{{subtitle}}</p>
                        </div>
                        <div style="position: relative; max-width: 800px; margin: 0 auto;">
                            <div style="position: absolute; left: 50%; top: 0; bottom: 0; width: {{timelineWidthType}}; background: linear-gradient(to bottom, {{timelineStartColor}}, {{timelineEndColor}}); transform: translateX(-50%); border-radius: {{timelineRadiusType}}; z-index: 1;"></div>
                            {{timelineSteps}}
                        </div>
                    </div>
                </section>`,
                "properties": {
                    // === HEADER ===
                    "title": "Unser Prozess",
                    "titleColor": "#063AA8",
                    "subtitle": "So begleiten wir Sie zum Erfolg",
                    "subtitleColor": "#6c757d",
                    "titleSpacing": "3rem",

                    // === LAYOUT ===
                    "backgroundColor": "#FFFFFF",
                    "sectionSpacing": "5rem 0",

                    // === TIMELINE STYLING ===
                    "timelineStartColor": "#063AA8",
                    "timelineEndColor": "#009CE6",
                    "timelineWidthType": "thin",
                    "timelineRadiusType": "small",
                    "cardBackground": "#FFFFFF",
                    "cardBorder": "#E5E7EB",
                    "textColor": "#212529",

                    // === STEPS ===
                    "step1Title": "Erstberatung",
                    "step1Description": "Kostenlose Analyse Ihrer aktuellen Situation",
                    "step1Icon": "&#xf086;",
                    "step1Color": "#063AA8",
                    "step1Number": "1",
                    "step1Active": "true",

                    "step2Title": "Implementierung",
                    "step2Description": "Maßgeschneiderte Umsetzung für Ihr Unternehmen",
                    "step2Icon": "&#xf0ad;",
                    "step2Color": "#009CE6",
                    "step2Number": "2",
                    "step2Active": "true",

                    "step3Title": "Erfolg",
                    "step3Description": "Nachhaltiger Erfolg durch kontinuierliche Betreuung",
                    "step3Icon": "&#xf091;",
                    "step3Color": "#28a745",
                    "step3Number": "3",
                    "step3Active": "true",

                    // === WEITERE STEPS (INACTIVE) ===
                    "step4Title": "",
                    "step4Description": "",
                    "step4Icon": "",
                    "step4Color": "#EF8646",
                    "step4Number": "4",
                    "step4Active": "false",

                    "step5Title": "",
                    "step5Description": "",
                    "step5Icon": "",
                    "step5Color": "#B265E9",
                    "step5Number": "5",
                    "step5Active": "false"
                }
            },

            {
                "id": "kerberos-stats-with-hover",
                "name": "Statistiken mit Icons (Hover-Effekte)",
                "category": "Content & Services",
                "description": "Statistik-Darstellung mit animierten Hover-Effekten und Icons",
                "html": `<section style="padding: {{sectionSpacing}}; background: {{backgroundColor}};" class="kerberos-module-{{templateId}}">
                    <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                        <div style="text-align: center; margin-bottom: {{titleSpacing}};">
                            <h2 style="font-family: var(--heading-font-font-family); font-size: var(--heading-2-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: {{titleColor}}; margin: 0 0 1rem 0;">{{title}}</h2>
                            <p style="font-family: var(--body-font-font-family); font-size: var(--normal-text-size); line-height: var(--body-font-line-height); color: {{subtitleColor}}; max-width: 700px; margin: 0 auto;">{{subtitle}}</p>
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax({{cardMinWidthType}}, 1fr)); gap: {{statsGap}};">
                            {{statsContent}}
                        </div>
                    </div>
                </section>`,
                "properties": {
                    // === HEADER ===
                    "title": "Kerberos in Zahlen",
                    "titleColor": "#063AA8",
                    "subtitle": "Vertrauen Sie auf bewährte Expertise und messbare Resultate",
                    "subtitleColor": "#6c757d",
                    "titleSpacing": "3rem",

                    // === LAYOUT ===
                    "backgroundColor": "#FFFFFF",
                    "sectionSpacing": "6rem 0",
                    "statsGap": "3rem",
                    "cardMinWidthType": "medium",

                    // === STYLING ===
                    "iconSizeType": "large",
                    "iconColor": "#063AA8",
                    "numberSizeType": "extra-large",
                    "numberColor": "#063AA8",
                    "textSizeType": "medium",
                    "textColor": "#6c757d",

                    // === HOVER EFFECTS ===
                    "cardHoverTransformType": "translateY(-4px)",
                    "cardHoverShadowType": "strong",
                    "iconHoverTransformType": "scale(1.1)",

                    // === STATS 1-8 ===
                    "stat1Number": "10.000+",
                    "stat1Text": "Durchgeführte KYC-Prüfungen",
                    "stat1Icon": "&#xf007;",
                    "stat1Active": "true",

                    "stat2Number": "99.8%",
                    "stat2Text": "Erkennungsrate bei Auffälligkeiten",
                    "stat2Icon": "&#xf132;",
                    "stat2Active": "true",

                    "stat3Number": "< 2 Min",
                    "stat3Text": "Durchschnittliche Bearbeitungszeit",
                    "stat3Icon": "&#xf017;",
                    "stat3Active": "true",

                    "stat4Number": "500+",
                    "stat4Text": "Zufriedene Unternehmen",
                    "stat4Icon": "&#xf0c0;",
                    "stat4Active": "true",

                    "stat5Number": "",
                    "stat5Text": "",
                    "stat5Icon": "",
                    "stat5Active": "false",

                    "stat6Number": "",
                    "stat6Text": "",
                    "stat6Icon": "",
                    "stat6Active": "false",

                    "stat7Number": "",
                    "stat7Text": "",
                    "stat7Icon": "",
                    "stat7Active": "false",

                    "stat8Number": "",
                    "stat8Text": "",
                    "stat8Icon": "",
                    "stat8Active": "false"
                }
            },

            {
                "id": "kerberos-integrations-grid-fixed",
                "name": "Integrations Grid (Filter funktionsfähig)",
                "category": "Content & Services",
                "description": "Integration-Grid mit funktionierender Filter-Funktion für Squarespace",
                "html": `<section style="padding: {{sectionSpacing}}; background: {{backgroundColor}};" class="kerberos-module-{{templateId}}">
                    <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                        <div style="text-align: center; margin-bottom: {{titleSpacing}};">
                            <h2 style="font-family: var(--heading-font-font-family); font-size: var(--heading-2-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: {{titleColor}}; margin: 0 0 1rem 0;">{{title}}</h2>
                            <p style="font-family: var(--body-font-font-family); font-size: var(--normal-text-size); line-height: var(--body-font-line-height); color: {{subtitleColor}}; max-width: 700px; margin: 0 auto;">{{subtitle}}</p>
                        </div>
                        <div style="margin-bottom: {{contentSpacing}};">
                            <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: {{filterGapType}}; margin-bottom: {{filterSpacingType}};">
                                {{filterButtons}}
                            </div>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax({{cardMinWidthType}}, 1fr)); gap: {{cardsGapType}};">
                                {{integrationCards}}
                            </div>
                        </div>
                    </div>
                </section>`,
                "properties": {
                    // === HEADER ===
                    "title": "Nahtlose Integrationen",
                    "titleColor": "#063AA8",
                    "subtitle": "Verbinden Sie Kerberos mit über 50 führenden Systemen und Plattformen",
                    "subtitleColor": "#6c757d",
                    "titleSpacing": "3rem",

                    // === LAYOUT ===
                    "backgroundColor": "#F8F9FA",
                    "sectionSpacing": "6rem 0",
                    "contentSpacing": "3rem",
                    "filterGapType": "medium",
                    "filterSpacingType": "large",
                    "cardsGapType": "large",
                    "cardMinWidthType": "medium",

                    // === STYLING ===
                    "cardBackgroundColor": "#FFFFFF",
                    "cardBorderColor": "#DEE2E6",
                    "cardRadiusType": "medium",
                    "cardShadowType": "light",
                    "cardHoverShadowType": "strong",

                    // === FILTER BUTTONS ===
                    "filterButtonBgColor": "#FFFFFF",
                    "filterButtonTextColor": "#6c757d",
                    "filterButtonActiveBgColor": "#063AA8",
                    "filterButtonActiveTextColor": "#FFFFFF",
                    "filterButtonRadiusType": "medium",
                    "filterButtonPaddingType": "small",

                    // === INTEGRATIONS 1-12 ===
                    "integration1Name": "Salesforce",
                    "integration1Category": "crm",
                    "integration1Status": "available",
                    "integration1Description": "CRM-Integration für automatisierte Kundenakten",
                    "integration1Icon": "🔷",
                    "integration1Active": "true",

                    "integration2Name": "SAP",
                    "integration2Category": "erp",
                    "integration2Status": "available",
                    "integration2Description": "ERP-Integration für Stammdaten-Synchronisation",
                    "integration2Icon": "💼",
                    "integration2Active": "true",

                    "integration3Name": "Stripe",
                    "integration3Category": "payments",
                    "integration3Status": "available",
                    "integration3Description": "Payment-Provider für Transaktions-Monitoring",
                    "integration3Icon": "💳",
                    "integration3Active": "true",

                    "integration4Name": "Deutsche Bank",
                    "integration4Category": "banks",
                    "integration4Status": "development",
                    "integration4Description": "Banking-Integration für KYC-Datenabgleich",
                    "integration4Icon": "🏦",
                    "integration4Active": "true",

                    "integration5Name": "Microsoft Teams",
                    "integration5Category": "communication",
                    "integration5Status": "available",
                    "integration5Description": "Team-Integration für Compliance-Workflows",
                    "integration5Icon": "💬",
                    "integration5Active": "false",

                    "integration6Name": "Slack",
                    "integration6Category": "communication",
                    "integration6Status": "available",
                    "integration6Description": "Slack-Integration für Benachrichtigungen",
                    "integration6Icon": "📢",
                    "integration6Active": "false",

                    "integration7Name": "Zapier",
                    "integration7Category": "automation",
                    "integration7Status": "available",
                    "integration7Description": "Automatisierung mit 3000+ Apps",
                    "integration7Icon": "⚡",
                    "integration7Active": "false",

                    "integration8Name": "HubSpot",
                    "integration8Category": "crm",
                    "integration8Status": "available",
                    "integration8Description": "CRM-Integration für Lead-Management",
                    "integration8Icon": "🎯",
                    "integration8Active": "false",

                    "integration9Name": "Xero",
                    "integration9Category": "accounting",
                    "integration9Status": "development",
                    "integration9Description": "Buchhaltungs-Integration für Finanzdaten",
                    "integration9Icon": "📊",
                    "integration9Active": "false",

                    "integration10Name": "DATEV",
                    "integration10Category": "accounting",
                    "integration10Status": "available",
                    "integration10Description": "DATEV-Integration für deutsche Buchhaltung",
                    "integration10Icon": "🧮",
                    "integration10Active": "false",

                    "integration11Name": "Outlook",
                    "integration11Category": "communication",
                    "integration11Status": "available",
                    "integration11Description": "E-Mail-Integration für Compliance-Updates",
                    "integration11Icon": "📧",
                    "integration11Active": "false",

                    "integration12Name": "Custom API",
                    "integration12Category": "development",
                    "integration12Status": "available",
                    "integration12Description": "Individuelle API-Integration nach Ihren Anforderungen",
                    "integration12Icon": "🔧",
                    "integration12Active": "false"
                }
            },

            {
                "id": "kerberos-text-button-richtext-fixed",
                "name": "Text-Button-Modul (Secondary Button konfigurierbar)",
                "category": "Content & Images",
                "description": "Text-Modul mit konfigurierbarem zweiten Button und Rich-Text-Editor",
                "html": `<section style="padding: {{sectionSpacing}}; background: {{backgroundColor}}; text-align: {{textAlignmentType}};" class="kerberos-module-{{templateId}}">
                    <div style="max-width: {{maxWidthType}}; margin: 0 auto; padding: 0 2rem;">
                        <div style="margin-bottom: {{iconSpacing}}; display: {{showIcon}};">
                            <div style="font-family: 'Font Awesome 5 Pro'; font-size: {{iconSizeType}}; color: {{iconColor}}; display: inline-flex; align-items: center; justify-content: center; width: {{iconContainerSizeType}}; height: {{iconContainerSizeType}}; background: {{iconBackground}}; border-radius: {{iconRadiusType}};">{{iconClass}}</div>
                        </div>
                        <div style="margin-bottom: {{titleSpacing}};">
                            <div style="font-family: var(--heading-font-font-family); font-size: var(--heading-2-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: {{titleColor}};">{{titleContent}}</div>
                        </div>
                        <div style="margin-bottom: {{textSpacing}};">
                            <div style="font-family: var(--body-font-font-family); font-size: var(--body-text-size); line-height: var(--body-font-line-height); color: {{textColor}};">{{textContent}}</div>
                        </div>
                        <div style="margin-bottom: {{buttonSpacing}};">
                            <div style="display: flex; flex-wrap: wrap; gap: {{buttonGapType}}; justify-content: {{buttonJustifyType}};">
                                <a href="{{primaryButtonLink}}" style="font-family: var(--button-font-family); font-weight: var(--button-font-weight); background: {{primaryButtonBackground}}; color: {{primaryButtonColor}}; padding: {{primaryButtonPadding}}; border-radius: {{primaryButtonRadius}}; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease; box-shadow: {{primaryButtonShadow}};">
                                    {{primaryButtonText}}
                                    <span style="font-family: 'Font Awesome 5 Pro';">{{primaryButtonIcon}}</span>
                                </a>
                                <a href="{{secondaryButtonLink}}" style="font-family: var(--button-font-family); font-weight: var(--button-font-weight); background: {{secondaryButtonBackground}}; color: {{secondaryButtonTextColor}}; padding: {{secondaryButtonPadding}}; border-radius: {{secondaryButtonRadius}}; text-decoration: none; display: {{showSecondaryButton}}; align-items: center; gap: 0.5rem; border: {{secondaryButtonBorder}}; transition: all 0.3s ease; box-shadow: {{secondaryButtonShadow}};">
                                    {{secondaryButtonText}}
                                    <span style="font-family: 'Font Awesome 5 Pro';">{{secondaryButtonIcon}}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>`,
                "properties": {
                    // === CONTENT ===
                    "titleContent": "Professionelle Compliance-Beratung",
                    "titleColor": "#063AA8",
                    "titleSpacing": "2rem",
                    "textContent": "Unsere Experten unterstützen Sie bei der Implementierung und Optimierung Ihrer Compliance-Prozesse. Von der Erstberatung bis zur vollständigen Implementierung stehen wir Ihnen zur Seite.",
                    "textColor": "#6c757d",
                    "textSpacing": "2rem",

                    // === PRIMARY BUTTON ===
                    "primaryButtonText": "Beratung anfragen",
                    "primaryButtonLink": "#kontakt",
                    "primaryButtonBackground": "#063AA8",
                    "primaryButtonColor": "#FFFFFF",
                    "primaryButtonPaddingType": "medium",
                    "primaryButtonRadiusType": "medium",
                    "primaryButtonShadowType": "medium",
                    "primaryButtonIcon": "&#xf061;",

                    // === SECONDARY BUTTON ===
                    "secondaryButtonText": "Mehr erfahren",
                    "secondaryButtonLink": "#info",
                    "secondaryButtonBackground": "transparent",
                    "secondaryButtonColor": "#063AA8",
                    "secondaryButtonBorderType": "2px solid #063AA8",
                    "secondaryButtonPaddingType": "medium",
                    "secondaryButtonRadiusType": "medium",
                    "secondaryButtonShadowType": "none",
                    "secondaryButtonIcon": "&#xf05a;",
                    "showSecondaryButton": "true",

                    // === BUTTON LAYOUT ===
                    "buttonGapType": "medium",
                    "buttonJustifyType": "center",

                    // === ICON ===
                    "iconClass": "&#xf0c0;",
                    "iconColor": "#063AA8",
                    "iconSpacing": "1.5rem",
                    "iconBackground": "rgba(6,58,168,0.1)",
                    "iconRadiusType": "circle",
                    "iconContainerSizeType": "large",
                    "iconSizeType": "large",
                    "showIcon": "true",

                    // === LAYOUT ===
                    "backgroundColor": "#FFFFFF",
                    "textAlignmentType": "center",
                    "maxWidthType": "medium",
                    "sectionSpacing": "6rem 0",
                    "buttonSpacing": "0"
                }
            },

            {
                "id": "kerberos-features-grid",
                "name": "Features Grid mit Hover",
                "category": "Content & Services",
                "description": "Interaktives Features-Grid mit CSS-Hover-Animationen und Icons",
                "html": `<style>
                    .kerberos-features-module {
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                    }
                    .kerberos-feature-card {
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                        box-shadow: {{cardShadowType}} !important;
                    }
                    .kerberos-feature-card:hover {
                        transform: {{cardHoverTransformType}} !important;
                        box-shadow: {{cardHoverShadowType}} !important;
                    }
                    .kerberos-feature-card:hover .feature-icon {
                        transform: {{iconHoverTransformType}} !important;
                    }
                    .kerberos-feature-card:hover .feature-overlay {
                        opacity: {{overlayHoverOpacityType}} !important;
                    }
                    .kerberos-btn-features:hover {
                        background: {{primaryButtonHoverBg}} !important;
                        color: {{primaryButtonHoverColor}} !important;
                        transform: {{buttonHoverTransformType}} !important;
                        box-shadow: {{buttonHoverShadowType}} !important;
                    }
                    @media (max-width: 768px) {
                        .kerberos-feature-card {
                            transform: none !important;
                            transition: none !important;
                        }
                    }
                </style>
                <section style="padding: {{sectionSpacing}}; background: {{backgroundColor}};" class="kerberos-features-module">
                    <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                        <div style="text-align: center; margin-bottom: {{titleSpacing}};">
                            <h2 style="font-family: var(--heading-font-font-family); font-size: var(--heading-2-size); font-weight: var(--heading-font-font-weight); line-height: var(--heading-font-line-height); color: {{titleColor}}; margin: 0 0 1rem 0;">{{title}}</h2>
                            <p style="font-family: var(--body-font-font-family); font-size: var(--normal-text-size); line-height: var(--body-font-line-height); color: {{subtitleColor}}; max-width: 700px; margin: 0 auto;">{{subtitle}}</p>
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax({{cardMinWidth}}, 1fr)); gap: {{cardGap}};">
                            {{featureCards}}
                        </div>
                        <div style="text-align: center; margin-top: {{ctaSpacing}};">
                            <a class="kerberos-btn-features" href="{{ctaLink}}" style="font-family: var(--button-font-family); font-weight: var(--button-font-weight); background: {{ctaBackground}}; color: {{ctaColor}}; padding: {{ctaPaddingType}}; border-radius: {{ctaRadiusType}}; text-decoration: none; display: inline-flex; align-items: center; gap: 0.75rem; transition: all 0.3s ease; box-shadow: {{ctaShadowType}};">{{ctaText}}<span style="font-family: 'Font Awesome 5 Pro';">{{ctaIcon}}</span></a>
                        </div>
                    </div>
                </section>`,
                "properties": {
                    // === HEADER ===
                    "title": "Warum Kerberos wählen?",
                    "titleColor": "#063AA8",
                    "titleSpacing": "3rem",
                    "subtitle": "Alles was Sie für eine vollständige Compliance-Lösung benötigen",
                    "subtitleColor": "#6c757d",

                    // === LAYOUT ===
                    "backgroundColor": "#FFFFFF",
                    "cardGap": "2rem",
                    "cardMinWidthType": "medium",
                    "sectionSpacing": "6rem 0",

                    // === CARD STYLING ===
                    "cardBackground": "#FFFFFF",
                    "cardBorder": "#DEE2E6",
                    "cardRadiusType": "medium",
                    "cardPaddingType": "large",
                    "cardShadowType": "light",
                    "cardHoverShadowType": "strong",
                    "cardHoverTransformType": "translateY(-8px)",

                    // === HOVER EFFECTS ===
                    "iconHoverTransformType": "scale(1.1) rotate(5deg)",
                    "overlayHoverOpacityType": "1",

                    // === TEXT FARBEN ===
                    "textColor": "#212529",

                    // === CTA ===
                    "ctaText": "Alle Features entdecken",
                    "ctaLink": "#features",
                    "ctaIcon": "&#xf061;",
                    "ctaBackground": "#063AA8",
                    "ctaColor": "#FFFFFF",
                    "ctaSpacing": "3rem",
                    "ctaPaddingType": "large",
                    "ctaRadiusType": "medium",
                    "ctaShadowType": "medium",

                    // === BUTTON HOVER ===
                    "primaryButtonHoverBg": "rgba(6,58,168,0.8)",
                    "primaryButtonHoverColor": "#FFFFFF",
                    "buttonHoverTransformType": "translateY(-2px)",
                    "buttonHoverShadowType": "strong",

                    // === FEATURES 1-12 ===
                    "feature1Title": "Automatisierte KYC",
                    "feature1Description": "Vollautomatische Kundenidentifikation und -überprüfung in Sekunden statt Stunden.",
                    "feature1Icon": "&#xf2c2;",
                    "feature1Color": "#063AA8",
                    "feature1Active": "true",

                    "feature2Title": "Risikobewertung",
                    "feature2Description": "KI-gestützte Risikoanalyse für präzise Compliance-Entscheidungen.",
                    "feature2Icon": "&#xf132;",
                    "feature2Color": "#009CE6",
                    "feature2Active": "true",

                    "feature3Title": "Echtzeit-Monitoring",
                    "feature3Description": "Kontinuierliche Überwachung aller Transaktionen und Aktivitäten.",
                    "feature3Icon": "&#xf06e;",
                    "feature3Color": "#B265E9",
                    "feature3Active": "true",

                    "feature4Title": "Automatische Meldungen",
                    "feature4Description": "Verdachtsmeldungen werden automatisch erstellt und an die FIU übermittelt.",
                    "feature4Icon": "&#xf0e0;",
                    "feature4Color": "#EF8646",
                    "feature4Active": "true",

                    "feature5Title": "DSGVO-konform",
                    "feature5Description": "Höchste Datenschutzstandards und vollständige DSGVO-Compliance.",
                    "feature5Icon": "&#xf3ed;",
                    "feature5Color": "#28A745",
                    "feature5Active": "true",

                    "feature6Title": "24/7 Support",
                    "feature6Description": "Rund-um-die-Uhr Betreuung durch unsere Compliance-Experten.",
                    "feature6Icon": "&#xf590;",
                    "feature6Color": "#DC3545",
                    "feature6Active": "true",

                    "feature7Title": "",
                    "feature7Description": "",
                    "feature7Icon": "",
                    "feature7Color": "#6C757D",
                    "feature7Active": "false",

                    "feature8Title": "",
                    "feature8Description": "",
                    "feature8Icon": "",
                    "feature8Color": "#FFC107",
                    "feature8Active": "false",

                    "feature9Title": "",
                    "feature9Description": "",
                    "feature9Icon": "",
                    "feature9Color": "#17A2B8",
                    "feature9Active": "false",

                    "feature10Title": "",
                    "feature10Description": "",
                    "feature10Icon": "",
                    "feature10Color": "#6F42C1",
                    "feature10Active": "false",

                    "feature11Title": "",
                    "feature11Description": "",
                    "feature11Icon": "",
                    "feature11Color": "#E83E8C",
                    "feature11Active": "false",

                    "feature12Title": "",
                    "feature12Description": "",
                    "feature12Icon": "",
                    "feature12Color": "#20C997",
                    "feature12Active": "false"
                },
                "customized": true
            },
        ];
