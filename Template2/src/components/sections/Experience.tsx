import { useEffect, useRef, useState } from 'react';
import { Card3D } from '@/components/ui/Card3D';

export const Experience = () => {
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

  const experiences = [
    {
      company: 'TechNova AI',
      position: 'Senior Full-Stack Developer',
      period: '2022 - Present',
      location: 'San Francisco, CA',
      type: 'Full-time',
      color: 'primary',
      logo: '🚀',
      highlights: [
        'Led development of AI-powered SaaS platform serving 50K+ users',
        'Implemented microservices architecture reducing load times by 60%',
        'Mentored 5 junior developers and established coding standards',
        'Built real-time collaboration features using WebRTC and Socket.io'
      ],
      tech: ['React', 'Node.js', 'Python', 'AWS', 'GraphQL']
    },
    {
      company: 'Blockchain Dynamics',
      position: 'Frontend Architect',
      period: '2021 - 2022',
      location: 'Austin, TX',
      type: 'Contract',
      color: 'secondary',
      logo: '⛓️',
      highlights: [
        'Architected DeFi trading platform with $10M+ daily volume',
        'Optimized smart contract interactions reducing gas costs by 40%',
        'Implemented advanced charting and analytics dashboard',
        'Integrated multiple blockchain networks and wallets'
      ],
      tech: ['Next.js', 'Web3.js', 'Solidity', 'TypeScript', 'Chart.js']
    },
    {
      company: 'Digital Innovations Co.',
      position: 'Full-Stack Developer',
      period: '2020 - 2021',
      location: 'New York, NY',
      type: 'Full-time',
      color: 'accent',
      logo: '💡',
      highlights: [
        'Developed e-commerce platform processing $2M+ monthly revenue',
        'Built automated testing suite increasing deployment confidence',
        'Integrated third-party APIs and payment processing systems',
        'Optimized database queries improving response times by 45%'
      ],
      tech: ['Vue.js', 'Express.js', 'PostgreSQL', 'Redis', 'Docker']
    },
    {
      company: 'StartupLab',
      position: 'Junior Developer',
      period: '2019 - 2020',
      location: 'Remote',
      type: 'Full-time',
      color: 'primary',
      logo: '🌱',
      highlights: [
        'Contributed to 5+ client projects from MVP to production',
        'Learned modern web development practices and agile methodologies',
        'Built responsive interfaces for diverse industry verticals',
        'Collaborated with design and product teams on user experience'
      ],
      tech: ['React', 'Node.js', 'MongoDB', 'Sass', 'Jest']
    }
  ];

  return (
    <section ref={sectionRef} id="experience" className="relative py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-secondary bg-clip-text text-transparent">
            Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building impactful solutions across diverse industries and technologies
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 w-0.5 h-full bg-gradient-primary"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 0.3}s` }}
              >
                {/* Timeline Node */}
                <div className={`absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full border-4 ${
                  exp.color === 'primary' ? 'bg-primary border-primary' :
                  exp.color === 'secondary' ? 'bg-secondary border-secondary' : 'bg-accent border-accent'
                } shadow-glow-primary`}></div>

                {/* Content */}
                <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-8 md:mr-8' : 'md:pl-8 md:ml-8'} ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                  <Card3D 
                    intensity="medium" 
                    glowColor={exp.color as 'primary' | 'secondary' | 'accent'}
                    className="w-full max-w-lg mx-auto md:mx-0"
                  >
                    <div className="space-y-4">
                      {/* Company Header */}
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{exp.logo}</span>
                        <div className="flex-1">
                          <h3 className={`text-xl font-bold ${
                            exp.color === 'primary' ? 'text-primary' :
                            exp.color === 'secondary' ? 'text-secondary' : 'text-accent'
                          }`}>
                            {exp.position}
                          </h3>
                          <p className="text-lg font-semibold text-foreground">
                            {exp.company}
                          </p>
                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mt-1">
                            <span>{exp.period}</span>
                            <span>•</span>
                            <span>{exp.location}</span>
                            <span>•</span>
                            <span className="px-2 py-0.5 bg-muted/50 rounded-full text-xs">
                              {exp.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className={`text-xs mt-1.5 ${
                              exp.color === 'primary' ? 'text-primary' :
                              exp.color === 'secondary' ? 'text-secondary' : 'text-accent'
                            }`}>
                              ▶
                            </span>
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.tech.map((tech) => (
                          <span 
                            key={tech}
                            className="px-2 py-1 bg-muted/50 text-xs rounded-full border border-border/30 text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card3D>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <Card3D intensity="low" className="p-8 max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4 text-primary">Ready to work together?</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Let's discuss how my experience can help your next project succeed.
            </p>
            <div className="flex gap-2">
              <a 
                href="#contact"
                className="flex-1 px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg text-primary text-sm font-medium hover:bg-primary/20 transition-all duration-300"
              >
                Get In Touch
              </a>
              <a 
                href="#"
                className="flex-1 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-lg text-secondary text-sm font-medium hover:bg-secondary/20 transition-all duration-300"
              >
                View Resume
              </a>
            </div>
          </Card3D>
        </div>
      </div>
    </section>
  );
};