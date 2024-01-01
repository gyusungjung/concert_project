// src/schedule/entities/schedule.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Concert } from 'src/concert/entities/concert.entity';
import { ConcertHall } from 'src/concert-hall/entities/concert-hall.entity';
import { Booking } from 'src/booking/entities/booking.entity';

@Entity({ name: 'schedules' })
export class Schedule {
  @PrimaryGeneratedColumn()
  scheduleId: number;

  @ManyToOne(() => ConcertHall)
  @JoinColumn({ name: 'hallId' })
  concertHall: ConcertHall;

  @ManyToOne(() => Concert)
  @JoinColumn({ name: 'concertId' })
  concert: Concert;

  @Column({ type: 'datetime' })
  startAt: Date;

  @Column({ type: 'int', nullable: true })
  priceS: number | null;

  @Column({ type: 'int', nullable: true })
  priceA: number | null;

  @Column({ type: 'int', nullable: true })
  priceB: number | null;

  @Column({ type: 'enum', enum: ['Sold_out', 'On_sale'] })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Booking, (booking) => booking.scheduleId)
  bookings: Booking[];
}
