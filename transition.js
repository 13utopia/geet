// transition.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject the transition overlay into the DOM
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';
    document.body.appendChild(overlay);

    // 2. Initial wipe: Slide up to reveal page
    requestAnimationFrame(() => {
        setTimeout(() => {
            overlay.classList.add('page-transition--loaded');
        }, 50);
    });

    // 3. Intercept navigation links
    const links = document.querySelectorAll('.header__link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.target === '_blank') return;
            
            if (link.href === window.location.href) {
                e.preventDefault();
                return;
            }

            const url = new URL(link.href, window.location.href);
            if (url.origin === window.location.origin) {
                e.preventDefault();
                const targetUrl = link.href;

                // Prepare to wipe from the bottom
                overlay.style.transition = 'none';
                overlay.classList.remove('page-transition--loaded');
                overlay.classList.add('page-transition--prepare-leave');
                
                // Force a browser reflow so the instant CSS jump applies
                void overlay.offsetWidth;
                
                // Animate up to cover screen
                overlay.style.transition = '';
                overlay.classList.add('page-transition--leaving');

                // Navigate when animation finishes
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 600); // matches CSS duration
            }
        });
    });
});
