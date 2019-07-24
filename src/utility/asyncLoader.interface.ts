export interface AsyncLoaderInterface {
  // tslint:disable-next-line: no-any
  load(promise: Promise<any>): Promise<any>;
}
