const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');


menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');


    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});


navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});


document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});



const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);


const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;


    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(75, 63, 53, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(75, 63, 53, 0.1)';
    }

    lastScroll = currentScroll;
});


const skillFills = document.querySelectorAll('.skill-fill');

const animateSkills = () => {
    skillFills.forEach(skill => {
        const skillTop = skill.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (skillTop < windowHeight - 100 && !skill.classList.contains('animated')) {
            const skillValue = skill.getAttribute('data-skill');
            skill.style.width = skillValue + '%';
            skill.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);



const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);


const animatedElements = document.querySelectorAll('.why-card, .project-card, .skill-category, .timeline-item, .contact-item');
animatedElements.forEach(el => {
    observer.observe(el);
});



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


const heroVisual = document.querySelector('.hero-visual');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;

    if (heroVisual) {
        heroVisual.style.transform = `translateY(${rate}px)`;
    }
});



const tiltCards = document.querySelectorAll('.card-tilt, .why-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});



const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const techBadges = card.querySelectorAll('.tech-badge');
        techBadges.forEach((badge, index) => {
            setTimeout(() => {
                badge.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    badge.style.transform = 'scale(1)';
                }, 150);
            }, index * 50);
        });
    });
});


const timelineItems = document.querySelectorAll('.timeline-item');

const animateTimeline = () => {
    timelineItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (itemTop < windowHeight - 100) {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        }
    });
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
    });

    window.addEventListener('scroll', animateTimeline);
    window.addEventListener('load', animateTimeline);



    const updateFooterYear = () => {
        const footer = document.querySelector('.footer p');
        if (footer) {
            const currentYear = new Date().getFullYear();
            footer.innerHTML = footer.innerHTML.replace('2024', currentYear);
        }
    };

    updateFooterYear();



    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });


    const createCursorTrail = () => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: rgba(212, 165, 116, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;
        document.body.appendChild(trail);

        const animateTrail = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;

            trail.style.left = cursorX + 'px';
            trail.style.top = cursorY + 'px';

            requestAnimationFrame(animateTrail);
        };

        animateTrail();
    };

    if (window.innerWidth > 768) {
        createCursorTrail();
    }



    window.addEventListener('load', () => {
        // Add fade-in to hero on load
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.opacity = '0';
            setTimeout(() => {
                hero.style.transition = 'opacity 1s ease-out';
                hero.style.opacity = '1';
            }, 100);
        }


        animateSkills();
        animateTimeline();
    });




    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }


    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }


    const throttledHighlight = throttle(highlightNavigation, 100);
    const throttledSkillAnimate = throttle(animateSkills, 100);
    const throttledTimelineAnimate = throttle(animateTimeline, 100);

    window.removeEventListener('scroll', highlightNavigation);
    window.removeEventListener('scroll', animateSkills);
    window.removeEventListener('scroll', animateTimeline);

    window.addEventListener('scroll', throttledHighlight);
    window.addEventListener('scroll', throttledSkillAnimate);
    window.addEventListener('scroll', throttledTimelineAnimate);


    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join('') === konamiSequence.join('')) {
            activateEasterEgg();
        }
    });

    function activateEasterEgg() {
        document.body.style.animation = 'rainbow 2s infinite';

        const style = document.createElement('style');
        style.innerHTML = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
        document.head.appendChild(style);

        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);

        console.log('🎉 Gefeliciteerd! Je hebt de easter egg gevonden!');
    }



    const skipLink = document.createElement('a');
    skipLink.href = '#intro';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Spring naar hoofdinhoud';
    skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--beige-800);
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 10000;
`;
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);


    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                element.click();
            }
        });
    });


    sections.forEach(section => {
        section.setAttribute('role', 'region');
        const heading = section.querySelector('h2');
        if (heading) {
            const id = 'heading-' + Math.random().toString(36).substr(2, 9);
            heading.id = id;
            section.setAttribute('aria-labelledby', id);
        }
    });

    console.log('✨ Portfolio website geladen! Gemaakt met HTML, CSS & JavaScript.');
    console.log('💡 Tip: Probeer de Konami Code voor een verrassing!');}