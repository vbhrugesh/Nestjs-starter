import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { RoleGuard } from 'src/guard/role.guard';

@Controller('users')
@UseGuards(RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUsers(@Query('name') name: string): unknown {
    return this.userService.findAllUser(name);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): unknown {
    return this.userService.findUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): unknown {
    const userCreated = this.userService.createUser(createUserDto);
    return {
      data: userCreated,
      message: 'User created successfully',
    };
  }

  @Put(':id')
  updateUser(
    @Param(':id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): unknown {
    const updatedUser = this.userService.updateUser(id, updateUserDto);
    return {
      data: updatedUser,
      message: 'Updated successfully',
    };
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  deleteUser(@Param(':id', ParseIntPipe) id: number): unknown {
    const deletedUser = this.userService.deleteUser(id);
    return {
      data: deletedUser,
      message: 'User Deleted successfully',
    };
  }
}
