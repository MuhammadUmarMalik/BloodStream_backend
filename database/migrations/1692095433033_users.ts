import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name',255)
      table.string('blood_group',255)
      table.string('Phone_number',255)
      table.decimal('latitude', 10, 7);
      table.decimal('longitude', 10, 7);
      table.boolean('enable_request')
      table.string('email', 255).notNullable().unique()
      table.string('provider');
      table.string('provider_id');
      table.string('remember_me_token').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
