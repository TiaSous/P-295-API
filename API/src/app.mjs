import express from "express";
import { sequelize, initDB } from "./db/sequelize.mjs";

const app = express();

app.use(express.json());
    
const port = 3000;

// à mettre en commentaire si db non allumée
sequelize.authenticate().then((_) =>
    console.log("La connexion à la base de données a bien été établie"),
    initDB()
).catch((error) => console.error("Impossible de se connecter à la DB"));

// message de bienvenu
app.get("/", (req, res) => {
  res.send("Bienvenu sur notre api");
});

// va écouter sur le port
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

app.get("/api/", (req, res) => {
    res.redirect(`http://localhost:${port}/`);
});
    