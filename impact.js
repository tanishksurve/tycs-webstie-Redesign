function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const step = target / 200;

                const updateCounter = () => {
                    if (count < target) {
                        count += step;
                        counter.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCounter();
            });
        }

        // Listen for mouseenter on stats section
        const statsSection = document.querySelector('.stats-section');
        statsSection.addEventListener('mouseenter', () => {
            // Reset numbers to 0 before animating again
            document.querySelectorAll('.stat-number').forEach(counter => {
                counter.innerText = '0';
            });
            animateCounters();
        });

        document.addEventListener('mouseover', function (event) {
            // Only read if the element has text and is not a script/style/etc.
            if (event.target && event.target.textContent.trim().length > 0) {
                speakText(event.target.textContent.trim());
            }
        });