export class ResponseFormatter {
  private static response = {
    meta: {
      code: 200,
      status: 'success',
      message: null,
    },
    data: null,
  };

  public static success(
    code: number,
    data: any = null,
    message: string = null,
  ) {
    this.response.meta.code = code;
    this.response.meta.status = 'success';
    this.response.meta.message = message;
    this.response.data = data;

    return this.buildResponse();
  }

  public static error(
    data: any = null,
    message: string = null,
    code: number = 400,
  ) {
    this.response.meta.status = 'error';
    this.response.meta.code = code;
    this.response.meta.message = message;
    this.response.data = data;

    return this.buildResponse();
  }

  private static buildResponse() {
    return {
      statusCode: this.response.meta.code,
      status: this.response.meta.status,
      message: this.response.meta.message,
      data: this.response.data,
    };
  }
}
