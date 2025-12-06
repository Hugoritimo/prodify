import { BaseEntity } from 'src/core/entities';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_stats')
export class UserStatsEntity extends BaseEntity {
  @OneToOne(() => UserEntity, (user) => user.stats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ default: 0 })
  totalTasks: number;

  @Column({ default: 0 })
  completedTasks: number;

  @Column({ default: 0 })
  currentStreak: number;

  @Column({ default: 0 })
  longestStreak: number;

  @Column({ default: 0 })
  points: number;

  @Column({ type: 'date', nullable: true })
  lastActivityDate: Date;
}
