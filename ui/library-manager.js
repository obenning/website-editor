// ==========================================
// MODULE LIBRARY UI MANAGER
// Verwaltet die Module-Bibliothek UI
// ==========================================

function showModuleLibraryManager() {
    document.getElementById('moduleLibraryModal').style.display = 'block';
    loadModuleLibraryList();
}

function closeModuleLibraryModal() {
    const modal = document.getElementById('moduleLibraryModal');
    if (modal) modal.style.display = 'none';
}

function loadModuleLibrary() {
    const library = document.getElementById('moduleLibrary');
    library.innerHTML = '';

    loadCustomTemplates();

    const categories = [...new Set(MODULE_TEMPLATES.map(t => t.category))];

    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `<h4 class="category-title">${category}</h4>`;
        library.appendChild(categoryDiv);

        MODULE_TEMPLATES.filter(t => t.category === category).forEach(template => {
            const moduleDiv = document.createElement('div');
            moduleDiv.className = 'module-template';
            moduleDiv.draggable = true;
            moduleDiv.innerHTML = `
                <div style="font-weight: 500; margin-bottom: 0.25rem;">${template.name}</div>
                <small style="color: #666;">${template.description || ''}</small>
            `;

            moduleDiv.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('templateId', template.id);
            });

            library.appendChild(moduleDiv);
        });
    });
}

function loadModuleLibraryList(filterCategory = 'all', searchTerm = '') {
    const container = document.getElementById('moduleLibraryList');
    container.innerHTML = '';

    const filteredModules = MODULE_TEMPLATES.filter(template => {
        const matchesCategory = filterCategory === 'all' || template.category === filterCategory;
        const matchesSearch = searchTerm === '' ||
            template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filteredModules.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #6c757d; padding: 2rem;">Keine Module gefunden</p>';
        return;
    }

    filteredModules.forEach(template => {
        const moduleDiv = document.createElement('div');
        moduleDiv.style.cssText = 'border: 1px solid var(--kerberos-border); border-radius: 6px; padding: 1rem; margin-bottom: 1rem; background: white;';

        const protectedModules = [
            'kerberos-hero',
            'kerberos-hero-advanced',
            'kerberos-stats',
            'kerberos-team-gallery'
        ];

        const isDeletable = !protectedModules.includes(template.id);
        const isCustom = !template.id.startsWith('kerberos-') || template.customized;

        moduleDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;">
                <div style="flex: 1;">
                    <h5 style="margin: 0 0 0.5rem 0; color: var(--kerberos-primary); font-size: 1rem;">${template.name}</h5>
                    <p style="margin: 0 0 0.5rem 0; font-size: 0.85rem; color: #6c757d;">${template.description}</p>
                    <div style="display: flex; gap: 1rem; font-size: 0.8rem; color: #999;">
                        <span>📂 ${template.category}</span>
                        <span>🆔 ${template.id}</span>
                        ${isCustom ? '<span style="background: #28a745; color: white; padding: 0.1rem 0.4rem; border-radius: 10px;">CUSTOM</span>' : '<span style="background: #063AA8; color: white; padding: 0.1rem 0.4rem; border-radius: 10px;">STANDARD</span>'}
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.5rem; min-width: 120px;">
                    <button class="btn btn-secondary" onclick="editModuleTemplate('${template.id}')" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">✏️ Bearbeiten</button>
                    <button class="btn btn-warning" onclick="exportModuleTemplate('${template.id}')" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">📤 Export</button>
                    <button class="btn btn-success" onclick="duplicateModuleTemplate('${template.id}')" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">📋 Kopie</button>
                    ${isDeletable ? `<button class="btn btn-delete" onclick="deleteModuleTemplate('${template.id}')" style="font-size: 0.8rem; padding: 0.4rem 0.8rem; background: #dc3545; color: white;">🗑️ Löschen</button>` : '<div style="padding: 0.4rem; text-align: center; font-size: 0.7rem; color: #999;">Standard-Modul</div>'}
                </div>
            </div>
        `;

        container.appendChild(moduleDiv);
    });
}

function deleteModuleTemplate(templateId) {
    const template = MODULE_TEMPLATES.find(t => t.id === templateId);
    if (!template) return;
    
    if (confirm(`Modul-Template "${template.name}" wirklich aus der Bibliothek löschen?`)) {
        if (window.templateManager.deleteTemplate(templateId)) {
            loadModuleLibrary();
            loadModuleLibraryList();
            showNotification(`🗑️ Template "${template.name}" gelöscht`);
        }
    }
}

function duplicateModuleTemplate(templateId) {
    const newTemplate = window.templateManager.duplicateTemplate(templateId);
    if (newTemplate) {
        loadModuleLibrary();
        loadModuleLibraryList();
        showNotification(`📋 Template "${newTemplate.name}" erstellt`);
    }
}

function editModuleTemplate(templateId) {
    const template = MODULE_TEMPLATES.find(t => t.id === templateId);
    if (!template) return;

    document.getElementById('editModuleName').value = template.name;
    document.getElementById('editModuleCategory').value = template.category;
    document.getElementById('editModuleDescription').value = template.description;

    document.getElementById('moduleEditModal').style.display = 'block';
    document.getElementById('moduleEditModal').dataset.templateId = templateId;
    document.getElementById('moduleEditModal').dataset.isTemplate = 'true';
}

function setupLibraryFilters() {
    document.querySelectorAll('.library-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;

            document.querySelectorAll('.library-filter-btn').forEach(b => {
                const isActive = b.dataset.category === category;
                b.style.background = isActive ? 'var(--kerberos-primary)' : 'transparent';
                b.style.color = isActive ? 'white' : 'var(--kerberos-primary)';
            });

            const searchTerm = document.getElementById('librarySearchInput').value;
            loadModuleLibraryList(category, searchTerm);
        });
    });

    document.getElementById('librarySearchInput')?.addEventListener('input', (e) => {
        const activeFilter = document.querySelector('.library-filter-btn[style*="var(--kerberos-primary)"]')?.dataset.category || 'all';
        loadModuleLibraryList(activeFilter, e.target.value);
    });
}

// Globale Funktionen verfügbar machen
window.showModuleLibraryManager = showModuleLibraryManager;
window.closeModuleLibraryModal = closeModuleLibraryModal;
window.loadModuleLibrary = loadModuleLibrary;
window.loadModuleLibraryList = loadModuleLibraryList;
window.deleteModuleTemplate = deleteModuleTemplate;
window.duplicateModuleTemplate = duplicateModuleTemplate;
window.editModuleTemplate = editModuleTemplate;
window.setupLibraryFilters = setupLibraryFilters;