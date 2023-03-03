import { ApiProperty, PartialType } from "@nestjs/swagger";
import { SongEntity } from "../entities/song.entity";

export class SongResult extends PartialType(SongEntity) {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
}