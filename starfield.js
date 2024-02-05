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
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5, // Slightly larger stars
                speed: Math.random() * 3 + 1,
                brightness: Math.random() * 255, // Simulate HDR by varying brightness
            });
        }
    }

    function draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            star.x += star.speed;
            star.y -= star.speed * (canvas.height / canvas.width);
            star.size += 0.02;

            if (star.x > canvas.width || star.y < 0) {
                star.x = Math.random() * canvas.width;
                star.y = canvas.height;
                star.size = Math.random() * 2 + 0.5;
                star.speed = Math.random() * 3 + 1;
                star.brightness = Math.random() * 255; // Reset brightness for HDR effect
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
