import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import gsap from "gsap";
import { SLIDES as IMPORTED_SLIDES } from "@/constant/adda/Landing/slide";
import { NavLink } from "react-router-dom";
import OurCoreFlipCard from "@/components/Home/newVersion/ourSourceCode";
import ItemsPanel from "@/components/Home/newVersion/itemsPanel";

const OUR_CORE_SLIDE = {
  id: 99,
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

const SLIDES = [...IMPORTED_SLIDES, OUR_CORE_SLIDE];

const CTA_CONFIG: Record<number, { icon: string; anim: string }> = {
  1: { icon: "⚡", anim: "cta-icon-zap" },
  2: { icon: "🎓", anim: "cta-icon-tilt" },
  3: { icon: "🚀", anim: "cta-icon-rocket" },
  4: { icon: "🎧", anim: "cta-icon-pulse" },
  5: { icon: "💥", anim: "cta-icon-smash" },
  6: { icon: "🕹️", anim: "cta-icon-shake" },
  7: { icon: "🧩", anim: "cta-icon-spin" },
  99: { icon: "🧠", anim: "cta-icon-pulse" },
};

const LandingBanner = () => {
  const [current, setCurrent] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const animateIn = () => {
    const tl = gsap.timeline();
    tl.fromTo(
      tagRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "back.out(2.5)" },
    )
      .fromTo(
        headlineRef.current,
        { y: 50, opacity: 0, skewX: -6 },
        { y: 0, opacity: 1, skewX: 0, duration: 0.55, ease: "expo.out" },
        "-=0.15",
      )
      .fromTo(
        subRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
        "-=0.3",
      )
      .fromTo(
        badgesRef.current ? Array.from(badgesRef.current.children) : [],
        { scale: 0.6, opacity: 0, y: 10 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.07,
          ease: "back.out(2)",
        },
        "-=0.25",
      )
      .fromTo(
        ctaRef.current,
        { x: -24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.2",
      )
      .fromTo(
        shapeRef.current,
        { scale: 0.3, opacity: 0, rotation: -45 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.55)",
        },
        "-=0.55",
      )
      .fromTo(
        emojiRef.current,
        { scale: 0, opacity: 0, rotation: -20 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.45,
          ease: "back.out(3)",
        },
        "-=0.45",
      );
  };

  const animateOut = (dir: "next" | "prev", cb: () => void) => {
    const x = dir === "next" ? -80 : 80;
    gsap.to(
      [
        tagRef.current,
        headlineRef.current,
        subRef.current,
        badgesRef.current,
        ctaRef.current,
      ],
      {
        x,
        opacity: 0,
        duration: 0.28,
        stagger: 0.03,
        ease: "power3.in",
        onComplete: cb,
      },
    );
    gsap.to([shapeRef.current, emojiRef.current], {
      scale: 0.4,
      opacity: 0,
      duration: 0.28,
      ease: "power2.in",
    });
  };

  const go = (dir: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);

    const nextIndex =
      dir === "next"
        ? (current + 1) % SLIDES.length
        : (current - 1 + SLIDES.length) % SLIDES.length;

    const currentIsFlip = (SLIDES[current] as any).type === "flip";
    const nextIsFlip = (SLIDES[nextIndex] as any).type === "flip";

    if (currentIsFlip || nextIsFlip) {
      setCurrent(nextIndex);
      setIsAnimating(false);
      return;
    }

    animateOut(dir, () => {
      gsap.set(
        [
          tagRef.current,
          headlineRef.current,
          subRef.current,
          badgesRef.current,
          ctaRef.current,
          shapeRef.current,
          emojiRef.current,
        ],
        { x: 0 },
      );
      setCurrent(nextIndex);
      setIsAnimating(false);
    });
  };

  useEffect(() => {
    animateIn();
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.7,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, [current]);

  useEffect(() => {
    const floatShape = gsap.to(shapeRef.current, {
      y: -20,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    const floatEmoji = gsap.to(emojiRef.current, {
      y: -12,
      rotation: 5,
      duration: 2.0,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5,
    });
    const autoPlay = setInterval(() => go("next"), 15000);
    return () => {
      floatShape.kill();
      floatEmoji.kill();
      clearInterval(autoPlay);
    };
  }, []);

  const slide = SLIDES[current];
  const headlineParts = slide.headline.split(slide.highlightWord);
  const isWorkshops = slide.id === 2;
  const isProducts = slide.id === 3;
  const imgFitClass = isWorkshops ? "object-contain" : "object-cover";
  const { icon: ctaIcon, anim: ctaIconAnim } = CTA_CONFIG[slide.id] ?? {
    icon: "✨",
    anim: "cta-icon-pulse",
  };

  const workshopBgStyle: React.CSSProperties = isWorkshops
    ? {
        background:
          "linear-gradient(135deg, #ffe066 0%, #a8ff78 30%, #6dd5ed 70%, #ff9f43 100%)",
        backgroundSize: "200% 200%",
        animation: "gradientFlow 12s ease infinite",
      }
    : {};

  const productsBgStyle: React.CSSProperties = isProducts
    ? {
        background:
          "linear-gradient(135deg, #e0c3fc 0%, #c3e7ff 40%, #fff0c7 70%, #ffd1dc 100%)",
        backgroundSize: "180% 180%",
        animation: "softPulse 15s ease infinite",
      }
    : {};

  const navBtnStyle = {
    width: "clamp(26px, 3.8vw, 48px)",
    height: "clamp(26px, 3.8vw, 48px)",
    background: "#fff",
    boxShadow: "3px 3px 0 rgba(0,0,0,0.25), 0 0 0 2px rgba(0,0,0,0.08)",
    flexShrink: 0,
  };

  return (
    <section
      className="relative w-full select-none px-0 overflow-hidden"
      style={{ minHeight: 200, height: "clamp(200px, 50vw, 500px)" }}
    >
      <style>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes softPulse {
          0%, 100% { background-position: 0% 50%; opacity: 0.95; }
          50% { background-position: 100% 50%; opacity: 1; }
        }
        @media (max-width: 400px) {
          .banner-left-col {
            max-width: 56% !important;
            padding-left: 10px !important;
            padding-right: 4px !important;
          }
        }
        @media (max-width: 320px) {
          .banner-left-col { max-width: 52% !important; }
        }
        @keyframes iconZap {
          0%,100% { transform: scale(1) rotate(0deg); opacity: 1; }
          30%      { transform: scale(1.3) rotate(-15deg); opacity: 0.7; }
          60%      { transform: scale(1.1) rotate(10deg); opacity: 1; }
        }
        .cta-icon-zap { animation: iconZap 1.4s ease-in-out infinite; }
        @keyframes iconTilt {
          0%,100% { transform: rotate(0deg); }
          30%      { transform: rotate(-12deg) scale(1.15); }
          65%      { transform: rotate(8deg) scale(1.1); }
        }
        .cta-icon-tilt { animation: iconTilt 2s ease-in-out infinite; }
        @keyframes iconRocket {
          0%,100% { transform: translateY(0) rotate(0deg); }
          40%      { transform: translateY(-7px) rotate(-10deg) scale(1.2); }
          70%      { transform: translateY(-4px) rotate(-5deg) scale(1.1); }
        }
        .cta-icon-rocket { animation: iconRocket 1.8s ease-in-out infinite; }
        @keyframes iconPulse {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.25); }
        }
        .cta-icon-pulse { animation: iconPulse 1.2s ease-in-out infinite; }
        @keyframes iconSmash {
          0%,70%,100% { transform: scale(1) rotate(0deg); }
          78%          { transform: scale(1.4) rotate(-8deg); }
          86%          { transform: scale(0.9) rotate(5deg); }
          93%          { transform: scale(1.15) rotate(-3deg); }
        }
        .cta-icon-smash { animation: iconSmash 2s ease-in-out infinite; }
        @keyframes iconShake {
          0%,100%  { transform: translateX(0) rotate(0deg); }
          20%      { transform: translateX(-4px) rotate(-10deg); }
          40%      { transform: translateX(4px) rotate(10deg); }
          60%      { transform: translateX(-3px) rotate(-6deg); }
          80%      { transform: translateX(3px) rotate(6deg); }
        }
        .cta-icon-shake { animation: iconShake 1.6s ease-in-out infinite; }
        @keyframes iconSpin {
          0%   { transform: rotate(0deg) scale(1); }
          40%  { transform: rotate(180deg) scale(1.15); }
          100% { transform: rotate(360deg) scale(1); }
        }
        .cta-icon-spin { animation: iconSpin 2.4s linear infinite; }
      `}</style>

      <button
        onClick={(e) => {
          e.stopPropagation();
          go("prev");
        }}
        aria-label="Previous slide"
        className="absolute left-0.5 xs:left-1 sm:left-2 md:left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center rounded-full hover:scale-110 active:scale-95 transition-all duration-150"
        style={navBtnStyle}
      >
        <FaChevronLeft
          style={{ fontSize: "clamp(8px, 1.3vw, 15px)", color: "#333" }}
        />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          go("next");
        }}
        aria-label="Next slide"
        className="absolute right-0.5 xs:right-1 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center rounded-full hover:scale-110 active:scale-95 transition-all duration-150"
        style={navBtnStyle}
      >
        <FaChevronRight
          style={{ fontSize: "clamp(8px, 1.3vw, 15px)", color: "#333" }}
        />
      </button>

      <div
        ref={cardRef}
        className={`mx-7 xs:mx-8 sm:mx-10 md:mx-12 lg:mx-14 rounded-2xl xs:rounded-3xl sm:rounded-[2rem] h-full bg-gradient-to-br ${slide.bg} overflow-hidden relative mt-2 xs:mt-2.5 sm:mt-3 md:mt-4`}
        style={{
          boxShadow: "4px 6px 0px rgba(0,0,0,0.22), 0 0 0 2px rgba(0,0,0,0.07)",
          border: "2px solid rgba(255,255,255,0.6)",
        }}
      >
        {(slide as any).type === "flip" ? (
          <OurCoreFlipCard />
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `radial-gradient(circle, ${slide.accent} 1.2px, transparent 0)`,
                backgroundSize: "24px 24px",
              }}
            />

            <div
              ref={glowRef}
              className="absolute inset-0 opacity-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 78% 50%, ${slide.accent}28 0%, transparent 65%)`,
              }}
            />

            <div
              ref={emojiRef}
              className="absolute hidden xs:block pointer-events-none"
              style={{
                right: "clamp(90px, 16vw, 230px)",
                top: "clamp(6px, 3vw, 44px)",
                fontSize: "clamp(20px, 4vw, 58px)",
                filter: "drop-shadow(2px 3px 0 rgba(0,0,0,0.18))",
              }}
            >
              {slide.emoji}
            </div>

            <div
              className="banner-left-col relative z-10 flex flex-col justify-center h-full"
              style={{
                maxWidth: "62%",
                paddingLeft: "clamp(10px, 3.5vw, 64px)",
                paddingRight: "clamp(4px, 1vw, 16px)",
              }}
            >
              <div
                ref={tagRef}
                className="mb-1 xs:mb-1.5 sm:mb-2 md:mb-3 inline-flex items-center gap-1.5"
              >
                <span
                  className="font-black tracking-wide rounded-2xl uppercase whitespace-nowrap"
                  style={{
                    background: slide.accent,
                    color: "#fff",
                    fontSize: "clamp(6px, 1.1vw, 11px)",
                    letterSpacing: "0.1em",
                    padding: "clamp(2px,0.45vw,5px) clamp(5px,1.1vw,14px)",
                    boxShadow: "2px 2px 0 rgba(0,0,0,0.2)",
                  }}
                >
                  {slide.tag}
                </span>
              </div>

              <h2
                ref={headlineRef}
                className="font-black leading-[1.05] mb-1 xs:mb-1.5 sm:mb-2 md:mb-3 lg:mb-4"
                style={{
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  fontSize: "clamp(15px, 4.2vw, 60px)",
                  color: "#fff",
                  textShadow:
                    "0 2px 8px rgba(0,0,0,0.55), 2px 2px 0 rgba(0,0,0,0.3)",
                }}
              >
                {headlineParts[0]}
                <span
                  style={{
                    color: slide.accent,
                    textShadow:
                      "0 2px 8px rgba(0,0,0,0.4), 2px 2px 0 rgba(0,0,0,0.2)",
                    WebkitTextStroke: "0.5px rgba(255,255,255,0.2)",
                  }}
                >
                  {slide.highlightWord}
                </span>
                {headlineParts[1]}
              </h2>

              <p
                ref={subRef}
                className="mb-2 sm:mb-3 md:mb-4 lg:mb-5 leading-relaxed hidden sm:block"
                style={{
                  fontSize: "clamp(10px, 1.25vw, 14px)",
                  maxWidth: "30ch",
                  color: "rgba(255,255,255,0.92)",
                  textShadow: "0 1px 6px rgba(0,0,0,0.5)",
                }}
              >
                {slide.sub}
              </p>

              <div
                ref={badgesRef}
                className="flex gap-1 mb-1.5 xs:mb-2 sm:mb-3 md:mb-4 flex-wrap"
              >
                {slide.badges.map((b) => (
                  <span
                    key={b}
                    className="font-bold rounded-xl whitespace-nowrap"
                    style={{
                      color: "#111",
                      background: "rgba(255,255,255,0.85)",
                      fontSize: "clamp(6px, 0.95vw, 11px)",
                      padding: "clamp(1px,0.3vw,4px) clamp(5px,0.9vw,12px)",
                      boxShadow: "2px 2px 0 rgba(0,0,0,0.15)",
                      border: "1.5px solid rgba(0,0,0,0.12)",
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>

              <NavLink
                to={slide.link}
                ref={ctaRef}
                className="inline-flex items-center gap-1.5 xs:gap-2 font-black rounded-full w-fit hover:brightness-110 active:scale-95 transition-all duration-150"
                style={{
                  background: slide.accent,
                  color: "#111",
                  boxShadow: "3px 4px 0 rgba(0,0,0,0.25)",
                  fontSize: "clamp(7px, 1.2vw, 13px)",
                  padding: "clamp(4px,0.9vw,11px) clamp(8px,1.8vw,24px)",
                }}
              >
                <span
                  className={`inline-flex items-center justify-center ${ctaIconAnim}`}
                  style={{ fontSize: "clamp(10px,1.6vw,18px)" }}
                >
                  {ctaIcon}
                </span>
                {slide.cta}
              </NavLink>
            </div>

            {slide.items && slide.items.length > 0 && (
              <ItemsPanel
                items={slide.items}
                accent={slide.accent}
                isWorkshops={isWorkshops}
                isProducts={isProducts}
                workshopBgStyle={workshopBgStyle}
                productsBgStyle={productsBgStyle}
                imgFitClass={imgFitClass}
              />
            )}
          </>
        )}

        <div className="absolute bottom-1.5 xs:bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 xs:gap-1.5 sm:gap-2 z-20">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                if (!isAnimating && i !== current)
                  go(i > current ? "next" : "prev");
              }}
              aria-label={`Go to slide ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width:
                  i === current
                    ? "clamp(14px, 2.3vw, 26px)"
                    : "clamp(5px, 0.85vw, 8px)",
                height: "clamp(5px, 0.85vw, 8px)",
                background: i === current ? "#fff" : "rgba(255,255,255,0.45)",
                boxShadow: i === current ? "1px 2px 0 rgba(0,0,0,0.2)" : "none",
                border: i === current ? `1.5px solid ${slide.accent}` : "none",
              }}
            />
          ))}
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-1 rounded-b-full"
          style={{ background: slide.accent, opacity: 0.5 }}
        />
      </div>
    </section>
  );
};

export default LandingBanner;
