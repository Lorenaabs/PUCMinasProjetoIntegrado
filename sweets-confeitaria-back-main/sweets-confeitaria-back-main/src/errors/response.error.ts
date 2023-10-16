export class ResponseError {
  constructor(
    private readonly statusCode: number,
    private readonly message: string[]
  ) {}

  toJson() {
    return {
      statusCode: this.statusCode,
      message: this.message
    }
  }
}
