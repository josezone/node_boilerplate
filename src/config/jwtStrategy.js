const passportLoader = "passport";
const LocalStrategyLoader = "passport-local";
const FacebookTokenStrategyLoader = "passport-facebook-token";
const GoogleStrategicLoader = "passport-token-google";
const passportJWTLoader = "passport-jwt";
const userQueriesLoader = "../queries/user.queries";
const asyncLoader = "../utility/asyncLoader";
const comparePasswordLoader = "../utility/comparePassword";
const configLoader = "./config";

export default new Promise(async function users(asyncExport) {
  const result = await Promise.all([
    import(passportLoader),
    import(LocalStrategyLoader),
    import(FacebookTokenStrategyLoader),
    import(GoogleStrategicLoader),
    import(userQueriesLoader),
    import(asyncLoader),
    import(comparePasswordLoader),
    import(configLoader),
    import(passportJWTLoader)
  ]);
  const [
    { default: passport },
    { default: LocalStrategy },
    { default: FacebookTokenStrategy },
    { default: GoogleStrategic },
    { default: userQueries },
    { default: catchEm },
    { default: comparePassword },
    { default: config },
    {
      default: { ExtractJwt, Strategy: JwtStrategy }
    }
  ] = result;
  const GoogleStrategy = GoogleStrategic.Strategy;
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: config.JWT_SECRET
  };

  function defineStrategy(app) {
    passport.use(
      new JwtStrategy(jwtOptions, (jwtPayload, next) => {
        const user = jwtPayload.token;
        next(null, user);
      })
    );

    passport.use(
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password"
        },
        async function local(email, password, done) {
          const [error, user] = await catchEm(
            userQueries.getUserByEmail(email)
          );
          if (error) {
            return done(error);
          }
          if (!user || !user.password || user.status !== "Active") {
            return done(null, false);
          }
          comparePassword(password, user.password, function cb(err, isMatch) {
            if (err) {
              return done(err);
            }
            if (!isMatch) {
              return done(null, false);
            }
            return done(null, user);
          });
          return false;
        }
      )
    );

    if (config.FACEBOOK_APP_ID) {
      passport.use(
        new FacebookTokenStrategy(
          {
            clientID: config.FACEBOOK_APP_ID,
            clientSecret: config.FACEBOOK_APP_SECRET,
            profileFields: ["id", "emails", "name"]
          },
          function cb(_accessToken, _refreshToken, user, done) {
            if (!user.emails || !user.emails[0].value) {
              return done(null, false);
            }
            return done(null, user);
          }
        )
      );
    }

    if (config.GOOGLE_CLIENT_ID) {
      passport.use(
        new GoogleStrategy(
          {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET
          },
          function cb(_accessToken, _refreshToken, user, done) {
            if (!user.emails || !user.emails[0].value) {
              return done(null, false);
            }
            return done(null, user);
          }
        )
      );
    }

    app.use(passport.initialize());
  }
  asyncExport(defineStrategy);
});
