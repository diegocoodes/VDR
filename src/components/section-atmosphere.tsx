'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const DyeWhorl = dynamic(() => import('@/components/ui/dye-whorl'), {
  ssr: false,
});

export function SectionAtmosphere() {
  const layer = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = layer.current;
    if (!element) return;
    const simplified = window.matchMedia(
      '(max-width: 767px), (prefers-reduced-motion: reduce), (pointer: coarse)',
    );
    let near = false;
    const update = () => setActive(near && !simplified.matches);
    const observer = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting;
        update();
      },
      { rootMargin: '180px 0px' },
    );
    observer.observe(element);
    simplified.addEventListener('change', update);
    return () => {
      observer.disconnect();
      simplified.removeEventListener('change', update);
    };
  }, []);

  return (
    <div
      ref={layer}
      className="section-atmosphere"
      aria-hidden="true"
      data-fluid-background={active ? 'active' : 'static'}
    >
      {active && <DyeWhorl speed={0.45} density={0.7} stir={0} />}
    </div>
  );
}
