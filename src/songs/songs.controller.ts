import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { take } from 'rxjs';
import { GetSongsDto } from './dto/get.songs.dto';
import { GetSongsRandomDto } from './dto/get.songs.random.dto';
import { SongResult } from './results/song.result';
import { SongsService } from './songs.service';

@ApiTags('Songs')
@Controller({
	path: 'song',
	version: '1',
})
export class SongsController {
	constructor(private readonly songsService: SongsService) {}

	@ApiOkResponse({ type: SongResult, isArray: true })
	@Get()
	findAll(
		@Query('skip', ParseIntPipe) skip: number,
		@Query('take', ParseIntPipe) take: number,
	): Promise<SongResult[]> {
		return this.songsService.findAll(skip, take);
	}

	@ApiOkResponse({ type: SongResult, isArray: true })
	@Get('random')
	getRandomSongs(
		@Query('take', ParseIntPipe) take: number,
	): Promise<SongResult[]> {
		return this.songsService.getRandomSongs(take);
	}

	@ApiOkResponse({ type: SongResult })
	@Get(':id')
	findById(@Param('id', ParseIntPipe) id: number): Promise<SongResult> {
		return this.songsService.findById(id);
	}

	@ApiOkResponse({ type: SongResult, isArray: true })
	@Get('album/:id')
	findSongsByIdAlbum(
		@Param('id', ParseIntPipe) idAlbum: number,
	): Promise<SongResult[]> {
		return this.songsService.findSongsByIdAlbum(idAlbum);
	}
}
