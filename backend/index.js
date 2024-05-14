const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectToDb = require("./db/db.config.js");
const port = process.env.PORT;

// dotenv.config({ path: "./.env" });

// console.log('env chk', process.env.CORS_ORIGIN)

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

const userRouter = require("./routes/user.routes.js");
const productRouter = require("./routes/product.routes.js");

app.get("/", (req, res) => {
  return res.send("Received a GET HTTP method");
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

connectToDb()
  .then(() => {
    app.listen(port || 8000, () => console.log(`server is running at ${port}`));
  })
  .catch((err) => console.log("MongoDB Connection Failed"));
