document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Close nav drawer on link click
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // 2. Custom Cursor Logic (Only on fine pointers/desktop)
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');

    if (window.matchMedia("(pointer: fine)").matches && cursor && follower) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        gsap.ticker.add(() => {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;

            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
        });

        window.bindCursorHover = () => {
            const interactables = document.querySelectorAll('a, button, .project-card, .profile-card, .contact-card, .filter-tab');
            interactables.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    follower.style.transform = 'translate(-50%, -50%) scale(1.6)';
                    follower.style.borderColor = '#a855f7';
                    follower.style.backgroundColor = 'rgba(168, 85, 247, 0.08)';
                });
                el.addEventListener('mouseleave', () => {
                    follower.style.transform = 'translate(-50%, -50%) scale(1)';
                    follower.style.borderColor = 'rgba(99, 102, 241, 0.5)';
                    follower.style.backgroundColor = 'transparent';
                });
            });
        };

        window.bindCursorHover();
    }

    // 3. GSAP Entrance Animations
    gsap.from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
    });

    gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out'
    });

    // Morphing Background Blobs on scroll
    gsap.to('.shape-1', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
        },
        x: '50vw',
        y: '40vh',
        width: '500px',
        height: '300px',
        backgroundColor: '#a855f7',
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
    });

    gsap.to('.shape-2', {
        scrollTrigger: {
            trigger: '.projects-section',
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
        },
        x: '40vw',
        y: '60vh',
        width: '400px',
        height: '400px',
        backgroundColor: '#38bdf8',
        borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%'
    });

    // 4. Initialize Projects & Category Filter Engine
    initProjectsEngine();

    // 5. Initialize Gravity Stars Background
    initGravityStars();
});

// Projects Ecosystem Data (Curated & Categorized)
const priorityProjects = [
    {
        id: "udaan",
        name: "Udaan – Scholarship Discovery & Application",
        description: "Designed a user-centered platform to simplify scholarship discovery and application using extensive research and usability testing. A comprehensive UI/UX Case Study.",
        tags: ["UI/UX Design", "Figma", "FigJam", "User Research"],
        link: "https://www.behance.net/gallery/246844167/Udaan",
        linkText: "View Case Study",
        icon: "behance",
        image: "assets/udaan.png",
        category: "uiux",
        badge: "UI/UX Case Study"
    },
    {
        id: "finshield",
        name: "FinShield – Cybersecurity Simulation Platform",
        description: "Built a MERN platform to simulate phishing attacks with real-time analytics and secure authentication. Enhances employee awareness through gamification and risk tracking.",
        tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
        link: "https://github.com/Gracy1475/Finshield",
        linkText: "GitHub Repo",
        icon: "github",
        image: "assets/finshield.png",
        category: "fullstack",
        badge: "Cybersecurity Platform"
    },
    {
        id: "smartshala",
        name: "SmartShala – School Management System",
        description: "Developed a role-based system for managing attendance, assignments, and academic workflows. Digitalized administrative processes with secure Firebase data handling.",
        tags: ["React.js", "Firebase", "Role-based Access"],
        link: "https://github.com/Gracy1475/SmartShala-School-Management-System",
        linkText: "GitHub Repo",
        icon: "github",
        image: "assets/smartshala.png",
        category: "fullstack",
        badge: "EdTech Platform"
    },
    {
        id: "fleetflow",
        name: "FleetFlow – Fleet Management System",
        description: "A full-stack system tracking vehicles, drivers, trips, fuel, and maintenance. Provides real-time insights and enhances safety monitoring with a centralized dashboard.",
        tags: ["JavaScript", "Full-Stack", "Odoo-GVP"],
        link: "https://github.com/Gracy1475/Odoo-GVP",
        linkText: "GitHub Repo",
        icon: "github",
        image: "assets/fleetflow.png",
        category: "fullstack",
        badge: "Fleet Logistics"
    },
    {
        id: "mindsprint",
        name: "Mind Sprint – Real-time Computer Vision Fitness App",
        description: "Computer vision-based fitness application using webcam input and pose estimation to analyze exercise form, count reps, and evaluate posture in real-time.",
        tags: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
        link: "https://github.com/Gracy1475/Mind-Sprint-Hackathon",
        linkText: "GitHub Repo",
        icon: "github",
        image: "assets/mindsprint.png",
        category: "aicv",
        badge: "AI & Pose Estimation"
    },
    {
        id: "stackit",
        name: "StackIt – Developer Q&A Platform",
        description: "A minimal Q&A platform designed for collaborative learning. Features rich text editing, tagging, voting, accepting answers, and real-time notifications.",
        tags: ["Web Development", "Hackathon", "Q&A"],
        link: "https://github.com/Gracy1475/Odoo-Hackathon-2025",
        linkText: "GitHub Repo",
        icon: "github",
        image: "assets/stackit.png",
        category: "fullstack",
        badge: "Community Forum"
    },
    {
        id: "ecofinds",
        name: "EcoFinds – Sustainable Consumption Marketplace",
        description: "A platform promoting sustainable consumption by enabling buying & selling of pre-owned goods. Built with search filters, cart management, and user authentication.",
        tags: ["React.js", "Node.js", "Hackathon", "E-Commerce"],
        link: "https://github.com/Gracy1475/Odoo-X-NMIT-Hackathon-2025",
        linkText: "GitHub Repo",
        icon: "github",
        image: "assets/ecofinds.png",
        category: "fullstack",
        badge: "Sustainable E-Commerce"
    },
    {
        id: "nexus",
        name: "Nexus – Student Career Networking Platform",
        description: "A comprehensive networking platform tailored for students and professionals to connect, build career profiles, highlight skills, and discover mentorship opportunities.",
        tags: ["Full-Stack", "JavaScript", "HTML/CSS", "Career Platform"],
        link: "https://github.com/Gracy1475/Nexus---Career-Networking-platform-",
        linkText: "GitHub Repo",
        icon: "github",
        image: "assets/nexus.png",
        category: "fullstack",
        badge: "Networking Portal"
    },
    {
        id: "memorysim",
        name: "Memory Allocation Simulator",
        description: "Interactive web-based operating system simulator demonstrating memory management algorithms (First Fit, Best Fit, Worst Fit) with real-time visual block allocation.",
        tags: ["JavaScript", "OS Simulator", "Data Structures", "Algorithms"],
        link: "https://github.com/Gracy1475/Memory-Allocation-Simulation-",
        linkText: "GitHub Repo",
        icon: "github",
        image: "assets/memorysim.png",
        category: "systems",
        badge: "OS Simulator"
    }
];

