import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ParticipantDto {
  @ApiProperty({ description: 'User ID' })
  @IsString()
  userId: string;
}
