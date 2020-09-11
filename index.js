const express = require("express");
const path = require("path");
const volleyball = require("volleyball");

const PORT = 1234;
const app = express();
app.use(volleyball);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static middleware
app.use(express.static(path.join(__dirname, "./views")));

// app.use("/api", require("./api")); // include our routes!

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/reference.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

module.exports = app;
