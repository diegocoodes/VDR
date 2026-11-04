'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export function ProfileFrame({ image, alt }: { image: string; alt: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frame} className={`profile-frame${visible ? ' is-visible' : ''}`}>
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 767px) 100vw, 45vw"
      />
      <svg
        className="profile-border"
        viewBox="0 0 600 720"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="profile-border-track"
          d="M36 2H598V684L564 718H2V36Z"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="profile-border-runner"
          d="M36 2H598V684L564 718H2V36Z"
          vectorEffect="non-scaling-stroke"
          pathLength="1000"
        />
      </svg>
      <span className="profile-slashes" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}
