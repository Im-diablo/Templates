import { useEffect, useRef, useState } from 'react';
import { Card3D } from '@/components/ui/Card3D';

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: 'React/Next.js', level: 95, color: 'primary' },
    { name: 'TypeScript', level: 90, color: 'secondary' },
    { name: 'Node.js', level: 85, color: 'accent' },
    { name: 'Python', level: 80, color: 'primary' },
    { name: 'GraphQL', level: 75, color: 'secondary' },
    { name: 'AWS/Cloud', level: 70, color: 'accent' }
  ];

  return (
    <section ref={sectionRef} id="about" className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-secondary bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Bio Card */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <Card3D intensity="medium" glowColor="primary" className="h-full">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-primary mb-4">Digital Craftsman</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm a passionate full-stack developer with 5+ years of experience creating 
                  exceptional digital experiences. My journey began with curiosity about how 
                  things work, and it evolved into a deep love for crafting elegant solutions 
                  to complex problems using modern web technologies.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I specialize in React ecosystems, TypeScript, Node.js, and emerging technologies 
                  like WebGL and AI integration. My approach combines technical excellence with 
                  creative problem-solving to deliver products that users love.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  When I'm not coding, you'll find me exploring the latest technologies, 
                  contributing to open-source projects, mentoring aspiring developers, or 
                  experimenting with 3D graphics and generative art.
                </p>
                
                {/* Tech Stack Icons */}
                <div className="space-y-4 pt-4">
                  <h4 className="text-sm font-semibold text-primary">Current Tech Stack</h4>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { name: 'React', icon: '⚛️' },
                      { name: 'TypeScript', icon: '📘' },
                      { name: 'Node.js', icon: '🟢' },
                      { name: 'Python', icon: '🐍' },
                      { name: 'AWS', icon: '☁️' },
                      { name: 'Docker', icon: '🐳' }
                    ].map((tech, index) => (
                      <span 
                        key={tech.name}
                        className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary animate-slide-in-3d hover:scale-105 transition-transform duration-300 cursor-default"
                        style={{ animationDelay: `${1 + index * 0.1}s` }}
                      >
                        <span className="mr-1">{tech.icon}</span>
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card3D>
          </div>

          {/* Skills Visualization */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <Card3D intensity="medium" glowColor="secondary" className="h-full">
              <h3 className="text-2xl font-bold text-secondary mb-6">Technical Expertise</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-foreground font-medium">{skill.name}</span>
                      <span className="text-muted-foreground text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${
                          skill.color === 'primary' ? 'from-primary to-primary-glow' :
                          skill.color === 'secondary' ? 'from-secondary to-secondary-glow' :
                          'from-accent to-accent-glow'
                        } rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${0.8 + index * 0.2}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card3D>
          </div>
        </div>

        {/* 3D Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { number: '50+', label: 'Projects Completed', delay: '1.2s' },
            { number: '5+', label: 'Years Experience', delay: '1.4s' },
            { number: '20+', label: 'Happy Clients', delay: '1.6s' },
            { number: '∞', label: 'Lines of Code', delay: '1.8s' }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: stat.delay }}
            >
              <Card3D intensity="low" className="text-center p-6 group hover:scale-110 transition-transform duration-300">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:animate-pulse">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </Card3D>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};