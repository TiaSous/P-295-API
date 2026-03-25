import { Request, Response, NextFunction } from "express";
import { Utilisateur } from "../db/sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { privateKey } from "../auth/private_key";

// POST /login - Authentifier un utilisateur
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Pseudo et mot de passe requis",
      });
    }

    // Rechercher l'utilisateur par pseudo
    const user = await Utilisateur.findOne({
      where: { utiPseudo: username },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Pseudo ou mot de passe incorrect",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.utiMotDePasse);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Pseudo ou mot de passe incorrect",
      });
    }

    const token = jwt.sign(
      {
        id_utilisateur: user.id_utilisateur,
        utiPseudo: user.utiPseudo,
        utiRole: user.utiRole,
      },
      privateKey,
      { expiresIn: "24h" },
    );

    res.status(200).json({
      success: true,
      message: "Authentification réussie",
      token,
      user: {
        id_utilisateur: user.id_utilisateur,
        utiPseudo: user.utiPseudo,
        utiRole: user.utiRole,
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /register - Create a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Pseudo et mot de passe requis",
      });
    }

    const existingUser = await Utilisateur.findOne({
      where: { utiPseudo: username },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Ce pseudo est déjà utilisé",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Utilisateur.create({
      utiPseudo: username,
      utiMotDePasse: hashedPassword,
      utiRole: "user",
      utiNbOuvrageProposer: 0,
      utiNbCommentaire: 0,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        id_utilisateur: newUser.id_utilisateur,
        utiPseudo: newUser.utiPseudo,
        utiRole: newUser.utiRole,
      },
      privateKey,
      { expiresIn: "24h" },
    );

    res.status(201).json({
      success: true,
      message: "Inscription réussie",
      token,
      user: {
        id_utilisateur: newUser.id_utilisateur,
        utiPseudo: newUser.utiPseudo,
        utiRole: newUser.utiRole,
      },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
