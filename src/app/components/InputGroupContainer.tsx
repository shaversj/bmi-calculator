const variants = {
  metric: "flex flex-col gap-y-4 md:flex-row md:gap-x-6 md:gap-y-0",
  imperial: "flex gap-x-6",
  radio: "flex gap-x-6 font-interSemibold text-body-m text-gunmetal",
};

interface InputGroupContainerProps {
  children: React.ReactNode;
  variant: "metric" | "imperial" | "radio";
}

export default function InputGroupContainer({ children, variant }: InputGroupContainerProps) {
  return <div className={variants[variant]}>{children}</div>;
}
