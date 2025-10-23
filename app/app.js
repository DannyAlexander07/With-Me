//Ubicacion: app/app.js
// --- Script para el menú de navegación (Desktop y Mobile) ---
document.addEventListener("DOMContentLoaded", function () {
  const servicesMenu = document.getElementById("services-menu");
  const submenuDesktop = document.getElementById("sub-menu-desktop");
  const flechaDesktop = document.querySelector(".navegacion-desktop .flecha");

  if (servicesMenu && submenuDesktop) {
    const toggleDesktopMenu = () => {
      submenuDesktop.classList.toggle("active");
      flechaDesktop.classList.toggle("active");
    };

    servicesMenu.addEventListener("click", (e) => {
      e.preventDefault();
      toggleDesktopMenu();
    });

    flechaDesktop.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDesktopMenu();
    });

    document.addEventListener("click", (e) => {
      if (!servicesMenu.contains(e.target) && !submenuDesktop.contains(e.target)) {
        submenuDesktop.classList.remove("active");
        flechaDesktop.classList.remove("active");
      }
    });
  }

  const menuIcon = document.getElementById("menu-mobile");
  const navMobile = document.getElementById("navegacion-mobile");
  const closeIcon = document.querySelector(".equis");
  const flechaMobile = document.querySelector(".navegacion-mobile .flecha");
  const subMenuMobile = document.querySelector(".sub-menu-mobile");
  const serviciosLi = flechaMobile ? flechaMobile.parentElement : null;

  menuIcon?.addEventListener("click", () => {
    navMobile.classList.add("active");
    menuIcon.classList.add("active");
  });

  closeIcon?.addEventListener("click", () => {
    navMobile.classList.remove("active");
    menuIcon.classList.remove("active");
    flechaMobile?.classList.remove("active");
    subMenuMobile?.classList.remove("active");
  });

  serviciosLi?.addEventListener("click", (e) => {
    if (e.target.closest(".sub-menu-mobile a")) return;
    flechaMobile?.classList.toggle("active");
    subMenuMobile?.classList.toggle("active");
  });

const animateCounters = () => {
  const counters = document.querySelectorAll('.proyectos');
  const countersData = [];

  counters.forEach(counter => {
    const target = parseInt(counter.innerText, 10) || 0; 
    countersData.push({
      element: counter,
      target: target,
      current: 0
    });
  });

  const speed = 100; 

  const animateStep = () => {
    let allFinished = true;

    countersData.forEach(data => {
      const { element, target } = data;
      
      if (data.current < target) {
        allFinished = false;
        data.current++; // Increment by 1
        element.innerText = data.current.toString().padStart(2, '0');
      }
    });

    if (!allFinished) {
      setTimeout(animateStep, speed);
    } else {
      setTimeout(() => {
        countersData.forEach(data => {
          data.current = 0;
          data.element.innerText = '00';
        });
        setTimeout(animateStep, speed);
      }, 2000); 
    }
  };

  countersData.forEach(data => {
    data.element.innerText = '00';
  });
  animateStep();
};


const statsSection = document.querySelector('.datos-grupo4');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

});

window.addEventListener('load', () => {
    const track = document.querySelector('.carrusel-track');
    if (!track) return;

    const slides = Array.from(track.children);
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');
    const dotsNav = document.getElementById('carruselNav');

    if (slides.length === 0) return;

    let currentIndex = 0;
    let dots = [];

    const getTranslateZ = () => {
        return window.innerWidth < 1024 ? 400 : 500;
    }

    const updateCarousel = () => {
        const angle = 360 / slides.length;
        const rotateY = -currentIndex * angle;
        const translateZ = getTranslateZ();
        track.style.transform = `translateZ(-${translateZ}px) rotateY(${rotateY}deg)`;

        slides.forEach((slide, index) => {
            const slideAngle = index * angle;
            slide.style.transform = `rotateY(${slideAngle}deg) translateZ(${translateZ}px)`;
            slide.classList.toggle('is-active', index === currentIndex);
        });
        updateDots();
    };

    const moveTo = (newIndex) => {
        currentIndex = (newIndex + slides.length) % slides.length;
        updateCarousel();
    };

    const updateDots = () => {
        if (!dotsNav) return;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    if (dotsNav) {
        dotsNav.innerHTML = '';
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('carrusel-dot');
            dot.addEventListener('click', () => moveTo(i));
            dotsNav.appendChild(dot);
        });
        dots = Array.from(dotsNav.children);
    }

    nextButton?.addEventListener('click', () => {
        moveTo(currentIndex + 1);
    });

    prevButton?.addEventListener('click', () => {
        moveTo(currentIndex - 1);
    });

    window.addEventListener('resize', () => {
        updateCarousel();
    });

    // Initialize
    const initialTranslateZ = getTranslateZ();
    slides.forEach((slide, index) => {
        const angle = 360 / slides.length;
        const slideAngle = index * angle;
        slide.style.transform = `rotateY(${slideAngle}deg) translateZ(${initialTranslateZ}px)`;
    });

    updateCarousel();
});

// --- Script para el carrusel de la página "Nosotros" (Estilo Baraja de Cartas) ---
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.getElementById('carrusel-trabajos-nosotros');
    if (!carouselContainer) return;

    const slides = Array.from(carouselContainer.querySelectorAll('.img-carrusel-trabajo'));
    const prevButton = document.getElementById('prevBtn-nosotros');
    const nextButton = document.getElementById('nextBtn-nosotros');
    const navContainer = document.getElementById('carruselNav-nosotros');

    if (slides.length === 0) return;

    let currentIndex = 0;
    let isAnimating = false;
    const dots = [];

    const updateDots = () => {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    const goToSlide = (newIndex, direction) => {
        if (isAnimating || newIndex === currentIndex) return;
        isAnimating = true;

        const currentSlide = slides[currentIndex];
        const newSlide = slides[newIndex];

        
        slides.forEach(slide => {
            slide.classList.remove('is-exiting', 'is-returning');
        });

        if (direction === 'next') {
            currentSlide.classList.add('is-exiting');
            newSlide.classList.add('is-active');
        } else { 
            currentSlide.classList.add('is-returning');
            newSlide.classList.add('is-active');
        }
        
        currentIndex = newIndex;
        updateDots();

        setTimeout(() => {
            currentSlide.classList.remove('is-active', 'is-exiting', 'is-returning');
            isAnimating = false;
        }, 600); 
    };

    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carrusel-dot-nosotros');
        dot.addEventListener('click', () => {
            if (index > currentIndex) {
                goToSlide(index, 'next');
            } else if (index < currentIndex) {
                goToSlide(index, 'prev');
            }
        });
        navContainer.appendChild(dot);
        dots.push(dot);
    });

    nextButton.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex, 'next');
    });

    prevButton.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(prevIndex, 'prev');
    });

    if (slides.length > 0) {
        slides[currentIndex].classList.add('is-active');
        updateDots();
    }
});