// ==================== MENU TOGGLE (HAMBURGER) ====================
// Sélectionne l'icône du menu hamburger dans le HTML
const menuIcon = document.querySelector('#menu-icon');
// Sélectionne la liste de navigation
const navlist = document.querySelector('.navlist');

// Vérifie que les éléments existent avant d'ajouter l'événement
if (menuIcon && navlist) {
    // Ajoute un écouteur d'événement au clic sur l'icône
    menuIcon.addEventListener('click', () => {
        // Toggle (ajoute/enlève) la classe 'bx-x' pour transformer l'icône en X
        menuIcon.classList.toggle('bx-x');
        // Toggle la classe 'active' pour afficher/cacher le menu
        navlist.classList.toggle('active');
    });
}

// ==================== STICKY HEADER ====================
// Détecte le scroll de la page
window.addEventListener('scroll', () => {
    // Sélectionne le header
    const header = document.querySelector('header');
    // Vérifie que le header existe
    if (header) {
        // Ajoute la classe 'sticky' si on a scrollé plus de 100px
        // Enlève la classe si on est en haut de la page
        header.classList.toggle('sticky', window.scrollY > 100);
    }
});

// ==================== ACTIVE NAVIGATION LINK ====================
// Sélectionne toutes les sections qui ont un ID
const sections = document.querySelectorAll('section');
// Sélectionne tous les liens de navigation
const navLinks = document.querySelectorAll('.navlist a');

// Détecte le scroll pour mettre à jour le lien actif
window.addEventListener('scroll', () => {
    // Variable pour stocker l'ID de la section actuelle
    let current = '';
    
    // Parcourt toutes les sections
    sections.forEach(section => {
        // Position du haut de la section par rapport au document
        const sectionTop = section.offsetTop;
        // Hauteur de la section
        const sectionHeight = section.clientHeight;
        
        // Si on a scrollé jusqu'à cette section (avec une marge de 150px)
        if (window.scrollY >= (sectionTop - 150)) {
            // Récupère l'ID de cette section (ex: "home", "about")
            current = section.getAttribute('id');
        }
    });
    
    // Parcourt tous les liens de navigation
    navLinks.forEach(link => {
        // Enlève la classe 'active' de tous les liens
        link.classList.remove('active');
        // Si le href du lien contient l'ID de la section actuelle
        if (link.getAttribute('href').includes(current)) {
            // Ajoute la classe 'active' à ce lien
            link.classList.add('active');
        }
    });
});

// ==================== CLOSE MENU ON LINK CLICK ====================
// Parcourt tous les liens de navigation
navLinks.forEach(link => {
    // Ajoute un écouteur d'événement au clic
    link.addEventListener('click', () => {
        // Vérifie que le menu icon et navlist existent
        if (menuIcon && navlist) {
            // Enlève la classe 'bx-x' de l'icône (retour au hamburger)
            menuIcon.classList.remove('bx-x');
            // Enlève la classe 'active' pour fermer le menu
            navlist.classList.remove('active');
        }
    });
});

// ==================== SCROLL REVEAL ANIMATION ====================
// Options pour l'Intersection Observer (détecte quand un élément entre dans la vue)
const observerOptions = {
    threshold: 0.1, // L'élément doit être visible à 10% pour déclencher
    rootMargin: '0px 0px -100px 0px' // Marge en bas de -100px (déclenche avant que l'élément soit complètement visible)
};

