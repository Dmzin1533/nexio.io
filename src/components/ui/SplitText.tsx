'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Registrar plugins
gsap.registerPlugin(GSAPSplitText, ScrollTrigger, useGSAP);

interface SplitTextProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars';
  from?: Record<string, any>;
  to?: Record<string, any>;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right';
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  tag = 'p',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete
}) => {
  const textRef = useRef<HTMLElement>(null);
  const splitRef = useRef<GSAPSplitText | null>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    // Criar o SplitText
    splitRef.current = new GSAPSplitText(textRef.current, {
      type: splitType,
      linesClass: 'split-line',
      wordsClass: 'split-word',
      charsClass: 'split-char'
    });

    // Determinar quais elementos animar baseado no splitType
    let elementsToAnimate;
    if (splitType.includes('chars')) {
      elementsToAnimate = splitRef.current.chars;
    } else if (splitType.includes('words')) {
      elementsToAnimate = splitRef.current.words;
    } else {
      elementsToAnimate = splitRef.current.lines;
    }

    // Definir estado inicial
    gsap.set(elementsToAnimate, from);

    // Criar animação que executa imediatamente
    const tl = gsap.timeline({
      delay: 0.5, // Pequeno delay para garantir que o DOM esteja pronto
      onComplete: onLetterAnimationComplete
    });

    // Animar elementos com stagger
    tl.to(elementsToAnimate, {
      ...to,
      duration: duration,
      ease: ease,
      stagger: delay / 1000, // Converter ms para segundos
    });

    return () => {
      if (splitRef.current) {
        splitRef.current.revert();
      }
    };
  }, { scope: textRef });

  // Criar o elemento dinamicamente baseado na prop 'tag'
  const Tag = tag as keyof JSX.IntrinsicElements;

  return (
    <Tag
      ref={textRef as any}
      className={className}
      style={{ textAlign }}
    >
      {text}
    </Tag>
  );
};

export default SplitText;