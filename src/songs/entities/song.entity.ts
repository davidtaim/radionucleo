import { Song } from "@prisma/client";

export class SongEntity implements Song {
    id: number;
    idAlbum: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
