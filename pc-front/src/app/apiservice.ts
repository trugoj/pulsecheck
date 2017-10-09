export abstract class APIService {

  private _url: string = "http://cmas.swissre.com:3030";

  get url(): string {
    return this._url;
  }
}
