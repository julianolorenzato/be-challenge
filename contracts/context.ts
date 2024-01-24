declare module '@ioc:Adonis/Core/HttpContext' {
	interface HttpContextContract {
		sub?: string | (() => string)
	}
}
