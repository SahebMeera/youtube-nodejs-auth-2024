require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const authRouter = require("./routes/user-router");
const homeRouter = require("./routes/home-router");
const adminRouter = require("./routes/admin-router");
const imageRouter = require("./routes/image-router");

const app = express();
console.log(process.env.PORT);
const PORT = 3001;
app.use(express.json());

connectToDB();
app.use("/api", authRouter);
app.use("/api/home", homeRouter);
app.use("/api/admin", adminRouter);
app.use("/api/image", imageRouter);

// middleware for express js

app.listen(PORT, () => {
  console.log(`Server running succcessfully with this port ${PORT}`);
});
