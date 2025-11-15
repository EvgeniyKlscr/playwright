import { faker } from '@faker-js/faker';

export const dataForValidCases = [
  {
    testName: 'name should contain 3 or more alphanumerical characters',
    data: { name: faker.string.alphanumeric({ length: { min: 3, max: 3 } }) },
  },
  {
    testName: 'name should contain 40 or less alphanumerical characters',
    data: { name: faker.string.alphanumeric({ length: { min: 40, max: 40 } }) },
  },
  {
    testName: 'name should contain only one space between',
    data: { name: faker.word.words(3) },
  },
  {
    testName: 'price should be 1 or more',
    data: { price: 1 },
  },
  {
    testName: 'price should be 99999 or less',
    data: { price: 99999 },
  },
  {
    testName: 'amount should be 0 or more',
    data: { amount: 0 },
  },
  {
    testName: 'amount should be 999 or less',
    data: { amount: 999 },
  },
  {
    testName: 'notes should contain 0 or more characters',
    data: { notes: '' },
  },
  {
    testName: 'notes should contain 250 or less characters',
    data: { notes: faker.string.alphanumeric({ length: 250 }) },
  },
  {
    testName: 'notes is not required',
    data: { notes: undefined },
  },
];
