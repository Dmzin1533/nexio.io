'use client';

import { useEffect } from 'react';
import { initScrollAnimation } from '@/utils/scrollAnimation';

const ScrollAnimationInitializer = () => {
  useEffect(() => {
    const cleanup = initScrollAnimation();
    return cleanup;
  }, []);

  return null;
};

export default ScrollAnimationInitializer;