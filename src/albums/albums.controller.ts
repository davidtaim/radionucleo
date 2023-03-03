import { AlbumsService } from './albums.service';
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from '../common/guards/access-token.guard';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetAlbumsDto } from './dto/get.albums.dto';
import { AlbumResult } from './results/album.result';
import { GetAlbumsRandomDto } from './dto/get.album.random.dto';

// @UseGuards(AccessTokenGuard)
@ApiTags('Albums')
@Controller({
	path: 'album',
	version: '1',
})
export class AlbumsController {
	constructor(private readonly albumsService: AlbumsService) {}

	@ApiOkResponse({ type: AlbumResult, isArray: true })
	@HttpCode(HttpStatus.OK)
	@Get()
	findAll(@Body() getAlbumsDto: GetAlbumsDto): Promise<AlbumResult[]> {
		return this.albumsService.findAll(getAlbumsDto);
	}

	//! Se mapea primero las que puedan llegar a confundirse con otras
	//! Ejemplo: /song/:id con /song/random, si esta primero la de :id a random lo tomara como valor
	@ApiOkResponse({ type: AlbumResult, isArray: true })
	@Get('random')
	getRandomAlbums(
		@Body() getAlbumsRandomDto: GetAlbumsRandomDto,
	): Promise<AlbumResult[]> {
		return this.albumsService.getRandomAlbums(getAlbumsRandomDto);
	}

	@ApiOkResponse({ type: AlbumResult })
	@HttpCode(HttpStatus.OK)
	@Get(':id')
	findById(@Param('id', ParseIntPipe) id: number): Promise<AlbumResult> {
		return this.albumsService.findById(id);
	}

	@ApiOkResponse({ type: AlbumResult })
	@HttpCode(HttpStatus.OK)
	@Get('/song/:id')
	findAlbumBySongId(
		@Param('id', ParseIntPipe) idSong: number,
	): Promise<AlbumResult> {
		return this.albumsService.findAlbumBySongId(idSong);
	}
}
