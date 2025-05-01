import { Injectable } from '@nestjs/common';
import { EventEntity } from '../entities/event.entity';
import { PrismaService } from '../prisma.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class EventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(eventData: Prisma.EventCreateInput): Promise<EventEntity> {
    return this.prisma.event.create({
      data: {
        ...eventData,
      },
    });
  }

  async findOneBy(where: Prisma.EventWhereInput): Promise<EventEntity | null> {
    return this.prisma.event.findFirst({
      where,
    });
  }

  async findOneById(id: string): Promise<EventEntity | null> {
    return this.prisma.event.findFirst({
      where: { id },
    });
  }

  async findAll(): Promise<EventEntity[]> {
    return this.prisma.event.findMany();
  }

  async update(
    id: string,
    eventData: Prisma.EventUpdateInput,
  ): Promise<EventEntity> {
    return this.prisma.event.update({
      where: { id },
      data: eventData,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.event.delete({
      where: { id },
    });
  }

  async findUserEvents(userId: string): Promise<EventEntity[]> {
    return this.prisma.event.findMany({
      where: { creatorId: userId },
    });
  }

  async findUserParticipatingEvents(userId: string): Promise<EventEntity[]> {
    return this.prisma.event.findMany({
      where: {
        participants: {
          some: {
            userId,
          },
        },
      },
    });
  }
}
