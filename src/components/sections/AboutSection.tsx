const AboutSection = () => {
  return (
    <section id="about" className="py-20" style={{ backgroundColor: 'var(--section-bg)', boxShadow: 'var(--shadow-light)' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-on-scroll" data-animation="animate-fade-up" style={{ color: 'var(--foreground)' }}>
          Sobre a Nexio
        </h2>
        
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg mb-6 animate-on-scroll" data-animation="animate-fade-left" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
            A Nexio é uma empresa digital inovadora especializada em desenvolver soluções tecnológicas de alta qualidade que transformam a maneira como as empresas operam no ambiente digital.
          </p>
          <p className="text-lg mb-6 animate-on-scroll" data-animation="animate-fade-right" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
            Nossa missão é criar experiências digitais excepcionais que combinam design elegante com funcionalidade robusta, ajudando nossos clientes a alcançarem seus objetivos de negócio.
          </p>
          <p className="text-lg animate-on-scroll" data-animation="animate-fade-up" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
            Com uma equipe de profissionais altamente qualificados, estamos comprometidos em oferecer soluções personalizadas que atendam às necessidades específicas de cada cliente, garantindo resultados que superam expectativas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;