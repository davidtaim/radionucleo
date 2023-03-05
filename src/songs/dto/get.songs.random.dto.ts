import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class GetSongsRandomDto {
	@ApiProperty()
	@IsNumber()
	@IsOptional()
	take: number = 10;
}
