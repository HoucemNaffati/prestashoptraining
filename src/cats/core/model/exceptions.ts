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

export class MaxFetchReachedException extends Error {
  private constructor(message: string) {
    super(message);
  }

  static throw() {
    throw new MaxFetchReachedException(
      `The service has max fetch count and it is reached.`,
    );
  }
}
export class CatNotFoundException extends Error {
  constructor(message: string) {
    super(message);
  }

  static throw(id: string) {
    throw new CatNotFoundException(`The cat with id ${id} was not found.`);
  }
}
