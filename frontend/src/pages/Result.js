import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
import './Result.css'; // 위에서 작성한 CSS 파일

const Result = () => {
  const location = useLocation();
  const { character, category, selectedCards, interpretation } = location.state || {};
  const [isMobile, setIsMobile] = useState(false);
  const [isCopied, setIsCopied] = useState(false); // isCopied 상태 변수 추가

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
          className="w-48 h-auto object-cover rounded-lg shadow-lg"
        />
      </div>
    ));
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
    <div className="w-full min-h-screen bg-gray-500 flex flex-col items-center">
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
                className="mb-8"
              >
                {selectedCards.map((card, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex flex-col items-center">
                      <img
                        src={`/${card}.png`}
                        alt={card}
                        className="w-48 h-auto object-cover rounded-lg shadow-lg"
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
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <p className="text-lg whitespace-pre-wrap">{interpretation}</p>
            </div>
          </div>
          <div className="w-full max-w-sm flex flex-col items-center gap-4">
            <div className="text-xl font-semibold">
              이 해석 공유하기
            </div>
            <div className="flex justify-center space-x-6">
              <button 
                className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
                onClick={handleInstagramShare}
              >
                <img
                  className="w-6 h-6"
                  alt="Instagram"
                  src="/image-5@2x.png"
                />
              </button>
              <button 
                className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors relative"
                onClick={handleURLShare}
              >
                <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                {isCopied && (
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-1 rounded text-sm whitespace-nowrap">
                    URL이 복사되었습니다!
                  </span>
                )}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Result;
