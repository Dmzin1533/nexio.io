// Variáveis globais
let comments = [];
let isScrolling = false;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeScrollAnimations();
    initializeHeader();
    initializeMobileMenu();
    initializeFeedbackForm();
    initializeWhatsAppButton();
    initializeCEOCards();
    initializeSmoothScrolling();
    loadComments();
    
    // Initialize Projects Carousel
    new ProjectsCarousel();
});

// Sistema de tema
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Aplicar tema salvo
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        updateThemeIcon(true);
    }
    
    // Event listener para toggle de tema
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    if (isDark) {
        // Ícone de sol (modo claro)
        themeIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>`;
    } else {
        // Ícone de lua (modo escuro)
        themeIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>`;
    }
}

// Animações de scroll com blur reveal
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adicionar delay baseado na posição do elemento
                const delay = Math.random() * 200; // Delay aleatório para efeito mais natural
                
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                    
                    // Adicionar animação especial para textos da seção sobre
                    if (entry.target.classList.contains('about-text')) {
                        entry.target.classList.add('animate-in');
                    }
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos com animação e adicionar classes de direção aleatórias
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const directions = ['from-left', 'from-right', 'from-bottom', 'from-top', 'scale-in'];
    
    animatedElements.forEach((el, index) => {
        // Adicionar direção baseada no tipo de elemento
        if (el.classList.contains('section-title')) {
            el.classList.add('from-bottom');
        } else if (el.classList.contains('hero-title')) {
            el.classList.add('scale-in');
        } else if (index % 2 === 0) {
            el.classList.add('from-left');
        } else {
            el.classList.add('from-right');
        }
        
        observer.observe(el);
    });
}

// Header com efeito de scroll
function initializeHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Menu mobile
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

// Scroll suave para seções
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Cards dos CEOs com efeito tilt
function initializeCEOCards() {
    const ceoCards = document.querySelectorAll('.ceo-card[data-tilt]');
    
    ceoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg) translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
    });
}

// Sistema de feedback/comentários
function initializeFeedbackForm() {
    const form = document.getElementById('feedback-form');
    const nameInput = document.getElementById('name');
    const commentInput = document.getElementById('comment');
    const charCounter = document.getElementById('char-counter');
    const submitBtn = document.getElementById('submit-btn');
    const messageDiv = document.getElementById('form-message');
    
    // Contador de caracteres
    commentInput.addEventListener('input', () => {
        const currentLength = commentInput.value.length;
        const maxLength = 1000;
        document.getElementById('char-count').textContent = currentLength;
        
        if (currentLength > maxLength) {
            charCounter.style.color = '#dc2626';
            submitBtn.disabled = true;
        } else {
            charCounter.style.color = '';
            submitBtn.disabled = false;
        }
    });
    
    // Submissão do formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = nameInput.value.trim();
        const comment = commentInput.value.trim();
        
        if (!name || !comment) {
            showMessage('Por favor, preencha todos os campos.', 'error');
            return;
        }
        
        if (comment.length > 1000) {
            showMessage('O comentário deve ter no máximo 1000 caracteres.', 'error');
            return;
        }
        
        // Simular envio
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        setTimeout(() => {
            addComment(name, comment);
            form.reset();
            document.getElementById('char-count').textContent = '0';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Comentário';
            showMessage('Comentário enviado com sucesso!', 'success');
        }, 1000);
    });
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('form-message');
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

function addComment(name, text) {
    const comment = {
        id: Date.now(),
        name: name,
        text: text,
        date: new Date().toISOString()
    };
    
    comments.unshift(comment);
    saveComments();
    renderComments();
}

function loadComments() {
    const savedComments = localStorage.getItem('nexio-comments');
    if (savedComments) {
        comments = JSON.parse(savedComments);
    }
    renderComments();
}

function saveComments() {
    localStorage.setItem('nexio-comments', JSON.stringify(comments));
}

function renderComments() {
    const commentsList = document.getElementById('comments-list');
    
    if (comments.length === 0) {
        commentsList.innerHTML = '<div class="no-comments">Ainda não há comentários. Seja o primeiro a comentar!</div>';
        return;
    }
    
    commentsList.innerHTML = comments.map(comment => `
        <div class="comment-item animate-on-scroll">
            <div class="comment-header">
                <div class="comment-name">${escapeHtml(comment.name)}</div>
                <div class="comment-date">${formatDate(comment.date)}</div>
            </div>
            <div class="comment-text">${escapeHtml(comment.text)}</div>
        </div>
    `).join('');
    
    // Reinicializar animações para novos comentários
    initializeScrollAnimations();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        return 'Hoje';
    } else if (diffDays === 2) {
        return 'Ontem';
    } else if (diffDays <= 7) {
        return `${diffDays - 1} dias atrás`;
    } else {
        return date.toLocaleDateString('pt-BR');
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Botão flutuante do WhatsApp
function initializeWhatsAppButton() {
    const whatsappBtns = document.querySelectorAll('.whatsapp-btn, .whatsapp-btn-float');
    const whatsappNumber = '5511999999999'; // Substitua pelo número real
    
    whatsappBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços da Nexio.');
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
            window.open(whatsappUrl, '_blank');
        });
    });
}

