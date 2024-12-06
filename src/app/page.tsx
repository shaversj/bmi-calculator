"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LimitationCard from "@/app/components/LimitationCard";

const schema = z.object({
  height: z.number().min(1, "Height is required").gt(0),
  weight: z.number().min(1, "Weight is required").gt(0),
});

export default function Home() {
  const {
    register,
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data: any) => {
    const { height, weight } = data;
    const bmi = (weight / (height * height)) * 10000;
    console.log("BMI: ", bmi);
  };

  const fieldValues = useWatch({
    control: control,
    name: ["height", "weight"], // Watch multiple fields
  });

  useEffect(() => {
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  }, [isValid, fieldValues]); // Trigger effect on form validity and field changes

  const benefits = [
    {
      title: "Healthy eating",
      description: "Healthy eating promotes weight control, disease prevention, better digestion, immunity, mental clarity, and mood.",
      image: "/images/icon-eating.svg",
    },
    {
      title: "Regular exercise",
      description: "Exercise improves fitness, aids weight control, elevates mood, and reduces disease risk, fostering wellness and longevity.",
      image: "/images/icon-exercise.svg",
    },
    {
      title: "Adequate sleep",
      description: "Sleep enhances mental clarity, emotional stability, and physical wellness, promoting overall restoration and rejuvenation.",
      image: "/images/icon-sleep.svg",
    },
  ];

  const limitations = [
    {
      title: "Gender",
      description: "The development and body fat composition of girls and boys vary with age. Consequently,a child's age and gender are considered when evaluating their BMI.",
      image: "/images/icon-gender.svg",
      className: "",
    },
    {
      title: "Age",
      description: "In aging individuals, increased body fat and muscle loss may cause BMI to underestimate body fat content.",
      image: "/images/icon-age.svg",
      className: "row-start-2 row-end-2",
    },
    {
      title: "Muscle",
      description: "BMI may misclassify muscular individuals as overweight or obese, as it doesn't differentiate muscle from fat.",
      image: "/images/icon-muscle.svg",
      className: "row-start-2 row-end-2",
    },
    {
      title: "Pregnancy",
      description: "Expectant mothers experience weight gain due to their growing baby. Maintaining a healthy pre-pregnancy BMI is advisable to minimise health risks for both mother and child.",
      image: "/images/icon-pregnancy.svg",
      className: "row-start-3 ",
    },
    {
      title: "Race",
      description: "Certain health concerns may affect individuals of some Black and Asian origins at lower BMIs than others. To learn more, it is advised to discuss this with your GP or practice nurse.",
      image: "/images/icon-race.svg",
      className: "row-start-3 ",
    },
  ];

  const radioMetadata = [
    {
      id: "metric",
      label: "Metric",
    },
    {
      id: "imperial",
      label: "Imperial",
    },
  ];

  const inputMetadata = [
    {
      id: "height",
      label: "Height",
      placeholder: "0",
      unit: "cm",
    },
    {
      id: "weight",
      label: "Weight",
      placeholder: "0",
      unit: "kg",
    },
  ];
  return (
    <div>
      <main className={""}>
        <div className={"flex w-[1276px] gap-x-8 pb-[107px] pl-[116px] pt-[182px]"}>
          <div className={"w-[564px] space-y-[30px] self-center"}>
            <h1 className={"w-[520px] font-interSemibold text-heading-l text-gunmetal lg:text-heading-xl"}>Body Mass Index Calculator</h1>
            <p className={"w-[465px] font-interRegular text-dark-electric-blue lg:text-body-m"}>
              Better understand your weight in relation to your height using our body mass index (BM) calculator. While BMI is not the sole determinant of a healthy weight, it offers a valuable starting point to evaluate your overall health and
              well-being.
            </p>
          </div>
          <div>
            <form className={"space-y-8 rounded-xl border border-gunmetal bg-white p-8 lg:w-[564px]"}>
              <p className={"font-interSemibold text-heading-m text-gunmetal"}>Enter your details below</p>
              <div className={"flex gap-x-6 font-interSemibold text-body-m text-gunmetal"}>
                {radioMetadata.map((radio) => (
                  <div key={radio.id} className={"flex w-full items-center gap-x-4.5"}>
                    <div className={"grid place-items-center"}>
                      <input type="radio" id={radio.id} name="unit" className={"peer col-start-1 row-start-1 size-[31px] appearance-none rounded-full border border-dark-electric-blue checked:bg-[#345FF6] checked:opacity-15"} />
                      <div className={"pointer-events-none col-start-1 row-start-1 size-[15px] rounded-full peer-checked:bg-blue"} />
                    </div>
                    <label htmlFor={radio.id}>{radio.label}</label>
                  </div>
                ))}
              </div>

              <div className={"flex gap-x-6"}>
                {inputMetadata.map((input) => (
                  <div key={input.id} className={"flex w-full flex-col gap-y-2"}>
                    <label className={"font-interRegular text-body-s text-dark-electric-blue"} htmlFor={input.id}>
                      {input.label}
                    </label>
                    <div className={"flex gap-x-6 rounded-lg border border-gunmetal py-5"}>
                      <input
                        className={"ml-6 w-[131px] font-interSemibold text-heading-m text-gunmetal outline-none placeholder:text-dark-electric-blue"}
                        placeholder={input.placeholder}
                        {...register(input.id, { valueAsNumber: true })}
                        type="number"
                        id={input.id}
                        name={input.id}
                      />
                      <span className={"font-interSemibold text-heading-m text-blue"}>{input.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={"flex flex-col gap-y-4 rounded-custom bg-blue p-8 text-white"}>
                <h2 className={"font-interSemibold text-heading-m"}>Welcome!</h2>
                <p className={"font-interRegular text-body-s"}>Enter your height and weight and you’ll see your BMI result here</p>
              </div>
            </form>
          </div>
        </div>

        <div className={"flex gap-x-[131px] px-[116px]"}>
          <Image src={"/images/image-man-eating.webp"} alt={"Image of Person Eating"} width={564} height={533} />
          <div className={"space-y-8 self-end pb-[40px]"}>
            <h2 className={"font-interSemibold text-heading-l-mobile text-gunmetal lg:text-heading-l"}>What your BMI result means</h2>
            <p className={"font-interRegular text-body-m text-dark-electric-blue"}>
              A BMI range of 18.5 to 24.9 is considered a 'healthy weight.' Maintaining a healthy weight may lower your chances of experiencing health issues later on, such as obesity and type 2 diabetes. Aim for a nutritious diet with reduced fat
              and sugar content, incorporating ample fruits and vegetables. Additionally, strive for regular physical activity, ideally about 30 minutes daily for five days a week.
            </p>
          </div>
        </div>

        <div className={"mt-[92px] bg-red-200 px-[116px] pb-[96px] pt-[96px]"}>
          <div className={"flex gap-x-8"}>
            {benefits.map((benefit) => (
              <div key={benefit.title} className={"space-y-[45px]"}>
                <Image src={benefit.image} alt={benefit.title} width={64} height={64} />
                <div className={"w-[365px] space-y-6"}>
                  <h3 className={"font-interSemibold text-heading-m text-gunmetal"}>{benefit.title}</h3>
                  <p className={"font-interRegular text-body-m text-dark-electric-blue"}>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={"mt-[102px] flex lg:pl-[116px]"}>
          <div className={"w-[564px] space-y-[35px]"}>
            <h4 className={"font-interSemibold text-heading-l text-gunmetal"}>Limitations of BMI</h4>
            <p className={"font-interRegular text-body-m text-dark-electric-blue"}>
              Although BMI is often a practical indicator of healthy weight, it is not suited for every person. Specific groups should carefully consider their BMI outcomes, and in certain cases, the measurement may not be beneficial to use.
            </p>
          </div>

          <div className={"absolute lg:ml-[315px]"}>
            <div className={"w-[961px] space-y-6"}>
              <LimitationCard title={limitations[0].title} description={limitations[0].description} image={limitations[0].image} className={"ml-auto mr-[99px]"} />
              <div className={"flex justify-end gap-x-8"}>
                <LimitationCard title={limitations[1].title} description={limitations[1].description} image={limitations[1].image} className={"row-start-2 row-end-2"} />
                <LimitationCard title={limitations[2].title} description={limitations[2].description} image={limitations[2].image} className={"row-start-2 row-end-2"} />
              </div>
              <div className={"flex gap-x-8"}>
                <LimitationCard title={limitations[3].title} description={limitations[3].description} image={limitations[3].image} className={"row-start-3"} />
                <LimitationCard title={limitations[4].title} description={limitations[4].description} image={limitations[4].image} className={"row-start-3"} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
