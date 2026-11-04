'use client';

import { useEffect, useRef, useState } from 'react';

export function ProjectVideo({ src, poster }: { src: string; poster: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const intent = useRef<'auto' | 'play' | 'pause'>('auto');
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const sync = () => {
      const allowed =
        intent.current === 'play' ||
        (intent.current === 'auto' && !reduced.matches);
      if (visible && !document.hidden && allowed)
        void element.play().catch(() => {});
      else element.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.2 },
    );
    observer.observe(element);
    const onPreferenceChange = () => {
      intent.current = 'auto';
      sync();
    };
    reduced.addEventListener('change', onPreferenceChange);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      reduced.removeEventListener('change', onPreferenceChange);
      document.removeEventListener('visibilitychange', sync);
      element.pause();
    };
  }, []);

  function toggle() {
    const element = video.current;
    if (!element) return;
    if (element.paused) {
      intent.current = 'play';
      void element.play().catch(() => {});
    } else {
      intent.current = 'pause';
      element.pause();
    }
  }

  return (
    <div className={`project-video${playing ? ' is-playing' : ''}`}>
      <video
        ref={video}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        width={1080}
        height={1920}
        aria-label="Projeto BMW completo da VDR Studio Automotivo"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        Seu navegador não suporta este vídeo.{' '}
        <a href={src}>Abrir o projeto BMW</a>.
      </video>
      <svg
        className="project-video-border"
        viewBox="0 0 600 1066"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="project-border-track"
          d="M36 2H598V1030L564 1064H2V36Z"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="project-border-runner"
          d="M36 2H598V1030L564 1064H2V36Z"
          vectorEffect="non-scaling-stroke"
          pathLength="1000"
        />
      </svg>
      <button
        type="button"
        className="project-video-action"
        onClick={toggle}
        aria-label={playing ? 'Pausar projeto BMW' : 'Reproduzir projeto BMW'}
        title={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}
      >
        <span>{playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}</span>
      </button>
    </div>
  );
}
