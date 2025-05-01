import { UserEntity } from './user.entity';

export class EventEntity {
  id: string;
  name: string;
  description: string;
  date: Date;
  location: string;
  maxParticipants: number;
  creatorId: string;
  creator?: UserEntity;
  createdAt: Date;
  updatedAt: Date;
}
