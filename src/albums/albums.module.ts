import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';

@Module({
  providers: [AlbumsService],
  exports: [AlbumsService],
  controllers: [AlbumsController],
})
export class AlbumsModule {}
