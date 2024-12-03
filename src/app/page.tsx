import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main>
        <div>
          <div>
            <h1>Body Mass Index Calculator</h1>
            <p>
              Better understand your weight in relation to your height using our body mass index (BM) calculator. While BMI is not the sole determinant of a healthy weight, it offers a valuable starting point to evaluate your overall health and
              well-being.
            </p>
          </div>
          <div>{/*  Calculator */}</div>
        </div>

        <div>
          <h2>What your BMI result means</h2>
          <p>
            A BMI range of 18.5 to 24.9 is considered a 'healthy weight.' Maintaining a healthy weight may lower your chances of experiencing health issues later on, such as obesity and type 2 diabetes. Aim for a nutritious diet with reduced fat and
            sugar content, incorporating ample fruits and vegetables. Additionally, strive for regular physical activity, ideally about 30 minutes daily for five days a week.
          </p>
        </div>

        <div>
          <div>
            <Image src={"/images/icon-eating.svg"} alt={"Healthy eating"} width={64} height={64} />
            <h3>Healthy eating</h3>
            <p>Healthy eating promotes weight control, disease prevention, better digestion, immunity, mental clarity, and mood.</p>
          </div>
          <div>
            <Image src={"/images/icon-exercise.svg"} alt={"Regular exercise"} width={64} height={64} />
            <h3>Regular exercise</h3>
            <p>Exercise improves fitness, aids weight control, elevates mood, and reduces disease risk, fostering wellness and longevity.</p>
          </div>
          <div>
            <Image src={"/images/icon-sleep.svg"} alt={"Adequate sleep"} width={64} height={64} />
            <h3>Adequate sleep</h3>
            <p>Sleep enhances mental clarity, emotional stability, and physical wellness, promoting overall restoration and rejuvenation.</p>
          </div>
        </div>

        <div>
          <h4>Limitations of BMI</h4>
          <p>Although BMI is often a practical indicator of healthy weight, it is not suited for every person. Specific groups should carefully consider their BMI outcomes, and in certain cases, the measurement may not be beneficial to use.</p>
        </div>
      </main>
    </div>
  );
}
