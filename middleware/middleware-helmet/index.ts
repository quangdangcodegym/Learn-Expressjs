import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(morgan("common"));
app.use(helmet());
app.get('/', (req, res) => {
 res.json({
 message: "Hello Stranger! How are you?",
 });
})

app.listen(PORT, () => {
 console.log("App running on port: " + PORT)
})