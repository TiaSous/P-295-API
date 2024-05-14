import express from "express";
import { sequelize } from "./db/sequelize.mjs";
import { getLivre } from "./routes/getLivre.mjs";
import { addLivre } from "./routes/addLivre.mjs";
import { deleteLivre } from "./routes/deleteLivre.mjs";
import { updateLivre } from "./routes/updateLivre.mjs";
import { getLivreId } from "./routes/getLivreId.mjs";
import { getAllLivresCategorie } from "./routes/getAllLivresCategorie.mjs";
import { getCommentaire } from "./routes/getCommentaire.mjs";
import { addCommentaire } from "./routes/addCommentaires.mjs";
import { getCategorie } from "./routes/getCategorie.mjs";
import { addCategorie } from "./routes/addCategorie.mjs";
import { loginRouter } from "./routes/login.mjs";
import { getCategorieId } from "./routes/getCategorieId.mjs";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.mjs";
import cors from 'cors';
import { getAllLivreUser } from "./routes/getLivreUser.mjs";
import { getAllComentaireUser } from "./routes/getCommentairesUser.mjs";

const app = express();
app.use(express.json())
app.use(cors())
const port = 3000;

// à mettre en commentaire si db non allumée
sequelize
  .authenticate()
  .then(
    (_) => console.log("La connexion à la base de données a bien été établie")
    //initDB()
  )
  .catch((error) => console.error("Impossible de se connecter à la DB"));

// message de bienvenu
app.get("/", (req, res) => {
  res.send("Bienvenu sur notre api REST");
});

app.get("/api/", (req, res) => {
  res.redirect(`http://localhost:${port}/`);
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

// toutes les routes
app.use("/api/livres", getLivre);
app.use("/api/livres", getLivreId);
app.use("/api/livres", addLivre);
app.use("/api/livres", deleteLivre);
app.use("/api/livres", updateLivre);
app.use("/api/commentaires", addCommentaire);
app.use("/api/commentaires", getCommentaire);
app.use("/api/categories", getCategorie); 
app.use("/api/categories", getCategorieId);
app.use("/api/categories", addCategorie);
app.use("/api/categories", getAllLivresCategorie);
app.use("/api/login", loginRouter);
app.use("/api/user", getAllLivreUser) 
app.use("/api/user", getAllComentaireUser);

// va écouter sur le port
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

// routes introuvables
app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demmander ! Vous pouvez essayer une autre URL";
  res.status(404).json(message);
});
