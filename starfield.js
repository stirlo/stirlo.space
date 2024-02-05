document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');

    let starArray = [];
    const stars = 500; // Number of stars
    const centerCircleRadius = 20; // Radius of the black center circle

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initializeStars(); // Initialize stars to adapt to new canvas size
    }

    function initializeStars() {
        starArray = []; // Reset the array on resize or initial setup
        for (let i = 0; i < stars; i++) {
            const angle = Math.random() * 2 * Math.PI;
            starArray.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                size: Math.random() * 1 + 1, // Initial size
                speed: Math.random() * 0.5 + 0.5, // Adjusted speed for visibility
                dx: Math.cos(angle),
                dy: Math.sin(angle)
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw a small black circle at the center before stars
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(canvas.width / 2, canvas.height / 2, centerCircleRadius, 0, 2 * Math.PI);
        ctx.fill();

        starArray.forEach(star => {
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
            ctx.fill();

            // Update star position and size for movement
            star.x += star.dx * star.speed;
            star.y += star.dy * star.speed;

            // Reset star to just outside the black circle if it goes out of bounds
            if (Math.sqrt(Math.pow(star.x - canvas.width / 2, 2) + Math.pow(star.y - canvas.height / 2, 2)) > centerCircleRadius + 5) {
                star.x = canvas.width / 2 + star.dx * (centerCircleRadius + 5);
                star.y = canvas.height / 2 + star.dy * (centerCircleRadius + 5);
                star.size = Math.random() * 1 + 1;
                star.speed = Math.random() * 0.5 + 0.5;
            }
        });

        requestAnimationFrame(drawStars);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Set canvas size and initialize stars on load
});
