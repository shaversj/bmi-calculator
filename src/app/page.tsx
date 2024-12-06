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

  return (
    <div>
      <main className={""}>
        <div>
          <div className={"bg-custom-gradient"}>
            <h1 className={"font-interSemibold text-heading-l lg:text-heading-xl text-gunmetal"}>Body Mass Index Calculator</h1>
            <p className={"font-interRegular lg:text-body-m text-dark-electric-blue"}>
              Better understand your weight in relation to your height using our body mass index (BM) calculator. While BMI is not the sole determinant of a healthy weight, it offers a valuable starting point to evaluate your overall health and
              well-being.
            </p>
          </div>
          <div>
            <form className={"space-y-8 rounded-xl border border-gunmetal bg-white p-8 lg:w-[564px]"}>
              <p className={"font-interSemibold text-heading-m text-gunmetal"}>Enter your details below</p>

              <div className={"font-interSemibold text-body-m flex text-gunmetal"}>
                <div className={"gap-x-4.5 flex flex-row-reverse justify-end"}>
                  <label htmlFor={"metric"}>Metric</label>
                  <input type="radio" id="metric" name="unit" />
                </div>
                <div className={"gap-x-4.5 flex flex-row-reverse justify-end"}>
                  <label htmlFor={"imperial"}>Imperial</label>
                  <input type="radio" id="imperial" name="unit" />
                </div>
              </div>

              <div className={"flex gap-x-6"}>
                <div className={"flex flex-col gap-y-2"}>
                  <label className={"font-interRegular text-body-s text-dark-electric-blue"} htmlFor="height">
                    Height
                  </label>
                  <div className={"flex w-[238px] gap-x-6 rounded-lg border border-gunmetal py-5"}>
                    <input
                      className={"text-heading-m font-interSemibold ml-6 w-[131px] text-gunmetal outline-none placeholder:text-dark-electric-blue"}
                      placeholder={"0"}
                      {...register("height", { valueAsNumber: true })}
                      type="number"
                      id="height"
                      name="height"
                    />
                    <span className={"text-heading-m font-interSemibold text-blue"}>cm</span>
                  </div>
                </div>
                <div className={"flex flex-col gap-y-2"}>
                  <label className={"font-interRegular text-body-s text-dark-electric-blue"} htmlFor="weight">
                    Weight
                  </label>
                  <div className={"flex w-[238px] gap-x-6 rounded-lg border border-gunmetal py-5"}>
                    <input
                      className={"text-heading-m font-interSemibold ml-6 w-[131px] text-gunmetal outline-none placeholder:text-dark-electric-blue"}
                      placeholder={"0"}
                      {...register("weight", { valueAsNumber: true })}
                      type="number"
                      id="weight"
                      name="weight"
                    />
                    <span className={"text-heading-m font-interSemibold text-blue"}>kg</span>
                  </div>
                </div>
              </div>

              <div className={"rounded-custom flex flex-col gap-y-4 bg-blue p-8 text-white"}>
                <h2 className={"text-heading-m font-interSemibold"}>Welcome!</h2>
                <p className={"text-body-s font-interRegular"}>Enter your height and weight and you’ll see your BMI result here</p>
              </div>
            </form>
          </div>
        </div>

        <div className={"flex gap-x-[131px] px-[140px]"}>
          <Image src={"/images/image-man-eating.webp"} alt={"Image of Person Eating"} width={564} height={533} />
          <div className={"space-y-8 self-end pb-[40px]"}>
            <h2 className={"text-heading-l-mobile lg:text-heading-l font-interSemibold text-gunmetal"}>What your BMI result means</h2>
            <p className={"text-body-m font-interRegular text-dark-electric-blue"}>
              A BMI range of 18.5 to 24.9 is considered a 'healthy weight.' Maintaining a healthy weight may lower your chances of experiencing health issues later on, such as obesity and type 2 diabetes. Aim for a nutritious diet with reduced fat
              and sugar content, incorporating ample fruits and vegetables. Additionally, strive for regular physical activity, ideally about 30 minutes daily for five days a week.
            </p>
          </div>
        </div>

        <div>
          <div className={"flex justify-center gap-x-8"}>
            {benefits.map((benefit) => (
              <div key={benefit.title} className={"space-y-[45px]"}>
                <Image src={benefit.image} alt={benefit.title} width={64} height={64} />
                <div className={"w-[365px] space-y-6"}>
                  <h3 className={"text-heading-m font-interSemibold text-gunmetal"}>{benefit.title}</h3>
                  <p className={"text-body-m font-interRegular text-dark-electric-blue"}>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={"flex lg:pl-[140px]"}>
          <div className={"w-[564px] space-y-[35px]"}>
            <h4 className={"text-heading-l font-interSemibold text-gunmetal"}>Limitations of BMI</h4>
            <p className={"text-body-m font-interRegular text-dark-electric-blue"}>
              Although BMI is often a practical indicator of healthy weight, it is not suited for every person. Specific groups should carefully consider their BMI outcomes, and in certain cases, the measurement may not be beneficial to use.
            </p>
          </div>

          <div className={"absolute lg:ml-[339px]"}>
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
