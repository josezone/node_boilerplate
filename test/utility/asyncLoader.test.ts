import 'reflect-metadata';

import { Container } from 'inversify';

import { receptacle } from '../../src/container';
import { ASYNC_LOADER } from '../../src/const/types';
import { AsyncLoaderInterface } from '../../src/utility/asyncLoader.interface';

const container: Container = receptacle.getContainer;
const asyncLoader: AsyncLoaderInterface = container.get(ASYNC_LOADER);

const dataSet1 = new Promise((resolve, reject) => {
  resolve('done');
});

const dataSet2 = new Promise((resolve, reject) => {
  reject('fail');
});

test('test asynchronous loading success expect done', () => {
  return expect(asyncLoader.load(dataSet1)).resolves.toEqual([null, 'done']);
});

test('test asynchronous loading reject expect fail', () => {
  return expect(asyncLoader.load(dataSet2)).resolves.toEqual(['fail']);
});
