document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar.offsetHeight;

    function handleScroll() {
        if (window.scrollY > navbarHeight) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);

    function createStars(num) {
        if (document.querySelector('.stars')) {
            return;
        }

        const starsContainer = document.createElement('div');
        starsContainer.classList.add('stars');
        
        for (let i = 0; i < num; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            const size = Math.random() * 3 + 1;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 2;

            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${left}%`;
            star.style.top = `${top}%`;
            star.style.animationDelay = `-${delay}s`;

            starsContainer.appendChild(star);
        }
        document.body.appendChild(starsContainer);

        updateStarsHeight()
    }

    function updateStarsHeight() {
        const stars = document.querySelector('.stars');
        if (stars) {
            const vh = window.innerHeight;
            const parallaxFactor = 0.55;
            stars.style.height = `${(vh * 1.5) / (1 - parallaxFactor)}px`;
        }
    }

    window.addEventListener('resize', updateStarsHeight);

    createStars(400);

    function updateStarsPosition() {
        const stars = document.querySelector('.stars');
        if (stars) {
            const parallaxFactor = 0.4; 
            const scrollY = window.scrollY;
            stars.style.transform = `translateY(${scrollY * parallaxFactor}px)`;
        }
    }

    window.addEventListener('scroll', updateStarsPosition);

    document.querySelectorAll('#navbar a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            smoothScrollTo(targetElement.offsetTop);
        });
    });

    function smoothScrollTo(targetY) {
        const duration = 1500; 
        const start = window.scrollY;
        const distance = targetY - start;
        const startTime = performance.now();

        function scroll(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1); 
            const easeInOut = progress < 0.5
                ? 2 * progress * progress
                : -1 + (4 - 2 * progress) * progress;

            window.scrollTo(0, start + distance * easeInOut);
            
            if (progress < 1) {
                requestAnimationFrame(scroll);
            }
        }

        requestAnimationFrame(scroll);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const experienceContainer = document.querySelector('.experience-container');

    function generateExperienceHTML(exp) {
        return `
            <div class="experience-item">
                <div class="experience-details">
                    <div class="experience-time">${exp.time}</div>
                    <div class="experience-title">${exp.title}</div>
                    <div class="experience-place">${exp.place}</div>
                </div>
                <div class="experience-description">
                    ${exp.description}
                </div>
            </div>
        `;
    }

    experiences.forEach(exp => {
        const experienceHTML = generateExperienceHTML(exp);
        experienceContainer.innerHTML += experienceHTML;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const projectContainer = document.querySelector('.project-container');

    function generateProjectHTML(project) {
        return `
            <div class="project-item">
                <a href="${project.link}" class="project-title" target="_blank">${project.name}</a>
                <div class="project-description">
                    ${project.description}
                </div>
            </div>
        `;
    }

    projects.forEach(exp => {
        const projectHTML = generateProjectHTML(exp);
        projectContainer.innerHTML += projectHTML;
    });
});


