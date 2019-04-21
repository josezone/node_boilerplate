const client = DBConnectionMock => {
    return DBConnectionMock.define("user", {
      userId: 1,
      email: "email@testmail.com",
      password: "password",
      registrationToken: null,
      status: "Active"
    });
  };
  
  export default client;
  