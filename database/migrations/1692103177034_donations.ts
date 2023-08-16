import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'donations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('donation_id').primary()
      table.integer('donor_id').unsigned().references('users.id').notNullable()
      table.integer('recipient_id').unsigned().references('users.id').notNullable()
      table.timestamp('donation_date',{useTz:true}).notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
