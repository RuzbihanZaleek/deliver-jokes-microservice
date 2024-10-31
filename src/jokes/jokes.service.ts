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

  async findByType(type: string): Promise<Joke[]> {
    try {
      return await this.jokesRepository.find({ where: { type } });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error retrieving jokes of type ${type}: ${error.message}`,
      );
    }
  }

  async create(createJokeDto: CreateJokeDto): Promise<Joke> {
    try {
      // Check if the joke already exists
      const existingJoke = await this.jokesRepository.findOne({
        where: { content: createJokeDto.content },
      });

      if (existingJoke) {
        throw new InternalServerErrorException('Joke already exists.');
      }

      // If no duplicate joke found, proceed with saving
      const joke = this.jokesRepository.create(createJokeDto);
      return await this.jokesRepository.save(joke);
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Could not save the joke.',
      );
    }
  }
}
