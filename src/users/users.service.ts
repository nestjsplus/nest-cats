import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
        roles: ['admin'],
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
        roles: ['user'],
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
        roles: ['user'],
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
