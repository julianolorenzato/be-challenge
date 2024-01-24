import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import LoginUserValidator from 'App/Validators/LoginUserValidator'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'

export default class UsersController {
	public async login({ request, response }: HttpContextContract) {
		const { email, password } = await request.validate(LoginUserValidator)

		const user = await User.findBy('email', email)
		if (!user) {
			return response.badRequest({ error: 'Credenciais inválidas' })
		}

		if (!(await Hash.verify(user.password, password))) {
			return response.badGateway({ error: 'Credenciais inválidas' })
		}

		const token = jwt.sign({}, Env.get('SECRET_KEY'), {
			subject: user.id.toString(),
			expiresIn: '1d'
		})

		return { token }
	}

	public async signup({ request, response }: HttpContextContract) {
		const { email, password, passwordConfirmation } =
			await request.validate(RegisterUserValidator)

		if (password != passwordConfirmation) {
			return response.badRequest({ error: 'As senhas não são iguais' })
		}

		const emailAlreadyExists = await User.findBy('email', email)
		if (emailAlreadyExists) {
			return response.badRequest({
				error: 'Já existe um usuário com este email'
			})
		}

		return await User.create({ email, password })
	}
}
