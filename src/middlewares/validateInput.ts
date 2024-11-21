import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodSchema, ZodError } from "zod";
export const validate = (schema: ZodSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body); // Validate request body
      next();
    } catch (error) {
      if (error instanceof ZodError) {
          res.status(400).json({ errors: error.issues });
          return;
      }
      next(error);
    }
  };
};
