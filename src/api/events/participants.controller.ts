import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ParticipantsService } from './participants.service';
import { ParticipantDto } from './dto/participant.dto';
import { ParticipantEntity } from '../../database/entities/participant.entity';
import { JwtAuthGuard } from '../../security/guards/jwt-auth.guard';
import { CurrentUser } from '../../security/decorators/current-user.decorator';
import { UserEntity } from '../../database/entities/user.entity';

@ApiTags('participants')
@Controller('events/:eventId/participants')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  @ApiOperation({ summary: 'Register for an event' })
  @ApiResponse({
    status: 201,
    description: 'Successfully registered',
    type: ParticipantEntity,
  })
  register(
    @Param('eventId') eventId: string,
    @Body() participantDto: ParticipantDto,
  ) {
    return this.participantsService.register(eventId, participantDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Cancel registration' })
  @ApiResponse({
    status: 200,
    description: 'Registration successfully cancelled',
  })
  unregister(
    @Param('eventId') eventId: string,
    @CurrentUser() user: UserEntity,
  ) {
    return this.participantsService.unregister(eventId, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of event participants' })
  @ApiResponse({
    status: 200,
    description: 'List of participants',
    type: [ParticipantEntity],
  })
  findAll(@Param('eventId') eventId: string) {
    return this.participantsService.findAllByEventId(eventId);
  }
}
