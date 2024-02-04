document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const stars = 10000;
    const starArray = [];

    for (let i = 0; i < stars; i++) {
        const angle = Math.random() * 2 * Math.PI; // Random angle
        starArray.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            size: Math.random(),
            speed: Math.random() * 3 + 1,
            dx: Math.cos(angle),
            dy: Math.sin(angle)
        });
    }

    function drawStars() {
        ctx.fillStyle = 'white';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        starArray.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
            ctx.fill();
            // Update star position based on its direction (dx, dy) and speed
            star.x += star.dx * star.speed;
            star.y += star.dy * star.speed;
            // Reset star to center if it goes out of bounds
            if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
                star.x = canvas.width / 2;
                star.y = canvas.height / 2;
            }
        });
        requestAnimationFrame(drawStars);
    }

    drawStars();
});
