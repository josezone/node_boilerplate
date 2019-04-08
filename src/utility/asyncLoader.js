export default promise => promise.then(data => [null, data]).catch(err => [err]);
