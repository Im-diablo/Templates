import { useEffect, useRef, useState } from 'react';
import { Card3D } from '@/components/ui/Card3D';

export const Skills = () => {
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

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: '🎨',
      color: 'primary',
      skills: [
        { name: 'React/Next.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Three.js/WebGL', level: 85 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Vue.js', level: 80 }
      ]
    },
    {
      title: 'Backend Development',
      icon: '⚙️',
      color: 'secondary',
      skills: [
        { name: 'Node.js', level: 88 },
        { name: 'Python/Django', level: 85 },
        { name: 'PostgreSQL', level: 82 },
        { name: 'GraphQL', level: 78 },
        { name: 'Redis', level: 75 }
      ]
    },
    {
      title: 'Cloud & DevOps',
      icon: '☁️',
      color: 'accent',
      skills: [
        { name: 'AWS/GCP', level: 80 },
        { name: 'Docker', level: 85 },
        { name: 'Kubernetes', level: 70 },
        { name: 'CI/CD', level: 82 },
        { name: 'Terraform', level: 68 }
      ]
    },
    {
      title: 'Emerging Tech',
      icon: '🚀',
      color: 'primary',
      skills: [
        { name: 'AI/ML Integration', level: 75 },
        { name: 'Blockchain/Web3', level: 70 },
        { name: 'AR/VR', level: 65 },
        { name: 'WebAssembly', level: 60 },
        { name: 'IoT', level: 58 }
      ]
    }
  ];

  return (
    <section ref={sectionRef} id="skills" className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern digital experiences
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${categoryIndex * 0.2}s` }}
            >
              <Card3D 
                intensity="medium" 
                glowColor={category.color as 'primary' | 'secondary' | 'accent'}
                className="h-full"
              >
                <div className="space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{category.icon}</span>
                    <h3 className={`text-xl font-bold ${
                      category.color === 'primary' ? 'text-primary' :
                      category.color === 'secondary' ? 'text-secondary' : 'text-accent'
                    }`}>
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name} className="group">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-foreground font-medium text-sm">
                            {skill.name}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${
                              category.color === 'primary' 
                                ? 'bg-gradient-to-r from-primary to-primary-glow' :
                              category.color === 'secondary' 
                                ? 'bg-gradient-to-r from-secondary to-secondary-glow' :
                                'bg-gradient-to-r from-accent to-accent-glow'
                            }`}
                            style={{ 
                              width: isVisible ? `${skill.level}%` : '0%',
                              transitionDelay: `${0.5 + categoryIndex * 0.2 + skillIndex * 0.1}s`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Category Stats */}
                  <div className="mt-6 pt-4 border-t border-border/30">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${
                        category.color === 'primary' ? 'text-primary' :
                        category.color === 'secondary' ? 'text-secondary' : 'text-accent'
                      }`}>
                        {Math.round(category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length)}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Average Proficiency
                      </div>
                    </div>
                  </div>
                </div>
              </Card3D>
            </div>
          ))}
        </div>

        {/* Certifications & Awards */}
        <div className={`mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                title: 'AWS Certified Solutions Architect', 
                year: '2023',
                icon: '🏆',
                color: 'primary'
              },
              { 
                title: 'React Advanced Patterns', 
                year: '2023',
                icon: '🎖️',
                color: 'secondary'
              },
              { 
                title: 'Top 1% Open Source Contributor', 
                year: '2024',
                icon: '⭐',
                color: 'accent'
              }
            ].map((cert, index) => (
              <Card3D
                key={cert.title}
                intensity="low"
                glowColor={cert.color as 'primary' | 'secondary' | 'accent'}
                className="text-center p-6 group hover:scale-105 transition-transform duration-300"
              >
                <div className="text-3xl mb-3 group-hover:animate-bounce">
                  {cert.icon}
                </div>
                <h4 className="font-semibold text-foreground mb-1 text-sm">
                  {cert.title}
                </h4>
                <p className={`text-xs ${
                  cert.color === 'primary' ? 'text-primary' :
                  cert.color === 'secondary' ? 'text-secondary' : 'text-accent'
                }`}>
                  {cert.year}
                </p>
              </Card3D>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};