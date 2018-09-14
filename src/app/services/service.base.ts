
export class ServiceBase {
  private readonly hostUrl = 'http://localhost:5234'; // eventually this will come from a configuration setting
  private readonly baseUrl = '/api/v1/';

  constructor() {}

  createUrl(apiUrl: string) {
    return this.hostUrl + this.baseUrl + apiUrl;
  }
}
