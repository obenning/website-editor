        // Import/Export System
        function showImportModal() {
            document.getElementById('importModal').style.display = 'block';
            updateExportButtons();
        }

        function closeImportModal() {
            document.getElementById('importModal').style.display = 'none';
        }

        function switchImportTab(tabName) {
            document.querySelectorAll('#importModal .tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('#importModal .tab-content').forEach(content => content.classList.remove('active'));

            document.querySelector(`[onclick="switchImportTab('${tabName}')"]`).classList.add('active');
            document.getElementById(`import${tabName.charAt(0).toUpperCase() + tabName.slice(1)}Tab`).classList.add('active');
        }

        function importData() {
            const textarea = document.getElementById('importTextarea');
            let jsonData = textarea.value.trim();

            if (!jsonData) {
                showNotification('❌ Bitte JSON-Daten eingeben oder Datei auswählen');
                return;
            }

            try {
                const data = JSON.parse(jsonData);
                handleImportData(data);
            } catch (e) {
                showNotification('❌ Ungültige JSON-Daten: ' + e.message);
            }
        }

        function handleImportData(data) {
            try {
                // Validierung der Eingangsdaten
                if (!data || typeof data !== 'object') {
                    showNotification('❌ Ungültige Datenstruktur');
                    return;
                }

                if (!data.type) {
                    showNotification('❌ Unbekanntes Datenformat - "type" fehlt');
                    return;
                }

                // Einfache Validierung - MODULE_TEMPLATES sollte bereits existieren
                if (!MODULE_TEMPLATES || !Array.isArray(MODULE_TEMPLATES)) {
                    console.error('MODULE_TEMPLATES nicht verfügbar');
                    showNotification('❌ Template-System nicht geladen');
                    return;
                }

                switch (data.type) {
                    case 'page':
                        if (confirm('Aktuelle Seite überschreiben und ' + (data.name || 'Seite') + ' laden?')) {
                            modules = Array.isArray(data.modules) ? data.modules : [];
                            if (data.spacing) globalSpacing = data.spacing;
                            document.getElementById('pageNameInput').value = data.name || 'Importierte Seite';
                            renderCanvas();
                            selectedModule = null;
                            renderPropertyPanel();
                            showNotification('✅ Seite importiert: ' + (data.name || 'Unbekannt'));
                            closeImportModal();
                        }
                        break;

                    case 'module':
                    case 'single-module':
                    case 'module-template':
                        const moduleData = data.module || data.template || data;

                        // Validierung der Modul-Daten
                        if (!moduleData || typeof moduleData !== 'object') {
                            showNotification('❌ Ungültige Modul-Daten');
                            return;
                        }

                        const templateId = moduleData.id || moduleData.templateId;
                        if (!templateId) {
                            showNotification('❌ Modul-ID fehlt');
                            return;
                        }

                        // Sichere Template-Suche
                        const existingTemplate = MODULE_TEMPLATES.find(t => t && t.id === templateId);

                        if (!existingTemplate) {
                            // Standard-HTML-Template mit Platzhaltern erstellen
                            let defaultHtmlTemplate = '<section data-style="SECTION_STYLES"><div data-style="CONTAINER_STYLES"><h2 data-style="TITLE_STYLES">{{title}}</h2><p data-style="TEXT_STYLES">{{text}}</p></div></section>';

                            // CSS separat definieren
                            const sectionStyles = [
                                'padding: {{sectionSpacing}}',
                                'background: {{backgroundColor}}'
                            ].join('; ');

                            const containerStyles = [
                                'max-width: 1200px',
                                'margin: 0 auto',
                                'padding: 0 2rem'
                            ].join('; ');

                            const titleStyles = [
                                'color: {{titleColor}}'
                            ].join('; ');

                            const textStyles = [
                                'color: {{textColor}}'
                            ].join('; ');

                            // Replace-Operationen für Standard-Template
                            defaultHtmlTemplate = defaultHtmlTemplate.replace('data-style="SECTION_STYLES"', 'style="' + sectionStyles + '"');
                            defaultHtmlTemplate = defaultHtmlTemplate.replace('data-style="CONTAINER_STYLES"', 'style="' + containerStyles + '"');
                            defaultHtmlTemplate = defaultHtmlTemplate.replace('data-style="TITLE_STYLES"', 'style="' + titleStyles + '"');
                            defaultHtmlTemplate = defaultHtmlTemplate.replace('data-style="TEXT_STYLES"', 'style="' + textStyles + '"');

                            // Neues Template erstellen
                            const newTemplate = {
                                id: templateId,
                                name: moduleData.name || data.name || 'Importiertes Modul',
                                category: moduleData.category || 'Custom',
                                description: moduleData.description || data.description || 'Importiertes Modul',
                                html: moduleData.html || defaultHtmlTemplate,
                                properties: moduleData.properties || {
                                    title: 'Standard Titel',
                                    titleColor: '#063AA8',
                                    text: 'Standard Text',
                                    textColor: '#212529',
                                    backgroundColor: '#FFFFFF',
                                    sectionSpacing: '4rem 0'
                                },
                                customized: true
                            };

                            MODULE_TEMPLATES.push(newTemplate);
                            loadModuleLibrary();
                            saveCustomTemplates();
                            console.log('✅ Template hinzugefügt:', templateId);
                        }

                        // Modul zum Canvas hinzufügen
                        if (typeof addModuleToCanvas === 'function') {
                            addModuleToCanvas(templateId);

                            // Custom Properties anwenden
                            if (moduleData.properties && modules.length > 0) {
                                const lastModule = modules[modules.length - 1];
                                if (lastModule) {
                                    lastModule.properties = { ...lastModule.properties, ...moduleData.properties };
                                    renderCanvas();
                                }
                            }
                        } else {
                            console.error('addModuleToCanvas Funktion nicht verfügbar');
                        }

                        showNotification('✅ Modul importiert: ' + (data.name || moduleData.name || 'Unbekannt'));
                        closeImportModal();
                        break;

                    case 'templates':
                    case 'custom-library':
                    case 'module-backup':
                        if (confirm('Neue Module hinzufügen?')) {
                            let importedCount = 0;
                            const templatesToAdd = data.templates || data.modules || [];

                            if (!Array.isArray(templatesToAdd)) {
                                showNotification('❌ Keine gültigen Templates gefunden');
                                return;
                            }

                            templatesToAdd.forEach(template => {
                                try {
                                    // Validierung jedes Templates
                                    if (!template || typeof template !== 'object') {
                                        console.warn('Ungültiges Template übersprungen:', template);
                                        return;
                                    }

                                    // Template-ID sicherstellen
                                    if (template.templateId && !template.id) {
                                        template.id = template.templateId;
                                    }

                                    if (!template.id) {
                                        console.warn('Template ohne ID übersprungen:', template);
                                        return;
                                    }

                                    // Existenz prüfen
                                    const exists = MODULE_TEMPLATES.find(t => t && t.id === template.id);
                                    if (!exists) {
                                        // Standard-Werte setzen
                                        template.customized = true;
                                        if (!template.category) template.category = 'Custom';
                                        if (!template.name) template.name = 'Importiertes Modul';
                                        if (!template.html) template.html = '<div>Standard HTML</div>';
                                        if (!template.properties) template.properties = {};

                                        MODULE_TEMPLATES.push(template);
                                        importedCount++;
                                        console.log('✅ Template importiert:', template.id);
                                    }
                                } catch (templateError) {
                                    console.error('Fehler beim Template-Import:', templateError, template);
                                }
                            });

                            if (importedCount > 0) {
                                loadModuleLibrary();
                                saveCustomTemplates();
                                showNotification(`✅ ${importedCount} Module importiert`);
                            } else {
                                showNotification('ℹ️ Alle Module bereits vorhanden oder ungültig');
                            }
                            closeImportModal();
                        }
                        break;

                    default:
                        showNotification('❌ Unbekannter Datentyp: ' + data.type);
                }
            } catch (error) {
                console.error('Fehler beim Import:', error);
                showNotification('❌ Import-Fehler: ' + error.message);
            }
        }


        function exportCurrentPage() {
            const pageName = document.getElementById('pageNameInput').value || 'kerberos-page';
            const pageData = {
                name: pageName,
                description: 'Exportierte Kerberos Seite',
                modules: modules,
                created: new Date().toISOString(),
                spacing: globalSpacing,
                type: 'page'
            };

            const jsonData = JSON.stringify(pageData, null, 2);
            downloadJSON(jsonData, `${pageName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.json`);
            showNotification('📄 Seite exportiert');
        }

        function exportModuleTemplates() {
            const templateData = {
                name: 'Kerberos Module Templates',
                description: 'Sammlung aller Kerberos Module',
                templates: MODULE_TEMPLATES,
                created: new Date().toISOString(),
                type: 'templates'
            };

            const jsonData = JSON.stringify(templateData, null, 2);
            downloadJSON(jsonData, 'kerberos-module-templates.json');
            showNotification('📦 Module Templates exportiert');
        }

        function exportSelectedModule() {
            if (!selectedModule) return;

            const template = MODULE_TEMPLATES.find(t => t.id === selectedModule.templateId);
            const moduleData = {
                name: selectedModule.name,
                description: template?.description || 'Exportiertes Modul',
                module: {
                    ...template,
                    customProperties: selectedModule.properties
                },
                created: new Date().toISOString(),
                type: 'module'
            };

            const jsonData = JSON.stringify(moduleData, null, 2);
            downloadJSON(jsonData, `${selectedModule.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.json`);
            showNotification('🔧 Modul exportiert');
        }

        function exportModuleTemplate(templateId) {
            const template = MODULE_TEMPLATES.find(t => t.id === templateId);
            if (!template) return;

            const exportData = {
                name: `Template: ${template.name}`,
                description: `Module-Template Export: ${template.name}`,
                template: template,
                created: new Date().toISOString(),
                type: 'module-template',
                version: '2.0'
            };

            const jsonData = JSON.stringify(exportData, null, 2);
            const filename = `template-${template.id}.json`;
            downloadJSON(jsonData, filename);

            showNotification(`📤 Template "${template.name}" exportiert`);
        }

        function exportModuleLibrary() {
            // Erweiterte Filterlogik für Export
            const customTemplates = MODULE_TEMPLATES.filter(t => {
                return t.customized ||
                    t.category === 'Custom' ||
                    !t.id.startsWith('kerberos-hero') ||  // Alles außer den geschützten Basis-Modulen
                    t.id.includes('extended') ||           // Alle erweiterten Module
                    t.id.includes('comparison') ||         // Vergleichstabellen
                    t.id.includes('pricing');              // Preistabellen
            });

            if (customTemplates.length === 0) {
                showNotification('❌ Keine exportierbaren Templates gefunden');
                return;
            }

            const exportData = {
                name: 'Kerberos Custom Module Library',
                description: `Export aller ${customTemplates.length} benutzerdefinierten Module`,
                templates: customTemplates,
                created: new Date().toISOString(),
                type: 'custom-library',
                version: '2.0'
            };

            const jsonData = JSON.stringify(exportData, null, 2);
            downloadJSON(jsonData, 'kerberos-custom-library.json');

            showNotification(`📤 ${customTemplates.length} Custom Templates exportiert`);
        }

        function exportAllCurrentModules() {
            if (modules.length === 0) {
                showNotification('❌ Keine Module zum Exportieren vorhanden');
                return;
            }

            const pageName = document.getElementById('pageNameInput').value || 'Kerberos-Module';
            const exportData = {
                name: `Alle Module von "${pageName}"`,
                description: `Backup aller ${modules.length} Module vom ${new Date().toLocaleString('de-DE')}`,
                modules: modules.map(module => ({
                    templateId: module.templateId,
                    name: module.name,
                    category: module.category,
                    description: module.description,
                    properties: module.properties,
                    customized: true
                })),
                created: new Date().toISOString(),
                type: 'module-backup',
                version: '2.0'
            };

            const jsonData = JSON.stringify(exportData, null, 2);
            const filename = `kerberos-module-backup-${Date.now()}.json`;
            downloadJSON(jsonData, filename);

            showNotification(`📦 ${modules.length} Module erfolgreich exportiert`);
        }

        function exportSingleModule(moduleId) {
            const module = modules.find(m => m.id === moduleId);
            if (!module) return;

            const template = MODULE_TEMPLATES.find(t => t.id === module.templateId);
            const exportData = {
                name: module.name,
                description: `Einzelmodul-Export: ${module.name}`,
                module: {
                    templateId: module.templateId,
                    name: module.name,
                    category: module.category || template?.category || 'Custom',
                    description: module.description || template?.description || '',
                    properties: module.properties,
                    customized: true
                },
                created: new Date().toISOString(),
                type: 'single-module',
                version: '2.0'
            };

            const jsonData = JSON.stringify(exportData, null, 2);
            const filename = `${module.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-modul.json`;
            downloadJSON(jsonData, filename);

            showNotification(`📤 Modul "${module.name}" exportiert`);
        }

        function downloadJSON(jsonData, filename) {
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        }
        
        // FIX: Null-Check hinzufügen
        const importInput = document.getElementById('importInput');
        if (importInput) {
            importInput.addEventListener('change', function (e) {
                const file = e.target.files[0];
                if (file && file.type === 'application/json') {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        try {
                            const data = JSON.parse(e.target.result);
                            const importTextarea = document.getElementById('importTextarea');
                            if (importTextarea) {
                                importTextarea.value = JSON.stringify(data, null, 2);
                            }
                            handleImportData(data);
                        } catch (err) {
                            if (typeof showNotification === 'function') {
                                showNotification('❌ Fehler beim Lesen der Datei: ' + err.message);
                            }
                        }
                    };
                    reader.readAsText(file);
                }
            });
        }