import express from "express";
import { sequelize } from "./db/sequelize.mjs";
import { getLivres } from "./routes/getLivres.mjs";
import { addLivre } from "./routes/addLivre.mjs";
import { deleteLivre } from "./routes/deleteLivre.mjs";
import { updateLivre } from "./routes/updateLivre.mjs";
import { getLivreId } from "./routes/getLivreId.mjs";
import { getAllLivresCategorie } from "./routes/getAllLivresCategorie.mjs";
import { getCommentaires } from "./routes/getCommentaires.mjs";
import { addCommentaire } from "./routes/addCommentaires.mjs";
import { getCategories } from "./routes/getCategories.mjs";
import {addCategorie} from "./routes/addCategorie.mjs"

const app = express();

app.use(express.json());
    
const port = 3000;

// à mettre en commentaire si db non allumée
sequelize.authenticate().then((_) =>
    console.log("La connexion à la base de données a bien été établie"),
).catch((error) => console.error("Impossible de se connecter à la DB"));

// message de bienvenu
app.get("/", (req, res) => {
  res.send("Bienvenu sur notre api REST");
});

app.get("/api/", (req, res) => {
    res.redirect(`http://localhost:${port}/`);
});

app.use("/api/livres", getLivres);
app.use("/api/livres", getLivreId);
app.use("/api/livres", addLivre);
app.use("/api/livres", deleteLivre);
app.use("/api/livres", updateLivre);
app.use("/api/commentaires", addCommentaire);
app.use("/api/commentaires", getCommentaires);
app.use("/api/categories", getCategories);
app.use("/api/categories", addCategorie);
app.use("/api/categories", getAllLivresCategorie);


// va écouter sur le port
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});


    