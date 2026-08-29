import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Home, ChevronRight as BreadcrumbArrow } from "lucide-react";
import slide1 from "@/assets/hero-carousel/hero-slide-1.jpg";
import slide2 from "@/assets/hero-carousel/hero-slide-2.jpg";
import slide3 from "@/assets/hero-carousel/hero-slide-3.jpg";
import slide4 from "@/assets/hero-carousel/hero-slide-4.jpg";
import aboutHero from "@/assets/about-hero.jpg";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface SubpageHeroCarouselProps {
  tag?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  images?: string[];
  heightClass?: string;
}

const DEFAULT_SLIDES = [aboutHero, slide1, slide2, slide3, slide4];

export default function SubpageHeroCarousel({
  tag = "ABOUT ISLAH",
  title,
  subtitle,
  breadcrumbs = [{ label: "Home", href: "/" }, { label: "About Us", href: "/about" }],
  images = DEFAULT_SLIDES,
  heightClass = "min-h-[260px] md:min-h-[300px] lg:min-h-[320px]",
}: SubpageHeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const SLIDE_DURATION = 5000;

  useEffect(() => {
    if (isPaused || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused, images.length]);

  useEffect(() => {
    setProgress(0);
    if (isPaused || images.length <= 1) return;
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / SLIDE_DURATION) * 100, 100));
    }, 50);
    return () => clearInterval(tick);
  }, [currentSlide, isPaused, images.length]);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
    setProgress(0);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % images.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + images.length) % images.length);

  return (
    <div
      className={`relative w-full overflow-hidden bg-slate-950 flex items-center select-none group ${heightClass}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides */}
      {images.map((img, idx) => (
        <div
          key={idx}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: idx === currentSlide ? 1 : 0,
            transform: idx === currentSlide ? "scale(1)" : "scale(1.04)",
            transition: "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.4s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: idx === currentSlide ? 1 : 0,
          }}
        >
          <img
            src={img}
            alt="Hero Background"
            className="w-full h-full object-cover object-center"
            loading={idx === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Dark Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07162c]/95 via-[#0b1f3b]/85 to-[#0b1f3b]/70 z-[2]" />
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/50 z-[2]" />

      {/* Foreground Content */}
      <div className="relative z-[3] max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/70 mb-3 flex-wrap">
          <a href="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5 text-brand-orange" />
            <span>Home</span>
          </a>
          {breadcrumbs.map((crumb, idx) => (
            <span key={idx} className="flex items-center gap-1.5">
              <BreadcrumbArrow className="w-3 h-3 text-white/40 shrink-0" />
              {crumb.href ? (
                <a href={crumb.href} className="hover:text-white transition-colors">
                  {crumb.label}
                </a>
              ) : (
                <span className="text-brand-orange font-bold">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        {/* Tagline Badge */}
        {tag && (
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest text-brand-orange mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            {tag}
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-white/85 text-xs sm:text-sm md:text-base font-medium max-w-3xl mt-2 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Slide Navigation Arrows (visible on hover) */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-[4] w-8 h-8 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-[4] w-8 h-8 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Bottom Progress Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 right-4 md:right-8 z-[4] flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className="relative cursor-pointer"
            >
              <div
                className={`rounded-full transition-all duration-300 ${
                  currentSlide === idx ? "w-6 h-1.5 bg-white/30" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
              {currentSlide === idx && (
                <div
                  className="absolute top-0 left-0 h-1.5 rounded-full bg-brand-orange"
                  style={{ width: `${progress}%`, transition: "width 50ms linear" }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
