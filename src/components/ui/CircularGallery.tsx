'use client';

import { useRef, useEffect, useState } from 'react';

interface GalleryItem {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface CircularGalleryProps {
  items: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  scrollSpeed?: number;
  scrollEase?: number;
}

const CircularGallery: React.FC<CircularGalleryProps> = ({
  items,
  bend = 3,
  textColor = '#ffffff',
  borderRadius = 0.05,
  scrollSpeed = 2,
  scrollEase = 0.05
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [targetRotation, setTargetRotation] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * scrollSpeed * 0.01;
      setTargetRotation(prev => prev + delta);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [scrollSpeed]);

  useEffect(() => {
    const animate = () => {
      setRotation(prev => {
        const diff = targetRotation - prev;
        return prev + diff * scrollEase;
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, [targetRotation, scrollEase]);

  const radius = 300;
  const angleStep = (2 * Math.PI) / items.length;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[600px] flex items-center justify-center overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <div 
        className="relative"
        style={{
          transform: `rotateY(${rotation}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out'
        }}
      >
        {items.map((item, index) => {
          const angle = index * angleStep;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius * bend;
          const rotateY = (angle * 180) / Math.PI;

          return (
            <div
              key={index}
              className="absolute flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110"
              style={{
                transform: `translate3d(${x}px, 0, ${z}px) rotateY(${-rotateY}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div 
                className="w-48 h-32 mb-4 overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-3xl"
                style={{
                  borderRadius: `${borderRadius * 100}%`,
                  background: 'linear-gradient(135deg, #c0c0c0 0%, #808080 30%, #a8a8a8 70%, #909090 100%)'
                }}
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                  style={{
                    borderRadius: `${borderRadius * 100}%`
                  }}
                />
              </div>
              <div className="text-center">
                <p 
                  className="font-bold text-sm mb-1"
                  style={{ color: textColor }}
                >
                  {item.title}
                </p>
                <p 
                  className="text-xs opacity-80"
                  style={{ color: textColor }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Instruções de uso */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm opacity-60" style={{ color: textColor }}>
          Role o mouse para navegar
        </p>
      </div>
    </div>
  );
};

export default CircularGallery;