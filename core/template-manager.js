// Template Manager - Verwaltung der Modul-Bibliothek
class TemplateManager {
    constructor() {
        this.customTemplatesKey = 'kerberos-custom-templates';
        this.deletedTemplatesKey = 'kerberos-deleted-templates';
        this.protectedModules = [
            'kerberos-hero',
            'kerberos-hero-advanced',
            'kerberos-stats',
            'kerberos-team-gallery'
        ];
    }

    // Template validieren
    validateTemplate(template) {
        if (!template || typeof template !== 'object') return false;
        if (!template.id || typeof template.id !== 'string') return false;
        if (!template.name) template.name = 'Unbenanntes Modul';
        if (!template.category) template.category = 'Custom';
        if (!template.html) template.html = '<div>Standard HTML</div>';
        if (!template.properties) template.properties = {};
        return true;
    }

    // Custom Templates laden
    loadCustomTemplates() {
        try {
            const deletedList = this.getDeletedTemplatesBlacklist();
            const saved = localStorage.getItem(this.customTemplatesKey);
            
            if (saved) {
                const customTemplates = JSON.parse(saved);
                customTemplates.forEach(template => {
                    if (!template || !template.id) {
                        console.warn('Überspringe ungültiges Template:', template);
                        return;
                    }

                    // Nur hinzufügen wenn nicht in Blacklist und nicht bereits vorhanden
                    if (!deletedList.includes(template.id) && 
                        !MODULE_TEMPLATES.find(t => t.id === template.id)) {
                        
                        // Validierung
                        if (!template.name) template.name = 'Unbenanntes Template';
                        if (!template.category) template.category = 'Custom';
                        if (!template.html) template.html = '<div>Leeres Template</div>';
                        if (!template.properties) template.properties = {};

                        MODULE_TEMPLATES.push(template);
                    }
                });
            }
        } catch (e) {
            console.error('Fehler beim Laden der Custom Templates:', e);
            localStorage.removeItem(this.customTemplatesKey);
        }
    }

    // Custom Templates speichern
    saveCustomTemplates() {
        const customTemplates = MODULE_TEMPLATES.filter(t => 
            t.customized || t.category === 'Custom'
        );
        localStorage.setItem(this.customTemplatesKey, JSON.stringify(customTemplates));
    }

    // Template duplizieren
    duplicateTemplate(templateId) {
        const template = MODULE_TEMPLATES.find(t => t.id === templateId);
        if (!template) return null;

        const newTemplate = {
            ...template,
            id: `${template.id}-copy-${Date.now()}`,
            name: `${template.name} (Kopie)`,
            category: 'Custom',
            customized: true
        };

        MODULE_TEMPLATES.push(newTemplate);
        this.saveCustomTemplates();
        
        window.eventBus.emit('template:duplicated', { template: newTemplate });
        
        return newTemplate;
    }

    // Template löschen
    deleteTemplate(templateId) {
        const template = MODULE_TEMPLATES.find(t => t.id === templateId);
        if (!template) return false;

        // Geschützte Module prüfen
        if (this.protectedModules.includes(templateId)) {
            if (typeof showNotification === 'function') {
                showNotification('❌ Dieses Basis-Modul kann nicht gelöscht werden');
            }
            return false;
        }

        // Template entfernen
        const index = MODULE_TEMPLATES.findIndex(t => t.id === templateId);
        if (index > -1) {
            MODULE_TEMPLATES.splice(index, 1);
        }

        // Zur Blacklist hinzufügen
        this.addToDeletedTemplatesBlacklist(templateId);
        this.saveCustomTemplates();
        
        window.eventBus.emit('template:deleted', { templateId, name: template.name });
        
        return true;
    }

    // Template wiederherstellen
    restoreDeletedTemplate(templateId) {
        this.removeFromDeletedTemplatesBlacklist(templateId);
        this.loadCustomTemplates();
        
        window.eventBus.emit('template:restored', { templateId });
        
        if (typeof loadModuleLibrary === 'function') {
            loadModuleLibrary();
        }
    }

    // Blacklist Management
    getDeletedTemplatesBlacklist() {
        try {
            const saved = localStorage.getItem(this.deletedTemplatesKey);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Fehler beim Laden der Blacklist:', e);
            return [];
        }
    }

    addToDeletedTemplatesBlacklist(templateId) {
        try {
            const deletedList = this.getDeletedTemplatesBlacklist();
            if (!deletedList.includes(templateId)) {
                deletedList.push(templateId);
                localStorage.setItem(this.deletedTemplatesKey, JSON.stringify(deletedList));
            }
        } catch (e) {
            console.error('Fehler beim Speichern der Blacklist:', e);
        }
    }

    removeFromDeletedTemplatesBlacklist(templateId) {
        try {
            const deletedList = this.getDeletedTemplatesBlacklist();
            const index = deletedList.indexOf(templateId);
            if (index > -1) {
                deletedList.splice(index, 1);
                localStorage.setItem(this.deletedTemplatesKey, JSON.stringify(deletedList));
            }
        } catch (e) {
            console.error('Fehler beim Aktualisieren der Blacklist:', e);
        }
    }

    // Template-Bibliothek reparieren
    repairTemplateLibrary() {
        let repaired = 0;
        MODULE_TEMPLATES.forEach(template => {
            if (!template.id.startsWith('kerberos-hero') ||
                template.id.includes('extended') ||
                template.id.includes('comparison') ||
                template.id.includes('pricing')) {
                if (!template.customized) {
                    template.customized = true;
                    repaired++;
                }
            }
        });

        if (repaired > 0) {
            this.saveCustomTemplates();
        }
        
        return repaired;
    }
}

// Globale Instanz
window.templateManager = new TemplateManager();