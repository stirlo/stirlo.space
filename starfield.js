document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let stars = [];
    const numStars = 500;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
            const angle = Math.random() * 2 * Math.PI; // Angle for outward movement from center
            stars.push({
                x: canvas.width / 2, // Start at the center
                y: canvas.height / 2,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 3 + 1,
                brightness: Math.random() * 255,
                dx: Math.cos(angle), // Direction based on angle
                dy: Math.sin(angle),
            });
        }
    }

    function draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            star.x += star.dx * star.speed; // Move based on direction and speed
            star.y += star.dy * star.speed;
            star.size += 0.02; // Gradually increase size for effect

            // Reset star to center if it moves beyond canvas boundaries
            if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
                star.x = canvas.width / 2;
                star.y = canvas.height / 2;
                star.size = Math.random() * 2 + 0.5;
                star.speed = Math.random() * 3 + 1;
                star.brightness = Math.random() * 255;
            }

            // Use `rgba` to adjust brightness via alpha channel
            ctx.beginPath();
            const brightness = Math.floor(star.brightness).toString();
            ctx.fillStyle = `rgba(255, 255, 255, ${brightness / 255})`;
            ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    requestAnimationFrame(draw);
});
