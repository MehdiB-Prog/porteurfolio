const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 300;
const mouse = {
    x: null,
    y: null,
    radius: 120 // zone de répulsion autour de la souris
};

// Créer les particules
for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 1.3,
        speedY: (Math.random() - 0.5) * 1.3
    });
}

// Suivi souris
window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Animation
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {

        // Calcul distance souris
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Répulsion si souris proche
        if (dist < mouse.radius) {
            const forceDirX = dx / dist;
            const forceDirY = dy / dist;

            const maxForce = 4;
            p.x += forceDirX * maxForce;
            p.y += forceDirY * maxForce;
        }

        // Mouvements normaux
        p.x += p.speedX;
        p.y += p.speedY;

        // Rebond quand touche bord écran
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        // Dessin du point
        ctx.fillStyle = "#6bccff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

// Resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

