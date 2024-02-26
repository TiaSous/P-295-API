import express from "express";

const app = express();

app.use(express.json());
    
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

app.get("/api/", (req, res) => {
    res.redirect(`http://localhost:${port}/`);
});
    