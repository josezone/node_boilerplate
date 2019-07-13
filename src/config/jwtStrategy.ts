import * as passport from 'passport';
import { config } from './config';
import { Express } from 'express-serve-static-core';
import { JwtOptionsInterface, StrategyInterface } from './jwtStrategy.i';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

class Strategy implements StrategyInterface {
  private jwtOptions: JwtOptionsInterface = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: config.JWT_SECRET,
  };

  constructor(app: Express) {
    app.use(passport.initialize());
  }

  jwtStrategy() {
    passport.use(
      new JwtStrategy(this.jwtOptions, (jwtPayload, next) => {
        const user = jwtPayload.token;
        next(null, user);
      })
    );
  }
}

export class Strategies implements StrategyInterface {
  jwtStrategy() {
    Strategies.instance.jwtStrategy();
  }
  static instance: Strategy;
  constructor(app: Express) {
    if (!Strategies.instance) {
      Strategies.instance = new Strategy(app);
    }
    return Strategies.instance;
  }
}
