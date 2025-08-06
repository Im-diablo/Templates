import { useEffect, useRef, useState } from 'react';
import { Card3D } from '@/components/ui/Card3D';
import { Button3D } from '@/components/ui/Button3D';

export const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      title: 'NeuroFlow AI Platform',
      description: 'A revolutionary AI-powered mental health platform that uses machine learning to provide personalized therapy recommendations and mood tracking. Features real-time sentiment analysis and predictive mental health insights.',
      tech: ['React', 'Python', 'TensorFlow', 'AWS', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
      color: 'primary',
      github: '#',
      live: '#',
      featured: true,
      stats: { users: '10K+', uptime: '99.9%' }
    },
    {
      id: 2,
      title: 'CryptoVault DeFi',
      description: 'Decentralized finance application with smart contracts for automated trading, yield farming, and portfolio management. Built with advanced security features and gas optimization techniques.',
      tech: ['Next.js', 'Solidity', 'Web3.js', 'GraphQL', 'IPFS'],
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop',
      color: 'secondary',
      github: '#',
      live: '#',
      featured: true,
      stats: { tvl: '$2.5M', apr: '12.5%' }
    },
    {
      id: 3,
      title: 'Quantum Commerce',
      description: 'Next-generation e-commerce platform with AR try-on features, AI-powered recommendations, and real-time inventory management. Supports multi-vendor marketplace functionality.',
      tech: ['Vue.js', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      color: 'accent',
      github: '#',
      live: '#',
      featured: false,
      stats: { revenue: '+250%', conversion: '15.8%' }
    },
    {
      id: 4,
      title: 'MetaVerse Studio',
      description: 'Immersive 3D design platform for creating virtual environments, with collaborative tools and real-time rendering for VR/AR experiences. Supports multi-user editing sessions.',
      tech: ['Three.js', 'WebGL', 'TypeScript', 'Socket.io', 'WebRTC'],
      image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=600&h=400&fit=crop',
      color: 'primary',
      github: '#',
      live: '#',
      featured: false,
      stats: { scenes: '1K+', users: '5K+' }
    },
    {
      id: 5,
      title: 'DevFlow Analytics',
      description: 'Comprehensive developer productivity dashboard with code quality metrics, team collaboration insights, and automated reporting. Integrates with popular development tools.',
      tech: ['React', 'D3.js', 'Node.js', 'MongoDB', 'Docker'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      color: 'secondary',
      github: '#',
      live: '#',
      featured: false,
      stats: { teams: '200+', insights: '99.2%' }
    },
    {
      id: 6,
      title: 'EcoTrack Sustainability',
      description: 'Environmental impact tracking application for businesses and individuals. Features carbon footprint calculations, sustainability goals, and green initiative recommendations.',
      tech: ['Svelte', 'FastAPI', 'SQLite', 'Chart.js', 'PWA'],
      image: 'https://images.unsplash.com/photo-1569163139394-de44cb5894c9?w=600&h=400&fit=crop',
      color: 'accent',
      github: '#',
      live: '#',
      featured: false,
      stats: { co2saved: '500T', users: '15K+' }
    }
  ];

  return (
    <section ref={sectionRef} id="projects" className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Innovative solutions that push the boundaries of what's possible
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-12">
          <h3 className={`text-2xl font-bold mb-8 text-center transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            🌟 Featured Projects
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.filter(p => p.featured).map((project, index) => (
              <div
                key={project.id}
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <Card3D 
                  intensity="high" 
                  glowColor={project.color as 'primary' | 'secondary' | 'accent'}
                  className="group cursor-pointer overflow-hidden h-full"
                  onClick={() => setSelectedProject(index)}
                >
                  <div className="relative">
                    {/* Featured Badge */}
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gradient-primary text-primary-foreground text-xs font-bold rounded-full">
                      FEATURED
                    </div>

                    {/* Project Image */}
                    <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      
                      {/* Floating Tech Icons */}
                      <div className="absolute top-4 right-4 flex gap-2">
                        {project.tech.slice(0, 3).map((tech, i) => (
                          <span 
                            key={tech}
                            className="px-2 py-1 bg-card/80 backdrop-blur-sm text-xs rounded-full border border-border/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="space-y-4">
                      <h3 className={`text-2xl font-bold ${
                        project.color === 'primary' ? 'text-primary' :
                        project.color === 'secondary' ? 'text-secondary' : 'text-accent'
                      }`}>
                        {project.title}
                      </h3>
                      
                      <p className="text-muted-foreground">
                        {project.description}
                      </p>

                      {/* Stats */}
                      <div className="flex gap-4 text-sm">
                        {Object.entries(project.stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="font-bold text-foreground">{value}</div>
                            <div className="text-muted-foreground capitalize">{key}</div>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span 
                            key={tech}
                            className="px-3 py-1 bg-muted/50 text-xs rounded-full border border-border/30 text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 pt-4">
                        <Button3D variant="neon" size="sm" className="flex-1">
                          <span className="mr-2">View Live</span>
                          <span>↗</span>
                        </Button3D>
                        <Button3D variant="cyber" size="sm" className="flex-1">
                          <span className="mr-2">GitHub</span>
                          <span>⚡</span>
                        </Button3D>
                      </div>
                    </div>
                  </div>
                </Card3D>
              </div>
            ))}
          </div>
        </div>

        {/* Other Projects */}
        <div className="mb-16">
          <h3 className={`text-2xl font-bold mb-8 text-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            More Projects
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(p => !p.featured).map((project, index) => (
              <div
                key={project.id}
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${0.6 + index * 0.1}s` }}
              >
                <Card3D 
                  intensity="medium" 
                  glowColor={project.color as 'primary' | 'secondary' | 'accent'}
                  className="group cursor-pointer overflow-hidden h-full"
                >
                  <div className="relative">
                    {/* Project Image */}
                    <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    </div>

                    {/* Project Info */}
                    <div className="space-y-3">
                      <h4 className={`text-lg font-bold ${
                        project.color === 'primary' ? 'text-primary' :
                        project.color === 'secondary' ? 'text-secondary' : 'text-accent'
                      }`}>
                        {project.title}
                      </h4>
                      
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 3).map((tech) => (
                          <span 
                            key={tech}
                            className="px-2 py-0.5 bg-muted/50 text-xs rounded-full border border-border/30 text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button3D variant="neon" size="sm" className="flex-1 text-xs">
                          <span>Live</span>
                        </Button3D>
                        <Button3D variant="cyber" size="sm" className="flex-1 text-xs">
                          <span>Code</span>
                        </Button3D>
                      </div>
                    </div>
                  </div>
                </Card3D>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Project Showcase */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <Card3D intensity={11} className="p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-primary">Want to see more?</h3>
            <p className="text-muted-foreground mb-6">
              Check out my complete portfolio on GitHub or get in touch to discuss your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button3D variant="hero" size="lg">
                <span className="mr-2">View All Projects</span>
                <span>→</span>
              </Button3D>
              <Button3D variant="hologram" size="lg">
                <span className="mr-2">Let's Collaborate</span>
                <span>✦</span>
              </Button3D>
            </div>
          </Card3D>
        </div>
      </div>
    </section>
  );
};