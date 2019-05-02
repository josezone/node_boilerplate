const user = DBConnectionMock => {
  return DBConnectionMock.define("credentials", {
    userId: 1,
    email: "email@testmail.com",
    password: "password",
    registrationToken: null,
    status: "Active"
  });
};

export default user;
