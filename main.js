function initTypingAnimation() {
    const typedTextElement = document.getElementById('typed-text');
    if (!typedTextElement) return;

    const texts = [
        "Menciptakan desain sesuai kebutuhan klien",
        "Mendesain UI yang user-centered",
        "Membuat identitas brand yang memukau",
        "Membangun solusi web modern"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } 

        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// Load Konten
document.addEventListener('DOMContentLoaded', function() {
    initTypingAnimation();

    const projectsContainer = document.getElementById('projects-container');
    
    function createProjectCard(project) {
        const categoriesStr = project.categories.join(' ');
        const descriptionStr = project.description.toLowerCase();
        
        const tagsHTML = project.tags.map(tag => 
            `<span class="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">${tag}</span>`
        ).join('');
        
        let imageHTML;
        if (project.image) {
            imageHTML = `<img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover">`;
        } else {
            imageHTML = `
                <div class="h-64 bg-gradient-to-br from-${project.gradientFrom} to-${project.gradientTo} flex items-center justify-center">
                    <i class="fas ${project.icon} text-white text-6xl"></i>
                </div>
            `;
        }
        
        return `
            <div class="project-card bg-dark rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 cursor-pointer" 
                 data-category="${categoriesStr}" 
                 data-title="${project.title}" 
                 data-description="${descriptionStr}">
                ${imageHTML}
                <div class="p-6">
                    <h3 class="text-2xl font-semibold mb-3">${project.title}</h3>
                    <p class="text-gray-400 mb-4">${project.description}</p>
                    <div class="flex flex-wrap gap-2">
                        ${tagsHTML}
                    </div>
                </div>
            </div>
        `;
    }
    
    if (typeof projectsData !== 'undefined' && projectsContainer) {
        projectsContainer.innerHTML = projectsData.map(project => createProjectCard(project)).join('');
    }

    // Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCount = document.getElementById('project-count');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                filterButtons.forEach(btn => {
                    btn.classList.remove('active', 'bg-primary', 'text-white');
                    btn.classList.add('bg-dark', 'text-gray-400');
                });
                this.classList.add('active', 'bg-primary', 'text-white');
                this.classList.remove('bg-dark', 'text-gray-400');

                filterProjects(filter);
            });
        });
    }

    // Fungsi filter
    function filterProjects(category) {
       
        const cards = document.querySelectorAll('.project-card');
        let visibleCount = 0;
        
        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            const matchesCategory = category === 'all' || cardCategory.includes(category);
            
            if (matchesCategory) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });
        
        if (projectCount) {
            projectCount.textContent = visibleCount;
        }
    }
    
    if (projectCount && typeof projectsData !== 'undefined') {
        projectCount.textContent = projectsData.length;
    }

    // Tab Profil
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');

                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.classList.add('text-gray-400');
                });
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });

                this.classList.add('active');
                this.classList.remove('text-gray-400');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Scroll Smooth
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Shadow
    const navbar = document.querySelector('nav');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-lg');
            } else {
                navbar.classList.remove('shadow-lg');
            }
        });
    }

    // Card Hover
    const allCards = document.querySelectorAll('.bg-dark.rounded-2xl');
    allCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
        });
    });

    // Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Toggle Detail
    window.toggleDetail = function(id) {
        const detail = document.getElementById(id);
        if (!detail) return;
        
        detail.classList.toggle('active');
        
        const button = detail.previousElementSibling;
        const icon = button.querySelector('i');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    };

    // Form Handling
    const orderForm = document.getElementById('order-form');
    const successMessage = document.getElementById('success-message');

    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(orderForm);
            const data = Object.fromEntries(formData);
            
            console.log('Form submitted:', data);

            orderForm.classList.add('hidden');
            successMessage.classList.remove('hidden');

            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    // Reset Form
    window.resetForm = function() {
        const orderForm = document.getElementById('order-form');
        const successMessage = document.getElementById('success-message');
        
        if (orderForm && successMessage) {
            orderForm.reset();
            orderForm.classList.remove('hidden');
            successMessage.classList.add('hidden');

            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
});