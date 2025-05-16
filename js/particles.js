document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 30 : 60; // Adjust count for mobile

    function resizeCanvas() {
        // Handle device pixel ratio for crisp rendering
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        
        // Scale the context to ensure correct drawing
        ctx.scale(dpr, dpr);
        
        // Set the CSS size
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * (isMobile ? 1.5 : 3) + (isMobile ? 0.5 : 1.5), // Adjusted size for mobile
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.3 + 0.7
        };
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }

    function drawParticle(particle) {
        const scale = window.devicePixelRatio || 1;
        ctx.beginPath();
        ctx.arc(
            particle.x / scale,
            particle.y / scale,
            particle.size,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = `rgba(239, 232, 243, 1)`;
        ctx.fill();
    }

    function updateParticle(particle) {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        particle.opacity += Math.random() * 0.02 - 0.01;
        particle.opacity = Math.max(0.7, Math.min(1, particle.opacity));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            updateParticle(particle);
            drawParticle(particle);
        });

        requestAnimationFrame(animate);
    }

    // Handle window resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
            initParticles();
        }, 250);
    });

    // Handle orientation change for mobile
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            resizeCanvas();
            initParticles();
        }, 100);
    });

    // Initialize
    resizeCanvas();
    initParticles();
    animate();
}); 