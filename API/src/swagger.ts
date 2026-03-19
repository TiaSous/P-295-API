import { readFileSync } from "fs";
import { join } from "path";
import YAML from "yaml";

// In development: /path/to/project/src/swagger.yaml
// In production Docker: /app/swagger.yaml
const isDev = process.env.NODE_ENV !== "production";
const swaggerYamlPath = isDev
  ? join(process.cwd(), "src", "swagger.yaml")
  : join(process.cwd(), "swagger.yaml");
const swaggerYamlContent = readFileSync(swaggerYamlPath, "utf8");
const swaggerDocument = YAML.parse(swaggerYamlContent);

export const swaggerSpec = swaggerDocument;
