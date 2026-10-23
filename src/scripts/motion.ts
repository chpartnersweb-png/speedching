import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initMotion() {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();

  // CSS leaves all content visible; only decoration and secondary content animate.
  media.add('(prefers-reduced-motion: no-preference)', () => {
    const line = document.querySelector<HTMLElement>('[data-neon-line]');
    if (line) {
      gsap.from(line, { scaleX: 0, transformOrigin: 'left center', duration: 0.65, ease: 'power2.out' });
    }
    const distance = window.matchMedia('(max-width: 767px)').matches ? 8 : 12;
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top 92%',
        once: true,
        onEnter: () => {
          gsap.fromTo(element, { y: distance, opacity: 0.45 }, {
            y: 0, opacity: 1, duration: 0.45, ease: 'power2.out', clearProps: 'transform,opacity',
          });
        },
      });
    });
  });

  // Restore styles if the motion preference changes or Astro replaces the page.
  document.addEventListener('astro:before-swap', () => media.revert(), { once: true });
}
