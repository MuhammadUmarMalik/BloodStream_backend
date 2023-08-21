import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import User from 'App/Models/User';
import { Createvalidations,Updatevalidations } from 'App/Validators/UserValidator';

export default class UserController {
  public async index({ response }: HttpContextContract) {
    try {
      const users = await User.all();
      return response.send(users);
    } catch (error) {
      return response.send({ error: 'An error occurred while fetching users.' });
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      // const user = await User.find(params.blood_group);
      const user= await User.query().from('users').where('blood_group',params.blood_group)
      console.log("user-======>",user)
      return response.send(user);
    } catch (error) {
      console.log(error)
      return response.send({error});
    }
  }
// store the new user data in db
  public async store({ request, response }: HttpContextContract) {
    try {
      await request.validate({ schema: Createvalidations });
      const userData = request.only([
        'name',
        'email',
        'blood_group',
        'phone_number',
        'address',
        'city',
        'enable_request',
        'donation_date',
        'donation_count'
      ]);
      console.log('user------->',request)
      const user = await User.create(userData);
      return response.created(user);
    } catch (error) {
      return response.send(error);
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      await request.validate({ schema: Updatevalidations });
      const user = await User.findOrFail(params.id);
      const userData = request.only([ 
        'name',
        'email',
        'gender',
        'blood_group',
        'phone_number',
        'address',
        'city',
        'enable_request',
        'donation_date',
        'donation_count'
      ]);
      const updateData= user.merge(userData);
      await updateData.save();
      return response.send(updateData);
    } catch (error) {
      return response.send(error);
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id);
      await user.delete();
      return response.send('user is deleted');
    } catch (error) {
      return response.send({ error: 'User not found or delete failed.' });
    }
  }
}
