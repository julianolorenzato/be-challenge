import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
	protected tableName = 'products'

	public async up() {
		this.schema.createTable(this.tableName, table => {
			table.increments('id', { primaryKey: true })
			table.string('name').notNullable()
			table.string('description').notNullable()
			table.float('price').notNullable()
			table.integer('quantity_in_stock').unsigned().notNullable()

			/**
			 * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
			 */
			table.timestamp('created_at', { useTz: true })
			table.timestamp('updated_at', { useTz: true })
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
