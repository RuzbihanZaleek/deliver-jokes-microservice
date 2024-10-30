import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('jokes')
export class Joke {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  type: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
