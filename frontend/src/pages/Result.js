import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
import './Result.css';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { character, category, selectedCards, interpretation } = location.state || {};
  const [isMobile, setIsMobile] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderCards = () => {
    return selectedCards.map((card, index) => (
      <div key={index} className="flex flex-col items-center">
        <img
          src={`/${card}.png`}
          alt={card}
          className="w-48 h-72 object-cover rounded-lg shadow-lg"
        />
      </div>
    ));
  };

  const handleNewReading = () => {
    navigate('/');  // 새로운 타로 읽기를 위해 홈페이지로 이동
  };

  const handleInstagramShare = () => {
    window.open('https://www.instagram.com/', '_blank');
  };

  const handleURLShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-500 flex flex-col items-center overflow-x-hidden">
      <Header
        vector0="pending_22:233"
        vector1="pending_22:234"
        depth3Frame1Left="-217.687rem"
        depth3Frame1Top="30.25rem"
        propWidth="68.375rem"
      />
      <main className="w-full max-w-4xl px-4 py-8 flex flex-col items-center">
        <section className="w-full flex flex-col items-center gap-10 text-white">
          <div className="w-full">
            <h2 className="text-3xl font-bold mb-6 text-center">타로 해석 결과</h2>
            {isMobile ? (
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                }}
                className="mb-8 w-full"
                style={{ overflow: 'hidden' }}
              >
                {selectedCards.map((card, index) => (
                  <SwiperSlide key={index} className="flex justify-center">
                    <div className="flex flex-col items-center">
                      <img
                        src={`/${card}.png`}
                        alt={card}
                        className="w-48 h-72 object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="flex justify-center space-x-4 mb-8">
                {renderCards()}
              </div>
            )}
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg mx-4 sm:mx-4">
              <p className="text-lg whitespace-pre-wrap">{interpretation}</p>
            </div>
          </div>
          <div className="w-full max-w-sm flex flex-col items-center gap-4">
  <button 
    className="cursor-pointer [border:none] py-[0.75rem] px-[1.25rem] bg-blueviolet rounded-3xl overflow-hidden flex flex-row items-center justify-center box-border min-w-[5.25rem] max-w-[30rem] mq700:max-w-full"
    onClick={handleNewReading}
  >
    <div className="w-[15rem] overflow-hidden shrink-0 flex flex-col items-center justify-start">
      <b className="self-stretch relative text-[1rem] leading-[1.5rem] font-noto-serif text-white text-center overflow-hidden text-ellipsis whitespace-nowrap">
         다른 운명 선택하기
      </b>
    </div>
  </button>
       </div>
        </section>
      </main>
    </div>
  );
};

export default Result;