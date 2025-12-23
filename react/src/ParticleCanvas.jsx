import { useRef, useEffect } from 'react';
import './ParticleCanvas.css';

function ParticleCanvas({ colorPalette = ['#ff6fb3', '#ff4da6', '#ffd1e8'], maxParticles = 20 }) {
    // useRef keeps a value between renders without rerendering
    const CanvasRef = useRef(null);
    const ParticlesRef = useRef([]);
    //                 |
    // what are those \|/
    const PoolRef = useRef([]);
    const RafRef = useRef(null);

    const LastPosRef = useRef(null);
    const LastTimeRef = useRef(performance.now());


    useEffect(() => {
        const Canvas = CanvasRef.current;
        // ^^^ use the useRef values as created above (doesn't re render)
        
        if (!Canvas) return;


        // Ctx stands for Context
        const Ctx = Canvas.getContext('2d');
        let Dpr = window.devicePixelRatio || 1;

        function resize(){
            Dpr = window.devicePixelRatio || 1;

            // math.max returns largest of 2
            Canvas.width = Math.max(1, innerWidth * Dpr)
            Canvas.height = Math.max(1, innerHeight * Dpr)

            Canvas.style.width = innerWidth + 'px'
            Canvas.style.height = innerHeight + 'px'
            // ^^^ is this css styling??
        
            Ctx.setTransform(Dpr, 0, 0, Dpr, 0, 0)
            // whats a DOMMatrix ^
        }

        resize();
        window.addEventListener('resize', resize)
        // ^ listens if window is resized, then resizes canvas

        Ctx.globalCompositeOperation = 'lighter';

        function createParticle(x, y, vx, vy) {
            let p = PoolRef.current.pop();
            if (!p) p = {};

            p.x = x;
            p.y = y;
            p.vx = vx; // v = velocity
            p.vy = vy;

            p.size = 2 + Math.random() * 6;
            p.life = 300 + Math.random() * 6; // how long it'll survive
            p.age = 0; // it's a baby!!
            p.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            return p;
        }

        function spawn(x, y, count, speedScale, lastX, lastY) {

            // wth is going on down here
            // - ?? operator
            // - ++
            // - trig - cos & sin
            // - push & shift

            for (let i = 0; i <  count; i++) {
                const angle = Math.atan2(y - (lastY ?? y), x - (lastX ?? x) + (Math.random() - 0.5) * 1.2);
                const speed = (0.2 + Math.random() * 1.2) * (speedScale || 1);
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed;
                const p = createParticle(x + (Math.random() - 0.5) * 6, y + (Math.random() - 0.5) * 6, vx, vy);

                ParticlesRef.current.push(p);
                if (ParticlesRef.current.length > maxParticles) {
                    const removed = ParticlesRef.current.shift();
                    PoolRef.current.push(removed);
                }
            }
        }

        function onMove(e) {
            // what is ? operator
            const x = e.touches ? e.touches[0].clientX : e.clientX;
            const y = e.touches ? e.touches[0].clientY : e.clientY;

            const last = LastPosRef.current;
            const now = performance.now();
            const dt = Math.max(1, now - LastTimeRef.current);

            let speed = 0;

            if (last) {
                const dx = x - last.x, dy = y - last.y;
                speed = Math.sqrt(dx * dx + dy * dy) / dt * 16;

                const dist = Math.hypot(dx, dy);
                const steps = Math.ceil(dist/8);

                for (let i = 0; i < steps; i++) {
                    const ix = last.x + dx * (i + 1) / steps;
                    const iy = last.y + dy * (i + 1) / steps;
                    spawn(ix, iy, 1 + Math.floor(Math.random() * 2), Math.min(3, 1 + speed), last.x, last.y);
                }
            } else {
                spawn(x, y, 2, 1);
            }
            LastPosRef.current = { x, y };
            LastTimeRef.current = now;
        }

        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('touchmove', onMove, { passive: true });

        function update(now) {
            const dt = Math.min(50, now - LastTimeRef.current);
            // dt = delta time (like in Godot)

            LastTimeRef.current = now;
            const particles = ParticlesRef.current;
            
            Ctx.clearRect(0, 0, Canvas.width/Dpr, Canvas.height/Dpr);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.age += dt;
                if (p.age >= p.life) {
                    particles.splice(i, 1);
                    PoolRef.current.push(p);
                    continue;
                }

                p.vx *= 0.98;
                p.vy *= 0.98;
                p.x += p.vx * (dt/16);
                p.y += p.vy * (dt/16) + 0.02 * (dt/16);
                const t = p.age / p.life;
                const alpha = 1 - t;
                const size = p.size * (1 - t * 0.8);

                Ctx.save();
                Ctx.beginPath();
                Ctx.fillStyle = p.color;
                Ctx.globalAlpha = alpha;
                Ctx.shadowColor = p.color;
                Ctx.shadowBlur = 10;
                Ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                Ctx.fill();
                Ctx.restore();
            }
            RafRef.current = requestAnimationFrame(update);
        }
        RafRef.current = requestAnimationFrame(update);

        return () => {
            cancelAnimationFrame(RafRef.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('touchmove', onMove);
        }

    }, [colorPalette, maxParticles]);


    return (
        <canvas ref={CanvasRef} id='ParticleCanvas'></canvas>
    )
};

export default ParticleCanvas;