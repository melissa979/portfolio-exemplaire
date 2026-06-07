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
                <label>Langue / Language</label>
                <div class="mode-switch">
                    <button class="mode-btn active" id="lang-en-btn" onclick="setLang('en')">
                        🇬🇧 English
                    </button>
                    <button class="mode-btn" id="lang-fr-btn" onclick="setLang('fr')">
                        🇫🇷 Français
                    </button>
                </div>
            </div>

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
let typeWriterTimeout = null;

function startTypeWriter() {
    if (!typingText) return;
    // Lire le texte source depuis data-en / data-fr selon la langue active
    const lang = document.documentElement.lang === 'fr' ? 'fr' : 'en';
    const text = (lang === 'fr' && typingText.getAttribute('data-fr'))
        ? typingText.getAttribute('data-fr')
        : (typingText.getAttribute('data-en') || typingText.getAttribute('data-text') || typingText.textContent);

    // Annuler un éventuel typewriter en cours
    if (typeWriterTimeout) clearTimeout(typeWriterTimeout);
    typingText.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            typeWriterTimeout = setTimeout(typeWriter, 100);
        }
    }

    typeWriterTimeout = setTimeout(typeWriter, 500);
}

startTypeWriter();

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

// ========== COVER LETTER MODAL ==========
(function createCoverLetterModal() {
    const modal = document.createElement('div');
    modal.id = 'cover-modal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.85);
        backdrop-filter: blur(8px);
        z-index: 99999;
        align-items: center;
        justify-content: center;
    `;

    modal.innerHTML = `
        <div style="
            position: relative;
            width: 90%;
            max-width: 860px;
            height: 90vh;
            background: rgba(8,8,20,0.97);
            border: 1px solid rgba(0,255,255,0.3);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 0 60px rgba(0,255,255,0.15);
            display: flex;
            flex-direction: column;
        ">
            <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem 1.5rem;
                border-bottom: 1px solid rgba(0,255,255,0.15);
                flex-shrink: 0;
            ">
                <span style="color:#00ffff; font-family:'Orbitron',sans-serif; font-size:1rem; letter-spacing:1px;">
                    📄 Lettre de Motivation
                </span>
                <div style="display:flex; gap:0.8rem; align-items:center;">
                    <a href="/image/Lettre_motivation_Melissa_SALHI (1).pdf" download
                       style="padding:0.5rem 1.2rem; background:rgba(0,255,255,0.1); border:1px solid rgba(0,255,255,0.4);
                              color:#00ffff; border-radius:8px; text-decoration:none; font-size:0.85rem;
                              transition:all 0.3s ease;"
                       onmouseover="this.style.background='rgba(0,255,255,0.2)'"
                       onmouseout="this.style.background='rgba(0,255,255,0.1)'">
                        ⬇ Télécharger
                    </a>
                    <button onclick="closeCoverLetter()" style="
                        width:36px; height:36px; border-radius:50%;
                        background:rgba(255,255,255,0.05);
                        border:1px solid rgba(255,255,255,0.15);
                        color:#fff; font-size:1.2rem; cursor:pointer;
                        display:flex; align-items:center; justify-content:center;
                        transition:all 0.3s ease;
                    " onmouseover="this.style.background='rgba(255,0,0,0.3)'"
                       onmouseout="this.style.background='rgba(255,255,255,0.05)'">✕</button>
                </div>
            </div>
            <iframe id="cover-iframe"
                src="/image/Lettre_motivation_Melissa_SALHI (1).pdf"
                style="flex:1; border:none; width:100%;"
                type="application/pdf">
            </iframe>
        </div>
    `;

    document.body.appendChild(modal);

    // Fermer en cliquant sur le fond
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeCoverLetter();
    });

    // Fermer avec Echap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') closeCoverLetter();
    });
})();

function openCoverLetter() {
    const modal = document.getElementById('cover-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeCoverLetter() {
    const modal = document.getElementById('cover-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// ========== SCROLL PROGRESS BAR ==========
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    const bar = document.getElementById('scroll-progress');
    if (bar) bar.style.width = progress + '%';
});

// ========== FILTRES PROJETS ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const portBoxes = document.querySelectorAll('.port-box');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        portBoxes.forEach(box => {
            const tags = box.dataset.tags || '';
            if (filter === 'all' || tags.includes(filter)) {
                box.style.opacity = '1';
                box.style.pointerEvents = 'auto';
                box.style.animation = 'fadeInUp 0.5s ease both';
                box.style.display = 'block';
            } else {
                box.style.opacity = '0';
                box.style.pointerEvents = 'none';
                box.style.display = 'none';
            }
        });
    });
});

// ========== FORMSPREE FORMULAIRE ==========
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');
        const isEn = document.documentElement.lang !== 'fr';

        btn.disabled = true;
        btnText.textContent = isEn ? 'Sending...' : 'Envoi en cours...';

        const data = {
            name: document.getElementById('from_name').value,
            email: document.getElementById('from_email').value,
            address: document.getElementById('from_address').value,
            phone: document.getElementById('from_phone').value,
            message: document.getElementById('message').value,
        };

        fetch('https://formspree.io/f/xkoarwzn', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => {
            if (res.ok) {
                formStatus.textContent = isEn ? '✅ Message sent successfully!' : '✅ Message envoyé avec succès !';
                formStatus.style.color = '#00ff88';
                contactForm.reset();
            } else {
                formStatus.textContent = isEn ? '❌ Error, please try again.' : '❌ Erreur, réessayez.';
                formStatus.style.color = '#ff4444';
            }
        }).catch(() => {
            formStatus.textContent = isEn ? '❌ Error, please try again.' : '❌ Erreur, réessayez.';
            formStatus.style.color = '#ff4444';
        }).finally(() => {
            btnText.textContent = isEn ? 'Send Message' : 'Envoyer';
            btn.disabled = false;
        });
    });
}

// ========== COMPTEUR VISITEURS ==========
const visitNum = document.getElementById('visit-num');
if (visitNum) {
    let count = parseInt(localStorage.getItem('visit-count') || '0') + 1;
    localStorage.setItem('visit-count', count);
    visitNum.textContent = count;
}

// ========== CURSEUR TRAIL ==========
const trail = [];
const trailCount = 12;
for (let i = 0; i < trailCount; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
        position: fixed;
        width: ${14 - i}px;
        height: ${14 - i}px;
        border-radius: 50%;
        background: rgba(0, 255, 255, ${0.6 - i * 0.04});
        pointer-events: none;
        z-index: 99999;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease;
        mix-blend-mode: screen;
        opacity: 0;
    `;
    document.body.appendChild(dot);
    trail.push({ el: dot, x: -100, y: -100 });
}

let mouseX = -100, mouseY = -100;
let trailVisible = false;

window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!trailVisible) {
        trailVisible = true;
        trail.forEach(dot => dot.el.style.opacity = '1');
    }
});

