import express from "express";
import "dotenv/config";
import "./src/db/conn.js"
import signRoutes from "./routes/signup.route.js";
import statusCode from "./Constants/HttpStatusCode.js";
import logRoutes from "./routes/login.route.js";


const app = express();
const PORT = process.env.APP_PORT || 3000;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/signup",signRoutes);
app.use("/login",logRoutes);

app.use((req, res)=>{
    res.status(statusCode.NOT_FOUND).send({
        message: `Route Not Found`,
    });
})

app.listen(PORT, ()=>{
    console.log(`Sever on the running PORT http://localhost:${PORT}`);
})