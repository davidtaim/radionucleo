import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AlbumsModule } from './albums/albums.module';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
	imports: [
		AuthModule,
		UsersModule,
		PrismaModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		AlbumsModule,
		SongsModule,
	],
	providers: [PrismaService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
