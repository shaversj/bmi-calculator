"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bmiSchema, UnitType, WeightRange } from "@/app/types/types";
import BenefitsSection from "@/app/components/BenefitsSection";
import LimitationSection from "@/app/components/LimitationSection";
import BmiExplanationSection from "@/app/components/BmiExplanationSection";
import BmiFormContainer from "@/app/components/BmiFormContainer";
import BmiForm from "@/app/components/BmiForm";
import BmiHeader from "@/app/components/BmiHeader";
import BmiCalculatorSection from "@/app/components/BmiCalculatorSection";

const initialWeight = {
  metric: { min: { pounds: 0 }, max: { pounds: 0 } },
  imperial: { min: { stone: 0, pounds: 0 }, max: { stone: 0, pounds: 0 } },
};

export default function Home() {
  const [bmi, setBmi] = useState<number>(0);
  const [weight, setWeight] = useState<WeightRange>(initialWeight);
  const [selectedUnit, setSelectedUnit] = useState<UnitType>(undefined);

  const { register, control, handleSubmit, formState: { isValid }, } = useForm({
    resolver: zodResolver(bmiSchema),
    defaultValues: {
      unit: "metric",
      metricGroup: { height: undefined, weight: undefined },
      imperialGroup: { feet: undefined, inches: undefined, stone: undefined, pounds: undefined },
    },
  }); // prettier-ignore

  const onSubmit = (data: any) => {
    const metricHeightInCM = data.metricGroup.height;
    const metricWeightInKG = data.metricGroup.weight;

    const imperialHeightInInches = data.imperialGroup.feet * 12 + data.imperialGroup.inches;
    const imperialWeightInPounds = data.imperialGroup.stone * 14 + data.imperialGroup.pounds;

    const bmi = data.unit === "metric" ? calculateBMI(metricWeightInKG, metricHeightInCM) : calculateImperialBMI(imperialWeightInPounds, imperialHeightInInches);
    const [minWeight, maxWeight] = data.unit === "metric" ? calculateMetricWeightRange(metricHeightInCM) : calculateImperialWeightRange(imperialHeightInInches);

    const [minStone, minPounds] = convertWeightToImperial(minWeight);
    const [maxStone, maxPounds] = convertWeightToImperial(maxWeight);

    setWeight({
      metric: { min: { pounds: minWeight }, max: { pounds: maxWeight } },
      imperial: { min: { stone: minStone, pounds: minPounds }, max: { stone: maxStone, pounds: maxPounds } },
    });

    setBmi(bmi);
  };

  const calculateImperialBMI = (weight: number, height: number) => {
    const bmi = (weight * 703) / (height * height);
    return parseFloat(bmi.toFixed(1));
  };

  const calculateBMI = (weight: number, height: number) => {
    const bmi = (weight / (height * height)) * 10000;
    return parseFloat(bmi.toFixed(1));
  };

  const calculateMetricWeightRange = (height: number) => {
    const minWeight = (18.5 * (height * height)) / 10000;
    const maxWeight = (24.9 * (height * height)) / 10000;
    return [minWeight, maxWeight];
  };

  const convertWeightToImperial = (weight: number) => {
    const stone = Math.floor(weight / 14);
    const pounds = stone > 0 ? weight - stone * 14 : 0;
    return [stone, pounds];
  };

  const calculateImperialWeightRange = (height: number) => {
    const minWeight = (18.5 * (height * height)) / 703;
    const maxWeight = (24.9 * (height * height)) / 703;
    return [Math.round(minWeight * 10) / 10, Math.round(maxWeight * 10) / 10];
  };

  const fieldValues = useWatch({
    control: control,
    name: ["unit", "metricGroup.height", "metricGroup.weight", "imperialGroup.feet", "imperialGroup.inches", "imperialGroup.stone", "imperialGroup.pounds"],
  });

  useEffect(() => {
    const [unit, height, weight, feet, inches, stone, pounds] = fieldValues;
    if (unit === "metric" || unit === "imperial") {
      setSelectedUnit(unit);
    }
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  }, [isValid, fieldValues]);

  return (
    <div>
      <main className={"lg:pl-6"}>
        <BmiCalculatorSection>
          <BmiHeader />
          <BmiFormContainer>
            <BmiForm register={register} isValid={isValid} bmi={bmi} selectedUnit={selectedUnit} weight={weight} />
          </BmiFormContainer>
        </BmiCalculatorSection>

        <Image src={"/images/pattern-curved-line-left.svg"} alt={"Pattern Line Left"} width={85} height={200} className={"absolute right-0 mr-[167px] hidden lg:block"} />
        <BmiExplanationSection />
        <BenefitsSection />
        <LimitationSection />
      </main>
    </div>
  );
}
