import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './api/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database/database.module';
import { EventsModule } from './api/events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    UsersModule,
    EventsModule,
  ],
})
export class AppModule {}
