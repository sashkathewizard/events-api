import { Injectable } from '@nestjs/common';
import { ParticipantEntity } from '../entities/participant.entity';
import { PrismaService } from '../prisma.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class ParticipantRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    participantData: Prisma.ParticipantCreateInput,
  ): Promise<ParticipantEntity> {
    return this.prisma.participant.create({
      data: {
        ...participantData,
      },
    });
  }

  async findOneBy(
    where: Prisma.ParticipantWhereInput,
  ): Promise<ParticipantEntity | null> {
    return this.prisma.participant.findFirst({
      where,
    });
  }

  async findOneById(id: string): Promise<ParticipantEntity | null> {
    return this.prisma.participant.findFirst({
      where: { id },
    });
  }

  async findAllByEventId(eventId: string): Promise<ParticipantEntity[]> {
    return this.prisma.participant.findMany({
      where: { eventId },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.participant.delete({
      where: { id },
    });
  }

  async removeByEventAndUser(eventId: string, userId: string): Promise<void> {
    const participant = await this.prisma.participant.findFirst({
      where: {
        eventId,
        userId,
      },
    });

    if (participant) {
      await this.prisma.participant.delete({
        where: { id: participant.id },
      });
    }
  }
}
