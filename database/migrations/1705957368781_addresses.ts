import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
	protected tableName = 'addresses'

	public async up() {
		this.schema.createTable(this.tableName, table => {
			table.increments('id', { primaryKey: true })
			table.string('cep').notNullable()
			table.string('number').notNullable()
			table.string('street').notNullable()
			table.string('neighborhood').notNullable()
			table.string('complement').nullable()
			table.string('city').notNullable()
			table.string('country').notNullable()
			table
				.integer('customer_id')
				.unsigned()
				.references('customers.id')
				.notNullable()
				.unique()
				.onDelete('cascade')

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
