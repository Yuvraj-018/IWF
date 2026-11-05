import React, { useState, useEffect } from "react";
import { HERO_MIN_H, HERO_PADDING, HeroWave } from "@/components/common/HeroWave";
import { Link } from "@tanstack/react-router";
import { Home, ChevronRight } from "lucide-react";
import aboutHero from "@/assets/about-hero.jpg";
import slide1 from "@/assets/hero-carousel/hero-slide-1.jpg";
import slide2 from "@/assets/hero-carousel/hero-slide-2.jpg";
import slide3 from "@/assets/hero-carousel/hero-slide-3.jpg";
import slide4 from "@/assets/hero-carousel/hero-slide-4.jpg";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface MediaSubpageHeroProps {
  badge?: string;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  subtext?: string;
  breadcrumb?: BreadcrumbItem[];
  image?: string;
  images?: string[];
  imageAlt?: string;
  actions?: React.ReactNode;
  rightOverlay?: React.ReactNode;
  heightClass?: string;
  waveFill?: string;
}

const DEFAULT_SLIDES = [aboutHero, slide1, slide2, slide3, slide4];

export function MediaSubpageHero({
  badge,
  title,
  description,
  subtext,
  breadcrumb = [],
  image,
  images,
  imageAlt = "Islah Welfare Foundation — Together We Can Do More",
  actions,
  rightOverlay,
  heightClass = HERO_MIN_H,
  waveFill = "#f8fafc",
}: MediaSubpageHeroProps) {
  const resolvedImages =
    images && images.length > 0
      ? images
      : image
        ? [image, aboutHero, slide1, slide2]
        : DEFAULT_SLIDES;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const SLIDE_DURATION = 5000;

  // Subtle auto-advance without button controls
  useEffect(() => {
    if (resolvedImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % resolvedImages.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [currentSlide, resolvedImages.length]);

  return (
    <section
      className={`bg-[#071527] text-white flex flex-col justify-center ${HERO_PADDING} relative overflow-hidden select-none group ${heightClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Breadcrumb */}
        {breadcrumb.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-white/70 mb-2 sm:mb-2.5 flex-wrap select-none"
          >
            <Link
              to="/"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5 text-brand-orange" />
              <span>Home</span>
            </Link>
            {breadcrumb.map((crumb, idx) => {
              const isLast = idx === breadcrumb.length - 1;
              return (
                <div key={idx} className="flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-white/40" />
                  {isLast || !crumb.href ? (
                    <span className="text-brand-orange font-bold">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      to={crumb.href as any}
                      className="hover:text-white transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        )}

        {/* Main Grid: Left Content + Right Organic Composition Slider */}
        <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-4 sm:gap-6 lg:gap-8 items-center">
          {/* Left Column: Heading, Copy & Action Buttons */}
          <div className="space-y-2 sm:space-y-2.5 text-left">
            {badge && (
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-brand-orange mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                {badge}
              </div>
            )}

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-white leading-tight">
              {title}
            </h1>

            {typeof description === "string" ? (
              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-normal">
                {description}
              </p>
            ) : (
              description
            )}

            {subtext && (
              <p className="text-xs sm:text-sm text-slate-300 font-normal flex items-center gap-2 pt-0.5">
                <span>{subtext}</span>
              </p>
            )}

            {actions && <div className="pt-2 flex flex-wrap gap-2.5">{actions}</div>}
          </div>

          {/* Right Column: Native Organic Composition with Smooth Slider */}
          <div className="relative hidden md:flex items-center justify-center lg:justify-end lg:-translate-x-[60px] xl:-translate-x-[100px]">
            <div className="relative w-full max-w-[280px] md:max-w-[280px] lg:max-w-[340px] aspect-[1.15/1]">
              {/* Background Soft Blue Organic Backdrop Layer */}
              <div
                className="absolute inset-2 bg-[#122e54] -rotate-3 scale-105 opacity-90 transition-transform pointer-events-none"
                style={{
                  borderRadius: "50% 50% 65% 35% / 45% 45% 55% 55%",
                }}
              />

              {/* Organic Frame with Razor-Sharp Photograph Slider */}
              <div
                className={`relative w-full h-full overflow-hidden border-[4px] sm:border-[5px] border-white shadow-2xl z-10 ${isPressed ? "cursor-grabbing" : "cursor-default"
                  }`}
                style={{
                  borderRadius: "44% 56% 68% 32% / 42% 44% 56% 58%",
                }}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onMouseLeave={() => setIsPressed(false)}
                onTouchStart={() => setIsPressed(true)}
                onTouchEnd={() => setIsPressed(false)}
              >
                {resolvedImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="absolute inset-0 w-full h-full"
                    style={{
                      opacity: idx === currentSlide ? 1 : 0,
                      transform: idx === currentSlide ? "scale(1.05)" : "scale(1.12)",
                      transition:
                        "opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                      zIndex: idx === currentSlide ? 1 : 0,
                    }}
                  >
                    <img
                      src={img}
                      alt={imageAlt}
                      className="w-full h-full object-cover object-[center_30%] select-none"
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  </div>
                ))}

              </div>

              {/* Left Botanical Leaves SVG */}
              <div className="absolute -left-5 sm:-left-7 top-1/4 w-10 sm:w-14 h-20 sm:h-28 pointer-events-none z-20">
                <svg
                  viewBox="0 0 60 120"
                  fill="none"
                  className="w-full h-full text-[#4a729e]"
                >
                  <path
                    d="M50,110 Q35,80 15,60 Q5,40 10,15 Q30,20 40,40 Q48,60 50,110 Z"
                    fill="currentColor"
                    opacity="0.9"
                  />
                  <path
                    d="M48,80 Q25,70 18,48 Q35,45 42,65 Z"
                    fill="#385e88"
                    opacity="0.95"
                  />
                  <path
                    d="M52,45 Q38,30 35,10 Q50,15 52,45 Z"
                    fill="currentColor"
                    opacity="0.85"
                  />
                </svg>
              </div>

              {/* Handwritten Note: Together We Can Do More ♡ */}
              <div className="absolute -top-3 right-0 sm:right-2 z-20 select-none text-right">
                <p className="font-['Caveat',cursive] text-xl sm:text-2xl lg:text-[28px] font-bold text-white leading-tight rotate-[-6deg] drop-shadow-md">
                  Together
                  <br />
                  We Can Do
                  <br />
                  More <span className="inline-block text-sky-200">♡</span>
                </p>
                <div className="w-10 sm:w-12 h-[2px] bg-sky-300 ml-auto mt-0.5 rounded-full rotate-[-6deg]" />
              </div>

              {/* Bottom Right Botanical Leaves & Tagline */}
              <div className="absolute -bottom-2 sm:bottom-1 right-0 sm:right-1 z-20 select-none flex flex-col items-end">
                <div className="w-8 h-8 mb-1 pointer-events-none">
                  <svg
                    viewBox="0 0 40 40"
                    fill="none"
                    className="w-full h-full text-[#4a729e]"
                  >
                    <path
                      d="M35,5 Q20,15 10,28 Q15,35 28,25 Q35,18 35,5 Z"
                      fill="currentColor"
                      opacity="0.85"
                    />
                    <path
                      d="M25,20 Q12,25 5,38 Q18,36 25,20 Z"
                      fill="#385e88"
                      opacity="0.9"
                    />
                  </svg>
                </div>

                <div className="w-8 sm:w-10 h-[1.5px] bg-sky-400/60 mb-1.5" />

                <div className="text-[8px] sm:text-[9px] font-extrabold tracking-[0.22em] text-slate-300 uppercase space-y-0.5 text-right leading-tight">
                  <p>PEOPLE</p>
                  <p>SUPPORT</p>
                  <p>CHANGE</p>
                  <p>TOGETHER</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shared bottom curve */}
      <HeroWave fill={waveFill} />
    </section>
  );
}
