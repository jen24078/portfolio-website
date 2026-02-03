// ============================================
// CYBERSECURITY PORTFOLIO - INTERACTIVE SCRIPT
// ============================================

// ============================================
// TERMINAL TYPING ANIMATION
// ============================================
const terminalContent = document.getElementById('terminal-content');

const terminalSequence = [
    { type: 'command', text: 'whoami', delay: 100 },
    { type: 'output', text: 'Brayden Jenson', delay: 800 },
    { type: 'command', text: 'cat profile.txt', delay: 1200 },
    { type: 'output', text: 'Role: Cybersecurity Professional', delay: 1800 },
    { type: 'output', text: 'Specialization: Penetration Testing & Security Architecture', delay: 2200 },
    { type: 'output', text: 'Status: Available for opportunities', delay: 2600 },
    { type: 'command', text: 'ls -la skills/', delay: 3200 },
    { type: 'output', text: 'drwxr-xr-x  penetration_testing/', delay: 3800 },
    { type: 'output', text: 'drwxr-xr-x  threat_analysis/', delay: 4100 },
    { type: 'output', text: 'drwxr-xr-x  security_automation/', delay: 4400 },
    { type: 'output', text: 'drwxr-xr-x  incident_response/', delay: 4700 },
    { type: 'command', text: 'echo "Welcome to my portfolio"', delay: 5400 },
    { type: 'output', text: 'Welcome to my portfolio', delay: 6000 },
    { type: 'cursor', text: '', delay: 6500 }
];

function createTerminalLine(type, text) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    
    if (type === 'command') {
        line.innerHTML = `<span class="terminal-prompt">root@portfolio:~$</span><span class="terminal-command">${text}</span>`;
    } else if (type === 'output') {
        line.innerHTML = `<span class="terminal-output">${text}</span>`;
    } else if (type === 'cursor') {
        line.innerHTML = `<span class="terminal-prompt">root@portfolio:~$</span><span class="terminal-cursor"></span>`;
    }
    
    return line;
}

function animateTerminal() {
    terminalSequence.forEach((item, index) => {
        setTimeout(() => {
            const line = createTerminalLine(item.type, item.text);
            terminalContent.appendChild(line);
            
            // Scroll to bottom
            terminalContent.scrollTop = terminalContent.scrollHeight;
        }, item.delay);
    });
}

// Start terminal animation when page loads
window.addEventListener('load', () => {
    setTimeout(animateTerminal, 500);
});

// ============================================
// NETWORK VISUALIZATION BACKGROUND
// ============================================
const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Network nodes
class Node {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 65, 0.6)';
        ctx.fill();
    }
}

// Create nodes
const nodes = [];
const nodeCount = 80;
for (let i = 0; i < nodeCount; i++) {
    nodes.push(new Node());
}

// Draw connections between nearby nodes
function drawConnections() {
    const maxDistance = 150;
    
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
                const opacity = (1 - distance / maxDistance) * 0.3;
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animateNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw nodes
    nodes.forEach(node => {
        node.update();
        node.draw();
    });
    
    // Draw connections
    drawConnections();
    
    requestAnimationFrame(animateNetwork);
}

animateNetwork();

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.stat-card, .skill-category, .project-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ============================================
// ENCRYPTED TEXT REVEAL
// ============================================
const encryptedTexts = document.querySelectorAll('.encrypted-text');

const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('decrypted');
            }, 200);
        }
    });
}, observerOptions);

encryptedTexts.forEach(text => observer.observe(text));

// ============================================
// NAVIGATION ACTIVE STATE
// ============================================
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// GLITCH EFFECT ON HOVER
// ============================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const title = card.querySelector('h3');
        title.classList.add('glitch');
        
        setTimeout(() => {
            title.classList.remove('glitch');
        }, 300);
    });
});

// ============================================
// STAT COUNTER ANIMATION
// ============================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const targetText = statNumber.textContent;
            
            // Extract number from text (e.g., "500+" -> 500)
            const match = targetText.match(/\d+/);
            if (match) {
                const targetValue = parseInt(match[0]);
                const suffix = targetText.replace(/\d+/, '');
                
                let current = 0;
                const increment = targetValue / 100;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= targetValue) {
                        statNumber.textContent = targetValue + suffix;
                        clearInterval(timer);
                    } else {
                        statNumber.textContent = Math.floor(current) + suffix;
                    }
                }, 20);
            }
            
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// ============================================
// MOUSE PARTICLE EFFECT
// ============================================
let particles = [];
const maxParticles = 50;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.life = 100;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 2;
        if (this.size > 0.2) this.size -= 0.05;
    }
    
    draw() {
        ctx.fillStyle = `rgba(0, 255, 65, ${this.life / 100})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

let mouseX = 0;
let mouseY = 0;
let isMouseMoving = false;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;
    
    // Create particle occasionally
    if (Math.random() < 0.3 && particles.length < maxParticles) {
        particles.push(new Particle(mouseX, mouseY));
    }
});

function animateParticles() {
    // Update and draw particles
    particles = particles.filter(particle => particle.life > 0);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
}

// Integrate particle animation with network animation
const originalAnimateNetwork = animateNetwork;
function animateNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw nodes
    nodes.forEach(node => {
        node.update();
        node.draw();
    });
    
    // Draw connections
    drawConnections();
    
    // Draw particles
    animateParticles();
    
    requestAnimationFrame(animateNetwork);
}

// ============================================
// RANDOM GLITCH EFFECT ON TERMINAL
// ============================================
function randomGlitch() {
    const terminal = document.querySelector('.terminal-window');
    if (terminal && Math.random() < 0.05) {
        terminal.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        setTimeout(() => {
            terminal.style.transform = 'translate(0, 0)';
        }, 50);
    }
}

setInterval(randomGlitch, 3000);

// ============================================
// SKILL ITEM PROGRESS BARS (OPTIONAL ENHANCEMENT)
// ============================================
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.05}s`;
});

// ============================================
// KEYBOARD SHORTCUTS (EASTER EGG)
// ============================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg: Matrix rain effect
        document.body.style.background = 'linear-gradient(180deg, #000000 0%, #001a00 100%)';
        alert('🎉 Konami Code Activated! You found the easter egg!');
        
        // Reset after 3 seconds
        setTimeout(() => {
            document.body.style.background = '';
        }, 3000);
    }
});

// ============================================
// CONSOLE MESSAGE (EASTER EGG)
// ============================================
console.log('%c🔐 SECURITY ALERT 🔐', 'color: #00ff41; font-size: 20px; font-weight: bold;');
console.log('%cWelcome, security researcher!', 'color: #00d9ff; font-size: 14px;');
console.log('%cIf you\'re reading this, you\'re probably curious about security.', 'color: #e0e7ff; font-size: 12px;');
console.log('%cFeel free to explore the code, but remember: with great power comes great responsibility!', 'color: #94a3b8; font-size: 12px;');
console.log('%c\nInterested in working together? Let\'s connect!', 'color: #00ff41; font-size: 12px; font-weight: bold;');

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        updateActiveNav();
    });
});

// Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause heavy animations
        canvas.style.opacity = '0';
    } else {
        canvas.style.opacity = '0.3';
    }
});

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================
// Add keyboard navigation for project cards
projectCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const link = card.querySelector('.project-link');
            if (link) link.click();
        }
    });
});

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

console.log('%c✅ Portfolio initialized successfully!', 'color: #00ff41; font-size: 12px; font-weight: bold;');
