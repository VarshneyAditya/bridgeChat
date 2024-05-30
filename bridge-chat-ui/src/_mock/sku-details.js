import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

export const productQADetails = [...Array(10)].map(() => ({
  threadId: faker.number.int(99999),
  skuId: sample(['UR00175', 'KKL0293', 'KSL0293', 'URL0293', 'MKSL019', 'NJS0011', 'JR00193', 'JK010827', 'UR00175', 'KKL0293', 'KSL0293', 'URL0293', 'MKSL019', 'NJS0011', 'JR00193', 'JK010827']),
  description: faker.lorem.paragraph(),
  status: sample(['Answered', 'UnAnswered', 'Closed']),
  assignedTo: faker.person.fullName(),
  reporter: faker.person.fullName(),
  creationDate: sample(['2024-05-13', '2024-02-11', '2024-01-23']),
  lastUpdated: sample(['2024-05-13', '2024-02-11', '2024-01-23']),
}));