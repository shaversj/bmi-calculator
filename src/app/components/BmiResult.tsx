import { UnitType, WeightRange } from "@/app/types/types";

interface BmiResultProps {
  isValid: boolean;
  bmi: number;
  selectedUnit: UnitType;
  weight: WeightRange;
}

export default function BmiResult({ isValid, bmi, selectedUnit, weight }: BmiResultProps) {
  return (
    <div className={"flex flex-col gap-y-4 rounded-2xl bg-blue p-8 text-white md:rounded-l-[999px] md:rounded-r-full"}>
      {isValid ? (
        <div className={"flex flex-col items-center gap-x-6 md:flex-row"}>
          <div className={"w-full"}>
            <p className={"font-interSemibold text-body-m"}>Your BMI is...</p>
            <h2 className={"pt-2 font-interSemibold text-heading-l md:pt-0 md:text-heading-xl"}>{bmi.toFixed(1)}</h2>
          </div>
          <p className={"w-full pt-6 font-interRegular text-body-s md:pt-0"}>
            Your BMI suggests you’re a healthy weight. Your ideal weight is between{" "}
            <span className={"font-interSemibold"}>{selectedUnit === "metric" ? `${weight.metric.min.pounds.toFixed(1)}kgs - ${weight.metric.max.pounds.toFixed(1)}kgs.` : `${weight.imperial.min.stone}st ${Math.floor(weight.imperial.min.pounds).toFixed(0)}lbs - ${weight.imperial.max.stone}st ${Math.floor(weight.imperial.max.pounds).toFixed(0)}lbs.`}</span>
          </p>
        </div>
      ) : (
        <>
          <h2 className={"font-interSemibold text-heading-m"}>Welcome!</h2>
          <p className={"font-interRegular text-body-s"}>Enter your height and weight and you’ll see your BMI result here</p>
        </>
      )}
    </div>
  );
}
