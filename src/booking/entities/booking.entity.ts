import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
// 엔티티 정의후 다시 import { Schedule } from 'src/schedule/entities/schedule.entity';

@Entity('Booking')
export class Booking {
  @PrimaryGeneratedColumn()
  bookingId: number;

  @Column()
  userId: number;

  @Column()
  scheduleId: number;

  @Column()
  seatNum: number;

  @Column()
  grade: string;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  updatedAt: Date;

  @Column({ type: 'enum', enum: ['buy', 'refund'] })
  status: 'buy' | 'refund';

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  //@ManyToOne(() => Schedule)
  //@JoinColumn({ name: 'scheduleId' })
  //schedule: Schedule;
}
