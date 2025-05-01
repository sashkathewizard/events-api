import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsInt, Min, IsOptional } from 'class-validator';

export class UpdateEventDto {
  @ApiProperty({ description: 'Event name', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Event description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Event date', required: false })
  @IsDate()
  @IsOptional()
  date?: Date;

  @ApiProperty({ description: 'Event location', required: false })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({
    description: 'Maximum number of participants',
    required: false,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  maxParticipants?: number;
}
