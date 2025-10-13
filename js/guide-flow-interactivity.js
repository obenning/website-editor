// ==========================================
// GUIDE FLOW INTERACTIVITY
// Interaktive Funktionalität für Guide-Flow-Module
// ==========================================


        function enhanceGuideFlowInteractivity() {
            console.log('🎯 Enhancing Guide Flow interactivity in editor...');

            // Alle Guide-Flow-Module im Canvas finden
            const guideFlowModules = document.querySelectorAll('[class*="kerberos-guide-"]');
            console.log('Found', guideFlowModules.length, 'Guide Flow modules in canvas');

            guideFlowModules.forEach((container, index) => {
                // Extrahiere die tatsächliche Modul-ID vom DOM-Element
                const domElement = container.closest('.canvas-module');
                const actualModuleId = domElement ? domElement.dataset.moduleId : null;
                if (!actualModuleId) {
                    console.warn('Kein DOM-Element mit data-module-id gefunden für Guide Flow Container');
                    return;
                }

                console.log('Processing Guide Flow module:', actualModuleId);
                const moduleId = actualModuleId; // Alias für Kompatibilität

                // Elemente finden
                const steps = container.querySelectorAll('.guide-step');
                const dots = container.querySelectorAll('.nav-dot');
                const hotspots = container.querySelectorAll('.hotspot-btn');
                const overlay = container.querySelector('.guide-overlay');
                const overlayTitle = container.querySelector('.overlay-title');
                const overlayText = container.querySelector('.overlay-text');
                const overlayClose = container.querySelector('.overlay-close');
                const overlayPrev = container.querySelector('.overlay-prev');
                const overlayNext = container.querySelector('.overlay-next');
                const progressFill = container.querySelector('.progress-fill');

                console.log(`Module ${actualModuleId} elements:`, {
                    steps: steps.length,
                    dots: dots.length,
                    hotspots: hotspots.length,
                    overlay: !!overlay
                });

                // Daten aus dem aktuellen Modul extrahieren
                const currentModule = modules.find(m => m.id === moduleId);
                if (!currentModule) {
                    console.warn('Module data not found for', moduleId);
                    return;
                }

                const props = currentModule.properties;
                const maxSteps = parseInt(props.stepsActive) || 5;

                // Step-Daten für Editor
                const stepData = [];
                for (let i = 1; i <= maxSteps; i++) {
                    stepData.push({
                        title: props[`step${i}Title`] || `Schritt ${i}`,
                        description: props[`step${i}Description`] || `Beschreibung für Schritt ${i}`,
                        hotspotX: props[`step${i}HotspotX`] || 50,
                        hotspotY: props[`step${i}HotspotY`] || 50
                    });
                }

                let currentStep = 0;
                let overlayVisible = false;
                let autoAdvanceInterval;

                // Funktionen für Editor
                function showStep(stepIndex) {
                    console.log('Editor: Showing step', stepIndex + 1);
                    steps.forEach((step, index) => {
                        step.style.opacity = index === stepIndex ? '1' : '0';
                        step.style.visibility = index === stepIndex ? 'visible' : 'hidden';
                        step.style.zIndex = index === stepIndex ? '2' : '1';
                    });

                    dots.forEach((dot, index) => {
                        dot.style.opacity = index === stepIndex ? '1' : '0.5';
                    });

                    const progress = ((stepIndex + 1) / steps.length) * 100;
                    if (progressFill) progressFill.style.width = progress + '%';

                    currentStep = stepIndex;

                    if (overlayVisible && overlay) {
                        positionOverlay(stepIndex);
                        updateOverlayContent(stepIndex);
                    }
                }

                function positionOverlay(stepIndex) {
                    if (!overlay || !stepData[stepIndex]) return;
                    const stepContainer = steps[stepIndex];
                    if (!stepContainer) return;

                    try {
                        const containerRect = stepContainer.getBoundingClientRect();
                        const hotspotX = stepData[stepIndex].hotspotX;
                        const hotspotY = stepData[stepIndex].hotspotY;

                        const left = (containerRect.width * hotspotX / 100);
                        const top = (containerRect.height * hotspotY / 100);

                        overlay.style.left = Math.max(10, Math.min(left - 150, containerRect.width - 310)) + 'px';
                        overlay.style.top = Math.max(10, top - 200) + 'px';
                    } catch (e) {
                        console.warn('Error positioning overlay in editor:', e);
                    }
                }

                function updateOverlayContent(stepIndex) {
                    if (!stepData[stepIndex]) return;
                    if (overlayTitle) overlayTitle.textContent = stepData[stepIndex].title;
                    if (overlayText) overlayText.textContent = stepData[stepIndex].description;

                    if (overlayPrev) overlayPrev.style.display = stepIndex === 0 ? 'none' : 'block';
                    if (overlayNext) overlayNext.style.display = stepIndex === steps.length - 1 ? 'none' : 'block';
                }

                function showOverlay(stepIndex) {
                    console.log('Editor: Showing overlay for step', stepIndex + 1);
                    if (!overlay) return;
                    overlayVisible = true;
                    stopAutoAdvance();
                    positionOverlay(stepIndex);
                    updateOverlayContent(stepIndex);
                    overlay.classList.add('show');
                }

                function hideOverlay() {
                    console.log('Editor: Hiding overlay');
                    if (!overlay) return;
                    overlayVisible = false;
                    overlay.classList.remove('show');
                    startAutoAdvance();
                }

                function startAutoAdvance() {
                    if (props.autoAdvance === 'true') {
                        const interval = parseInt(props.autoAdvanceInterval) || 4000;
                        autoAdvanceInterval = setInterval(() => {
                            if (!overlayVisible) {
                                const nextStep = (currentStep + 1) % steps.length;
                                showStep(nextStep);
                            }
                        }, interval);
                    }
                }

                function stopAutoAdvance() {
                    if (autoAdvanceInterval) {
                        clearInterval(autoAdvanceInterval);
                        autoAdvanceInterval = null;
                    }
                }

                function goToStep(stepIndex) {
                    if (stepIndex >= 0 && stepIndex < steps.length) {
                        showStep(stepIndex);
                        if (overlayVisible) {
                            positionOverlay(stepIndex);
                            updateOverlayContent(stepIndex);
                        }
                    }
                }

                // Event Listeners für Editor hinzufügen

                // Dots Navigation
                dots.forEach((dot, index) => {
                    // Bestehende Listener entfernen (falls vorhanden)
                    const newDot = dot.cloneNode(true);
                    dot.parentNode.replaceChild(newDot, dot);

                    newDot.addEventListener('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Editor: Dot clicked', index + 1);
                        stopAutoAdvance();
                        showStep(index);
                        if (!overlayVisible) startAutoAdvance();
                    });

                    // Visual feedback
                    newDot.addEventListener('mouseenter', function () {
                        this.style.transform = 'scale(1.2)';
                    });
                    newDot.addEventListener('mouseleave', function () {
                        this.style.transform = 'scale(1)';
                    });
                });

                // Hotspot Clicks
                hotspots.forEach((hotspot, index) => {
                    // Bestehende Listener entfernen
                    const newHotspot = hotspot.cloneNode(true);
                    hotspot.parentNode.replaceChild(newHotspot, hotspot);

                    newHotspot.addEventListener('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Editor: Hotspot clicked', index + 1);
                        const stepIndex = parseInt(newHotspot.getAttribute('data-step')) - 1;
                        if (stepIndex >= 0 && stepIndex < steps.length) {
                            showStep(stepIndex);
                            showOverlay(stepIndex);
                        }
                    });

                    // Visual feedback
                    newHotspot.addEventListener('mouseenter', function () {
                        this.style.transform = 'scale(1.1)';
                    });
                    newHotspot.addEventListener('mouseleave', function () {
                        this.style.transform = 'scale(1)';
                    });
                });

                // Overlay Controls
                if (overlayClose) {
                    const newClose = overlayClose.cloneNode(true);
                    overlayClose.parentNode.replaceChild(newClose, overlayClose);

                    newClose.addEventListener('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Editor: Overlay close clicked');
                        hideOverlay();
                    });
                }

                if (overlayPrev) {
                    const newPrev = overlayPrev.cloneNode(true);
                    overlayPrev.parentNode.replaceChild(newPrev, overlayPrev);

                    newPrev.addEventListener('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Editor: Overlay prev clicked');
                        if (currentStep > 0) goToStep(currentStep - 1);
                    });
                }

                if (overlayNext) {
                    const newNext = overlayNext.cloneNode(true);
                    overlayNext.parentNode.replaceChild(newNext, overlayNext);

                    newNext.addEventListener('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Editor: Overlay next clicked');
                        if (currentStep < steps.length - 1) goToStep(currentStep + 1);
                    });
                }

                // Initialisierung
                showStep(0);
                startAutoAdvance();

                console.log('✅ Guide Flow editor interactivity enhanced for', moduleId);
            });
        }

