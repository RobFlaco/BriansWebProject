const menuIcon = document.querySelector('#menu-icon');
const navBar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    navBar.classList.toggle('active');
}

/* added galaxy canvas */

const canvas = document.getElementById('galaxyCanvas');
const ctx = canvas.getContext('2d');
let W, H, stars = [], nebula = [];

function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}

function initStars() {
    stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * W, y: Math.random() * H,
            r: Math.random() * 1.5 + 0.3,
            speed: Math.random() * 0.3 + 0.05,
            twinkle: Math.random() * Math.PI * 2,
            twinkleSpeed: Math.random() * 0.02 + 0.005
        });
    }
    nebula = [];
    const colors = ['rgba(80,40,160,', 'rgba(30,60,160,', 'rgba(160,40,80,', 'rgba(40,100,120,'];
    for (let i = 0; i < 5; i++) {
        nebula.push({
            x: Math.random() * W, y: Math.random() * H,
            r: Math.random() * 120 + 60,
            color: colors[Math.floor(Math.random() * colors.length)],
            drift: { x: (Math.random() - 0.5) * 0.1, y: (Math.random() - 0.5) * 0.1 }
        });
    }
}

function drawFrame() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#02020f';
    ctx.fillRect(0, 0, W, H);
    nebula.forEach(n => {
        n.x += n.drift.x; n.y += n.drift.y;
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        g.addColorStop(0, n.color + '0.18)');
        g.addColorStop(1, n.color + '0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
    });
    stars.forEach(s => {
        s.twinkle += s.twinkleSpeed; s.y += s.speed;
        if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
        const alpha = 0.5 + 0.5 * Math.sin(s.twinkle);
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`; ctx.fill();
    });
    requestAnimationFrame(drawFrame);
}

resize();
initStars();
ctx.fillStyle = '#02020f';
ctx.fillRect(0, 0, W, H);
drawFrame();
window.addEventListener('resize', () => { resize(); initStars(); });

/* end galaxy canvas */