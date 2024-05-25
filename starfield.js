document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let stars = [];
    const numStars = 2000; 
    const centerNullRadius = 50; 

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.random() * Math.max(canvas.width, canvas.height) / 2 + centerNullRadius;
            const colorChance = Math.random();
            let color = { r: 255, g: 255, b: 255 }; // Default: white
            if (colorChance < 0.000002) color = { r: 0, g: 0, b: 255 }; // Blue
            else if (colorChance < 0.000004) color = { r: 255, g: 0, b: 0 }; // Red
            else if (colorChance < 0.000005) color = { r: 255, g: 255, b: 0 }; // Yellow

            stars.push({
                x: canvas.width / 2 + Math.cos(angle) * radius,
                y: canvas.height / 2 + Math.sin(angle) * radius,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 3 + 1,
                brightness: Math.random(), // Brightness as 0-1
                dx: Math.cos(angle),
                dy: Math.sin(angle),
                color: color,
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

            // Brightness pulsation
            star.brightness = 0.5 + 0.5 * Math.sin(Date.now() * 0.001 * star.speed / 5); 

            const distance = Math.sqrt(Math.pow(star.x - canvas.width / 2, 2) + Math.pow(star.y - canvas.height / 2, 2));
            if (distance < centerNullRadius || star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
                const angle = Math.random() * 2 * Math.PI;
                const radius = Math.random() * Math.max(canvas.width, canvas.height) / 2 + centerNullRadius;
                star.x = canvas.width / 2 + Math.cos(angle) * radius;
                star.y = canvas.height / 2 + Math.sin(angle) * radius;
                star.size = Math.random() * 2 + 0.5;
                star.speed = Math.random() * 3 + 1;
                star.brightness = Math.random();
                star.dx = Math.cos(angle);
                star.dy = Math.sin(angle);
            }

            // Tone Mapping (Adjust these values for desired look)
            const bloomStrength = 0.2;  // Adjust bloom intensity
            const mappedBrightness = star.brightness ** 2 * (1 + bloomStrength * star.brightness); // Gamma adjustment for brighter appearance

            ctx.beginPath();
            ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${mappedBrightness})`;
            ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    requestAnimationFrame(draw);

    canvas.addEventListener('click', () => {
        window.location.href = 'https://stirlo.be';
    });

    document.addEventListener('keydown', () => {
        window.location.href = 'https://stirlo.be';
    });
});
