import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetSongsRandomDto {
	@ApiProperty()
	@IsNotEmpty()
	take: number;
}
