import express from "express";
import dotenv from "dotenv";
import router from "./routes/api";
import path from "path";

dotenv.config();
const app = express();
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 1212;

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});