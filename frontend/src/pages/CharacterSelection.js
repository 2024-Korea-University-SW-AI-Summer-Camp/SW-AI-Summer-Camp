import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const CharacterSelection = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const navigate = useNavigate();

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
  };

  const handleNext = () => {
    if (selectedCharacter) {
      navigate("/categoryselection", { state: { character: selectedCharacter } });
    } else {
      alert("캐릭터를 선택해주세요.");
    }
  };

  return (
    <div className="w-full relative bg-white flex flex-row items-start justify-start leading-[normal] tracking-[normal]">
      <main className="flex-1 bg-gray-300 flex flex-col items-start justify-start min-h-[50rem] max-w-full">
        <Header
          vector0="pending_22:118"
          vector1="pending_22:119"
          depth3Frame1Left="47.625rem"
          depth3Frame1Top="31.813rem"
          propWidth="65.875rem"
        />
        <section className="self-stretch flex flex-col items-start justify-start max-w-full text-left text-[1.125rem] text-white font-noto-serif">
          <div className="self-stretch flex flex-row items-start justify-center p-[1.25rem] box-border min-h-[50rem] max-w-full text-center text-[1.375rem]">
            <div className="w-[60rem] overflow-hidden shrink-0 flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[4rem] box-border max-w-[60rem] mq975:max-w-full mq700:pb-[4rem] mq700:box-border">
              <div className="self-stretch flex flex-col items-center justify-start pt-[1.25rem] px-[1rem] pb-[1.25rem]">
                <b className="self-stretch relative leading-[1.75rem] mq450:text-[1.125rem] mq450:leading-[1.375rem]">
                  점성술사 선택
                </b>
              </div>
              <div className="self-stretch flex flex-col items-center justify-start p-[1rem]">
                <div className="self-stretch flex justify-center space-x-20">
                  <div className="flex flex-col items-center justify-start">
                    <div 
                      className={`h-[40rem] w-[20rem] relative cursor-pointer ${
                        selectedCharacter === "흥부" ? "ring-4 ring-purple-500 rounded-xl" : ""
                      }`}
                      onClick={() => handleCharacterSelect("흥부")}
                    >
                      <img
                        className="rounded-xl w-full h-full object-cover"
                        loading="lazy"
                        alt="흥부"
                        src="/heungbu.png"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-start">
                    <div 
                      className={`h-[40rem] w-[20rem] relative cursor-pointer ${
                        selectedCharacter === "놀부" ? "ring-4 ring-purple-500 rounded-xl" : ""
                      }`}
                      onClick={() => handleCharacterSelect("놀부")}
                    >
                      <img
                        className="rounded-xl w-full h-full object-cover"
                        loading="lazy"
                        alt="놀부"
                        src="/nolbu.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-center justify-center w-full mt-[3rem]">
                <button 
                  className="cursor-pointer [border:none] py-[0.75rem] px-[1.25rem] bg-blueviolet w-full rounded-3xl overflow-hidden flex flex-row items-center justify-center box-border min-w-[5.25rem] max-w-[30rem] mq700:max-w-full"
                  onClick={handleNext}
                >
                  <div className="w-[5rem] overflow-hidden shrink-0 flex flex-col items-center justify-start">
                    <b className="self-stretch relative text-[1.3rem] leading-[1.5rem] font-noto-serif text-white text-center overflow-hidden text-ellipsis whitespace-nowrap">
                      다음
                    </b>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CharacterSelection;
