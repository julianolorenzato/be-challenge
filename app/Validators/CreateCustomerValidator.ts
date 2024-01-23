import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCustomerValidator {
	constructor(protected ctx: HttpContextContract) {}

	/*
	 * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
	 *
	 * For example:
	 * 1. The username must be of data type string. But then also, it should
	 *    not contain special characters or numbers.
	 *    ```
	 *     schema.string([ rules.alpha() ])
	 *    ```
	 *
	 * 2. The email must be of data type string, formatted as a valid
	 *    email. But also, not used by any other user.
	 *    ```
	 *     schema.string([
	 *       rules.email(),
	 *       rules.unique({ table: 'users', column: 'email' }),
	 *     ])
	 *    ```
	 */
	public schema = schema.create({
		email: schema.string({}, [rules.email(), rules.maxLength(255)]),
		cpf: schema.string({}, [rules.regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)]), // xxx.xxx.xxx-xx
		address: schema.object().members({
			cep: schema.string({}, [rules.regex(/\d{5}-\d{3}/)]), // xxxxx-xxx
			number: schema.number(),
			street: schema.string({}, [rules.maxLength(500)]),
			neighborhood: schema.string({}, [rules.maxLength(200)]),
			complement: schema.string.optional({}, [rules.maxLength(500)]),
			city: schema.string({}, [rules.maxLength(300)]),
			country: schema.string({}, [rules.maxLength(100)])
		}),
		phone: schema.string({}, [
			rules.regex(
				/^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/
			) // xx, xxxxx xxxx, xx xxxx xxxx, xxxx xxxx, xxxxx xxxx com ou sem espaços
		])
	})

	/**
	 * Custom messages for validation failures. You can make use of dot notation `(.)`
	 * for targeting nested fields and array expressions `(*)` for targeting all
	 * children of an array. For example:
	 *
	 * {
	 *   'profile.username.required': 'Username is required',
	 *   'scores.*.number': 'Define scores as valid numbers'
	 * }
	 *
	 */
	public messages: CustomMessages = {}
}
