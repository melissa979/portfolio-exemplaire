// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-box, .port-box, .skill-bar, .contact-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
};

// Add fadeInUp animation to CSS if not already there
const fadeInUpStyle = document.createElement('style');
fadeInUpStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeInUpStyle);

// ==================== COUNTER ANIMATION ====================
const animateCounters = () => {
    const counters = document.querySelectorAll('.info-about1 span, .info-about2 span, .info-about3 span');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let count = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (count < target) {
                count += increment;
                counter.textContent = Math.ceil(count) + '+';
                setTimeout(updateCounter, 30);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
};

// ==================== PROGRESS BAR ANIMATION ====================
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.bar span');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width || '0%';
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
};

// ==================== TEXT REVEAL ANIMATION ====================
const textRevealAnimation = () => {
    const elements = document.querySelectorAll('.about-content h2, .main-text h2');
    
    elements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.overflow = 'hidden';
        
        const span = document.createElement('span');
        span.style.display = 'inline-block';
        span.style.animation = 'slideInLeft 0.8s ease forwards';
        span.textContent = text;
        
        element.appendChild(span);
    });
};

// ==================== MOUSE MOVE PARALLAX ====================
const parallaxEffect = () => {
    document.addEventListener('mousemove', (e) => {
        const elements = document.querySelectorAll('.home-img, .img-about img');
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;
        
        elements.forEach(element => {
            element.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });
};

// ==================== DYNAMIC BACKGROUND PARTICLES ====================
const createParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--main-color);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            opacity: ${0.2 + Math.random() * 0.5};
        `;
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
};

// ==================== IMAGE LAZY LOADING ====================
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// ==================== DARK MODE TOGGLE ====================
const darkModeToggle = () => {
    const toggle = document.createElement('button');
    toggle.innerHTML = '🌙';
    toggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--main-color);
        border: none;
        font-size: 24px;
        cursor: pointer;
        z-index: 1000;
        transition: 0.3s;
    `;
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        toggle.innerHTML = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
    });
    
    document.body.appendChild(toggle);
};

// ==================== STICKY SIDEBAR ====================
const stickySidebar = () => {
    const sidebar = document.querySelector('.social-icons');
    if (!sidebar) return;
    
    const sidebarTop = sidebar.offsetTop;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > sidebarTop) {
            sidebar.style.position = 'fixed';
            sidebar.style.top = '50%';
            sidebar.style.transform = 'translateY(-50%)';
        } else {
            sidebar.style.position = 'static';
            sidebar.style.transform = 'none';
        }
    });
};

// ==================== READING PROGRESS BAR ====================
const readingProgressBar = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--main-color);
        z-index: 10000;
        transition: width 0.3s;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// ==================== COPY TO CLIPBOARD ====================
const copyToClipboard = () => {
    const emailSpans = document.querySelectorAll('.email-info span, .contact-card span');
    
    emailSpans.forEach(span => {
        span.style.cursor = 'pointer';
        span.title = 'Click to copy';
        
        span.addEventListener('click', () => {
            const text = span.textContent;
            navigator.clipboard.writeText(text).then(() => {
                const originalText = span.textContent;
                span.textContent = 'Copied!';
                span.style.color = 'var(--main-color)';
                
                setTimeout(() => {
                    span.textContent = originalText;
                    span.style.color = '';
                }, 2000);
            });
        });
    });
};

// ==================== SCROLL SPY ====================
const scrollSpy = () => {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.navlist a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
};

// ==================== TILT EFFECT ON CARDS ====================
const tiltEffect = () => {
    const cards = document.querySelectorAll('.service-box, .port-box');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
};

// ==================== AUTO TYPE TEXT ====================
const autoTypeText = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// ==================== RIPPLE EFFECT ON BUTTONS ====================
const rippleEffect = () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    const rippleAnimation = document.createElement('style');
    rippleAnimation.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleAnimation);
};

// ==================== INITIALIZE ALL FEATURES ====================
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    animateCounters();
    animateProgressBars();
    textRevealAnimation();
    parallaxEffect();
    createParticles();
    lazyLoadImages();
    copyToClipboard();
    scrollSpy();
    tiltEffect();
    rippleEffect();
    readingProgressBar();
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll events here
}, 100));

// ==================== ACCESSIBILITY ENHANCEMENTS ====================
// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// ==================== ERROR HANDLING ====================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// ==================== CONSOLE EASTER EGG ====================
const styles = [
    'background: linear-gradient(90deg, #00ffff, #ff00ff)',
    'color: white',
    'padding: 10px 20px',
    'font-size: 16px',
    'font-weight: bold'
].join(';');

console.log('%c🚀 Portfolio Website Loaded Successfully!', styles);
console.log('%cDeveloped with ❤️ by Melissa Salhi', 'color: #00ffff; font-size: 14px;');
console.log('%cInterested in collaboration? Let\'s connect!', 'color: #ededed; font-size: 12px;');