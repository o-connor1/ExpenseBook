const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser=require("cookie-parser");

const userRouter = require("./routes/userRoutes");

const app = express();
dotenv.config({ path: "./config.env" });

require("./dbconfig").connect();

app.use(cors({ 
  origin: 'http://localhost:3000', 
  credentials: true 
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);


app.listen(process.env.PORT, () => {
  console.log(`Application running on the port ${process.env.PORT}`);
});
