import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm'

export enum OrderStatus {
  Created = 'created',
  Confirmed = 'confirmed',
  Cancelled = 'cancelled',
  Delivered = 'delivered',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Created,
  })
  status: OrderStatus

  @Column({
    nullable: false,
  })
  item: string

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
  })
  price: number

  /**
   * DB insert time.
   */
  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  public createdAt: Date

  /**
   * DB last update time.
   */
  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  public updatedAt: Date
}
