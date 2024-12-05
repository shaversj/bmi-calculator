"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

  return (
    <div>
      <main className={"px-6"}>
        <div>
          <div className={"bg-custom-gradient"}>
            <h1 className={"font-interSemibold text-heading-l lg:text-heading-xl text-gunmetal"}>Body Mass Index Calculator</h1>
            <p className={"font-interRegular lg:text-body-m text-dark-electric-blue"}>Better understand your weight in relation to your height using our body mass index (BM) calculator. While BMI is not the sole determinant of a healthy weight, it offers a valuable starting point to evaluate your overall health and well-being.</p>
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
                    <input className={"text-heading-m font-interSemibold ml-6 w-[131px] text-gunmetal outline-none placeholder:text-dark-electric-blue"} placeholder={"0"} {...register("height", { valueAsNumber: true })} type="number" id="height" name="height" />
                    <span className={"text-heading-m font-interSemibold text-blue"}>cm</span>
                  </div>
                </div>
                <div className={"flex flex-col gap-y-2"}>
                  <label className={"font-interRegular text-body-s text-dark-electric-blue"} htmlFor="weight">
                    Weight
                  </label>
                  <div className={"flex w-[238px] gap-x-6 rounded-lg border border-gunmetal py-5"}>
                    <input className={"text-heading-m font-interSemibold ml-6 w-[131px] text-gunmetal outline-none placeholder:text-dark-electric-blue"} placeholder={"0"} {...register("weight", { valueAsNumber: true })} type="number" id="weight" name="weight" />
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

        <div>
          <h2>What your BMI result means</h2>
          <p>A BMI range of 18.5 to 24.9 is considered a 'healthy weight.' Maintaining a healthy weight may lower your chances of experiencing health issues later on, such as obesity and type 2 diabetes. Aim for a nutritious diet with reduced fat and sugar content, incorporating ample fruits and vegetables. Additionally, strive for regular physical activity, ideally about 30 minutes daily for five days a week.</p>
        </div>

        <div>
          <div>
            <Image src={"/images/icon-eating.svg"} alt={"Healthy eating"} width={64} height={64} />
            <h3>Healthy eating</h3>
            <p>Healthy eating promotes weight control, disease prevention, better digestion, immunity, mental clarity, and mood.</p>
          </div>
          <div>
            <Image src={"/images/icon-exercise.svg"} alt={"Regular exercise"} width={64} height={64} />
            <h3>Regular exercise</h3>
            <p>Exercise improves fitness, aids weight control, elevates mood, and reduces disease risk, fostering wellness and longevity.</p>
          </div>
          <div>
            <Image src={"/images/icon-sleep.svg"} alt={"Adequate sleep"} width={64} height={64} />
            <h3>Adequate sleep</h3>
            <p>Sleep enhances mental clarity, emotional stability, and physical wellness, promoting overall restoration and rejuvenation.</p>
          </div>
        </div>

        <div>
          <h4>Limitations of BMI</h4>
          <p>Although BMI is often a practical indicator of healthy weight, it is not suited for every person. Specific groups should carefully consider their BMI outcomes, and in certain cases, the measurement may not be beneficial to use.</p>
        </div>
      </main>
    </div>
  );
}
