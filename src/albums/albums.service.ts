import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Album } from '@prisma/client';
import { GetAlbumsDto } from './dto/get-albums.dto';

@Injectable()
export class AlbumsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(getAlbumsDto: GetAlbumsDto): Promise<Album[]> {
    return this.prismaService.album.findMany({
      skip: getAlbumsDto.skip,
      take: getAlbumsDto.take,
    });
  }
}
