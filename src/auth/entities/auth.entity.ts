import { ApiProperty } from '@nestjs/swagger';
import { AuthDto } from '../dto';

export class AuthEntity {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
}
