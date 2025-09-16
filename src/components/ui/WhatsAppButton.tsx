'use client';

import { useState, useEffect } from 'react';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5500000000000', '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Esconde o botão quando o footer está visível na tela com margem
        if (footerRect.top < windowHeight - 50) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };

    // Chama uma vez para definir estado inicial
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`fixed bottom-6 right-6 rounded-full p-3 shadow-lg z-40 transform transition-all ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100 rotate-0 duration-700 ease-out animate-bounce-in' 
          : 'opacity-0 translate-y-12 scale-50 rotate-180 duration-500 ease-in pointer-events-none'
      } hover:scale-125 hover:shadow-2xl hover:-translate-y-1 hover:rotate-12 active:scale-95`}
      style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
      aria-label="Contato via WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
    </button>
  );
};

export default WhatsAppButton;