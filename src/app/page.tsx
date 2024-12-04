"use client";

import Image from "next/image";
import { useState, useRef } from "react";

export default function Home() {
  const heightInputRef = useRef<HTMLInputElement>(null);
  const weightInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [bmi, setBmi] = useState<number>(0);

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
    if (height && e.target.value) {
      setTimeout(() => {
        e.preventDefault();
        formRef.current?.submit();
      }, 1000); // Delay of 1000 milliseconds (1 second)
    }
  };

  const calculateBMI = (height: string, weight: string) => {
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);
    if (heightNum > 0 && weightNum > 0) {
      setBmi((weightNum / (heightNum * heightNum)) * 10000);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const height = heightInputRef.current?.value;
    const weight = weightInputRef.current?.value;

    if (height && weight) {
      const heightNum = parseFloat(height);
      const weightNum = parseFloat(weight);
      if (heightNum > 0 && weightNum > 0) {
        setBmi((weightNum / (heightNum * heightNum)) * 10000);
        console.log("BMI: ", bmi);
        formRef.current?.submit();
      }
    }
  };

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
          <div>
            {/*  Calculator */}
            <form
              id={"bmiForm"}
              ref={formRef}
              onSubmit={(e) => {
                e.preventDefault();
                calculateBMI(height, weight);
              }}
            >
              <div>
                <div>
                  <label htmlFor={"metric"}>Metric</label>
                  <input type="radio" id="metric" name="unit" />
                </div>
                <div>
                  <label htmlFor={"imperial"}>Imperial</label>
                  <input type="radio" id="imperial" name="unit" />
                </div>
              </div>

              <div>
                <label htmlFor="height">Height (cm):</label>
                <input type="number" id="height" name="height" ref={heightInputRef} onChange={handleHeightChange} />
              </div>
              <div>
                <label htmlFor="weight">Weight (kg):</label>
                <input type="number" id="weight" name="weight" ref={weightInputRef} onChange={handleWeightChange} />
              </div>
              <div>
                {/*<h2>Welcome!</h2>*/}
                {/*<p>Enter your height and weight and you’ll see your BMI result here</p>*/}
                {bmi > 0 && <h2>Your BMI is: {bmi.toFixed(2)}</h2>}
              </div>
            </form>
          </div>
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
