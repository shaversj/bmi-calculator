import Image from "next/image";
import LimitationCard from "@/app/components/LimitationCard";
import { limitations } from "@/app/data/data";

export default function LimitationSection() {
  return (
    <section className={"mx-auto mt-[102px] flex flex-col items-center md:w-[686px] lg:mx-0 lg:flex lg:flex-row lg:items-start lg:pl-[116px]"}>
      <div className={"lg:w-[564px]"}>
        <h4 className={"text-center font-interSemibold text-heading-l-mobile text-gunmetal lg:text-left"}>Limitations of BMI</h4>
        <p className={"pt-8 text-center font-interRegular text-body-m text-dark-electric-blue lg:pt-[35px] lg:text-left"}>
          Although BMI is often a practical indicator of healthy weight, it is not suited for every person. Specific groups should carefully consider their BMI outcomes, and in certain cases, the measurement may not be beneficial to use.
        </p>

        <Image src={"/images/pattern-curved-line-right.svg"} alt={"Pattern Line Right"} width={94} height={122} className={"hidden lg:ml-[165px] lg:mt-[67px] lg:block"} />
      </div>

      <div className={"pt-[56px] lg:absolute lg:ml-[315px] lg:mr-0"}>
        <div className={"space-y-4 pb-[96px] md:grid md:w-[686px] md:grid-cols-2 md:pb-[95.91px] lg:block lg:w-[961px] lg:space-y-6 lg:pb-[120px]"}>
          <LimitationCard title={limitations[0].title} description={limitations[0].description} image={limitations[0].image} className={"lg:ml-auto lg:mr-[99px]"} />
          <div className={"hidden lg:flex lg:justify-end lg:gap-x-8"}>
            <LimitationCard title={limitations[1].title} description={limitations[1].description} image={limitations[1].image} className={""} />
            <LimitationCard title={limitations[2].title} description={limitations[2].description} image={limitations[2].image} className={""} />
          </div>
          <LimitationCard title={limitations[1].title} description={limitations[1].description} image={limitations[1].image} className={"lg:hidden"} />
          <LimitationCard title={limitations[2].title} description={limitations[2].description} image={limitations[2].image} className={"lg:hidden"} />
          <div className={"hidden lg:flex lg:gap-x-8"}>
            <LimitationCard title={limitations[3].title} description={limitations[3].description} image={limitations[3].image} className={""} />
            <LimitationCard title={limitations[4].title} description={limitations[4].description} image={limitations[4].image} className={""} />
          </div>
          <LimitationCard title={limitations[3].title} description={limitations[3].description} image={limitations[3].image} className={"lg:hidden"} />
          <LimitationCard title={limitations[4].title} description={limitations[4].description} image={limitations[4].image} className={"md:col-span-full md:mx-auto lg:hidden"} />
        </div>
      </div>
    </section>
  );
}
