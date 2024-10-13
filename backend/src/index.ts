import dotenv from "dotenv";
import express from "express";
import router from "./routes/api";

dotenv.config();
const app = express();
app.use(express.json())

app.use('/api/v1', router);

const PORT = process.env.PORT || 2003;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});