import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Joke } from './entities/jokes.entity';
import { CreateJokeDto } from './dto/create-joke.dto';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class JokesService {
  constructor(
    @InjectRepository(Joke) private readonly jokesRepository: Repository<Joke>,
    private readonly httpService: HttpService,
  ) {}

  async findAll(): Promise<Joke[]> {
    return this.jokesRepository.find();
  }

  async findAllTypes(): Promise<string[]> {
    try {
      const response = await lastValueFrom(
        this.httpService.get<string[]>(process.env.SUBMIT_JOKES_URL),
      );
      return response.data;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error retrieving joke types: ${error.message}`,
      );
    }
  }

  async create(createJokeDto: CreateJokeDto): Promise<Joke> {
    const joke = this.jokesRepository.create(createJokeDto);
    try {
      return await this.jokesRepository.save(joke);
    } catch (error) {
      throw new InternalServerErrorException('Could not save the joke.');
    }
  }
}
