export interface AsyncLoaderInterface {
    load(promise: Promise<any>): Promise<any>;
}
