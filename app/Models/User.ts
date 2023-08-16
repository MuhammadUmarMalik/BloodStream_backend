import { DateTime } from 'luxon'
// import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel ,HasMany,hasMany} from '@ioc:Adonis/Lucid/Orm'
import Donation from './Donation';
import Post from './Request';
import Review from './Review';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string
  
  @column()
  public blood_group:string

  @column()
  public phone_number:string

  @column()
  public latitude:number

  @column()
  public longitude:number

  @column()
  public enable_request:boolean

  @column()
  public email: string

  @column()
  public provider_id:string

  @column()
  public provider:string



  @column()
  public rememberMeToken: string | null

  //relationship between migrations
  
  @hasMany(() => Donation, {
    foreignKey: 'donor_id',
  })
  public donationsGiven: HasMany<typeof Donation>;

  @hasMany(() => Donation, {
    foreignKey: 'recipient_id',
  })
  public donationsReceived: HasMany<typeof Donation>;

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>;

  @hasMany(() => Review, {
    foreignKey: 'user_id',
  })
  public reviewsGiven: HasMany<typeof Review>;

  @hasMany(() => Review, {
    foreignKey: 'recipient_id',
  })
  public reviewsReceived: HasMany<typeof Review>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // @beforeSave()
  // public static async hashPassword (user: User) {
  //   if (user.$dirty.password) {
  //     user.password = await Hash.make(user.password)
  //   }
  // }

  
}
