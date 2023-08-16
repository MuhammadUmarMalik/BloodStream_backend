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
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('/', async () => {
  return { hello: 'world' }
})


// check db connection
Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})



Route.get('auth/google', 'AuthController.redirect');
Route.get('auth/google/callback', 'AuthController.handleCallback');
// users endpoints
Route.group(() => {
  Route.get('/users', 'UserController.index');
  Route.get('/users/:id', 'UserController.show');
  Route.post('/users', 'UserController.store');
  Route.put('/users/:id', 'UserController.update');
  Route.delete('/users/:id', 'UserController.destroy');
}).prefix('api');