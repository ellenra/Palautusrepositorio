import express from 'express';
const app = express();
app.use(express.json());
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    let bmi: string;
    try {
        bmi = calculateBmi(height, weight);
        res.json({ weight, height, bmi }).status(200);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
            res.json({ error: 'malformatted parameters '}).status(400);
        }
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: { target: number; times: number[]} = req.body;
    const length : number = Object.keys(body).length;

    if (length !== 2) {
        res.json({ error: 'Please provide two parameters' }).status(400);
        return;
    }
    const target: number = body.target;
    const times: number[] = body.times;
    if (isNaN(target) || !times.every((item: number) => typeof item === 'number' && !isNaN(item))) {
        res.json({ error: 'Malformatted parameters' }).status(400);
        return;
    }

    try {
        const result = calculateExercises(target, times);
        res.json(result).status(200);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.json({ error: error.message }).status(400);
        }
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});