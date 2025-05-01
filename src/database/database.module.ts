import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from './repos/user.repo';
import { EventRepository } from './repos/event.repo';
import { ParticipantRepository } from './repos/participant.repo';
import { PrismaService } from './prisma.service';
import { AdminSeeder } from './seeders/admin.seeder';

@Module({
  imports: [ConfigModule],
  providers: [
    PrismaService,
    UserRepository,
    EventRepository,
    ParticipantRepository,
    AdminSeeder,
  ],
  exports: [
    UserRepository,
    EventRepository,
    ParticipantRepository,
    AdminSeeder,
  ],
})
export class DatabaseModule {}
