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
            size: Math.random() * 2 + 0.1, // Ensure stars have a visible initial size
            speed: Math.random() * 3 + 1, // Adjust speed for visible movement
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
            const acceleration = Math.min(10, distance / 250); // Adjusted for smoother acceleration

            // Update star size based on acceleration
            const starSize = star.size * acceleration;

            // Draw star with brightness
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(star.brightness / 255, 1)})`;
            ctx.arc(star.x, star.y, starSize, 0, 2 * Math.PI);
            ctx.fill();

            // Update star position based on its direction (dx, dy) and speed
            star.x += star.dx * star.speed * acceleration;
            star.y += star.dy * star.speed * acceleration;

            // Reset star to center if it goes out of bounds
            if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
                star.x = canvas.width / 2;
                star.y = canvas.height / 2;
                star.size = Math.random() * 2 + 0.1; // Ensure stars have a visible initial size
                star.speed = Math.random() * 3 + 1; // Adjust speed for variety
                star.brightness = Math.random() * 255; // Reset brightness for variety
            }
        });
        requestAnimationFrame(drawStars);
    }

    drawStars();
});
