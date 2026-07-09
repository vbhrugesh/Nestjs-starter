import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from './user.logger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

interface User {
  id: number;
  name: string;
  email?: string | null;
}

@Injectable()
export class UserService {
  constructor(private readonly logger: LoggerService) {}
  private users: User[] = [
    { id: 1, name: 'John Doe' },
    { id: 1, name: 'Adrian' },
  ];

  findAllUser(name: string = '') {
    this.logger.log('Finding all users!');
    return this.users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  findUserById(id: number) {
    const user = this.users.find((user) => user.id === id) ?? null;
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  createUser(createUserDto: CreateUserDto) {
    this.logger.log('Creating user');
    const newUser: User = {
      id: this.users.length + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, dto: UpdateUserDto) {
    this.logger.log(`Updating user ${id}`);
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return null;
    this.users[index] = { ...this.users[index], ...dto };
    return this.users[index];
  }

  deleteUser(id: number) {
    this.logger.log('Deleting User ' + id);
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return null;
    const [deleted] = this.users.splice(index, 1);
    return deleted;
  }
}
