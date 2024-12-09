"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LimitationCard from "@/app/components/LimitationCard";

const schema = z
  .object({
    unit: z.enum(["metric", "imperial"]),
    metricGroup: z
      .object({
        height: z.number().min(1).positive().or(z.nan()).optional(),
        weight: z.number().min(1).positive().or(z.nan()).optional(),
      })
      .optional(),
    imperialGroup: z
      .object({
        feet: z.number().min(1).positive().or(z.nan()).optional(),
        inches: z.number().min(1).positive().or(z.nan()).optional(),
        stone: z.number().min(1).positive().or(z.nan()).optional(),
        pounds: z.number().min(1).positive().or(z.nan()).optional(),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.unit === "metric") {
      if (!data.metricGroup || !data.metricGroup.height || !data.metricGroup.weight) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["metricGroup"],
          message: "Height and Weight are required for metric units.",
        });
      }
    } else if (data.unit === "imperial") {
      console.log("imperial soldier");
      if (!data.imperialGroup || (!data.imperialGroup.feet && !data.imperialGroup.inches) || (!data.imperialGroup.stone && !data.imperialGroup.pounds)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["imperialGroup"],
          message: "Feet/Inches or Stone/Pounds are required for imperial units.",
        });
      }
    }
  });

export default function Home() {
  const {
    register,
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { unit: "metric", metricGroup: { height: undefined, weight: undefined }, imperialGroup: { feet: undefined, inches: undefined, stone: undefined, pounds: undefined } } });

  const [bmi, setBmi] = useState(0);
  const [minWeight, setMinWeight] = useState(0);
  const [maxWeight, setMaxWeight] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState<"metric" | "imperial" | undefined>(undefined);

  const onSubmit = (data: any) => {
    const heightInInches = data.imperialGroup.feet * 12 + data.imperialGroup.inches;
    const weightInPounds = data.imperialGroup.stone * 14 + data.imperialGroup.pounds;

    const bmi = data.unit === "metric" ? calculateBMI(data.metricGroup.weight, data.metricGroup.height) : calculateImperialBMI(weightInPounds, heightInInches);
    const [minWeight, maxWeight] = data.unit === "metric" ? calculateIdealWeight(data.metricGroup.weight, data.metricGroup.height) : calculateIdealWeight(weightInPounds, heightInInches);

    setBmi(bmi);
    setMinWeight(Math.round(minWeight * 10) / 10);
    setMaxWeight(Math.round(maxWeight * 10) / 10);
  };

  const calculateImperialBMI = (weight: number, height: number) => {
    const bmi = (weight * 703) / (height * height);
    return parseFloat(bmi.toFixed(1));
  };

  const calculateBMI = (weight: number, height: number) => {
    const bmi = (weight / (height * height)) * 10000;
    return parseFloat(bmi.toFixed(1));
  };

  const calculateIdealWeight = (weight: number, height: number) => {
    const minWeight = (18.5 * (height * height)) / 10000;
    const maxWeight = (24.9 * (height * height)) / 10000;
    return [minWeight, maxWeight];
  };

  const fieldValues = useWatch({
    control: control,
    name: ["unit", "metricGroup.height", "metricGroup.weight", "imperialGroup.feet", "imperialGroup.inches", "imperialGroup.stone", "imperialGroup.pounds"],
  });

  useEffect(() => {
    const [unit, height, weight, feet, inches, stone, pounds] = fieldValues;
    if (unit === "metric") {
      setSelectedUnit("metric");
    } else if (unit === "imperial") {
      setSelectedUnit("imperial");
    }

    if (isValid) {
      handleSubmit(onSubmit)();
    }
  }, [isValid, fieldValues]); // Trigger effect on form validity and field changes

  const benefits = [
    {
      title: "Healthy eating",
      description: "Healthy eating promotes weight control, disease prevention, better digestion, immunity , mental clarity, and mood.",
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

  const inputMetadata = {
    metric: [
      {
        id: "metricGroup.height",
        label: "Height",
        unit: "cm",
      },
      {
        id: "metricGroup.weight",
        label: "Weight",
        unit: "kg",
      },
    ],
    imperial: [
      [
        {
          id: "imperialGroup.feet",
          label: "Feet",
          unit: "ft",
        },
        {
          id: "imperialGroup.inches",
          label: "Inches",
          unit: "in",
        },
      ],
      [
        {
          id: "imperialGroup.stone",
          label: "Stone",
          unit: "st",
        },
        {
          id: "imperialGroup.pounds",
          label: "Pounds",
          unit: "lbs",
        },
      ],
    ],
  };

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
                      <input
                        {...register("unit")}
                        checked={selectedUnit === undefined ? false : selectedUnit === radio.id}
                        type="radio"
                        id={radio.id}
                        name="unit"
                        value={radio.id}
                        className={"peer col-start-1 row-start-1 size-[31px] appearance-none rounded-full border border-dark-electric-blue checked:bg-[#345FF6] checked:opacity-15"}
                      />
                      <div className={"pointer-events-none col-start-1 row-start-1 size-[15px] rounded-full peer-checked:bg-blue"} />
                    </div>
                    <label htmlFor={radio.id}>{radio.label}</label>
                  </div>
                ))}
              </div>

              <></>
              {selectedUnit === "metric" ? (
                <>
                  <div className={"flex gap-x-6"}>
                    {inputMetadata.metric.map((input) => (
                      <div key={input.id} className={"flex w-full flex-col gap-y-2"}>
                        <label className={"font-interRegular text-body-s text-dark-electric-blue"} htmlFor={input.id}>
                          {input.label}
                        </label>
                        <div className={"flex gap-x-6 rounded-lg border border-gunmetal px-6 py-5"}>
                          <input
                            className={"container font-interSemibold text-heading-m text-gunmetal outline-none placeholder:text-dark-electric-blue"}
                            placeholder={"0" as string}
                            {...register(input.id as "unit" | "metricGroup.height" | "metricGroup.weight" | "imperialGroup.feet" | "imperialGroup.inches" | "imperialGroup.stone" | "imperialGroup.pounds", { valueAsNumber: true })}
                            type="number"
                            id={input.id}
                            name={input.id}
                          />
                          <span className={"font-interSemibold text-heading-m text-blue"}>{input.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className={"flex gap-x-6"}>
                    {inputMetadata.imperial[0].map((input) => (
                      <div key={input.id} className={"flex w-full flex-col gap-y-2"}>
                        <label className={"font-interRegular text-body-s text-dark-electric-blue"} htmlFor={input.id}>
                          {input.label}
                        </label>
                        <div className={"flex gap-x-6 rounded-lg border border-gunmetal px-6 py-5"}>
                          <input
                            className={"container font-interSemibold text-heading-m text-gunmetal outline-none placeholder:text-dark-electric-blue"}
                            placeholder={"0" as string}
                            {...register(input.id as "unit" | "metricGroup.height" | "metricGroup.weight" | "imperialGroup.feet" | "imperialGroup.inches" | "imperialGroup.stone" | "imperialGroup.pounds", { valueAsNumber: true })}
                            type="number"
                            id={input.id}
                            name={input.id}
                          />
                          <span className={"font-interSemibold text-heading-m text-blue"}>{input.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={"flex gap-x-6"}>
                    {inputMetadata.imperial[1].map((input) => (
                      <div key={input.id} className={"flex w-full flex-col gap-y-2"}>
                        <label className={"font-interRegular text-body-s text-dark-electric-blue"} htmlFor={input.id}>
                          {input.label}
                        </label>
                        <div className={"flex gap-x-6 rounded-lg border border-gunmetal px-6 py-5"}>
                          <input
                            className={"container font-interSemibold text-heading-m text-gunmetal outline-none placeholder:text-dark-electric-blue"}
                            placeholder={"0" as string}
                            {...register(input.id as "unit" | "metricGroup.height" | "metricGroup.weight" | "imperialGroup.feet" | "imperialGroup.inches" | "imperialGroup.stone" | "imperialGroup.pounds", { valueAsNumber: true })}
                            type="number"
                            id={input.id}
                            name={input.id}
                          />
                          <span className={"font-interSemibold text-heading-m text-blue"}>{input.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className={"flex flex-col gap-y-4 rounded-custom bg-blue p-8 text-white"}>
                {isValid ? (
                  <div className={"flex items-center gap-x-6"}>
                    <div className={"w-full"}>
                      <p className={"font-interSemibold text-body-m"}>Your BMI is...</p>
                      <h2 className={"font-interSemibold text-heading-xl"}>{bmi.toFixed(1)}</h2>
                    </div>
                    <p className={"w-full font-interRegular text-body-s"}>
                      Your BMI suggests you’re a healthy weight. Your ideal weight is between{" "}
                      <span className={"font-interSemibold"}>
                        {minWeight}
                        {selectedUnit === "metric" ? "kgs" : "lbs"} - {maxWeight}
                        {selectedUnit === "metric" ? "kgs" : "lbs"}.
                      </span>
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className={"font-interSemibold text-heading-m"}>Welcome!</h2>
                    <p className={"font-interRegular text-body-s"}>Enter your height and weight and you’ll see your BMI result here</p>
                  </>
                )}
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
