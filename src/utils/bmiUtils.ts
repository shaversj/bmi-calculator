export const calculateImperialBMI = (weight: number, height: number) => {
  const bmi = (weight * 703) / (height * height);
  return parseFloat(bmi.toFixed(1));
};

export const calculateBMI = (weight: number, height: number) => {
  const bmi = (weight / (height * height)) * 10000;
  return parseFloat(bmi.toFixed(1));
};

export const calculateMetricWeightRange = (height: number) => {
  const minWeight = (18.5 * (height * height)) / 10000;
  const maxWeight = (24.9 * (height * height)) / 10000;
  return [minWeight, maxWeight];
};

export const convertWeightToImperial = (weight: number) => {
  const stone = Math.floor(weight / 14);
  const pounds = stone > 0 ? weight - stone * 14 : 0;
  return [stone, pounds];
};

export const calculateImperialWeightRange = (height: number) => {
  const minWeight = (18.5 * (height * height)) / 703;
  const maxWeight = (24.9 * (height * height)) / 703;
  return [Math.round(minWeight * 10) / 10, Math.round(maxWeight * 10) / 10];
};
