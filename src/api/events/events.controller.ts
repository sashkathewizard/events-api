import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventEntity } from '../../database/entities/event.entity';
import { JwtAuthGuard } from 'src/security/guards/jwt-auth.guard';
import { RolesGuard } from 'src/security/guards/roles.guard';
import { Roles } from 'src/security/decorators/roles.decorator';
import { Role } from 'src/utils/enums/role.enum';
import { CurrentUser } from 'src/security/decorators/current-user.decorator';
import { UserEntity } from 'src/database/entities/user.entity';

@ApiTags('events')
@Controller('events')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({
    status: 201,
    description: 'Event successfully created',
    type: EventEntity,
  })
  create(
    @Body() createEventDto: CreateEventDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.eventsService.create(createEventDto, user.id);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({
    status: 200,
    description: 'List of events',
    type: [EventEntity],
  })
  findAll() {
    return this.eventsService.findAll();
  }

  @Get('my')
  @ApiOperation({ summary: 'Get events created by the user' })
  @ApiResponse({
    status: 200,
    description: `List of user's events`,
    type: [EventEntity],
  })
  findUserEvents(@CurrentUser() user: UserEntity) {
    return this.eventsService.findUserEvents(user.id);
  }

  @Get('participating')
  @ApiOperation({ summary: 'Get events where user is a participant' })
  @ApiResponse({
    status: 200,
    description: 'List of events with user participation',
    type: [EventEntity],
  })
  findUserParticipatingEvents(@CurrentUser() user: UserEntity) {
    return this.eventsService.findUserParticipatingEvents(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific event' })
  @ApiResponse({
    status: 200,
    description: 'Event found',
    type: EventEntity,
  })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an event' })
  @ApiResponse({
    status: 200,
    description: 'Event successfully updated',
    type: EventEntity,
  })
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an event' })
  @ApiResponse({ status: 200, description: 'Event successfully deleted' })
  remove(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.eventsService.remove(id, user.id);
  }
}
