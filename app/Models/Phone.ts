import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'

export default class Phone extends BaseModel {
	@column({ isPrimary: true, serializeAs: null })
	public id: number

	@column()
	public number: string

	@column({ serializeAs: null })
	public customerId: number

	@belongsTo(() => Customer)
	public customer: BelongsTo<typeof Customer>

	@column.dateTime({ autoCreate: true, serializeAs: null })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
	public updatedAt: DateTime
}
