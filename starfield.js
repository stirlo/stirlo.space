document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let stars = [];
    const numStars = 500;
    const centerNullRadius = 50; // Radius of the central "null" area

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.random() * Math.max(canvas.width, canvas.height) / 2 + centerNullRadius; // Ensure stars start outside the null area
            stars.push({
                x: canvas.width / 2 + Math.cos(angle) * radius, // Position stars outside the null area
                y: canvas.height / 2 + Math.sin(angle) * radius,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 3 + 1,
                brightness: Math.random() * 255,
                dx: Math.cos(angle),
                dy: Math.sin(angle),
            });
        }
    }

    function draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            star.x += star.dx * star.speed;
            star.y += star.dy * star.speed;
            star.size += 0.02;

            // Calculate distance from the center
            const distance = Math.sqrt(Math.pow(star.x - canvas.width / 2, 2) + Math.pow(star.y - canvas.height / 2, 2));
            // Reset star if it moves beyond canvas boundaries or enters the null area
            if (distance < centerNullRadius || star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
                const angle = Math.random() * 2 * Math.PI;
                const radius = Math.random() * Math.max(canvas.width, canvas.height) / 2 + centerNullRadius;
                star.x = canvas.width / 2 + Math.cos(angle) * radius;
                star.y = canvas.height / 2 + Math.sin(angle) * radius;
                star.size = Math.random() * 2 + 0.5;
                star.speed = Math.random() * 3 + 1;
                star.brightness = Math.random() * 255;
                star.dx = Math.cos(angle);
                star.dy = Math.sin(angle);
            }

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
