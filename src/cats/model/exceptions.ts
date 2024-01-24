export class Exceptions extends Error {
  private constructor(message: string) {
    super(message);
  }

  static throw(id: string) {
    throw new Exceptions(`The cat with id #${id} already exists.`);
  }
}
