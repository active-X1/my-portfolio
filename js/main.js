// ===== js/script.js =====
// Complete JavaScript for Cyrus Akacha Portfolio

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== DOM ELEMENTS =====
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeSidebar = document.getElementById('closeSidebar');
    const darkToggle = document.getElementById('darkModeToggle');
    const typingEl = document.getElementById('typing');
    const profilePhoto = document.getElementById('profilePhoto');
    const currentYearSpan = document.getElementById('currentYear');
    
    // ===== SIDEBAR FUNCTIONS (Slide Animation) =====
    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeSidebarFunc() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners for sidebar
    if (menuToggle) {
        menuToggle.addEventListener('click', openSidebar);
    }
    
    if (closeSidebar) {
        closeSidebar.addEventListener('click', closeSidebarFunc);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeSidebarFunc);
    }
    
    // Close sidebar on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebarFunc();
        }
    });
    
    // ===== SIDEBAR SMOOTH SCROLL =====
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    // Close sidebar first
                    closeSidebarFunc();
                    // Small delay to allow sidebar to close
                    setTimeout(() => {
                        const headerOffset = 100;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }, 150);
                }
            }
        });
    });
    
    // ===== TYPING EFFECT =====
    if (typingEl) {
        const phrases = ['Cyrus Akacha Cyprian', 'Python Developer', 'Automation Enthusiast', 'Web Developer', 'Problem Solver'];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;
        
        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }
            
            // Check if typing is complete
            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
                return;
            }
            
            // Check if deleting is complete
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typeEffect, 300);
                return;
            }
            
            // Set typing speed
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeEffect, speed);
        }
        
        typeEffect();
    }
    
    // ===== DARK MODE WITH LOCALSTORAGE =====
    const root = document.body;
    const moonIcon = darkToggle ? darkToggle.querySelector('i') : null;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        root.classList.add('dark');
        if (moonIcon) {
            moonIcon.classList.remove('fa-moon');
            moonIcon.classList.add('fa-sun');
        }
    }
    
    if (darkToggle) {
        darkToggle.addEventListener('click', function() {
            root.classList.toggle('dark');
            const isDark = root.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            if (moonIcon) {
                if (isDark) {
                    moonIcon.classList.remove('fa-moon');
                    moonIcon.classList.add('fa-sun');
                } else {
                    moonIcon.classList.remove('fa-sun');
                    moonIcon.classList.add('fa-moon');
                }
            }
        });
    }
    
    // ===== SCROLL ANIMATIONS (Intersection Observer) =====
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Trigger check for already visible sections on load
    setTimeout(() => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                section.classList.add('visible');
            }
        });
    }, 100);
    
    // ===== CURRENT YEAR =====
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // ===== IMAGE FALLBACK HANDLING =====
    if (profilePhoto) {
        profilePhoto.addEventListener('error', function() {
            this.src = 'https://ui-avatars.com/api/?background=1cc88a&color=fff&bold=true&size=250&name=Cyrus';
            this.alt = 'Cyrus Akacha Avatar';
        });
    }
    
    // Handle all project images with fallbacks
    const projectImages = document.querySelectorAll('.project-img');
    projectImages.forEach(img => {
        img.addEventListener('error', function() {
            const parentCard = this.closest('.project-card');
            const title = parentCard ? parentCard.querySelector('p')?.innerText : 'Project';
            this.src = `https://via.placeholder.com/400x160/1cc88a/ffffff?text=${encodeURIComponent(title || 'Project')}`;
        });
    });
    
    // ===== PREVENT BODY SCROLL WHEN SIDEBAR OPEN (touch devices) =====
    sidebar?.addEventListener('touchmove', function(e) {
        if (sidebar.classList.contains('active')) {
            e.stopPropagation();
        }
    });
    
    // ===== ADD ACTIVE CLASS TO CURRENT SECTION IN SIDEBAR (optional) =====
    function updateActiveSidebarLink() {
        const scrollPosition = window.scrollY + 120;
        const sections = document.querySelectorAll('section');
        let activeId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeId = section.getAttribute('id');
            }
        });
        
        sidebarLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
                link.style.background = 'var(--accent)';
                link.style.color = 'white';
                const icon = link.querySelector('i');
                if (icon) icon.style.color = 'white';
            } else {
                link.style.background = '';
                link.style.color = '';
                const icon = link.querySelector('i');
                if (icon) icon.style.color = '';
            }
        });
    }
    
    // Throttle scroll event for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveSidebarLink();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial call
    setTimeout(updateActiveSidebarLink, 500);
    
    // ===== FIX FOR MOBILE VIEWPORT HEIGHT =====
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);
    
    // ===== CONSOLE LOG FOR DEBUG (No errors) =====
    console.log('Portfolio loaded successfully | Cyrus Akacha Cyprian');
});
