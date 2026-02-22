// script.js
document.addEventListener("DOMContentLoaded", () => {
    
    // --- Lenis Smooth Scroll ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);


    // --- Custom Cursor ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const hoverElements = document.querySelectorAll('a, button, .product-card');

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update direct cursor immediately
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    // Follower animation loop
    function animateCursor() {
        // Easing factor
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
            follower.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
            follower.classList.remove('hovered');
        });
    });


    // --- Hero Text Animation Line by Line ---
    const heroLines = document.querySelectorAll('.hero-title .line span');
    setTimeout(() => {
        heroLines.forEach((span, index) => {
            span.style.transition = `transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.2 + 0.2}s, opacity 1s ease ${index * 0.2 + 0.2}s`;
            span.style.transform = 'translateY(0)';
            span.style.opacity = '1';
        });
    }, 100);


    // --- Intersection Observer for Reveals ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-image, .reveal-text');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });


    // --- Parallax Effect ---
    const parallaxElements = document.querySelectorAll('.parallax, .parallax-img');
    
    lenis.on('scroll', (e) => {
        const scrollY = lenis.scroll;
        
        // Header scroll effect
        const header = document.querySelector('.header');
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Apply parallax
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-speed') || 0.2;
            const yPos = -(scrollY * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
});
