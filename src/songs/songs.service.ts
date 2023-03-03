import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetSongsDto } from './dto/get.songs.dto';
import { GetSongsRandomDto } from './dto/get.songs.random.dto';
import { SongResult } from './results/song.result';

@Injectable()
export class SongsService {
	constructor(private readonly prismaService: PrismaService) {}

	async findAll(getSongsDto: GetSongsDto): Promise<SongResult[]> {
		let songs = await this.prismaService.song.findMany({
			skip: getSongsDto.skip,
			take: getSongsDto.take,
			select: {
				id: true,
				name: true,
			},
		});
		if (!songs) throw new NotFoundException('any songs found');
		return songs;
	}

	async findById(id: number): Promise<SongResult> {
		let song = await this.prismaService.song.findFirst({
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

	async getRandomSongs(
		getSongsRandomDto: GetSongsRandomDto,
	): Promise<SongResult[]> {
		let songsTrys = 0;

		let songs = [];

		let totalSongs = await this.prismaService.song.count();

		let tryOut = 3 * getSongsRandomDto.take;

		while (songsTrys < tryOut) {
			let id = Math.ceil(Math.random() * totalSongs);

			let song = await this.prismaService.song.findFirst({
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

			if (songs.length === getSongsRandomDto.take) break;
		}

		if (!songs) throw new NotFoundException('any songs found');

		return songs;
	}

	async findSongsByIdAlbum(idAlbum: number): Promise<SongResult[]> {
		let songs = await this.prismaService.album.findFirst({
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
