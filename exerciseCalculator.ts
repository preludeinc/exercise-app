interface trainingResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const parseArguments = (args: string[]): { argArray: number[], target: number } => {
  console.log(args.length)

  if (args.length < 12) throw new Error('Not enough arguments');
  if (args.length > 12) throw new Error('Too many arguments');

  let numberArgs = false;

  for (let i = 2; i <= 11; i ++) {
    if (!isNaN(Number(args[i]))) {
      numberArgs = true
    }
    else {
      numberArgs = false
    }
  }

  if (numberArgs) {
    let argArray: number[] = [];
    let target: number;

    for (let i = 2; i <= 10; i ++) {
      console.log(args[i])
      argArray.push(Number(args[i]));
    }
    target = Number(args[11])
    return {
      argArray, target
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

try {
  const { argArray, target }  = parseArguments(process.argv)
  console.log(argArray, target)
} catch (error: unknown) {
  
  if (error instanceof Error) {
    let errorMessage = ''
    errorMessage += error.message;
  }
  console.log(error)
}

const exerciseCalculator = (a: number[], t: number): trainingResult => {
  let periodLen = a.length
  let daysOfTraining = 0
  let trainingTotal = 0
  let average = 0
  let metGoal = true
  let ratingVal = 0
  let ratingDesc = ''

  for (let n of a) {
    trainingTotal += n
    if (n > t) {
      daysOfTraining += 1
    }
    if (n < t) {
      metGoal = false
    }
  }
  console.log(trainingTotal)
  average = trainingTotal / periodLen

  if (daysOfTraining >= 3) {
    ratingVal = 3
    ratingDesc = 'great work!'
  } else if (daysOfTraining > 1 && daysOfTraining < 3) {
    ratingVal = 2
    ratingDesc = 'on your way to your goals'
  } else {
    ratingVal = 1
    ratingDesc = 'some training is better than none'
  }

  return {
    periodLength: periodLen,
    trainingDays: daysOfTraining,
    success: metGoal,
    rating: ratingVal,
    ratingDescription: ratingDesc,
    target: t,
    average: average
  }
}


try {
  const { argArray, target } = parseArguments(process.argv)
  console.log(exerciseCalculator(argArray, target))
} catch (error: unknown) {
  if (error instanceof Error) {
    let errorMessage = ''
    errorMessage += error.message;
  }
  console.log(error)
}

export default exerciseCalculator;

