        function showSavePageDialog() {
            const modal = document.getElementById('savePageModal');
            const pageName = document.getElementById('pageNameInput').value || 'Neue Seite';
            document.getElementById('savePageName').value = pageName;
            modal.style.display = 'block';
        }

        function closeSavePageModal() {
            document.getElementById('savePageModal').style.display = 'none';
        }

        // Seite laden
        function showLoadPageDialog() {
            loadSavedPages();
            const modal = document.getElementById('loadPageModal');
            const container = document.getElementById('savedPagesList');

            container.innerHTML = '';

            if (Object.keys(savedPages).length === 0) {
                container.innerHTML = '<p style="text-align: center; color: #6c757d; padding: 2rem;">Keine gespeicherten Seiten gefunden</p>';
            } else {
                Object.entries(savedPages).forEach(([name, data]) => {
                    const pageDiv = document.createElement('div');
                    pageDiv.style.cssText = 'border: 1px solid var(--kerberos-border); border-radius: 6px; padding: 1rem; margin-bottom: 1rem; cursor: pointer; transition: all 0.2s;';
                    pageDiv.innerHTML = `
                        <h4 style="margin: 0 0 0.5rem 0; color: var(--kerberos-primary);">${name}</h4>
                        <p style="margin: 0 0 0.5rem 0; font-size: 0.9rem; color: #6c757d;">${data.description || 'Keine Beschreibung'}</p>
                        <small style="color: #999;">Erstellt: ${new Date(data.created).toLocaleString('de-DE')} | ${data.modules.length} Module</small>
                        <div style="margin-top: 0.5rem; display: flex; gap: 0.5rem;">
                            <button class="btn btn-primary" onclick="loadPage('${name}')" style="flex: 1;">Laden</button>
                            <button class="btn btn-warning" onclick="exportSavedPage('${name}')">Export</button>
                            <button class="btn btn-secondary" onclick="deleteSavedPage('${name}')">🗑️</button>
                        </div>
                    `;
                    container.appendChild(pageDiv);
                });
            }

            modal.style.display = 'block';
        }

        function closeLoadPageModal() {
            document.getElementById('loadPageModal').style.display = 'none';
        }
        
        function saveCurrentPage() {
            const pageName = document.getElementById('savePageName').value.trim();
            const description = document.getElementById('savePageDescription').value.trim();

            if (!pageName) {
                showNotification('❌ Bitte Seitenname eingeben');
                return;
            }

            const pageData = {
                name: pageName,
                description: description,
                modules: JSON.parse(JSON.stringify(modules)),
                created: new Date().toISOString(),
                spacing: { ...globalSpacing }
            };

            savedPages[pageName] = pageData;
            localStorage.setItem('kerberos-saved-pages', JSON.stringify(savedPages));

            closeSavePageModal();
            showNotification('✅ Seite "' + pageName + '" gespeichert');
        }

        function loadSavedPages() {
            try {
                const saved = localStorage.getItem('kerberos-saved-pages');
                if (saved) {
                    savedPages = JSON.parse(saved);
                }
            } catch (e) {
                console.error('Fehler beim Laden der Seiten:', e);
                savedPages = {};
            }
        }
        
        function loadPage(pageName) {
            const pageData = savedPages[pageName];
            if (!pageData) return;

            modules = JSON.parse(JSON.stringify(pageData.modules));
            if (pageData.spacing) {
                globalSpacing = { ...pageData.spacing };
            }

            document.getElementById('pageNameInput').value = pageName;
            renderCanvas();
            selectedModule = null;
            renderPropertyPanel();
            closeLoadPageModal();

            showNotification('✅ Seite "' + pageName + '" geladen');
        }
        
        function deleteSavedPage(pageName) {
            if (confirm('Seite "' + pageName + '" wirklich löschen?')) {
                delete savedPages[pageName];
                localStorage.setItem('kerberos-saved-pages', JSON.stringify(savedPages));
                showLoadPageDialog(); // Refresh
                showNotification('🗑️ Seite gelöscht');
            }
        }   
        
        function exportSavedPage(pageName) {
            const pageData = savedPages[pageName];
            if (!pageData) return;

            const jsonData = JSON.stringify(pageData, null, 2);
            downloadJSON(jsonData, `kerberos-page-${pageName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.json`);
        }
        
        let savedPages = {};