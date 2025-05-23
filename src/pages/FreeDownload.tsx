import FreeDownloadForm from "@/components/comics/FreeDownloadForm";
import Wordbreak from "@/components/comics/Wordbreak";
import { gamesData } from "@/constant/comicsConstants";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { MdCloudDownload } from "react-icons/md";
import { v4 } from "uuid";

export interface GamesData {
  name: string;
  desc: string;
  image: string;
  imgStyling: string;
  cardStyling: string;
  thumbnail_url: string;
  pdf_url: string;
}

export interface SelectedComicType {
  thumbnail_url: string;
  pdf_url: string;
}

const FreeDownload: React.FC = () => {
  const [selectedComic, setSelectedComic] = useState<SelectedComicType>({
    thumbnail_url: "",
    pdf_url: "",
  });

  const [showFreeDownloadForm, setShowFreeDownloadForm] =
    useState<boolean>(false);
  return (
    <div className="py-10 md:py-20 bg-[#00B0A5]  md:p-12">
      <motion.div
        initial={{ opacity: 0.5 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="pb-8 space-y-5 text-center lg:text-start"
      >
        <motion.div
          initial={{ opacity: 0.5 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-3xl text-red-500 uppercase lineBefore"
        >
          Free Download{" "}
        </motion.div>
        <motion.div
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-5xl lg:text-7xl text-white w-full font-extrabold leading-[1.10]"
        >
          Our Top Trendy <Wordbreak /> Games for{" "}
          <span className="text-primary">Free!</span>{" "}
        </motion.div>
      </motion.div>
      <div className="flex flex-wrap justify-center gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        {gamesData?.map((item) => {
          return (
            <motion.div
              initial={{ opacity: 0.5 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              key={v4()}
              // onClick={() => navigate(`/mentoons-comics/audio-comics/${item.name}`)}
              className={`${
                item?.cardStyling && "bg-white"
              } shadow-2xl group cursor-pointer text-black rounded-2xl px-5 py-5 space-y-3`}
              onClickCapture={() => {
                setShowFreeDownloadForm(true);
                setSelectedComic({
                  thumbnail_url: item.thumbnail_url,
                  pdf_url: item.pdf_url,
                });
              }}
            >
              <div
                className={`${item?.imgStyling} overflow-hidden rounded-2xl`}
              >
                <img
                  className="w-full h-[23rem] lg:h-[16rem] rounded-2xl group-hover:scale-105 transition-all ease-in-out duration-300 object-cover object-top"
                  src={item?.image}
                  alt="comic image"
                />
              </div>
              <div className="space-y-2">
                <div className="text-xl font-semibold tracking-wide">
                  {item?.name}
                </div>
                <div className="text-sm tracking-wide ">{item?.desc}</div>
              </div>
              <a href="#" onClick={(e)=>e.preventDefault()} className="flex items-center justify-end gap-2 pt-4 text-xl border-t border-gray-200 cursor-pointer text-end group-hover:text-red-500 group-hover:underline">
                Download Now{" "}
                <MdCloudDownload className="text-2xl text-red-700 group-hover:text-500" />
              </a>
            </motion.div>
          );
        })}
      </div>
      {showFreeDownloadForm && (
        <FreeDownloadForm
          page="freedownload"
          selectedComic={selectedComic}
          setShowFreeDownloadForm={setShowFreeDownloadForm}
        />
      )}
    </div>
  );
};

export default FreeDownload;
