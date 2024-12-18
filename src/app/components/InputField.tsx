import { UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  id: string;
  label: string;
  unit: string;
  register: UseFormRegister<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function InputField({ id, label, unit, register }: InputFieldProps) {
  return (
    <div key={id} className={"flex w-full flex-col gap-y-2"}>
      <label className={"font-interRegular text-body-s text-dark-electric-blue"} htmlFor={id}>
        {label}
      </label>
      <div className={"flex gap-x-6 rounded-lg border border-gunmetal px-6 py-5 hover:border-blue"}>
        <input className={"container font-interSemibold text-heading-m text-gunmetal outline-none placeholder:text-dark-electric-blue"} placeholder={"0" as string} {...register(id as "unit" | "metricGroup.height" | "metricGroup.weight" | "imperialGroup.feet" | "imperialGroup.inches" | "imperialGroup.stone" | "imperialGroup.pounds", { valueAsNumber: true })} type="number" id={id} name={id} />
        <span className={"font-interSemibold text-heading-m text-blue"}>{unit}</span>
      </div>
    </div>
  );
}