function animateTrail() {
    let x = mouseX, y = mouseY;
    trail.forEach((dot, i) => {
        dot.el.style.left = x + 'px';
        dot.el.style.top = y + 'px';
        const next = trail[i + 1] || { x: mouseX, y: mouseY };
        dot.x += (x - dot.x) * 0.3;
        dot.y += (y - dot.y) * 0.3;
        x = dot.x;
        y = dot.y;
    });
    requestAnimationFrame(animateTrail);
}
animateTrail();

// ========== TRADUCTION FR / EN ==========
let currentLang = 'en';

function setLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    // Mettre à jour les boutons du panneau
    const enBtn = document.getElementById('lang-en-btn');
    const frBtn = document.getElementById('lang-fr-btn');
    if (enBtn && frBtn) {
        enBtn.classList.toggle('active', lang === 'en');
        frBtn.classList.toggle('active', lang === 'fr');
    }

    // Traduire tous les éléments avec data-en / data-fr
    // On exclut le h3 du typewriter pour éviter le doublon
    const typingEl = document.querySelector('.home-content h3');
    document.querySelectorAll('[data-en][data-fr]').forEach(el => {
        if (el === typingEl) return; // géré par le typewriter
        const text = lang === 'fr' ? el.getAttribute('data-fr') : el.getAttribute('data-en');
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = text;
        } else {
            el.innerHTML = text;
        }
    });

    // Relancer le typewriter avec la bonne langue
    if (typeof startTypeWriter === 'function') startTypeWriter();

    // Traduire les placeholders
    document.querySelectorAll('[data-fr-placeholder]').forEach(el => {
        el.placeholder = lang === 'fr'
            ? el.getAttribute('data-fr-placeholder')
            : el.getAttribute('data-en-placeholder');
    });

    // Mettre à jour les liens nav
    document.querySelectorAll('.navlist a[data-en]').forEach(a => {
        a.textContent = lang === 'fr' ? a.getAttribute('data-fr') : a.getAttribute('data-en');
    });

    localStorage.setItem('portfolio-lang', lang);
}

