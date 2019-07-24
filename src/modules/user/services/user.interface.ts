export interface UserServiceInterface {
  register(email: string): string;
  completeRegister(pasword: string, token: string): void;
  login(email: string, pasword: string): void;
  forgotPassword(email: string): void;
  resetPassword(email: string, pasword: string, token: string): void;
  changePassword(id: number, pasword: string, oldPasword: string): void;
}
