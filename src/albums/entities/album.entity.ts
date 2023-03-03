import { Album } from '@prisma/client';

export class AlbumEntity implements Album {
	id: number;
	title: string;
	country: string;
	genre: string;
	imageLink: string;
	views: number;
	postDate: string;
	idBand: number;
	createdAt: Date;
	updatedAt: Date;
	deleted_at: Date;
}
