import Image from "next/image";

export default function BmiExplanationSection() {
  return (
    <section className={"pt-[480px] md:-ml-[75px] md:flex md:items-center md:justify-center md:gap-x-[75px] md:pt-[250px] lg:-ml-0 lg:gap-x-[131px] lg:px-[116px] lg:pt-[65px]"}>
      <Image className={"h-[354px] w-[375px] md:h-[411.09px] md:w-[435px] lg:h-[533px] lg:w-[564px]"} src={"/images/image-man-eating.webp"} alt={"Image of Person Eating"} width={564} height={533} />
      <div className={"space-y-8 px-6 pt-[48px] md:px-0 md:pt-0 lg:self-end lg:pb-[40px]"}>
        <h2 className={"font-interSemibold text-heading-l-mobile text-gunmetal lg:text-heading-l"}>What your BMI result means</h2>
        <p className={"font-interRegular text-body-m text-dark-electric-blue"}>
          A BMI range of 18.5 to 24.9 is considered a &apos;healthy weight.&apos; Maintaining a healthy weight may lower your chances of experiencing health issues later on, such as obesity and type 2 diabetes. Aim for a nutritious diet with reduced fat and sugar content, incorporating ample fruits and vegetables. Additionally, strive for regular physical activity, ideally about 30 minutes daily
          for five days a week.
        </p>
      </div>
    </section>
  );
}
