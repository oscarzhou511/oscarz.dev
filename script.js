document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Scroll reveal animation for sections
    const sections = document.querySelectorAll('.content-section');
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after it's visible once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Custom cursor movement
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // Only run cursor script if elements exist (they are hidden on mobile)
    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // cursorOutline.style.left = `${posX}px`;
            // cursorOutline.style.top = `${posY}px`;
            // For a smoother trailing effect on outline:
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 300, fill: "forwards" }); // Adjust duration for trail length
        });

        // Add effects when hovering over interactive elements
        // This is now mostly handled by CSS pseudo-selectors like a:hover ~ .cursor-dot
        // but you could add more complex JS interactions here if needed.
        document.querySelectorAll('a, button, .hobby-card, .family-member-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                // cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                // cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.8)';
            });
            el.addEventListener('mouseleave', () => {
                // cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                // cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }
});
