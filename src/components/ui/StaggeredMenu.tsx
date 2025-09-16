'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './StaggeredMenu.css';

interface MenuItem {
  label: string;
  href: string;
}

interface SocialItem {
  label: string;
  href: string;
}

interface StaggeredMenuProps {
  menuItems: MenuItem[];
  socialItems?: SocialItem[];
  logo?: string;
  logoAlt?: string;
  position?: 'left' | 'right';
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  menuItems = [],
  socialItems = [],
  logo,
  logoAlt = 'Logo',
  position = 'right',
  accentColor = '#5227ff',
  backgroundColor = 'white',
  textColor = '#000',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const prelayersRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLAnchorElement[]>([]);
  const socialsRef = useRef<HTMLAnchorElement[]>([]);

  const playOpen = () => {
    if (!panelRef.current || !prelayersRef.current || !iconRef.current || !textRef.current) return;

    const tl = gsap.timeline();
    const panel = panelRef.current;
    const prelayers = prelayersRef.current.children;
    const icon = iconRef.current;
    const text = textRef.current;
    const items = itemsRef.current;
    const socials = socialsRef.current;

    // Set initial states
    gsap.set(panel, { x: position === 'right' ? '100%' : '-100%' });
    gsap.set(prelayers, { x: position === 'right' ? '100%' : '-100%' });
    gsap.set(items, { x: 50, opacity: 0 });
    gsap.set(socials, { x: 20, opacity: 0 });

    // Animate prelayers
    tl.to(prelayers, {
      x: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1
    });

    // Animate panel
    tl.to(panel, {
      x: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6');

    // Animate icon
    animateIcon(icon, true);

    // Animate text
    animateText(text, true);

    // Animate items
    tl.to(items, {
      x: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1
    }, '-=0.4');

    // Animate socials
    tl.to(socials, {
      x: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
      stagger: 0.05
    }, '-=0.2');
  };

  const playClose = () => {
    if (!panelRef.current || !prelayersRef.current || !iconRef.current || !textRef.current) return;

    const tl = gsap.timeline();
    const panel = panelRef.current;
    const prelayers = prelayersRef.current.children;
    const icon = iconRef.current;
    const text = textRef.current;
    const items = itemsRef.current;
    const socials = socialsRef.current;

    // Animate items out
    tl.to(items, {
      x: 50,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      stagger: 0.05
    });

    // Animate socials out
    tl.to(socials, {
      x: 20,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      stagger: 0.02
    }, '-=0.2');

    // Animate panel out
    tl.to(panel, {
      x: position === 'right' ? '100%' : '-100%',
      duration: 0.6,
      ease: 'power3.in'
    }, '-=0.1');

    // Animate prelayers out
    tl.to(prelayers, {
      x: position === 'right' ? '100%' : '-100%',
      duration: 0.6,
      ease: 'power3.in',
      stagger: 0.05
    }, '-=0.5');

    // Animate icon
    animateIcon(icon, false);

    // Animate text
    animateText(text, false);
  };

  const animateIcon = (icon: HTMLElement, isOpen: boolean) => {
    const lines = icon.querySelectorAll('.sm-icon-line');
    if (lines.length >= 2) {
      if (isOpen) {
        gsap.to(lines[0], { rotation: 45, duration: 0.3 });
        gsap.to(lines[1], { rotation: -45, duration: 0.3 });
      } else {
        gsap.to(lines[0], { rotation: 0, duration: 0.3 });
        gsap.to(lines[1], { rotation: 0, duration: 0.3 });
      }
    }
  };

  const animateColor = (element: HTMLElement, isOpen: boolean) => {
    gsap.to(element, {
      color: isOpen ? textColor : '#e9e9ef',
      duration: 0.3
    });
  };

  const animateText = (textElement: HTMLElement, isOpen: boolean) => {
    const textInner = textElement.querySelector('.sm-toggle-textInner');
    if (textInner) {
      gsap.to(textInner, {
        y: isOpen ? '-50%' : '0%',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const toggleMenu = () => {
    if (isOpen) {
      playClose();
    } else {
      playOpen();
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.setProperty('--sm-accent', accentColor);
    }
  }, [accentColor]);

  return (
    <div
      ref={wrapperRef}
      className={`staggered-menu-wrapper ${className}`}
      data-open={isOpen}
      data-position={position}
      style={{
        '--sm-accent': accentColor,
        '--sm-bg': backgroundColor,
        '--sm-text': textColor
      } as React.CSSProperties}
    >
      {/* Prelayers */}
      <div ref={prelayersRef} className="sm-prelayers">
        <div className="sm-prelayer" style={{ backgroundColor: accentColor }}></div>
        <div className="sm-prelayer" style={{ backgroundColor: backgroundColor }}></div>
      </div>

      {/* Header */}
      <header className="staggered-menu-header">
        {/* Logo */}
        <div className="sm-logo">
          {logo && (
            <img
              src={logo}
              alt={logoAlt}
              className="sm-logo-img"
            />
          )}
        </div>

        {/* Toggle Button */}
        <button
          ref={toggleRef}
          className="sm-toggle"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <div className="sm-toggle-textWrap">
            <div ref={textRef} className="sm-toggle-textInner">
              <span className="sm-toggle-line">Menu</span>
              <span className="sm-toggle-line">Close</span>
            </div>
          </div>
          <div ref={iconRef} className="sm-icon">
            <span className="sm-icon-line"></span>
            <span className="sm-icon-line"></span>
          </div>
        </button>
      </header>

      {/* Panel */}
      <div
        ref={panelRef}
        className="staggered-menu-panel"
        style={{ backgroundColor }}
      >
        <div className="sm-panel-inner">
          {/* Menu Items */}
          <nav>
            <ul className="sm-panel-list" data-numbering>
              {menuItems && menuItems.length > 0 && menuItems.map((item, index) => (
                <li key={index} className="sm-panel-itemWrap">
                  <a
                    ref={(el) => {
                      if (el) itemsRef.current[index] = el;
                    }}
                    href={item.href}
                    className="sm-panel-item"
                    style={{ color: textColor }}
                  >
                    <span className="sm-panel-itemLabel">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links */}
          {socialItems && socialItems.length > 0 && (
            <div className="sm-socials">
              <h3 className="sm-socials-title">Follow</h3>
              <ul className="sm-socials-list">
                {socialItems.map((social, index) => (
                  <li key={index}>
                    <a
                      ref={(el) => {
                        if (el) socialsRef.current[index] = el;
                      }}
                      href={social.href}
                      className="sm-socials-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaggeredMenu;