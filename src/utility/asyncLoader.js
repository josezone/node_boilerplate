/**
 *Used as a curry for async await for elegant error handling
 * @typedef {catchEm} catchEm
 */

/**
 *Used as a curry for async await for elegant error handling
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

function asyncLoader(promise) {
  return promise.then(data => [null, data]).catch(err => [err]);
}
export default asyncLoader;