// Helper to get SVG icons
function getIcon(type) {
    if (type === 'github') {
        return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>`;
    }
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>`;
}

// Render Card Function
function renderCard(project) {
    const tagsHtml = `<div class="project-tags">${project.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>`;
    const imageHtml = project.image ? `<img src="${project.image}" alt="${project.name}">` : '';

    return `
        <div class="project-card" data-category="${project.category}">
            <div class="project-img">
                <span class="project-badge">${project.badge}</span>
                ${imageHtml}
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.name}</h3>
                <p class="project-desc">${project.description}</p>
                ${tagsHtml}
                <div class="project-links">
                    <a href="${project.link}" target="_blank" rel="noopener noreferrer">
                        ${getIcon(project.icon)}
                        ${project.linkText}
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Projects Filter & Search Engine
function initProjectsEngine() {
    const container = document.getElementById('projects-container');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const searchInput = document.getElementById('project-search');
    const countAll = document.getElementById('count-all');

    if (!container) return;

    let activeCategory = 'all';
    let searchQuery = '';

    function renderFilteredProjects() {
        container.innerHTML = '';

        const filtered = priorityProjects.filter(p => {
            const matchesCategory = (activeCategory === 'all') || (p.category === activeCategory);
            const matchesSearch = searchQuery === '' || 
                p.name.toLowerCase().includes(searchQuery) ||
                p.description.toLowerCase().includes(searchQuery) ||
                p.tags.some(t => t.toLowerCase().includes(searchQuery));
            
            return matchesCategory && matchesSearch;
        });

        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
                    <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">No projects found matching "${searchQuery}"</p>
                    <p style="font-size: 0.9rem;">Try clearing your search or switching categories.</p>
                </div>
            `;
            return;
        }

        filtered.forEach(p => {
            container.insertAdjacentHTML('beforeend', renderCard(p));
        });

        // Rebind cursor hover states
        if (window.bindCursorHover) {
            window.bindCursorHover();
        }

        // Animate newly inserted cards
        gsap.fromTo('.project-card', 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
        );
    }

    // Initial render
    renderFilteredProjects();

    // Category Tab Click Event
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            activeCategory = tab.getAttribute('data-category');
            renderFilteredProjects();
        });
    });

    // Real-time Search Input Event
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim().toLowerCase();
            renderFilteredProjects();
        });
    }

    if (countAll) {
        countAll.textContent = priorityProjects.length;
    }
}

// Gravity Stars Background Implementation
function initGravityStars() {
    const canvas = document.getElementById('gravityStars');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let stars = [];
    
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    const mouse = { x: -1000, y: -1000 };
    
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    class Star {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 1.5 + 0.5;
            this.density = (Math.random() * 20) + 1;
            this.velocity = {
                x: (Math.random() - 0.5) * 0.3,
                y: (Math.random() - 0.5) * 0.3
            };
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        
        update() {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
            
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            let pullDistance = 250;
            if (distance < pullDistance) {
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let force = (pullDistance - distance) / pullDistance;
                
                let directionX = forceDirectionX * force * this.density * 0.08;
                let directionY = forceDirectionY * force * this.density * 0.08;
                
                this.x += directionX;
                this.y += directionY;
                
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#6366f1';
            } else {
                ctx.shadowBlur = 0;
            }
            
            this.draw();
        }
    }
    
    function init() {
        stars = [];
        const numStars = Math.floor((width * height) / 8500);
        for (let i = 0; i < numStars; i++) {
            stars.push(new Star());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < stars.length; i++) {
            stars[i].update();
        }
        
        for (let a = 0; a < stars.length; a++) {
            for (let b = a; b < stars.length; b++) {
                let dx = stars[a].x - stars[b].x;
                let dy = stars[a].y - stars[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 60) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(168, 178, 209, ${0.08 - distance/750})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(stars[a].x, stars[a].y);
                    ctx.lineTo(stars[b].x, stars[b].y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
}
