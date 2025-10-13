        function applyBulkColorChange() {
            const oldColor = document.getElementById('oldColor').value.trim();
            const newColor = document.getElementById('newColor').value.trim();

            if (!oldColor || !newColor || !selectedModule) return;

            let changedCount = 0;
            Object.keys(selectedModule.properties).forEach(key => {
                if (selectedModule.properties[key] === oldColor) {
                    selectedModule.properties[key] = newColor;
                    changedCount++;
                }
            });

            if (changedCount > 0) {
                renderPropertyPanel();
                applyChanges();
                showNotification(`✅ ${changedCount} Farben von ${oldColor} zu ${newColor} geändert`);
                closeBulkEditModal();
            }
        }

        function applyBulkTextChange() {
            const oldText = document.getElementById('oldText').value.trim();
            const newText = document.getElementById('newText').value.trim();

            if (!oldText || !newText || !selectedModule) return;

            let changedCount = 0;
            Object.keys(selectedModule.properties).forEach(key => {
                if (selectedModule.properties[key].includes && selectedModule.properties[key].includes(oldText)) {
                    selectedModule.properties[key] = selectedModule.properties[key].replace(new RegExp(oldText, 'g'), newText);
                    changedCount++;
                }
            });

            if (changedCount > 0) {
                renderPropertyPanel();
                applyChanges();
                showNotification(`✅ ${changedCount} Texte von "${oldText}" zu "${newText}" geändert`);
                closeBulkEditModal();
            }
        }

        function applyPlanTemplate(planNumber, template) {
            const templates = {
                basic: { name: 'Starter', price: '€299', description: 'Ideal für kleine Unternehmen mit grundlegenden Compliance-Anforderungen', color: '#063AA8' },
                premium: { name: 'Professional', price: '€599', description: 'Umfassende Lösung für mittelständische Unternehmen', color: '#009CE6' },
                enterprise: { name: 'Enterprise', price: '€1.299', description: 'Maßgeschneiderte Lösung für Großunternehmen', color: '#B265E9' }
            };

            const config = templates[template];
            if (!config || !selectedModule) return;

            // Bulk-Update aller Plan-Properties
            selectedModule.properties[`plan${planNumber}Name`] = config.name;
            selectedModule.properties[`plan${planNumber}Price`] = config.price;
            selectedModule.properties[`plan${planNumber}Description`] = config.description;
            selectedModule.properties[`plan${planNumber}Color`] = config.color;
            selectedModule.properties[`plan${planNumber}PriceColor`] = config.color;
            selectedModule.properties[`plan${planNumber}ButtonText`] = `${config.name} wählen`;

            renderPropertyPanel();
            applyChanges();
            showNotification(`✅ ${config.name}-Template auf Plan ${planNumber} angewendet`);
        }

        function copyFromPlan(targetPlan) {
            if (!selectedModule) return;

            const otherPlans = ['1', '2', '3'].filter(p => p !== targetPlan);
            const options = otherPlans.map(p => {
                const name = selectedModule.properties[`plan${p}Name`] || `Plan ${p}`;
                return `<option value="${p}">${name}</option>`;
            }).join('');

            const sourcePlan = prompt(`Von welchem Plan kopieren?\n${otherPlans.map(p => `${p}: ${selectedModule.properties[`plan${p}Name`] || `Plan ${p}`}`).join('\n')}\n\nPlan-Nummer eingeben:`);

            if (sourcePlan && otherPlans.includes(sourcePlan)) {
                // Kopiere alle Properties vom Source-Plan
                Object.keys(selectedModule.properties).forEach(key => {
                    if (key.includes(`plan${sourcePlan}`)) {
                        const targetKey = key.replace(`plan${sourcePlan}`, `plan${targetPlan}`);
                        selectedModule.properties[targetKey] = selectedModule.properties[key];
                    }
                });

                renderPropertyPanel();
                applyChanges();
                showNotification(`✅ Plan ${sourcePlan} nach Plan ${targetPlan} kopiert`);
            }
        }

        function setAllImagesObjectPosition(position) {
            if (!selectedModule) return;
            
            const keys = Object.keys(selectedModule.properties);
            keys.forEach(key => {
                if (key.includes('Url') || key.includes('Image')) {
                    const baseKey = key.replace('Url', '').replace('Image', '');
                    updateImageProperty(baseKey, 'objectPosition', position);
                }
            });
            
            showNotification(`📍 Alle Bilder auf ${position} gesetzt`);
        }

        function fixWhiteStripes(property) {
            updateImageProperty(property.replace('Url', ''), 'customCSS', 'margin: 0; display: block; line-height: 0;');
            showNotification('🔧 Weiße Striche sollten entfernt sein');
        }

        function resetImageCSS(property) {
            const baseKey = property.replace('Url', '');
            updateImageProperty(baseKey, 'objectFit', 'cover');
            updateImageProperty(baseKey, 'objectPosition', 'center');
            updateImageProperty(baseKey, 'height', 'auto');
            updateImageProperty(baseKey, 'customCSS', '');
            showNotification('🔄 Bild-CSS zurückgesetzt');
        }