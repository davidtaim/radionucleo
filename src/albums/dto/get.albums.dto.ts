import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetAlbumsDto {
  @ApiProperty()
  @IsNotEmpty()
  skip: number;

  @ApiProperty()
  @IsNotEmpty()
  take: number;
}
