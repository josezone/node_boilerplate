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
}

export default new UserQuery();
