const express = require("express");
const app = express();
require("./DB/connection");
const cors = require("cors");
const router = require("./routes/route");
const cookieParser = require("cookie-parser");
const port = 4000;


app.get("/", (req, res) => {
          res.status(201).json("Server Created.....")
})

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(router);


app.listen(port, () => {
          console.log(`server is running on ${port}`);
})