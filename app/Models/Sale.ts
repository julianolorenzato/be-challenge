import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'
import Product from './Product'

export default class Sale extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public quantity: number

	@column()
	public unitPrice: number

	@column()
	public totalPrice: number

	@column()
	public customerId: number

	@belongsTo(() => Customer)
	public customer: BelongsTo<typeof Customer>

	@column()
	public productId: number

	@belongsTo(() => Product)
	public product: BelongsTo<typeof Product>

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime
}
