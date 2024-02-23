import { User } from '../../domain/user.domain';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User>;
  save(user: any): Promise<User>;
}
