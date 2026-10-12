document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Custom Cursor Tracking (Smooth Lerp / Interpolation)
    const cursor = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const updateCursor = () => {
        // Dot movement (slightly faster lag or instant)
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;

        if (cursor) {
            cursor.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
        }

        // Ring movement (smooth inertia lag)
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;

        if (cursorRing) {
            cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        }

        requestAnimationFrame(updateCursor);
    };
    updateCursor();

    // 3. Ambient Particle Canvas Animation
    const canvas = document.getElementById('ambient-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [];
        const particleCount = 45;

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.35;
                this.vy = (Math.random() - 0.5) * 0.35;
                this.radius = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 168, 255, 0.15)';
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const drawGridBackground = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw connecting lines if particles are close
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 168, 255, ${0.12 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }

                // Connection with the custom cursor dot (dotX, dotY)
                const mdx = particles[i].x - dotX;
                const mdy = particles[i].y - dotY;
                const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mdist < 180) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(dotX, dotY);
                    ctx.strokeStyle = `rgba(0, 168, 255, ${0.22 * (1 - mdist / 180)})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }

            requestAnimationFrame(drawGridBackground);
        };
        drawGridBackground();
    }

    // Hover states for links & buttons
    const interactiveElements = document.querySelectorAll('a, button, .work-item, .service-item, .tool-tag, input, textarea');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hover-link');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hover-link');
        });
    });

    // 4. Mobile Navigation Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // 5. Scroll Reveal (Intersection Observer)
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
