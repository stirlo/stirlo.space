document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const stars = 2000; // Number of stars
    const starArray = [];

    for (let i = 0; i < stars; i++) {
        const angle = Math.random() * 2 * Math.PI;
        starArray.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            size: Math.random() * 1 + 1, // Initial size
            speed: Math.random() * 2 + 1, // Speed
            dx: Math.cos(angle),
            dy: Math.sin(angle)
        });
    }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    starArray.forEach(star => {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fill();

        // Update star position and size for movement
        star.x += star.dx * star.speed;
        star.y += star.dy * star.speed;
        star.size += 0.02; // Slight increase in size to simulate acceleration

        // Define the radius of the black center circle
        const centerCircleRadius = 20;

        // Calculate distance from the center
        const distanceFromCenter = Math.sqrt(Math.pow(star.x - canvas.width / 2, 2) + Math.pow(star.y - canvas.height / 2, 2));

        // Reset star to just outside the black circle if it goes out of bounds
        if (distanceFromCenter > Math.min(canvas.width, canvas.height) / 2) {
            const angle = Math.random() * 2 * Math.PI;
            star.x = canvas.width / 2 + Math.cos(angle) * (centerCircleRadius + 5); // Position just outside the black circle
            star.y = canvas.height / 2 + Math.sin(angle) * (centerCircleRadius + 5);
            star.size = Math.random() * 1 + 1;
            star.speed = Math.random() * 2 + 1;
            star.dx = Math.cos(angle);
            star.dy = Math.sin(angle);
        }
    });

    // Draw a small black circle at the center after stars have been drawn
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(canvas.width / 2, canvas.height / 2, centerCircleRadius, 0, 2 * Math.PI);
    ctx.fill();

    requestAnimationFrame(drawStars);
}


    drawStars();
});
