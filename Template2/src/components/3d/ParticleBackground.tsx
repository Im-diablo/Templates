import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
  life: number;
}

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particleCount = 50;
    const colors = ['#3FDDDE', '#B946FF', '#00FF66', '#FF006B'];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.05,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random() * 100 + 50
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(16, 24, 39, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update particle position (slower movement)
        particle.x += particle.vx * 0.1;
        particle.y += particle.vy * 0.1;
        particle.z += particle.vz * 0.1;
        particle.life -= 0.1;

        // Calculate 3D projection
        const perspective = 500;
        const projectedX = (particle.x - canvas.width / 2) * (perspective / (perspective + particle.z)) + canvas.width / 2;
        const projectedY = (particle.y - canvas.height / 2) * (perspective / (perspective + particle.z)) + canvas.height / 2;
        const scale = perspective / (perspective + particle.z);

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.z < -500) particle.z = 500;
        if (particle.z > 500) particle.z = -500;

        // Reset particle if life runs out
        if (particle.life <= 0) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.z = Math.random() * 1000 - 500;
          particle.life = Math.random() * 100 + 50;
        }

        // Draw particle with glow effect
        const alpha = Math.max(0, particle.life / 100);
        const size = particle.size * scale;

        // Glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = particle.color;
        
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = alpha * 0.8;
        ctx.beginPath();
        ctx.arc(projectedX, projectedY, size, 0, Math.PI * 2);
        ctx.fill();

        // Core particle
        ctx.shadowBlur = 5;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(projectedX, projectedY, size * 0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Connect nearby particles
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              const otherProjectedX = (otherParticle.x - canvas.width / 2) * (perspective / (perspective + otherParticle.z)) + canvas.width / 2;
              const otherProjectedY = (otherParticle.y - canvas.height / 2) * (perspective / (perspective + otherParticle.z)) + canvas.height / 2;

              ctx.strokeStyle = particle.color;
              ctx.globalAlpha = (1 - distance / 100) * 0.3;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(projectedX, projectedY);
              ctx.lineTo(otherProjectedX, otherProjectedY);
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ filter: 'blur(0.5px)' }}
    />
  );
};