const ProjectsSection = () => {
  const projects = [
    {
      title: 'E-commerce Premium',
      description: 'Plataforma completa de e-commerce com sistema de pagamentos integrado e painel administrativo.',
      link: 'https://projeto1.nexio.com',
    },
    {
      title: 'App de Gestão Financeira',
      description: 'Aplicativo mobile para controle de finanças pessoais com dashboard interativo e relatórios detalhados.',
      link: 'https://projeto2.nexio.com',
    },
    {
      title: 'Sistema de Agendamento',
      description: 'Solução para agendamento online com integração de calendário e notificações automáticas.',
      link: 'https://projeto3.nexio.com',
    },
    {
      title: 'Portal Educacional',
      description: 'Plataforma de ensino online com recursos de videoaulas, exercícios interativos e fórum de discussão.',
      link: 'https://projeto4.nexio.com',
    },
  ];

  return (
    <section id="projects" className="py-20" style={{ backgroundColor: 'var(--section-bg)', boxShadow: 'var(--shadow-light)' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-on-scroll" data-animation="animate-fade-up" style={{ color: 'var(--foreground)' }}>
          Nossos Projetos
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="p-6 rounded-lg transition-shadow animate-on-scroll card"
              data-animation={index % 2 === 0 ? "animate-fade-left" : "animate-fade-right"}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-light)'
              }}
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>{project.title}</h3>
              <p className="mb-4" style={{ color: 'var(--foreground)', opacity: 0.7 }}>{project.description}</p>
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium hover:underline" style={{ color: 'var(--foreground)' }}
              >
                Ver projeto →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;