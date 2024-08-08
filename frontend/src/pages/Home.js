import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/characterselection");
  };

  return (
    <div className="w-full relative bg-white flex flex-row items-start justify-start leading-[normal] tracking-[normal]">
      <main className="flex-1 bg-gray-300 flex flex-col items-start justify-start min-h-[50rem] max-w-full">
        <Header vector0="pending_1:9" vector1="pending_1:10" />
        <section className="self-stretch flex flex-col items-center justify-center p-[1.25rem] box-border max-w-full text-left text-[1rem] text-thistle font-noto-serif">
          <div className="w-[60rem] overflow-hidden shrink-0 flex flex-col items-start justify-start pt-[1.25rem] px-[0rem] pb-[0rem] box-border max-w-[60rem] mq975:max-w-full">
            <div className="self-stretch flex flex-col items-start justify-start max-w-full">
              <div className="self-stretch flex flex-col items-start justify-start p-[1rem] box-border max-w-full">
                <div className="self-stretch h-[40rem] relative rounded-xl overflow-hidden shrink-0 bg-[url('/public/main.png')] bg-cover bg-no-repeat bg-[top] min-h-[30rem] max-w-full mq450:h-auto">
                </div>
              </div>
            </div>
            <div className="w-[60rem] flex flex-col items-center justify-start pt-[0rem] px-[0rem] pb-[3.375rem] box-border gap-[0.5rem] max-w-full shrink-0 text-[2.7rem] text-white">
              <div className="self-stretch flex flex-col items-center justify-start">
                <h1 className="m-0 self-stretch relative text-inherit tracking-[-2px] leading-[3.75rem] font-black font-[inherit] mq450:text-[1.813rem] mq450:leading-[2.25rem] mq950:text-[2.375rem] mq950:leading-[3rem] text-center mt-[1rem] mb-[2rem]">
                   신비로운 한국형 타로, 토란🔮
                </h1>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start text-[1rem]">
                <div className="self-stretch relative leading-[1.9rem] border border-lightpurple rounded-xl p-[1.2rem] bg-lightpurple bg-opacity-20">
                  토란은 한국적인 테마와 스토리텔링을 담아 새롭게 탄생한 타로 서비스입니다. <br />
                  단순한 운세를 넘어, 흥미로운 이야기와 몽환적인 이미지로 당신의 마음을 사로잡을 거예요. ✨<br />
                  ✔ 답답한 현실, 속 시원한 해답이 필요할 때<br />
                  ✔ 나를 더 잘 이해하고 싶을 때<br />
                  ✔ 재미있고 특별한 경험을 원할 때<br />
                  토란이 당신의 길잡이가 되어드릴게요. 😊<br />
                  지금 바로 토란과 함께 신비로운 타로를 시작해보세요!
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full mb-[5rem]">
            <button
                className="cursor-pointer [border:none] py-[0.75rem] px-[1.25rem] bg-blueviolet rounded-3xl overflow-hidden flex flex-row items-center justify-center box-border min-w-[5.25rem] max-w-[30rem] mq700:max-w-full"
                onClick={handleStart}
              >
                <div className="w-[15rem] overflow-hidden shrink-0 flex flex-col items-center justify-start">
                  <b className="self-stretch relative text-[1.3rem] leading-[1.5rem] font-noto-serif text-white text-center overflow-hidden text-ellipsis whitespace-nowrap">
                    시작하기
                  </b>
                </div>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
