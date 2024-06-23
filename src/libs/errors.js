export class ValidationUser extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationUser";
  }
}
export class ConnectionError extends Error {
  constructor(message) {
    super(message);
    this.name = "ConnectionError";
  }
}
