'use client';

import React, { useRef, useEffect, useState } from 'react';

interface ShaderParams {
  patternScale?: number;
  refraction?: number;
  edge?: number;
  patternBlur?: number;
  liquid?: number;
  speed?: number;
}

interface MetallicPaintProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  params?: ShaderParams;
}

const MetallicPaint: React.FC<MetallicPaintProps> = ({
  text,
  className = '',
  tag = 'h1',
  params = {
    patternScale: 1.5,
    refraction: 0.3,
    edge: 0.2,
    patternBlur: 0.1,
    liquid: 0.8,
    speed: 1.0
  }
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLElement>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const animationRef = useRef<number>();

  // Função para gerar dados de imagem do texto
  const parseLogoImage = (text: string, fontSize: number = 120): ImageData | null => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Configurar canvas temporário
    canvas.width = 800;
    canvas.height = 200;
    
    // Configurar fonte
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Desenhar texto
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  };

  // Shader fragment para efeito metálico
  const createMetallicEffect = (canvas: HTMLCanvasElement, imageData: ImageData, time: number) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const outputData = ctx.createImageData(width, height);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const sourceI = Math.min(i, imageData.data.length - 4);
        
        // Obter alpha do texto original
        const alpha = imageData.data[sourceI + 3];
        
        if (alpha > 0) {
          // Calcular efeito metálico
          const normalizedX = x / width;
          const normalizedY = y / height;
          
          // Padrão ondulado para simular reflexão metálica
          const wave1 = Math.sin((normalizedX * params.patternScale! + time * params.speed!) * Math.PI * 2) * 0.5 + 0.5;
          const wave2 = Math.cos((normalizedY * params.patternScale! + time * params.speed! * 0.7) * Math.PI * 2) * 0.5 + 0.5;
          const wave3 = Math.sin(((normalizedX + normalizedY) * params.patternScale! + time * params.speed! * 1.3) * Math.PI) * 0.5 + 0.5;
          
          // Combinar ondas para criar padrão metálico
          const metallic = (wave1 * 0.4 + wave2 * 0.3 + wave3 * 0.3) * params.liquid!;
          
          // Cores metálicas (prata/cromado)
          const baseColor = 0.3 + metallic * 0.7;
          const highlight = Math.pow(metallic, 2) * 0.8;
          
          // Aplicar refração
          const refractX = Math.floor(x + (wave1 - 0.5) * params.refraction! * 10);
          const refractY = Math.floor(y + (wave2 - 0.5) * params.refraction! * 10);
          
          // Garantir que estamos dentro dos limites
          const clampedX = Math.max(0, Math.min(width - 1, refractX));
          const clampedY = Math.max(0, Math.min(height - 1, refractY));
          const refractI = (clampedY * width + clampedX) * 4;
          
          // Cores finais com efeito metálico
          const r = Math.floor((baseColor + highlight) * 255 * 0.9); // Tons de prata
          const g = Math.floor((baseColor + highlight) * 255 * 0.95);
          const b = Math.floor((baseColor + highlight) * 255);
          
          outputData.data[i] = r;
          outputData.data[i + 1] = g;
          outputData.data[i + 2] = b;
          outputData.data[i + 3] = alpha;
        } else {
          // Pixel transparente
          outputData.data[i] = 0;
          outputData.data[i + 1] = 0;
          outputData.data[i + 2] = 0;
          outputData.data[i + 3] = 0;
        }
      }
    }
    
    ctx.putImageData(outputData, 0, 0);
  };

  // Função de animação
  const animate = () => {
    if (!canvasRef.current || !imageData) return;
    
    const time = Date.now() * 0.001; // Converter para segundos
    createMetallicEffect(canvasRef.current, imageData, time);
    
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!textRef.current) return;
    
    // Gerar dados de imagem do texto
    const data = parseLogoImage(text);
    if (data) {
      setImageData(data);
    }
  }, [text]);

  useEffect(() => {
    if (!imageData || !canvasRef.current) return;
    
    // Configurar canvas
    const canvas = canvasRef.current;
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    
    // Iniciar animação
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [imageData]);

  const Tag = tag as keyof JSX.IntrinsicElements;

  return (
    <div className={`relative ${className}`}>
      <Tag
        ref={textRef as any}
        className="opacity-0 absolute inset-0 pointer-events-none"
        style={{ fontSize: '120px', fontWeight: 'bold' }}
      >
        {text}
      </Tag>
      <canvas
        ref={canvasRef}
        className="block mx-auto"
        style={{
          maxWidth: '100%',
          height: 'auto',
          filter: `blur(${params.patternBlur}px)`
        }}
      />
    </div>
  );
};

export default MetallicPaint;