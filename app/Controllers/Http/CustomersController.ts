import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'
import Database from '@ioc:Adonis/Lucid/Database'
import CreateCustomerValidator from 'App/Validators/CreateCustomerValidator'

export default class CustomersController {
	public async index({}: HttpContextContract) {
		return await Customer.query()
			.preload('address')
			.preload('phone')
			.orderBy('id')

		// return costumers.map(costumer =>
		// 	costumer.serialize({
		// 		relations: {
		// 			address: {
		// 				fields: {
		// 					pick: [
		// 						'cep',
		// 						'number',
		// 						'street',
		// 						'complement',
		// 						'neighborhood',
		// 						'city',
		// 						'country'
		// 					]
		// 				}
		// 			},
		// 			phone: {
		// 				fields: {
		// 					pick: ['number']
		// 				}
		// 			}
		// 		}
		// 	})
		// )
	}

	public async store({ request }: HttpContextContract) {
		const { email, cpf, address, phone } = await request.validate(
			CreateCustomerValidator
		)

		const exists = await Customer.findBy('cpf', cpf)
		if (exists && !exists.$isDeleted) {
			return { error: 'Este cpf já foi cadastrato' }
		}

		return await Database.transaction(async trx => {
			const customer = new Customer()
				.fill({ email, cpf })
				.useTransaction(trx)

			await customer.save()
			await customer.related('address').create(address)
			await customer.related('phone').create({ number: phone })

			return customer
		})
	}

	public async show({}: HttpContextContract) {}

	public async update({}: HttpContextContract) {}

	public async destroy({ params: { id } }: HttpContextContract) {
		if (!id) {
			return { error: 'Informe o id do cliente' }
		}

		const customer = await Customer.find(id)
		if (!customer || customer.$isDeleted) {
			return { error: 'Este cliente não existe ou já foi deletado' }
		}

		await customer.delete()
	}
}
