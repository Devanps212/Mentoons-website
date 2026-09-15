import { CheckIcon } from "lucide-react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const workshops = [
  {
    title: "Comic Making",
    image: "/assets/home/banner/new banner/workshops/workshops.png",
    icon: "/assets/home/banner/new banner/icon.png",
    color: "text-orange-400",
    description:
      "Make your own comic from scratch. learning basics of comic making",
    link: "/mentoons-workshops",
  },
  {
    title: "Art & Craft",
    icon: "/assets/workshopv2/new/kalakrithi.png",
    image: "/assets/home/banner/new banner/workshops/art.png",
    color: "text-green-400",
    description:
      "Unleash your imagination with art & craft your own masterpieces",
    link: "/mentoons-workshops?category=KalaKriti",
  },
  {
    title: "Music",
    icon: "/assets/workshopv2/new/Swar2.png",
    image: "/assets/home/banner/new banner/workshops/music.png",
    color: "text-purple-500",
    description:
      "Musical adventure exploring rhythm, sing catchy songs & try out different instruments",
    link: "/mentoons-workshops?category=Swar",
  },
  {
    title: "Laughter",
    icon: "/assets/workshopv2/new/hasyaras-04.png",
    image: "/assets/home/banner/new banner/workshops/laughter.png",
    color: "text-red-500",
    description:
      "Giggle challenges, playful movements & stress-busting laughter exercises",
    link: "/mentoons-workshops?category=Hasyaras",
  },
  {
    title: "Story Telling",
    icon: "/assets/workshopv2/new/instant katha-05.png",
    image: "/assets/home/banner/new banner/workshops/story telling.png",
    color: "text-blue-500",
    description:
      "Bring vibrant characters to life & learn how to spin your own tales",
    link: "/mentoons-workshops?category=Instant%20Katha",
  },
];

const highlights = [
  "For Ages 6-12 Yrs & 13-19 Yrs",
  "Weekend Batches",
  "Certified Programs",
  "Safe & Protective",
];

const clouds = [
  { top: "6%", left: "8%", scale: 1, duration: 48, delay: 0, opacity: 0.85 },
  {
    top: "22%",
    left: "35%",
    scale: 0.65,
    duration: 62,
    delay: -18,
    opacity: 0.7,
  },
  {
    top: "3%",
    left: "55%",
    scale: 1.25,
    duration: 55,
    delay: -36,
    opacity: 0.9,
  },
  {
    top: "31%",
    left: "18%",
    scale: 0.5,
    duration: 40,
    delay: -8,
    opacity: 0.6,
  },
  {
    top: "12%",
    left: "72%",
    scale: 0.85,
    duration: 52,
    delay: -44,
    opacity: 0.75,
  },
  {
    top: "26%",
    left: "42%",
    scale: 1.1,
    duration: 58,
    delay: -27,
    opacity: 0.8,
  },
  {
    top: "17%",
    left: "2%",
    scale: 0.6,
    duration: 35,
    delay: -13,
    opacity: 0.65,
  },
];

const stars = [
  { top: "6%", left: "12%", size: 3, duration: 2.5, delay: 0 },
  { top: "10%", left: "28%", size: 2, duration: 3.2, delay: 0.4 },
  { top: "4%", left: "45%", size: 4, duration: 2.8, delay: 0.8 },
  { top: "15%", left: "62%", size: 2, duration: 3.6, delay: 0.2 },
  { top: "8%", left: "78%", size: 3, duration: 2.2, delay: 1.1 },
  { top: "20%", left: "90%", size: 2, duration: 3, delay: 0.6 },
  { top: "22%", left: "8%", size: 2, duration: 2.6, delay: 1.4 },
  { top: "26%", left: "35%", size: 3, duration: 3.4, delay: 0.3 },
  { top: "18%", left: "52%", size: 2, duration: 2.4, delay: 1.7 },
  { top: "12%", left: "70%", size: 4, duration: 3.1, delay: 0.9 },
  { top: "30%", left: "20%", size: 2, duration: 2.9, delay: 1.2 },
  { top: "3%", left: "58%", size: 3, duration: 2.7, delay: 0.5 },
];

const taglineWords = ["Creative", "•", "Engaging", "•", "Empowering workshops"];

const splitToChars = (text: string) =>
  text.split("").map((char) => (char === " " ? "\u00A0" : char));

const splitToWords = (text: string) => text.split(" ");

