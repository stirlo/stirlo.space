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
            speed: Math.random() * 5 + 1, // Increased speed range for more variation
            dx: Math.cos(angle),
            dy: Math.sin(angle),
            brightness: Math.random() * 255
        });
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        starArray.forEach(star => {
            ctx.beginPath();
            // Calculate distance from center to simulate acceleration
            const distance = Math.sqrt(Math.pow(star.x - canvas.width / 2, 2) + Math.pow(star.y - canvas.height / 2, 2));
            const acceleration = Math.min(10, distance / 100);

            // Update star size based on acceleration
            const starSize = Math.min(star.size * acceleration, 3); // Limit max size to prevent overgrowth

            // Draw star with gradient to simulate brightness
            const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, starSize);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${star.brightness / 255})`);
            gradient.addColorStop(1, "transparent");

            ctx.fillStyle = gradient;
            ctx.arc(star.x, star.y, starSize, 0, 2 * Math.PI);
            ctx.fill();

            // Update star position based on its direction (dx, dy) and speed
            star.x += star.dx * star.speed * acceleration;
            star.y += star.dy * star.speed * acceleration;

            // Reset star to center if it goes out of bounds
            if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
                star.x = canvas.width / 2;
                star.y = canvas.height / 2;
                star.speed = Math.random() * 5 + 1; // Reset speed for variety
                star.size = Math.random(); // Reset size for variety
            }
        });
        requestAnimationFrame(drawStars);
    }

    drawStars();
});
