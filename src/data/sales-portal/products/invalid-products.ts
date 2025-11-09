import { faker } from '@faker-js/faker';

export const dataForInvalidCases = [
  {
    testName: 'name is required',
    data: { name: undefined },
  },
  {
    testName: 'manufacturer is required',
    data: { manufacturer: undefined },
  },
  {
    testName: 'price is required',
    data: { price: undefined },
  },
  {
    testName: 'amount is required',
    data: { amount: undefined },
  },
  {
    testName: 'name should not contain 2 or less alphanumerical characters',
    data: { name: faker.string.alphanumeric({ length: { min: 0, max: 2 } }) },
  },
  {
    testName: 'name should not contain 41 or more alphanumerical characters',
    data: { name: faker.string.alphanumeric({ length: { min: 41, max: 100 } }) },
  },
  {
    testName: 'name should have alphanumerical characters',
    data: { name: faker.number.int({ min: 100, max: 99999 }) },
  },
  {
    testName: 'name should not contain more than one space between',
    data: { name: `${faker.word.words()}  ${faker.word.words()}` },
  },
  {
    testName: 'price should not be less than 1',
    data: { price: 0 },
  },
  {
    testName: 'price should not be more than 99999',
    data: { price: 100000 },
  },
  {
    testName: 'amount should be 0 or more',
    data: { amount: -1 },
  },
  {
    testName: 'amount should not bemore than 999',
    data: { amount: 1000 },
  },
  {
    testName: 'notes should not contain < or > symbols',
    data: { notes: `${faker.string.alphanumeric(10)}<>` },
  },
];
