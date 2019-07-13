import * as passport from 'passport';

export const enableJWT = () => passport.authenticate('jwt', { session: false });
