'use client';

import ProfileCard from '../ui/ProfileCard';

const CEOsSection = () => {
  const handleDavidContact = () => {
    window.open('https://portfolio-david.com', '_blank');
  };

  const handleJoaoContact = () => {
    window.open('https://portfolio-joaovitor.com', '_blank');
  };

  return (
    <section id="ceos" className="py-20" style={{ backgroundColor: 'var(--section-bg)', boxShadow: 'var(--shadow-light)' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-on-scroll" data-animation="animate-fade-up" style={{ color: 'var(--foreground)' }}>
          Nossos CEOs
        </h2>
        
        <div className="flex flex-col md:flex-row gap-12 justify-center items-center max-w-6xl mx-auto">
          {/* CEO 1 - David */}
          <div className="animate-on-scroll" data-animation="animate-fade-left">
            <ProfileCard
              avatarUrl="/images/ceos/david.svg"
              name="David Marlid"
              title="CEO & Founder"
              handle="@david_marlid"
              status="Online"
              gradient="from-gray-400 to-gray-600"
              onContactClick={handleDavidContact}
              contactText="Ver portfolio"
              tiltEnabled={true}
            />
          </div>
          
          {/* CEO 2 - João Vitor */}
          <div className="animate-on-scroll" data-animation="animate-fade-right">
            <ProfileCard
              avatarUrl="/images/ceos/joao-vitor.svg"
              name="João Vitor"
              title="Back-end Developer & System Architect"
              handle="joao_backend"
              status="Online"
              contactText="Ver Portfólio"
              onContactClick={handleJoaoContact}
              gradient="from-gray-400 to-gray-600"
              tiltEnabled={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEOsSection;