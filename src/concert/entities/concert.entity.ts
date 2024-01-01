import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity({
  name: 'concerts',
})
export class Concert {
  @PrimaryGeneratedColumn()
  concertId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User; // userId를 참조하는 User 객체

  @Column({ type: 'varchar', nullable: false })
  category: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({
    type: 'varchar',
    default:
      'https://img.khan.co.kr/news/2023/05/02/news-p.v1.20230501.5bd1efe8dc5e47d6a7c3af0f3b1eb81d_P1.webp',
  })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
