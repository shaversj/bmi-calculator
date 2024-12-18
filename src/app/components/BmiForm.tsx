import InputGroupContainer from "@/app/components/InputGroupContainer";
import { inputMetadata, radioMetadata } from "@/app/data/data";
import RadioInput from "@/app/components/RadioInput";
import InputField from "@/app/components/InputField";
import BmiResult from "@/app/components/BmiResult";
import { UnitType, WeightRange } from "@/app/types/types";
import { UseFormRegister } from "react-hook-form";

interface FormProps {
  register: UseFormRegister<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  isValid: boolean;
  bmi: number;
  selectedUnit: UnitType;
  weight: WeightRange;
}

export default function BmiForm({ register, isValid, bmi, selectedUnit, weight }: FormProps) {
  return (
    <form className={"space-y-8 rounded-2xl bg-white p-6 shadow-form md:p-8 lg:w-[564px]"}>
      <p className={"font-interSemibold text-heading-m text-gunmetal"}>Enter your details below</p>
      <InputGroupContainer variant={"radio"}>
        {radioMetadata.map((radio) => (
          <RadioInput key={radio.id} id={radio.id} label={radio.label} register={register} selectedUnit={selectedUnit} />
        ))}
      </InputGroupContainer>

      {selectedUnit === "metric" ? (
        <>
          <InputGroupContainer variant={"metric"}>
            {inputMetadata.metric.map((input) => (
              <InputField key={input.id} id={input.id} label={input.label} unit={input.unit} register={register} />
            ))}
          </InputGroupContainer>
        </>
      ) : (
        <>
          <InputGroupContainer variant={"imperial"}>
            {inputMetadata.imperial[0].map((input) => (
              <InputField key={input.id} id={input.id} label={input.label} unit={input.unit} register={register} />
            ))}
          </InputGroupContainer>
          <InputGroupContainer variant={"imperial"}>
            {inputMetadata.imperial[1].map((input) => (
              <InputField key={input.id} id={input.id} label={input.label} unit={input.unit} register={register} />
            ))}
          </InputGroupContainer>
        </>
      )}

      <BmiResult isValid={isValid} bmi={bmi} selectedUnit={selectedUnit} weight={weight} />
    </form>
  );
}
