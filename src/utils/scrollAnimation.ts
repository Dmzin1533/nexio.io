'use client';

export const initScrollAnimation = () => {
  if (typeof window === 'undefined') return;

  const animateElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const animationType = element.dataset.animation || 'animate-fade-up';
          element.classList.add(animationType);
          observer.unobserve(element);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  animateElements.forEach((element) => {
    observer.observe(element);
  });

  return () => {
    animateElements.forEach((element) => {
      observer.unobserve(element);
    });
  };
};