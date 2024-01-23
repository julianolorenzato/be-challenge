import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Customer from 'App/Models/Customer'
import Product from 'App/Models/Product'
import Sale from 'App/Models/Sale'
import RegisterSaleValidator from 'App/Validators/RegisterSaleValidator'

export default class SalesController {
	public async register({ request, response }: HttpContextContract) {
		const { customerId, productId, quantity } = await request.validate(
			RegisterSaleValidator
		)

		const product = await Product.find(productId)
		if (!product) {
			response.status(404)
			return { error: 'O produto não existe ou já foi deletado' }
		}

		const customer = await Customer.find(customerId)
		if (!customer) {
			response.status(404)
			return { error: 'O cliente não existe ou já foi deletado' }
		}

		if (product.quantityInStock < quantity) {
			return {
				error: 'Não existem produtos suficientes no estoque para realizar esta venda'
			}
		}

		return await Database.transaction(async trx => {
			const sale = new Sale()
				.fill({
					customerId,
					productId,
					quantity,
					unitPrice: product.price,
					totalPrice: product.price * quantity
				})
				.useTransaction(trx)

			product.useTransaction(trx)
			product.quantityInStock -= quantity

			await product.save()
			return await sale.save()
		})
	}
}
