interface ResponseErrorType {
  message: string;
  status: number;
}

export class ResponseError extends Error implements ResponseErrorType {
  status: number;

  constructor({ message, status }: ResponseErrorType) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, ResponseError.prototype);
  }
}
