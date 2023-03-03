import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetSongsDto {
  @ApiProperty()
  @IsNotEmpty()
  skip: number;

  @ApiProperty()
  @IsNotEmpty()
  take: number;
}
