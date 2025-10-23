// Ubicacion: app/gracias.js
// --- Script para las partículas animadas en el fondo ---
document.addEventListener('DOMContentLoaded', () => {
    const particleContainer = document.querySelector('.particle-container');
    const numParticles = 50;

    for (let i = 0; i < numParticles; i++) {
        let particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDelay = `${Math.random() * 25}s`;
        particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
        
        const size = `${Math.random() * 4 + 4}px`;
        particle.style.width = size;
        particle.style.height = size;

        particleContainer.appendChild(particle);
    }
});
