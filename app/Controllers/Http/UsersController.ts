import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class UserController {
  public async index({ response }: HttpContextContract) {
    try {
      const users = await User.all();
      return response.ok(users);
    } catch (error) {
      return response.internalServerError({ error: 'An error occurred while fetching users.' });
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id);
      return response.ok(user);
    } catch (error) {
      return response.notFound({ error: 'User not found.' });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const userData = request.only([
        'name',
        'email',
        'password',
        'blood_group',
        'phone_number',
        'latitude',
        'longitude',
      ]);

      const user = await User.create(userData);
      return response.created(user);
    } catch (error) {
      return response.badRequest({ error: 'Failed to create user.' });
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id);
      const userData = request.only([
        'name',
        'blood_group',
        'phone_number',
        'latitude',
        'longitude',
      ]);

      user.merge(userData);
      await user.save();
      return response.ok(user);
    } catch (error) {
      return response.notFound({ error: 'User not found or update failed.' });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id);
      await user.delete();
      return response.noContent();
    } catch (error) {
      return response.notFound({ error: 'User not found or delete failed.' });
    }
  }
}
