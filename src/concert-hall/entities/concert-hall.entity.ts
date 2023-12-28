import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Schedule } from 'src/schedule/entities/schedule.entity'; // 필요한 경우 Schedule 엔티티 import

@Entity({ name: 'concert-halls' })
export class ConcertHall {
  @PrimaryGeneratedColumn()
  hallId: number;

  @Column({ type: 'varchar', nullable: false })
  hallName: string;

  @Column({ type: 'int', nullable: true })
  gradeS: number | null;

  @Column({ type: 'int', nullable: true })
  gradeA: number | null;

  @Column({ type: 'int', nullable: true })
  gradeB: number | null;

  @Column({ type: 'datetime', nullable: false })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: false })
  updatedAt: Date;

  // ConcertHall과 Schedule 사이의 관계 설정 (필요한 경우)
  @OneToMany(() => Schedule, (schedule) => schedule.concertHall)
  schedules: Schedule[];
}
