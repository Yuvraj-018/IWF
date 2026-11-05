/**
 * Shared hero sizing and bottom curve, so every page hero (except Home) has the
 * same minimum height and an identical wave.
 */

/** Minimum hero height. Fits below the header on a typical laptop screen. */
export const HERO_MIN_H = "min-h-[360px] sm:min-h-[440px] lg:min-h-[480px]";

/** Vertical padding; the bottom value leaves room for the wave. */
export const HERO_PADDING = "pt-5 pb-12 sm:pt-6 sm:pb-14 md:pt-7 md:pb-16";

export function HeroWave({ fill = "#ffffff" }: { fill?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 w-full h-8 sm:h-10 md:h-12 block pointer-events-none z-10"
    >
      <path d="M0,0 C320,80 720,90 1080,45 C1240,25 1360,55 1440,75 L1440,90 L0,90 Z" fill={fill} />
    </svg>
  );
}
