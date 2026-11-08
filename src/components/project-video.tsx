'use client';

import { useEffect, useRef, useState } from 'react';

export function ProjectVideo({
  src,
  poster,
  label = 'Projeto BMW completo da VDR Studio Automotivo',
  controls = false,
}: {
  src: string;
  poster: string;
  label?: string;
  controls?: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const pausedByUser = useRef(false);
  const pausedAutomatically = useRef(false);
  const frame = controls
    ? 'M2 2H598V1064H2Z'
    : 'M36 2H598V1030L564 1064H2V36Z';
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const sync = () => {
      if (
        visible && !document.hidden && !reduced.matches && !pausedByUser.current
      )
        void element.play().catch(() => {});
      else if (!element.paused) {
        pausedAutomatically.current = true;
        element.pause();
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.2 },
    );
    observer.observe(element);
    reduced.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      reduced.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      pausedAutomatically.current = true;
      element.pause();
    };
  }, [src, controls]);

  return (
    <div className={`project-video${controls ? ' has-controls' : ''}${playing ? ' is-playing' : ''}`}>
      <video
        ref={video}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        controls={controls}
        controlsList={
          controls
            ? 'nodownload noremoteplayback'
            : 'nodownload nofullscreen noremoteplayback'
        }
        disablePictureInPicture={!controls}
        disableRemotePlayback
        tabIndex={controls ? 0 : -1}
        preload="none"
        width={1080}
        height={1920}
        aria-label={label}
        onPlay={() => {
          pausedByUser.current = false;
          pausedAutomatically.current = false;
          setPlaying(true);
        }}
        onPause={() => {
          if (controls && !pausedAutomatically.current)
            pausedByUser.current = true;
          pausedAutomatically.current = false;
          setPlaying(false);
        }}
      >
        Seu navegador não suporta este vídeo.{' '}
        <a href={src}>Abrir vídeo: {label}</a>.
      </video>
      <svg
        className="project-video-border"
        viewBox="0 0 600 1066"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="project-border-track"
          d={frame}
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="project-border-runner"
          d={frame}
          vectorEffect="non-scaling-stroke"
          pathLength="1000"
        />
      </svg>
    </div>
  );
}
