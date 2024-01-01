import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
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

  @Column({ type: 'int' })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'enum', enum: ['booked', 'refunded'], default: 'booked' })
  status: 'booked' | 'refunded';

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Schedule)
  @JoinColumn({ name: 'scheduleId' })
  schedule: Schedule;
}
