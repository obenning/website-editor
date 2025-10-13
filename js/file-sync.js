        // Lokale Datei-Synchronisation für geteilte Ordner
        class LocalFileSync {
            constructor() {
                this.projectFileName = 'website-manager-project.json';
                this.autoSaveInterval = null;
                this.lastSaveTime = null;
            }

            // Automatisches Speichern in lokale Datei
            startAutoSave() {
                this.autoSaveInterval = setInterval(() => {
                    // Prüfe ob IRGENDWELCHE Daten vorhanden sind
                    const hasWebsites = localStorage.getItem('kerberos-websites');
                    const hasPages = localStorage.getItem('kerberos-saved-pages');
                    const hasTemplates = localStorage.getItem('kerberos-custom-templates');
                    const hasCurrentModules = typeof modules !== 'undefined' && modules.length > 0;

                    if (hasWebsites || hasPages || hasTemplates || hasCurrentModules) {
                        this.saveToFile(false); // false = kein Download-Dialog
                    }
                }, 30000); // Alle 30 Sekunden
            }

            stopAutoSave() {
                if (this.autoSaveInterval) {
                    clearInterval(this.autoSaveInterval);
                }
            }

            // 🔧 REPARATUR: Alle Daten aus LocalStorage laden
            loadAllDataBeforeExport() {
                try {
                    // 1. Websites laden
                    const savedWebsites = localStorage.getItem('kerberos-websites');
                    if (savedWebsites) {
                        websites = JSON.parse(savedWebsites);
                        console.log(`📄 ${websites.length} Websites für Export geladen`);
                    }

                    // 2. Saved Pages als Websites behandeln
                    const savedPages = localStorage.getItem('kerberos-saved-pages');
                    if (savedPages) {
                        const pages = JSON.parse(savedPages);
                        Object.entries(pages).forEach(([name, pageData]) => {
                            const websiteData = {
                                id: 'page-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
                                name: name,
                                description: pageData.description || '',
                                modules: pageData.modules || [],
                                created: pageData.created || new Date().toISOString(),
                                lastModified: pageData.created || new Date().toISOString(),
                                category: 'saved-page',
                                spacing: pageData.spacing || {}
                            };
                            websites.push(websiteData);
                        });
                        console.log(`📋 ${Object.keys(pages).length} gespeicherte Seiten als Websites hinzugefügt`);
                    }

                    // 3. Custom Templates laden
                    const savedTemplates = localStorage.getItem('kerberos-custom-templates');
                    if (savedTemplates) {
                        const templates = JSON.parse(savedTemplates);
                        customTemplates = {};
                        templates.forEach(template => {
                            if (template && template.id) {
                                customTemplates[template.id] = template;
                            }
                        });
                        console.log(`🧩 ${Object.keys(customTemplates).length} Custom Templates geladen`);
                    }

                    // 4. Aktuelle Canvas-Module als Website speichern (falls Module vorhanden)
                    if (typeof modules !== 'undefined' && modules.length > 0) {
                        const currentWebsite = {
                            id: 'current-' + Date.now(),
                            name: 'Aktuelle Arbeitssitzung',
                            description: 'Automatisch gespeicherte Module der aktuellen Sitzung',
                            modules: JSON.parse(JSON.stringify(modules)),
                            created: new Date().toISOString(),
                            lastModified: new Date().toISOString(),
                            category: 'current-session',
                            spacing: typeof globalSpacing !== 'undefined' ? globalSpacing : {}
                        };
                        websites.push(currentWebsite);
                        console.log(`🎨 Aktuelle Arbeitssitzung mit ${modules.length} Modulen hinzugefügt`);
                    }

                    console.log(`✅ Export-Vorbereitung: ${websites.length} Websites, ${Object.keys(customTemplates).length} Templates`);

                } catch (error) {
                    console.warn('⚠️ Fehler beim Laden der Export-Daten:', error);
                }
            }

            // In lokale Datei speichern
            saveToFile(showDownload = true) {
                // 🔧 REPARATUR: Alle Daten vor Export laden
                this.loadAllDataBeforeExport();

                const projectData = {
                    websites: websites || [],
                    customTemplates: customTemplates || {},
                    lastModified: new Date().toISOString(),
                    version: '2.0',
                    timestamp: Date.now(),
                    metadata: {
                        totalWebsites: websites ? websites.length : 0,
                        totalModules: websites ? websites.reduce((sum, w) => sum + w.modules.length, 0) : 0,
                        exportedBy: navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Browser',
                        exportDate: new Date().toLocaleString('de-DE')
                    }
                };

                const jsonString = JSON.stringify(projectData, null, 2);
                const blob = new Blob([jsonString], { type: 'application/json' });

                if (showDownload) {
                    // Manueller Download
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = this.projectFileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);

                    showNotification('💾 Projekt-Datei heruntergeladen: ' + this.projectFileName);
                } else {
                    // Automatisches Speichern - im localStorage als Backup
                    localStorage.setItem('project_backup', jsonString);
                    this.lastSaveTime = new Date();
                    this.updateSyncStatus('Automatisch gespeichert');
                }

                return true;
            }

            // Von lokaler Datei laden
            loadFromFile() {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';

                input.onchange = (event) => {
                    const file = event.target.files[0];
                    if (!file) return;

                    const reader = new FileReader();
                    reader.onload = (e) => {
                        try {
                            const projectData = JSON.parse(e.target.result);

                            // Validierung
                            if (!projectData.websites && !projectData.customTemplates) {
                                throw new Error('Ungültiges Projekt-Format');
                            }

                            // Daten laden
                            websites = projectData.websites || [];
                            customTemplates = projectData.customTemplates || {};

                            // UI aktualisieren
                            loadWebsiteList();
                            loadModuleLibrary();

                            // Statistiken anzeigen
                            const meta = projectData.metadata;
                            if (meta) {
                                showNotification(`✅ Projekt geladen: ${meta.totalWebsites} Websites, ${meta.totalModules} Module (${meta.exportDate})`);
                            } else {
                                showNotification('✅ Projekt erfolgreich geladen');
                            }

                            this.updateSyncStatus('Projekt geladen');

                        } catch (error) {
                            showNotification('❌ Fehler beim Laden: ' + error.message);
                        }
                    };

                    reader.readAsText(file);
                };

                input.click();
            }

            // Backup wiederherstellen
            restoreFromBackup() {
                const backup = localStorage.getItem('project_backup');
                if (!backup) {
                    showNotification('❌ Kein Backup gefunden');
                    return;
                }

                try {
                    const projectData = JSON.parse(backup);
                    websites = projectData.websites || [];
                    customTemplates = projectData.customTemplates || {};

                    loadWebsiteList();
                    loadModuleLibrary();
                    showNotification('✅ Backup wiederhergestellt');
                    this.updateSyncStatus('Backup wiederhergestellt');
                } catch (error) {
                    showNotification('❌ Backup beschädigt');
                }
            }

            // Projekt-Datei automatisch überwachen (für geteilte Ordner)
            startFileWatcher() {
                // Drag & Drop Support für die gesamte Seite
                document.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    document.body.style.backgroundColor = '#e3f2fd';
                });

                document.addEventListener('dragleave', (e) => {
                    if (e.clientX === 0 && e.clientY === 0) {
                        document.body.style.backgroundColor = '';
                    }
                });

                document.addEventListener('drop', (e) => {
                    e.preventDefault();
                    document.body.style.backgroundColor = '';

                    const files = Array.from(e.dataTransfer.files);
                    const jsonFile = files.find(file =>
                        file.name.endsWith('.json') &&
                        file.name.includes('website-manager')
                    );

                    if (jsonFile) {
                        this.loadJsonFile(jsonFile);
                    } else {
                        showNotification('❌ Bitte nur website-manager-project.json Dateien ablegen');
                    }
                });
            }

            loadJsonFile(file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const projectData = JSON.parse(e.target.result);

                        // Daten vergleichen - nur laden wenn neuer
                        const currentTimestamp = this.lastSaveTime ? this.lastSaveTime.getTime() : 0;
                        const fileTimestamp = projectData.timestamp || 0;

                        if (fileTimestamp > currentTimestamp) {
                            websites = projectData.websites || [];
                            customTemplates = projectData.customTemplates || {};

                            loadWebsiteList();
                            loadModuleLibrary();

                            showNotification('🔄 Projekt automatisch aktualisiert');
                            this.updateSyncStatus('Automatisch synchronisiert');
                        } else {
                            showNotification('📝 Datei ist älter - nicht geladen');
                        }

                    } catch (error) {
                        showNotification('❌ Fehler beim automatischen Laden: ' + error.message);
                    }
                };
                reader.readAsText(file);
            }

            updateSyncStatus(message) {
                const statusElement = document.getElementById('syncStatusText');
                if (statusElement) {
                    statusElement.textContent = message;
                    statusElement.style.color = '#28a745';

                    // Nach 3 Sekunden wieder auf Standard setzen
                    setTimeout(() => {
                        statusElement.textContent = 'Lokale Synchronisation';
                        statusElement.style.color = '#666';
                    }, 3000);
                }
            }

            // Anleitung für geteilte Ordner anzeigen
            showSharingInstructions() {
                const instructions = `
                    <div style="max-width: 500px;">
                        <h4>🗂️ Geteilte Ordner einrichten:</h4>
                        <ol style="text-align: left; line-height: 1.6;">
                            <li><strong>Ordner erstellen:</strong> Erstellen Sie einen geteilten Ordner (OneDrive, Google Drive, Dropbox, etc.)</li>
                            <li><strong>Projekt speichern:</strong> Klicken Sie "💾 Speichern" und legen Sie die Datei in den geteilten Ordner</li>
                            <li><strong>Team informieren:</strong> Teilen Sie den Ordner mit Ihrem Team</li>
                            <li><strong>Projekt laden:</strong> Teammitglieder können die Datei laden oder per Drag & Drop verwenden</li>
                            <li><strong>Automatische Updates:</strong> Ziehen Sie die Datei einfach ins Browser-Fenster für Updates</li>
                        </ol>
                        <div style="background: #e8f5e8; padding: 1rem; border-radius: 6px; margin-top: 1rem;">
                            <strong>💡 Tipp:</strong> Die Datei wird automatisch alle 30 Sekunden als Backup gespeichert. 
                            Für echte Synchronisation verwenden Sie "💾 Speichern" und legen die Datei in den geteilten Ordner.
                        </div>
                    </div>
                `;

                const modal = document.createElement('div');
                modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;';
                modal.innerHTML = `
                    <div style="background: white; padding: 2rem; border-radius: 8px; max-width: 90%; max-height: 80%; overflow-y: auto;">
                        ${instructions}
                        <div style="text-align: center; margin-top: 1.5rem;">
                            <button class="btn btn-primary" onclick="this.closest('div[style*=fixed]').remove()">Verstanden</button>
                        </div>
                    </div>
                `;

                document.body.appendChild(modal);
            }
        }

        // Funktionen für UI-Buttons
        function saveToLocal() {
            localFileSync.saveToFile(true);
        }

        function loadFromLocal() {
            localFileSync.loadFromFile();
        }

        function restoreBackup() {
            localFileSync.restoreFromBackup();
        }

        function showSharingHelp() {
            localFileSync.showSharingInstructions();
        }
        
        // 🔧 REPARATUR: Fehlende loadWebsiteList Funktion
        function loadWebsiteList() {
            try {
                const saved = localStorage.getItem('kerberos-websites');
                if (saved) {
                    websites = JSON.parse(saved);
                    console.log(`📄 ${websites.length} Websites geladen`);
                } else {
                    websites = [];
                }

                // Website-Sidebar aktualisieren falls vorhanden
                if (typeof updateWebsiteSidebar === 'function') {
                    updateWebsiteSidebar();
                }

                // Website-Suche aktualisieren falls vorhanden
                if (typeof performWebsiteSearch === 'function') {
                    performWebsiteSearch();
                }

            } catch (e) {
                console.warn('⚠️ Websites konnten nicht geladen werden:', e);
                websites = [];
            }
        }

        function saveWebsiteList() {
            try {
                localStorage.setItem('kerberos-websites', JSON.stringify(websites));
                console.log('💾 Websites gespeichert');
            } catch (e) {
                console.warn('⚠️ Websites konnten nicht gespeichert werden:', e);
            }
        }

        // Globale Instanz erstellen
        const localFileSync = new LocalFileSync();
        
        // Auto-Start
        document.addEventListener('DOMContentLoaded', () => {
            localFileSync.startAutoSave();
        });