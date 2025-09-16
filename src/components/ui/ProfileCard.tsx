'use client';

import React, { useRef, useEffect, useState } from 'react';

interface ProfileCardProps {
  avatarUrl?: string;
  iconUrl?: string;
  grainUrl?: string;
  behindGradient?: string;
  innerGradient?: string;
  gradient?: string;
  showBehindGradient?: boolean;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
  tiltEnabled?: boolean;
}

// Função para criar efeito metálico exato do NEXIO
const createMetallicStyle = (time: number) => {
  // Usar os mesmos parâmetros do MetallicPaint do NEXIO
  const patternScale = 2.0;
  const speed = 0.8;
  const liquid = 0.9;
  
  // Padrão ondulado idêntico ao NEXIO
  const wave1 = Math.sin((0.5 * patternScale + time * speed) * Math.PI * 2) * 0.5 + 0.5;
  const wave2 = Math.cos((0.5 * patternScale + time * speed * 0.7) * Math.PI * 2) * 0.5 + 0.5;
  const wave3 = Math.sin(((0.5 + 0.5) * patternScale + time * speed * 1.3) * Math.PI) * 0.5 + 0.5;
  
  // Combinar ondas exatamente como no NEXIO
  const metallic = (wave1 * 0.4 + wave2 * 0.3 + wave3 * 0.3) * liquid;
  
  // Cores metálicas idênticas ao NEXIO (prata/cromado)
  const baseColor = 0.3 + metallic * 0.7;
  const highlight = Math.pow(metallic, 2) * 0.8;
  
  // Cores finais com efeito metálico do NEXIO
  const r = Math.floor((baseColor + highlight) * 255 * 0.9);
  const g = Math.floor((baseColor + highlight) * 255 * 0.95);
  const b = Math.floor((baseColor + highlight) * 255);
  
  return {
    background: `linear-gradient(135deg, 
      rgba(${r}, ${g}, ${b}, 0.3),
      rgba(${Math.floor(r * 0.8)}, ${Math.floor(g * 0.85)}, ${Math.floor(b * 0.9)}, 0.1)
    )`,
    boxShadow: `0 0 ${30 + metallic * 20}px rgba(${r}, ${g}, ${b}, ${0.4 + metallic * 0.4}), inset 0 0 ${20 + metallic * 10}px rgba(${r}, ${g}, ${b}, ${0.2 + metallic * 0.2})`
  };
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarUrl = "",
  iconUrl,
  grainUrl,
  behindGradient,
  innerGradient,
  gradient,
  showBehindGradient = true,
  className = "",
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = "Javi A. Torres",
  title = "Software Engineer",
  handle = "javicodes",
  status = "Online",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick,
  tiltEnabled
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  
  // Processar gradient prop para cores metálicas
  const processedInnerGradient = gradient 
    ? 'linear-gradient(135deg, #c0c0c0 0%, #808080 30%, #a8a8a8 70%, #909090 100%)'
    : innerGradient || 'linear-gradient(135deg, #c0c0c0 0%, #808080 50%, #a0a0a0 100%)';
  const [isHovered, setIsHovered] = useState(false);
  const [metallicStyle, setMetallicStyle] = useState({});
  const animationRef = useRef<number>();

  // Animação do efeito metálico
  useEffect(() => {
    const animate = () => {
      const time = Date.now() * 0.001;
      setMetallicStyle(createMetallicStyle(time));
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!enableTilt) return;
    setTransform('');
    setIsHovered(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!enableMobileTilt || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / mobileTiltSensitivity;
    const rotateY = (centerX - x) / mobileTiltSensitivity;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
  };

  const handleTouchEnd = () => {
    if (!enableMobileTilt) return;
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div className={`profile-card-wrapper ${className}`}>
      <div
        ref={cardRef}
        className="profile-card"
        style={{
          transform,
          transition: 'transform 0.1s ease-out',
          transformStyle: 'preserve-3d',
          ...(isHovered ? metallicStyle : {})
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Gradient */}
        {showBehindGradient && behindGradient && (
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: behindGradient,
              zIndex: 0,
            }}
          />
        )}

        {/* Icon Pattern Overlay */}
        {iconUrl && (
          <div
            className="absolute inset-0 rounded-2xl opacity-10"
            style={{
              backgroundImage: `url(${iconUrl})`,
              backgroundRepeat: 'repeat',
              backgroundSize: '50px 50px',
              zIndex: 1,
            }}
          />
        )}

        {/* Grain Texture */}
        {grainUrl && (
          <div
            className="absolute inset-0 rounded-2xl opacity-20"
            style={{
              backgroundImage: `url(${grainUrl})`,
              backgroundRepeat: 'repeat',
              zIndex: 2,
            }}
          />
        )}

        {/* Main Card Content */}
        <div
          className="relative w-80 h-96 rounded-2xl p-6 flex flex-col items-center justify-center text-white overflow-hidden"
          style={{
            background: processedInnerGradient,
            zIndex: 3,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Status Indicator */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs opacity-80">{status}</span>
          </div>

          {/* Avatar */}
          <div className="relative mb-4">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/20">
                <span className="text-2xl font-bold text-white/80">
                  {name.charAt(0)}
                </span>
              </div>
            )}
            
            {/* Mini Avatar */}
            {miniAvatarUrl && (
              <img
                src={miniAvatarUrl}
                alt="Mini avatar"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-2 border-white"
              />
            )}
          </div>

          {/* User Info */}
          {showUserInfo && (
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-1">{name}</h3>
              <p className="text-sm opacity-80 mb-2">{title}</p>
              <p className="text-xs opacity-60">@{handle}</p>
            </div>
          )}

          {/* Contact Button */}
          {onContactClick && (
            <button
              onClick={onContactClick}
              className="group relative px-6 py-3 text-white rounded-lg font-medium transition-all duration-300 transform-gpu shadow-lg hover:shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #c0c0c0 0%, #808080 30%, #a8a8a8 70%, #909090 100%)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)',
                transform: 'translateY(0px)',
                transition: 'all 0.2s ease'
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(2px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.3)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)';
              }}
            >
              <span className="relative z-10 drop-shadow-sm">{contactText}</span>
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{background: 'linear-gradient(135deg, #b8b8b8 0%, #707070 100%)'}} />
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .profile-card-wrapper {
          perspective: 1000px;
        }
        
        .profile-card {
          position: relative;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ProfileCard;