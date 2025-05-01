import { Module } from '@nestjs/common';
import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';
import { DatabaseModule } from '../../database/database.module';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [EventsController, ParticipantsController],
  providers: [EventsService, ParticipantsService],
  exports: [EventsService, ParticipantsService],
})
export class EventsModule {}
