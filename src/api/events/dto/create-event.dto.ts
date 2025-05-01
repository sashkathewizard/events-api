import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ description: 'Event name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Event description' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Event date' })
  date: Date;

  @ApiProperty({ description: 'Event location' })
  @IsString()
  location: string;

  @ApiProperty({ description: 'Maximum number of participants' })
  @IsInt()
  @Min(1)
  maxParticipants: number;
}
