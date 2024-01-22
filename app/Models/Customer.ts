import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Customer extends BaseModel {
	constructor(email: string, cpf: string) {
		super()
		this.email = email
		this.cpf = cpf
	}

	@column({ isPrimary: true })
	public id: number

	@column()
	public email: string

	@column()
	public cpf: string

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime
}
