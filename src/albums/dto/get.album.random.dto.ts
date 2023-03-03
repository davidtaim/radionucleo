import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetAlbumsRandomDto {
	@ApiProperty()
	@IsNotEmpty()
	take: number;
}
