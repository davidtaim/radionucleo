import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AlbumResult } from './results/album.result';

@Injectable()
export class AlbumsService {
	constructor(private readonly prismaService: PrismaService) {}

	async findAll(skip: number, take: number): Promise<AlbumResult[]> {
		const albums = await this.prismaService.album.findMany({
			skip,
			take,
			select: {
				id: true,
				title: true,
				country: true,
				genre: true,
				imageLink: false,
				views: true,
				postDate: true,
			},
		});

		if (!albums) throw new NotFoundException('any albums found');

		return albums;
	}

	async findById(id: number): Promise<AlbumResult> {
		const album = await this.prismaService.album.findFirst({
			where: {
				id,
			},
			select: {
				id: true,
				title: true,
				country: true,
				genre: true,
				imageLink: false,
				views: true,
				postDate: true,
			},
		});

		if (!album)
			throw new NotFoundException(
				'album with the provide id does not exist',
			);

		return album;
	}

	async getRandomAlbums(take: number): Promise<AlbumResult[]> {
		let albumsTrys = 0;

		const albums = [];

		const totalAlbums = await this.prismaService.album.count();

		const tryOut = 3 * take;

		while (albumsTrys < tryOut) {
			const id = Math.ceil(Math.random() * totalAlbums);

			const album = await this.prismaService.album.findFirst({
				select: {
					id: true,
					title: true,
					country: true,
					genre: true,
					imageLink: false,
					views: true,
					postDate: true,
				},
				where: {
					id,
				},
			});

			albumsTrys += 1;

			if (!album) continue;

			albums.push(album);

			if (albums.length === take) break;
		}

		if (!albums) throw new NotFoundException('any albums found');

		return albums;
	}

	async findAlbumBySongId(idSong: number): Promise<AlbumResult> {
		const album = await this.prismaService.song.findFirst({
			where: {
				id: idSong,
			},
			select: {
				album: {
					select: {
						id: true,
						title: true,
						country: true,
						genre: true,
						imageLink: false,
						views: true,
						postDate: true,
					},
				},
			},
		});

		if (!album)
			throw new NotFoundException('any album find with this song id');

		return album.album;
	}
}
