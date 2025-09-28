// Toggle popup visibility when gear icon is clicked
        const accessibilityGear = document.getElementById('accessibilityGear');
        const accessibilityMenu = document.getElementById('accessibilityMenu');

        accessibilityGear.addEventListener('click', function (e) {
            e.stopPropagation();
            accessibilityMenu.style.display = accessibilityMenu.style.display === 'block' ? 'none' : 'block';
            accessibilityLanguageDropdown.classList.remove('show');
        });

        // Close popup when clicking anywhere outside
        document.addEventListener('click', function (e) {
            if (!accessibilityMenu.contains(e.target) && e.target !== accessibilityGear) {
                accessibilityMenu.style.display = 'none';
                accessibilityLanguageDropdown.classList.remove('show');
            }
        });

        // Initialize voiceEnabled from localStorage (default to false if not set)
        let voiceEnabled = localStorage.getItem("voiceEnabled") === "true";

        // Speak feedback function
        const speakStatus = (msg) => {
            if (!voiceEnabled) return; // Don't speak if voice is disabled
            const utterance = new SpeechSynthesisUtterance(msg);
            speechSynthesis.cancel();
            speechSynthesis.speak(utterance);
        };

        // Toggle function for voice control
        function toggleVoiceControl() {
            voiceEnabled = !voiceEnabled;
            localStorage.setItem("voiceEnabled", voiceEnabled);

            // Update toggle state
            const voiceToggle = document.querySelector('#accessibilitySpeakItem input[type="checkbox"]');
            if (voiceToggle) {
                voiceToggle.checked = voiceEnabled;
            }

            speakStatus(voiceEnabled ? "Hover to speak enabled" : "Hover to speak disabled");
        }

        // Toggle with Alt + S
        document.addEventListener("keydown", (e) => {
            if (e.altKey && e.key.toLowerCase() === "s") {
                toggleVoiceControl();
            }
        });

        // Toggle functionality for all switches including voice control
        document.querySelectorAll('.accessibility-toggle input').forEach(switchInput => {
            // Set initial state for voice control toggle
            if (switchInput.closest('#accessibilitySpeakItem')) {
                switchInput.checked = voiceEnabled;
            }

            switchInput.addEventListener('change', function () {
                const feature = this.closest('.accessibility-item').textContent.trim();
                console.log(`${feature} is now ${this.checked ? 'enabled' : 'disabled'}`);

                if (feature.includes('Color Blind') && this.checked) {
                    document.body.classList.add('accessibility-color-blind-mode');
                } else if (feature.includes('Color Blind') && !this.checked) {
                    document.body.classList.remove('accessibility-color-blind-mode');
                }

                // Handle voice control toggle
                if (feature.includes('Hover to Speak')) {
                    toggleVoiceControl();
                }
            });
        });

        // Enhanced speak function with voice selection
        let speakTimeout;
        const speak = (text) => {
            if (!voiceEnabled || !text.trim()) return;

            clearTimeout(speakTimeout);
            speakTimeout = setTimeout(() => {
                const speakWithVoice = () => {
                    const voices = speechSynthesis.getVoices();
                    const preferredVoice =
                        voices.find((v) => v.lang === "mr-IN") ||
                        voices.find((v) => v.lang === "hi-IN") ||
                        voices.find((v) => v.lang.startsWith("en")) ||
                        voices[0];

                    const utterance = new SpeechSynthesisUtterance(text.trim());
                    if (preferredVoice) {
                        utterance.voice = preferredVoice;
                        utterance.lang = preferredVoice.lang;
                    }
                    utterance.rate = 1;
                    utterance.pitch = 1;

                    speechSynthesis.cancel();
                    speechSynthesis.speak(utterance);
                };

                if (speechSynthesis.getVoices().length === 0) {
                    speechSynthesis.onvoiceschanged = speakWithVoice;
                } else {
                    speakWithVoice();
                }
            }, 100);
        };

        // Language dropdown functionality
        const accessibilityLanguageItem = document.getElementById('accessibilityLanguageItem');
        const accessibilityLanguageDropdown = document.getElementById('accessibilityLanguageDropdown');
        const accessibilityCurrentLanguage = document.getElementById('accessibilityCurrentLanguage');
        const accessibilityCancelLanguageBtn = document.getElementById('accessibilityCancelLanguage');

        accessibilityLanguageItem.addEventListener('click', function (e) {
            if (e.target.classList.contains('accessibility-language-option') ||
                e.target.classList.contains('accessibility-cancel-btn')) return;
            e.stopPropagation();
            accessibilityLanguageDropdown.classList.toggle('show');
        });

        // Select language
        document.querySelectorAll('.accessibility-language-option').forEach(option => {
            option.addEventListener('click', function () {
                accessibilityCurrentLanguage.textContent = this.textContent;
                console.log('Selected language:', this.getAttribute('data-value'));
                accessibilityLanguageDropdown.classList.remove('show');
            });
        });

        // Cancel language selection
        accessibilityCancelLanguageBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            accessibilityLanguageDropdown.classList.remove('show');
        });

        // Click functionality for other menu items
        document.querySelectorAll('.accessibility-item:not(.accessibility-language-item)').forEach(item => {
            item.addEventListener('click', function (e) {
                if (!e.target.classList.contains('accessibility-toggle') &&
                    e.target.tagName !== 'INPUT') {

                    const action = this.textContent.trim();
                }
            });
        });

        // Function to get clean text from an element
        const getCleanText = (element) => {
            if (element.classList.contains('stars') ||
                element.classList.contains('fa') ||
                element.tagName === 'SCRIPT' ||
                element.tagName === 'STYLE' ||
                element.tagName === 'IFRAME') {
                return '';
            }

            let text = element.innerText || element.textContent;
            return text
                .replace(/\s+/g, ' ')
                .replace(/[★☆]/g, '')
                .trim();
        };

        // Function to attach event listeners
        const attachSpeakListeners = (element) => {
            if (element._hasSpeakListener) return;

            const cleanText = getCleanText(element);
            if (!cleanText) return;

            element.addEventListener("mouseenter", () => speak(cleanText));
            element.addEventListener("touchstart", (e) => {
                e.preventDefault();
                speak(cleanText);
            }, { passive: false });

            element._hasSpeakListener = true;
        };

        // Initial setup for existing content
        const allElements = document.querySelectorAll("*");
        allElements.forEach(attachSpeakListeners);

        // MutationObserver for dynamic content
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        attachSpeakListeners(node);
                        const elements = node.querySelectorAll("*");
                        elements.forEach(attachSpeakListeners);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });