export default function BmiCalculatorSection({ children }: Readonly<{ children: React.ReactNode }>) {
  return <section className={"relative flex h-[640px] flex-col items-center rounded-hero bg-custom-gradient px-6 md:gap-y-[40px] md:px-[40px] lg:h-[686px] lg:w-[978px] lg:flex-row lg:gap-x-8 lg:gap-y-0 lg:px-0 lg:pb-[107px] lg:pl-[116px] lg:pt-[182px]"}>{children}</section>;
}
