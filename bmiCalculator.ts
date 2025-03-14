interface BMIValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBMI = (h: number, w: number): string => {
  let mSquare = (h * 0.01) ** 2
  let bmi = w / mSquare
  let result = ""
  
  if (bmi < 18.5) {
    result = "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    result = "Normal Weight";
  } else if (bmi >= 25.0 && bmi < 29.9) {
    result = "Overweight";
  } else if (bmi >= 30.0) {
    result = "Obese";
  }
  return result;
}

try {
  const { height, weight } = parseArguments(process.argv)
  console.log(calculateBMI(height, weight))
} catch (error: unknown) {
  
  if (error instanceof Error) {
    let errorMessage = ''
    errorMessage += error.message;
  }
  console.log(error)
}

export default calculateBMI;