import { useEffect } from 'react';

// Using a short, futuristic click/beep sound from a reliable open CDN
const CLICK_SOUND_URL = "https://actions.google.com/sounds/v1/ui/button_click.ogg";
const HOVER_SOUND_URL = "https://actions.google.com/sounds/v1/science_fiction/laser_beam.ogg"; // A very subtle low volume swoop

export function useSoundEffects() {
  useEffect(() => {
    const clickAudio = new Audio(CLICK_SOUND_URL);
    clickAudio.volume = 0.3; // subtle volume

    // Global click listener for buttons and links
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.role === 'button') {
        // Clone node allows rapid overlapping clicks
        const soundClone = clickAudio.cloneNode() as HTMLAudioElement;
        soundClone.volume = 0.3;
        soundClone.play().catch(err => {
            // Autoplay policies might block it until first user interaction, which is fine
            console.debug("Audio play blocked", err);
        });
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);
}
