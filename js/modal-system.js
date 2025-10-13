        // Icon Modal Functions
        function showIconPicker(property) {
            currentProperty = property;
            const modal = document.getElementById('iconModal');
            const picker = document.getElementById('iconPicker');

            picker.innerHTML = '';
            FONT_AWESOME_ICONS.forEach(icon => {
                const iconDiv = document.createElement('div');
                iconDiv.className = 'icon-option';
                iconDiv.innerHTML = `<span style="font-family: 'Font Awesome 5 Pro';">${icon.unicode}</span>`;
                iconDiv.title = icon.name;
                iconDiv.onclick = () => selectIcon(icon.unicode);
                picker.appendChild(iconDiv);
            });

            modal.style.display = 'block';
        }

        function selectIcon(iconUnicode) {
            if (selectedModule && currentProperty) {
                selectedModule.properties[currentProperty] = iconUnicode;

                // Live-Update im Canvas
                updateProperty(currentProperty, iconUnicode);

                renderPropertyPanel();
                closeIconModal();
                showNotification('✅ Icon aktualisiert: ' + iconUnicode);
            }
        }

        function closeIconModal() {
            document.getElementById('iconModal').style.display = 'none';
        }

        // Image Modal Functions
        function showImagePicker(property) {
            currentProperty = property;
            const modal = document.getElementById('imageModal');
            loadStockImages();
            modal.style.display = 'block';
        }

        function loadStockImages() {
            const container = document.getElementById('stockImages');
            container.innerHTML = '';

            STOCK_IMAGES.forEach(url => {
                const img = document.createElement('img');
                img.src = url;
                img.style.cssText = 'width: 100%; height: 80px; object-fit: cover; border-radius: 4px; cursor: pointer; transition: transform 0.2s;';
                img.onmouseover = () => img.style.transform = 'scale(1.05)';
                img.onmouseout = () => img.style.transform = 'scale(1)';
                img.onclick = () => selectImage(url);
                container.appendChild(img);
            });
        }

        function selectImage(imageUrl) {
            if (selectedModule && currentProperty) {
                selectedModule.properties[currentProperty] = imageUrl;
                renderPropertyPanel();
                closeImageModal();
                showNotification('✅ Bild aktualisiert');
            }
        }
