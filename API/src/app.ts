import express from "express";
import { sequelize } from "./db/sequelize.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
import cors from "cors";
import router from "./routes/router.js";
import { Request, Response } from "express";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

// à mettre en commentaire si db non allumée
sequelize
  .authenticate()
  .then(
    (_) => console.log("La connexion à la base de données a bien été établie"),
    // initDB(),
  )
  .catch((error) => console.error("Impossible de se connecter à la DB"));

app.get("/api/", (req, res) => {
  res.redirect(`http://localhost:${port}/`);
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true }),
);

// all routes
app.use("/api", router);

// Global error middleware - must be last
app.use(errorMiddleware);

// liste des routes
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

// 404 error
app.use((req: Request, res: Response) => {
  const message =
    "Impossible de trouver la ressource demmander ! Vous pouvez essayer une autre URL";
  res.status(404).json(message);
});
