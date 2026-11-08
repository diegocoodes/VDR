'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { loadYouTubeApi, type YouTubePlayer } from '@/lib/youtube';

export function HeroVideo({
  videoId,
  startSeconds,
  poster,
}: {
  videoId: string;
  startSeconds: number;
  poster: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const player = useRef<YouTubePlayer | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false;
    let ready = false;
    let visible = false;
    const shouldPlay = () =>
      visible &&
      !document.hidden &&
      !reduced.matches;
    const sync = () => {
      if (!ready || !player.current) return;
      if (shouldPlay()) {
        player.current.mute();
        player.current.playVideo();
      } else player.current.pauseVideo();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    reduced.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);

    void loadYouTubeApi()
      .then((api) => {
        if (disposed) return;
        // O SDK administra apenas este filho, sem substituir um nó do React.
        const target = document.createElement('div');
        element.append(target);
        const instance = new api.Player(target, {
          host: 'https://www.youtube-nocookie.com',
          videoId,
          width: '100%',
          height: '100%',
          playerVars: {
            start: startSeconds,
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            playsinline: 1,
            rel: 0,
            hl: 'pt-br',
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              if (disposed) return;
              player.current = event.target;
              ready = true;
              event.target.mute();
              event.target.cueVideoById({ videoId, startSeconds });
              sync();
            },
            onStateChange: (event) => {
              if (disposed) return;
              if (event.data === 5) sync();
              if (event.data === 1) {
                setHasPlayed(true);
                setFailed(false);
                if (!shouldPlay()) event.target.pauseVideo();
              }
              if (event.data === 0 && shouldPlay()) {
                event.target.seekTo(startSeconds, true);
                event.target.playVideo();
              }
            },
            onError: () => {
              if (!disposed) setFailed(true);
            },
            onAutoplayBlocked: () => {
              if (!disposed) setFailed(true);
            },
          },
        });
        player.current = instance;
        const iframe = instance.getIframe();
        iframe.title = 'Vídeo de apresentação automotiva';
        iframe.tabIndex = -1;
        iframe.setAttribute('aria-hidden', 'true');
        iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      })
      .catch(() => {
        if (!disposed) setFailed(true);
      });

    return () => {
      disposed = true;
      observer.disconnect();
      reduced.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      player.current?.destroy();
      player.current = null;
    };
  }, [videoId, startSeconds]);

  return (
    <>
      <div className="hero-photo">
        <Image
          src={poster}
          alt="Nissan GT-R no vídeo de apresentação automotiva"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 767px) 140vw, 85vw"
          quality={88}
        />
        <div
          ref={container}
          className={`hero-youtube-frame${hasPlayed && !failed ? ' has-played' : ''}`}
          aria-hidden="true"
        />
      </div>
      {failed && (
        <a
          className="hero-video-control"
          href={`https://www.youtube.com/watch?v=${videoId}&t=${startSeconds}s`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Assistir no YouTube <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      )}
    </>
  );
}
