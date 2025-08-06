import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef, useState } from "react";

export interface Card3DProps extends HTMLAttributes<HTMLDivElement> {
  intensity?: 'low' | 'medium' | 'high' | number;
  glowColor?: 'primary' | 'secondary' | 'accent';
}

const Card3D = forwardRef<HTMLDivElement, Card3DProps>(
  ({ className, intensity = 'medium', glowColor = 'primary', children, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    };

    const getIntensityValue = () => {
      if (typeof intensity === 'number') {
        return intensity;
      }
      switch (intensity) {
        case 'low': return 5;
        case 'medium': return 15;
        case 'high': return 25;
        default: return 15;
      }
    };

    const getGlowClass = () => {
      switch (glowColor) {
        case 'primary': return 'shadow-glow-primary';
        case 'secondary': return 'shadow-glow-secondary';
        case 'accent': return 'shadow-glow-accent';
        default: return 'shadow-glow-primary';
      }
    };

    const intensityVal = getIntensityValue();
    const rotateX = isHovered ? (mousePosition.y - 150) / intensityVal : 0;
    const rotateY = isHovered ? (mousePosition.x - 150) / intensityVal : 0;

    return (
      <div
        ref={ref}
        className={cn(
          "relative bg-card/40 backdrop-blur-lg border border-border/50 rounded-xl overflow-hidden",
          "transition-all duration-500 ease-out transform-gpu",
          "hover:scale-105",
          getGlowClass(),
          className
        )}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
        
        {/* Glow effect on hover */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(63, 221, 222, 0.1) 0%, transparent 50%)`
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 p-6">
          {children}
        </div>
        
        {/* 3D edge highlight */}
        <div className="absolute inset-0 rounded-xl border border-white/10 pointer-events-none" />
      </div>
    );
  }
);

Card3D.displayName = "Card3D";

export { Card3D };