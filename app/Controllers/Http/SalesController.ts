import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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

		return await Sale.create({
			customerId,
			productId,
			quantity,
			unitPrice: product.price,
			totalPrice: product.price * quantity
		})
	}
}
