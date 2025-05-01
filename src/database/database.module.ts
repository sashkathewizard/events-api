import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from './repos/user.repo';
import { EventRepository } from './repos/event.repo';
import { ParticipantRepository } from './repos/participant.repo';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule],
  providers: [
    PrismaService,
    UserRepository,
    EventRepository,
    ParticipantRepository,
  ],
  exports: [UserRepository, EventRepository, ParticipantRepository],
})
export class DatabaseModule {}
