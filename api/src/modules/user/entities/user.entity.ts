import { BaseEntity } from 'src/core/entities';
import { Column, Entity, OneToOne } from 'typeorm';
import { UserStatsEntity } from './user-stats.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isPremium: boolean;

  @OneToOne(() => UserStatsEntity, (stats) => stats.user, { cascade: true })
  stats: UserStatsEntity;
}
