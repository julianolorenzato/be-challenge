import { DateTime } from 'luxon'
import {
	BaseModel,
	HasMany,
	HasOne,
	column,
	hasMany,
	hasOne
} from '@ioc:Adonis/Lucid/Orm'
import Address from './Address'
import Phone from './Phone'
import Sale from './Sale'

export default class Customer extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public email: string

	@column()
	public cpf: string

	@hasOne(() => Address)
	public address: HasOne<typeof Address>

	@hasOne(() => Phone)
	public phone: HasOne<typeof Phone>

	@hasMany(() => Sale)
	public sales: HasMany<typeof Sale>

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime
}
