import { AlbumsService } from './albums.service';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus, Param,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from '../common/guards/access-token.guard';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AlbumEntity } from './entities/album.entity';
import { GetAlbumsDto } from './dto/get-albums.dto';

@UseGuards(AccessTokenGuard)
@ApiTags('Albums')
@Controller({
  path: 'albums',
  version: '1',
})
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @ApiOkResponse({ type: AlbumEntity, isArray: true })
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Param() getAlbumsDto: GetAlbumsDto) {
    return this.albumsService.findAll(getAlbumsDto);
  }
}
