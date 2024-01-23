import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'
import Database from '@ioc:Adonis/Lucid/Database'
import CreateCustomerValidator from 'App/Validators/CreateCustomerValidator'
import UpdateCostumerValidator from 'App/Validators/UpdateCostumerValidator'

export default class CustomersController {
	public async index({}: HttpContextContract) {
		return await Customer.query()
			.preload('address')
			.preload('phone')
			.orderBy('id')
	}

	public async store({ request, response }: HttpContextContract) {
		const { email, cpf, address, phone } = await request.validate(
			CreateCustomerValidator
		)

		const exists = await Customer.findBy('cpf', cpf)
		if (exists && !exists.$isDeleted) {
			response.status(400)
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

	public async show({ response, params: { id } }: HttpContextContract) {
		if (!id) {
			response.status(400)
			return { error: 'Informe o id do cliente' }
		}

		const customer = await Customer.find(id)
		if (!customer || customer.$isDeleted) {
			response.status(400)
			return { error: 'Este cliente não existe ou já foi deletado' }
		}

		return await Customer.query().where({ id }).preload('sales')
	}

	public async update({
		request,
		response,
		params: { id }
	}: HttpContextContract) {
		if (!id) {
			response.status(400)
			return { error: 'Informe o id do cliente' }
		}

		const customer = await Customer.find(id)
		if (!customer || customer.$isDeleted) {
			response.status(400)
			return { error: 'Este cliente não existe ou já foi deletado' }
		}

		const { cpf, email, address, phone } = await request.validate(
			UpdateCostumerValidator
		)

		const maybeCustomer = await Customer.findBy('cpf', cpf)
		if (maybeCustomer && maybeCustomer.id != id) {
			response.status(400)
			return { error: 'Este cpf já esta cadastrado no nosso sistema' }
		}

		return await Database.transaction(async trx => {
			customer.merge({ cpf, email }).useTransaction(trx)

			await customer.related('address').updateOrCreate({}, { ...address })
			await customer
				.related('phone')
				.updateOrCreate({}, { number: phone })
			await customer.save()

			return customer
		})
	}

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
