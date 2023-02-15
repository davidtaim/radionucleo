import { Album } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class AlbumEntity implements Album {
  @ApiProperty()
  country: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  genre: string;
  @ApiProperty()
  id: number;
  @ApiProperty()
  idBand: number;
  @ApiProperty()
  imageLink: string;
  @ApiProperty()
  postDate: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  views: number;
}
