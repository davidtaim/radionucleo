import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class GetAlbumsDto {
	@ApiProperty()
	@IsNotEmpty()
	skip: number;

	@ApiProperty()
	@IsNotEmpty()
	take: number;
}

export class GetAlbumsQueryDto {
	@ApiProperty()
	@Type(() => Number)
	@IsInt()
	skip: number;

	@Type(() => Number)
	@IsInt()
	take: number;
}
