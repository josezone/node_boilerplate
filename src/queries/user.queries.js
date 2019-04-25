class UserQuery {
  init(db) {
    this.db = db;
    return this;
  }

  createRegistration(email, registrationToken) {
    return this.db.user.findOrCreate({
      where: { email },
      defaults: { status: "Register", registrationToken }
    });
  }

  getUserByEmail(email) {
    return this.db.user.findOne({
      where: { email }
    });
  }
}

export default new UserQuery();
