import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";

const CategorySelection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCharacter = location.state?.character;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleNext = () => {
    if (selectedCategory) {
      navigate("/cardselection", { 
        state: { 
          character: selectedCharacter, 
          category: selectedCategory 
        } 
      });
    } else {
      alert("카테고리를 선택해주세요.");
    }
  };

  const categories = [
    { id: "destiny", name: "운명" },
    { id: "love", name: "사랑" },
    { id: "money", name: "재물" },
    { id: "health", name: "건강" },
    { id: "other", name: "기타" }
  ];

  return (
    <div className="w-full relative bg-white flex flex-row items-start justify-start leading-[normal] tracking-[normal]">
      <main className="flex-1 bg-gray-300 flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[9.5rem] box-border min-h-[50rem] max-w-full mq700:pb-[6.188rem] mq700:box-border">
        <Header
          vector0="pending_22:129"
          vector1="pending_22:130"
          depth3Frame1Left="-42.5rem"
          depth3Frame1Top="35.75rem"
          propWidth="65.875rem"
        />
        <form className="m-0 self-stretch flex flex-col items-start justify-start max-w-full">
          <div className="self-stretch flex flex-row items-start justify-center pt-[1.25rem] px-[1.25rem] pb-[0.875rem] box-border max-w-full">
            <div className="w-[60rem] overflow-hidden shrink-0 flex flex-col items-start justify-start py-[1.25rem] px-[0rem] box-border max-w-[60rem] mq975:max-w-full">
              <div className="self-stretch flex flex-col items-start justify-start pt-[1.25rem] px-[1rem] pb-[0.75rem]">
                <h3 className="m-0 self-stretch relative text-[1.375rem] leading-[1.75rem] font-bold font-noto-serif text-white text-left mq450:text-[1.125rem] mq450:leading-[1.375rem]">
                  어떤 이야기를 나누고 싶으신가요? 
                </h3>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start pt-[0.25rem] px-[1rem] pb-[0.75rem]">
                <div className="self-stretch relative text-[1rem] leading-[1.5rem] font-noto-serif text-white text-left">
                타로 카드가 당신의 이야기에 귀 기울일 거예요.
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start p-[1rem] box-border gap-[0.75rem] max-w-full">
              {categories.map((category) => (
  <div 
    key={category.id}
    className={`self-stretch rounded-xl border-dimgray border-[1px] border-solid box-border flex flex-row items-center justify-between py-[0.875rem] px-[0.937rem] gap-[1rem] max-w-full cursor-pointer ${
      selectedCategory === category.id ? "bg-blueviolet" : ""
    }`}
    onClick={() => handleCategorySelect(category.id)}
  >
    <div className="flex-1 flex flex-col items-start justify-start">
      <div className="self-stretch flex flex-col items-start justify-start">
        <div className="self-stretch relative text-[0.875rem] leading-[1.313rem] font-medium font-noto-serif text-white text-left">
          {category.name}
        </div>
      </div>
    </div>
    {selectedCategory === category.id && (
      <img
        className="h-[1.25rem] w-[1.25rem] relative rounded-3xs overflow-hidden shrink-0"
        loading="lazy"
        alt=""
        src="/depth-6-frame-1.svg"
      />
    )}
  </div>
))}
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-center py-[0rem] px-[1.25rem] box-border max-w-full mb-[20rem]">
      <button 
        className={`cursor-pointer [border:none] py-[0.75rem] px-[1.25rem] bg-blueviolet rounded-3xl overflow-hidden flex flex-row items-center justify-center box-border ${
          isMobile 
            ? "min-w-[5.25rem] max-w-[30rem] w-[15rem]" 
            : "w-[30rem] max-w-full"
        }`}
        onClick={handleNext}
      >
        <div className={`${isMobile ? "w-[15rem]" : "w-full"} overflow-hidden shrink-0 flex flex-col items-center justify-start`}>
          <b className={`relative ${isMobile ? "text-[1rem]" : "text-[1.2rem]"} leading-[1.5rem] font-noto-serif text-white text-center`}>
            다음
          </b>
        </div>
      </button>
    </div>
        </form>
      </main>
    </div>
  );
};

export default CategorySelection;