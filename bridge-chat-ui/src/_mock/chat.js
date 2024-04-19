import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const chats = () => Array.from({ length: 10 }, (_, idx) => ({
  id: idx,
  name: faker.name.fullName(),
  avatarUrl: `/assets/images/avatars/avatar_${idx + 1}.jpg`,
  lastMessage: faker.lorem.sentence(),
}));

