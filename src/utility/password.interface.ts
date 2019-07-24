export interface PasswordInterface {
  generatePassword(data: string, rounds: number): Promise<Error | string>;
  comparePassword(password: string, hash: string): Promise<Error | boolean>;
}
