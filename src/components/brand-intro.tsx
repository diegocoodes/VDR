'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SectionAtmosphere } from './section-atmosphere';

export function BrandIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const timeout = window.setTimeout(
      () => setVisible(false),
      reduced.matches ? 0 : 2400,
    );
    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="brand-intro" aria-hidden="true">
      <SectionAtmosphere />
      <div className="brand-intro-content">
        <Image
          className="brand-intro-logo"
          src="/images/vdr-logo.webp"
          alt=""
          width={540}
          height={201}
          loading="eager"
          unoptimized
        />
        <span className="brand-intro-line" />
        <p>Proteção em cada detalhe</p>
      </div>
    </div>
  );
}
