import { useRef, useEffect } from 'react';
import './ParticleCanvas.css';

// NOTE: Math.random() returns number between 0 and 1, so multiply by the max number you can have

// spawn 20 background particles on resize, respawn when one dies
// needs to spawn in random place, don't specify in spawn function

function ParticleCanvas({ colorPalette = ['#22b64e', '#2ab4d9', '#6fe2ff', '#e99b07', '#ffc500', '#ed1c24', '#ff7289', '#ff3982'], maxParticles = 20 }) {
    // useRef keeps a value between renders without rerendering
    const CanvasRef = useRef(null);
    const ParticlesRef = useRef([]);
    //                 |
    // what are those \|/
    // poolref is for reusing particles
    const PoolRef = useRef([]);
    const RafRef = useRef(null);

    const LastPosRef = useRef(null);
    const LastTimeRef = useRef(performance.now());

    const BackParticlesRef = useRef([]);
    const BackPoolRef = useRef([]);

    useEffect(() => {
        const Canvas = CanvasRef.current;
        // ^^^ use the useRef values as created above (doesn't re render)
        
        if (!Canvas) return;

        function createBackgroundParticle(x, y, vx, vy) {
            let p = BackPoolRef.current.pop();
            if (!p) p = {};

            p.x = x;
            p.y = y;
            p.vx = vx;
            p.vy = vy;

            p.size = 1 + Math.random() * 6;
            p.life = 1000 + Math.random() * 20;
            p.age = 0;
            p.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            return p;
        }
        
        function spawnBackgroundParticle(count, lastX, lastY) {
            
            const x = Math.random() * (Canvas.width - Dpr / 5);
            const y = Math.random() * (Canvas.height - Dpr / 5);

            for (let i = 0; i < count; i++) {
                const angle = Math.atan2(y - (lastY ?? y), x - (lastX ?? x) + (Math.random() - 0.5) * 1.2);
                // why is random only added to x val?
                const speed = 0.05 + Math.random() * 1.2;
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed;

                const p = createBackgroundParticle(x + (Math.random() - 0.5) * 6, y + (Math.random() - 0.5) * 6, vx, vy);
                // uses createBackgroundParticle function from above

                BackParticlesRef.current.push(p);
                if (BackParticlesRef.current.length > maxParticles) {
                    const removed = BackParticlesRef.current.shift();
                    BackPoolRef.current.push(removed);
                }

            }
        }
        
        // Ctx stands for Context
        const Ctx = Canvas.getContext('2d');
        let Dpr = window.devicePixelRatio || 1;

        function resize(){
            Dpr = window.devicePixelRatio || 1;

            // math.max returns largest of 2
            Canvas.width = Math.max(1, innerWidth * Dpr);
            Canvas.height = Math.max(1, innerHeight * Dpr);

            Canvas.style.width = innerWidth + 'px';
            Canvas.style.height = innerHeight + 'px';
            // ^^^ is this css styling??
        
            Ctx.setTransform(Dpr, 0, 0, Dpr, 0, 0);
            // whats a DOMMatrix ^

            spawnBackgroundParticle(20);
        }


        resize();
        window.addEventListener('resize', resize)
        // ^ listens if window is resized, then resizes canvas

        function createParticle(x, y, vx, vy) {
            let p = PoolRef.current.pop();
            if (!p) p = {};

            p.x = x;
            p.y = y;
            p.vx = vx; // v = velocity
            p.vy = vy;

            p.size = 5 + Math.random() * 6;
            p.life = 1000 + Math.random() * 9; // how long it'll survive
            p.age = 0; // it's a baby!!
            p.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            return p;
        }

        function spawn(x, y, count, speedScale, lastX, lastY) {

            // - ?? operator --- nullish coalescing operator, returns first value that isn't null or undefined
            // - ++ --- increment by one
            // - trig - cos & sin
            // - push & shift

            for (let i = 0; i <  count; i++) {
                // spawns count particles
                const angle = Math.atan2(y - (lastY ?? y), x - (lastX ?? x) + (Math.random() - 0.5) * 1.2);
                // atan2 gets angle between previous point to spawn point
                // plus random jitter <3
                const speed = (0.2 + Math.random() * 1.2) * (speedScale || 1);
                // base speed is 0.2 plus random up to 1.2
                const vx = Math.cos(angle) * speed;
                // 
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
                speed = (Math.sqrt(dx * dx + dy * dy) / dt * 16)/4;

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
            const backParticles = BackParticlesRef.current;
            
            Ctx.clearRect(0, 0, Canvas.width/Dpr, Canvas.height/Dpr);

            for (let i = backParticles.length - 1; i >= 0; i--) {
                const p  = backParticles[i];
                p.age += dt;
                if (p.age >= p.life) {
                    backParticles.splice(i, 1);
                    BackPoolRef.current.push(p);
                    spawnBackgroundParticle(1);
                    continue;
                }

                p.vx *= 0.98;
                p.vy *= 0.98;
                p.x += p.vx * (dt/16);
                p.y += p.vy * (dt/16) + 0.02 * (dt/16);

                // alpha value for the particle's colour
                const t = p.age / p.life;
                const alpha = 1 - t;
                const size = p.size * (1 - t * 0.8);

                Ctx.save();
                Ctx.beginPath();
                Ctx.fillStyle = p.color;
                Ctx.globalAlpha = alpha;
                Ctx.shadowColor = p.color;
                Ctx.shadowBlur = 10;

                Ctx.rect(p.x, p.y, size, size);
                Ctx.stroke();
                Ctx.fill();
                Ctx.restore();
            }

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

                Ctx.rect(p.x,p.y,size,size);
                Ctx.stroke();
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