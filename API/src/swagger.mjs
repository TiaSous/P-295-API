import swaggerJSDoc from "swagger-jsdoc";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API libraire",
      version: "1.0.0",
      description:
        "API REST permettant de gérer une librairie",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Categorie: {
            type: "object",
            required: ["catNom"],
            properties: {
              id_categorie: {
                type: "integer",
                description: "L'identifiant unique de la catégorie.",
                example: 1
              },
              catNom: {
                type: "string",
                description: "Le nom de la catégorie.",
                example: "Fiction"
              }
            },
          },
          Commentaire: {
            type: "object",
            required: ["comAppreciation", "comCommentaire", "fk_ouvrage", "fk_utilisateur"],
            properties: {
              id_commentaire: {
                type: "integer",
                description: "L'identifiant unique du commentaire.",
                example: 1
              },
              comAppreciation: {
                type: "integer",
                description: "L'appréciation associé au commentaire.",
                minimum: 1,
                maximum: 5,
                example: 4
              },
              comCommentaire: {
                type: "string",
                description: "Le commentaire.",
                example: "Très bon livre, je le recommande !"
              },
              fk_ouvrage: {
                type: "integer",
                description: "L'identifiant de l'ouvrage associé.",
                example: 1
              },
              fk_utilisateur: {
                type: "integer",
                description: "L'identifiant de l'utilisateur associé.",
                example: 4
              }
            },
          },
          Ecrivain: {
            type: "object",
            required: ["ecrNom", "ecrPrenom"],
            properties: {
              id_ecrivain: {
                type: "integer",
                description: "L'identifiant unique de l'écrivain.",
                example: 1
              },
              ecrNom: {
                type: "string",
                description: "Le nom de l'écrivain.",
                example: "Éric"
              },
              ecrPrenom: {
                type: "string",
                description: "Le prénom de l'écrivain.",
                example: "Vuillard"
              }
            },
          },
          Editeur: {
            type: "object",
            required: ["ediNom"],
            properties: {
              id_editeur: {
                type: "integer",
                description: "L'identifiant unique de l'éditeur.",
                example: 1
              },
              ediNom: {
                type: "string",
                description: "Le nom de l'éditeur.",
                example: "Michel Lafon"
              }
            },
          },
          Livre: {
            type: "object",
            required: ["ouvTitre", "fk_utilisateur", "fk_categorie", "fk_ecrivain", "fk_editeur"],
            properties: {
              id_ouvrage: {
                type: "integer",
                description: "L'identifiant unique du livre.",
                example: 1
              },
              ouvTitre: {
                type: "string",
                description: "Le titre du livre.",
                example: "L'ordre du Jour",
              },
              ouvNbPage: {
                type: "integer",
                description: "Le nombre de pages du livre.",
                example: 328
              },
              ouvResume: {
                type: "string",
                description: "Le résumé du livre.",
                example: "L'odre du jour est un livre parlant de la 2nd guerre mondial."
              },
              ouvAnneeEdition: {
                type: "string",
                format: "date",
                description: "L'année d'édition du livre.",
                example: "2016-06-08"
              },
              ouvCouverture: {
                type: "string",
                description: "Le lien vers la couverture du livre.",
                example: "https://example.com/couverture.jpg"
              },
              ouvExtrait: {
                type: "string",
                description: "Un extrait du livre.",
                example: "Ce n'était pas l'ordre du jour"
              },
              ouvMoyenneAppreciation: {
                type: "integer",
                description: "La moyenne d'appréciation du livre.",
                example: 4
              },
              fk_utilisateur: {
                type: "integer",
                description: "L'identifiant de l'utilisateur qui a ajouté le livre.",
                example: 1
              },
              fk_categorie: {
                type: "integer",
                description: "L'identifiant de la catégorie du livre.",
                example: 4
              },
              fk_ecrivain: {
                type: "integer",
                description: "L'identifiant de l'écrivain du livre.",
                example: 7
              },
              fk_editeur: {
                type: "integer",
                description: "L'identifiant de l'éditeur du livre.",
                example: 1
              }
            },
          },
        // Ajoutez d'autres schémas ici si nécessaire
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.mjs"], // Chemins vers vos fichiers de route
};
const swaggerSpec = swaggerJSDoc(options);
export { swaggerSpec };
