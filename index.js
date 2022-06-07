const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db");

const taskRouter = require("./routers/route/task");

const app = express();
app.use(express.json());
app.use(cors());

// Routers
app.use(taskRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${PORT}`);
});
