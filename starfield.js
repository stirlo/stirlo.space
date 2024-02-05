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
                size: Math.random(),
                speed: Math.random() * 3 + 1,
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
                star.size = Math.random();
                star.speed = Math.random() * 3 + 1;
            }

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    requestAnimationFrame(draw);
});
