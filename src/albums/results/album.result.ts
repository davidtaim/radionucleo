import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AlbumEntity } from '../entities/album.entity';

export class AlbumResult extends PartialType(AlbumEntity) {
	@ApiProperty()
	id: number;
	@ApiProperty()
	title: string;
	@ApiProperty()
	country: string;
	@ApiProperty()
	genre: string;
	@ApiProperty()
	imageLink?: string;
	@ApiProperty()
	views: number;
	@ApiProperty()
	postDate: string;
}
