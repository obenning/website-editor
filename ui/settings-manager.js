// ==========================================
// SETTINGS UI MANAGER
// Verwaltet das Settings-Modal
// ==========================================

function showSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.style.display = 'flex';
        loadSpacingSettings();
    }
}

function closeSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) modal.style.display = 'none';
}

function switchSettingsTab(tabName) {
    document.querySelectorAll('#settingsModal .tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('#settingsModal .tab-content').forEach(content => content.classList.remove('active'));

    document.querySelector(`[onclick="switchSettingsTab('${tabName}')"]`).classList.add('active');
    document.getElementById(`settings${tabName.charAt(0).toUpperCase() + tabName.slice(1)}Tab`).classList.add('active');
}

function loadSpacingSettings() {
    document.getElementById('sectionPaddingSelect').value = globalSpacing.sectionPadding;
    document.getElementById('elementSpacingSelect').value = globalSpacing.elementSpacing;
    document.getElementById('textSpacingSelect').value = globalSpacing.textSpacing;
}

function updateSpacing(type, value) {
    globalSpacing[type] = value;
    localStorage.setItem('kerberos-global-spacing', JSON.stringify(globalSpacing));
    showNotification('✅ ' + type + ' aktualisiert');
}

function applySpacingToAll() {
    if (confirm('Neue Abstände auf alle Module anwenden?')) {
        modules.forEach(module => {
            module.html = updateModuleSpacing(module.html);
        });
        renderCanvas();
        showNotification('✅ Abstände auf alle Module angewandt');
    }
}

function updateModuleSpacing(html) {
    html = html.replace(/padding:\s*[\d\.]+rem\s+[\d\.]+/g, `padding: ${globalSpacing.sectionPadding}`);
    html = html.replace(/gap:\s*[\d\.]+rem/g, `gap: ${globalSpacing.elementSpacing}`);
    return html;
}

// Globale Funktionen verfügbar machen
window.showSettingsModal = showSettingsModal;
window.closeSettingsModal = closeSettingsModal;
window.switchSettingsTab = switchSettingsTab;
window.updateSpacing = updateSpacing;
window.applySpacingToAll = applySpacingToAll;