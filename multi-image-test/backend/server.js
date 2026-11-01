const express = require("express");

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/greeting", (_, res) => {
  res.json({ message: "Hello, welcome to the app!" });
});

app.post("/form", (req, res) => {
    const { name, email } = req.body;
    res.json({ message: `Received form data: Name - ${name}, Email - ${email}` });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});