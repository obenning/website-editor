        function renderPropertyPanel() {
            const panel = document.getElementById('propertyPanel');
            
            if (!selectedModule) {
                console.log('📝 Property Panel: Kein Modul ausgewählt');
                // CSS-freie Template-Struktur verwenden
                let emptyTemplate = '<div data-style="EMPTY_STYLES"><p>Kein Modul ausgewählt</p><button onclick="forceResetModuleSelection()" class="btn btn-secondary" style="margin-top: 1rem;">🔧 Reset Module-Auswahl</button></div>';
                const emptyStyles = [
                    'color: #6c757d',
                    'text-align: center',
                    'padding: 1.5rem'
                ].join('; ');

                panel.innerHTML = emptyTemplate.replace('data-style="EMPTY_STYLES"', 'style="' + emptyStyles + '"');
                return;
            }

            // Sichere Modul-Referenz-Prüfung (aus Cheat-Sheet)
            if (!validateModuleReference(selectedModule.id)) {
                console.error('Ungültige Modul-Referenz:', selectedModule.id);
                panel.innerHTML = '<div data-style="ERROR_STYLES">⚠️ Modul-Fehler: Ungültige Referenz</div>';
                return;
            }

            console.log('🔍 Template-ID:', selectedModule.templateId, 'für Modul:', selectedModule.name);

            // === MODULE CONTROLS (IMMER SICHTBAR) ===
            let controlsTemplate = `
                <div data-style="CONTROLS_CONTAINER_STYLES">
                    <h4 data-style="CONTROLS_HEADER_STYLES">
                        🎛️ Module-Steuerung
                        <span data-style="CONTROLS_BADGE_STYLES">${selectedModule.name}</span>
                    </h4>
                    <div data-style="CONTROLS_GRID_STYLES">
                        <button class="btn" onclick="copyModuleCode('${selectedModule.id}')" data-style="CONTROL_BUTTON_STYLES" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                            📋 Code kopieren
                        </button>
                        <button class="btn" onclick="duplicateModule('${selectedModule.id}')" data-style="CONTROL_BUTTON_STYLES" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                            📄 Duplizieren
                        </button>
                        <button class="btn" onclick="editModuleInfo('${selectedModule.id}')" data-style="CONTROL_BUTTON_STYLES" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                            ℹ️ Bearbeiten
                        </button>
                        <button class="btn" onclick="exportSingleModule('${selectedModule.id}')" data-style="CONTROL_BUTTON_STYLES" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                            💾 Exportieren
                        </button>
                        <button class="btn" onclick="moveModule('${selectedModule.id}', -1)" data-style="CONTROL_BUTTON_STYLES" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                            ↑ Nach oben
                        </button>
                        <button class="btn" onclick="moveModule('${selectedModule.id}', 1)" data-style="CONTROL_BUTTON_STYLES" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                            ↓ Nach unten
                        </button>
                        <button class="btn" onclick="deleteIndividualModule('${selectedModule.id}')" data-style="DELETE_BUTTON_STYLES" onmouseover="this.style.background='rgba(220,53,69,0.9)'" onmouseout="this.style.background='rgba(220,53,69,0.8)'">
                            🗑️ Löschen
                        </button>
                    </div>
                </div>
            `;

            // CSS für Controls separat definieren
            const controlsContainerStyles = [
                'background: linear-gradient(135deg, #063AA8, #009CE6)',
                'border-radius: 8px',
                'padding: 1rem',
                'margin-bottom: 1rem',
                'color: white'
            ].join('; ');

            const controlsHeaderStyles = [
                'color: white',
                'margin: 0 0 1rem 0',
                'font-size: 1rem',
                'display: flex',
                'align-items: center',
                'gap: 0.5rem'
            ].join('; ');

            const controlsBadgeStyles = [
                'background: rgba(255,255,255,0.2)',
                'padding: 0.2rem 0.5rem',
                'border-radius: 12px',
                'font-size: 0.7rem',
                'font-weight: normal'
            ].join('; ');

            const controlsGridStyles = [
                'display: grid',
                'grid-template-columns: repeat(auto-fit, minmax(120px, 1fr))',
                'gap: 0.5rem'
            ].join('; ');

            const controlButtonStyles = [
                'background: rgba(255,255,255,0.2)',
                'color: white',
                'border: 1px solid rgba(255,255,255,0.3)',
                'padding: 0.5rem',
                'border-radius: 6px',
                'font-size: 0.8rem',
                'cursor: pointer',
                'transition: all 0.2s'
            ].join('; ');

            const deleteButtonStyles = [
                'background: rgba(220,53,69,0.8)',
                'color: white',
                'border: 1px solid rgba(255,255,255,0.3)',
                'padding: 0.5rem',
                'border-radius: 6px',
                'font-size: 0.8rem',
                'cursor: pointer',
                'transition: all 0.2s'
            ].join('; ');

            // Replace-Operationen für Controls
            controlsTemplate = controlsTemplate.replace('data-style="CONTROLS_CONTAINER_STYLES"', 'style="' + controlsContainerStyles + '"');
            controlsTemplate = controlsTemplate.replace('data-style="CONTROLS_HEADER_STYLES"', 'style="' + controlsHeaderStyles + '"');
            controlsTemplate = controlsTemplate.replace('data-style="CONTROLS_BADGE_STYLES"', 'style="' + controlsBadgeStyles + '"');
            controlsTemplate = controlsTemplate.replace('data-style="CONTROLS_GRID_STYLES"', 'style="' + controlsGridStyles + '"');
            controlsTemplate = controlsTemplate.replace(/data-style="CONTROL_BUTTON_STYLES"/g, 'style="' + controlButtonStyles + '"');
            controlsTemplate = controlsTemplate.replace('data-style="DELETE_BUTTON_STYLES"', 'style="' + deleteButtonStyles + '"');

            const template = MODULE_TEMPLATES.find(t => t && t.id === selectedModule.templateId);

            if (!template) {
                // Template-Platzhalter für Fehlermeldung
                let errorTemplate = `
                    <div data-style="ERROR_CONTAINER_STYLES">
                        <h4>⚠️ Template nicht gefunden</h4>
                        <p>Template-ID: ${selectedModule.templateId}</p>
                        <p>Modul: ${selectedModule.name}</p>
                        <button onclick="fixMissingTemplate('${selectedModule.id}')" class="btn btn-primary" data-style="ERROR_BUTTON_STYLES">Template reparieren</button>
                    </div>
                `;

                // CSS separat definieren
                const errorContainerStyles = [
                    'color: #dc3545',
                    'text-align: center',
                    'padding: 1.5rem',
                    'background: #fee',
                    'border: 1px solid #f5c6cb',
                    'border-radius: 4px'
                ].join('; ');

                const errorButtonStyles = [
                    'margin-top: 1rem'
                ].join('; ');

                // Replace-Operationen
                errorTemplate = errorTemplate.replace('data-style="ERROR_CONTAINER_STYLES"', 'style="' + errorContainerStyles + '"');
                errorTemplate = errorTemplate.replace('data-style="ERROR_BUTTON_STYLES"', 'style="' + errorButtonStyles + '"');

                panel.innerHTML = errorTemplate;
                return;
            }

            // Haupttemplate mit CSS-freier Struktur
            let html = `
                <h4 data-style="HEADER_STYLES">${template.name}</h4>
                <p data-style="DESCRIPTION_STYLES">${template.description}</p>
            `;

            // CSS-Stile separat definieren
            const headerStyles = [
                'color: var(--kerberos-primary)',
                'margin-bottom: 1rem',
                'font-size: 1rem'
            ].join('; ');

            const descriptionStyles = [
                'font-size: 0.8rem',
                'color: #6c757d',
                'margin-bottom: 1.5rem'
            ].join('; ');

            // Gruppiere Properties für Accordion
            const propertyGroups = groupPropertiesForAccordion(selectedModule.properties);

            Object.entries(propertyGroups).forEach(([groupName, groupProperties]) => {
                // SPEZIELLE BEHANDLUNG für Challenge-Solution Content
                if (groupName === 'content' && selectedModule.templateId === 'kerberos-solution-triple-richtext') {
                    html += renderChallengeSolutionContent(selectedModule.properties);
                }
                // STANDARD BEHANDLUNG für alle anderen Groups und Module
                else if (groupName === 'general' || (groupName === 'content' && selectedModule.templateId !== 'kerberos-solution-triple-richtext')) {
                    // Allgemeine Properties ohne Accordion
                    let skipNext = false;
                    groupProperties.forEach(([key, value]) => {
                        // Skip svgHeight wenn svgWidth gerade mit Smart Sizer behandelt wurde
                        if (skipNext && key === 'svgHeight') {
                            skipNext = false;
                            return;
                        }

                        const fieldType = getFieldType(key, value);
                        const label = formatPropertyName(key);

                        // Markiere dass svgHeight übersprungen werden soll
                        if (fieldType === 'svg-sizer') {
                            skipNext = true;
                        }

                        html += renderPropertyField(key, value, fieldType, label);
                    });
                } else {
                    // Accordion für gruppierte Properties
                    const isExpanded = groupProperties.some(([key]) => key.includes('1') || key.includes('Active'));

                    let accordionTemplate = `
                        <div class="property-accordion" data-style="ACCORDION_STYLES">
                            <div class="accordion-header" onclick="toggleAccordion(this)" data-style="ACCORDION_HEADER_STYLES">
                                <span>${formatGroupName(groupName)}</span>
                                <span class="accordion-icon" data-style="ACCORDION_ICON_STYLES">${isExpanded ? '−' : '+'}</span>
                            </div>
                            <div class="accordion-content" data-style="ACCORDION_CONTENT_STYLES">
                                <div data-style="ACCORDION_CONTENT_INNER_STYLES">
                    `;

                    // CSS für Accordion separat definieren
                    const accordionStyles = [
                        'margin: 1rem 0',
                        'border: 1px solid var(--kerberos-border)',
                        'border-radius: 6px',
                        'overflow: hidden'
                    ].join('; ');

                    const accordionHeaderStyles = [
                        'background: var(--kerberos-primary)',
                        'color: white',
                        'padding: 0.75rem 1rem',
                        'cursor: pointer',
                        'display: flex',
                        'justify-content: space-between',
                        'align-items: center',
                        'font-weight: 600',
                        'font-size: 0.9rem'
                    ].join('; ');

                    const accordionIconStyles = [
                        'transition: transform 0.3s ease'
                    ].join('; ');

                    const accordionContentStyles = [
                        'max-height: ' + (isExpanded ? 'none' : '0'),
                        'overflow: hidden',
                        'transition: max-height 0.3s ease',
                        'background: #fafbfc'
                    ].join('; ');

                    const accordionContentInnerStyles = [
                        'padding: 1rem'
                    ].join('; ');

                    // Properties hinzufügen
                    let skipNextAccordion = false;
                    groupProperties.forEach(([key, value]) => {
                        // Skip svgHeight wenn svgWidth gerade mit Smart Sizer behandelt wurde
                        if (skipNextAccordion && key === 'svgHeight') {
                            skipNextAccordion = false;
                            return;
                        }

                        const fieldType = getFieldType(key, value);
                        const label = formatPropertyName(key);

                        // Markiere dass svgHeight übersprungen werden soll
                        if (fieldType === 'svg-sizer') {
                            skipNextAccordion = true;
                        }

                        accordionTemplate += renderPropertyField(key, value, fieldType, label);
                    });

                    accordionTemplate += `
                                </div>
                            </div>
                        </div>
                    `;

                    // Replace-Operationen für Accordion
                    accordionTemplate = accordionTemplate.replace('data-style="ACCORDION_STYLES"', 'style="' + accordionStyles + '"');
                    accordionTemplate = accordionTemplate.replace('data-style="ACCORDION_HEADER_STYLES"', 'style="' + accordionHeaderStyles + '"');
                    accordionTemplate = accordionTemplate.replace('data-style="ACCORDION_ICON_STYLES"', 'style="' + accordionIconStyles + '"');
                    accordionTemplate = accordionTemplate.replace('data-style="ACCORDION_CONTENT_STYLES"', 'style="' + accordionContentStyles + '"');
                    accordionTemplate = accordionTemplate.replace('data-style="ACCORDION_CONTENT_INNER_STYLES"', 'style="' + accordionContentInnerStyles + '"');

                    html += accordionTemplate;
                }
            });

            // Button-Bereich mit Template-Platzhaltern
            let buttonTemplate = `
                <div data-style="BUTTON_CONTAINER_STYLES">
                    <div data-style="AUTO_UPDATE_INFO_STYLES">
                        <span data-style="AUTO_UPDATE_LABEL_STYLES">⚡ Auto-Update aktiv</span><br>
                        <small data-style="AUTO_UPDATE_SUBTITLE_STYLES">Änderungen werden automatisch übernommen</small>
                    </div>
                    <button class="btn btn-success" onclick="applyChanges()" data-style="UPDATE_BUTTON_STYLES">🔄 Sofort aktualisieren</button>
                    <button class="btn btn-secondary" onclick="copyModuleCode('${selectedModule.id}')" data-style="COPY_BUTTON_STYLES">📋 Code kopieren</button>
                    <button class="btn btn-warning" onclick="duplicateModule('${selectedModule.id}')" data-style="DUPLICATE_BUTTON_STYLES">📄 Duplizieren</button>
                </div>
            `;

            // Button-CSS separat definieren
            const buttonContainerStyles = [
                'margin-top: 1.5rem',
                'padding-top: 1rem',
                'border-top: 1px solid var(--kerberos-border)'
            ].join('; ');

            const autoUpdateInfoStyles = [
                'background: #e3f2fd',
                'border: 1px solid #2196f3',
                'border-radius: 6px',
                'padding: 0.75rem',
                'margin-bottom: 1rem',
                'font-size: 0.8rem',
                'text-align: center'
            ].join('; ');

            const autoUpdateLabelStyles = [
                'color: #1976d2'
            ].join('; ');

            const autoUpdateSubtitleStyles = [
                'color: #666'
            ].join('; ');

            const buttonBaseStyles = [
                'width: 100%',
                'margin-bottom: 0.5rem'
            ].join('; ');

            // Code-Ausgabe-Bereich
            let codeTemplate = `
                <div data-style="CODE_CONTAINER_STYLES">
                    <h5 data-style="CODE_HEADER_STYLES">Squarespace Code:</h5>
                    <div class="code-output" id="moduleCode">${escapeHtml(processModuleHTML(selectedModule))}</div>
                    <button class="copy-btn" onclick="copyToClipboard('moduleCode')">📋 Squarespace Code kopieren</button>
                </div>
            `;

            const codeContainerStyles = [
                'margin-top: 1rem'
            ].join('; ');

            const codeHeaderStyles = [
                'font-size: 0.9rem',
                'margin-bottom: 0.5rem',
                'color: var(--kerberos-primary)'
            ].join('; ');

            // Alle Templates zusammenfügen
            html += buttonTemplate + codeTemplate;

            // Alle Replace-Operationen durchführen
            html = html.replace('data-style="HEADER_STYLES"', 'style="' + headerStyles + '"');
            html = html.replace('data-style="DESCRIPTION_STYLES"', 'style="' + descriptionStyles + '"');
            html = html.replace('data-style="BUTTON_CONTAINER_STYLES"', 'style="' + buttonContainerStyles + '"');
            html = html.replace('data-style="AUTO_UPDATE_INFO_STYLES"', 'style="' + autoUpdateInfoStyles + '"');
            html = html.replace('data-style="AUTO_UPDATE_LABEL_STYLES"', 'style="' + autoUpdateLabelStyles + '"');
            html = html.replace('data-style="AUTO_UPDATE_SUBTITLE_STYLES"', 'style="' + autoUpdateSubtitleStyles + '"');
            html = html.replace('data-style="UPDATE_BUTTON_STYLES"', 'style="' + buttonBaseStyles + '"');
            html = html.replace('data-style="COPY_BUTTON_STYLES"', 'style="' + buttonBaseStyles + '"');
            html = html.replace('data-style="DUPLICATE_BUTTON_STYLES"', 'style="' + buttonBaseStyles + '"');
            html = html.replace('data-style="CODE_CONTAINER_STYLES"', 'style="' + codeContainerStyles + '"');
            html = html.replace('data-style="CODE_HEADER_STYLES"', 'style="' + codeHeaderStyles + '"');

            // Controls zuerst, dann der Rest
            panel.innerHTML = controlsTemplate + html;
        }

        // Hauptfunktion: Property aktualisieren
        function updateProperty(key, value) {
            if (!selectedModule) return;

            selectedModule.properties[key] = value;
            // === SVG SMART SIZING: Auto-Update Height when Width changes ===
            if (key === 'svgWidth' && selectedModule.templateId === 'kerberos-svg-hero') {
                const svgCode = selectedModule.properties.svgCode;
                if (svgCode) {
                    const analysis = analyzeSVG(svgCode);
                    const widthNum = parseInt(value) || 200;
                    const heightNum = Math.round(widthNum / analysis.aspectRatio);
                    selectedModule.properties.svgHeight = heightNum + 'px';

                    // Update auch das UI
                    const heightField = document.querySelector('input[value$="' + selectedModule.properties.svgHeight + '"]');
                    if (heightField) heightField.value = heightNum + 'px';
                }
            }

            updateStatus = 'pending';
            showUpdateStatus('pending');

            // Spezielle Behandlung für Team Member Count
            if (key === 'teamMemberCount') {
                const count = parseInt(value);
                // Automatisch die entsprechende Anzahl Mitglieder aktivieren
                for (let i = 1; i <= 4; i++) {
                    selectedModule.properties[`member${i}Active`] = i <= count ? 'true' : 'false';
                }
                // Sofort neu rendern
                renderCanvas();
                renderPropertyPanel();
                showNotification(`✅ ${count} Team-Mitglieder aktiviert`);
                return;
            }

            // Sofortige Updates für visuelle Properties
            if (shouldUpdateImmediately(key)) {
                updateStatus = 'updating';
                showUpdateStatus('updating');
                
                // 🎯 ZUERST LIVE-UPDATE VERSUCHEN
                const liveUpdateSuccess = updateComplexModuleLive(selectedModule.id, key, value);
                
                if (liveUpdateSuccess) {
                    console.log('✅ Live-Update erfolgreich für:', key);
                    updateStatus = 'updated';
                    showUpdateStatus('updated');
                    return; // STOPP - kein renderCanvas() nötig
                } else {
                    console.log('⚠️ Live-Update nicht möglich für:', key, '- verwende renderCanvas()');
                    renderCanvas(); // Nur als Fallback
                }
                
                updateStatus = 'updated';
                showUpdateStatus('updated');
                return;
            }
            // === UNIVERSELLE RICHTEXT-FARB-SYNC ===
            if (selectedModule && key.includes('Color') && !key.includes('Background') && !key.includes('Hover')) {
                setTimeout(() => {
                    if (typeof window.syncAllRichTextColors === 'function') {
                        window.syncAllRichTextColors();
                    }
                }, 50);
            }

            // Standard Updates mit Delay
            clearTimeout(autoApplyTimeout);
            autoApplyTimeout = setTimeout(() => {
                updateStatus = 'updating';
                showUpdateStatus('updating');
                applyChanges();
                updateStatus = 'updated';
                showUpdateStatus('updated');
            }, 500);
        }

        function applyChanges() {
            if (!selectedModule) return;

            const currentModuleId = selectedModule.id; // ID merken BEVOR renderCanvas
            console.log('🔄 applyChanges für Modul:', currentModuleId);

            // WICHTIG: Module verarbeiten VOR renderCanvas
            try {
                selectedModule.processedHTML = processUniversalModule(selectedModule);
            } catch (error) {
                console.error('❌ Fehler beim Verarbeiten des Moduls:', error);
                selectedModule.processedHTML = `<div style="padding: 2rem; background: #f8d7da; color: #721c24;">❌ Fehler: ${error.message}</div>`;
            }

            renderCanvas();

            // WICHTIG: Nur re-selektieren wenn sich das Modul geändert hat
            const activeElement = document.activeElement;
            const isEditingProperty = activeElement && (
                activeElement.classList.contains('form-control') ||
                activeElement.contentEditable === 'true'
            );

            // REPARIERT: Verhindere Re-Selection Loop - aber bewahre Controls
            if (!isEditingProperty && selectedModule && selectedModule.id === currentModuleId) {
                console.log('🔄 Re-selektiere Modul nach Canvas-Update:', currentModuleId);
                // Nur DOM aktualisieren, nicht selectModule() aufrufen
                const moduleEl = document.querySelector(`[data-module-id="${currentModuleId}"]`);
                if (moduleEl) {
                    // 🔧 REPARATUR: Controls checken IMMER (egal ob selected oder nicht)
                    const controlsEl = moduleEl.querySelector('.module-controls');
                    console.log('🔍 Debug: Controls check für Module:', currentModuleId, controlsEl, controlsEl?.children.length);
                    const hasControls = controlsEl && controlsEl.children.length > 0;

                    if (!hasControls) {
                        console.warn('⚠️ Controls fehlen, re-render für:', currentModuleId);
                        // Nur das problematische Modul neu rendern
                        const module = modules.find(m => m.id === currentModuleId);
                        if (module) {
                            moduleEl.innerHTML = `
                                <div class="module-controls">
                                    <button class="control-btn btn-edit" data-action="select" data-module-id="${module.id}" title="Bearbeiten">✏️</button>
                                    <button class="control-btn btn-edit" data-action="editInfo" data-module-id="${module.id}" title="Modul-Info bearbeiten">ℹ️</button>
                                    <button class="control-btn btn-copy" data-action="copy" data-module-id="${module.id}" title="Code kopieren">📋</button>
                                    <button class="control-btn btn-copy" data-action="export" data-module-id="${module.id}" title="Modul exportieren">📤</button>
                                    <button class="control-btn btn-move" data-action="moveUp" data-module-id="${module.id}" title="Nach oben">↑</button>
                                    <button class="control-btn btn-move" data-action="moveDown" data-module-id="${module.id}" title="Nach unten">↓</button>
                                    <button class="control-btn btn-delete" data-action="delete" data-module-id="${module.id}" title="Löschen">🗑️</button>
                                </div>
                                <div style="padding: 0.5rem; background: rgba(6,58,168,0.02); border-radius: 4px; margin-bottom: 0.5rem; font-size: 0.8rem; color: #6c757d; border: 1px solid rgba(6,58,168,0.1);">
                                    📄 ${module.name} <span style="opacity: 0.7;">| ${module.category || 'Custom'}</span>
                                    <span style="background: #28a745; color: white; padding: 0.1rem 0.4rem; border-radius: 10px; font-size: 0.7rem; margin-left: 0.5rem;">LIVE</span>
                                </div>
                                <div class="module-content">${processModuleHTML(module)}</div>
                            `;

                            // 🔧 Event-Listener für die reparierten Controls hinzufügen
                            (function (moduleId, moduleName) {
                                moduleEl.addEventListener('click', function (e) {
                                    e.stopPropagation();

                                    if (e.target.classList.contains('control-btn')) {
                                        const action = e.target.dataset.action;
                                        const targetModuleId = e.target.dataset.moduleId;

                                        switch (action) {
                                            case 'select':
                                                selectModule(targetModuleId);
                                                break;
                                            case 'editInfo':
                                                if (typeof editModuleInfo === 'function') editModuleInfo(targetModuleId);
                                                break;
                                            case 'copy':
                                                if (typeof copyModuleCode === 'function') copyModuleCode(targetModuleId);
                                                break;
                                            case 'export':
                                                if (typeof exportSingleModule === 'function') exportSingleModule(targetModuleId);
                                                break;
                                            case 'moveUp':
                                                if (typeof moveModule === 'function') moveModule(targetModuleId, -1);
                                                break;
                                            case 'moveDown':
                                                if (typeof moveModule === 'function') moveModule(targetModuleId, 1);
                                                break;
                                            case 'delete':
                                                if (typeof deleteIndividualModule === 'function') deleteIndividualModule(targetModuleId);
                                                break;
                                        }
                                    } else {
                                        selectModule(moduleId);
                                    }
                                });
                            })(module.id, module.name);
                        }
                    }

                    // Standard Selection (nur wenn noch nicht selected)
                    if (!moduleEl.classList.contains('selected')) {
                        moduleEl.classList.add('selected');
                        moduleEl.style.zIndex = '5';
                        moduleEl.style.position = 'relative';
                        moduleEl.style.border = '2px solid #063AA8';
                        moduleEl.style.boxShadow = '0 4px 12px rgba(6,58,168,0.2)';
                    }
                }
            }

            showNotification('✅ Änderungen übernommen');

            // FAQ-Interaktivität nach Property-Updates reaktivieren
            if (selectedModule && selectedModule.templateId === 'kerberos-faq-accordion') {
                setTimeout(() => {
                    console.log('🔄 Reaktiviere FAQ-Interaktivität nach Property-Update...');
                    activateModuleInteractivity();
                }, 200);
            }
        }

        // Color Picker rendern
        function renderColorPicker(key, currentValue) {
            const colors = Object.values(KERBEROS_COLORS);
            let html = '<div class="color-picker">';

            // CSS-freie Template-Struktur für Farboptionen
            colors.forEach((color, index) => {
                const selected = color === currentValue ? 'selected' : '';
                const uniqueId = 'COLOR_OPTION_' + index;

                html += '<div class="color-option ' + selected + '" data-style="' + uniqueId + '" onclick="updateProperty(\'' + key + '\', \'' + color + '\')"></div>';

                // CSS für diese spezielle Farboption separat definieren
                const colorOptionStyles = [
                    'background: ' + color
                ].join('; ');

                // Sofortige Replace-Operation für diese Farboption
                html = html.replace('data-style="' + uniqueId + '"', 'style="' + colorOptionStyles + '"');
            });

            html += '</div>';

            // Input-Feld mit Template-Platzhalter
            let inputTemplate = '<input type="text" class="form-control" value="' + currentValue + '" oninput="updateProperty(\'' + key + '\', this.value)" data-style="INPUT_STYLES" placeholder="Hex-Code oder Farbname">';

            // CSS für Input separat definieren
            const inputStyles = [
                'margin-top: 0.5rem'
            ].join('; ');

            // Replace-Operation für Input
            inputTemplate = inputTemplate.replace('data-style="INPUT_STYLES"', 'style="' + inputStyles + '"');

            html += inputTemplate;

            return html;
        }

        // Icon Picker rendern
        function renderIconPicker(key, currentValue) {
            return `
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div style="font-family: 'Font Awesome 5 Pro'; font-size: 1.5rem; padding: 0.5rem; border: 1px solid var(--kerberos-border); border-radius: 4px; min-width: 50px; text-align: center;">
                        ${currentValue || '&#xf132;'}
                    </div>
                    <button type="button" class="btn btn-primary" onclick="showIconPicker('${key}')" style="flex: 1;">Icon auswählen</button>
                </div>
                <input type="text" class="form-control" value="${currentValue}" oninput="updateProperty('${key}', this.value)" style="margin-top: 0.5rem;" placeholder="Unicode (z.B. &#xf132;)">
            `;
        }

        // Image Picker rendern
        function renderImagePicker(key, currentValue) {
            const preview = currentValue ? `<img src="${currentValue}" class="image-preview" alt="Vorschau" style="max-width: 100%; max-height: 150px; border-radius: 4px; margin-top: 0.5rem; display: block;">` : '';

            return `
                <input type="text" class="form-control" value="${currentValue}" oninput="updateProperty('${key}', this.value)" placeholder="Squarespace Bild-URL eingeben..." style="margin-bottom: 0.5rem;">
                <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
                    <button type="button" class="btn btn-secondary" onclick="showImagePicker('${key}')" style="flex: 1;">📸 Bild hochladen/Stock</button>
                    <button type="button" class="btn btn-primary" onclick="showImageEditor('${key}')" style="min-width: auto; background: #063AA8;">🎨</button>
                    <button type="button" class="btn btn-secondary" onclick="updateProperty('${key}', '')" style="min-width: auto;">🗑️</button>
                </div>
                ${preview}
                ${currentValue ? renderImageAdjustments(key) : ''}
                <small style="color: #6c757d; font-size: 0.75rem;">💡 Tipp: Klicken Sie auf 🎨 für erweiterte Bild-Einstellungen</small>
            `;
        }

        // Bild-Anpassungen rendern
        function renderImageAdjustments(key) {
            // KORRIGIERTE BaseKey-Extraktion
            let baseKey = key;
            if (key.endsWith('Url')) {
                baseKey = key.replace('Url', '');
            } else if (key.includes('Image')) {
                baseKey = key.replace('Image', '').replace('image', '');
            } else if (key.includes('background')) {
                baseKey = 'background';
            } else if (key.includes('svg')) {
                baseKey = 'svg';
            }
            
            console.log('🎨 renderImageAdjustments - Key:', key, 'BaseKey:', baseKey);
            
            // Aktuelle Werte aus dem Modul lesen
            const currentObjectFit = selectedModule.properties[`${baseKey}ObjectFit`] || 'cover';
            const currentObjectPosition = selectedModule.properties[`${baseKey}ObjectPosition`] || 'center';
            const currentHeight = selectedModule.properties[`${baseKey}Height`] || 'auto';
            const currentCustomCSS = selectedModule.properties[`${baseKey}CustomCSS`] || '';

            return `
                <div style="margin-top: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 6px; border: 1px solid #dee2e6;">
                    <h5 style="margin: 0 0 1rem 0; font-size: 0.9rem; color: #063AA8;">🎨 Bild-Anpassungen</h5>
                    
                    <div class="form-group" style="margin-bottom: 0.75rem;">
                        <label class="form-label" style="font-size: 0.8rem;">Darstellung</label>
                        <select class="form-control" onchange="updateImageProperty('${baseKey}', 'objectFit', this.value)" style="font-size: 0.85rem;">
                            <option value="cover" ${currentObjectFit === 'cover' ? 'selected' : ''}>Ausfüllen (Cover)</option>
                            <option value="contain" ${currentObjectFit === 'contain' ? 'selected' : ''}>Komplett anzeigen (Contain)</option>
                            <option value="fill" ${currentObjectFit === 'fill' ? 'selected' : ''}>Strecken (Fill)</option>
                            <option value="scale-down" ${currentObjectFit === 'scale-down' ? 'selected' : ''}>Verkleinern (Scale-down)</option>
                            <option value="none" ${currentObjectFit === 'none' ? 'selected' : ''}>Original (None)</option>
                        </select>
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 0.75rem;">
                        <label class="form-label" style="font-size: 0.8rem;">Position</label>
                        <select class="form-control" onchange="updateImageProperty('${baseKey}', 'objectPosition', this.value)" style="font-size: 0.85rem;">
                            <option value="center" ${currentObjectPosition === 'center' ? 'selected' : ''}>Mitte</option>
                            <option value="top" ${currentObjectPosition === 'top' ? 'selected' : ''}>Oben</option>
                            <option value="bottom" ${currentObjectPosition === 'bottom' ? 'selected' : ''}>Unten</option>
                            <option value="left" ${currentObjectPosition === 'left' ? 'selected' : ''}>Links</option>
                            <option value="right" ${currentObjectPosition === 'right' ? 'selected' : ''}>Rechts</option>
                            <option value="top left" ${currentObjectPosition === 'top left' ? 'selected' : ''}>Oben Links</option>
                            <option value="top right" ${currentObjectPosition === 'top right' ? 'selected' : ''}>Oben Rechts</option>
                            <option value="bottom left" ${currentObjectPosition === 'bottom left' ? 'selected' : ''}>Unten Links</option>
                            <option value="bottom right" ${currentObjectPosition === 'bottom right' ? 'selected' : ''}>Unten Rechts</option>
                            <option value="25% 25%" ${currentObjectPosition === '25% 25%' ? 'selected' : ''}>Fokus Oben Links</option>
                            <option value="75% 25%" ${currentObjectPosition === '75% 25%' ? 'selected' : ''}>Fokus Oben Rechts</option>
                            <option value="25% 75%" ${currentObjectPosition === '25% 75%' ? 'selected' : ''}>Fokus Unten Links</option>
                            <option value="75% 75%" ${currentObjectPosition === '75% 75%' ? 'selected' : ''}>Fokus Unten Rechts</option>
                            <option value="50% 25%" ${currentObjectPosition === '50% 25%' ? 'selected' : ''}>Fokus Obere Mitte</option>
                            <option value="50% 75%" ${currentObjectPosition === '50% 75%' ? 'selected' : ''}>Fokus Untere Mitte</option>
                        </select>
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 0.75rem;">
                        <label class="form-label" style="font-size: 0.8rem;">Höhe</label>
                        <select class="form-control" onchange="updateImageProperty('${baseKey}', 'height', this.value)" style="font-size: 0.85rem;">
                            <option value="auto" ${currentHeight === 'auto' ? 'selected' : ''}>Automatisch</option>
                            <option value="150px" ${currentHeight === '150px' ? 'selected' : ''}>Sehr klein (150px)</option>
                            <option value="200px" ${currentHeight === '200px' ? 'selected' : ''}>Klein (200px)</option>
                            <option value="250px" ${currentHeight === '250px' ? 'selected' : ''}>Normal (250px)</option>
                            <option value="300px" ${currentHeight === '300px' ? 'selected' : ''}>Mittel (300px)</option>
                            <option value="400px" ${currentHeight === '400px' ? 'selected' : ''}>Groß (400px)</option>
                            <option value="500px" ${currentHeight === '500px' ? 'selected' : ''}>Sehr groß (500px)</option>
                            <option value="100vh" ${currentHeight === '100vh' ? 'selected' : ''}>Vollbildschirm</option>
                        </select>
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 0;">
                        <label class="form-label" style="font-size: 0.8rem;">Zusätzliche CSS</label>
                        <input type="text" class="form-control" placeholder="z.B. margin: 0; display: block;" value="${currentCustomCSS}" onchange="updateImageProperty('${baseKey}', 'customCSS', this.value)" style="font-size: 0.85rem;">
                        <small style="color: #6c757d; font-size: 0.7rem;">Behebe weiße Striche mit: margin: 0; display: block;</small>
                    </div>
                </div>
            `;
        }

        // Position Picker rendern  
        function renderPositionPicker(key, currentValue) {
            let options = [];

            // Badge-Position
            if (key.includes('badge') || key.includes('Badge')) {
                options = [
                    { value: 'top-left', label: '↖️ Oben Links' },
                    { value: 'top-right', label: '↗️ Oben Rechts' },
                    { value: 'top-center', label: '⬆️ Oben Mitte' },
                    { value: 'bottom-left', label: '↙️ Unten Links' },
                    { value: 'bottom-right', label: '↘️ Unten Rechts' },
                    { value: 'bottom-center', label: '⬇️ Unten Mitte' }
                ];
            }
            // Content-Position
            else {
                options = [
                    { value: 'left', label: '◀️ Links' },
                    { value: 'center', label: '🎯 Mitte' },
                    { value: 'right', label: '▶️ Rechts' },
                    { value: 'top', label: '⬆️ Oben' },
                    { value: 'bottom', label: '⬇️ Unten' }
                ];
            }

            let html = `<select class="form-control" oninput="updateProperty('${key}', this.value)">`;

            options.forEach(option => {
                const selected = option.value === currentValue ? 'selected' : '';
                html += `<option value="${option.value}" ${selected}>${option.label}</option>`;
            });

            html += `</select>`;
            return html;
        }

        // Boolean Picker rendern
        function renderBooleanPicker(key, currentValue) {
            const options = [
                { value: 'true', label: '✅ Anzeigen' },
                { value: 'false', label: '❌ Ausblenden' }
            ];

            let html = `<select class="form-control" oninput="updateProperty('${key}', this.value)">`;

            options.forEach(option => {
                const selected = option.value === currentValue ? 'selected' : '';
                html += `<option value="${option.value}" ${selected}>${option.label}</option>`;
            });

            html += `</select>`;
            return html;
        }     
        
        // Border Preset Picker
        function renderBorderPreset(key, currentValue) {
            const borderPresets = [
                { value: 'none', label: '🚫 Kein Rahmen' },
                { value: '1px solid #063AA8', label: '📏 Dünner Rahmen (Blau)' },
                { value: '2px solid #063AA8', label: '📐 Dicker Rahmen (Blau)' },
                { value: '1px solid rgba(255,255,255,0.3)', label: '👻 Transparenter Rahmen' },
                { value: '2px dashed #009CE6', label: '- - Gestrichelter Rahmen' },
                { value: '3px solid #B265E9', label: '🟣 Dicker Lila Rahmen' }
            ];

            let html = `<select class="form-control" oninput="updateProperty('${key}', this.value)">`;

            borderPresets.forEach(preset => {
                const selected = preset.value === currentValue ? 'selected' : '';
                html += `<option value="${preset.value}" ${selected}>${preset.label}</option>`;
            });

            html += `</select>`;
            return html;
        }        

        // Gradient Preset Picker
        function renderGradientPreset(key, currentValue) {
            const gradientPresets = [
                { value: '#063AA8', label: '🟦 Einfarbig Blau' },
                { value: 'linear-gradient(135deg, #063AA8, #009CE6)', label: '🌊 Blau Gradient' },
                { value: 'linear-gradient(135deg, #063AA8, #B265E9)', label: '🌈 Blau-Lila Gradient' },
                { value: 'linear-gradient(135deg, #212529, #063AA8)', label: '🌚 Dunkel-Blau Gradient' },
                { value: 'linear-gradient(135deg, #EF8646, #B265E9)', label: '🔥 Orange-Lila Gradient' },
                { value: 'linear-gradient(135deg, rgba(6,58,168,0.9), rgba(0,156,230,0.9))', label: '👻 Transparenter Gradient' }
            ];

            let html = `<select class="form-control" oninput="updateProperty('${key}', this.value)">`;

            gradientPresets.forEach(preset => {
                const selected = preset.value === currentValue ? 'selected' : '';
                html += `<option value="${preset.value}" ${selected}>${preset.label}</option>`;
            });

            html += `</select>`;
            return html;
        }

        // Hover Preset Picker - ERWEITERT
        function renderHoverPreset(key, currentValue) {
            const hoverPresets = [
                { value: 'none', label: '🚫 Kein Hover-Effekt' },
                { value: 'translateY(-2px)', label: '⬆️ Leicht nach oben' },
                { value: 'translateY(-4px)', label: '⬆️⬆️ Deutlich nach oben' },
                { value: 'translateY(-6px)', label: '⬆️⬆️⬆️ Stark nach oben' },
                { value: 'scale(1.02)', label: '🔍 Leicht vergrößern' },
                { value: 'scale(1.05)', label: '🔍🔍 Deutlich vergrößern' },
                { value: 'scale(1.1)', label: '🔍🔍🔍 Stark vergrößern' },
                { value: 'rotate(1deg)', label: '↻ Leichte Rotation' },
                { value: 'rotate(3deg)', label: '↻↻ Deutliche Rotation' },
                { value: 'translateY(-4px) scale(1.02)', label: '🚀 Kombination: Hoch + Größer' },
                { value: 'translateY(-6px) scale(1.05)', label: '🚀🚀 Stark: Hoch + größer' },
                { value: 'translateY(-3px) rotate(1deg)', label: '🌪️ Hoch + Rotation' },
                { value: 'scale(1.03) rotate(-1deg)', label: '🎭 Größer + Rotation' }
            ];

            let html = `<select class="form-control" oninput="updateProperty('${key}', this.value)">`;

            hoverPresets.forEach(preset => {
                const selected = preset.value === currentValue ? 'selected' : '';
                html += `<option value="${preset.value}" ${selected}>${preset.label}</option>`;
            });

            html += `</select>`;
            return html;
        }

        // Icon Size Custom Preset Picker (für Rückwärtskompatibilität)
        function renderIconSizeCustomPreset(key, currentValue) {
            const sizePresets = [
                { value: '1.5rem', label: '🔹 Sehr klein (1.5rem)' },
                { value: '2rem', label: '🔸 Klein (2rem)' },
                { value: '2.5rem', label: '🔶 Mittel (2.5rem)' },
                { value: '3rem', label: '🟦 Groß (3rem)' },
                { value: '3.5rem', label: '🟡 Sehr groß (3.5rem)' },
                { value: '4rem', label: '🔴 Riesig (4rem)' },
                { value: '5rem', label: '🟪 Extrem (5rem)' }
            ];

            let html = `<select class="form-control" oninput="updateProperty('${key}', this.value)">`;

            sizePresets.forEach(preset => {
                const selected = preset.value === currentValue ? 'selected' : '';
                html += `<option value="${preset.value}" ${selected}>${preset.label}</option>`;
            });

            html += `</select>`;
            return html;
        }        

        // Stat Min Width Preset Picker
        function renderStatMinWidthPreset(key, currentValue) {
            const widthPresets = [
                { value: '180px', label: '📱 Sehr schmal (180px)' },
                { value: '200px', label: '📱 Schmal (200px)' },
                { value: '220px', label: '📱 Kompakt (220px)' },
                { value: '250px', label: '💻 Standard (250px)' },
                { value: '280px', label: '💻 Breit (280px)' },
                { value: '320px', label: '🖥️ Sehr breit (320px)' },
                { value: '380px', label: '🖥️ Extrem breit (380px)' }
            ];

            let html = `<select class="form-control" oninput="updateProperty('${key}', this.value)">`;

            widthPresets.forEach(preset => {
                const selected = preset.value === currentValue ? 'selected' : '';
                html += `<option value="${preset.value}" ${selected}>${preset.label}</option>`;
            });

            html += `</select>`;
            return html;
        }
        
        // Card Radius Preset Picker
        function renderCardRadiusPreset(key, currentValue) {
            const radiusPresets = [
                { value: '0px', label: '⬜ Keine Rundung (0px)' },
                { value: '4px', label: '🔲 Minimal (4px)' },
                { value: '8px', label: '🔳 Normal (8px)' },
                { value: '12px', label: '🟦 Modern (12px)' },
                { value: '16px', label: '🟡 Stark (16px)' },
                { value: '24px', label: '🔴 Sehr stark (24px)' }
            ];

            let html = `<select class="form-control" oninput="updateProperty('${key}', this.value)">`;

            radiusPresets.forEach(preset => {
                const selected = preset.value === currentValue ? 'selected' : '';
                html += `<option value="${preset.value}" ${selected}>${preset.label}</option>`;
            });

            html += `</select>`;
            return html;
        }  
        
        // Icon Background Radius Preset Picker
        function renderIconBackgroundRadiusPreset(key, currentValue) {
            const radiusPresets = [
                { value: '0%', label: '⬜ Eckig (0%)' },
                { value: '10%', label: '🔲 Leicht gerundet (10%)' },
                { value: '25%', label: '🔳 Gerundet (25%)' },
                { value: '50%', label: '🟡 Rund (50%)' },
                { value: '8px', label: '📐 Feste Rundung (8px)' },
                { value: '16px', label: '📏 Starke Rundung (16px)' }
            ];

            let html = `<select class="form-control" oninput="updateProperty('${key}', this.value)">`;

            radiusPresets.forEach(preset => {
                const selected = preset.value === currentValue ? 'selected' : '';
                html += `<option value="${preset.value}" ${selected}>${preset.label}</option>`;
            });

            html += `</select>`;
            return html;
        }

        // Spezielle Textarea für SVG-Code
        function renderSvgCodePicker(key, value) {
            return `
                <div class="form-group">
                    <label style="font-weight: 600; color: #333; margin-bottom: 0.5rem; display: block;">SVG Code</label>
                    <textarea 
                        id="property-${key}" 
                        style="width: 100%; height: 120px; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; font-family: monospace; font-size: 0.9rem; resize: vertical;" 
                        placeholder="<svg viewBox='0 0 100 100'>...</svg>"
                        onchange="updateProperty('${key}', this.value)"
                    >${value || ''}</textarea>
                    <small style="color: #666; font-size: 0.8rem;">Kompletten SVG-Code hier einfügen. currentColor wird automatisch gesetzt.</small>
                </div>
            `;
        }

        // Vereinfachte Spacing-Auswahl
        function renderSpacingPicker(key, currentValue) {
            let spacingOptions = [];

            // Timeline-spezifische kleinere Abstände
            if (key.includes('timeline') || key.includes('Timeline')) {
                spacingOptions = [
                    { label: 'Minimal', value: '0.125rem' },    // Sehr sehr eng (2px)
                    { label: 'Sehr eng', value: '0.25rem' },    // Sehr eng (4px)  
                    { label: 'Eng', value: '0.5rem' },          // Eng (8px) - Neuer Default
                    { label: 'Normal', value: '0.75rem' },      // Normal (12px)
                    { label: 'Weit', value: '1rem' },           // Weit (16px)
                    { label: 'Sehr weit', value: '1.5rem' }     // Sehr weit (24px)
                ];
                } else if (key === 'verticalSpacing') {
                    // Spezielle Optionen für Vertical Spacing (Container-Responsive Mode)
                    spacingOptions = [
                        { label: 'Kein Abstand', value: 'none' },
                        { label: 'Klein', value: 'small' },
                        { label: 'Normal', value: 'medium' },
                        { label: 'Groß', value: 'large' },
                        { label: 'Sehr groß', value: 'extra-large' }
                    ];
                } else {
                    // Standard-Spacing für andere Properties
                    spacingOptions = [
                        { label: 'Eng', value: '1rem' },
                        { label: 'Normal', value: '2rem' },
                        { label: 'Weit', value: '3rem' },
                        { label: 'Sehr weit', value: '4rem' },
                        { label: 'Extrem weit', value: '6rem' }
                    ];
                }

            // Spezielle Optionen für Section Spacing (behält bestehende Logik)
            if (key.includes('section') || key.includes('Section')) {
                spacingOptions.forEach(option => {
                    option.value = option.value + ' 0'; // z.B. "2rem 0"
                });
            }

            let html = `<select class="form-control" oninput="updateProperty('${key}', this.value)">`;

            spacingOptions.forEach(option => {
                const selected = option.value === currentValue || option.value.replace(' 0', '') === currentValue ? 'selected' : '';
                html += `<option value="${option.value}" ${selected}>${option.label}</option>`;
            });

            html += `</select>`;

            return html;
        }

        // Select Picker rendern (erweitert für alle Module)
        function renderSelectPicker(key, currentValue) {
            let options = [];
            
            // SPEZIELLE BEHANDLUNG: verticalSpacing
            if (key === 'verticalSpacing') {
                options = [
                    { label: 'Kein Abstand', value: 'none' },
                    { label: 'Klein', value: 'small' },
                    { label: 'Normal', value: 'medium' },
                    { label: 'Groß', value: 'large' },
                    { label: 'Sehr groß', value: 'extra-large' }
                ];
            }

            // Layout-Optionen (universell für alle Module mit Bild+Text)
            if (key === 'layoutType' || key === 'layout' || key.includes('Layout')) {
                options = [
                    { value: 'image-left', label: '🖼️ Bild links' },
                    { value: 'image-right', label: '🖼️ Bild rechts' },
                    { value: 'image-top', label: '🖼️ Bild oben' },
                    { value: 'image-bottom', label: '🖼️ Bild unten' }
                ];
            }

            // Höhen-Optionen (heightType, mobileHeightType, tabletHeightType)
            else if (key.includes('heightType') || key.includes('HeightType')) {
                options = [
                    { value: 'small', label: '📏 Klein (300px)' },
                    { value: 'medium', label: '📐 Mittel (400px)' },
                    { value: 'large', label: '📏 Groß (500px)' },
                    { value: 'xlarge', label: '📐 Extra groß (600px)' },
                    { value: 'auto', label: '🔧 Automatisch' }
                ];
            
            }

            // Button-Styles (buttonStyleType)
            else if (key.includes('buttonStyleType') || key.includes('ButtonStyleType') || key === 'buttonStyleType') {
                options = [
                    { value: 'primary', label: '🔵 Primär (Kerberos Blau)' },
                    { value: 'secondary', label: '⚪ Sekundär (Weiß/Grau)' },
                    { value: 'outline', label: '🔘 Rahmen (Transparent)' },
                    { value: 'text', label: '📝 Text-Button (Nur Text)' },
                    { value: 'gradient', label: '🌊 Gradient (Blau-Verlauf)' },
                    { value: 'dark', label: '⚫ Dunkel (Schwarz)' }
                ];
            }

            // Icon-Größen (iconSizeType)
            else if (key.includes('iconSizeType') || key.includes('IconSizeType')) {
                options = [
                    { value: 'small', label: '🔹 Klein (1.5rem)' },
                    { value: 'medium', label: '🔸 Mittel (2rem)' },
                    { value: 'large', label: '🔶 Groß (2.5rem)' },
                    { value: 'xlarge', label: '🔴 Extra groß (3rem)' }
                ];
            }

            // Button-Styles (buttonStyleType)
            else if (key.includes('buttonStyleType') || key.includes('ButtonStyleType') || key === 'buttonStyleType') {
                options = [
                    { value: 'primary', label: '🔵 Primär (Kerberos Blau)' },
                    { value: 'secondary', label: '⚪ Sekundär (Weiß/Grau)' },
                    { value: 'outline', label: '🔘 Rahmen (Transparent)' },
                    { value: 'text', label: '📝 Text-Button (Nur Text)' },
                    { value: 'gradient', label: '🌊 Gradient (Blau-Verlauf)' },
                    { value: 'dark', label: '⚫ Dunkel (Schwarz)' }
                ];    
            }

            

            // Background-Typen (backgroundType)
            else if (key.includes('backgroundType') || key.includes('BackgroundType')) {
                options = [
                    { value: 'solid', label: '🟦 Einfarbig' },
                    { value: 'gradient', label: '🌊 Gradient' },
                    { value: 'kerberos', label: '💙 Kerberos Gradient' },
                    { value: 'image', label: '🖼️ Bild' }
                ];
            }

            // Gradient-Typen (backgroundGradientType)
            else if (key.includes('gradientType') || key.includes('GradientType')) {
                options = [
                    { value: 'kerberos-primary', label: '🔵 Kerberos Primär (Blau → Hellblau)' },
                    { value: 'kerberos-secondary', label: '🟣 Kerberos Sekundär (Lila → Orange)' },
                    { value: 'kerberos-dark', label: '⚫ Kerberos Dunkel (Schwarz → Grau)' },
                    { value: 'kerberos-light', label: '⚪ Kerberos Hell (Weiß → Hellgrau)' },
                    { value: 'blue-ocean', label: '🌊 Ozean Blau (Dunkelblau → Türkis)' },
                    { value: 'purple-sunset', label: '🌅 Lila Sonnenuntergang (Lila → Violett)' },
                    { value: 'orange-fire', label: '🔥 Orange Feuer (Rosa → Rot)' },
                    { value: 'green-nature', label: '🌿 Grün Natur (Blau → Cyan)' },
                    { value: 'dark-night', label: '🌙 Dunkle Nacht (Dunkelblau → Blau)' },
                    { value: 'custom', label: '🎨 Benutzerdefiniert (backgroundColor verwenden)' }
                ];
            }

            // Icon-Hintergrund-Typen (iconBackgroundType)
            else if (key.includes('iconBackgroundType') || key.includes('IconBackgroundType') || key === 'iconBackgroundType') {
                options = [
                    { value: 'none', label: '🚫 Kein Hintergrund' },
                    { value: 'light', label: '☁️ Leicht (10%)' },
                    { value: 'medium', label: '🌫️ Mittel (20%)' },
                    { value: 'strong', label: '🌧️ Stark (30%)' }
                ];
            }

            // Icon-Größen (iconSizeType) - erweitert
            else if (key.includes('iconSizeType') || key.includes('IconSizeType') || key === 'iconSizeType') {
                options = [
                    { value: 'small', label: '🔹 Klein (1.5rem)' },
                    { value: 'medium', label: '🔸 Mittel (2rem)' },
                    { value: 'large', label: '🔶 Groß (2.5rem)' },
                    { value: 'xlarge', label: '🔴 Extra groß (3rem)' }
                ];
            }

            // SVG-Größen (svgSizeType) - KORRIGIERT
            else if (key.includes('svgSizeType') || key.includes('SvgSizeType') || key === 'svgSizeType') {
                options = [
                    { value: 'small', label: '🔹 Klein (100px)' },
                    { value: 'medium', label: '🔸 Mittel (150px)' },
                    { value: 'large', label: '🔶 Groß (200px)' },
                    { value: 'extra-large', label: '🔴 Extra groß (250px)' }
                ];
            }

            // Icon-Radius (iconRadiusType) - erweitert
            else if (key.includes('iconRadiusType') || key.includes('IconRadiusType') || key === 'iconRadiusType') {
                options = [
                    { value: 'none', label: '⬜ Eckig (0px)' },
                    { value: 'small', label: '🔲 Leicht gerundet (4px)' },
                    { value: 'medium', label: '🔳 Gerundet (8px)' },
                    { value: 'large', label: '🟫 Stark gerundet (12px)' },
                    { value: 'round', label: '🟡 Rund (50%)' }
                ];
            }

            // Radius-Typen (iconRadiusType, imageRadiusType, buttonRadiusType)
            else if (key.includes('RadiusType') || key.includes('radiusType')) {
                options = [
                    { value: 'none', label: '⬜ Eckig (0px)' },
                    { value: 'small', label: '🔲 Leicht gerundet (4px)' },
                    { value: 'medium', label: '🔳 Gerundet (8px)' },
                    { value: 'large', label: '🟫 Stark gerundet (12px)' },
                    { value: 'round', label: '🟡 Rund (50%)' }
                ];
            }

            // Shadow-Typen (imageShadowType)
            else if (key.includes('ShadowType') || key.includes('shadowType')) {
                options = [
                    { value: 'none', label: '🚫 Kein Schatten' },
                    { value: 'light', label: '☁️ Leichter Schatten' },
                    { value: 'medium', label: '🌫️ Normaler Schatten' },
                    { value: 'strong', label: '🌧️ Starker Schatten' }
                ];
            }

            // Button-Stile (buttonStyle)
            else if (key.includes('buttonStyle') || key.includes('ButtonStyle')) {
                options = [
                    { value: 'primary', label: '🔵 Primär (Kerberos Blau)' },
                    { value: 'secondary', label: '⚪ Sekundär (Weiß)' },
                    { value: 'outline', label: '🔲 Umriss (Transparent)' }
                ];
            }

            // Button-Größen (buttonSizeType)
            else if (key.includes('buttonSizeType') || key.includes('ButtonSizeType')) {
                options = [
                    { value: 'small', label: '🔹 Klein (0.5rem 1rem)' },
                    { value: 'medium', label: '🔸 Mittel (0.75rem 1.5rem)' },
                    { value: 'large', label: '🔶 Groß (1rem 2rem)' }
                ];
            }

            // Opacity-Typen (overlayOpacityType, blueOverlayOpacityType)
            else if (key.includes('OpacityType') || key.includes('opacityType')) {
                options = [
                    { value: 'none', label: '🚫 Kein Overlay (0%)' },
                    { value: 'light', label: '☁️ Leicht (20%)' },
                    { value: 'medium', label: '🌫️ Mittel (40%)' },
                    { value: 'strong', label: '🌧️ Stark (60%)' },
                    { value: 'heavy', label: '⛈️ Sehr stark (80%)' },
                    { value: 'full', label: '🌑 Vollständig (100%)' }
                ];
            }

            // Ausrichtungs-Optionen (für alle Align-Properties)
            else if (key.includes('Align') || key.includes('align')) {
                options = [
                    { value: 'left', label: '◀️ Links' },
                    { value: 'center', label: '🎯 Mitte' },
                    { value: 'right', label: '▶️️ Rechts' },
                    { value: 'justify', label: '📏 Block' }
                ];
            }
            

            // Reihenfolge
            else if (key.includes('Order') || key.includes('order')) {
                options = [
                    { value: '1', label: 'Erste Position' },
                    { value: '2', label: 'Zweite Position' }
                ];
            }
            // Aktiv/Inaktiv
            else if (key.includes('Active') || key.includes('active')) {
                options = [
                    { value: 'true', label: 'Anzeigen' },
                    { value: 'false', label: 'Ausblenden' }
                ];
            }
            // Anzahl
            else if (key.includes('Count') || key.includes('count')) {
                options = [
                    { value: '1', label: '1 Element' },
                    { value: '2', label: '2 Elemente' },
                    { value: '3', label: '3 Elemente' },
                    { value: '4', label: '4 Elemente' }
                ];
            }

            // SVG-Typ Auswahl (für SVG Hero Module)
            else if (key === 'svgType') {
                options = [
                    { value: 'url', label: '🔗 SVG per URL' },
                    { value: 'code', label: '📝 SVG-Code direkt' }
                ];
            }

            // Button Border (erweitert)
            else if (key.includes('Border') || key.includes('border')) {
                options = [
                    { value: 'none', label: '🚫 Kein Rahmen' },
                    { value: '1px solid #063AA8', label: '📏 Dünner Rahmen (Blau)' },
                    { value: '2px solid #063AA8', label: '📐 Dicker Rahmen (Blau)' },
                    { value: '1px solid rgba(255,255,255,0.3)', label: '👻 Transparenter Rahmen' },
                    { value: '2px solid rgba(255,255,255,0.5)', label: '⚪ Dick Transparent' }
                ];
            }
            // Content-Transformation
            else if (key.includes('Transform') || key.includes('transform')) {
                options = [
                    { value: 'none', label: '🚫 Keine Transformation' },
                    { value: 'translateY(-2px)', label: '⬆️ Leicht nach oben' },
                    { value: 'translateY(-4px)', label: '⬆️⬆️ Deutlich nach oben' },
                    { value: 'scale(1.05)', label: '🔍 Leicht vergrößern' },
                    { value: 'scale(1.1)', label: '🔍🔍 Deutlich vergrößern' }
                ];
            }

            let html = `<select class="form-control" oninput="updateProperty('${key}', this.value)">`;

            options.forEach(option => {
                const selected = option.value === currentValue ? 'selected' : '';
                html += `<option value="${option.value}" ${selected}>${option.label}</option>`;
            });

            html += `</select>`;

            return html;
        }

        // Spezielle Bildbearbeitungs-Dropdowns
        function renderImagePropertyDropdown(key, currentValue) {
            if (key === 'imageObjectFit') {
                return `
                    <select class="form-control" oninput="updateProperty('${key}', this.value)">
                        <option value="cover" ${currentValue === 'cover' ? 'selected' : ''}>🔲 Ausfüllen (Cover)</option>
                        <option value="contain" ${currentValue === 'contain' ? 'selected' : ''}>📦 Komplett anzeigen (Contain)</option>
                        <option value="fill" ${currentValue === 'fill' ? 'selected' : ''}>↔️ Strecken (Fill)</option>
                        <option value="scale-down" ${currentValue === 'scale-down' ? 'selected' : ''}>🔽 Verkleinern (Scale-down)</option>
                        <option value="none" ${currentValue === 'none' ? 'selected' : ''}>📏 Original (None)</option>
                    </select>`;
            }
            
            if (key === 'imageObjectPosition') {
                return `
                    <select class="form-control" oninput="updateProperty('${key}', this.value)">
                        <option value="center" ${currentValue === 'center' ? 'selected' : ''}>🎯 Mitte</option>
                        <option value="top" ${currentValue === 'top' ? 'selected' : ''}>⬆️ Oben</option>
                        <option value="bottom" ${currentValue === 'bottom' ? 'selected' : ''}>⬇️ Unten</option>
                        <option value="left" ${currentValue === 'left' ? 'selected' : ''}>◀️ Links</option>
                        <option value="right" ${currentValue === 'right' ? 'selected' : ''}>▶️ Rechts</option>
                        <option value="top left" ${currentValue === 'top left' ? 'selected' : ''}>↖️ Oben Links</option>
                        <option value="top right" ${currentValue === 'top right' ? 'selected' : ''}>↗️ Oben Rechts</option>
                        <option value="bottom left" ${currentValue === 'bottom left' ? 'selected' : ''}>↙️ Unten Links</option>
                        <option value="bottom right" ${currentValue === 'bottom right' ? 'selected' : ''}>↘️ Unten Rechts</option>
                    </select>`;
            }
            
            return `<input type="text" class="form-control" value="${currentValue}" oninput="updateProperty('${key}', this.value)">`;
        }

        // Shadow Preset Picker
        function renderShadowPreset(key, currentValue) {
            const shadowPresets = [
                { value: 'none', label: '🚫 Kein Schatten' },
                { value: '0 2px 4px rgba(0,0,0,0.1)', label: '☁️ Leichter Schatten' },
                { value: '0 4px 8px rgba(0,0,0,0.15)', label: '☁️☁️ Normaler Schatten' },
                { value: '0 8px 16px rgba(0,0,0,0.2)', label: '☁️☁️☁️ Starker Schatten' },
                { value: '0 20px 60px rgba(0,0,0,0.2)', label: '🌫️ Dramatischer Schatten' },
                { value: '0 0 20px rgba(6,58,168,0.3)', label: '💙 Blauer Glow' },
                { value: '0 0 30px rgba(255,215,0,0.5)', label: '✨ Goldener Glow' }
            ];

            let html = `<select class="form-control" oninput="updateProperty('${key}', this.value)">`;

            shadowPresets.forEach(preset => {
                const selected = preset.value === currentValue ? 'selected' : '';
                html += `<option value="${preset.value}" ${selected}>${preset.label}</option>`;
            });

            html += `</select>`;
            return html;
        }

        // Icon Size Preset Picker
        function renderIconSizePreset(key, currentValue) {
            const iconSizePresets = [
                { value: 'small', label: '🔹 Klein (2rem)' },
                { value: 'medium', label: '🔸 Mittel (2.5rem)' },
                { value: 'large', label: '🔶 Groß (3rem)' },
                { value: 'huge', label: '🔴 Riesig (4rem)' }
            ];

            let html = `<select class="form-control" oninput="updateProperty('${key}', this.value)">`;

            iconSizePresets.forEach(preset => {
                const selected = preset.value === currentValue ? 'selected' : '';
                html += `<option value="${preset.value}" ${selected}>${preset.label}</option>`;
            });

            html += `</select>`;
            return html;
        }

        // Icon Background Size Preset Picker
        function renderIconBackgroundSizePreset(key, currentValue) {
            const sizePresets = [
                { value: '50px', label: '🔹 Klein (50px)' },
                { value: '60px', label: '🔸 Kompakt (60px)' },
                { value: '70px', label: '🔶 Medium (70px)' },
                { value: '80px', label: '🟦 Groß (80px)' },
                { value: '100px', label: '🔴 Riesig (100px)' },
                { value: '120px', label: '🟪 Extrem (120px)' }
            ];

            let html = `<select class="form-control" oninput="updateProperty('${key}', this.value)">`;

            sizePresets.forEach(preset => {
                const selected = preset.value === currentValue ? 'selected' : '';
                html += `<option value="${preset.value}" ${selected}>${preset.label}</option>`;
            });

            html += `</select>`;
            return html;
        }

        function renderRichTextEditor(key, currentValue) {
            const editorId = `richtext-${key}-${Date.now()}`;

            const html = `
                <div class="richtext-editor-container" style="border: 1px solid var(--kerberos-border); border-radius: 4px; overflow: hidden;">
                    <!-- Toolbar -->
                    <div class="richtext-toolbar" style="background: #f8f9fa; border-bottom: 1px solid var(--kerberos-border); padding: 0.5rem; display: flex; gap: 0.25rem; flex-wrap: wrap;">
                        <button type="button" class="rt-btn rt-bold" data-command="bold" style="padding: 0.25rem 0.5rem; border: 1px solid #dee2e6; background: white; border-radius: 3px; cursor: pointer; font-weight: bold;" title="Fett">B</button>
                        <button type="button" class="rt-btn rt-italic" data-command="italic" style="padding: 0.25rem 0.5rem; border: 1px solid #dee2e6; background: white; border-radius: 3px; cursor: pointer; font-style: italic;" title="Kursiv">I</button>
                        <button type="button" class="rt-btn rt-underline" data-command="underline" style="padding: 0.25rem 0.5rem; border: 1px solid #dee2e6; background: white; border-radius: 3px; cursor: pointer; text-decoration: underline;" title="Unterstrichen">U</button>
                        <div style="width: 1px; background: #dee2e6; margin: 0 0.25rem;"></div>
                        <button type="button" class="rt-btn rt-link" data-command="createLink" style="padding: 0.25rem 0.5rem; border: 1px solid #dee2e6; background: white; border-radius: 3px; cursor: pointer;" title="Link (gleicher Tab)">🔗</button>
                        <button type="button" class="rt-btn rt-link-new" data-command="createLinkNewTab" style="padding: 0.25rem 0.5rem; border: 1px solid #dee2e6; background: white; border-radius: 3px; cursor: pointer;" title="Link (neuer Tab)">🔗🆕</button>
                        <button type="button" class="rt-btn rt-unlink" data-command="unlink" style="padding: 0.25rem 0.5rem; border: 1px solid #dee2e6; background: white; border-radius: 3px; cursor: pointer;" title="Link entfernen">🔗❌</button>
                        <div style="width: 1px; background: #dee2e6; margin: 0 0.25rem;"></div>
                        <button type="button" class="rt-btn rt-ul" data-command="insertUnorderedList" style="padding: 0.25rem 0.5rem; border: 1px solid #dee2e6; background: white; border-radius: 3px; cursor: pointer;" title="Punktliste">• Liste</button>
                        <button type="button" class="rt-btn rt-ol" data-command="insertOrderedList" style="padding: 0.25rem 0.5rem; border: 1px solid #dee2e6; background: white; border-radius: 3px; cursor: pointer;" title="Nummerierte Liste">1. Liste</button>
                        <div style="width: 1px; background: #dee2e6; margin: 0 0.25rem;"></div>
                        <button type="button" class="rt-btn rt-h1" data-command="formatBlock" data-value="h1" style="padding: 0.25rem 0.5rem; border: 1px solid #dee2e6; background: white; border-radius: 3px; cursor: pointer; font-weight: bold; font-size: 0.9rem;" title="Überschrift 1">H1</button>
                        <button type="button" class="rt-btn rt-h2" data-command="formatBlock" data-value="h2" style="padding: 0.25rem 0.5rem; border: 1px solid #dee2e6; background: white; border-radius: 3px; cursor: pointer; font-weight: bold; font-size: 0.85rem;" title="Überschrift 2">H2</button>
                        <button type="button" class="rt-btn rt-h3" data-command="formatBlock" data-value="h3" style="padding: 0.25rem 0.5rem; border: 1px solid #dee2e6; background: white; border-radius: 3px; cursor: pointer; font-weight: bold; font-size: 0.8rem;" title="Überschrift 3">H3</button>
                        <button type="button" class="rt-btn rt-h4" data-command="formatBlock" data-value="h4" style="padding: 0.25rem 0.5rem; border: 1px solid #dee2e6; background: white; border-radius: 3px; cursor: pointer; font-weight: bold; font-size: 0.75rem;" title="Überschrift 4">H4</button>
                        <button type="button" class="rt-btn rt-p" data-command="formatBlock" data-value="p" style="padding: 0.25rem 0.5rem; border: 1px solid #dee2e6; background: white; border-radius: 3px; cursor: pointer; font-size: 0.8rem;" title="Normaler Text">P</button>
                        <div style="width: 1px; background: #dee2e6; margin: 0 0.25rem;"></div>
                        <button type="button" class="rt-btn rt-clear" data-command="removeFormat" style="padding: 0.25rem 0.5rem; border: 1px solid #dee2e6; background: white; border-radius: 3px; cursor: pointer;" title="Formatierung entfernen">🧹</button>
                    </div>
                    
                    <!-- Editor -->
                    <div id="${editorId}" 
                        contenteditable="true" 
                        class="richtext-editor"
                        data-property="${key}"
                        style="min-height: 120px; padding: 0.75rem; background: white; outline: none; line-height: 1.5;"
                        placeholder="Text eingeben...">${currentValue}</div>
                </div>`;

            // Script nach dem Rendern initialisieren
            setTimeout(() => initializeRichTextEditor(editorId, key), 10);

            return html;
        }
        
        // SVG Sizer UI-Komponente
        function renderSVGSizer(currentWidth, currentHeight, svgCode) {
            console.log('🔍 Debug SVG Sizer:', { currentWidth, currentHeight, svgCode: svgCode?.substring(0, 100) + '...' });

            const analysis = analyzeSVG(svgCode);
            console.log('📐 SVG Analysis:', analysis);

            const currentWidthNum = parseInt(currentWidth) || 200;
            const currentHeightNum = parseInt(currentHeight) || 200;

            return `
            <div class="svg-sizer" style="background: #f8f9fa; padding: 1rem; border-radius: 6px; margin: 0.5rem 0; border: 1px solid #dee2e6;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                    <span style="font-size: 0.8rem; color: #6c757d; font-weight: 600;">📐 Proportionen: ${analysis.format}</span>
                    <span style="font-size: 0.8rem; color: #28a745; font-weight: 600;">📏 ${currentWidthNum}px × ${currentHeightNum}px</span>
                </div>
                
                <label style="font-size: 0.8rem; color: #495057; font-weight: 600; display: block; margin-bottom: 0.5rem;">🎚️ Größe auswählen:</label>
                <select onchange="applySVGSize(this.value, ${analysis.aspectRatio})" style="width: 100%; padding: 0.5rem; border-radius: 4px; border: 1px solid #ced4da; font-size: 0.9rem;">
                    ${SVG_SIZE_PRESETS.map(preset =>
                `<option value="${preset.multiplier}" ${Math.abs(currentHeightNum - (100 * preset.multiplier)) < 10 ? 'selected' : ''}>${preset.label}</option>`
            ).join('')}
                </select>
                
                <div style="margin-top: 0.75rem; display: flex; gap: 0.5rem;">
                    <button onclick="applySVGSize(${currentHeightNum / 100}, ${analysis.aspectRatio})" style="flex: 1; padding: 0.4rem; border: 1px solid #ced4da; background: #fff; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">🔄 Aktuelle Größe</button>
                    <button onclick="applySVGSize(2.0, ${analysis.aspectRatio})" style="flex: 1; padding: 0.4rem; border: 1px solid #ced4da; background: #fff; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">📏 Standard (200px)</button>
                </div>
            </div>`;
        }

        // 7️⃣ ALIAS FUNKTION für Live-Rendering (jetzt AUSSERHALB der anderen Funktion)
        function renderCanvasWithInteractivity() {
            renderCanvas(); // Das macht jetzt automatisch die Interaktivität

            // Spezielle Behandlung für Guide-Flow-Module
            setTimeout(() => {
                enhanceGuideFlowInteractivity();
            }, 100);
        }
        
        // ERWEITERTE FUNKTION: Smart Challenge-Renderer mit Icons
        function renderChallengeSolutionContent(properties) {
            // Helper-Funktion: Zeige Feld nur wenn Inhalt vorhanden
            const showIfExists = (value) => (value && value.trim() !== '') ? 'block' : 'none';

            let contentHtml = `
                <div class="challenge-solution-content">
                    
                    <!-- === HAUPTTITEL BEREICH === -->
                    <div class="form-group-header">
                        <h4 class="property-group-title">🎯 Hauptinhalt</h4>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Haupttitel</label>
                        <input type="text" class="form-control" 
                            value="${properties.mainTitle || ''}" 
                            oninput="updateProperty('mainTitle', this.value); autoUpdatePreview();"
                            placeholder="Haupttitel des Moduls">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Untertitel</label>
                        <textarea class="form-control" rows="2"
                            oninput="updateProperty('subtitle', this.value); autoUpdatePreview();"
                            placeholder="Beschreibender Untertitel">${properties.subtitle || ''}</textarea>
                    </div>
                    
                    <!-- === CHALLENGE BEREICH === -->
                    <div class="form-group-header" style="margin-top: 2rem;">
                        <h4 class="property-group-title">⚠️ Challenge (Herausforderung)</h4>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Challenge Titel</label>
                        <input type="text" class="form-control" 
                            value="${properties.challengeTitle || ''}" 
                            oninput="updateProperty('challengeTitle', this.value); autoUpdatePreview();"
                            placeholder="z.B. Herausforderung">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Challenge Icon</label>
                        ${renderIconPicker('challengeIcon', properties.challengeIcon || '&#xf071;')}
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Challenge Beschreibung</label>
                        <textarea class="form-control" rows="2"
                            oninput="updateProperty('challengeText', this.value); autoUpdatePreview();"
                            placeholder="Beschreibung der Herausforderung">${properties.challengeText || ''}</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Challenge Listen-Icon</label>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <div style="font-family: 'Font Awesome 5 Pro'; font-size: 1.5rem; padding: 0.5rem; border: 1px solid var(--kerberos-border); border-radius: 4px; min-width: 50px; text-align: center;">
                                •
                            </div>
                            <button type="button" class="btn btn-primary" onclick="showIconPicker('challengeListIcon')" style="flex: 1;">Listen-Icon auswählen</button>
                        </div>
                        <input type="text" class="form-control" value="•" oninput="updateProperty('challengeListIcon', this.value)" style="margin-top: 0.5rem;" placeholder="Unicode (z.B. •, →, ★)">
                    </div>

                    <div class="form-group">
                        <label class="form-label">Challenge Punkte</label>
                        <input type="text" class="form-control" style="margin-bottom: 0.5rem;" value="Datenabgleiche" oninput="updateProperty('challengePoint1', this.value); autoUpdatePreview();" placeholder="Erster Challenge-Punkt">
                        <input type="text" class="form-control" style="margin-bottom: 0.5rem;" value="Risikoanalysen" oninput="updateProperty('challengePoint2', this.value); autoUpdatePreview();" placeholder="Zweiter Challenge-Punkt">
                        <input type="text" class="form-control" style="margin-bottom: 0.5rem;" value="Reportings" oninput="updateProperty('challengePoint3', this.value); autoUpdatePreview();" placeholder="Dritter Challenge-Punkt">
                        <input type="text" class="form-control" style="margin-bottom: 0.5rem;" value="" oninput="updateProperty('challengePoint4', this.value); autoUpdatePreview();" placeholder="Vierter Challenge-Punkt (optional)">
                        <input type="text" class="form-control" value="" oninput="updateProperty('challengePoint5', this.value); autoUpdatePreview();" placeholder="Fünfter Challenge-Punkt (optional)">
                    </div>
                    
                    <!-- === REQUIREMENT BEREICH === -->
                    <div class="form-group-header" style="margin-top: 2rem;">
                        <h4 class="property-group-title">📋 Requirements (Anforderungen)</h4>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Requirement Titel</label>
                        <input type="text" class="form-control" 
                            value="${properties.requirementTitle || ''}" 
                            oninput="updateProperty('requirementTitle', this.value); autoUpdatePreview();"
                            placeholder="z.B. Anforderungen">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Requirement Icon</label>
                        ${renderIconPicker('requirementIcon', properties.requirementIcon || '&#xf0ea;')}
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Requirement Beschreibung</label>
                        <textarea class="form-control" rows="2"
                            oninput="updateProperty('requirementText', this.value); autoUpdatePreview();"
                            placeholder="Beschreibung der Anforderungen">${properties.requirementText || ''}</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Requirement Listen-Icon</label>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <div style="font-family: 'Font Awesome 5 Pro'; font-size: 1.5rem; padding: 0.5rem; border: 1px solid var(--kerberos-border); border-radius: 4px; min-width: 50px; text-align: center;">
                                •
                            </div>
                            <button type="button" class="btn btn-primary" onclick="showIconPicker('requirementListIcon')" style="flex: 1;">Listen-Icon auswählen</button>
                        </div>
                        <input type="text" class="form-control" value="•" oninput="updateProperty('requirementListIcon', this.value)" style="margin-top: 0.5rem;" placeholder="Unicode (z.B. •, →, ★)">
                    </div>

                    <div class="form-group">
                        <label class="form-label">Requirement Punkte</label>
                        <input type="text" class="form-control" style="margin-bottom: 0.5rem;" value="PeP-Listen" oninput="updateProperty('requirementPoint1', this.value); autoUpdatePreview();" placeholder="Erste Anforderung">
                        <input type="text" class="form-control" style="margin-bottom: 0.5rem;" value="Sanktionslisten" oninput="updateProperty('requirementPoint2', this.value); autoUpdatePreview();" placeholder="Zweite Anforderung">
                        <input type="text" class="form-control" style="margin-bottom: 0.5rem;" value="Hochrisikoländer" oninput="updateProperty('requirementPoint3', this.value); autoUpdatePreview();" placeholder="Dritte Anforderung">
                        <input type="text" class="form-control" style="margin-bottom: 0.5rem;" value="" oninput="updateProperty('requirementPoint4', this.value); autoUpdatePreview();" placeholder="Vierte Anforderung (optional)">
                        <input type="text" class="form-control" value="" oninput="updateProperty('requirementPoint5', this.value); autoUpdatePreview();" placeholder="Fünfte Anforderung (optional)">
                    </div>
                    
                    <!-- === SOLUTION BEREICH === -->
                    <div class="form-group-header" style="margin-top: 2rem;">
                        <h4 class="property-group-title">✅ Solution (Lösung)</h4>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Solution Titel</label>
                        <input type="text" class="form-control" 
                            value="${properties.solutionTitle || ''}" 
                            oninput="updateProperty('solutionTitle', this.value); autoUpdatePreview();"
                            placeholder="z.B. Kerberos Lösung">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Solution Icon</label>
                        ${renderIconPicker('solutionIcon', properties.solutionIcon || '&#xf3ed;')}
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Solution Beschreibung</label>
                        <textarea class="form-control" rows="2"
                            oninput="updateProperty('solutionText', this.value); autoUpdatePreview();"
                            placeholder="Beschreibung der Lösung">${properties.solutionText || ''}</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Solution Listen-Icon</label>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <div style="font-family: 'Font Awesome 5 Pro'; font-size: 1.5rem; padding: 0.5rem; border: 1px solid var(--kerberos-border); border-radius: 4px; min-width: 50px; text-align: center;">
                                ✓
                            </div>
                            <button type="button" class="btn btn-primary" onclick="showIconPicker('solutionListIcon')" style="flex: 1;">Listen-Icon auswählen</button>
                        </div>
                        <input type="text" class="form-control" value="✓" oninput="updateProperty('solutionListIcon', this.value)" style="margin-top: 0.5rem;" placeholder="Unicode (z.B. ✓, →, ★)">
                    </div>

                    <div class="form-group">
                        <label class="form-label">Solution Punkte</label>
                        <input type="text" class="form-control" style="margin-bottom: 0.5rem;" value="Aktuelle Datenbankabgleiche" oninput="updateProperty('solutionPoint1', this.value); autoUpdatePreview();" placeholder="Erstes Lösungsmerkmal">
                        <input type="text" class="form-control" style="margin-bottom: 0.5rem;" value="Automatische Risikoanalysen" oninput="updateProperty('solutionPoint2', this.value); autoUpdatePreview();" placeholder="Zweites Lösungsmerkmal">
                        <input type="text" class="form-control" style="margin-bottom: 0.5rem;" value="Detailliertes &amp; exportierbares Reporting" oninput="updateProperty('solutionPoint3', this.value); autoUpdatePreview();" placeholder="Drittes Lösungsmerkmal">
                        <input type="text" class="form-control" style="margin-bottom: 0.5rem;" value="" oninput="updateProperty('solutionPoint4', this.value); autoUpdatePreview();" placeholder="Viertes Lösungsmerkmal (optional)">
                        <input type="text" class="form-control" value="" oninput="updateProperty('solutionPoint5', this.value); autoUpdatePreview();" placeholder="Fünftes Lösungsmerkmal (optional)">
                    </div>
                    
                    <!-- === CTA BEREICH === -->
                    <div class="form-group-header" style="margin-top: 2rem;">
                        <h4 class="property-group-title">🎯 Call-to-Action</h4>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Haupt-CTA Button</label>
                        <input type="text" class="form-control" style="margin-bottom: 0.5rem;" 
                            value="${properties.ctaText || ''}" 
                            oninput="updateProperty('ctaText', this.value); autoUpdatePreview();"
                            placeholder="Button-Text (z.B. Jetzt Beratung anfragen)">
                        <input type="text" class="form-control" 
                            value="${properties.ctaLink || ''}" 
                            oninput="updateProperty('ctaLink', this.value); autoUpdatePreview();"
                            placeholder="Link (z.B. #kontakt)">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Zusätzlicher CTA Button (optional)</label>
                        <input type="text" class="form-control" style="margin-bottom: 0.5rem;" 
                            value="${properties.bottomCtaText || ''}" 
                            oninput="updateProperty('bottomCtaText', this.value); autoUpdatePreview();"
                            placeholder="Optionaler zweiter Button-Text">
                        <input type="text" class="form-control" 
                            value="${properties.bottomCtaLink || ''}" 
                            oninput="updateProperty('bottomCtaLink', this.value); autoUpdatePreview();"
                            placeholder="Link für zweiten Button">
                    </div>
                </div>
                
                <style>
                .challenge-solution-content .form-group-header {
                    margin: 1.5rem 0 1rem 0;
                    padding-bottom: 0.5rem;
                    border-bottom: 2px solid #063AA8;
                }
                
                .challenge-solution-content .property-group-title {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #063AA8;
                    margin: 0;
                }
                
                .challenge-solution-content .form-group {
                    margin-bottom: 1rem;
                }
                
                .challenge-solution-content .form-label {
                    font-size: 0.85rem;
                    font-weight: 500;
                    color: #495057;
                    margin-bottom: 0.25rem;
                }
                </style>
            `;

            return contentHtml;
        }

        function renderPropertyField(key, value, fieldType, label) {
            let html = `<div class="form-group">`;
            html += `<label class="form-label">${label}</label>`;

            if (fieldType === 'color') {
                html += renderColorPicker(key, value);
            } else if (key === 'iconSizePreset') {
                html += renderIconSizePreset(key, value);
            } else if (key === 'iconBackgroundSize') {
                html += renderIconBackgroundSizePreset(key, value);
            } else if (key === 'iconBackgroundRadius') {
                html += renderIconBackgroundRadiusPreset(key, value);
            } else if (key === 'cardRadius') {
                html += renderCardRadiusPreset(key, value);
            } else if (key === 'statMinWidth') {
                html += renderStatMinWidthPreset(key, value);
            } else if (key === 'iconSizeCustom') {
                html += renderIconSizeCustomPreset(key, value);
            } else if (fieldType === 'icon') {
                html += renderIconPicker(key, value);
            } else if (fieldType === 'image') {
                html += renderImagePicker(key, value);
            } else if (fieldType === 'spacing') {
                html += renderSpacingPicker(key, value);
            } else if (fieldType === 'richtext') {
                html += renderRichTextEditor(key, value);
            } else if (fieldType === 'textarea') {
                html += `<textarea class="form-control" oninput="updateProperty('${key}', this.value)" style="min-height: 80px;">${value}</textarea>`;
            } else if (fieldType === 'boolean') {
                html += renderBooleanPicker(key, value);
            } else if (fieldType === 'position') {
                html += renderPositionPicker(key, value);
            } else if (fieldType === 'size-dropdown') {
                const options = getSizeOptions(key);
                html += renderDropdown(key, value, options);
            } else if (fieldType === 'spacing-dropdown') {
                const options = getSpacingOptions(key);
                html += renderDropdown(key, value, options);
            } else if (fieldType === 'radius-dropdown') {
                const options = getRadiusOptions();
                html += renderDropdown(key, value, options);
            } else if (fieldType === 'shadow-dropdown') {
                const options = getShadowOptions();
                html += renderDropdown(key, value, options);
            } else if (fieldType === 'transform-dropdown') {
                const options = getTransformOptions();
                html += renderDropdown(key, value, options);
            } else if (fieldType === 'dimension-dropdown') {
                const options = getDimensionOptions(key);
                html += renderDropdown(key, value, options);
            } else if (fieldType === 'gradient-dropdown') {
                const options = getGradientOptions();
                html += renderDropdown(key, value, options);    
            } else if (fieldType === 'alignment-dropdown') {
                const options = getAlignmentOptions(key);
                html += renderDropdown(key, value, options);
            } else if (fieldType === 'border-dropdown') {
                const options = getBorderOptions();
                html += renderDropdown(key, value, options);
            } else if (fieldType === 'effect-dropdown') {
                const options = getEffectOptions(key);
                html += renderDropdown(key, value, options);
            } else if (fieldType === 'display-dropdown') {
                const options = getDisplayOptions();
                html += renderDropdown(key, value, options);
            } else if (fieldType === 'animation-dropdown') {
                const options = getAnimationOptions();
                html += renderDropdown(key, value, options);
            } else if (fieldType === 'layout-dropdown') {
                if (key.includes('Grid') || key.includes('Columns')) {
                    const options = getGridDropdownOptions();
                    html += renderDropdown(key, value, options);
                }
            } else if (fieldType === 'scale-dropdown') {
                const options = getScaleDropdownOptions();
                html += renderDropdown(key, value, options);            
            } else if (key === 'heightType' || key === 'mobileHeightType' || key === 'tabletHeightType') {
                const options = getHeightTypeOptions();
                html += `<select class="form-control" oninput="updateProperty('${key}', this.value)">`;
                options.forEach(option => {
                    const selected = value === option.value ? 'selected' : '';
                    html += `<option value="${option.value}" ${selected}>${option.label}</option>`;
                });
                html += `</select>`;
            } else if (fieldType === 'select') {
                if (key === 'imageObjectFit' || key === 'imageObjectPosition') {
                    html += renderImagePropertyDropdown(key, value);
                } else {
                    html += renderSelectPicker(key, value);
                }
            } else if (fieldType === 'svgtype') {
                const options = [
                    { value: 'url', label: '🔗 SVG per URL' },
                    { value: 'code', label: '📝 SVG-Code direkt' }
                ];
                html += renderSelectPicker(key, value, options);
            } else if (key === 'svgCode') {
                html += renderSvgCodePicker(key, value);
            } else if (fieldType === 'svg-sizer') {
                // Smart SVG Sizer (nur für svgWidth) - Debug Version
                const svgCode = selectedModule?.properties?.svgCode || selectedModule?.properties?.svgUrl || '';
                const svgHeight = selectedModule?.properties?.svgHeight || '200px';
                console.log('🔍 SVG Sizer Input:', { svgCode: svgCode?.substring(0, 200), svgHeight });
                html += renderSVGSizer(value, svgHeight, svgCode);
                html += `<input type="text" class="form-control" value="${value}" oninput="updateProperty('${key}', this.value)" style="margin-top: 0.5rem;" placeholder="z.B. 200px">`;
            } else if (fieldType === 'svg-sizer-hidden') {
                // Verstecke svgHeight - wird automatisch gesetzt
                html += `<small style="color: #6c757d; font-size: 0.75rem;">📏 Wird automatisch proportional gesetzt</small>`;
                html += `<input type="text" class="form-control" value="${value}" readonly style="background: #f8f9fa; cursor: not-allowed;">`;
            } else if (fieldType === 'shadow-preset') {
                html += renderShadowPreset(key, value);
            } else if (fieldType === 'hover-preset') {
                html += renderHoverPreset(key, value);
            } else if (fieldType === 'gradient-preset') {
                html += renderGradientPreset(key, value);
            } else if (fieldType === 'border-preset') {
                html += renderBorderPreset(key, value);
            } else if (fieldType === 'advanced') {
                html += `<input type="text" class="form-control" value="${value}" oninput="updateProperty('${key}', this.value)" placeholder="Für Experten - CSS-Wert eingeben">`;
                html += `<small style="color: #6c757d; font-size: 0.75rem;">⚠️ Nur für fortgeschrittene Benutzer</small>`;
            } else if (key === 'layoutType') {
                const layoutOptions = [
                    { value: 'image-left', label: '🖼️ Bild links' },
                    { value: 'image-right', label: '🖼️ Bild rechts' },
                    { value: 'image-top', label: '🖼️ Bild oben' },
                    { value: 'image-bottom', label: '🖼️ Bild unten' }
                ];
                html += `<select class="form-control" oninput="updateProperty('${key}', this.value)">`;
                layoutOptions.forEach(option => {
                    const selected = value === option.value ? 'selected' : '';
                    html += `<option value="${option.value}" ${selected}>${option.label}</option>`;
                });
                html += `</select>`;
            } else {
                html += `<input type="text" class="form-control" value="${value}" oninput="updateProperty('${key}', this.value)">`;
            }  

            // === GUIDE-FLOW SPEZIFISCHE FELDER ===
            if (fieldType === 'guide-hotspot-range') {
                const currentValue = value || 50;
                const min = 10;
                const max = 90;

                return `
                    <div class="form-group">
                        <label class="form-label">${label}</label>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <input type="range" class="form-control" value="${currentValue}" 
                                min="${min}" max="${max}" step="1"
                                oninput="updateProperty('${key}', parseInt(this.value)); updateHotspotPreview('${key}', this.value)"
                                style="flex: 1;">
                            <span id="range-value-${key}" style="min-width: 40px; font-size: 0.9rem; font-weight: 600; color: #063AA8;">${currentValue}%</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #6c757d; margin-top: 0.25rem;">
                            <span>${min}%</span>
                            <span>${max}%</span>
                        </div>
                    </div>
                `;
            }

            if (fieldType === 'guide-steps-number') {
                return `
                    <div class="form-group">
                        <label class="form-label">Anzahl aktiver Schritte</label>
                        <input type="number" class="form-control" value="${value}" 
                            min="1" max="10" step="1"
                            oninput="updateProperty('${key}', parseInt(this.value)); updateStepsPreview(this.value)">
                        <small style="color: #6c757d; font-size: 0.75rem;">1 bis 10 Schritte möglich</small>
                    </div>
                `;
            }

            if (fieldType === 'guide-step-icon') {
                return `
                    <div class="form-group">
                        <label class="form-label">${label}</label>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <div style="font-family: 'Font Awesome 5 Pro'; font-size: 1.5rem; padding: 0.5rem; border: 1px solid var(--kerberos-border); border-radius: 4px; min-width: 50px; text-align: center;">
                                <i class="fas ${value}"></i>
                            </div>
                            <button type="button" class="btn btn-primary" onclick="showIconPicker('${key}')" style="flex: 1;">Icon auswählen</button>
                        </div>
                        <input type="text" class="form-control" value="${value}" 
                            oninput="updateProperty('${key}', this.value)" 
                            style="margin-top: 0.5rem;" placeholder="z.B. fa-rocket">
                    </div>
                `;
            }

            html += `</div>`;
            return html;
        }

        function renderDropdown(key, currentValue, options, label) {
            let html = `<select class="form-control" oninput="updateProperty('${key}', this.value)">`;
            
            Object.entries(options).forEach(([optionKey, optionValue]) => {
                const selected = optionKey === currentValue ? 'selected' : '';
                // Erstelle ein schönes Label basierend auf dem Key
                const displayLabel = optionKey.charAt(0).toUpperCase() + optionKey.slice(1).replace(/([A-Z])/g, ' $1');
                html += `<option value="${optionKey}" ${selected}>${displayLabel}</option>`;
            });
            
            html += `</select>`;
            return html;
        }

        function renderPlanQuickSetup(planNumber) {
            return `
                <div style="background: #F8F9FA; padding: 1rem; border-radius: 6px; margin-bottom: 1rem; border: 1px solid #DEE2E6;">
                    <h5 style="margin: 0 0 1rem 0; color: #063AA8; font-size: 0.9rem;">⚡ Plan ${planNumber} Schnell-Setup</h5>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 1rem;">
                        <button class="btn btn-secondary" onclick="applyPlanTemplate('${planNumber}', 'basic')" style="font-size: 0.75rem; padding: 0.4rem;">💼 Basis</button>
                        <button class="btn btn-secondary" onclick="applyPlanTemplate('${planNumber}', 'premium')" style="font-size: 0.75rem; padding: 0.4rem;">⭐ Premium</button>
                        <button class="btn btn-secondary" onclick="applyPlanTemplate('${planNumber}', 'enterprise')" style="font-size: 0.75rem; padding: 0.4rem;">🏢 Enterprise</button>
                        <button class="btn btn-warning" onclick="copyFromPlan('${planNumber}')" style="font-size: 0.75rem; padding: 0.4rem;">📋 Kopieren</button>
                    </div>
                </div>
            `;
        }


