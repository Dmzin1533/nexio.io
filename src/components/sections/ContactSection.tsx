'use client';

const ContactSection = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços da Nexio.');
    window.open(`https://wa.me/5586994863989?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className="py-20" style={{ backgroundColor: 'var(--section-bg)', boxShadow: 'var(--shadow-light)' }}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 animate-on-scroll" data-animation="animate-fade-up" style={{ color: 'var(--foreground)' }}>
          Entre em Contato
        </h2>
        <p className="text-lg mb-10 max-w-2xl mx-auto animate-on-scroll" data-animation="animate-fade-up" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
          Estamos prontos para transformar suas ideias em realidade. Entre em contato conosco para discutir seu próximo projeto.
        </p>
        <button
          onClick={handleWhatsAppClick}
          className="px-8 py-4 rounded-full text-lg font-medium transition-colors inline-flex items-center animate-on-scroll" data-animation="animate-fade-up" style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          Fale Conosco no WhatsApp
        </button>
      </div>
    </section>
  );
};

export default ContactSection;