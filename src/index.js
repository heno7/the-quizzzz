const express = require("express");
const app = express();
const PORT = process.env.PORT || 7777;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authRoutes = require("./auth/auth.routes");
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log("app is running...");
});

process.on("uncaughtException", () => {
  process.exit(1);
});

process.on("unhandledRejection", () => {
  process.exit(1);
});
