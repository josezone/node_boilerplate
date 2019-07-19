import { controller, httpGet } from "inversify-express-utils";
import {Request, Response, NextFunction} from "express";

@controller("/user")
export class UserController {
    @httpGet("/")
    private index(req: Request, res: Response, next: NextFunction): string {
        return "server is up";
    }
}
