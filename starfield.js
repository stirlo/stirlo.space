document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const stars = 500; // Reduced number for clearer visibility and performance
    const starArray = [];

    for (let i = 0; i < stars; i++) {
        const angle = Math.random() * 2 * Math.PI;
        starArray.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            size: Math.random() * 1 + 1, // Increased initial size
            speed: Math.random() * 2 + 2, // Adjusted speed for better visibility
            dx: Math.cos(angle),
            dy: Math.sin(angle)
        });
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        starArray.forEach(star => {
            ctx.beginPath();
            // No acceleration calculation, just draw and move
            ctx.fillStyle = 'white'; // Set a solid color for better visibility
            ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
            ctx.fill();

            // Update star position and size
            star.x += star.dx * star.speed;
            star.y += star.dy * star.speed;
            star.size += 0.05; // Gradually increase size to simulate acceleration

            // Reset star to center if it goes out of bounds, with a random size and speed
            if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
                star.x = canvas.width / 2;
                star.y = canvas.height / 2;
                star.size = Math.random() * 1 + 1;
                star.speed = Math.random() * 2 + 2;
            }
        });
        requestAnimationFrame(drawStars);
    }

    drawStars();
});
