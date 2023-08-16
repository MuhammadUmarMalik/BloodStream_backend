import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import User from './User';

export default class Donation extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public donor_id: number;

  @column()
  public recipient_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User, {
    foreignKey: 'donor_id',
  })
  public donor: BelongsTo<typeof User>;

  @belongsTo(() => User, {
    foreignKey: 'recipient_id',
  })
  public recipient: BelongsTo<typeof User>;
}
