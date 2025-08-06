import { useEffect, useState } from 'react';
import { Button3D } from '@/components/ui/Button3D';
import { Card3D } from '@/components/ui/Card3D';

export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Floating 3D Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full animate-particle-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* 3D Geometric Shapes */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/30 rotate-45 animate-rotate-3d" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-secondary/30 animate-float" 
             style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 border border-accent/30 rounded-full animate-pulse-glow"
             style={{ animationDelay: '4s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Animated Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent animate-hologram">
            <span className="block animate-slide-in-3d" style={{ animationDelay: '0.2s' }}>
              ALEX
            </span>
            <span className="block animate-slide-in-3d" style={{ animationDelay: '0.4s' }}>
              JOHNSON
            </span>
          </h1>

          {/* Subtitle */}
          <div className="text-xl md:text-2xl text-muted-foreground mb-8 animate-slide-in-3d" style={{ animationDelay: '0.6s' }}>
            <span className="block">Full-Stack Developer</span>
            <span className="block text-primary">& Creative Technologist</span>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-slide-in-3d" style={{ animationDelay: '0.8s' }}>
            Crafting immersive digital experiences with cutting-edge technology and creative innovation. 
            Specializing in React, TypeScript, AI integration, and 3D web experiences that push boundaries.
          </p>

          {/* Tech Highlights */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-in-3d" style={{ animationDelay: '0.9s' }}>
            {['React/Next.js', 'TypeScript', 'Three.js', 'AI/ML', 'WebGL'].map((tech, index) => (
              <span 
                key={tech}
                className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary hover:bg-primary/20 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${0.9 + index * 0.1}s` }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-in-3d" style={{ animationDelay: '1s' }}>
            <Button3D variant="hero" size="lg" className="group">
              <span className="mr-2">View My Work</span>
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Button3D>
            
            <Button3D variant="neon" size="lg" className="group">
              <span className="mr-2">Get In Touch</span>
              <span className="inline-block transition-transform group-hover:scale-110">✦</span>
            </Button3D>
          </div>
        </div>

        {/* Floating Stats Cards */}
        <div className="absolute -top-20 -left-20 animate-float hidden lg:block">
          <Card3D intensity="low" className="w-32 h-24 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">5+</div>
              <div className="text-xs text-muted-foreground">Years</div>
            </div>
          </Card3D>
        </div>

        <div className="absolute -bottom-20 -right-20 animate-float hidden lg:block" style={{ animationDelay: '2s' }}>
          <Card3D intensity="low" className="w-32 h-24 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">50+</div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </div>
          </Card3D>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};