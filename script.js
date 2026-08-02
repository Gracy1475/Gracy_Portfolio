document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');

    // Only enable custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Instantly move the dot
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Smooth follow effect for the outer circle
        gsap.ticker.add(() => {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;

            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
        });

        // Function to bind hover effects
        window.bindCursorHover = () => {
            const interactives = document.querySelectorAll('a, button, .project-card');
            interactives.forEach(el => {
                // Remove existing listeners to avoid duplicates
                el.removeEventListener('mouseenter', window.cursorEnter);
                el.removeEventListener('mouseleave', window.cursorLeave);

                window.cursorEnter = () => {
                    follower.style.width = '50px';
                    follower.style.height = '50px';
                    follower.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
                };
                window.cursorLeave = () => {
                    follower.style.width = '30px';
                    follower.style.height = '30px';
                    follower.style.backgroundColor = 'transparent';
                };

                el.addEventListener('mouseenter', window.cursorEnter);
                el.addEventListener('mouseleave', window.cursorLeave);
            });
        };

        window.bindCursorHover();
    }

    // GSAP Initial Animations
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



    gsap.from('.about-content', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%'
        }
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
            trigger: '.about-section',
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
        },
        x: '-40vw',
        y: '20vh',
        width: '200px',
        height: '500px',
        backgroundColor: '#6366f1',
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
    });

    gsap.to('.shape-1', {
        scrollTrigger: {
            trigger: '.projects-section',
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
        },
        x: '-10vw',
        y: '80vh',
        width: '600px',
        height: '600px',
        backgroundColor: '#ec4899',
        borderRadius: '50%'
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
        backgroundColor: '#3b82f6',
        borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%'
    });

    // Fetch and render projects
    loadProjects();
    
    // Initialize Gravity Stars Background
    initGravityStars();
});

const priorityProjects = [
    {
        name: "Udaan – Scholarship Discovery & Application",
        description: "Designed a user-centered platform to simplify scholarship discovery and application using extensive research and usability testing. A comprehensive UI/UX Case Study.",
        tags: ["UI/UX Design", "Figma", "FigJam", "User Research"],
        link: "https://www.behance.net/gallery/246844167/Udaan",
        linkText: "View Case Study",
        icon: "behance",
        image: "assets/udaan.png"
    },
    {
        name: "FinShield – Cybersecurity Simulation",
        description: "Built a MERN platform to simulate phishing attacks with real-time analytics and secure authentication. Enhances employee awareness through gamification.",
        tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
        link: "https://github.com/Gracy1475/Finshield",
        linkText: "GitHub Repo",
        icon: "github",
        image: "assets/finshield.png"
    },
    {
        name: "SmartShala – School Management System",
        description: "Developed a role-based system for managing attendance, assignments, and academic workflows. Digitalized administrative processes with secure data handling.",
        tags: ["React.js", "Firebase", "Role-based Access"],
        link: "https://github.com/Gracy1475/SmartShala-School-Management-System",
        linkText: "GitHub Repo",
        icon: "github",
        image: "assets/smartshala.png"
    },
    {
        name: "FleetFlow – Fleet Management System",
        description: "A full-stack system tracking vehicles, drivers, trips, fuel, and maintenance. Provides real-time insights and enhances safety monitoring.",
        tags: ["JavaScript", "Full-Stack", "Odoo-GVP"],
        link: "https://github.com/Gracy1475/Odoo-GVP",
        linkText: "GitHub Repo",
        icon: "github",
        image: "assets/fleetflow.png"
    },
    {
        name: "Mind Sprint – Real-time Fitness App",
        description: "Computer vision-based fitness application using webcam input and pose estimation to analyze form, count reps, and evaluate posture in real-time.",
        tags: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
        link: "https://github.com/Gracy1475/Mind-Sprint-Hackathon",
        linkText: "GitHub Repo",
        icon: "github",
        image: "assets/mindsprint.png"
    },
    {
        name: "StackIt – Q&A Platform",
        description: "A minimal Q&A platform designed for collaborative learning. Features rich text editing, tagging, voting, accepting answers, and a notification system.",
        tags: ["Web Development", "Hackathon", "Q&A"],
        link: "https://github.com/Gracy1475/Odoo-Hackathon-2025",
        linkText: "GitHub Repo",
        icon: "github",
        image: "assets/stackit.png"
    },
    {
        name: "EcoFinds – Sustainable Marketplace",
        description: "A platform promoting sustainable consumption by enabling buying & selling of pre-owned goods. Built with search filters, cart management, and user authentication to extend product lifecycles.",
        tags: ["React.js", "Node.js", "Hackathon", "E-Commerce"],
        link: "https://github.com/Gracy1475/Odoo-X-NMIT-Hackathon-2025",
        linkText: "GitHub Repo",
        icon: "github",
        image: "assets/ecofinds.png"
    },
    {
        name: "Nexus – Career Networking Platform",
        description: "A comprehensive networking platform tailored for students and professionals to connect, build career profiles, highlight skills, and discover mentorship opportunities.",
        tags: ["Full-Stack", "JavaScript", "HTML/CSS", "Career Platform"],
        link: "https://github.com/Gracy1475/Nexus---Career-Networking-platform-",
        linkText: "GitHub Repo",
        icon: "github",
        image: "assets/nexus.png"
    },
    {
        name: "Memory Allocation Simulator",
        description: "Interactive web-based operating system simulator demonstrating memory management algorithms (First Fit, Best Fit, Worst Fit) with real-time visual memory block allocation.",
        tags: ["JavaScript", "OS Simulator", "Data Structures", "Algorithms"],
        link: "https://github.com/Gracy1475/Memory-Allocation-Simulation-",
        linkText: "GitHub Repo",
        icon: "github",
        image: "assets/memorysim.png"
    },
];

// Helper to get SVG icons
function getIcon(type) {
    if (type === 'github') {
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>`;
    }
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>`;
}

function renderCard(project) {
    const tagsHtml = `<div class="project-tags">${project.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>`;
    const imageHtml = project.image ? `<img src="${project.image}" alt="${project.name}">` : '';

    return `
        <div class="project-card" style="opacity: 0; transform: translateY(20px);">
            <div class="project-img">
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

async function loadProjects() {
    const container = document.getElementById('projects-container');
    container.innerHTML = ''; // Clear placeholders

    // 1. Render Priority Projects First
    priorityProjects.forEach(p => {
        container.insertAdjacentHTML('beforeend', renderCard(p));
    });



    // 3. Animate all rendered cards
    gsap.to('.project-card', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%'
        }
    });

    // Rebind custom cursor to new elements
    if (window.bindCursorHover) {
        window.bindCursorHover();
    }
}

// Gravity Stars Background Implementation (Vanilla JS translation of the React Component)
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
            
            // Screen wrap around
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
            
            // Gravity effect (pulls towards mouse)
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
                
                // Enhance glow when being pulled
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
        const numStars = Math.floor((width * height) / 8000); // Responsive star count
        for (let i = 0; i < numStars; i++) {
            stars.push(new Star());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < stars.length; i++) {
            stars[i].update();
        }
        
        // Draw connecting lines between close stars (Constellation effect)
        for (let a = 0; a < stars.length; a++) {
            for (let b = a; b < stars.length; b++) {
                let dx = stars[a].x - stars[b].x;
                let dy = stars[a].y - stars[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 60) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(168, 178, 209, ${0.1 - distance/600})`;
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
