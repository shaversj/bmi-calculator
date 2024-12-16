import { UseFormRegister } from "react-hook-form";

interface RadioInputProps {
  id: string;
  label: string;

  register: UseFormRegister<any>;
  selectedUnit: string | undefined;
}

export default function RadioInput({ id, label, register, selectedUnit }: RadioInputProps) {
  return (
    <div key={id} className={"flex w-full items-center gap-x-4.5"}>
      <div className={"grid place-items-center"}>
        <input
          {...register("unit")}
          checked={selectedUnit === undefined ? false : selectedUnit === id}
          type="radio"
          id={id}
          name="unit"
          value={id}
          className={"peer col-start-1 row-start-1 size-[31px] appearance-none rounded-full border border-dark-electric-blue checked:bg-[#345FF6] checked:opacity-15 hover:border-blue"}
        />
        <div className={"pointer-events-none col-start-1 row-start-1 size-[15px] rounded-full peer-checked:bg-blue"} />
      </div>
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
