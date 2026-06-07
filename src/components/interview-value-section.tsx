import Image from "next/image";
import Chip from "@mui/material/Chip";
import img_HRProcess from "@/images/recruitmentProcess.png";
import img_competency from "@/images/competency.png";
import img_codeReview from "@/images/techInterview.jpg";
import img_meeting from "@/images/meeting.jpg";

export function InterviewValueSection() {
  return (
    <section className="flex w-full flex-col justify-center bg-white py-32 pb-60 sm:py-44 md:py-60 lg:py-80 lg:pb-96">
      <div className="mx-auto max-w-7xl">
        <div className="mb-24 text-center text-xl duration-100 hover:scale-125 md:mb-32 md:text-3xl lg:mb-52 lg:text-4xl">
          <span className="inline-block pb-6 text-2xl font-semibold text-blue-600 sm:text-3xl md:text-4xl lg:text-5xl">
            알고리즘과 자료구조
          </span>
          ,<br /> 과연
          <span className="text-2xl font-semibold text-orange-600 sm:text-3xl md:text-4xl lg:text-5xl">
            {" "}
            지금도{" "}
          </span>
          공부해야 하나?
        </div>

        <div className="mx-auto w-full space-y-40 px-6 sm:space-y-48 sm:px-12 md:space-y-60 md:px-16 lg:px-20">
          <div className="grid grid-cols-1 items-center justify-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-20">
            <div className="flex flex-col space-y-3 rounded-xl p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <Chip label="CODING TEST" className="w-fit hover:scale-105" color="warning" />
              <span className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
                서류 합격해도 면접은 구경 못하는 현실
              </span>
              <p className="text-base font-medium text-slate-500 sm:text-lg md:text-xl">
                바쁘게 만든 포트폴리오를 보여줄 기회조차 없다면, 코딩 테스트라는 관문을 먼저 넘어야 합니다.
              </p>
            </div>
            <div className="flex h-full w-full flex-col items-center justify-center md:p-5">
              <Image
                src={img_HRProcess.src}
                alt="recruitment process"
                width={600}
                height={600}
                className="h-auto w-full rounded-2xl shadow-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 items-center justify-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-20">
            <div className="order-2 flex flex-col md:order-1">
              <Image
                src={img_competency.src}
                alt="developer competency"
                width={600}
                height={600}
                className="h-auto w-full"
              />
            </div>
            <div className="order-1 flex flex-col space-y-3 rounded-xl p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:order-2">
              <Chip label="FUNDAMENTAL" className="w-fit hover:scale-105" color="success" />
              <span className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
                AI 시대에도 기본기는 자료구조에서 시작됩니다.
              </span>
              <p className="text-base font-medium text-slate-500 sm:text-lg md:text-xl">
                문제 정의, 테스트 검증, 설계 역량은 결국 알고리즘과 자료구조를 이해하는 힘에서 나옵니다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center justify-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-20">
            <div className="flex flex-col space-y-3 rounded-xl p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <Chip label="CODE REVIEW" className="w-fit hover:scale-105" color="primary" />
              <span className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
                기술 면접은 코드의 배경과 이유를 묻습니다.
              </span>
              <p className="text-base font-medium text-slate-500 sm:text-lg md:text-xl">
                코드를 작성한 이유와 선택지를 논리적으로 설명하는 힘은 프로젝트와 면접 모두에서 중요합니다.
              </p>
            </div>
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div className="relative h-full w-full">
                <Image
                  src={img_codeReview.src}
                  alt="technical interview"
                  width={400}
                  height={400}
                  className="absolute left-[50%] top-[50%] z-0 h-auto w-fit max-w-[45vw] rounded-2xl shadow-xl md:left-[20%] md:max-w-[33vw] lg:left-[30%] lg:max-w-[25vw]"
                />
                <Image
                  src={img_meeting.src}
                  alt="meeting"
                  width={400}
                  height={400}
                  className="absolute left-[0%] top-[10%] z-10 h-auto w-fit max-w-[45vw] rounded-2xl shadow-xl md:max-w-[33vw] lg:max-w-[25vw]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
