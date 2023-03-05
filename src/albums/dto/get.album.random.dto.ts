import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class GetAlbumsRandomDto {
	@ApiProperty()
	@IsNumber()
	@IsOptional()
	take: number = 10;
}
