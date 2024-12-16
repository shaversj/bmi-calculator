export const benefits = [
  {
    title: "Healthy eating",
    description: "Healthy eating promotes weight control, disease prevention, better digestion, immunity, mental clarity, and mood.",
    image: "/images/icon-eating.svg",
  },
  {
    title: "Regular exercise",
    description: "Exercise improves fitness, aids weight control, elevates mood, and reduces disease risk, fostering wellness and longevity.",
    image: "/images/icon-exercise.svg",
  },
  {
    title: "Adequate sleep",
    description: "Sleep enhances mental clarity, emotional stability, and physical wellness, promoting overall restoration and rejuvenation.",
    image: "/images/icon-sleep.svg",
  },
];

export const limitations = [
  {
    title: "Gender",
    description: "The development and body fat composition of girls and boys vary with age. Consequently,a child's age and gender are considered when evaluating their BMI.",
    image: "/images/icon-gender.svg",
    className: "",
  },
  {
    title: "Age",
    description: "In aging individuals, increased body fat and muscle loss may cause BMI to underestimate body fat content.",
    image: "/images/icon-age.svg",
    className: "row-start-2 row-end-2",
  },
  {
    title: "Muscle",
    description: "BMI may misclassify muscular individuals as overweight or obese, as it doesn't differentiate muscle from fat.",
    image: "/images/icon-muscle.svg",
    className: "row-start-2 row-end-2",
  },
  {
    title: "Pregnancy",
    description: "Expectant mothers experience weight gain due to their growing baby. Maintaining a healthy pre-pregnancy BMI is advisable to minimise health risks for both mother and child.",
    image: "/images/icon-pregnancy.svg",
    className: "row-start-3 ",
  },
  {
    title: "Race",
    description: "Certain health concerns may affect individuals of some Black and Asian origins at lower BMIs than others. To learn more, it is advised to discuss this with your GP or practice nurse.",
    image: "/images/icon-race.svg",
    className: "row-start-3 ",
  },
];

export const radioMetadata = [
  {
    id: "metric",
    label: "Metric",
  },
  {
    id: "imperial",
    label: "Imperial",
  },
];

export const inputMetadata = {
  metric: [
    {
      id: "metricGroup.height",
      label: "Height",
      unit: "cm",
    },
    {
      id: "metricGroup.weight",
      label: "Weight",
      unit: "kg",
    },
  ],
  imperial: [
    [
      {
        id: "imperialGroup.feet",
        label: "Feet",
        unit: "ft",
      },
      {
        id: "imperialGroup.inches",
        label: "Inches",
        unit: "in",
      },
    ],
    [
      {
        id: "imperialGroup.stone",
        label: "Stone",
        unit: "st",
      },
      {
        id: "imperialGroup.pounds",
        label: "Pounds",
        unit: "lbs",
      },
    ],
  ],
};
