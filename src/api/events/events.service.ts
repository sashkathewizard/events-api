import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { EventRepository } from '../../database/repos/event.repo';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventEntity } from '../../database/entities/event.entity';

@Injectable()
export class EventsService {
  constructor(private readonly eventRepository: EventRepository) {}

  async create(
    createEventDto: CreateEventDto,
    userId: string,
  ): Promise<EventEntity> {
    return this.eventRepository.create({
      ...createEventDto,
      creator: {
        connect: { id: userId },
      },
    });
  }

  async findAll(): Promise<EventEntity[]> {
    return this.eventRepository.findAll();
  }

  async findOne(id: string): Promise<EventEntity> {
    const event = await this.eventRepository.findOneById(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async update(
    id: string,
    updateEventDto: UpdateEventDto,
  ): Promise<EventEntity> {
    const event = await this.eventRepository.findOneById(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return this.eventRepository.update(id, updateEventDto);
  }

  async remove(id: string, userId: string): Promise<void> {
    const event = await this.eventRepository.findOneById(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    if (event.creatorId !== userId) {
      throw new HttpException('You are not allowed to delete this event', 403);
    }
    await this.eventRepository.remove(id);
  }

  async findUserEvents(userId: string): Promise<EventEntity[]> {
    return this.eventRepository.findUserEvents(userId);
  }

  async findUserParticipatingEvents(userId: string): Promise<EventEntity[]> {
    return this.eventRepository.findUserParticipatingEvents(userId);
  }
}
