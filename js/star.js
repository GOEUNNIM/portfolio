/* $(function () {

    let canvas2 = document.getElementById('canvas2'),
        canvas3 = document.getElementById('canvas3'),
        ctx2_1 = canvas2.getContext('2d'),
        ctx2_2 = canvas3.getContext('2d'),
        w = canvas2.width = canvas3.width =window.innerWidth,
        h = canvas2.height =canvas3.height =window.innerHeight,

        hue = 217,
        stars = [],
        count = 0,
        maxStars = 1400;


    // Cache gradient
    let canvasEL = document.createElement('canvas'),
        ctx2 = canvasEL.getContext('2d');
    canvasEL.width = 100;
    canvasEL.height = 100;
    let half = canvasEL.width / 2,
        gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#fff');
    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
    gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
    gradient2.addColorStop(1, 'transparent');

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

    // End cache

    function random(min, max) {
        if (arguments.length < 2) {
            max = min;
            min = 0;
        }

        if (min > max) {
            var hold = max;
            max = min;
            min = hold;
        }

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function maxOrbit(x, y) {
        var max = Math.max(x, y),
            diameter = Math.round(Math.sqrt(max * max + max * max));
        return diameter / 2;
    }

    let Star = function () {

        this.orbitRadius = random(maxOrbit(w, h));
        this.radius = random(60, this.orbitRadius) / 12;
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        this.timePassed = random(0, maxStars);
        //별 돌아가는 속도
        this.speed = random(this.orbitRadius) / 800000;
        this.alpha = random(2, 10) / 10;

        count++;
        stars[count] = this;
    }

    Star.prototype.draw = function () {
        var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
            y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
            twinkle = random(10);

        if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05;
        }

        ctx2_1.globalAlpha = this.alpha;
        ctx2_1.drawImage(canvasEL, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
        ctx2_2.globalAlpha = this.alpha;
        ctx2_2.drawImage(canvasEL, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
        this.timePassed += this.speed;
    }

    for (var i = 0; i < maxStars; i++) {
        new Star();
    }

    function animation() {
        ctx2_1.globalCompositeOperation =ctx2_2.globalCompositeOperation = 'source-over';
        ctx2_1.globalAlpha = ctx2_2.globalAlpha = 0.8;
        ctx2_1.fillStyle = ctx2_2.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
        ctx2_1.fillRect(0, 0, w, h)
        ctx2_2.fillRect(0, 0, w, h)
        ctx2_1.globalCompositeOperation = ctx2_2.globalCompositeOperation = 'lighter';
        for (var i = 1, l = stars.length; i < l; i++) {
            stars[i].draw();
        };

        window.requestAnimationFrame(animation);
    }

    animation();


}); */