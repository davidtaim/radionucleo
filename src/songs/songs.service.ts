import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SongResult } from './results/song.result';

@Injectable()
export class SongsService {
	constructor(private readonly prismaService: PrismaService) {}

	async findAll(skip: number = 0, take: number = 10): Promise<SongResult[]> {
		const songs = await this.prismaService.song.findMany({
			skip,
			take,
			select: {
				id: true,
				name: true,
			},
		});
		if (!songs) throw new NotFoundException('any songs found');
		return songs;
	}

	async findById(id: number): Promise<SongResult> {
		const song = await this.prismaService.song.findFirst({
			select: {
				id: true,
				name: true,
			},
			where: {
				id,
			},
		});

		if (!song)
			throw new NotFoundException(
				'song with the provide id does not exist',
			);

		return song;
	}

	async getRandomSongs(take: number): Promise<SongResult[]> {
		let songsTrys = 0;

		const songs = [];

		const totalSongs = await this.prismaService.song.count();

		const tryOut = 3 * take;

		while (songsTrys < tryOut) {
			const id = Math.ceil(Math.random() * totalSongs);

			const song = await this.prismaService.song.findFirst({
				select: {
					id: true,
					name: true,
				},
				where: {
					id,
				},
			});

			songsTrys += 1;

			if (!song) continue;

			songs.push(song);

			if (songs.length === take) break;
		}

		if (!songs) throw new NotFoundException('any songs found');

		return songs;
	}

	async findSongsByIdAlbum(idAlbum: number): Promise<SongResult[]> {
		const songs = await this.prismaService.album.findFirst({
			where: {
				id: idAlbum,
			},
			select: {
				songList: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});

		if (!songs)
			throw new NotFoundException('any songs found with that album id');

		return songs.songList;
	}
}
