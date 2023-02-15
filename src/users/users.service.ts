import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  //TODO fix types with id
  async findById(id: number): Promise<User> {
    return this.prismaService.user.findFirst({
      where: {
        id,
      },
    });
  }

  async findByUsername(username: string): Promise<User> {
    return this.prismaService.user.findFirst({
      where: {
        username,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: createUserDto,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  //TODO implementar mejor la eliminacion de cuentas
  async remove(id: number): Promise<User> {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
