import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Route from '@ioc:Adonis/Core/Route'


// check db connection
Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})


Route.get('auth/google', 'AuthController.redirectToGoogle');
Route.get('google/callback', 'AuthController.handleGoogleCallback');
