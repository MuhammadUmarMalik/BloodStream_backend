import Route from '@ioc:Adonis/Core/Route'


// login endpoint 
Route.get('auth/google', 'AuthController.redirect');
Route.get('auth/google/callback', 'AuthController.handleCallback');
// SIGN IN ROUTES
Route.get('/google-signin', 'AuthController.redirect');
//OAuth CALLBACK
Route.get('/google-signin-callback', 'AuthController.handleCallback');

// users endpoints
Route.group(() => {
  Route.get('/users', 'UsersController.index');
  Route.get('/users/:blood_group', 'UsersController.show');
  Route.post('/users', 'UsersController.store');
  Route.put('/users/:id', 'UsersController.update');
  Route.delete('/users/:id', 'UsersController.destroy');
  // donations endpoints
  Route.post('/donations/:param', 'DonationsController.create');
  // Route.put('/donations/:id/accept', 'DonationsController.accept');
  // Route.put('/donations/:id/review', 'DonationsController.review');
  // Route.post('donations/accept', 'DonationController.acceptDonation');

}).prefix('api');



