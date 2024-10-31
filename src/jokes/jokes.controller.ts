import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { Joke } from './entities/jokes.entity';
import { CreateJokeDto } from './dto/create-joke.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('deliver-jokes')
@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all deliver jokes' })
  @ApiResponse({
    status: 200,
    description: 'Deliver jokes fetched successfully',
  })
  @ApiResponse({ status: 500, description: 'Error retrieving jokes' })
  async findAll(): Promise<Joke[]> {
    return this.jokesService.findAll();
  }

  @Get('types')
  @ApiOperation({ summary: 'Get jokes types from submit jokes microservice' })
  @ApiResponse({ status: 200, description: 'Jokes types fetched successfully' })
  @ApiResponse({ status: 500, description: 'Error retrieving jokes types' })
  async findAllTypes() {
    return this.jokesService.findAllTypes();
  }

  @Get('types/:type')
  @ApiOperation({ summary: 'Get deliver jokes by joke type' })
  @ApiResponse({
    status: 200,
    description: 'Deliver jokes by type fetched successfully',
  })
  @ApiResponse({ status: 500, description: 'Error retrieving jokes by type' })
  async findByType(@Param('type') type: string): Promise<Joke[]> {
    return this.jokesService.findByType(type);
  }

  @Post()
  @ApiOperation({ summary: 'Create deliver joke' })
  @ApiResponse({
    status: 201,
    description: 'Deliver joke created successfully',
  })
  @ApiResponse({ status: 409, description: 'Deliver joke already exists.' })
  @ApiResponse({ status: 500, description: 'Error creating delivery joke' })
  async create(@Body() createJokeDto: CreateJokeDto): Promise<Joke> {
    return this.jokesService.create(createJokeDto);
  }
}