// ========================================
// 🌐 NAMESPACE - Alle Renderer-Funktionen global verfügbar machen
// ========================================

window.Renderers = {
    // Hauptfunktionen
    renderPropertyPanel,
    updateProperty,
    applyChanges,
    
    // Property-Picker
    renderColorPicker,
    renderIconPicker,
    renderImagePicker,
    renderImageAdjustments,
    renderPositionPicker,
    renderBooleanPicker,
    renderSelectPicker,
    renderImagePropertyDropdown,
    renderRichTextEditor,
    renderSVGSizer,
    renderSvgCodePicker,
    renderSpacingPicker,
    
    // Preset-Picker
    renderShadowPreset,
    renderBorderPreset,
    renderGradientPreset,
    renderHoverPreset,
    renderIconSizePreset,
    renderIconSizeCustomPreset,
    renderIconBackgroundSizePreset,
    renderIconBackgroundRadiusPreset,
    renderStatMinWidthPreset,
    renderCardRadiusPreset,
    
    // Spezielle Renderer
    renderPropertyField,
    renderDropdown,
    renderPlanQuickSetup,
    renderChallengeSolutionContent,
    renderCanvasWithInteractivity
};

// Für Rückwärtskompatibilität: Alle Funktionen auch global verfügbar machen
Object.assign(window, window.Renderers);

console.log('🎨 Renderers-Namespace geladen mit', Object.keys(window.Renderers).length, 'Funktionen');