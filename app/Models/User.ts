import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel ,HasMany,hasMany, manyToMany,ManyToMany} from '@ioc:Adonis/Lucid/Orm'
// import Donation from './Donation';

export default class User extends BaseModel {




  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string

  @column()
  public gender:string

  @column()
  public blood_group:string

  @column()
  public phone_number:string

  @column()
  public address:string

  @column()
  public city:string

  @column()
  public enable_request:boolean

  @column()
  public donation_date:DateTime
  
  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public provider_id:string

  @column()
  public provider:string

  @column()
  public rememberMeToken: string | null

  
  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
  //relationship between migrations
  
 
@manyToMany(() => User, {
  localKey: 'id',
  pivotForeignKey: 'user_id',
  relatedKey: 'id',
  pivotRelatedForeignKey: 'donor_id',
})

public donation: ManyToMany<typeof User>



  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
}