// Charger la langue sauvegardée
const savedLang = localStorage.getItem('portfolio-lang');
if (savedLang) setLang(savedLang);

// ========== ANIMATION TIMELINE AU SCROLL ==========
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => timelineObserver.observe(item));

// ========== MODAL PROJETS ==========
document.querySelectorAll('.port-box').forEach(box => {
    const overlay = box.querySelector('.port-overlay');
    if (overlay) {
        overlay.addEventListener('click', () => openModal(box));
    }
    box.addEventListener('click', (e) => {
        if (!e.target.closest('a')) openModal(box);
    });
});

function openModal(box) {
    const lang = document.documentElement.lang === 'fr' ? 'fr' : 'en';
    const title = lang === 'fr'
        ? (box.dataset.modalTitleFr || box.dataset.modalTitle)
        : box.dataset.modalTitle;
    const desc = lang === 'fr'
        ? (box.dataset.modalDescFr || box.dataset.modalDesc)
        : box.dataset.modalDesc;

    document.getElementById('modal-title').textContent = title || '';
    document.getElementById('modal-desc').textContent = desc || '';

    // Bouton View Project : caché si data-modal-hide-link="true"
    const modalLink = document.getElementById('modal-link');
    if (box.dataset.modalHideLink === 'true') {
        modalLink.style.display = 'none';
    } else {
        modalLink.style.display = '';
        modalLink.href = box.dataset.modalLink || '#';
        modalLink.onclick = function(e) {
            e.stopPropagation();
            window.open(box.dataset.modalLink, '_blank');
            return false;
        };
    }

    // Tags
    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = '';
    (box.dataset.modalTags || '').split('·').forEach(tag => {
        if (tag.trim()) {
            const span = document.createElement('span');
            span.textContent = tag.trim();
            tagsContainer.appendChild(span);
        }
    });

    // Galerie d'images
    const gallery = box.dataset.modalGallery ? box.dataset.modalGallery.split('|') : [box.dataset.modalImg];
    const modalImgEl = document.getElementById('modal-img');

    // Nettoyer les miniatures existantes
    const existingThumbs = document.getElementById('modal-thumbs');
    if (existingThumbs) existingThumbs.remove();

    // Afficher l'image principale
    modalImgEl.src = gallery[0];
    modalImgEl.style.display = 'block';

    // Si galerie avec plusieurs images : créer les miniatures
    if (gallery.length > 1) {
        const thumbsRow = document.createElement('div');
        thumbsRow.id = 'modal-thumbs';
        thumbsRow.style.cssText = `
            display: flex;
            gap: 8px;
            padding: 10px 4px 4px;
            overflow-x: auto;
            justify-content: center;
            flex-wrap: wrap;
        `;

        gallery.forEach((src, i) => {
            const thumb = document.createElement('img');
            thumb.src = src;
            thumb.style.cssText = `
                width: 80px;
                height: 56px;
                object-fit: cover;
                border-radius: 6px;
                cursor: pointer;
                border: 2px solid ${i === 0 ? '#00ffff' : 'rgba(255,255,255,0.2)'};
                transition: border-color 0.3s, transform 0.2s;
                flex-shrink: 0;
            `;
            thumb.addEventListener('mouseenter', () => { thumb.style.transform = 'scale(1.07)'; });
            thumb.addEventListener('mouseleave', () => { thumb.style.transform = 'scale(1)'; });
            thumb.addEventListener('click', () => {
                modalImgEl.src = src;
                thumbsRow.querySelectorAll('img').forEach(t => t.style.borderColor = 'rgba(255,255,255,0.2)');
                thumb.style.borderColor = '#00ffff';
            });
            thumbsRow.appendChild(thumb);
        });

        // Insérer les miniatures juste après l'image principale
        modalImgEl.insertAdjacentElement('afterend', thumbsRow);
    }

    document.getElementById('project-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('project-modal').classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('project-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('project-modal')) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ========== BOUTON PARTAGER ==========
function sharePortfolio() {
    const url = window.location.href;
    const toast = document.getElementById('share-toast');
    const lang = document.documentElement.lang === 'fr' ? 'fr' : 'en';

    navigator.clipboard.writeText(url).then(() => {
        toast.textContent = lang === 'fr' ? '✅ Lien copié !' : '✅ Link copied!';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }).catch(() => {
        const tmp = document.createElement('input');
        tmp.value = url;
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand('copy');
        document.body.removeChild(tmp);
        toast.textContent = lang === 'fr' ? '✅ Lien copié !' : '✅ Link copied!';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    });
}

// ========== LAZY LOADING IMAGES ==========
document.querySelectorAll('img').forEach(img => {
    if (!img.loading) img.loading = 'lazy';
});

// ========== ANIMATION BARRES SKILLS AU SCROLL ==========
const skillBars = document.querySelectorAll('.bar span');

skillBars.forEach(bar => {
    // Lire la largeur définie en CSS et la stocker
    const computedWidth = getComputedStyle(bar).getPropertyValue('width');
    const parentWidth = bar.parentElement.offsetWidth;
    const classes = ['HTML', 'css', 'javascript', 'php', 'c', 'mysql', 'powerbi'];
    let targetWidth = '0%';

    classes.forEach(cls => {
        if (bar.classList.contains(cls)) {
            const widths = {
                'HTML': '70%', 'css': '80%', 'javascript': '50%',
                'php': '50%', 'c': '50%', 'mysql': '70%', 'powerbi': '60%'
            };
            targetWidth = widths[cls] || '50%';
        }
    });

    bar.style.setProperty('--target-width', targetWidth);
});

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, 200);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ========== MODAL CERTIFICATION DIAPO ==========
const certData = {
    ai_fluency: {
        title: "AI Fluency: Framework & Foundations",
        issuer: "Anthropic",
        date: "23 mai 2026",
        tag: "AI · LLM · Anthropic",
        pdf: "image/certificate-wh6i6gunby8m-1779460954 (1).pdf",
        learnedTitle: "Comprendre l'IA et les LLMs",
        description: "Cette certification couvre les fondements de l'intelligence artificielle et des grands modèles de langage (LLMs). Elle explore comment ces modèles fonctionnent, leurs capacités, leurs limites et comment les utiliser de manière responsable en contexte professionnel.",
        skills: [
            "✅ Comprendre le fonctionnement des LLMs (tokens, prompts, contexte)",
            "✅ Identifier les cas d'usage appropriés de l'IA en entreprise",
            "✅ Appliquer les principes d'utilisation responsable de l'IA",
            "✅ Évaluer les capacités et limites des modèles IA",
            "✅ Intégrer l'IA dans des workflows professionnels"
        ],
        quiz: [
            {
                question: "Qu'est-ce qu'un LLM (Large Language Model) ?",
                options: [
                    "Un modèle d'IA entraîné sur de grandes quantités de texte pour comprendre et générer du langage",
                    "Un logiciel de traduction automatique",
                    "Un algorithme de tri de données",
                    "Un système de reconnaissance d'images"
                ],
                correct: 0
            },
            {
                question: "Quelle est la bonne pratique lors de l'utilisation d'un LLM en contexte professionnel ?",
                options: [
                    "Toujours faire confiance à 100% aux réponses générées",
                    "Vérifier et valider les informations importantes générées par l'IA",
                    "Partager des données confidentielles sans restriction",
                    "Utiliser l'IA uniquement pour des tâches créatives"
                ],
                correct: 1
            },
            {
                question: "Comment appelle-t-on l'instruction donnée à un modèle IA pour obtenir une réponse ?",
                options: ["Token", "Prompt", "Context", "Output"],
                correct: 1
            }
        ]
    },
    cowork: {
        title: "Introduction to Claude Cowork",
        issuer: "Anthropic",
        date: "22 mai 2026",
        tag: "Claude · Cowork · Automation",
        pdf: "image/certificate-r4tmfmrdi44m-1779574035.pdf",
        learnedTitle: "Automatiser avec Claude Cowork",
        description: "Claude Cowork est l'outil desktop d'Anthropic permettant d'automatiser la gestion de fichiers et de tâches. Cette certification couvre les workflows pratiques pour développeurs et non-développeurs, avec des cas d'usage concrets en entreprise.",
        skills: [
            "✅ Utiliser Claude Cowork pour automatiser des tâches répétitives",
            "✅ Créer des workflows de gestion de fichiers intelligents",
            "✅ Intégrer Cowork dans un environnement professionnel",
            "✅ Comprendre les cas d'usage desktop de l'IA",
            "✅ Optimiser sa productivité avec les outils Anthropic"
        ],
        quiz: [
            {
                question: "À quoi sert principalement Claude Cowork ?",
                options: [
                    "Générer des images avec l'IA",
                    "Automatiser la gestion de fichiers et de tâches sur desktop",
                    "Créer des sites web",
                    "Analyser des bases de données SQL"
                ],
                correct: 1
            },
            {
                question: "Quel type d'utilisateur peut bénéficier de Claude Cowork ?",
                options: [
                    "Uniquement les développeurs",
                    "Uniquement les designers",
                    "Développeurs et non-développeurs",
                    "Uniquement les data scientists"
                ],
                correct: 2
            },
            {
                question: "Quel est l'avantage principal d'automatiser des tâches avec Cowork ?",
                options: [
                    "Remplacer complètement les employés",
                    "Gagner du temps sur les tâches répétitives pour se concentrer sur l'essentiel",
                    "Accélérer uniquement la vitesse de connexion internet",
                    "Générer du code automatiquement"
                ],
                correct: 1
            }
        ]
    },
    claude_101: {
        title: "Claude 101",
        issuer: "Anthropic",
        date: "22 mai 2026",
        tag: "Claude · Prompting · AI",
        pdf: "image/certificate-9urr9cnxu4fw-1779463359 (1).pdf",
        learnedTitle: "Maîtriser Claude AI efficacement",
        description: "Cours fondamental sur l'utilisation efficace de Claude AI. Cette certification couvre la rédaction de prompts, la compréhension du comportement du modèle, et l'application de Claude dans des contextes professionnels et académiques réels.",
        skills: [
            "✅ Rédiger des prompts clairs, précis et efficaces",
            "✅ Comprendre le comportement et les limites de Claude",
            "✅ Appliquer Claude dans des projets académiques et professionnels",
            "✅ Utiliser le prompt engineering pour améliorer les résultats",
            "✅ Évaluer la qualité des réponses générées par Claude"
        ],
        quiz: [
            {
                question: "Qu'est-ce que le 'prompt engineering' ?",
                options: [
                    "La programmation de robots industriels",
                    "L'art de formuler des instructions précises pour obtenir de meilleures réponses d'un modèle IA",
                    "La création de bases de données",
                    "Le développement de jeux vidéo"
                ],
                correct: 1
            },
            {
                question: "Pour obtenir une meilleure réponse de Claude, il faut :",
                options: [
                    "Écrire des prompts le plus courts possibles",
                    "Utiliser uniquement des questions fermées",
                    "Donner un contexte précis, un rôle et des instructions claires",
                    "Poser plusieurs questions en même temps sans structure"
                ],
                correct: 2
            },
            {
                question: "Que signifie le terme 'hallucination' en IA ?",
                options: [
                    "Quand l'IA génère des images colorées",
                    "Quand le modèle produit des informations incorrectes ou inventées présentées comme vraies",
                    "Quand l'IA refuse de répondre",
                    "Quand le modèle répond trop lentement"
                ],
                correct: 1
            }
        ]
    },
    claude_code: {
        title: "Claude Code 101",
        issuer: "Anthropic",
        date: "22 mai 2026",
        tag: "Claude Code · Dev · CLI",
        pdf: "image/certificate-9db8apsiy6oq-1779462085.pdf",
        learnedTitle: "Coder avec l'IA en terminal",
        description: "Introduction à Claude Code, l'outil de codage agentique d'Anthropic. Cette certification couvre l'utilisation de l'assistance IA directement dans le terminal pour la génération de code, le débogage et les workflows de développement logiciel.",
        skills: [
            "✅ Utiliser Claude Code directement dans le terminal (CLI)",
            "✅ Générer du code de qualité avec assistance IA",
            "✅ Déboguer et corriger du code plus rapidement",
            "✅ Intégrer Claude Code dans un workflow de développement",
            "✅ Comprendre les capacités agentiques de l'IA pour le dev"
        ],
        quiz: [
            {
                question: "Claude Code est principalement utilisé via :",
                options: [
                    "Une application mobile",
                    "Un site web",
                    "Le terminal / ligne de commande (CLI)",
                    "Un plugin navigateur"
                ],
                correct: 2
            },
            {
                question: "Quel est l'avantage principal de Claude Code pour un développeur ?",
                options: [
                    "Remplacer complètement le développeur",
                    "Accélérer le développement, le débogage et la documentation directement dans l'environnement de travail",
                    "Créer des designs graphiques automatiquement",
                    "Gérer les bases de données uniquement"
                ],
                correct: 1
            },
            {
                question: "Qu'est-ce qu'une IA 'agentique' comme Claude Code ?",
                options: [
                    "Une IA qui ne peut répondre qu'à des questions simples",
                    "Une IA capable d'exécuter des tâches complexes en plusieurs étapes de manière autonome",
                    "Une IA qui génère uniquement des images",
                    "Une IA qui remplace les moteurs de recherche"
                ],
                correct: 1
            }
        ]
    }
};

