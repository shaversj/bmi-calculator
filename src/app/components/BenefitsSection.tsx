import { benefits } from "@/app/data/data";
import Image from "next/image";

export default function BenefitsSection() {
  return (
    <section className={"lg:px-6"}>
      <div id={"benefits"} className={"mt-[92px] px-5 md:px-[40px] md:py-[60px] lg:flex lg:h-[402px] lg:items-end lg:justify-center lg:px-0 lg:py-0 lg:pb-[96px]"}>
        <div className={"flex flex-col gap-y-[40px] lg:flex-row lg:items-center lg:justify-center lg:gap-x-8"}>
          {benefits.map((benefit) => (
            <div key={benefit.title} className={"md:flex md:gap-x-[40px] lg:block"}>
              <Image src={benefit.image} alt={benefit.title} width={64} height={64} />
              <div className={"space-y-6 md:w-[582px] lg:w-[365px] lg:pt-[45px]"}>
                <h3 className={"pt-8 font-interSemibold text-heading-m text-gunmetal md:pt-0"}>{benefit.title}</h3>
                <p className={"font-interRegular text-body-m text-dark-electric-blue"}>{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
