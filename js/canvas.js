        // Canvas rendern
        function renderCanvas() {

            // Verhindere mehrfaches gleichzeitiges Rendering
            if (window.renderingInProgress) {
                console.log('🛑 Rendering bereits aktiv - überspringe');
                return;
            }
            window.renderingInProgress = true;

            // TIMEOUT für Lock-Freigabe als Fallback (falls Code-Fehler auftritt)
            setTimeout(() => {
                if (window.renderingInProgress) {
                    console.warn('🔧 Rendering-Lock nach 5s freigegeben (Fallback)');
                    window.renderingInProgress = false;
                }
            }, 5000);

            // Canvas komplett leeren vor Neuaufbau
            const canvas = document.getElementById('canvas');
            if (canvas) {
                canvas.innerHTML = '';
            }
            console.log('🔄 renderCanvas gestartet');
            const placeholder = canvas.querySelector('.canvas-placeholder');

            // Alte Event Listener entfernen
            // removeModuleEventListeners(); // Auskommentiert - nicht mehr nötig

            const moduleElements = canvas.querySelectorAll('.canvas-module');
            moduleElements.forEach(el => el.remove());
            // Canvas ohne Replacement verwenden - nur Module entfernen
            const freshCanvas = canvas;

            // Entferne alte Event Handler vom Canvas
            const oldCanvas = document.getElementById('canvas');
            if (oldCanvas && oldCanvas.hasAttribute('data-click-handler')) {
                oldCanvas.removeAttribute('data-click-handler');
                oldCanvas.removeEventListener('click', arguments.callee);
            }

            // Canvas-Click-Handler nur einmal hinzufügen (falls noch nicht vorhanden)
            if (!freshCanvas.hasAttribute('data-click-handler')) {
                freshCanvas.setAttribute('data-click-handler', 'true');
                freshCanvas.addEventListener('click', (e) => {
                    // Nur wenn Canvas selbst geklickt wurde (nicht ein Modul)
                    if (e.target === freshCanvas || e.target.classList.contains('canvas-placeholder')) {
                        console.log('🖱️ Canvas geklickt - Deselektierung');
                        document.querySelectorAll('.canvas-module').forEach(el => {
                            el.classList.remove('selected');
                            el.style.zIndex = '';
                            el.style.position = '';
                            el.style.border = '';
                            el.style.boxShadow = '';
                        });
                        selectedModule = null;
                        window.selectedModule = null;
                        renderPropertyPanel();
                        showNotification('✅ Auswahl aufgehoben');
                    }
                });
            }

            if (modules.length === 0) {
                if (placeholder) placeholder.style.display = 'block';
                return;
            }

            if (placeholder) placeholder.style.display = 'none';

            // 🔍 DEBUG: Module-Array vor Rendering prüfen
            console.log('📊 Module-Array vor Rendering:');
            modules.forEach((mod, idx) => {
                console.log(`  ${idx}: ${mod.id} -> ${mod.name}`);
            });

            // 🔧 REPARATUR: Doppelte IDs vor Rendering prüfen und korrigieren
            const idCounts = {};
            modules.forEach(module => {
                idCounts[module.id] = (idCounts[module.id] || 0) + 1;
            });

            const duplicateIds = Object.keys(idCounts).filter(id => idCounts[id] > 1);
            if (duplicateIds.length > 0) {
                console.warn('⚠️ Doppelte Modul-IDs gefunden:', duplicateIds);
                
                // IDs automatisch korrigieren
                duplicateIds.forEach(duplicateId => {
                    const duplicateModules = modules.filter(m => m.id === duplicateId);
                    for (let i = 1; i < duplicateModules.length; i++) {
                        duplicateModules[i].id = `module_${++moduleCounter}_fixed`;
                        console.log('🔧 ID korrigiert:', duplicateId, '→', duplicateModules[i].id);
                    }
                });
            }

            modules.forEach((module, index) => {
                console.log(`🏗️ Erstelle DOM für Modul ${index}:`, module.id, '→', module.name);

                const moduleDiv = document.createElement('div');
                moduleDiv.className = 'canvas-module';
                moduleDiv.dataset.moduleId = module.id;

                // 🔧 REPARATUR: Sauberes HTML OHNE onclick-Attribute
                moduleDiv.innerHTML = `
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
                        📄 ${module.name} <span style="opacity: 0.7;">| ${module.category || 'Uncategorized'}</span>
                        <span style="background: #28a745; color: white; padding: 0.1rem 0.4rem; border-radius: 10px; font-size: 0.7rem; margin-left: 0.5rem;">LIVE</span>
                    </div>
                    <div class="module-content">${processModuleHTML(module)}</div>
                `;

                // 🔧 REPARATUR: Event-Delegation mit Closure-Fix
                (function (moduleId, moduleName) {
                    moduleDiv.addEventListener('click', function (e) {
                        e.stopPropagation(); // Verhindere Canvas-Click

                        if (e.target.classList.contains('control-btn')) {
                            // Button-Clicks behandeln
                            const action = e.target.dataset.action;
                            const targetModuleId = e.target.dataset.moduleId;

                            console.log('🔘 Button-Click:', action, 'für Modul:', targetModuleId, '(' + moduleName + ')');

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
                                default:
                                    console.warn('❓ Unbekannte Aktion:', action);
                            }
                        } else {
                            // Klick auf Modul-Content (nicht auf Button)
                            console.log('🖱️ Modul-Content-Click:', moduleId, '(' + moduleName + ')');
                            selectModule(moduleId);
                        }
                    });
                })(module.id, module.name);

                // 🔍 DEBUG: Verifiziere DOM-Element
                console.log('✅ DOM-Element erstellt für:', module.id, 'mit data-module-id:', moduleDiv.dataset.moduleId);

                // DUPLIKAT-PRÄVENTION: Prüfe ob Element bereits existiert
                const existingElement = freshCanvas.querySelector(`[data-module-id="${module.id}"]`);
                if (existingElement) {
                    console.warn('⚠️ Verhindere Duplikat für:', module.id);
                    existingElement.remove();
                }

                freshCanvas.appendChild(moduleDiv);
            });

            // 🔍 FINAL DEBUG: Prüfe DOM-Struktur nach Rendering
            console.log('📊 DOM-Struktur nach Rendering:');
            const renderedModules = freshCanvas.querySelectorAll('.canvas-module');
            renderedModules.forEach((el, idx) => {
                console.log(`  DOM ${idx}: data-module-id="${el.dataset.moduleId}"`);
            });

            // Testimonials Carousels nach dem Rendering initialisieren
            setTimeout(() => {
                if (typeof initializeTestimonialsCarousels === 'function') {
                    initializeTestimonialsCarousels();
                }
            }, 100);

            console.log('✅ renderCanvas abgeschlossen - ', modules.length, 'Module gerendert');

            // Guide Flow Interaktivität nach dem Rendering initialisieren
            setTimeout(() => {
                if (typeof enhanceGuideFlowInteractivity === 'function') {
                    enhanceGuideFlowInteractivity();
                }
            }, 200);

            // ===== FAQ-INTERAKTIVITÄT REAKTIVIEREN =====
            setTimeout(() => {
                console.log('🔄 Reaktiviere FAQ-Interaktivität nach Canvas-Rendering...');
                activateModuleInteractivity();
            }, 150);

            // Zusätzlicher Fallback für FAQ-Interaktivität
            setTimeout(() => {
                console.log('🔄 FAQ-Interaktivität Fallback...');
                activateModuleInteractivity();
            }, 400);

            // Event Handler für dynamische Buttons neu binden
            setTimeout(() => {
                bindDynamicButtonHandlers();
                
                // Rendering-Lock freigeben
                window.renderingInProgress = false;
                console.log('🎯 Event Handler gebunden - Rendering vollständig abgeschlossen');
            }, 100);

            // Event Handler für dynamische Buttons neu binden
            setTimeout(() => {
                bindDynamicButtonHandlers();
                
                // Rendering-Lock freigeben
                window.renderingInProgress = false;
                console.log('🎯 Event Handler gebunden - Rendering vollständig abgeschlossen');
            }, 100);
        }

        // Modul zum Canvas hinzufügen
        function addModuleToCanvas(templateId) {
            const template = MODULE_TEMPLATES.find(t => t && t.id === templateId);
            if (!template) {
                console.error('Template nicht gefunden:', templateId);
                showNotification('❌ Template nicht gefunden: ' + templateId);
                return;
            }

            // 🔧 REPARATUR: Eindeutige ID-Generierung mit Kollisionsprüfung
            function generateUniqueModuleId() {
                let newId;
                let attempts = 0;
                do {
                    newId = `module_${++moduleCounter}`;
                    attempts++;
                    // Fallback nach 1000 Versuchen
                    if (attempts > 1000) {
                        newId = `module_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                        break;
                    }
                } while (modules.some(m => m.id === newId) || document.querySelector(`[data-module-id="${newId}"]`));
                return newId;
            }

            const module = {
                id: generateUniqueModuleId(),
                templateId: templateId,
                html: template.html,
                properties: { ...template.properties },
                name: template.name,
                category: template.category,
                description: template.description
            };

            modules.push(module);
            // 🔧 REPARATUR: Synchronisation sicherstellen
            window.modules = modules;
            renderCanvas();
            selectModule(module.id);

            const placeholder = document.querySelector('.canvas-placeholder');
            if (placeholder) placeholder.style.display = 'none';

            showNotification('✅ ' + template.name + ' hinzugefügt');
        }

        // Modul auswählen
        function selectModule(moduleId) {
            console.log('🎯 selectModule aufgerufen:', moduleId);

            // 🔧 REPARATUR: Erlaube Auswahl aller Module
            console.log('🔄 Wechsle von', selectedModule?.id, 'zu', moduleId);

            // NUR Canvas-Module deselektieren - NICHT die Control-Buttons!
            document.querySelectorAll('.canvas-module').forEach(el => {
                el.classList.remove('selected', 'active');
                el.style.zIndex = '';
                el.style.position = '';
                el.style.border = '';
                el.style.boxShadow = '';
                el.style.background = '';
            });

            // NULL-CHECK für moduleId
            if (!moduleId) {
                console.log('📝 Keine Modul-ID - deselektiere alles');
                selectedModule = null;
                renderPropertyPanel();
                return;
            }

            // Finde das neue Modul
            const targetModule = modules.find(m => m.id === moduleId);
            if (!targetModule) {
                console.error('❌ Modul nicht gefunden:', moduleId);
                selectedModule = null;
                renderPropertyPanel();
                return;
            }

            // 🔧 REPARATUR: Sanfte DOM-Element-Suche (nicht löschen!)
            let moduleElements = document.querySelectorAll(`[data-module-id="${moduleId}"]`);
            if (moduleElements.length === 0) {
                // Warte kurz und versuche erneut (manchmal ist Rendering noch nicht fertig)
                setTimeout(() => {
                    moduleElements = document.querySelectorAll(`[data-module-id="${moduleId}"]`);
                    if (moduleElements.length > 0) {
                        console.log('✅ DOM-Element gefunden nach Verzögerung:', moduleId);
                        markSelectedModule(moduleElements[0], moduleId);
                    } else {
                        console.warn('⚠️ DOM-Element nicht gefunden auch nach Verzögerung:', moduleId);
                    }
                }, 50);
                return; // Früh return wenn Element nicht gefunden
            }

            // Entferne nur echte Duplikate (nicht das erste Element!)
            if (moduleElements.length > 1) {
                console.warn('⚠️ Mehrere DOM-Elemente gefunden:', moduleId, moduleElements.length);
                
                // SOFORTIGE Bereinigung aller Duplikate
                const canvas = document.getElementById('canvas');
                if (canvas) {
                    const allDuplicates = canvas.querySelectorAll(`[data-module-id="${moduleId}"]`);
                    for (let i = 1; i < allDuplicates.length; i++) {
                        allDuplicates[i].remove();
                        console.log('🗑️ Duplikat entfernt');
                    }
                }
                
                // Erneut scannen nach Bereinigung
                moduleElements = document.querySelectorAll(`[data-module-id="${moduleId}"]`);
                
                // Wenn immer noch Duplikate vorhanden, Canvas komplett neu rendern
                if (moduleElements.length > 1) {
                    console.warn('🔄 Erzwinge Canvas-Neu-Rendering wegen persistenter Duplikate');
                    renderCanvas();
                    return; // Früher Ausstieg, selectModule wird nach renderCanvas automatisch aufgerufen
                }
            }

            // Warte kurz und prüfe erneut
            setTimeout(() => {
                const moduleElements = document.querySelectorAll(`[data-module-id="${moduleId}"]`);
                if (moduleElements.length > 1) {
                    console.warn('⚠️ Mehrere DOM-Elemente nach Bereinigung gefunden:', moduleId);
                    // Entferne Duplikate (behalte nur das erste)
                    for (let i = 1; i < moduleElements.length; i++) {
                        moduleElements[i].remove();
                        console.log('🗑️ Nachträglich entfernt');
                    }
                }
            }, 10);

            // SCHUTZ: Prüfe ob Modul tatsächlich existiert
            const moduleExists = modules.find(m => m.id === moduleId);
            if (!moduleExists) {
                console.error('❌ Modul existiert nicht im modules-Array:', moduleId);
                selectedModule = null;
                renderPropertyPanel();
                return;
            }

            // DOM-Element finden und markieren
            const moduleEl = document.querySelector(`[data-module-id="${moduleId}"]`);
            if (moduleEl) {
                moduleEl.classList.add('selected');
                moduleEl.style.zIndex = '5';
                moduleEl.style.position = 'relative';
                moduleEl.style.border = '2px solid #063AA8';
                moduleEl.style.boxShadow = '0 4px 12px rgba(6,58,168,0.2)';
                console.log('✅ DOM-Element markiert:', moduleId);
            } else {
                console.warn('⚠️ DOM-Element nicht gefunden für:', moduleId);
            }

            // Globale Variable setzen
            selectedModule = targetModule;
            window.selectedModule = targetModule;

            console.log('✅ Modul ausgewählt:', selectedModule.name);

            // Property Panel aktualisieren
            renderPropertyPanel();
            updateExportButtons();
            // Enhanced Guide-Flow Editor mit Verzögerung
            setTimeout(() => {
                setupGuideFlowPropertyPanel(moduleId);
            }, 200);
        }


        function validateCanvasState() {
            const canvas = document.getElementById('canvas');
            if (!canvas || !window.modules) return;
            
            const domCount = canvas.querySelectorAll('.canvas-module').length;
            const moduleCount = window.modules.length;
            
            if (domCount !== moduleCount) {
                console.warn(`⚠️ Canvas-Mismatch: ${domCount} DOM vs ${moduleCount} Module`);
            }
        }        

        window.copyModuleCode = function (moduleId) {
            const module = modules.find(m => m.id === moduleId);
            if (!module) return;

            navigator.clipboard.writeText(processModuleHTML(module)).then(() => {
                showNotification('📋 ' + module.name + ' Code kopiert');
            });
        };

        window.moveModule = function (moduleId, direction) {
            const index = modules.findIndex(m => m.id === moduleId);
            if (index === -1) return;

            const newIndex = index + direction;
            if (newIndex < 0 || newIndex >= modules.length) return;

            [modules[index], modules[newIndex]] = [modules[newIndex], modules[index]];
            renderCanvas();
            selectModule(moduleId);
        };

        window.deleteModule = function (moduleId) {
            if (confirm('Modul wirklich löschen?')) {
                const module = modules.find(m => m.id === moduleId);
                if (!module) return;

                const moduleName = module.name;
                modules = modules.filter(m => m.id !== moduleId);
                renderCanvas();

                // Wenn das gelöschte Modul ausgewählt war, Property Panel zurücksetzen
                if (selectedModule && selectedModule.id === moduleId) {
                    selectedModule = null;
                    renderPropertyPanel();
                }

                // Placeholder anzeigen falls keine Module mehr da sind
                if (modules.length === 0) {
                    const placeholder = document.querySelector('.canvas-placeholder');
                    if (placeholder) placeholder.style.display = 'block';
                }

                showNotification(`🗑️ Modul "${moduleName}" gelöscht`);
            }
        };

        window.duplicateModule = function (moduleId) {
            const module = modules.find(m => m.id === moduleId);
            if (!module) return;

            // 🔧 REPARATUR: Eindeutige ID auch beim Duplizieren
            function generateUniqueModuleId() {
                let newId;
                let attempts = 0;
                do {
                    newId = `module_${++moduleCounter}`;
                    attempts++;
                    if (attempts > 1000) {
                        newId = `module_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                        break;
                    }
                } while (modules.some(m => m.id === newId));
                return newId;
            }

            const duplicate = {
                id: generateUniqueModuleId(),
                templateId: module.templateId,
                html: module.html,
                properties: { ...module.properties },
                name: module.name + ' (Kopie)'
            };

            const index = modules.findIndex(m => m.id === moduleId);
            modules.splice(index + 1, 0, duplicate);
            renderCanvas();
            showNotification('📋 Modul dupliziert');
        };