// Funções para links dos CEOs
function openDavidPortfolio() {
    window.open('https://github.com/david', '_blank'); // Substitua pela URL real
}

function openJoaoPortfolio() {
    window.open('https://github.com/joao', '_blank'); // Substitua pela URL real
}

// Função para botão de contato por email
function openEmailContact() {
    const email = 'contato@nexio.com'; // Substitua pelo email real
    const subject = encodeURIComponent('Contato - Site Nexio');
    const body = encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços da Nexio.');
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}

// Função para scroll para seção específica
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Animações dos separadores
function initializeSeparatorAnimations() {
    // As animações dos separadores são controladas por CSS
    // Esta função pode ser expandida para animações mais complexas se necessário
    
    const separators = document.querySelectorAll('.separator');
    
    const separatorObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.5
    });
    
    separators.forEach(separator => {
        separatorObserver.observe(separator);
    });
}

// Função para detectar dispositivos móveis
function isMobile() {
    return window.innerWidth <= 768;
}

// Função para otimizar performance em dispositivos móveis
function optimizeForMobile() {
    if (isMobile()) {
        // Reduzir animações em dispositivos móveis para melhor performance
        document.body.classList.add('mobile-optimized');
    }
}

// Event listeners para redimensionamento da janela
window.addEventListener('resize', () => {
    optimizeForMobile();
});

// Inicializar otimizações
optimizeForMobile();
initializeSeparatorAnimations();

// Função para preloader (opcional)
function initializePreloader() {
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }
    });
}

// Função para lazy loading de imagens (se necessário)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Função para analytics simples (opcional)
function trackEvent(eventName, eventData = {}) {
    // Implementar tracking de eventos se necessário
    console.log('Event tracked:', eventName, eventData);
}

// Função para validação de formulário mais robusta
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (!formData.comment || formData.comment.length < 10) {
        errors.push('Comentário deve ter pelo menos 10 caracteres');
    }
    
    if (formData.comment && formData.comment.length > 500) {
        errors.push('Comentário deve ter no máximo 500 caracteres');
    }
    
    return errors;
}

// Função para debounce (otimização de performance)
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

// Aplicar debounce ao scroll para melhor performance
const debouncedScrollHandler = debounce(() => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, 10);

// Substituir o event listener de scroll original
window.removeEventListener('scroll', initializeHeader);
window.addEventListener('scroll', debouncedScrollHandler);

// Função para easter egg (opcional)
function initializeEasterEgg() {
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Easter egg ativado!
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 10000);
        }
    });
}

// Inicializar easter egg
initializeEasterEgg();

// Nexio Functions
const nexioFunctions = {
    openDavidPortfolio: () => {
        window.open('https://david-portfolio.nexio.com', '_blank');
    },
    
    openJoaoPortfolio: () => {
        window.open('https://joao-portfolio.nexio.com', '_blank');
    },
    
    openWhatsApp: () => {
        window.open('https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre os serviços da Nexio.', '_blank');
    },
    
    sendEmail: () => {
        window.location.href = 'mailto:contato@nexio.com?subject=Interesse nos serviços&body=Olá! Gostaria de saber mais sobre os serviços da Nexio.';
    }
};

// Projects Carousel
class ProjectsCarousel {
    constructor() {
        this.carousel = document.getElementById('projectsCarousel');
        this.slides = document.querySelectorAll('.project-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentSlide = 0;
        
        this.init();
    }
    
    init() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Click on slide to open project
        this.slides.forEach(slide => {
            slide.addEventListener('click', () => {
                if (slide.classList.contains('active')) {
                    const url = slide.dataset.url;
                    if (url) {
                        window.open(url, '_blank');
                    }
                }
            });
        });
        
        // Auto-play (optional)
        this.startAutoPlay();
    }
    
    goToSlide(index) {
        // Remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        // Update current slide
        this.currentSlide = index;
        
        // Add active class to new slide and indicator
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
        
        // Move carousel
        const translateX = -this.currentSlide * 100;
        this.carousel.style.transform = `translateX(${translateX}%)`;
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
}

// Exportar funções para uso global
window.nexioFunctions = nexioFunctions;