import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import "./banner.css";
import { SLIDES as IMPORTED_SLIDES } from "@/constant/adda/Landing/slide";
import { useState } from "react";
import NewBanner from "@/pages/NewBanner";

const LandingBanner = () => {
  const OUR_CORE_SLIDE = {
    id: 99,
    img: "/assets/home/newPage/bg/banner/community banner.png",
    type: "flip",
    tag: "Our Core",
    headline: "Discover Our Core",
    highlightWord: "Core",
    sub: "Understanding the roots of digital addiction",
    badges: ["Awareness", "Recovery", "Community"],
    accent: "#ff6b35",
    bg: "from-[#0d2137] via-[#0a3d2e] to-[#0f2d1a]",
    shape: "circle",
    emoji: "🧠",
    link: "/community",
    cta: "Join Community →",
    items: [],
  };
  const MENTOONS_MYTHOS_SLIDE = {
    id: 100,
    img: "/assets/home/newPage/bg/mythos.png",
    type: "flip",
    tag: "Mentoons Mythos",
    headline: "The Inner Cosmos",
    highlightWord: "Cosmos",
    sub: "Blending psychology and spiritual guidance to help you understand yourself and your path",
    badges: ["Psychology", "Spirituality", "Self-Discovery"],
    accent: "#6c5ce7",
    bg: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
    shape: "circle",
    emoji: "🌌",
    link: "https://mentoonsmythos.com/",
    cta: "Explore Your Path →",
    items: [],
  };

  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const [displaySlide, setDisplaySlide] = useState(0);

  const genericSlides = [
    ...IMPORTED_SLIDES,
    OUR_CORE_SLIDE,
    MENTOONS_MYTHOS_SLIDE,
  ];

  const totalCount = genericSlides.length + 1;
  const isFirstSlide = displaySlide === 0;
  const slide = !isFirstSlide ? genericSlides[displaySlide - 1] : null;

  const goToSlide = (index: number) => {
    if (animating || index === displaySlide) return;
    setDirection(index > displaySlide ? "next" : "prev");
    setAnimating(true);
    setTimeout(() => {
      setDisplaySlide(index);
      setAnimating(false);
    }, 500);
  };

  const handlePrev = () => {
    if (animating) return;
    setDirection("prev");
    setAnimating(true);
    setTimeout(() => {
      setDisplaySlide((prev) => (prev === 0 ? totalCount - 1 : prev - 1));
      setAnimating(false);
    }, 500);
  };

  const handleNext = () => {
    if (animating) return;
    setDirection("next");
    setAnimating(true);
    setTimeout(() => {
      setDisplaySlide((prev) => (prev === totalCount - 1 ? 0 : prev + 1));
      setAnimating(false);
    }, 500);
  };

  const driftingClouds = [
    { top: 8, width: 90, duration: 28, delay: 0, opacity: 0.55 },
    { top: 20, width: 60, duration: 36, delay: 6, opacity: 0.4 },
    { top: 55, width: 110, duration: 32, delay: 3, opacity: 0.35 },
    { top: 70, width: 70, duration: 42, delay: 10, opacity: 0.45 },
    { top: 35, width: 80, duration: 38, delay: 15, opacity: 0.3 },
    { top: 82, width: 55, duration: 30, delay: 8, opacity: 0.5 },
    { top: 14, width: 100, duration: 45, delay: 20, opacity: 0.25 },
    { top: 62, width: 65, duration: 34, delay: 12, opacity: 0.4 },
  ];

  return (
    <section
      className={`relative overflow-hidden ${
        isFirstSlide ? "min-h-[85vh] h-auto bg-white" : "h-[85vh] bg-blue-300"
      }`}
    >
      <style>{`
        @keyframes cloud-drift-lr {
          0%   { transform: translateX(-160px); }
          100% { transform: translateX(110vw); }
        }
        .cloud-drift-lr {
          position: absolute;
          pointer-events: none;
          animation: cloud-drift-lr linear infinite;
          will-change: transform;
        }

        @media (max-width: 1024px) and (min-width: 769px) {
          .banner-right-img { display: none !important; }
          .banner-center-grid { display: grid !important; gap: 1.25rem !important; padding: 1rem !important; }
          .banner-center-grid .banner-grid-item { width: 5rem !important; height: 5rem !important; }
          .banner-left { width: 55% !important; margin-left: 1.5rem !important; }
          .banner-headline { font-size: 3.5rem !important; }
        }

        @media (max-width: 1024px) {
          .cloud-bg-drift {
            animation: none;
          }
        }

        @media (max-width: 768px) {
          .banner-right-img { display: none !important; }
          .banner-center-grid { display: none !important; }
          .banner-left { margin-left: 1rem !important; width: 90% !important; }
          .banner-headline { font-size: 2.8rem !important; }
          .banner-sub { font-size: 0.75rem !important; }
        }

        @media (max-width: 480px) {
          .banner-headline { font-size: 2rem !important; }
          .banner-left { margin-left: 0.75rem !important; }
        }
      `}</style>

      {/* Only show the ambient sky background/clouds behind the generic slides —
          NewBanner has its own self-contained background. */}
      {!isFirstSlide && (
        <>
          {driftingClouds.map((c, i) => (
            <svg
              key={i}
              className="cloud-drift-lr"
              style={{
                top: `${c.top}%`,
                width: `${c.width}px`,
                height: `${Math.round(c.width * 0.6)}px`,
                animationDuration: `${c.duration}s`,
                animationDelay: `-${c.delay}s`,
                opacity: c.opacity,
                zIndex: 0,
              }}
              viewBox="0 0 100 60"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 20 48 Q 4 48 4 35 Q 4 27 14 25 Q 14 14 28 14 Q 36 8 46 11 Q 56 7 66 12 Q 78 10 82 20 Q 94 20 96 30 Q 100 32 100 39 Q 100 48 88 48 Z"
                fill="white"
              />
            </svg>
          ))}

          <img
            className="absolute inset-0 h-full w-full pointer-events-none cloud-bg-drift"
            style={{ zIndex: 1 }}
            src="/assets/home/newPage/bg/landing-bg.png"
            alt="hero-bg"
          />
        </>
      )}

      <div
        key={displaySlide}
        style={{ position: "relative", zIndex: 2 }}
        className={`${
          isFirstSlide
            ? "min-h-[85vh]"
            : "flex items-center justify-center gap-5 h-full"
        } ${
          animating
            ? direction === "next"
              ? "cloud-exit-left"
              : "cloud-exit-right"
            : direction === "next"
              ? "cloud-enter-right"
              : "cloud-enter-left"
        }`}
      >
        {isFirstSlide ? (
          <NewBanner />
        ) : (
          <>
            <div className="banner-left font-futura flex flex-col items-start justify-start ml-20 w-1/2 h-1/3 mb-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{slide!.emoji}</span>
                <span
                  className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.12)",
                    color: "#1a1a2e",
                    border: "1px solid rgba(0,0,0,0.2)",
                  }}
                >
                  {slide!.tag}
                </span>
              </div>

              <h1 className="text-xl font-semibold text-gray-900 [text-shadow:0_2px_6px_rgba(0,0,0,0.1)]">
                Welcome to <span className="text-[#4A1B0C]">Mentoons</span>
              </h1>

              <h1 className="banner-headline text-7xl font-semibold leading-tight text-gray-900">
                {slide!.headline.split(" ").map((word, i) =>
                  word === slide!.highlightWord ? (
                    <span key={i} className="text-[#e85d04]">
                      {word}{" "}
                    </span>
                  ) : (
                    <span key={i}>{word} </span>
                  ),
                )}
              </h1>

              <p className="banner-sub mt-2 font-medium tracking-wider text-gray-700 max-w-sm text-sm">
                {slide!.sub}
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
                {slide!.badges?.map((badge, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded-full font-semibold text-white"
                    style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <a href={slide!.link}>
                <button className="relative bg-transparent border-none cursor-pointer p-0 outline-none transition-transform duration-150 hover:scale-105 active:scale-95">
                  <svg
                    width="190"
                    height="100"
                    viewBox="0 0 180 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id="cloudGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#dbeeff" />
                      </linearGradient>
                      <clipPath id="cloudClip">
                        <path d="M 48 72 Q 22 72 22 52 Q 22 42 38 40 Q 38 28 58 28 Q 68 20 82 23 Q 94 18 108 24 Q 124 22 130 34 Q 148 34 152 48 Q 162 50 162 60 Q 162 72 144 72 Z" />
                      </clipPath>
                    </defs>
                    <rect
                      x="0"
                      y="0"
                      width="180"
                      height="100"
                      fill="url(#cloudGrad)"
                      clipPath="url(#cloudClip)"
                    />
                    <path
                      d="M 48 72 Q 22 72 22 52 Q 22 42 38 40 Q 38 28 58 28 Q 68 20 82 23 Q 94 18 108 24 Q 124 22 130 34 Q 148 34 152 48 Q 162 50 162 60 Q 162 72 144 72 Z"
                      fill="none"
                      stroke="#bdd9f0"
                      strokeWidth="1.5"
                    />
                    <text
                      x="92"
                      y="54"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#3a7ab8"
                      fontSize="15"
                      fontWeight="500"
                      fontFamily="system-ui, sans-serif"
                    >
                      {slide!.cta}
                    </text>
                  </svg>
                </button>
              </a>
            </div>

            <div className="banner-center-grid grid grid-cols-2 place-items-center gap-10 p-6">
              {slide!.items?.slice(0, 4).map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="group block transition-transform duration-200 hover:scale-105"
                >
                  {"image" in item && item.image ? (
                    <div className="banner-grid-item w-28 h-28 rounded-2xl overflow-hidden shadow-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <span className="sr-only">{item.name}</span>
                    </div>
                  ) : (
                    <div
                      className="banner-grid-item w-28 h-28 rounded-2xl flex items-center justify-center shadow-lg border border-white/30 backdrop-blur-sm p-3 text-center"
                      style={{
                        backgroundColor:
                          "color" in item
                            ? `${item.color}`
                            : `${slide!.accent}22`,
                        borderColor:
                          "color" in item ? item.color : slide!.accent,
                      }}
                    >
                      <span
                        className="text-xs font-semibold leading-tight font-fredoka"
                        style={{ color: "#000000" }}
                      >
                        {item.name}
                      </span>
                    </div>
                  )}
                </a>
              ))}
            </div>

            <div className="banner-right-img w-1/2 flex items-center justify-center">
              <img src={slide!.img} className="w-full" alt="right-content" />
            </div>
          </>
        )}
      </div>

      {/* Bottom control bar — arrows flank the dots, all floating together
          at the bottom instead of overlapping the slide's text content */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-3 py-2 rounded-full bg-black/20 backdrop-blur-sm">
        <button
          onClick={handlePrev}
          className="w-9 h-9 md:w-10 md:h-10 p-1 bg-gray-600/70 hover:bg-gray-700/85 rounded-full overflow-hidden transition-colors duration-200 flex-shrink-0"
          aria-label="Previous slide"
        >
          <div className="border-2 border-gray-300/75 rounded-full w-full h-full flex items-center justify-center">
            <FaChevronLeft className="text-white text-sm" />
          </div>
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`rounded-full transition-all duration-300 ${
                index === displaySlide
                  ? "w-6 h-2.5 bg-white"
                  : "w-2.5 h-2.5 bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-9 h-9 md:w-10 md:h-10 p-1 bg-gray-600/70 hover:bg-gray-700/85 rounded-full overflow-hidden transition-colors duration-200 flex-shrink-0"
          aria-label="Next slide"
        >
          <div className="border-2 border-gray-300/75 rounded-full w-full h-full flex items-center justify-center">
            <FaChevronRight className="text-white text-sm" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default LandingBanner;
