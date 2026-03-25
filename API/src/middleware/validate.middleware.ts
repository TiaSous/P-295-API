import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

type Constructor<T> = new () => T;

export const validateBodyMiddleware = <T extends object>(
  DtoClass: Constructor<T>,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Transform the plain request body into an instance of the DTO class
    const instance = plainToInstance(DtoClass, req.body);

    const errors = await validate(instance, {
      whitelist: true, // delete properties that do not have any decorators
      forbidNonWhitelisted: true, // return an error if unknown fields are present
    });

    if (errors.length > 0) {
      const formatted = errors.map((err) => ({
        field: err.property,
        constraints: Object.values(err.constraints ?? {}),
      }));

      res.status(400).json({ errors: formatted });
      return;
    }

    // Replace req.body with the validated and typed instance
    req.body = instance;
    next();
  };
};
