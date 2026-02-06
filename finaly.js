/* ==========================================
   PORTFOLIO MELISSA - JAVASCRIPT ULTRA PREMIUM
   Particules, Animations, Thèmes & Plus
   ========================================== */

// ========== CONFIGURATION ==========
const CONFIG = {
    particlesEnabled: true,
    starsEnabled: true,
    scrollAnimations: true,
    themeSwitch: true,
};

// ========== MENU MOBILE ==========
const menuIcon = document.getElementById('menu-icon');
const navlist = document.querySelector('.navlist');

if (menuIcon && navlist) {
    menuIcon.addEventListener('click', () => {
        navlist.classList.toggle('active');
        menuIcon.classList.toggle('bx-x'); // Change icon
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.navlist a').forEach(link => {
        link.addEventListener('click', () => {
            navlist.classList.remove('active');
            menuIcon.classList.remove('bx-x');
        });
    });
}

// ========== SCROLL ACTIF DANS LA NAVIGATION ==========
const sections = document.querySelectorAll('section[id]');

function activeMenu() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.navlist a[href*="${sectionId}"]`);

        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', activeMenu);

// ========== HEADER SCROLL EFFECT ==========
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.padding = '1rem 8%';
        header.style.boxShadow = '0 10px 50px rgba(0, 255, 255, 0.3)';
    } else {
        header.style.padding = '1.5rem 8%';
        header.style.boxShadow = '0 10px 40px rgba(0, 255, 255, 0.1)';
    }

    lastScroll = currentScroll;
});

// ========== PARTICULES INTERACTIVES ==========
if (CONFIG.particlesEnabled) {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = [];
    const numberOfParticles = 100;
    const mouse = {
        x: null,
        y: null,
        radius: 150
    };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`; // Cyan to Blue
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Rebond sur les bords
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }

            // Interaction avec la souris
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = mouse.radius;
                const force = (maxDistance - distance) / maxDistance;
                const directionX = forceDirectionX * force * 3;
                const directionY = forceDirectionY * force * 3;

                this.x -= directionX;
                this.y -= directionY;
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particlesArray.length = 0;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function connect() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }

        connect();
        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
}

// ========== ÉTOILES FILANTES ==========
if (CONFIG.starsEnabled) {
    const starsCanvas = document.createElement('canvas');
    starsCanvas.id = 'stars-canvas';
    starsCanvas.style.position = 'fixed';
    starsCanvas.style.top = '0';
    starsCanvas.style.left = '0';
    starsCanvas.style.width = '100%';
    starsCanvas.style.height = '100%';
    starsCanvas.style.zIndex = '-3';
    starsCanvas.style.pointerEvents = 'none';
    document.body.prepend(starsCanvas);

    const starsCtx = starsCanvas.getContext('2d');
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;

    const shootingStars = [];

    class ShootingStar {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * starsCanvas.width;
            this.y = 0;
            this.length = Math.random() * 80 + 40;
            this.speed = Math.random() * 10 + 6;
            this.opacity = Math.random() * 0.5 + 0.5;
            this.angle = Math.PI / 4; // 45 degrés
        }

        update() {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;

            if (this.y > starsCanvas.height || this.x > starsCanvas.width) {
                this.reset();
            }
        }

        draw() {
            starsCtx.save();
            starsCtx.translate(this.x, this.y);
            starsCtx.rotate(this.angle);

            const gradient = starsCtx.createLinearGradient(0, 0, this.length, 0);
            gradient.addColorStop(0, `rgba(0, 255, 255, 0)`);
            gradient.addColorStop(0.5, `rgba(0, 255, 255, ${this.opacity})`);
            gradient.addColorStop(1, `rgba(255, 0, 255, ${this.opacity})`);

            starsCtx.strokeStyle = gradient;
            starsCtx.lineWidth = 2;
            starsCtx.shadowBlur = 10;
            starsCtx.shadowColor = '#00ffff';

            starsCtx.beginPath();
            starsCtx.moveTo(0, 0);
            starsCtx.lineTo(this.length, 0);
            starsCtx.stroke();

            starsCtx.restore();
        }
    }

    // Créer quelques étoiles filantes
    for (let i = 0; i < 3; i++) {
        shootingStars.push(new ShootingStar());
    }

    // Créer des étoiles fixes
    const stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * starsCanvas.width,
            y: Math.random() * starsCanvas.height,
            radius: Math.random() * 1.5,
            opacity: Math.random()
        });
    }

    function animateStars() {
        starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);

        // Dessiner les étoiles fixes
        stars.forEach(star => {
            starsCtx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            starsCtx.shadowBlur = 5;
            starsCtx.shadowColor = '#ffffff';
            starsCtx.beginPath();
            starsCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            starsCtx.fill();
        });

        // Animer les étoiles filantes
        shootingStars.forEach(star => {
            star.update();
            star.draw();
        });

        requestAnimationFrame(animateStars);
    }

    animateStars();

    window.addEventListener('resize', () => {
        starsCanvas.width = window.innerWidth;
        starsCanvas.height = window.innerHeight;
    });
}

