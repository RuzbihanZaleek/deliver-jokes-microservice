import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { Joke } from './entities/jokes.entity';
import { CreateJokeDto } from './dto/create-joke.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JOKE_DELIVERY_MESSAGES } from 'src/constants';

@ApiTags('deliver-jokes')
@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all deliver jokes' })
  @ApiResponse({
    status: 200,
    description: JOKE_DELIVERY_MESSAGES.FETCH_SUCCESS,
  })
  @ApiResponse({ status: 500, description: JOKE_DELIVERY_MESSAGES.FETCH_ERROR })
  async findAll(): Promise<Joke[]> {
    return this.jokesService.findAll();
  }

  @Get('types')
  @ApiOperation({ summary: 'Get jokes types from submit jokes microservice' })
  @ApiResponse({
    status: 200,
    description: JOKE_DELIVERY_MESSAGES.FETCH_TYPES_SUCCESS,
  })
  @ApiResponse({
    status: 500,
    description: JOKE_DELIVERY_MESSAGES.FETCH_TYPES_ERROR,
  })
  async findAllTypes() {
    return this.jokesService.findAllTypes();
  }

  @Get('types/:type')
  @ApiOperation({ summary: 'Get deliver jokes by joke type' })
  @ApiResponse({
    status: 200,
    description: JOKE_DELIVERY_MESSAGES.FETCH_BY_TYPE_SUCCESS,
  })
  @ApiResponse({
    status: 500,
    description: JOKE_DELIVERY_MESSAGES.FETCH_BY_TYPE_ERROR,
  })
  async findByType(@Param('type') type: string): Promise<Joke[]> {
    return this.jokesService.findByType(type);
  }

  @Post()
  @ApiOperation({ summary: 'Create deliver joke' })
  @ApiResponse({
    status: 201,
    description: JOKE_DELIVERY_MESSAGES.CREATE_SUCCESS,
  })
  @ApiResponse({
    status: 409,
    description: JOKE_DELIVERY_MESSAGES.CREATE_CONFLICT,
  })
  @ApiResponse({
    status: 500,
    description: JOKE_DELIVERY_MESSAGES.CREATE_ERROR,
  })
  async create(@Body() createJokeDto: CreateJokeDto): Promise<Joke> {
    return this.jokesService.create(createJokeDto);
  }
}
