import { Request, Response, NextFunction } from "express"
import { ZodTypeAny  } from "zod"

type Schema = {
  body?: ZodTypeAny 
  params?: ZodTypeAny 
  query?: ZodTypeAny 
}

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {

    const validations: Array<keyof Schema> = ["body", "params", "query"];

    for (const key of validations) {

      const currentSchema = schema[key];

      if (!currentSchema) continue;

      const result = currentSchema.safeParse(req[key]);

      if (!result.success) {
        return res.status(422).json({
          code: "VALIDATION_ERROR",
          message: `Invalid ${key}`,
          errors: result.error.flatten(),
        });
      }

      req[key] = result.data;
    }
    
    next();
    return;
  }
}