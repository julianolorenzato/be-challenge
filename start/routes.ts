/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

const checkIsNumber = Route.matchers.number()

Route.post('/login', 'UsersController.login')
Route.post('/signup', 'UsersController.signup')

Route.resource('customers', 'CustomersController')
	.apiOnly()
	.where('id', checkIsNumber)
	.middleware({ '*': 'auth' })
	.as('customers')

Route.resource('products', 'ProductsController')
	.apiOnly()
	.where('id', checkIsNumber)
	.middleware({ '*': 'auth' })
	.as('products')

Route.post('/sales', 'SalesController.register')
	.where('id', checkIsNumber)
	.middleware('auth')
