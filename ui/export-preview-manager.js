// ==========================================
// EXPORT & PREVIEW MANAGER
// Verwaltet Seiten-Export und Vorschau
// ==========================================

function exportPage() {
    const pageName = document.getElementById('pageNameInput').value || 'Kerberos-Seite';

    let html = `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageName} - Kerberos Compliance</title>
    <!-- Kerberos Website CSS wird automatisch geladen -->
    <!-- Module verwenden Squarespace CSS-Variablen für optimale Integration -->
</head>
<body>
    <!-- Kerberos ${pageName} -->
    <!-- Erstellt mit Kerberos Module Editor (Squarespace-optimiert) -->
    
`;

    modules.forEach((module, index) => {
        html += `    <!-- ${module.name} -->\n`;
        html += '    ' + processModuleHTML(module).replace(/\n/g, '\n    ') + '\n\n';
    });

    html += `    <!-- Ende ${pageName} -->
    <!-- Hinweis: Module nutzen var(--heading-font-font-family) und andere Squarespace CSS-Variablen -->
    <script>
    // 🔧 STARTUP-REPARATUR: Prüfe beim Laden auf doppelte IDs
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            const allModuleElements = document.querySelectorAll('[data-module-id]');
            const domIds = {};
            
            allModuleElements.forEach(el => {
                const id = el.dataset.moduleId;
                if (domIds[id]) {
                    console.warn('⚠️ Doppelte DOM data-module-id gefunden:', id);
                    el.remove(); // Entferne Duplikat
                } else {
                    domIds[id] = true;
                }
            });
            
            console.log('✅ DOM-ID-Bereinigung abgeschlossen');
        }, 100);
    });
    <` + `/script>

</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pageName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-kerberos.html`;
    a.click();
    URL.revokeObjectURL(url);

    showNotification('📄 Squarespace-optimierte Seite exportiert');
}

function showPreview() {
    const modal = document.getElementById('previewModal');
    const content = document.getElementById('previewContent');

    let html = '';
    modules.forEach(module => {
        html += processModuleHTML(module);
    });

    content.innerHTML = html;
    modal.style.display = 'block';
}

function clearAll() {
    if (confirm('Alle Module löschen?')) {
        modules = [];
        selectedModule = null;
        renderCanvas();
        renderPropertyPanel();
        showNotification('🗑️ Alle Module gelöscht');
    }
}

// closePreview als window-Funktion (wie im Original)
window.closePreview = function () {
    document.getElementById('previewModal').style.display = 'none';
};

// Globale Funktionen verfügbar machen
window.exportPage = exportPage;
window.showPreview = showPreview;
window.clearAll = clearAll;

console.log('📤 Export & Preview Manager geladen');