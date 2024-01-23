import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
	protected tableName = 'sales'

	public async up() {
		this.schema.createTable(this.tableName, table => {
			table.increments('id')
			table.integer('quantity').unsigned().notNullable()
			table.float('unit_price').unsigned().notNullable()
			table.float('total_price').unsigned().notNullable()
			table
				.integer('customer_id')
				.unsigned()
				.references('customers.id')
				.notNullable()
			table
				.integer('product_id')
				.unsigned()
				.references('customers.id')
				.notNullable()

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
