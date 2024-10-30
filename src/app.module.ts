import { Module } from '@nestjs/common';
import { JokesModule } from './jokes/jokes.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    JokesModule,
  ],
})
export class AppModule {}
