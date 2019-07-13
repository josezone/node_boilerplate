import { JwtFromRequestFunction } from 'passport-jwt';

export interface StrategyInterface {
  jwtStrategy(): void;
}

export interface JwtOptionsInterface {
  jwtFromRequest: JwtFromRequestFunction;
  secretOrKey: string | undefined;
}
