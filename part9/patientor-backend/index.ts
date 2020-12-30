import express from 'express';
import diagnosesRouter from './src/routes/diagnoses'
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/diagnoses', diagnosesRouter);

app.get('/api/ping', (_req, res) => {
    res.send('ping pong pingu');
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
