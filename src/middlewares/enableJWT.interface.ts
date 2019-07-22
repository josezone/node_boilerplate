import { Authenticator } from "passport";

export interface EnableJWTInterface {
    enableJWT(): Authenticator;
}
