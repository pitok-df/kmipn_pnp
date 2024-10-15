import express from 'express';
import dotenv from 'dotenv';
import router from './routes/api';

dotenv.config()

const app = express()
app.use(express.json())
app.use('/api/v1/', router)

const PORT = process.env.PORT || 1212;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})