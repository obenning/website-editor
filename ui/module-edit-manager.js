// ==========================================
// MODULE EDIT MANAGER
// Verwaltet Module-Info Bearbeitung
// ==========================================

function editModuleInfo(moduleId) {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return;

    const template = MODULE_TEMPLATES.find(t => t.id === module.templateId);

    document.getElementById('editModuleName').value = module.name;
    document.getElementById('editModuleCategory').value = module.category || template?.category || 'Custom';
    document.getElementById('editModuleDescription').value = module.description || template?.description || '';

    document.getElementById('moduleEditModal').style.display = 'block';
    document.getElementById('moduleEditModal').dataset.moduleId = moduleId;
}

function closeModuleEditModal() {
    document.getElementById('moduleEditModal').style.display = 'none';
}

function saveModuleInfo() {
    const modal = document.getElementById('moduleEditModal');
    const moduleId = modal.dataset.moduleId;
    const isTemplate = modal.dataset.isTemplate === 'true';

    if (isTemplate) {
        const template = MODULE_TEMPLATES.find(t => t.id === moduleId);
        if (template) {
            template.name = document.getElementById('editModuleName').value;
            template.category = document.getElementById('editModuleCategory').value;
            template.description = document.getElementById('editModuleDescription').value;
            template.customized = true;

            loadModuleLibrary();
            loadModuleLibraryList();
            saveCustomTemplates();
            showNotification('✅ Template aktualisiert');
        }
    } else {
        const module = modules.find(m => m.id === moduleId);
        if (module) {
            module.name = document.getElementById('editModuleName').value;
            module.category = document.getElementById('editModuleCategory').value;
            module.description = document.getElementById('editModuleDescription').value;

            renderCanvas();
            showNotification('✅ Modul-Info aktualisiert');
        }
    }

    closeModuleEditModal();
}

function showCreateModuleDialog() {
    const modal = document.createElement('div');
    const modalContainerCss = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 2000; display: flex; align-items: center; justify-content: center';
    modal.style.cssText = modalContainerCss;

    let modalTemplate = '<div data-style="MODAL_CONTAINER_STYLES">MODAL_CONTENT</div>';

    let modalContent = '<h3 data-style="MODAL_TITLE_STYLES">Neues Modul erstellen</h3>' +
        '<p data-style="MODAL_TEXT_STYLES">Diese Funktion ist in der Vollversion verfügbar. Erstellen Sie eigene Module mit benutzerdefinierten HTML-Templates.</p>' +
        '<div data-style="MODAL_INPUT_GROUP_STYLES">' +
        '<label data-style="MODAL_LABEL_STYLES">Modul-Name</label>' +
        '<input type="text" id="newModuleName" placeholder="z.B. Custom Hero" data-style="MODAL_INPUT_STYLES">' +
        '</div>' +
        '<div data-style="MODAL_BUTTON_GROUP_STYLES">' +
        '<button onclick="closeCreateModuleDialog()" data-style="CANCEL_BUTTON_STYLES">Abbrechen</button>' +
        '<button onclick="createCustomModule()" data-style="CREATE_BUTTON_STYLES">Erstellen</button>' +
        '</div>';

    const modalContainerStyles = 'background: white; padding: 2rem; border-radius: 8px; max-width: 500px; width: 90%;';
    const modalTitleStyles = 'margin: 0 0 1rem 0; color: var(--kerberos-primary);';
    const modalTextStyles = 'color: #6c757d; margin-bottom: 1.5rem;';
    const modalInputGroupStyles = 'margin-bottom: 1.5rem;';
    const modalLabelStyles = 'display: block; margin-bottom: 0.5rem; font-weight: 500;';
    const modalInputStyles = 'width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;';
    const modalButtonGroupStyles = 'display: flex; gap: 0.5rem; justify-content: flex-end;';
    const cancelButtonStyles = 'padding: 0.5rem 1rem; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer;';
    const createButtonStyles = 'padding: 0.5rem 1rem; border: none; background: var(--kerberos-primary); color: white; border-radius: 4px; cursor: pointer;';

    modalTemplate = modalTemplate.replace('MODAL_CONTAINER_STYLES', modalContainerStyles);
    modalContent = modalContent
        .replace('MODAL_TITLE_STYLES', modalTitleStyles)
        .replace('MODAL_TEXT_STYLES', modalTextStyles)
        .replace('MODAL_INPUT_GROUP_STYLES', modalInputGroupStyles)
        .replace('MODAL_LABEL_STYLES', modalLabelStyles)
        .replace('MODAL_INPUT_STYLES', modalInputStyles)
        .replace('MODAL_BUTTON_GROUP_STYLES', modalButtonGroupStyles)
        .replace('CANCEL_BUTTON_STYLES', cancelButtonStyles)
        .replace('CREATE_BUTTON_STYLES', createButtonStyles);

    modalTemplate = modalTemplate.replace('MODAL_CONTENT', modalContent);
    modal.innerHTML = modalTemplate;
    modal.id = 'createModuleModal';
    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeCreateModuleDialog();
        }
    });
}

function closeCreateModuleDialog() {
    const modal = document.getElementById('createModuleModal');
    if (modal) modal.remove();
}

function createCustomModule() {
    const name = document.getElementById('newModuleName').value.trim();
    if (!name) {
        showNotification('❌ Bitte einen Namen eingeben');
        return;
    }

    const customModule = {
        id: 'custom-' + Date.now(),
        name: name,
        category: 'Custom',
        description: 'Benutzerdefiniertes Modul',
        html: '<div style="padding: 2rem; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 6px;"><h2>' + name + '</h2><p>Benutzerdefiniertes Modul - Vollversion erforderlich</p></div>',
        properties: {}
    };

    MODULE_TEMPLATES.push(customModule);
    saveCustomTemplates();
    loadModuleLibrary();
    closeCreateModuleDialog();
    showNotification('✅ Custom-Modul "' + name + '" erstellt (Demo-Version)');
}

// Globale Funktionen verfügbar machen
window.editModuleInfo = editModuleInfo;
window.closeModuleEditModal = closeModuleEditModal;
window.saveModuleInfo = saveModuleInfo;
window.showCreateModuleDialog = showCreateModuleDialog;
window.closeCreateModuleDialog = closeCreateModuleDialog;
window.createCustomModule = createCustomModule;