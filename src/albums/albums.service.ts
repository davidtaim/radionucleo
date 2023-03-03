import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetAlbumsRandomDto } from './dto/get.album.random.dto';
import { GetAlbumsDto } from './dto/get.albums.dto';
import { AlbumResult } from './results/album.result';

@Injectable()
export class AlbumsService {
	constructor(private readonly prismaService: PrismaService) {}

	async findAll(getAlbumsDto: GetAlbumsDto): Promise<AlbumResult[]> {
		let albums = await this.prismaService.album.findMany({
			skip: getAlbumsDto.skip,
			take: getAlbumsDto.take,
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
		let album = await this.prismaService.album.findFirst({
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

	async getRandomAlbums(
		getAlbumsRandomDto: GetAlbumsRandomDto,
	): Promise<AlbumResult[]> {
		let albumsTrys = 0;

		let albums = [];

		let totalAlbums = await this.prismaService.album.count();

		let tryOut = 3 * getAlbumsRandomDto.take;

		while (albumsTrys < tryOut) {
			let id = Math.ceil(Math.random() * totalAlbums);

			let album = await this.prismaService.album.findFirst({
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

			if (albums.length === getAlbumsRandomDto.take) break;
		}

		if (!albums) throw new NotFoundException('any albums found');

		return albums;
	}

	async findAlbumBySongId(idSong: number): Promise<AlbumResult> {
		let album = await this.prismaService.song.findFirst({
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
