import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'

export default class Address extends BaseModel {
	@column({ isPrimary: true, serializeAs: null })
	public id: number

	@column()
	public cep: string

	@column()
	public number: number

	@column()
	public street: string

	@column()
	public neighborhood: string

	@column()
	public complement: string

	@column()
	public city: string

	@column()
	public country: string

	@column({ serializeAs: null })
	public customerId: number

	@belongsTo(() => Customer)
	public customer: BelongsTo<typeof Customer>

	@column.dateTime({ autoCreate: true, serializeAs: null })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
	public updatedAt: DateTime
}
