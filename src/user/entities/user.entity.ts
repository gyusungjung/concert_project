import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Concert } from 'src/concert/entities/concert.entity'; // 필요한 경우 Concert 엔티티 import

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  userName: string;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean; // 관리자 여부를 나타내는 필드, 그럼 types는 필요 없어지나?

  @Column({ type: 'int', default: 1000000 })
  point: number;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  updatedAt: Date;

  // User와 Concert 사이의 관계 설정 (필요한 경우)
  @OneToMany(() => Concert, (concert) => concert.user)
  concerts: Concert[];
}
