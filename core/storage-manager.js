// Storage Manager - Projekt-Speicherung & -Laden
class StorageManager {
    constructor() {
        this.storageKey = 'kerberos-websites';
    }

    // Alle gespeicherten Projekte abrufen
    getWebsites() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : [];
    }

    // Seite speichern
    savePage(name = null) {
        if (!name) {
            name = prompt('Name der Seite:');
        }
        if (!name) return;

        const websites = this.getWebsites();
        const existing = websites.findIndex(w => w.name === name);

        const pageData = {
            name: name,
            modules: window.modules || [],
            timestamp: new Date().toISOString()
        };

        if (existing > -1) {
            if (confirm(`"${name}" existiert bereits. Überschreiben?`)) {
                websites[existing] = pageData;
            } else {
                return;
            }
        } else {
            websites.push(pageData);
        }

        localStorage.setItem(this.storageKey, JSON.stringify(websites));
        window.eventBus.emit('project:saved', { name, modules: pageData.modules });
        
        if (typeof showNotification === 'function') {
            showNotification(`💾 "${name}" gespeichert`);
        }
    }

    // Seite laden
    loadPage() {
        const websites = this.getWebsites();
        
        if (websites.length === 0) {
            if (typeof showNotification === 'function') {
                showNotification('⚠️ Keine gespeicherten Seiten vorhanden');
            }
            return;
        }

        const modal = this.createLoadModal(websites);
        document.body.appendChild(modal);
    }

    // Load-Modal erstellen
    createLoadModal(websites) {
        const modal = document.createElement('div');
        modal.id = 'loadPageModal';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.8); z-index: 2000;
            display: flex; align-items: center; justify-content: center;
        `;

        const websiteList = websites.map((website, index) => `
            <div style="border: 1px solid #ddd; border-radius: 6px; padding: 1rem; margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong style="color: var(--kerberos-primary);">${website.name}</strong>
                    <br><small style="color: #999;">${website.modules?.length || 0} Module • ${new Date(website.timestamp).toLocaleDateString('de-DE')}</small>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button onclick="storageManager.loadWebsite(${index})" class="btn btn-primary">Laden</button>
                    <button onclick="storageManager.deleteWebsite(${index})" class="btn btn-danger">Löschen</button>
                </div>
            </div>
        `).join('');

        modal.innerHTML = `
            <div style="background: white; padding: 2rem; border-radius: 8px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto;">
                <h3 style="margin: 0 0 1.5rem 0; color: var(--kerberos-primary);">📂 Gespeicherte Seiten</h3>
                ${websiteList}
                <div style="text-align: right; margin-top: 1rem;">
                    <button onclick="storageManager.closeLoadModal()" class="btn btn-secondary">Schließen</button>
                </div>
            </div>
        `;

        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeLoadModal();
        });

        return modal;
    }

    // Website laden
    loadWebsite(index) {
        const websites = this.getWebsites();
        const website = websites[index];
        
        if (!website) return;

        window.modules = website.modules || [];
        
        if (typeof renderCanvas === 'function') {
            renderCanvas();
        }
        
        window.eventBus.emit('project:loaded', { 
            name: website.name, 
            modules: website.modules 
        });
        
        this.closeLoadModal();
        
        if (typeof showNotification === 'function') {
            showNotification(`✅ "${website.name}" geladen`);
        }
    }

    // Website löschen
    deleteWebsite(index) {
        const websites = this.getWebsites();
        const website = websites[index];
        
        if (!confirm(`"${website.name}" wirklich löschen?`)) return;
        
        websites.splice(index, 1);
        localStorage.setItem(this.storageKey, JSON.stringify(websites));
        
        this.closeLoadModal();
        this.loadPage(); // Modal neu öffnen
        
        if (typeof showNotification === 'function') {
            showNotification(`🗑️ "${website.name}" gelöscht`);
        }
    }

    // Modal schließen
    closeLoadModal() {
        const modal = document.getElementById('loadPageModal');
        if (modal) modal.remove();
    }
}

// Globale Instanz
window.storageManager = new StorageManager();