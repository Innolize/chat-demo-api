import { EntitySchema } from 'typeorm';

import { User } from '../domain/user.domain';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  columns: {
    id: {
      name: 'id',
      type: 'int',
      primary: true,
      generated: true,
    },
    name: {
      name: 'name',
      type: 'varchar',
    },
  },
});
