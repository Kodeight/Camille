import React, { useEffect, useRef, useState } from 'react';

export type RevealAnimation = 'fade-up' | 'slide-left' | 'slide-right' | 'scale' | 'clip';

interface RevealProps {
  children: React.ReactNode;
  animation?: RevealAnimation;
  delay?: number; // In milliseconds
  duration?: number; // Optional duration override in ms
  className?: string;
  as?: React.ElementType;
  threshold?: number;
  rootMargin?: string;
  id?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration,
  className = '',
  as: Component = 'div',
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  id,
}) => {
  const ref = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // If reduced motion is preferred, reveal immediately without animation
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // Check if element is already within viewport on initial mount
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  const animationClass = `reveal-${animation}`;
  const revealedClass = isRevealed ? 'is-revealed' : '';

  const style: React.CSSProperties = {
    ...(delay > 0 ? { transitionDelay: `${delay}ms` } : {}),
    ...(duration ? { transitionDuration: `${duration}ms` } : {}),
  };

  return (
    <Component
      ref={ref}
      id={id}
      className={`${animationClass} ${revealedClass} ${className}`.trim()}
      style={style}
    >
      {children}
    </Component>
  );
};
