import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import jwt from 'jsonwebtoken'

export default class Auth {
	public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
		const splitted = ctx.request.header('Authorization')?.split(' ')
		if (!splitted) {
			return ctx.response.badRequest({
				error: 'Utilize um token de acesso no header Authorization'
			})
		}

		const [_, token] = splitted

		if (!token) {
			return ctx.response.badRequest({
				error: 'Utilize um token de acesso no header Authorization'
			})
		}

		try {
			const { sub } = jwt.verify(token, Env.get('SECRET_KEY'))
			ctx.sub = sub
		} catch (error) {
			return ctx.response.unauthorized({
				error: 'Somente usuários autenticados podem acessar esta rota'
			})
		}

		await next()
	}
}
