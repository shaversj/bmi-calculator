import Image from "next/image";

type LimitationCardProps = {
  title: string;
  description: string;
  image: string;
  className?: string;
};

export default function LimitationCard({ title, description, image, className = "" }: LimitationCardProps) {
  return (
    <div key={title} className={`w-[327px] rounded-2xl p-8 shadow-xl lg:w-[365px] ${className}`}>
      <div className={"space-y-5"}>
        <div className={"flex items-center gap-x-4"}>
          <Image src={image} alt={title} width={32} height={32} />
          <h3 className={"font-interSemibold text-heading-s text-gunmetal"}>{title}</h3>
        </div>
        <p className={"font-interRegular text-body-m text-dark-electric-blue"}>{description}</p>
      </div>
    </div>
  );
}
