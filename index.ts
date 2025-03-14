import express from 'express';
import calculateBMI from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
})

app.get('/bmi', (req, res) => {
  let height = Number(req.query.height)
  let weight = Number(req.query.weight)
  let result = calculateBMI(height, weight)

  if (isNaN(height) || isNaN(weight) ||
   (height) == undefined || weight == undefined) {
    res.send({ error: "malformatted parameters" })
  } else {
    res.send({
      weight: weight,
      height: height,
      bmi: result
    });
  }
})


const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})