const NewBanner = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const badgeSubRef = useRef<HTMLDivElement>(null);
  const headingLine1Ref = useRef<HTMLSpanElement>(null);
  const headingLine2Ref = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const ratio = el.scrollLeft / maxScroll;
    const index = Math.round(ratio * (workshops.length - 1));
    setActiveIndex(index);
  };

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement | undefined;
    if (card) {
      el.scrollTo({
        left: card.offsetLeft - el.offsetLeft,
        behavior: "smooth",
      });
    }
    setActiveIndex(index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { scale: 0, rotate: -35, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.7, ease: "back.out(2)" },
      )
        .fromTo(
          badgeSubRef.current,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5 },
          "-=0.35",
        )
        .fromTo(
          headingLine1Ref.current?.querySelectorAll(".char") ?? [],
          { y: 60, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.045,
            ease: "back.out(1.7)",
          },
          "-=0.2",
        )
        .fromTo(
          headingLine2Ref.current?.querySelectorAll(".word") ?? [],
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
          "-=0.3",
        )
        .fromTo(
          taglineRef.current?.querySelectorAll(".tagline-word") ?? [],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.08 },
          "-=0.2",
        )
        .fromTo(
          descriptionRef.current,
          { opacity: 0, filter: "blur(6px)", y: 12 },
          { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.6 },
          "-=0.15",
        )
        .fromTo(
          chipRef.current,
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "elastic.out(1,0.6)" },
          "-=0.1",
        )
        .fromTo(
          buttonRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "back.out(2)" },
          "-=0.2",
        )
        .fromTo(
          cardsRef.current?.children ?? [],
          { y: 50, opacity: 0, scale: 0.85, rotate: -4 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.55,
            stagger: 0.09,
            ease: "back.out(1.6)",
          },
          "-=0.3",
        )
        .fromTo(
          highlightsRef.current?.children ?? [],
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
          "-=0.2",
        );

      const loopStart = tl.duration() + 0.15;

      if (rocketRef.current) {
        gsap.to(rocketRef.current, {
          y: -10,
          rotate: 8,
          duration: 1.1,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: loopStart,
        });
      }

      if (badgeSubRef.current) {
        gsap.to(badgeSubRef.current, {
          scale: 1.06,
          duration: 0.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: loopStart,
        });
      }

      const headingChars = headingLine1Ref.current?.querySelectorAll(".char");
      if (headingChars && headingChars.length) {
        gsap.to(headingChars, {
          y: -14,
          rotate: 6,
          scale: 1.08,
          duration: 0.6,
          ease: "sine.inOut",
          stagger: {
            each: 0.09,
            repeat: -1,
            yoyo: true,
          },
          delay: loopStart,
        });
      }

      const line2Words = headingLine2Ref.current?.querySelectorAll(".word");
      if (line2Words && line2Words.length) {
        gsap.to(line2Words, {
          y: -8,
          rotate: -4,
          duration: 0.9,
          ease: "sine.inOut",
          stagger: {
            each: 0.15,
            repeat: -1,
            yoyo: true,
          },
          delay: loopStart,
        });
      }

      const taglineWordsEls =
        taglineRef.current?.querySelectorAll(".tagline-word");
      if (taglineWordsEls && taglineWordsEls.length) {
        gsap.to(taglineWordsEls, {
          y: -6,
          scale: 1.12,
          duration: 0.7,
          ease: "sine.inOut",
          stagger: {
            each: 0.12,
            repeat: -1,
            yoyo: true,
          },
          delay: loopStart,
        });
      }

      if (chipRef.current) {
        gsap.to(chipRef.current, {
          rotate: 4,
          duration: 0.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: loopStart,
        });
      }

      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          duration: 0.9,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: loopStart,
        });
      }

      const cardTitles =
        cardsRef.current?.querySelectorAll(".card-title .char");
      if (cardTitles && cardTitles.length) {
        gsap.to(cardTitles, {
          y: -5,
          duration: 0.55,
          ease: "sine.inOut",
          stagger: {
            each: 0.045,
            repeat: -1,
            yoyo: true,
            from: "start",
          },
          delay: loopStart,
        });
      }

      const highlightSpans = highlightsRef.current?.querySelectorAll(
        "span.highlight-text",
      );
      if (highlightSpans && highlightSpans.length) {
        gsap.to(highlightSpans, {
          y: -4,
          duration: 0.6,
          ease: "sine.inOut",
          stagger: {
            each: 0.2,
            repeat: -1,
            yoyo: true,
          },
          delay: loopStart,
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative flex flex-col lg:flex-row items-start justify-start p-4 sm:p-5 bg-gradient-to-b from-blue-300 via-blue-200 to-white/20 min-h-screen lg:h-screen overflow-x-hidden overflow-y-auto lg:overflow-hidden"
    >
      <style>{`
        @keyframes drift-cloud {
          0%   { transform: scale(var(--cloud-scale)) translateX(0); }
          100% { transform: scale(var(--cloud-scale)) translateX(110vw); }
        }
        @keyframes twinkle-star {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50%      { opacity: 1;   transform: scale(1.3); }
        }
        .cloud-shape {
          position: relative;
          width: 120px;
          height: 40px;
          background: white;
          border-radius: 999px;
        }
        .cloud-shape::before,
        .cloud-shape::after {
          content: "";
          position: absolute;
          background: white;
          border-radius: 999px;
        }
        .cloud-shape::before {
          width: 60px;
          height: 60px;
          top: -28px;
          left: 15px;
        }
        .cloud-shape::after {
          width: 45px;
          height: 45px;
          top: -18px;
          left: 60px;
        }
        .glow-star {
          border-radius: 999px;
          background: white;
          box-shadow: 0 0 6px 2px rgba(255,255,255,0.9), 0 0 12px 4px rgba(173,216,255,0.6);
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .char, .word {
          display: inline-block;
          will-change: transform;
        }
      `}</style>

      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {clouds.map((cloud, index) => (
          <div
            key={`cloud-${index}`}
            className="cloud-shape absolute"
            style={{
              top: cloud.top,
              left: cloud.left,
              opacity: cloud.opacity,
              ["--cloud-scale" as string]: cloud.scale,
              animation: `drift-cloud ${cloud.duration}s linear infinite`,
              animationDelay: `${cloud.delay}s`,
            }}
          />
        ))}

        {stars.map((star, index) => (
          <div
            key={`star-${index}`}
            className="glow-star absolute"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `twinkle-star ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="w-full lg:w-[450px] flex flex-col items-start justify-start z-10">
        <div className="flex items-center justify-start">
          <div
            ref={rocketRef}
            className="p-3 rounded-full text-3xl sm:text-4xl font-bold text-white"
          >
            <div ref={badgeRef}>🚀</div>
          </div>
          <div
            ref={badgeSubRef}
            className="p-2 sm:p-3 rounded-full text-base sm:text-lg font-bold bg-blue-700 text-white"
          >
            New Launch
          </div>
        </div>
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold"
          style={{ perspective: "600px" }}
        >
          <span
            ref={headingLine1Ref}
            className="text-orange-500 text-4xl sm:text-5xl lg:text-6xl inline-block"
          >
            {splitToChars("Workshops").map((char, index) => (
              <span key={index} className="char">
                {char}
              </span>
            ))}
          </span>{" "}
          <br />
          <span ref={headingLine2Ref} className="inline-block">
            {splitToWords("for Young Minds").map((word, index) => (
              <span key={index} className="word mr-2">
                {word}
              </span>
            ))}
          </span>
        </h1>
        <div
          ref={taglineRef}
          className="flex flex-wrap items-center justify-start text-sm sm:text-md font-semibold mt-4"
        >
          {taglineWords.map((word, index) => (
            <span
              key={index}
              className="tagline-word mx-1 first:ml-0 inline-block"
            >
              {word}
            </span>
          ))}
        </div>
        <p
          ref={descriptionRef}
          className="text-base sm:text-lg text-gray-900 mt-2"
        >
          Kick start your learning journey with our exciting hands-on workshops
        </p>

        <div className="flex flex-wrap items-center justify-start gap-3">
          {["Fun & Interactive"].map((item, index) => (
            <div
              key={index}
              ref={chipRef}
              className="flex items-center gap-2 p-2 px-4 rounded-full bg-blue-700 text-white font-semibold mt-4 cursor-pointer hover:bg-blue-800 transition-all duration-300"
            >
              <span>
                <CheckIcon />
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <button
          ref={buttonRef}
          onClick={() => {
            window.location.href = "/mentoons-workshops";
          }}
          className="mt-4 relative px-6 py-2 rounded-full
            bg-gradient-to-b from-orange-400 to-orange-500
            text-white font-extrabold text-sm tracking-wide
            shadow-[0_4px_0_0_#c2540f,0_6px_10px_rgba(0,0,0,0.25)]
            border-2 border-orange-300/40
            active:translate-y-1
            active:shadow-[0_1px_0_0_#c2540f,0_2px_4px_rgba(0,0,0,0.2)]
            transition-all duration-100
            hover:brightness-105"
        >
          Join Workshops
        </button>
      </div>

      <div className="w-full flex-1 flex flex-col items-start justify-start relative z-10">
        <div className="w-full flex justify-center mt-2">
          <span className="bg-yellow-100 text-black font-bold text-xs sm:text-sm px-4 py-2 rounded-full shadow-sm text-center">
            Crafted and designed especially for Gen A to Z
          </span>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="w-full flex flex-nowrap lg:flex-wrap overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none no-scrollbar items-start justify-start lg:justify-center gap-3 mt-4 px-1 pb-4 xl:pr-20"
        >
          <div ref={cardsRef} className="contents">
            {workshops.map((workshop, index) => (
              <div
                key={index}
                className="group relative w-28 sm:w-32 lg:w-40 flex-shrink-0 snap-center rounded-xl lg:group-hover:rounded-b-none p-2 px-3 pb-3 bg-white transition-all duration-300 hover:z-40 lg:hover:shadow-2xl lg:hover:rounded-b-none"
              >
                <h1
                  className={`card-title text-xs sm:text-sm font-bold text-center truncate mb-3 ${workshop.color}`}
                >
                  {splitToChars(workshop.title).map((char, charIndex) => (
                    <span key={charIndex} className="char">
                      {char}
                    </span>
                  ))}
                </h1>

                <div
                  onClick={() => {
                    window.location.href = workshop.link;
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Go to ${workshop.title}`}
                  className="relative w-full h-32 sm:h-40 lg:h-48 bg-gray-50 rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md overflow-hidden cursor-pointer lg:cursor-default"
                >
                  <img
                    src={workshop.image}
                    alt={workshop.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                <div className="absolute right-0 bottom-0 rounded-2xl w-10 h-10 sm:w-14 sm:h-14 bg-white lg:group-hover:opacity-0 transition-opacity duration-200">
                  <img
                    src={workshop.icon}
                    alt={workshop.title}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>

                <div className="hidden lg:flex absolute top-full left-0 right-0 -mt-px bg-white rounded-b-xl px-3 max-h-0 lg:group-hover:max-h-40 opacity-0 lg:group-hover:opacity-100 overflow-hidden transition-all duration-300 flex-col items-center gap-2 shadow-2xl">
                  <p className="text-xs text-gray-700 text-center leading-snug pt-2">
                    {workshop.description}
                  </p>
                  <button
                    onClick={() => {
                      window.location.href = workshop.link;
                    }}
                    className="px-5 py-1.5 mb-2 rounded-full bg-gradient-to-b from-orange-400 to-orange-500 text-white font-extrabold text-xs tracking-wide shadow-[0_3px_0_0_#c2540f] active:translate-y-0.5 active:shadow-[0_1px_0_0_#c2540f] transition-all duration-100 hover:brightness-105"
                  >
                    EXPLORE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex lg:hidden w-full items-center justify-center gap-2 mt-8">
          {workshops.map((workshop, index) => (
            <button
              key={`dot-${index}`}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to ${workshop.title}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? "w-6 bg-blue-700" : "w-2 bg-blue-700/30"
              }`}
            />
          ))}
        </div>

        <div className="w-full flex justify-center mt-4">
          <img
            src="/assets/LandingPage/psyco.png"
            alt="Psychologist Verified"
            className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 object-contain"
          />
        </div>
      </div>

      <div className="hidden lg:relative mt-6 z-30 w-full sm:w-[92%] max-w-6xl mx-auto">
        <div
          ref={highlightsRef}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-10 bg-white rounded-2xl sm:rounded-full px-4 sm:px-8 py-3 sm:py-4 shadow-lg"
        >
          {highlights.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 md:gap-6 lg:gap-10"
            >
              <span className="highlight-text inline-block text-green-800 font-extrabold text-xs sm:text-sm md:text-base whitespace-nowrap">
                {item}
              </span>
              {index < highlights.length - 1 && (
                <span className="h-6 border-l-2 border-dotted border-green-800" />
              )}
            </div>
          ))}
        </div>
      </div>

      <img
        src="/assets/home/banner/new banner/workshops/banner bg.png"
        alt="Banner Background"
        className="hidden lg:block absolute bottom-0 left-0 w-full h-auto object-contain z-0 pointer-events-none"
      />

      <img
        src="/assets/home/banner/new banner/workshops/boy.png"
        alt="Boy"
        className="hidden xl:block absolute bottom-28 right-2 w-[150px] h-auto object-contain z-0 pointer-events-none"
      />
    </div>
  );
};

export default NewBanner;
