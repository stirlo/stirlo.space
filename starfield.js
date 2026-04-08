document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');

    const NUM_STARS = 2000;
    const CENTER_DEAD_ZONE = 40;
    let stars = [];
    let warpMode = false;
    let warpStrength = 0; // 0-1

    // Star colour types — realistic stellar distribution
    const STAR_TYPES = [
        { prob: 0.76, r: 255, g: 244, b: 232 }, // M-type: orange-white (most common)
        { prob: 0.12, r: 255, g: 255, b: 255 }, // K-type: white
        { prob: 0.07, r: 200, g: 220, b: 255 }, // F/G-type: blue-white
        { prob: 0.03, r: 160, g: 180, b: 255 }, // A-type: blue
        { prob: 0.015, r: 255, g: 220, b: 180 }, // G-type: yellow (sun-like)
        { prob: 0.005, r: 255, g: 100, b:  80 }, // Red giant
    ];

    function starColor() {
        const r = Math.random();
        let cumulative = 0;
        for (const t of STAR_TYPES) {
            cumulative += t.prob;
            if (r < cumulative) return t;
        }
        return STAR_TYPES[0];
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < NUM_STARS; i++) {
            stars.push(makeStar());
        }
    }

    function makeStar(closeTo) {
        const angle = Math.random() * Math.PI * 2;
        const radius = CENTER_DEAD_ZONE + Math.random() * (Math.max(canvas.width, canvas.height) * 0.7);
        const col = starColor();
        return {
            x: canvas.width / 2 + Math.cos(angle) * radius,
            y: canvas.height / 2 + Math.sin(angle) * radius,
            size: Math.random() * 1.8 + 0.3,
            speed: Math.random() * 2.5 + 0.5,
            dx: Math.cos(angle),
            dy: Math.sin(angle),
            r: col.r, g: col.g, b: col.b,
            phase: Math.random() * Math.PI * 2, // for twinkle
        };
    }

    function resetStar(star) {
        const angle = Math.random() * Math.PI * 2;
        const radius = CENTER_DEAD_ZONE + Math.random() * 80; // restart near centre
        star.x = canvas.width / 2 + Math.cos(angle) * radius;
        star.y = canvas.height / 2 + Math.sin(angle) * radius;
        star.size = Math.random() * 1.8 + 0.3;
        star.speed = Math.random() * 2.5 + 0.5;
        star.dx = Math.cos(angle);
        star.dy = Math.sin(angle);
        const col = starColor();
        star.r = col.r; star.g = col.g; star.b = col.b;
        star.phase = Math.random() * Math.PI * 2;
    }

    let lastFrame = performance.now();

    function draw() {
        requestAnimationFrame(draw);
        const now = performance.now();
        const dt = Math.min((now - lastFrame) / 16.67, 3); // normalise to ~60fps
        lastFrame = now;

        // Warp ramp
        if (warpMode && warpStrength < 1) warpStrength = Math.min(warpStrength + 0.04, 1);
        if (!warpMode && warpStrength > 0) warpStrength = Math.max(warpStrength - 0.03, 0);

        const speedBoost = 1 + warpStrength * 12;

        // Fade trail — shorter in warp for streak effect
        ctx.fillStyle = warpStrength > 0.1
            ? `rgba(0,0,0,${0.25 - warpStrength * 0.18})`
            : 'rgba(0,0,0,0.25)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const t = now * 0.001;

        stars.forEach(star => {
            const effectiveSpeed = star.speed * speedBoost * dt;
            star.x += star.dx * effectiveSpeed;
            star.y += star.dy * effectiveSpeed;

            const dist = Math.hypot(star.x - cx, star.y - cy);
            if (dist < CENTER_DEAD_ZONE || star.x < -2 || star.x > canvas.width + 2 ||
                star.y < -2 || star.y > canvas.height + 2) {
                resetStar(star);
                return;
            }

            // Size grows as star moves outward (perspective)
            const growFactor = 1 + (dist / (canvas.width * 0.6)) * 2 + warpStrength * 3;
            const displaySize = star.size * growFactor;

            // Twinkle — subtle, only in normal mode
            const twinkle = warpStrength < 0.2
                ? 0.7 + 0.3 * Math.sin(t * 2.5 * star.speed + star.phase)
                : 1.0;

            // In warp mode draw streaks instead of circles
            if (warpStrength > 0.3) {
                const streakLen = effectiveSpeed * 4 * warpStrength;
                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(star.x - star.dx * streakLen, star.y - star.dy * streakLen);
                ctx.strokeStyle = `rgba(${star.r},${star.g},${star.b},${twinkle * warpStrength})`;
                ctx.lineWidth = displaySize * 0.6;
                ctx.stroke();
            }

            // Always draw the dot
            ctx.beginPath();
            ctx.arc(star.x, star.y, Math.max(displaySize, 0.3), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${star.r},${star.g},${star.b},${twinkle})`;
            ctx.fill();
        });
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();

    // Click: toggle warp, then navigate after a beat
    let clickTimer = null;
    canvas.addEventListener('click', () => {
        if (warpMode) return;
        warpMode = true;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
            window.location.href = 'https://stirlo.be';
        }, 1200);
    });

    // Tap spacebar = warp too
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            warpMode = true;
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                window.location.href = 'https://stirlo.be';
            }, 1200);
        }
    });
});
