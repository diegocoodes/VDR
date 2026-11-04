import type { Page } from '@playwright/test';

// Simula somente a API externa. A reprodução real também é conferida em navegador.
export async function mockYouTube(page: Page) {
  await page.route('https://www.youtube-nocookie.com/embed/**', (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: '<!doctype html><html lang="pt-BR"><title>Vídeo de teste</title><body></body></html>',
    }),
  );
  await page.route('https://www.youtube.com/iframe_api', (route) =>
    route.fulfill({
      contentType: 'application/javascript',
      body: `
      window.YT = { Player: class {
        constructor(target, options) {
          this.options = options;
          this.iframe = document.createElement('iframe');
          const params = new URLSearchParams(options.playerVars);
          this.iframe.src = options.host + '/embed/' + options.videoId + '?' + params;
          target.replaceWith(this.iframe);
          this.state = window.__youtube = {playing:false, muted:false, currentTime:0, seeks:[]};
          window.__youtubeEnd = () => options.events.onStateChange({target:this, data:0});
          setTimeout(() => options.events.onReady({target:this}), 0);
        }
        mute() { this.state.muted = true; }
        cueVideoById(video) { this.state.currentTime = video.startSeconds; }
        playVideo() { this.state.playing = true; this.options.events.onStateChange({target:this, data:1}); }
        pauseVideo() { this.state.playing = false; this.options.events.onStateChange({target:this, data:2}); }
        seekTo(seconds) { this.state.currentTime = seconds; this.state.seeks.push(seconds); }
        getIframe() { return this.iframe; }
        destroy() { this.iframe.remove(); }
      }};
      window.onYouTubeIframeAPIReady();
    `,
    }),
  );
}

export function youtubeState(page: Page) {
  return page.evaluate(
    () =>
      (
        window as Window & {
          __youtube?: {
            playing: boolean;
            muted: boolean;
            currentTime: number;
            seeks: number[];
          };
        }
      ).__youtube,
  );
}
