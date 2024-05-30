import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

export const bugs = [...Array(10)].map(() => ({
  bugId: sample(['KAN-1', 'KAN-2', 'KAN-3', 'KAN-8']),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  status: sample(['Open', 'In Progress', 'Resolved', 'Closed']),
  assignedTo: faker.person.fullName(),
  reporter: faker.person.fullName(),
  creationDate: faker.date.past().toISOString(),
  lastUpdated: faker.date.recent().toISOString(),
}));