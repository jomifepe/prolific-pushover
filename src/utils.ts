type GetRandomNumberOptions = { min: number; max: number }

export const getRandomNumber = (options: number | GetRandomNumberOptions) => {
  const { min, max } = typeof options === 'number' ? { min: 0, max: options } : options;
  const difference = max - min;
  let randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * difference);
  randomNumber = randomNumber + min;

  return randomNumber;
}