import { provide } from 'inversify-binding-decorators';

import { ASYNC_LOADER } from '../const/types';
import { AsyncLoaderInterface } from './asyncLoader.interface';

/**
 * @typedef {catchEm} catchEm
 */

/**
 * @type {catchEm} catchEm
 * @param {Promise} promise receives promise as input
 * @return {Promise} returns promise that resolves array with first
 *  element as null and second element as resolved data or reject to array
 *  with first element as error
 * @mermaid
 * graph TD;
 *  promise --> id1{resolve/reject}
 *  id1 --> result[null, array];
 *  id1 --> error[error];
 */

@provide(ASYNC_LOADER)
class AsyncLoader implements AsyncLoaderInterface {
  // tslint:disable-next-line: no-any
  load(promise: Promise<any>): Promise<any[]> {
    return promise.then(data => [null, data]).catch(err => [err]);
  }
}
