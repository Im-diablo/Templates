import { useEffect, useRef, useState } from 'react';
import { Card3D } from '@/components/ui/Card3D';
import { Button3D } from '@/components/ui/Button3D';

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: 'alex@example.com',
      color: 'primary'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: '/in/alexjohnson',
      color: 'secondary'
    },
    {
      icon: '🐙',
      title: 'GitHub',
      value: '/alexjohnson',
      color: 'accent'
    },
    {
      icon: '🐦',
      title: 'Twitter',
      value: '@alexjohnson',
      color: 'primary'
    }
  ];

  return (
    <section ref={sectionRef} id="contact" className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-secondary bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <Card3D intensity="medium" glowColor="primary" className="h-full">
              <h3 className="text-2xl font-bold mb-6 text-primary">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 bg-input border-2 rounded-lg text-foreground placeholder-muted-foreground transition-all duration-300 ${
                      focusedField === 'name' 
                        ? 'border-primary shadow-glow-primary' 
                        : 'border-border'
                    }`}
                    placeholder="Your name"
                    required
                  />
                  {focusedField === 'name' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
                  )}
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 bg-input border-2 rounded-lg text-foreground placeholder-muted-foreground transition-all duration-300 ${
                      focusedField === 'email' 
                        ? 'border-secondary shadow-glow-secondary' 
                        : 'border-border'
                    }`}
                    placeholder="your@email.com"
                    required
                  />
                  {focusedField === 'email' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full animate-pulse" />
                  )}
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={5}
                    className={`w-full px-4 py-3 bg-input border-2 rounded-lg text-foreground placeholder-muted-foreground transition-all duration-300 resize-none ${
                      focusedField === 'message' 
                        ? 'border-accent shadow-glow-accent' 
                        : 'border-border'
                    }`}
                    placeholder="Tell me about your project..."
                    required
                  />
                  {focusedField === 'message' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
                  )}
                </div>

                <Button3D variant="hero" size="lg" type="submit" className="w-full group">
                  <span className="mr-2">Send Message</span>
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </Button3D>
              </form>
            </Card3D>
          </div>

          {/* Contact Info */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="space-y-6">
              <Card3D intensity="low" glowColor="secondary">
                <h3 className="text-2xl font-bold mb-6 text-secondary">Get In Touch</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  I'm always excited to work on new projects and collaborate with 
                  passionate people. Whether you have a specific project in mind or 
                  just want to explore possibilities, let's chat!
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📍</span>
                    <span className="text-foreground">San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🕒</span>
                    <span className="text-foreground">Available for freelance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💬</span>
                    <span className="text-foreground">Response within 24 hours</span>
                  </div>
                </div>
              </Card3D>

              {/* Social Links */}
              <div className="grid grid-cols-2 gap-4">
                {contactMethods.map((method, index) => (
                  <Card3D
                    key={method.title}
                    intensity="low"
                    glowColor={method.color as 'primary' | 'secondary' | 'accent'}
                    className="group cursor-pointer hover:scale-105 transition-transform duration-300"
                  >
                    <div className="text-center p-4">
                      <div className="text-3xl mb-2 group-hover:animate-bounce">
                        {method.icon}
                      </div>
                      <div className="text-sm font-medium text-foreground mb-1">
                        {method.title}
                      </div>
                      <div className={`text-xs ${
                        method.color === 'primary' ? 'text-primary' :
                        method.color === 'secondary' ? 'text-secondary' : 'text-accent'
                      }`}>
                        {method.value}
                      </div>
                    </div>
                  </Card3D>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <Card3D intensity={11} className="p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-primary">Ready to start something amazing?</h3>
            <p className="text-muted-foreground mb-6">
              Let's turn your vision into reality. I'm here to help you build something extraordinary.
            </p>
            <Button3D variant="hologram" size="xl" className="group">
              <span className="mr-2">Schedule a Call</span>
              <span className="inline-block transition-transform group-hover:scale-110">📞</span>
            </Button3D>
          </Card3D>
        </div>
      </div>
    </section>
  );
};