// ========== ANIMATIONS AU SCROLL ==========
if (CONFIG.scrollAnimations) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer tous les éléments à animer
    document.querySelectorAll('.service-box, .port-box, .box, .skill-bar, .about-content, .home-content').forEach(el => {
        observer.observe(el);
    });
}

// ========== MODE SOMBRE/CLAIR + CHANGEUR DE THÈME ==========
if (CONFIG.themeSwitch) {
    // Créer le panneau de contrôle
    const controlPanel = document.createElement('div');
    controlPanel.id = 'theme-control';
    controlPanel.innerHTML = `
        <div class="theme-toggle-btn" id="theme-toggle-btn">
            <i class='bx bx-palette'></i>
        </div>
        <div class="theme-panel" id="theme-panel">
            <h3>Personnalisation</h3>
            
            <div class="theme-section">
                <label>Mode d'affichage</label>
                <div class="mode-switch">
                    <button class="mode-btn active" data-mode="dark">
                        <i class='bx bx-moon'></i> Sombre
                    </button>
                    <button class="mode-btn" data-mode="light">
                        <i class='bx bx-sun'></i> Clair
                    </button>
                </div>
            </div>

            <div class="theme-section">
                <label>Thème de couleur</label>
                <div class="color-themes">
                    <button class="color-btn active" data-theme="cyber">
                        <span style="background: linear-gradient(135deg, #00ffff, #ff00ff, #ffff00)"></span>
                        Cyber
                    </button>
                    <button class="color-btn" data-theme="ocean">
                        <span style="background: linear-gradient(135deg, #00d4ff, #0099ff, #0066ff)"></span>
                        Ocean
                    </button>
                    <button class="color-btn" data-theme="sunset">
                        <span style="background: linear-gradient(135deg, #ff6b6b, #ff8e53, #ffd93d)"></span>
                        Sunset
                    </button>
                    <button class="color-btn" data-theme="forest">
                        <span style="background: linear-gradient(135deg, #00ff88, #00cc66, #009944)"></span>
                        Forest
                    </button>
                    <button class="color-btn" data-theme="purple">
                        <span style="background: linear-gradient(135deg, #b24bf3, #8b2fc9, #6a1b9a)"></span>
                        Purple
                    </button>
                    <button class="color-btn" data-theme="fire">
                        <span style="background: linear-gradient(135deg, #ff4444, #ff6600, #ffaa00)"></span>
                        Fire
                    </button>
                </div>
            </div>

            <div class="theme-section">
                <label>Effets visuels</label>
                <div class="effects-toggle">
                    <div class="toggle-item">
                        <span>Particules</span>
                        <label class="switch">
                            <input type="checkbox" id="particles-toggle" checked>
                            <span class="slider"></span>
                        </label>
                    </div>
                    <div class="toggle-item">
                        <span>Étoiles</span>
                        <label class="switch">
                            <input type="checkbox" id="stars-toggle" checked>
                            <span class="slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            <button class="reset-btn" id="reset-theme">
                <i class='bx bx-reset'></i> Réinitialiser
            </button>
        </div>
    `;
    document.body.appendChild(controlPanel);

    // Styles du panneau de contrôle
    const panelStyles = document.createElement('style');
    panelStyles.textContent = `
        #theme-control {
            position: fixed;
            right: 30px;
            bottom: 30px;
            z-index: 9999;
        }

        .theme-toggle-btn {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #00ffff, #ff00ff);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(0, 255, 255, 0.5);
            transition: all 0.3s ease;
            animation: float 3s ease-in-out infinite;
        }

        .theme-toggle-btn:hover {
            transform: scale(1.1) rotate(90deg);
            box-shadow: 0 15px 40px rgba(0, 255, 255, 0.7);
        }

        .theme-toggle-btn i {
            font-size: 2rem;
            color: #000;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        .theme-panel {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 320px;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(20px);
            border: 2px solid rgba(0, 255, 255, 0.3);
            border-radius: 20px;
            padding: 2rem;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s ease;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
        }

        .theme-panel.active {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .theme-panel h3 {
            color: #00ffff;
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            text-align: center;
            text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }

        .theme-section {
            margin-bottom: 2rem;
        }

        .theme-section label {
            display: block;
            color: #fff;
            font-size: 0.9rem;
            margin-bottom: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: 0.7;
        }

        .mode-switch {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
        }

        .mode-btn {
            padding: 0.8rem;
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            color: #fff;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }

        .mode-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(0, 255, 255, 0.5);
        }

        .mode-btn.active {
            background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2));
            border-color: #00ffff;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
        }

        .color-themes {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.8rem;
        }

        .color-btn {
            padding: 0.8rem;
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            color: #fff;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.85rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .color-btn span {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: block;
        }

        .color-btn:hover {
            transform: translateY(-3px);
            border-color: rgba(255, 255, 255, 0.3);
        }

        .color-btn.active {
            border-color: #00ffff;
            box-shadow: 0 5px 20px rgba(0, 255, 255, 0.3);
        }

        .effects-toggle {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .toggle-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.8rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
        }

        .toggle-item span {
            color: #fff;
            font-size: 0.9rem;
        }

        .switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 26px;
        }

        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255, 255, 255, 0.1);
            transition: 0.4s;
            border-radius: 34px;
        }

        .slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: 0.4s;
            border-radius: 50%;
        }

        input:checked + .slider {
            background: linear-gradient(135deg, #00ffff, #ff00ff);
        }

        input:checked + .slider:before {
            transform: translateX(24px);
        }

        .reset-btn {
            width: 100%;
            padding: 1rem;
            background: rgba(255, 0, 0, 0.2);
            border: 2px solid rgba(255, 0, 0, 0.5);
            border-radius: 10px;
            color: #ff6b6b;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            margin-top: 1rem;
        }

        .reset-btn:hover {
            background: rgba(255, 0, 0, 0.3);
            border-color: #ff6b6b;
            transform: translateY(-2px);
        }

        /* Mode clair */
        body.light-mode {
            --bg-color: #f5f5f5;
            --second-bg-color: #ffffff;
            --text-color: #1a1a1a;
        }

        body.light-mode header {
            background: rgba(255, 255, 255, 0.9);
            border-bottom-color: rgba(0, 0, 0, 0.1);
        }

        body.light-mode .navlist a {
            color: #1a1a1a;
        }

        body.light-mode .service-box,
        body.light-mode .port-box,
        body.light-mode .box,
        body.light-mode form input,
        body.light-mode form textarea {
            background: rgba(255, 255, 255, 0.8);
            border-color: rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
            #theme-control {
                right: 20px;
                bottom: 20px;
            }

            .theme-panel {
                width: 280px;
            }
        }
    `;
    document.head.appendChild(panelStyles);

    // Fonctionnalités du panneau
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const panel = document.getElementById('theme-panel');
    const modeButtons = document.querySelectorAll('.mode-btn');
    const colorButtons = document.querySelectorAll('.color-btn');
    const particlesToggle = document.getElementById('particles-toggle');
    const starsToggle = document.getElementById('stars-toggle');
    const resetBtn = document.getElementById('reset-theme');

    // Toggle panel
    toggleBtn.addEventListener('click', () => {
        panel.classList.toggle('active');
    });

    // Fermer le panel en cliquant dehors
    document.addEventListener('click', (e) => {
        if (!controlPanel.contains(e.target)) {
            panel.classList.remove('active');
        }
    });

    // Thèmes de couleur
    const themes = {
        cyber: {
            '--main-color': '#00ffff',
            '--accent-color': '#ff00ff',
            '--secondary-accent': '#ffff00',
            '--gradient-1': 'linear-gradient(135deg, #00ffff 0%, #00ccff 50%, #0099ff 100%)',
            '--gradient-2': 'linear-gradient(135deg, #ff00ff 0%, #cc00ff 50%, #9900ff 100%)',
            '--gradient-mix': 'linear-gradient(135deg, #00ffff 0%, #ff00ff 50%, #ffff00 100%)'
        },
        ocean: {
            '--main-color': '#00d4ff',
            '--accent-color': '#0099ff',
            '--secondary-accent': '#0066ff',
            '--gradient-1': 'linear-gradient(135deg, #00d4ff 0%, #0099ff 50%, #0066ff 100%)',
            '--gradient-2': 'linear-gradient(135deg, #0099ff 0%, #0066ff 50%, #003399 100%)',
            '--gradient-mix': 'linear-gradient(135deg, #00d4ff 0%, #0099ff 50%, #0066ff 100%)'
        },
        sunset: {
            '--main-color': '#ff6b6b',
            '--accent-color': '#ff8e53',
            '--secondary-accent': '#ffd93d',
            '--gradient-1': 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 50%, #ffd93d 100%)',
            '--gradient-2': 'linear-gradient(135deg, #ff8e53 0%, #ffd93d 50%, #ffaa00 100%)',
            '--gradient-mix': 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 50%, #ffd93d 100%)'
        },
        forest: {
            '--main-color': '#00ff88',
            '--accent-color': '#00cc66',
            '--secondary-accent': '#009944',
            '--gradient-1': 'linear-gradient(135deg, #00ff88 0%, #00cc66 50%, #009944 100%)',
            '--gradient-2': 'linear-gradient(135deg, #00cc66 0%, #009944 50%, #006622 100%)',
            '--gradient-mix': 'linear-gradient(135deg, #00ff88 0%, #00cc66 50%, #009944 100%)'
        },
        purple: {
            '--main-color': '#b24bf3',
            '--accent-color': '#8b2fc9',
            '--secondary-accent': '#6a1b9a',
            '--gradient-1': 'linear-gradient(135deg, #b24bf3 0%, #8b2fc9 50%, #6a1b9a 100%)',
            '--gradient-2': 'linear-gradient(135deg, #8b2fc9 0%, #6a1b9a 50%, #4a148c 100%)',
            '--gradient-mix': 'linear-gradient(135deg, #b24bf3 0%, #8b2fc9 50%, #6a1b9a 100%)'
        },
        fire: {
            '--main-color': '#ff4444',
            '--accent-color': '#ff6600',
            '--secondary-accent': '#ffaa00',
            '--gradient-1': 'linear-gradient(135deg, #ff4444 0%, #ff6600 50%, #ffaa00 100%)',
            '--gradient-2': 'linear-gradient(135deg, #ff6600 0%, #ffaa00 50%, #ffcc00 100%)',
            '--gradient-mix': 'linear-gradient(135deg, #ff4444 0%, #ff6600 50%, #ffaa00 100%)'
        }
    };

    // Mode sombre/clair
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const mode = btn.dataset.mode;
            if (mode === 'light') {
                document.body.classList.add('light-mode');
                localStorage.setItem('theme-mode', 'light');
            } else {
                document.body.classList.remove('light-mode');
                localStorage.setItem('theme-mode', 'dark');
            }
        });
    });

    // Thèmes de couleur
    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            colorButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const theme = btn.dataset.theme;
            const colors = themes[theme];

            Object.keys(colors).forEach(key => {
                document.documentElement.style.setProperty(key, colors[key]);
            });

            localStorage.setItem('color-theme', theme);
        });
    });

    // Toggle particules
    particlesToggle.addEventListener('change', (e) => {
        const particlesCanvas = document.getElementById('particles-canvas');
        if (particlesCanvas) {
            particlesCanvas.style.display = e.target.checked ? 'block' : 'none';
        }
        localStorage.setItem('particles-enabled', e.target.checked);
    });

    // Toggle étoiles
    starsToggle.addEventListener('change', (e) => {
        const starsCanvas = document.getElementById('stars-canvas');
        if (starsCanvas) {
            starsCanvas.style.display = e.target.checked ? 'block' : 'none';
        }
        localStorage.setItem('stars-enabled', e.target.checked);
    });

    // Reset
    resetBtn.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });

    // Charger les préférences sauvegardées
    const savedMode = localStorage.getItem('theme-mode');
    const savedTheme = localStorage.getItem('color-theme');
    const savedParticles = localStorage.getItem('particles-enabled');
    const savedStars = localStorage.getItem('stars-enabled');

    if (savedMode === 'light') {
        document.body.classList.add('light-mode');
        document.querySelector('[data-mode="light"]').classList.add('active');
        document.querySelector('[data-mode="dark"]').classList.remove('active');
    }

    if (savedTheme && themes[savedTheme]) {
        const colors = themes[savedTheme];
        Object.keys(colors).forEach(key => {
            document.documentElement.style.setProperty(key, colors[key]);
        });
        document.querySelector(`[data-theme="${savedTheme}"]`).classList.add('active');
        document.querySelector('[data-theme="cyber"]').classList.remove('active');
    }

    if (savedParticles === 'false') {
        particlesToggle.checked = false;
        const particlesCanvas = document.getElementById('particles-canvas');
        if (particlesCanvas) particlesCanvas.style.display = 'none';
    }

    if (savedStars === 'false') {
        starsToggle.checked = false;
        const starsCanvas = document.getElementById('stars-canvas');
        if (starsCanvas) starsCanvas.style.display = 'none';
    }
}

// ========== TYPING EFFECT ==========
const typingText = document.querySelector('.home-content h3');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    // Démarrer après 1 seconde
    setTimeout(typeWriter, 1000);
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== COMPTEUR ANIMÉ ==========
const counters = document.querySelectorAll('.info-about1 span, .info-about2 span, .info-about3 span');
counters.forEach(counter => {
    const target = parseInt(counter.textContent);
    let current = 0;
    const increment = target / 50;

    const updateCounter = () => {
        if (current < target) {
            current += increment;
            counter.textContent = Math.floor(current) + '+';
            setTimeout(updateCounter, 40);
        } else {
            counter.textContent = target + '+';
        }
    };

    // Démarrer quand visible
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            updateCounter();
            observer.disconnect();
        }
    });

    observer.observe(counter);
});

// ========== LOADING SCREEN ==========
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

console.log('%c🔥 Portfolio Melissa - Ultra Premium JS Loaded! 🔥', 'color: #00ffff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00ffff;');