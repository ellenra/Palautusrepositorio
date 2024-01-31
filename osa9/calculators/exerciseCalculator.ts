interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface Input {
    target: number,
    times: Array<number>
}

export const parseArgumentsTwo = (args: Array<string>): Input => {
    const target = Number(args[2]);
    const times = args.slice(3).map(item => Number(item));

    if (!target || isNaN(target)) {
        throw new Error('Target must be a valid number');
    }
    if (times.length < 1) {
        throw new Error('Exercise hours must be given');
    }
    if (!times.every(item => typeof item === 'number' && !isNaN(item))) {
        throw new Error('Exercise hours must be numbers');
    }

    return {
        target,
        times
    };
};

export const calculateExercises = (target: number, times: number[]): Result => {
    const periodLength = times.length;
    const trainingDays = times.filter(i => i > 0).length;
    let success = true;
    const sum = times.reduce((i, j) => i + j, 0);
    const average = sum / times.length;
    if (average < target) {
        success = false;
    }

    let rating: number;
    let ratingDescription: string;

    if (average >= target) {
        rating = 3;
        ratingDescription = "Excellent! Goal reached!";
    } else if (average > target - 0.5) {
        rating = 2;
        ratingDescription = "Almost reatched goal!";
    } else {
        rating = 1;
        ratingDescription = "Better job next time!";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        average,
        target
    };
};

try {
    const { target, times } = parseArgumentsTwo(process.argv);
    console.log(calculateExercises(target, times));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}

