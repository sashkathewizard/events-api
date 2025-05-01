import { UserEntity } from './user.entity';
import { EventEntity } from './event.entity';

export class ParticipantEntity {
  id: string;
  userId: string;
  eventId: string;
  user?: UserEntity;
  event?: EventEntity;
  createdAt: Date;
  updatedAt: Date;
}
