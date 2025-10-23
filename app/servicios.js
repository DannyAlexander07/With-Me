// Este script en app/servicio.js 
document.addEventListener('DOMContentLoaded', () => {
    const carruselBranding = document.getElementById('carrusel-branding');
    if (carruselBranding) {
        const carruselPartes = carruselBranding.querySelectorAll('.carrusel-branding-parte');
        carruselPartes.forEach(parte => {
            const children = Array.from(parte.children);
            children.forEach(item => {
                parte.appendChild(item.cloneNode(true));
            });
        });
    }

    
    const animatedElements = document.querySelectorAll('[data-animation="fade-in"]');

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
});