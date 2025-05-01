import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ParticipantRepository } from '../../database/repos/participant.repo';
import { EventRepository } from '../../database/repos/event.repo';
import { ParticipantDto } from './dto/participant.dto';
import { ParticipantEntity } from '../../database/entities/participant.entity';

@Injectable()
export class ParticipantsService {
  constructor(
    private readonly participantRepository: ParticipantRepository,
    private readonly eventRepository: EventRepository,
  ) {}

  async register(
    eventId: string,
    participantDto: ParticipantDto,
  ): Promise<ParticipantEntity> {
    const event = await this.eventRepository.findOneById(eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const participants =
      await this.participantRepository.findAllByEventId(eventId);
    if (participants.length >= event.maxParticipants) {
      throw new BadRequestException('Reached max count of members');
    }

    const existingParticipant = await this.participantRepository.findOneBy({
      eventId,
      userId: participantDto.userId,
    });

    if (existingParticipant) {
      throw new BadRequestException('User already registered for this event');
    }

    return this.participantRepository.create({
      user: {
        connect: { id: participantDto.userId },
      },
      event: {
        connect: { id: eventId },
      },
    });
  }

  async unregister(eventId: string, userId: string): Promise<void> {
    const event = await this.eventRepository.findOneById(eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }

    await this.participantRepository.removeByEventAndUser(eventId, userId);
  }

  async findAllByEventId(eventId: string): Promise<ParticipantEntity[]> {
    const event = await this.eventRepository.findOneById(eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return this.participantRepository.findAllByEventId(eventId);
  }
}
