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
        <div className={"rounded-hero relative flex h-[686px] flex-col items-center bg-custom-gradient md:gap-y-[40px] md:px-[40px] md:pt-8 lg:w-[1276px] lg:flex-row lg:gap-x-8 lg:gap-y-0 lg:px-0 lg:pb-[107px] lg:pl-[116px] lg:pt-[182px]"}>
          {/*<svg className={""} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
          {/*  <path*/}
          {/*    d="M20.0004 1.64179C19.6608 1.64179 19.3162 1.64437 18.9791 1.66476C18.2238 1.70632 17.4812 1.81007 16.7529 1.94015C16.6723 1.95452 16.5923 1.97062 16.512 1.98609C16.443 1.99937 16.374 2.0064 16.3054 2.02046C16.2671 2.0271 16.2288 2.0353 16.1907 2.04343C16.1526 2.05155 16.1141 2.05804 16.0759 2.0664C15.6747 2.15382 15.2734 2.25155 14.8825 2.36476C14.8442 2.37554 14.8059 2.3878 14.7677 2.39913C14.748 2.40499 14.73 2.41593 14.7104 2.4221C14.6537 2.43905 14.5946 2.45046 14.5382 2.46796C14.4305 2.50444 14.3248 2.54687 14.2169 2.58273C13.9898 2.65812 13.763 2.72827 13.5398 2.81226C13.5123 2.82046 13.487 2.83702 13.4595 2.84663C13.122 2.97546 12.7889 3.12335 12.4613 3.27124C12.128 3.42155 11.7966 3.57241 11.4744 3.74171C11.1516 3.91199 10.834 4.09183 10.522 4.28101C10.5073 4.28984 10.4909 4.29515 10.4758 4.30398C10.1798 4.48309 9.88898 4.67058 9.60367 4.86624C9.13023 5.19202 8.67789 5.54296 8.23805 5.91046C8.07108 6.04905 7.9066 6.19061 7.74469 6.33507C7.71484 6.36202 7.68281 6.38819 7.65289 6.41538C7.47992 6.57265 7.31477 6.73359 7.14797 6.89741C7.12492 6.91999 7.10234 6.94343 7.07914 6.96616C6.85117 7.1921 6.62937 7.41718 6.41352 7.65468C6.2832 7.7978 6.16 7.94358 6.03484 8.09077C5.90992 8.2371 5.78797 8.38804 5.66766 8.53827C5.42457 8.84065 5.19112 9.15065 4.96766 9.4678C4.82445 9.67179 4.68953 9.87741 4.55461 10.0874C4.54109 10.1079 4.52195 10.1241 4.50844 10.1448C4.48136 10.1867 4.45456 10.2288 4.42805 10.271C4.41789 10.2871 4.40383 10.3007 4.39367 10.3169C4.36109 10.3693 4.33336 10.4246 4.30195 10.4776C4.18052 10.6825 4.06192 10.8891 3.94617 11.0973C3.91805 11.1481 3.88227 11.1952 3.85437 11.2465V11.2578C3.71484 11.5151 3.58016 11.7737 3.45281 12.0381C3.32648 12.3006 3.21109 12.5619 3.09711 12.8299C3.065 12.9052 3.03625 12.9836 3.00523 13.0594C2.93602 13.2274 2.8632 13.394 2.79867 13.5644C2.76305 13.6594 2.72953 13.7554 2.69539 13.8512C2.66811 13.9275 2.64134 14.004 2.61508 14.0807H2.60367C2.56922 14.1822 2.54461 14.2884 2.51188 14.3905C2.50234 14.4205 2.49836 14.4523 2.48922 14.4823C2.48297 14.5021 2.47227 14.5199 2.46641 14.5398C2.4268 14.673 2.39023 14.8071 2.35164 14.9413V14.9528C2.34578 14.9687 2.33328 14.9825 2.32891 14.9987C2.31492 15.0476 2.30797 15.0987 2.29438 15.148C2.2518 15.3038 2.2068 15.4609 2.1682 15.6184C2.1568 15.6644 2.14477 15.7101 2.13367 15.7561C2.11938 15.8166 2.11273 15.8791 2.09914 15.9397C2.0444 16.1834 1.99468 16.4283 1.95 16.6741C1.94344 16.709 1.93312 16.7425 1.92687 16.7774C1.92289 16.7928 1.91805 16.8079 1.91547 16.8233C1.88023 17.0259 1.85234 17.2266 1.82367 17.4315C1.82367 17.4432 1.81375 17.4539 1.81234 17.466C1.80164 17.5435 1.78773 17.6176 1.77781 17.6955H1.78914C1.75684 17.955 1.73007 18.2151 1.70883 18.4758C1.70492 18.5026 1.69969 18.5292 1.6975 18.5561H1.68609C1.67359 18.7153 1.67031 18.8776 1.66344 19.0381C1.66344 19.0459 1.66375 19.0535 1.66344 19.0609C1.6632 19.0648 1.66352 19.0686 1.66344 19.0723C1.64797 19.3814 1.64062 19.6887 1.64062 20.0017V20.0131C1.64078 20.3261 1.64797 20.6334 1.66336 20.9426C1.66352 20.9465 1.6632 20.9503 1.66336 20.954C1.67438 21.1843 1.68984 21.4145 1.70922 21.6424C1.71547 21.7151 1.72539 21.7875 1.73203 21.8604V21.9063C1.73859 21.9755 1.74703 22.0446 1.75469 22.113C1.77055 22.252 1.79289 22.3885 1.81211 22.526C1.82797 22.641 1.84008 22.756 1.85805 22.8702C1.86195 22.893 1.86578 22.9162 1.86937 22.9391C1.91234 23.2069 1.95273 23.4672 2.00711 23.7309C2.06609 24.0153 2.13016 24.3008 2.20219 24.5801C2.20609 24.5846 2.21133 24.5871 2.21352 24.5915V24.6029C2.28094 24.8623 2.35336 25.1166 2.43148 25.3717C2.44109 25.403 2.45617 25.4323 2.46609 25.4635C2.53922 25.6948 2.61469 25.9243 2.69555 26.152C2.70547 26.1796 2.72016 26.2049 2.73008 26.2323C2.75469 26.3005 2.77352 26.371 2.79883 26.4389C2.84366 26.5579 2.88958 26.6765 2.93656 26.7947C2.98391 26.9134 3.03617 27.0329 3.08578 27.1503C3.20148 27.4249 3.32391 27.6965 3.45297 27.9651C3.56398 28.1963 3.6768 28.4284 3.79727 28.6535C3.81586 28.6884 3.83555 28.7223 3.85461 28.7569V28.7682C3.95914 28.9607 4.065 29.1422 4.17594 29.3305C4.21586 29.3976 4.26164 29.4597 4.30219 29.5255C4.40117 29.6862 4.4968 29.8482 4.60055 30.0076C4.62305 30.042 4.64664 30.0763 4.6693 30.1108C4.76227 30.2514 4.85961 30.386 4.95625 30.5239C4.99844 30.5847 5.03938 30.6472 5.0825 30.7075C5.14969 30.8011 5.22 30.8906 5.28898 30.9829C5.38898 31.1171 5.48391 31.2537 5.58742 31.3845C5.59914 31.3992 5.61047 31.4154 5.62172 31.4305C5.67742 31.5006 5.73711 31.5676 5.79383 31.6369C5.82258 31.6726 5.85633 31.7049 5.88562 31.7402C5.96727 31.8385 6.04266 31.942 6.12664 32.0387C6.2193 32.1454 6.31922 32.2444 6.41344 32.3484C6.50242 32.4466 6.58555 32.5501 6.67742 32.6468C6.68641 32.6567 6.70219 32.6601 6.7118 32.6699C6.81313 32.7762 6.91781 32.8759 7.02164 32.9797C7.09156 33.0512 7.15602 33.128 7.2282 33.1976C7.2743 33.243 7.31883 33.2908 7.36594 33.3354C7.45828 33.423 7.55703 33.5037 7.65266 33.5879C7.73414 33.6594 7.81234 33.7345 7.89375 33.8059C7.8993 33.8093 7.90102 33.8137 7.905 33.8173C7.97289 33.8767 8.04281 33.9309 8.11156 33.9894C8.21445 34.0769 8.31648 34.168 8.42141 34.2533C8.58914 34.3902 8.76523 34.5237 8.93773 34.6549C8.97258 34.6815 9.00609 34.7092 9.04094 34.7353C9.06289 34.7515 9.08773 34.765 9.10992 34.7812C9.3157 34.9331 9.51719 35.0852 9.72945 35.2287C9.94435 35.375 10.1624 35.5166 10.3836 35.6533C10.3955 35.6606 10.4061 35.6691 10.418 35.676L10.4753 35.7105C10.6198 35.7984 10.7644 35.8791 10.9114 35.963C11.0213 36.0257 11.1331 36.0855 11.2442 36.1466C11.3132 36.1846 11.3809 36.2247 11.4508 36.2614C11.6329 36.3575 11.8156 36.4467 12.0016 36.5368C12.0122 36.5419 12.0252 36.543 12.0359 36.5482C12.1577 36.6062 12.2801 36.6644 12.4031 36.7203C12.4918 36.7607 12.5777 36.8075 12.667 36.8466C12.7269 36.8726 12.7896 36.8918 12.8505 36.9153C12.9052 36.9363 12.9573 36.9619 13.0113 36.9843C13.1934 37.0593 13.3769 37.1329 13.5621 37.2023C13.6038 37.218 13.6464 37.2327 13.6883 37.2482C13.6995 37.2521 13.7114 37.2555 13.7227 37.2595C13.7305 37.2634 13.7378 37.268 13.7457 37.2709C13.9354 37.3397 14.127 37.4034 14.3195 37.4659C14.3724 37.4831 14.427 37.495 14.4802 37.5119L14.6294 37.5577C14.7252 37.5874 14.8194 37.6218 14.9162 37.6495C15.0798 37.6966 15.2441 37.7447 15.4096 37.7873C15.6523 37.8499 15.8976 37.9066 16.144 37.9594C16.1784 37.9667 16.2127 37.9751 16.2473 37.9822C16.2895 37.991 16.3315 37.9969 16.3735 38.0048C16.6483 38.0601 16.9208 38.1114 17.1998 38.1541C17.45 38.1924 17.7037 38.2178 17.9571 38.2458C17.9841 38.2498 18.0105 38.2547 18.0373 38.2573C18.1059 38.2645 18.1753 38.2737 18.244 38.2799C18.2901 38.2845 18.336 38.2877 18.3817 38.2913C18.5571 38.3068 18.7327 38.3155 18.9095 38.3259C18.9591 38.3292 19.0091 38.3347 19.0587 38.3373C19.1503 38.3418 19.2422 38.3453 19.3341 38.3486C19.5562 38.3567 19.7755 38.36 19.9997 38.36C20.3166 38.36 20.6277 38.353 20.9406 38.3369C21.2499 38.3214 21.5535 38.2987 21.8586 38.268H21.8812C22.0947 38.246 22.3125 38.2168 22.5237 38.1877C22.6733 38.1667 22.8225 38.1437 22.9714 38.1188C23.0254 38.1101 23.0783 38.1053 23.132 38.0962C23.2016 38.084 23.2691 38.0744 23.3385 38.0616C23.5635 38.0201 23.7934 37.9736 24.0155 37.9239C24.0616 37.9136 24.1075 37.9 24.1533 37.8894C24.2809 37.86 24.4061 37.8281 24.532 37.7976C24.559 37.791 24.5855 37.7814 24.6123 37.7748C24.65 37.7652 24.6895 37.7619 24.727 37.7521C24.7998 37.7326 24.8726 37.715 24.945 37.6947C25.0102 37.6767 25.0751 37.6562 25.1401 37.6373C25.2484 37.6057 25.3539 37.5671 25.4614 37.5341C25.5412 37.5094 25.6231 37.4911 25.7023 37.4651C25.7102 37.4618 25.717 37.4564 25.7255 37.4538C25.921 37.3896 26.1179 37.3179 26.3106 37.2473L26.4942 37.1783C26.5638 37.1519 26.6318 37.1251 26.7008 37.098C26.9444 37.0026 27.1854 36.8937 27.4237 36.7882C27.4615 36.7718 27.501 36.7593 27.5385 36.7423L27.6418 36.6965C27.948 36.5557 28.2503 36.4065 28.5483 36.249C29.2139 35.8982 29.8505 35.5055 30.4647 35.0784C30.6388 34.9573 30.8113 34.8381 30.9811 34.7112L31.1188 34.608C31.1508 34.5834 31.1784 34.5525 31.2105 34.5276C31.3914 34.3878 31.5745 34.2494 31.7498 34.103C32.1427 33.7747 32.5217 33.4301 32.8859 33.0703C32.9056 33.0512 32.9242 33.0322 32.9433 33.0129C32.9545 33.0016 32.9664 32.9902 32.9777 32.9784C33.1654 32.7912 33.349 32.5999 33.5284 32.4047C33.547 32.3848 33.5678 32.3673 33.5858 32.3473C33.9445 31.9526 34.2834 31.5328 34.607 31.108C34.7767 30.8861 34.9412 30.6603 35.1005 30.4309C35.2835 30.1665 35.4592 29.9019 35.6284 29.6276C35.6503 29.5927 35.6756 29.5593 35.6972 29.5244C35.7593 29.4222 35.8206 29.318 35.8808 29.2145C35.964 29.0773 36.045 28.9422 36.1218 28.8015C36.1285 28.7894 36.1382 28.7791 36.1449 28.7669V28.7555C36.2902 28.488 36.4257 28.2163 36.558 27.9409C36.6798 27.6862 36.8031 27.4213 36.9137 27.1605V27.1491C36.9283 27.1146 36.9452 27.0804 36.9598 27.0459C37.0612 26.8033 37.1569 26.5585 37.2468 26.3115C37.2772 26.2283 37.298 26.1427 37.327 26.0591C37.3829 25.8992 37.4365 25.7385 37.4877 25.577C37.5674 25.3266 37.648 25.0747 37.7172 24.8198C37.7858 24.567 37.843 24.3077 37.9008 24.0509C37.9685 23.7504 38.0316 23.4502 38.0844 23.1443V23.133C38.1272 22.8847 38.1665 22.6387 38.1992 22.3871C38.207 22.3258 38.2149 22.2648 38.2217 22.2035C38.2549 21.9237 38.2813 21.6379 38.302 21.3543C38.3335 20.9217 38.3583 20.4866 38.3594 20.0462V20.0003C38.3594 18.8384 38.2445 17.7056 38.038 16.6037C38.0195 16.5045 38.0009 16.4037 37.9807 16.3052C37.9604 16.2054 37.934 16.1062 37.9118 16.0069C37.6571 14.8601 37.3028 13.7456 36.8446 12.6906C36.8058 12.601 36.7595 12.5151 36.7184 12.4267C36.6601 12.3009 36.6061 12.173 36.5462 12.048C36.535 12.0248 36.5227 12.0025 36.5119 11.9791V11.9676C36.3948 11.7262 36.2716 11.4918 36.1447 11.2562V11.2448C36.0221 11.0191 35.8862 10.799 35.7545 10.5791C35.7359 10.5485 35.7157 10.518 35.6972 10.4874C35.6916 10.4851 35.7028 10.4776 35.6972 10.4759C35.5788 10.281 35.4554 10.0923 35.33 9.90218C35.0153 9.42385 34.6783 8.96053 34.3202 8.51374C33.9809 8.09132 33.6163 7.68788 33.2416 7.29734C33.2303 7.28569 33.2184 7.27452 33.2072 7.26296L33.1841 7.23999C32.9969 7.04648 32.8059 6.8628 32.6104 6.67765C32.0389 6.13671 31.4345 5.62757 30.7973 5.16296C30.3862 4.86319 29.971 4.57929 29.5351 4.31374C29.5295 4.31124 29.5283 4.30499 29.5238 4.30234C29.181 4.09405 28.8252 3.90312 28.4681 3.71718C28.1998 3.57734 27.9293 3.44218 27.6534 3.31546C27.3789 3.18944 27.0972 3.07249 26.8157 2.95976C26.8079 2.9564 26.8005 2.9514 26.7927 2.94827C25.9462 2.61077 25.0679 2.33179 24.1648 2.1221C24.1344 2.11499 24.1038 2.10624 24.073 2.09913C23.963 2.07413 23.851 2.05327 23.7402 2.0303C23.5801 1.99724 23.4194 1.96664 23.2583 1.93851C22.8175 1.85944 22.3782 1.79038 21.9272 1.74343C21.6293 1.71234 21.3225 1.67968 21.0206 1.66304C20.9981 1.66194 20.9745 1.66421 20.9519 1.66304H20.9405C20.6271 1.64744 20.3134 1.6398 19.9996 1.64015L20.0004 1.64179ZM18.784 3.34015C19.2797 3.40187 19.7754 3.46905 20.2758 3.53523C21.9999 3.76304 23.6363 3.97155 25.1757 4.10898C26.7723 4.62851 28.2601 5.38812 29.605 6.33515C28.3361 6.41843 26.9853 6.45101 25.5544 6.39249C23.6451 6.31202 21.6598 6.09148 19.6791 5.83023C18.2791 5.64554 16.9581 5.44913 15.6857 5.29085C14.6824 5.16576 13.6761 5.0663 12.6677 4.99257C14.538 4.0771 16.6013 3.4971 18.784 3.34015ZM12.1973 7.20726C13.4814 7.22226 14.8126 7.30609 16.1677 7.43671C17.5227 7.56741 18.89 7.74702 20.2758 7.93015C22.2364 8.18929 24.0879 8.43023 25.8068 8.56132C27.7073 8.70882 29.4952 8.73046 31.1084 8.68749C31.508 8.67687 31.888 8.66069 32.2559 8.64163C32.7274 9.15007 33.158 9.69546 33.564 10.2596C32.8861 10.3809 32.1738 10.4932 31.3837 10.5809C29.6462 10.7739 27.6699 10.8741 25.5544 10.7875C23.6451 10.707 21.6598 10.4865 19.6791 10.2251C18.2791 10.0405 16.9581 9.84405 15.6857 9.68585C14.4133 9.52765 13.193 9.40984 12.0481 9.34163C11.2362 9.29109 10.4498 9.26679 9.6957 9.26132C8.94164 9.25585 8.21797 9.26913 7.53836 9.29569C7.40078 9.30132 7.2807 9.31194 7.14828 9.31866C7.74625 8.60038 8.41313 7.93085 9.12195 7.32202C10.1448 7.23641 11.171 7.19809 12.1973 7.20718L12.1973 7.20726ZM12.1973 11.6022C13.4814 11.6172 14.8126 11.7011 16.1677 11.8317C17.5227 11.9623 18.89 12.142 20.2758 12.3251C22.2364 12.5843 24.0879 12.8251 25.8068 12.9562C27.7073 13.1038 29.4952 13.1254 31.1084 13.0825C32.6175 13.0423 33.9538 12.953 35.1016 12.853C35.3136 13.2998 35.5145 13.751 35.6868 14.2186C34.503 14.517 33.059 14.8012 31.3837 14.9873C29.6462 15.1802 27.6699 15.2691 25.5544 15.1824C25.2362 15.1691 24.913 15.1569 24.5904 15.1366C23.3902 14.0032 21.7814 13.3005 20.0004 13.3005C18.7734 13.3005 17.6273 13.6313 16.6382 14.2071C16.321 14.1629 16.0035 14.1208 15.6857 14.0809C14.4132 13.9226 13.193 13.8048 12.0481 13.7366C11.2362 13.6861 10.4498 13.6618 9.6957 13.6562C8.94164 13.6507 8.21797 13.6641 7.53836 13.6906C6.36922 13.7366 5.3468 13.8246 4.44008 13.9087C4.65609 13.3574 4.90336 12.8231 5.17445 12.3022C5.80305 12.1622 6.47031 12.029 7.21711 11.9235C8.68094 11.7168 10.372 11.5852 12.1973 11.6022H12.1973ZM12.1973 15.9972C12.9646 16.006 13.7535 16.0461 14.5496 16.1005C14.0914 16.7401 13.7511 17.4662 13.5398 18.2463C13.0433 18.1993 12.546 18.161 12.0481 18.1315C10.4242 18.0305 8.89758 18.0323 7.53836 18.0857C6.17914 18.1391 4.97977 18.2518 3.98109 18.3496C3.75492 18.3716 3.57594 18.3865 3.37289 18.4069C3.41508 17.9605 3.47984 17.5228 3.55648 17.0873C4.54656 16.8028 5.77422 16.5222 7.21711 16.3185C8.68094 16.1118 10.372 15.9801 12.1973 15.9972H12.1973ZM36.4557 17.1217C36.5268 17.5305 36.5756 17.9426 36.6163 18.3611C36.3695 18.4334 36.108 18.5062 35.8246 18.5791C34.6175 18.8896 33.1212 19.1893 31.3837 19.3823C29.9598 19.5405 28.3691 19.6301 26.679 19.6118C26.6333 18.8236 26.4571 18.0776 26.1625 17.3857C27.9285 17.5089 29.5979 17.5176 31.1083 17.4775C32.7213 17.4345 34.1579 17.333 35.3541 17.225C35.778 17.1867 36.1047 17.1546 36.4557 17.1217ZM12.1973 20.3922C12.5666 20.3966 12.9446 20.4216 13.3218 20.438C13.3725 21.2279 13.5603 21.9724 13.8612 22.6642C13.2401 22.6048 12.633 22.5613 12.0481 22.5266C10.4242 22.4255 8.89758 22.4273 7.53836 22.4806C6.17914 22.534 4.97977 22.6353 3.98109 22.733C3.79437 22.7514 3.67812 22.7657 3.53352 22.779C3.46452 22.368 3.41094 21.9546 3.37289 21.5396C3.42133 21.5246 3.46023 21.5084 3.51063 21.4937C4.50805 21.2049 5.75312 20.9201 7.21711 20.7134C8.68109 20.5067 10.372 20.3751 12.1973 20.3922ZM36.6393 21.4937C36.6005 21.9355 36.5399 22.3708 36.4672 22.8019C36.2617 22.8623 36.0537 22.9266 35.8246 22.9855C34.6175 23.296 33.1212 23.5843 31.3837 23.7773C29.6462 23.9704 27.6699 24.0591 25.5544 23.9723C25.5014 23.9684 25.4476 23.9636 25.3938 23.961C25.8715 23.311 26.2416 22.5798 26.4609 21.7807C28.1155 21.8881 29.6837 21.9219 31.1083 21.884C32.7213 21.8411 34.1579 21.728 35.3541 21.6201C35.8565 21.5748 36.2354 21.5331 36.6393 21.4938V21.4937ZM12.1973 24.7871C13.2693 24.7996 14.3778 24.8633 15.5021 24.9593C16.6922 26.0408 18.2655 26.7035 20.0004 26.7035C21.1625 26.7035 22.2491 26.4092 23.202 25.8887C24.0989 25.9961 24.97 26.0888 25.8068 26.1526C27.7073 26.3001 29.4952 26.3105 31.1084 26.2674C32.7215 26.2244 34.1579 26.1228 35.3541 26.015L35.6065 25.9919C35.3943 26.5448 35.1398 27.0755 34.8721 27.5984C33.858 27.8234 32.6947 28.0265 31.3837 28.1722C29.6462 28.365 27.6699 28.4537 25.5544 28.3672C23.6451 28.2868 21.6598 28.0661 19.6791 27.8049C18.2791 27.6202 16.9581 27.4238 15.6857 27.2656C14.4133 27.1074 13.193 27.0009 12.0481 26.9328C11.2362 26.8823 10.4498 26.8465 9.6957 26.841C8.94164 26.8355 8.21797 26.8601 7.53836 26.8869C6.54195 26.926 5.66898 26.9901 4.86461 27.0591C4.65391 26.6078 4.44992 26.1541 4.27945 25.682C5.12516 25.4655 6.10344 25.2655 7.21711 25.1083C8.68094 24.9016 10.372 24.77 12.1973 24.7869V24.7871ZM12.1973 29.1821C13.4814 29.1968 14.8126 29.2809 16.1677 29.4116C17.5227 29.5423 18.89 29.7333 20.2758 29.9166C22.2364 30.1756 24.0879 30.4052 25.8068 30.5361C27.7073 30.6837 29.4952 30.7053 31.1084 30.6624C31.7169 30.6461 32.3252 30.6193 32.9328 30.582C32.3297 31.3175 31.6657 32.0009 30.9477 32.6247C29.3164 32.7842 27.498 32.8419 25.5544 32.7623C23.6451 32.6819 21.6598 32.4726 19.6791 32.2116C18.2791 32.0268 16.9581 31.8189 15.6857 31.6608C14.4132 31.5024 13.193 31.3847 12.0481 31.3165C11.2362 31.266 10.4498 31.253 9.6957 31.2476C8.98672 31.2426 8.30844 31.2476 7.66461 31.2704C7.19453 30.7562 6.75992 30.211 6.35648 29.6409C6.63453 29.5931 6.91844 29.5454 7.21711 29.5033C8.68102 29.2965 10.372 29.1648 12.1973 29.1819V29.1821ZM11.0498 33.5886C11.4234 33.5787 11.8101 33.5852 12.1973 33.5886C13.4814 33.6033 14.8126 33.6873 16.1677 33.818C17.5227 33.9485 18.89 34.1169 20.2758 34.3C22.2364 34.5592 24.0879 34.8001 25.8068 34.9312C26.317 34.9708 26.8105 34.9971 27.2985 35.023C25.2347 36.0276 22.9376 36.626 20.5053 36.6983C20.2293 36.6638 19.9552 36.6314 19.6791 36.595C18.2791 36.4104 16.9581 36.2253 15.6857 36.0672C15.522 36.0466 15.3652 36.0288 15.2038 36.0098C13.435 35.4805 11.7959 34.6577 10.3268 33.6115C10.5656 33.5998 10.8031 33.5949 11.0498 33.5887V33.5886Z"*/}
          {/*    fill="#B3D3F1"*/}
          {/*  />*/}
          {/*</svg>*/}

          <div className={"space-y-6 lg:w-[564px] lg:space-y-[30px] lg:self-center"}>
            <h1 className={"font-interSemibold text-heading-l text-gunmetal md:text-center lg:w-[520px] lg:text-left lg:text-heading-xl"}>
              Body Mass<br></br> Index Calculator
            </h1>
            <p className={"text-center font-interRegular text-dark-electric-blue lg:w-[465px] lg:text-left lg:text-body-m"}>
              Better understand your weight in relation to your height using our body mass index (BM) calculator. While BMI is not the sole determinant of a healthy weight, it offers a valuable starting point to evaluate your overall health and
              well-being.
            </p>
          </div>
          <div className={"absolute md:translate-y-0 md:translate-y-[22rem] lg:relative lg:translate-x-1/2"}>
            <form className={"shadow-form space-y-8 rounded-2xl bg-white p-8 lg:w-[564px]"}>
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
