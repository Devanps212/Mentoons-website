import { CheckIcon } from "lucide-react";
import { useRef, useState } from "react";

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

const NewBanner = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
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

  return (
    <div className="relative flex flex-col lg:flex-row items-start justify-start p-4 sm:p-5 bg-gradient-to-b from-blue-300 via-blue-200 to-white/20 min-h-screen lg:h-screen overflow-x-hidden overflow-y-auto lg:overflow-hidden">
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
          <span className="p-3 rounded-full text-3xl sm:text-4xl font-bold text-white">
            🚀
          </span>
          <span className="p-2 sm:p-3 rounded-full text-base sm:text-lg font-bold bg-blue-700 text-white">
            New Launch
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold">
          <span className="text-red-500">Mentoons</span> Live{" "}
        </h3>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          <span className="text-orange-500 text-4xl sm:text-5xl lg:text-6xl">
            Workshops
          </span>{" "}
          <br /> for Young Minds
        </h1>
        <div className="flex flex-wrap items-center justify-start text-sm sm:text-md font-semibold mt-4">
          <span>Creative</span>
          <span className="mx-4">•</span>
          <span>Engaging</span>
          <span className="mx-4">•</span>
          <span>Empowering workshops</span>
        </div>
        <p className="text-base sm:text-lg text-gray-900 mt-2">
          Kick start your learning journey with our exciting hands-on workshops
        </p>

        <div className="flex flex-wrap items-center justify-start gap-3">
          {["Psychologists Driven", "Fun & Interactive"].map((item, index) => (
            <div
              key={index}
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
        <div className="w-full flex justify-center">
          <img
            src="/assets/home/banner/new banner/launch offer.png"
            alt="Workshop"
            className="w-2/5 sm:w-1/3 lg:w-1/5 h-auto object-contain"
          />
        </div>

        {/* Workshop cards: horizontally slidable (snap-scroll) on mobile/tablet, static row on desktop */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="w-full flex flex-nowrap lg:flex-wrap overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none no-scrollbar items-start justify-start lg:justify-center gap-3 mt-4 px-1 pb-4 xl:pr-20"
        >
          {workshops.map((workshop, index) => (
            <div
              key={index}
              className="group relative w-28 sm:w-32 lg:w-40 flex-shrink-0 snap-center rounded-xl lg:group-hover:rounded-b-none p-2 px-3 pb-3 bg-white transition-all duration-300 hover:z-40 lg:hover:shadow-2xl lg:hover:rounded-b-none"
            >
              <h1
                className={`text-xs sm:text-sm font-bold text-center truncate mb-3 ${workshop.color}`}
              >
                {workshop.title}
              </h1>

              {/* Image: on mobile/tablet, tapping it navigates straight to the workshop link
                  instead of relying on hover (which doesn't really exist on touch). On lg+,
                  the hover-reveal panel below still works as before. */}
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

              {/* Icon badge: only fades out on hover at lg+ so it never disappears on mobile taps */}
              <div className="absolute right-0 bottom-0 rounded-2xl w-10 h-10 sm:w-14 sm:h-14 bg-white lg:group-hover:opacity-0 transition-opacity duration-200">
                <img
                  src={workshop.icon}
                  alt={workshop.title}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>

              {/* Description/EXPLORE overlay: desktop-only hover reveal */}
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

        {/* Carousel dots — mobile/tablet only. Pushed down with mt-8 (was mt-3) plus the
            scroll row's own pb-4 so the dots sit clearly below the cards instead of overlapping them. */}
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
      </div>

      {/* Highlights bar: hidden below lg, visible (block) at lg and above */}
      <div className="hidden lg:relative mt-6 z-30 w-full sm:w-[92%] max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-10 bg-white rounded-2xl sm:rounded-full px-4 sm:px-8 py-3 sm:py-4 shadow-lg">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 md:gap-6 lg:gap-10"
            >
              <span className="text-green-800 font-extrabold text-xs sm:text-sm md:text-base whitespace-nowrap">
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