let currentSlide = 1;
let currentCert = null;
let quizAnswers = {};
let quizSubmitted = false;

function openCertModal(certId) {
    const cert = certData[certId];
    if (!cert) return;
    currentCert = certId;
    currentSlide = 1;
    quizAnswers = {};
    quizSubmitted = false;

    // Slide 1
    document.getElementById('cert-title-modal').textContent = cert.title;
    document.getElementById('cert-issuer-modal').textContent = cert.issuer;
    document.getElementById('cert-date-modal').textContent = cert.date;
    document.getElementById('cert-tag').textContent = cert.tag;
    const pdfLink = document.getElementById('cert-pdf-link');
    pdfLink.href = cert.pdf;
    pdfLink.onclick = function(e) {
        e.stopPropagation();
        window.open(cert.pdf, '_blank');
        return false;
    };

    // Slide 2
    document.getElementById('cert-learned-title').textContent = cert.learnedTitle;
    document.getElementById('cert-description').textContent = cert.description;
    const skillsList = document.getElementById('cert-skills-list');
    skillsList.innerHTML = '';
    cert.skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        skillsList.appendChild(li);
    });

    // Afficher slide 1
    goToSlide(1);
    document.getElementById('cert-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function renderQuiz(cert) {
    const container = document.getElementById('quiz-container');
    const result = document.getElementById('quiz-result');
    result.style.display = 'none';
    container.innerHTML = '';

    cert.quiz.forEach((q, qi) => {
        const block = document.createElement('div');
        block.className = 'quiz-question-block';
        block.innerHTML = `<p>Q${qi+1}. ${q.question}</p>
            <div class="quiz-options">
                ${q.options.map((opt, oi) => `
                    <button class="quiz-option" data-q="${qi}" data-o="${oi}" onclick="selectAnswer(${qi}, ${oi})">
                        ${opt}
                    </button>
                `).join('')}
            </div>`;
        container.appendChild(block);
    });

    const submitBtn = document.createElement('button');
    submitBtn.className = 'btn quiz-submit-btn';
    submitBtn.id = 'quiz-submit';
    submitBtn.textContent = '✅ Valider mes réponses';
    submitBtn.onclick = submitQuiz;
    container.appendChild(submitBtn);
}

