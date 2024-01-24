export class CatAlreadyExistException extends Error {
  private constructor(message: string) {
    super(message);
  }

  static throw(id: string) {
    throw new CatAlreadyExistException(
      `The cat with id #${id} already exists.`,
    );
  }
}
