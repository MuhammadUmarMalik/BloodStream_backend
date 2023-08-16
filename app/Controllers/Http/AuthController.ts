import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class AuthController {
  public async redirect({ ally }: HttpContextContract) {
    return ally.use('google').redirect();
  }

  public async handleCallback({ ally, auth, response }: HttpContextContract) {
    try {
      const googleUser = ally.use('google');

      if (googleUser.accessDenied()) {
        return 'Access was denied';
      }

      if (googleUser.stateMisMatch()) {
        return 'Request expired. Try again.';
      }

      if (googleUser.hasError()) {
        return googleUser.getError();
      }

      const user = await googleUser.user();

      const findUser = {
        email: user.email as string,
      };

      const userDetails = {
        name: user.name as string,
        email: user.email as string,
        provider_id: user.id as string,
        provider: 'google',
      };

      const newUser = await User.firstOrCreate(findUser, userDetails);

      await auth.use('api').login(newUser);
      response.status(200);

      return newUser;
    } catch (error) {
      // Handle and log the error
      console.error('Error during social authentication:', error);
      response.status(500).send('An error occurred during authentication.');
    }
  }
}
