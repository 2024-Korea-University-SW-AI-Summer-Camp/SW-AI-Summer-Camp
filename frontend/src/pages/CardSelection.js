import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import axios from 'axios';
import './CardSelection.css';

const CardSelection = () => {
  const cardNames = [
    "나그네", "전술사", "난이", "왕비", "임금", "스승", "연인", "거북선", "용기",
    "현인", "운명", "정의", "매달린 사람", "저승", "절제", "도깨비", "붕괴", "별",
    "달", "해", "업보", "세계"
  ];

  const [selectedCards, setSelectedCards] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { character, category } = location.state || {};

  useEffect(() => {
    setShuffledCards([...cardNames].sort(() => Math.random() - 0.5));
  }, []);

  const handleCardSelect = (cardName) => {
    if (selectedCards.includes(cardName)) {
      setSelectedCards(selectedCards.filter(card => card !== cardName));
    } else if (selectedCards.length < 3) {
      setSelectedCards([...selectedCards, cardName]);
    }
  };

  const handleNext = async () => {
    if (selectedCards.length === 3) {
      setIsLoading(true);
      try {
        const response = await axios.post('https://toran-c77fba0a9ab3.herokuapp.com/api/interpret-tarot', {
          character,
          category,
          selectedCards
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setShowSparkle(true);  // 애니메이션 시작
        setTimeout(() => {
          navigate("/result", { 
            state: { 
              character,
              category,
              selectedCards,
              interpretation: response.data.interpretation
            } 
          });
        }, 2000);  // 2초 후 페이지 이동
      } catch (error) {
        console.error("Error fetching interpretation:", error);
        alert("타로 해석을 가져오는 데 문제가 발생했습니다.");
        setIsLoading(false);
        setShowSparkle(false);
      }
    } else {
      alert("카드를 3장 선택해주세요.");
    }
  };

  const renderCards = () => {
    return shuffledCards.map((cardName, index) => (
      <div 
        key={index}
        className={`flex flex-col items-center justify-center cursor-pointer ${
          selectedCards.includes(cardName) ? "ring-4 ring-purple-500 rounded-lg" : "rounded-lg"
        }`}
        onClick={() => handleCardSelect(cardName)}
      >
        <img
          className="w-full h-auto aspect-[2/3] rounded-lg object-cover"
          loading="lazy"
          alt={cardName}
          src="/card_back.png"
        />
      </div>
    ));
  };
  
  return (
    <div className="w-full relative bg-white flex flex-col items-start justify-start leading-[normal] tracking-[normal]">
      <main className="self-stretch bg-gray-300 flex flex-col items-start justify-start min-h-screen max-w-full">
        <section className="self-stretch flex flex-col items-start justify-start max-w-full text-center text-[1.375rem] text-white font-noto-serif">
          <Header vector0="pending_1:9" vector1="pending_1:10" />
          <div className="self-stretch flex flex-row items-start justify-center p-[1.25rem] box-border max-w-full">
            <div className="w-full max-w-4xl overflow-hidden shrink-0 flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[0.562rem] box-border">
              <div className="self-stretch flex flex-col items-center justify-start pt-[1.25rem] px-[1rem] pb-[0.75rem]">
                <h3 className="m-0 self-stretch relative text-inherit leading-[1.75rem] font-bold font-[inherit] text-2xl md:text-xl sm:text-lg">
                  타로 카드 3장을 선택하세요
                </h3>
                <p className="mt-4 text-base md:text-sm leading-[1.5rem]">
                  마음을 가라앉히고, 당신의 직감을 따라 카드를 선택하세요. <br className="hidden sm:inline"/>
                  각 카드는 당신의 과거, 현재, 미래를 나타냅니다.
                </p>
              </div>
              <div className="self-stretch p-[1rem]">
                <div className="grid grid-cols-5 gap-4">
                  {renderCards()}
                </div>
              </div>
              <div className="self-stretch flex flex-col items-center justify-center py-[0.75rem] px-[1rem] box-border max-w-full">
                <button 
                  className="cursor-pointer [border:none] py-[0.75rem] px-[1.25rem] bg-blueviolet w-full max-w-md rounded-3xl overflow-hidden flex flex-row items-center justify-center box-border"
                  onClick={handleNext}
                  disabled={isLoading}
                >
                  <div className="w-full overflow-hidden shrink-0 flex flex-col items-center justify-start">
                    <b className="self-stretch relative text-base md:text-sm leading-[1.5rem] font-noto-serif text-white text-center overflow-hidden text-ellipsis whitespace-nowrap">
                      {isLoading ? "운명의 길을 열고 있습니다..." : "운명을 읽어보세요"}
                    </b>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      {(isLoading || showSparkle) && (
        <div className="sparkle-background">
          <div className="sparkle"></div>
          {isLoading && (
            <div className="absolute">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CardSelection;