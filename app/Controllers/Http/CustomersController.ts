import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'
import Database from '@ioc:Adonis/Lucid/Database'
import CreateCustomerValidator from 'App/Validators/CreateCustomerValidator'

export default class CustomersController {
	public async index({}: HttpContextContract) {
		const customers = await Database.transaction(async trx => {
			return await trx.query().select('*').from('customers').orderBy('id')
		})

		return customers
	}

	public async store({ request }: HttpContextContract) {
		const payload = await request.validate(CreateCustomerValidator)

		const { email, cpf } = payload

		const customer = new Customer(email, cpf)
		await customer.save()

		return customer.toJSON()
	}

	public async show({}: HttpContextContract) {}

	public async update({}: HttpContextContract) {}

	public async destroy({}: HttpContextContract) {}
}
