'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '@/components/ui/ThemeToggle';
import MobileMenu from '@/components/ui/MobileMenu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Adiciona animação mais suave com offset para não ficar colado no topo
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}
      style={{ backgroundColor: isScrolled ? 'var(--header-bg)' : 'transparent' }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div style={{ filter: 'var(--logo-filter)' }}>
            <img src="/nexio-logo.svg" alt="Nexio Logo" width={120} height={40} />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <button 
            onClick={() => scrollToSection('home')} 
            className="hover:opacity-70 transition-all duration-300 animate-on-scroll"
            data-animation="animate-fade-up"
            style={{ color: 'var(--foreground)' }}
          >
            Início
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="hover:opacity-70 transition-all duration-300 animate-on-scroll"
            data-animation="animate-fade-up"
            style={{ color: 'var(--foreground)', animationDelay: '0.1s' }}
          >
            Sobre
          </button>
          <button 
            onClick={() => scrollToSection('ceos')} 
            className="hover:opacity-70 transition-all duration-300 animate-on-scroll"
            data-animation="animate-fade-up"
            style={{ color: 'var(--foreground)', animationDelay: '0.2s' }}
          >
            CEOs
          </button>
          <button 
            onClick={() => scrollToSection('technologies')} 
            className="hover:opacity-70 transition-all duration-300 animate-on-scroll"
            data-animation="animate-fade-up"
            style={{ color: 'var(--foreground)', animationDelay: '0.3s' }}
          >
            Tecnologias
          </button>
          <button 
            onClick={() => scrollToSection('projects')} 
            className="hover:opacity-70 transition-all duration-300 animate-on-scroll"
            data-animation="animate-fade-up"
            style={{ color: 'var(--foreground)', animationDelay: '0.4s' }}
          >
            Projetos
          </button>
          <button 
            onClick={() => scrollToSection('feedback')} 
            className="hover:opacity-70 transition-all duration-300 animate-on-scroll"
            data-animation="animate-fade-up"
            style={{ color: 'var(--foreground)', animationDelay: '0.5s' }}
          >
            Feedback
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="hover:opacity-70 transition-all duration-300 animate-on-scroll"
            data-animation="animate-fade-up"
            style={{ color: 'var(--foreground)', animationDelay: '0.6s' }}
          >
            Contato
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileMenu
              menuItems={[
                { label: 'Início', href: '#home' },
                { label: 'Sobre', href: '#about' },
                { label: 'CEOs', href: '#ceos' },
                { label: 'Tecnologias', href: '#technologies' },
                { label: 'Projetos', href: '#projects' },
                { label: 'Feedback', href: '#feedback' },
                { label: 'Contato', href: '#contact' }
              ]}
              socialItems={[
                { label: 'Instagram', href: 'https://instagram.com/nexio', icon: 'instagram' },
                { label: 'LinkedIn', href: 'https://linkedin.com/company/nexio', icon: 'linkedin' },
                { label: 'GitHub', href: 'https://github.com/nexio', icon: 'github' }
              ]}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;