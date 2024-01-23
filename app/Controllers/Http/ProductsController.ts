import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Product from 'App/Models/Product'
import CreateProductValidator from 'App/Validators/CreateProductValidator'
import UpdateProductValidator from 'App/Validators/UpdateProductValidator'

export default class ProductsController {
	public async index({}: HttpContextContract) {
		return await Product.query().orderBy('name')
	}

	public async store({ request }: HttpContextContract) {
		const payload = await request.validate(CreateProductValidator)
		return await Product.create(payload)
	}

	public async show({ response, params: { id } }: HttpContextContract) {
		if (!id) {
			response.status(400)
			return { error: 'Informe o id do produto' }
		}

		const product = await Product.find(id)
		if (!product || product.$isDeleted) {
			response.status(400)
			return { error: 'Este produto não existe ou já foi deletado' }
		}

		return product
	}

	public async update({
		request,
		response,
		params: { id }
	}: HttpContextContract) {
		if (!id) {
			response.status(400)
			return { error: 'Informe o id do produto' }
		}

		const product = await Product.find(id)
		if (!product || product.$isDeleted) {
			response.status(400)
			return { error: 'Este produto não existe ou já foi deletado' }
		}

		const payload = await request.validate(UpdateProductValidator)
		product.merge(payload)

		return await product.save()
	}

	public async destroy({ response, params: { id } }: HttpContextContract) {
		if (!id) {
			response.status(400)
			return { error: 'Informe o id do produto' }
		}

		const product = await Product.find(id)
		if (!product || product.$isDeleted) {
			response.status(400)
			return { error: 'Este produto não existe ou já foi deletado' }
		}

		await product.delete()
	}
}
