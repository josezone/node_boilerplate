import { Response } from "express";
import * as Joi from "@hapi/joi";

export interface ValidatorErrorInterface {
    handle(result: Joi.ValidationResult<{}>, developerCode: string, res: Response): void;
}
