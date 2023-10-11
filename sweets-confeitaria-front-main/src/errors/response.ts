export class ResponseError {
  constructor(private readonly message: string) {
    this.message = message
  }

  toJson() {
    return {
      message: this.message,
    }
  }
}
