'use client';

import SplitText from '../ui/SplitText';
import MetallicPaint from '../ui/MetallicPaint';

const HeroSection = () => {
  const handleContactClick = () => {
    window.open('https://wa.me/5500000000000', '_blank');
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative" style={{ backgroundColor: 'var(--background)', boxShadow: 'var(--shadow-light)' }}>
      <div className="container mx-auto px-4 text-center">
        <MetallicPaint
          text="NEXIO"
          tag="h1"
          className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter"
          params={{
            patternScale: 2.0,
            refraction: 0.4,
            edge: 0.3,
            patternBlur: 0.5,
            liquid: 0.9,
            speed: 0.8
          }}
        />
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-on-scroll" data-animation="animate-fade-up" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
          Transformando ideias em soluções digitais inovadoras
        </p>
        <button
          onClick={handleContactClick}
          className="animate-on-scroll px-8 py-3 rounded-full text-lg font-medium transition-colors"
          data-animation="animate-fade-up"
          style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
        >
          Fale Conosco
        </button>
      </div>
    </section>
  );
};

export default HeroSection;