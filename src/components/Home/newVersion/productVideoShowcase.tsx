import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface Video {
  id: number;
  title: string;
  videoUrl: string;
  span: string;
}

const VIDEOS: Video[] = [
  {
    id: 1,
    title: "Conversation Story Cards (20+ years)",
    videoUrl:
      "https://mentoons-products.s3.ap-northeast-1.amazonaws.com/uploads/OpinionJournal/1785843686037-d25cd6ff-890c-4eba-8502-bbf4b56388d5.mp4",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    id: 2,
    title: "Coloring Books",
    videoUrl:
      "https://mentoons-products.s3.ap-northeast-1.amazonaws.com/uploads/OpinionJournal/1785845233611-69c0a612-89ba-4866-826e-9ea832dd9ef7.mp4",
    span: "sm:col-span-1 sm:row-span-1",
  },
  {
    id: 3,
    title: "Conversation Starter Cards",
    videoUrl:
      "https://mentoons-products.s3.ap-northeast-1.amazonaws.com/uploads/OpinionJournal/1785845343325-cb512926-371d-4fc7-9fd3-40decc5ee931.mp4",
    span: "sm:col-span-1 sm:row-span-2",
  },
  {
    id: 4,
    title: "Journals",
    videoUrl:
      "https://mentoons-products.s3.ap-northeast-1.amazonaws.com/uploads/OpinionJournal/1785845495654-55c26a8b-14da-45f8-8a87-3e7d553ab682.mp4",
    span: "sm:col-span-1 sm:row-span-1",
  },
  {
    id: 5,
    title: "Silent Stories",
    videoUrl:
      "https://mentoons-products.s3.ap-northeast-1.amazonaws.com/uploads/OpinionJournal/1785845627983-09b37bab-2315-40b3-92c5-22cd918252ee.mp4",
    span: "sm:col-span-1 sm:row-span-1",
  },
  {
    id: 6,
    title: "Story Re-teller Cards",
    videoUrl:
      "https://mentoons-products.s3.ap-northeast-1.amazonaws.com/uploads/OpinionJournal/1785845797288-7d675dc6-29c6-4aea-aebd-f81a4473795b.mp4",
    span: "sm:col-span-2 sm:row-span-1",
  },
  {
    id: 7,
    title: "All Product Intro",
    videoUrl:
      "https://mentoons-products.s3.ap-northeast-1.amazonaws.com/uploads/OpinionJournal/1785845873777-560e674a-2899-498c-b6aa-f452b58a6f4c.mp4",
    span: "sm:col-span-1 sm:row-span-1",
  },
];

const formatDuration = (seconds: number) => {
  if (!isFinite(seconds) || seconds <= 0) return "--:--";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const ProductVideoShowCase = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [durations, setDurations] = useState<Record<number, number>>({});
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  const handleExploreMore = () => {
    navigate("/products");
  };

  const handleLoadedMetadata = useCallback(
    (id: number, e: React.SyntheticEvent<HTMLVideoElement>) => {
      const duration = e.currentTarget.duration;
      setDurations((prev) =>
        prev[id] === duration ? prev : { ...prev, [id]: duration },
      );
    },
    [],
  );

  // Ensure document.body exists before we try to portal into it
  // (guards against SSR / hydration mismatches)
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!activeVideo) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

  useEffect(() => {
    if (activeVideo && modalVideoRef.current) {
      modalVideoRef.current.play().catch(() => {});
    }
  }, [activeVideo]);

  const modalContent = activeVideo && (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4"
      onClick={() => setActiveVideo(null)}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setActiveVideo(null)}
          aria-label="Close video"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <video
          ref={modalVideoRef}
          src={activeVideo.videoUrl}
          className="w-full aspect-video bg-black"
          controls
          autoPlay
          playsInline
        />

        <div className="px-6 py-4">
          <p className="text-lg font-semibold text-gray-800">
            {activeVideo.title}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Our Products
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Watch how it works, straight from the source
          </p>
        </div>

        <button
          onClick={handleExploreMore}
          className="hidden sm:inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Explore More →
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 sm:auto-rows-[140px] gap-5 lg:gap-6">
        {VIDEOS.map((video) => (
          <button
            key={video.id}
            onClick={() => setActiveVideo(video)}
            onMouseEnter={() => setHoveredId(video.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`relative text-left group rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-orange-100 ${video.span}`}
          >
            <video
              src={video.videoUrl}
              className="absolute inset-0 w-full h-full object-cover"
              preload="metadata"
              muted
              playsInline
              onLoadedMetadata={(e) => handleLoadedMetadata(video.id, e)}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`w-11 h-11 rounded-full bg-white shadow-sm border border-orange-200 flex items-center justify-center transition-transform duration-300 ${
                  hoveredId === video.id ? "scale-110" : ""
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-orange-500 ml-0.5"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
              {formatDuration(durations[video.id])}
            </span>

            <p className="absolute bottom-2 left-3 right-3 text-sm font-semibold text-white truncate">
              {video.title}
            </p>
          </button>
        ))}
      </div>

      <button
        onClick={handleExploreMore}
        className="sm:hidden w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        Explore More →
      </button>

      {mounted && modalContent && createPortal(modalContent, document.body)}
    </div>
  );
};

export default ProductVideoShowCase;
