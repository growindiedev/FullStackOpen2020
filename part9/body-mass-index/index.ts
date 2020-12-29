import express from 'express'
const app = express()
import calculateBmi from './bmiCalculator'
import calculateExercises from './exerciseCalculator'
app.use(express.json());

app.get('/ping', (_req, res) => {
    res.send('Hello Full Stack')
})

app.get('/bmi', (req, res) => {
        console.log('height', req.query.height, 'weight', req.query.weight)
        res.json(calculateBmi(Number(req.query.height), Number(req.query.weight)))
})

app.post('/exercises', (req, res) => {
    const {daily_exercises, target}: any = req.body
    console.log(daily_exercises, target)
    res.json(calculateExercises(daily_exercises, target))
})





const PORT = 3003

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})