// Crée un nouvel Intersection Observer
const observer = new IntersectionObserver((entries) => {
    // Pour chaque élément observé
    entries.forEach(entry => {
        // Si l'élément entre dans la vue
        if (entry.isIntersecting) {
            // Rend l'élément visible (opacité 1)
            entry.target.style.opacity = '1';
            // Remet l'élément en position normale (translateY 0)
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe toutes les sections pour l'animation d'apparition
sections.forEach(section => {
    // Initialise l'opacité à 0 (invisible)
    section.style.opacity = '0';
    // Déplace l'élément de 50px vers le bas
    section.style.transform = 'translateY(50px)';
    // Ajoute une transition fluide
    section.style.transition = 'all 0.8s ease';
    // Commence à observer cet élément
    observer.observe(section);
});

// ==================== SKILL BARS ANIMATION (NOUVEAU) ====================
// Fonction pour animer les barres de compétences techniques
function animateSkillBars() {
    // Sélectionne toutes les barres de compétences
    const skillBars = document.querySelectorAll('.skill-bar');
    
    // Parcourt chaque barre de compétence
    skillBars.forEach((skillBar, index) => {
        // Sélectionne la barre de progression (span coloré)
        const progressBar = skillBar.querySelector('.bar span');
        // Sélectionne le texte du pourcentage
        const percentText = skillBar.querySelector('.info p:last-child');
        
        // Si les éléments existent
        if (progressBar && percentText) {
            // Récupère le pourcentage cible depuis le texte (ex: "90%" -> 90)
            const targetPercent = parseInt(percentText.textContent);
            
            // Récupère la classe de la barre (html, css, javascript, etc.)
            const barClass = progressBar.className.split(' ').find(cls => 
                ['HTML', 'css', 'javascript', 'mysql', 'php', 'c'].includes(cls)
            );
            
            // Détermine la largeur finale selon la classe
            let finalWidth;
            switch(barClass) {
                case 'HTML': finalWidth = '90%'; break;
                case 'css': finalWidth = '80%'; break;
                case 'javascript': finalWidth = '80%'; break;
                case 'mysql': finalWidth = '75%'; break;
                case 'php': finalWidth = '85%'; break;
                case 'c': finalWidth = '82%'; break;
                default: finalWidth = targetPercent + '%';
            }
            
            // Initialise le compteur à 0
            let currentPercent = 0;
            // Vitesse d'animation (augmente de 1% toutes les 20ms)
            const increment = 1;
            const duration = 20; // milliseconds entre chaque incrément
            
            // Réinitialise la barre à 0%
            progressBar.style.width = '0%';
            // Désactive l'animation CSS pour contrôler manuellement
            progressBar.style.animation = 'none';
            
            // Délai avant de commencer (pour effet en cascade)
            setTimeout(() => {
                // Fonction d'animation du pourcentage
                function animatePercent() {
                    // Si on n'a pas encore atteint le pourcentage cible
                    if (currentPercent < targetPercent) {
                        // Augmente le pourcentage
                        currentPercent += increment;
                        // Met à jour le texte affiché
                        percentText.textContent = currentPercent + '%';
                        // Continue l'animation
                        setTimeout(animatePercent, duration);
                    } else {
                        // Fixe la valeur finale exacte
                        percentText.textContent = targetPercent + '%';
                    }
                }
                
                // Lance l'animation du texte
                animatePercent();
                
                // Animation de la barre de progression
                progressBar.style.transition = 'width 2s ease-in-out';
                progressBar.style.width = finalWidth;
                
            }, index * 100); // Décalage de 100ms entre chaque barre
        }
    });
}

// Observer pour la section Skills (barres techniques)
const skillSectionForBars = document.querySelector('.skill-left');
// Vérifie que la section existe
if (skillSectionForBars) {
    // Crée un nouvel observer pour les barres de compétences
    const skillBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si la section devient visible
            if (entry.isIntersecting) {
                // Lance l'animation des barres
                animateSkillBars();
                // Arrête d'observer (on ne veut animer qu'une seule fois)
                skillBarObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Déclenche quand 50% de la section est visible
    
    // Commence à observer la section des compétences techniques
    skillBarObserver.observe(skillSectionForBars);
}

// ==================== SKILL CIRCLES ANIMATION (NOUVEAU ET AMÉLIORÉ) ====================
// Fonction pour animer les cercles de compétences professionnelles
function animateCircles() {
    // Sélectionne tous les cercles
    const circles = document.querySelectorAll('.circle');
    
    // Parcourt chaque cercle
    circles.forEach(circle => {
        // Récupère le pourcentage depuis l'attribut data-percent (ex: "70")
        const percent = circle.getAttribute('data-percent');
        // Convertit le pourcentage en degrés (360° = 100%)
        const deg = (360 / 100) * percent;
        
        // ANIMATION PROGRESSIVE : commence à 0 et va jusqu'au pourcentage cible
        let currentDeg = 0; // Degré actuel (commence à 0)
        const step = deg / 60; // Nombre de degrés à ajouter à chaque frame (60 frames pour une animation fluide)
        
        // Fonction d'animation qui s'exécute progressivement
        function animate() {
            // Si on n'a pas encore atteint la cible
            if (currentDeg < deg) {
                // Augmente le degré actuel
                currentDeg += step;
                // Applique le dégradé conique avec le degré actuel
                circle.style.background = `conic-gradient(
                    var(--main-color) ${currentDeg}deg,
                    var(--bg-color) ${currentDeg}deg
                )`;
                // Demande la prochaine frame d'animation (60fps)
                requestAnimationFrame(animate);
            } else {
                // Quand l'animation est terminée, fixe la valeur finale exacte
                circle.style.background = `conic-gradient(
                    var(--main-color) ${deg}deg,
                    var(--bg-color) ${deg}deg
                )`;
            }
        }
        
        // Lance l'animation
        animate();
    });
}

// Observer spécifique pour la section Skills (pour déclencher l'animation des cercles)
const skillSection = document.querySelector('.Skill');
// Vérifie que la section existe
if (skillSection) {
    // Crée un nouvel observer pour la section Skills
    const skillObserver = new IntersectionObserver((entries) => {
        // Pour chaque entrée (ici, une seule : la section Skills)
        entries.forEach(entry => {
            // Si la section devient visible
            if (entry.isIntersecting) {
                // Lance l'animation des cercles
                animateCircles();
                // Arrête d'observer (on ne veut animer qu'une seule fois)
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Déclenche quand 50% de la section est visible
    
    // Commence à observer la section Skills
    skillObserver.observe(skillSection);
}

// ==================== PORTFOLIO FILTER ====================
// Sélectionne tous les boutons de filtre
const filterButtons = document.querySelectorAll('.fillter-buttons .btn');
// Sélectionne tous les éléments de portfolio
const portfolioItems = document.querySelectorAll('.port-box');

// Pour chaque bouton de filtre
filterButtons.forEach(button => {
    // Ajoute un écouteur au clic
    button.addEventListener('click', () => {
        // Enlève la classe 'active' de tous les boutons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Ajoute la classe 'active' au bouton cliqué
        button.classList.add('active');
        
        // Récupère la valeur du filtre (texte du bouton en minuscules)
        const filterValue = button.textContent.toLowerCase();
        
        // Pour chaque élément de portfolio
        portfolioItems.forEach(item => {
            // Si le filtre est "all" (tous)
            if (filterValue === 'all') {
                // Affiche l'élément
                item.style.display = 'block';
            } else {
                // Récupère la catégorie de l'élément depuis l'attribut data-category
                const itemCategory = item.getAttribute('data-category');
                // Si la catégorie existe et correspond au filtre
                if (itemCategory && itemCategory.toLowerCase() === filterValue) {
                    // Affiche l'élément
                    item.style.display = 'block';
                } else {
                    // Cache l'élément
                    item.style.display = 'none';
                }
            }
        });
    });
});

// ==================== TYPING EFFECT ====================
// Sélectionne le sous-titre de la section home
const typingText = document.querySelector('.home-content h3');
// Vérifie que l'élément existe
if (typingText) {
    // Récupère le texte complet
    const text = typingText.textContent;
    // Vide le contenu (on va le réécrire lettre par lettre)
    typingText.textContent = '';
    // Index de la lettre actuelle
    let index = 0;
    
    // Fonction qui ajoute une lettre à la fois
    function type() {
        // Si on n'a pas encore affiché toutes les lettres
        if (index < text.length) {
            // Ajoute la lettre suivante
            typingText.textContent += text.charAt(index);
            // Passe à la lettre suivante
            index++;
            // Rappelle la fonction après 100ms (effet de frappe)
            setTimeout(type, 100);
        }
    }
    
    // Démarre l'effet après 1 seconde
    setTimeout(type, 1000);
}

// ==================== SMOOTH SCROLL ====================
// Sélectionne tous les liens qui commencent par "#" (liens d'ancrage)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Ajoute un écouteur au clic
    anchor.addEventListener('click', function(e) {
        // Empêche le comportement par défaut (saut brusque)
        e.preventDefault();
        // Récupère l'élément cible (section) depuis le href
        const target = document.querySelector(this.getAttribute('href'));
        // Si la cible existe
        if (target) {
            // Scroll fluide jusqu'à la cible
            target.scrollIntoView({
                behavior: 'smooth', // Animation fluide
                block: 'start' // Aligne le haut de la section en haut de la fenêtre
            });
        }
    });
});

// ==================== FORM VALIDATION ====================
// Sélectionne le formulaire de contact
const contactForm = document.querySelector('.contant form');
// Vérifie que le formulaire existe
if (contactForm) {
    // Ajoute un écouteur à la soumission du formulaire
    contactForm.addEventListener('submit', (e) => {
        // Sélectionne tous les champs requis (input et textarea avec l'attribut required)
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        // Variable pour vérifier si le formulaire est valide
        let isValid = true;
        
        // Pour chaque champ requis
        inputs.forEach(input => {
            // Si le champ est vide (après avoir enlevé les espaces)
            if (!input.value.trim()) {
                // Le formulaire n'est pas valide
                isValid = false;
                // Change la couleur de bordure en rouge
                input.style.borderColor = '#ff0000';
            } else {
                // Remet la bordure cyan si le champ est rempli
                input.style.borderColor = 'var(--main-color)';
            }
        });
        
        // Si le formulaire n'est pas valide
        if (!isValid) {
            // Empêche l'envoi du formulaire
            e.preventDefault();
            // Affiche un message d'alerte
            alert('Please fill in all required fields.');
        }
    });
}

// ==================== SCROLL TO TOP BUTTON ====================
// Sélectionne le bouton "retour en haut" dans le footer
const scrollTopBtn = document.querySelector('footer a');
// Vérifie que le bouton existe
if (scrollTopBtn) {
    // Détecte le scroll pour afficher/cacher le bouton
    window.addEventListener('scroll', () => {
        // Si on a scrollé plus de 500px
        if (window.scrollY > 500) {
            // Rend le bouton visible (opacité 1)
            scrollTopBtn.style.opacity = '1';
            // Active les interactions (cliquable)
            scrollTopBtn.style.pointerEvents = 'auto';
        } else {
            // Rend le bouton semi-transparent
            scrollTopBtn.style.opacity = '0.5';
            // Désactive les interactions
            scrollTopBtn.style.pointerEvents = 'none';
        }
    });
    
    // NOUVEAU : Ajoute l'événement de clic pour remonter en haut
    scrollTopBtn.addEventListener('click', (e) => {
        // Empêche le comportement par défaut du lien
        e.preventDefault();
        // Scroll fluide vers le haut de la page
        window.scrollTo({
            top: 0, // Position 0 (tout en haut)
            behavior: 'smooth' // Animation fluide
        });
    });
}

// ==================== CURSOR EFFECT (Optional) ====================
// Crée un élément div pour le curseur personnalisé
let cursor = document.createElement('div');
// Ajoute la classe 'cursor'
cursor.classList.add('cursor');
// Ajoute l'élément au body
document.body.appendChild(cursor);

// Détecte le mouvement de la souris
document.addEventListener('mousemove', (e) => {
    // Positionne le curseur aux coordonnées de la souris
    cursor.style.left = e.clientX + 'px'; // Position horizontale
    cursor.style.top = e.clientY + 'px'; // Position verticale
});

// Ajoute dynamiquement les styles du curseur personnalisé
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor {
        width: 20px; /* Largeur du curseur */
        height: 20px; /* Hauteur du curseur */
        border: 2px solid var(--main-color); /* Bordure cyan */
        border-radius: 50%; /* Forme circulaire */
        position: fixed; /* Reste fixe par rapport à la fenêtre */
        pointer-events: none; /* N'interfère pas avec les clics */
        z-index: 9999; /* Au-dessus de tout */
        transition: 0.1s; /* Transition rapide pour suivre la souris */
        mix-blend-mode: difference; /* Mode de fusion pour effet visuel */
    }
`;
// Ajoute les styles au head
document.head.appendChild(cursorStyle);

// ==================== PARALLAX EFFECT ====================
// Détecte le scroll pour l'effet parallax
window.addEventListener('scroll', () => {
    // Récupère la distance de scroll verticale
    const scrolled = window.pageYOffset;
    // Sélectionne les éléments qui auront l'effet parallax
    const parallaxElements = document.querySelectorAll('.home-img, .img-about');
    
    // Pour chaque élément parallax
    parallaxElements.forEach(element => {
        // Vitesse du parallax (0.5 = moitié de la vitesse du scroll normal)
        const speed = 0.5;
        // Applique la transformation (déplacement vertical)
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== LOADING ANIMATION ====================
// Quand la page est complètement chargée
window.addEventListener('load', () => {
    // Crée un élément div pour le loader
    const loader = document.createElement('div');
    // Ajoute la classe 'loader'
    loader.classList.add('loader');
    // Ajoute le spinner à l'intérieur
    loader.innerHTML = '<div class="spinner"></div>';
    
    // Crée les styles du loader
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        .loader {
            position: fixed; /* Couvre tout l'écran */
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-color); /* Fond foncé */
            display: flex; /* Flexbox pour centrer */
            justify-content: center; /* Centre horizontalement */
            align-items: center; /* Centre verticalement */
            z-index: 10000; /* Au-dessus de tout */
            transition: opacity 0.5s; /* Transition de disparition */
        }
        
        .spinner {
            width: 50px; /* Largeur du spinner */
            height: 50px; /* Hauteur du spinner */
            border: 5px solid var(--text-color); /* Bordure blanche */
            border-top-color: var(--main-color); /* Bordure du haut en cyan */
            border-radius: 50%; /* Forme circulaire */
            animation: spin 1s linear infinite; /* Animation de rotation infinie */
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); } /* Tourne de 360° */
        }
    `;
    // Ajoute les styles au head
    document.head.appendChild(loaderStyle);
    
    // Après 1 seconde
    setTimeout(() => {
        // Rend le loader transparent
        loader.style.opacity = '0';
        // Après 0.5 seconde (le temps de la transition)
        setTimeout(() => {
            // Supprime le loader du DOM
            loader.remove();
        }, 500);
    }, 1000);
});

// ==================== TICKER PAUSE ON HOVER ====================
// Sélectionne le ticker (texte défilant)
const ticker = document.querySelector('.ticker-track');
// Vérifie que le ticker existe
if (ticker) {
    // Quand la souris entre sur le ticker
    ticker.addEventListener('mouseenter', () => {
        // Met l'animation en pause
        ticker.style.animationPlayState = 'paused';
    });
    
    // Quand la souris sort du ticker
    ticker.addEventListener('mouseleave', () => {
        // Reprend l'animation
        ticker.style.animationPlayState = 'running';
    });
}

// ==================== CONSOLE MESSAGE ====================
// Affiche un message stylisé dans la console (pour les développeurs curieux)
console.log('%c👋 Welcome to my Portfolio!', 'color: #00ffff; font-size: 20px; font-weight: bold;');
console.log('%cDeveloped by Melissa Salhi', 'color: #ededed; font-size: 14px;');
console.log('%c💻 Interested in the code? Check it out on GitHub!', 'color: #00ffff; font-size: 12px;');