interface Values {
    height: number,
    weight: number
}

const parseArguments = (args: Array<string>): Values => {
    if (args.length < 3) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Values must be numbers!');
    }
};

export const calculateBmi = (height: number, weight: number) => {
    const bmi = weight / (height * height) * 10000;
    if (bmi < 18.5) {
        return `Underweight, bmi: ${bmi.toFixed(2)}%`;
    }
    if (bmi < 25) {
      return `Normal weight, bmi: ${bmi.toFixed(2)}%`;
    }
    return `Overweight, bmi: ${bmi.toFixed(2)}%`;
};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}