function selectAnswer(qi, oi) {
    if (quizSubmitted) return;
    quizAnswers[qi] = oi;
    document.querySelectorAll(`.quiz-option[data-q="${qi}"]`).forEach(btn => {
        btn.style.borderColor = '';
        btn.style.background = '';
    });
    const selected = document.querySelector(`.quiz-option[data-q="${qi}"][data-o="${oi}"]`);
    if (selected) {
        selected.style.borderColor = 'rgba(0,255,255,0.6)';
        selected.style.background = 'rgba(0,255,255,0.1)';
    }
}

function submitQuiz() {
    if (quizSubmitted) return;
    const cert = certData[currentCert];
    const total = cert.quiz.length;
    let score = 0;

    cert.quiz.forEach((q, qi) => {
        const btns = document.querySelectorAll(`.quiz-option[data-q="${qi}"]`);
        btns.forEach(btn => btn.disabled = true);
        const correctBtn = document.querySelector(`.quiz-option[data-q="${qi}"][data-o="${q.correct}"]`);
        if (correctBtn) correctBtn.classList.add('correct');
        if (quizAnswers[qi] !== undefined && quizAnswers[qi] !== q.correct) {
            const wrongBtn = document.querySelector(`.quiz-option[data-q="${qi}"][data-o="${quizAnswers[qi]}"]`);
            if (wrongBtn) wrongBtn.classList.add('wrong');
        }
        if (quizAnswers[qi] === q.correct) score++;
    });

    quizSubmitted = true;
    const submitBtn = document.getElementById('quiz-submit');
    if (submitBtn) submitBtn.style.display = 'none';

    setTimeout(() => {
        const result = document.getElementById('quiz-result');
        const pct = Math.round((score / total) * 100);
        const msg = pct === 100 ? '🏆 Parfait ! Tu maîtrises ce sujet !' :
                    pct >= 66 ? '👏 Bien joué ! Encore un petit effort !' :
                    '📚 Relis le cours, tu peux faire mieux !';
        result.innerHTML = `
            <span class="quiz-score">${score}/${total}</span>
            <p class="quiz-msg">${msg}</p>
            <button class="btn quiz-retry-btn" onclick="retryQuiz()">🔄 Réessayer</button>
        `;
        result.style.display = 'block';
    }, 800);
}

function retryQuiz() {
    quizAnswers = {};
    quizSubmitted = false;
    renderQuiz(certData[currentCert]);
}

function closeCertModal() {
    document.getElementById('cert-modal').classList.remove('active');
    document.body.style.overflow = '';
}

function goToSlide(n) {
    document.querySelectorAll('.cert-slide').forEach(s => {
        s.classList.remove('active', 'exit');
    });
    document.querySelectorAll('.cert-dot').forEach((d, i) => {
        d.classList.toggle('active', i === n - 1);
    });
    document.getElementById(`slide-${n}`).classList.add('active');
    currentSlide = n;
    document.getElementById('prev-btn').disabled = n === 1;
    document.getElementById('next-btn').disabled = n === 2;
}

function prevSlide() {
    if (currentSlide > 1) goToSlide(currentSlide - 1);
}

function nextSlide() {
    if (currentSlide < 2) goToSlide(currentSlide + 1);
}

document.getElementById('cert-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('cert-modal')) closeCertModal();
});