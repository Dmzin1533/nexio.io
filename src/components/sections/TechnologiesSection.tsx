import TiltedCard from '../ui/TiltedCard';

const TechnologiesSection = () => {
  const technologies = [
    { 
      name: 'JavaScript', 
      icon: 'javascript.svg', 
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript',
      description: 'Linguagem de programação que permite implementar funcionalidades complexas em páginas web.'
    },
    { 
      name: 'TypeScript', 
      icon: 'typescript.svg', 
      url: 'https://www.typescriptlang.org/',
      description: 'Superset do JavaScript que adiciona tipagem estática opcional à linguagem.'
    },
    { 
      name: 'React', 
      icon: 'react.svg', 
      url: 'https://reactjs.org/',
      description: 'Biblioteca JavaScript para construir interfaces de usuário com componentes reutilizáveis.'
    },
    { 
      name: 'Node.js', 
      icon: 'nodejs.svg', 
      url: 'https://nodejs.org/',
      description: 'Ambiente de execução JavaScript server-side que permite construir aplicações escaláveis.'
    },
    { 
      name: 'MongoDB', 
      icon: 'mongodb.svg', 
      url: 'https://www.mongodb.com/',
      description: 'Banco de dados NoSQL orientado a documentos, de alta performance e escalabilidade.'
    },
    { 
      name: 'HTML5', 
      icon: 'html5.svg', 
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML',
      description: 'Linguagem de marcação para estruturar e apresentar conteúdo na web.'
    },
    { 
      name: 'CSS3', 
      icon: 'css3.svg', 
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS',
      description: 'Linguagem de estilo usada para descrever a apresentação de documentos HTML.'
    },
    { 
      name: 'Next.js', 
      icon: 'nextjs.svg', 
      url: 'https://nextjs.org/',
      description: 'Framework React para produção que oferece renderização híbrida estática e de servidor.'
    },
  ];

  return (
    <section id="technologies" className="py-20 relative" style={{ backgroundColor: 'var(--section-bg)', boxShadow: 'var(--shadow-light)', zIndex: 1 }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-on-scroll" data-animation="animate-fade-up" style={{ color: 'var(--foreground)' }}>
          Nossas Tecnologias
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {technologies.map((tech, index) => (
            <div key={index} className="flex flex-col items-center animate-on-scroll" data-animation="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <a 
                href={tech.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block mb-4"
              >
                <TiltedCard
                  imageSrc={`/tech-icons/${tech.icon}`}
                  altText={tech.name}
                  captionText={tech.description}
                  containerHeight="120px"
                  containerWidth="120px"
                  imageHeight="96px"
                  imageWidth="96px"
                  scaleOnHover={1.05}
                  rotateAmplitude={12}
                  showMobileWarning={false}
                  showTooltip={true}
                />
              </a>
              <span className="font-medium text-center" style={{ color: 'var(--foreground)' }}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;