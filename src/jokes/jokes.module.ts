import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JokesController } from './jokes.controller';
import { JokesService } from './jokes.service';
import { Joke } from './entities/jokes.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Joke]), HttpModule],
  controllers: [JokesController],
  providers: [JokesService],
})
export class JokesModule {}
