import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { Joke } from './entities/jokes.entity';
import { CreateJokeDto } from './dto/create-joke.dto';

@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Get()
  async findAll(): Promise<Joke[]> {
    return this.jokesService.findAll();
  }

  @Get('types')
  async findAllTypes() {
    return this.jokesService.findAllTypes();
  }

  @Post()
  async create(@Body() createJokeDto: CreateJokeDto): Promise<Joke> {
    return this.jokesService.create(createJokeDto);
  }
}
