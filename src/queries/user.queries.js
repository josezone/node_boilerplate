class UserQuery {
  init(db) {
    this.db = db;
    return this;
  }

  createRegistration(email, registrationToken, status) {
    return this.db.credentials.findOrCreate({
      where: { email },
      defaults: { status, registrationToken }
    });
  }

  getUserByEmail(email) {
    return this.db.credentials.findOne({
      where: { email }
    });
  }
}

export default new UserQuery();
