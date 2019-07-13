export class CustomError extends Error {
  statusCode!: number;
  description!: string;
  setInfo(statusCode: number, description: string): CustomError {
    this.statusCode = statusCode;
    this.description = description;
    return this;
  }
}
