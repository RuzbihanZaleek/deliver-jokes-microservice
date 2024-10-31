import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Joke } from './entities/jokes.entity';
import { CreateJokeDto } from './dto/create-joke.dto';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { JOKE_DELIVERY_MESSAGES } from 'src/constants';

@Injectable()
export class JokesService {
  constructor(
    @InjectRepository(Joke) private readonly jokesRepository: Repository<Joke>,
    private readonly httpService: HttpService,
  ) {}

  async findAll(): Promise<Joke[]> {
    try {
      return await this.jokesRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        `${JOKE_DELIVERY_MESSAGES.FETCH_ERROR} : ${error.message}`,
      );
    }
  }

  async findAllTypes(): Promise<string[]> {
    try {
      const response = await lastValueFrom(
        this.httpService.get<string[]>(process.env.SUBMIT_JOKES_URL),
      );
      return response.data;
    } catch (error) {
      throw new InternalServerErrorException(
        `${JOKE_DELIVERY_MESSAGES.FETCH_TYPES_ERROR}: ${error.message}`,
      );
    }
  }

  async findByType(type: string): Promise<Joke[]> {
    try {
      return await this.jokesRepository.find({ where: { type } });
    } catch (error) {
      throw new InternalServerErrorException(
        `${JOKE_DELIVERY_MESSAGES.FETCH_BY_TYPE_ERROR} ${type}: ${error.message}`,
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
        throw new ConflictException(JOKE_DELIVERY_MESSAGES.CREATE_CONFLICT);
      }

      // If no duplicate joke found, proceed with saving
      const joke = this.jokesRepository.create(createJokeDto);
      return await this.jokesRepository.save(joke);
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new InternalServerErrorException(
        error.message || JOKE_DELIVERY_MESSAGES.SAVE_ERROR,
      );
    }
  }
}
